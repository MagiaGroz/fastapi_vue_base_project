<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title>
        Заказы
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/main/admin/orders/create">Создать заказ</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="orders">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.coffee_type }}</td>
        <td>{{ props.item.amount }}</td>
        <td>{{ props.item.weight }}</td>
        <td>{{ props.item.send_date }}</td>
        <td>{{ props.item.deliver_date }}</td>
<!--        <td><v-icon v-if="props.item.is_active">checkmark</v-icon></td>-->
<!--        <td><v-icon v-if="props.item.is_superuser">checkmark</v-icon></td>-->
        <td class="justify-center layout px-0">
          <v-tooltip top>
            <span>Статус</span>
            <v-btn slot="activator" v-on:click="status">
              Проверить статус
            </v-btn>
          </v-tooltip>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { IUserProfile } from '@/interfaces';
import {readAdminOrders, readAdminUsers} from '@/store/admin/getters';
import { dispatchGetOrders, dispatchGetStatus } from '@/store/admin/actions';

@Component
export default class AdminOrders extends Vue {
  public headers = [
    {
      text: 'Тип кофе',
      sortable: true,
      value: 'coffee_type',
      align: 'left',
    },
    {
      text: 'Количество',
      sortable: true,
      value: 'amount',
      align: 'left',
    },
    {
      text: 'Вес (кг)',
      sortable: true,
      value: 'weight',
      align: 'left',
    },
    {
      text: 'Дата отправки',
      sortable: true,
      value: 'send_date',
      align: 'left',
    },
    {
      text: 'Дата доставки',
      sortable: true,
      value: 'deliver_date',
      align: 'left',
    },
    {
      text: 'Actions',
      value: 'id',
    },
  ];
  get orders() {
    return readAdminOrders(this.$store);
  }

  public async status(){
    return dispatchGetStatus(this.$store)
  }
  public async mounted() {
    await dispatchGetOrders(this.$store);
  }
}
</script>
