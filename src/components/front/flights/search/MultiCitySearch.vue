/* eslint-disable no-undef */
<template>
  <div class="flight-search-form">
    <div class="mobile-search-bg">
      <a href="#" v-on:click="showmultiSearchFields">
        <v-input
          :error-messages="['']"
          error
          disabled
          prepend-icon="fas fa-search"
        >
          {{ dynamicFlights[0].arrival.name }}
        </v-input>
        <v-icon color="white">fas fa-long-arrow-alt-down </v-icon>
      </a>
    </div>

    <div class="flight-top-pc-box">
      <div class="pessanger-box">
        <div class="single-input">
          <PassengerFilter @onFilterChange="passengerData = $event" />
          <v-menu
            v-model="cabinClassesMenu"
            :close-on-content-click="true"
            :nudge-width="200"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <a class="w-60 edp" v-bind="attrs" v-on="on">
                <small>Cabin Class</small>
                {{ cabinClass.title }}
                <i class="fas fa-caret-down"></i>
              </a>
            </template>
            <v-card>
              <v-radio-group v-model="cabinClass">
                <ul>
                  <li
                    class="pessanger-radio-btn-box"
                    v-for="(item, i) in cabinClasses"
                    :key="i"
                  >
                    <v-radio
                      class="radio-right"
                      color="primary"
                      :label="item.title"
                      :value="item"
                    />
                  </li>
                </ul>
              </v-radio-group>
            </v-card>
          </v-menu>
        </div>
      </div>
      <div class="connection-box">
        <small>Max Connections</small>
        <div class="single-input">
          <v-menu
            v-model="connectionMenu"
            :close-on-content-click="true"
            :nudge-width="200"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <a class="w-100" v-bind="attrs" v-on="on">
                {{ connection.title }}
                <i class="fas fa-caret-down"></i>
              </a>
            </template>
            <v-card>
              <v-radio-group v-model="connection">
                <ul>
                  <li
                    class="pessanger-radio-btn-box"
                    v-for="(item, i) in connections"
                    :key="i"
                  >
                    <v-radio
                      class="radio-right"
                      color="primary"
                      :label="item.title"
                      :value="item"
                    />
                  </li>
                </ul>
              </v-radio-group>
            </v-card>
          </v-menu>
        </div>
      </div>
    </div>

    <!-- REPEAT UL TAG -->
    <v-form ref="form">
      <template v-for="(item, index) in dynamicFlights">
        <ul
          :key="index"
          class="mobile-search-form flight-listing-form multi-flight-listing add-other-form"
        >
          <li>
            <small>Departure airport</small>
            <div class="single-input">
              <!--Start new search-->

              <FlightLocation v-model="item.departure" :isDetailPage="true" />

              <!--End new search-->
            </div>
          </li>
          <li>
            <small>Arrival airport</small>
            <div class="single-input">
              <FlightLocation v-model="item.arrival" :isDetailPage="true" />
            </div>
          </li>
          <li class="mob-list-none multi-trip-departing">
            <small>Departing on</small>
            <div class="single-input">
              <Calendar
                v-model="item.date"
                :minimumDate="mineDate(index)"
                :hideLabel="true"
              />
            </div>
          </li>
          <li
            class="mob-list-none oneway-passenger multi-trip-passenger"
            v-if="index == 0"
          >
            <div class="single-input">
              <PassengerFilter @onFilterChange="passengerData = $event" />
              <v-menu
                v-model="cabinClassesMenu02"
                :close-on-content-click="true"
                :nudge-width="200"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <a class="py-4 w-100" v-bind="attrs" v-on="on">
                    <small>Cabin Class</small>
                    {{ cabinClass.title }}
                    <i class="fas fa-caret-down"></i>
                  </a>
                </template>
                <v-card>
                  <v-radio-group v-model="cabinClass">
                    <ul>
                      <li
                        class="pessanger-radio-btn-box"
                        v-for="(item, i) in cabinClasses"
                        :key="i"
                      >
                        <v-radio
                          class="radio-right"
                          color="primary"
                          :label="item.title"
                          :value="item"
                        />
                      </li>
                    </ul>
                  </v-radio-group>
                </v-card>
              </v-menu>
            </div>
          </li>

          <li class="mob-list-none oneway-connections" v-if="index == 0">
            <small>Max Connections</small>
            <div class="single-input">
              <v-menu
                v-model="connectionMenu02"
                :close-on-content-click="true"
                :nudge-width="200"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <a class="py-4 w-100" v-bind="attrs" v-on="on">
                    {{ connection.title }}
                    <i class="fas fa-caret-down"></i>
                  </a>
                </template>
                <v-card>
                  <v-radio-group v-model="connection">
                    <ul>
                      <li
                        class="pessanger-radio-btn-box"
                        v-for="(item, i) in connections"
                        :key="i"
                      >
                        <v-radio
                          class="radio-right"
                          color="primary"
                          :label="item.title"
                          :value="item"
                        />
                      </li>
                    </ul>
                  </v-radio-group>
                </v-card>
              </v-menu>
            </div>
          </li>
          <li class="submitBtn mutli-trip-submitbtn" v-if="index != 0">
            <div class="single-input">
              <span
                class="close-icon fas fa-times"
                v-on:click="RemoveFlight(index)"
              />
            </div>
          </li>
        </ul>
      </template>
      <div class="multi-city-mobile">
        <ul>
          <li class="submitBtn">
            <v-btn
              color="error"
              class="car-search-btn"
              @click="sendData()"
              ref="srchMainBtn"
            >
              <i class="fas fa-search"></i>
              <strong>SEARCH</strong>
            </v-btn>
            <!--  <a class="clear-listing-btn" @click="clearFilter()">
                        Clear All</a> -->
          </li>

          <li class="flight-filter-bittons-list">
            <div class="flight-filter-bittons">
              <v-btn color="error" v-on:click="AddFlight()">
                + Add Another Flight
              </v-btn>
              <v-btn v-on:click="ClearFlight()" color="error">
                Clear All
              </v-btn>
            </div>
          </li>

          <div class="up-arrow">
            <v-icon v-on:click="hidemultiSearchFields" color="primary"
              >fas fa-long-arrow-alt-up
            </v-icon>
          </div>
        </ul>
      </div>

      <div class="multi-trip-button-box">
        <ul>
          <li class="flight-filter-bittons-list">
            <div class="flight-filter-bittons">
              <v-btn color="error" v-on:click="AddFlight()">
                + Add Another Flight
              </v-btn>
              <v-btn v-on:click="ClearFlight()" color="error">
                Clear All
              </v-btn>
            </div>
          </li>

          <li class="submitBtn">
            <div class="single-input">
              <v-btn
                color="error"
                class="car-search-btn"
                @click="sendData()"
                ref="srchMainBtn"
              >
                <i class="fas fa-search"></i>
                <strong>SEARCH</strong>
              </v-btn>
            </div>
          </li>
        </ul>
      </div>
    </v-form>
  </div>
