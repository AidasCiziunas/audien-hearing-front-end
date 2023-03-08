<template>
  <div style="display: block !important">
    <section class="trip-search-filter">
      <v-container>
        <div class="title-heading">
          <h1 class="blue-heading">My Trips</h1>
        </div>
      </v-container>
    </section>
    <section class="listing-wrapper">
      <v-container>
        <v-expansion-panels class="">
          <v-expansion-panel>
            <template>
              <v-card style="">
                <div class="grid">
                  <v-card-title class="my-trip-feilds" style="">
                    <v-select
                      label="Status"
                      v-model="selectedStatus"
                      :items="tstatus"
                      item-text="title"
                      item-value="value"
                      @change="filterTrip($event)"
                    >
                    </v-select>

                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-text-field
                      class="mytrip-search-feild"
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-card-title>
                  <v-card-title class="my-trip-feilds" style="">
                    <v-select
                      v-if="authStore.userType != 'customer'"
                      label="Trips"
                      v-model="selectedTrip"
                      :items="trips"
                      item-text="title"
                      item-value="value"
                      @change="getUserTrip()"
                    >
                    </v-select>
                  </v-card-title>
                </div>
                <v-data-table
                  :headers="headers"
                  :items="mytrips"
                  :items-per-page="5"
                  :search="search"
                  :sort-by="['createdDate']"
                  :sort-desc="sortDesc"
                  v-if="mytrips.length > 0"
                >
                  <template v-slot:item="row">
                    <tr class="exiting-trip-table-row">
                      <td>{{ row.item.tripId }}</td>
                      <td>
                        {{ getHotelCountryDFOnly(row.item.createdDate) }}
                      </td>
                      <td>
                        {{
                          getHotelCountryDFOnly(
                            row.item.tripStartDate.replace(' ', 'T')
                          )
                        }}
                      </td>
                      <td>
                        <a
                          v-if="
                            row.item.status != 'on_hold' &&
                            row.item.bookingsItemsCount > 0
                          "
                          @click.prevent="selectTrip(row.item.tripId)"
                          >{{ row.item.tripName }}
                        </a>
                        <a
                          v-else="
                            row.item.status == 'on_hold' ||
                            row.item.bookingsItemsCount == 0
                          "
                        >
                          {{ row.item.tripName }}
                        </a>
                      </td>

                      <td
                        v-if="row.item.status == 'new'"
                        class="status-warn green--text font-weight-500 text-center"
                      >
                        New
                      </td>
                      <td
                        v-if="row.item.status == 'booking_failed'"
                        class="status-danger font-weight-500 text-center"
                      >
                        Booking Failed
                      </td>
                      <td
                        v-if="row.item.status == 'expired'"
                        class="status-danger font-weight-500 text-center"
                      >
                        Expired
                      </td>
                      <td
                        v-if="row.item.status == 'partially_booked'"
                        class="status-warn font-weight-500 text-center"
                      >
                        Partially booked
                      </td>
                      <td
                        v-if="
                          row.item.status == 'checkout_ready' &&
                          row.item.bookingsItemsCount > 0
                        "
                        class="status-ready font-weight-500 text-center"
                        @click="ckTripInfo(row.item)"
                        style="cursor: pointer"
                      >
                        Checkout Ready
                      </td>
                      <td
                        v-if="
                          row.item.status == 'checkout_ready' &&
                          row.item.bookingsItemsCount == 0
                        "
                        class="status-ready font-weight-500 text-center"
                        @click="ckTripInfo(row.item)"
                        style="cursor: pointer"
                      >
                        N/A
                      </td>
                      <td
                        v-if="row.item.status == 'completed'"
                        class="status-complete text-center font-weight-500"
                      >
                        Completed
                      </td>

                      <td
                        class="font-weight-500 text-center"
                        v-if="
                          row.item.status == 'new' &&
                          row.item.travelStatus == 'Travelled'
                        "
                      >
                        Expired
                      </td>
                      <td v-else class="text-center font-weight-500">
                        {{ row.item.travelStatus }}
                      </td>

                      <td class="font-weight-500">
                        <a
                          v-if="
                            row.item.status != 'on_hold' &&
                            row.item.bookingsItemsCount > 0
                          "
                          @click.prevent="viewTrip(row.item.tripId)"
                        >
                          View Details
                        </a>

                        <a
                          v-if="
                            row.item.status == 'checkout_ready' &&
                            row.item.bookingsItemsCount > 0
                          "
                        >
                          <v-btn
                            color="error"
                            x-small
                            dark
                            class="ms-1"
                            @click="ckTripInfo(row.item)"
                          >
                            Checkout
                          </v-btn>
                        </a>

                        <a
                          class="font-weight-500 text-center"
                          href="javascript:void(0);"
                          v-if="
                            row.item.status == 'on_hold' &&
                            row.item.status != 'checkout_ready'
                          "
                        >
                          N/A
                        </a>

                        <a
                          class="font-weight-500 text-center"
                          v-if="
                            (row.item.status == 'on_hold' ||
                              row.item.status == 'new' ||
                              row.item.status == 'checkout_ready') &&
                            row.item.bookingsItemsCount == 0
                          "
                        >
                          N/A
                        </a>
                      </td>
                      <td class="text-center">
                        <a
                          @click.prevent="removeTrip(row.item.tripId)"
                          style="color: #d50032"
                          ><i class="fas fa-trash-alt"></i
                        ></a>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </section>
  </div>
