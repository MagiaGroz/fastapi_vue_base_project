import {IUserProfile, OrderCreate} from '@/interfaces';

export interface AdminState {
    users: IUserProfile[];
    orders: OrderCreate[];
}
