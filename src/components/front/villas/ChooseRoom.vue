<template>
  <span style="display: block !important" class="room-container">
    <v-container>
      <div class="hotel-back-btn">
        <router-link to="/villas">
          <i class="fas fa-angle-double-left"></i>
          Back to Rentals Listing
        </router-link>
      </div>
      <div class="hotel-room-page">
        <div class="row">
          <div class="col-md-9">
            <Header :villaData="villaData" />
            <div class="gallery-contact-no">
              <p>
                <img src="@/assets/images/hotel-miles.png" />
                {{ villaData.distance }}
                {{ villaData.distanceUnit }}
              </p>
              <p>
                <img src="@/assets/images/hotel-map.png" />
                <a role="button" href="#map" @click="showMapTab()"
                  >View on map</a
                >
              </p>
            </div>
            <div class="villa-img-box">
              <img :src="villaData.img" style="width: 100%" />
            </div>
          </div>
          <div class="col-md-3">
            <checkAvailibity
              :villaData="villaData"
              :totalNights="totalNights"
            />
          </div>

          <div class="villas-miles-row">
            <v-row>
              <div class="col-md-3">
                <div class="villas-meals">
                  <p>
                    <i class="fas fa-road"></i><b>{{ villaData.distance }}</b
                    >{{ villaData.distanceUnit }}
                  </p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="villas-meals">
                  <p>
                    <i class="fas fa-bed"></i> up to
                    <b>{{ villaData.nbrOfBedrooms }}</b
                    >Bedrooms
                  </p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="villas-meals">
                  <p>
                    <i class="fas fa-users"></i> up to<b>{{
                      villaData.maxOccupancy
                    }}</b
                    >Guests
                  </p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="villas-meals">
                  <p>
                    <i class="fas fa-bath"></i>
                    <b>{{ villaData.nbrOfBathrooms }}</b
                    >Bathrooms
                  </p>
                </div>
              </div>
            </v-row>
          </div>
          <div class="hotel-room-tabs">
            <v-toolbar class="remove-head-bg" style="height: auto !important">
              <template v-slot:extension>
                <v-tabs v-model="tabs" fixed-tabs>
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab href="#mobile-tabs-5-1" class="primary--text">
                    DESCRIPTION
                  </v-tab>
                  <v-tab href="#mobile-tabs-5-2" class="primary--text">
                    Amenities
                  </v-tab>
                  <v-tab
                    id="map"
                    ref="map"
                    href="#mobile-tabs-5-3"
                    class="primary--text"
                  >
                    Map
                  </v-tab>
                  <v-tab
                    href="#mobile-tabs-5-5"
                    class="primary--text"
                    role="button"
                    @click="getVillaReviews()"
                  >
                    REVIEWS
                  </v-tab>
                </v-tabs>
              </template>
            </v-toolbar>
            <v-tabs-items v-model="tabs">
              <v-tab-item :value="'mobile-tabs-5-1'">
                <v-card flat v-if="villaData.villaDescription">
                  <v-card-text v-html="description"></v-card-text>

                  <a
                    v-if="
                      villaData.villaDescription.length < description.length
                    "
                    role="button"
                    class="ml-5 float-right pr-10 pb-4"
                    @click="showMore()"
                    >Read More...</a
                  >
                  <a
                    v-if="
                      villaData.villaDescription.length == description.length
                    "
                    role="button"
                    class="ml-5 float-right pr-10 pb-4"
                    @click="hideMore()"
                    >Hide More</a
                  >
                </v-card>
              </v-tab-item>
              <v-tab-item :value="'mobile-tabs-5-2'">
                <v-card flat>
                  <div class="villas-product-varify">
                    <ul>
                      <li
                        v-for="(amenities, index) in villaData.villaAmenities"
                        :key="index"
                      >
                        <i
                          class="fas fa-circle"
                          style="color: #000 !important"
                        ></i>
                        <span>{{ amenities | capitalize }}</span>
                      </li>
                    </ul>
                  </div>
                </v-card>
              </v-tab-item>
              <v-tab-item :value="'mobile-tabs-5-3'">
                <v-card flat>
                  <v-card-text>
                    <GmapMap
                      :center="center"
                      :zoom="12"
                      style="width: 100%; height: 500px"
                    >
                      <GmapMarker
                        v-for="(m, index) in markers"
                        :position="m.position"
                        :clickable="true"
                        :draggable="false"
                        :key="index"
                        @click="openInfoWindowTemplate(index)"
                      />

                      <gmap-info-window
                        :options="{
                          maxWidth: 300,
                          pixelOffset: {
                            width: 0,
                            height: -35,
                          },
                        }"
                        :position="infoWindow.position"
                        :opened="infoWindow.open"
                        @closeclick="infoWindow.open = false"
                      >
                        <div v-html="infoWindow.template"></div>
                      </gmap-info-window>
                    </GmapMap>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item :value="'mobile-tabs-5-4'">
                <v-card flat>
                  <v-card-text
                    v-text="villaData.villaDescription"
                  ></v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab-item :value="'mobile-tabs-5-5'">
                <h5 class="ml-4" v-if="!hasReviews">
                  {{ noReviewMessage }}
                </h5>
                <template v-for="(review, index) in villaReviews">
                  <v-card :key="index">
                    <div class="review-box">
                      <div class="villas-room-rating">
                        <div>
                          <span class="hotel-star">
                            <star-rating
                              :star-size="15"
                              :border-width="1"
                              border-color="#fff"
                              :rounded-corners="true"
                              :star-points="[
                                23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38,
                                50, 36, 34, 46, 19, 31, 17,
                              ]"
                              :rating="Number(Math.round(Math.abs(review.average_score - 5)))"
                              :show-rating="false"
                              :read-only="true"
                            >
                            </star-rating>
                          </span>
                        </div>

                        <p>
                          {{ review.average_score }}
                        </p>
                        <h6>{{ review.headline }}</h6>
                        <small
                          >{{ review.average_score }}0% Guests Recommended
                          this</small
                        >
                      </div>

                      <div class="provide-review">
                        <h5>Reviews provided by</h5>
                        <p>
                          <img
                            :src="require('@/assets/images/b_logo.png').default"
                          />
                        </p>
                      </div>
                    </div>

                    <div class="review-list-box">
                      <div class="review-card">
                        <div class="review-listing">
                          <div class="review-listing-inner">
                            <h5>Reviewd:</h5>
                            <p>
                              {{ review.date | formatDate }}
                            </p>
                          </div>
                          <div class="review-score">
                            <h5>Review Score:</h5>
                            <p>
                              {{ review.average_score }}
                            </p>
                            <span>{{ review.headline }}</span>
                          </div>
                          <div
                            class="review-negative"
                            v-if="review.pros && review.pros !== ''"
                          >
                            <h5>Positive:</h5>
                            <p>{{ review.pros }}</p>
                          </div>
                          <div
                            class="review-negative"
                            v-if="review.cons && review.cons !== ''"
                          >
                            <h5>Negative:</h5>
                            <p>{{ review.cons }}</p>
                          </div>
                        </div>
                        <div class="review-name-box">
                          <div class="reivew-name">
                            <h5>
                              {{ review.author.name }}
                            </h5>
                            <p>
                              {{ review.author.country | showCountry }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-card>
                </template>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </div>
        <div class="room-heading">
          <h4>
            Rooms Available
            <span class="float-right"><span
              class="villa-total-amount">{{ CSymbol
                }}{{
                  totalAmount
                }}</span
              ><v-btn
              color="error"
                  class="btn-save btn-villa-add-cart"
              @click="addVillaToCart()"
              :disabled="disabledCartBtn"
            >
              Add To Cart
            </v-btn>
            </span>
          </h4>
        </div>

        <template v-if="Object.keys(rooms).length">
          <div class="refundable-tabs-data">
            <div class="villas-listing">
              <v-row>
                <div
                  v-bind:class="[
                    bookingExist == true
                      ? 'col-lg-9 listArea'
                      : 'col-lg-12 listArea',
                  ]"
                >
                  <div
                    v-for="(room, index) in rooms"
                    v-if="
                      index !== 'maxOccupancy' && index !== 'nbrOfBedroomsLeft'
                    "
                    :key="index"
                    class=""
                  >
                    <v-expansion-panels style="margin-bottom: 50px">
                      <v-expansion-panel>
                        <div class="single-listing-repeat">
                          <div class="single-listing">
                            <div class="main-left car-left-box hotel-main-left">
                              <div class="hotel-name">
                                <div class="villa-product-text">
                                  <h3>
                                    {{ room.name }}
                                  </h3>
                                </div>
                                <div
                                  class="product-img villas-product-img"
                                  v-if="room.photos[0] && room.photos[0] !== ''"
                                >
                                  <img :src="room.photos[0]" />
                                </div>
                                <div
                                  class="product-img villas-product-img"
                                  v-else
                                >
                                  <img
                                    :src="
                                      require('@/assets/images/missing-image.jpg')
                                        .default
                                    "
                                  />
                                </div>

                                <div class="outer-right hotel-outer-right">
                                  <div
                                    class="product-reviews hotel-product-reviews"
                                  >
                                    <div class="in-left hotel-in-left villa-price-for">
                                      <h5>Price for :</h5>
                                      <v-tooltip top>
                                        <template v-slot:activator="{ on, attrs }">
                                          <span
                                            v-bind="attrs"
                                            v-on="on"
                                            style="margin-right:5px;">
                                      <i v-for="i in room.max_adults"
                                        :key="i"
                                        class="fas fa-user fa-small"
                                        style="margin: 0 3px 0 0;"
                                      ></i>
                                          </span>
                                        </template>
                                        <span>
                                          Max Adults
                                        </span
                                      ></v-tooltip>

                                      <span v-if="room.max_children > 0"
                                        style="vertical-align:bottom; display:inline-block; margin-right:10px;">
                                        + <i
                                          v-for="i in room.max_children"
                                          :key="i"
                                          class="fas fa-child fa-small"
                                          style="margin: 0 3px 0 3px;"
                                        ></i>
                                        <v-tooltip top>
                                          <template v-slot:activator="{ on, attrs }">
                                            <i
                                              v-bind="attrs"
                                              v-on="on"
                                              class="ml-1 fas fa-info-circle small"
                                              style="font-size:0.8rem;"
                                              ></i
                                            >
                                          </template>
                                        <span
                                            ><span class="mr-1">{{
                                              room.max_children
                                            }}</span
                                            ><span
                                              >{{
                                                room.max_children_info
                                              }}</span
                                          ></span>
                                        </v-tooltip>
                                      </span>
                                      <p>
                                        {{ sleeps }}
                                        Night<span v-if="sleeps > 1">s</span
                                        ><span v-html="'('" class="ml-2"></span>

                                        {{ justFormatRawDate(date1) }}
                                        <span v-html="'-'"></span>
                                        {{ justFormatRawDate(date2)
                                        }}<span v-html="')'"></span>
                                      </p>
                                    </div>

                                    <div class="in-right hotel-in-right"></div>
                                  </div>

                                  <div
                                    class="cancellation-box"
                                    v-if="
                                      room.cancellation_info &&
                                      room.cancellation_info[0].until !== '' &&
                                      room.cancellation_info[0].from !== ''
                                    "
                                  >
                                    <p>
                                      <b>Cancellation Fee : </b>
                                      <b>after</b>

                                      {{
                                        justFormatMyDate(
                                          room.cancellation_info[0].from,
                                          countryDF
                                        )
                                      }}
                                      <b>until</b>
                                      {{
                                        justFormatMyDate(
                                          room.cancellation_info[0].until,
                                          countryDF
                                        )
                                      }}
                                      <b>Fee</b>: {{ globalData.CSymbol
                                      }}{{ room.cancellation_info[0].fee }}
                                    </p>
                                  </div>

                                  <div
                                    class="cancellation-box"
                                    v-for="(extra_charge, ind) in room.min_price
                                      .extra_charge"
                                    :key="ind + 'charge'"
                                  >
                                    <p>
                                      <b
                                        >{{
                                          extra_charge.excluded == true
                                            ? 'Excluded'
                                            : 'Included'
                                        }}
                                        :
                                      </b>

                                      {{ extra_charge.name }}
                                      {{
                                        dynamicCurrencySymbol(
                                          extra_charge.currency
                                        )
                                      }}{{ extra_charge.amount }}

                                      {{
                                        extra_charge.charge_price_mode ==
                                        'percentage'
                                          ? ''
                                          : extra_charge.charge_price_mode
                                      }}
                                    </p>
                                  </div>
                                  <div class="product-specs">
                                    <ul>
                                      <li>
                                        <!-- <p> -->
                                          <i class="fas fa-bed mr-1"></i>
                                          <b class="mr-1">{{
                                            room.number_of_rooms_left
                                          }}</b
                                          >rooms available.
                                        <!-- </p> -->
                                      </li>
                                      <li>
                                        <!-- <p> -->
                                          <i class="fas fa-users mr-1"></i>
                                          Max occupancy
                                          <b class="mr-1">{{
                                            room.max_occupancy
                                          }}</b
                                          >Guests/room
                                        <!-- </p> -->
                                      </li>
                                    </ul>
                                  </div>
                                  <div
                                    class="product-varify hotel-product-varify"
                                  >
                                    <h5
                                      v-if="
                                        room.breakfast_included ||
                                        room.dinner_included ||
                                        room.deposit_required ||
                                        room.free_wifi
                                      "
                                    >
                                      Price Includes
                                    </h5>
                                    <ul>
                                      <li v-if="room.breakfast_included">
                                        <i class="fas fa-check"></i>
                                        <span> Breakfast</span>
                                      </li>
                                      <li v-if="room.dinner_included">
                                        <i class="fas fa-check"></i>
                                        <span>Dinner</span>
                                      </li>
                                      <li
                                        v-if="room.deposit_required == 'true'"
                                      >
                                        <i class="fas fa-check"></i>
                                        <span> Deposit </span>
                                      </li>
                                      <li v-if="room.free_wifi">
                                        <i class="fas fa-check"></i>
                                        <span> Wifi </span>
                                      </li>
                                    </ul>
                                  </div>
                                  <p class="break-fast-text">
                                    <i
                                      class="fas fa-info-circle"
                                      style="margin-right: 10px"
                                    ></i
                                    >{{ room.mealplan_description }}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="main-right hotel-main-right">
                              <div
                                class="product-reverse hotel-product-reverse"
                              >

                              <p class="status-blue" v-if="room.refundable">
                                Refundable
                              </p>
                              <p class="status-blue" v-if="!room.refundable">
                               Non-Refundable
                              </p>
                                 
                                  
                                <h2>
                                  <span :id="index">
                                    {{ CSymbol
                                    }}{{
                                      getRoomPriceByDomain(
                                        room.incremental_price
                                      ) | toFixed
                                    }}</span
                                  >
                                </h2>
                                <p>
                                  Total for
                                  {{ sleeps }}
                                  <span v-if="sleeps > 1" style="color: #5c5c5c"
                                    >nights</span
                                  >
                                  <span v-else style="color: #5c5c5c"
                                    >night</span
                                  >
                                </p>
                                <div class="villas-room-count">
                                  <v-col class="d-flex p-0" cols="12" sm="12">
                                    <v-select
                                      :items="getRoomPrices(room)"
                                      return-object
                                      item-text="item"
                                      label="Select Rooms"
                                      @change="selectRoom($event, room, index)"
                                      standard
                                    >
                                    </v-select>
                                  </v-col>
                                </div>
                                <v-expansion-panel-header
                                  @click="DetailsShow(index, room)"
                                >
                                  <div class="collpase-heading">
                                    <span v-if="!room.expanded"
                                      >Show Details</span
                                    >

                                    <span v-if="room.expanded"
                                      >Hide Details</span
                                    >
                                  </div>
                                </v-expansion-panel-header>
                              </div>
                            </div>
                          </div>
                          <v-expansion-panel-content
                            v-if="index == showacordian"
                          >
                            <div class="car-listing-tabs-outer">
                              <div class="car-listing-tabs">
                                <v-tabs
                                  v-model="desctabs"
                                  background-color="primary"
                                  class="tabs-car-ul"
                                >
                                  <v-tab href="#tab-1">
                                    <span>Description</span>
                                  </v-tab>
                                  <v-tab href="#tab-2">
                                    <span>Amenities</span>
                                  </v-tab>
                                  <v-tab href="#tab-3">
                                    <span>CANCELLATION</span>
                                  </v-tab>
                                  <v-tab href="#tab-4">
                                    <span>GALLERY</span>
                                  </v-tab>
                                </v-tabs>
                                <div class="tabs-text-content">
                                  <v-tabs-items v-model="desctabs">
                                    <v-tab-item :value="'tab-1'">
                                      <v-card flat>
                                        <v-card-text
                                          v-text="room.room_description"
                                        ></v-card-text>
                                      </v-card>
                                    </v-tab-item>

                                    <v-tab-item :value="'tab-2'">
                                      <div class="villas-product-varify">
                                        <ul>
                                          <li
                                            v-for="(
                                              facility, index
                                            ) in room.facilities"
                                            :key="index"
                                          >
                                            <i
                                              class="fas fa-circle"
                                              style="color: #000 !important"
                                            ></i>
                                            <span>
                                              {{ facility | capitalize }}
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                    </v-tab-item>
                                    <v-tab-item
                                      :value="'tab-3'"
                                      class="simple_table"
                                    >
                                      <template>
                                        <v-simple-table>
                                          <template v-slot:default>
                                            <thead>
                                              <tr>
                                                <th class="text-left">Fee</th>
                                                <th class="text-left">From</th>
                                                <th class="text-left">After</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr
                                                v-for="(
                                                  cance_info, index
                                                ) in room.cancellation_info"
                                                :key="index"
                                              >
                                                <td>
                                                  {{ CSymbol
                                                  }}{{ cance_info.fee }}
                                                </td>
                                                <td>
                                                  {{
                                                    justFormatMyDate(
                                                      cance_info.from,
                                                      countryDF
                                                    )
                                                  }}
                                                </td>
                                                <td
                                                  v-if="cance_info.until !== ''"
                                                >
                                                  {{
                                                    justFormatMyDate(
                                                      cance_info.until,
                                                      countryDF
                                                    )
                                                  }}
                                                </td>
                                              </tr>
                                            </tbody>
                                          </template>
                                        </v-simple-table>
                                      </template>
                                      <v-card flat>
                                        <v-card-text
                                          v-text="room.payment_terms.name"
                                          class="primary--text"
                                        ></v-card-text>
                                      </v-card>
                                      <v-card flat>
                                        <v-card-text
                                          v-text="
                                            room.payment_terms
                                              .cancellation_description
                                          "
                                        ></v-card-text>
                                      </v-card>
                                    </v-tab-item>

                                    <v-tab-item :value="'tab-4'">
                                      <v-carousel class="gallery-slider-box">
                                        <v-carousel-item
                                          v-for="(photo, i) in room.photos"
                                          :key="i"
                                          :src="photo"
                                          reverse-transition="fade-transition"
                                          transition="fade-transition"
                                        >
                                          <expandable-image
                                            class="image"
                                            :src="photo"
                                          />
                                        </v-carousel-item>
                                      </v-carousel>
                                    </v-tab-item>
                                  </v-tabs-items>
                                </div>
                              </div>
                            </div>
                          </v-expansion-panel-content>
                        </div>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </div>
                  <p v-if="rooms.length==0">
                    <i class='fas fa-info' style="color: blue;"></i>
                   Sorry, We couldn’t find any results matching your criteria, but changing your search may help. (Session id: {{VillaStore.sessionId}})
                 </p>
                </div>
                <TripSummary />
              </v-row>
            </div>
          </div>
        </template>

        <p v-else>
          <i class="fas fa-info" style="color: blue"></i>
          Sorry, We couldn't find any results matching your criteria, but
          changing your search may help. (Session id:
          {{ availabilitySessionId }})
        </p>
      </div>
    </v-container>
  </span>
