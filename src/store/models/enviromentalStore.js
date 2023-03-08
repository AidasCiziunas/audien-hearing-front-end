const state = {
  domain: 'us',
  urlDomain: 'com',
  CType: 'USD',
  locale: '',
  CSymbol: '$',
  DFormat: 'MM-DD-YYYY',
  countryDF: 'MM/DD/YYYY',
  activeTripLink: false,
  history: false,
  defaultCountry: 'us',
};

const mutations = {
  setSiteScopeM(state, payload) {
    (state.domain = payload.domain),
      (state.urlDomain = payload.urlDomain),
      (state.CType = payload.CType),
      (state.CSymbol = payload.CSymbol),
      (state.DFormat = payload.DFormat),
      (state.countryDF = payload.countryDF);
  },

  setRouteHistoryM(state, payload) {
    state.history = payload;
  },

  setDefaultCountryM(state, payload) {
    state.defaultCountry = payload;
  },
};

const actions = {
  setDefaultCountry({ commit }, payload) {
    commit('setDefaultCountryM', payload);
  },
  setSiteScope({ commit, state }, URL) {
    let scope = URL;
    switch (scope) {
      case 'com':
        state.locale = 'en-US'
        state.domain = 'us';
        state.urlDomain = 'com';
        state.CType = 'USD';
        state.CSymbol = '$';
        state.DFormat = 'MM-DD-YYYY';
        state.countryDF = 'MM/DD/YYYY';
        break;

      case 'uk':
        state.locale = 'en-GB'
        state.domain = 'uk';
        state.urlDomain = 'uk';
        state.CType = 'GBP';
        state.CSymbol = '£';
        state.DFormat = 'DD-MM-YYYY';
        state.countryDF = 'DD/MM/YYYY';
        break;

      case 'mx':
        state.locale = 'es-MX'
        state.DLanguage = 'Spanish'; // mx
        state.domain = 'mx';
        state.urlDomain = 'mx';
        state.CType = 'MXN';
        state.CSymbol = 'MEX$';
        state.DFormat = 'DD-MM-YYYY';
        state.countryDF = 'DD/MM/YYYY';
        break;
         
      case 'ie' || 'co':
        state.locale = 'en-IE'
        state.domain = 'ie';
        state.urlDomain = 'com.co';
        state.CType = 'EUR';
        state.CSymbol = '€';
        state.DFormat = 'DD-MM-YYYY';
        state.countryDF = 'DD/MM/YYYY';
        break;

      default:
        state.domain = 'us';
        state.urlDomain = 'com';
        state.CType = 'USD';
        state.CSymbol = '$';
        state.DFormat = 'MM-DD-YYYY';
        state.countryDF = 'MM/DD/YYYY';
    }

    commit('setSiteScopeM', state);

    let ckDomain = [];

    for (
      let ckDomain = window.location.hostname.split('.');
      2 < ckDomain.length;

    ) {
      ckDomain.shift();
    }

    let ck = ';domain=' + ckDomain.join('.');

    document.cookie =
      'googtrans=/en/es; expires=Thu, 07-Mar-2047 20:22:40 GMT; path=/' + ck;
  },

  setRouteHistory({ commit }, { HISTORY }) {
    commit('setRouteHistoryM', HISTORY);
  },
};

const getters = {
  routeHistory(state) {
    return state.history;
  },
  envInfo(state) {
    return {
      domain: state.domain,
      urlDomain: state.urlDomain,
      CType: state.CType,
      CSymbol: state.CSymbol,
      DFormat: state.DFormat,
      countryDF: state.countryDF,
      activeTripLink: state.activeTripLink,
      history: state.history,
    };
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
