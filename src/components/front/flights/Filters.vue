<template>
    <div>
        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            style="z-index: 10000"
            transition="dialog-bottom-transition"
        >
            <v-card class="filter-main-popup">
                <v-toolbar light>
                    <v-btn icon @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <h6>FILTERS</h6>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                            text
                            @click="resetFilter"
                            class="filter-popup-clear-btn"
                        >
                            Clear All
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <div class="filter-popup-body">
                    <div class="filter-popup-body-inner">
                        <div class="filter-list">
                            <div class="filter-title">
                                <h4>Stops</h4>
                                <a @click="stops = []"> Clear </a>
                            </div>
                            <ul class="filter-item-list">
                                <li
                                    v-for="(stop, index) in stopsList"
                                    :key="index"
                                >
                                    <div class="in-left">
                                        <p>{{ stop.label }}</p>
                                    </div>
                                    <div class="in-right">
                                        <v-checkbox
                                            :key="`${index}-${stop.label}`"
                                            :value="stop.price"
                                            color="primary"
                                            v-model="stops"
                                        ></v-checkbox>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div class="filter-list">
                            <div class="filter-title">
                                <h4>Airlines</h4>
                                <a @click="airline = []">Clear</a>
                            </div>
                            <ul class="filter-item-list" v-if="airlines.length">
                                <li v-for="(item, i) in airlines" :key="i">
                                    <div class="in-left">
                                        <p>{{ item.name }}</p>
                                    </div>
                                    <div class="in-right">
                                        <v-checkbox
                                            :key="`${i}-${item.name}`"
                                            :value="item.iata"
                                            v-model="airline"
                                            color="primary"
                                        ></v-checkbox>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div class="filter-list">
                            <div class="filter-title">
                                <h4>Alliances</h4>
                                <a @click="alliance = []">Clear</a>
                            </div>
                            <ul class="filter-item-list">
                                <li
                                    v-for="(item, i) in [
                                        'oneworld',
                                        'skyteam',
                                        'staralliance'
                                    ]"
                                    :key="i"
                                >
                                    <div class="in-left">
                                        <p>{{ item }}</p>
                                    </div>
                                    <div class="in-right">
                                        <v-checkbox
                                            :value="item"
                                            v-model="alliance"
                                            color="primary"
                                        ></v-checkbox>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div class="filter-list">
                            <div class="filter-title">
                                <h4>Price Range</h4>
                            </div>
                            <div class="slider">
                                <vue-slider
                                    :dot-size="24"
                                    :dotStyle="dotStyle"
                                    :railStyle="railStyle"
                                    :processStyle="processStyle"
                                    :tooltipStyle="tooltipStyle"
                                    v-model="priceRangeVal"
                                    :min="Number(priceRange.minPrice)"
                                    :max="Number(priceRange.maxPrice)"
                                    :interval="0.01"
                                    :enable-cross="false"
                                    :lazy="true"
                                    tooltip="always"
                                    :tooltip-formatter="
                                        val => currencySymbol + val
                                    "
                                />
                            </div>
                        </div>

                       
                        <div
                            class="filter-list"
                           
                        >
                            <div class="filter-title">
                                <h4>Duration</h4>
                            </div>
                            <div class="slider">
                                <vue-slider
                                   v-model="durationVal"
                                    :min="minDuration"
                                    :max="maxDuration"
                                    :dot-size="24"
                                    :dotStyle="dotStyle"
                                    :railStyle="railStyle"
                                    :processStyle="processStyle"
                                    :tooltipStyle="tooltipStyle"
                                    :interval="0.01"
                                    :enable-cross="false"
                                    :lazy="true"
                                    tooltip="always"
                                    :tooltip-formatter="val => val + ' hrs'"
                                />
                            </div>
                        </div>
                        <div
                            class="filter-list"
                            v-if="flightTypeStore == 'oneWay'"
                        >
                            <div class="filter-title">
                                <h4>Departure Time</h4>
                            </div>
                            <div class="slider">
                                <vue-slider
                                    v-model="departureTimeVal"
                                    :dot-size="24"
                                    :dotStyle="dotStyle"
                                    :railStyle="railStyle"
                                    :processStyle="processStyle"
                                    :tooltipStyle="tooltipStyle"
                                    :min="minDepart"
                                    :max="maxDepart"
                                    :interval="0.01"
                                    :enable-cross="false"
                                    :lazy="true"
                                    tooltip="always"
                                    :tooltip-formatter="dateFormat"
                                />
                            </div>
                        </div>

                        <div
                            class="filter-list"
                            v-if="flightTypeStore == 'oneWay'"
                        >
                            <div class="filter-title">
                                <h4>Arrival Time</h4>
                            </div>
                            <div class="slider">
                                <vue-slider
                                    v-model="arrivalTimeVal"
                                    :dot-size="24"
                                    :dotStyle="dotStyle"
                                    :railStyle="railStyle"
                                    :processStyle="processStyle"
                                    :tooltipStyle="tooltipStyle"
                                    :min="minArrivalTime"
                                    :max="maxArrivalTime"
                                    :interval="0.01"
                                    :enable-cross="false"
                                    :lazy="true"
                                    tooltip="always"
                                    :tooltip-formatter="dateFormat"
                                />
                            </div>
                        </div>

                        <div
                            class="filter-list"
                            v-if="flightTypeStore != 'oneWay'"
                        >
                            <div class="filter-title">
                                <h4>Outbound Flight</h4>
                            </div>
                            <p>Departure Time</p>
                            <div class="slider">
                                <vue-slider
                                    :dot-size="24"
                                    :dotStyle="dotStyle"
                                    :railStyle="railStyle"
                                    :processStyle="processStyle"
                                    :tooltipStyle="tooltipStyle"
                                    v-model="departureTimeVal"
                                    :min="minDepart"
                                    :max="maxDepart"
                                    :interval="0.01"
                                    :enable-cross="false"
                                    :lazy="true"
                                    tooltip="always"
                                    :tooltip-formatter="dateFormat"
                                />
                            </div>
                            <span class="sub-heading">Arrival Time</span>

                            <div class="slider">
                                <vue-slider
                                    v-model="arrivalTimeVal"
                                    :dot-size="24"
                                    :dotStyle="dotStyle"
                                    :railStyle="railStyle"
                                    :processStyle="processStyle"
                                    :tooltipStyle="tooltipStyle"
                                    :min="minArrivalTime"
                                    :max="maxArrivalTime"
                                    :interval="0.01"
                                    :enable-cross="false"
                                    :lazy="true"
                                    tooltip="always"
                                    :tooltip-formatter="dateFormat"
                                />
                            </div>
                        </div>

                        <div
                            class="filter-list"
                            v-if="flightTypeStore != 'oneWay'"
                        >
                            <div class="filter-title">
                                <h4>Inbound Flight (Return)</h4>
                            </div>
                            <p>Departure Time</p>
                            <div class="slider">
                                <vue-slider
                                    v-model="departureTimeReturnVal"
                                    :dot-size="24"
                                    :dotStyle="dotStyle"
                                    :railStyle="railStyle"
                                    :processStyle="processStyle"
                                    :tooltipStyle="tooltipStyle"
                                    :min="minDepartReturn"
                                    :max="maxDepartReturn"
                                    :interval="0.01"
                                    :enable-cross="false"
                                    :lazy="true"
                                    tooltip="always"
                                    :tooltip-formatter="dateFormat"
                                />
                            </div>
                            <span class="sub-heading">Arrival Time</span>
                            <div class="slider">
                                <vue-slider
                                    v-model="arrivalTimeReturnVal"
                                    :dot-size="24"
                                    :dotStyle="dotStyle"
                                    :railStyle="railStyle"
                                    :processStyle="processStyle"
                                    :tooltipStyle="tooltipStyle"
                                    :min="minArrivalReturn"
                                    :max="maxArrivalReturn"
                                    :interval="0.01"
                                    :enable-cross="false"
                                    :lazy="true"
                                    tooltip="always"
                                    :tooltip-formatter="dateFormat"
                                />
                            </div>
                        </div>
                    </div>
                    <v-btn
                        color="primary"
                        class="filter-popup-fix-btn"
                        @click="updated()"
                    >
                        <img
                            src="@/assets/images/car-filter-btn-img.png"
                            alt="img"
                        />
                        See all {{ flightsCount }} Flights
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';
import flightHelper from '@/helper/flightHelper.js';
import { evBus } from '@/services/bus.js';
import { mapState } from 'vuex';

