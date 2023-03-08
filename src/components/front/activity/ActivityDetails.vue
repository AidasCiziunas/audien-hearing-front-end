<template>
  <span style="display: block !important">
    <section class="hotel-search-filter">
      <v-container>
        <div class="banner-section">
          <div class="banner-section-box">
            <div class="hotel-inner-left-box">
              <p>
                <i class="fas fa-map-marker-alt"></i
                ><strong
                  >&nbsp;
                  {{
                    ActivityStore.searchData
                      ? ActivityStore.searchData.destinationName
                      : ''
                  }}
                </strong>
              </p>
              <p>
                <i class="far fa-calendar-alt"></i>
                Check In:
                {{
                  ActivityStore.searchData
                    ? justFormatMyDate(
                        ActivityStore.searchData.fromDate,
                        fullDateFormat()
                      )
                    : ''
                }}
                | Check Out:
                {{
                  ActivityStore.searchData
                    ? justFormatMyDate(
                        ActivityStore.searchData.toDate,
                        fullDateFormat()
                      )
                    : ''
                }}
              </p>
            </div>
            <div class="hotel-inner-right-box" style="padding-top: 60px"></div>
          </div>
        </div>

        <v-form ref="form" class="" lazy-validation>
          <div class="title-heading">
            <h1 class="blue-heading">Activity Search</h1>
          </div>
          <div class="mobile-search-bg mobile-search-hotel-bg">
            <a href="#" v-on:click="showSearchFields">
              <v-input
                :error-messages="['']"
                error
                disabled
                prepend-icon="fas fa-search"
              >
                {{ destination.name }}
              </v-input>
              <v-icon color="white">fas fa-long-arrow-alt-down </v-icon>
            </a>
          </div>
          <div class="search-card">
            <div class="hotel-search-form">
              <ul class="mobile-search-form">
                <li class="activitiy-destination-feild">
                  <small>Destination</small>
                  <div class="single-input">
                    <ActivityLocation
                      :value="destination"
                      @input="setResult"
                      :isDetailPage="true"
                    />
                  </div>
                </li>
                <li class="activity-check-feild">
                  <small>Check In</small>
                  <div class="single-input">
                    <div style="" class="input-icon">
                      <Calendar
                        v-model="checkInDate"
                        :minimumDate="minimumCheckInDate"
                        @input="checkInSelected()"
                        :hideLabel="true"
                      />
                    </div>
                  </div>
                </li>
                <li class="activity-check-feild">
                  <small>Check Out</small>
                  <div class="single-input">
                    <div style="" class="input-icon">
                      <Calendar
                        v-model="checkOutDate"
                        :hideLabel="true"
                        :minimumDate="minimumCheckOutDate"
                      />
                    </div>
                  </div>
                </li>

                <li class="hotel-submitBtn activity-submit-btn">
                  <div class="single-input">
                    <v-btn
                      color="error"
                      class="car-search-btn"
                      @click="submitForm"
                      ref="srchMainBtn"
                    >
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
        

        <section class="listing-wrapper2">
          <v-container>
            <a class="clear-listing-btn" @click="clearFilter()"> Clear All</a>
          </v-container>

          <v-container>
            <div v-if="apiMessage !== ''" class="search-heading">
              <div class="important-text-to-car">
                <p>
                  <i class="fas fa-info" style="color: blue"></i>
                  {{ apiMessage }}
                </p>
              </div>
            </div>
          </v-container>
          <ActivityDesktopFilter
            v-if="showFilter"
            :freshlyMount="freshlyMount"
            :totalResults="setActivityCount"
            ref="deskFilter"
            @onDesktopFilterData="filtersDataShow"
            :sortByOption="sortByOption"
            :calculateAdvanceResults="calculateAdvanceResults"
            :FilterActivityName="FilterActivityName"
            :allActivities="compActivitiesInSession"
          />
        </section>

        <section class="listing-wrapper">
          <v-container>
            <v-row>
              <ActivityListResult
                v-if="setActivityCount > 0"
                :panel="panel"
                @resetSearch="reinitSearch"
                :searchAgain="doMakeSearchAgainDetails"
                :results="results"
              />
              <!--adding trip summary-->
              <TripSummary />
            </v-row>
          </v-container>
          <template>
            <div class="text-center" v-if="activityCount > 0">
              <v-pagination
                v-if="setActivityCount > 0"
                v-model="currentPage"
                :length="totalPageIndexes"
                :total-visible="totalVisibleIndexes"
                @input="handlePageChange"
              />
            </div>
          </template>
        </section>
      </v-container>
    </section>
    <div class="text-center mdsr" v-if="activityCount > 0">
      <ActivityMobileFilter
        v-model="filtersData"
        :freshlyMount="freshlyMount"
        ref="mobFilter"
        :totalResults="setActivityCount"
        :sortByOption="sortByOption"
        @onMobileFilterData="mobileFilterData"
        :calculateMobileResults="calculateMobileResults"
      />
    </div>
  </span>
