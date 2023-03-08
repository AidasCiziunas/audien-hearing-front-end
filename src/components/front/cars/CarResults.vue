<template>
  <div
    class="col-md-12 listArea"
    v-bind:class="[bookingExist == true ? 'nnn col-lg-9' : 'col-lg-12']"
  >
    <v-expansion-panels :value="panel" multiple>
      <v-expansion-panel v-for="(car, index) in compResults" :key="index">
        <div class="single-listing-repeat">
          <div class="single-listing">
            <div class="main-left car-left-box">
              <div class="outer-left">
                <div class="product-text">
                  <h3>
                    {{ car.CarHireCompany }}&nbsp;&nbsp;&nbsp;
                  </h3>
                  <p>{{ car.CarModel }}</p>
                </div>
                <div class="product-img">
                  <img v-bind:src="car.PicLargeURL" alt="car" />
                </div>
              </div>
              <div class="outer-right car-outer-right">
                <div class="product-reviews">
                  <div class="in-left">
                    <ul class="pl-0">
                      <li class="pl-0">
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <i
                              class="fas fa-car"
                              v-bind="attrs"
                              v-on="on"
                            ></i>
                            {{ car.RepresentingCategory }}
                          </template>
                          <span>Car Category</span>
                        </v-tooltip>
                      </li>
                      <li>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <i
                              class="fas fa-users"
                              v-bind="attrs"
                              v-on="on"
                            ></i>
                            {{ car.NumberOfPassenges }}
                          </template>
                          <span>Number Of Passengers</span>
                        </v-tooltip>
                      </li>
                      <li v-if="car.NumberOfBaggages != ''">
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <i
                              class="fas fa-suitcase-rolling"
                              v-bind="attrs"
                              v-on="on"
                            ></i>
                            {{ car.NumberOfBaggages }}
                          </template>
                          <span>Number Of Bags</span>
                        </v-tooltip>
                      </li>
                      <li v-if="car.NumberOfSuitcases != ''">
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <i
                              class="fas fa-suitcase-rolling"
                              v-bind="attrs"
                              v-on="on"
                            ></i>
                            {{ car.NumberOfSuitcases }}
                          </template>
                          <span>Number Of Suitcases</span>
                        </v-tooltip>
                      </li>
                      <li>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <i
                              class="fas fa-door-open"
                              v-bind="attrs"
                              v-on="on"
                            ></i>
                            {{ car.NumberOfDoors }}
                          </template>
                          <span>Number Of Doors</span>
                        </v-tooltip>
                      </li>
                    </ul>
                  </div>
                  <div class="in-right"></div>
                </div>
                <div class="product-specs">
                  <ul>
                    <li v-if="car.FuelType != ''" class="pr-1">
                      <i class="fas fa-gas-pump"></i>
                      {{ car.FuelType }}
                    </li>
                    <li v-if="car.TransmissionType != ''" class="pr-1">
                      <i class="fas fa-cog"></i>
                      {{ car.TransmissionType }}
                    </li>
                    <li v-if="car.DriveType != ''" class="pr-1">
                      <i class="fas fa-dharmachakra"></i>
                      {{ car.DriveType }}
                    </li>
                    <li v-if="(car.AirConditioning = 'Yes')" class="pr-1">
                      <i class="fas fa-stroopwafel"></i>
                      Air Conditioning
                    </li>
                    <li v-if="car.GPS != ''" class="pr-1">
                      <i class="fas fa-map-marker"></i>
                      GPS
                    </li>
                  </ul>
                </div>
                <div class="product-specs">
                  <ul>
                    <li v-if="car.package != ''" class="pr-1">
                      <i class="fas fa-money-bill-wave"></i>
                      {{ car.package }}
                    </li>
                  </ul>
                </div>
                <!-- <div class="product-varify" v-if="car.PackageName">
                  <h5>Price includes:</h5>
                  <ul>
                    <li v-for="(pval, pkey) in car.PackageName" :key="pkey">
                      <template v-if="pkey != 'UNKNOWN'">
                        <i class="fas fa-check"></i>
                        <span v-if="pval == 'Mileage Unlimited'"
                          >Unlimited Mileage</span
                        >
                        <span v-if="pval != 'Mileage Unlimited'">{{
                          pval
                        }}</span>
                      </template>
                    </li>
                  </ul>
                </div> -->
              </div>
            </div>
            <div class="main-right car-right-box">
              <div class="product-reverse">
                <ul>
                  <li v-if="car.refundable == true">
                    <p class="status-blue">Refundable</p>
                  </li>
                  <li v-if="car.refundable == false">
                    <p class="status-blue">Non-Refundable</p>
                  </li>
                </ul>
                <h2>
                  <span v-if="car.FinalPrice.length == 7">
                    {{ CSymbol
                    }}{{
                      car.FinalPrice.substr(0, 1) +
                      ',' +
                      car.FinalPrice.substr(1, 10)
                    }}
                  </span>
                  <span v-if="car.FinalPrice.length == 8">
                    {{ CSymbol
                    }}{{
                      car.FinalPrice.substr(0, 2) +
                      ',' +
                      car.FinalPrice.substr(2, 10)
                    }}
                  </span>
                  <span v-if="car.FinalPrice.length < 7">
                    {{ CSymbol }}{{ car.FinalPrice }}
                  </span>
                </h2>

                <v-btn
                  @click="addCarToCart(car.Id, car, 'car')"
                  color="error"
                  class="btn-save"
                  width="185"
                >
                  ADD TO CART
                </v-btn>
                <v-expansion-panel-header
                  @click="
                    car.expanded = !car.expanded;
                    getCarDetailById(car.Id);
                  "
                >
                  <div class="collpase-heading">
                    <span v-if="car.expanded">Hide Details</span>
                    <span v-if="!car.expanded">Show Details</span>
                  </div>
                </v-expansion-panel-header>
              </div>
            </div>
          </div>

          <v-expansion-panel-content>
            <div class="car-listing-tabs-outer">
              <div class="car-listing-tabs" v-if="carExtra.data">
                <span
                  class="alert alert-warning details-tab"
                  v-if="
                    carExtra.data.data.length == 0 &&
                    carExtra.data.success == false
                  "
                >
                  <i
                    class="fas fa-exclamation-triangle"
                    style="color: #856404"
                  ></i>
                  Unfortunately, we have no further details on this vehicle.
                </span>

                <template
                  v-if="
                    carExtra.data.data.length > 0 ||
                    carExtra.data.data.carDetails
                  "
                >
                  <v-tabs
                    v-model="car.tab"
                    background-color="primary"
                    class="tabs-car-ul"
                  >
                    <v-tab href="#tab-2">
                      <span>Extras Available</span>
                    </v-tab>
                    <v-tab href="#tab-3">
                      <span>Trip Summary</span>
                    </v-tab>
                    <v-tab href="#tab-6">
                      <span>Package Details</span>
                    </v-tab>
                    <v-tab href="#tab-7">
                      <span>Cancellation and Policies</span>
                    </v-tab>
                  </v-tabs>

                  <div class="tabs-text-content" v-if="car.details">
                    <v-tabs-items v-model="car.tab">
                      <v-tab-item value="tab-3">
                        <TripSummaryTab :car="car" />
                      </v-tab-item>
                      <v-tab-item value="tab-2">
                        <ExtraAvailableTab :car="car" />
                      </v-tab-item>
                      <v-tab-item value="tab-6">
                        <PackageDetailsTab :car="car" />
                      </v-tab-item>
                      <v-tab-item value="tab-7">
                        <CancellationPoliciesTab :car="car" />
                      </v-tab-item>
                    </v-tabs-items>
                  </div>
                </template>
              </div>
            </div>
          </v-expansion-panel-content>
        </div>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
