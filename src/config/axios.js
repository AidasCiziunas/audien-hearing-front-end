/*
    - axios centralized configurations
    - Each API Request logs/make:: Token Settings, Error Logs, Success Logs
*/
import axios from 'axios';
import localStorageService from './LocalStorageService';
import vars from '@/services/path';
import store from '@/store/';
import { evBus } from '@/services/bus.js';
const apiClient = axios.create({
  baseURL: vars.baseURL,
  // timeout: 20000, // indicates, 1000ms ie. 1 second
  headers: {
    Accept: 'application/json,text/plain, */*',
    'Content-Type': 'application/json',
  },
});

/*
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": "example-of-custom-header"
*/

// Includes Header Token In Every Call Beofre Requesting To Server/Domain

const authInterceptor = (config) => {
  if (config.headers.Authorization) {
    config.headers['Authorization'] =
      config.headers.Authorization.includes('Bearer') != true
        ? 'Bearer ' + config.headers.Authorization
        : config.headers.Authorization;
  } else {
    const authToken = store.getters.requestToken;
    if (authToken) config.headers['Authorization'] = 'Bearer ' + authToken;
  }

  return config;
};

const loader = (url) => {
  if (url) {
    let loadingValue = true;
    let data = url.split('/');
    let lastValue = data[data.length - 1].toLowerCase();
    switch (lastValue) {
      case 'me':
        loadingValue = false;
        break;
      case 'getlocation':
        loadingValue = false;
        break;
      case 'getsessionclock':
        loadingValue = false;
        break;
      case 'getcarlocation':
        loadingValue = false;
        break;
      case 'getactivitylocation':
        loadingValue = false;
        break;
      default:
        loadingValue = true;
        break;
    }
    return loadingValue;
  }
};

apiClient.interceptors.request.use(authInterceptor);

const refreshToken = (eConfigs) => {
  const originalRequest = eConfigs;

  return axios
    .post('/auth/token', {
      refresh_token: localStorageService.getRefreshToken(),
    })
    .then((res) => {
      if (res.status === 201) {
        localStorageService.setToken(res.data);

        axios.defaults.headers.common['Authorization'] =
          localStorageService.getAccessToken();

        return axios(originalRequest);
      }
    });
};

const errorInterceptor = ({ response }) => {
  console.error('API response error', response);

  // check if it's a server error
  if (!response) {
    setTimeout(() => {
      evBus.$emit('isLoading', false);
    }, 2000);
    return Promise.reject(response);
  }

  // all the error responses
  switch (response.status) {
    case 400:
      console.error(response.status, response.message);
      break;

    case 401: // authentication error, logout the user
      // notify.warn( 'Please login again', 'Session Expired');

      store.dispatch('resetExpireItemSearchedDetails');
      store.dispatch('resetCustomerDetails');
      store.dispatch('reSetCarLocations');
      store.dispatch('reSetTrip');
      store.dispatch('resetCart');
      window.location.href = process.env.VUE_APP_LOG_OUT_URL;
      if (store.state.authStore.token == false) {
        return false;
      }
      localStorage.removeItem('token');
      break;
    case 500:
      console.error(response.status, response.message);
      break;

    default:
      console.error('Server Error', response);
  }
  setTimeout(() => {
    evBus.$emit('isLoading', false);
  }, 3000);
  return Promise.reject(response);
};

// Interceptor for responses
const responseInterceptor = (response) => {
  if (loader(response.config.url)) {
    setTimeout(() => {
      evBus.$emit('isLoading', false);
    }, 3000);
  }

  return response;
};

// before a request is made start the nprogress
apiClient.interceptors.request.use((config) => {
  evBus.$emit('isLoading', loader(config.url));

  return config;
});

apiClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default apiClient;
