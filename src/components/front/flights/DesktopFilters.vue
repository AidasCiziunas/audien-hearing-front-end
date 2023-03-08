<template>
    <div class="search-flights">
        <div class="search-filters">
            <!-- price range filter -->
            <div class="single-filter">
                <v-menu
                    :close-on-content-click="true"
                    :nudge-width="200"
                    offset-y
                >
                    <template v-slot:activator="{ on, attrs }">
                        <h5 v-bind="attrs" v-on="on">
                            Price range
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
                                v-model="priceRangeVal"
                                :min="parseFloat(priceRange.minPrice)"
                                :max="parseFloat(priceRange.maxPrice)"
                                :interval="0.01"
                                :enable-cross="false"
                                :lazy="true"
                                tooltip="always"
                                :tooltip-formatter="priceFormat"
                                @change="sliderValueChange"
                            />
                        </div>
                    </v-card>
                </v-menu>
            </div>
            <!-- :tooltip-formatter="
                  (val) => currencySymbol + val.toFixed(2).toString()
                " -->
            <!-- airline filter -->
            <div class="single-filter">
                <v-menu
                    :close-on-content-click="true"
                    :nudge-width="200"
                    offset-y
                >
                    <template v-slot:activator="{ on, attrs }">
                        <h5 v-bind="attrs" v-on="on">
                            Airlines
                            <i class="fas fa-caret-down"></i>
                        </h5>
                    </template>

                    <v-card v-if="airlines.length">
                        <ul class="filterCheckbox">
                            <li v-for="(item, i) in airlines" :key="i">
                                <v-checkbox
                                    :key="`${i}-${item.name}`"
                                    :label="item.name"
                                    :value="item.iata"
                                    v-model="airline"
                                    @change="
                                        checkboxSearchFilter($event, 'airline')
                                    "
                                    color="primary"
                                ></v-checkbox>
                            </li>
                        </ul>
                    </v-card>
                </v-menu>
            </div>

            <!-- stop filter -->
            <div class="single-filter">
                <v-menu
                    :close-on-content-click="true"
                    :nudge-width="200"
                    offset-y
                >
                    <template v-slot:activator="{ on, attrs }">
                        <h5 v-bind="attrs" v-on="on">
                            Stops
                            <i class="fas fa-caret-down"></i>
                        </h5>
                    </template>
                    <v-card>
                        <ul class="filterCheckbox">
                            <li
                                v-for="(item, i) in ['0', '1', '2', '3']"
                                :key="i"
                            >
                                <v-checkbox
                                    :key="i"
                                    :label="item"
                                    :value="item"
                                    @change="
                                        checkboxSearchFilter($event, 'stop')
                                    "
                                    v-model="stops"
                                    color="primary"
                                ></v-checkbox>
                            </li>
                        </ul>
                    </v-card>
                </v-menu>
            </div>

            <!-- alliances filter -->
            <div class="single-filter">
                <v-menu
                    :close-on-content-click="true"
                    :nudge-width="200"
                    offset-y
                >
                    <template v-slot:activator="{ on, attrs }">
                        <h5 v-bind="attrs" v-on="on">
                            Alliances
                            <i class="fas fa-caret-down"></i>
                        </h5>
                    </template>

                    <v-card>
                        <ul class="filterCheckbox">
                            <li
                                v-for="(item, i) in [
                                    'oneworld',
                                    'skyteam',
                                    'staralliance'
                                ]"
                                :key="i"
                            >
                                <v-checkbox
                                    :label="item"
                                    :value="item"
                                    @change="
                                        checkboxSearchFilter($event, 'alliance')
                                    "
                                    v-model="alliance"
                                    color="primary"
                                ></v-checkbox>
                            </li>
                        </ul>
                    </v-card>
                </v-menu>
            </div>

            <!-- duration filter -->
           
            <div class="single-filter">
                <v-menu
                    :close-on-content-click="true"
                    :nudge-width="200"
                    offset-y
                >
                    <template v-slot:activator="{ on, attrs }">
                        <h5 v-bind="attrs" v-on="on">
                            Duration
                            <i class="fas fa-caret-down"></i>
                        </h5>
                    </template>

                    <v-card>
                        <div class="timeSlider">

                            <vue-slider
                               v-model="durationVal"
                                :dot-size="24"
                                :dotStyle="dotStyle"
                                :railStyle="railStyle"
                                :processStyle="processStyle"
                                :tooltipStyle="tooltipStyle"
                                :min="parseFloat(minDuration)"
                                :max="parseFloat(maxDuration)"
                                :interval="0.01"
                                :enable-cross="false"
                                :lazy="true"
                                tooltip="always"
                                :tooltip-formatter="durationFormat"
                                @change="sliderValueChange"
                            />
                        </div>
                    </v-card>
                </v-menu>
            </div>
            <!-- departure time filter -->
            <div class="single-filter">
                <v-menu
                    :close-on-content-click="true"
                    :nudge-width="200"
                    offset-y
                >
                    <template v-slot:activator="{ on, attrs }">
                        <p
                            class="roundWay-label"
                            v-if="flightType == 'roundTrip'"
                        >
                            Outbound flight
                        </p>
                        <h5 v-bind="attrs" v-on="on">
                            Departure Time
                            <i class="fas fa-caret-down"></i>
                        </h5>
                    </template>

                    <v-card>
                        <div class="timeSlider">
                            <vue-slider
                                v-model="departureTimeVal"
                                :dot-size="24"
                                :dotStyle="dotStyle"
                                :railStyle="railStyle"
                                :processStyle="processStyle"
                                :tooltipStyle="tooltipStyle"
                                :min="minDepart"
                                :max="maxDepart"
                                :interval="60"
                                :enable-cross="false"
                                :lazy="true"
                                tooltip="always"
                                :tooltip-formatter="dateFormat"
                                @change="sliderValueChange"
                            />
                        </div>
                    </v-card>
                </v-menu>
            </div>

            <!-- arrival time filter -->
            <div class="single-filter">
                <v-menu
                    :close-on-content-click="true"
                    :nudge-width="200"
                    offset-y
                >
                    <template v-slot:activator="{ on, attrs }">
                        <h5 v-bind="attrs" v-on="on">
                            Arrival Time
                            <i class="fas fa-caret-down"></i>
                        </h5>
                    </template>

                    <v-card>
                        <div class="timeSlider">
                            <vue-slider
                                v-model="arrivalTimeVal"
                                :dot-size="24"
                                :dotStyle="dotStyle"
                                :railStyle="railStyle"
                                :processStyle="processStyle"
                                :tooltipStyle="tooltipStyle"
                                :min="minArrivalTime"
                                :max="maxArrivalTime"
                                :interval="60"
                                :enable-cross="false"
                                :lazy="true"
                                tooltip="always"
                                :tooltip-formatter="dateFormat"
                                @change="sliderValueChange"
                            />
                        </div>
                    </v-card>
                </v-menu>
            </div>

            <template v-if="flightType === 'roundTrip'">
                <div class="single-filter">
                    <v-menu
                        :close-on-content-click="true"
                        :nudge-width="200"
                        offset-y
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <p class="roundWay-label">
                                Inbound flight (Return)
                            </p>
                            <h5 v-bind="attrs" v-on="on">
                                Departure Time
                                <i class="fas fa-caret-down"></i>
                            </h5>
                        </template>

                        <v-card>
                            <div class="timeSlider">
                                <vue-slider
                                    v-model="departureTimeReturnVal"
                                    :dot-size="24"
                                    :dotStyle="dotStyle"
                                    :railStyle="railStyle"
                                    :processStyle="processStyle"
                                    :tooltipStyle="tooltipStyle"
                                    :min="minDepartReturn"
                                    :max="maxDepartReturn"
                                    :interval="60"
                                    :enable-cross="false"
                                    :lazy="true"
                                    tooltip="always"
                                    :tooltip-formatter="dateFormat"
                                    @change="sliderValueChange"
                                />
                            </div>
                        </v-card>
                    </v-menu>
                </div>
                <div class="single-filter">
                    <v-menu
                        :close-on-content-click="true"
                        :nudge-width="200"
                        offset-y
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <h5 v-bind="attrs" v-on="on">
                                Arrival Time
                                <i class="fas fa-caret-down"></i>
                            </h5>
                        </template>

                        <v-card>
                            <div class="timeSlider">
                                <vue-slider
                                    v-model="arrivalTimeReturnVal"
                                    :dot-size="24"
                                    :dotStyle="dotStyle"
                                    :railStyle="railStyle"
                                    :processStyle="processStyle"
                                    :tooltipStyle="tooltipStyle"
                                    :min="minArrivalReturn"
                                    :max="maxArrivalReturn"
                                    :interval="60"
                                    :enable-cross="false"
                                    :lazy="true"
                                    tooltip="always"
                                    :tooltip-formatter="dateFormat"
                                    @change="sliderValueChange"
                                />
                            </div>
                        </v-card>
                    </v-menu>
                </div>
            </template>

            <!-- sortting filter -->
            <div class="single-filter">
                <v-menu
                    :close-on-content-click="true"
                    :nudge-width="200"
                    offset-y
                >
                    <template v-slot:activator="{ on, attrs }">
                        <h5 v-bind="attrs" v-on="on">
                            SortBy
                            <i class="fas fa-caret-down"></i>
                        </h5>
                    </template>

                    <v-card>
                        <ul class="filterCheckbox">
                            <v-radio-group v-model="sortByModel">
                                <v-radio
                                    v-for="(item, i) in sortByOption"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.value"
                                ></v-radio>
                            </v-radio-group>
                        </ul>
                    </v-card>
                </v-menu>
            </div>
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import flightHelper from '@/helper/flightHelper';
import cartHelper from '@/helper/addCartHelper';
import { mapState } from 'vuex';

