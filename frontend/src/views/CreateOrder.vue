<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Оформить заказ</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <div class="subheading secondary--text text--lighten-2">Выбор типа кофе</div>
            <select v-bind:class="{size: '4in 10in'}" class="form" v-model="coffee_type">
              <option disabled value="">Выбор ⇕</option>
              <option>Эфиопский</option>
              <option>Бразильский</option>
              <option>Эквадорский</option>
            </select>

            <br>            <br>

            <div class="subheading secondary--text text--lighten-2">Количество упаковок</div>

            <v-text-field
                v-model="amount"
                hide-details
                single-line
                type="number"
            />
            <br>
            <div class="subheading secondary--text text--lighten-2">Вес в кг</div>

            <v-text-field
                v-model="weight"
                single-line
                type="number"
            />

            <br>
            <input id="send_date" type="date" v-model="send_date">
            <label for="send_date">Дата отправки</label>

            <br>
            <input id="deliver_date" type="date" v-model="deliver_date">
            <label for="deliver_date">Дата привоза</label>


          </v-form>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn @click="reset">Reset</v-btn>
        <v-btn @click="submit" :disabled="!valid">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {
  OrderCreate,
} from '@/interfaces';
import {dispatchCreateOrder} from '@/store/admin/actions';

@Component
export default class CreateOrder extends Vue {
  public valid = false;
  public coffee_type: string = '';
  public amount: number = 1;
  public weight: number = 1;
  public send_date = new Date();
  public deliver_date = new Date();


  // public async mounted() {
  //   await dispatchGetUsers(this.$store);
  //   this.reset();
  // }

  public reset() {
    this.amount = 1;
    this.coffee_type = '';
    this.weight = 1;
    this.send_date = new Date();
    this.deliver_date = new Date();
    this.$validator.reset();
  }

  public cancel() {
    this.$router.back();
  }

  public async submit() {
    if (await this.$validator.validateAll()) {
      const Order: OrderCreate = {
        coffee_type: this.coffee_type,
        amount: this.amount,
        weight: this.weight,
        send_date: this.send_date,
        deliver_date: this.deliver_date
      };
      console.log(Order)

      await dispatchCreateOrder(this.$store, Order);
      this.$router.push('/main/admin/orders/all');
    }
  }
}
</script>
