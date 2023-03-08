<template>
  <span style="display: block !important;" class="room-container">
    <v-container>
      <div class="hotel-back-btn">
        <router-link to="/activities"
          ><i class="fas fa-angle-double-left"></i> Back to Activity
          Listing</router-link
        >
      </div>
      <section class="listing-wrapper">
        <div class="hotel-room-page">
          <div class="row">
            <div class="col-md-9">
              <Header :currentActivity="currentActivity" />

              <Slider :slides="slides" />
            </div>
            <div class="col-md-3">
              <checkAvailibity
                :activityDetail="activityDetail"
                :currentActivity="currentActivity"
                v-on:scroll-to="scroll()"
              />
            </div>
          </div>
          <div class="hotel-room-tabs">
            <v-toolbar class="remove-head-bg" style="height:auto !important;">
              <template v-slot:extension>
                <v-tabs v-model="tabs" fixed-tabs>
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab href="#mobile-tabs-5-1" class="primary--text">
                    OVERVIEW
                  </v-tab>

                  <v-tab href="#mobile-tabs-5-5" class="primary--text">
                    WHAT&apos;S INCLUDED &amp; EXCLUDED
                  </v-tab>

                  <v-tab href="#mobile-tabs-5-2" class="primary--text">
                    ADDITIONAL INFO
                  </v-tab>

                  <v-tab
                    id="map"
                    ref="map"
                    href="#mobile-tabs-5-4"
                    class="primary--text"
                  >
                    Cancellation Policy
                  </v-tab>
                  <v-tab
                    id="map"
                    ref="map"
                    href="#mobile-tabs-5-3"
                    class="primary--text"
                    role="button"
                    @click="getActivityReviews()"
                  >
                    Reviews
                  </v-tab>
                </v-tabs>
              </template>
            </v-toolbar>

            <v-tabs-items v-model="tabs">
              <v-tab-item :value="'mobile-tabs-5-1'">
                <v-card flat>
                  <v-card-text>
                  <h4 class="cancellation-policy">
                    OVERVIEW
                  </h4>
                   <p v-html="activityDescription"></p> 
                  </v-card-text>
                  <a
                    v-if="
                      activityDetail.description.length >
                        activityDescription.length &&
                        activityDetail.description.length > 1000
                    "
                    role="button"
                    class="ml-5 float-right pr-10 pb-4"
                    @click="showMore()"
                    >Read More</a
                  >
                  <a
                    v-if="
                      activityDetail.description.length ==
                        activityDescription.length &&
                        activityDetail.description.length > 1000
                    "
                    role="button"
                    class="ml-5 float-right pr-10 pb-4"
                    @click="hideMore()"
                    >Hide More</a
                  >
                </v-card>
              </v-tab-item>
            </v-tabs-items>
            <v-tabs-items v-model="tabs">
              <v-tab-item :value="'mobile-tabs-5-2'">
                <v-card flat> 
                  <v-card-text>
                    <h4 class="cancellation-policy" style="margin-bottom: 15px;">
                    ADDITIONAL INFO
                  </h4>
                 
                    <div class="additional-info-box"
                      v-for="(additionalInfo,
                      additionalInfoIndex) in activityDetail.additionalInfo"
                     :key="additionalInfoIndex"
                >
                      <!-- <h6
                        v-text="removeUnderScore(additionalInfo.type)"
                      ></h6> -->
                  <p>{{ additionalInfo.description }}</p>
                </div>
                  </v-card-text>
                </v-card>
               
              </v-tab-item>
            </v-tabs-items>
            <v-tabs-items v-model="tabs">
              <v-tab-item :value="'mobile-tabs-5-3'">
                <div v-if="hasReviews">
                  <span class="hotel-star mx-5 mt-3">
                    <h4 class="p-3 mx-5">
                      Reviews 
                    </h4>
                  </span>

                  <div class="review-list-box">
                    <div>
                      <div class="review-name-box">
                        <div class="reivew-name">
                          <h6>Reviews By:</h6>
                          <h5>
                            {{
                              capitalizeFirstLetter(
                                activityReviews.totalReviewsSummary.sources[0]
                                  .provider
                              )
                            }}
                            Travelers
                          </h5>
                          <br />
                          <p
                            style="color: grey; font-weight: normal;"
                            v-if="activityReviews.reviews.length > 10"
                          >
                            Showing 1-10 of
                            {{ activityReviews.reviews.length }}
                            Reviews
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
    
                  <template
                    v-for="(review, rvwIndex) in activityReviews.reviews"
                  >
                    <v-card class="review-wrapper">
                      <div class="review-box" :key="rvwIndex">
                        <div class="villas-room-rating">
                          <div>
                            <span class="hotel-star">
                              <star-rating
                                :star-size="15"
                                :border-width="1"
                                border-color="#fff"
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
                                :rounded-corners="true"
                                :rating="Number(Math.round(review.rating))"
                                :show-rating="false"
                                :read-only="true"
                              />
                            </span>
                            <p>
                              <v-tooltip top color="primary">
                            <template v-slot:activator="{ on, attrs }">
                              <span
                                style="cursor:pointer"
                                v-bind="attrs"
                                v-on="on"
                              >{{ truncateStr(review.title)}}</span>
                            </template>
                            <span>{{ review.title}}</span>
                          </v-tooltip>
                            </p>
                          </div>
                        </div>
                        <p>
                          <span>{{ review.userName }},</span>
                          {{
                            justFormatMyDate(
                              review.publishedDate,
                              fullDateFormat()
                            )
                          }}
                        </p>
                        <v-card>
                          <v-card-text v-text="review.text"> </v-card-text>
                        </v-card>
                        <div
                          v-if="
                            review.photosInfo !== undefined &&
                              review.photosInfo.length > 0
                          "
                        >
                          <v-row>
                            <v-col cols="12" md="6">
                              <review-slider
                                v-if="review.photosInfo"
                                :slides="review.photosInfo"
                              />
                            </v-col>
                          </v-row>
                        </div>
                        
                      </div>
                    </v-card>
                  </template>
                </div>
                <div v-if="!hasReviews">
                <span class="hotel-star mx-5 mt-3">
                    <h4 class="p-3 mx-5">
                      {{ noReviewMessage }} 
                    </h4>
                  </span>
                  </div>
                <!-- review end -->
              </v-tab-item>
            </v-tabs-items>
            <v-tabs-items v-model="tabs">
              <v-tab-item :value="'mobile-tabs-5-4'">
                <v-card flat> 
                  <v-card-text>
                    <h4 class="cancellation-policy">
                    Cancellation Policy 
                  </h4>
                  <p class="status-blue">
                   {{
              
                        removeUnderScore(activityDetail.cancellationPolicy.type)
                    }}
                  </p>
                  <p
                    v-html="activityDetail.cancellationPolicy.description"
                  ></p>
                    <!-- <div style="margin-top: 20px;"> -->
                      <!-- <p>
                        For a full refund&comma; you must cancel at least 24
                        hours before the experience&apos;s start time.
                      </p> -->
                      <!-- <p>
                        If you cancel less than 24 hours before the
                        experience&apos;s start time, the amount you paid will
                        not be refunded.
                      </p>
                      <p>
                        Any changes made less than 24 hours before the
                        experience&apos;s start time will not be accepted.
                      </p>
                      <p>
                        Cut-off times are based on the experience&apos;s local
                        time.
                      </p>
                      <p>
                        This experience requires good weather. If it&apos;s
                        canceled due to poor weather&comma; you &apos;ll be
                        offered a different date or a full refund.
                      </p>
                      <p>
                        This experience requires a minimum number of travelers.
                        If it&apos;s canceled because the minimum isn&apos;t
                        met&comma;you &apos;ll be offered a different
                        date/experience or a full refund.
                      </p> -->
                    <!-- </div> -->
                  </v-card-text>
                </v-card>
              </v-tab-item>
              </v-tabs-items>
                <v-tabs-items v-model="tabs">
                  <v-tab-item :value="'mobile-tabs-5-5'">
                  <v-card flat> 
                    <v-card-text> 
                      <h4 class="cancellation-policy">
                    WHAT&apos;S INCLUDED
                  </h4> 
                    <p
                      v-for="(inclusion,
                      inclusionIndex) in activityDetail.inclusions"
                      :key="'inclusions'+inclusionIndex"
                      
                    >  <span v-html="inclusion.otherDescription"></span>
                  
                </p>
                  
                  <h4 class="cancellation-policy">
                    WHAT&apos;S EXCLUDED
                  </h4>
                     <p
                      v-for="(exclusion,
                      exclusionIndex) in activityDetail.exclusions"
                      :key="'exclusions'+exclusionIndex" 
                    >  <span v-html="exclusion.otherDescription"></span>
                  
                </p>
                 </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
          </div>

          <div
            ref="avlSection"
            class="room-heading"
            v-if="compAvailabilityCount > 0"
          >
            <h4>
              {{ compAvailabilityCount }}
              Available {{compAvailabilityCount > 1 ? 'Activities':'Activity'  }}
            </h4>
          </div>

          <div class="room-heading mt-7" v-if="availabilityData == null">
            <p> 
              <i class="fas fa-info" style="color: blue"></i>
              Availability were not found for the given search condition. Please try different search criteria.
            </p>
          </div>

          <v-row v-if="compAvailabilityCount > 0">
            <div
              v-bind:class="[
                bookingExist == true ? 'nnn col-lg-8' : 'col-lg-12'
              ]"
            >
            <!--If packages available-->
              <div class="refundable-tabs-data" v-if="availableItems.length !== 0">
                <template v-for="(item, avlIndex) in availableItems">
                  <v-expansion-panels >
                    <v-expansion-panel>
                      <div class="single-listing-repeat" :key="avlIndex">
                        <div class="single-listing">
                          <div class="main-left car-left-box hotel-main-left" style="overflow: auto;">
                            <div class="hotel-name">
                              <div
                                class="product-text hotel-product-text activity-listing-text"
                              >
                                <h3>
                                  {{ item.details.title }}
                                </h3>
                              </div>
                              <div class="activity-time-detail">
                                <p
                                  v-html="
                                    item.details.description !== ''
                                      ? item.details.description
                                      : 'No Description Found'
                                  "
                                ></p>
                              </div>
                              <time-toggle-button :options="item.options" @activityStartTime="makeActivityStartTime" />
                            </div>
                          </div>
                          <div class="hotel-main-right">
                            <div class="product-reverse hotel-product-reverse">
                              <h2>
                                {{ globalData.CSymbol
                                }}<span>{{
                                  item.options[0].totalPrice.price.recommendedRetailPrice
                                }}</span>
                              </h2>
                              <button
                                type="button"
                                @click="addActivityToCart(item, item.packageId, 'activity')"
                                class="btn-save v-btn v-btn--is-elevated v-btn--has-bg theme--light 
                v-size--default error"
                                style="width: 80%;"
                              >
                                <span class="v-btn__content">
                                  Book
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </template>
              </div>

              <!--End if packages available-->

              <!--If only options available-->
              <div class="refundable-tabs-data" v-if="availableOptions.length !== 0">
                <template>
                  <v-expansion-panels >
                    <v-expansion-panel>
                      <div class="single-listing-repeat" v-for="(item, bkitmIndex) in availableOptions" :key="bkitmIndex">
                        <div class="single-listing">
                          <div class="main-left car-left-box hotel-main-left" style="overflow: auto;">
                            <div class="hotel-name">
                              <div
                                class="product-text hotel-product-text activity-listing-text"
                              >
                                <h3 v-if="bkitmIndex == 0">
                                   {{ currentActivity[0].title }}
                                </h3>
                              </div>
                              <div class="activity-time-detail">
                                <p>Pickup include</p>
                              </div>
                             <time-toggle-button :options="item.bookableItems.options" @activityStartTime="makeActivityStartTime" />
                          </div>
                           <div class="hotel-main-right">
                            <div class="product-reverse hotel-product-reverse">
                              <h2>
                                {{ globalData.CSymbol
                                }}<span>{{
                                  item.bookableItems.options[0].totalPrice.price.recommendedRetailPrice
                                }}</span>
                              </h2>
                              <button
                                type="button"
                                @click="addActivityToCart(item.bookableItems,item.packageId, 'activity')"
                                class="btn-save v-btn v-btn--is-elevated v-btn--has-bg theme--light 
                v-size--default error"
                                style="width: 100%;"
                              >
                                <span class="v-btn__content">
                                  Book
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </template>
              </div>
              <!--End if only options available-->
            </div>
            <TripSummary />
          </v-row>
          
        </div>
      </section>
    </v-container>
  </span>
