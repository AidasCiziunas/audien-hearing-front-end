const state = {
  // search filter responses: needed to use at front pages
  searchData: false,
  filters: false,
  searchedHotelsData: [],
  hotels: [],
  hotelsCount: '',
  sessionId: null,
  searchHotelAgain: false,
  hotelData: {},
  hotelDetails: {},
  galleryImages: [],
  roomSessionId: '',
  totalNights: 0,
  appliedFilters: false,
};

const mutations = {
  // setCarLocationsM(state, payload) {
  //     state.carLocations = payload;
  // },
  resetRoomSessisonIdM(state) {
    state.roomSessionId = '';
  },

  reSetHotelLocationsM(state) {
    (state.searchData = {}),
      (state.filters = {}),
      (state.searchedHotelsData = []),
      (state.hotels = []),
      (state.hotelsCount = ''),
      (state.sessionId = ''),
      (state.totalNights = 0);
  },

  setSearchedHotelCarDetailsM(state, payload) {
    (state.searchData = payload.data.searchData),
      (state.filters = payload.data.filters),
      (state.hotelsCount = payload.data.hotelsCount),
      (state.sessionId = payload.data.sessionId),
      // (state.hotels = payload.data.hotels),
      (state.totalNights = payload.data.totalNights);
  },
  hotelDetailM(state, payload) {
    (state.roomSessionId = payload.sessionId),
      (state.hotelData = payload.hotelData),
      (state.hotelDetails = payload.hotelDetails),
      (state.galleryImages = payload.galleryImages),
      (state.galleryImages = payload.galleryImages);
    state.totalNights = payload.totalNights;
  },
  setHotelAutoSearchAgainM(state, payload) {
    state.searchHotelAgain = payload;
  },
  HotelSearchM(state, payload) {
    if(payload.checkinDate){
      state.searchData.checkinDate = payload.checkinDate;
    }
    if(payload.checkoutDate){
      state.searchData.checkoutDate = payload.checkoutDate;
    }
  },

  setNightsM(state, totalNights) {
    state.totalNights = totalNights;
  },
  updatePriceM(state, updatePrice) {
    state.appliedFilters = updatePrice.requestPayload;
  },
  resetAppliedFilterM(state) {
    state.appliedFilters = false;
  },
  updSessionIdM(state, payload) {
    state.sessionId = payload;
  },
};

const actions = {
  resetSearchId({ commit }) {
    commit('carSearchedIdM', []);
  },
  updateSessionId({ commit }, sessionId) {
    commit('updSessionIdM', sessionId);
  },
  hotelDetail({ commit }, hotelDetail) {
    commit('hotelDetailM', hotelDetail);
  },
  reSetHotelLocations({ commit }) {
    commit('reSetHotelLocationsM', []);
  },
  setSearchedHotelDetails({ commit }, { SRCH_CAR_RESPOND }) {
    return new Promise((resolve) => {
      commit('setSearchedHotelCarDetailsM', SRCH_CAR_RESPOND);
      resolve();
    });
  },
  setHotelAutoSearchAgain({ commit }, { STATUS }) {
    commit('setHotelAutoSearchAgainM', STATUS);
  },
  resetRoomSessisonId({ commit }) {
    commit('resetRoomSessisonIdM');
  },
  HotelSearch({ commit }, searchData) {
    commit('HotelSearchM', searchData);
  },
  setNights({ commit }, totalNights) {
    commit('setNightsM', totalNights);
  },
  updatePrice({ commit }, price) {
    commit('updatePriceM', price);
  },
  resetAppliedFilter({ commit }) {
    commit('resetAppliedFilterM');
  },
};

const getters = {
  HotelLocations(state) {
    return (
      state.searchedHotelsData.length > 0 &&
      state.searchedHotelsData !== undefined
    );
  },
  getUpdatedHotelLocations() {
    return state.searchedHotelsData;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
