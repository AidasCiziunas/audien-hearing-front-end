<template>
  <div v-if=" itemDetials[index] !== undefined" class="hotel-back-btn" style="">
    <div class="title-heading">
      <h2 class="blue-heading">
        <i class="fas fa-car" style="font-size: 24px;"></i>Car
      </h2>
    </div>
    <v-expansion-panels>
      <v-expansion-panel>
        <div class="single-listing-repeat">
          <div class="single-listing" v-if="trips.engine == 'car'">
            <div class="main-left car-left-box ">
              <div class="outer-left">
                <div class="product-text">
                  <h3>
                    {{ itemDetials[index].search.CarHireCompany }}
                  </h3>
                  <p>
                    {{ itemDetials[index].searchCarModel }}
                  </p>
                </div>
                <div class="product-img">
                  <img
                    v-bind:src="itemDetials[index].search.PicLargeURL"
                    alt="car"
                  />
                </div>
              </div>
              <div class="outer-right car-outer-right">
                <div class="product-reviews">
                  <div class="in-left">
                    <ul>
                      <li class="product-meta">
                        <span>{{
                          itemDetials[index].search.RepresentingCategory
                        }}</span>
                      </li>
                      <li>
                        <v-tooltip top>
                          <template
                            v-slot:activator="{
                              on,
                              attrs
                            }"
                          >
                            <i
                              class="fas fa-users"
                              v-bind="attrs"
                              v-on="on"
                            ></i>
                            {{ itemDetials[index].search.NumberOfPassenges }}
                          </template>
                          <span>Number Of Passengers</span>
                        </v-tooltip>
                      </li>
                      <li v-if="itemDetials[index].search.NumberOfBaggages!=''"> 
                        <v-tooltip top>
                          <template
                            v-slot:activator="{
                              on,
                              attrs
                            }"
                          >
                            <i
                              class="fas fa-suitcase-rolling"
                              v-bind="attrs"
                              v-on="on"
                            ></i>
                            {{ itemDetials[index].search.NumberOfBaggages }}
                          </template>
                          <span>Number Of Bags</span>
                        </v-tooltip>
                      </li>
                      <li v-if="itemDetials[index].search.NumberOfSuitcases!=''">
                        <v-tooltip top>
                          <template
                            v-slot:activator="{
                              on,
                              attrs
                            }"
                          >
                            <i
                              class="fas fa-suitcase-rolling"
                              v-bind="attrs"
                              v-on="on"
                            ></i>
                            {{ itemDetials[index].search.NumberOfSuitcases }}
                          </template>
                          <span>Number Of Suitcases</span>
                        </v-tooltip>
                      </li>
                      <li>
                        <v-tooltip top>
                          <template
                            v-slot:activator="{
                              on,
                              attrs
                            }"
                          >
                            <i
                              class="fas fa-door-open"
                              v-bind="attrs"
                              v-on="on"
                            ></i>
                            {{ itemDetials[index].search.NumberOfDoors }}
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
                    
                    <li v-if="activeDomain != 'us'">
                      <i class="fas fa-gas-pump"></i>
                      {{ itemDetials[index].search.FuelType }}
                    </li>

                    <li>
                      <i class="fas fa-cog"></i>
                      {{ itemDetials[index].search.TransmissionType }}
                    </li>
                    <li>
                      <i class="fas fa-dharmachakra"></i>
                      {{ itemDetials[index].search.DriveType }}
                    </li>
                    <li
                      v-if="(itemDetials[index].search.AirConditioning = 'Yes')"
                    >
                      <i class="fas fa-stroopwafel"></i>
                      Air Conditioning
                    </li>
                    <li v-if="itemDetials[index].search.GPS!=''">
                      <i class="fas fa-map-marker"></i>
                                            GPS
                    </li>
                  </ul>
                </div>
                <div
                  class="product-varify"
                  v-if="itemDetials[index].search.PackageName"
                >
                  <h5>Price includes:</h5>
                  <ul>
                    <li
                      v-for="(pval, pkey) in itemDetials[index].search
                        .PackageName"
                      :key="pkey"
                    >
                      <span v-if="pkey != 'UNKNOWN'">
                        <i class="fas fa-check"></i>
                        <span v-if="pval == 'Mileage Unlimited'"
                          >Unlimited Mileage</span
                        >
                        <span v-if="pval != 'Mileage Unlimited'">{{
                          pval
                        }}</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="main-right car-right-box">
              <div class="product-reverse">
                <h2>
                  {{ currencySymbol }}{{ itemDetials[index].search.FinalPrice }}
                </h2>

                <ul>
                  <li>
                     <p class="status-blue"
                      v-if="
                        trips.status == 'booked' || trips.status == 'completed'
                      "
                    >
                      Booked
                    </p>
                     <p class="status-blue"
                      v-if="
                        trips.status != 'booked' && trips.status != 'completed'
                      "
                    >
                      Not Booked
                    </p>
                  </li>
                  <li
                    v-if="
                      trips.sessionDetails.expire &&
                        trips.status != 'booked' &&
                        trips.status != 'completed'
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

        <v-expansion-panel-content v-if="trips.engine == 'car'">
          <div
            class="car-listing-tabs-outer"
            v-if="
              trips.carDetails == null &&
                trips.booking &&
                Array.isArray(trips.booking) == false
            "
          >
            <div class="car-listing-tabs">
              <template>
                <v-tabs
                  v-model="trips.tab"
                  background-color="primary"
                  class="tabs-car-ul"
                >
                  <v-tab href="#tab-1">
                    <span>Booking Details</span>
                  </v-tab>
                </v-tabs>

                <div class="tabs-text-content pt-0">
                  <v-tabs-items v-model="trips.tab">
                    <v-tab-item value="tab-1">
                      <!--car booking detail-->
                      <div class="acord-body">
                        <div>
                          <!--static car table start-->
                        </div>

                        <v-simple-table>
                          <template v-slot:default>
                            <tbody>
                              <tr>
                                <td>Booking ID/Confirmation #:</td>
                                <td>
                                  {{ trips.booking.bookingId }}
                                </td>
                              </tr>

                              <tr>
                                <td>Primary Guests Name(s):</td>
                                <td>
                                  {{
                                    (trips.travellerInfo[0].firstName +
                                      ' ' +
                                      trips.travellerInfo[0].lastName)
                                      | ucwords
                                  }}
                                </td>
                              </tr>

                              <tr>
                                <td>Car Rental Company:</td>
                                <td>
                                  {{ trips.item.engineDetails.CarHireCompany }}
                                </td>
                              </tr>

                              <!--
		                                                  <tr>
		                                                      <td>Pickup City:</td>
		                                                      <td>{{ trips.item.searchData.pickUp }}</td>
		                                                  </tr>
		                                                  -->

                              <tr>
                                <td>Supplier Order ID:</td>
                                <td>
                                  {{ trips.booking.orderId }}
                                </td>
                              </tr>

                              <tr>
                                <td>Pickup Location:</td>
                                <td>
                                  {{
                                    trips.item.searchData.pickUp.locationName
                                  }}
                                </td>
                              </tr>

                              <tr>
                                <td>Pickup Date:</td>
                                <td>
                                  {{ trips.item.searchData.pickUp.date }}
                                </td>
                              </tr>
                              <tr>
                                <td>Return Location:</td>
                                <td>
                                  {{
                                    trips.item.searchData.dropOff.locationName
                                  }}
                                </td>
                              </tr>

                              <tr>
                                <td>Return Date:</td>
                                <td>
                                  {{ trips.item.searchData.dropOff.date }}
                                </td>
                              </tr>

                              <tr>
                                <td>Car Type:</td>
                                <td>
                                  {{ trips.item.engineDetails.Category }}
                                </td>
                              </tr>

                              <tr>
                                <td>Guest Email:</td>
                                <td>
                                  {{ trips.travellerInfo[0].email }}
                                </td>
                              </tr>
                              <tr>
                                <td>Guest Street/Address:</td>
                                <td>
                                  {{ trips.travellerInfo[0].address }}
                                </td>
                              </tr>

                              <tr>
                                <td>Guest Town/City:</td>
                                <td>
                                  {{ trips.travellerInfo[0].city }}
                                </td>
                              </tr>
                              <tr>
                                <td>Guest ZIP CODE:</td>
                                <td>
                                  {{ trips.travellerInfo[0].zip }}
                                </td>
                              </tr>

                              <tr v-if="trips.carDetails">
                                <td>Estimated Total:</td>
                                <td>
                                  {{ currencySymbol }}
                                  {{ trips.carDetails.carData.FinalPrice }}
                                </td>
                              </tr>

                              <tr>
                                <td>Status:</td>
                                <td class="clr-blue">
                                  {{ trips.booking.status | capitalize }}
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </div>
                      <!--car booking detail-->
                    </v-tab-item>
                  </v-tabs-items>
                </div>
              </template>
            </div>
          </div>

          <div class="car-listing-tabs-outer" v-if="trips.carDetails != null">
            <div class="car-listing-tabs">
              <span
                class="alert alert-warning details-tab"
                v-if="trips.carDetails == null"
              >
                <i
                  class="fas fa-exclamation-triangle"
                  style="color: #856404"
                ></i>
                Unfortunately, we have no further details on this vehicle.
              </span>

              <template>
                <v-tabs
                  v-model="trips.tab"
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
                   
                    <v-tab-item value="tab-2">
                      <ExtraAvailableTab :car="trips.carDetails.carDetails" />
                    </v-tab-item>
                    <v-tab-item value="tab-3">
                      <TripSummaryTab :car="trips.carDetails.carDetails" />
                    </v-tab-item>
                    <v-tab-item value="tab-6">
                      <PackageDetailsTab :car="trips.carDetails.carDetails" />
                    </v-tab-item>
                    <v-tab-item value="tab-7">
                      <CancellationPoliciesTab
                        :car="trips.carDetails.carDetails"
                      />
                    </v-tab-item>
                    <v-tab-item value="tab-8">
                      <!--car booking detail-->
                      <div class="acord-body">
                        <div
                          v-if="
                            trips.booking &&
                              Array.isArray(trips.booking) == false
                          "
                        >
                          <!--static car table start-->
                        </div>

                        <v-simple-table>
                          <template v-slot:default>
                            <tbody>
                              <tr>
                                <td>Booking ID/Confirmation #:</td>
                                <td>
                                  {{ trips.booking.bookingId }}
                                </td>
                              </tr>

                              <tr>
                                <td>Primary Guests Name(s):</td>
                                <td>
                                  {{
                                    (trips.travellerInfo[0].firstName +
                                      ' ' +
                                      trips.travellerInfo[0].lastName)
                                      | ucwords
                                  }}
                                </td>
                              </tr>

                              <tr>
                                <td>Car Rental Company:</td>
                                <td>
                                  {{ trips.item.engineDetails.CarHireCompany }}
                                </td>
                              </tr>
                              <tr>
                                <td>Supplier Order ID:</td>
                                <td>
                                  {{ trips.booking.orderId }}
                                </td>
                              </tr>

                              <tr>
                                <td>Pickup Location:</td>
                                <td>
                                  {{
                                    trips.item.searchData.pickUp.locationName
                                  }}
                                </td>
                              </tr>

                              <tr>
                                <td>Pickup Date:</td>
                                <td>
                                  {{ trips.item.searchData.pickUp.date }}
                                </td>
                              </tr>

                              <tr>
                                <td>Return Location:</td>
                                <td>
                                  {{
                                    trips.item.searchData.dropOff.locationName
                                  }}
                                </td>
                              </tr>

                              <tr>
                                <td>Return Date:</td>
                                <td>
                                  {{ trips.item.searchData.dropOff.date }}
                                </td>
                              </tr>

                              <tr>
                                <td>Car Type:</td>
                                <td>
                                  {{ trips.item.engineDetails.Category }}
                                </td>
                              </tr>

                              <tr>
                                <td>Guest Email:</td>
                                <td>
                                  {{ trips.travellerInfo[0].email }}
                                </td>
                              </tr>
                              <tr>
                                <td>Guest Street/Address:</td>
                                <td>
                                  {{ trips.travellerInfo[0].address }}
                                </td>
                              </tr>

                              <tr>
                                <td>Guest Town/City:</td>
                                <td>
                                  {{ trips.travellerInfo[0].city }}
                                </td>
                              </tr>
                              <tr>
                                <td>Guest ZIP CODE:</td>
                                <td>
                                  {{ trips.travellerInfo[0].zip }}
                                </td>
                              </tr>

                              <tr v-if="trips.carDetails">
                                <td>Estimated Total:</td>
                                <td>
                                  {{ currencySymbol }}
                                  {{ trips.carDetails.carData.FinalPrice }}
                                </td>
                              </tr>

                              <tr>
                                <td>Status:</td>
                                <td class="clr-blue">
                                  {{ trips.booking.status | capitalize }}
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </div>
                      <!--car booking detail-->
                    </v-tab-item>
                  </v-tabs-items>
                </div>
              </template>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import ExtraAvailableTab from '@/components/front/trips/Carstabs/ExtraAvailableTab.vue';
import TripSummaryTab from '@/components/front/trips/Carstabs/TripSummaryTab.vue';
import PackageDetailsTab from '@/components/front/trips/Carstabs/PackageDetailsTab.vue';
import CancellationPoliciesTab from '@/components/front/trips/Carstabs/CancellationPoliciesTab.vue';
export default {
  name: 'CarCurrentItem',

  components: {
    ExtraAvailableTab,
    TripSummaryTab,
    PackageDetailsTab,
    CancellationPoliciesTab
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

    hasCarTrip: {
      type: Boolean
    },
    index: {
      type: Number
    },
    doMeToggle: {
      type: Function
    },

    removeTrip: {
      type: Function
    }
  }
};
</script>
