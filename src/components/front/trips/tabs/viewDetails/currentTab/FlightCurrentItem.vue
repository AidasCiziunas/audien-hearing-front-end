<template>
  <div class="hotel-back-btn" style="">
    <div class="title-heading">
      <h2 class="blue-heading">
        <i class="fas fa-plane" style="font-size: 24px;"></i>Flights
      </h2>
    </div>
    <v-expansion-panels>
      <v-expansion-panel>
        <div class="single-listing-repeat">
          <div class="single-listing" v-if="trips.engine == 'flight'">
            <div class="main-left">
              <div class="outer-right flight-outer-right">
                <div
                  class="flight-schedule"
                  v-bind:class="
                    fType === 'oneWay' ? 'oneWay-results' : 'multiple-results'
                  "
                  v-for="(route, routeIndex) in itemDetials[index].search
                    .flights"
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
                                route.flightDetails.departData.departCity
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
                                route.flightDetails.arriveData.arriveCity
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
               
                <span v-if="domain == 'uk'  && trips.atol">
                               <img :src="require('@/assets/images/atol-warning.jpg').default" 
                               style="width:40px;
                               height:40px;"
                               title="ATOL certificate required when purchased within 24 hours of a flight booking." 
                               alt="ATOL certificate required when purchased within 24 hours of a flight booking."/>
                               </span>

                               <span v-if="domain == 'ie' && trips.atol">
                               <img :src="require('@/assets/images/topps.jpg').default" 
                               style="width:60px;
                               height:30px;"
                               title="TOPPS certificate required when purchased within 24 hours of a flight booking." 
                               alt="TOPPS certificate required when purchased within 24 hours of a flight booking."/>
                               </span>

                <b v-if="itemDetials[index].search.instantBooking">
                  <span class="instant_booking">Instant Book</span></b
                >
                <h2>
                  <p class="d-inline-block">From:</p>
                  {{ currencySymbol }}{{ itemDetials[index].search.totalPrice }}
                </h2>

                <ul>
                  <li v-if="itemDetials[index].search.isRefundable != 'No'">
                    <p class="status-blue">Refundable</p>
                  </li>
                  <li v-else>
                   <p class="status-blue">Non-refundable</p>
                  </li>

                  <li
                    v-if="
                      trips.status == 'booked' || trips.status == 'completed'
                    "
                  >
                    <p class="status-blue">
                      Booked
                    </p>
                  </li>

                  <li
                    v-if="
                      trips.status != 'booked' && trips.status != 'completed'
                    "
                  >
                     <p class="status-blue">
                      Not Booked
                    </p>
                  </li>
                  <li
                    v-if="
                    trips.sessionDetails.expire &&
                      trips.status != 'booked' && trips.status != 'completed'
                    "
                  >
                    <v-btn
                      v-bind:color="tripExist ? 'error' : ''"
                     color="error"
                      class="btn-save mt-2"
                      width="auto"
                      @click="searchExpireItem(trips, trips.engine, 'trip')"
                    >
                      Update
                    </v-btn>
                  </li>
                  <div
                    class="sidebar-remove-box"
                    v-if="trips.status != 'booked'"
                  >
                    <a
                      href="#"
                      @click="removeTrip(trips)"
                      class="show-more-btn in-right"
                    >
                      <i class="far fa-trash-alt"></i>
                      Remove
                    </a>
                  </div>
                </ul>
                <v-expansion-panel-header
                  class="hidandshow-flight-btn"
                  v-if="
                    trips.sessionDetails.expire == false ||
                      trips.status == 'booked'
                  "
                  @click="doMeToggle(index)"
                >
                  <div class="collpase-heading">
                    <span v-if="itemDetials[index].search.expanded"
                      >Hide Details</span
                    >
                    <span v-if="!itemDetials[index].search.expanded"
                      >Show Details</span
                    >
                  </div>
                </v-expansion-panel-header>
              </div>
            </div>
          </div>
        </div>

        <!-- flight -->
        <v-expansion-panel-content v-if="trips.engine == 'flight'">
          <div class="car-listing-tabs-outer">
            <div class="car-listing-tabs">
              <template>
                <v-tabs
                  v-model="trips.tab"
                  background-color="primary"
                  class="tabs-car-ul"
                >
                  <v-tab
                    href="#tab-1"
                    v-if="
                      trips.flightDetails != null &&
                        Array.isArray(trips.flightDetails) == false
                    "
                  >
                    <span>Flight Details</span>
                  </v-tab>
                  <v-tab
                    href="#tab-3"
                    v-if="
                      trips.flightDetails != null &&
                        Array.isArray(trips.flightDetails) == false
                    "
                  >
                    <span>Fare Summary</span>
                  </v-tab>
                  <v-tab
                    href="#tab-5"
                    v-if="
                      trips.flightDetails != null &&
                        Array.isArray(trips.flightDetails) == false
                    "
                  >
                    <span>Fare Rules</span>
                  </v-tab>
                  <v-tab
                    href="#tab-8"
                    v-if="
                      trips.booking && Array.isArray(trips.booking) == false
                    "
                  >
                    <span>Booking Details</span>
                  </v-tab>
                </v-tabs>

                <div class="tabs-text-content">
                  <v-tabs-items v-model="trips.tab">
                    <v-tab-item
                      value="tab-1"
                      v-if="
                        trips.flightDetails != null &&
                          Array.isArray(trips.flightDetails) == false
                      "
                    >
                      <FlightDetailTab
                        v-if="trips.flightDetails"
                        :details="trips.flightDetails"
                      />
                    </v-tab-item>

                    <v-tab-item
                      value="tab-3"
                      v-if="
                        trips.flightDetails != null &&
                          Array.isArray(trips.flightDetails) == false
                      "
                    >
                      <FareSummaryTab
                        v-if="trips.flightDetails"
                        :details="trips.flightDetails.fareDetails"
                      />
                    </v-tab-item>

                    <v-tab-item value="tab-5">
                      <FareDisclamierTab
                        v-if="trips.flightDetails"
                        :details="trips.flightDetails.fareRules"
                        :flight="trips"
                      />
                    </v-tab-item>

                    <v-tab-item
                      value="tab-8"
                      v-if="
                        trips.booking && Array.isArray(trips.booking) == false
                      "
                    >
                      <div class="acord-body">
                        <!--TABLE TO DISPLAY HERE-->

                        <v-simple-table>
                          <template v-slot:default>
                            <tbody>
                              <tr>
                                <td>Booking Number:</td>
                                <td>
                                  {{ trips.booking.bookingId }}
                                </td>
                              </tr>

                              <tr>
                                <td>Flight Frequent Flyer:</td>
                                <td>
                                  {{
                                    getObjectValue(
                                      trips.booking.flightData.frequentFlyer
                                    )
                                  }}
                                </td>
                              </tr>

                              <tr>
                                <td>Departure Location:</td>
                                <td>{{ item.pickLoc }}</td>
                              </tr>
                              <!--
		                                                      <tr>
		                                                          <td>Arrival Location:</td>
		                                                          <td>{{ item.dropLoc }}</td>
		                                                      </tr>
		                                                      -->
                              <tr>
                                <td>Ticket Status:</td>
                                <td>
                                  {{ trips.booking.booking.ticketStatus }}
                                </td>
                              </tr>

                              <tr>
                                <td>Passengers:</td>
                                <td>
                                  <table>
                                    <tr
                                      v-for="(psngr, index) in trips.booking
                                        .passengers"
                                    >
                                      <td>
                                        {{
                                          (psngr.title +
                                            ' ' +
                                            psngr.firstName +
                                            ' ' +
                                            psngr.lastName)
                                            | capitalize
                                        }}
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>

                        <!--TABLE TO DISPLAY HERE-->
                      </div>
                    </v-tab-item>
                  </v-tabs-items>
                </div>
              </template>
            </div>

            <div class="car-listing-tabs" v-if="trips.flightDetails == null">
              <div class="tabs-text-content">
                <p>
                  We have not received the details needed from our supplier to
                  book this flight. Please select another flight.
                </p>
              </div>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import FlightDetailTab from '@/components/front/trips/tabs/FlightDetailTab.vue';
import FareSummaryTab from '@/components/front/trips/tabs/FareSummaryTab.vue';
import FareDisclamierTab from '@/components/front/trips/tabs/FareDisclamierTab.vue';
import { mapState } from 'vuex';

export default {
  name: 'FlightCurrentItem',
  components: {
    FlightDetailTab,
    FareSummaryTab,
    FareDisclamierTab
  },

  props: {
    itemDetials: {
      type: Array
    },

    trips: {
      type: Object
    },

    activeDomain: {
      type: String
    },

    hasFlightTrip: {
      type: Boolean
    },
    index: {
      type: Number
    },
    doMeToggle: {
      type: Function
    },
    transformToCode: {
      type: Function
    },
    fType: {
      type: String
    },
    removeTrip: {
      type: Function
    }
  },

  computed:{
     ...mapState({
      domain: state=> state.envStore.domain
       
     })
  }
};
</script>
