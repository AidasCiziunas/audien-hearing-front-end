<template>
  <span style="display: block !important">
    <section class="hotel-search-filter">
      <v-container>
        <v-form ref="form" class="" lazy-validation>
          <!--Banner Start-->

          <div class="banner-section" style="">
            <div class="banner-section-box">
              <div class="hotel-inner-left-box">
                <p>
                  <i class="fas fa-map-marker-alt"></i>
                  <strong
                    >&nbsp;
                    {{
                      VillaStore.searchData &&
                      VillaStore.searchData.locationData
                        ? VillaStore.searchData.locationData.label
                        : ''
                    }}
                  </strong>
                </p>
                <p>
                  <i class="far fa-calendar-alt"></i>
                  Check In:
                  {{
                    VillaStore.searchData
                      ? justFormatMyDate(
                          VillaStore.searchData.checkinDate,
                          fullDateFormat()
                        )
                      : ''
                  }}
                  | Check Out:
                  {{
                    VillaStore.searchData
                      ? justFormatMyDate(
                          searchData.checkoutDate,
                          fullDateFormat()
                        )
                      : ''
                  }}
                </p>
                <div class="room-row-box">
                  <p
                    v-if="VillaStore.searchData"
                    v-for="(room, index) in VillaStore.searchData.rooms"
                    :key="index + 'room'"
                  >
                    <i class="fas fa-bed"></i>Room {{ index + 1 }} |
                    {{ room.adults }} Adults | {{ room.childs.length }} Child
                  </p>
                </div>
              </div>
              <div
                class="hotel-inner-right-box"
                style="padding-top: 60px"
              ></div>
            </div>
          </div>

          <!--Banner Ends-->

          <div class="title-heading">
            <h1 class="blue-heading">Rentals Search</h1>
          </div>
          <div class="mobile-search-bg mobile-search-hotel-bg">
            <a href="#" v-on:click="showSearchFields">
              <v-input
                :error-messages="['']"
                error
                disabled
                prepend-icon="fas fa-search"
              >
                {{ destinationValue.name }}
              </v-input>
              <v-icon color="white">fas fa-long-arrow-alt-down </v-icon>
            </a>
          </div>
          <div class="search-card">
            <div class="hotel-search-form search-form">
              <ul class="mobile-search-form">
                <li class="hotel-destination-feild">
                  <small>Destination</small>
                  <DestinationSearch
                    v-model="destinationValue"
                    :isVilla="true"
                    :detailPage="true"
                    @radiusValue="(e) => (sradius = e)"
                  />
                </li>
                <li class="hotel-check-feild">
                  <small>Check In</small>
                  <div class="single-input">
                    <div style="" class="input-icon">
                      <Calendar
                        v-model="checkInDate"
                        :minimumDate="minimumCheckInDate"
                        :attach="$refs.checkin"
                        :hideLabel="true"
                        @input="checkInSelected()"
                      />
                    </div>
                  </div>
                </li>
                <li class="hotel-check-feild">
                  <small>Check Out</small>
                  <div class="single-input">
                    <div style="" class="input-icon" ref="checkoutDateStruct">
                      <Calendar
                        v-model="checkOutDate"
                        :hideLabel="true"
                        :attach="$refs.checkout"
                        :minimumDate="minimumCheckOutDate"
                      />
                    </div>
                  </div>
                  <div class="tool_tip" v-show="errorLapseDays">
                    Sorry, reservations for more than 30 nights are not
                    possible.
                  </div>
                </li>
                <li class="hotel-guests-feild">
                  <small>Guests</small>
                  <div class="single-input">
                    <Guests v-model="roomsValue" />
                  </div>
                </li>
                <li class="hotel-radius-feild">
                  <small>Radius</small>
                  <v-select
                    :items="NumberOfRadius"
                    item-text="title"
                    item-value="value"
                    v-model="sradius"
                  >
                  </v-select>
                </li>
                <li class="hotel-submitBtn">
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
          <section class="listing-wrapper-villas">
            <v-container>
              <a class="clear-listing-btn" @click="clearFilter()"> Clear All</a>
            </v-container>
            <v-container v-if="villasApiMessage">
              <div class="search-heading">
                <div class="important-text-to-car">
                  <p>
                    <i class="fas fa-info" style="color: blue"></i>

                    {{ villasApiMessage }}
                  </p>
                </div>
              </div>
            </v-container>
            <VillaDesktopFilter
              v-if="showFilter"
              :freshlyMount="freshlyMount"
              :totalResults="setVillaCount"
              :resetFormValues="resetFormValues"
              ref="deskFilter"
              @onDesktopFilterData="filtersDataShow"
              :sortByOption="sortByOption"
              :calculateAdvanceResults="calculateAdvanceResults"
              :FilterVillaName="FilterVillaName"
              :allVillas="compVillasOfSession"
            />
          </section>

          <section class="listing-wrapper">
            <v-container>
              <v-row>
                <VillaListResult
                  v-if="setVillaCount > 0"
                  :panel="panel"
                  :searchAgain="doMakeSearchAgainDetails"
                  :results="results"
                  :totalNights="totalNights"
                />
                <!--adding trip summary-->
                <TripSummary />
              </v-row>
            </v-container>
            <template>
              <div class="text-center" v-if="villas.length">
                <v-pagination
                  v-if="setVillaCount > 0"
                  v-model="currentPage"
                  :length="totalPageIndexes"
                  :total-visible="totalVisibleIndexes"
                  @input="handlePageChange"
                />
              </div>
            </template>
          </section>
        </v-form>
      </v-container>
    </section>
    <VillaMobileFilter
      v-model="filtersData"
      ref="mobFilter"
      :freshlyMount="freshlyMount"
      :totalResults="setVillaCount"
      :sortByOption="sortByOption"
      @onMobileFilterData="mobileFilterData"
      :calculateMobileResults="calculateMobileResults"
      :resetFormValues="resetFormValues"
    />
  </span>
