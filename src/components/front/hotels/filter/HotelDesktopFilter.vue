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
            NOTICE: Due to current conditions, some hotel details may not be
            immediately available. InteleTravel recommends you carefully note
            the cancellation policy for your hotel, and contact the hotel to
            confirm details after your booking.
          </v-alert>
        </p>
      </div>
      <GoogleMap :FilterHotelName="MapFilterHotelName" v-if="showMapVal" />
      <div class="search-heading">
        <h2>{{ totalResults }} Results Found Matching Your Search</h2>

        <v-btn color="primary show-hotel-map" @click="ShowMap()" dark style="">
          {{ btnTitle }}
        </v-btn>
      </div>

      <div class="filter-heading"><h6>Filters</h6></div>
      <div class="search-filters hotel-search-filters"> 
        <div class="single-filter hotel-single-filter">
          <v-text-field
            placeholder="Hotel Name"
            :loading="isPLoading"
            class="form-control"
            v-model="hotelvalue"
            @keyup="searchPickLocations($event)"
            autocomplete="off"
          ></v-text-field>
          <div class="panel-footer hotelName-panel-footer" v-if="picklist">
            <v-list dense>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item
                  v-for="(data1, i) in hotelName"
                  @click="setResult(data1)"
                  :key="i"
                >
                  <v-list-item-icon>
                    <v-icon></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="data1.displayName"
                    ></v-list-item-title>
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
              <!-- <div class="priceSlider"> -->
              <!--   <v-range-slider
                      ticks
                      step="10"
                      v-model="sliderValue"
                      :min="sliderMinVal"
                      :max="sliderMaxVal"
                      thumb-label="always"
                      @change="inputSliderValues"
                    >
                      <template v-slot:thumb-label="props">
                        <span> {{ currencySymbol }}{{ props.value }} </span>
                      </template>
                    </v-range-slider> -->
              <!-- </div> -->
            </v-card>
          </v-menu>
        </div>
        <div class="single-filter">
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
                  v-model="distanceSlider"
                  :min="distanceMinVal"
                  :max="distanceMaxVal"
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
                      :value="
                        Math.abs(starRating_name - 5) == 0
                          ? 'Any'
                          : Math.abs(starRating_name - 5)
                      "
                      v-model="selstarRating"
                      @change="ckReviewScore($event)"
                      color="primary"
                    ></v-checkbox>
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
                Facilities
                <i class="fas fa-caret-down"></i>
              </h5>
            </template>

            <v-card>
              <ul class="filterCheckbox">
                <li
                  v-for="(Facilities_value, Facilities_name) in hotelFacilities"
                  :key="Facilities_name"
                >
                  <div class="in-left" style="display: flex; float: left">
                    <v-checkbox
                      :value="Facilities_value.id"
                      v-model="selFacilities"
                      @change="ckFacilities($event)"
                      color="primary"
                    >
                    </v-checkbox>

                    {{ Facilities_name }}
                    <!--
                    <div
                      class="star-showing-left"
                      v-if="Facilities_name == 'hasAirShtle'"
                    >
                      <i class="material-icons">airport_shuttle</i>
                      <span class="ml-2">Air Shuttle</span>
                    </div>

                    <div
                      class="hotel-filter-icons"
                      v-if="Facilities_name == 'hasBar'"
                    >
                      <i class="material-icons">local_bar</i>
                      <span class="ml-3">Bar</span>
                    </div>

                    <div v-if="Facilities_name == 'hasBkfst'">
                      <i class="material-icons">local_dining</i>
                      <span class="ml-3">Breakfast</span>
                    </div>

                    <div v-if="Facilities_name == 'hasCoffee'">
                      <i class="material-icons">local_cafe</i>
                      <span class="ml-1">Coffee</span>
                    </div>

                    <div v-if="Facilities_name == 'hasFitness'">
                      <i class="material-icons">fitness_center</i>
                      <span class="ml-1">Fitness</span>
                    </div>

                    <div v-if="Facilities_name == 'hasFreePking'">
                      <i class="material-icons">directions_car</i>
                      <span class="ml-1">Free Parking</span>
                    </div>

                    <div v-if="Facilities_name == 'hasLaundry'">
                      <i class="material-icons">local_laundry_service</i>
                      <span class="ml-1">Laundry</span>
                    </div>

                    <div v-if="Facilities_name == 'hasPets'">
                      <i class="material-icons">pets</i>
                      <span class="ml-1">Pets</span>
                    </div>

                    <div v-if="Facilities_name == 'hasPool'">
                      <i class="material-icons">pool</i>
                      <span class="ml-1">Pool</span>
                    </div>
                    <div v-if="Facilities_name == 'hasRestaurant'">
                      <i class="material-icons">restaurant</i>
                      <span class="ml-1">Restaurant</span>
                    </div>
                    <div v-if="Facilities_name == 'hasRoomSvc'">
                      <i class="material-icons">room_service</i>
                      <span class="ml-2">Room Service</span>
                    </div>
                    <div v-if="Facilities_name == 'hasWiFi'">
                      <i class="material-icons">wifi</i>
                      <span class="ml-1">Wifi</span>
                    </div>
                    <div v-if="Facilities_value == 'Any'">
                      <span class="ml-1">Any</span>
                    </div>
                    -->
                  </div>

                  <!-- <div class="in-left">

                       
                      </div> -->

                  <div class="in-right" v-if="Facilities_name != 'Any'">
                    <span>({{ Facilities_value.count }})</span>
                  </div>
                </li>
              </ul>
            </v-card>
          </v-menu>
        </div>

        <div class="single-filter" style="width: auto">
          <v-menu
            :close-on-content-click="true"
            :nudge-width="200"
            offset-y
            v-if="close"
          >
            <template v-slot:activator="{ on, attrs }">
              <h5 v-bind="attrs" v-on="on">
                Room Board
                <i class="fas fa-caret-down"></i>
              </h5>
            </template>

            <v-card>
              <ul class="filterCheckbox">
                <li
                  v-for="(basisList_value, basisList_name) in basisList"
                  :key="basisList_name"
                >
                  <div class="in-left" style="display: flex; float: left">
                    <v-checkbox
                      :value="basisList_name"
                      v-model="selRoom"
                      @change="ckbasisList($event)"
                      color="primary"
                    >
                    </v-checkbox>

                    <div class="star-showing-left">
                      <span class="ml-2">{{ basisList_name }}</span>
                    </div>
                  </div>

                  <!-- <div class="in-left">
                            }

                       
                      </div> -->

                  <div class="in-right" v-if="basisList_value != 'Any'">
                    <span>({{ basisList_value }})</span>
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
import HotelHelper from '@/helper/HotelHelper.js';
import { mapState } from 'vuex';
import GoogleMap from '@/components/front/hotels/GoogleMap.vue';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';
export default {
  name: 'HotelDesktopFilter',
  mixins: [HotelHelper],
  props: [
    'totalResults',
    'calculateAdvanceResults',
    'FilterHotelName',
    'sortByOption',
    'freshlyMount',
    'MapFilterHotelName',
    'allHotel',
  ],
  components: {
    VueSlider,
    GoogleMap,
  },
  data() {
    return {
      isPLoading: false,
      picklist: false,
      hotelName: [],
      selectedItem: -1,
      hotelvalue: '',
      showMapVal: false,
      btnTitle: 'Show Map',
      close: false,
      allHotelsInComp: [],
      allHotelsCount: 0,
    };
  },
  computed: {
    ...mapState({
      StoreHotels: (state) => state.hotelStore.hotels,
      sId: (state) => state.hotelStore.sessionId,
    }),
  },
  mounted() {
    this.populateAdvanceFilters().then((rsp) => {
      this.updateFilters();
    });
  },
  created() {
    evBus.$on('resetDskFilterCounter', () => {
      this.allHotelsCount = 0;
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
      this.sortBy = 'lowestPrice_asc';
      this.selRoom = ['Any'];
      this.selFacilities = [0];
      this.selstarRating = ['Any'];
      this.hotelvalue = '';
      this.sliderValue = [];
      this.distanceSlider = [];

      this.populateAdvanceFilters();
    },
    updateFilters() {
      let data = {
        sliderValue: this.sliderValue,
        distanceSlider: this.distanceSlider,
        selstarRating: this.selstarRating,
        selFacilities: this.selFacilities,
        seldistance: this.seldistance,
        selRoom: this.selRoom,
        sortBy: this.sortBy,
        selHotelName: this.hotelvalue,
      };

      this.$emit('onDesktopFilterData', data);

      evBus.$emit('makeAdvFilterCall');
    },

    setResult(result) {
      this.hotelvalue = result.displayName;
      this.picklist = false;
      this.updateFilters();
      if (!this.freshlyMount) {
        // this.calculateAdvanceResults();

        /* 
          this.FilterHotelName(result.displayName);
        */
        this.FilterHotelName(
          result.displayName,
          this.allHotelsInComp,
          this.hotelvalue
        );
      }
    },

    searchPickLocations: function (event) {
      if (this.allHotelsCount == 0) {
        this.allHotelsInComp = this.allHotel;
        this.allHotelsCount++;
      }

      if (event.code == 'ArrowUp' || event.code == 'ArrowDown') return;
      if (event.code == 'Enter') return;
      if (event.code == '(space)') return;
      if (event.code == 'Backspace') {
        this.picklist = false;
        this.isPLoading = false;

        /*
          this.FilterHotelName('keyword remove');
        */
        this.FilterHotelName(
          'keyword remove',
          this.allHotelsInComp,
          this.hotelvalue
        );
      }

      var that = this;
      let hotelarr = this.allHotelsInComp;

      /*
        this.StoreHotels;
      */

      this.hotelName = [];
      //this.spickup = '';

      //
      let val = event.target.value;

      if (!val) return;

      //if (val.length < that.min_search_autocomplete_length) return;

      // Items have already been requested
      if (that.isPLoading) return;

      that.isPLoading = true;

      that.hotelName = hotelarr.filter((hotelarr) =>
        hotelarr.displayName.toLowerCase().match(val.toLowerCase())
      );

      that.picklist = true;
      that.isPLoading = false;
    },

    sortByOptionFunc() {
      this.updateFilters();
      this.sortByOption();
    },

    ckdistance(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any') {
        this.seldistance = ['Any'];
      } else {
        this.seldistance = transes.filter(function (value) {
          return value != 'Any';
        });
      }
      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateAdvanceResults();
      }
    },

    ckFacilities(transes) {
      let lastBox = transes.slice(-1).pop();

      if (lastBox == 0) {
        this.selFacilities = [0];
      } else {
        this.selFacilities = transes.filter(function (value) {
          return value != 0;
        });
      }

      if (this.selFacilities.length == 0) this.selFacilities = [0];

      this.updateFilters();
      if (!this.freshlyMount) {
        this.calculateAdvanceResults();
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
        this.calculateAdvanceResults();
      }
    },

    ckReviewScore(transes) {
      let lastBox = transes.slice(-1).pop();
      if (lastBox == 'Any') {
        this.selstarRating = ['Any'];
      } else {
        this.selstarRating = transes.filter(function (value) {
          return value != 'Any';
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
