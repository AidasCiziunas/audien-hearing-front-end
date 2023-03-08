<template>
    <div>
        <v-row>
            <div
                v-bind:class="[
                    (bookingExist == true && defaultClass9Lg) ? 'nnn col-lg-9' : 'col-lg-12',
                ]"
            >
      
                <div
                    v-for="(room, topIndex) in packages"
                    :key="topIndex"
                    class="room-listing"
                > 
                    <v-expansion-panels>
                        <v-expansion-panel
                            v-for="(item, itemIndex) in room.rooms"
                            :key="itemIndex + 'item'"
                        >
                       
                            <div class="single-listing-repeat">
                                <div class="single-listing">
                                    <div
                                        class="
                                            main-left
                                            car-left-box
                                            hotel-main-left
                                        "
                                    >
                                        <div class="hotel-outer-left">
                                            <div
                                                class="
                                                    product-text
                                                    hotel-product-text
                                                "
                                            >
                                                <h3
                                                    class="
                                                        primary--text
                                                        font-14
                                                    "
                                                >
                                                    {{ item.roomName }}
                                                </h3>
                                                <p class="text-capitalize" v-if="item.roomBasis!='' && item.roomBasis!=null">
                                                    Room Basis :
                                                    {{
                                                        item.roomBasis
                                                            | removeShortForm
                                                    }}
                                                </p>
                                            </div>
                                      
                                           <div
                                                class="product-img"
                                                v-if="
                                                    roomImage(item.stdRoomId).length > 0
                                                "
                                            > 
                                                <v-carousel
                                                    height="auto220px"
                                                    hide-delimiters
                                                >
                                                    <v-carousel-item
                                                        v-for="(
                                                            item, i
                                                        ) in roomImage(item.stdRoomId)"
                                                        :key="i"
                                                    >
                                                        <v-img
                                                            :src="item.img"
                                                            aspect-ratio="1"
                                                        ></v-img>
                                                    </v-carousel-item>
                                                </v-carousel> 
                                              
                                             </div>  
                                           <div class="product-img" v-else>
                                                <img v-if="showAddCart"
                                                    :src="hotelimg"
                                                />
                                                
                                                <img v-if="!showAddCart" v-bind:src="hotelimg" alt="hotel" style="max-width: 307px; max-height: 203px"/>

                                            </div>
                                        </div>

                                        <div
                                            class="
                                                outer-right
                                                hotel-outer-right
                                                flex-coloumn
                                            "
                                        >
                                            <!-- start -->
                                            <div
                                                class="
                                                    product-reviews
                                                    hotel-product-reviews
                                                "
                                            >
                                                <div
                                                    class="
                                                        in-left
                                                        hotel-in-left
                                                    "
                                                >
                                                    <div
                                                        class="flex-coloumn"
                                                        style="
                                                            flex-direction: column;
                                                        "
                                                    >
                                                        <div>
                                                            <span
                                                                v-if="
                                                                    item.adults >
                                                                    0
                                                                "
                                                            >
                                                                <i
                                                                    class="
                                                                        fas
                                                                        fa-user-friends
                                                                    "
                                                                ></i>
                                                                {{
                                                                    item.adults >
                                                                    1
                                                                        ? item.adults +
                                                                          ' Adults '
                                                                        : item.adults +
                                                                          ' Adult '
                                                                }}
                                                            </span>

                                                            <span
                                                                v-if="
                                                                    item.kidsAges &&
                                                                    item
                                                                        .kidsAges
                                                                        .length >
                                                                        0
                                                                "
                                                            >
                                                                &nbsp;+
                                                                <i
                                                                    class="
                                                                        fa
                                                                        fa-child
                                                                    "
                                                                ></i>
                                                                {{
                                                                    item
                                                                        .kidsAges
                                                                        .length
                                                                }}
                                                                {{
                                                                    item
                                                                        .kidsAges
                                                                        .length >
                                                                    1
                                                                        ? 'Children'
                                                                        : 'Child'
                                                                }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- end -->
                                            
                                            <!-- <div
                                                v-if="
                                                    item.roomContent
                                                        .specialDeals &&
                                                    item.roomContent
                                                        .specialDeals.length > 0
                                                "
                                                class="
                                                    product-specs
                                                    hotel-product-specs
                                                "
                                            >
                                                <h3>Special Deals</h3>
                                                <ul>
                                                    <li
                                                        v-for="(
                                                            specialDeal, index
                                                        ) in item.roomContent
                                                            .specialDeals"
                                                        :key="index"
                                                    >
                                                        <i
                                                            class="fas fa-check"
                                                        ></i>
                                                        {{ specialDeal }}
                                                    </li>
                                                </ul>
                                            </div> -->
                                            <!-- {{room.rooms[0].roomContent}} -->
                                            <!-- <div
                                                        v-if="room.rooms[0].roomContent.amenities && room.rooms[0].roomContent.amenities.length>0"
                                                            class="choose-room-aminities product-varify hotel-product-varify"
                                                        >
                                                            
                                                         
                                                        </div> -->
                                                       
                                            <div class="cancellation-box" v-if="room.cancelPolicy.length>0">
                                                <p>
                                                    <b>Cancellation Fee : </b>

                                                    Between {{ justFormatMyDate(room.cancelPolicy[0].datesFees[0].start, countryDF) }} to {{ justFormatMyDate(room.cancelPolicy[0].datesFees[0].after, countryDF) }}

                                                    Fee is {{CSymbol}}{{room.cancelPolicy[0]
                                                            .datesFees[0].fee}}

                                                    <a
                                                        href="#"
                                                        @click="
                                                            doCancelPolicyPopUp(
                                                                room,
                                                                'hotel'
                                                            )
                                                        "
                                                        style="display: block;"
                                                    >
                                                        Cancellation Policy
                                                    </a>
                                                </p>
                                                
                                            </div>
                                            <div
                                                class="cancellation-box"
                                                v-if="
                                                    taxesAndFeesPercentage(
                                                        room.taxesAndFees
                                                            ? room.taxesAndFees
                                                            : []
                                                    ).length > 0
                                                "
                                            >
                                            
                                                <p>
                                                    <b>Included: </b>
                                                    <span
                                                        class="text-capitalize"
                                                        v-for="(
                                                            tnd, index
                                                        ) in taxesAndFeesPercentage(
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
                                                            tnd.Value | toFixed
                                                        }}
                                                        {{
                                                            tnd.IsValuePercentage ==
                                                            'true'
                                                                ? '%'
                                                                : ''
                                                        }}
                                                        {{ tnd.FrequencyType }}
                                                        {{ tnd.UnitType }} 
                                                         <i   v-if="tnd.description!=null" :title="tnd.description"
                                                        class="fas fa-info-circle circle-icon" style="color: blue;position: relative;top: 1px;left: 2px;">
                                                        </i>
                                                    </span>
                                                </p>
                                            </div>
                                       
                                            <div
                                                v-if="
                                                    taxesAndFeesValueMerged(
                                                        room.taxesAndFees
                                                            ? room.taxesAndFees
                                                            : []
                                                    ).length > 0
                                                "
                                                class="cancellation-box"
                                            >
                                                <p>
                                                    <b>Included: </b>
                                                    <span
                                                        class="text-capitalize"
                                                        v-for="(
                                                            tnd, index
                                                        ) in taxesAndFeesValueMerged(
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
                                                            tnd.Value | toFixed
                                                        }}
                                                        {{
                                                            tnd.IsValuePercentage ==
                                                            'true'
                                                                ? '%'
                                                                : ''
                                                        }}
                                                        {{ tnd.FrequencyType }}
                                                        {{ tnd.UnitType }} 
                                                       
                                                        <i   v-if="tnd.description!=null" :title="tnd.description"
                                                        class="fas fa-info-circle circle-icon" style="color: blue;position: relative;top: 1px;left: 2px;">
                                                        </i>
                                                    </span>
                                                </p>
                                            </div>
                                             <div
                                                v-if="
                                                    taxesAndFeesExcluded(
                                                        room.taxesAndFees
                                                            ? room.taxesAndFees
                                                            : []
                                                    ).length > 0
                                                "
                                               
                                            >
                                            <div v-for="(
                                                            tnd, index
                                                        ) in taxesAndFeesExcluded(
                                                            room.taxesAndFees
                                                                ? room.taxesAndFees
                                                                : []
                                                        )"
                                                        :key="'v' + index"
                                                         class="cancellation-box"
                                                        >
                                                <p  >
                                                    <b>Not Included: </b>
                                                    <span
                                                       class="text-capitalize"
                                                    >
                                                        {{ tnd.FeeTitle}}

                                                        {{ tnd.Currency }}
                                                        {{
                                                            tnd.Value | toFixed
                                                        }}

                                                        {{
                                                            tnd.IsValuePercentage ==
                                                            'true'
                                                                ? '%'
                                                                : ''
                                                        }}
                                                        {{ tnd.FrequencyType }}
                                                        {{ tnd.UnitType }}  <i   v-if="tnd.description!=null" :title="tnd.description"
                                                        class="fas fa-info-circle circle-icon" style="color: blue;position: relative;top: 1px;left: 2px;">
                                                        </i>
                                                    </span>
                                                </p>
                                                </div>
                                            </div> 


                                            <div
                                                class="cancellation-box"
                                                v-if="
                                                    room.chargeReq != 'ImmediatePayment'
                                                "
                                            >
                                               <p><b>Payment, Taxes, and Fees Disclaimer:</b></p>
                                                <p>These charges, if applicable, will be payable by you to the hotel directly at checkout. When you check in, a credit card or, in the hotel’s discretion, a debit card, will be required to secure there charges and fees that you may incur during your stay. Please contact the hotel directly as to whether and which charges or service fees apply.</p>
                                                <p>
                                                    The deposit amount varies by
                                                    hotel, and can be up to the
                                                    total amount of the stay.
                                                </p>
                                                
                                            </div>
                                              <div
                                                class="cancellation-box"
                                                v-if="
                                                    room.includes.length > 0
                                                "
                                            >
                                                <p>
                                               <b>Included: </b>  {{room.includes.join(", ")}}
                                                </p>
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div class="main-right hotel-main-right">
                                        <div
                                            class="
                                                product-reverse
                                                hotel-product-reverse
                                            "
                                        >
                                            <div
                                                v-if="!room.cugHotel"
                                                class="
                                                    product-reverse
                                                    hotel-product-reverse
                                                "
                                                style="
                                                    margin-top: 0px;
                                                    margin-bottom: 20px;
                                                    padding-top: 0px;
                                                "
                                            >
                                            </div>
                                            <div class="atol-center" >
                                                <img v-if="room.rooms.length && room.rooms[0].isMor== 'true' && domain=='ie'" :src="require('@/assets/images/topps.jpg').default" title="TOPPS certificate required when purchased within 24 hours of a flight booking." alt="TOPPS certificate required when purchased within 24 hours of a flight booking." style="width: 60px; height: 30px"/>
    
                                            <img v-if="room.rooms.length && room.rooms[0].isMor== 'true' && domain=='uk'" :src="require('@/assets/images/atol-warning.jpg').default" title="ATOL certificate required when purchased within 24 hours of a flight booking." alt="ATOL certificate required when purchased within 24 hours of a flight booking." style="width: 65px; max-height: 90px"/>
                                            </div>
                                             <p class="status-blue"
                                                v-if="
                                                    itemIndex == 0 &&
                                                    room.refundability.toLowerCase() ==
                                                        'nonrefundable'
                                                " 
                                            >
                                                Non-Refundable
                                            </p>
                                             <p class="status-blue"                                                v-if="
                                                    itemIndex == 0 &&
                                                    room.refundability.toLowerCase() ==
                                                        'refundable'
                                                "                                             >
                                                Refundable
                                            </p>

                      <h2
                        v-if="itemIndex == 0 && showAddCart">
                                                <span>
                                                   
                                                    <br v-if="domain == 'mx'">
                                                     {{CSymbol}}{{ room.finalPrice| toFixed}}
                                                    
                                                 
                                                </span>
                                            </h2>
                                            <p v-if="itemIndex == 0">
                                                Total for
                                                {{ totalNights }} night<span
                                                    v-if="totalNights > 1" style="color:#676767" 
                                                    >s</span
                                                >
                                            </p>

                                            <v-btn
                                                v-if="itemIndex == 0 && showAddCart"
                                                color="error"
                                                class="btn-save"
                                                :disabled="makeAddCartBtnEnable(HotelStore.hotelData.lowestPrice, room.finalPrice, room.cancelPolicy.length)"
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
                                                v-if="HotelStore.hotelData.lowestPrice==room.finalPrice"
                                                 >Lowest Price
                                            </p>

                                            <p
                                              
                                                
                                                class="room-book-now primary--text font-weight-regular"
                                                > {{paymentType(room.payNow==undefined ? '' :room.payNow,room.payLater == undefined ? '' : room.payLater,room.payAtHotel == undefined ? '' : room.payAtHotel)}}
                                            </p>
                                           
                                            <p
                                                v-if="
                                                    room.chargeReq ==
                                                        'ImmediatePayment' &&
                                                    itemIndex == 0
                                                "
                                                href="#"
                                                class="status-blue"
                                                >Pay Now
                                            </p>

                                            <v-expansion-panel-header
                                                @click="
                                                    hotelExpand !=
                                                    topIndex + itemIndex
                                                        ? (hotelExpand =
                                                              topIndex +
                                                              itemIndex)
                                                        : (hotelExpand = -1);
                                                    hoteltab = 'tab-1';
                                                    checkIndex(topIndex + itemIndex);
                                                "
                                            >
                                                <div class="collpase-heading">
                                                    <span
                                                        v-if="
                                                            hotelExpand ==
                                                            topIndex + itemIndex
                                                        "
                                                        >Hide Details</span
                                                    >
                                                    <span
                                                        v-if="
                                                            hotelExpand !=
                                                            topIndex + itemIndex
                                                        "
                                                        >Show Details</span
                                                    >
                                                </div>
                                            </v-expansion-panel-header>
                                        </div>
                                    </div>
                                </div>

                                <v-expansion-panel-content v-if="acordian == topIndex">
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
                                                        <p v-if="HotelStore.hotelDetails.description!=''" v-html="HotelStore.hotelDetails.description"></p>
                                                        <p
                                                            v-if="
                                                                item.roomContent!=''
                                                                    
                                                            "
                                                            v-html="
                                                                item.roomContent
                                                                    
                                                            "
                                                        ></p>
                                                       
                                                        
                                                        <p v-if="HotelStore.hotelDetails.description=='' && item.roomContent==''">
                                                            Unfortunately, our
                                                            supplier has not
                                                            provided any package
                                                            details.
                                                        </p>
                                                    </v-tab-item>
                                                    <v-tab-item value="tab-2">
                                                      <!-- {{roomData}}{{roomImage(item.stdRoomId)}} -->
                                                      <!-- {{roomImage(item.stdRoomId)}} -->
                                                        <div
                                                            v-if="
                                                                roomImage(item.stdRoomId).length > 0
                                                            "
                                                            class="
                                                                gallery-slider-box
                                                            "
                                                        >
                                                            <Slider
                                                                v-if="
                                                                    roomImage(item.stdRoomId).length > 0
                                                                "
                                                                :slides="
                                                                    roomImage(item.stdRoomId)
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
                                                            class="
                                                                product-varify
                                                                hotel-product-varify
                                                                choose-room
                                                            "
                                                            v-if="getAmenity(item.stdRoomId).length>0" 
                                                        >
                                                        <b class="mb-5">Facilities shown may not be included in the price.</b>
                                                       
                                                            <ul
                                                                v-if="
                                                                    getAmenity(item.stdRoomId)
                                                                "
                                                            >
                                                                <li
                                                                    v-for="(
                                                                        amenity,
                                                                        index
                                                                    ) in getAmenity(item.stdRoomId)"
                                                                    :key="index"
                                                                >
                                                                    <i
                                                                        class="
                                                                            fas fa-check
                                                                        "
                                                                    ></i>
                                                                    {{
                                                                        amenity
                                                                    }}
                                                                </li>
                                                            </ul>
                                                        </div>

                                                        <div v-else                                                             class="
                                                                product-varify
                                                                hotel-product-varify
                                                                choose-room
                                                            ">
                                                            Unfortunately,
                                                            our supplier has
                                                            not provided any
                                                            package details.
                                                        </div>
                                                    </v-tab-item>

                                                    <v-tab-item value="tab-7">
                                                     <div
                                                            v-if="
                                                                room.cancelPolicy.length > 0 && room.cancelPolicy[0].datesFees.length > 0
                                                            "
                                                        >

                                                            <p>
                                                            <b>Cancellation Fee:</b> 

                                                            Between {{ justFormatMyDate(room.cancelPolicy[0].datesFees[0].start, countryDF) }} to 
                                                                    {{ justFormatMyDate(room.cancelPolicy[0].datesFees[0].after, countryDF) }}

                                                            Fee is {{globalData.CSymbol}}{{room.cancelPolicy[0].datesFees[0].fee}}
                                                            </p>
                                                            <!--
                                                            <p
                                                                v-html="
                                                                    room
                                                                        .cancelPolicy[0]
                                                                        .remarks
                                                                "
                                                            ></p>
                                                            
                                                            <p >
                                                                <strong> Start: </strong>
                                                                {{
                                                                    getHotelCountryDFOnly(room.cancelPolicy[0].datesFees[0]
                                                                        .start)
                                                                }}
                                                                
                                                                <strong>After</strong>
                                                                {{
                                                                    getHotelCountryDFOnly(room.cancelPolicy[0].datesFees[0]
                                                                        .after)
                                                                        
                                                                }}

                                                                <strong>Fee:</strong>
                                                                {{
                                                                    globalData.CSymbol
                                                                }}{{
                                                                    room.cancelPolicy[0].datesFees[0]
                                                                        .fee
                                                                }}
                                                            </p>
                                                            -->
                                                           
                                                            
                                                        </div>
                                                        <p v-else>
                                                            Unfortunately, our
                                                            supplier has not
                                                            provided any package
                                                            details.
                                                        </p>

                                                        <div v-if="typeof room.policies!= 'undefined'">
                                                            <div v-if="room.policies.length">
                                                                <div v-for="(cPolicy) in room.policies" class="product-text hotel-product-text">
                                                                    <h3 class="primary--text font-14">
                                                                        {{ cPolicy.type }}
                                                                    </h3>
                                                                    <p v-html="cPolicy.text"></p>
                                                                </div>
                                                            </div>    
                                                        </div>
                                                         <div  class="product-text hotel-product-text">
                                                          <h3 class="primary--text font-14">Payment, Taxes, and Fees Disclaimer:</h3>
                                                          <p>These charges, if applicable, will be payable by you to the hotel directly at checkout. When you check in, a credit card or, in the hotel’s discretion, a debit card, will be required to secure there charges and fees that you may incur during your stay. Please contact the hotel directly as to whether and which charges or service fees apply.</p>
                                                         </div>
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
            <TripSummary class="set_align" v-if="showTripSummary" />

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
        TripSummary,
    },
    name: 'HotelRoom',
    mixins: [cartHelper],
    props: ['packages', 'totalNights', 'slides', 'showAddCart', 'showTripSummary', 'defaultClass9Lg','hotelimg','roomData','description','fixPathOfImage'],
    data() {
        return {
            hotelExpand: -1,
            acordian: 0,
            hoteltab: null,
            activityitems: [
                {
                    ActivityID: 'Learn JavaScript',
                    ActivityName:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                },
                {
                    ActivityID: 'Learn Vue',
                    ActivityName:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                },
                {
                    ActivityID: 'Play around in JSFiddle',
                    ActivityName:
                        'sed do eiusmod tempor aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                },
                {
                    ActivityID: 'Build something awesome',
                    ActivityName:
                        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                },
            ],
            possibleValues: [
                // { Value: "Other", name: "Other" },
                {
                    Value: 'NotApplicable',
                    name: 'Not Applicable',
                },
                {
                    Value: 'NotSpecified',
                    name: 'Not Specified',
                },
                {
                    Value: 'PerMinute',
                    name: 'Per Minute',
                },
                {
                    Value: 'PerHour',
                    name: 'Per Hour',
                },
                {
                    Value: 'PerStay',
                    name: 'Per Stay',
                },
                {
                    Value: 'PerHalfDay',
                    name: 'Per Half Day',
                },
                {
                    Value: 'PerNight',
                    name: 'Per Night',
                },
                {
                    Value: 'PerWeek',
                    name: 'Per Week',
                },
                {
                    Value: 'PerChild',
                    name: 'Per Child',
                },
                {
                    Value: 'PerAdult',
                    name: 'Per Adult',
                },
                {
                    Value: 'PerRoom',
                    name: 'Per Room',
                },
                {
                    Value: 'PerPerson',
                    name: 'Per Person',
                },
                {
                    Value: 'PerOccurrence',
                    name: 'Per Occurrence',
                },
                {
                    Value: 'PerItem',
                    name: 'Per Item',
                },
                {
                    Value: 'PerReservation',
                    name: 'Per Reservation',
                },
            ],
        };
    },
    filters: {
        formatDate: function (value) {
            return moment(value).format('MM/DD/YYYY');
        },
        imagePath: function (value) {
            let path = value.split('http');
            return 'http' + ':' + path[1];
        },
        formateTitle(value) {
            return value.split('_').join(' ');
        },
        removeShortForm(value) {
        
            let str = value;

            return str;
        },
        toFixed(value) {
            let val = Number(value);
            return val.toFixed(2);
        },
    },
    mounted() {
        this.$store.dispatch('resetRoomSessisonId');
        this.focusedEngine = 'hotel';
    },
    created: function () {
        evBus.$on('checkOutHotel', (reqDetails) => {
            this.openCheckOutPopUp('hotel', this.doCleanArray(reqDetails));
        });
    },
    methods: {
          paymentType(payNow,payLater,payAtHotel){
      
            let payment = '';
            if(payNow == true){
                payment = ' Pay Now';
            }
            if(payLater == true){
                payment+=  payment.length>0 ? ', Pay Later':'Pay Later';
            }
        if(payAtHotel == true){
            payment+= payment.length>0 ? ', Pay At Hotel' : 'Pay At Hotel';
        }
      return payment;
    },
        makeAddCartBtnEnable(hotelLowserPrice, roomPrice, hasCancelPolicy) {

            if(hotelLowserPrice==roomPrice)
                return false;

            if(hasCancelPolicy==0)
                return true;
        },

        roomImage(RoomId){
       
         if(this.roomData.length==0 || this.roomData.find( ({ stdRoomId }) => stdRoomId === RoomId ).images===undefined){
              return [];
           }
           
               let images =  this.roomData.find( ({ stdRoomId }) => stdRoomId === RoomId ).images.map(item => ({
                    img: this.fixPathOfImage(item)
                }));

                return images

         
        },
        checkIndex(topIndex) {
            this.acordian = topIndex;
        },

        getAmenity(roomId) {
                 if(this.roomData.length==0 || this.roomData.find( ({ stdRoomId }) => stdRoomId === roomId ).facilities===undefined){
              return [];
           }
                var facilities =  this.roomData.find( ({ stdRoomId }) => stdRoomId === roomId ).facilities;
                return facilities
          
         },

        openCheckOutPopUp: async function(engine, infos) {

            let that = this;
            

            that.callHotelsBySession(1500).then((hotels) => {

                let _allHotels = that.doCleanArray(hotels),
                    _filterHotel = that.doCleanArray(that.$store.state.hotelStore.searchData),
                    _checkedHotel = _allHotels.find((o) => {
                        if (o.hotelId == infos.hotelId) return true;
                    });

                  infos.hotel = _checkedHotel;
                  infos.roomDetails = _filterHotel.rooms;
                  infos.pdate = _filterHotel.checkinDate;
                  infos.plocationName = _filterHotel.destination;
                  infos.ptime = moment(_filterHotel.checkinDate, "X").format("HH:mm:ss");
                  infos.ddate = _filterHotel.checkoutDate;
                  infos.dlocationName = _filterHotel.destination;
                  infos.dtime = moment(_filterHotel.checkoutDate, "X").format("HH:mm:ss");
                  infos.engineId = infos.hotelId;
                  infos.Id = infos.hotelId;
                  infos.remaining = [39, 59];
                  infos.expire = false;
                  infos.showTimes = true;

                  let cader = {
                    engine: engine,
                    item: infos,
                  };

                  this.$store.dispatch("setCartUpComings", { UPCOMINGS: cader });
                  evBus.$emit("openCheckOutPopUp", engine, infos);
                  that.doClosePop();
            }); // Ends call
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
            return images.map((item) => ({
                img: item.split('//')[0] + '://' + item.split('//')[1],
            }));
        },

        setTaxesAndFees(taxesAndFees) {

            let TandFArray = [];
        

            for (const TandF of taxesAndFees) {
                    
                if(typeof TandF.FeeTitle=='undefined')            
                    TandF.FeeTitle = '';

                if(TandF.FeeTitle!='' && TandF.FeeTitle!=null)
                    TandF.FeeTitle = TandF.FeeTitle.split('_').join(' ');
                
                if (TandF.FrequencyType == TandF.UnitType) {
                    const PV = this.possibleValues.find(
                        (PV) => PV.Value == TandF.FrequencyType
                    );
                    if (PV) {
                        TandF.FrequencyType = PV.name;
                    }
                    TandF.UnitType = '';
                } else {
                    const PVFT = this.possibleValues.find(
                        (PV) => PV.Value == TandF.FrequencyType
                    );
                    const PVUT = this.possibleValues.find(
                        (PV) => PV.Value == TandF.UnitType
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
        taxesAndFeesPercentage: function (value) {
            if (value.length == 0) {
                return [];
            }
            let feeAndTaxes = this.setTaxesAndFees(value);
            let item = _.without(_.map(feeAndTaxes, function(o) {
            if (o.IsValuePercentage === true && o.IsIncludedInPrice === true) return o;
        }), undefined);

            return item;
        },
        taxesAndFeesValues: function (value) {
            if (value.length == 0) {
                return [];
            }
            let feeAndTaxes = this.setTaxesAndFees(value);

            let item = _.without(_.map(feeAndTaxes, function(o) {
            if ((!o.IsValuePercentage || o.IsValuePercentage === false) && o.IsIncludedInPrice === true) return o;
        }), undefined);

            return item;
        },
        taxesAndFeesValueMerged: function (value) {
            if (value.length == 0) {
                return [];
            }
            let feeAndTaxes = this.setTaxesAndFees(value);
            const taxesAndFeesValues = _.without(_.map(feeAndTaxes, function(o) {
            if ((!o.IsValuePercentage || o.IsValuePercentage === 'false') && o.IsIncludedInPrice === true) return o;
        }), undefined);
            
            let item = _(taxesAndFeesValues)
                .groupBy('FeeTitle')
                .map((objs, key) => ({
                    ...objs[0],
                    FeeTitle: key,
                    Value: _.sumBy(objs, (obj) => Number(obj.Value)),
                }))
                .value();
            return item;
        },

        taxesAndFeesExcluded: function (value) {

            if (value.length == 0) {
                return [];
            }
            
            let feeAndTaxes = this.setTaxesAndFees(value);

            let item = _.without(
                _.map(feeAndTaxes, function (o) {
                    if (!o.IsIncludedInPrice || o.IsIncludedInPrice === false)
                        return o;
                }),
                undefined
            );

            return item;
        },

        getFirstImage: function (value) {
            let path = value;
            return path.split('//')[0] + '://' + path.split('//')[1];
        },
    },
    computed: {
        ...mapState({
            globalData: (state) => state.envStore,
            domain: (state) => state.envStore.domain,
            HotelStore: (state) => state.hotelStore,
            searchData: (state) => state.hotelStore.searchData,
            countryDF: (state) => state.envStore.countryDF,
            DFormat: (state) => state.envStore.DFormat,
            CSymbol: (state) => state.envStore.CSymbol,
            CType: (state) => state.envStore.CType
        }),

        isMX(){
          return this.domain == 'mx' ? true : false;
        }
    },
};
</script>
<style scoped>
.v-expansion-panel--active + .v-expansion-panel,
.v-expansion-panel--active:not(:first-child) {
    margin-top: 0px !important;
}
.set_align {
    margin-top: -9px;
}

</style>
