import Vue from 'vue';
import Vuex from 'vuex';
import envStore from '@/store/models/enviromentalStore';
import HearingTest from '@/store/models/HearingTestStore';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    envStore,
  
    HearingTest
   
  },
  plugins: [createPersistedState()],
});
