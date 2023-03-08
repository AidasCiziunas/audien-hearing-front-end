<template>
  <div class="hotel-back-btn" style="">
    <div class="title-heading">
      <h2 class="blue-heading">
        <i class="fas fa-tasks" style="font-size: 24px;"></i>Activity
      </h2>
    </div>
    <v-expansion-panels>
      <v-expansion-panel>
        <div class="single-listing-repeat">
          <div class="single-listing">
            <div
              class="main-left car-left-box hotel-main-left activity-main-left"
            >
              <div class="hotel-name activity-listing-img">
                <div
                  class="product-text hotel-product-text activity-product-text"
                >
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
                    :read-only="true"
                    :show-rating="false"
                    style="padding-top: 5px;"
                  >
                  </star-rating>
                  <div
                    class="activity-reviews"
                    v-if="itemDetials[index].search.reviewCount > 0"
                  >
                    <p>({{ itemDetials[index].search.reviewCount }} Review)</p>
                  </div>
                  <h3 class="hotel-name  activity-name">
                    {{ itemDetials[index].search.displayName }}
                  </h3>
                </div>
                <div class="product-img">
                  <img
                    v-bind:src="itemDetials[index].search.images[0].variants[12].url"
                    alt="img"
                  />
                </div>
                <div class=" activity-outer-right">
                  <div class="product-specs hotel-product-specs">
                    <p>
                      {{
                        itemDetials[index].search.categories.string.toString()
                      }}
                    </p>
                  </div>
                  <div class="activity-anitmiteis">
                    <ul
                      v-if="
                        typeof itemDetials[index].search.subCategories.string ==
                          'string'
                      "
                    >
                      <i class="fas fa-tags"></i>
                      <li>
                        {{ itemDetials[index].search.subCategories.string }}
                      </li>
                    </ul>

                    <ul v-else>
                      <i class="fas fa-tags"></i>
                      <li
                        v-for="(subcat, index) in itemDetials[index].search
                          .subCategories.string"
                        :key="index"
                      >
                        {{ subcat }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="hotel-main-right">
              <div class="product-reverse hotel-product-reverse">
                <p>Prices From</p>
                <h2>
                  {{ currencySymbol }}
                  <span> {{ itemDetials[index].search.finalPrice }} </span>
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
                  
		         <!--      <li
		                v-if="
		                  trips.booking.length == 0 && trips.sessionDetails.expire
		                "
		              >
		                <a
		                  href="javascript:void(0);"
		                  style="position: relative; top: 50px; text-decoration: none; font-weight: bold;"
		                  @click="searchExpireItem(trips, trips.engine, 'trip')"
		                >
		                  Re-Search Best Deal
		                </a>
		              </li> -->
		             </ul>
                <v-expansion-panel-header
                   v-if="
                    trips.sessionDetails.expire == false ||
                      trips.status == 'booked'
                  "
                  @click="
                    itemDetials[index].search.expanded = !itemDetials[index]
                      .search.expanded
                  "
                  
                >
                  <div class="collpase-heading">
                    <span v-if="!itemDetials[index].search.expanded"
                      >Show Details</span
                    >
                    <span v-if="itemDetials[index].search.expanded">
                      Hide Details</span
                    >
                  </div>
                </v-expansion-panel-header>
              </div>
            </div>
          </div>
        </div>
        <v-expansion-panel-content v-if="trips.engine === 'activity'">
          <div class="car-listing-tabs-outer">
            <div class="car-listing-tabs">
              <v-card flat>
                <v-card-text v-html="itemDetials[index].search.description">
                </v-card-text>
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
  name: 'ActivityCurrentItem',
  components: {
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

    hasActivityTrip: {
      type: Boolean
    },
    index: {
      type: Number
    },
    doMeToggle: {
      type: Function
    },
    personCount: {
      type: Function
    },
    removeTrip: {
      type: Function
    }
  }
};
</script>
