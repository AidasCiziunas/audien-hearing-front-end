<template>
  <v-card>
    <div class="car-popup-body">
      <div class="car-popup-heading">
        <h2 class="v-heading text-h6 mb-2">
          <img :src="require('@/assets/images/trip-icon-new.svg').default" />
          <span>Search Existing Trip</span>
        </h2>
      </div>

      <v-form ref="sform" class="" lazy-validation>
        <v-container>
          <v-row style="margin-top: 10px">
            <div class="col-md-12">
              <div class="">
                <div class="add-travel-form">
                  <v-row class="m-0">
                    <div class="col-md-6 col-sm-6">
                      <div class="add-travel-input">
                        <v-select
                          placeholder="Search existing trip"
                          :items="searchCaders"
                          item-text="title"
                          item-value="value"
                          v-model="searchBy"
                          :rules="searchTripRules"
                          @change="fetchALLTrips($event)"
                        >
                        </v-select>
                      </div>
                    </div>
                    <div class="col-md-6 col-sm-6" v-if="searchBy == 'tripId'">
                      <div class="add-travel-input">
                        <v-text-field
                          placeholder="Enter Trip ID"
                          v-model="searchTripId"
                          :rules="searchTripRules"
                        >
                        </v-text-field>
                      </div>
                    </div>

                    <div
                      class="col-md-6 col-sm-6"
                      v-if="searchBy == 'tripName'"
                    >
                      <div class="add-travel-input">
                        <v-text-field
                          placeholder="Enter Trip Name"
                          v-model="searchTripName"
                          :rules="searchTripRules"
                        >
                        </v-text-field>
                      </div>
                    </div>
                    <div
                      class="col-md-6 col-sm-6"
                      v-if="searchBy == 'tripStartDate'"
                    >
                      <div class="add-travel-input">
                        <!-- Date Picker Work -->
                        <v-menu
                          v-model="menu1"
                          :close-on-content-click="false"
                          :nudge-right="50"
                          transition="scale-transition"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="compPickDateFormatted"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :rules="birthDateRules"
                              :placeholder="dateFormatPlaceHolder"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date1"
                            :max="maxPickStartDate"
                            @input="menu1 = false"
                            no-title
                          ></v-date-picker>
                        </v-menu>
                        <!-- Date Picker Work -->
                      </div>
                    </div>
                  </v-row>
                </div>
              </div>
            </div>
          </v-row>

          <v-row>
            <v-data-table
              :headers="headers"
              :items="mytrips"
              :items-per-page="5"
              v-if="mytrips.length > 0"
            >
              <template v-slot:item="row">
                <tr class="exiting-trip-table-row">
                  <td>{{ row.item.srIndex }}</td>
                  <td>{{ row.item.tripId }}</td>
                  <td>
                    <span v-if="row.item.tripName.length <= 15">
                      {{ row.item.tripName }}
                    </span>

                    <span :title="row.item.tripName" v-else>
                      {{ row.item.tripName.substring(0, 15) + '..' }}
                    </span>
                  </td>
                  <td>{{ row.item.pTraveler }}</td>
                  <td class="trip-btn-col" style="padding: 0px">
                    <v-btn
                      x-small
                      min-height="26px"
                      color="primary"
                      class="select-trip-popup"
                      dark
                      @click="saveNavTripInfo(row.item)"
                    >
                      Select Trip
                    </v-btn>
                    <v-btn
                      x-small
                      min-height="26px"
                      color="error"
                      class="remove-trip-popup"
                      dark
                      @click="
                        removeTrip(
                          row.item.tripId,
                          row.item.nUserID,
                          row.item.tripbookings.id
                        )
                      "
                    >
                      Remove Trip
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-row>
        </v-container>
      </v-form>

      <div class="car-popup-content mt-3" style="min-height: auto">
        <div class="text-center car-popup-button">
          <v-btn color="error" @click="saveToExisting()">
            <!--
                      <img src="@/assets/images/save-trip-icon.png" alt="img">
                    -->
            <i class="fas fa-search"></i> &nbsp; Search Existing Trip
          </v-btn>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import { evBus } from '@/services/bus.js';
