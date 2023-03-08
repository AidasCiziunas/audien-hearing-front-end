import Vue from 'vue';
import router from '@/router.js';
import { evBus } from '@/services/bus.js';

const state = {
    upcomingEngine: null,
    upcomingItem: null,
    cartBulk: [],
    lastBulkOf: 'trip',
    cartHeadings: true,
    checkoutOnePayload: false,
    checkoutOneTripPayload: false,
    checkoutTwoPaymentBasicInfo: false,
    cartExist: false,
    lastExpireInModeOf: null,
    lastExpireItemDetail: null,
    lastExpireItemEngine: null,
    lastExpireItemEngineId: null
};

const mutations = {
    reSetCartM(state) {
        (state.upcomingEngine = null),
        (state.upcomingItem = null),
        (state.cartBulk = []),
        (state.lastBulkOf = 'trip'),
        (state.checkoutOnePayload = false),
        (state.checkoutOneTripPayload = false),
        (state.checkoutTwoPaymentBasicInfo = false),
        (state.cartExist = false),
        (state.cartHeadings = true);
    },
    reUpcomingsM(state, payload) {
        (state.upcomingEngine = payload.engine),
        (state.upcomingItem = payload.item);
    },
    setCheckoutOnePayloadM(state, payload) {
        state.checkoutOnePayload = payload;

        Vue.set(state, 'checkoutOnePayload', state.checkoutOnePayload);
    },

    resetCheckoutOnePayloadM(state) {
        state.checkoutOnePayload = false;
    },
    saveCheckoutTempDataM(state, payload) {
        state.checkoutOneTripPayload = payload;

        Vue.set(state, 'checkoutOneTripPayload', state.checkoutOneTripPayload);
    },
    resetCheckoutTempDataM(state) {
        state.checkoutOneTripPayload = false;
    },
    addToCartM(state, payload) {
        // if(state.lastBulkOf == 'trip') { // only one item would be chechked for direct approach

        state.cartBulk = [];
        state.lastBulkOf = 'item';
        // }

        state.cartHeadings = false;
        state.cartExist = true;

        (state.upcomingEngine = payload.engine),
            (state.upcomingItem = payload.item);

        state.cartBulk.push({
            item: state.upcomingItem,
            engine: state.upcomingEngine
        });

        Vue.set(state, 'cartBulk', state.cartBulk);
    },
    addTripToCartM(state, payload) {
        state.cartBulk = [];
        state.cartBulk = payload;
        state.lastBulkOf = 'trip';
        state.cartHeadings = true;
        state.cartExist = true;

        Vue.set(state, 'cartBulk', state.cartBulk);
    },
    resetCartExpireTimeM(state, payload) {
        state.cartBulk.forEach(item => {
            if (item.item.engineId === payload.reqId) {
                item.item.remaining = payload.timePieces;

                if (payload.timePieces[0] == 0 && payload.timePieces[1] == 0)
                    //  && item.engineId=='1e15ab90-b614-4bde-b87d-c52f22f4db4d'
                    item.item.expire = true;
            }
        });

        Vue.set(state, 'cartBulk', state.cartBulk);
    },
    updateCartTimeM(state, payload) {
        state.cartBulk.forEach(item => {
            if (payload.sessionId == item.item.engineId) {
                item.item.remaining = payload.time;
                item.item.expire = payload.expire.expire;
            }
        });
    },
    resetCartBulksM(state) {
        state.cartBulk = [];
    },
    saveExpireItemSearchedDetailsM(state, payload) {
        state.lastExpireInModeOf = payload.reqMode;
        state.lastExpireItemDetail = payload.reqItem;
        state.lastExpireItemEngine = payload.reqEngineType;
        state.lastExpireItemEngineId = payload.reqItemId; // EngineId
    },
    resetExpireItemSearchedDetailsM(state) {
        state.lastExpireInModeOf = null;
        state.lastExpireItemDetail = null;
        state.lastExpireItemEngine = null;
        state.lastExpireItemEngineId = null;
    },
    savePaymentBasicInfoM(state, payload) {
        state.checkoutTwoPaymentBasicInfo = payload;

        Vue.set(
            state,
            'checkoutTwoPaymentBasicInfo',
            state.checkoutTwoPaymentBasicInfo
        );
    }
};

const actions = {
    resetCartBulks({ commit }) {
        commit('resetCartBulksM', []);
    },
    setCartUpComings({ commit }, { UPCOMINGS }) {
        commit('reUpcomingsM', UPCOMINGS);
    },
    saveCheckoutOnePayload({ commit }, { PAYLOADS }) {
        commit('setCheckoutOnePayloadM', PAYLOADS);
    },
    saveCheckoutTempData({ commit }, { PAYLOADS }) {
        commit('saveCheckoutTempDataM', PAYLOADS);
    },
    resetCheckoutOnePayload({ commit }) {
        commit('resetCheckoutOnePayloadM', []);
    },
    resetCheckoutTempData({ commit }) {
        commit('resetCheckoutTempDataM', []);
    },
    resetCart({ commit }) {
        commit('reSetCartM', []);
    },
    addToCart({ commit }, { payload }) {
        commit('addToCartM', payload);
        evBus.$emit('reRenderAppNavs');
        router.push('/checkout-one').catch(()=>{});
    },
    addTripToCart({ commit }, { payload, redirectPath }) {
        commit('addTripToCartM', payload);
        evBus.$emit('reRenderAppNavs');

        router.push(redirectPath);
    },
    resetCartExpireTime({ commit }, { timePace, engineId }) {
        commit('resetCartExpireTimeM', {
            timePieces: timePace,
            reqId: engineId
        });
    },

    saveExpireItemSearchedDetails({ commit }, { item, engine, mode }) {
        commit('saveExpireItemSearchedDetailsM', {
            reqItemId: item.hasOwnProperty('Id') ? item.Id : item.engineId,
            reqEngineType: engine,
            reqItem: item,
            reqMode: mode
        });
    },
    updateCartTime({ commit }, { time, sessionId, expire }) {
        commit('updateCartTimeM', {
            time: time,
            sessionId: sessionId,
            expire: expire
        });
    },
    resetExpireItemSearchedDetails({ commit }) {
        commit('resetExpireItemSearchedDetailsM', []);
    },
    savePaymentBasicInfo({ commit }, { payload }) {
        commit('savePaymentBasicInfoM', payload);
    }
};

const getters = {
    wishLists(state) {
        return {
            engine: state.upcomingEngine,
            item: state.upcomingItem
        };
    },
    getCartDetails(state) {
        return state.cartBulk;
    },
    showCartHeaders(state) {
        return state.cartHeadings;
    },
    hasCart(state) {
        return state.cartExist;
    },
    cartType(state) {
        return state.lastBulkOf == 'item' ? 'direct' : 'trip';
    },
    ckStepOneCaders(state) {
        // payload set at checkout step one page

        return state.checkoutOnePayload;
    },
    ckStepOneTripCaders(state) {
        // payload set at checkout step one page for trip

        return state.checkoutOneTripPayload;
    },
    ckStepTwoPaymentInfo(state) {
        return state.checkoutTwoPaymentBasicInfo;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
