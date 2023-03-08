import carServices from '@/services/api/Cars';
import mixin from '@/mixins';

const state = {
  carLocations: [],
  // search filter responses: needed to use at front pages
  searchData: false,
  filters: false,
  searchedCarsData: [],
  pickLocations: [],
  dropLocations: [],
  selPickLoc: null,
  selDropLoc: null,
  selDriverAge: null,
  selInDriverAge: null,
  selMainLocation: null,
  carSearchedId: null,
  carSearchClock: null,
  carSearchAttempted: 0,
  carEngineLeftMins: [], // [mins, seconds],
  appliedFilter: false,
  sessionId: '',
};

const mutations = {
  setCarLocationsM(state, payload) {
    state.carLocations = payload;
  },
  reSetCarLocationsM(state, payload) {
    (state.carLocations = payload),
      (state.searchData = false),
      (state.filters = false),
      (state.searchedCarsData = []),
      (state.pickLocations = []),
      (state.dropLocations = []),
      (state.selPickLoc = null),
      (state.selDropLoc = null),
      (state.selDriverAge = null),
      (state.selInDriverAge = null),
      (state.selMainLocation = null),
      (state.carSearchedId = null),
      (state.carSearchClock = null),
      (state.carSearchAttempted = 0),
      (state.appliedFilter = false),
      (state.carEngineLeftMins = []);
  },
  setSearchedCarClockM(state, payload) {
    state.carSearchClock = payload;
  },
  setSearchedCarDetailsM(state, payload) {
    (state.searchData = payload.data.searchData),
      (state.filters = payload.data.filters),
      // (state.searchedCarsData = payload.data.data),
      (state.pickLocations = payload.pickLocations),
      (state.dropLocations = payload.dropLocations),
      (state.selPickLoc = payload.spickLocations),
      (state.selDropLoc = payload.sdropLocations),
      (state.selDriverAge = payload.sDriverAge),
      (state.selInDriverAge = payload.sInDriverAge),
      (state.selMainLocation = payload.mainLocation),
      (state.carSearchedId = payload.data.sessionId),
      (state.carSearchClock = payload.carSearchClock),
      (state.carEngineLeftMins = mixin.data().TimeTrackerMaxTime);
  },
  reSetCarTrackerM(state, payload) {
    state.carEngineLeftMins = payload;
  },
  carSearchedIdM(state) {
    state.carSearchedId = null;
  },
  updateCarSearchIdM(state, payload) {
    state.carSearchedId = payload;
  },
  setSearchedCarAttemptM(state) {
    state.carSearchAttempted += 1;
  },
  appliedCarFilterM: (state, reqPayLoad) => {
    state.appliedFilter = reqPayLoad;
  },
  appliedCarFilterFalseM: (state) => {
    state.appliedFilter = false;
  },
};

const actions = {
  resetSearchId({ commit }) {
    commit('carSearchedIdM', []);
  },
  updateCarSearchId({ commit }, { newSessionId }) {
    commit('updateCarSearchIdM', newSessionId);
  },

  reSetCarLocations({ commit }) {
    commit('reSetCarLocationsM', []);
  },
  reSetCarTracker({ commit }, { timePace }) {
    commit('reSetCarTrackerM', timePace);
  },
  setSearchedCarClock({ commit }, { SEARCHED_CLOCK }) {
    commit('setSearchedCarClockM', SEARCHED_CLOCK);
  },
  setSearchedCarDetails({ commit }, { SRCH_CAR_RESPOND }) {
    return new Promise((resolve) => {
      commit('setSearchedCarDetailsM', SRCH_CAR_RESPOND);
      resolve();
    });
  },
  setSearchedCarAttempt({ commit }) {
    commit('setSearchedCarAttemptM', []);
  },

  appliedCarFilter({ commit }, reqPayLoad) {
    commit('appliedCarFilterM', reqPayLoad);
  },
  appliedCarFilterFalse({ commit }) {
    commit('appliedCarFilterFalseM');
  },
};

const getters = {
  carLocations(state) {
    return state.carLocations.length > 0 && state.carLocations !== undefined;
  },
  getUpdatedLocations() {
    return state.carLocations;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
