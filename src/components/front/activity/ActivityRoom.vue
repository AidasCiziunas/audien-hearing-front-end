<template>
    <div>
        <v-row>
            <!--
                                <div class="col-md-12 listArea">
                            -->

            <div
                v-bind:class="[
                    bookingExist == true ? 'nnn col-lg-9' : 'col-lg-12'
                ]"
            >
                <div
                    v-for="(room, topIndex) in activityDetail"
                    class="room-listing"
                    :key="topIndex"
                >
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <div class="single-listing-repeat">
                                <div class="single-listing">
                                    <div
                                        class="main-left car-left-box hotel-main-left"
                                    >
                                        <div class=" hotel-outer-left">
                                            <div
                                                class="product-text hotel-product-text"
                                            ></div>
                                            <div
                                                class="product-img"
                                                v-if="
                                                    activityDetail.pictures
                                                        .Picture
                                                "
                                            >
                                                <v-carousel
                                                    height="auto"
                                                    hide-delimiters
                                                >
                                                    <v-carousel-item
                                                        v-for="(item,
                                                        i) in activityDetail
                                                            .pictures.Picture"
                                                        :key="i"
                                                    >
                                                        <v-img
                                                            :src="item.FullSize"
                                                            aspect-ratio="1"
                                                        ></v-img>
                                                    </v-carousel-item>
                                                </v-carousel>
                                                <Slider
                                                    v-if="
                                                        activityDetail.pictures
                                                            .Picture
                                                    "
                                                    :slides="
                                                        activityDetail.pictures
                                                            .Picture
                                                    "
                                                />
                                            </div>
                                            <div class="product-img" v-else>
                                                <img
                                                    :src="
                                                        require('@/assets/images/missing-image.jpg')
                                                            .default
                                                    "
                                                />
                                            </div>
                                        </div>

                                        <div
                                            class="outer-right hotel-outer-right flex-coloumn"
                                        >
                                      
                                            <div class="cancellation-box">
                                                <p>
                                                    <b>Cancellation Fee : </b>

                                                    after
                                                    {{
                                                        room.cancelPolicy
                                                            .datesFees[0].after
                                                            | formatDate
                                                    }}
                                                    Fee: {{ globalData.CSymbol
                                                    }}{{
                                                        room.cancelPolicy
                                                            .datesFees[0].fee
                                                    }}
                                                    <a
                                                        href="#"
                                                        @click="
                                                            doCancelPolicyPopUp(
                                                                room,
                                                                'hotel'
                                                            )
                                                        "
                                                    >
                                                        Cancellation Policy
                                                    </a>
                                                </p>
                                            </div>
                                            <div
                                                class="cancellation-box"
                                                v-if="
                                                    taxesAndFeesValues(
                                                        room.taxesAndFees
                                                            ? room.taxesAndFees
                                                            : []
                                                    ).length > 0 &&
                                                        room.chargeReq ==
                                                            'ImmediatePayment'
                                                "
                                            >
                                                <p>
                                                    <b>Included: </b>
                                                    <span
                                                        v-for="(tnd,
                                                        index) in taxesAndFeesPercentage(
                                                            room.taxesAndFees
                                                                ? room.taxesAndFees
                                                                : []
                                                        )"
                                                        :key="'tax' + index"
                                                    >
                                                        {{
                                                            tnd.FeeTitle
                                                                | formateTitle
                                                        }}
                                                        {{ tnd.Currency }}
                                                        {{
                                                            tnd.Value.toFixed(2)
                                                        }}

                                                        {{ tnd.Value }}
                                                        {{
                                                            tnd.IsValuePercentage ==
                                                            'true'
                                                                ? '%'
                                                                : ''
                                                        }}
                                                        {{ tnd.FrequencyType }}
                                                        {{ tnd.UnitType }}
                                                    </span>
                                                </p>
                                            </div>
                                            <div
                                                v-if="
                                                    taxesAndFeesValues(
                                                        room.taxesAndFees
                                                            ? room.taxesAndFees
                                                            : []
                                                    ).length > 0 &&
                                                        room.chargeReq ==
                                                            'ImmediatePayment'
                                                "
                                                class="cancellation-box"
                                            >
                                                <p>
                                                    <b>Included: </b>
                                                    <span
                                                        v-for="(tnd,
                                                        index) in taxesAndFeesValues(
                                                            room.taxesAndFees
                                                                ? room.taxesAndFees
                                                                : []
                                                        )"
                                                        :key="'v' + index"
                                                    >
                                                        {{
                                                            tnd.FeeTitle
                                                                | formateTitle
                                                        }}
                                                        {{ tnd.Currency }}
                                                        {{
                                                            tnd.Value.toFixed(2)
                                                        }}

                                                        {{ tnd.Value }}
                                                        {{
                                                            tnd.IsValuePercentage ==
                                                            'true'
                                                                ? '%'
                                                                : ''
                                                        }}
                                                        {{ tnd.FrequencyType }}
                                                        {{ tnd.UnitType }}
                                                    </span>
                                                </p>
                                            </div>
                                            <div
                                                v-if="
                                                    taxesAndFeesValueMerged(
                                                        room.taxesAndFees
                                                            ? room.taxesAndFees
                                                            : []
                                                    ).length > 0 &&
                                                        room.chargeReq ==
                                                            'ImmediatePayment'
                                                "
                                                class="cancellation-box"
                                            >
                                                <p>
                                                    <b>Included: </b>
                                                    <span
                                                        v-for="(tnd,
                                                        index) in taxesAndFeesValueMerged(
                                                            room.taxesAndFees
                                                                ? room.taxesAndFees
                                                                : []
                                                        )"
                                                        :key="'p' + index"
                                                    >
                                                        {{
                                                            tnd.FeeTitle
                                                                | formateTitle
                                                        }}
                                                        {{ tnd.Currency }}
                                                        {{
                                                            tnd.Value.toFixed(2)
                                                        }}
                                                        {{
                                                            tnd.IsValuePercentage ==
                                                            'true'
                                                                ? '%'
                                                                : ''
                                                        }}
                                                        {{ tnd.FrequencyType }}
                                                        {{ tnd.UnitType }}
                                                    </span>
                                                </p>
                                            </div>
                                            <div
                                                v-if="
                                                    taxesAndFeesExcluded(
                                                        room.taxesAndFees
                                                            ? room.taxesAndFees
                                                            : []
                                                    ).length > 0 &&
                                                        room.chargeReq ==
                                                            'ImmediatePayment'
                                                "
                                                class="cancellation-box"
                                            >
                                                <p>
                                                    <b>Included: </b>
                                                    <span
                                                        v-for="(tnd,
                                                        index) in taxesAndFeesExcluded(
                                                            room.taxesAndFees
                                                                ? room.taxesAndFees
                                                                : []
                                                        )"
                                                        :key="'v' + index"
                                                    >
                                                        {{
                                                            tnd.FeeTitle
                                                                | formateTitle
                                                        }}
                                                        {{ tnd.Currency }}
                                                        {{
                                                            tnd.Value.toFixed(2)
                                                        }}

                                                        {{ tnd.Value }}
                                                        {{
                                                            tnd.IsValuePercentage ==
                                                            'true'
                                                                ? '%'
                                                                : ''
                                                        }}
                                                        {{ tnd.FrequencyType }}
                                                        {{ tnd.UnitType }}
                                                    </span>
                                                </p>
                                            </div>

                                            <div
                                                class="cancellation-box"
                                                v-if="
                                                    room.chargeReq == 'Deposit'
                                                "
                                            >
                                                <p>
                                                    The deposit amount varies by
                                                    hotel and can be up to the
                                                    total amount for the stay.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="main-right hotel-main-right">
                                        <div
                                            class="product-reverse hotel-product-reverse"
                                        >
                                        <p class="status-blue">{{ room.refundability }}</p>
                                             
                                            <h2>
                                                $
                                                <span>
                                                    {{ room.finalPrice }}
                                                </span>
                                            </h2>
                                            <p>
                                                Total for
                                                {{ totalNights }} nights
                                            </p>
                                            <v-btn
                                                color="error"
                                                class="btn-save"
                                                @click="
                                                    addHotelToCart(
                                                        room,
                                                        'hotel'
                                                    )
                                                "
                                            >
                                                Add To Cart
                                            </v-btn>
                                            <p class="status-blue"
                                                v-if="
                                                    room.rooms[0].chargeReq ==
                                                        'ImmediatePayment'
                                                "
                                                >Book Now, Pay Now
                                            </p>

                                            <v-expansion-panel-header
                                                @click="
                                                    hotelExpand != topIndex
                                                        ? (hotelExpand = topIndex)
                                                        : (hotelExpand = -1);
                                                    hoteltab = 'tab-1';
                                                "
                                            >
                                                <div class="collpase-heading">
                                                    <span
                                                        v-if="
                                                            hotelExpand ==
                                                                topIndex
                                                        "
                                                        >Hide Details</span
                                                    >
                                                    <span
                                                        v-if="
                                                            hotelExpand !=
                                                                topIndex
                                                        "
                                                        >Show Details</span
                                                    >
                                                </div>
                                            </v-expansion-panel-header>
                                        </div>
                                    </div>
                                </div>

                                <v-expansion-panel-content>
                                    <div class="car-listing-tabs-outer">
                                        <div class="car-listing-tabs">
                                            <v-tabs
                                                background-color="primary"
                                                class="tabs-car-ul"
                                                v-model="hoteltab"
                                            >
                                                <v-tab href="#tab-1">
                                                    <span>OVERVIEW</span>
                                                </v-tab>
                                                <v-tab href="#tab-2">
                                                    <span>GALLERY</span>
                                                </v-tab>
                                                <v-tab href="#tab-3">
                                                    <span>FACILITIES</span>
                                                </v-tab>

                                                <v-tab href="#tab-7">
                                                    <span>CANCELLATION</span>
                                                </v-tab>
                                            </v-tabs>

                                            <div class="tabs-text-content">
                                                <v-tabs-items
                                                    v-model="hoteltab"
                                                >
                                                    <v-tab-item value="tab-1">
                                                        <p
                                                            v-if="
                                                                room.rooms[0]
                                                                    .roomContent
                                                                    .description
                                                            "
                                                            v-html="
                                                                room.rooms[0]
                                                                    .roomContent
                                                                    .description
                                                            "
                                                        ></p>
                                                        <p v-else>
                                                            Unfortunately, our
                                                            supplier has not
                                                            provided any package
                                                            details.
                                                        </p>
                                                    </v-tab-item>
                                                    <v-tab-item value="tab-2">
                                                        <div
                                                            v-if="
                                                                activityDetail
                                                                    .pictures
                                                                    .Picture
                                                            "
                                                            class="gallery-slider-box"
                                                        >
                                                            <Slider
                                                                v-if="
                                                                    activityDetail
                                                                        .pictures
                                                                        .Picture
                                                                "
                                                                :slides="
                                                                    activityDetail
                                                                        .pictures
                                                                        .Picture
                                                                "
                                                            />
                                                        </div>
                                                        <div v-else>
                                                            <p>
                                                                Unfortunately,
                                                                our supplier has
                                                                not provided any
                                                                package details.
                                                            </p>
                                                        </div>
                                                    </v-tab-item>
                                                    <v-tab-item value="tab-3">
                                                        <div
                                                            class="product-varify hotel-product-varify  choose-room"
                                                        >
                                                            <ul
                                                                v-if="
                                                                    getAmenity(
                                                                        topIndex
                                                                    )
                                                                "
                                                            >
                                                                <li
                                                                    v-for="(amenity,
                                                                    index) in getAmenity(
                                                                        topIndex
                                                                    )"
                                                                    :key="index"
                                                                >
                                                                    <i
                                                                        class="fas fa-check"
                                                                    ></i>
                                                                    {{
                                                                        amenity
                                                                    }}
                                                                </li>
                                                            </ul>
                                                            <p v-else>
                                                                Unfortunately,
                                                                our supplier has
                                                                not provided any
                                                                package details.
                                                            </p>
                                                        </div>
                                                    </v-tab-item>

                                                    <v-tab-item value="tab-7">
                                                        <div
                                                            v-if="
                                                                room.cancelPolicy
                                                            "
                                                        >
                                                            <p>
                                                                after
                                                                {{
                                                                    room
                                                                        .cancelPolicy
                                                                        .datesFees[0]
                                                                        .after
                                                                        | formatDate
                                                                }}
                                                                Fee:
                                                                {{
                                                                    globalData.CSymbol
                                                                }}{{
                                                                    room
                                                                        .cancelPolicy
                                                                        .datesFees[0]
                                                                        .fee
                                                                }}
                                                            </p>
                                                            <p
                                                                v-html="
                                                                    room
                                                                        .cancelPolicy
                                                                        .remarks
                                                                "
                                                            ></p>
                                                        </div>
                                                        <p v-else>
                                                            Unfortunately, our
                                                            supplier has not
                                                            provided any package
                                                            details.
                                                        </p>
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
            </div>

            <!--adding trip summary-->
            <TripSummary />
        </v-row>
    </div>
