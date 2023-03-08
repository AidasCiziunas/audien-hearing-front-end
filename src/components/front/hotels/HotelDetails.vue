<template>
  <span style="display: block !important">
    <section class="hotel-search-filter">
      <v-container>
        <v-form lazy-validation>
          <div class="banner-section" style="">
            <div class="banner-section-box">
              <div class="hotel-inner-left-box">
                <p>
                  <i class="fas fa-map-marker-alt"></i>
                  <strong
                    >&nbsp;
                    {{ searchData ? searchData.name : '' }}
                  </strong>
                </p>
                <p>
                  <i class="far fa-calendar-alt"></i>
                  Check In:
                  {{
                    searchData
                      ? justFormatMyDate(
                          searchData.checkinDate,
                          fullDateFormat()
                        )
                      : ''
                  }}
                  | Check Out:
                  {{
                    searchData
                      ? justFormatMyDate(
                          searchData.checkoutDate,
                          fullDateFormat()
                        )
                      : ''
                  }}
                </p>
                <div class="room-row-box hotel-banner-room-box">
                  <p v-for="(room, index) in roomsList" :key="index + 'room'">
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
        </v-form>

        <div class="title-heading">
          <h1 class="blue-heading">Hotel Search</h1>
        </div>
        <div class="mobile-search-bg mobile-search-hotel-bg">
          <a href="#" v-on:click="showSearchFields">
            <v-input
              :error-messages="['']"
              error
              disabled
              prepend-icon="fas fa-search"
            >
              {{ destinationValue && destinationValue.name }}
            </v-input>
            <v-icon color="white">fas fa-long-arrow-alt-down </v-icon>
          </a>
        </div>
        <v-form ref="form" lazy-validation>
          <div class="search-card">
            <div class="hotel-search-form search-form">
              <ul class="mobile-search-form">
                <li class="hotel-destination-feild">
                  <small>Destination</small>

                  <DestinationSearch
                    v-model="destinationValue"
                    :detailPage="true"
                    @radiusValue="(e) => (sradius = e)"
                  />
                </li>
                <li class="hotel-check-feild">
                  <small>Check In</small>
                  <div ref="checkin">
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
                  </div>
                </li>
                <li class="hotel-check-feild">
                  <small>Check Out</small>
                  <div ref="checkout">
                    <div class="single-input">
                      <div style="" class="input-icon">
                        <Calendar
                          v-model="checkOutDate"
                          :hideLabel="true"
                          :attach="$refs.checkout"
                          :minimumDate="minimumCheckOutDate"
                        />
                      </div>
                    </div>
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
                    :items="compNumberOfRadius"
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
            <a class="clear-listing-btn" @click="clearFilter()"> Clear All</a>
          </div>
        </v-form>
        <section class="listing-wrapper2">
         
          <HotelDesktopFilter
            v-if="showFilter && !message"
            :freshlyMount="freshlyMount"
            :totalResults="setHotelCount"
            ref="deskFilter"
            @onDesktopFilterData="filtersDataShow"
            :sortByOption="sortByOption"
            :calculateAdvanceResults="calculateAdvanceResults"
            :FilterHotelName="FilterHotelName"
            :MapFilterHotelName="MapFilterHotelName"
            :allHotel="compHotelsOfSession"
          />
          <div class="search-heading" v-if="message">
            <p>
              <i class="fas fa-info" style="color: blue"></i>
              {{ message }}
            </p>
          </div>
          <a
            class="clear-listing-btn result-back"
            v-if="mapResultget"
            @click="initData()"
          >
            back to result
          </a>
        </section>

        <section class="listing-wrapper">
          <v-container>
            <v-row>
              <HotelListResult
                :panel="panel"
                :nightCount="totalNights"
                @resetSearch="reinitSearch"
                :searchAgain="doMakeSearchAgainDetails"
                :results="results"
              />

              <!--adding trip summary-->
              <TripSummary />
            </v-row>
          </v-container>
          <template>
            <div class="text-center" v-if="hotels.length">
              <v-pagination
                v-if="setHotelCount > 0"
                v-model="currentPage"
                :length="totalPageIndexes"
                :total-visible="totalVisibleIndexes"
                @input="handlePageChange"
              ></v-pagination>
            </div>
          </template>
        </section>
      </v-container>
    </section>
    <HotelMobileFilter
      v-model="filtersData"
      :freshlyMount="freshlyMount"
      ref="mobFilter"
      :totalResults="setHotelCount"
      :sortByOption="sortByOption"
      @onMobileFilterData="mobileFilterData"
      :calculateMobileResults="calculateMobileResults"
    />
  </span>