export default {
    name: 'Filters',
    props: ['value', 'search', 'resetFormValues'],
    components: {
        VueSlider
    },
    mixins: [flightHelper],
    data() {
        return {
            airline: [],
            stops: [],
            results: [],
            alliance: [],

            //for styling time slider

            labelStyle: {
                top: '-45px',
                'font-size': '13px',
                'margin-top': '10px',
                background: '#3d4ed7',
                color: 'white',
                padding: '2px 4px'
            },
            style: {
                background: '#3d4ed7'
            },

            stopsList: [
                {
                    label: '0 stop',
                    price: '0'
                },
                {
                    label: '1 stop',
                    price: '1'
                },
                {
                    label: '2 stops',
                    price: '2'
                },
                {
                    label: '3 stops',
                    price: '3'
                },
                {
                    label: '4 stops',
                    price: '4'
                }
            ]
        };
    },
    mounted() {

        this.setDefaults();

        evBus.$on('resetMobileFilters', () => {
            this.resetFilter();
        });
        
    },

    methods: {
        updateFilter() {
            this.alliance = [];
            this.stops = [];
            this.airline = [];
            this.setDefaults();
        },
        resetFilter() {

            this.alliance = [];
            this.stops = [];
            this.airline = [];
            this.setDefaults();
        },
        updated() {
            let data = {
                airline: this.airline,
                stops: this.stops,
                alliance: this.alliance,
                priceRangeVal: this.priceRangeVal,
                durationVal: this.durationVal,
                departureTimeVal: this.departureTimeVal,
                arrivalTimeVal: this.arrivalTimeVal,
                departureTimeReturnVal: this.departureTimeReturnVal,
                arrivalTimeReturnVal: this.arrivalTimeReturnVal
            };

            console.log('onFilterData 406 filter.vue', data);

            this.$emit('onFilterData', data);
        }
    },
    computed: {
        ...mapState({
            flightTypeStore: state => state.flightStore.flightType,
            flightsCount: state => state.flightStore.flightCount
            // flights: state => state.flightStore.flights
        }),
        priceMarks() {
            return {
                [this.priceRange.minPrice]: {
                    label: this.currencySymbol + this.priceRange.minPrice,
                    labelStyle: this.labelStyle,
                    style: this.style
                },
                [this.priceRange.maxPrice]: {
                    label: this.currencySymbol + this.priceRange.maxPrice,
                    labelStyle: this.labelStyle,
                    style: this.style
                }
            };
        },
        durationMarks() {
            return {
                [this.minDuration]: {
                    label: this.minDuration + 'hrs',
                    labelStyle: this.labelStyle,
                    style: this.style
                },
                [this.maxDuration]: {
                    label: this.maxDuration + 'hrs',
                    labelStyle: this.labelStyle,
                    style: this.style
                }
            };
        },
        departureTimeMarks() {
            return {
                [this.minDepart]: {
                    label: this.dateFormat(this.minDepart),
                    labelStyle: this.labelStyle,
                    style: this.style
                },
                [this.maxDepart]: {
                    label: this.dateFormat(this.maxDepart),
                    labelStyle: this.labelStyle,
                    style: this.style
                }
            };
        },
        arrivalTimeMarks() {
            return {
                [this.minArrivalTime]: {
                    label: this.dateFormat(this.minArrivalTime),
                    labelStyle: this.labelStyle,
                    style: this.style
                },
                [this.maxArrivalTime]: {
                    label: this.dateFormat(this.maxArrivalTime),
                    labelStyle: this.labelStyle,
                    style: this.style
                }
            };
        },
        departReturnMarks() {
            return {
                [this.minDepartReturn]: {
                    label: this.dateFormat(this.minDepartReturn),
                    labelStyle: this.labelStyle,
                    style: this.style
                },
                [this.maxDepartReturn]: {
                    label: this.dateFormat(this.maxDepartReturn),
                    labelStyle: this.labelStyle,
                    style: this.style
                }
            };
        },
        arrivalReturnMarks() {
            return {
                [this.minArrivalReturn]: {
                    label: this.dateFormat(this.minArrivalReturn),
                    labelStyle: this.labelStyle,
                    style: this.style
                },
                [this.maxArrivalReturn]: {
                    label: this.dateFormat(this.maxArrivalReturn),
                    labelStyle: this.labelStyle,
                    style: this.style
                }
            };
        },

        dialog: {
            get: function() {
                return this.value;
            },
            set: function(val) {
                this.$emit('input', val);
            }
        }
    },
    watch: {
        resetFormValues(val) {
            if (val) {
                this.updateFilter();
                this.$forceUpdate();
            }
        },
        airlines() {
            this.$forceUpdate();
        }
    }
};
</script>

<style scoped>
.sub-heading {
    padding: 15px 0;
}
.right-padding {
    padding-right: 30px;
}
.price-label {
    justify-content: center;
    align-items: center;
}
.price-label .value {
    padding-right: 5px;
    font-size: 14px;
}
.show_more {
    font-weight: bold;
    color: #3030cc;
    cursor: pointer;
}
.slider {
    padding: 30px 15px 5px 15px;
}
.accordian-list {
    padding: 5px 0px;
    border-bottom: 1px solid #dee1e5;
}
.accordian-list .title {
    font-size: 18px;
    font-weight: 600;
    list-style: none;
    font-family: 'Work Sans', sans-serif;
    color: #5d6165;
}
.vue-slider-ltr .vue-slider-mark-label,
.vue-slider-rtl .vue-slider-mark-label {
    top: -41px;
    margin-top: 10px;
    background: black;
    color: white;
    padding: 2px 3px;
}
</style>