</template>
<script>
import Slider from '@/components/front/hotels/Slider';
import moment from 'moment';
import _ from 'lodash';
import { mapState } from 'vuex';
import cartHelper from '@/helper/addCartHelper';
import TripSummary from '@/components/common/widgets/TripSummary.vue';

import { evBus } from '@/services/bus.js';

export default {
    components: {
        Slider,
        TripSummary
    },
    name: 'HotelRoom',
    mixins: [cartHelper],
    props: ['activityDetail'],
    data() {
        return {
            hotelExpand: -1,
            hoteltab: null,

            possibleValues: [
                // { Value: "Other", name: "Other" },
                {
                    Value: 'NotApplicable',
                    name: 'Not Applicable'
                },
                {
                    Value: 'NotSpecified',
                    name: 'Not Specified'
                },
                {
                    Value: 'PerMinute',
                    name: 'Per Minute'
                },
                {
                    Value: 'PerHour',
                    name: 'Per Hour'
                },
                {
                    Value: 'PerStay',
                    name: 'Per Stay'
                },
                {
                    Value: 'PerHalfDay',
                    name: 'Per Half Day'
                },
                {
                    Value: 'PerNight',
                    name: 'Per Night'
                },
                {
                    Value: 'PerWeek',
                    name: 'Per Week'
                },
                {
                    Value: 'PerChild',
                    name: 'Per Child'
                },
                {
                    Value: 'PerAdult',
                    name: 'Per Adult'
                },
                {
                    Value: 'PerRoom',
                    name: 'Per Room'
                },
                {
                    Value: 'PerPerson',
                    name: 'Per Person'
                },
                {
                    Value: 'PerOccurrence',
                    name: 'Per Occurrence'
                },
                {
                    Value: 'PerItem',
                    name: 'Per Item'
                },
                {
                    Value: 'PerReservation',
                    name: 'Per Reservation'
                }
            ]
        };
    },
    filters: {
        formatDate: function(value) {
            return moment(value).format('MM/DD/YYYY');
        },
        imagePath: function(value) {
            let path = value.split('http');
            return 'http' + ':' + path[1];
        },
        formateTitle(value) {
            return value.split('_').join(' ');
        }
    },
    mounted() {
        this.focusedEngine = 'activitiy';
    },

    methods: {
        getAmenity(index) {
            let amenities = [];
            this.packages[index].rooms.forEach(item => {
                if (item.roomContent.amenities) {
                    item.roomContent.amenities.forEach(aminity => {
                        amenities.push(aminity);
                    });
                }
            });
            return amenities;
        },
        getImages(index) {
            let images = [];

            this.packages[index].rooms.forEach(item => {
                if (item.roomContent.images) {
                    item.roomContent.images.forEach(image => {
                        images.push({
                            img: image.split('//') + '://' + image.split('//')
                        });
                    });
                }
            });
            return images;
        },
        openCheckOutPopUp: function(engine, infos) {
            let _allHotels = this.doCleanArray(
                    this.$store.state.hotelStore.hotels
                ),
                _filterHotel = this.doCleanArray(
                    this.$store.state.hotelStore.searchData
                ),
                _checkedHotel = _allHotels.find(o => {
                    if (o.hotelId == infos.hotelId) return true;
                });

            infos.hotel = _checkedHotel;
            infos.roomDetails = _filterHotel.rooms;
            infos.pdate = _filterHotel.checkinDate;
            infos.plocationName = _filterHotel.destination;
            infos.ptime = moment(_filterHotel.checkinDate, 'X').format(
                'HH:mm:ss'
            );
            infos.ddate = _filterHotel.checkoutDate;
            infos.dlocationName = _filterHotel.destination;
            infos.dtime = moment(_filterHotel.checkoutDate, 'X').format(
                'HH:mm:ss'
            );
            infos.engineId = infos.hotelId;
            infos.Id = infos.room.packageId;
            infos.roomId = infos.room.roomId;
            infos.remaining = [39, 59];
            infos.expire = false;
            infos.showTimes = true;

            let cader = {
                engine: engine,
                item: infos
            };

            this.$store.dispatch('setCartUpComings', {
                UPCOMINGS: cader
            });
            evBus.$emit('openCheckOutPopUp', engine, infos);
            this.doClosePop();
        },
        addHotelToCart(roomItem, engine) {
            let _hotelId = this.$route.params.id;

            this.openAddCartPopUpForCar(_hotelId, roomItem, engine);

            /*
                let reqHeaders = {headers: {
                    "Content-Type": "application/x-www-form-urlencoded"}
                };

                let reqDataForm = new FormData(),
                    _hotelId = this.$route.params.id;
                reqDataForm.append("sessionId", this.HotelStore.sessionId);
                reqDataForm.append("hotelId", _hotelId);

                hotelServices.getHotelDetail((reqHeaders, reqDataForm)).then(response => {

                    if(response.data.errors.message=='Session is expired.') {

                        this.$awn.success("Your being timed out due to inactivity, Please try View Hotel again !");
                        this.$emit('resetSearch', _hotelId);

                    } else if(response.data.message=='Hotel Package not found! Please try again later.') {

                        this.$awn.alert("We have not received the details needed from our supplier to view this hotel . Please select another hotel.");

                    } else {
                        this.openAddCartPopUpForCar(_hotelId, roomItem, engine);
                    }

                });
            */
        },
        getSliderImage(images) {
            return images.map(item => ({
                img: item.split('//')[0] + '://' + item.split('//')[1]
            }));
        },

        setTaxesAndFees(taxesAndFees) {
            let TandFArray = [];
            for (const TandF of taxesAndFees) {
                TandF.FeeTitle = TandF.FeeTitle.split('_').join(' ');
                if (TandF.FrequencyType == TandF.UnitType) {
                    const PV = this.possibleValues.find(
                        PV => PV.Value == TandF.FrequencyType
                    );
                    if (PV) {
                        TandF.FrequencyType = PV.name;
                    }
                    TandF.UnitType = '';
                } else {
                    const PVFT = this.possibleValues.find(
                        PV => PV.Value == TandF.FrequencyType
                    );
                    const PVUT = this.possibleValues.find(
                        PV => PV.Value == TandF.UnitType
                    );
                    if (PVFT && PVUT) {
                        TandF.FrequencyType = PVFT.name;
                        TandF.UnitType = PVUT.name;
                    } else if (PVFT && !PVUT) {
                        TandF.FrequencyType = PVFT.name;
                        if (TandF.UnitType == 'Other') {
                            TandF.UnitType = '';
                        }
                    } else if (!PVFT && PVUT) {
                        TandF.UnitType = PVUT.name;
                        if (TandF.FrequencyType == 'Other') {
                            TandF.FrequencyType = '';
                        }
                    }
                }
                TandFArray.push(TandF);
            }
            return TandFArray;
        },
        taxesAndFeesPercentage: function(value) {
            if (value.length == 0) {
                return [];
            }
            let feeAndTaxes = this.setTaxesAndFees(value);
            let item = _.without(
                _.map(feeAndTaxes, function(o) {
                    if (
                        o.IsValuePercentage === 'true' &&
                        o.IsIncludedInPrice === 'true'
                    )
                        return o;
                }),
                undefined
            );

            return item;
        },
        taxesAndFeesValues: function(value) {
            if (value.length == 0) {
                return [];
            }
            let feeAndTaxes = this.setTaxesAndFees(value);

            let item = _.without(
                _.map(feeAndTaxes, function(o) {
                    if (
                        o.IsValuePercentage === 'true' &&
                        o.IsIncludedInPrice === 'true'
                    )
                        return o;
                }),
                undefined
            );

            return item;
        },
        taxesAndFeesValueMerged: function(value) {
            if (value.length == 0) {
                return [];
            }
            let feeAndTaxes = this.setTaxesAndFees(value);
            let item = _(feeAndTaxes)
                .groupBy('FeeTitle')
                .map((objs, key) => ({
                    ...objs[0],
                    FeeTitle: key,
                    Value: _.sumBy(objs, obj => Number(obj.Value))
                }))
                .value();

            return item;
        },

        taxesAndFeesExcluded: function(value) {
            if (value.length == 0) {
                return [];
            }
            let item = _.without(
                _.map(value, function(o) {
                    if (!o.IsIncludedInPrice || o.IsIncludedInPrice === 'false')
                        return o;
                }),
                undefined
            );
            return item;
        },

        getFirstImage: function(value) {
            let path = value;
            return path.split('//')[0] + '://' + path.split('//')[1];
        }
    },
    computed: {
        ...mapState({
            globalData: state => state.envStore,
            ActivityStore: state => state.ActivityStore,
            searchData: state => state.ActivityStore.searchData
        })
    }
};
</script>
