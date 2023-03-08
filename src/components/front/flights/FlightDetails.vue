<template>
  <span style="display: block !important">
    <section class="hotel-search-filter">
      <v-container v-if="callStatus">

        <v-form ref="form" class="" lazy-validation> 
        <div class="banner-section" v-bind:style=" !showFilter ? 'background: none;' : 'background: rgba(255,255,255,0.6);' " >
          
          <div class="banner-section-box" v-if="fType=='oneWay' || fType=='roundTrip'">
            <div class="car-inner-left-box">
              <h6 v-for="(pickLoc, index) in flightStore.searchData.airportDepartRound" :key="index">
                <i class="fas fa-plane"></i>
                <strong>&nbsp;{{ pickLoc }} </strong>
              </h6>
              <p>
                <i class="far fa-calendar-alt"></i>
                &nbsp;{{ 
                  justFormatMyDate(
                          flightStore.searchData.date[0],
                          fullDateFormat()
                        )
                }}
              </p>
              <p>
                <i class="fas fa-user-friends"></i> 
                  
                  {{ searchData.adults }} Adult
                   | {{ searchData.child }} Child | {{ searchData.seniors }} Senior | {{ searchData.infants }} Infant
                 
              </p>
            </div>
            <div class="car-inner-left-box">
              <p v-for="(dropLoc, index) in flightStore.searchData.airportArriveRound" :key="index">
                <i class="fas fa-plane"></i>
                <strong>{{ dropLoc }} </strong>
              </p>
              <p v-if="flightStore.searchData.date.length > 1">
                <i class="far fa-calendar-alt"></i>
                {{justFormatMyDate(
                          flightStore.searchData.date[1],
                          fullDateFormat()
                        ) }}
              </p>
            </div>
            <div class="hotel-inner-right-box"></div>
          </div>

          <div class="banner-section-box" v-if="fType=='multiCity'">
            <span>
              <div class="car-inner-left-box">
                
                  <i class="fas fa-plane"></i>
                  <strong>&nbsp;{{ flightStore.searchData.airportDepartRound[0] }} </strong>
                

                <p v-if="flightStore.searchData.date.length > 1">
                  <i class="far fa-calendar-alt"></i>
                  &nbsp;{{ 
                    justFormatMyDate(
                            flightStore.searchData.date[0],
                            fullDateFormat()
                          )
                  }}
                </p>
              </div>
              <div class="car-inner-left-box">
                <p>
                  <i class="fas fa-plane"></i>
                  <strong> {{ flightStore.searchData.airportArriveRound[flightStore.searchData.airportArriveRound.length-1] }} </strong>
                  <p v-if="flightStore.searchData.date.length > 1">
                    <i class="far fa-calendar-alt"></i>
                    &nbsp;{{ 
                      justFormatMyDate(
                              flightStore.searchData.date[flightStore.searchData.date.length-1],
                              fullDateFormat()
                            )
                    }}
                  </p>
                </p>
              </div>
            </span>

              <p>
                  <i class="fas fa-user-friends"></i> 
                  {{ searchData.adults }} Adult
                   | {{ searchData.child }} Child | {{ searchData.seniors }} Senior | {{ searchData.infants }} Infant
                 
              </p>

          </div>

        </div>
        </v-form>

          <div class="title-heading">
               <h1 class="blue-heading">Flight Search</h1>
            </div>

        <div class="flight-search-card">
          <div class="flight-search-radio-buttons">
            <v-radio-group v-model="flightType" column>
              <ul>
                <li>
                  <v-radio
                    label="One Way"
                    color="primary"
                    value="oneWay"
                  />
                </li>
                <li>
                  <v-radio
                    label="Round Trip"
                    color="primary"
                    value="roundTrip"
                  />
                </li>
                <li>
                  <v-radio
                    label="Multi-City"
                    color="primary"
                    value="multiCity"
                  />
                </li>
              </ul>
            </v-radio-group>
          </div>
          <MultiCitySearch
            v-if="flightType === 'multiCity'"
            ref="multicitySearch"
            search=""
            @initFilter="initFIlters"
            @updatedRecord="initData"
          />
          <OneWaySearch
            v-else
            :flightType="flightType"
            @initFilter="initFIlters"
            ref="rightonewaysearch"
            @updatedRecord="initData"
          />
        </div>
      </v-container>
    </section>

    <section class="advance-filter-btn">
      <v-container>
        <div class="advance-sort-btn-box">
          <center>
            <v-btn-toggle mandatory>
              <v-btn tile depressed class="filter-btn-color">
                <img src="@/assets/images/1.png" alt="img" />
                <a @click.prevent="sortFilter = true"> Sort </a>
              </v-btn>
              <v-btn tile class="filter-btn-color">
                <img src="@/assets/images/2.png" alt="img" />
                <a @click.prevent="filter = true">Filter</a>
              </v-btn>
            </v-btn-toggle>
          </center>
        </div>
      </v-container>
    </section>

    <v-container>
      <div v-if="!showFilter && callStatus" class="search-heading">
        <div class="important-text-to-car">
          <p>
            <i class="fas fa-info"></i>
            {{ flightApiMessage }}
          </p>
        </div>
      </div>
    </v-container>

    <!-- search filters -->
    <section class="flight-message-box">

    <v-container  class="uk-flight-alert" v-if="ukAlertATOL ">
      <v-alert
        color="#3d4ed7"
        border="top"
        colored-border
        dense
        elevation="2"
        class="mt-3 mb-3"
      >
          <div class="pt-3 pb-3">
            <v-row>
              <v-col class="col-sm-1" style=" max-width: fit-content; ">
                <img v-if="domain == 'uk'" :src="require('@/assets/images/atol-warning.jpg').default"  style="max-width: 65px; max-height: 90px"/>
                <img v-if="domain == 'ie'" :src="require('@/assets/images/topps.jpg').default"  style="max-width: 65px; max-height: 90px"/>

              </v-col>
              <v-col class="col-sm-11" v-if="domain == 'uk'">
              All the flight-inclusive holidays on this website are financially protected by the ATOL scheme. When you pay you will be supplied with an ATOL Certificate. Please ask for it and check to ensure that everything you booked (flights, hotels and other services) is listed on it. If you do receive an ATOL Certificate but all the parts of your trip are not listed on it, those parts will not be ATOL protected. Some of the flights on this website are also financially protected by the ATOL scheme, but ATOL protection does not apply to all flights. This website will provide you with information on the protection that applies in the case of each flight before you make your booking. If you do not receive an ATOL Certificate then the booking will not be ATOL protected. Please see our booking conditions for information, or for more information about financial protection and the ATOL Certificate go to: <a href="https://www.caa.co.uk">www.caa.co.uk.</a> ATOL protection does not apply to the other holiday and travel services listed on this website
              </v-col>
              <v-col class="col-sm-11" v-if="domain == 'ie'">
              <h5>Irish Total Payment Protection (topp) Policy</h5>
                <p>In compliance with The Package Holidays and Travel Trade Act 1995 (Republic of Ireland), an insurance policy has been arranged with Arcus Solutions, to protect Republic of Ireland customers’ prepayments in the unlikely event of our financial failure, and paid in respect of:&nbsp;</p>

          <p>Travel inclusive packages sold by the Policyholder to Republic of Ireland customers with travel departing from the United Kingdom and European Union and from Republic of Ireland for a refund of such prepayments if customers have not yet travelled, or making arrangements to enable the holiday to continue if customers have already travelled, repatriation of customers as may be applicable, subject to the terms of the insurance policy.&nbsp;In the unlikely event of financial failure please contact the claims helpline on +44 (0) 1702 811397. A copy of the policy is available on request. The combination of travel services offered to you is a package within the meaning of the<em>&nbsp;Package Holidays &amp; Travel Trade Act. </em>Additionally, as required by law, InteleTravel has protection in place to refund your payments and, where transport is included in the package, to ensure your repatriation in the event that it becomes/they become insolvent”. <a href="https://www2.inteletravel.com.co/hubfs/layout/InteleTravel_Irish%20topp%20certificate.pdf?hsLang=en-ie" rel="noopener" target="_blank">View this policy as a PDF.</a> For information, click <a href="https://www.irishstatutebook.ie/eli/1995/act/17/enacted/en/print.html">Package Holidays &amp; Travel Trade Act.</a></p>

          <p><strong>This policy is provided by:</strong> Arcus Solutions – 3 Cours Charlemagne, 69002 Lyon – SARL au capital de 1 000€ – Téléphone: +44 (0) 207 065 5300. <a href="http://www.arcus-solutions.fr/">www.arcus-solutions.fr</a> RCS de Lyon n°853 774 529 – Code APE n°6622Z – ORIAS n°19006898. Le registre des intermédiaires d’assurances est tenu à jour par l’ORIAS disponible sur <a href="http://www.orias.fr/">www.orias.fr</a> Entreprise régie par le Code des Assurances et soumise au contrôle de l’ACPR – 4 place de Budapest, CS 92459, 75436 Paris Cedex 09 RC Professionnelle et Garantie Financière conformes aux articles L. 512-6 et L. 512-7 du Code des Assurances.</p>

          <p><strong>This policy is underwritten by:</strong> Accelerant Insurance Europe SA registered and authorised by the National Bank of Belgium and regulated by the Financial Services and Markets Authority (Ref. 3193), Acting in Ireland under Freedom of Services.</p>

          <p>The combination of travel services offered to you is a package within the meaning of the <a href="https://www.irishstatutebook.ie/eli/1995/act/17/enacted/en/print.html">Package Travel and Linked Travel Arrangements</a> Regulations 2018. Additionally, as required by law, InteleTravel has protection in place to refund your payments and, where transport is included in the package, to ensure your repatriation in the event that it becomes/they become insolvent”. For information, click <a href="https://www.irishstatutebook.ie/eli/1995/act/17/enacted/en/print.html">Package Holidays &amp; Travel Trade Act.</a></p>
              </v-col>
          </v-row>
          </div>
      </v-alert>
    </v-container>

      <v-container> 
           <div class="important-text-to-car">
            <p v-if="showFilter && callStatus">
            <v-alert
            border="top" 
            colored-border
            color="primary"
            type="info"
            elevation="2"
            >
             NOTICE: Due to current conditions,
              some flight details may not be immediately available. InteleTravel
              recommends you carefully note the cancellation policy for your
              airline, and contact the airline to confirm details after your
              booking.
            </v-alert>
        </p>
      </div>

          <!--<div class="important-text-to-car">
            <p v-if="!showFilter && callStatus">
              <i class="fas fa-info"></i>
              {{ flightApiMessage }}
            </p>
            <p v-if="showFilter && callStatus">
              <i class="fas fa-info"></i> NOTICE: Due to current conditions,
              some flight details may not be immediately available. InteleTravel
              recommends you carefully note the cancellation policy for your
              airline, and contact the airline to confirm details after your
              booking.
            </p>
          </div>-->
          <div class="search-heading">
          <h2 v-if="showFilter && callStatus">
            <strong> {{ flightsCount }} </strong> from {{ source }} to
            {{ dest }}
          </h2>
          </div>
        
        <div class="filter-heading"> <h6>Filters</h6></div>
        <div class="flight-filter car-search-filters" v-if="showFilter && callStatus">
          <DesktopFilters
            :inputSliderValues="inputSliderValues"
            :flightType="fType"
            ref="formss"
            :resetFormValues="resetFormValues"
            @onSliderValues="desktopFilterValues"
          />
        </div>
      </v-container>
    </section>

    <section class="listing-wrapper engine_listing_list">
      <v-container>
        <v-row v-if="showFilter">
          <div
            v-bind:class="[
              bookingExist == true
                ? 'col-md-9'
                : 'single-listing-repeat fff col-md-12'
            ]"
          >
            <div class="flight-listing-top-text">
              <!--  <p>
                Total price includes taxes + fees for 2 adults, Economy Class. Additional
                bag fees and other fees may apply.
              </p> -->
            </div>
            <v-expansion-panels v-model="panel">
              <v-expansion-panel
                v-for="(flight, index) in filteredFlights"
                :key="index"
              >
                <div class="single-listing-repeat flight-two-col one-way">
                  <div class="single-listing">
                    <div class="main-left">
                      <div class="outer-right flight-outer-right">
                        <div
                          class="flight-schedule"
                          v-bind:class="
                            fType === 'oneWay'
                              ? 'oneWay-results'
                              : 'multiple-results'
                          "
                          v-for="(route, routeIndex) in flight.flights"
                          :key="routeIndex"
                        >
                          <div class="f-in-left">
                            <div class="d-inline-block text-center">
                              <div
                                class="Airline-Image"
                                :class="`airline-${route.airlineIata}`"
                                id="logoairline"
                              ></div>
                              <p>
                                {{ route.airlineName }}
                              </p>
                              <p class="mt-2 text-align-cabin">
                                {{ route.cabinClass }} {{route.cabinClassText==''?'':'('+route.cabinClassText+')'}}
                              </p>
                            </div>
                          </div>
                          <div class="f-in-right">
                            <ul>
                              <li>
                                <div class="schedule-time-01">
                                  <h3>
                                    {{
                                      route.flightDetails.departData.departTime.split(
                                        ' '
                                      )[0]
                                    }}
                                    <span>
                                      {{
                                        route.flightDetails.departData.departTime.split(
                                          ' '
                                        )[1]
                                      }}
                                    </span>
                                  </h3>
                                  <p>
                                    {{
                                      transformToCode(
                                        route.flightDetails.departData
                                          .departCity
                                      )
                                    }}
                                  </p>
                                </div>
                                <div class="schedule-time-02">
                                  <div class="plane-icon-img">
                                    <img
                                      src="@/assets/images/plane-icon.png"
                                      alt="img"
                                    />
                                  </div>
                                  <p>
                                    {{ route.totalHours }}
                                  </p>
                                </div>
                                <div class="schedule-time-01">
                                  <h3>
                                    {{
                                      route.flightDetails.arriveData.arriveTime.split(
                                        ' '
                                      )[0]
                                    }}
                                    <span>{{
                                      route.flightDetails.arriveData.arriveTime.split(
                                        ' '
                                      )[1]
                                    }}</span>
                                  </h3>
                                  <p>
                                    {{
                                      transformToCode(
                                        route.flightDetails.arriveData
                                          .arriveCity
                                      )
                                    }}
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="main-right">
                      <div class="product-reverse">
                        <b v-if="flight.instantBooking">
                          <span class="instant_booking">Instant Book</span></b
                        >
                        <h2>
                          <p class="d-inline-block">
                            From:
                          </p>
                          {{ CSymbol }}{{ flight.totalPrice }}
                        </h2>

                        <v-btn
                          @click="
                            openAddCartPopUpForCar(
                              flight.routeId,
                              flight,
                              'flight'
                            )
                          "
                          color="error"
                          class="btn-save"
                          width="185"
                        >
                          ADD TO CART
                        </v-btn>
                        <br/>
                        <span class="status-blue-2"> {{flight.cabinClass}}</span>
                        <ul>
                          <li v-if="flight.isRefundable!='No'">
                            <p class="status-blue-2">Refundable</p>
                          </li>
                          <li v-else>
                           <p class="status-blue-2">Non-Refundable</p>
                          </li>
                        </ul>
                        <v-expansion-panel-header
                          class="hidandshow-flight-btn"
                          @click="
                            [
                              (flight.expanded = !flight.expanded),
                              getFlightDetails(flight),
                              (tab = 'tab-1')
                            ]
                          "
                        >
                          <div class="collpase-heading">
                            <span v-if="flight.expanded">Hide Details</span>
                            <span v-if="!flight.expanded">Show Details</span>
                          </div>
                        </v-expansion-panel-header>
                      </div>
                    </div>
                  </div>

                  <v-expansion-panel-content>
                    <div class="car-listing-tabs-outer">
                    
                      <div
                        class="car-listing-tabs"
                        v-if="typeof flight.details == 'object' "
                      >
                        <template>
                          <v-tabs
                            v-model="tab"
                            background-color="primary"
                            class="tabs-car-ul"
                          >
                            <v-tab href="#tab-1">
                              <span>Flight Details</span>
                            </v-tab>
                            <v-tab href="#tab-3">
                              <span>Fare Summary</span>
                            </v-tab>
                            <v-tab href="#tab-5">
                              <span>Fare Rules</span>
                            </v-tab>
                          </v-tabs>

                          <div class="tabs-text-content">
                            <v-tabs-items v-model="tab">
                              <v-tab-item value="tab-1">
                                <FlightDetailTab
                                  v-if="flight.details"
                                  :details="flight.details"
                                />
                              </v-tab-item>
                              <v-tab-item value="tab-3">
                                <FareSummaryTab
                                  v-if="flight.details"
                                  :details="flight.details.fareDetails"
                                />
                              </v-tab-item>
                              <v-tab-item value="tab-5">
                                <FareDisclamierTab
                                  v-if="flight.details"
                                  :details="flight.details.fareRules"
                                  :flight="flight"
                                />
                              </v-tab-item>
                            </v-tabs-items>
                          </div>
                        </template>
                      </div>

                      <div
                        class="car-listing-tabs "
                        v-if="flight.details == '' && lodloading==true"
                      >
                        <div class="tabs-text-content pa-11">
                          <p>
                           The route was sold out or unavailable. Please consider other routes or perform a new search.
                          </p>
                        </div>
                      </div>
                    </div>
                  </v-expansion-panel-content>
                </div>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>

          <TripSummary />
        </v-row>
      </v-container>

      <template v-if="flightsCount && callStatus">
        <div class="text-center">
          <v-pagination
            v-model="currentPage"
            :length="totalPageIndexes"
            :total-visible="totalVisibleIndexes"
            @input="handlePageChange"
          />
        </div>
      </template>

    </section>

    <Filters
      v-if="flightsCount > 0"
      v-model="filter"
      :search="inputSliderValues"
      :resetFormValues="resetFormValues"
      @onFilterData="mobileSearchData"
    />

    <SortFilter
      v-if="flightsCount > 0"
      v-model="sortFilter"
      @onSortData="sortBy = $event"
      :search="inputSliderValues"
      ref="mobFilter"
      @onFilterData="desktopFilterValues"
    />
  </span>
