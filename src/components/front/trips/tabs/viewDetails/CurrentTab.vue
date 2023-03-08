<template>
  <span style="display: block !important;">
    <div class="title-heading border-bottom current-item-heading">
      <h2 class="blue-heading">Current Items</h2>
    </div>



    <div class="checkout-trip-btn" style="" v-show="hasCurrentItems.length > 0">
      <v-btn
        color="error"
        class="btn-save"
        width="150"
        style="float: right; margin-right: 20px;"
        @click="ckTripInfo()"
      >
        Checkout Trip
      </v-btn>
    </div>
    <div
      v-for="(trips, index) in tripBooking"
      :key="'A' + index"
      class=""
      style="padding: 0 15px 20px;"
    >
      <div
        v-if="
          trips.sessionDetails.expire == false &&
            trips.status != 'booked' &&
            trips.status != 'completed'
        "
      >
        <CarCurrentItem
          v-if="trips.engine == 'car'"
          :itemDetials="compItemDetails"
          :trips="trips"
          :index="index"
          :doMeToggle="doMeToggle"
          :removeTrip="removeTrip"
        />

        <VillaCurrentItem
          v-if="trips.engine == 'villa'"
          :itemDetials="compItemDetails"
          :trips="trips"
          :index="index"
          :doMeToggle="doMeToggle"
          :personCount="personCount"
          :removeTrip="removeTrip"
        />

        <HotelCurrentItem
          v-if="trips.engine == 'hotel'"
          :itemDetials="compItemDetails"
          :trips="trips"
          :index="index"
          :doMeToggle="doMeToggle"
          :personCount="personCount"
          :removeTrip="removeTrip"
          :cCodes="cCodes"
          :searchData="searchData"
          :setNightCount="setNightCount"
          :countryDF="countryDF"
          :fixPathOfImage="fixPathOfImage"
        />

        <FlightCurrentItem
          v-if="trips.engine == 'flight'"
          :itemDetials="compItemDetails"
          :trips="trips"
          :index="index"
          :doMeToggle="doMeToggle"
          :removeTrip="removeTrip"
          :transformToCode="transformToCode"
          :fType="fType"
        />

        <ActivityCurrentItem
          v-if="trips.engine == 'activity'"
          :itemDetials="compItemDetails"
          :trips="trips"
          :index="index"
          :doMeToggle="doMeToggle"
          :personCount="personCount"
          :removeTrip="removeTrip"
          :cCodes="cCodes"
          :searchData="searchData"
          :setNightCount="setNightCount"
          :countryDF="countryDF"
        />
      </div>
    </div>
  </span>
</template>













<script>
import { tripHeadingIcons } from '@/services/data/dsources.js';
import { mapState } from 'vuex';
import CarCurrentItem from '@/components/front/trips/tabs/viewDetails/currentTab/CarCurrentItem.vue';
import VillaCurrentItem from '@/components/front/trips/tabs/viewDetails/currentTab/VillaCurrentItem.vue';
import FlightCurrentItem from '@/components/front/trips/tabs/viewDetails/currentTab/FlightCurrentItem.vue';
import HotelCurrentItem from '@/components/front/trips/tabs/viewDetails/currentTab/HotelCurrentItem.vue';
import ActivityCurrentItem from '@/components/front/trips/tabs/viewDetails/currentTab/ActivityCurrentItem.vue';

export default {
  name: 'CurrentTab',
  components: {
    CarCurrentItem,
    VillaCurrentItem,
    HotelCurrentItem,
    FlightCurrentItem,
    ActivityCurrentItem
  },
  props: [
    'tripBooking',
    'getTripQuote',
    'itemDetials',
    'activeDomain',
    'fType',
    'transformToCode',
    'setNightCount',
    'removeTrip',
    'ckTripInfo',
    'hasCurrentItems',
    'cCodes',
    'searchData',
    'personCount',
    'fixPathOfImage'
  ],

  data() {
    return {
      tripHeadingIcons: tripHeadingIcons,
      itemDetails: this.itemDetials
    };
  },

  computed: {
    ...mapState({
      CType: state => state.envStore.CType,
      DFormat: state => state.envStore.DFormat,
      countryDF: state => state.envStore.countryDF,
      domain: state => state.envStore.domain
    }),

    compItemDetails() {

      return this.itemDetials;
    }
  },


  methods: {
    doMeToggle(index) {
      this.itemDetials.find((o, rInd) => {
        if (rInd == index) {
          o.search.expanded = !o.search.expanded;
        } else {
          o.search.expanded = false;
        }
      });

      this.$forceUpdate();
    }
  }

};
</script>

<style></style>
