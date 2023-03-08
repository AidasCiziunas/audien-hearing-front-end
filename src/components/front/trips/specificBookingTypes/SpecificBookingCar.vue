<template>
  <!--car booking data start here-->
  <div class="trip-tab-box">
    <v-form lazy-validation ref="carForm">
      <v-card>
        <v-row>
          <v-col cols="12">
            <p>
              Specific Booking Information -
              <span style="color: #3d4ed7"> Car Rental Booking</span>
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-radio-group v-model="mainLocation" :rules="mainLocationRules" row>
              <v-radio label="Airport Location" value="Airport"></v-radio>
              <v-radio label="City Location" value="City"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <label>Pick Up Location<span class="red--text">*</span></label>
            <CarLocation :value="pickUpLocation" @input="pickUpSelected" :mainLocation="mainLocation"
              :isDroppOff="false" :robListing="true" ></CarLocation>
          </v-col>
          <v-col cols="12" sm="4">
            <label>Pick Up Date<span >*</span></label>
            <Calendar v-model="checkInDate" :minimumDate="minimumCheckInDate" @input="isDropOffDisabled = true;checkInSelected();
            " />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4">
            <label>Drop-off Location<span class="red--text">*</span></label>
            <CarLocation v-model="dropOffLocation" :isDropOff="true" :robListing="true" :mainLocation="mainLocation" />
          </v-col>
          <v-col cols="12" sm="4">
            <label>Drop-off Date<span>*</span></label>
            <Calendar v-model="checkOutDate" :minimumDate="minimumCheckOutDate" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <label>Number of Travellers<span class="red--text">*</span></label>
            <v-text-field  v-model="nOfTravellers" :rules="[v => !!v || 'Number of Traveller is Required']" placeholder="Number of Travellers"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <label>Date Booked<span class="red--text">*</span></label>
            <template>
            <v-menu
            :close-on-content-click="false"
            v-model="showCalendar"
            relative
            min-width="290px"
          >
          <template v-slot:activator="{ on, attrs }">
            <div class="dropoff-location-wrapper" style="">
              <v-text-field
                v-model="displayDate"
                :label="countryDF"
                :prepend-inner-icon="'far fa-calendar-alt'"
                :rules="[v => !!v || 'Book date is required']"
                readonly 
                v-bind="attrs"
                v-on="on"
              >
              </v-text-field>
            </div>
          </template>
          <v-date-picker
            v-model="dateBooked"
            :max="currentDateFormatted"
            @input="showCalendar = false"
            no-title
          />
        </v-menu>
        </template>
          </v-col>
          </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <label>Total Sales Amount<span class="red--text">*</span></label>
            <v-text-field  placeholder="Total sales amount" v-model="compTotalSalesAmount" hide-details="auto"
              :rules="[exceededSalesAmount()]" @blur="formatCurrency(compTotalSalesAmount, 'sales')"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <label>Total Commission<span class="red--text">*</span></label>
            <v-text-field placeholder="Total commission" v-model="compTotalCommissionAmount" hide-details="auto"
              :rules="[v => !!v || 'Commission amount required']" @blur="formatCurrency(compTotalCommissionAmount, 'commission')"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <h6>Upload Any Supporting Documents</h6>
            <p>
              Each booking registration requires a supporting email or scanned
              confirmation or other form of received from the supplier (cruise
              line, hotel, car rental company, tour operator, etc.). Save any of
              these documents to your computer, then click the Browse button
              below. Select atleast one such document, click Open, and then click
              Next to complete the registration of your booking.
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3" style="margin-bottom: 20px;">
            <label>Choose File</label>
            <v-file-input accept="text/csv" style="cursor:pointer;"  v-model="carSupportingDocs" small-chips show-size  multiple
            placeholder="Choose documents" prepend-inner-icon="'fas fa-upload'"
            :rules="[checkSupportingDocs()]"
            @change="selectFiles()">
            <template v-slot:selection="{ text, index, file }">
            <v-chip
              small
              close
              @click:close="remove(index)"
            >
              {{ text }}
            </v-chip>
         </template>
          </v-file-input>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" sm="2">
            <v-row>
              <v-col cols="12">
                <v-btn @click.prevent="updateSteps('prev')" color="primary" class="car-search-btn">
                  <strong>BACK</strong>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4" sm="2">
            <v-row>
              <v-col cols="12">
                <v-btn @click.prevent="updateSteps('next')" color="error" class="car-search-btn">
                  <strong>NEXT</strong>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </div>
  <!--car booking data end here-->
</template>

<script>
var moment = require('moment');
import { mapState } from 'vuex';
import CarLocation from '../../../common/cars/CarLocation.vue';
import Calendar from '@/components/common/Calendar.vue';
import {
  formattedDate,
  nextDay,
  addDayToDate,
  getVeryNextDate,
} from '@/components/common/utils';