</template>
<style>
.uk-flight-alert .v-alert__icon.v-icon {
  top: 15px;
  font-size: 30px;
}
</style>
<script>
import OneWaySearch from './search/OneWaySearch.vue';
import MultiCitySearch from './search/MultiCitySearch.vue';
import flightServices from '@/services/api/Flights';
import { mapState } from 'vuex';
import { evBus } from '@/services/bus.js';
import { mapActions } from 'vuex';

import flightHelper from '@/helper/flightHelper';
import cartHelper from '@/helper/addCartHelper';

import 'vue-slider-component/theme/antd.css';
import FlightDetailTab from './tabs/FlightDetailTab.vue';
import FareSummaryTab from './tabs/FareSummaryTab.vue';
import FareDisclamierTab from './tabs/FareDisclamierTab.vue';
import TripSummary from '@/components/common/widgets/TripSummary.vue';
import Filters from './Filters.vue';
import SortFilter from './SortFilter.vue';
import DesktopFilters from './DesktopFilters.vue';

export default {
  name: 'FlightDetails',
  mixins: [flightHelper, cartHelper],
  components: {
    OneWaySearch,
    MultiCitySearch,
    Filters,
    FlightDetailTab,
    FareSummaryTab,
    FareDisclamierTab,
    TripSummary,
    SortFilter,
    DesktopFilters
  },
  data() {
    return {
      isApiCallFinished: false,
      sortFilter: false,
      filter: false,
      flightSearchId: '',
      token: '',
      desktopFilter: false,
      mobileFilter: false,
      callStatus: false,
      flightType: 'oneWay',
      fType: '',
      airline: [],
      stops: [],
      results: [],
      alliance: [],
      panel: null,
      showFilter: true,
      sortBy: '',
      tab: '',
      flights: [],
      resetFormValues: false,
      checkTripOfUserFg: false,
      CSymbol: this.$store.state.envStore.CSymbol,
      ukAlertATOL: false,
      filterCallInProcess: false,
      domain: ''
    };
  },
  mounted() {
     this.domain = this.$store.state.envStore.domain;
    if(process.env.VUE_APP_DOMAIN=='uk' || process.env.VUE_APP_DOMAIN=='ie')
      this.ukAlertATOL = true;

    if (this.$route.query.token) {

      if(localStorage.getItem('flighExternalProcess'))
        return false;

        localStorage.setItem('flighExternalProcess', 'yes');
  
      this.$store.dispatch('falsifyErrorLogin');

      let token = this.$route.query.token;
      this.token = token;
      this.flightSearchId = this.$route.query.searchId;

      let _cadeLoggedUser = { token: this.token };

      this.$store.dispatch('setUserToken', {
        payload: _cadeLoggedUser
      });


      this.checkUserAlive().then(rsp=> {

          if(rsp=='error_user_alive')
            return false;

            // case for carsearchId and token
            if (
              this.token != null &&
              this.token != '' &&
              typeof this.token != 'undefined' &&
              typeof this.flightSearchId != 'undefined'
            ) {
              
                let that = this;
                this.checkTripOfUserFg = true;

                evBus.$on('checkUserAliveFinish', () => {
                                  
                    this.$store.dispatch('appliedFlightFilterFalse');
                    setTimeout(function() {
                      that.doSearchFlightById();
                    }, 3000);
                    
                });

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
                payload: { token: this.token }
              });

            return false;
    

        }); // user alive asyc check

    } else {

      this.initData();
      this.setDefaults();
    }


    evBus.$on('doMakeCallFilter', () => {

      this.calculateAdvanceResults();
    });

    this.checkExpireItemOfFlight();
  },
  created: function() {


    evBus.$on('checkOutFlight', engineItem => {
      this.openCheckOutPopUp('flight', this.doCleanArray(engineItem));
    });

    evBus.$on('flightResearchExpireItemOfTrip', () => {
      this.checkExpireItemOfFlight();
    });

    evBus.$on('searchFlightAgain', () => {
      if (this.flightType == 'multiCity')
        this.$refs.multicitySearch.$refs.srchMainBtn.$el.click();

      if (this.flightType != 'multiCity')
        this.$refs.rightonewaysearch.$refs.srchMainBtn.$el.click();
    });

    evBus.$on('searchedReponseflights',(flights)=>{

        this.flights = flights;
        this.doMakePaginations(flights);
        this.makeDisplayItems();
    });
  },

  beforeDestroy () {
    evBus.$off('checkUserAliveFinish');
    evBus.$off('doMakeCallFilter');
    evBus.$off('searchedReponseflights');
  },
  methods: {
    ...mapActions(['setFlightResponse']),
    clearFilter() {
      evBus.$emit('resetFilters', '');
    },
    up(type) {
      switch (type) {
        case 'p':
          if (this.selectedItem > 0) this.selectedItem--;
          break;
        case 'd':
          if (this.selectedarrivalfItem > 0) this.selectedarrivalfItem--;
          break;
      }
    },
    down(type) {
      switch (type) {
        case 'p':
          if (this.selectedItem < this.departureLocations.length - 1) {
            this.selectedItem++;
          }
          break;
        case 'd':
          if (this.selectedarrivalfItem < this.arrivalLocations.length - 1) {
            this.selectedarrivalfItem++;
          }

          break;
      }
    },

    checkExpireItemOfFlight() {
      if (this.$store.state.cartStore.lastExpireItemEngine == 'flight') {
        if (this.$store.state.cartStore.lastExpireInModeOf == 'direct') {
          var that = this;

          setTimeout(function() {
            if (that.flightType == 'multiCity')
              that.$refs.multicitySearch.$refs.srchMainBtn.$el.click();

            if (that.flightType != 'multiCity')
              that.$refs.rightonewaysearch.$refs.srchMainBtn.$el.click();

            that.$store.dispatch('resetExpireItemSearchedDetails');
          }, 2500); // setTimeOut to 2500 coz preFillSearchForm form time is setOut to 2000
        } // Ends If Direct Mode

        if (this.$store.state.cartStore.lastExpireInModeOf == 'trip') {
          let _flightExpiredDetails = this.doCleanArray(
            this.$store.state.cartStore.lastExpireItemDetail
          );

          let _flightSearchedData = this.doCleanArray(
            _flightExpiredDetails.details.searchData
          );

          if (typeof _flightExpiredDetails.details == 'string') {
            _flightExpiredDetails.details = JSON.parse(
              _flightExpiredDetails.details
            );

            _flightSearchedData = _flightExpiredDetails.details.searchData;
          }

          this.resetFormValues = true;
          this.flightType = _flightSearchedData.flightType;
          this.fType = _flightSearchedData.flightType;

          let filter = {
            airlines: [],
            arrivReturnTime: {
              minArrivalReturn: '00:00',
              maxArrivalReturn: '00:00'
            },
            arriveTime: {
              minArrival: '00:00',
              maxArrival: '00:00'
            },
            departReturnTime: {
              minDepartReturn: '00:00',
              maxDepartReturn: '00:00'
            },
            departTime: {
              minDepart: '00:00',
              maxDepart: '00:00'
            },
            duration: {
              minDuration: '00:00',
              maxDuration: '00:00'
            },
            priceRange: {
              minPrice: '0',
              maxPrice: '10'
            }
          };
         
          let flights = _flightExpiredDetails.flights;
          let searchData = _flightSearchedData;
          let sessionId = _flightExpiredDetails.sessionId;

          let flightsLength = flights ? flights.length : 0;
          if (flightsLength > 0) {
            this.showFilter = true;
          } else {
            this.showFilter = false;
          }
          this.flightType = _flightExpiredDetails.flightType
          let departureLocation = {
            iata: _flightSearchedData.source[0],
            type: _flightSearchedData.sourceType[0],
            name: _flightSearchedData.airportDepartRound
          };

          let arrivalLocation = {
            iata: _flightSearchedData.dest[0],
            type: _flightSearchedData.destType[0],
            name: _flightSearchedData.airportArriveRound
          };

          this.setFlightResponse({
            sessionId,
            filter,
            flights,
            searchData,
            flightType: this.flightType,
            departure: departureLocation,
            arrival: arrivalLocation
          });

          // this.$store.dispatch("resetExpireItemSearchedDetails");

          setTimeout(
            function() {
              this.fType = _flightSearchedData.flightType;

              if (this.flightType == 'multiCity')
                this.$refs.multicitySearch.preFillSearchForm();

              if (this.flightType != 'multiCity')
                this.$refs.rightonewaysearch.preFillSearchForm();

              this.$refs.form.fType = _flightSearchedData.flightType;
            }.bind(this),
            3000
          );

          setTimeout(
            function() {
              if (this.flightType == 'multiCity')
                this.$refs.multicitySearch.$refs.srchMainBtn.$el.click();

              if (this.flightType != 'multiCity')
                this.$refs.rightonewaysearch.$refs.srchMainBtn.$el.click();
            }.bind(this),
            5500
          );
        } // Ends IF Trip Mode
      } // If Flight
    },
    doSearchFlightById() {

      localStorage.removeItem('flighExternalProcess');

      evBus.$emit('resetMobileFilters');

      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token
        }
      };

      let reqPayLoad = { searchId: this.flightSearchId, sortBy: 'asc' };

      this.callStatus = false;
      
      setTimeout(function() {
      }, 1000);

      flightServices
        .getFlightBySearchId((reqHeaders, reqPayLoad))
        .then(response => {
          if (
            response.data.success == false &&
            response.data.message ==
              'Could not decode token: Error while decoding to JSON: Malformed UTF-8 characters, possibly incorrectly encoded'
          ) {
          
            this.$router.push('/no-auth').catch(() => {});
          } else if (
            response.data.success == false &&
            response.data.message == 'Wrong number of segments'
          ) {
            this.$router.push('/no-auth').catch(() => {});
          } else if (
            response.data.success == false &&
            response.data.message == 'Token Signature could not be verified'
          ) {
            this.$router.push('/no-auth').catch(() => {});
          } else if (response.data.success == false && response.data.message!='') {
            this.$store.dispatch(
                            'setFlightApiMessage',
                            response.data.message
                        );
          } else {
            //  SETUP DETAILS FOR LOGGED IN USER
            let _cadeLoggedUser = {
              data: [
                {
                  userType: response.data.data.agentData.userType,
                  agent: {
                    iAgentID: response.data.data.agentData.pin,
                    vcPIN: response.data.data.agentData.pin,
                    vcEmail: response.data.data.agentData.email,
                    vcFName: response.data.data.agentData.first_name,
                    vcMName: '',
                    vcLName: response.data.data.agentData.last_name
                  }
                }
              ],
              token: this.token,
              auth: true
            };
            this.$store.dispatch('setAuthentication', {
              payload: _cadeLoggedUser
            });
          }
          
          let _respondSearchData = Object.assign({}, this.doCleanArray(response.data.data.searchData));

          this.resetFormValues = true;
          this.flightType = _respondSearchData.flightType;
          this.fType = _respondSearchData.flightType;
          let filter = response.data.data.filters;
          let flights = response.data.data.flights;
          let searchData = Object.assign({}, this.doCleanArray(response.data.data.searchData));
          let sessionId = response.data.data.sessionId;
          let rspFlightCount = response.data.data.flightsCount;

          if (flights.length > 0) {
            this.showFilter = true;
          } else {
            this.showFilter = false;
          }
          let departureLocation = {
            iata: _respondSearchData.source[0],
            type: _respondSearchData.sourceType[0],
            name: _respondSearchData.airportDepartRound
          };
          

          let arrivalLocation = {
            iata: _respondSearchData.dest[0],
            type: _respondSearchData.destType[0],
            name: _respondSearchData.airportArriveRound
          };

          // searchData.dest = [arrivalLocation.iata];

          this.setFlightResponse({
            sessionId,
            filter,
            flights,
            searchData,
            flightType: this.flightType,
            departure: departureLocation,
            arrival: arrivalLocation,
            flightsCount: rspFlightCount
          });

          this.doMakePaginations(flights);
          this.makeDisplayItems();

          this.callStatus = true;

          setTimeout(() => {
            if (_respondSearchData.flightType == 'multiCity') {
              // this.$refs.multicitySearch.preFillSearchForm();
              this.fType = _respondSearchData.flightType;
              if (response.data.data.flights.length > 0) {
                  evBus.$emit('flightType',_respondSearchData.flightType);
              }
            }

            if (
              response.data.data.flightType == 'roundTrip' ||
              response.data.data.flightType == 'oneWay'
            ) {
              // this.$refs.rightonewaysearch.preFillSearchForm();
              this.fType = response.data.data.flightType;
              if (response.data.data.flights.length > 0) {
                 evBus.$emit('flightType',response.data.data.flightType);
              }
            }
          }, 2000);
          this.initData();
          this.setDefaults();
        })
        .catch(err => {

          this.resetFormValues = false;
          let that = this;
            if(that.flightStore && that.flightStore.sessionId === undefined){
          that.$sentry.withScope(function(scope) {
            scope.setExtra('sessionId', this.flightStore.sessionId);
            that.$sentry.captureException(new Error(err));
          });
            }
        })
        .finally(() => {

          if(this.checkTripOfUserFg && this.tripExist)
            this.verifyTripByUser();

          this.checkTripOfUserFg = false;
          this.isApiCallFinished = true;
        });
    },
    initFIlters(response) {
      this.setDefaults();

      this.resetFormValues = true;

      this.fType = response.data.flightType;
      setTimeout(() => {
          if (response.data.flights.length > 0) {
            evBus.$emit('flightType',response.data.flightType);
          
          }
        },1000);
    },
    initData() {

      if (this.flightsCount == 0) {
        this.showFilter = false;
      } else {
        this.showFilter = true;
      }

      this.callStatus = true;

      if (JSON.stringify(this.flightStore.searchData) === JSON.stringify({})) {
        if (this.$store.state.cartStore.lastExpireItemEngine == 'flight') {
          if (this.$store.state.cartStore.lastExpireInModeOf == 'trip') {
            let _flightExpiredDetails = this.doCleanArray(
              this.$store.state.cartStore.lastExpireItemDetail
            );

            if (typeof _flightExpiredDetails.details == 'string')
              _flightExpiredDetails.details = JSON.parse(
                _flightExpiredDetails.details
              );

            this.fType = _flightExpiredDetails.details.searchData.flightType;
          }
        }
      } else {
        this.fType = this.flightStore.searchData.flightType;
      }

      this.focusedEngine = 'flight';
    },
    openCheckOutPopUp: function(engine, infos) {

      let {
        adults,
        child,
        infants,
        seniors
      } = this.$store.state.flightStore.searchData;
    
      let _reqPassengenrs = {
        adults: Number(adults),
        child: Number(child),
        infants: Number(infants),
        seniors: Number(seniors)
      };

      infos.details = { searchData: _reqPassengenrs };
      infos.engineId = infos.routeId;
      infos.isPassportMandatory = infos.isPassportMandatory;
      infos.Id = infos.routeId;
      infos.expire = false;
      infos.showTimes = true;
      infos.flightType = this.flightType;

      infos.plocationName = {
        name: this.flightStore.searchData.airportDepartRound
      }; // this.flightStore.departure;
      infos.pdate = this.flightStore.searchData.date;
      infos.dlocationName = {
        name: this.flightStore.searchData.airportArriveRound
      }; // this.flightStore.arrival;
      infos.ddate = '';

      if (this.flightType == 'roundTrip')
        infos.ddate = this.flightStore.searchData.date[1];
      infos.remaining = [14, 59]; // searchedClock.remaining;

      let cader = {
        engine: engine,
        item: infos
      };

      this.$store.dispatch('setCartUpComings', { UPCOMINGS: cader });
      evBus.$emit('openCheckOutPopUp', engine, infos);
      this.doClosePop();
    },

    dateFullFormat(timestamp) {
      return this.momentFormat(timestamp, 'HH:mm');
    },

    transformToCode(name) {
      return name.slice(name.indexOf('(') + 1, name.indexOf(')'));
    },

    handlePageChange(value) {
      this.panel = null;
      this.currentPage = value;
      this.makeDisplayItems();
    },

    makeDisplayItems() {
      let arrOfObj = this.getPageData();

      arrOfObj.forEach(item => {
        item.tab = null;
        item.details = '';
        item.expanded = false;
        item.errorCode = false;
      });

      this.results = arrOfObj;
      this.resetFormValues = false;
    },

    mobileSearchData(data) {
      this.airline = data.airline;
      this.stops = data.stops;
      this.alliance = data.alliance;
      this.priceRangeVal = data.priceRangeVal;
      this.durationVal = data.durationVal;
      this.departureTimeVal = data.departureTimeVal;
      this.arrivalTimeVal = data.arrivalTimeVal;
      this.arrivalTimeReturnVal = data.arrivalTimeReturnVal;
      this.departureTimeReturnVal = data.departureTimeReturnVal;

      this.filter = false;
      this.calculateAdvanceResults();
    },

    desktopFilterValues(data) {

      this.durationVal = data.durationVal;
      this.priceRangeVal = data.priceRangeVal;
      this.departureTimeVal = data.departureTimeVal;
      this.arrivalTimeVal = data.arrivalTimeVal;
      this.departureTimeReturnVal = data.departureTimeReturnVal;
      this.arrivalTimeReturnVal = data.arrivalTimeReturnVal;
      this.sortBy = data.sortBy;
      this.airline = data.airline;
      this.stops = data.stops;
      this.alliance = data.alliance;
    },

    inputSliderValues() {
      // make debounce timers
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.sortFilter = false;
        this.filter = false;
        this.calculateAdvanceResults();
      }, 1000);
    },

    calculateAdvanceResults() {

      if(this.filterCallInProcess)
        return;

        this.filterCallInProcess = true;


      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      let reqPayLoad = {
        sessionId: this.flightStore.sessionId
      };

      let pricesPayLoads = {
        min: this.priceRangeVal[0].toString(),
        max: this.priceRangeVal[1].toString()
      };

      reqPayLoad.price = pricesPayLoads;


        let durationPayload = {
          start: parseFloat(this.durationVal[0]).toString().replace('.', ':'),
          end: parseFloat(this.durationVal[1]).toString().replace('.', ':')
        };
         let start=durationPayload.start;
          let end = durationPayload.end;
          var startHours = '';
          var startMinutes = '';
          var endHours = '';
          var endMinutes = '';
          if(durationPayload.start.toString().split(":")[0]<10){
            startHours = "0"+durationPayload.start.toString().split(":")[0];
          }
          if(durationPayload.start.toString().split(":")[0]>=10){
            startHours = durationPayload.start.toString().split(":")[0];
          }

        if(durationPayload.start.toString().split(":")[1]<10){
          startMinutes = durationPayload.start.toString().split(":")[1].includes("0") == false ? ":0"+durationPayload.start.toString().split(":")[1] : ":"+durationPayload.start.toString().split(":")[1];
        }
        if(durationPayload.start.toString().split(":")[1]>=10 && durationPayload.start.toString().split(":")[1]<=59){
          startMinutes = ":"+durationPayload.start.toString().split(":")[1];
        }

        if(durationPayload.start.toString().split(":")[1]>59){
          startMinutes = ":"+Math.round((parseInt(durationPayload.start.toString().split(":")[1]) / 100) * 60);
        }

        if(durationPayload.start.toString().split(":")[1]==undefined){
          startMinutes = ":00";
        }

        if(durationPayload.end.toString().split(":")[0]<10){
            endHours = "0"+durationPayload.end.toString().split(":")[0];
          }

          if(durationPayload.end.toString().split(":")[0]>=10){
            endHours = durationPayload.end.toString().split(":")[0];
          }
           
        if(durationPayload.end.toString().split(":")[1]>=10 && durationPayload.end.toString().split(":")[1]<=59){
          endMinutes = ":"+durationPayload.end.toString().split(":")[1];
        }
       if(durationPayload.end.toString().split(":")[1]>59){
          endMinutes = ":"+Math.round((parseInt(durationPayload.end.toString().split(":")[1]) / 100) * 60);
        }

        if(durationPayload.end.toString().split(":")[1]<10){
          endMinutes = durationPayload.end.toString().split(":")[1].includes("0") == false ? ":0"+durationPayload.end.toString().split(":")[1] : ":"+durationPayload.end.toString().split(":")[1];
       
        }

        if(durationPayload.end.toString().split(":")[1]==undefined){
          endMinutes = ":00";
       
        }
        start=startHours+startMinutes;
    
        durationPayload.start =start;
        durationPayload.end = endHours+endMinutes;

      reqPayLoad.duration = durationPayload;

      let departurePayload = {
        start: this.momentFormat(this.departureTimeVal[0]),
        end: this.momentFormat(this.departureTimeVal[1])
      };
      if (departurePayload) reqPayLoad.departTime = departurePayload;

      let arrivalPayload = {
        start: this.momentFormat(this.arrivalTimeVal[0]),
        end: this.momentFormat(this.arrivalTimeVal[1])
      };

      if (arrivalPayload) reqPayLoad.arrivalTime = arrivalPayload;

      let arrivalReturnPayload = {
        start: this.momentFormat(this.arrivalTimeReturnVal[0]),
        end: this.momentFormat(this.arrivalTimeReturnVal[1])
      };
      let departureReturnPayload = {
        start: this.momentFormat(this.departureTimeReturnVal[0]),
        end: this.momentFormat(this.departureTimeReturnVal[1])
      };

      if (this.flightTypeStore == 'roundTrip') {
        if (arrivalReturnPayload)
          reqPayLoad.arrivalReturnTime = arrivalReturnPayload;
        if (departureReturnPayload)
          reqPayLoad.departReturnTime = departureReturnPayload;
      }

      let _airline = this.airlines.length ? this.airline.toString() : '';
      let _stops = this.stops.length ? this.stops.toString() : '';
      let _alliance = this.alliance.length
        ? this.alliance.toString().toLowerCase()
        : '';

      if (_airline != '') reqPayLoad.airline = _airline;

      if (_stops != '') reqPayLoad.stops = _stops;

      if (_alliance != '') reqPayLoad.alliance = _alliance;

      reqPayLoad.flightType = this.flightTypeStore;
      let sort = {
        sortField: this.sortBy.split('-')[0],
        sortOrder: this.sortBy.split('-')[1],
        sortIsString: this.sortBy.split('-')[2]
      };
      reqPayLoad.sortByField = sort;
      flightServices
        .getFilterFlights(reqPayLoad, reqHeaders)
        .then(rsp => {
          let res = rsp.data;
          let filter = res.data.filters;

          let sessionId = res.data.sessionId;
          let flights = res.data.flights;
          let flightType = res.data.flightType;
          let searchData = res.data.searchData;
          let rspFlightCount = res.data.flightsCount;

          this.setFlightResponse({
            ...this.flightStore,
            sessionId,
            filter,
            flights,
            flightType,
            searchData,
            flightsCount: rspFlightCount,
          });

          // this.$nextTick(() => {
          this.doMakePaginations(flights);
          this.makeDisplayItems();

          this.$store.dispatch('appliedFlightFilter', reqPayLoad);
          // });
        })
        .catch(err => {
            let that = this;
          if(err.data.message == 'Session Expired. Please initiate a new search request.'){
              that.$awn.success('Your being timed out due to inactivity, Please try show detail again!');
             setTimeout(function() {
            if (that.flightType == 'multiCity')
              that.$refs.multicitySearch.$refs.srchMainBtn.$el.click();

            if (that.flightType != 'multiCity')
              that.$refs.rightonewaysearch.$refs.srchMainBtn.$el.click();

            that.$store.dispatch('resetExpireItemSearchedDetails');
          }, 2500);
          return false;
          }
        
          that.$sentry.withScope(function(scope) {
            that.$sentry.captureException(new Error(err));
          });
        }).finally(() => {

          this.filterCallInProcess = false;
        });
    },

    getFlightDetails(flight) {
      let that = this;

      let reqObj = {
        sessionId: this.flightStore.sessionId,
        routeId: flight.routeId,
        gds: flight.supplier,
        detailsType: 'details'
      };

      if (!flight.details) {
        this.results = this.results.map(map => {
          if (map.routeId == flight.routeId) map.errorCode = false;

          return map;
        });

        let reqHeaders = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        this.lodloading = false;
        flightServices
          .getFlightDetails(reqObj, reqHeaders)
          .then(rsp => {
            this.lodloading=true;
            
            if (
              rsp.data.success == false &&
              rsp.data.message == 'Token has expired'
            ) {
              that.doPopLogout();
              return true;
            } else if (
              rsp.data.success == false &&
              rsp.data.message ==
                'Session Expired. Please initiate a new search request.'
            ) {
              if (this.flightType == 'multiCity')
                this.$refs.multicitySearch.$refs.srchMainBtn.$el.click();

              if (this.flightType != 'multiCity')
                this.$refs.rightonewaysearch.$refs.srchMainBtn.$el.click();
              return false;
            } else if (
              rsp.data.success == false &&
              rsp.data.message ==
                'FareSourceCode failed to Revalidation, please contact support or try again later.'
            ) {
              if (rsp.data.errors.ErrorCode == 'ERBUK046')
                this.$awn.alert(
                  'We have not received the details needed from our supplier to book this flight. Please select another flight!'
                );

              this.results = this.results.map(map => {
                if (map.routeId == flight.routeId) map.errorCode = true;

                return map;
              });

              return false;
            }

            if (rsp.data.success) {
              this.results = this.results.map(map => {
                if (map.routeId == flight.routeId) {
                  map.details = rsp.data.data;
                  map.errorCode = false;
                }

                return map;
              });
            } // IF Success
          })
          .catch(err => {
            // this.$awn.success("Your being timed out due to inactivity, Please try show detail again!");

            /*
            if (this.flightType == "multiCity")
              this.$refs.onewaysearch.$refs.srchMainBtn.$el.click();

            if (this.flightType != "multiCity")
              this.$refs.rightonewaysearch.$refs.srchMainBtn.$el.click();

          */ let that = this;
            that.$sentry.withScope(function(scope) {
              scope.setExtra('sessionId', this.flightStore.sessionId);
              that.$sentry.captureException(new Error(err));
            });

          });
      }
    }
  },
  computed: {
    ...mapState({
      flightStore: state => state.flightStore,
      flightTypeStore: state => state.flightStore.flightType,
      searchData: state => state.flightStore.searchData,
      // flights: state => state.flightStore.flights,
      flightsCount: state => state.flightStore.flightCount,
      filters: state => state.flightStore.filters,
/*       sessionId: state => state.flightStore.sessionId,*/ 
      flightApiMessage: state => state.flightStore.flightApiMessage
    }),
    source() {

      return this.searchData.source && this.searchData.source[0].toString();
    },
    dest() {
      return this.searchData.dest && this.searchData.dest[this.searchData.dest.length-1].toString();
    },
    filteredFlights() {
      return this.results;
    },
    airlines() {
      return this.filters.airlines;
    },
    totalPageIndexes() {
      return this.totalPages;
    }
  },
  watch: {
    flightTypeStore: {
      immediate: true,
      handler(newVal) {
        this.flightType = newVal;
      }
    }
    
  }
};
</script>
<style>
/*
.radio-right .v-input--selection-controls__input {
    position: absolute;
    right: 5px;
}*/
.instant_booking {
  color: #3d4ed7 !important;
  font-weight: 500;
}
.radio-right .v-label {
  font-size: 16px;
  color: #3b3b3b;
  font-weight: 400;
  position: relative;
  margin-left: 13px;
} /*
.v-menu__content .v-input--selection-controls {
    margin-top: 0;
    padding-top: 0;
}*/
.roundWay-label {
  position: absolute;
  font-size: 11px;
  border-bottom: 1px solid;
  top: -25px;
  line-height: 23px;
} /*
.pass-dropdown {
    max-width: 271px;
}*/

