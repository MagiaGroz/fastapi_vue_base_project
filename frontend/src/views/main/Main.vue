<template>
  <div>
    <v-navigation-drawer persistent :mini-variant="miniDrawer" v-model="showDrawer" fixed app>
      <v-layout column fill-height>
        <v-list>
          <v-subheader>Меню</v-subheader>
          <v-list-tile to="/main/dashboard">
            <v-list-tile-action>
              <v-icon>web</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Главное</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/main/profile/view">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Профиль</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/main/profile/edit">
            <v-list-tile-action>
              <v-icon>edit</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Редактировать профиль</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/main/profile/password">
            <v-list-tile-action>
              <v-icon>vpn_key</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Поменять пароль</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list subheader v-show="hasAdminAccess">
          <v-subheader>Admin</v-subheader>
          <v-list-tile to="/main/admin/users/all">
            <v-list-tile-action>
              <v-icon>group</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Управлять партнерами</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/main/admin/users/create">
            <v-list-tile-action>
              <v-icon>person_add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Создать партнера</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list-tile to="/main/admin/orders/create">
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Оформить заказ</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
                <v-list-tile to="/main/admin/orders/all">
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Созданные заказы</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-spacer></v-spacer>
        <v-list>
          <v-list-tile @click="logout">
            <v-list-tile-action>
              <v-icon>close</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Выйти</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile @click="switchMiniDrawer">
            <v-list-tile-action>
              <v-icon v-html="miniDrawer ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Скрыть</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-layout>
    </v-navigation-drawer>
    <v-toolbar dark color="primary" app>
      <v-toolbar-side-icon @click.stop="switchShowDrawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text=Кофе магазин></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left offset-y>
        <v-btn slot="activator" icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile to="/main/profile">
            <v-list-tile-content>
              <v-list-tile-title>Профиль</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-content>
              <v-list-tile-title>Выйти</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>close</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer class="pa-3" fixed app>
      <v-spacer></v-spacer>
      <span>&copy; Zhusipov Kanat's team </span>
    </v-footer>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

import {appName} from '@/env';
import {readDashboardMiniDrawer, readDashboardShowDrawer, readHasAdminAccess} from '@/store/main/getters';
import {commitSetDashboardShowDrawer, commitSetDashboardMiniDrawer} from '@/store/main/mutations';
import {dispatchUserLogOut} from '@/store/main/actions';

const routeGuardMain = async (to, from, next) => {
  if (to.path === '/main') {
    next('/main/dashboard');
  } else {
    next();
  }
};

@Component
export default class Main extends Vue {
  public appName = appName;

  public beforeRouteEnter(to, from, next) {
    routeGuardMain(to, from, next);
  }

  public beforeRouteUpdate(to, from, next) {
    routeGuardMain(to, from, next);
  }

  get miniDrawer() {
    return readDashboardMiniDrawer(this.$store);
  }

  get showDrawer() {
    return readDashboardShowDrawer(this.$store);
  }

  set showDrawer(value) {
    commitSetDashboardShowDrawer(this.$store, value);
  }

  public switchShowDrawer() {
    commitSetDashboardShowDrawer(
        this.$store,
        !readDashboardShowDrawer(this.$store),
    );
  }

  public switchMiniDrawer() {
    commitSetDashboardMiniDrawer(
        this.$store,
        !readDashboardMiniDrawer(this.$store),
    );
  }

  public get hasAdminAccess() {
    return readHasAdminAccess(this.$store);
  }

  public async logout() {
    await dispatchUserLogOut(this.$store);
  }
}
</script>