</template>
<script>
import { evBus } from '@/services/bus.js';
import villaServices from '@/services/api/Villa';
import { mapState } from 'vuex';
import moment from 'moment';
import Header from '@/components/front/villas/Header';
import ExpandableImage from './ExpandableImage';
import checkAvailibity from '@/components/front/villas/checkAvailibity';
import StarRating from 'vue-star-rating';
import cartHelper from '@/helper/addCartHelper';
import TripSummary from '@/components/common/widgets/TripSummary.vue';
export default {
  name: 'ChooseRoom',
  mixins: [cartHelper],
  components: {
    Header,
    ExpandableImage,
    checkAvailibity,
    StarRating,
    TripSummary,
  },
  data() {
    return {
      showacordian: 0,
      tabs: 'mobile-tabs-5-1',
      desctabs: 'tab-1',
      description: '',
      test_price: 200,
      rooms_left: [],
      spickupvalue: '',
      date1: null,
      menu1: false,
      date2: null,
      menu2: false,
      rooms: [],
      items: [],
      Guests: '2 Adults - 2 Children',
      villaDetail: '',
      blockData: [],
      villaData: [],
      amenities: '',
      cancelation_terms: '',
      geoLat: '',
      geoLong: '',
      sradius: 3,
      calcPrice: 1,
      selRoomCount: 1,
      selectedRooms: [],
      dateFormatPlaceHolder: this.$store.state.envStore.countryDF,
      current: 0,
      direction: 1,
      transitionName: 'fade',
      villaReviews: [],
      show: false,
      slides: [],
      room_slides: '',
      center: {},
      sizes: [53, 56, 66, 78, 90],
      markers: [],
      totalAdults: 0,
      totalChilds: 0,
      allChilds: [],
      hasReviews: true,
      noReviewMessage: '',

      infoWindow: {
        position: {
          lat: 0,
          lng: 0,
        },
        open: false,
        template: '',
      },

      page: 1,
      perPage: 5,
    };
  },
  mounted() {
    let reqHeaders = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.date1 = this.searchData.checkinDate;
    this.date2 = this.searchData.checkoutDate;
    let persons = this.searchData.rooms;

    for (let i = 0; i < persons.length; i++) {
      this.totalAdults += Number(persons[i].adults);
      this.totalChilds += persons[i].childs.length;
      this.allChilds = this.allChilds.concat(persons[i].childs);
    }
    let reqPayLoad = {
      sessionId: this.VillaStore.sessionId,
      villaId: this.$route.params.id,
    };

    villaServices
      .getVillaDetails((reqHeaders, reqPayLoad))
      .then((response) => {
        let cRespond = response.data;

        this.villaDetail = cRespond.data.villaDetails;

        this.villaData = cRespond.data.villaDetails.villaData;

        this.shortenStrLen(this.villaData.villaDescription);

        this.blockData = cRespond.data.villaDetails.blockData;

        this.rooms = this.makeRoomTabAbles(this.blockData.rooms);
        console.log('rooms ', this.rooms);

        this.totalRooms(this.rooms);

        this.popupData(this.villaData);

        this.totalGuest();

        this.room_slides = this.rooms[0].photos;

        this.slides = [];

        if (typeof this.villaData.villaPhotos != 'undefined')
          this.villaData.villaPhotos.map((item) => ({
            img: item.url_original,
          }));
      })
      .catch((err) => {
        if (err.response)
          this.$awn.alert(
            'Sorry rooms data not found, please initiate new request. your session might be expired.'
          );

        let that = this;

        that.$sentry.withScope(function (scope) {
          scope.setExtra('sessionId', that.VillaStore.sessionId);
          that.$sentry.captureException(new Error(err));
        });
      });

    //villa Reviews
  },
  created: function () {
    evBus.$on('checkOutVilla', (reqDetails) => {
      this.openCheckOutPopUp('villa', this.doCleanArray(reqDetails));
    });
    evBus.$on('rooms', (roomsCheck) => {
      let rooms = [];
      Object.keys(roomsCheck).forEach(function (key) {
        if (key != 'maxOccupancy' && key != 'nbrOfBedroomsLeft') {
          rooms.push(roomsCheck[key]);
        }
      });
      this.rooms = rooms;
    });
  },
  methods: {
    showMore() {
      this.description = this.villaData.villaDescription;
    },

    hideMore() {
      this.description =
        this.villaData.villaDescription.substr(0, 500) + '....';
    },

    shortenStrLen(string) {
      if (string.length > 500) {
        this.description = string.substr(0, 500) + '....';
      } else {
        this.description = this.villaData.villaDescription;
      }
    },

    makeRoomTabAbles: function (arrOfObj) {
      let referalId = 11;

      for (let [key, value] of Object.entries(arrOfObj)) {
        if (key != 'maxOccupancy' && key != 'nbrOfBedroomsLeft') {
          value.referalId = value.block_id + '_dp_' + referalId;
          value.expanded = false;
          referalId++;
        }
      }

      return arrOfObj;
    },
    DetailsShow(val, roomSelected) {
      this.showacordian = val;

      for (let [key, value] of Object.entries(this.rooms)) {
        if (key != 'maxOccupancy' && key != 'nbrOfBedroomsLeft') {
          if (roomSelected.referalId == value.referalId) {
            value.expanded = !value.expanded;
          } else {
            value.expanded = false;
          }
        }
      }

      this.$forceUpdate();
    },
    addVillaToCart() {
      let _valid = this.checkOccupancy();
      if(!_valid) return false;
      let _villaId = this.$route.params.id;
      
      
      let _villaPayloads = {
        rooms: this.selectedRooms,
        payNow: Number(this.blockData.can_pay_now),
      };

      this.openAddCartPopUpForCar(_villaId, _villaPayloads, 'villa');
    },
    checkOccupancy(){
      let adults = 0;
      let childs = 0;
      let free = [];
      for (let i=0; i < this.selectedRooms.length;i++) {
        adults+= Number(this.selectedRooms[i].block_quantities) * Number(this.selectedRooms[i].max_adults);
        childs+= Number(this.selectedRooms[i].block_quantities) * Number(this.selectedRooms[i].max_children);
        free.push(Number(this.selectedRooms[i].max_children_free_age));
      }
      let max = Math.max.apply(Math, free);;
      let valid = this.allChilds.filter((a) => {
        if( a <= max) return true;
      });

      if ( adults >= this.totalAdults ){
        if ( this.allChilds.length == 0 )
          return true;
        if ( valid.length == this.allChilds.length )
          return true;
        if ( adults >= (this.allChilds.length + this.totalAdults ) )
          return true;
        if ( ( valid.length + (adults - this.totalAdults) ) >= this.allChilds.length )
          return true;
      }
        this.$awn.info(
          'Please check guests occupancy before you proceed..!'
        );
        return false;
    },
    openCheckOutPopUp: async function (engine, infos) {
      let that = this;
      this.callVillasBySession(2000).then((rspVillas) => {
        let _allVillas = that.doCleanArray(rspVillas),
          _filterVilla = this.$store.state.villaStore.searchData,
          _checkedVilla = _allVillas.find((o) => {
            if (o.villaId == infos.villaId) return true;
          });

        infos.villa = _checkedVilla;
        infos.pdate = _filterVilla.checkinDate;
        infos.plocationName = _filterVilla.locationData;
        infos.ptime = moment(_filterVilla.checkinDate, 'X').format('HH:mm:ss');
        infos.ddate = _filterVilla.checkoutDate;
        infos.dlocationName = _filterVilla.locationData;
        infos.dtime = moment(_filterVilla.checkoutDate, 'X').format('HH:mm:ss');
        infos.engineId = infos.villaId;
        infos.Id = infos.villaId;
        infos.remaining = [39, 59];
        infos.expire = false;
        infos.showTimes = true;
        infos.payNow = Number(that.blockData.can_pay_now);
        infos.block_id = infos.rooms[0].block_id;
        let cader = {
          engine: engine,
          item: infos,
        };
        
        this.$store.dispatch('setCartUpComings', { UPCOMINGS: cader });

        evBus.$emit('openCheckOutPopUp', engine, infos);

        that.doClosePop();
      }); // Ends call of villa
    },
    getRoomPrices(room){
      let n = Number(room.number_of_rooms_left);
      let price = this.getRoomPriceByDomain(room.incremental_price);
      let prices = [ { item : 0, value : 0} ];
      for(let i = 0; i < n; i++){
        prices.push({ item : (i + 1) + `  (${this.CSymbol + ' ' + Number.parseFloat(price * (i+1)).toFixed(2) })`,value : i+1});
      }
      return prices;
    },
    selectRoom(obj, room, index) {
      let transes = obj.value;
      const price = room.incremental_price.net_price;
      let totalPrice = Number.parseFloat(price * transes).toFixed(2);

      room.block_quantities = transes;
      room.incrementalPrice = price;
      room.totalIncrementalPrice = totalPrice;

      if (this.selectedRooms)
        for (var i = 0; i < this.selectedRooms.length; i++)
          if (this.selectedRooms[i].block_id == room.block_id)
            this.selectedRooms.splice(i, 1);

      if (transes == 0) return;

      this.selectedRooms.push(room);
    },

    showMapTab() {
      this.$refs.map.$el.click();
    },

    popupData(villaData) {
      this.center.lat = parseFloat(villaData.lat);
      this.center.lng = parseFloat(villaData.lon);
      this.markers.push({
        position: {
          lat: parseFloat(villaData.lat),
          lng: parseFloat(villaData.lon),
        },
      });
    },

    openInfoWindowTemplate() {
      const { lat, lon, displayName, address } = this.villaData;
      this.infoWindow.position = {
        lat: parseFloat(lat),
        lng: parseFloat(lon),
      };
      this.infoWindow.template = `<b>${displayName}</b> &nbsp; ${address} &nbsp;<br>`;
      this.infoWindow.open = true;
    },

    totalSleeps() {
      let date2 = moment(this.date2);
      let date1 = moment(this.date1);
      let sleeps = date2.diff(date1, 'days');
      return sleeps;
    },
    stars(number) {
      if (number) {
        return Number(number);
      } else return 0;
    },
    startSlide: function () {
      this.timer = setInterval(this.next, 10000);
    },
    next: function () {
      this.currentIndex += 1;
    },
    prev: function () {
      this.currentIndex -= 1;
    },

    slide(dir) {
      this.direction = dir;
      dir == 1
        ? (this.transitionName = 'slide-next')
        : (this.transitionName = 'slide-prev');

      var len = this.slides.length;
      this.current = (this.current + (dir % len) + len) % len;
    },

    roomslide(dir) {
      this.direction = dir;
      dir == 1
        ? (this.transitionName = 'slide-next')
        : (this.transitionName = 'slide-prev');
      var len = this.room_slides.length;
      this.current = (this.current + (dir % len) + len) % len;
    },
    totalGuest() {
      let totalAudlt = 0;
      let totalChild = 0;

      if (this.selectedPeopleSets)
        for (let i = 0; i < this.selectedPeopleSets.length; i++) {
          totalAudlt += parseInt(this.selectedPeopleSets[i].adults);
          totalChild += parseInt(this.selectedPeopleSets[i].childs.length);
        }

      this.Guests = totalAudlt + ' Adults - ' + totalChild + ' Children';
    },

    totalRooms(rooms) {
      for (const p in rooms) {
        if (p == 0) {
          this.rooms_left.push(1);
        } else if (
          p !== '1' &&
          p !== 'maxOccupancy' &&
          p !== 'nbrOfBedroomsLeft'
        ) {
          this.rooms_left.push(p);
        }
      }

      this.rooms_left.unshift(0);
    },
    formattedDate: function (date, format) {
      if (!date) return null;
      return moment(date).format(format);
    },

    getVillaReviews() {
      // villa reviews
      var that = this;
      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let reqPayLoad = {
        sessionId: this.VillaStore.sessionId,
        villaId: this.villaData.villaId,
      };

      villaServices
        .getVillaReviews(reqPayLoad, reqHeaders)
        .then((response) => {
          if (
            response.data.success == false &&
            response.data.message ==
              'Sorry, No results matched your search, please try again'
          ) {
            this.hasReviews = false;
            this.noReviewMessage = 'No Reviews Found';
          }
          let cRespond = response.data;
          this.villaReviews = cRespond.data;
        })
        .catch((err) => {
          that.$sentry.withScope(function (scope) {
            scope.setExtra('sessionId', that.VillaStore.sessionId);
            that.$sentry.captureException(new Error(err));
          });
        });
    },
  },
  computed: {
    ...mapState({
      globalData: (state) => state.envStore,
      VillaStore: (state) => state.villaStore,
      searchData: (state) => state.villaStore.searchData,
      imgURL: (state) => state.villaStore.URL,
      totalNights: (state) => state.villaStore.totalNights,
      CType: (state) => state.envStore.CType,
      CSymbol: (state) => state.envStore.CSymbol,
      DFormat: (state) => state.envStore.DFormat,
      countryDF: (state) => state.envStore.countryDF,
      domain: (state) => state.envStore.domain,
      urlDomain: (state) => state.envStore.urlDomain,
      availabilitySessionId: (state) => state.villaStore.sessionId,
    }),
    totalAmount(){
      return this.getPriceOfVillaRooms(this.selectedRooms);
    },
    sleeps() {
      return this.totalSleeps();
    },

    currentImg: function () {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    },
    compPickDateFormatted() {
      return this.formattedDate(this.date1, this.dateFormatPlaceHolder);
    },
    compDropDateFormatted() {
      return this.formattedDate(this.date2, this.dateFormatPlaceHolder);
    },
    disabledCartBtn() {
      if (!this.selectedRooms) return false;

      if (this.selectedRooms.length) return false;

      return true;
    },
  },
  filters: {
    capitalize(str) {
      return str
        .split('_')
        .map(function (item) {
          return item.charAt(0).toUpperCase() + item.substring(1);
        })
        .join(' ');
    },
    formatDate: function (value) {
      return moment(value).format('MM/DD/YYYY');
    },
    showCountry(value) {
      switch (value) {
        case 'gb':
          return 'United Kingdom';
        case 'us':
          return 'United States';
        case 'mx':
          return 'Maxico';
        default:
          return 'United Kingdom';
      }
    },

    toFixed(value) {
      return Number.parseFloat(value).toFixed(2);
    },
  },
};
</script>
<style scoped></style>