/* Airline Logos */

#logoairline {
  background-image: url('@/assets/images/airline.png');
}

.pass-dropdown .outer-div p.top {
  font-size: 14px;
}
.pass-dropdown strong {
  display: block;
  font-size: 16px;
  color: #474747;
  font-weight: 500;
  line-height: 1;
}
.pass-dropdown small {
  font-size: 13px;
  color: #474747;
  font-weight: 300;
  line-height: 1.2;
  display: flex;
}
.pass-dropdown .v-input {
  width: 28% !important;
  padding: 0;
  margin: 0;
}
.pass-dropdown .v-input .v-input__slot {
  margin: 0;
}
.pass-dropdown .v-input .v-text-field__details {
  display: none;
}
.pass-dropdown
  .theme--light.v-text-field
  > .v-input__control
  > .v-input__slot:before {
  border: none;
}

.pass-dropdown i {
  font-size: 20px;
  vertical-align: middle;
  color: #474747;
}
.pass-dropdown a.age-rule {
  font-size: 14px;
  margin: 20px 0 10px;
}
body .v-application .orange-tick .primary {
  border-color: #ff9f33 !important;
  background-color: #ff9f33 !important;
}
.status-blue-2{
  color: #3c4fd7 !important;
    font-weight: 500 !important;
    font-size: 14px !important;
}


</style>
