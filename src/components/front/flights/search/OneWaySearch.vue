<template>
  <div>
    <div class="flight-search-form">
      <div class="mobile-search-bg">
        <a href="#" v-on:click="showoneWaySearchFields">
          <v-input
            :error-messages="['']"
            error
            disabled
            prepend-icon="fas fa-search"
          >
            {{ arrival.name }}
          </v-input>
          <v-icon color="white">fas fa-long-arrow-alt-down </v-icon>
        </a>
      </div>
      <div class="flight-top-pc-box">
        <div class="pessanger-box">
          <div class="single-input">
            <PassengerFilter @onFilterChange="passengerData = $event" />
            <v-menu
              v-model="cabinClasseMenu"
              :close-on-content-click="true"
              :nudge-width="200"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <a class="w-60 edp" v-bind="attrs" v-on="on">
                  <small>Cabin Class</small>
                  {{ cabinClass && cabinClass.title }}
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
                  {{ connection && connection.title }}
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
      <v-form ref="form">
        <ul
          class="mobile-search-form"
          v-bind:class="
            flightType === 'oneWay' ? 'flight-listing-form' : 'roundtrip-feilds'
          "
        >
          <li>
            <small>Departure airport</small>
            <div class="single-input">
              <!--Start new search-->

              <FlightLocation v-model="departure" :isDetailPage="true" />

              <!--End new search-->
            </div>
          </li>
          <li>
            <small>Arrival airport</small>
            <div class="single-input">
              <!--Start new search-->

              <FlightLocation v-model="arrival" :isDetailPage="true" />

              <!--End new search-->
            </div>
          </li>
          <li v-if="flightType === 'oneWay'" class="mob-list-none">
            <small>Departing on</small>
            <div class="single-input">
              <Calendar
                v-model="date"
                :minimumDate="minDepartureDate"
                :hideLabel="true"
              />
            </div>
          </li>

          <li class="mob-list-none" v-if="flightType != 'oneWay'">
            <small> Departing on</small>
            <div class="single-input">
              <Calendar
                v-model="departDate"
                :minimumDate="minDepartureDate"
                @input="checkInSelected()"
                :hideLabel="true"
              />
            </div>
          </li>

          <li class="mob-list-none" v-if="flightType != 'oneWay'">
            <small>Returning on</small>
            <div class="single-input">
              <Calendar
                v-model="returnDate"
                :minimumDate="minReturnDate"
                :hideLabel="true"
              />
            </div>
          </li>
          <li class="mob-list-none oneway-passenger">
            <div class="single-input">
              <PassengerFilter @onFilterChange="passengerData = $event" />
              <v-menu
                v-model="cabinClasseMenu02"
                :close-on-content-click="true"
                :nudge-width="200"
                offset-y
                content-class="date-picker-backoffice"
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
          <li class="mob-list-none oneway-connections">
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
          <li class="submitBtn">
            <div class="single-input">
              <v-btn
                color="error"
                @click="sendData()"
                ref="srchMainBtn"
                class="car-search-btn"
              >
                <i class="fas fa-search"></i>
                <strong>SEARCH</strong>
              </v-btn>
            </div>
          </li>
          <div class="up-arrow">
            <v-icon v-on:click="hideoneWaySearchFields" color="primary"
              >fas fa-long-arrow-alt-up
            </v-icon>
          </div>
        </ul>
      </v-form>
      <a class="clear-listing-btn" @click="clearFilter()"> Clear All</a>
    </div>
  </div>
</template>
<script>
import { evBus } from '@/services/bus.js';
import { mapActions, mapState } from 'vuex';
import flightServices from '@/services/api/Flights';
import * as dataKey from '@/services/data/dsources.js';

import flightHelper from '@/helper/flightHelper.js';
import PassengerFilter from './PassengerFilter.vue';
import moment from 'moment';

import FlightLocation from '@/components/common/flights/FlightLocation.vue';
import Calendar from '@/components/common/Calendar.vue';
import { nextDay } from '@/components/common/utils';