import tripServices from '@/services/api/Trips';
import cartHelper from '@/helper/addCartHelper';
var moment = require('moment');
export default{
    name:'SearchExistingTrip',
    mixins:[cartHelper],
    data(){
        return{
            openAddCartPopUp: false,
            existingTrip: false,
            menu1: false,
            searchBy: 'tripId',
            searchTripId: null,
            searchTripName: null,
            maxPickStartDate: this.formattedDate(new Date(), 'YYYY-MM-DD'),
            date1: null,
            dateFormatPlaceHolder: this.$store.state.envStore.countryDF,
            searchCaders: [
                { title: 'ALL', value: 'all' },
                { title: 'Search By Trip Id', value: 'tripId' },
                { title: 'Search By Trip Name', value: 'tripName' },
                { title: 'Search By Trip Start Date', value: 'tripStartDate' }
            ],
            headers: [
                { text: 'Sr No', value: 'tripId' },
                { text: 'Trip ID', value: 'tripId' },
                { text: 'Trip Name', value: 'tripName' },
                { text: 'Action', value: 'action' }
            ],
            searchTripRules: [v => !!v || 'This field is required'],
            tripDateRules: [v => !!v || 'Trip Start Date is required'],
            searchTripRules: [v => !!v || 'This field is required'],
            birthDateRules: [v => !!v || 'This field is required'],
            mytrips: [],
        }
    },

    computed:{
        compPickDateFormatted: {
            // getter
            get: function() {
                return this.formattedDate(
                    this.date1,
                    this.dateFormatPlaceHolder
                );
            },

            // setter
            set: function() {
                /*
                  var names = newValue.split(' ')
                  this.firstName = names[0]
                  this.lastName = names[names.length - 1]
                */
            }
        },
    },
    methods:{
        fetchALLTrips: function(e){
                if(e == 'all'){
                this.mytrips = [];


                    let reqHeaders = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                
                let reqPayLoad = {
                 searchBy: 'all',
                 searchKey: ''
                };

                tripServices
                    .searchTrip(reqPayLoad, reqHeaders)
                    .then(rsp => {
                        this.$emit('loading');
                        if (
                            rsp.data.success == false &&
                            rsp.data.message == 'Token has expired'
                        ) {
                            this.doPopLogout();
                            return true;
                        } else if (
                            rsp.data.success == false &&
                            rsp.data.message != 'Token has expired'
                        ) {
                            this.$awn.info(rsp.data.message);
                        } else {
                            this.mytrips = this.makeActionAbles(rsp.data.data);
                        }
                    })
                    .catch(error => {
                        this.$sentry.captureException(new Error(error));
                        this.$awn.alert(
                            'Please try later, server encounter error..!'
                        );
                        this.doClosePop();
                    })
                    .finally(() => {
                        // do some thing here
                    });
            } 
        },

        saveNavTripInfo: function(tripNavInfo) {
            this.$store.dispatch('resetExpireItemSearchedDetails');

            this.saveTripBasicInfo(tripNavInfo);

            if (this.engineItemId == 0) this.getTripById(tripNavInfo.tripId);

            if (this.engineItemId != 0) this.addMeToTrip();

            this.existingTrip = false;
        },
        saveTripBasicInfo: function(tripNavInfo) {
            let storePayload = {
                name: tripNavInfo.tripName,
                trv_name: tripNavInfo.pTraveler,
                trip_id: tripNavInfo.tripId,
                // tripMetaId: tripNavInfo.id,
                primaryTravellerId: tripNavInfo.primaryTravellerId,
                tripStartDate:
                    tripNavInfo.tripStartDate != null
                        ? tripNavInfo.tripStartDate.substr(0, 10)
                        : new Date().toISOString().substr(0, 10)
            };

            this.$store.dispatch('setTripDetail', { TRIP: storePayload });

            return true;
        },


        removeTrip(id, metaid) {
            let _allTrips = this.doCleanArray(this.mytrips);
            let freshTripList = [];

            let reqHeaders = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            };
            let reqDataForm = new FormData();
            reqDataForm.append('tripId', id);
            reqDataForm.append('engine', 'car');
            reqDataForm.append('tripMetaId', metaid);

            tripServices
                .deleteTrip(reqDataForm, reqHeaders)
                .then(() => {
                    // this.doClosePop();
                    // this.saveToExisting();
                    this.$awn.success('Trip has Remove successfully..!', {
                        labels: { success: 'Trip Remove' }
                    });

                    if (_allTrips.length) {
                        let i = 1;

                        _allTrips.forEach(item => {
                            if (item.tripId != id) {
                                item.srIndex = i;
                                freshTripList.push(item);
                                i++;
                            }
                        }); // Ends FOREACH

                        this.mytrips = freshTripList;
                    }
                })
                .catch(err => {

                });
        },
        saveToExisting: function() {
            if (this.$refs.sform.validate()) {
                let _literal = '';
                this.mytrips = [];

                if (this.searchBy == 'tripId') _literal = this.searchTripId;

                if (this.searchBy == 'tripName') _literal = this.searchTripName;
                if( this.searchBy == 'all') _literal = '';

                if (this.searchBy == 'tripStartDate') {
                    let _bDay = this.compPickDateFormatted;
                    _bDay = moment(
                        _bDay,
                        this.$store.state.envStore.DFormat
                    ).unix();
                    // eslint-disable-next-line no-unused-vars
                    _bDay = moment(_bDay, 'X').format('YYYY-MM-DD');
                    _literal =_bDay;
                }

             /*    let payLoad = {
                    searchBy: this.searchBy,
                    searchKey: _literal
                }; */

            
    /*             var reqDataForm = new FormData();

                this.appendFormdata(reqDataForm, payLoad); */

                    let reqHeaders = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                
                let reqPayLoad = {
                 searchBy: this.searchBy,
                 searchKey: _literal
                };

                tripServices
                    .searchTrip(reqPayLoad, reqHeaders)
                    .then(rsp => {
                        if (
                            rsp.data.success == false &&
                            rsp.data.message == 'Token has expired'
                        ) {
                            this.doPopLogout();
                            return true;
                        } else if (
                            rsp.data.success == false &&
                            rsp.data.message != 'Token has expired'
                        ) {
                            this.$awn.info(rsp.data.message);
                        } else {
                            this.mytrips = this.makeActionAbles(rsp.data.data);
                        }
                    })
                    .catch(error => {
                        this.$sentry.captureException(new Error(error));
                        this.$awn.alert(
                            'Please try later, server encounter error..!'
                        );
                        this.doClosePop();
                    })
                    .finally(() => {
                        // do some thing here
                    });
            } // IF FORM VALIDATES
        },
        makeActionAbles: function(arrOfObj) {
            let result = arrOfObj.map(function(el, index) {
                let _pTravelerName = '';
                let _travellers = el.triptravellers;

                if (_travellers.length)
                    _travellers.forEach(item => {
                        if (typeof item.primaryTraveller != 'undefined') {
                            _pTravelerName =
                                item.traveller_info.firstName +
                                ' ' +
                                item.traveller_info.lastName;
                        } // Ends IF
                    }); // Ends FOREACH

                var o = Object.assign({}, el);
                o.srIndex = index + 1;
                o.action = '';
                o.pTraveler = _pTravelerName;
                return o;
            });

            return result;
        },
    }

}
</script>
