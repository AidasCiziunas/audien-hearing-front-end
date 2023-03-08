<template>
  <div class="hotel-back-btn" style="">
    <div class="title-heading">
      <h2 class="blue-heading">
        <i class="fas fa-umbrella-beach" style="font-size: 24px;"></i>Villas
      </h2>
    </div>
    <v-expansion-panels>
      <v-expansion-panel>
        <div class="single-listing-repeat">
          <div class="single-listing" v-if="trips.engine == 'villa'">
            <div class="main-left car-left-box hotel-main-left">
              <div class="hotel-name">
                <div class="product-text hotel-product-text">
                  <div class="rating-row" style="margin: 10px 0px 0px 0px">
                    <div style="margin: 20px 0px 20px 0px">
                      <span class="hotelTotalStar">
                        <star-rating
                          :star-size="15"
                          :border-width="1"
                          border-color="#fff"
                          :rounded-corners="true"
                          :star-points="[
                            23,
                            2,
                            14,
                            17,
                            0,
                            19,
                            10,
                            34,
                            7,
                            50,
                            23,
                            43,
                            38,
                            50,
                            36,
                            34,
                            46,
                            19,
                            31,
                            17
                          ]"
                          :rating="Number(Math.round(itemDetials[index].search.starRating))"
                          :show-rating="false"
                          :read-only="true"
                        >
                        </star-rating>
                      </span>
                    </div>
                  </div>

                  <span class="hotel-star hotel-star-villa">
                    <span
                      v-if="
                        itemDetials[index].search.review_nr ||
                          itemDetials[index].search.review_nr > 0
                      "
                      >({{ itemDetials[index].search.review_nr }}) Reviews</span
                    >
                  </span>
                  <h3>
                    {{ itemDetials[index].search.displayName }}
                  </h3>
                  <p>
                    <i class="fas fa-map-marker-alt"></i>
                    {{ itemDetials[index].search.address }} &nbsp;
                    <i class="fas fa-road"> </i>
                    {{ itemDetials[index].search.distance }}
                    {{ itemDetials[index].search.distanceUnit }}
                  </p>
                </div>
                <div class="product-img">
                  <span
                    v-if="itemDetials[index].search.breakfast_included"
                    class="ribbon"
                    >Breakfast included</span
                  >
                  <img v-bind:src="itemDetials[index].search.img" alt="img" />
                </div>

                <div class="outer-right hotel-outer-right hhh-col-hotel-outer">
                  <div class="product-reviews hotel-product-reviews bb">
                    <div class="in-left hotel-in-left">
                      <ul>
                        <li>
                          <v-tooltip top>
                            <template
                              v-slot:activator="{
                                on,
                                attrs
                              }"
                            >
                              <i
                                class="fas fa-bed"
                                v-bind="attrs"
                                v-on="on"
                              ></i>
                              {{ itemDetials[index].search.nbrOfBedrooms }}
                            </template>
                            <span
                              >up to
                              {{ itemDetials[index].search.nbrOfBedrooms }}
                              Bedrooms</span
                            >
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
                                class="fas fa-users"
                                v-bind="attrs"
                                v-on="on"
                              ></i>
                              {{ itemDetials[index].search.maxOccupancy }}
                            </template>
                            <span
                              >up to
                              {{ itemDetials[index].search.maxOccupancy }}
                              Guests</span
                            >
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
                                class="fas fa-bath"
                                v-bind="attrs"
                                v-on="on"
                              ></i>
                              {{ itemDetials[index].search.nbrOfBathrooms }}
                            </template>
                            <span
                              >up to
                              {{ itemDetials[index].search.nbrOfBathrooms }}
                              Bathrooms</span
                            >
                          </v-tooltip>
                        </li>
                      </ul>
                    </div>
                    <div class="in-right hotel-in-right"></div>
                  </div>
                  <div
                    class="product-specs hotel-product-specs b-bottom-0"
                    v-for="(room, index) in itemDetials[index].search.rooms"
                    :key="index+'room'"
                  >
                 
                   <p   v-for="(extra_charge, ind) in room.extra_charge
                                      "
                                    :key="ind + 'charge'">
                                  
                                      <b
                                        >{{
                                          extra_charge.excluded == false
                                            ? 'Included'
                                            : 'Excluded'
                                        }}
                                        :
                                      </b>
                                      {{ extra_charge.name }}
                                      {{ currencySymbol
                  }}{{ extra_charge.amount }}
                                       {{extra_charge.charge_price_mode=='percentage'?'':extra_charge.charge_price_mode.split('_')[0]+' '+extra_charge.charge_price_mode.split('_')[1]}}
                                    </p>
                  </div>
                  <div
                    class="product-specs hotel-product-specs b-bottom-0"
                    v-for="(room, index) in itemDetials[index].search.rooms"
                    :key="index+'fee'"
                  >
                  
                    <p>
                      <b
                        ><i class="fas fa-user"></i> x
                        {{ room.persons.adult + room.persons.child }}
                        &nbsp;
                        {{ room.name }}
                      </b>

                      <span class="">
                        {{ room.policies.POLICY_PRE_PAYMENT }}
                      </span>

                      <span>{{ room.policies.POLICY_CANCELLATION }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="hotel-main-right">
              <div class="product-reverse hotel-product-reverse">
                <p class="p-form">Prices From:</p>
                <h2>
                  {{ currencySymbol
                  }}<span>{{ itemDetials[index].search.totalPrice }} </span>
                </h2>
                <p>
                  {{
                    getTotalDaysInDates(
                      trips.item.searchData.checkinDate,
                      trips.item.searchData.checkoutDate
                    )
                  }}
                  <span
                    class="nightColor"
                    v-if="
                      Number(
                        getTotalDaysInDates(
                          trips.item.searchData.checkinDate,
                          trips.item.searchData.checkoutDate
                        )
                      ) == 1
                    "
                    >night,</span
                  >
                  <span
                    class="nightColor"
                    v-if="
                      Number(
                        getTotalDaysInDates(
                          trips.item.searchData.checkinDate,
                          trips.item.searchData.checkoutDate
                        )
                      ) > 1
                    "
                    >nights,</span
                  >
                  {{ personCount(itemDetials[index].search.rooms) }}
                </p>

                <ul>
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
                     <p class="status-blue" mall>
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

                  <li style="text-align: center; display: inline-block;">
                    <div class="sidebar-remove-box qoutetabe-remove-btn">
                      <a
                        href="#"
                        @click="removeTrip(trips)"
                        class="show-more-btn in-right"
                      >
                        <i class="far fa-trash-alt"></i>
                        Remove
                      </a>
                    </div>
                  </li>
            
                </ul>

                <ul class="villa-fee-canellation">
                  <li v-if="itemDetials[index].search.refundable">
                    <p class="status-blue">Free Cancellation
                      <span class="break"></span>
                      Refundable</p>
                  </li>
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
        <v-expansion-panel-content v-if="trips.engine == 'villa'">
          <div class="car-listing-tabs-outer">
            <div class="car-listing-tabs">
              <v-card flat>
                <v-card-text
                  v-text="itemDetials[index].search.villaDescription"
                ></v-card-text>
              </v-card>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';

export default {
  name: 'VillaCurrentItem',
  components:{
      StarRating
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

    hasVillaTrip: {
      type: Boolean
    },
    index: {
      type: Number
    },
    doMeToggle: {
      type: Function
    },
    personCount:{
        type: Function
    },
    removeTrip:{
        type: Function
    }
  }
};
</script>