export default {
  name: 'OneWaySearch',
  props: ['flightType', 'search'],
  mixins: [flightHelper],
  components: { PassengerFilter, FlightLocation, Calendar },
  data() {
    return {
      departure: {
        name: '',
        result: '',
      },
      arrival: {
        name: '',
        result: '',
      },
      date: null,
      departDate: null,
      returnDate: null,
      passengerData: null,
      cabinClasses: [],
      cabinClasseMenu: false,
      cabinClasseMenu02: false,
      cabinClass: { title: 'Economy', value: 'Economy' },
      connections: [],
      connectionMenu: false,
      connectionMenu02: false,
      connection: { title: 'Direct', value: 'Direct' },
      serials: [],
    };
  },
  mounted: function () {
    this.preFillSearchForm();
    this.serials = dataKey.comASCI;
    this.cabinClasses = dataKey.cabinClass;
    this.connections = dataKey.maxConnections;
    evBus.$on('resetFilters', () => {
      this.date = '';
      this.departure = {
        name: '',
        result: '',
      };
      this.arrival = {
        name: '',
        result: '',
      };
      this.departDate = null;
      this.returnDate = null;
      this.cabinClass.title = 'Economy';
      this.cabinClass.value = 'Economy';
      this.connection.title = 'Direct';
      this.connection.value = 'Direct';
    });
  },

  methods: {
    ...mapActions(['setFlightResponse']),
    checkInSelected() {
      let nextDayValue = nextDay(this.departDate, this.arrivalDate);
      if (nextDayValue) {
        this.arrivalDate = nextDayValue;
      }
    },
    clearFilter() {
      this.date = '';
      this.departDate = '';
      this.returnDate = '';
      this.arrival = {
        name: '',
        result: '',
      };
      this.departure = {
        name: '',
        result: '',
      };
      this.cabinClass.title = 'Economy';
      this.cabinClass.value = 'Economy';
      this.connection.title = 'Direct';
      this.connection.value = 'Direct';
    },

    showoneWaySearchFields: function () {
      // eslint-disable-next-line no-undef
      $(document).find('.mobile-search-form').addClass('car-show-form ');

      // eslint-disable-next-line no-undef
      $(document).find('.mobile-search-bg').addClass('hid-blue-bg');
    },
    hideoneWaySearchFields: function () {
      // eslint-disable-next-line no-undef
      $(document).find('.mobile-search-form').removeClass('car-show-form ');

      // eslint-disable-next-line no-undef
      $(document).find('.mobile-search-bg').removeClass('hid-blue-bg');
    },

    preFillSearchForm: function () {
      setTimeout(
        function () {
          this.departure.name = this.flightStore.searchData.airportDepartRound;
          this.arrival.name = this.flightStore.searchData.airportArriveRound;
          this.departure.result = {
            iata: this.flightStore.searchData.source[0],
            type: this.flightStore.searchData.sourceType[0],
            name: this.flightStore.searchData.airportDepartRound,
          };
          this.arrival.result = {
            iata: this.flightStore.searchData.dest[0],
            type: this.flightStore.searchData.destType[0],
            name: this.flightStore.searchData.airportArriveRound,
          };

          this.connection = this.connections.find(
            (f) => f.value == this.flightStore.searchData.connections
          );
          this.cabinClass = this.cabinClasses.find(
            (f) => f.value == this.flightStore.searchData.cabinClass
          );

          if (this.flightType == 'roundTrip') {
            this.departDate = this.flightStore.searchData.date[0];
            this.returnDate =
              this.flightStore.searchData.date[1] == undefined ||
              moment(this.flightStore.searchData.date[0]).isSame(
                this.flightStore.searchData.date[1]
              )
                ? moment(this.flightStore.searchData.date[0], 'YYYY-MM-DD')
                    .add('days', 1)
                    .format('YYYY-MM-DD')
                : this.flightStore.searchData.date[1];
            this.date = this.flightStore.searchData.date[0];
          } else {
            this.date = this.flightStore.searchData.date[0];
            this.departDate = this.flightStore.searchData.date[0];
            this.returnDate =
              this.flightStore.searchData.date[1] == undefined
                ? moment(this.flightStore.searchData.date[0], 'YYYY-MM-DD')
                    .add('days', 1)
                    .format('YYYY-MM-DD')
                : this.flightStore.searchData.date[1];
          }
        }.bind(this),
        2000
      );
    },

    sendData() {
      let valid = this.$refs.form.validate();
      let that = this;
      if (!valid) {
        return false;
      }

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

      let reqPayLoad = {
        search: true,
        source: [this.departure.result.iata],
        dest: [this.arrival.result.iata],
        sourceType: [this.departure.result.type],
        destType: [this.arrival.result.type],
        airportArriveRound: Array.isArray(this.arrival.result.name)
          ? this.arrival.result.name
          : [this.arrival.result.name],
        airportDepartRound: Array.isArray(this.departure.result.name)
          ? this.departure.result.name
          : [this.departure.result.name],

        adults: this.passengerData.adults,
        cabinClass: this.cabinClass.value,
        connections: this.connection.value,
        seniors: this.passengerData.seniors,
        child: this.passengerData.child,
        infants: this.passengerData.infants,
        nearbyDest: ['false'],
        nearbySource: ['false'],
        sortBy: 'asc',
        searchId: null,
        flightType: this.flightType,
      };
      if (this.flightType == 'oneWay') {
        reqPayLoad.date = [this.date];
      } else {
        reqPayLoad.date = [this.departDate, this.returnDate];
      }
      flightServices
        .searchFlights(reqPayLoad, reqHeaders)
        .then((response) => {
          if (
            response.data.success == false &&
            response.data.errors.ErrorCode == 400
          ) {
            this.$store.dispatch('setFlightApiMessage', response.data.message);
          }

          this.$store.dispatch('appliedFlightFilterFalse');

          let filter = response.data.data.filters;

          let flights = response.data.data.flights;
          let searchData = response.data.data.searchData;
          let rspFlightCount = response.data.data.flightsCount;
          let sessionId = response.data.data.sessionId;
          this.setFlightResponse({
            sessionId,
            filter,
            flights,
            searchData,
            flightsCount: rspFlightCount,
            flightType: this.flightType,
            departure: this.departure.result,
            arrival: this.arrival.result,
          });

          evBus.$emit('searchedReponseflights', flights);
          this.$emit('updatedRecord', response.data);
          this.$emit('initFilter', response.data);
        })
        .catch((err) => {
          that.$sentry.withScope(function (scope) {
            if (that.flightStore && that.flightStore.sessionId === undefined) {
              scope.setExtra('sessionId', this.flightStore.sessionId);
              that.$sentry.captureException(new Error(err));
            }
          });
        });
    },
  },
  computed: {
    ...mapState({
      flightStore: (state) => state.flightStore,
    }),
    minReturnDate() {
      let result = moment(this.departDate, 'YYYY-MM-DD')
        .add('days', 1)
        .format('YYYY-MM-DD');
      // this.returnDate=result;

      if (this.flightStore.searchData.date[1] == undefined) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.returnDate = result;
      }
      return result;
    },
  },
};
</script>
<style>
.pass-dropdown {
  max-width: 100%;
}
.pass-dropdown .outer-div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;
}

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
  padding-bottom: 5px;
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
.pass-dropdown a.age-rule {
  font-size: 14px;
  margin: 20px 0 10px;
}
.mobile-search-form .v-text-field input {
  text-overflow: ellipsis;
}
.mob-list-none .single-input {
  width: 100%;
}

.roundtrip-feilds li:first-child {
  width: 29%;
}
.roundtrip-feilds li:nth-child(2) {
  width: 30%;
}
.roundtrip-feilds li:nth-child(3) {
  width: 13%;
}
.roundtrip-feilds li:nth-child(4) {
  width: 13%;
}

.roundtrip-feilds li {
  border-right: 1px solid #e6e6e6;
  padding: 5px 10px 0;
  float: left;
  border-top: 1px solid #e6e6e6;
  height: 89px;
}
.roundtrip-feilds {
  border-bottom: 1px solid #e6e6e6;
  float: left;
  width: 100%;
  background: #fff;
}

.roundtrip-feilds li:nth-child(7) {
  padding: 0 0;
  width: 15%;
  border: 0;
}
.roundtrip-feilds li.submitBtn .single-input button {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 89px;
  border-radius: 0;
  color: #fff;
  font-size: 24px;
  letter-spacing: 0;
  font-weight: 600;
  padding: 0 7px;
  width: 100%;
  text-transform: capitalize;
}
</style>
