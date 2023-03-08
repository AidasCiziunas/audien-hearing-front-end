<template>
  <span
    style="display: block !important;"
    class="tipdetail-page-listing pl-4 pr-4 pb-4"
  >
    <div class="title-heading border-bottom ">
      <h2 class="blue-heading">Expired Items</h2>
    </div>
    <div
      v-for="(trips, index) in tripBooking"
      :key="'A' + index"
      class=""
      style=""
    >
      <div
        v-if="
          trips.sessionDetails.expire &&
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
<RegisterOutSideBookingItem  v-if="isROSAllowed" :tripBooking="tripBooking"/>
  </span>


</template>

<script>
import CarCurrentItem from '@/components/front/trips/tabs/viewDetails/currentTab/CarCurrentItem.vue';
import VillaCurrentItem from '@/components/front/trips/tabs/viewDetails/currentTab/VillaCurrentItem.vue';
import FlightCurrentItem from '@/components/front/trips/tabs/viewDetails/currentTab/FlightCurrentItem.vue';
import HotelCurrentItem from '@/components/front/trips/tabs/viewDetails/currentTab/HotelCurrentItem.vue';
import ActivityCurrentItem from '@/components/front/trips/tabs/viewDetails/currentTab/ActivityCurrentItem.vue';
import { mapState } from 'vuex';
import RegisterOutSideBookingItem from './registerOutsideBooking/RegisterOutSideBookingItem.vue';
export default {
  name: 'ExpiredTab',
  components: {
    CarCurrentItem,
    VillaCurrentItem,
    HotelCurrentItem,
    FlightCurrentItem,
    ActivityCurrentItem,
    RegisterOutSideBookingItem
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
    'hasExpiryItems',
    'cCodes',
    'searchData',
    'personCount',
    'fixPathOfImage'
  ],
  data() {
    return {
      CSymbol: this.$store.state.envStore.CSymbol,
      isROSAllowed: process.env.VUE_APP_ALLOW_ROS
    };
  },

  computed: {
    ...mapState({
      countryDF: state => state.envStore.countryDF
    }),

    compItemDetails() {
      return this.itemDetials;
    }
  },

  mounted() {
     this.log('Booking', this.compItemDetails);
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

<style scoped>
.red {
  background-color: #ebeff4;
}
</style>
