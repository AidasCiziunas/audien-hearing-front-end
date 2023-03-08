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
              <!-- <div class="popup-subtitle">
                <p>Daily + taxes & fees <br /><small>Average price is €98</small></p>
              </div> -->
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
            <!-- Distance Slider -->
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

            <!-- End Distance Slider -->

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
                    <div class="in-left" style="display: flex; float: left">
                      <v-checkbox
                        v-if="
                          starRating_name == 6 &&
                          Math.abs(starRating_name - 5) == 1
                        "
                        :value="
                          starRating_name == 6 &&
                          Math.abs(starRating_name - 5) == 1
                            ? 'Any'
                            : Math.abs(starRating_name - 5)
                        "
                        v-model="selstarRating"
                        @change="ckMBstarRating($event)"
                        color="primary"
                      ></v-checkbox>
                      <v-checkbox
                        v-else
                        :value="Math.abs(starRating_name - 5)"
                        v-model="selstarRating"
                        @change="ckMBstarRating($event)"
                        color="primary"
                      ></v-checkbox>
                      <span
                        v-if="
                          starRating_name != 6 &&
                          Math.abs(starRating_name - 5) == 0
                        "
                        class="star-showing-left"
                        ><i class="fas fa-star gray" style="color: #d8d8d8"></i
                      ></span>
                      <span
                        v-if="
                          starRating_name != 6 &&
                          Math.abs(starRating_name - 5) == 1
                        "
                        class="star-showing-left"
                        ><i class="fas fa-star"></i
                      ></span>
                      <span
                        v-if="
                          starRating_name != 6 &&
                          Math.abs(starRating_name - 5) == 2
                        "
                        class="star-showing-left"
                        ><i class="fas fa-star"></i><i class="fas fa-star"></i
                      ></span>
                      <span
                        v-if="
                          starRating_name != 6 &&
                          Math.abs(starRating_name - 5) == 3
                        "
                        class="star-showing-left"
                        ><i class="fas fa-star"></i><i class="fas fa-star"></i
                        ><i class="fas fa-star"></i
                      ></span>
                      <span
                        v-if="
                          starRating_name != 6 &&
                          Math.abs(starRating_name - 5) == 4
                        "
                        class="star-showing-left"
                        ><i class="fas fa-star"></i><i class="fas fa-star"></i
                        ><i class="fas fa-star"></i><i class="fas fa-star"></i
                      ></span>
                      <span
                        v-if="
                          starRating_name != 6 &&
                          Math.abs(starRating_name - 5) == 5
                        "
                        class="star-showing-left"
                        ><i class="fas fa-star"></i><i class="fas fa-star"></i
                        ><i class="fas fa-star"></i><i class="fas fa-star"></i
                        ><i class="fas fa-star"></i
                      ></span>
                      <span
                        v-if="
                          starRating_name == 6 &&
                          Math.abs(starRating_name - 5) == 1
                        "
                        class="star-showing-left"
                        >Any</span
                      >
                    </div>

                    <div class="in-right">
                      <span v-if="starRating_name + 1 < starRating.length"
                        >{{
                          starRating[starRating_name + 1]
                            ? '(' + starRating[starRating_name + 1] + ')'
                            : '(0)'
                        }}
                      </span>
                    </div>
                    <!--  <div class="in-left">
                                            <p>
                                                <span
                                                    v-if="
                                                        Math.abs(
                                                            starRating_name - 5
                                                        ) == 0
                                                    "
                                                    class="star-showing-left"
                                                    >Any</span
                                                >
                                                <span
                                                    v-if="
                                                        Math.abs(
                                                            starRating_name - 5
                                                        ) == 1
                                                    "
                                                    class="star-showing-left"
                                                    ><i class="fas fa-star"></i
                                                ></span>
                                                <span
                                                    v-if="
                                                        Math.abs(
                                                            starRating_name - 5
                                                        ) == 2
                                                    "
                                                    class="star-showing-left"
                                                    ><i class="fas fa-star"></i
                                                    ><i class="fas fa-star"></i
                                                ></span>
                                                <span
                                                    v-if="
                                                        Math.abs(
                                                            starRating_name - 5
                                                        ) == 3
                                                    "
                                                    class="star-showing-left"
                                                    ><i class="fas fa-star"></i
                                                    ><i class="fas fa-star"></i
                                                    ><i class="fas fa-star"></i
                                                ></span>
                                                <span
                                                    v-if="
                                                        Math.abs(
                                                            starRating_name - 5
                                                        ) == 4
                                                    "
                                                    class="star-showing-left"
                                                    ><i class="fas fa-star"></i
                                                    ><i class="fas fa-star"></i
                                                    ><i class="fas fa-star"></i
                                                    ><i class="fas fa-star"></i
                                                ></span>
                                                <span
                                                    v-if="
                                                        Math.abs(
                                                            starRating_name - 5
                                                        ) == 5
                                                    "
                                                    class="star-showing-left"
                                                    ><i class="fas fa-star"></i
                                                    ><i class="fas fa-star"></i
                                                    ><i class="fas fa-star"></i
                                                    ><i class="fas fa-star"></i
                                                    ><i class="fas fa-star"></i
                                                ></span>
                                                <template
                                                    v-if="
                                                        Math.abs(
                                                            starRating_name - 5
                                                        ) != 0
                                                    "
                                                    >{{
                                                        starRating[
                                                            starRating_name + 1
                                                        ]
                                                            ? '(' +
                                                              starRating[
                                                                  starRating_name +
                                                                      1
                                                              ] +
                                                              ')'
                                                            : ''
                                                    }}</template
                                                >
                                            </p>
                                        </div> -->
                    <!--  <div class="in-right">
                                            <v-checkbox
                                                :value="
                                                    Math.abs(
                                                        starRating_name - 5
                                                    ) == 0
                                                        ? 'Any'
                                                        : Math.abs(
                                                              starRating_name -
                                                                  5
                                                          )
                                                "
                                                color="primary"
                                                v-model="mbselstarRating"
                                                @change="ckMBstarRating($event)"
                                            ></v-checkbox>
                                        </div> -->
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
                <h5>Villas Facilities</h5>
                <a href="javascript: void(0);" @click="mbClearFacilities()"
                  >Clear</a
                >
              </div>
              <ul class="filter-item-list">
                <li v-for="(amenity, index) in villaAmenities" :key="index">
                  <template v-if="index < mbShowPropertyTypeIndex">
                    <div class="in-right">
                      <v-checkbox
                        :label="amenity.text"
                        :value="amenity.slug"
                        v-model="mbSelFacilities"
                        @change="ckMBHotelFacilities($event)"
                        color="primary"
                      ></v-checkbox>
                    </div>
                  </template>
                </li>
                <li>
                  <div class="in-right">
                    <v-checkbox
                      label="Any"
                      value="Any"
                      v-model="mbSelFacilities"
                      @change="ckMBHotelFacilities($event)"
                      color="primary"
                    ></v-checkbox>
                  </div>
                </li>

                <li
                  v-if="mbShowPropertyTypeIndex < getObjectSize(villaAmenities)"
                >
                  <div class="in-left">
                    <p
                      @click="
                        mbShowPropertyTypeIndex = mbShowPropertyTypeIndex + 5
                      "
                      class="show_more"
                    >
                      Show More (
                      {{
                        parseInt(getObjectSize(villaAmenities)) -
                        parseInt(mbShowPropertyTypeIndex)
                      }}
                      )
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Propert Types Filter -->
            <div class="filter-list">
              <div class="filter-title">
                <h5>Property Types</h5>
                <a href="javascript: void(0);" @click="mbClearPropertyTypes()"
                  >Clear</a
                >
              </div>
              <ul class="filter-item-list">
                <li v-for="(propertyType, index) in propertyTypes" :key="index">
                  <template v-if="index < mbShowPropertyTypeIndex">
                    <div class="in-right">
                      <v-checkbox
                        :label="propertyType.label"
                        :value="propertyType.value"
                        v-model="mblSelPropertyTypes"
                        @change="ckMBPropertyTypes($event)"
                        color="primary"
                      ></v-checkbox>
                    </div>
                  </template>
                </li>
                <li>
                  <div class="in-right">
                    <v-checkbox
                      label="Any"
                      value="Any"
                      v-model="mblSelPropertyTypes"
                      @change="ckMBPropertyTypes($event)"
                      color="primary"
                    ></v-checkbox>
                  </div>
                </li>

                <li
                  v-if="mbShowPropertyTypeIndex < getObjectSize(propertyTypes)"
                >
                  <div class="in-left">
                    <p
                      @click="
                        mbShowPropertyTypeIndex = mbShowPropertyTypeIndex + 1
                      "
                      class="show_more"
                    >
                      Show More (
                      {{
                        parseInt(getObjectSize(propertyTypes)) -
                        parseInt(mbShowPropertyTypeIndex)
                      }}
                      )
                    </p>
                  </div>
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
import VillaHelper from '@/helper/VillaHelper.js';
import SortFilter from '@/components/front/villas/villaSortFilter.vue';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

