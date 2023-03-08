<template>
  <div>
    <section class="hotel-search-filter">
      <v-container>
        <v-form ref="form" class="" lazy-validation>
          <div class="banner-section">
            <div class="banner-section-box">
              <div class="car-inner-left-box">
                <h6>PICK-UP</h6>
                <p>
                  <i class="fas fa-map-marker-alt"></i>
                  <strong>
                    {{
                      carSearchFilters.searchData
                        ? carSearchFilters.searchData.pickUp.locationName
                        : ''
                    }}
                  </strong>
                </p>
                <p>
                  <i class="far fa-calendar-alt"></i>
                  {{
                    carSearchFilters.searchData
                      ? justFormatMyDate(
                          carSearchFilters.searchData.pickUp.date,
                          fullDateFormat()
                        )
                      : ''
                  }}
                </p>
              </div>
              <div class="car-inner-left-box">
                <h6>DROP-OFF</h6>
                <p>
                  <i class="fas fa-map-marker-alt"></i>
                  <strong>
                    {{
                      carSearchFilters.searchData
                        ? carSearchFilters.searchData.dropOff.locationName
                        : ''
                    }}
                  </strong>
                </p>
                <p>
                  <i class="far fa-calendar-alt"></i>

                  {{
                    carSearchFilters.searchData
                      ? justFormatMyDate(
                          carSearchFilters.searchData.dropOff.date,
                          fullDateFormat()
                        )
                      : ''
                  }}
                </p>
              </div>
            </div>
          </div>

          <div class="title-heading">
            <h1 class="blue-heading">Car Search</h1>
          </div>
          <div class="search-card">
            <div class="search-radio-buttons">
              <v-radio-group
                v-model="mainLocation"
                required
                :rules="mainLocationRules"
                column
              >
                <ul>
                  <li>
                    <v-radio
                      label="Airport Locations"
                      color="primary"
                      value="Airport"
                      name="search_main_location"
                      :checked="checked"
                    />
                  </li>
                  <li>
                    <v-radio
                      label="City Locations"
                      color="primary"
                      value="City"
                      name="search_main_location"
                    />
                  </li>
                </ul>
              </v-radio-group>
            </div>
            <div class="search-form">
              <div class="mobile-search-bg">
                <a href="#" v-on:click="showSearchFields">
                  <v-input
                    :error-messages="['']"
                    error
                    disabled
                    prepend-icon="fas fa-search"
                  >
                    {{ mobilePickDetails }}
                  </v-input>
                  <v-icon color="white">fas fa-long-arrow-alt-down </v-icon>
                </a>
              </div>

              <ul class="mobile-search-form">
                <li>
                  <small class="pl-2">Pick-up Location</small>
                  <div class="single-input">
                    <CarLocation
                      :value="pickUpLocation"
                      @input="pickUpSelected"
                      :mainLocation="mainLocation"
                      :isDetailPage="true"
                    />
                  </div>
                </li>

                <li class="mob-list-none pickup-car">
                  <small>Pick-up Date and Time</small>
                  <div class="single-input">
                    <div style="" class="input-icon">
                      <!-- Date Picker Work -->
                      <Calendar
                        v-model="checkInDate"
                        :minimumDate="minimumCheckInDate"
                        :hideLabel="true"
                        @input="checkInSelected()"
                      />

                      <!-- Date Picker Work -->
                    </div>
                    <div class="date-box">
                      <v-select
                        class="date"
                        :label="!dftPickingTimes ? '10:30 AM' : ''"
                        :items="pickingTimes"
                        item-text="title"
                        item-value="value"
                        v-model="dftPickingTimes"
                      />
                    </div>
                  </div>
                </li>
                <li>
                  <small class="pl-2">Drop-off Location</small>

                  <div class="single-input">
                    <CarLocation
                      v-model="dropOffLocation"
                      :mainLocation="mainLocation"
                      :isDetailPage="true"
                    />
                  </div>
                </li>

                <li class="mob-list-none drop_off pickup-car">
                  <small>Drop-off Date and Time</small>
                  <div class="single-input">
                    <div class="input-icon">
                      <!--DATEPICKER2-->
                      <Calendar
                        v-model="checkOutDate"
                        :hideLabel="true"
                        :minimumDate="minimumCheckOutDate"
                      />
                      <!--DATEPICKER2-->
                    </div>
                    <div class="date-box">
                      <v-select
                        class="date"
                        :label="!dftDropingTimes ? '10:30 AM' : ''"
                        :items="pickingTimes"
                        item-text="title"
                        item-value="value"
                        v-model="dftDropingTimes"
                      />
                    </div>
                  </div>
                </li>
                <li class="mob-list-none">
                  <small>Driver's Age</small>
                  <div class="single-input">
                    <v-text-field
                      placeholder="Enter Driver’s age"
                      :rules="driverAgeRules"
                      v-model="inDriverAge"
                    />
                  </div>
                </li>
                <li class="submitBtn">
                  <div class="single-input">
                    <v-btn
                      color="error"
                      @click="submitForm"
                      ref="srchMainBtn"
                      class="btn-sm car-search-btn"
                    >
                      <i class="fas fa-search"></i>
                      <strong>SEARCH</strong>
                    </v-btn>
                  </div>
                </li>
                <div class="up-arrow">
                  <v-icon v-on:click="hideSearchFields" color="primary"
                    >fas fa-long-arrow-alt-up
                  </v-icon>
                </div>
              </ul>
            </div>
          </div>
        </v-form>
        <a class="clear-listing-btn" @click="clearFilter()"> Clear All</a>
      </v-container>
    </section>

    <v-container>
      <div v-if="hasApiError" class="search-heading">
        <div class="important-text-to-car">
          <p>
            <i class="fas fa-info"></i>

            {{ apiMessage }}
          </p>
        </div>
      </div>
    </v-container>

    <!-- Car Desktop Filter Component  -->
    <CarDesktopFilter
      v-if="!hasApiError"
      :freshlyMount="freshlyMount"
      :totalResults="cars.length"
      :sortByOption="sortByOption"
      @onDesktopFilterData="filtersDataShow"
      ref="carFilter"
      :calculateAdvanceResults="calculateAdvanceResults"
    />
    <section class="listing-wrapper engine_listing_list">
      <v-container>
        <v-row>
          <!-- Car Listing Component -->
          <CarResults
            v-if="!hasApiError"
            :panel="panel"
            :searchAgain="doMakeSearchAgainDetails"
            :results="results"
          />

          <!--adding trip summary-->
          <TripSummary />
        </v-row>
      </v-container>
      <template v-if="!hasApiError">
        <div class="text-center" v-if="cars.length">
          <v-pagination
            v-model="currentPage"
            :length="totalPageIndexes"
            :total-visible="totalVisibleIndexes"
            @input="handlePageChange"
          ></v-pagination>
        </div>
      </template>
    </section>

    <!--Mobile Filter Dialog-->
    <CarMobileFilter
      v-model="filtersData"
      :freshlyMount="freshlyMount"
      :totalResults="cars.length"
      ref="carFilter"
      :sortByOption="sortByOption"
      @onMobileFilterData="mobileFilterData"
      :calculateMobileResults="calculateMobileResults"
    />
  </div>
