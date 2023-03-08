import Vue from 'vue';

const state = {
    customerDetails: false,
    invitedTrip: false,
    cardDetails: []
};

const mutations = {
    addCustomerM(state, payload) {
        state.customerDetails = payload;
    },
    addCardsM(state, payload) {
        state.cardDetails = payload;

        Vue.set(state, 'cardDetails', state.cardDetails);
    },
    resetCustomerDetailsM(state) {
        state.customerDetails = false;
        state.invitedTrip = false;
        state.cardDetails = [];

        Vue.set(state, 'cardDetails', state.cardDetails);
    }
};

const actions = {
    addCustomer({ commit }, { CUSTOMER }) {
        commit('addCustomerM', CUSTOMER);
    },
    addCards({ commit }, { CARDS }) {
        commit('addCardsM', CARDS);
    },
    resetCustomerDetails({ commit }) {
        commit('resetCustomerDetailsM', []);
    }
};

const getters = {
    getCardDetails(state) {
        return state.cardDetails;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
