const state = {
  // search filter responses: needed to use at front pages
  searchData: false,
  filters: false,
  searchedVillasData: [],
  villas: [],
  villasCount: '',
  sessionId: null,
  imgURL: 'test',
  totalNights: 0,
  appliedFilter: false,
  searchVillaAgain: false,
};

const mutations = {
  reSetVillaLocationsM: (state) => {
    state.searchData = {};
    state.filters = {};
    state.searchedVillasData = [];
    state.villas = [];
    state.villasCount = '';
    state.sessionId = '';
    state.totalNights = 0;
  },

  setSearchedVillaDetailsM: (state, payload) => {
    state.searchData = payload.data.searchData;
    state.filters = payload.data.filters;
    state.villasCount = payload.data.villasCount;
    state.sessionId = payload.data.sessionId;
    // state.villas = payload.data.villas;
    state.totalNights = payload.data.totalNights;
  },

  setVillaBannerM: (state, URL) => {
    state.imgURL = URL;
  },

  setNightsM: (state, totalNights) => {
    state.totalNights = totalNights;
  },
  appliedFilterM: (state, reqPayLoad) => {
    state.appliedFilter = reqPayLoad;
  },
  appliedFilterFalseM: (state) => {
    state.appliedFilter = false;
  },
  setVillaAutoSearchAgainM(state, payload) {
    state.searchVillaAgain = payload;
  },
  updSessionIdM(state, payload) {
    state.sessionId = payload;
  },
};

const actions = {
  updateSessionId({ commit }, sessionId) {
    commit('updSessionIdM', sessionId);
  },
  resetSearchId({ commit }) {
    commit('carSearchedIdM', []);
  },
  reSetVillaLocations({ commit }) {
    commit('reSetVillaLocationsM', []);
  },

  setSearchedVillaDetails({ commit }, { SRCH_CAR_RESPOND }) {
    return new Promise((resolve) => {
      commit('setSearchedVillaDetailsM', SRCH_CAR_RESPOND);
      resolve();
    });
  },

  setVillaBanner({ commit }, URL) {
    commit('setVillaBannerM', URL);
  },

  setNights({ commit }, totalNights) {
    commit('setNightsM', totalNights);
  },
  appliedFilter({ commit }, reqPayLoad) {
    commit('appliedFilterM', reqPayLoad);
  },
  appliedFilterFalse({ commit }) {
    commit('appliedFilterFalseM');
  },
  setVillaAutoSearchAgain({ commit }, { STATUS }) {
    commit('setVillaAutoSearchAgainM', STATUS);
  },
};

const getters = {
  VillaLocations(state) {
    return (
      state.searchedVillasData.length > 0 &&
      state.searchedVillasData !== undefined
    );
  },
  getUpdatedVillasLocations() {
    return state.searchedVillasData;
  },
  imgURL() {
    return state.URL;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
