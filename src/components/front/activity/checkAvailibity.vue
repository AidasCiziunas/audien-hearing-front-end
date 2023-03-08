<template>
  <div class="room-search-box">
    <div class="room-seach-box-header">
      <p>
        from
        <b>{{ currencySymbol }}{{ currentActivity[0].finalPrice }}</b>
      </p>
    </div>
    <v-form v-model="isFormValid">
      <div class="choose-room-date-box">
        <div class="choose-room-location">
          <h6>Select Dates and Travelers</h6>
          <div class="choose-rrom-date-box">
            <div class="single-input">
              <div style="" class="input-icon">
                <!-- <v-menu ref="menu" content-class="date-picker-backoffice " v-model="menu1" :close-on-content-click="false"
                  :nudge-right="50" transition="scale-transition">
                  <template v-slot:activator="{
                    on,
                    attrs
                  }">
                    <v-text-field v-model="compActivityDate" prepend-inner-icon="far fa-calendar-alt activity-date"
                      :label="!compActivityDate ? countryDF : ''" readonly v-bind="attrs" v-on="on" class="date-input"
                      :rules="[v => !!v || 'Activity Date is required']"></v-text-field>
                  </template>
                  <div class="price-datepicker-wrapper">
                    <calendar 
                      v-model="activityDate"  
                      :format="format" 
                      :clear-button="clear"
                      :placeholder="placeholder"
                      :on-day-click="dateChange"
                      :value-changed="handleValueChange"
                      :has-input="false"
                      :pane="1" 
                      width="300px"
                      :min-date="minPickStartDate"
                      :max-date="maxPickStartDate"
                      class="event-calendar"
                      >
                      <span v-for="evt in events" :slot="evt.date">
                        {{ evt.content }}
                      </span>
                    </calendar>
                  </div>

                </v-menu> -->
                <v-menu 
                    ref="menu" 
                    content-class="date-picker-backoffice" 
                    v-model="menu1"
                    :close-on-content-click="false" 
                    :nudge-right="50" 
                    transition="scale-transition">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field 
                        v-model="compActivityDate" 
                        prepend-inner-icon="far fa-calendar-alt activity-date"
                        :label="!compActivityDate ? countryDF : ''" 
                        readonly 
                        v-bind="attrs" 
                        v-on="on" 
                        class="date-input"
                        :rules="[v => !!v || 'Activity Date is required']"></v-text-field>
                    </template>
                    <div class="price-datepicker-wrapper">
                      <calendar 
                        v-model="activityDate" 
                        @input="handleValueChange" 
                        :format="format" 
                        :clear-button="clear"
                        :placeholder="placeholder" 
                        :on-day-click="dateChange" 
                        :has-input="false" 
                        :pane="1" 
                        width="300px"
                        :min-date="minPickStartDate" 
                        :max-date="maxPickStartDate" 
                        class="event-calendar">
                          <span v-for="evt in events" :slot="evt.date">
                            {{ evt.content }}
                          </span>
                      </calendar>
                    </div>
                </v-menu>
              </div>
            </div>
          </div>
          <div class="choose-rrom-date-box">
            <div class="single-input">
              <v-menu :close-on-content-click="false" :nudge-width="200" offset-y class="v_menu_check"
                style="z-index: 999;">
                <template v-slot:activator="{}">
                  <v-container fluid>
                    <v-row align="center">
                      <v-col class="d-flex  mt-3" cols="12" sm="12"  v-if="travelerAges.length > 0">
                        <v-select  :items="travelerAges" v-model="selTravelerAge"
                          :label="setLabel(traveler)" :rules="[travelerError]"></v-select>
                      </v-col>

                      <v-col class="d-flex mt-3" cols="12" sm="12" v-if="seniorsAges.length > 0">
                        <v-select  :items="seniorsAges" v-model="selSeniorAge"
                          :label="setLabel(seniors)"></v-select>
                      </v-col>

                      <v-col v-if="adultsAges.length > 0" class="d-flex mt-5" cols="12" sm="12">
                        <v-select  :items="adultsAges" :label="setLabel(adults)"
                          v-model="selAdultAge" :rules="[
                            requiresAdultForBooking ? (v => !!v || 'Minimum One Adult is Required') : (selSeniorAge == 0 ? (v => !!v || 'Minimum One Adult is Required') : true)
                          ]">
                        </v-select>
                      </v-col>

                      <v-col v-if="youthsAges.length > 0" class="d-flex" cols="12" sm="12">
                        <v-select :items="youthsAges" v-model="selYouthAge"
                          :label="setLabel(youths)"></v-select>
                      </v-col>

                      <v-col
                        v-if="childrensAges.length > 0"
                        class="d-flex"
                        cols="12"
                        sm="12"
                      >
                        <v-select
                          :items="childrensAges"
                          :label="setLabel(childrens)"
                          v-model="selChildrenAge"
                          :rules="[childrenError]"
                        ></v-select>
                      </v-col>

                      <v-col
                        v-if="infantsAges.length > 0"
                        class="d-flex"
                        cols="12"
                        sm="12"
                      >
                        <v-select
                          :items="infantsAges"
                          v-model="selInfantAge"
                          :label="setLabel(infants)"
                          :rules="[infantError]"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </template>
              </v-menu>
            </div>
          </div>

          <!-- <div class="single-input">
              <v-menu
                :close-on-content-click="false"
                :nudge-width="200"
                offset-y
                class="v_menu_check"
                style="z-index: 999;"
              >
                <template v-slot:activator="{}">
                  <v-container fluid>
                    <v-row
                      align="center"
                      style="margin-top: 20px; margin-bottom: 40px; "
                    >
                      

                      
                    </v-row>
                  </v-container>
                </template>
              </v-menu>
            </div> -->
          <div class="single-input">
            <div class="add-rrom-btn-box">
              <v-row align="center" class="pb-2">
                <v-col cols="12" sm="12">
                  <p class="status-blue">
                    {{
                    
                      removeUnderScore(activityDetail.cancellationPolicy.type)
                    
                    }}
                  </p>
                  <p style="font-size: 12px; color: grey; margin: 5px 0 0 0;"
                    v-html="activityDetail.cancellationPolicy.description"></p>
                </v-col>
              </v-row>
            </div>
          </div>
          <div class="single-input">
            <div class="add-rrom-btn-box">
              <v-row class="pb-2">
                <v-col justify="space-around" cols="12" sm="12" align="center">
                  <v-btn :disabled="!isFormValid" @click="getAvailability()" class="error">
                    Check Availibility
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { evBus } from '@/services/bus.js';
import moment from 'moment';
import ActivityServices from '@/services/api/Activity';
import Calendar from 'vue2-slot-calendar';
export default {
  props: ['activityDetail', 'currentActivity'],
  name: 'checkAvailibility',
  components: {
    Calendar
  },
  data() {
    return {
      activityDate: '',
      date2: '',
      isDropOffDisabled: true,
      rooms: [],
      menu1: false,
      menu2: false,
      traveler: [],
      travelerAges: [],
      adults: [],
      adultsAges: [],
      seniors: [],
      seniorsAges: [],
      childrens: [],
      childrensAges: [],
      infants: [],
      infantsAges: [],
      youths: [],
      youthsAges: [],
      isFormValid: false,
      selTravelerAge: 0,
      selAdultAge: 0,
      selChildrenAge: 0,
      selInfantAge: 0,
      selYouthAge: 0,
      selSeniorAge: 0,
      availableDates: [],
      datesLength: 0,

      dateFormatPlaceHolder: this.$store.state.envStore.countryDF,
      minPickStartDate: this.formattedDate(new Date(), 'YYYY-MM-DD'),
      maxPickStartDate: '',
      disabled: [],
      value: new Date(),
      format: "yyyy-MM-dd",
      clear: true,
      placeholder: "Start Date"
    };
  },
  mounted() {
    this.activityDate = this.ActivityStore.searchData.fromDate;
    this.setupActivityAvailDetails();
    this.getAvailabilityPriceCalendar();
  },

  computed: {
    ...mapState({
      globalData: state => state.envStore,
      ActivityStore: state => state.ActivityStore,
      searchData: state => state.ActivityStore.searchData,
      countryDF: state => state.envStore.countryDF
    }),
    requiresAdultForBooking() {
      try {
        return this.ActivityStore.individualActivityDetail.bookingRequirements.requiresAdultForBooking ? true : false
      } catch (error) {
        return false;
      }

    },
    totalPageIndexes() {
      return this.totalPages;
    },
    compActivityDate() {
      return this.formattedDate(this.activityDate, this.countryDF);
    },

    childrenError() {
      if (this.selAdultAge == 0 && this.selChildrenAge > 0) {
        return 'Sorry you must select minimum of 1 adult with child as per booking activity.';
      } else {
        return true;
      }
    },

    travelerError() {
      if (this.selTravelerAge === 0) {
        return 'Sorry you must select minimum of 1 traveler as per booking activity.';
      } else {
        return true;
      }
    },

    infantError() {
      if (this.selAdultAge == 0 && this.selInfantAge > 0) {
        return 'Sorry you must select minimum of 1 adult with Infants as per booking activity.';
      } else {
        return true;
      }
    },

    currentImg: function () {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    },

    /*       compPickDateFormatted() {

            let formatedDate = this.formattedDate(
                this.activityDate,
                this.dateFormatPlaceHolder
            );
            
            return formatedDate;
        },

        compDropDateFormatted() {
            return this.formattedDate(this.date2, this.dateFormatPlaceHolder);
        }, */

    minDropOff() {
      return moment(this.activityDate, 'YYYY-MM-DD')
        .add('days', 1)
        .format('YYYY-MM-DD');
    },

    loadedDealers() {
      return this.getDealers;
    },
    events() {
      try {
        let event_dates = [];
        for (const [key, value] of Object.entries(this.ActivityStore.individualActivityDetail.productPriceCalendar.dates)) {
          // console.log('key', key, 'value', value);
          event_dates.push({ date: key, content: value.formattedPrice });
        }
        return event_dates;
      } catch (error) {
        return [];
      }
    }
  },
  methods: {
    async getAvailabilityPriceCalendar() {
      //activityStore
      // console.log('this.ActivityStore', this.ActivityStore.individualActivityDetail.productPriceCalendar);
      let availabilityCalendar = await this.getProductPriceCalendar('8515P57');
      // console.log('availabilityCalendar', availabilityCalendar);
    },
    dateChange(date) {
      date = new Date(date);
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);
      this.activityDate = [date.getFullYear(), month, day].join("-");
    },
    handleValueChange() {
      this.$nextTick(() => {
        this.$refs.menu.isActive = false;
      });
    },
    removeUnderScore: val => {
      if (val === null || val != undefined) {
        return val.replace(/_/g, ' ');
      }
    },
    setupActivityAvailDetails() {
      if (this.activityDetail.pricingInfo.ageBands.length > 0) {
        this.adults = this.activityDetail.pricingInfo.ageBands.filter(el => {
          return el.ageBand == 'ADULT';
        });
        this.traveler = this.activityDetail.pricingInfo.ageBands.filter(el => {
          return el.ageBand == 'TRAVELER';
        });

        this.childrens = this.activityDetail.pricingInfo.ageBands.filter(el => {
          return el.ageBand == 'CHILD';
        });
        this.seniors = this.activityDetail.pricingInfo.ageBands.filter(el => {
          return el.ageBand == 'SENIOR';
        });
        this.infants = this.activityDetail.pricingInfo.ageBands.filter(el => {
          return el.ageBand == 'INFANT';
        });
        this.youths = this.activityDetail.pricingInfo.ageBands.filter(el => {
          return el.ageBand == 'YOUTH';
        });

        if (this.adults.length > 0) {
          this.adultsAgeRange(this.adults[0]);
        }
        if (this.seniors.length > 0) {
          this.seniorsAgeRange(this.seniors[0]);
        }
        if (this.childrens.length > 0) {
          this.childrenAgeRange(this.childrens[0]);
        }
        if (this.infants.length > 0) {
          this.infantsAgeRange(this.infants[0]);
        }
        if (this.youths.length > 0) {
          this.youthsAgeRange(this.youths[0]);
        }

        if (this.traveler.length > 0) {
          this.travelerAgeRange(this.traveler[0]);
        }
      } else {
        /*  let people = this.activityDetail.pricingInfo.ageBands;
        switch (people.ageBand) {
          case 'ADULT':
            this.adults = people;
            this.adultsAgeRange(people);
            break;
          case 'CHILD':
            this.childrens = people;
            this.childrenAgeRange(people);
            break;
          case 'INFANT':
            this.infantsAgeRange(people);
            break;
          case 'SENIOR':
            this.seniorsAgeRange(people);
            break;
          case 'YOUTH':
            this.youthsAgeRange(people);
            breakl
          case 'TRAVELER':
            this.travelerAgeRange(people);
            
        } */

        this.availableDates = this.activityDetail.availableDates;
        this.datesLength = this.availableDates.length;

        this.maxPickStartDate = this.formattedDate(
          this.availableDates[this.datesLength - 1],
          'YYYY-MM-DD'
        );
      }
    },

    getAvailability() {
      let ageRanges = []; // This ageRanges Array is where we push all age
      let seniorsRange = {};
      let adultRange = {};
      let youthsRange = {};
      let infantRange = {};
      let childrenRange = {};
      let travelerRange = {};

      if (this.traveler.length > 0 && this.selTravelerAge > 0) {
        travelerRange.ageRangeId = String(this.traveler[0].ageBand);
        travelerRange.count = String(this.selTravelerAge);
        ageRanges.push(travelerRange);
      }

      if (this.seniors.length > 0 && this.selSeniorAge > 0) {
        seniorsRange.ageRangeId = String(this.seniors[0].ageBand);
        seniorsRange.count = String(this.selSeniorAge);
        ageRanges.push(seniorsRange);
      }
      if (this.youths.length > 0 && this.selYouthAge > 0) {
        youthsRange.ageRangeId = String(this.youths[0].ageBand);
        youthsRange.count = String(this.selYouthAge);
        ageRanges.push(youthsRange);
      }

      if (this.infants.length > 0 && this.selInfantAge > 0) {
        infantRange.ageRangeId = String(this.infants[0].ageBand);
        infantRange.count = String(this.selInfantAge);
        ageRanges.push(infantRange);
      }

      // Adults AgeRange SET-UP
      if (this.adults.length > 0 && this.selAdultAge > 0) {
        adultRange.ageRangeId = String(this.adults[0].ageBand);
        adultRange.count = String(this.selAdultAge);
        ageRanges.push(adultRange);
      }

      // Children AgeRange SET-UP
      if (this.childrens.length > 0 && this.selChildrenAge > 0) {
        childrenRange.ageRangeId = String(this.childrens[0].ageBand);
        childrenRange.count = String(this.selChildrenAge);
        ageRanges.push(childrenRange);
      }
      var that = this;
      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      let reqPayLoad = {
        sessionId: this.ActivityStore.sessionId,
        activityId: this.$route.params.id,
        activityDate: moment(this.activityDate).format('YYYY-MM-DD'),
        currencyCode: 'USD',
        ageRange: ageRanges
      };

      ActivityServices.getActivityAvailability((reqHeaders, reqPayLoad))
        .then(response => {
          if (
            response.data.success == false
          ) {
            this.$awn.alert(response.data.message);
          } else if (
            response.data.message ==
            "Sorry, We couldn't find any results matching your criteria, but changing your search may help."
          ) {
            this.$awn.alert(response.data.message);
          } else if (
            response.data.errors.errorName == 'TourNotAvailableException'
          ) {
            this.$awn.alert(response.data.message);
          } else if (
            response.data.errors.Message ==
            'The total number of travelers across all age groups cannot exceed 9'
          ) {
            this.$awn.alert('Total Number of Travelers can not exceed 9');
          } else if (
            response.data.success == false &&
            response.data.message == 'Session Expired. Please initiate a new search request.'
          ) {
            this.$awn.alert(
              'Session Expired. Please initiate a new search request.'
            );
          } else {
            let RESPONSE = response.data.data;
            this.$store
              .dispatch('setsearchedAvailabilityData', RESPONSE)
              .then(() => {
                this.$emit('scroll-to');
              });
          }
        })
        .catch(err => {
          that.$sentry.withScope(function (scope) {
            scope.setExtra('sessionId', that.ActivityStore.sessionId);
            that.$sentry.captureException(new Error(err));
          });
        });
    },
    adultsAgeRange() {
      let min = this.adults[0].minTravelersPerBooking;
      let max = this.adults[0].maxTravelersPerBooking;
      for (let i = min; i <= max; i++) {
        this.adultsAges.push(i);
      }
    },

    childrenAgeRange() {
      let min = this.infants[0].minTravelersPerBooking;
      let max = this.infants[0].maxTravelersPerBooking;
      for (let i = min; i <= max; i++) {
        this.childrensAges.push(i);
      }
    },

    infantsAgeRange() {
      let min = this.infants[0].minTravelersPerBooking;
      let max = this.infants[0].maxTravelersPerBooking;
      for (let i = min; i <= max; i++) {
        this.infantsAges.push(i);
      }
    },

    seniorsAgeRange() {
      let min = this.seniors[0].minTravelersPerBooking;
      let max = this.seniors[0].maxTravelersPerBooking;
      for (let i = min; i <= max; i++) {
        this.seniorsAges.push(i);
      }
    },
    youthsAgeRange() {
      let min = this.youths[0].minTravelersPerBooking;
      let max = this.youths[0].maxTravelersPerBooking;
      for (let i = min; i <= max; i++) {
        this.youthsAges.push(i);
      }
    },

    travelerAgeRange() {
      let min = this.traveler[0].minTravelersPerBooking;
      let max = this.traveler[0].maxTravelersPerBooking;
      for (let i = min; i < max; i++) {
        this.travelerAges.push(i);
      }
    },

    remakeDropDate: function () {
      if (!this.activityDate) return false;
      let nextDay = this.formattedDate(
        moment(this.activityDate).add(1, 'days'),
        'YYYY-MM-DD'
      );
      var end = moment(this.avaliableDates[this.datesLength - 1]);
      var start = moment(this.activityDate);
      var duration = moment.duration(end.diff(start));
      var hours = duration;
      if (hours._milliseconds < 0) {
        this.minDropStartDate = nextDay;
        this.date2 = nextDay;
      }
      if (this.date2 == null) {
        this.minDropStartDate = nextDay;
        this.date2 = nextDay;
      }
      //
      // if (!this.date2) return true;
      //
      return this.compDropDateFormatted;
    },
    formattedDate: function (date, format) {
      if (!date) return null;
      return moment(date).format(format);
    },

    setLabel(labelHolder) {
      if (this.activityDetail.pricingInfo.ageBands.length > 0) {
        let currentHolder = this.activityDetail.pricingInfo.ageBands.filter(
          el => {
            return el.ageBand == labelHolder[0].ageBand;
          }
        );
        return `${currentHolder[0].ageBand.charAt(0).toUpperCase() +
          currentHolder[0].ageBand.slice(1).toLowerCase()} (${currentHolder[0].startAge
          }-${currentHolder[0].endAge})`;
      } else {
        let currentHolder = this.activityDetail.pricingInfo.ageBands;
        return `${currentHolder.ageBand} (${currentHolder.startAge}-${currentHolder.startAge})`;
      }
    },

    scrollToAvailabilitySection() {
      window.scrollTo({
        top: 1500,
        behavior: 'smooth'
      });
    }
  }
};
</script>
<style scoped>
.v-menu__content.theme--light.menuable__content__active.date-picker-backoffice {
  min-width: 300px !important;
}
</style>
