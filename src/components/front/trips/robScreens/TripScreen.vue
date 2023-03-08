<template>
  <div class="trip-tab-box">
    <v-card>
      <v-row>
        <v-col cols="12">
          <p style="color: #1e255d; margin-top: 2px">
            Is this on Existing Trip or a New Trip?
          </p>
          <v-radio-group v-model="typeOfTrip" row>
            <v-radio label="New" value="new"></v-radio>
            <v-radio label="Existing" value="existing"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <div class="register-trip-tab-box">
        <v-form lazy-validation ref="tripForm">
          <v-row>
            <v-col cols="12" sm="6">
              <v-row v-if="typeOfTrip == 'new'">
                <v-col cols="12" sm="3">
                  <label class="trip-label">New Trip<span class="red--text">*</span> </label>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-text-field required placeholder="New trip name here " v-model="tripName" 
                  :rules="[(v) => !!v || 'Trip name is required']"></v-text-field>
                </v-col>
              </v-row>
              <v-row v-if="typeOfTrip == 'existing'">
                <v-col cols="12" sm="3">
                  <label class="trip-label">Existing Trip<span class="red--text">*</span>
                  </label>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-select v-model="existingTrip" :label="!tripExist ? 'Please Select a Trip': ''" :items="mytrips" item-text="tripName" item-value="tripId"
                    @change="selectTrip($event)" :rules="[v => !!v || 'Please select a trip']"></v-select>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" sm="6">
              <v-row>
                <v-col cols="12" sm="3">
                  <label class="trip-label">Trip Location
                  </label>
                </v-col>
                <v-col cols="12" sm="9">
                  <v-select v-model="tripLocation" :items="tripLocations" :rules="[v => !!v || 'Trip location required']"></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3" sm="4">
              <v-row>
                <v-col cols="6" class="mt-5 mb-5">
                  <v-btn type="submit" @click.prevent="updateSteps('next')" color="error" class="car-search-btn">
                    <strong>NEXT</strong>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-card>
  </div>
</template>