</template>
<script>
var moment = require('moment');
import { mapState } from 'vuex';
import { evBus } from '@/services/bus.js';
import Slider from '@/components/front/activity/Slider';
import checkAvailibity from '@/components/front/activity/checkAvailibity';
import StarRating from 'vue-star-rating';
import Header from '@/components/front/activity/Header';
import cartHelper from '@/helper/addCartHelper';
import ActivityServices from '@/services/api/Activity';
import TripSummary from '@/components/common/widgets/TripSummary.vue';
import ReviewSlider from './ReviewSlider.vue';
import TimeToggleButton from './TimeToggleButton.vue';
export default {
  name: 'ChooseRoom',
  mixins: [cartHelper],

  components: {
    Slider,
    checkAvailibity,
    StarRating,
    Header,
    TripSummary,
    ReviewSlider,
    TimeToggleButton
  },
  data() {
    return {
      availabilitiesCount: 0,
      time: undefined,
      model: 0,
      activitytab: null,
      currentActivity: [],
      tabs: null,
      destination: '',
      current: 0,
      direction: 1,
      transitionName: 'fade',
      show: false,
      slides: [],
      page: 4,
      perPage: 5,
      activityDescription: '',
      hasReviews: false,
      noReviewMessage: '',
      activityReviews: [],
      availableItems: [],
      availableOptions: [],
      uniqueItems: [],
      timeSlots: [],
      selectedActivityStartTime: ''
    };
  },




  created() {

    evBus.$on('checkOutActivity', reqDetails => {
      this.openCheckOutPopUp('activity', this.doCleanArray(reqDetails));
    });

    /*
    this.currentActivity = this.ActivityStore.activities.filter(element => {
      return element.activityId == this.$route.params.id;
    });
    */

    this.currentActivity = [this.ActivityStore.ongoingParentActivity];

    this.slides = this.activityDetail.images.map(item => ({
      img: item.variants[12].url
    }));
    this.scrollToTop();

    this.shortenStrLen(this.activityDetail.description);
    if (this.activityReviews.reviews) {
      this.doMakePaginations(this.activityReviews.reviews);
    }
    this.makeDisplayItems();
  },


  mounted(){
       console.log('Current Availability', this.availabilities);
  },

  methods: {
    makeActivityStartTime(startTime) {

      this.selectedActivityStartTime = startTime;
      
      console.log('makeActivityStartTime raw', startTime);
      console.log('selectedActivityStartTime', this.selectedActivityStartTime);
    },
    truncateStr(str) {
      if (str.length != '' && str.length > 10) {
        return str.replace(/(.{15})..+/, '$1…');
      }
    },
    getActivityReviews() {
      var that = this;
      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      let reqPayLoad = {
        sessionId: this.ActivityStore.sessionId,
        activityId: this.$route.params.id,
        provider: 'ALL',
        count: 10,
        start: 1,
        sortBy: 'MOST_RECENT'
      };
      if (
        this.activityReviews.length == 0 ||
        this.activityReviews == undefined
      ) {
        ActivityServices.getActivityReviews(reqPayLoad, reqHeaders)
          .then(response => {
            if (response.data.data.reviews.length == 0) {
              this.hasReviews = false;
              this.noReviewMessage = 'No Reviews Found';
              return false;
            }
            else{
             
            let cRespond = response.data;
            this.activityReviews = cRespond.data;
            this.hasReviews = true;
            }
          })
          .catch(err => {
            that.$sentry.withScope(function(scope) {
              scope.setExtra('sessionId', that.ActivityStore.sessionId);
              that.$sentry.captureException(new Error(err));
            });
          });
      }
    },

    removeUnderScore: val => {
      if (val === null || val != undefined) {
        return val.replace(/_/g, ' ');
      }
    },

    
    setupAvailabilityItems() { 

        if( this.availabilities.packages !== undefined) {          

          let availAblePackages = [];

          for (let p in this.availabilities.packages)
            if(this.availabilities.packages[p].options[0].available==true) {

              this.availabilities.packages[p].packageId = p;
              availAblePackages.push(this.availabilities.packages[p]);
            }
          

          this.compAvailabilityCount = availAblePackages.length;

          this.availableItems = this.doCleanArray(availAblePackages);

          console.log('available items', this.availableItems)
        }else{
          let availableOptions = [];
          availableOptions.push(this.availabilityData)
          this.availableOptions = this.doCleanArray(availableOptions);
          this.compAvailabilityCount = this.availableOptions.length;
          console.log('options',this.availableOptions)
        }
    },
    
    /*

    setupAvailabilityItems() { 

        if( this.availabilities.packages !== undefined) {          

          let availAblePackages = [];

          for (let p in this.availabilities.packages) {

            if(this.availabilities.packages[p].options[0].available==true)
              availAblePackages.push(p);
          }

          this.availabilitiesCount = availAblePackages.length;

          this.availableItems = availAblePackages;
        }
    },

    */

    scroll() {
      if (this.availabilities !== undefined) {
        this.$forceUpdate();
        this.setupAvailabilityItems();
      }
      window.scrollTo({
        top: 1288,
        behavior: 'smooth'
      });
    },

    addActivityToCart(activityItem, packageId, engine) {
      console.log({engine});
    
      let checkoutPayload = {
        startTime: this.selectedActivityStartTime,
        gradeId: packageId?packageId:'',
        activity: this.currentActivity,
        activityDetails: this.activityDetail,
        activityId: this.$route.params.id,
        availabilityItem: activityItem,
        activityCkAvbDate: activityItem.activityDate,
        searchData: this.searchData
      };

      this.openAddCartPopUpForCar(
        checkoutPayload.activityId,
        checkoutPayload,
        engine
      );
    },

    openCheckOutPopUp: function(engine, infos) {
    
      infos.activity = infos.details.activity;
      infos.pdate = infos.details.searchData.fromDate;
      infos.plocationName = infos.details.searchData.destinationName;
      infos.ddate = infos.details.searchData.toDate;
      infos.ptime = moment(infos.details.searchData.fromDate, 'X').format(
        'HH:mm:ss'
      );
      infos.Id = infos.activityId;
      infos.engineId = infos.activityId;
      infos.gradeId = infos.details.gradeId;
      infos.remaining = [39, 59];
      infos.expire = false;
      infos.showTimes = true;

      let a = moment(infos.pdate, 'YYYY-MM-DD');
      let b = moment(infos.ddate, 'YYYY-MM-DD');
      let total = moment.duration(b.diff(a)).asDays();
      infos.totalNights = total;

      let cader = {
        engine: engine,
        item: infos
      };

      this.$store.dispatch('setCartUpComings', { UPCOMINGS: cader });

      evBus.$emit('openCheckOutPopUp', engine, infos);

      this.doClosePop();
    },

    getSliderImage(images) {
      return images.map(item => ({
        img: item.split('//')[0] + '://' + item.split('//')[1]
      }));
    },

    shortenStrLen(string) {
      if (string.length > 1000) {
        this.activityDescription = string.substr(0, 1000) + '....';
      } else {
        this.activityDescription = this.activityDetail.description;
      }
    },

    showMore() {
      this.activityDescription = this.activityDetail.description;
    },

    hideMore() {
      if (this.activityDescription.length > 1000) {
        this.activityDescription =
          this.activityDetail.description.substr(0, 1000) + '....';
      }
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },

    handlePageChange(value) {
      this.panel = null;
      this.currentPage = value;
      this.makeDisplayItems();
      this.scrollToReviews();
    },
    makeDisplayItems() {
      let arrOfObj = this.getPageData();
      arrOfObj.forEach(item => {
        item.tab = null;
        item.details = '';
        item.expanded = false;
      });

      this.activityReviews.reviews = arrOfObj;
    },

    currentImage(ItemIndex) {
      this.model = ItemIndex;
    },

    scrollToReviews() {
      window.scrollTo({
        top: 1000,
        behavior: 'smooth'
      });
    },

    startSlide: function() {
      this.timer = setInterval(this.next, 10000);
    },

    next: function() {
      this.currentIndex += 1;
    },
    prev: function() {
      this.currentIndex -= 1;
    },

    slide(dir) {
      this.direction = dir;
      dir == 1
        ? (this.transitionName = 'slide-next')
        : (this.transitionName = 'slide-prev');
      var len = this.slides.length;
      this.current = (this.current + (dir % len) + len) % len;
      // this.current = this.current + 1
    }
  },

  computed: {
    ...mapState({
      globalData: state => state.envStore,
      ActivityStore: state => state.ActivityStore,
      searchData: state => state.ActivityStore.searchData,
      activityDetail: state => state.ActivityStore.individualActivityDetail,
      availabilityData: state => state.ActivityStore.searchedAvailabilityData,
      availabilities: state =>
        state.ActivityStore.searchedAvailabilityData.bookableItems
    }),
    compAvailabilityCount:{
       get: function(){
          return this.availabilitiesCount
       },

       set:function(newValue){
          this.availabilitiesCount = newValue
       }
    },
    visiblePages() {
      return this.activityDetail.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },

    totalPageIndexes() {
      return this.totalPages;
    },

    currentImg: function() {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    },

    compPickDateFormatted() {
      return this.formattedDate(this.date1, this.dateFormatPlaceHolder);
    },

    compDropDateFormatted() {
      return this.formattedDate(this.date2, this.dateFormatPlaceHolder);
    },

    minDropOff() {
      return moment(this.date1, 'YYYY-MM-DD')
        .add('days', 1)
        .format('YYYY-MM-DD');
    },

    loadedDealers() {
      return this.getDealers;
    }
  },

  filters: {
    formatDate: function(value) {
      return moment(value).format('MM/DD/YYYY');
    }
  }
};
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Crimson+Text');

