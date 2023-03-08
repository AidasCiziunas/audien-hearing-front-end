<template>
  <!--hotel booking data start here-->
  <div class="trip-tab-box">
  <v-form lazy-validation ref="hotelForm">
    <v-card>
      <v-row>
        <v-col cols="12">
          <p>
            Specific Booking Information -
            <span style="color: #3d4ed7"> Hotel/Resort Booking</span>
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="4">
          <DestinationSearch v-model="destinationValue" :robListing="true" />
        </v-col>
        <v-col cols="12" sm="4">
          <label>Check In Date</label>
          <Calendar
            v-model="checkInDate"
            :minimumDate="minimumCheckInDate"
            @input="
              isDropOffDisabled = true;
              checkInSelected();
            "
          />
        </v-col>
        <v-col cols="12" sm="4">
          <label>Check Out Date</label>
          <Calendar
            @click="checkIsMobile"
            v-model="checkOutDate"
            :isMobile="isMobile"
            :minimumDate="minimumCheckOutDate"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <label>Total Sales Amount</label>
          <v-text-field  v-model="totalSalesAmount" hide-details="auto"
          placeholder="Enter total sales amount"
          :rules="[v => !!v || 'Total sales amount is required']"></v-text-field>
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
          <v-col cols="12" sm="3">
            <v-file-input accept="text/csv" style="cursor:pointer;" v-model="hotelSupportingDocs" small-chips show-size  multiple
            placeholder="Choose documents" prepend-inner-icon="'fas fa-upload'" 
            :rules="[checkFiles()]"
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
              <v-btn
                @click.prevent="updateSteps('prev')"
                color="primary"
                class="car-search-btn"
              >
                <strong>BACK</strong>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4" sm="2">
          <v-row>
            <v-col cols="12">
              <v-btn
                @click.prevent="updateSteps('next')"
                color="error"
                class="car-search-btn"
              >
                <strong>NEXT</strong>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-form>
  </div>
  <!--Hotel booking data end here-->
</template>

<script>
import DestinationSearch from '@/components/backend/partials/hotels/DestinationSearch.vue';
import Calendar from '@/components/common/Calendar.vue';
import {
  formattedDate,
  nextDay,
  addDayToDate,
  getVeryNextDate,
} from '@/components/common/utils';

export default {
  name: 'SpecificBookingHotel',
  components: { DestinationSearch, Calendar },
  data() {
    return {
      totalSalesAmount: '',
      isMobile: false,
      checkInDate: null,
      checkOutDate: null,
      isDropOffDisabled: true,
      destinationValue: {
        sPickup: '',
        name: '',
        geoLat: '',
        geoLong: '',
        locationId: '',
        locationType: ' ',
      },
      minimumCheckInDate: getVeryNextDate(
        new Date(new Date().setDate(new Date().getDate() + 1))
      ),
      hotelSupportingDocs:[]
    };
  },

  computed: {
    minimumCheckOutDate() {
      return addDayToDate(this.checkInDate);
    },
  },

  methods: {
    checkFiles(){
      if( this.hotelSupportingDocs.length == 0){
          return 'Please select atleast one document'
      }else{
         return true
      }
    },
    remove(index){
      this.$delete(this.hotelSupportingDocs, index);
    },
    selectFiles(){
      this.log('files', this.hotelSupportingDocs)
    },
    updateSteps(val) {
      if(!this.$refs.hotelForm.validate()) return;

      this.$emit('updateSteps',val);
    },
    checkInSelected() {
      let nextDayValue = nextDay(this.checkInDate, this.checkOutDate);
      if (nextDayValue) {
        this.checkOutDate = nextDayValue;
      }
    },

    checkIsMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },
};
</script>
