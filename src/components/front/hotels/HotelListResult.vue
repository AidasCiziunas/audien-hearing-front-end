<template>
  <div v-bind:class="[bookingExist == true ? 'nnn col-lg-9' : 'col-lg-12']">
    <v-expansion-panels>
      <v-expansion-panel
        v-for="(hotel, index) in compResults"
        :key="'A' + index"
      >
        <div class="single-listing-repeat">
          <div class="single-listing">
            <div class="main-left car-left-box hotel-main-left">
              <div class="hotel-name">
                <div class="product-text hotel-product-text">
                  <star-rating
                    :star-size="15"
                    :border-width="1"
                    border-color="#fff"
                    :rounded-corners="true"
                    :star-points="[
                      23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36,
                      34, 46, 19, 31, 17,
                    ]"
                    :rating="Number(Math.round(hotel.starRating))"
                    :show-rating="false"
                    :read-only="true"
                    style="top: 10px; position: relative"
                  >
                  </star-rating>

                  <h3>
                    {{ hotel.displayName }}
                  </h3>
                  <p>
                    <i class="fas fa-map-marker-alt"></i>
                    {{ hotel.address }}
                  </p>
                </div>
                <div class="product-img">
                  <img v-bind:src="hotel.img" alt="img" />
                </div>

                <div class="outer-right hotel-outer-right hhh-col-hotel-outer">
                  <div class="product-reviews hotel-product-reviews">
                    <div class="in-left hotel-in-left">
                      <ul class="pl-0">
                        <li class="pl-0" v-if="hotel.phone !== null">
                          <i class="fas fa-phone-alt"></i>

                          {{
                            hotel.phone
                              | numberFormat(cCodes, hotel.countryCode)
                          }}
                        </li>
                        <li v-if="domain == 'uk' || domain == 'ie'">
                          <i class="fas fa-road"> </i>
                          {{ hotel.distance / 1000 }}

                          {{ compDistanceUnit() }}
                        </li>
                        <li v-else>
                          <i class="fas fa-road"> </i>
                          {{ hotel.distance }}
                          {{ hotel.distanceUnit }}
                        </li>
                      </ul>
                    </div>
                    <div class="in-right hotel-in-right"></div>
                  </div>
                  <div
                    v-if="
                      hotel.hotelFacility
                    "
                    class="product-specs hotel-product-specs"
                  >
                    <ul>
                      <li v-for="(value,name,index) in hotel.hotelFacility" v-bind:index="index" v-bind:key="name+'-'+index">
                       
                        <v-tooltip top>
                          <template
                            v-slot:activator="{
                              on,
                              attrs
                            }"
                          >
                          
                           <i v-if="name=='Restaurant'" v-bind="attrs" v-on="on" class="material-icons">restaurant</i>
                           <i v-if="name=='Internet'" v-bind="attrs" v-on="on" class="material-icons">language</i>
                           <i v-if="name=='FitnessFacility'" v-bind="attrs" v-on="on" class="material-icons">fitness_center</i>
                           <i v-if="name=='Parking'" v-bind="attrs" v-on="on" class="material-icons">directions_car</i>
                           <i v-if="name=='Lounge'" v-bind="attrs" v-on="on" class="material-icons">weekend</i>
                           <i v-if="name=='ChildcareService'" v-bind="attrs" v-on="on" class="material-icons">child_care</i>
                           <i v-if="name=='Casino'" v-bind="attrs" v-on="on" class="material-icons">casino</i>
                           <i v-if="name=='Breakfast'" v-bind="attrs" v-on="on" class="material-icons">local_dining</i>
                           <i v-if="name=='BusinessCenter'" v-bind="attrs" v-on="on" class="material-icons">business_center</i>
                           <i v-if="name=='CurrencyExchange'"  v-bind="attrs" v-on="on" class="material-icons">monetization_on</i> 
                           <i v-if="name=='Bar'"  v-bind="attrs" v-on="on" class="material-icons">local_bar</i>
                           <i v-if="name=='Spa'"  v-bind="attrs" v-on="on" class="material-icons">spa</i> 
                           <i v-if="name=='NonSmoking'"  v-bind="attrs" v-on="on" class="material-icons">smoke_free</i>
                           <i v-if="name=='Television'"  v-bind="attrs" v-on="on" class="material-icons">personal_video</i>
                           <i v-if="name=='LaundryServices'"  v-bind="attrs" v-on="on" class="material-icons">local_laundry_service</i>
                           <i v-if="name=='SwimmingPool'"  v-bind="attrs" v-on="on" class="material-icons">pool</i>
                           <i v-if="name=='Refrigerator'"  v-bind="attrs" v-on="on" class="material-icons">kitchen</i>
                           <i v-if="name=='Balcony'"  v-bind="attrs" v-on="on" class="material-icons">balcony</i>
                           <i v-if="name=='Golf'"  v-bind="attrs" v-on="on" class="material-icons">golf_course</i>
                           <i v-if="name=='Suite'"  v-bind="attrs" v-on="on" class="material-icons">airline_seat_individual_suite</i>
                           <i  v-if="name=='Villas'" v-bind="attrs" v-on="on" class="material-icons">villa</i>
                           <i v-if="name=='Roomservice'"  v-bind="attrs" v-on="on" class="material-icons">room_service</i>
                           <i v-if="name=='Kitchenette'"  v-bind="attrs" v-on="on" class="material-icons">countertops</i>   
                           <i v-if="name=='Powerbanks'"  v-bind="attrs" v-on="on" class="material-icons">battery_saver</i>
                           <i  v-if="name=='Headphones'" v-bind="attrs" v-on="on" class="material-icons">headset</i>
                           <i  v-if="name=='Barbeque'" v-bind="attrs" v-on="on" class="material-icons">outdoor_grill</i> 
                           <i  v-if="name=='Banquet'" v-bind="attrs" v-on="on" class="material-icons">soup_kitchen</i>
                           <i v-if="name=='Medical'" v-bind="attrs" v-on="on" class="material-icons">medical_services</i>
                           <i v-if="name=='Sauna'" v-bind="attrs" v-on="on" class="material-icons">bathtub</i>
                           <i v-if="name=='TravelDesk'" v-bind="attrs" v-on="on" class="material-icons">flight_class</i>  
                           <i v-if="name=='DisableFriendly'" v-bind="attrs" v-on="on" class="material-icons">person_off</i>    
                           <i v-if="name=='Multilingual'" v-bind="attrs" v-on="on" class="material-icons">translate</i> 
                           <i v-if="name=='NightClub'" v-bind="attrs" v-on="on" class="material-icons">nightlife</i>
                           <i v-if="name=='HairSalon'" v-bind="attrs" v-on="on" class="material-icons">chair_alt</i>   
                           <i v-if="name=='Library'" v-bind="attrs" v-on="on" class="material-icons">local_library</i> 
                           <i v-if="name=='LazyRiver'" v-bind="attrs" v-on="on" class="material-icons">kayaking</i>  
                           <i v-if="name=='WaterSlide'" v-bind="attrs" v-on="on" class="material-icons">water</i>    
                           <i v-if="name=='WaterPark'" v-bind="attrs" v-on="on" class="material-icons">pool</i>      
                           <i v-if="name=='RoofTopTerrace'" v-bind="attrs" v-on="on" class="material-icons">deck</i>    
                           <i v-if="name=='Karaoke'" v-bind="attrs" v-on="on" class="material-icons">library_music</i> 
                           <i v-if="name=='SharedMicrowave'" v-bind="attrs" v-on="on" class="material-icons">microwave</i> 
                           <i v-if="name=='Clubhouse'" v-bind="attrs" v-on="on" class="material-icons">liquor</i> 
                           <i v-if="name=='Dock'" v-bind="attrs" v-on="on" class="material-icons">dock</i> 
                           <i v-if="name=='AmexReserve'" v-bind="attrs" v-on="on" class="material-icons">payment</i> 
                           <i v-if="name=='ATM'" v-bind="attrs" v-on="on" class="material-icons">atm</i> 
                           <i v-if="name=='ConciergeServices'" v-bind="attrs" v-on="on" class="material-icons">assist_walker</i> 
                           <i v-if="name=='Billiards'" v-bind="attrs" v-on="on" class="material-icons">Games</i> 
                           <i v-if="name=='Tennis'" v-bind="attrs" v-on="on" class="material-icons">tennis</i> 
                           <i v-if="name=='HospitalBed'" v-bind="attrs" v-on="on" class="material-icons">hotel</i> 
                           <i v-if="name=='CoupleDining'" v-bind="attrs" v-on="on" class="material-icons">table_restaurant</i>  
                           <img   v-on="on" v-if="name=='AirportShuttle' || name=='Safedepositbox' || name=='PetsAllowed'" :src="require('@/assets/images/facility.svg').default"/>
                             
                          </template>
                          <span v-if="name=='Safedepositbox' ">Safe Deposit Box</span>
                          <span v-else-if="name=='LaundryServices'">Laundry Services</span>
                          <span v-else-if="name=='AirportShuttle'">Airport Shuttle</span>
                          <span v-else-if="name=='PetsAllowed'">Pets Allowed</span>
                          <span v-else-if="name=='CoupleDining'">Couple Dining</span>
                          <span v-else-if="name=='HospitalBed'">Hospital Bed</span>
                          <span v-else-if="name=='AmexReserve'">Amex Reserve</span>
                          <span v-else-if="name=='Clubhouse'">Club house</span>
                          <span v-else-if="name=='SharedMicrowave'">Shared Microwave</span>
                          <span v-else-if="name=='RoofTopTerrace'">Roof Top Terrace</span>
                          <span v-else-if="name=='WaterPark'">Water Park</span>
                          <span v-else-if="name=='WaterSlide'">Water Slide</span>
                          <span v-else-if="name=='LazyRiver'">Lazy River</span>
                          <span v-else-if="name=='HairSalon'">Hair Salon</span>
                          <span v-else-if="name=='NightClub'">Night Club</span>
                          <span v-else-if="name=='DisableFriendly'">Disable Friendly</span>
                          <span v-else-if="name=='TravelDesk'">Travel Desk</span>
                          <span v-else-if="name=='Roomservice'">Room Service</span>
                          <span v-else-if="name=='FitnessFacility'">Fitness Facility</span>
                          <span v-else-if="name=='SwimmingPool'">Swimming Pool</span>
                          <span v-else-if="name=='NonSmoking'">Non-Smoking</span>
                          <span v-else-if="name=='CurrencyExchange'">Currency Exchange</span>
                          <span v-else-if="name=='BusinessCenter'">Business Center</span>
                          <span v-else-if="name=='ChildcareService'">Childcare Service</span>
                          <span v-else>{{name}}</span>
                          
                        </v-tooltip>
                      </li>

                     
                    </ul>
                  </div>
                  <p class="room-basis">
                    <b v-if="hotel.basisList.length > 0">
                      <span
                        v-for="(item, baseIndex) in hotel.basisList"
                        :key="baseIndex"
                        >{{ item
                        }}<span v-if="baseIndex + 1 < hotel.basisList.length"
                          >,</span
                        ></span
                      >
                    </b>
                  </p>
                </div>

                <div class="nin-col-aminities-box">
                  <div
                    class="outer-right hotel-outer-right hhh-col-hotel-outer"
                  >
                    <div class="product-varify">
                      <h5>Available Amenities</h5>
                      <ul>
                        <li>
                          <i class="fas fa-check"></i>
                          <span>Smoke-Free zone</span>
                        </li>
                        <li>
                          <i class="fas fa-check"></i>
                          <span>Spa</span>
                        </li>
                        <li>
                          <i class="fas fa-check"></i>
                          <span>Lounge</span>
                        </li>
                        <li>
                          <i class="fas fa-check"></i>
                          <span>Airport Transport</span>
                        </li>
                        <li v-if="hotel.hasFitness == 'YES'">
                          <i class="fas fa-check"></i>
                          <span>Fitness Center</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="hotel-main-right">
              <div class="product-reverse hotel-product-reverse">
                <h2>
                  {{ CSymbol }}<span>{{ hotel.lowestPrice }} </span>
                </h2>
                <p v-if="hotel.hasCugHotel == 'YES'">ITA Preferred</p>
                <p>
                  Total for {{ nightCount }} night<span
                    style="color: #898b8d"
                    v-if="nightCount > 1"
                    >s</span
                  >
                </p>
                <!-- :to="{ path: 'choose-room/'+hotel.hotelId}" -->
                <button
                  @click.prevent="viewHotel(hotel.hotelId, 'detail-page')"
                  type="button"
                  class="btn-save v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default error"
                  style=""
                >
                  <span class="v-btn__content"> View Rooms </span>
                </button>
                <!--
                                <ul>
                                    <li>
                                        <a href="javascript:void(0);">Reserve now, pay later</a>
                                    </li>
                                </ul>
                                -->
                <v-expansion-panel-header
                  @click="
                    expanded = index;
                    showDescription = false;
                    viewHotel(hotel.hotelId, 'listing-page');
                  "
                >
                  <div class="collpase-heading">
                    <span v-if="expanded == index">Hide Details</span>
                    <span v-if="expanded != index">Show Details</span>
                  </div>
                </v-expansion-panel-header>
              </div>
            </div>
          </div>
        </div>
        <v-expansion-panel-content>
          <div class="car-listing-tabs-outer">
            <div class="car-listing-tabs">
              <v-card v-if="showDescription" flat>
                <v-card-text v-html="HotelStore.hotelDetails.description">
                </v-card-text>
              </v-card>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!--<div class="col-md-3">