var moment = require('moment');

import CarFeaturesTab from './tabs/CarFeaturesTab.vue';
import ExtraAvailableTab from './tabs/ExtraAvailableTab.vue';
import TripSummaryTab from './tabs/TripSummaryTab.vue';
import PackageDetailsTab from './tabs/PackageDetailsTab.vue';
import CancellationPoliciesTab from './tabs/CancellationPoliciesTab.vue';
import { evBus } from '@/services/bus.js';
import cartHelper from '@/helper/addCartHelper';
import carServices from '@/services/api/Cars';
import { mapState } from 'vuex';

export default {
  name: 'CarResults',
  mixins: [cartHelper],
  props: ['searchAgain', 'results', 'panel'],
  components: {
    CarFeaturesTab,
    ExtraAvailableTab,
    TripSummaryTab,
    PackageDetailsTab,
    CancellationPoliciesTab,
  },
  data() {
    return {
      carExtra: {},
      /* Commented out due to not bieng a computed prop /*
       /*      CSymbol: this.$store.state.envStore.CSymbol */
    };
  },

  methods: {
    addCarToCart(reqCarId, carItem, engine) {
      let that = this;

      let reqHeaders = {
        headers: { 'Content-Type': 'application/json' },
      };

      let reqPayLoad = {
        sessionId: that.$store.state.carStore.carSearchedId,
        carId: reqCarId,
      };
      carServices
        .getCarDetailById(reqPayLoad, reqHeaders)
        .then((rsp) => {
          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            that.doPopLogout();
            return true;
          }

          // Decide to Process If Has Cancel Policy Only
          let hasCancelPolicy = false;

          if (typeof rsp.data.data != 'undefined')
            if (typeof rsp.data.data.carDetails != 'undefined')
              if (
                typeof rsp.data.data.carDetails.cancellationPolicies !=
                'undefined'
              )
                if (rsp.data.data.carDetails.cancellationPolicies.length > 0)
                  hasCancelPolicy = true;
          if (rsp.data.data.carDetails.pricingInfo.isPriceChanged === true) {
            that.$awn.alert(
              'Price has been changed,Please change your search criteria and try again!'
            );
            return false;
          }
          that.openAddCartPopUpForCar(reqCarId, carItem, engine);

          // if (hasCancelPolicy) {
          //     that.openAddCartPopUpForCar(reqCarId, carItem, engine);
          // } else {
          //     that.$awn.alert(
          //         'We have not received the details needed from our supplier to book this vehicle . Please select another vehicle.'
          //     );
          //     return false;
          //} // Ends IF ELSE
        })
        .catch((err) => {
          that.$sentry.withScope(function (scope) {
            scope.setExtra(
              'sessionId',
              that.$store.state.carStore.carSearchedId
            );
            that.$sentry.captureException(new Error(err));
          });
          return false;
        });
    },
    getCarDetailById: function (reqCarId) {
      var that = this;
      let reqCar = that.results.find((o) => {
        if (o.Id == reqCarId) return true;
      });
      if (!reqCar.details) {
        let reqHeaders = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        let reqPayLoad = {
          sessionId: that.$store.state.carStore.carSearchedId,
          carId: reqCarId,
        };

        carServices
          .getCarDetailById(reqPayLoad, reqHeaders)
          .then((rsp) => {
            this.carExtra = rsp;
            if (
              rsp.data.success == false &&
              rsp.data.message == 'Token has expired'
            ) {
              that.doPopLogout();
              return true;
            } else if (
              rsp.data.success == false &&
              rsp.data.message != 'Token has expired' &&
              rsp.data.message ==
                'Session Expired. Please initiate a new search request.'
            ) {
              this.searchAgain();
              return false;
            } else if (
              rsp.data.data.length == 0 &&
              rsp.data.success == false &&
              rsp.data.message !=
                'Session Expired. Please initiate a new search request.'
            ) {
              return false;
            }
            that.results.find((o) => {
              if (o.Id == reqCarId) {
                let resPickTimes = {
                  resDate: moment(rsp.data.data.searchData.pickUp.date).format(
                    'MM/DD/YYYY'
                  ),
                  resTime: moment(rsp.data.data.searchData.pickUp.date).format(
                    'hh:mm A'
                  ),
                };
                let resDropTimes = {
                  resDate: moment(rsp.data.data.searchData.dropOff.date).format(
                    'MM/DD/YYYY'
                  ),
                  resTime: moment(rsp.data.data.searchData.dropOff.date).format(
                    'hh:mm A'
                  ),
                };
                o.details = rsp.data.data.carDetails;
                o.details.pickTimes = resPickTimes;
                o.details.dropTimes = resDropTimes;
              }
            });
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
      } // CHECK IF DETAILS ARE NOT FETCHED YET
    },
  },
  computed: {
    ...mapState({
      CType: (state) => state.envStore.CType,
      CSymbol: (state) => state.envStore.CSymbol,
      DFormat: (state) => state.envStore.DFormat,
      countryDF: (state) => state.envStore.countryDF,
      domain: (state) => state.envStore.domain,
      urlDomain: (state) => state.envStore.urlDomain,
    }),

    activeDomain() {
      return this.$store.state.envStore.domain;
    },
    compResults() {
      return this.results;
    },
  },
};
</script>

<style></style>
