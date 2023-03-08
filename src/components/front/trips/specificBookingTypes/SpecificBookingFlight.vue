<template>
  <!--Flight booking data start here-->
  <div class="trip-tab-box">
    <v-card>
      <v-row>
        <v-col cols="12">
          <p>
            Specific Booking Information -
            <span style="color: #3d4ed7"> Flight Booking</span>
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="4">
          <label>Departure Airport</label>
          <FlightLocation v-model="departure" :isArrival="false" :robListing="true" />
        </v-col>
        <v-col cols="12" sm="4">
          <label>Departure Date</label>
          <Calendar
            v-model="departDate"
            :minimumDate="minDepartureDate"
            @input="checkInSelected()"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="4">
          <label>Return Airport</label>
          <FlightLocation v-model="arrival" :isArrival="true" :robListing="true" />
        </v-col>
        <v-col cols="12" sm="4">
          <label>Return Date</label>
          <Calendar v-model="arrivalDate" :minimumDate="minDropOff" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <label>Total Sales Amount</label>
          <v-text-field label="$1000"></v-text-field>
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
          <v-file-input label="No File Choose" prepend-icon=""></v-file-input>
        </v-col>
        <v-col cols="12" sm="1" class="text-center">
          <v-btn tile color="primary">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
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
  </div>
  <!--flight booking data end here-->
</template>

<script>
var moment = require('moment');
import FlightLocation from '@/components/common/flights/FlightLocation.vue';
import Calendar from '@/components/common/Calendar.vue';
import {
  formattedDate,
  nextDay,
  getVeryNextDate,
} from '@/components/common/utils';
export default {
  name: 'SpecificBookingFlight',
  components: { FlightLocation, Calendar },
  data() {
    return {
      departure: {
        name: '',
        result: '',
      },
      arrival: {
        name: '',
        result: '',
      },

      departureNearby: false,
      arrivalNearby: false,
      departureLocations: [],
      arrivalLocations: [],

      extraData: null,
      minDepartureDate: getVeryNextDate(
        new Date(new Date().setDate(new Date().getDate()))
      ),
      departDate: formattedDate(
        new Date(new Date().setDate(new Date().getDate() + 1)),
        'YYYY-MM-DD'
      ),
      arrivalDate: getVeryNextDate(
        new Date(new Date().setDate(new Date().getDate() + 2))
      ),
    };
  },
  computed: {
    arriveDateFormatted() {
      return this.formattedDate(
        this.arrivalDate,
        this.$store.state.envStore.countryDF
      );
    },
    minDropOff() {
      return moment(this.departDate, 'YYYY-MM-DD')
        .add('days', 1)
        .format('YYYY-MM-DD');
    },
  },
  methods: {
    updateSteps(val) {
      this.$emit('updateSteps', val);
    },
    checkInSelected() {
      let nextDayValue = nextDay(this.departDate, this.arrivalDate);
      if (nextDayValue) {
        this.arrivalDate = nextDayValue;
      }
    },
  },
};
</script>