</template>
<script>
var moment = require('moment');

import { mapState } from 'vuex';
import TripSummary from '@/components/common/widgets/TripSummary.vue';
import * as dataKey from '@/services/data/dsources.js';
import { evBus } from '@/services/bus.js';
import cartHelper from '@/helper/addCartHelper';
import carServices from '@/services/api/Cars';
import CarResults from './CarResults.vue';
import CarDesktopFilter from './filter/CarDesktopFilter.vue';
import CarMobileFilter from './filter/CarMobileFilter.vue';
import CarLocation from '@/components/common/cars/CarLocation.vue';
import Calendar from '@/components/common/Calendar.vue';
import {
  formattedDate,
  nextDay,
  addDayToDate,
  getVeryNextDate,
} from '@/components/common/utils';

export default {
  name: 'CarDetails',
  mixins: [cartHelper],
  components: {
    TripSummary,
    CarResults,
    CarDesktopFilter,
    CarMobileFilter,
    CarLocation,
    Calendar,
  },
  data() {
    return {
      filtersData: {
        mobileFilterDialog: false,
        sortFilter: false,
      },
      hasApiError: false,
      pickingTimes: [],
      panel: null,
      checked: true,

      dftPickingTimes: '12:00:00',
      dftDropingTimes: '12:00:00',

      options: [],
      results: [],
      cars: [],
      sdriverAge: '',
      inDriverAge: '',
      apiMessage: '',
      mobilePickDetails: '',
      token: null,
      carSearchId: null,
      carSearchInProgress: false,
      mainLocation: 'Airport',
      checkTripOfUserCar: false,
      mainLocationRules: [
        (v) => !!v || 'At least one location should be selected',
      ],
      driverAgeRules: [
        (v) => !!v || 'Driver Age is required',
        (v) => (v && v >= 17) || 'The driver age must be at least 17.',
        (v) => (v && v <= 99) || 'The driver age may not be greater than 99.',
      ],

      sortCarBy: 'ALL',
      freshlyMount: false,
      updatedCount: 0,

      carFilterCallInProgress: false,

      pickUpLocation: {
        name: '',
        result: '',
      },
      dropOffLocation: {
        name: '',
        result: '',
      },
      checkInDate: null,
      checkOutDate: null,
      minimumCheckInDate: getVeryNextDate(
        new Date(new Date().setDate(new Date().getDate()))
      ),
    };
  },
  computed: {
    ...mapState({
      carSearchFilters: (state) => state.carStore,
      CType: (state) => state.envStore.CType,
      DFormat: (state) => state.envStore.DFormat,
      countryDF: (state) => state.envStore.countryDF,
      domain: (state) => state.envStore.domain,
    }),
    minimumCheckOutDate() {
      return addDayToDate(this.checkInDate);
    },

    compDropDateFormatted() {
      return formattedDate(this.checkOutDate, this.countryDF);
    },
    compPickDateFormatted() {
      return formattedDate(this.checkInDate, this.countryDF);
    },

    totalPageIndexes() {
      return this.totalPages;
    },
  },

  created() {
    this.scrollToTop();

    this.$on('results', (results) => {
      this.results = results;
    });

    evBus.$on('checkOutCar', (engineItem) => {
      this.openCheckOutPopUp('car', this.doCleanArray(engineItem));
    });

    evBus.$on('searchCarAgain', () => {
      this.doMakeSearchAgain();
    });

    evBus.$on('carResearchExpireItemOfTrip', () => {
      setTimeout(
        function () {
          this.checkExpireItemOfCar();
        }.bind(this),
        3000
      );
    });
  },
  beforeDestroy() {
    evBus.$off('saveCarInTrip');
  },
  mounted() {
    this.focusedEngine = 'car';
    this.freshlyMount = true;
    this.options = dataKey.driverAgeOptions;
    this.pickingTimes = dataKey.pickingTimes;
    this.sdriverAge = this.inDriverAge;

    if (this.$route.query.token) {
      this.$store.dispatch('appliedCarFilterFalse');
      this.$store.dispatch('falsifyErrorLogin');

      let token = this.$route.query.token;
      this.token = token;
      this.carSearchId = this.$route.query.searchId;

      let _cadeLoggedUser = { token: this.token };

      this.$store.dispatch('setUserToken', {
        payload: _cadeLoggedUser,
      });

      this.checkUserAlive().then((rsp) => {
        if (rsp == 'error_user_alive') return false;

        // case for carsearchId and token
        if (
          this.token != null &&
          this.token != '' &&
          typeof this.token != 'undefined' &&
          typeof this.carSearchId != 'undefined'
        ) {
          this.checkTripOfUserCar = true;
          this.doSearchCarById();
          this.$store.dispatch('setSearchedCarAttempt');
        } else {
          return false;
        }

        // case for customer invitation token
        if (
          this.token != null &&
          this.token != '' &&
          typeof this.token != 'undefined' &&
          typeof this.carSearchId == 'undefined'
        )
          this.$store.dispatch('customerInviteToken', {
            payload: { token: this.token },
          });

        return false;
      }); // user alive asyc check
      return false;
    } // Ends IF ELSE

    // populate main filters
    this.populateMainFilters();
    // populate advance filters
    this.populateAdvanceFilters().then(() => {
      // calculate pagination and display items per page
      // this.freshlyMount = false;
      this.calculateAdvanceResults();
    });

    this.populateMobileFilters();
    this.checkExpireItemOfCar();
  },
  updated: function () {
    this.freshlyMount = false;
    this.updatedCount = parseInt(this.updatedCount) + 1;
  },
  methods: {
    checkInSelected() {
      let nextDayValue = nextDay(this.checkInDate, this.checkOutDate);
      if (nextDayValue) {
        this.checkOutDate = nextDayValue;
      }
    },
    pickUpSelected(result) {
      this.pickUpLocation = { ...result };
      this.dropOffLocation = { ...this.pickUpLocation };
    },
    clearFilter() {
      this.checkInDate = null;
      this.checkOutDate = null;

      this.inDriverAge = '30';
      this.dftPickingTimes = '12:00:00';
      this.dftDropingTimes = '12:00:00';

      this.pickUpLocation = {
        name: '',
        result: '',
      };
      this.dropOffLocation = {
        name: '',
        result: '',
      };
    },
    // get desktop filter  value from child component
    filtersDataShow(data) {
      this.sliderValue = data.sliderValue;
      this.distance    = data.distance;
      this.selTransmission = data.selTransmission;
      this.selRentalCompany = data.selRentalCompany;
      this.selCarType = data.selCarType;
      this.sortBy = data.sortBy;
    },
    // get mobile filter  value from child component
    mobileFilterData(data) {
      this.mbSliderValue = data.mbSliderValue;
      this.mbSelCarType = data.mbSelCarType;
      this.distance     =  data.distance;
      this.mbSelTransmission = data.mbSelTransmission;
      this.mbSelRentalCompany = data.mbSelRentalCompany;
      this.sortBy = data.sortBy;
    },
    doSearchCarById() {
      // localStorage.removeItem('carExternalProcess');

      if (this.carSearchInProgress) return;

      this.carSearchInProgress = true;

      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token,
        },
      };

      let reqPayLoad = { searchId: this.carSearchId };

      carServices
        .getCarBySearchId(reqPayLoad, reqHeaders)
        .then((rsp) => {
          if (
            rsp.data.success == false &&
            rsp.data.message ==
              'Could not decode token: Error while decoding to JSON: Malformed UTF-8 characters, possibly incorrectly encoded'
          ) {
            this.$router.push('/no-auth').catch(() => {});
          } else if (
            rsp.data.success == false &&
            rsp.data.message == 'Wrong number of segments'
          ) {
            this.$router.push('/no-auth').catch(() => {});
          } else if (
            rsp.data.success == false &&
            rsp.data.message == 'Token Signature could not be verified'
          ) {
            this.$router.push('/no-auth').catch(() => {});
          } else {
            //  SETUP DETAILS FOR LOGGED IN USER
            let _cadeLoggedUser = {
              data: [
                {
                  userType: rsp.data.data.agentData.userType,
                  agent: {
                    iAgentID: rsp.data.data.agentData.pin,
                    vcPIN: rsp.data.data.agentData.pin,
                    vcEmail: rsp.data.data.agentData.email,
                    vcFName: rsp.data.data.agentData.first_name,
                    vcMName: '',
                    vcLName: rsp.data.data.agentData.last_name,
                  },
                },
              ],
              token: this.token,
              auth: true,
            };

            this.$store.dispatch('setAuthentication', {
              payload: _cadeLoggedUser,
            });

            this.$store.state.carStore = {};

            let cRespond = rsp.data;
            let _pickObj = {
              LABEL: rsp.data.data.searchData.pickUp.locationName,
              VALUE: rsp.data.data.searchData.pickUp.locationKey,
              CODE: '',
            };
            let _dropObj = {
              LABEL: rsp.data.data.searchData.dropOff.locationName,
              VALUE: rsp.data.data.searchData.dropOff.locationKey,
              CODE: '',
            };

            cRespond.pickLocations = JSON.parse(JSON.stringify([_pickObj]));
            cRespond.dropLocations = JSON.parse(JSON.stringify([_dropObj]));
            cRespond.spickLocations = JSON.parse(JSON.stringify(_pickObj));
            cRespond.sdropLocations = JSON.parse(JSON.stringify(_dropObj));
            cRespond.sDriverAge = rsp.data.data.searchData.driversAge;
            cRespond.sInDriverAge = rsp.data.data.searchData.driversAge;
            cRespond.mainLocation = 'Airport';
            let that = this;
            this.$store
              .dispatch('setSearchedCarDetails', {
                SRCH_CAR_RESPOND: cRespond,
              })
              .then(() => {
                that.cars = that.makeTabAbles(
                  that.doCleanArray(
                    rsp.data.data.data == undefined ? [] : rsp.data.data.data
                  )
                );

                that.doMakePaginations(that.cars);

                that.makeDisplayItems();

                // Reset store again
                that.$store.dispatch('userDetails', {
                  payload: rsp.data,
                });

                that.$nextTick(() => {
                  that.freshlyMount = true;
                  that.selTransmission = ['Any'];
                  that.freshlyMount = true;
                  that.selRentalCompany = ['Any'];
                  that.freshlyMount = true;
                  that.selCarType = ['Any'];
                  that.freshlyMount = true;
                  that.sortBy = 'FinalPrice-asc-false';
                  that.freshlyMount = true;
                  that.sortCarBy = 'ALL';
                  that.freshlyMount = true;
                  that.panel = null;

                  // For Mobile FIlters
                  that.freshlyMount = true;
                  that.mbSelCarType = ['Any'];
                  that.freshlyMount = true;
                  that.mbSelTransmission = ['Any'];
                  that.freshlyMount = true;
                  that.mbSelRentalCompany = ['Any'];
                });

                that.$forceUpdate();

                evBus.$emit('populateMobileDesktopFilter');

                that.populateMainFilters();

                that.$forceUpdate();

                evBus.$emit('resetDefaultFilter');

                if (rsp.data.success == false) {
                  this.hasApiError = true;
                  this.apiMessage = rsp.data.message;
                }
              });
          } // Outer IF
        })
        .catch((err) => {
          let that = this;
          that.$sentry.withScope(function (scope) {
            scope.setExtra(
              'sessionId',
              that.$store.state.carStore.carSearchedId
            );
            that.$sentry.captureException(new Error(err));
          });
          // this.$router.push('/no-auth');
        })
        .finally(() => {
          this.carSearchInProgress = false;

          if (this.checkTripOfUserCar && this.tripExist)
            this.verifyTripByUser();

          this.checkTripOfUserCar = false;
        });

      ////////////////
    },

    showSearchFields: function () {
      // eslint-disable-next-line no-undef
      $(document).find('.mobile-search-form').addClass('car-show-form ');

      // eslint-disable-next-line no-undef
      $(document).find('.mobile-search-bg').addClass('hid-blue-bg');
    },
    hideSearchFields: function () {
      // eslint-disable-next-line no-undef
      $(document).find('.mobile-search-form').removeClass('car-show-form ');

      // eslint-disable-next-line no-undef
      $(document).find('.mobile-search-bg').removeClass('hid-blue-bg');
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },

    openCheckOutPopUp: function (engine, infos) {
      let that = this;

      let _myDatecheckin = that.compPickDateFormatted;
      let _myDatecheckout = that.compDropDateFormatted;

      if (this.domain == 'uk' || this.domain == 'mx' || this.domain == 'ie') {
        _myDatecheckin = _myDatecheckin.split('/');
        _myDatecheckin =
          _myDatecheckin[1] + '/' + _myDatecheckin[0] + '/' + _myDatecheckin[2];

        _myDatecheckout = _myDatecheckout.split('/');
        _myDatecheckout =
          _myDatecheckout[1] +
          '/' +
          _myDatecheckout[0] +
          '/' +
          _myDatecheckout[2];
      }

      let _pickTime = _myDatecheckin + ' ' + that.dftPickingTimes;
      let _dropTime = _myDatecheckout + ' ' + that.dftDropingTimes;

      /*
      _pickTime = moment(
        _pickTime,
        'YYYY-MM-DD' + ' hh:mm A'
      ).unix();

      _dropTime = moment(
        _dropTime,
        'YYYY-MM-DD' + ' hh:mm A'
      ).unix();
      */

      _pickTime = moment(_pickTime).unix();
      _dropTime = moment(_dropTime).unix();

      infos.pdate = moment(_pickTime, 'X').format('YYYY-MM-DDTHH:mm:ss');
      infos.plocationName = this.pickUpLocation.result.LABEL;
      infos.ptime = moment(_pickTime, 'X').format('HH:mm:ss');
      infos.ddate = moment(_dropTime, 'X').format('YYYY-MM-DDTHH:mm:ss');
      infos.dlocationName = this.dropOffLocation.result.LABEL;
      infos.dtime = moment(_dropTime, 'X').format('HH:mm:ss');

      let searchedClock = this.doCleanArray(
        this.$store.state.carStore.carSearchClock
      );
      searchedClock.remaining = searchedClock.remaining.split(':');

      infos.engineId = infos.Id;
      infos.remaining = searchedClock.remaining;
      infos.expire = false;
      infos.showTimes = true;
      let cader = {
        engine: engine,
        item: infos,
      };
      this.$store.dispatch('setCartUpComings', { UPCOMINGS: cader });
      evBus.$emit('openCheckOutPopUp', engine, infos);
      this.doClosePop();
    },

    makeTabAbles: function (arrOfObj) {
      if (typeof arrOfObj === 'undefined') return [];

      let result = arrOfObj.map(function (el) {
        var o = Object.assign({}, el);
        o.tab = null;
        o.expanded = false;
        o.details = false;
        return o;
      });
      return result;
    },

    doMakeSearchAgain: function () {
      this.$store.dispatch('resetSearchId');
      this.freshlyMount = true;
      this.populateMainFilters();
      this.freshlyMount = true;
      this.populateAdvanceFilters();
      this.freshlyMount = true;
      this.populateMobileFilters();
      this.$awn.success(
        'Your being timed out due to inactivity, Please checkout again !'
      );
      this.$refs.srchMainBtn.$el.click();
    },
    doMakeSearchAgainDetails: function () {
      this.$store.dispatch('resetSearchId');
      this.freshlyMount = true;
      this.populateMainFilters();
      this.freshlyMount = true;
      this.populateAdvanceFilters();
      this.freshlyMount = true;
      this.populateMobileFilters();
      this.$awn.success(
        'Your being timed out due to inactivity, Please try show detail again!'
      );
      this.$refs.srchMainBtn.$el.click();
    },
    checkExpireItemOfCar() {
      if (this.$store.state.cartStore.lastExpireItemEngine == 'car') {
        if (this.$store.state.cartStore.lastExpireInModeOf == 'direct') {
          this.$store.dispatch('resetSearchId');
          this.freshlyMount = true;
          this.populateMainFilters();
          this.freshlyMount = true;
          this.populateAdvanceFilters();
          this.freshlyMount = true;
          this.populateMobileFilters();

          var that = this;

          setTimeout(function () {
            that.$refs.srchMainBtn.$el.click();
            // that.$store.dispatch("resetExpireItemSearchedDetails");
          }, 300);
        }

        if (this.$store.state.cartStore.lastExpireInModeOf == 'trip') {
          this.freshlyMount = true;

          let _carExpiredDetails =
            this.$store.state.cartStore.lastExpireItemDetail;
          _carExpiredDetails = this.doCleanArray(_carExpiredDetails);

          if (typeof _carExpiredDetails.details == 'string')
            _carExpiredDetails.details = JSON.parse(_carExpiredDetails.details);

          let cRespond = _carExpiredDetails.details.searchData,
            that = this;

          let _pickObj = {
            LABEL: cRespond.pickUp.locationName,
            VALUE: cRespond.pickUp.locationKey,
            CODE: '',
          };
          let _dropObj = {
            LABEL: cRespond.dropOff.locationName,
            VALUE: cRespond.dropOff.locationKey,
            CODE: '',
          };

          // Main Filters Populations Starts
          this.mobilePickDetails = '';
          this.mainLocation = 'Airport';

          this.pickUpLocation = {
            name: cRespond.pickUp.locationName,
            result: _pickObj,
          };

          this.mobilePickDetails = cRespond.pickUp.locationName;

          this.dropOffLocation = {
            name: cRespond.dropOff.locationName,
            result: _dropObj,
          };

          this.sdriverAge = cRespond.driversAge;

          this.inDriverAge = cRespond.driversAge;

          let myPickTime = cRespond.pickUp.date;
          let myDropTime = cRespond.dropOff.date;
          this.checkInDate = moment(myPickTime).format('YYYY-MM-DD');
          this.checkOutDate = moment(myDropTime).format('YYYY-MM-DD');
          this.dftPickingTimes = moment(myPickTime).format('HH:mm:ss');
          this.dftDropingTimes = moment(myDropTime).format('HH:mm:ss');

          setTimeout(
            function () {
              that.$refs.srchMainBtn.$el.click();

              // that.$store.dispatch("resetExpireItemSearchedDetails");
            }.bind(this),
            300
          );
        }
      } // If last expired item was car
    },
    submitForm() {
      let valid = this.$refs.form.validate();
      let validTime = false;
      let that = this;
      let _pickTime = that.compPickDateFormatted + ' ' + that.dftPickingTimes;
      let _dropTime = that.compDropDateFormatted + ' ' + that.dftDropingTimes;
      _pickTime = moment(
        _pickTime,
        this.$store.state.envStore.DFormat + ' hh:mm A'
      ).unix();
      _dropTime = moment(
        _dropTime,
        this.$store.state.envStore.DFormat + ' hh:mm A'
      ).unix();
      if (_pickTime == _dropTime) {
        if (
          // eslint-disable-next-line no-undef
          $('.pickup').parent('div').find('.v-messages__message').length == 0
        )
          // eslint-disable-next-line no-undef
          $('<div/>', {
            class: 'v-messages__message',
            text: 'Pick-up time must be earlier',
            style:
              'margin-top: -4px!important; font-size: 11px!important; color:#ff5252 !important;',
            // eslint-disable-next-line no-undef
          }).appendTo($('.pickup').parent('div'));
        if (
          // eslint-disable-next-line no-undef
          $('.dropoff').parent('div').find('.v-messages__message').length == 0
        )
          // eslint-disable-next-line no-undef
          $('<div/>', {
            class: 'v-messages__message',
            text: 'Drop-off Time must be later',
            style:
              'margin-top: -4px!important; font-size: 11px!important; color:#ff5252 !important;',
            // eslint-disable-next-line no-undef
          }).appendTo($('.dropoff').parent('div'));
        validTime = false;
      } else {
        // eslint-disable-next-line no-undef
        $('.v-messages__message').text('');
        validTime = true;
      }
      if (valid && validTime) {
        let that = this;

        let pickPayload = {
          date: moment(_pickTime, 'X').format('YYYY-MM-DDTHH:mm:ss'),
          locationKey: this.pickUpLocation.result.VALUE,
          locationName: this.pickUpLocation.result.LABEL,
          time: moment(_pickTime, 'X').format('HH:mm:ss'),
        };
        let dropPayload = {
          date: moment(_dropTime, 'X').format('YYYY-MM-DDTHH:mm:ss'),
          locationKey: this.dropOffLocation.result.VALUE,
          locationName: this.dropOffLocation.result.LABEL,
          time: moment(_dropTime, 'X').format('HH:mm:ss'),
        };
        // set the mobile display
        that.mobilePickDetails = pickPayload.locationName;
        // dynamically build on search button
        let reqPayLoad = {
          desiredResultCurrency: this.CType,
          pickUp: pickPayload,
          dropOff: dropPayload,
          driversAge: this.inDriverAge,
          residency: '',
          searchId: this.$store.state.carStore.carSearchedId,
        };
        let reqHeaders = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        carServices
          .searchCars(reqPayLoad, reqHeaders)
          .then((rsp) => {
            console.log('car sessionID', rsp.data.data.sessionId);
            if (
              rsp.data.success == false &&
              rsp.data.message == 'Token has expired'
            ) {
              this.doPopLogout();
              return true;
            } else {
              that.$store.dispatch('appliedCarFilterFalse');

              that.hasApiError = false;
              that.cars = that.makeTabAbles(
                that.doCleanArray(
                  rsp.data.data.data == undefined ? [] : rsp.data.data.data
                )
              );
              that.doMakePaginations(that.cars);
              that.makeDisplayItems();
              // Reset store again
              that.$store.dispatch('userDetails', {
                payload: rsp.data,
              });
              let cRespond = rsp.data;

              cRespond.spickLocations = JSON.parse(
                JSON.stringify(this.pickUpLocation.result)
              );
              cRespond.sdropLocations = JSON.parse(
                JSON.stringify(this.dropOffLocation.result)
              );
              cRespond.sDriverAge = JSON.parse(JSON.stringify(that.sdriverAge));
              cRespond.sInDriverAge = that.inDriverAge;
              cRespond.mainLocation = that.mainLocation;
              that.$store.dispatch('setSearchedCarClock', {
                SEARCHED_CLOCK: cRespond.carSearchClock,
              });
              that.$store
                .dispatch('setSearchedCarDetails', {
                  SRCH_CAR_RESPOND: cRespond,
                })
                .then(() => {
                  that.freshlyMount = true;
                  // that.selTransmission = ["Any"];
                  that.freshlyMount = true;
                  // that.selRentalCompany = ["Any"];
                  that.freshlyMount = true;
                  // that.selCarType = ["Any"];
                  that.freshlyMount = true;
                  // that.sortBy = "FinalPrice-asc";
                  that.freshlyMount = true;
                  that.sortCarBy = 'ALL';
                  that.freshlyMount = true;
                  that.panel = null;
                  that.populateAdvanceFilters();
                  that.populateMobileFilters();
                  that.$forceUpdate();
                  evBus.$emit('resetDefaultFilter', cRespond);
                  this.$refs.carFilter.defaultFilter();
                });
              if (!rsp.data.success) {
                that.hasApiError = true;
                that.apiMessage = rsp.data.message;
              }
            }
          })
          .catch((err) => {
            that.$sentry.withScope(function (scope) {
              scope.setExtra(
                'sessionId',
                that.$store.state.carStore.carSearchedId
              );
              that.$sentry.captureException(new Error(err));
            });
          });
        that.$store.dispatch('reSetCarTracker', {
          timePace: that.TimeTrackerMaxTime,
        });
        evBus.$emit('resetTracker');
        return true;
      }
    },
    populateMainFilters() {
      // pre-populate main filters
      this.mobilePickDetails = '';
      if (this.carSearchFilters.selMainLocation) {
        this.mainLocation = this.carSearchFilters.selMainLocation;
      }

      if (this.carSearchFilters.selPickLoc) {
        this.pickUpLocation = {
          name: this.carSearchFilters.selPickLoc.LABEL,
          result: this.carSearchFilters.selPickLoc,
        };
        this.mobilePickDetails = this.carSearchFilters.selPickLoc.LABEL;
      }
      if (this.carSearchFilters.selDropLoc) {
        this.dropOffLocation = {
          name: this.carSearchFilters.selDropLoc.LABEL,
          result: this.carSearchFilters.selDropLoc,
        };
      }
      if (this.carSearchFilters.selDriverAge) {
        this.sdriverAge = this.doCleanArray(this.carSearchFilters.selDriverAge);
      }
      if (this.carSearchFilters.selInDriverAge) {
        this.inDriverAge = this.doCleanArray(
          this.carSearchFilters.selInDriverAge
        );
      }
      if (this.carSearchFilters.searchData) {
        let _searchedPayload = this.doCleanArray(
          this.carSearchFilters.searchData
        );
        let myPickTime = _searchedPayload.pickUp.date;
        let myDropTime = _searchedPayload.dropOff.date;
        this.checkInDate = moment(myPickTime).format('YYYY-MM-DD');
        this.checkOutDate = moment(myDropTime).format('YYYY-MM-DD');
        this.dftPickingTimes = moment(myPickTime).format('HH:mm:ss');
        this.dftDropingTimes = moment(myDropTime).format('HH:mm:ss');
      }
    },

    makeDisplayItems: function () {
      let tripbooking = this.doCleanArray(
        this.$store.getters.tripSummary.trip_bookings
      );

      let arrOfObj = this.getPageData();

      arrOfObj.forEach((item) => {
        item.tab = null;
        item.expanded = false;
        let book = tripbooking.findIndex((x) => x.engineId == item.id);
        if (book != -1) {
          item.isBook = true;
        } else {
          item.isBook = false;
        }
      });

      this.results = arrOfObj;
    },
    handlePageChange(value) {
      this.panel = null;
      this.currentPage = value;
      this.makeDisplayItems();
      this.scrollToTop();
    },

    calculateAdvanceResults() {
      if (this.carFilterCallInProgress) return false;

      this.carFilterCallInProgress = true;
      
      if (this.carSearchInProgress) return false;

      if (this.freshlyMount) {
        this.freshlyMount = false;
        return false;
      }

      let that = this;
      let reqHeaders = {
        headers: { 'Content-Type': 'application/json' },
      };

      let reqPayLoad = {
        sessionId: this.$store.state.carStore.carSearchedId,
      };

      if (this.sliderValue.length > 0) {
        let pricesPayLoads = {
          min: this.sliderValue[0],
          max: this.sliderValue[1],
        };

        reqPayLoad.priceRange = JSON.stringify(pricesPayLoads);
      }

      if (this.distance.length > 0) {
        let distancePayLoads = {
          min: this.distance[0],
          max: this.distance[1],
        };

        reqPayLoad.distance = JSON.stringify(distancePayLoads);
      }
     if (this.sortBy) {
        let sortQuery = this.sortBy.split('-');
        let order = sortQuery[1];
        let indexKey = sortQuery[0];
        let sortPayload = {
          sortField: indexKey,
          sortOrder: order,
          sortIsString: true,
        };
        sortPayload.sortOn = this.sortCarBy;
        if (indexKey == 'FinalPrice') sortPayload.sortIsString = false;
        reqPayLoad.sortByField = JSON.stringify(sortPayload);
      }
      console.log(reqPayLoad.sortByField);
      
      if (this.selTransmission.length > 0) {
        if (this.selTransmission.join() != 'Any')
          reqPayLoad.transmission = this.selTransmission.join();
      }
      if (this.selRentalCompany.length > 0) {
        if (this.selRentalCompany.join() != 'Any')
          reqPayLoad.rentalCompany = this.selRentalCompany.join();
      }
      if (this.selCarType.length > 0) {
        if (this.selCarType.join() != 'Any')
          reqPayLoad.carType = this.selCarType.join();
      }
      console.log('reqPayLoad:',reqPayLoad);

      carServices
        .getFilterCars(reqPayLoad, reqHeaders)
        .then((rsp) => {
        
          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            this.doPopLogout();
            return true;
          }

          if (rsp.data.success == false && rsp.data.message != '') {
            that.apiMessage = rsp.data.message;
            that.resultSuccess = true;
          }
          that.panel = null;
          that.cars = that.makeTabAbles(that.doCleanArray(rsp.data.data.data));
          that.doMakePaginations(that.cars);
          that.makeDisplayItems();
          that.carFilterCallInProgress = false;

          that.$store.dispatch('appliedCarFilter', reqPayLoad);
        })
        .catch((err) => {
            if(err.data.message == 'Session Expired. Please initiate a new search request.'){
              this.$awn.success(
              'Your being timed out due to inactivity, Please search again !'
            );
            this.$refs.srchMainBtn.$el.click();
            return false;
            }
         
          that.$sentry.withScope(function (scope) {
            scope.setExtra(
              'sessionId',
              that.$store.state.carStore.carSearchedId
            );
            that.$sentry.captureException(new Error(err));
          });
        })
        .finally(() => {
          this.carFilterCallInProgress = false;
        });

      that.$store.dispatch('reSetCarTracker', {
        timePace: that.TimeTrackerMaxTime,
      });
      evBus.$emit('resetTracker');
    },
    calculateMobileResults() {
      this.filtersData.mobileFilterDialog = false;
      if (this.freshlyMount) {
        this.freshlyMount = false;
        return false;
      }
      let that = this;
      let reqHeaders = {
        headers: { 'Content-Type': 'application/json' },
      };

      let reqPayLoad = {
        sessionId: this.$store.state.carStore.carSearchedId,
      };

      if (this.mbSliderValue.length > 0) {
        let pricesPayLoads = {
          min: this.mbSliderValue[0],
          max: this.mbSliderValue[1],
        };

        reqPayLoad.priceRange = JSON.stringify(pricesPayLoads);
      }

      if (this.distance.length > 0) {
        let distancePayload = {
          min: this.distance[0],
          max: this.distance[1],
        };

        reqPayLoad.distance = JSON.stringify(distancePayload);
      }
      
      if (this.mbSelTransmission.length > 0) {
        if (this.mbSelTransmission.join() != 'Any')
          reqPayLoad.transmission = this.mbSelTransmission.join();
      }
      if (this.mbSelRentalCompany.length > 0) {
        if (this.mbSelRentalCompany.join() != 'Any')
          reqPayLoad.rentalCompany = this.mbSelRentalCompany.join();
      }
      if (this.mbSelCarType.length > 0) {
        if (this.mbSelCarType.join() != 'Any')
          reqPayLoad.carType = this.mbSelCarType.join();
      }

      if (this.sortBy  && !this.sortBy.includes('undefined')) {
        let sortQuery = this.sortBy.split('-');

        let order = sortQuery[1];
        let indexKey = sortQuery[0];
        indexKey=indexKey.charAt(0).toUpperCase() + indexKey.slice(1)
        let sortPayload = {
          sortField: indexKey,
          sortOrder: order,
          sortIsString: true,
        };

        sortPayload.sortOn = this.sortCarBy;

        if (indexKey == 'FinalPrice') sortPayload.sortIsString = false;

        reqPayLoad.sortByField = JSON.stringify(sortPayload);
      }

      carServices
        .getFilterCars(reqPayLoad, reqHeaders)
        .then((rsp) => {
          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            this.doPopLogout();
            return true;
          }
          that.panel = null;
          that.cars = that.makeTabAbles(that.doCleanArray(rsp.data.data.data));
          that.doMakePaginations(that.cars);
          that.makeDisplayItems();
        })
        .catch((err) => {
           if(err.data.message == 'Session Expired. Please initiate a new search request.'){
              this.$awn.success(
              'Your being timed out due to inactivity, Please search again !'
            );
            this.$refs.srchMainBtn.$el.click();
            return false;
            }
          that.$sentry.withScope(function (scope) {
            scope.setExtra(
              'sessionId',
              that.$store.state.carStore.carSearchedId
            );
            that.$sentry.captureException(new Error(err));
          });
        })
        .finally(() => {
          this.carFilterCallInProgress = false;
        });

      that.$store.dispatch('reSetCarTracker', {
        timePace: that.TimeTrackerMaxTime,
      });
      evBus.$emit('resetTracker');
    },

    sortByOption: function () {
      if (this.filtersData.sortFilter == true) {
        this.filtersData.sortFilter = false;
        this.calculateMobileResults();
        return false;
      }

      this.filtersData.sortFilter = false;
      this.calculateAdvanceResults();
    },
  },
  watch: {
    mainLocation() {
      if (!this.freshlyMount) {
        this.pickUpLocation = {
          name: '',
          result: '',
        };
        this.dropOffLocation = {
          name: '',
          result: '',
        };
      }
    },
  },
};
</script>

