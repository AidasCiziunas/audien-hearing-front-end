import Vue from 'vue';


const state = {
    tripExist: false,
    tripID: null,
    tripPrimaryTravellerID: null,
    tripName: null,
    tripTravellerName: null,
    tripFromTime: null,
    tripToTime: null,
    tripCreator: null,
    tripAgent: null,
    tripBookings: [],
    tripTravellers: [],
    tripConsumedPrimaryTravellerID: false,
    userTripDetais: null,
    UserTrip: [],
    invitedCustomerEmail: '',
    invitedCustomerLink: '',
    travelerInvitedToPay: false
};

const mutations = {
    addTravellerM(state, payload) {
        state.tripTravellers = payload; // push(payload);
        Vue.set(state, 'tripTravellers', state.tripTravellers);
    },
    addBookingM(state, payload) {
        state.tripBookings.push(payload);
        Vue.set(state, 'tripBookings', state.tripBookings);
    },
    resetBookingBulksM(state) {
        state.tripBookings = [];
        state.tripTravellers = [];
    },
    resetBookingExpireTimeM(state, payload) {
        state.tripBookings.forEach(item => {
            if (item.engineId === payload.reqId) {
                item.sessionDetails.remaining = payload.timePieces;

                if (payload.timePieces[0] == 0 && payload.timePieces[1] == 0)
                    //  && item.engineId=='1e15ab90-b614-4bde-b87d-c52f22f4db4d'
                    item.sessionDetails.expire = true;
            }
        });

        Vue.set(state, 'tripBookings', state.tripBookings);
    },
    updateTimeM(state, payload) {
        state.tripBookings.forEach(item => {
            if (item.sessionId == payload.reqId) {
                item.sessionDetails.remaining = payload.timePieces;

                item.sessionDetails.expire = payload.expire.expire;
            }
        });
        Vue.set(state, 'tripBookings', state.tripBookings);
    },
    setTripDetailM(state, payload) {
        // (state.tripExist = true),
        (state.tripID = payload.trip_id),
            (state.tripPrimaryTravellerID = payload.primaryTravellerId),
            (state.tripName = payload.name),
            (state.tripFromTime = payload.tripStartDate),
            (state.tripTravellerName = payload.trv_name),
            (state.tripExist = true);
    },
    setTripSummaryM(state, payload) {
            (state.tripCreator = payload.creator),
            (state.tripBookings = payload.bookings),
            (state.tripTravellers = payload.travellers);
            state.tripAgent = payload.agent;
    },
    setPrimaryIdConsumedM(state) {
        state.tripConsumedPrimaryTravellerID = true;
    },
    reSetTripM(state) {
        (state.tripExist = false),
            (state.tripID = null),
            (state.tripPrimaryTravellerID = null),
            (state.tripConsumedPrimaryTravellerID = false),
            (state.tripName = null),
            (state.tripTravellerName = null),
            (state.tripFromTime = null),
            (state.tripToTime = null),
            (state.tripCreator = null),
            (state.tripBookings = []),
            (state.tripAgent = null),
            (state.tripTravellers = []);
    },

    UserAllTripsDetailsM(state, payload) {
        state.userTripDetais = payload;
    },

    UserAllTripsM(state, payload) {
        state.UserTrip = payload;
    },
    setInvitedCustomerDetailsM(state, payload) {

        state.invitedCustomerEmail = payload.email;
        state.invitedCustomerLink = payload.link;
        state.travelerInvitedToPay = true;
    },
    reSetInvitedCustomerDetailsM(state, payload) {

        state.invitedCustomerEmail = '';
        state.invitedCustomerLink = '';
        state.travelerInvitedToPay = false;
    }
};

const actions = {
    addTraveller({ commit }, { TRAVELLERS }) {
        commit('addTravellerM', TRAVELLERS);
    },
    addBooking({ commit }, { BOOKING }) {
        commit('addBookingM', BOOKING);
    },
    resetBookingExpireTime({ commit }, { timePace, engineId }) {
        commit('resetBookingExpireTimeM', {
            timePieces: timePace,
            reqId: engineId
        });
    },
    setTripDetail({ commit }, { TRIP }) {
        return new Promise(resolve => {
            commit('setTripDetailM', TRIP);
            resolve();
        });
    },
    setTripSummary({ commit }, { SUMMARY }) {
        return new Promise(resolve => {
            commit('setTripSummaryM', SUMMARY);
            resolve();
        });
    },
    setPrimaryIdConsumed({ commit }) {
        commit('setPrimaryIdConsumedM', []);
    },
    reSetTrip({ commit }) {
        commit('reSetTripM', []);
    },
    resetBookingBulks({ commit }) {
        commit('resetBookingBulksM', []);
    },
    updateTime({ commit }, { time, sessionId, expire }) {
        commit('updateTimeM', {
            timePieces: time,
            reqId: sessionId,
            expire: expire
        });
    },

    UserAllTripsDetails({ commit }, BOOKING) {
        commit('UserAllTripsDetailsM', BOOKING);
    },
    UserAllTrips({ commit }, BOOKING) {
        commit('UserAllTripsM', BOOKING);
    },
    setInvitedCustomerDetails({ commit }, InvitationDetails ) {
        commit('setInvitedCustomerDetailsM', InvitationDetails);
    },
    reSetInvitedCustomerDetails({ commit }) {
        commit('reSetInvitedCustomerDetailsM');
    }
};

const getters = {
    hasTrip(state) {
        return state.tripExist;
    },
    tripDetails(state) {
        let details = {
            trip_id: state.tripID,
            trip_name: state.tripName,
            trip_trv_name: state.tripTravellerName
        };

        return details;
    },
    tripSummary(state) {
        let summary = {
            trip_id: state.tripID,
            trip_name: state.tripName,
            trip_trv_name: state.tripTravellerName,
            trip_from_time: state.tripFromTime,
            trip_to_time: state.tripToTime,
            trip_creator: state.tripCreator,
            trip_bookings: state.tripBookings,
            trip_agent: state.tripAgent,
            trip_travellers: state.tripTravellers
        };

        return summary;
    },
    bookings(state) {
                
        let bookings = state.tripBookings.map(item => ({
            session: item.sessionDetails,
            engine:  item.engine,
            engineId: item.engineId
        }));

    
        if(bookings.length)
            return bookings.reduce(function(r, a) {
                return r.session.expire_at_time < a.session.expire_at_time ? r : a;
            });
        
        return [];
    },
    tripPrimTrv() {}
};

export default {
    state,
    mutations,
    actions,
    getters
};
