import {api} from '@/api';
import {ActionContext} from 'vuex';
import {IUserProfileCreate, IUserProfileUpdate, OrderCreate} from '@/interfaces';
import {State} from '../state';
import {AdminState} from './state';
import {getStoreAccessors} from 'typesafe-vuex';
import {commitSetUsers, commitSetUser, commitSetOrders} from './mutations';
import {dispatchCheckApiError} from '../main/actions';
import {commitAddNotification, commitRemoveNotification} from '../main/mutations';

type MainContext = ActionContext<AdminState, State>;

export const actions = {
    async actionGetUsers(context: MainContext) {
        try {
            const response = await api.getUsers(context.rootState.main.token);
            if (response) {
                commitSetUsers(context, response.data);
            }
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
        async actionGetOrders(context: MainContext) {
        try {
            const response = await api.getOrders(context.rootState.main.token);
            if (response) {
                commitSetOrders(context, response.data);
            }
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionUpdateUser(context: MainContext, payload: { id: number, user: IUserProfileUpdate }) {
        try {
            const loadingNotification = {content: 'saving', showProgress: true};
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.updateUser(context.rootState.main.token, payload.id, payload.user),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitSetUser(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'User successfully updated', color: 'success'});
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionCreateUser(context: MainContext, payload: IUserProfileCreate) {
        try {
            const loadingNotification = {content: 'saving', showProgress: true};
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.createUser(context.rootState.main.token, payload),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitSetUser(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'User successfully created', color: 'success'});
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
    async actionGetStatus(context: MainContext) {
        try {
            const response = await api.getStatus(context.rootState.main.token);
            commitAddNotification(context, {content: JSON.stringify(response.data['status']), color: 'success'});
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    },
        async actionCreateOrder(context: MainContext, payload: OrderCreate) {
        try {
            const loadingNotification = {content: 'saving', showProgress: true};
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.createOrder(context.rootState.main.token, payload),
                await new Promise((resolve, reject) => setTimeout(() => resolve(), 500)),
            ]))[0];
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, {content: 'Order successfully created', color: 'success'});
        } catch (error) {
            await dispatchCheckApiError(context, error);
        }
    }
};

const {dispatch} = getStoreAccessors<AdminState, State>('');

export const dispatchCreateUser = dispatch(actions.actionCreateUser);
export const dispatchGetUsers = dispatch(actions.actionGetUsers);
export const dispatchGetOrders = dispatch(actions.actionGetOrders);
export const dispatchGetStatus = dispatch(actions.actionGetStatus);
export const dispatchUpdateUser = dispatch(actions.actionUpdateUser);
export const dispatchCreateOrder = dispatch(actions.actionCreateOrder);
