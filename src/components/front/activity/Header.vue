<template>
    <div>
        <div class="gallery-header">
             <h4>{{ currentActivity[0].title }}</h4>



            <div v-if="currentActivity[0]" class="gallery-header-rating-box">
                <div class="villas-room-rating" style="">
                    <div>
                        <span class="villas-detail-rating">
                            <star-rating
                                :star-size="15"
                                :border-width="1"
                                border-color="#fff"
                                :rounded-corners="true"
                                :star-points="[
                                    23,
                                    2,
                                    14,
                                    17,
                                    0,
                                    19,
                                    10,
                                    34,
                                    7,
                                    50,
                                    23,
                                    43,
                                    38,
                                    50,
                                    36,
                                    34,
                                    46,
                                    19,
                                    31,
                                    17
                                ]"
                                :rating="Number(Math.round(currentActivity[0].starRating))"
                                :show-rating="false"
                                :read-only="true"
                            >
                            </star-rating>
                        </span>
                        <span>
                            <p
                                v-if="currentActivity[0].reviewCount"
                                style="background: transparent;"
                            >
                                <span>(</span
                                ><span
                                    >{{
                                        currentActivity[0].reviewCount
                                    }}
                                    Reviews</span
                                ><span>)</span>
                            </p>
                        </span>
                    </div>
                   
                </div>
            </div>
        </div>
        <!--          <div class="gallery-contact-no">
                            <p v-if="activityDetail[0]">
                                <img src="@//assets/images/hotel-phon.png" />
                               {{activityDetail[0].phone | numberFormat(cCodes, activityDetail.countryCode)}}
                            </p>
                            <p>
                                <img src="@//assets/images/hotel-miles.png" />
                                {{activityDetail[0]?activityDetail[0].distance:''}} {{activityDetail?activityDetail.distanceUnit:''}}
                            </p>
                            <p>
                                <img src="@//assets/images/hotel-map.png" />
                               <a href="#map" role="button" @click="showMapTab()"> View on map </a>
                            </p>
                        </div> -->
    </div>
</template>
<script>
import countryCodes from '@/services/data/countraycodes';
import StarRating from 'vue-star-rating';

export default {
    name: 'activityDetailHeader',
    props: ['currentActivity', 'mapURL', 'showMapTab', 'activityDetail'],
    components: {
        StarRating
    },
    data() {
        return {
            cCodes: countryCodes
        };
    },

    mounted() {
       
    },

    filters: {
        numberFormat(value, countryCodes, code) {
            //creating variable name to get from json
            var CountryCodeMask = countryCodes[code];

            // count hashes
            var count = (CountryCodeMask.match(/#/g) || []).length;

            // clean number
            var number = value.replace(/[^\d.]/g, '');

            // number to apply mask
            var maskToApplyNumber = number.substring(number.length - count);

            // apply format
            //var returnNumber = format(maskToApplyNumber,CountryCodeMask);
            var i = 0,
                v = maskToApplyNumber.toString();
            // eslint-disable-next-line no-unused-vars
            let returnNumber = CountryCodeMask.replace(/#/g, _ => v[i++]);

            return returnNumber;
        }
    }
};
</script>