import { evBus } from '@/services/bus.js';
export default {
    name: 'DesktopFilters',
    props: ['inputSliderValues', 'flightType', 'resetFormValues'],
    mixins: [flightHelper, cartHelper],
    components: {
        VueSlider
    },
    data() {
        return {
            airline: [],
            stops: [],
            alliance: [],
            sortByModel: 'totalPrice-asc-false',
            fType: ''
        };
    },
    mounted() {

        this.setDefaults();
        
        evBus.$on('flightType',(type)=>{

           this.fType=type;
           this.setFilter();
        });

        evBus.$emit('doMakeCallFilter');

    },
    methods: {
        updateFilter() {
            this.alliance = [];
            this.stops = [];
            this.airline = [];
            this.sortByModel = 'totalPrice-asc-false';
            this.setDefaults();
        },
        setFilter() {
            this.setDefaults();
        },
        sendDataFilters(val) {
            let data = {
                durationVal: this.durationVal,
                priceRangeVal: this.priceRangeVal,
                departureTimeVal: this.departureTimeVal,
                arrivalTimeVal: this.arrivalTimeVal,
                departureTimeReturnVal: this.departureTimeReturnVal,
                arrivalTimeReturnVal: this.arrivalTimeReturnVal,
                airline: this.airline,
                stops: this.stops,
                alliance: this.alliance,
                sortBy: val
            };

            this.$emit('onSliderValues', data);

            return true;
        },
        checkboxSearchFilter(event, type) {
            if (!event) return;
            if (type == 'airline') {
                this.airline = event;
            }

            if (type == 'stop') {
                this.stops = event;
            }

            if (type == 'alliance') {
                this.alliance = event;
            }
            this.sendDataFilters(this.sortByModel);
            this.inputSliderValues();
        },
        sliderValueChange() {
            this.sendDataFilters(this.sortByModel);
            this.inputSliderValues();
        },
        sortByModelChange(val) {
            if (this.sendDataFilters(val));
            this.inputSliderValues();
        }
    },
    computed: {
        ...mapState({
            flights: state => state.flightStore.flights
        }),
        currencySymbol() {
            return this.$store.state.envStore.CSymbol;
        }
    },
    watch: {
        sortByModel(newVal) {
            this.sortByModelChange(newVal);
        },
        flightType() {
            this.airline = [];
            this.stops = [];
            this.alliance = [];
            this.sortByModel = 'totalPrice-asc-false';
            this.resetDefault();
            this.$forceUpdate();
        },
        airlines() {
            this.$forceUpdate();
        },
        resetFormValues(val) {
            if (val) {
                this.updateFilter();
            }
        }
    }
};
</script>

<style></style>
