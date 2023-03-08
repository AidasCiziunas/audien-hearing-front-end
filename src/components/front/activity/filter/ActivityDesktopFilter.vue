<template>
  <section class="search-results">
    <div class="container" style="overflow: inherit">
      <div class="important-text-to-car">
        <p>
          <v-alert
            border="top"
            colored-border
            color="primary"
            type="info"
            elevation="2"
          >
            NOTICE: Due to current conditions, some acitvity details may not be
            immediately available. InteleTravel recommends you carefully note
            the cancellation policy for your acitvity, and contact the acitvity
            to confirm details after your booking.
          </v-alert>
        </p>
      </div>

      <div class="search-heading">
        <h2>
          <strong>{{ totalResults }}</strong> Results Found Matching Your Search
        </h2>
      </div>

      <!--    <h2 v-if="totalResults == 0">
          <strong>{{ totalResults }}</strong> Results Not Found Matching Your
          Search
        </h2>
     -->

      <div class="search-filters hotel-search-filters">
        <div class="single-filter">
          <v-text-field
            placeholder="Activity Name"
            :loading="isPLoading"
            class="form-control"
            v-model="Activityvalue"
            @keyup="searchPickLocations($event)"
            autocomplete="off"
          ></v-text-field>
          <div class="panel-footer hotelName-panel-footer" v-if="picklist">
            <v-list dense>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item
                  v-for="(data1, i) in ActivityName"
                  @click="setResult(data1)"
                  :key="i"
                >
                  <v-list-item-icon>
                    <v-icon></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="data1.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
        </div>

        <div class="single-filter">
          <v-menu :close-on-content-click="true" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <h5 v-bind="attrs" v-on="on">
                Price Range
                <i class="fas fa-caret-down"></i>
              </h5>
            </template>

            <v-card>
              <div class="timeSlider">
                <vue-slider
                  :dot-size="24"
                  :dotStyle="dotStyle"
                  :railStyle="railStyle"
                  :processStyle="processStyle"
                  :tooltipStyle="tooltipStyle"
                  v-model="sliderValue"
                  :min="sliderMinVal"
                  :max="sliderMaxVal"
                  :interval="0.01"
                  :enable-cross="false"
                  :lazy="true"
                  tooltip="always"
                  :tooltip-formatter="
                    (val) => currencySymbol + val.toFixed(2).toString()
                  "
                  @change="inputSliderValues"
                />
              </div>
            </v-card>
          </v-menu>
        </div>
        <div class="single-filter">
          <v-menu :close-on-content-click="true" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <h5 v-bind="attrs" v-on="on">
                Star Rating
                <i class="fas fa-caret-down"></i>
              </h5>
            </template>

            <v-card>
              <ul class="filterCheckbox">
                <li
                  v-for="(starRating_value, starRating_name) in starRating"
                  :key="starRating_name"
                >
                  <div class="in-left" style="display: flex; float: left">
                    <v-checkbox
                      v-if="
                        starRating_name == 6 &&
                        Math.abs(starRating_name - 6) == 0
                      "
                      :value="
                        starRating_name == 6 &&
                        Math.abs(starRating_name - 6) == 0
                          ? 'Any'
                          : Math.abs(starRating_name - 6)
                      "
                      v-model="selstarRating"
                      @change="ckReviewScore($event)"
                      color="primary"
                    ></v-checkbox>
                    <v-checkbox
                      v-else
                      :value="Math.abs(starRating_name - 5)"
                      v-model="selstarRating"
                      @change="ckReviewScore($event)"
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
                </li>
              </ul>
            </v-card>
          </v-menu>
        </div>

        <div class="single-filter">
          <v-menu :close-on-content-click="true" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <h5 v-bind="attrs" v-on="on">
                Categories
                <i class="fas fa-caret-down"></i>
              </h5>
            </template>

            <v-card>
              <ul class="filterCheckbox">
                <li v-for="(category, index) in compCategories" :key="index">
                  <div class="in-left" style="display: flex; float: left">
                    <v-checkbox
                      :value="category"
                      v-model="selCategories"
                      @change="ckCategories($event)"
                      color="primary"
                    >
                    </v-checkbox>
                  </div>

                  <div class="star-showing-left">
                    <span class="ml-2 activity-sc">{{ category }}</span>
                  </div>
                </li>
                <li>
                  <div class="in-left" style="display: flex; float: left">
                    <v-checkbox
                      value="Any"
                      v-model="selCategories"
                      @change="ckCategories($event)"
                      color="primary"
                    >
                    </v-checkbox>
                  </div>
                  <div class="star-showing-left">
                    <span class="activity-sc">Any</span>
                  </div>
                </li>
              </ul>
            </v-card>
          </v-menu>
        </div>

        <div class="single-filter">
          <v-menu :close-on-content-click="true" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <h5 v-bind="attrs" v-on="on">
                Sub Categories
                <i class="fas fa-caret-down"></i>
              </h5>
            </template>

            <v-card>
              <ul class="filterCheckbox">
                <li v-for="(subcategory, index) in subCategories" :key="index">
                  <div class="in-left" style="display: flex; float: left">
                    <v-checkbox
                      :value="subcategory"
                      v-model="selSubCategories"
                      @change="cksubCategories($event)"
                      color="primary"
                    >
                    </v-checkbox>
                  </div>
                  <div class="star-showing-left">
                    <span class="activity-sc">{{ subcategory }}</span>
                  </div>
                </li>

                <li>
                  <div class="in-left" style="display: flex; float: left">
                    <v-checkbox
                      value="Any"
                      v-model="selSubCategories"
                      @change="cksubCategories($event)"
                      color="primary"
                    >
                    </v-checkbox>
                  </div>
                  <div class="star-showing-left">
                    <span class="activity-sc">Any</span>
                  </div>
                </li>
              </ul>
            </v-card>
          </v-menu>
        </div>

        <div class="single-filter sort_option hotel_sort">
          <v-select
            :items="sortOptions"
            item-text="title"
            item-value="value"
            @input="sortByOptionFunc"
            label="Sort"
            v-model="sortBy"
          >
            <template v-slot:option>
              {{ option.title }}
              <span :class="option.icon"></span>
            </template>
          </v-select>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { evBus } from '@/services/bus.js';
