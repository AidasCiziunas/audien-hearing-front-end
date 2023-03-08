<template>
  <div class="col-md-12 col-lg-12">
    <section class="trip-detail-wrapper">
      <v-container>

        <div class="title-heading">
          <h1 class="blue-heading">Trip Details</h1>
        </div>
     
        <v-form ref="form" class="" lazy-validation>
          <v-card class="trip-card">
               <div
                class="w-60 float-left"
                style="padding-top: 15px;"
              >
                <p>
                  <img
                    :src="require('@/assets/images/trip-blue-icon.svg').default"
                     style="width: 23px;margin-left: -3px;"
                  />
                    {{ userTrips[0].tripId }} -
                    {{ userTrips[0].tripName }} 

                </p>
                <p  style="font-size: 14px; font-weight: 500;" v-if="tripBooking.length>0 && tripBooking[tripBooking.length-1].atol!=undefined && tripBooking[tripBooking.length-1].atol==true">
                  <img
                   v-if="domain == 'uk'"
                    :src="require('@/assets/images/atol-warning.jpg').default"
                     class="atol-icon"
                  />
                  <img
                  v-if="domain == 'ie'"
                    :src="require('@/assets/images/topps.jpg').default"
                     style="width:60px; height:30px;"
                     class="atol-icon"
                  />
                  {{tripBooking[tripBooking.length-1].atolMessage}}
                </p>
                <!--
                <p>
                  <i class="fas fa-money-bill-alt"></i>
                  <strong
                    >&nbsp; Total Trip Amount: {{ CSymbol }}
                    {{ myTripAmount }}</strong
                  >
                </p>
                -->
              </div>

              <div class="w-40 float-left mt-3">
                <router-link to="/my_trips" style="text-decoration: none;">
                <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  v-if="!tripExist"
                  color="primary"
                  class="btn-save "
                  width="auto"
                  @click="selectTrip(userTrips[0].tripId)"
                >
                  Select This Trip
                </v-btn>
              </template>
              <span
                >This is not your current selected trip. To refresh this item
                please click the "Select this trip" button first.</span
              >
            </v-tooltip>
                  <v-btn color="error" class="btn-save ml-3">
                    Back To My Trips
                  </v-btn>
                  
                </router-link>
              </div> 
          </v-card>
        </v-form>
         
      </v-container>
    </section>

    <section>
      <v-container>
        <template>
          <!--tabs div start-->
          <div
            class="tripdetail-page-listing"
            style="margin: 25px 0px 25px 0px;"
          >
         
            <v-tabs align-with-title v-model="acTab">
              <v-tabs-slider color="primary"></v-tabs-slider>

              <v-tab
                href="#tab-1"
                ref="currentItemTab"
                @click="acTab = 'tab-1'"
              >
                Current Items
              </v-tab>

              <v-tab href="#tab-2" @click="acTab = 'tab-2'">
                Booked Itinerary
              </v-tab>

              <v-tab
                href="#tab-3"
                ref="expiredItemTab"
                @click="acTab = 'tab-3'"
              >
                Expired Items
              </v-tab>

              <v-tab href="#tab-4" @click="acTab = 'tab-4'" v-if="signedUserRole == 'agent'">
                Quote
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="acTab">
              <v-tab-item value="tab-1"
                ><!--current item-->
                <v-card flat>
                  <CurrentTab
                    :tripBooking="tripBooking"
                    :itemDetials="itemDetials"
                    :activeDomain="activeDomain"
                    :CSymbol="CSymbol"
                    :fType="fType"
                    :transformToCode="transformToCode"
                    :setNightCount="setNightCount"
                    :removeTrip="removeTrip"
                    :ckTripInfo="ckTripInfo"
                    :hasCurrentItems="hasCurrentItems"
                    :cCodes="cCodes"
                    :searchData="searchData"
                    :personCount="personCount"
                    :fixPathOfImage="fixPathOfImage"
                  />
                </v-card> </v-tab-item
              ><!--current item-->

              <v-tab-item value="tab-2"
                ><!--booked item-->
                <v-card flat>
                  <BookedItineraryTab
                    :tripBooking="tripBooking"
                    :itemDetials="itemDetials"
                    :activeDomain="activeDomain"
                    :CSymbol="CSymbol"
                    :fType="fType"
                    :userTrip="userTrips"
                    :transformToCode="transformToCode"
                    :setNightCount="setNightCount"
                    :removeTrip="removeTrip"
                    :ckTripInfo="ckTripInfo"
                    :hasBookedItems="hasBookedItems"
                    :cCodes="cCodes"
                    :searchData="searchData"
                    :personCount="personCount"
                  />
                </v-card> </v-tab-item
              ><!--booked item-->

              <v-tab-item value="tab-3"
                ><!--expired item-->
                <v-card flat>
                  <ExpiredTab
                    :tripBooking="tripBooking"
                    :itemDetials="itemDetials"
                    :activeDomain="activeDomain"
                    :CSymbol="CSymbol"
                    :fType="fType"
                    :transformToCode="transformToCode"
                    :setNightCount="setNightCount"
                    :removeTrip="removeTrip"
                    :ckTripInfo="ckTripInfo"
                    :hasExpiryItems="hasExpiryItems"
                    :cCodes="cCodes"
                    :searchData="searchData"
                    :tripExist="isTripExist"
                    :personCount="personCount"
                    :fixPathOfImage="fixPathOfImage"
                  />
                </v-card> </v-tab-item
              ><!--expired item-->

              <v-tab-item value="tab-4"
                ><!--Quote-->
                <v-card flat>
                  <QuoteTab
                    :fType="fType"
                    :transformToCode="transformToCode"
                    :setNightCount="setNightCount"
                    :removeTrip="removeTrip"
                    :tripId="tripId"
                    :onlineMode="onlineMode"
                    :personCount="personCount"
                  />
                </v-card> </v-tab-item
              ><!--Quote-->
            </v-tabs-items>
          </div>
          <!--tabs div ends-->
        </template>
      </v-container>
    </section>
  </div>
