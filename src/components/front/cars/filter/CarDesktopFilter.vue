<template>
  <section class="search-results">
    <v-container>
      <div class="important-text-to-car">
        <p>
          <v-alert
            border="top"
            colored-border
            color="primary"
            type="info"
            elevation="2"
            >NOTICE: Due to current conditions, some car details may not be
            immediately available, and car availability at pick up may vary.
            InteleTravel recommends you carefully note the cancellation policy
            for your rental, and contact the car rental company to confirm
            details after your booking.
          </v-alert>
        </p>
      </div>
      <div class="search-heading">
        <h2>{{ totalResults }} Results Found Matching Your Search</h2>
      </div>
      <div class="filter-heading"><h6>Filters</h6></div>
      <div class="search-filters car-search-filters">
        <div class="car-single-filter">
          <v-menu :close-on-content-click="true" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <h5 v-bind="attrs" v-on="on">
                Price range
                <i class="fas fa-caret-down"></i>
              </h5>
            </template>

            <v-card>
              <div class="priceSlider">
                <v-range-slider
                  ticks
                  step="10"
                  v-model="sliderValue"
                  :min="sliderMinVal"
                  :max="sliderMaxVal"
                  @change="inputSliderValues"
                  thumb-label="always"
                >
                  <template v-slot:thumb-label="props">
                    <span> {{ currencySymbol }}{{ props.value }} </span>
                  </template>
                </v-range-slider>
              </div>
            </v-card>
          </v-menu>
        </div>
       
        <div class="car-single-filter">
            <v-menu :close-on-content-click="true" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <h5 v-bind="attrs" v-on="on">
                Distance
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
                  v-model="distance"
                  :min="minDistance"
                  :max="maxDistance"
                  :interval="0.01"
                  :enable-cross="false"
                  :lazy="true"
                  tooltip="always"
                  :tooltip-formatter="(val) => val.toFixed(2).toString()"
                  @change="inputDistanceSliderValues"
                />
              </div>
            </v-card>
          </v-menu> 

        </div>

        <div class="car-single-filter">
          <v-menu :close-on-content-click="true" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <h5 v-bind="attrs" v-on="on">
                Transmission
                <i class="fas fa-caret-down"></i>
              </h5>
            </template>

            <v-card>
              <ul class="filterCheckbox">
                <li
                  v-for="(trans_value, trans_name) in transmissions"
                  :key="trans_name"
                >
                  <div class="in-left">
                    <v-checkbox
                      :label="trans_name"
                      :value="trans_name"
                      color="primary"
                      v-model="selTransmission"
                      @change="ckTransmission($event)"
                    ></v-checkbox>
                  </div>
                  <div class="in-right" v-if="trans_value != 'Any'">
                    <span>({{ trans_value }})</span>
                  </div>
                </li>
              </ul>
            </v-card>
          </v-menu>
        </div>
        <div class="car-single-filter">
          <v-menu :close-on-content-click="true" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <h5 v-bind="attrs" v-on="on">
                Rental company
                <i class="fas fa-caret-down"></i>
              </h5>
            </template>

            <v-card>
              <ul class="filterCheckbox">
                <li
                  v-for="(rent_value, rent_name) in rentalCompanies"
                  :key="rent_name"
                >
                  <div class="in-left">
                    <v-checkbox
                      :label="rent_name"
                      :value="rent_name"
                      v-model="selRentalCompany"
                      @change="ckRentalCompany($event)"
                      color="primary"
                    ></v-checkbox>
                  </div>
                  <div class="in-right" v-if="rent_value != 'Any'">
                    <span>({{ rent_value }})</span>
                  </div>
                </li>
              </ul>
            </v-card>
          </v-menu>
        </div>
        <div class="car-single-filter">
          <v-menu :close-on-content-click="true" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <h5 v-bind="attrs" v-on="on">
                Car type
                <i class="fas fa-caret-down"></i>
              </h5>
            </template>

            <v-card>
              <ul class="filterCheckbox">
                <li v-for="(car_value, car_name) in carTypes" :key="car_name">
                  <div class="in-left">
                    <v-checkbox
                      :label="car_name"
                      :value="car_name"
                      v-model="selCarType"
                      @change="ckCarType($event)"
                      color="primary"
                    ></v-checkbox>
                  </div>
                  <div class="in-right" v-if="car_value != 'Any'">
                    <span>({{ car_value }})</span>
                  </div>
                </li>
              </ul>
            </v-card>
          </v-menu>
        </div>

        <div class="car-single-filter sort_option hotel_sort">
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

      <v-row align="center"> </v-row>
    </v-container>
  </section>
