<template>
  <div>
    <section class="advance-filter-btn">
      <v-container>
        <div class="advance-sort-btn-box">
          <center>
            <v-btn-toggle mandatory>
              <v-btn
                tile
                depressed
                class="filter-btn-color"
                @click="updateValue('sortFilter', true)"
              >
                <img src="@/assets/images/1.png" alt="img" />
                <a @click="updateValue('sortFilter', true)"> Sort </a>
              </v-btn>
              <v-btn
                tile
                class="filter-btn-color"
                @click="updateValue('mobileFilterDialog', true)"
              >
                <img src="@/assets/images/2.png" alt="img" />
                <a @click="updateValue('mobileFilterDialog', false)">
                  Filter
                </a>
              </v-btn>
            </v-btn-toggle>
          </center>
        </div>
      </v-container>
    </section>
    <v-dialog
      :value="value.mobileFilterDialog"
      fullscreen
      transition="dialog-bottom-transition"
      style="z-index: 10000"
    >
      <v-card class="filter-main-popup">
        <v-toolbar light>
          <v-btn icon @click="updateValue('mobileFilterDialog', false)">
            <v-icon style="color: #fff !important">mdi-close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <h6 style="color: #fff !important">FILTERS</h6>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              text
              @click="clear()"
              class="filter-popup-clear-btn"
              style="color: #fff !important"
            >
              Clear All
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <div class="filter-popup-body">
          <div class="filter-popup-body-inner">
            <div class="filter-list">
              <div class="filter-title">
                <h5>Price Range</h5>
                <a href="javascript: void(0);" @click="mbClearPrice()">Clear</a>
              </div>

              <div class="filter-item-list" style="margin-top: 45px;!important">
                <v-card-text>
                  <v-range-slider
                    ticks
                    step="10"
                    v-model="mbSliderValue"
                    :min="mbSliderMinVal"
                    :max="mbSliderMaxVal"
                    thumb-label="always"
                    @change="inputMobileSliderValues"
                  ></v-range-slider>
                </v-card-text>
              </div>
            </div>
            <div class="filter-title">
              <h5 style="margin-left: 20px">Distance</h5>
              <a
                href="javascript: void(0);"
                style="margin-right: 20px"
                @click="mbClearDistance()"
                >Clear</a
              >
            </div>
            <div class="timeSlider">
              <vue-slider
                :dot-size="24"
                :dotStyle="dotStyle"
                :railStyle="railStyle"
                :processStyle="processStyle"
                :tooltipStyle="tooltipStyle"
                v-model="mbldistanceSlider"
                :min="mbldistanceMinVal"
                :max="mbldistanceMaxVal"
                :interval="0.01"
                :enable-cross="false"
                :lazy="true"
                tooltip="always"
                :tooltip-formatter="(val) => val.toFixed(2).toString()"
                @change="inputDistanceSliderValues"
              />
            </div>

            <div class="filter-list">
              <div class="filter-title">
                <h5>Star Rating</h5>
                <a href="javascript: void(0);" @click="mbClearStarRating()"
                  >Clear</a
                >
              </div>
              <ul class="filter-item-list">
                <li
                  v-for="(star_name, starRating_name) in starRating"
                  :key="starRating_name"
                >
                  <template v-if="starRating_name < mbShowTransIndex">
                    <div class="in-left">
                      <p>
                        <span
                          v-if="Math.abs(starRating_name - 5) == 0"
                          class="star-showing-left"
                          >Any</span
                        >
                        <span
                          v-if="Math.abs(starRating_name - 5) == 1"
                          class="star-showing-left"
                          ><i class="fas fa-star"></i
                        ></span>
                        <span
                          v-if="Math.abs(starRating_name - 5) == 2"
                          class="star-showing-left"
                          ><i class="fas fa-star"></i><i class="fas fa-star"></i
                        ></span>
                        <span
                          v-if="Math.abs(starRating_name - 5) == 3"
                          class="star-showing-left"
                          ><i class="fas fa-star"></i><i class="fas fa-star"></i
                          ><i class="fas fa-star"></i
                        ></span>
                        <span
                          v-if="Math.abs(starRating_name - 5) == 4"
                          class="star-showing-left"
                          ><i class="fas fa-star"></i><i class="fas fa-star"></i
                          ><i class="fas fa-star"></i><i class="fas fa-star"></i
                        ></span>
                        <span
                          v-if="Math.abs(starRating_name - 5) == 5"
                          class="star-showing-left"
                          ><i class="fas fa-star"></i><i class="fas fa-star"></i
                          ><i class="fas fa-star"></i><i class="fas fa-star"></i
                          ><i class="fas fa-star"></i
                        ></span>
                        <template v-if="Math.abs(starRating_name - 5) != 0">{{
                          starRating[starRating_name + 1]
                            ? '(' + starRating[starRating_name + 1] + ')'
                            : ''
                        }}</template>
                      </p>
                    </div>
                    <div class="in-right">
                      <v-checkbox
                        :value="
                          Math.abs(starRating_name - 5) == 0
                            ? 'Any'
                            : Math.abs(starRating_name - 5)
                        "
                        color="primary"
                        v-model="mbselstarRating"
                        @change="ckMBstarRating($event)"
                      ></v-checkbox>
                    </div>
                  </template>
                </li>

                <li v-if="mbShowTransIndex < getObjectSize(starRating)">
                  <div class="in-left">
                    <p
                      @click="mbShowTransIndex = mbShowTransIndex + 1"
                      class="show_more"
                    >
                      Show More (
                      {{
                        parseInt(getObjectSize(starRating)) -
                        parseInt(mbShowTransIndex)
                      }}
                      )
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="filter-list">
              <div class="filter-title">
                <h5>Hotel Facilities</h5>
                <a href="javascript: void(0);" @click="mbClearFacilities()"
                  >Clear</a
                >
              </div>
              <ul class="filter-item-list">
                <li
                  v-for="(hotel_value, hotel_name, index) in hotelFacilities"
                  :key="hotel_name"
                >
                  <template v-if="index < mbShowHotelTypeIndex">
                    {{ hotel_name }}

                    <!--
                                        <div class="in-left">
                                            <p
                                                class="star-showing-left"
                                                v-if="
                                                    hotel_name == 'hasAirShtle'
                                                "
                                            >
                                                <i
                                                    class="material-icons align-icon"
                                                    >airport_shuttle</i
                                                >
                                                <template
                                                    v-if="hotel_name != 'Any'"
                                                >
                                                    Air Shuttle ({{
                                                        hotel_value
                                                    }})</template
                                                >
                                            </p>

                                            <p v-if="hotel_name == 'hasBar'">
                                                <i
                                                    class="material-icons align-icon"
                                                    >local_bar</i
                                                >
                                                <template
                                                    v-if="hotel_name != 'Any'"
                                                    >Bar ({{
                                                        hotel_value
                                                    }})</template
                                                >
                                            </p>

                                            <p v-if="hotel_name == 'hasBkfst'">
                                                <i
                                                    class="material-icons align-icon"
                                                    >local_dining</i
                                                >
                                                <template
                                                    v-if="hotel_name != 'Any'"
                                                    >Breakfast ({{
                                                        hotel_value
                                                    }})</template
                                                >
                                            </p>

                                            <p v-if="hotel_name == 'hasCoffee'">
                                                <i
                                                    class="material-icons align-icon"
                                                    >local_cafe</i
                                                >
                                                <template
                                                    v-if="hotel_name != 'Any'"
                                                    >Coffee ({{
                                                        hotel_value
                                                    }})</template
                                                >
                                            </p>

                                            <p
                                                v-if="
                                                    hotel_name == 'hasFitness'
                                                "
                                            >
                                                <i
                                                    class="material-icons align-icon"
                                                    >fitness_center</i
                                                >
                                                <template
                                                    v-if="hotel_name != 'Any'"
                                                    >Fitness ({{
                                                        hotel_value
                                                    }})</template
                                                >
                                            </p>

                                            <p
                                                v-if="
                                                    hotel_name == 'hasFreePking'
                                                "
                                            >
                                                <i
                                                    class="material-icons align-icon"
                                                    >directions_car</i
                                                >
                                                <template
                                                    v-if="hotel_name != 'Any'"
                                                    >Free Parking ({{
                                                        hotel_value
                                                    }})</template
                                                >
                                            </p>

                                            <p
                                                v-if="
                                                    hotel_name == 'hasLaundry'
                                                "
                                            >
                                                <i
                                                    class="material-icons align-icon"
                                                    >local_laundry_service</i
                                                >
                                                <template
                                                    v-if="hotel_name != 'Any'"
                                                    >Laundry ({{
                                                        hotel_value
                                                    }})</template
                                                >
                                            </p>

                                            <p v-if="hotel_name == 'hasPets'">
                                                <i
                                                    class="material-icons align-icon"
                                                    >pets</i
                                                >
                                                <template
                                                    v-if="hotel_name != 'Any'"
                                                    >Pets ({{
                                                        hotel_value
                                                    }})</template
                                                >
                                            </p>

                                            <p v-if="hotel_name == 'hasPool'">
                                                <i
                                                    class="material-icons align-icon"
                                                    >pool</i
                                                >
                                                <template
                                                    v-if="hotel_name != 'Any'"
                                                    >Pool ({{
                                                        hotel_value
                                                    }})</template
                                                >
                                            </p>
                                            <p
                                                v-if="
                                                    hotel_name ==
                                                        'hasRestaurant'
                                                "
                                            >
                                                <i
                                                    class="material-icons align-icon"
                                                    >restaurant</i
                                                >
                                                <template
                                                    v-if="hotel_name != 'Any'"
                                                    >Restaurant ({{
                                                        hotel_value
                                                    }})</template
                                                >
                                            </p>
                                            <p
                                                v-if="
                                                    hotel_name == 'hasRoomSvc'
                                                "
                                            >
                                                <i
                                                    class="material-icons align-icon"
                                                    >room_service</i
                                                >
                                                <template
                                                    v-if="hotel_name != 'Any'"
                                                    >Room Service ({{
                                                        hotel_value
                                                    }})</template
                                                >
                                            </p>
                                            <p v-if="hotel_name == 'hasWiFi'">
                                                <i
                                                    class="material-icons align-icon"
                                                    >wifi</i
                                                >
                                                <template
                                                    v-if="hotel_name != 'Any'"
                                                    >Wifi ({{
                                                        hotel_value
                                                    }})</template
                                                >
                                            </p>
                                            <p v-if="hotel_name == 'Any'">
                                                <template
                                                    v-if="hotel_name == 'Any'"
                                                    >Any</template
                                                >
                                            </p>
                                        </div>
                                        -->
                    <div class="in-right">
                      <v-checkbox
                        :value="hotel_value.id"
                        v-model="mbSelFacilities"
                        @change="ckMBHotelFacilities($event)"
                        color="primary"
                      ></v-checkbox>
                    </div>
                  </template>
                </li>

                <li
                  v-if="mbShowHotelTypeIndex < getObjectSize(hotelFacilities)"
                >
                  <div class="in-left">
                    <p
                      @click="mbShowHotelTypeIndex = mbShowHotelTypeIndex + 1"
                      class="show_more"
                    >
                      Show More (
                      {{
                        parseInt(getObjectSize(hotelFacilities)) -
                        parseInt(mbShowHotelTypeIndex)
                      }}
                      )
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="filter-list">
              <div class="filter-title">
                <h5>Room Board</h5>
                <a href="javascript: void(0);" @click="mbClearRoom()">Clear</a>
              </div>
              <ul class="filter-item-list">
                <li
                  v-for="(hotel_value, hotel_name, index) in basisList"
                  :key="index"
                >
                  <template v-if="index < mbShowHotelTypeIndex">
                    <div class="in-left">
                      <p>
                        {{ hotel_name }}
                        <template v-if="hotel_name != 'Any'"
                          >({{ hotel_value }})</template
                        >
                      </p>
                    </div>
                    <div class="in-right">
                      <v-checkbox
                        :value="hotel_name"
                        v-model="selRoom"
                        @change="ckbasisList($event)"
                        color="primary"
                      ></v-checkbox>
                    </div>
                  </template>
                </li>
              </ul>
            </div>
          </div>
          <v-btn color="primary" class="filter-popup-fix-btn">
            <img src="@/assets/images/car-filter-btn-img.png" alt="img" />
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <SortFilter
      v-model="value.sortFilter"
      @onSortData="sortBy = $event"
      :options="sortOptions"
      :search="sortByOptionFunc"
    />
  </div>