</template>

<script>
var moment = require('moment');

import { mapState } from 'vuex';
import ActivityServices from '@/services/api/Activity';
import { evBus } from '@/services/bus.js';
import ActivityDesktopFilter from './filter/ActivityDesktopFilter.vue';
import ActivityListResult from './ActivityListResult.vue';
import ActivityHelper from '@/helper/ActivityHelper.js';
import ActivityMobileFilter from './filter/ActivityMobileFilter.vue';
import TripSummary from '@/components/common/widgets/TripSummary.vue';
import ActivityLocation from '@/components/common/activity/ActivityLocation.vue';
import Calendar from '@/components/common/Calendar.vue';
import {
  formattedDate,
  nextDay,
  addDayToDate,
} from '@/components/common/utils';

export default {
  name: 'Activities',
  mixins: [ActivityHelper],
  components: {
    ActivityDesktopFilter,
    ActivityListResult,
    ActivityMobileFilter,
    TripSummary,
    ActivityLocation,
    Calendar,
  },
  data() {
    return {
      filtersData: {
        mobileFilterDialog: false,
        sortFilter: false,
      },

      destination: {
        name: '',
        result: '',
      },
      checkInDate: null,
      checkOutDate: null,
      showFilter: false,
      minimumCheckInDate: formattedDate(new Date(), this.countryDF),
      freshlyMount: false,
      panel: null,
      results: [],
      activities: [],
      setActivityCount: 0,
      sortActivityBy: 'ALL',
      activitySearchId: '',
      token: '',
      search: '',
      activitySearchInProgress: false,
      apiMessage: '',
      checkTripOfUserAct: false,
      makeActivityFilterCallInProcess: 0,
    };
  },

  destroyed() {
    evBus.$off('makeAdvFilterCallOfActivity');
  },

  mounted() {
    if (this.$route.query.token) {
      this.$store.dispatch('falsifyErrorLogin');

      let token = this.$route.query.token;
      this.token = token;
      this.activitySearchId = this.$route.query.searchId;
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
          typeof this.activitySearchId != 'undefined'
        ) {
          this.checkTripOfUserAct = true;
          this.doSearchActivityById();
        } else {
          return false;
        }

        // case for customer invitation token
        if (
          this.token != null &&
          this.token != '' &&
          typeof this.token != 'undefined' &&
          typeof this.activitySearchId == 'undefined'
        )
          this.$store.dispatch('customerInviteToken', {
            payload: { token: this.token },
          });

        return false;
      }); // user alive asyc check
    } else {
      this.initData();
    }

    this.checkExpireItemOfActivity();
  },

  beforeCreate: function () {
    // evBus.$emit('frontLayout');
  },

  created: function() {
    this.scrollToTop();

    this.$on('results', results => {
      this.results = results;
    });

    evBus.$on('ActivityResearchExpireItemOfTrip', () => {
      this.checkExpireItemOfActivity();
    });
  },

  computed: {
    ...mapState({
      ActivityStore: (state) => state.ActivityStore,
      searchData: (state) => state.ActivityStore.searchData,
      activityCount: (state) => state.ActivityStore.activitiesCount,
      filters: (state) => state.ActivityStore.filters,
      CType: (state) => state.envStore.CType,
      countryDF: (state) => state.envStore.countryDF,
    }),

    compActivitiesInSession(){
        return this.activities;
    },

    minimumCheckOutDate() {
      return addDayToDate(this.checkInDate);
    },

    totalPageIndexes() {
      return this.totalPages;
    },
  },

  methods: {
    clearFilter() {
      this.checkInDate = '';
      this.checkOutDate = '';
      this.destination = {
        name: '',
        result: '',
      };
    },

    checkInSelected() {
      let nextDayValue = nextDay(this.checkInDate, this.checkOutDate);
      if (nextDayValue) {
        this.checkOutDate = nextDayValue;
      }
    },

    checkExpireItemOfActivity() {
      if (this.$store.state.cartStore.lastExpireItemEngine == 'activity') {
        if (this.$store.state.cartStore.lastExpireInModeOf == 'trip') {
          let _hotelExpiredDetails = this.doCleanArray(
            this.$store.state.cartStore.lastExpireItemDetail
          );

          // pre-populate main filters
          setTimeout(() => {
            let _searchedPayload =
              _hotelExpiredDetails.details.searchData.searchData;

            let myPickTime = _searchedPayload.fromDate;
            let myDropTime = _searchedPayload.toDate;
            this.checkInDate = moment(myPickTime).format(this.countryDF);
            this.checkOutDate = moment(myDropTime).format(this.countryDF);

            this.destination = {
              name: _searchedPayload.destinationName,
              result: {
                id: _searchedPayload.destinationId,
                iataCode: _searchedPayload.destinationCode,
                name: _searchedPayload.destinationName,
              },
            };
          }, 2000);

          setTimeout(
            function () {
              // needed to reinit call on chekout

              this.$refs.srchMainBtn.$el.click();
            }.bind(this),
            2500
          );
        } // Ends IF Trip Mode
      } // If Activity Expired
    },

    initData() {
      if (this.activityCount > 0) {
        this.showFilter = true;
      } else {
        this.showFilter = false;
      }

      this.setActivityCount = this.activityCount;
      this.destination = {
        name: this.searchData.destinationName,
        result: {
          id: this.searchData.destinationId,
          iataCode: this.searchData.destinationCode,
          name: this.searchData.destinationName,
        },
      };

      this.checkInDate = moment(this.searchData.fromDate).format(
        this.countryDF
      );
      this.checkOutDate = moment(this.searchData.toDate).format(this.countryDF);
      this.SearchDataPopulate();

      evBus.$on('makeAdvFilterCallOfActivity', () => {
        setTimeout(() => {
          if (this.makeActivityFilterCallInProcess == 0) {
            this.makeActivityFilterCallInProcess = 1;
            this.freshlyMount = false;
            this.calculateAdvanceResults();
          }
        }, 1500);
      });
    },

    doSearchActivityById() {
      if (this.activitySearchInProgress) {
        return;
      }

      this.makeActivityFilterCallInProcess = 0;
      this.activitySearchInProgress = true;
      let that = this;
      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token,
        },
      };

      let reqPayLoad = {};
      reqPayLoad.searchId = this.activitySearchId;
      reqPayLoad.sortBy = 'asc';
      ActivityServices.getActivitiesBySearchId((reqHeaders, reqPayLoad))
        .then(rsp => {
          if (!rsp.data.success) {
            that.apiMessage = rsp.data.message;
            that.showFilter = false;
          }
          else if (
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
          }

          this.SearchDataPopulate();
          this.$emit('resetDskFilterCounter');
          that.setActivityCount = rsp.data.data.activities.length;
          that.activities = that.makeTabAbles(
            that.doCleanArray(rsp.data.data.activities)
          );
          that.doMakePaginations(that.activities);
          that.makeDisplayItems();

          this.$store.dispatch('userDetails', { payload: rsp.data });

          let cRespond = rsp.data;
          that.$store.dispatch('reSetActivityLocations');

          that.$store
            .dispatch('setSearchedActivityDetails', {
              SRCH_CAR_RESPOND: cRespond,
            })

            .then(() => {
              that.selCategories = ['Any'];
              that.selSubCategories = ['Any'];
              that.selstarRating = ['Any'];
              that.sortBy = 'finalPrice-asc-false';
              that.sortActivityBy = 'ALL';
              that.panel = null;
              that.populateAdvanceFilters();
              that.$forceUpdate();
            })
            .catch((err) => {
              that.$sentry.withScope(function (scope) {
                scope.setExtra('sessionId', this.ActivityStore.sessionId);
                that.$sentry.captureException(new Error(err));
              });
            })
            .finally(() => {
              this.activitySearchInProgress = false;
            });
          this.initData();
        })
        .finally(() => {
          if (this.checkTripOfUserAct && this.tripExist)
            this.verifyTripByUser();

          this.checkTripOfUserAct = false;
        });
    },

    showSearchFields: function () {
      // eslint-disable-next-line no-undef
      $(document).find('.mobile-search-form').addClass('car-show-form');

      // eslint-disable-next-line no-undef
      $(document).find('.mobile-search-bg').addClass('hid-blue-bg');
    },
    hideSearchFields: function () {
      // eslint-disable-next-line no-undef
      $(document).find('.mobile-search-form').removeClass('car-show-form ');

      // eslint-disable-next-line no-undef
      $(document).find('.mobile-search-bg').removeClass('hid-blue-bg');
    },
    reinitSearch() {
      this.submitForm();
    },

    filtersDataShow(data) {
      this.sliderValue = data.sliderValue;
      this.selstarRating = data.selstarRating;
      this.selCategories = data.selCategories;
      (this.selActivityName = data.selActivityName),
        (this.selSubCategories = data.selSubCategories);
      this.sortBy = data.sortBy;
      this.selActivityName = data.selActivityName;
    },

    mobileFilterData(data) {
      this.mblSliderValue = data.mblSliderValue;
      this.mblselStarRating = data.mblselStarRating;
      this.mblSelCategories = data.mblSelCategories;
      this.mblSelSubCategories = data.mblSelSubCategories;
      this.sortBy = data.sortBy;
      this.selActivityName = data.selActivityName;
      //this.calculateMobileResults();
    },

    setResult(result) {
      this.destination = {
        name: result.name,
        result: result.result,
      };
    },

    submitForm() {
      if (!this.$refs.form.validate()) return false;

      let that = this;

      let _myDatecheckin = formattedDate(this.checkInDate, this.countryDF);
      let _myDatecheckout = formattedDate(this.checkOutDate, this.countryDF);

      this.makeActivityFilterCallInProcess = 1;

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

      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let reqPayload = {
        // Ternary operator used, when we auto call submit form by this.$refs then current searchData will be given to payload
        destinationId: this.destination.result.id,
        destinationCode: this.destination.result.iataCode,
        destinationName: this.destination.result.name,
        desiredResultCurrency: this.CType,
        fromDate: moment(_myDatecheckin).format('YYYY-MM-DDTHH:mm:ss') + 'Z',
        toDate: moment(_myDatecheckout).format('YYYY-MM-DDTHH:mm:ss') + 'Z',
        residency: 'us',
      };
      ActivityServices.searchActivity(reqPayload, reqHeaders)
        .then(rsp => {
          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            that.doPopLogout();
            return true;
          } else if (
            rsp.data.message == 'The given data is invalid' &&
            rsp.data.success == false
          ) {
            that.apiMessage = rsp.data.message;
            setTimeout(() => {
              that.$refs.srchMainBtn.$el.click();
            }, 1000);
            return;
          } else if (
            rsp.data.message == 'Sorry, No results matched your filter.'
          ) {
            return;
          } else if (!rsp.data.success) {
            that.setActivityCount = rsp.data.data.activitiesCount;
            that.apiMessage = rsp.data.message;
            that.showFilter = false;
            return;
          }
          evBus.$emit('resetDskFilterCounter');
          that.showFilter = true;
          that.apiMessage = '';
          that.$store.dispatch('resetAppliedFilter');

          if (that.$refs.deskFilter) that.$refs.deskFilter.resetFilter();

          if (that.$refs.mobFilter) that.$refs.mobFilter.clear();

          that.setActivityCount = rsp.data.data.activitiesCount;

          that.activities = that.makeTabAbles(
            that.doCleanArray(rsp.data.data.activities)
          );
          that.doMakePaginations(that.activities);
          that.makeDisplayItems();

          this.$store.dispatch('userDetails', { payload: rsp.data });

          let cRespond = rsp.data;

          that.$store.dispatch('reSetActivityLocations');

          that.$store
            .dispatch('setSearchedActivityDetails', {
              SRCH_CAR_RESPOND: cRespond,
            })
            .then(() => {
              that.populateAdvanceFilters();
              that.populateMobileFilters();
              this.$forceUpdate();
            });
        })
        .catch(err => {
          that.$awn.success(
            'Your being timed out due to inactivity, Please search again !'
          );

          that.$sentry.withScope(function (scope) {
            scope.setExtra('sessionId', that.ActivityStore.sessionId);
            that.$sentry.captureException(new Error(err));
          });
        });
      return true;
    },

    SearchDataPopulate: function () {
      setTimeout(() => {
        if (this.ActivityStore.searchData) {
          let _searchedPayload = this.doCleanArray(
            this.ActivityStore.searchData
          );
          let myPickTime = _searchedPayload.fromDate;
          let myDropTime = _searchedPayload.toDate;
          this.checkInDate = moment(myPickTime.split('T')[0]).format('YYYY-MM-DD');
          this.checkOutDate = moment(myDropTime.split('T')[0]).format('YYYY-MM-DD');
          this.destination = {
            name: this.searchData.destinationName,
            result: {
              id: this.searchData.destinationId,
              iataCode: this.searchData.destinationCode,
              name: this.searchData.destinationName,
            },
          };
        }
      }, 200);

      setTimeout(() => {
        // needed to reinit call on chekout

        if (this.$store.state.ActivityStore.searchActivityAgain == true) {
          this.$store
            .dispatch('setActivityAutoSearchAgain', {
              STATUS: false,
            })
            .then(() => {
              setTimeout(() => {
                this.$refs.srchMainBtn.$el.click();
              }, 200);
            });
        }
      }, 100);
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },

    format(value, pattern) {
      var i = 0,
        v = value.toString();
      // eslint-disable-next-line no-unused-vars
      return pattern.replace(/#/g, (_) => v[i++]);
    },

    handlePageChange(value) {
      this.panel = null;
      this.currentPage = value;
      this.makeDisplayItems();
      this.scrollToTop();
    },

    makeDisplayItems() {
      let arrOfObj = this.getPageData();
      arrOfObj.forEach((item) => {
        item.tab = null;
        item.details = '';
        item.expanded = false;
      });
      this.results = arrOfObj;
    },

    makeTabAbles: function (arrOfObj) {
      let result = arrOfObj.map(function (el) {
        var o = Object.assign({}, el);
        o.tab = null;
        o.expanded = false;
        o.details = false;
        return o;
      });
      return result;
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

    doMakeSearchAgainDetails: function () {
      this.$store.dispatch('resetSearchId');
      this.freshlyMount = true;
      this.freshlyMount = true;
      this.populateAdvanceFilters();
      this.freshlyMount = true;
      this.$awn.success(
        'Your being timed out due to inactivity, Please try show detail again!'
      );
      this.$refs.srchMainBtn.$el.click();
    },

    FilterActivityName(event, allActivities, searchVal) {
      if (event == 'keyword remove') {
      /*   this.initData(); */

      
      if (searchVal == '') {
          // console.log('adding activities agains');
          this.activities = allActivities;
          this.setActivityCount = this.activities.length;
          this.doMakePaginations(this.activities);
          this.makeDisplayItems();
        }
           

      } else {
        function compare(a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }

        this.activities = allActivities
          .filter(activity => {
            return activity.title.includes(event);
          })
          .sort(compare);
        this.setActivityCount = this.activities.length;
        this.doMakePaginations(this.activities);
        this.makeDisplayItems();
      }
    },

    calculateAdvanceResults() {
      if (this.freshlyMount) {
        this.freshlyMount = false;
        return false;
      }

      var that = this;
      let reqHeaders = {
        headers: { 'Content-Type': 'application/json' },
      };
      let reqPayLoad = {
        sessionId: this.ActivityStore.sessionId,
      };

      if (this.sliderValue.length > 0) {
        let pricesPayLoads = {
          min: this.sliderValue[0],
          max: this.sliderValue[1],
        };
        reqPayLoad.priceRange = pricesPayLoads;
      }

      if (this.selCategories.length > 0) {
        if (this.selCategories.join() != 'Any')
          reqPayLoad.category = this.selCategories;
      }
      if (this.selSubCategories.length > 0) {
        if (this.selSubCategories.join() != 'Any')
          reqPayLoad.subCategory = this.selSubCategories;
      }

      if (this.selstarRating.length > 0) {
        if (this.selstarRating.join() != 'Any') {
          reqPayLoad.starRating = this.selstarRating.join();
        }
      }

      if (this.sortBy) {
        // console.log('inside this is there',this.sortBy);
        let sortQuery = this.sortBy.split('-');
        let order = sortQuery[1];
        let indexKey = sortQuery[0].replace('_asc','');
        let sortPayload = {
          sortField: indexKey,
          sortOrder: order,
          sortIsString: true,
          sortOn: this.sortActivityBy,
        };
        if (indexKey == 'finalPrice') sortPayload.sortIsString = false;
        reqPayLoad.sortByField = sortPayload;
      }
      // console.log('reqPayLoad:',reqPayLoad);
      ActivityServices.filterActivity(reqPayLoad, reqHeaders)
        .then((rsp) => {
          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            this.doPopLogout();
            return true;
          } else if (
            rsp.data.message == 'The given data is invalid' &&
            rsp.data.success == false
          ) {
            this.$awn.alert('The Given Data is invalid,Try Again');
            setTimeout(() => {
              this.$refs.srchMainBtn.$el.click();
            }, 1000);
            return;
          } else if (
            rsp.data.message == 'Sorry, No results matched your filter.'
          ) {
            this.$awn.alert(rsp.data.message);
          } else if (!rsp.data.success) {
            that.setActivityCount = rsp.data.data.activitiesCount;
            that.showFilter = true;
          } else {
            that.apiMessage = '';
            evBus.$emit('resetDskFilterCounter');
            that.panel = null;
            that.setActivityCount = rsp.data.data.activitiesCount;
            that.activities = that.makeTabAbles(
              that.doCleanArray(rsp.data.data.activities)
            );

            // console.log('activities', that.activities);

            this.$store.dispatch('updateAppliedFIlter', reqPayLoad);
            let cRespond = rsp.data;
            that.$store.dispatch('reSetActivityLocations');
            that.$store.dispatch('setSearchedActivityDetails', {
              SRCH_CAR_RESPOND: cRespond,
            });
            that.doMakePaginations(that.activities);
            that.makeDisplayItems();
          }
        })
        .catch(err => {
          that.$awn.alert('Session Expired. New search request initiated.');

          that.$refs.srchMainBtn.$el.click();

          that.$sentry.withScope(function (scope) {
            scope.setExtra('sessionId', that.ActivityStore.sessionId);
            that.$sentry.captureException(new Error(err));
          });
        })
        .finally(() => {
          this.makeActivityFilterCallInProcess = 1;

          evBus.$emit('muteLoading');
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
        sessionId: this.ActivityStore.sessionId,
      };

      if (this.mblSliderValue.length > 0) {
        let pricesPayLoads = {
          min: this.mblSliderValue[0],
          max: this.mblSliderValue[1],
        };
        reqPayLoad.priceRange = pricesPayLoads;
      }
      if (this.mblSelCategories.length > 0) {
        if (this.mblSelCategories.join() != 'Any')
          reqPayLoad.categories = this.mblSelCategories.join();
      }

      if (this.mblSelSubCategories.length > 0) {
        if (this.mblSelSubCategories.join() != 'Any')
          reqPayLoad.subCategories = this.mblSelSubCategories.join();
      }

      if (this.mblselStarRating.length > 0) {
        if (this.mblselStarRating.join() != 'Any')
          reqPayLoad.starRating = this.mblselStarRating.join();
      }

      if (this.sortBy) {
        // console.log('inside 2',this.sortBy);
        // console.log('inside',this.sortBy);
        let sortQuery = this.sortBy.split('-');
        let order = sortQuery[1];
        let indexKey = sortQuery[0].replace('_asc','');
        let sortPayload = {
          sortField: indexKey,
          sortOrder: order,
          sortIsString: true,
          sortOn: this.sortActivityBy,
        };
        if (indexKey == 'finalPrice') sortPayload.sortIsString = false;
        reqPayLoad.sortByField = sortPayload;
      }
      // console.log('reqPayLoad:',reqPayLoad);
      ActivityServices.filterActivity(reqPayLoad, reqHeaders)
        .then((rsp) => {
          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            this.doPopLogout();
            return true;
          } else if (
            rsp.data.message == 'The given data is invalid' &&
            rsp.data.success == false
          ) {
            this.$awn.alert('The Given Data is invalid,Try Again');
            setTimeout(() => {
              this.$refs.srchMainBtn.$el.click();
            }, 1000);
            return;
          } else if (
            rsp.data.message == 'Sorry, No results matched your filter.'
          ) {
            this.$awn.alert(rsp.data.message);
          } else if (!rsp.data.success) {
            that.setActivityCount = rsp.data.data.activitiesCount;
            that.apiMessage = rsp.data.message;
            that.showFilter = false;
            return;
          }

          that.showFilter = true;
          that.apiMessage = '';
          that.panel = null;
          that.setActivityCount = rsp.data.data.activitiesCount;
          that.activities = that.makeTabAbles(
            that.doCleanArray(rsp.data.data.activities)
          );
          let cRespond = rsp.data;
          that.$store.dispatch('updateAppliedFIlter', reqPayLoad);
          that.$store.dispatch('reSetActivityLocations');
          that.$store.dispatch('setSearchedActivityDetails', {
            SRCH_CAR_RESPOND: cRespond,
          });
          that.doMakePaginations(that.activities);
          that.makeDisplayItems();
        })
        .catch((err) => {
          that.$sentry.withScope(function (scope) {
            scope.setExtra('sessionId', that.ActivityStore.sessionId);
            that.$sentry.captureException(new Error(err));
          });
        });
      that.$store.dispatch('reSetCarTracker', {
        timePace: that.TimeTrackerMaxTime,
      });
      evBus.$emit('resetTracker');
    },
  },
};
</script>
<style scoped>
.pass-dropdown {
  padding-bottom: 20px;
  float: left;
  width: 100%;
}
</style>
