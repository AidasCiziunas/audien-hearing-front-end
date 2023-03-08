import axios from 'axios';
import router from '@/router.js';
import { evBus } from '@/services/bus.js';

const state = {
  isAuthenticated: false,
  token: false,
  inviteToken: false,
  user: false,
  userType: null,
  loginError: false,
  loginTime: null,
  agentData: false,
  customerData: false,
};

const mutations = {
  setAuthenticationM(state, payload) {
    (state.isAuthenticated = true),
      (state.token = payload.token),
      (state.user = payload.data),
      (state.userType = payload.data[0].userType),
      (state.loginError = false),
      (state.loginTime = new Date().valueOf());
  },
  setInvalidAuthM(state) {
    (state.isAuthenticated = false),
      (state.token = false),
      (state.inviteToken = false),
      (state.user = false),
      (state.userType = null),
      (state.loginError = true),
      (state.loginTime = null),
      (state.agentData = false),
      (state.customerData = false);
  },
  setSignOutM(state) {
    (state.isAuthenticated = false),
      (state.token = false),
      (state.inviteToken = false),
      (state.user = false),
      (state.userType = null),
      (state.loginError = false),
      (state.loginTime = null),
      (state.agentData = false),
      (state.customerData = false);
  },
  setUserDetailsM(state, payload) {
    (state.agentData = payload.data.agentData), (state.token = payload.token);
  },
  setcustomerInviteTokenM(state, payload) {
    state.inviteToken = payload.token;
  },
  setAgentDetailsM(payload) {
    state.agentData = payload;
  },
  setCustomerDetailsM(payload) {
    state.customerData = payload;
  },
  setFalsifyErrorLoginM(state) {
    state.loginError = false;
  },
  setUserTokenM(state, payload) {
    state.token = payload.token;
  },
};

const actions = {
  userLogin({ commit }, { reqParmas, apiClient }) {
    // login as agent
    apiClient.auth
      .userLogin(reqParmas)
      .then((rsp) => {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + rsp.data.token;

        let _resPayLoads = rsp.data;

        _resPayLoads.data.auth = true;

        commit('setAuthenticationM', _resPayLoads);

        if (typeof reqParmas.invitationToken !== 'undefined') {
          // incase user login with invite token

          // Plz don`t remove below 2 lines of code, as commented it temporarily
          // router.push('/customer-add-traveler');

          router.push({ name: 'Backend' });
        } else {
          router.push({ name: 'Backend' });
        }
      })
      .catch((err) => {
        // console.log('Error Login', err);

        commit('setInvalidAuthM', {});
      });
  },
  userSignOut({ commit }) {
    commit('setSignOutM', {});
    // router.push('https://dev.inteletravel.com/logout.cfm');

    window.location.href = process.env.VUE_APP_LOG_OUT_URL;

    // 'https://www2.inteletravel.com/';
  },
  checkUserToken({ commit }, { apiClient }) {
    apiClient.auth
      .userAliveAndActive()
      .then((rsp) => {
        if (rsp.data.success == false) {
          commit('setSignOutM', {});
          router.push('/no-auth');
        }
      })
      .catch((err) => {
        // console.log('Error Login', err);
      });
  },

  userDetails({ commit }, { payload }) {
    commit('setUserDetailsM', payload);
  },
  customerInviteToken({ commit }, { payload }) {
    commit('setcustomerInviteTokenM', payload);
  },
  falsifyErrorLogin({ commit }) {
    commit('setFalsifyErrorLoginM', {});
  },
  setAuthentication({ commit }, { payload }) {
    commit('setAuthenticationM', payload);
  },

  setUserToken({ commit }, { payload }) {
    commit('setUserTokenM', payload);
  },
};

const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated;
    // return state.user !== null && state.user !== undefined;
  },
  loginError(state) {
    return state.loginError;
  },
  requestToken(state) {
    return state.token;
  },
  inviteToken(state) {
    return state.inviteToken;
  },
  signedUserDetails(state) {
    return state.user;
  },
  signedUserRole(state) {
    return state.userType;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
