const flight = {
    state: () => ({
        sessionId: '',
        filters: {},
        flights: [],
        flightType: '',
        searchData: {},
        departureLocations: [],
        arrivalLocations: [],
        departure: '',
        arrival: '',
        dynamicFlights: [],
        flightEngineLeftMins: 0, // in mins,
        flightApiMessage: '',
        flightCount: 0,
        appliedFltAdvFilter: false,
    }),
    mutations: {
        setFlightResponse: (state, payload) => {

            state.sessionId = payload.sessionId;
            state.flightCount = payload.flightsCount;
            state.filters = payload.filter;
            // state.flights = payload.flights;
            state.flightType = payload.flightType;
            state.searchData = payload.searchData;
            state.departureLocations = payload.departureLocations;
            state.arrivalLocations = payload.arrivalLocations;
            state.departure = payload.departure;
            state.arrival = payload.arrival;
            state.dynamicFlights = payload.dynamicFlights;
            state.flightEngineLeftMins = 39;
        },
        setFlightType: (state, payload) => {
            state.flightType = payload.flightType;
        },
        updateFlightSessionIdM(state, payload) {
            state.sessionId = payload;
        },

        setFlightApiMessageM(state, msg) {
            state.flightApiMessage = msg;
        },
        appliedFlightFilterM: (state, reqPayLoad) => {
            state.appliedFltAdvFilter = reqPayLoad
        },
        appliedFlightFilterFalseM: (state) => {
            state.appliedFltAdvFilter = false
        },
    },
    actions: {
        setFlightResponse({ commit }, payload) {
            commit('setFlightResponse', payload);
        },
        setFlightType({ commit }, payload) {
            commit('setFlightType', payload);
        },
        updateFlightSessionId({ commit }, { newSessionId }) {
            commit('updateFlightSessionIdM', newSessionId);
        },

        setFlightApiMessage({ commit }, msg) {
            commit('setFlightApiMessageM', msg);
        },
        appliedFlightFilter({commit}, reqPayLoad){
            commit('appliedFlightFilterM', reqPayLoad)
        },
        appliedFlightFilterFalse({commit}){
            commit('appliedFlightFilterFalseM')
        },
    }
};

export default flight;
