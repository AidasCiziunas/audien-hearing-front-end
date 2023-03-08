<template>
  <!--cruise booking data start here-->
  <div class="trip-tab-box">
    <v-card>
      <v-row>
        <v-col cols="12">
          <p>
            Specific Booking Information -
            <span style="color: #3d4ed7"> Cruise Booking</span>
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="4">
          <label>Ship Name</label>
          <v-text-field label="Any Cruise Ship" single-line></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <label>Port of Departure</label>
          <v-text-field label="ABCD Port" single-line></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="4">
          <label>Departure Date</label>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedDateFormatted"
                label="Date (read only text field)"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="4">
          <label>Return Date</label>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedDateFormatted"
                label="Date (read only text field)"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
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
                @click="updateSteps('prev')"
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
                @click="updateSteps('next')"
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

  <!--cruise booking data end here-->
</template>
<script>
export default {
  name: 'SpecificBookingCruise',
  data() {
    return {};
  },

  methods: {
    updateSteps(val) {
      this.$emit('updateSteps', val);
    },
  },
};
</script>