</template>

<script>
var moment = require('moment');

import { mapState } from 'vuex';
import * as dataKey from '@/services/data/dsources.js';
import hotelServices from '@/services/api/Hotel';
import { evBus } from '@/services/bus.js';
import HotelDesktopFilter from './filter/HotelDesktopFilter.vue';
import HotelListResult from './HotelListResult.vue';
import HotelHelper from '@/helper/HotelHelper.js';
import HotelMobileFilter from './filter/HotelMobileFilter.vue';
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
  name: 'Hotels',
  mixins: [HotelHelper],
  components: {
    HotelDesktopFilter,
    HotelListResult,
    HotelMobileFilter,
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
      regularSearch: false,
      checkInDate: null,
      checkOutDate: null,
      showFilter: false,
      sradius: 15,
      freshlyMount: false,
      panel: null,
      results: [],
      checkTripOfUserHtl: false,
      sId: '',
      hotels: [],
      setHotelCount: 0,
      sortHotelBy: 'ALL',
      hotelSearchId: '',
      token: '',
      search: '',
      basisList: [],
      message: '',
      mapResultget: false,
      makeFilterCallInProcess: 0,
      destinationValue: {
        ID: '',
        geoLat: '',
        geoLong: '',
        name: '',
        sPickup: '',
        locationId: '',
        locationType: ' ',
      },
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
      minimumCheckInDate: getVeryNextDate(
        new Date(new Date().setDate(new Date().getDate() + 1))
      ),
    };
  },

  created: function () {
    this.scrollToTop();

    this.$on('results', (results) => {
      this.results = results;
    });

    evBus.$on('hotelResearchExpireItemOfTrip', () => {
      this.checkExpireItemOfHotel();
    });
  },
  destroyed() {
    evBus.$off('makeAdvFilterCall');
  },
  computed: {
    ...mapState({
      HotelStore: (state) => state.hotelStore,
      searchData: (state) => state.hotelStore.searchData,
      hotelCount: (state) => state.hotelStore.hotelsCount,
      filters: (state) => state.hotelStore.filters,
     // appliedFilters: (state) => state.hotelStore.appliedFilters,
      StoreHotels: (state) => state.hotelStore.hotels,
      totalNights: (state) => state.hotelStore.totalNights,
      CType: (state) => state.envStore.CType,
      countryDF: (state) => state.envStore.countryDF,
      domain: (state) => state.envStore.domain,
    }),

    compHotelsOfSession() {
      return this.hotels;
    },

    compNumberOfRadius() {
      if (this.domain == 'uk' || this.domain == 'mx' || this.domain == 'ie') {
        return dataKey.radius_uk_mx;
      } else {
        return dataKey.radius;
      }
    },

    minimumCheckOutDate() {
      return addDayToDate(this.checkInDate);
    },

    totalPageIndexes() {
      return this.totalPages;
    },

    roomsList() {
      if (this.searchData) return this.searchData.rooms;
      else return [];
    },
  },

  mounted() {
    this.$store.dispatch('resetRoomSessisonId');

    if (this.$route.query.token) {
      this.$store.dispatch('falsifyErrorLogin');

      let token = this.$route.query.token;
      this.token = token;
      this.hotelSearchId = this.$route.query.searchId;

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
          typeof this.hotelSearchId != 'undefined'
        ) {
          let that = this;
          this.checkTripOfUserHtl = true;
          this.$store.dispatch('resetAppliedFilter');
          that.doSearchHotelById();
        } else {
          return false;
        }

        // case for customer invitation token
        if (
          this.token != null &&
          this.token != '' &&
          typeof this.token != 'undefined' &&
          typeof this.flightSearchId == 'undefined'
        )
          this.$store.dispatch('customerInviteToken', {
            payload: { token: this.token },
          });

        return false;
      }); // user alive asyc check
    } else {
      this.initData();
    }

    this.checkExpireItemOfHotel();
  },

  methods: {
    clearFilter() {
      this.destinationValue = {
        ID: '',
        geoLat: '',
        geoLong: '',
        name: '',
        sPickup: '',
        locationId: '',
        locationType: ' ',
      };
      this.checkInDate = null;
      this.checkOutDate = null;
      this.sradius = 15;
      this.rooms = [];

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

    checkExpireItemOfHotel() {
      // case of direct checkout expired item already been handeled
      if (this.$store.state.cartStore.lastExpireItemEngine == 'hotel') {
        if (this.$store.state.cartStore.lastExpireInModeOf == 'trip') {
          let _hotelExpiredDetails = this.doCleanArray(
            this.$store.state.cartStore.lastExpireItemDetail
          );

          if (typeof _hotelExpiredDetails.details == 'string')
            _hotelExpiredDetails.details = JSON.parse(
              _hotelExpiredDetails.details
            );

          // pre-populate main filters
          setTimeout(
            function () {
              this.sradius = Number(
                _hotelExpiredDetails.details.searchData.radius
              );

              this.destinationValue = {
                name: _hotelExpiredDetails.details.searchData.name,
                code: _hotelExpiredDetails.details.searchData.code,
                ID: _hotelExpiredDetails.details.searchData.Id,
                geoLat: _hotelExpiredDetails.details.searchData.geoLat,
                geoLong: _hotelExpiredDetails.details.searchData.geoLong,
                sPickup: _hotelExpiredDetails.details.searchData,
              };

              let _searchedPayload = this.doCleanArray(
                _hotelExpiredDetails.details.searchData
              );
              let myPickTime = _searchedPayload.checkinDate;
              let myDropTime = _searchedPayload.checkoutDate;

              this.checkInDate = moment(myPickTime).format('YYYY-MM-DD');
              this.checkOutDate = moment(myDropTime).format('YYYY-MM-DD');
              this.roomsValue.selectedPeopleSets =
                _hotelExpiredDetails.details.searchData.rooms;
            }.bind(this),
            2000
          );

          setTimeout(
            function () {
              // needed to reinit call on chekout
              this.$store
                .dispatch('setHotelAutoSearchAgain', {
                  STATUS: false,
                })
                .then(() => {
                  this.$refs.srchMainBtn.$el.click();
                });
            }.bind(this),

            3000
          );
        } // Ends IF Trip Mode
      } // If Hotel
    },

    initData() {
      this.hotels = this.makeTabAbles(this.doCleanArray(this.StoreHotels));
      this.mapResultget = false;

      if (this.hotelCount > 0) {
        this.showFilter = true;
      } else {
        this.showFilter = false;
      }

      this.setHotelCount = this.hotelCount;
      this.roomsValue.selectedPeopleSets = this.searchData.rooms;

      this.destinationValue = {
        ID: this.searchData.id,
        geoLat: this.searchData.geoLat,
        geoLong: this.searchData.geoLong,
        name: this.searchData.name,
        sPickup: this.searchData,
        locationId: this.searchData.locationId,
        locationType: this.searchData.locationType,
      };

      this.SearchDataPopulate();
      this.doMakePaginations(this.hotels);
      this.makeDisplayItems();
      this.totalGuest();
      if (this.domain == 'uk' || this.domain == 'mx' || this.domain == 'ie') {
        this.sradius = 15000;
      }

      evBus.$on('makeAdvFilterCall', () => {
        setTimeout(() => {
          if (this.makeFilterCallInProcess == 0) {
            this.makeFilterCallInProcess = 1;
            this.freshlyMount = false;
            this.calculateAdvanceResults();
          }
        }, 1500);
      });
    },

    doSearchHotelById() {
      let that = this;

      that.makeFilterCallInProcess = 0;

      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token,
        },
      };

      let reqPayLoad = {
        searchId: this.hotelSearchId,
        sortBy: 'asc',
      };

      hotelServices
        .getHotelBySearchId((reqHeaders, reqPayLoad))
        .then((rsp) => {
          if (!rsp.data.data) {
            this.$awn.success(
              "Sorry, We couldn't find any results matching your criteria, but changing your search may help."
            );
            return false;
          }
          this.sId = rsp.data.data.sessionId;
          console.log(
            'SearchHotelById hotel sessionId ' + rsp.data.data.sessionId
          );
          if (rsp.data.success == false) {
            this.message = rsp.data.message;
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
            this.regularSearch = false;
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
            //
            this.$store.dispatch('setAuthentication', {
              payload: _cadeLoggedUser,
            });
          }

          this.SearchDataPopulate();

          evBus.$emit('resetDskFilterCounter');

          that.setHotelCount = rsp.data.data.hotelsCount.length;
          that.hotels = that.makeTabAbles(
            that.doCleanArray(rsp.data.data.hotels)
          );
          that.doMakePaginations(that.hotels);
          that.makeDisplayItems();

          this.$store.dispatch('userDetails', { payload: rsp.data });

          let cRespond = rsp.data;

          that.$store.dispatch('reSetHotelLocations');

          that.$store
            .dispatch('setSearchedHotelDetails', {
              SRCH_CAR_RESPOND: cRespond,
            })
            .then(() => {
              that.seldistance = '';
              that.selstarRating = 0;
              that.selFacilities = '';
              that.sortBy = 'lowestPrice_asc';
              that.sortHotelBy = 'ALL';
              that.panel = null;

              // For Advance Filters

              that.$refs.mobFilter.clear();
              evBus.$emit('populateFilters');
              that.$forceUpdate();
            });

          this.initData();
        })
        .catch((err) => {
          that.$sentry.withScope(function () {
            that.$sentry.captureException(new Error(err));
          });
        })
        .finally(() => {
          if (this.checkTripOfUserHtl && this.tripExist)
            this.verifyTripByUser();

          this.checkTripOfUserHtl = false;
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
    reinitSearch() {
      this.submitForm();
    },

    filtersDataShow(data) {
      this.sliderValue = data.sliderValue;
      this.distanceSlider = data.distanceSlider;
      this.selstarRating = data.selstarRating;
      this.selFacilities = data.selFacilities;
      this.searchByName = data.searchByName;
      this.basisList = data.selRoom;
      this.sortBy = data.sortBy;
      this.selHotelName = data.selHotelName;
    },

    mobileFilterData(data) {
      this.mbSliderValue = data.mbSliderValue;
      this.mbSeldistance = data.mbSeldistance;
      this.mbselstarRating = data.mbselstarRating;
      this.mbldistanceSlider = data.mbldistanceSlider;
      this.mbSelFacilities = data.mbSelFacilities;
      this.searchByName = data.searchByName;
      this.basisList = data.basisList;
      this.sortBy = data.sortBy;
      this.selHotelName = data.selHotelName;
      this.calculateMobileResults();
    },

    totalGuest() {
      let totalAudlt = 0;
      let totalChild = 0;

      if (this.searchData) {
        for (let i = 0; i < this.searchData.rooms.length; i++) {
          totalAudlt += parseInt(this.searchData.rooms[i].adults);
          totalChild += parseInt(this.searchData.rooms[i].childs.length);
        }
        this.roomsValue.guests =
          totalAudlt + ' Adults - ' + totalChild + ' Children';
      }
    },

    submitForm() {
      if (!this.$refs.form.validate()) return false;

      let that = this;

      that.makeFilterCallInProcess = 1;

      let _myDatecheckin = formattedDate(this.checkInDate, this.countryDF);
      let _myDatecheckout = formattedDate(this.checkOutDate, this.countryDF);
      let _searchDate = formattedDate(new Date(), this.countryDF);

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

          _searchDate = _searchDate.split('/');
        _searchDate =
          _searchDate[1] + '/' + _searchDate[0] + '/' + _searchDate[2];
      }

      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let reqPayload = {
        radius: this.sradius,
        name: this.destinationValue.name,
        code: this.destinationValue.code,
        Id: this.destinationValue.ID,
        geoLat: this.destinationValue.geoLat,
        geoLong: this.destinationValue.geoLong,
        locationId: this.destinationValue.locationId,
        locationType: this.destinationValue.locationType,
        checkinDate:
          moment(_myDatecheckin).format('YYYY-MM-DD' + 'THH:mm:ss') + 'Z',
        checkoutDate:
          moment(_myDatecheckout).format('YYYY-MM-DD' + 'THH:mm:ss') + 'Z',
        searchDate: moment(_searchDate).format('YYYY-MM-DD'),
        desiredResultCurrency: this.CType,
        rooms: this.roomsValue.selectedPeopleSets,
        search: true,
        residency: 'us',
      };

      hotelServices
        .searchHotels(reqPayload, reqHeaders)
        .then((rsp) => {
          console.log('HotelSearch hotel sessionId ' + rsp.data.data.sessionId);
          this.sId = rsp.data.data.sessionId;
          this.message = '';
          this.regularSearch = true;

          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            this.doPopLogout();
            return true;
          }
          
          if (
            rsp.data.success == false &&
            rsp.data.message != 'Token has expired'
          ) {

            this.message = rsp.data.message;
          }

          evBus.$emit('resetDskFilterCounter');

          that.showFilter = true;
          that.$store.dispatch('resetAppliedFilter');

          // ISSUE SEENS here incase no adcance filters
          if (that.showFilter && typeof that.$refs.deskFilter != 'undefined')
            that.$refs.deskFilter.resetFilter();

          that.$refs.mobFilter.clear();

          that.setHotelCount = rsp.data.data.hotelsCount;
          that.hotels = that.makeTabAbles(
            that.doCleanArray(rsp.data.data.hotels)
          );
          that.doMakePaginations(that.hotels);
          that.makeDisplayItems();

          this.$store.dispatch('userDetails', { payload: rsp.data });

          let cRespond = rsp.data;

          that.$store.dispatch('reSetHotelLocations');

          that.$store
            .dispatch('setSearchedHotelDetails', {
              SRCH_CAR_RESPOND: cRespond,
            })
            .then(() => {
              setTimeout(() => {
                that.seldistance = '';
                that.selstarRating = 0;
                that.selFacilities = '';
                that.sortBy = 'lowestPrice_asc';
                that.sortHotelBy = 'ALL';
                that.panel = null;
                that.populateAdvanceFilters(false);
                that.$forceUpdate();
                // ISSUE SEENS here incase no adcance filters

                if (
                  that.showFilter &&
                  typeof that.$refs.deskFilter != 'undefined'
                )
                  that.$refs.deskFilter.resetFilter();
              }, 4000);
            });
        })
        .catch((err) => {
          let sessionId = this.HotelStore.sessionId;
          let that = this;
          that.$sentry.withScope(function (scope) {
            scope.setExtra('sessionId', sessionId);
            that.$sentry.captureException(new Error(err));
          });
        });
      return true;
    },

    checkInSelected() {
      let nextDayValue = nextDay(this.checkInDate, this.checkOutDate);
      if (nextDayValue) {
        this.checkOutDate = nextDayValue;
      }
    },
    SearchDataPopulate() {
      // pre-populate main filters
      setTimeout(() => {
        if (this.searchData) {
          this.sradius = Number(this.searchData.radius);

          this.destinationValue = {
            name: this.searchData.name,
            code: this.searchData.code,
            ID: this.searchData.id,
            geoLat: this.searchData.geoLat,
            geoLong: this.searchData.geoLong,
            locationId: this.searchData.locationId,
            locationType: this.searchData.locationType,
            sPickup: this.searchData,
          };

          let _searchedPayload = this.doCleanArray(this.searchData);
          let myPickTime = _searchedPayload.checkinDate;
          let myDropTime = _searchedPayload.checkoutDate;

          this.checkInDate = moment(myPickTime.split('T')[0]).format(
            'YYYY-MM-DD'
          );

          this.checkOutDate = moment(myDropTime.split('T')[0]).format(
            'YYYY-MM-DD'
          );
          this.roomsValue.selectedPeopleSets = this.searchData.rooms;
        }
      }, 2000);

      setTimeout(
        function () {
          // needed to reinit call on chekout

          if (this.$store.state.hotelStore.searchHotelAgain == true) {
            this.$store
              .dispatch('setHotelAutoSearchAgain', {
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
      this.populateAdvanceFilters(false);
      this.freshlyMount = true;
      // this.populateMobileFilters();
      this.$awn.success(
        'Your being timed out due to inactivity, Please try show detail again!'
      );
      this.$refs.srchMainBtn.$el.click();
    },

    FilterHotelName(event, allHotels, searchVal) {
      if (event == 'keyword remove') {
        /*
          this.initData();
        */

        if (searchVal == '') {
          console.log('adding hotels agains');
          this.hotels = allHotels;
          this.setHotelCount = this.hotels.length;
          this.doMakePaginations(this.hotels);
          this.makeDisplayItems();
        }
      } else {
        // eslint-disable-next-line no-inner-declarations
        function compare(a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }

        this.hotels = allHotels
          .filter((user) => {
            return user.displayName.includes(event);
          })
          .sort(compare);
        this.setHotelCount = this.hotels.length;
        this.doMakePaginations(this.hotels);
        this.makeDisplayItems();
      }
    },

    MapFilterHotelName(event) {
      this.initData();
      this.mapResultget = true;
      // eslint-disable-next-line no-inner-declarations
      function compare(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }

      this.hotels = this.hotels
        .filter((user) => {
          return user.displayName.includes(event);
        })
        .sort(compare);
      this.setHotelCount = this.hotels.length;
      this.doMakePaginations(this.hotels);
      this.makeDisplayItems();
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
        sessionId: this.HotelStore.sessionId,
      };

      if (this.sliderValue.length > 0) {
        let pricesPayLoads = {
          min: this.sliderValue[0],
          max: this.sliderValue[1],
        };
        reqPayLoad.priceRange = pricesPayLoads;
      }

      if (this.sortBy) {
        let sortQuery = this.sortBy.split('_');
        let order = sortQuery[1];
        let indexKey = sortQuery[0];
        let sortPayload = {
          sortField: indexKey,
          sortOrder: order,
          sortIsString: true,
          sortOn: this.sortHotelBy,
        };
        if (indexKey == 'lowestPrice') sortPayload.sortIsString = false;
        reqPayLoad.sortByField = sortPayload;
      }
      if (this.selFacilities.length > 0) {
        if (this.selFacilities.join() != '0')
          reqPayLoad.hotelFacilities = this.selFacilities.join();
      }
      if (this.distanceSlider.length > 0) {
        let distancePayLoads = {
          min: this.distanceSlider[0],
          max: this.distanceSlider[1],
        };
        reqPayLoad.distance = distancePayLoads;
      }
      if (this.selstarRating.length > 0) {
        if (this.selstarRating.join() != 'Any')
          reqPayLoad.starRating = this.selstarRating.join();
      }
      if (this.basisList.length > 0) {
        if (this.basisList.join() != 'Any')
          reqPayLoad.basisList = this.basisList.join();
      }
      hotelServices
        .getFilterHotel(reqPayLoad, reqHeaders)
        .then((rsp) => {
          if (rsp.data.errors.message == 'Session is expired.') {
            this.$awn.success(
              'Your being timed out due to inactivity, Please search again !'
            );
            this.reinitSearch();
            return false;
          }
          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            this.doPopLogout();
            return true;
          }

          if (
            rsp.data.success == false &&
            rsp.data.errors == false &&
            rsp.data.message != 'Token has expired'
          ) {
            if (rsp.data.data.hotelsCount != 0) {
              this.reinitSearch();
              return false;
            }
          }

          evBus.$emit('resetDskFilterCounter');
          that.panel = null;
          that.setHotelCount = rsp.data.data.hotelsCount;
          let totalNights = rsp.data.data.totalNights;
          that.$store.dispatch('setNights', totalNights);
          that.hotels = that.makeTabAbles(
            that.doCleanArray(rsp.data.data.hotels)
          );
          that.doMakePaginations(that.hotels);
          that.makeDisplayItems();
          this.$store.dispatch('userDetails', { payload: rsp.data });
          let cRespond = rsp.data;
          that.$store.dispatch('reSetHotelLocations');
          that.$store.dispatch('setSearchedHotelDetails', {
            SRCH_CAR_RESPOND: cRespond,
          });

          that.$store.dispatch('updatePrice', {
            requestPayload: reqPayLoad,
          });
        })
        .catch((err) => {
          that.$sentry.withScope(function (scope) {
            scope.setExtra('sessionId', that.HotelStore.sessionId);
            that.$sentry.captureException(new Error(err));
          });
        })
        .finally(() => {
          that.makeFilterCallInProcess = 1;
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
      var that = this;
      let reqHeaders = {
        headers: { 'Content-Type': 'application/json' },
      };

      let reqPayLoad = {
        sessionId: this.HotelStore.sessionId,
      };

      if (this.mbSliderValue.length > 0) {
        let pricesPayLoads = {
          min: this.mbSliderValue[0],
          max: this.mbSliderValue[1],
        };
        reqPayLoad.priceRange = pricesPayLoads;
      }
      if (this.mbSelFacilities.length > 0) {
        if (this.mbSelFacilities.join() != 0)
          reqPayLoad.hotelFacilities = this.mbSelFacilities.join();
      }
      if (this.mbldistanceSlider.length > 0) {
        let distancePayLoads = {
          min: this.mbldistanceSlider[0],
          max: this.mbldistanceSlider[1],
        };

        reqPayLoad.distance = distancePayLoads;
      }
      if (this.mbselstarRating.length > 0) {
        if (this.mbselstarRating.join() != 'Any')
          reqPayLoad.starRating = this.mbselstarRating.join();
      }

      if (this.basisList.length > 0) {
        if (this.basisList.join() != 'Any')
          reqPayLoad.basisList = this.basisList.join();
      }

      if (this.sortBy) {
        let sortQuery = this.sortBy.split('_');
        let order = sortQuery[1];
        let indexKey = sortQuery[0];
        let sortPayload = {
          sortField: indexKey,
          sortOrder: order,
          sortIsString: false,
        };

        sortPayload.sortOn = this.sortHotelBy;

        if (indexKey == 'lowestPrice') sortPayload.sortIsString = false;
        reqPayLoad.sortByField = sortPayload;
      }

      hotelServices
        .getFilterHotel(reqPayLoad, reqHeaders)
        .then((rsp) => {
          if (rsp.data.errors.message == 'Session is expired.') {
            this.$awn.success(
              'Your being timed out due to inactivity, Please search again !'
            );
            this.reinitSearch();
            return false;
          }
          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            this.doPopLogout();
            return true;
          }

          that.panel = null;
          that.setHotelCount = rsp.data.data.hotelsCount;
          that.hotels = that.makeTabAbles(
            that.doCleanArray(rsp.data.data.hotels)
          );
          let cRespond = rsp.data;

          that.$store.dispatch('setSearchedHotelDetails', {
            SRCH_CAR_RESPOND: cRespond,
          });
          that.$store.dispatch('updatePrice', {
            requestPayload: reqPayLoad,
          });
          that.doMakePaginations(that.hotels);
          that.makeDisplayItems();
        })
        .catch((err) => {
          that.$sentry.withScope(function (scope) {
            scope.setExtra('sessionId', that.HotelStore.sessionId);
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
.circle-icon {
  color: blue;
  position: relative;
  left: 3px;
  font-size: 19px;
  top: 3px;
}
</style>
