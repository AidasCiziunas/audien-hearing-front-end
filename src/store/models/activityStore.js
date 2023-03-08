const state = {
    // search filter responses: needed to use at front pages
    searchData: false,
    filters: false,
    searchedActivitiesData: [],
    searchedAvailabilityData: [],
    individualActivityDetail: [],
    activities: [],
    activitiesCount: '',
    sessionId: null,
    searchActivityAgain: false,
    searchedDestination: '',
    appliedFilter:false,
    ongoingParentActivity: [],
    extraDetails: []
};

const mutations = {
    // setCarLocationsM(state, payload) {
    //     state.carLocations = payload;
    // },
    reSetActivityLocationsM(state) {
        (state.searchData = {}),
        (state.filters = {}),
        (state.searchedActivitesData = []),
        (state.activities = []),
        (state.activitiesCount = ''),
        (state.sessionId = ''),
        (state.ongoingParentActivity = []);
    },
    reSetActivityAvailabilityDataM(state) {
        state.searchedAvailabilityData = [];
    },
    setSearchedActivityDetailsM(state, payload) {
        (state.searchData = payload.data.searchData),
        (state.filters = payload.data.filters),
        (state.activitiesCount = payload.data.activitiesCount),
        (state.sessionId = payload.data.sessionId);
        // (state.activities = payload.data.activities);
    },
    updateAppliedFIlterM(state,payload){
        state.appliedFilter=payload
    },
    setActivityAutoSearchAgainM(state, payload) {

        state.searchActivityAgain = payload;
    },

    setSearchedDestinationM(state, destination) {
        state.searchedDestination = destination;
    },

    setsearchedAvailabilityDataM(state, payload) {
        state.searchedAvailabilityData = payload;
    },

    setindividualActivityDetailM(state, payload) {
        state.individualActivityDetail = payload;
    },
    setOngoingParentActivityM(state, payload) {
        state.ongoingParentActivity = payload;
    },
    resetAppliedFilterM(state){
        state.appliedFilter=false
    },
    saveExtraDetailOfActivityM(state, payload) {
        state.extraDetails = payload;
    }
};

const actions = {
    updateAppliedFIlter({commit},payload){
        commit('updateAppliedFIlterM',payload)
    },
    resetSearchId({ commit }) {
        commit('carSearchedIdM', []);
    },
    // it has deprectaited since location is made search base
    // getCarLocations({ state, commit }) {
    //     carServices
    //         .getCarLocations({
    //             query: 'paris',
    //             searchType: '1',
    //             limit: '30'
    //         })
    //         .then(response => {
    //             commit('setCarLocationsM', response.data.data);
    //         })
    //         .catch(error => {
    //             commit('setCarLocationsM', []);
    //             console.log('Error In Car Locations Api', error);
    //         })
    //         .finally(() => {
    //             // do some thing here
    //         });
    // },

    reSetActivityLocations({ commit }) {
        commit('reSetActivityLocationsM', []);
    },

    setSearchedActivityDetails({ commit }, { SRCH_CAR_RESPOND }) {
        return new Promise(resolve => {
            commit('setSearchedActivityDetailsM', SRCH_CAR_RESPOND);
            resolve();
        });
    },

    setActivityAutoSearchAgain({ commit }, { STATUS }) {
        commit('setActivityAutoSearchAgainM', STATUS);
    },

    setSearchedDestination({ commit }, destination) {
        commit('setSearchedDestinationM', destination);
    },

    setsearchedAvailabilityData({ commit }, payload) {
        return new Promise(resolve => {
            commit('setsearchedAvailabilityDataM', payload);
            resolve();
        });
    },

    setindividualActivityDetail({ commit }, payload) {
        return new Promise(resolve => {
            commit('setindividualActivityDetailM', payload);
            resolve();
        });
    },

    setOngoingParentActivity({ commit }, payload) {
        commit('setOngoingParentActivityM', payload);
    },

    reSetActivityAvailabilityData({ commit }) {
        commit('reSetActivityAvailabilityDataM');
    },
    resetAppliedFilter({commit}){
        commit('resetAppliedFilterM')
    },
    saveExtraDetailOfActivity({ commit }, { xtraDtl }) {
        commit('saveExtraDetailOfActivityM', xtraDtl);
    }
};

const getters = {
    ActivityLocations(state) {
        return (
            state.searchedActivitysData.length > 0 &&
            state.searchedActivitiesData !== undefined
        );
    },
    getUpdatedActivityLocations() {
        return state.searchedActivitiesData;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
