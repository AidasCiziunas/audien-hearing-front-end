import Vue from 'vue';
import Vuex from 'vuex';
import envStore from '@/store/models/enviromentalStore';
import carStore from '@/store/models/carStore';
import flightStore from '@/store/models/flightStore';
import authStore from '@/store/models/authStore';
import tripStore from '@/store/models/tripStore';
import cartStore from '@/store/models/cartStore';
import customerStore from '@/store/models/customerStore';
import hotelStore from '@/store/models/hotelStore';
import villaStore from '@/store/models/villaStore';
import ActivityStore from '@/store/models/activityStore';
import RegisterOutsideBookingStore from '@/store/models/RegisterOutsideBookingStore';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    envStore,
    carStore,
    flightStore,
    authStore,
    tripStore,
    cartStore,
    hotelStore,
    ActivityStore,
    villaStore,
    customerStore,
    RegisterOutsideBookingStore
  },
  plugins: [createPersistedState()],
});
