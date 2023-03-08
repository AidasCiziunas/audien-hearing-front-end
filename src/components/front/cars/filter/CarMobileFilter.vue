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
                @click.prevent="sortFilter = true"
              >
                <img src="@/assets/images/1.png" alt="img" />
                <a @click.prevent="updateValue('sortFilter', true)"> Sort </a>
              </v-btn>
              <v-btn
                tile
                class="filter-btn-color"
                @click.prevent="mobileFilterDialog = true"
              >
                <img src="@/assets/images/2.png" alt="img" />
                <a @click.prevent="updateValue('mobileFilterDialog', true)"
                  >Filter</a
                >
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
              @click="updateValue('mobileFilterDialog', false), resetFilter()"
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
                <h5>Car Type</h5>
                <a href="javascript: void(0);" @click="mbClearCarType()"
                  >Clear</a
                >
              </div>
              <ul class="filter-item-list">
                <li
                  v-for="(car_value, car_name, index) in carTypes"
                  :key="index"
                >
                  <template v-if="index < mbShowCarTypeIndex">
                    <div class="in-left">
                      <p>
                        {{ car_name }}
                        <template v-if="car_name != 'Any'"
                          >({{ car_value }})</template
                        >
                      </p>
                    </div>
                    <div class="in-right">
                      <v-checkbox
                        :value="car_name"
                        v-model="mbSelCarType"
                        @change="ckMBCarType($event)"
                        color="primary"
                      ></v-checkbox>
                    </div>
                  </template>
                </li>

                <li v-if="mbShowCarTypeIndex < getObjectSize(carTypes)">
                  <div class="in-left">
                    <p
                      @click="mbShowCarTypeIndex = mbShowCarTypeIndex + 1"
                      class="show_more"
                    >
                      Show More (
                      {{
                        parseInt(getObjectSize(carTypes)) -
                        parseInt(mbShowCarTypeIndex)
                      }}
                      )
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="filter-list">
              <div class="filter-title">
                <h5>Transmission</h5>
                <a href="javascript: void(0);" @click="mbClearTransmission()"
                  >Clear</a
                >
              </div>
              <ul class="filter-item-list">
                <li
                  v-for="(trans_value, trans_name, index) in transmissions"
                  :key="index"
                >
                  <template v-if="index < mbShowTransIndex">
                    <div class="in-left">
                      <p>
                        {{ trans_name }}
                        <template v-if="trans_value != 'Any'"
                          >({{ trans_value }})</template
                        >
                      </p>
                    </div>
                    <div class="in-right">
                      <v-checkbox
                        :value="trans_name"
                        color="primary"
                        v-model="mbSelTransmission"
                        @change="ckMBTransmission($event)"
                      ></v-checkbox>
                    </div>
                  </template>
                </li>

                <li v-if="mbShowTransIndex < getObjectSize(transmissions)">
                  <div class="in-left">
                    <p
                      @click="mbShowTransIndex = mbShowTransIndex + 1"
                      class="show_more"
                    >
                      Show More (
                      {{
                        parseInt(getObjectSize(transmissions)) -
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
                <h5>Rental Company</h5>
                <a href="javascript: void(0);" @click="mbClearRentalCompany()"
                  >Clear</a
                >
              </div>
              <ul class="filter-item-list">
                <li
                  v-for="(rent_value, rent_name, index) in rentalCompanies"
                  :key="index"
                >
                  <template v-if="index < mbShowRentalIndex">
                    <div class="in-left">
                      <p>
                        {{ rent_name }}
                        <template v-if="rent_value != 'Any'"
                          >({{ rent_value }})</template
                        >
                      </p>
                    </div>
                    <div class="in-right">
                      <v-checkbox
                        :value="rent_name"
                        color="primary"
                        v-model="mbSelRentalCompany"
                        @change="ckMBRentalCompany($event)"
                      ></v-checkbox>
                    </div>
                  </template>
                </li>

                <li v-if="mbShowRentalIndex < getObjectSize(rentalCompanies)">
                  <div class="in-left">
                    <p
                      @click="mbShowRentalIndex = mbShowRentalIndex + 1"
                      class="show_more"
                    >
                      Show More (
                      {{
                        parseInt(getObjectSize(rentalCompanies)) -
                        parseInt(mbShowRentalIndex)
                      }}
                      )
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="filter-list">
              <div class="filter-title">
                <h5>Price</h5>
                <a href="javascript: void(0);" @click="mbClearPrice()">Clear</a>
              </div>
              <!--<div class="popup-subtitle">
                <p>Daily + taxes & fees <br /><small>Average price is €98</small></p>
              </div>-->
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
              <div class="filter-list">
              <div class="filter-title">
                <h5>Distance</h5>
                <a href="javascript: void(0);" @click="mbClearPrice()">Clear</a>
              </div>
              <!--<div class="popup-subtitle">
                <p>Daily + taxes & fees <br /><small>Average price is €98</small></p>
              </div>-->
              <div class="filter-item-list" style="margin-top: 45px;!important">
                <v-card-text>
                  <v-range-slider
                    ticks
                    step="0.01"
                    v-model="distance"
                    :min="minDistance"
                    :max="maxDistance"
                    thumb-label="always"
                    @change="inputDistanceSliderValues"
                  ></v-range-slider>
                </v-card-text>
              </div>
            </div>
          </div>
          <v-btn color="primary" class="filter-popup-fix-btn">
            <img src="@/assets/images/car-filter-btn-img.png" alt="img" />
            See {{ totalResults }} Cars
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
import cartHelper from '@/helper/addCartHelper';

import SortFilter from '@/components/front/cars/carSortFilter.vue';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';
export default {
  name: 'CarMobileFilter',
  mixins: [cartHelper],
  props: [
    'value',
    'totalResults',
    'sortByOption',
    'freshlyMount',
    'calculateMobileResults',
  ],
  components: {
    SortFilter,
    VueSlider
  },
   
  data() {
    return {
      mbShowCarTypeIndex: 3,
      mbShowTransIndex: 2,
      mbShowRentalIndex: 2,
    };
  },
  mounted() {
    this.populateMobileFilters();
    this.populateAdvanceFilters();
    evBus.$on('resetDefaultFilter', () => {
      this.defaultFilter();
    });
  },

  methods: {
      inputDistanceSliderValues() {
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
    defaultFilter() {
      let advFilterData = this.doCleanArray(this.carSearchFilters.filters);

      if (!advFilterData) return;

      this.mbSliderMinVal = Math.floor(advFilterData.priceRange.minPrice);
      this.mbSliderMaxVal = Math.ceil(advFilterData.priceRange.maxPrice);
      this.mbSliderValue = [this.mbSliderMinVal, this.mbSliderMaxVal];
      this.minDistance =  Math.floor(advFilterData.distance.min);
      this.maxDistance =  Math.ceil(advFilterData.distance.max); 
      this.distance    = [this.minDistance,this.maxDistance];
      this.mbSelCarType = ['Any'];
      this.mbSelRentalCompany = ['Any'];
      this.mbSelTransmission = ['Any'];
      this.sortBy = 'FinalPrice-asc-false';
    },

    updateFilters() {
      let data = {
        mbSliderValue: this.mbSliderValue,
        mbSelTransmission: this.mbSelTransmission,
        distance: this.distance,
        mbSelRentalCompany: this.mbSelRentalCompany,
        mbSelCarType: this.mbSelCarType,
        sortBy: this.sortBy,
      };
      this.$emit('onMobileFilterData', data);
    },
    updateValue(key, value) {
      this.$emit('input', { ...this.value, [key]: value });
    },
    sortByOptionFunc() {
      this.updateFilters();
      this.sortByOption();
    },
    mbClearCarType() {
      this.mbSelCarType = ['Any'];
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },
    ckMBCarType(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any') {
        this.mbSelCarType = ['Any'];
      } else {
        this.mbSelCarType = transes.filter(function (value) {
          return value != 'Any';
        });
      }
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },
    mbClearTransmission() {
      this.mbSelTransmission = ['Any'];
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },
    ckMBTransmission(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any') {
        this.mbSelTransmission = ['Any'];
      } else {
        this.mbSelTransmission = transes.filter(function (value) {
          return value != 'Any';
        });
      }
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },
    mbClearRentalCompany() {
      this.mbSelRentalCompany = ['Any'];
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },
    ckMBRentalCompany(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any') {
        this.mbSelRentalCompany = ['Any'];
      } else {
        this.mbSelRentalCompany = transes.filter(function (value) {
          return value != 'Any';
        });
      }
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },
    mbClearPrice() {
      if (this.carSearchFilters.filters) {
        let advFilterData = this.doCleanArray(this.carSearchFilters.filters);
        //clear car type
        this.mbSelCarType = ['Any'];

        //clear transition
        this.mbSelTransmission = ['Any'];

        //clear RentalCompany
        this.mbSelRentalCompany = ['Any'];

        // SET-UP SLIDERS
        this.mbSliderMinVal = Math.floor(advFilterData.priceRange.minPrice);
        this.mbSliderMaxVal = Math.ceil(advFilterData.priceRange.maxPrice);
        this.mbSliderValue = [this.mbSliderMinVal, this.mbSliderMaxVal];
        this.minDistance   = Math.floor(advFilterData.distance.min) ;
        this.maxDistance   = Math.ceil(advFilterData.distance.max);
        this.distance      = [this.minDistance,this.maxDistance];
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
  },
};
</script>

<style></style>
