<template>
  <div class="extra-include-list">
    <ul>
      <li>
        <div class="text">
          <h5>Pick-up Office Details</h5>
          <p>
            {{ car.details.pickupOffice.Name }}<br />
            {{ car.details.pickupOffice.PhoneNumber }}<br />
            {{ car.details.pickupOffice.Address }}
            <br />
          </p>
        </div>
      </li>
      <li v-if="car.details.pickTimes !== undefined">
        <div class="text">
          <h5>Pick-up Date and Time</h5>
          <p>
            {{ modifyDateByDomain(car.details.pickTimes.resDate) }}
            |
            {{ car.details.pickTimes.resTime }}
          </p>
        </div>
      </li>
    </ul>
    <ul>
      <li>
        <div class="text">
          <h5>Drop-off Office Details</h5>
          <p>
            {{ car.details.dropoffOffice.Name }}<br />
            {{ car.details.dropoffOffice.PhoneNumber }}<br />
            {{ car.details.dropoffOffice.Address }}
            <br />
          </p>
        </div>
      </li>
      <li v-if="car.details.dropTimes !== undefined">
        <div class="text">
          <h5>Drop-off Date and Time</h5>
          <p>
            {{ modifyDateByDomain(car.details.dropTimes.resDate) }}
            |
            {{ car.details.dropTimes.resTime }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TripSummaryTab',
  props: ['car'],

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
};
</script>

<style></style>