import ActivityHelper from '@/helper/ActivityHelper.js';
import { mapState } from 'vuex';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';
export default {
  name: 'ActivityDesktopFilter',
  mixins: [ActivityHelper],
  props: [
    'totalResults',
    'calculateAdvanceResults',
    'FilterActivityName',
    'sortByOption',
    'freshlyMount',
    'allActivities'
  ],
  components: {
    VueSlider,
  },
  data() {
    return {
      allActivityCount: 0,
      allActivityInComp: [],
      isPLoading: false,
      picklist: false,
      ActivityName: [],
      selectedItem: -1,
      Activityvalue: '',
      showMapVal: false,
      btnTitle: 'Show Map',
      close: false,
      filterType: ''
    };
  },

  created() {
    evBus.$on('resetDskFilterCounter', () => {
      this.allActivityCount = 0;
    });
  },
  computed: {
    ...mapState({
      ActivityStore: state => state.ActivityStore
    }),

    compAllActivities(){
         return this.allActivities;
    },

    compCategories() {
      return this.categories;
    }
  },
  mounted() {
    this.populateAdvanceFilters().then(rsp => {
          console.log('populated filters');
          
          console.log('called populateAdvanceFilters');
          this.updateFilters();
          
        console.log('activity store updated', this.compAllActivities);
        });


  },



  methods: {
    ShowMap() {
      this.showMapVal = !this.showMapVal;
      if (this.showMapVal == true) {
        this.btnTitle = 'Hide Map';
      } else {
        this.btnTitle = 'Show Map';
      }
    },

    submit() {
      this.resetFilter();
      this.updateFilters();
    },
    resetFilter() {
      this.sortBy = 'totalPrice-asc-false';
      this.starRating = ['Any'];
      this.Activityvalue = '';
      this.sliderValue = [];
      this.categories = ['Any'];
      this.subCategories = ['Any'];

      this.populateAdvanceFilters();
    },
    updateFilters() {
      let data = {
        sliderValue: this.sliderValue,
        selstarRating: this.selstarRating,
        selCategories: this.selCategories,
        selSubCategories: this.selSubCategories,
        sortBy: this.sortBy,
        selActivityName: this.Activityvalue
      };

      this.$emit('onDesktopFilterData', data);
      evBus.$emit('makeAdvFilterCallOfActivity');
    },

    setResult(result) {
      this.Activityvalue = result.title;
      this.picklist = false;
      this.updateFilters();
      if (!this.freshlyMount) {
        this.FilterActivityName(
          result.title,
          this.allActivityInComp,
          this.Activityvalue
        );
      }
    },

    searchPickLocations: function (event) {
      console.log('searchPickLocations called');
      if (this.allActivityCount == 0) {
        this.allActivityInComp = this.compAllActivities;
        this.allActivityCount++;
      }
    
      if (event.code == 'ArrowUp' || event.code == 'ArrowDown') return;
      if (event.code == 'Enter') return;
      if (event.code == '(space)') return;
      if (event.code == 'Backspace') {
        this.picklist = false;
        this.isPLoading = false;
        this.FilterActivityName(
          'keyword remove',
          this.allActivityInComp,
          this.Activityvalue
        );
      }
      var that = this;
      let Activityarr = this.allActivityInComp;
      this.ActivityName = [];
      //this.spickup = '';

      let val = event.target.value;

      if (!val) return;

      //if (val.length < that.min_search_autocomplete_length) return;

      // Items have already been requested
      if (that.isPLoading) return;

      that.isPLoading = true;

      that.ActivityName = Activityarr.filter(Activityarr =>
        Activityarr.title.toLowerCase().match(val.toLowerCase())
      );
      
      that.picklist = true;
      that.isPLoading = false;
    },

    sortByOptionFunc() {
      this.updateFilters();
      this.sortByOption();
    },

    ckCategories(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any' || lastBox === undefined) {
        this.selCategories = ['Any'];
      } else {
        this.selCategories = transes.filter(function (value) {
          return value != 'Any';
        });
      }

      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateAdvanceResults();
      }
    },

    cksubCategories(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any' || lastBox === undefined) {
        this.selSubCategories = ['Any'];
      } else {
        this.selSubCategories = transes.filter(function (value) {
          return value != 'Any';
        });
      }

      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateAdvanceResults();
      }
    },

    ckReviewScore(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox === 'Any' || lastBox === undefined) {
        this.selstarRating = ['Any'];
      } else {
        this.selstarRating = transes.filter(function (value) {
          return value !== 'Any';
        });
      }

      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateAdvanceResults();
      }
      //if (!lastBox) this.selstarRating = ["Any"];
    },

    inputSliderValues() {
      this.updateFilters();
      // make debounce timers
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.calculateAdvanceResults();
      }, 1000);
    },
  },
};
</script>

<style>
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v90/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2)
    format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
  font-feature-settings: 'liga';
}
</style>