</template>

<script>
import { evBus } from '@/services/bus.js';
import cartHelper from '@/helper/addCartHelper';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';
export default {
  name: 'CarDesktopFilter',
  mixins: [cartHelper],
  props: [
    'totalResults',
    'calculateAdvanceResults',
    'sortByOption',
    'freshlyMount',
  ],
   components: {
    VueSlider
  
  },
  data() {
    return {};
  },
  mounted() {
    this.populateAdvanceFilters().then((rsp) => {
      // this.updateFilters();
    });

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
        this.calculateAdvanceResults();
      }, 1000);
    },
    defaultFilter() {
      let advFilterData = this.doCleanArray(this.carSearchFilters.filters);

      if (!advFilterData) return;

      this.sliderMinVal = Math.floor(advFilterData.priceRange.minPrice);
      this.sliderMaxVal = Math.ceil(advFilterData.priceRange.maxPrice);
      this.sliderValue = [this.sliderMinVal, this.sliderMaxVal];
      this.minDistance =  Math.floor(advFilterData.distance.min);
      this.maxDistance =  Math.ceil(advFilterData.distance.max); 
      this.distance    = [this.minDistance,this.maxDistance];
      this.selCarType = ['Any'];
      this.selRentalCompany = ['Any'];
      this.selTransmission = ['Any'];
      this.sortBy = 'FinalPrice-asc-false';
    },
    // emit latest values of filters to parent
    updateFilters() {
      let data = {
        sliderValue: this.sliderValue,
        distance: this.distance,
        selTransmission: this.selTransmission,
        selRentalCompany: this.selRentalCompany,
        selCarType: this.selCarType,
        sortBy: this.sortBy,
      };
      this.$emit('onDesktopFilterData', data);
    },
    sortByOptionFunc() {
      this.updateFilters();
      this.sortByOption();
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
   
    ckTransmission(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any') {
        this.selTransmission = ['Any'];
      } else {
        this.selTransmission = transes.filter(function (value) {
          return value != 'Any';
        });
      }
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateAdvanceResults();
      }
      if (!lastBox) this.selTransmission = ['Any'];
    },
    ckRentalCompany(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any') {
        this.selRentalCompany = ['Any'];
      } else {
        this.selRentalCompany = transes.filter(function (value) {
          return value != 'Any';
        });
      }
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateAdvanceResults();
      }
      if (!lastBox) this.selRentalCompany = ['Any'];
    },
    ckCarType(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any') {
        this.selCarType = ['Any'];
      } else {
        this.selCarType = transes.filter(function (value) {
          return value != 'Any';
        });
      }
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateAdvanceResults();
      }
      if (!lastBox) this.selCarType = ['Any'];
    },
  },
  computed: {
    transmissionss() {
      if (!('Manual' in this.transmissions)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.transmissions['Manual'] = 0;
      }
      if (!('Automatic' in this.transmissions)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.transmissions['Automatic'] = 0;
      }
      return Object.keys(this.transmissions)
        .sort()
        .reduce((obj, key) => {
          obj[key] = this.transmissions[key];
          return obj;
        }, {});
    },
  },
};
</script>

<style></style>