/* FADE IN */
.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter {
  opacity: 1;
}
.flex {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.v-application ol,
.v-application ul {
  padding-left: 20px;
}
/* GO TO NEXT SLIDE */
.slide-next-enter-active,
.slide-next-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-next-enter {
  transform: translate(100%);
}
.slide-next-leave-to {
  transform: translate(-100%);
}

/* GO TO PREVIOUS SLIDE */
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-prev-enter {
  transform: translate(-100%);
}
.slide-prev-leave-to {
  transform: translate(100%);
}

/* SLIDES CLASSES */

.blue {
  background: #4a69bd;
}

.red {
  background: #e55039;
}

.yellow {
  background: #f6b93b;
}

/* SLIDER STYLES */
body {
  overflow: hidden;
  margin: 0;
  font-size: 50px;
  /* font-family: 'Crimson Text', sans-serif;*/
  color: #fff;
}

#slider {
  top: 0px;
  width: 100%;
  overflow: hidden;
  height: 100vh;
  position: relative;
}

.slide {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  z-index: 10;
  cursor: pointer;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 46px;
  color: white;
  position: absolute;
  top: calc(50% - 35px);
  left: 1%;
  transition: transform 0.3s ease-in-out;
  user-select: none;
}

.btn-expended {
  top: 40px;
  background-color: #4e5254;
  border: 1px solid black;

  z-index: 10;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 46px;
  color: white;
  position: absolute;
  left: 1%;
  border-radius: 50%;
  display: inline-block;
}

.btn-next {
  left: auto;
  right: 1%;
}

.btn:hover {
  transform: scale(1.1);
}
.guests_text {
  color: #63676b;
}

.text-white {
  color: #fff !important;
  font-weight: 600;
}
</style>
