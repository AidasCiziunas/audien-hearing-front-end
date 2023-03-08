<template>
  <!--Activity booking data start here-->
  <div class="trip-tab-box">
    <v-card>
      <v-row>
        <v-col cols="12">
          <h6>
            Specific Booking Information -
            <span style="color: #3d4ed7"> Activity Booking</span>
          </h6>
        </v-col>
      </v-row>

      <div class="register-trip-tab-box">
        <v-row>
          <v-col cols="12" sm="4">
            <label class="trip-label">Activity List</label>
            <v-select :items="items" label="Scuba Diving"></v-select>
          </v-col>
          <v-col cols="12" sm="4">
            <label class="trip-label">Date of Activity</label>
            <Calendar v-model="checkInDate" :minimumDate="minimumCheckInDate" />
          </v-col>
        </v-row>
      </div>
      <div class="register-trip-tab-box">
        <v-row>
          <v-col cols="12" sm="4">
            <label class="trip-label">Total Sales Amount</label>
            <v-text-field single-line placeholder="$1000"></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div class="register-trip-tab-box">
        <v-row>
          <v-col cols="12" sm="12">
            <h6>Upload Any Supporting Documents</h6>
            <p>
              Each booking registration requires a supporting email or scanned
              confirmation or other form of received from the supplier (cruise
              line, hotel, car rental company, tour operator, etc.). Save any of
              these documents to your computer, then click the Browse button
              below. Select atleast one such document, click Open, and then
              click Next to complete the registration of your booking.
            </p>
          </v-col>
        </v-row>
      </div>
      <div class="register-trip-tab-box">
        <v-row>
          <v-col cols="12" sm="3">
            <v-file-input
              label="No File Choose"
              prepend-icon=""
              single-line
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="1" class="text-center">
            <v-btn tile color="primary">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <div class="register-trip-tab-box">
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
      </div>
    </v-card>
  </div>
  <!--Activity booking data end here-->
</template>

<script>
var moment = require('moment');
import Calendar from '@/components/common/Calendar.vue';
import {
  formattedDate,
  nextDay,
  addDayToDate,
  getVeryNextDate,
} from '@/components/common/utils';

export default {
  name: 'SpecificBookingActivity',
  components: {
    Calendar,
  },
  data() {
    return {
      destination: {
        name: '',
        result: '',
      },
      checkInDate: null,
      checkOutDate: null,
      minimumCheckInDate: getVeryNextDate(
        new Date(new Date().setDate(new Date().getDate() + 1))
      ),
      isDropOffDisabled: true,
    };
  },

  methods: {
    updateSteps(val) {
      
      this.$emit('updateSteps', val);
    },
    setResult(result) {
      this.destination.name = result.name;
      this.destination.result = result.result;
    },
  },
};
</script>