<script>
import { evBus } from '@/services/bus.js';
import { mapState } from 'vuex';
import tripServices from '@/services/api/Trips.js';
import moment from 'moment'
import _ from 'lodash'
export default {
  name: 'TripScreen',
  data() {
    return {
      typeOfTrip: '',
      tripName: '',
      existingTrip: '',
      tripLocation: 'United States',
      tripLocations: [
        'United States',
        'United Kingdom',
        'Mexico',
        'United Aarab Emirate',
      ],
      mytrips: [],

    }
  },

  computed: {
    ...mapState({
      userTrips: (state) => state.tripStore.userTripDetais,
      tripExist: (state) => state.tripStore.tripExist,
    }),

    
  },
  created(){
    this.fetchMyTrips();
  },
  mounted() {
    this.typeOfTrip = this.userTrips && this.tripExist ? 'existing' : 'new';
  },

  methods: {
    selectTrip(tripId) {

      this.$confirm('Do you want to select this trip?', {
        title: 'Select Trip?',
      }).then((res) => {
        if (res == false){
          this.existingTrip = ''
          return false;
        } 

        let reqHeaders = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        let reqPayLoad = {
          searchBy: 'tripId',
          searchKey: tripId,
        };

        tripServices.searchTrip((reqHeaders, reqPayLoad)).then((response) => {
          if (response.data.errors.message == 'Session is expired.') {
            this.$awn.success(
              'Your being timed out due to inactivity, Please try View Hotel again !'
            );

          } else if (
            response.data.message ==
            'Hotel Package not found! Please try again later.'
          ) {
            this.$awn.alert(
              'We have not received the details needed from our supplier to view this hotel . Please select another hotel.'
            );
          } else {
           
            
            let searchedTripInfo = this.mytrips.find((o) => {
              if (o.tripId == tripId) return true;
            });
            this.$store.dispatch('resetExpireItemSearchedDetails');

            this.ckTripBasicInfo(searchedTripInfo);

            this.refreshTripWhenItemRemoved = false;

            this.setUpTripDetails(response.data.data[0], 'mixins', false);

            this.checkTripItemsExpiry(response.data.data[0]);

            if (response.data.data[0].tripbookings.length > 0) {
              this.$store.dispatch('UserAllTripsDetails', response.data.data);
            } else {
              this.$awn.alert(
                'Trip booking data not available for this trip ID.'
              );
            }
          }
        });
      });
    },

    ckTripBasicInfo: function (tripNavInfo) {
      let storePayload = {
        name: tripNavInfo.tripName,
        trip_id: tripNavInfo.tripId,
        tripStartDate: '',
        trv_name: '',
        primaryTravellerId: 0,
      };

      if (tripNavInfo.triptravellers.length) {
        storePayload.trv_name =
          tripNavInfo.triptravellers[0].traveller.firstName +
          ' ' +
          tripNavInfo.triptravellers[0].traveller.lastName;

        storePayload.primaryTravellerId =
          tripNavInfo.triptravellers[0].traveller.iUserID;

        storePayload.tripStartDate =
          tripNavInfo.triptravellers[0].created_at.substr(0, 10);
      }

      if (typeof tripNavInfo.tripStartDate != 'undefined')
        storePayload.tripStartDate = tripNavInfo.tripStartDate.substr(0, 10);

      this.$store.dispatch('setTripDetail', { TRIP: storePayload });

      return true;
    },

    checkTripItemsExpiry(itemsOfTrip) {
      evBus.$emit('expireItem', false);

      let _tripBookings = itemsOfTrip.tripbookings;

      if (_tripBookings.length) {
        _tripBookings.forEach((item) => {
          if (item.sessionDetails.expire == true && item.status != 'booked') {
            evBus.$emit('expireItem', true);
          }
        });
      }
    },
    updateSteps(val) {
      if (!this.$refs.tripForm.validate()) return;
      if(this.typeOfTrip == 'new'){
          let reqHeaders = {
             headers:{
              'Content-Type': 'application/json'
             }
          }

          let reqPayLoad = {
             tripName: this.tripName,
             tripStartDate: moment().format('YYYY-MM-DD'),
             type: 'register_outside'
          }

          tripServices.createTrip(reqPayLoad, reqHeaders)
          .then((rsp) =>{
              if(rsp.data.success){
                 this.$awn.info('Trip Added Successfully', {label:{info: 'Trip Added'}})
                 this.$store.dispatch('tripScreenState', { tripId: rsp.data.data.tripId });
                 this.$emit('newTripCreated', true)
               setTimeout(()=>{
                if(this.tripExist){
                this.$store.dispatch('reSetTrip')
                }

                this.fetchMyTrips()
                this.typeOfTrip = 'existing'
                 this.$emit('updateSteps', val)
                 },3000) 
                 
              }
          })
          .catch((err) =>{
              this.$awn.alert(err.data.message)
          })
      }
      else{
        if(!this.tripExist){
          this.$store.dispatch('tripScreenState', { tripId: this.mytrips[0].tripId });
          console.log('ex',  this.mytrips[0].tripId)
          this.$emit('updateSteps', val);
        }
        else{
          console.log('nex',  this.userTrips[0].tripId)
          this.$store.dispatch('tripScreenState', { tripId: this.userTrips[0].tripId });
          this.$emit('updateSteps', val);
        }
       
      
      }
    
    },
    fetchMyTrips() {
      let reqHeaders = {
        headers: {
          Authorization:
            'Bearer ' + this.token == undefined
              ? this.authStore.token
              : this.token,
        },
      };
      let that = this;
      tripServices.getUserTrip(reqHeaders).then((rsp) => {
        let _trips = rsp.data.data
        that.mytrips = _trips
        if (that.tripExist) {
         that.existingTrip = that.userTrips[0].tripId 
        } 
      });
    },
  }

}
</script>