<style>
.datePickerDiv {
  position: relative;
  float: left;
  margin-top: -40px;
}
.datePickerDiv input {
  border: none;
  background: transparent;
}
.daterangepicker.show-calendar .drp-buttons {
  display: none !important;
}
.applyBtn {
  display: none;
}
.cancelBtn {
  display: none;
}
.single-input .v-text-field {
  padding-top: 0 !important;
}
.hasDatepicker {
  padding: 5px 0 17px;
  font-size: 15px;
}
.vs__dropdown-menu {
  display: block !important;
}
.vs__dropdown-toggle {
  max-height: 42px;
}
.v-tooltip,
.v-tooltip--top {
  padding: 0px !important;
  border: none !important;
}
.collpase-heading span {
  font-size: 14px !important;
  text-align: center;
  width: 100%;
}
.show_more {
  font-weight: bold;
  color: blue;
  color: #3030cc;
  cursor: pointer;
}
.search-card .search-form ul li .single-input button {
  height: 90px;
}
.drop_off {
  white-space: nowrap;
}
.selected_Car {
  background-color: #443c3e !important;
}/*
.sort_option {
  margin-left: 285px;
  margin-top: -7px;
}*/
.v-text-field__details {
  display: flex;
  flex: 1 0 auto;
  max-width: 288% !important;
  min-height: 14px;
  overflow: hidden;
}
.v-messages__message {
  margin: 8px 0;
  font-weight: 500;
  white-space: nowrap;
}
br {
  float: none;
  width: 100%;
  margin: 0;
}
</style>
