<template>
  <div class="extra-include-list">
    <ul>
      <li>
        <div class="text">
          <h5>Fare Details</h5>
        </div>
      </li>
      <li>
        <div class="text">
          <h5>Person Type</h5>
        </div>
        <div class="text">
          <h5>Base Fare</h5>
        </div>
        <div class="text">
          <h5>Total</h5>
        </div>
      </li>

      <li v-for="(breakdown, index) in details.priceBreakDown" :key="index">
        <div class="text">
          <h5>{{ breakdown.personType | adult }}</h5>
        </div>
        <p>{{ CSymbol }}{{ breakdown.baseFare }}</p>
        <p>{{ CSymbol }}{{ breakdown.total }}</p>
      </li>
      <li>
        <div class="text">
          <h5>Service Tax</h5>
        </div>
        <p>{{ CSymbol }}{{ details.totalServiceTax }}</p>
      </li>
      <li>
        <div class="text">
          <h5>Service Fee</h5>
        </div>
        <p>{{ CSymbol }}{{ details.totalServiceFee }}</p>
      </li>

      <li v-if="typeof details.totalAtolFee != 'undefined' && domain == 'uk'">
        <div class="text">
          <h5>APC (Air Passenger Contribution to CAA)</h5>
        </div>
        <p>{{ CSymbol }}{{ details.totalApcFee }}</p>
      </li>

      <li v-if="typeof details.totalAtolFee != 'undefined' && domain == 'uk'">
        <div class="text">
          <h5>ATOL Processing Fee</h5>
        </div>
        <p>{{ CSymbol }}{{ details.totalAtolFee }}</p>
      </li>

      <li>
        <div class="text">
          <h5>Grand Total</h5>
        </div>
        <p>{{ CSymbol }}{{ details.totalPrice }}</p>
      </li>
    </ul>
    <ul>
      <li>
        <div class="text">
          <h5>Cancellation Rule</h5>
        </div>
      </li>
      <li>
        <div class="text">
          <h5>Cancellation Penalty</h5>
        </div>
        <p class="cancellation-fee">
          {{ CSymbol }}{{ details.cancellationFee }}
        </p>
      </li>
      <li
        v-if="this.details.priceBreakDown[0].baggageAllowance[0] != undefined"
      >
        <div class="text">
          <h5>Allowed Bags</h5>
        </div>
        <p
          class="cancellation-fee"
          v-html="details.priceBreakDown[0].baggageAllowance[0]"
        ></p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FareSummaryTab',
  props: ['details'],

  computed: {
    ...mapState({
      CType: (state) => state.envStore.CType,
      CSymbol: (state) => state.envStore.CSymbol,
      DFormat: (state) => state.envStore.DFormat,
      countryDF: (state) => state.envStore.countryDF,
      domain: (state) => state.envStore.domain,
      urlDomain: (state) => state.envStore.urlDomain,
    }),
  },
  filters: {
    adult: function (value) {
      let str = '';
      let personType = value.split('x');

      switch (personType[0].trim()) {
        case 'ADT':
          str =
            personType[1] > 1
              ? 'Adults X' + personType[1]
              : 'Adult X' + personType[1];
          break;

        case 'CHD':
          str =
            personType[1] > 1
              ? 'Children X' + personType[1]
              : 'Child X' + personType[1];
          break;

        case 'INF':
          str =
            personType[1] > 1
              ? 'Infants X' + personType[1]
              : 'Infant X' + personType[1];
          break;
      }
      return str;
    },
  },
};
</script>

<style scoped>
.cancellation-fee {
  padding-left: 25px;
}
.car-popup-button #tab-3 ul li {
  width: 100%;
}
</style>