export default {
  name: 'SpecificBookingCar',
  data() {
    return {
      showCalendar:false,
      dateBooked: null,
      currentDate:'',
      nOfTravellers: 1,
      carSupportingDocs:[],
      name: 'Specific Booking Car',
      mainLocation: 'Airport',
      mainLocationRules: [
        (v) => !!v || 'At least one location should be selected',
      ],
      pickUpLocation: {
        name: '',
        result: '',
      },
      dropOffLocation: {
        name: '',
        result: '',
      },
      isDropOffDisabled: true,
      checkInDate: null,
      minimumCheckInDate: getVeryNextDate(
        new Date(new Date().setDate(new Date().getDate()))
      ),

      checkOutDate: null,
      totalSalesAmount: 0,
      totalCommission:0
    };
  },
  computed: {
    ...mapState({
       CType: state => state.envStore.CType,
       countryDF: state => state.envStore.countryDF,
       locale: state => state.envStore.locale,
       CSymbol: state => state.envStore.CSymbol
    }),
    currentDateFormatted() {
      return moment().format('YYYY-MM-DD').toString()
    },
    minimumCheckOutDate() {
      return addDayToDate(this.checkInDate);
    },
    displayDate() {
      return formattedDate(this.dateBooked, this.countryDF);
    },
    compTotalSalesAmount:{
       get:function(){
          return this.totalSalesAmount
       },

       set:function(newValue){
        this.totalSalesAmount = newValue
       }
    },
    compTotalCommissionAmount:{
      get:function(){
         return this.totalCommission
      },
      set: function(newValue){
         this.totalCommission = newValue
      }
    }


  },

  mounted() {
    let that = this;
    that.totalCommission = new Intl.NumberFormat(that.locale,{
          style: 'currency',
          currency: that.CType
        }).format(that.totalCommission)
      
        that.totalSalesAmount = new Intl.NumberFormat(that.locale,{
          style: 'currency',
          currency: that.CType
        }).format(that.totalSalesAmount)

        let orginalNumber = parseFloat(this.totalSalesAmount.replace(/[^\d.-]/g, ''))
        console.log('originalNumber', orginalNumber)
  },
  methods: {
    checkSupportingDocs(){
       if( this.carSupportingDocs.length == 0){
          return 'Atlease one supporting document is required'
       }
       else{
         return true
       }
    },
    exceededSalesAmount(){
      if(!isNaN(this.compTotalSalesAmount) && this.compTotalSalesAmount > 50000){
         return `For bookings over ${this.CSymbol}50,000 please contact us`
      }
      if(this.compTotalSalesAmount == 0){
         return 'Sales amount is required'
      }
      else{
         return true
      }
    },
    formatCurrency(value, type){
      if( type == 'commission'){
      let that = this
      if (isNaN(value)) {
        value = 0
      }
      that.compTotalCommissionAmount = new Intl.NumberFormat(that.locale,{
          style: 'currency',
          currency: that.CType
        }).format(value)
      }
      else{
       let that = this
      if (isNaN(value)) {
        value = 0
      }
      if(that.compTotalSalesAmount <= 50000){
      that.compTotalSalesAmount = new Intl.NumberFormat(that.locale,{
          style: 'currency',
          currency: that.CType
        }).format(value)
      }
    }
      
    },
    remove(index){
      this.$delete(this.carSupportingDocs, index);
    },
    selectFiles(){
      this.log('files', this.carSupportingDocs)
    },
    pickUpSelected(result) {
      this.pickUpLocation = { ...result };
      this.dropOffLocation = { ...this.pickUpLocation };
    },
    checkInSelected() {
      let nextDayValue = nextDay(this.checkInDate, this.checkOutDate);
      if (nextDayValue) {
        this.checkOutDate = nextDayValue;
      }
    },

    updateSteps(val) {
      if(val == 'prev'){
      this.$emit('updateSteps', val);
      }
      
      else if(val == 'next' && !this.$refs.carForm.validate()){
        return
      }
      else{
  
       const storePayLoad = {
        vcLiftCity: this.pickUpLocation.name,
        vcFinalDestination: this.dropOffLocation.name,
        dTravelStartDate: moment(this.checkInDate).format('YYYY-MM-DD HH:mm:ss'),
        dTravelEndDate: moment(this.checkOutDate).format('YYYY-MM-DD HH:mm:ss'),
        dBooked: moment(this.dateBooked).format('YYYY-MM-DD HH:mm:ss'),
        nTotalCharges: this.compTotalSalesAmount.replace(/[^\d.-]/g, ''),//remove format before passing to API
        nNumberOfPsgrs: this.nOfTravellers,
        nTotalCommission: this.compTotalCommissionAmount.replace(/[^\d.-]/g, ''), //remove format before passing to API
        nTotalCurrency: this.$store.state.envStore.CType,
        files: this.carSupportingDocs
       }

      this.$store.dispatch('specificBookingState', storePayLoad);
      this.$emit('updateSteps', val);
      }
    },
  },
  watch: {
    mainLocation() {
        this.pickUpLocation = {
          name: '',
          result: '',
        };
        this.dropOffLocation = {
          name: '',
          result: '',
        };
    },
  },
  components: { CarLocation, Calendar },
};
</script>
