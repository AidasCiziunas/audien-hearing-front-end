<template>
  <span style="display: block !important" class="tipdetail-page-listing pl-4 pr-4 pb-4">
  <div v-for="(trip, tripIndex) in tripBooking" :key="tripIndex" class="" style="">
      <div class="new-expair-item-wrapper" v-if="trip.engineId == null">
        <div class="title-heading" style="padding-left: 15px">
          <h2 class="blue-heading">
            <i class="fas fa-hotel" style="font-size: 24px"></i>
           {{ trip.engine }}
          </h2>
        </div>

        <div class="col-lg-12">
          <v-expansion-panels>
            <v-expansion-panel>
              <div class="single-listing-repeat">
                <div class="single-listing">
                  <div class="main-left car-left-box hotel-main-left activity-main-left">
                    <div class="hotel-name activity-listing-img">
                      <div class="new-expairy-left-box">
                        <div class="new-expairy-img-box">
                          <img src="https://cdn-icons-png.flaticon.com/512/35/35920.png" />
                        </div>
                        <div class="new-expairy-left-box-text" style="padding-top: 40px">
                          <p>Type of Booking</p>
                          <h5>{{ bookingTypeTitle[trip.engine]}}</h5>
                        </div>
                        <div class="new-expairy-left-box-text">
                          <p>Supplier</p>
                         <h5>{{ trip.booking.vcVendor }}</h5>
                        </div>
                      </div>

                      <div class="new-expairy-right-box">
                        <div class="new-expairy-right-anitmiteis">
                          <p v-if="trip.booking.nBookingID">Booking Number <strong>{{ trip.booking.nBookingID }}</strong></p>
                          <p v-if="trip.booking.vcConfirmationID">Confirmation Number <strong>{{ trip.booking.vcConfirmationID }}</strong></p>
                        </div>
                        <div class="new-expairy-right-anitmiteis">
                          <p v-if="trip.booking.vcSupplierID">Supplier Reference<strong>{{ trip.booking.vcItineraryID }}</strong></p>
                          <p v-if="trip.booking.vcOtherID">Other Number <strong>{{ trip.booking.vcOtherID }}</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="hotel-main-right">
                    <div class="product-reverse hotel-product-reverse new-expairy-reverse-box">

                      <div class="expairy-ribbon"><i class="fas fa-tag"></i> Source: Register Booking</div>
                      <h2><span>$278.01</span></h2>
                     <!--  <p>Not Booked</p> -->

                      <!-- <v-btn small color="error" dark class="expair-update-btn">Update</v-btn> -->

                      <v-expansion-panel-header v-if="!expanded" @click.prevent="expanded = !expanded">
                        <div class="collpase-heading">
                          <span>Show Details</span>
                        </div>
                      </v-expansion-panel-header>

                      <v-expansion-panel-header v-if="expanded" @click.prevent="expanded = !expanded">
                        <div class="collpase-heading">
                          <span>Hide Details</span>
                        </div>
                      </v-expansion-panel-header>
                    </div>
                  </div>
                </div>
              </div>
              <v-expansion-panel-content>
                <div class="car-listing-tabs-outer">
                  <div class="car-listing-tabs">
                    <v-card flat>
                      <v-card-text>
                        <div class="new-expairy-traveler-row">
                          <div class="new-expairy-traveler-col w-20">
                            <h5>#Travelers</h5>
                            <p>{{ trip.booking.nNumberOfPsgrs }}</p>
                          </div>
                          <div class="new-expairy-traveler-col w-20">
                            <h5>Primary Traveler:</h5>
                            <p>{{ trip.booking.vcClientName }}</p>
                          </div>
                          <div v-if="trip.booking.email" class="new-expairy-traveler-col">
                            <h5>Primary Email:</h5>
                            <p>sam@mediamindstudios.com</p>
                          </div>
                          <div class="new-expairy-traveler-col">
                            <h5>Date Booked:</h5>
                            <p>{{ formatDate(trip.booking.dBooked) }}</p>
                          </div>
                        </div>
                        <div class="new-expairy-charge-left-box">
                          <p>Total Charges:<strong>{{CSymbol}}{{ trip.booking.nTotalCharges}}</strong></p>
                          <p>Total Commission:<strong>{{CSymbol}}{{ trip.booking.nTotalCommission}}</strong></p>
                          <p>Commissionable Amount:<strong>{{CSymbol}}120</strong></p>
                        </div>
                        <div class="new-expairy-charge-right-box">
                          <p>
                            Pic-up Location:<strong>{{ trip.booking.vcLiftCity }}</strong>
                          </p>
                          <p>Drop-off Location:<strong>{{ trip.booking.vcFinalDestination }}</strong></p>
                          <p>Drop-off Date:<strong>{{ formatDate(trip.booking.dTravelEndDate) }}</strong></p>
                        </div>
                        <div class="new-expairy-doc-row">
                          <div v-for="(file, fileIndex) in trip.booking.files" :key="fileIndex"  class="expairy-pdf-doc">
                            <img src="https://cdn-icons-png.flaticon.com/512/35/35920.png" /><br/>
                            <p><a :href="file.path" download="Sample_file" style="position: absolute; left: 0; text-decoration: none; cursor: pointer">{{ getFileName(file.path) }}</a></p>
                          </div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>


    </div>
  </span>
</template>

<script>
var moment = require('moment');
import robServices from '@/services/api/RegisterOutsideBookings.js';
import {
  formattedDate
} from '@/components/common/utils';

import { mapState } from 'vuex';
import _ from 'lodash';
export default {
  name: 'RegisterOutSideBookingItem',
  props: ['engine', 'tripBooking'],
  data() {
    return {
      expanded: false,
      bookingTypeTitle: {
        hotel: 'Hotel/Resort',
        car: 'Car Rental',
        vacation: 'Vacation',
        flight: 'Flight',
        activity: 'Activity',
      },
      suppliersList: [],
      bookings: [],
    };
  },

  computed:{
    ...mapState({
      countryDF: (state) => state.envStore.countryDF,
      CSymbol: (state) => state.envStore.CSymbol
    }),

  },

  methods:{
    getFileName(path){
      let splitedPath = path.split('_.')
      let fileName = splitedPath[1].split('.')[0].split('-')[0]
      return fileName.concat('.'+splitedPath[1].split('.')[1],"")
    },
    formatDate(date){
      return formattedDate(date, this.countryDF);
    }
  }
};
</script>