</template>
<script>
import { evBus } from '@/services/bus.js';
import { mapState, mapActions } from 'vuex';
import flightHelper from '@/helper/flightHelper.js';
import flightServices from '@/services/api/Flights';
import * as dataKey from '@/services/data/dsources.js';
import PassengerFilter from './PassengerFilter.vue';

import FlightLocation from '@/components/common/flights/FlightLocation.vue';
import Calendar from '@/components/common/Calendar.vue';

import moment from 'moment';
export default {
  name: 'MultiCitySearch',
  props: ['submitForm'],
  mixins: [flightHelper],
  components: { PassengerFilter, FlightLocation, Calendar },

  data() {
    return {
      iflight: {
        date: null,
        departure: {
          name: '',
          result: '',
        },
        arrival: {
          name: '',
          result: '',
        },
      },
      connection: { title: 'Direct', value: 'Direct' },
      connectionMenu: false,
      connectionMenu02: false,
      cabinClass: { title: 'Economy', value: 'Economy' },
      cabinClassesMenu: false,
      cabinClassesMenu02: false,
      passengerData: null,
      dynamicFlights: [],
      serials: [],
      cabinClasses: [],
      connections: [],
    };
  },
  created: function () {
    this.serials = dataKey.comASCI;
    this.cabinClasses = dataKey.cabinClass;
    this.connections = dataKey.maxConnections;
    this.dynamicFlights.push(this.iflight);

    this.preFillSearchForm();
  },
  methods: {
    ...mapActions(['setFlightResponse']),

    showmultiSearchFields: function () {
      // eslint-disable-next-line no-undef
      $(document).find('.multi-flight-listing').addClass('car-show-form');

      // eslint-disable-next-line no-undef
      $(document).find('.multi-city-mobile').show();
      // eslint-disable-next-line no-undef
      $(document).find('.mobile-search-bg').addClass('hid-blue-bg');
    },

    hidemultiSearchFields: function () {
      // eslint-disable-next-line no-undef
      $(document).find('.multi-flight-listing').removeClass('car-show-form');
      // eslint-disable-next-line no-undef
      $('.flight-search-form ul:not(:first-child)').hide();

      // eslint-disable-next-line no-undef
      $(document).find('.multi-city-mobile').hide();
      // eslint-disable-next-line no-undef
      $(document).find('.mobile-search-bg').removeClass('hid-blue-bg');
    },

    mineDate(index) {
      let result = moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD');

      if (index > 0) {
        if (this.dynamicFlights[index - 1].date == null) {
          return result;
        }
        result = moment(this.dynamicFlights[index - 1].date)
          .add(1, 'days')
          .format('YYYY-MM-DD');

        if (
          !moment(this.dynamicFlights[index].date).isSameOrAfter(result, 'day')
        ) {
          this.dynamicFlights[index].date = result;
        }
      }
      return result;
    },
    preFillSearchForm() {
      this.dynamicFlights = [];

      this.flightStore.searchData.airportDepartRound.forEach(
        function (item, index) {
          let obj = {
            date: this.flightStore.searchData.date[index],
            departure: {
              name: this.flightStore.searchData.airportDepartRound[index],
              result: {
                iata: this.flightStore.searchData.source[index],
                type: this.flightStore.searchData.sourceType[index],
                name: this.flightStore.searchData.airportDepartRound[index],
              },
            },
            arrival: {
              name: this.flightStore.searchData.airportArriveRound[index],
              result: {
                iata: this.flightStore.searchData.dest[index],
                type: this.flightStore.searchData.destType[index],
                name: this.flightStore.searchData.airportArriveRound[index],
              },
            },
          };

          this.dynamicFlights.push(obj);

          this.connection = this.connections.find(
            (f) => f.value == this.flightStore.searchData.connections
          );
          this.cabinClass = this.cabinClasses.find(
            (f) => f.value == this.flightStore.searchData.cabinClass
          );
        }.bind(this),
        2000
      );
    },

    AddFlight: function () {
      this.dynamicFlights.push({ ...this.iflight });
      // eslint-disable-next-line no-undef
      $(document).find('.multi-flight-listing').addClass('car-show-form');
      this.resetValue();
    },
    RemoveFlight: function (index) {
      this.$delete(this.dynamicFlights, index);
    },
    ClearFlight: function () {
      this.dynamicFlights = [];
      this.dynamicFlights.push(this.iflight);
      this.resetValue();
    },

    resetValue() {
      let lastFlight = this.dynamicFlights[this.dynamicFlights.length - 1];
      lastFlight.arrivalLocation = null;
      lastFlight.departureLocation = null;
      lastFlight.date = null;
    },
    sendData() {
      if (!this.$refs.form.validate()) return false;

      if ( (this.passengerData.adults + this.passengerData.seniors) == 0 ) {
        this.$awn.info(
          'Atleast one traveller with age 18+ required.'
        );
        return false;
      }

      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let source = this.dynamicFlights.map((map) => map.departure.result.iata);
      let dest = this.dynamicFlights.map((map) => map.arrival.result.iata);

      let sourceType = this.dynamicFlights.map(
        (map) => map.arrival.result.type
      );
      let airportArriveRound = this.dynamicFlights.map(
        (map) => map.arrival.result.name
      );

      let destType = this.dynamicFlights.map(
        (map) => map.departure.result.type
      );
      let airportDepartRound = this.dynamicFlights.map(
        (map) => map.departure.result.name
      );

      let date = this.dynamicFlights.map((map) => map.date);

      if (date.length == 1) date = [...date, ...date];

      let reqPayLoad = {
        source,
        sourceType,
        dest,
        destType,
        date,
        airportArriveRound,
        airportDepartRound,
        adults: this.passengerData.adults,
        cabinClass: this.cabinClass.value,
        connections: this.connection.value,
        seniors: this.passengerData.seniors,
        child: this.passengerData.child,
        infants: this.passengerData.infants,
        search: 'true',
        nearbyDest: ['false'],
        nearbySource: ['false'],
        sortBy: 'asc',
        searchId: null,
        flightType: 'multiCity',
      };
      flightServices
        .searchFlights(reqPayLoad, reqHeaders)
        .then((response) => {
          this.$store.dispatch('appliedFlightFilterFalse');

          let res = response.data;

          let filter = response.data.data.filters;
          /*
                    if(typeof filter.duration!='undefined')
                        if(typeof filter.duration.maxDuration!='undefined') {

                            let maxDurationLaps = filter.duration.maxDuration.split(':');

                            if(maxDurationLaps[0] > 23)
                                filter.duration.maxDuration = '23:59';
                        }
                    */

          let flights = response.data.data.flights;
          let searchData = response.data.data.searchData;
          let rspFlightCount = response.data.data.flightsCount;
          let sessionId = response.data.data.sessionId;
          this.setFlightResponse({
            sessionId,
            filter,
            flights,

            flightType: 'multiCity',
            searchData,
            flightsCount: rspFlightCount,
            dynamicFlights: this.dynamicFlights,
          });

          evBus.$emit('searchedReponseflights', flights);

          this.$emit('updatedRecord', res);
          this.$emit('initFilter', res);
        })
        .catch((err) => {
          let that = this;
          that.$sentry.withScope(function (scope) {
            if(this.flightStore){
              scope.setExtra('sessionId', this.flightStore.sessionId);
            }
            that.$sentry.captureException(new Error(err));
          });
        });
    },
  },
  computed: {
    ...mapState({
      flightStore: (state) => state.flightStore,
    }),
  },
};
</script>
<style>
/*
.radio-right .v-label {
    font-size: 16px;
    color: #3b3b3b;
    font-weight: 400;
    position: relative;
    margin-left: 13px;
}
.v-menu__content .v-input--selection-controls {
    margin-top: 0;
    padding-top: 0;
}*/

.pass-dropdown .outer-div .counter-div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pass-dropdown .outer-div .counter-div b {
  width: 20px;
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
</style>