</template>

<script>
import { evBus } from '@/services/bus.js';
import HotelHelper from '@/helper/HotelHelper.js';
import SortFilter from '@/components/front/hotels/hotelSortFilter.vue';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';
export default {
  name: 'HotelMobileFilter',
  mixins: [HotelHelper],
  props: [
    'value',
    'totalResults',
    'sortByOption',
    'freshlyMount',
    'calculateMobileResults',
  ],
  components: {
    SortFilter,
    VueSlider,
  },
  data() {
    return {
      mbShowHotelTypeIndex: 3,
      mbShowTransIndex: 2,
      mbShowdistanceIndex: 2,
    };
  },
  mounted() {
    this.populateMobileFilters();
    this.populateAdvanceFilters();
  },
  methods: {
    inputDistanceSliderValues() {
      this.updateFilters();
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.calculateMobileResults();
      }, 1000);
    },

    updateFilters() {
      let data = {
        mbSliderValue: this.mbSliderValue,
        mbSeldistance: this.mbSeldistance,
        mbselstarRating: this.mbselstarRating,
        mbSelFacilities: this.mbSelFacilities,
        mbldistanceSlider: this.mbldistanceSlider,
        searchByName: this.searchByName,
        basisList: this.selRoom,
        sortBy: this.sortBy,
        selHotelName: this.selHotelName,
      };
      this.$emit('onMobileFilterData', data);
    },

    sortByOptionFunc() {
      this.updateFilters();
      this.sortByOption();
    },

    mbClearFacilities() {
      this.mbSelFacilities = [0];
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },
    mbClearRoom() {
      this.selRoom = ['Any'];
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },

    ckMBHotelFacilities(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 0) {
        this.mbSelFacilities = [0];
      } else {
        this.mbSelFacilities = transes.filter(function (value) {
          return value != 0;
        });
      }

      if (this.mbSelFacilities.length == 0) this.mbSelFacilities = [0];

      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },
    ckbasisList(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any') {
        this.selRoom = ['Any'];
      } else {
        this.selRoom = transes.filter(function (value) {
          return value != 'Any';
        });
      }
      this.updateFilters();
      if (!this.freshlyMount) {
        //  this.calculateMobileResults();
      }
    },

    mbClearStarRating() {
      this.mbselstarRating = ['Any'];
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },

    ckMBstarRating(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any') {
        this.mbselstarRating = ['Any'];
      } else {
        this.mbselstarRating = transes.filter(function (value) {
          return value != 'Any';
        });
      }
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },

    mbClearDistance() {
      this.mbldistanceSlider = [this.mbldistanceMinVal, this.mbldistanceMaxVal];
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },

    ckMBdistance(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any') {
        this.mbSeldistance = ['Any'];
      } else {
        this.mbSeldistance = transes.filter(function (value) {
          return value != 'Any';
        });
      }
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },

    updateValue(key, value) {
      this.$emit('input', { ...this.value, [key]: value });
    },

    inputMobileSliderValues: function () {
      this.updateFilters();
      // make debounce timers
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.calculateMobileResults();
      }, 1000);
    },

    mbClearPrice() {
      if (this.Hotelfilters.filters) {
        let advFilterData = this.doCleanArray(this.Hotelfilters.filters);
        //clear car type
        this.mbSelFacilities = [0];

        //clear transition
        this.mbselstarRating = ['Any'];

        //clear RentalCompany
        this.mbSeldistance = ['Any'];

        // SET-UP SLIDERS
        this.mbSliderMinVal = Math.floor(advFilterData.priceRange.minPrice);
        this.mbSliderMaxVal = Math.ceil(advFilterData.priceRange.maxPrice);
        this.mbSliderValue = [this.mbSliderMinVal, this.mbSliderMaxVal];
      } else {
        this.mbSliderMinVal = 0;
        this.mbSliderMaxVal = 10;
        this.mbSliderValue = [0, 10];
      } // Ends IF FILTERS
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },
    clear() {
      if (this.Hotelfilters.filters) {
        let advFilterData = this.doCleanArray(this.Hotelfilters.filters);
        //clear car type
        this.mbSelFacilities = [0];

        //clear transition
        this.mbselstarRating = ['Any'];

        //clear RentalCompany
        this.mbSeldistance = ['Any'];
        this.selRoom = ['Any'];

        // SET-UP SLIDERS
        this.mbSliderMinVal = Math.floor(advFilterData.priceRange.minPrice);
        this.mbSliderMaxVal = Math.ceil(advFilterData.priceRange.maxPrice);
        this.mbSliderValue = [this.mbSliderMinVal, this.mbSliderMaxVal];
        this.mbldistanceMinVal = Math.ceil(advFilterData.distance.minDistance);
        this.mbldistanceMaxVal = Math.ceil(advFilterData.distance.maxDistance);
        this.mbldistanceSlider = [
          this.mbldistanceMinVal,
          this.mbldistanceMaxVal,
        ];
      } else {
        this.mbSliderMinVal = 0;
        this.mbSliderMaxVal = 10;
        this.mbSliderValue = [0, 10];
      } // Ends IF FILTERS
      // this.updateFilters();
      if (!this.freshlyMount) {
        // this.calculateMobileResults();
      }
    },
  },
};
</script>
<style>
.align-icon {
  position: relative;
  top: 2px;
  right: 5px;
  font-size: 16px;
}
</style>
