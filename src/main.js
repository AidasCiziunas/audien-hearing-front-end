import '@babel/polyfill';
import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store/index.js';
import mixins from './mixins';
import jQuery from 'jquery';
import daterangepicker from 'daterangepicker';
import VueAWN from 'vue-awesome-notifications';
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';
import VueMask from 'v-mask';
import VuetifyConfirm from 'vuetify-confirm';
import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import * as VueIntegrations from '@sentry/integrations';
import VueGtag from 'vue-gtag';
import '@/assets/css/front.css';
import "@/assets/css/fonts/lato/stylesheet.css";

import 'daterangepicker/daterangepicker.css';
import 'vue-awesome-notifications/dist/styles/style.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import { pusher } from './services/pusher';
Vue.prototype.$pusher = pusher;
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

Vue.component('vue-phone-number-input', VuePhoneNumberInput);
import {
  SENTRY_DSN,
  SENTRY_LOCALHOST,
  SENTRY_QAS_TRIPS,
  SENTRY_DEV_TRIPS,
  SENTRY_REGEX,
} from '@/enVars.js';

import GmapCluster from 'gmap-vue/dist/components/cluster';

import * as VueGoogleMaps from 'vue2-google-maps';

Vue.config.productionTip = false;
Vue.config.silent = false;
Vue.config.debug = false;
window.$ = jQuery;
Vue.use(VueAWN, { position: 'top-right' });
Vue.use(VueTelInputVuetify, { vuetify });
Vue.use(VuetifyConfirm, { vuetify });
Vue.use(VueMask);
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAP_KEY,
  },
});

Vue.component('GmapCluster', GmapCluster);

if (process.env.VUE_APP_GOOGLE_ANALYTICS != '')
  Vue.use(
    VueGtag,
    {
      appName: 'Audien',
      pageTrackerScreenviewEnabled: true,
      config: {
        id: process.env.VUE_APP_GOOGLE_ANALYTICS,
      },
    },
    router
  );

Sentry.init({
  Vue,
  environment: process.env.VUE_APP_ENV,
  dsn: SENTRY_DSN,
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: [
        SENTRY_LOCALHOST,
        SENTRY_DEV_TRIPS,
        SENTRY_QAS_TRIPS,
        SENTRY_REGEX,
      ],
    }),

    new VueIntegrations.Vue({
      Vue,
      attachProps: true,
      logErrors: true,
    }),
  ],

  trackComponents: true,
  attachStacktrace: true,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});


Vue.prototype.$sentry = Sentry;
const app = new Vue({
  router,
  store,
  vuetify,
  daterangepicker,
  VuePhoneNumberInput,
  mixins,
  render: (h) => h(App),
}).$mount('#app');

if (window.Cypress) {
  window.app = app;
}
