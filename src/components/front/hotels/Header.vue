<template>
    <div>
        <div class="gallery-header">
            <h4 v-if="HotelDetail">{{ HotelDetail.displayName }}</h4>
            <div v-if="HotelDetail" class="gallery-header-rating-box">
                <span class="hotedetailStar-rating">
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
                        :rating="Number(Math.round(HotelDetail.starRating))"
                        :show-rating="false"
                        :read-only="true"
                    >
                    </star-rating>
                </span>
            </div>
        </div>
        <div class="gallery-contact-no">
            <p v-if="HotelDetail && HotelDetail.phone">
                <img src="@//assets/images/hotel-phon.png" />
                {{
                    HotelDetail.phone
                        | numberFormat(cCodes, HotelDetail.countryCode)
                }}
            </p>
            <p v-if="(domain=='uk' || domain == 'ie')">
                <img src="@//assets/images/hotel-miles.png" />
              {{ HotelDetail ?  HotelDetail.distance/1000 : '' }}
                {{compDistanceUnit()}} 
            </p>
            <p v-else>
                <img src="@//assets/images/hotel-miles.png" />
              {{ HotelDetail ?  HotelDetail.distance : '' }}
                {{compDistanceUnit()}} 
            </p>
            <p>
                <img src="@//assets/images/hotel-map.png" />
                <a href="#map" role="button" @click="showMapTab()">
                    View on map
                </a>
            </p>
        </div>
    </div>
</template>
<script>
import countryCodes from '@/services/data/countraycodes';
import StarRating from 'vue-star-rating';

import { mapState } from 'vuex';
export default {
    name: 'hotelDetailHeader',
    props: ['HotelDetail', 'mapURL', 'showMapTab'],
    components: {
        StarRating
    },
    data() {
        return {
            cCodes: countryCodes
        };
    },
    computed: {
    ...mapState({
    
      domain: state => state.envStore.domain
    
    }),
    },
    methods:{
        compDistanceUnit() {
      if(this.domain == 'com'){
          return this.distanceUnit = 'Miles';
      } else if(this.domain == 'uk' || this.domain == 'ie') {
          return this.distanceUnit = 'Kilometer';
      }
    }
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
