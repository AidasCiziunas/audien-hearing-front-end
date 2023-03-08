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
                <div class="timeSlider">
                  <vue-slider
                    :dot-size="24"
                    :dotStyle="dotStyle"
                    :railStyle="railStyle"
                    :processStyle="processStyle"
                    :tooltipStyle="tooltipStyle"
                    v-model="mblSliderValue"
                    :min="mblSliderMinVal"
                    :max="mblSliderMaxVal"
                    :interval="0.01"
                    :enable-cross="false"
                    :lazy="true"
                    tooltip="always"
                    :tooltip-formatter="(val) => val.toFixed(2).toString()"
                    @change="inputDistanceSliderValues"
                  />
                </div>
              </div>
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
                        v-model="mblselStarRating"
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
                <h5>Categories</h5>
                <a href="javascript: void(0);" @click="mbClearCategories()"
                  >Clear</a
                >
              </div>
              <ul class="filter-item-list">
                <li v-for="(category, index) in categories" :key="index">
                  <template v-if="index < mbShowHotelTypeIndex">
                    <div class="in-right">
                      <v-checkbox
                        :value="category"
                        v-model="mblSelCategories"
                        @change="ckMBActivityCategories($event)"
                        color="primary"
                      ></v-checkbox>
                    </div>
                    {{ category }}
                  </template>
                </li>
                <li v-if="mbShowHotelTypeIndex < getObjectSize(categories)">
                  <div class="in-left">
                    <p
                      @click="mbShowHotelTypeIndex = mbShowHotelTypeIndex + 1"
                      class="show_more"
                    >
                      Show More (
                      {{
                        parseInt(getObjectSize(categories)) -
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
                <h5>Sub Categories</h5>
                <a href="javascript: void(0);" @click="mbClearSubCategories()"
                  >Clear</a
                >
              </div>
              <ul class="filter-item-list">
                <li v-for="(subcategory, index) in subCategories" :key="index">
                  <template v-if="index < mblShowSubCat">
                    <div class="in-right">
                      <v-checkbox
                        :value="subcategory"
                        v-model="mblSelSubCategories"
                        @change="ckMBActivitySubCategories($event)"
                        color="primary"
                      ></v-checkbox>
                    </div>
                    {{ subcategory }}
                  </template>
                </li>

                <li v-if="mblShowSubCat < getObjectSize(subCategories)">
                  <div class="in-left">
                    <p
                      @click="mblShowSubCat = mblShowSubCat + 1"
                      class="show_more"
                    >
                      Show More (
                      {{
                        parseInt(getObjectSize(subCategories)) -
                        parseInt(mblShowSubCat)
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
import ActivityHelper from '@/helper/ActivityHelper.js';
import SortFilter from '@/components/front/activity/activitySortFilter.vue';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';
export default {
  name: 'ActivityMobileFilter',
  mixins: [ActivityHelper],
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
      mbShowHotelTypeIndex: 2,
      mbShowTransIndex: 2,
      mbShowdistanceIndex: 2,
      mblShowSubCat: 2,
    };
  },
  mounted() {
    this.populateAdvanceFilters();
    this.populateMobileFilters();
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
        mblSliderValue: this.mblSliderValue,
        mblselStarRating: this.mblselStarRating,
        mblSelCategories: this.mblSelCategories,
        mblSelSubCategories: this.mblSelSubCategories,
        sortBy: this.sortBy,
        selActivityName: this.selActivityName,
      };
      this.$emit('onMobileFilterData', data);
    },

    sortByOptionFunc() {
      this.updateFilters();
      this.sortByOption();
    },

    mbClearCategories() {
      this.mblSelCategories = ['Any'];
    },

    mbClearSubCategories() {
      this.mblSelSubCategories = ['Any'];
    },

    ckMBActivityCategories(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any') {
        this.mblSelCategories = ['Any'];
      } else {
        this.mblSelCategories = transes.filter(function (value) {
          return value != 'Any';
        });
      }
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },

    ckMBActivitySubCategories(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any') {
        this.mblSelSubCategories = ['Any'];
      } else {
        this.mblSelSubCategories = transes.filter(function (value) {
          return value != 'Any';
        });
      }
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },

    mbClearStarRating() {
      this.mblselStarRating = ['Any'];
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateMobileResults();
      }
    },

    ckMBstarRating(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any') {
        this.mblselStarRating = ['Any'];
      } else {
        this.mblselStarRating = transes.filter(function (value) {
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
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.calculateMobileResults();
      }, 1000);
    },

    mbClearPrice() {
      if (this.Activityfilters.filters) {
        let advFilterData = this.doCleanArray(this.Activityfilters.filters);

        this.mblSliderMinVal = Math.floor(advFilterData.priceRange.minPrice);
        this.mblSliderMaxVal = Math.ceil(advFilterData.priceRange.maxPrice);
        this.mblSliderValue = [this.mblSliderMinVal, this.mblSliderMaxVal];
      } else {
        this.mblSliderMinVal = 0;
        this.mblSliderMaxVal = 10;
        this.mblSliderValue = [0, 10];
      } // Ends IF FILTERS
    },
    clear() {
      this.resetFilter();
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