</template>

<script>
var moment = require('moment');

import { mapState } from 'vuex';
import * as dataKey from '@/services/data/dsources.js';
import villaServices from '@/services/api/Villa';
import { evBus } from '@/services/bus.js';
import VillaDesktopFilter from './filter/VillaDesktopFilter.vue';
import VillaListResult from './VillaListResult.vue';
import VillaHelper from '@/helper/VillaHelper.js';
import VillaMobileFilter from './filter/VillaMobileFilter.vue';
import TripSummary from '@/components/common/widgets/TripSummary.vue';
import DestinationSearch from '@/components/backend/partials/hotels/DestinationSearch.vue';
import Calendar from '@/components/common/Calendar.vue';
import Guests from '@/components/common/Guests.vue';

import {
  formattedDate,
  nextDay,
  addDayToDate,
  getVeryNextDate,
} from '@/components/common/utils';

export default {
  name: 'VillaDetails',
  mixins: [VillaHelper],
  components: {
    VillaDesktopFilter,
    VillaListResult,
    VillaMobileFilter,
    TripSummary,
    DestinationSearch,
    Calendar,
    Guests,
  },
  data() {
    return {
      filtersData: {
        mobileFilterDialog: false,
        sortFilter: false,
      },
      checkInDate: null,
      checkOutDate: null,
      showFilter: false,
      NumberOfRadius: [],
      sradius: 3,

      freshlyMount: false,
      panel: null,
      results: [],
      showGuests: false,
      villas: [],
      setVillaCount: 0,
      sortVillaBy: 'ALL',
      villaSearchId: '',
      token: '',
      search: '',
      resetFormValues: false,
      villasApiMessage: '',
      errorLapseDays: false,
      checkTripOfUserVl: false,
      callVillaSessionDataInProcess: false,
      makeVillaFilterCallInProcess: 0,
      destinationValue: {
        lat: '',
        lng: '',
        name: '',
        result: '',
      },
      minimumCheckInDate: getVeryNextDate(
        new Date(new Date().setDate(new Date().getDate() + 1))
      ),
      roomsValue: {
        guests: '1 Adults - 0 Children',
        selectedPeopleSets: [
          {
            adults: 1,
            childs: [],
            edit: false,
            childsAge: 0,
          },
        ],
      },
    };
  },

  created: function () {
    this.scrollToTop();

    this.$on('results', (results) => {
      this.results = results;
    });

    evBus.$on('villaResearchExpireItemOfTrip', () => {
      this.checkExpireItemOfVilla();
    });
  },
  destroyed() {
    evBus.$off('makeAdvFilterCallOfVilla');
  },
  computed: {
    ...mapState({
      Villafilters: (state) => state.villaStore,
      VillaStore: (state) => state.villaStore,
      searchData: (state) => state.villaStore.searchData,
      villaCount: (state) => state.villaStore.villasCount,
      filters: (state) => state.villaStore.filters,
      // sessionId: state => state.villaStore.sessionId,
      StoreVillas: (state) =>
        state.villaStore.villas ? state.villaStore.villas : [],
      totalNights: (state) => state.villaStore.totalNights,
      CType: (state) => state.envStore.CType,
      CSymbol: (state) => state.envStore.CSymbol,
      DFormat: (state) => state.envStore.DFormat,
      countryDF: (state) => state.envStore.countryDF,
      domain: (state) => state.envStore.domain,
      urlDomain: (state) => state.envStore.urlDomain,
    }),
    minimumCheckOutDate() {
      return addDayToDate(this.checkInDate);
    },
    compVillasOfSession() {
      return this.villas;
    },

    totalPageIndexes() {
      return this.totalPages;
    },

    // function to compare names
  },

  mounted() {
    if (this.$route.query.token) {
      this.$store.dispatch('falsifyErrorLogin');

      let token = this.$route.query.token;
      this.token = token;
      this.villaSearchId = this.$route.query.searchId;

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
          typeof this.villaSearchId != 'undefined'
        ) {
          this.$store.dispatch('appliedFilterFalse');
          this.checkTripOfUserVl = true;
          this.doSearchVillaById();
        } else {
          return false;
        }

        // case for customer invitation token
        if (
          this.token != null &&
          this.token != '' &&
          typeof this.token != 'undefined' &&
          typeof this.villaSearchId == 'undefined'
        )
          this.$store.dispatch('customerInviteToken', {
            payload: { token: this.token },
          });

        return false;
      }); // user alive asyc check
    } else {
      this.initData();
    }

    this.checkExpireItemOfVilla();
  },

  methods: {
    checkExpireItemOfVilla() {
      // case of direct checkout expired item already been handeled
      if (this.$store.state.cartStore.lastExpireItemEngine == 'villa') {
        if (this.$store.state.cartStore.lastExpireInModeOf == 'trip') {
          let _hotelExpiredDetails = this.doCleanArray(
            this.$store.state.cartStore.lastExpireItemDetail
          );

          if (typeof _hotelExpiredDetails.details == 'string')
            _hotelExpiredDetails.details = JSON.parse(
              _hotelExpiredDetails.details
            );

          // pre-populate main filters
          setTimeout(() => {
            this.sradius = Number(
              _hotelExpiredDetails.details.searchData.radius
            );
            this.destinationValue = {
              lat: _hotelExpiredDetails.details.searchData.geoLat,
              lng: _hotelExpiredDetails.details.searchData.geoLong,
              result: _hotelExpiredDetails.details.searchData.locationData,
              name: _hotelExpiredDetails.details.searchData.locationData.label,
            };

            this.roomsValue.selectedPeopleSets =
              _hotelExpiredDetails.details.searchData.rooms;

            let _searchedPayload = this.doCleanArray(
              _hotelExpiredDetails.details.searchData
            );

            let myPickTime = _searchedPayload.checkinDate;
            let myDropTime = _searchedPayload.checkoutDate;

            this.checkInDate = moment(myPickTime).format('YYYY-MM-DD');
            this.checkOutDate = moment(myDropTime).format('YYYY-MM-DD');
          }, 2000);

          setTimeout(() => {
            // needed to reinit call on chekout
            this.$store
              .dispatch('setVillaAutoSearchAgain', {
                STATUS: false,
              })
              .then(() => {
                this.$refs.srchMainBtn.$el.click();
              });
          }, 2500);
        } // Ends IF Trip Mode
      } // If Villa
    },
    clearFilter() {
      this.checkInDate = null;
      this.checkOutDate = null;
      this.sradius = 3;
      this.destinationValue = {
        lat: '',
        lng: '',
        name: '',
        result: '',
      };
      this.roomsValue = {
        selectedPeopleSets: [
          {
            adults: 1,
            childs: [],
            edit: false,
            childsAge: 0,
          },
        ],
        guests: '1 Adults - 0 Children',
      };
    },
    initData() {
      if (this.villaCount > 0) {
        this.showFilter = true;
      } else {
        this.showFilter = false;
      }

      if (typeof this.searchData.rooms != 'string') {
        this.roomsValue.selectedPeopleSets = this.searchData.rooms;
      } else {
        this.roomsValue.selectedPeopleSets = this.searchData.rooms;
      }

      this.setVillaCount = this.villaCount;
      this.NumberOfRadius = dataKey.radius;
      this.SearchDataPopulate();

      if (
        this.roomsValue.selectedPeopleSets != 'undefined' &&
        this.searchData
      ) {
        this.totalGuest();
      }

      evBus.$on('makeAdvFilterCallOfVilla', () => {
        setTimeout(() => {
          if (this.makeVillaFilterCallInProcess == 0) {
            this.makeVillaFilterCallInProcess = 1;
            this.freshlyMount = false;
            this.calculateAdvanceResults();
          }
        }, 1500);
      });

      // this.getVillasBySession();
    },

    async getVillasBySession() {
      if (this.callVillaSessionDataInProcess) return;

      if (this.callVillaSessionDataInProcess == false)
        this.callVillaSessionDataInProcess = true;

      let that = this;

      this.callVillasBySession(2000).then((rspVillas) => {
        that.villas = that.makeTabAbles(that.doCleanArray(rspVillas));

        that.doMakePaginations(that.villas);

        that.makeDisplayItems();

        that.setVillaCount = that.villas.length;

        that.showFilter = false;

        if (that.villas.length > 0) that.showFilter = true;
      });
    },

    doSearchVillaById() {
      let that = this;

      that.makeVillaFilterCallInProcess = 0;

      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token,
        },
      };

      let reqPayLoad = {
        searchId: this.villaSearchId,
        sortBy: 'asc',
      };

      villaServices
        .getVillasBySearchId((reqHeaders, reqPayLoad))
        .then((rsp) => {
          if (
            rsp.data.success == false &&
            rsp.data.errors &&
            rsp.data.errors.ErrorText ==
              'Sorry, No results matched your search, please try again.'
          ) {
            this.villasApiMessage = rsp.data.message;
            this.setVillaCount = 0;
          }
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
          }

          this.SearchDataPopulate();
          // that.$refs.mobFilter.clear();

          evBus.$emit('resetMobFilters');

          that.setVillaCount =
            rsp.data.data.valla != undefined ? rsp.data.data.villas.length : 0;
          that.villas = that.makeTabAbles(
            that.doCleanArray(
              rsp.data.data.villas != undefined ? rsp.data.data.villas : []
            )
          );
          that.doMakePaginations(that.villas);
          that.makeDisplayItems();

          this.$store.dispatch('userDetails', { payload: rsp.data });

          let cRespond = rsp.data;

          that.$store.dispatch('reSetVillaLocations');

          that.$store.dispatch('setSearchedVillaDetails', {
            SRCH_CAR_RESPOND: cRespond,
          });
          evBus.$emit('populateVillaFilters');
          this.initData();
        })
        .finally(() => {
          if (this.checkTripOfUserVl && this.tripExist) this.verifyTripByUser();

          this.checkTripOfUserVl = false;
        });
    },
    // get desktop filter  value from child component

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

    filtersDataShow(data) {
      this.sliderValue = data.sliderValue;
      this.distanceSlider = data.distanceSlider;
      this.selstarRating = data.selstarRating;
      this.selFacilities = data.selFacilities;
      this.selPropertyTypes = data.selPropertyTypes;
      this.searchByName = data.searchByName;
      this.slugs = data.slugs;
      this.sortBy = data.sortBy;
      this.selVillaName = data.selVillaName;
    },

    mobileFilterData(data) {
      this.mbSliderValue = data.mbSliderValue;
      this.mbSeldistance = data.mbSeldistance;
      this.mbldistanceSlider = data.mbldistanceSlider;
      this.mbselstarRating = data.mbselstarRating;
      this.mbSelFacilities = data.mbSelFacilities;
      this.mblSelPropertyTypes = data.mblSelPropertyTypes;
      this.searchByName = data.searchByName;
      this.sortBy = data.sortBy;
      this.selVillaName = data.selVillaName;
      this.calculateMobileResults();
    },

    totalGuest() {
      let totalAudlt = 0;
      let totalChild = 0;
      for (let i = 0; i < this.roomsValue.selectedPeopleSets.length; i++) {
        totalAudlt += parseInt(this.roomsValue.selectedPeopleSets[i].adults);
        totalChild += parseInt(
          this.roomsValue.selectedPeopleSets[i].childs.length
        );
      }
      this.roomsValue.guests =
        totalAudlt + ' Adults - ' + totalChild + ' Children';
    },

    checkInSelected() {
      let nextDayValue = nextDay(this.checkInDate, this.checkOutDate);
      if (nextDayValue) {
        this.checkOutDate = nextDayValue;
      }
    },

    submitForm() {
      if (!this.$refs.form.validate()) return false;

      let that = this;

      let Datecheckin = formattedDate(this.checkInDate, this.countryDF);
      let Datecheckout = formattedDate(this.checkOutDate, this.countryDF);

      that.makeVillaFilterCallInProcess = 1;

      if (this.domain == 'uk' || this.domain == 'mx' || this.domain == 'ie') {
        Datecheckin = Datecheckin.split('/');
        Datecheckin =
          Datecheckin[1] + '/' + Datecheckin[0] + '/' + Datecheckin[2];

        Datecheckout = Datecheckout.split('/');
        Datecheckout =
          Datecheckout[1] + '/' + Datecheckout[0] + '/' + Datecheckout[2];
      }

      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let reqPayLoad = {
        radius: this.sradius,
        geoLat: this.destinationValue.lat,
        geoLong: this.destinationValue.lng,
        checkinDate: moment(Datecheckin).format('YYYY-MM-DD'),
        checkoutDate: moment(Datecheckout).format('YYYY-MM-DD'),
        desiredResultCurrency: this.CType,
        rooms: this.roomsValue.selectedPeopleSets,
        search: true,
        residency: 'us',
        locationData: {
          ...this.destinationValue.result,
        },
      };
      this.resetFormValues = false;
      villaServices
        .searchVillas(reqPayLoad, reqHeaders)
        .then((rsp) => {
          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            this.doPopLogout();
            return true;
          }

          that.$store.dispatch('appliedFilterFalse');
          that.setVillaCount =
            rsp.data.data.villasCount == undefined
              ? 0
              : rsp.data.data.villasCount;
          that.villas = that.makeTabAbles(
            that.doCleanArray(
              rsp.data.data.villas == undefined ? [] : rsp.data.data.villas
            )
          );
          that.doMakePaginations(that.villas);
          that.makeDisplayItems();

          this.$store.dispatch('userDetails', { payload: rsp.data });

          let cRespond = rsp.data;

          that.$store.dispatch('reSetVillaLocations');
          this.resetFormValues = true;
          if (this.villas.length > 0) {
            this.showFilter = true;
          } else {
            this.showFilter = false;
          }

          that.$store
            .dispatch('setSearchedVillaDetails', {
              SRCH_CAR_RESPOND: cRespond,
            })
            .then(() => {
              that.seldistance = '';
              that.selstarRating = 0;
              that.selFacilities = '';
              that.propertyTypes = '';
              that.sortBy = 'totalPrice-asc-false';
              that.villasCount =
                cRespond.data.villasCount == undefined
                  ? 0
                  : cRespond.data.villasCount;

              //Mobile filters
              (that.mbSeldistance = ''), (that.mbSelFacilities = ['Any']);
              that.mbselstarRating = ['Any'];
              that.mbSelFacilities = ['Any'];
              that.mblSelPropertyTypes = ['Any'];

              //that.sortVillaBy = "ALL";
              that.panel = null;
              that.populateAdvanceFilters();
              that.populateMobileFilters();
              that.$forceUpdate();
              evBus.$emit('resetMobFilters');
            });
          if (
            rsp.data.success == false &&
            rsp.data.data.villasCount == undefined
          ) {
            this.villasApiMessage = rsp.data.message;
          }
          this.calculateAdvanceResults();
          //that.$refs.desktopFilter.submit()
        })
        .catch((err) => {
          that.$sentry.withScope(function (scope) {
            scope.setExtra('sessionId', that.VillaStore.sessionId);
            that.$sentry.captureException(new Error(err));
          });
        });
      return true;
    },

    SearchDataPopulate() {
      // pre-populate main filters
      setTimeout(() => {
        if (this.VillaStore.searchData) {
          this.sradius = Number(this.VillaStore.searchData.radius);

          this.destinationValue = {
            lat: this.VillaStore.searchData.geoLat,
            lng: this.VillaStore.searchData.geoLong,
          };

          if (typeof this.searchData.locationData == 'string') {
            this.destinationValue.result = JSON.parse(
              this.searchData.locationData
            );
            this.roomsValue.selectedPeopleSets = JSON.parse(
              this.searchData.rooms
            );
          } else {
            this.destinationValue.result = this.searchData.locationData;
            this.roomsValue.selectedPeopleSets = this.searchData.rooms;
          }
          this.destinationValue.name =
            this.destinationValue.result != undefined
              ? this.destinationValue.result.label
              : '';
          let _searchedPayload = this.doCleanArray(this.VillaStore.searchData);

          let myPickTime = _searchedPayload.checkinDate;
          let myDropTime = _searchedPayload.checkoutDate;
          this.checkInDate = moment(myPickTime.split('T')[0]).format(
            'YYYY-MM-DD'
          );

          this.checkOutDate = moment(myDropTime.split('T')[0]).format(
            'YYYY-MM-DD'
          );
        }
      }, 2000);

      setTimeout(
        function () {
          // needed to reinit call on chekout

          if (this.$store.state.villaStore.searchVillaAgain === true) {
            this.$store
              .dispatch('setVillaAutoSearchAgain', {
                STATUS: false,
              })
              .then(() => {
                this.$refs.srchMainBtn.$el.click();
              });
          }
        }.bind(this),
        2500
      );
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
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
      /*       this.calculateMobileResults(); */
    },

    doMakeSearchAgainDetails: function () {
      this.$store.dispatch('resetSearchId');
      this.freshlyMount = true;
      this.populateAdvanceFilters();
      this.freshlyMount = true;
      this.populateMobileFilters();
      this.$awn.success(
        'Your being timed out due to inactivity, Please try show detail again!'
      );
      this.$refs.srchMainBtn.$el.click();
    },

    FilterVillaName(event, allVillas, searchVal) {
      if (event == 'keyword remove') {
        if (searchVal == '') {
          this.villas = allVillas;
          this.setVillaCount = this.villas.length;
          this.doMakePaginations(this.villas);
          this.makeDisplayItems();
        }
      } else {
        // eslint-disable-next-line no-inner-declarations
        function compare(a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }

        this.villas = allVillas
          .filter((user) => {
            return user.displayName.includes(event);
          })
          .sort(compare);

        this.setVillaCount = this.villas.length;
        this.doMakePaginations(this.villas);
        this.makeDisplayItems();
      }
    },

    calculateAdvanceResults() {
      if (this.freshlyMount) {
        this.freshlyMount = false;
        return false;
      }

      let that = this;
      let reqHeaders = {
        headers: { 'Content-Type': 'application/json' },
      };

      let reqPayLoad = {
        sessionId: this.VillaStore.sessionId,
      };

      if (this.sliderValue.length > 0) {
        let pricesPayLoads = {
          min: this.sliderValue[0],
          max: this.sliderValue[1],
        };

        reqPayLoad.priceRange = pricesPayLoads;
      }

      if (this.sortBy) {
        let sortQuery = this.sortBy.split('-');
        let order = sortQuery[1];
        let indexKey = sortQuery[0];
        let bool = sortQuery[2] === 'true';

        let sortPayload = {
          sortField: indexKey,
          sortOrder: order,
          sortIsString: bool,
        };

        reqPayLoad.sortByField = sortPayload;
      }

      if (this.selFacilities.length > 0) {
        if (this.selFacilities.join() != 'Any')
          reqPayLoad.villaAmenities = this.selFacilities.join();
      }

      if (this.distanceSlider.length > 0) {
        let distancePayLoads = {
          min: this.distanceSlider[0],
          max: this.distanceSlider[1],
        };
        reqPayLoad.distance = distancePayLoads;
      }
      if (this.selstarRating.length > 0) {
        if (this.selstarRating.join() != 'Any') {
          reqPayLoad.starRating = this.selstarRating.join();

          if (this.selstarRating.join() != 'Any') {
            if (this.selstarRating.length == 1) {
              reqPayLoad.starRating = this.selstarRating.join('');
            } else {
              reqPayLoad.starRating = this.selstarRating.join();
            }
          }
        }

        if (this.selPropertyTypes.length > 0) {
          if (this.selPropertyTypes.join() != 'Any') {
            reqPayLoad.propertyType = this.selPropertyTypes;
          }
        }

        if (this.selVillaName != '' && this.selVillaName != undefined) {
          reqPayLoad.searchByName = this.selVillaName;
        }
        villaServices
          .getFilterVilla(reqPayLoad, reqHeaders)
          .then((rsp) => {
            if (
              rsp.data.success == false &&
              rsp.data.message == 'Token has expired'
            ) {
              this.doPopLogout();
              return true;
            }
            // else if (!rsp.data.success && rsp.data.data.villasCount === 0) {
            //   this.villasApiMessage = rsp.data.message;
            // }

            that.panel = null;
            that.setVillaCount = rsp.data.data.villasCount;
            let totalNights = rsp.data.data.totalNights;
            that.$store.dispatch('setNights', totalNights);
            that.villas = that.makeTabAbles(
              that.doCleanArray(rsp.data.data.villas)
            );
            that.doMakePaginations(that.villas);
            that.makeDisplayItems();
            that.$store.dispatch('appliedFilter', reqPayLoad);
            let cRespond = rsp.data;
            that.$store.dispatch('reSetHotelLocations');

            that.$store.dispatch('setSearchedVillaDetails', {
              SRCH_CAR_RESPOND: cRespond,
            });
          })
          .catch((err) => {
            if (
            
              err.data.message ==
                'Session Expired. Please initiate a new search request.'
            ) {
                this.$awn.success(
              'Your being timed out due to inactivity, Please search again !'
            );
               this.$refs.srchMainBtn.$el.click();
              return false;
            }

            that.$sentry.withScope(function (scope) {
              scope.setExtra('sessionId', that.VillaStore.sessionId);
              that.$sentry.captureException(new Error(err));
            });
          })
          .finally(() => {
            that.makeVillaFilterCallInProcess = 1;
          });

        that.$store.dispatch('reSetCarTracker', {
          timePace: that.TimeTrackerMaxTime,
        });
        evBus.$emit('resetTracker');
      }
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
        sessionId: this.VillaStore.sessionId,
      };

      if (this.mbSliderValue.length > 0) {
        let pricesPayLoads = {
          min: this.mbSliderValue[0],
          max: this.mbSliderValue[1],
        };
        reqPayLoad.priceRange = pricesPayLoads;
      }

      if (this.mbldistanceSlider.length > 0) {
        let distancePayLoads = {
          min: this.mbldistanceSlider[0],
          max: this.mbldistanceSlider[1],
        };

        reqPayLoad.distance = distancePayLoads;
      }

      if (this.sortBy) {
        let sortQuery = this.sortBy.split('-');
        let order = sortQuery[1];
        let indexKey = sortQuery[0];
        let bool = sortQuery[2];
        let sortPayload = {
          sortField: indexKey,
          sortOrder: order,
          sortIsString: bool,
        };
        reqPayLoad.sortByField = sortPayload;
      }
      if (this.mbSelFacilities.length > 0) {
        if (this.mbSelFacilities.join() != 'Any')
          reqPayLoad.villaAmenities = this.mbSelFacilities.join();
      }

      if (this.mblSelPropertyTypes.length > 0) {
        if (this.mblSelPropertyTypes.join() != 'Any')
          reqPayLoad.propertyType = this.mblSelPropertyTypes;
      }
      if (this.mbselstarRating.length > 0) {
        if (this.mbselstarRating.join() != 'Any')
          reqPayLoad.starRating = this.mbselstarRating.join();
      }

      /*      if (this.sortBy) {
                let sortQuery = this.sortBy.split('-');
                let order = sortQuery[1];
                let indexKey = sortQuery[0];
                let bool = sortQuery[2];
                let sortPayload = {
                    sortField: indexKey,
                    sortOrder: order,
                    sortIsString: bool
                };
            }
 */
      villaServices
        .getFilterVilla(reqPayLoad, reqHeaders)
        .then((rsp) => {
          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            this.doPopLogout();
            return true;
          }
          let cRespond = rsp.data;
          that.$store.dispatch('reSetHotelLocations');

          that.$store.dispatch('setSearchedVillaDetails', {
            SRCH_CAR_RESPOND: cRespond,
          });
          that.panel = null;
          that.setVillaCount = rsp.data.data.villasCount;
          that.villas = that.makeTabAbles(
            that.doCleanArray(rsp.data.data.villas)
          );
          that.$store.dispatch('appliedFilter', reqPayLoad);
          that.doMakePaginations(that.villas);
          that.makeDisplayItems();
        })
        .catch((err) => {
           if (
            
              err.data.message ==
                'Session Expired. Please initiate a new search request.'
            ) {
                this.$awn.success(
              'Your being timed out due to inactivity, Please search again !'
            );
               this.$refs.srchMainBtn.$el.click();
              return false;
            }
          that.$sentry.withScope(function (scope) {
            scope.setExtra('sessionId', that.VillaStore.sessionId);
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
/* Error Tool Tip Styles*/
.tool_tip {
  font-family: Helvetica;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  line-height: 20px;
  background-color: #cc0033;
  border: 1px solid #cc0033;
  border-radius: 7px;
  -moz-border-radius: 7px;
  -webkit-border-radius: 7px;
  float: left;
  position: relative;
  padding: 7px 11px 4px;
  margin-top: 10px;
  z-index: 999;
  width: 300px;
}

/* Left Arrow Styles */
.tool_tip:after,
.tool_tip:before {
  content: '';
  border: 7px solid transparent;
  position: absolute;
  top: 10px;
}
.tool_tip:after {
  border-top: 7px solid #cc0033;
  top: 3px;
}
.tool_tip:before {
  border-top: 7px solid #cc0033;
  top: 3px;
}
</style>