export default {
  name: 'VillaMobileFilter',
  mixins: [VillaHelper],
  props: [
    'value',
    'totalResults',
    'sortByOption',
    'freshlyMount',
    'resetFormValues',
    'calculateMobileResults',
  ],
  components: {
    SortFilter,
    VueSlider,
  },
  data() {
    return {
      mbShowHotelTypeIndex: 5,
      mbShowTransIndex: 2,
      mbShowdistanceIndex: 2,
      mbShowPropertyTypeIndex: 5,
    };
  },
  mounted() {
    if (this.$route.query.searchId) {
      this.populateMobileFilters();
    }

    this.populateMobileFilters();
    this.populateAdvanceFilters();
  },
  methods: {
    /*       resetFilter() {
      this.selRoom = [];
      this.mbSelFacilities = ["Any"];
      this.mbselstarRating = ["Any"];
      this.mbSliderValue = [];
      this.sortBy = "totalPrice-asc-false";
      this.mbldistanceSlider = [];
      this.mblSelPropertyTypes = ["Any"];
      this.villavalue = "";
      this.populateMobileFilters();
      this.updateFilters();
    },
     */
    updateFilters() {
      let data = {
        mbSliderValue: this.mbSliderValue,
        mbSeldistance: this.mbSeldistance,
        mbselstarRating: this.mbselstarRating,
        mbSelFacilities: this.mbSelFacilities,
        mbldistanceSlider: this.mbldistanceSlider,
        mblSelPropertyTypes: this.mblSelPropertyTypes,
        searchByName: this.searchByName,
        sortBy: this.sortBy,
        selVillaName: this.selVillaName,
      };
      this.$emit('onMobileFilterData', data);
    },

    sortByOptionFunc() {
      this.updateFilters();
      this.sortByOption();
    },

    mbClearFacilities() {
      this.mbSelFacilities = ['Any'];
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
      if (lastBox == 'Any') {
        this.mbSelFacilities = ['Any'];
      } else {
        this.mbSelFacilities = transes.filter(function (value) {
          return value != 'Any';
        });
      }
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },
    // Mobile Property Types

    ckMBPropertyTypes(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any') {
        this.mblSelPropertyTypes = ['Any'];
      } else {
        this.mblSelPropertyTypes = transes.filter(function (value) {
          return value != 'Any';
        });
      }
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },

    mbClearPropertyTypes() {
      this.mblSelPropertyTypes = ['Any'];
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
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
      if (this.data.filters) {
        let advFilterData = this.doCleanArray(this.data.filters);
        //clear car type
        this.mbSelFacilities = ['Any'];

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
      if (this.Villafilters.filters) {
        let advFilterData = this.doCleanArray(this.Villafilters.filters);
        //clear car type
        this.mbSelFacilities = ['Any'];

        //clear transition
        this.mbselstarRating = ['Any'];
        this.mblSelPropertyTypes = ['Any'];
        //clear RentalCompany
        this.selRoom = [7];

        // SET-UP SLIDERS
        this.mbSliderMinVal = Math.floor(advFilterData.priceRange.minPrice);
        this.mbSliderMaxVal = Math.ceil(advFilterData.priceRange.maxPrice);
        this.mbSliderValue = [this.mbSliderMinVal, this.mbSliderMaxVal];
        this.mbSliderMinVal = Math.floor(advFilterData.priceRange.minPrice);
        this.mbSliderMaxVal = Math.ceil(advFilterData.priceRange.maxPrice);
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
        //this.calculateMobileResults();
      }
    },

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
  },

  watch: {
    resetFormValues(val) {
      if (val) {
        this.resetFilter();
      }
    },
  },
};
</script>
<style>
.align-icon {
  position: relative;
  top: 6px;
  right: 4px;
}
</style>