show hotel trip data


</div>-->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import hotelServices from '@/services/api/Hotel';
import HotelHelper from '@/helper/HotelHelper.js';
import countryCodes from '@/services/data/countraycodes';
import StarRating from 'vue-star-rating';
import { evBus } from '@/services/bus.js';
export default {
  name: 'HotelListResult',
  props: ['searchAgain', 'results', 'panel', 'nightCount', 'numberFormat'],
  mixins: [HotelHelper],
  components: { StarRating },
  data() {
    return {
      readMore: 'a',
      showDescription: false,
      CSymbol: this.$store.state.envStore.CSymbol,
      cCodes: countryCodes,
      expanded: false,
    };
  },

  methods: {
    compDistanceUnit() {
      if (this.domain == 'com') {
        return (this.distanceUnit = 'Miles');
      } else if (this.domain == 'uk' || this.domain == 'ie') {
        return (this.distanceUnit = 'Kilometer');
      }
    },
    viewHotel(hotelId, type) {
      this.showDescription = false;
      let reqHeaders = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      let reqPayLoad = {
        sessionId: this.HotelStore.sessionId,
        hotelId: hotelId,
      };

      hotelServices
        .getHotelDetail((reqHeaders, reqPayLoad))
        .then((response) => {
          if (
            response.data.errors.message == 'Session is expired.' ||
            response.data.errors.message ==
              'Session Expired! Please reinitiate search again.' ||
            response.data.message ==
              'Session Expired! Please reinitiate search again.'
          ) {
            this.$awn.success(
              'Your being timed out due to inactivity, Please try View Rooms again!'
            );
            this.$emit('resetSearch', hotelId);
          } else if (
            response.data.message ==
            'Hotel Package not found! Please try again later.'
          ) {
            this.$awn.alert(
              'We have not received the details needed from our supplier to view this hotel . Please select another hotel.'
            );
          } else {
            this.$store.dispatch('hotelDetail', response.data.data);
            this.showDescription = true;
            if (type == 'detail-page') {
              this.$router.push({
                name: 'choose-room',
                params: { id: hotelId },
              });
            }
          }
        });
    },
  },

  computed: {
    ...mapState({
      globalData: (state) => state.envStore,
      HotelStore: (state) => state.hotelStore,
      searchData: (state) => state.hotelStore.searchData,
      domain: (state) => state.envStore.domain,
    }),
    activeDomain() {
      return this.$store.state.envStore.domain;
    },
    compResults() {
      return this.results;
    },
  },

  mounted() {},

  filters: {
    removeShortForm(value) {
      let str = value.substring(0, value.length - 2);

      return str.trim();
    },
    numberFormat(value, countryCodes, code) {
      if (value == '' || value == null) {
        return '';
      } else {
        return value;
      }
      //crenumberFormatating variable name to get from json
      var CountryCodeMask = countryCodes[code];
      if (CountryCodeMask == undefined) {
        return '';
      }
      // count hashes
      var count = (CountryCodeMask.match(/#/g) || []).length;

      // clean number
      var number =
        value.replace(/[^\d.]/g, '') == undefined
          ? ''
          : value.replace(/[^\d.]/g, '');

      // number to apply mask
      var maskToApplyNumber = number.substring(number.length - count);

      // apply format
      //var returnNumber = format(maskToApplyNumber,CountryCodeMask);
      var i = 0,
        v = maskToApplyNumber.toString();
      // eslint-disable-next-line no-unused-vars
      let returnNumber = CountryCodeMask.replace(/#/g, (_) =>
        v[i++] == undefined ? '' : v[i++]
      );

      return returnNumber;
    },
  },
};
</script>
<style scoped>
.hotel-product-varify ul li i {
  color: #949494;
  margin-right: 5px;
  font-size: 18px;
}
.product-specs.hotel-product-specs ul li {
  width: 9% !important;
  text-align: left;
}
.paragraph {
  font-size: 13px;
  color: #454850;
  padding-top: 10px;
}
.hotel-product-specs ul li img {
    margin: 1px 8px 0 0;
    float: left;
    height: 27px;
}
</style>