</template>

<script>
var moment = require('moment');
import { evBus } from '@/services/bus.js';
import tripServices from '@/services/api/Trips';
import { mapState } from 'vuex';

export default {
  name: 'TripHistory',
  components: {},
  data() {
    return {
      search: '',
      restrictedStatuses: ['on_hold', 'booking_expired'],
      dateFormatPlaceHolder: this.$store.state.envStore.countryDF,
      headers: [
        { text: 'Trip ID', value: 'tripId' },
        { text: 'Created At', value: 'createdDate' },
        { text: 'Start Date', value: 'tripStartDate' },
        { text: 'Trip Name', value: 'tripName' },

        /*     { text: 'Client Name', value: 'tripCreater' }, */
        { text: 'Booking Status', value: 'status' },

        { text: 'Travel Status', value: 'travelStatus' },

        { text: 'Action', value: 'action' },
        { text: 'Delete Trip', value: 'delete' },
      ],
      mytrips: [],
      clientName: '',
      expanded: false,
      singleExpand: false,
      checkId: '',
      prevCheckId: 0,
      showTrip: '',
      tripBooking: [],
      tripdetailsget: [],
      itemDetials: [],
      searchData: [],
      flightType: 'oneWay',
      fType: '',
      tstatus: [
        { title: 'Please Choose', value: '' },
        { title: 'Travelled', value: 'Travelled' },
        { title: 'Upcoming', value: 'Upcoming' },
      ],
      trips: [
        { title: 'All', value: 'all' },
        { title: 'Agent', value: 'agent' },
        { title: 'Free User', value: 'freeUser' },
      ],
      selectedTrip: { title: 'Agent', value: 'agent' },
      selectedStatus: { title: 'Upcoming', value: 'Upcoming' },

      tfilterValue: '',
      sortDesc: true,
    };
  },
  created: function () {
    evBus.$emit('toggleBannerDisplay', true);

    evBus.$on('tripUpated', () => {
      setTimeout(
        function () {
          this.doCheckOutTripDetails();
        }.bind(this),
        3000
      );
    });
  },

  computed: {
    ...mapState({
      agentData: (state) => state.authStore.user[0].agent,
      userTrips: (state) => state.tripStore.userTripDetais,
      TripStore: (state) => state.tripStore,
      CType: (state) => state.envStore.CType,
      CSymbol: (state) => state.envStore.CSymbol,
      DFormat: (state) => state.envStore.DFormat,
      countryDF: (state) => state.envStore.countryDF,
      domain: (state) => state.envStore.domain,
    }),
  },

  mounted: function () {
    this.getUserTripData();
  },
  methods: {
    getUserTrip() {
      this.getUserTripData();
    },
    selectTrip(tripId) {
      this.$confirm('Do you want to select this trip?', {
        title: 'Select Trip?',
      }).then((res) => {
        if (res == false) return false;

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

            /*    this.$emit('resetSearch', hotelId); */
          } else if (
            response.data.message ==
            'Hotel Package not found! Please try again later.'
          ) {
            this.$awn.alert(
              'We have not received the details needed from our supplier to view this hotel . Please select another hotel.'
            );
          } else {
            /*** 
                This area will make log into this trip 
            ***/

            let searchedTripInfo = this.mytrips.find((o) => {
              if (o.tripId == tripId) return true;
            });

            this.$store.dispatch('resetExpireItemSearchedDetails');

            this.ckTripBasicInfo(searchedTripInfo);

            this.refreshTripWhenItemRemoved = false;

            this.setUpTripDetails(response.data.data[0], 'mixins', false);

            this.checkTripItemsExpiry(response.data.data[0]);

            if (response.data.data[0].tripbookings.length > 0) {
              /*
                            this.$store.dispatch(
                                'switchTrip',
                                response.data.data[0]
                            );
                        */

              this.$store.dispatch('UserAllTripsDetails', response.data.data);

              this.$router.push('/').catch(() => {});
            } else {
              this.$awn.alert(
                'Trip booking data not available for this trip ID.'
              );
            }
          }
        });
      });
    },

    removeTrip(tripId) {
      this.$confirm('Are You Sure ?', {
        title: 'Remove Trip?',
      }).then((res) => {
        if (res == false) return false;

        let reqHeaders = {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        };
        let reqDataForm = new FormData();
        reqDataForm.append('tripId', tripId);
        tripServices
          .deleteTrip(reqDataForm, reqHeaders)
          .then((rsp) => {
            if (
              rsp.data.success == false &&
              rsp.data.message == 'Token has expired'
            ) {
              that.doPopLogout();
              return true;
            } else if (
              rsp.data.success == false &&
              rsp.data.message != 'Token has expired'
            ) {
              this.$awn.alert('Please try later, server encounter error..!');
              return false;
            } else {
              this.getUserTripData();
              this.$awn.success('Trip Remove successfully..!', {
                labels: { success: 'Trip Remove !' },
              });
            }
          })
          .catch((err) => {
            if(err.status == 400){
             this.$awn.alert(err.data.message);
            
            }else{
              this.$sentry.captureException(new Error(err));
            }
          });
      });
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
    dateFormate: function (value) {
      return moment(value.split('T')[0]).format(this.countryDF);
    },
    getNewDate(startDate) {
      var d = new Date();
      var year = d.getFullYear(); //Get the year as a four digit number (yyyy)
      var month = d.getMonth() + 1; //Get the month as a number (0-11)
      var date = d.getDate();
      var newDate = year + '-0' + month + '-' + date;
      var sDate = startDate.split('T')[0];

      if (sDate >= newDate) {
        return true;
      } else {
        return false;
      }
    },

    getTripDetials() {
      this.tripBooking = this.userTrips[0].tripbookings;

      this.tripdetailsget = this.userTrips[0].tripbookings;

      this.itemDetials = this.tripdetailsget.map((item) => {
        return {
          search: JSON.parse(item.details).engineDetails,
        };
      });

      this.searchData = this.tripdetailsget.map((item) => {
        return {
          searchRecord: JSON.parse(item.details).searchData,
        };
      });

      /*

                setTimeout(function() {
                    
                    $(document).find('.'+this.$refs['trip-'+this.checkId]).show();

                }.bind(this), 1500);

            */

      // this.$refs['trip-'+this.checkId].$el.show();

      //   this.itemDetials = this.itemDetials[0].search;
      //   this.searchData = this.searchData[0].searchRecord;
    },

    expend(num) {
      this.checkId = num;

      if (num != this.prevCheckId) {
        this.prevCheckId = num;
        this.expanded = true;
      } else {
        this.expanded = !this.expanded;
      }

      this.viewTrip(num, 'expand');
    },
    getUserTripData() {
      this.clientName =
        this.agentData != undefined
          ? this.agentData.vcFName + ' ' + this.agentData.vcLName
          : '';
      let reqHeaders = {
        headers: {
          Authorization: 'Bearer ' + this.authStore.token,
        },
      };

      let reqPayLoad = {
        typeOf:
          typeof this.selectedTrip === 'object'
            ? this.selectedTrip.value
            : this.selectedTrip,
      };
      if (this.authStore.userType == 'customer') {
        reqPayLoad = {
          typeOf: 'agent',
        };
      }

      tripServices.getUserTrip(reqPayLoad, reqHeaders).then((rsp) => {
        this.mytrips = rsp.data.data;
        this.$store.dispatch('UserAllTrips', this.mytrips);
      });
    },

    filterTrip(val) {
      var DataArray = this.TripStore.UserTrip;

      function compare(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }

      this.mytrips = DataArray.filter((trpstatus) => {
        return trpstatus.travelStatus.includes(val);
      }).sort(compare);
    },

    formattedDate: function (date, format) {
      if (!date) return null;
      return moment(date).format(format);
    },

    viewTrip(tripId, expand_val = '') {
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

          // eslint-disable-next-line no-undef
          this.$emit('resetSearch', hotelId);
        } else if (
          response.data.message ==
          'Hotel Package not found! Please try again later.'
        ) {
          this.$awn.alert(
            'We have not received the details needed from our supplier to view this hotel . Please select another hotel.'
          );
        } else {
          if (response.data.data[0].tripbookings.length > 0) {
            this.$store.dispatch('UserAllTripsDetails', response.data.data);
            if (expand_val == 'expand') {
              this.showTrip = response.data.data[0];
              this.getTripDetials();
            } else {
              this.$router.push('/trip-details').catch(() => {});
            }
          } else {
            this.$awn.alert(
              'Trip booking data not available for this trip ID.'
            );
          }
        }
      });
    },
    ckTripInfo: function (tripNavInfo) {
      this.$store.dispatch('resetExpireItemSearchedDetails');

      this.ckTripBasicInfo(tripNavInfo);

      this.getTripById(tripNavInfo.tripId, 'MyTrips');

      this.makeHistoryOfMyTrips = true;
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
    searchExpiredFlight() {
      /*

            let reqHeaders = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            let reqPayLoad = {
                search: true,
                source: [this.departureObj.iata],
                sourceType: [this.departureObj.type],
                dest: [this.arrivalObj.iata],
                destType: [this.arrivalObj.type],
                date: [this.departDate, this.arrivalDate],
                airportArriveRound: [this.departureObj.name],
                airportDepartRound: [this.arrivalObj.name],
                adults: this.extraData.adults,
                cabinClass: this.extraData.scabin,
                connections: this.extraData.sconn,
                flightType: this.tripType,
                nearbySource: [this.departureNearby],
                nearbyDest: [this.arrivalNearby],
                seniors: this.extraData.seniors,
                child: this.extraData.children,
                infants: this.extraData.infants,
                sortBy: 'asc',
                searchId: null
            };

            if (this.tripType == 'oneWay') {
                reqPayLoad.date = [this.departDate];
            }
            flightServices
                .searchFlights(reqPayLoad, reqHeaders)
                .then(response => {
                    if (
                        response.data.success == false &&
                        response.data.message == 'Token has expired'
                    ) {
                        let cader = {
                            type: 'error',
                            heading: 'User Session Expired',
                            message:
                                'Please login again as your session has expired, Thanks.',
                            actionable: false,
                            relogin: true
                        };

                        evBus.$emit('openInfoPopUp', cader);
                        return true;
                    } else if (
                        response.data.success == false &&
                        response.data.message != 'Token has expired'
                    ) {
                        this.$awn.info(
                            'No results are found. Please try a different search..!'
                        );
                        return false;
                    }

                    let filter = response.data.data.filters;
                    let flights = response.data.data.flights;
                    let searchData = response.data.data.searchData;
                    let sessionId = response.data.data.sessionId;
                    this.setFlightResponse({
                        sessionId,
                        filter,
                        flights,
                        searchData,
                        flightType: this.tripType,
                        departure: this.departureLocation,
                        arrival: this.arrivalLocation,
                        departureLocations: this.departureLocations,
                        arrivalLocations: this.arrivalLocations
                    });

                    this.$router.push('/flights');
                })
                .catch(error => {
                    // console.log('Flights Search Error', error);
                });

            return true;

            */
    },
  },
};
</script>
<style>
.status-warn {
  color: #ffc107 !important;
}

.status-complete {
  color: #28a745 !important;
}
.status-ready {
  color: #17a2b8 !important;
}
.status-danger {
  color: #ff1210 !important;
}
.grid {
  display: flex;
  justify-content: space-between;
}
</style>