</template>
<script>
var moment = require('moment');

import Slider from '@/components/front/hotels/Slider';

import ExtraAvailableTab from './Carstabs/ExtraAvailableTab.vue';
import TripSummaryTab from './Carstabs/TripSummaryTab.vue';
import PackageDetailsTab from './Carstabs/PackageDetailsTab.vue';
import CancellationPoliciesTab from './Carstabs/CancellationPoliciesTab.vue';

import FlightDetailTab from './tabs/FlightDetailTab.vue';
import FareSummaryTab from './tabs/FareSummaryTab.vue';
import FareDisclamierTab from './tabs/FareDisclamierTab.vue';

import CurrentTab from './tabs/viewDetails/CurrentTab.vue';
import BookedItineraryTab from './tabs/viewDetails/BookedItineraryTab.vue';
import ExpiredTab from './tabs/viewDetails/ExpiredTab.vue';
import QuoteTab from './tabs/viewDetails/QuoteTab.vue';

import StarRating from 'vue-star-rating';
import { mapState } from 'vuex';
import { evBus } from '@/services/bus.js';
import countryCodes from '@/services/data/countraycodes';
import tripServices from '@/services/api/Trips.js';

export default {
  name: 'TripViewDetails',

  components: {
    StarRating,
    ExtraAvailableTab,
    TripSummaryTab,
    PackageDetailsTab,
    CancellationPoliciesTab,

    FlightDetailTab,
    FareSummaryTab,
    FareDisclamierTab,
    Slider,

    CurrentTab,
    BookedItineraryTab,
    ExpiredTab,
    QuoteTab
  },

  data() {
    return {
      hotel: '',
      tripBooking: [],
      tripdetailsget: [],
      itemDetials: [],
      searchData: [],
      flightType: 'oneWay',
      fType: '',
      // CSymbol: this.$store.state.envStore.CSymbol,
      readMore: 'a',
      cCodes: countryCodes,
      totalNights: 0,
      acTab: 'tab-1',
      myTripAmount: 0,
      tripId: 0,
      hasExpiryItems: [],
      hasBookedItems: [],
      hasCurrentItems: [],
      onlineMode: true,
      clientName: '',
      trip:""
    };
  },

  computed: {
    ...mapState({
      agentData: state => state.authStore.user[0].agent,
      userTrips: state => state.tripStore.userTripDetais,
      globalData: state => state.envStore,
      tripDetail: state => state.tripStore,
      tripExist: state => state.tripStore.tripExist,
      CType: state => state.envStore.CType,
      CSymbol: state => state.envStore.CSymbol,
      DFormat: state => state.envStore.DFormat,
      countryDF: state => state.envStore.countryDF,
      domain: state => state.envStore.domain
    }),

    activeDomain() {
      return this.$store.state.envStore.activedomain;
    },

    isTripExist() {
      return this.tripExist;
    }
  },

  created: function() {
    evBus.$emit('toggleBannerDisplay', true);

    evBus.$on('tripUpated', () => {
      setTimeout(
        function() {
          this.doCheckOutTripDetails();
        }.bind(this),
        1500
      );
    });

  },

  mounted() {

    this.getUserTripData();
/*     this.getTotalTripAmount(); */
  },

  methods: {
    fixPathOfImage(path) {

        if(path.indexOf("square60") >= 0)
            return path.replace("square60", "square810");

        return path;
    },
    selectTrip(tripId) {
      this.$confirm('Do you want to select this trip?', {
        title: 'Select Trip?'
      }).then(res => {
        if (res == false) return false;

        let reqHeaders = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        let reqPayLoad = {
          searchBy: 'tripId',
          searchKey: tripId
        };
        tripServices.searchTrip((reqHeaders, reqPayLoad)).then(response => {
          if (response.data.errors.message == 'Session is expired.') {
            this.$awn.success(
              'Your being timed out due to inactivity, Please try View Hotel again !'
            );

            /*    this.$emit('resetSearch', hotelId); */
          } else if (
            response.data.message ==
            'Hotel Package not found! Please try again later.'
          ) {
            this.$awn.alert(
              'We have not received the details needed from our supplier to view this hotel . Please select another hotel.'
            );
          } else {
            /*** 
                        This area will make log into this trip 
                    ***/
            let searchedTripInfo = response.data.data[0];
            let isExpire = searchedTripInfo.tripClock.expire;
            this.$store.dispatch('resetExpireItemSearchedDetails');

            this.ckTripBasicInfo(searchedTripInfo);

            this.refreshTripWhenItemRemoved = false;

            this.setUpTripDetails(response.data.data[0], 'mixins', false);

            this.checkTripItemsExpiry(response.data.data[0]);

            if (response.data.data[0].tripbookings.length > 0) {
              /*
                            this.$store.dispatch(
                                'switchTrip',
                                response.data.data[0]
                            );
                        */

              this.$store.dispatch('UserAllTripsDetails', response.data.data);
              if(this.$refs.expiredItemTab){  
              (isExpire) ? this.$refs.expiredItemTab.$el.click() : this.$refs.currentItemTab.$el.click();
              }
            } else {
              this.$awn.alert(
                'Trip booking data not available for this trip ID.'
              );
            }
          }
        });
      });
    },

    checkTripItemsExpiry(itemsOfTrip) {
      evBus.$emit('expireItem', false);

      let _tripBookings = itemsOfTrip.tripbookings;

      if (_tripBookings.length) {
        _tripBookings.forEach(item => {
          if (item.sessionDetails.expire && item.status != 'booked'){
            evBus.$emit('expireItem', true);
          }
        });
      }
    },
    ckTripInfo() {
      let myTrip = this.userTrips[0];

      this.$store.dispatch('resetExpireItemSearchedDetails');

      this.ckTripBasicInfo(myTrip);

      this.getTripById(myTrip.tripId, 'MyTrips');

      this.makeHistoryOfMyTrips = true;
    },

    ckTripBasicInfo: function(tripNavInfo) {
      let storePayload = {
        name: tripNavInfo.tripName,
        trip_id: tripNavInfo.tripId,
        tripStartDate: '',
        trv_name: '',
        primaryTravellerId: 0
      };

      if (tripNavInfo.triptravellers.length) {
        storePayload.trv_name =
          tripNavInfo.triptravellers[0].traveller.firstName +
          ' ' +
          tripNavInfo.triptravellers[0].traveller.lastName;

        storePayload.primaryTravellerId =
          tripNavInfo.triptravellers[0].traveller.iUserID;

        storePayload.tripStartDate = tripNavInfo.triptravellers[0].created_at.substr(
          0,
          10
        );
      }

      if (typeof tripNavInfo.tripStartDate != 'undefined')
        storePayload.tripStartDate = tripNavInfo.tripStartDate.substr(0, 10);

      this.$store.dispatch('setTripDetail', { TRIP: storePayload });

      return true;
    },

    removeTrip(item) {

      this.$confirm('Are you sure?', { title: 'Delete Item' }).then(res => {
    
        if (res == false) return false;

        let reqHeaders = { headers: { 'Content-Type': 'application/json' } };

        let reqDataForm = {};

        reqDataForm.tripId = item.tripId;
        reqDataForm.tripMetaId = item.id;

        tripServices
          .deleteTripData(reqDataForm, reqHeaders)
          .then(() => {
            this.$awn.info('Item has removed successfully from trip', {
              labels: { info: 'Item Deleted' }
            });

            this.viewTrip(reqDataForm.tripId);
          })
          .catch(err => {
            this.$sentry.captureException(new Error(err));
            this.$awn.alert('Please try later, server encounter error..!');
          });
      });
    },

    viewTrip(tripId) {
    
      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      let reqPayLoad = {
        searchBy: 'tripId',
        searchKey: tripId
      };

      tripServices.searchTrip((reqHeaders, reqPayLoad)).then(response => {
      
        if (response.data.errors.message == 'Session is expired.') {
          this.$awn.success(
            'Your being timed out due to inactivity, Please try View Hotel again !'
          );
        } else {

          if(this.tripExist) {
            
            if(tripId==this.tripDetail.tripID) {

              this.refreshTripWhenItemRemoved = false;
              this.setUpTripDetails(response.data.data[0], 'mixins', false);
            }
          }

          this.$store
            .dispatch('UserAllTripsDetails', response.data.data)
            .then(() => {

              this.getUserTripData();

              this.getTotalTripAmount();
            });

          if (response.data.data[0].tripbookings.length == 0)
            this.$awn.alert(
              'Trip booking data not available for this trip ID.'
            );
        }
      });
    },

    getUserTripData() {

      this.tripId = this.userTrips[0].tripId;

      this.tripBooking = this.doCleanArray(this.userTrips[0].tripbookings);

      this.tripdetailsget = this.userTrips[0].tripbookings;

      let _itemDetials = this.tripdetailsget.map(item => {
        console.log('mmm', JSON.parse(item.details))
        if(item.details !== null){
        return {
          search: JSON.parse(item.details).engineDetails
        };
      }
      });

      _itemDetials.map(item => {
        if(item !== undefined){
        return item.search.expanded = false;
        }
      });

      this.itemDetials = _itemDetials;

      this.searchData = this.tripdetailsget.map(item => {
        if(item.details !==null){
        return {
          searchRecord: JSON.parse(item.details).searchData
        };
      }
      });

      if (this.tripBooking[0].sessionDetails && this.tripBooking[0].sessionDetails.expire) {
        this.$refs.expiredItemTab.$el.click();
      }
    },

    getTotalTripAmount() {
      let _myBookings = this.tripBooking,
        amount = 0;

      _myBookings.forEach((bookItem, index) => {

        // case of expire
        if (
          bookItem.sessionDetails.expire &&
          bookItem.status != 'booked' &&
          bookItem.status != 'completed'
        )
          this.hasExpiryItems.push(index);

        // case of booked
        if (bookItem.status == 'booked' || bookItem.status == 'completed')
          this.hasBookedItems.push(index);

        // case of current
        if (
          bookItem.sessionDetails.expire == false &&
          bookItem.status != 'booked' &&
          bookItem.status != 'completed'
        )
          this.hasCurrentItems.push(index);

        bookItem.item = JSON.parse(this.doCleanArray(bookItem.details));

        if (bookItem.engine == 'car')
          amount += parseFloat(bookItem.item.engineDetails.FinalPrice);

        if (bookItem.engine == 'flight')
          amount += parseFloat(bookItem.item.engineDetails.totalPrice);

        if (bookItem.engine == 'hotel')
          amount += parseFloat(bookItem.packagePrice);

        if (bookItem.engine == 'villa')
          amount += parseFloat(this.calculateRoomsPricesInVilla(this.doCleanArray(bookItem.item.villaDetails)));
      });

      this.myTripAmount = amount.toFixed(2);
    },

    setNightCount(searchData) {
      let a = moment(searchData.checkinDate, 'YYYY-MM-DD');
      let b = moment(searchData.checkoutDate, 'YYYY-MM-DD');
      let total = moment.duration(b.diff(a)).asDays();

      return total;
    },

    transformToCode(name) {
      return name.slice(name.indexOf('(') + 1, name.indexOf(')'));
    },

    personCount(rooms) {
        let initialValue = 0;
        let adults = rooms.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.persons.adult;
        }, initialValue);
        let children = rooms.reduce(function(accumulator, currentValue) {
            return accumulator + currentValue.persons.child;
        }, initialValue);
        return `${
            adults > 1 ? adults + ' adults' : adults + ' adult'
        }, ${children} children`;
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(value).format('MM/DD/YYYY');
    },

    numberFormat(value, countryCodes, code) {
      //creating variable name to get from json
      var CountryCodeMask = countryCodes[code];

      // count hashes
      var count = (CountryCodeMask.match(/#/g) || []).length;

      // clean number
      var number = value.replace(/[^\d.]/g, '');

      // number to apply mask
      var maskToApplyNumber = number.substring(number.length - count);

      // apply format
      //var returnNumber = format(maskToApplyNumber,CountryCodeMask);
      var i = 0,
        v = maskToApplyNumber.toString();
      // eslint-disable-next-line no-unused-vars
      let returnNumber = CountryCodeMask.replace(/#/g, _ => v[i++]);

      return returnNumber;
    }
  }
};
</script>
<style scoped>
.room-non-refundable-link-custom {
  color: #3d4ed7 !important;
}
.noAvailability {
  font-weight: 500;
  text-align: center;
  padding: 10px;
  font-size: 15px;
}
.viewTripAcr .v-toolbar__content {
  background-color: #00bcd4 !important;
}
.hotel-product-varify ul li i {
  color: #949494;
  margin-right: 5px;
  font-size: 18px;
}
.product-specs.hotel-product-specs ul li {
  width: 9% !important;
  text-align: left;
}
.paragraph {
  font-size: 13px;
  color: #454850;
  padding-top: 10px;
}
.pass-dropdown {
  padding-bottom: 20px;
  float: left;
  width: 100%;
}

@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v90/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2)
    format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
  font-feature-settings: 'liga';
}

.bottom-mr {
  margin-bottom: 12px;
}
.atol-icon{
      width: 23px;
    margin-left: 0px;
    position: relative;
    top: 2px;
    right: 3px;
}
</style>
