<template>

	<span style="display: block !important;">
 
	    <div class="trip-detail-table-box pl-4 pr-4">
	        <div class="title-heading border-bottom">
          		<h2 class="blue-heading">Booked Itinerary</h2>
      		</div>
        </div>

	    <div class="trip-detail-table-box">
	      <h3 class="ml-3  blue-heading">{{userTrip[0].tripId}}-{{userTrip[0].tripName}}</h3>
	      <div
	        v-for="(trips, index) in compTripBooking"
	        :key="'A' + index"
	        class=""
	      >

	        <div v-if="trips.engine == 'car' && (trips.status == 'booked' || trips.status == 'completed')" style="margin-top: 20px;">
	          <div class="">
	            <div class=" booked-tabs">
	                <div class="tabs-text-content pt-0 mt-0 accordian-content">

	                      <!--car booking detail-->
	                      <div class="acord-body">

	                            <h3 v-if="Array.isArray(trips.booking) == false">

	                                <i class="fas fa-car" style="margin-right: 15px;"></i>
	                                Car Booking Fee: {{ currencySymbol}}{{ trips.item.engineDetails.Price.FinalPrice }}
	                              
	                            </h3>

	                            <h3 v-if="Array.isArray(trips.booking) == true">
	                                <i class="fas fa-car" style="margin-right: 15px;"></i>
	                                Car Booking Error
	                            </h3>

	                        <div>
	                          <!--static car table start-->
	                        </div>

	                        <v-simple-table>
	                          <template v-slot:default>
	                            <tbody>
	                              <tr>
	                                <td>Booking ID/Confirmation #:</td>
	                                <td>
	                                  {{ trips.booking.bookingId }}
	                                </td>
	                              </tr>

	                              <tr>
	                                <td>Primary Guests Name(s):</td>
	                                <td>
	                                  {{
	                                    (trips.travellerInfo[0].firstName +
	                                      ' ' +
	                                      trips.travellerInfo[0].lastName)
	                                      | ucwords
	                                  }}
	                                </td>
	                              </tr>

	                              <tr>
	                                <td>Car Rental Company:</td>
	                                <td>
	                                  {{
	                                    trips.item.engineDetails.CarHireCompany
	                                  }}
	                                </td>
	                              </tr> 
	                              <tr>
	                                <td>Supplier Order ID:</td>
	                                <td>
	                                  {{ trips.booking.bookingReference }}
	                                </td>
	                              </tr>

	                              <tr>
	                                <td>Pickup Location:</td>
	                                <td>
	                                  {{
	                                    trips.item.searchData.pickUp.locationName
	                                  }}
	                                </td>
	                              </tr>

	                              <tr>
	                                <td>Pickup Date:</td>
	                                <td>
	                                  {{ getDateInFormat(trips.item.searchData.pickUp.date,fullDateFormat()) }}
	                                </td>
	                              </tr> 
	                              <tr>
	                                <td>Return Location:</td>
	                                <td>
	                                  {{
	                                    trips.item.searchData.dropOff.locationName
	                                  }}
	                                </td>
	                              </tr>

	                              <tr>
	                                <td>Return Date:</td>
	                                <td>
	                                  {{ getDateInFormat(trips.item.searchData.dropOff.date, fullDateFormat()) }}
	                                </td>
	                              </tr>

	                              <tr>
	                                <td>Car Type:</td>
	                                <td>
	                                  {{ trips.item.engineDetails.Category }}
	                                </td>
	                              </tr>

	                              <tr>
	                                <td>Guest Email:</td>
	                                <td>
	                                  {{ trips.travellerInfo[0].email }}
	                                </td>
	                              </tr>
	                              <tr>
	                                <td>Guest Street/Address:</td>
	                                <td>
	                                  {{ trips.travellerInfo[0].address }}
	                                </td>
	                              </tr>

	                              <tr>
	                                <td>Guest Town/City:</td>
	                                <td>
	                                  {{ trips.travellerInfo[0].city }}
	                                </td>
	                              </tr>
	                              <tr>
	                                <td>Guest ZIP CODE:</td>
	                                <td>
	                                  {{ trips.travellerInfo[0].zip }}
	                                </td>
	                              </tr>

	                              <tr v-if="trips.carDetails">
	                                <td>Estimated Total:</td>
	                                <td>
	                                  {{ currencySymbol }}
	                                  {{ trips.carDetails.carData.FinalPrice }}
	                                </td>
	                              </tr>

	                              <tr>
	                                <td><b>Status:</b></td>
	                                <td class="clr-blue">
	                                 <b> {{ trips.booking.status | capitalize }}</b>
	                                </td>
	                              </tr>

		                            <tr v-if="Array.isArray(trips.carDetails) == false">
		                              <td colspan="2">
					                        <a
					                          role="button"
					                          @click="
					                            doCancelPolicyPopUp(doCleanArray(trips.carDetails.carDetails), 'car')
					                          "
					                        >
					                          cancellation policy
					                        </a>
		                              </td>
		                            </tr>

	                            </tbody>
	                          </template>
	                        </v-simple-table>
	                      </div>
	                      <!--car booking detail-->

	                </div>
	            </div>
	          </div>

	        </div>

	        <!-- flight -->
	        <div v-if="trips.engine == 'flight' && (trips.status == 'booked' || trips.status == 'completed')">
	          <div class="">
	            <div class="booked-tabs">
	            
	                <div class="tabs-text-content accordian-content">
	                      <div class="acord-body">
	                        <!--TABLE TO DISPLAY HERE-->

	                            <h3 v-if="Array.isArray(trips.booking)== false">

	                                <span>
	                                    <i class="fas fa-plane"></i>
	                                </span>

	                                &nbsp;
	                                
	                                Flight Booking Fee: {{ currencySymbol}}{{ trips.booking.totalPrice.finalPrice }}
	                            </h3>

	                            <h3 v-if="Array.isArray(trips.booking)== true">

	                                <span>
	                                    <i class="fas fa-plane"></i>
	                                </span>

	                                &nbsp;
	                                
	                                Flight Booking Error

	                            </h3>

	                        <v-simple-table>
	                          <template v-slot:default>
	                            <tbody>
	                              <tr>
	                                <td>Booking Number:</td>
	                                <td>
	                                  {{ trips.booking.bookingId }}
	                                </td>
	                              </tr>

	                              <!--
	                              <tr>
	                                <td>Flight Frequent Flyer:</td>
	                                <td>
	                                  {{
	                                    getObjectValue(
	                                      trips.booking.flightData.frequentFlyer
	                                    )
	                                  }}
	                                </td>
	                              </tr>
	                              -->

	                              <tr>
	                                <td>Departure Location:</td>
	                                <td>{{ trips.item.searchData.airportDepartRound[0] }}</td>
	                              </tr>
	                              <!--
	                                                          <tr>
	                                                              <td>Arrival Location:</td>
	                                                              <td>{{ item.dropLoc }}</td>
	                                                          </tr>
	                                                          -->
								   <tr v-if="trips.flightDetails.itinerary && trips.flightDetails.itinerary.length>0">
	                                <td>Details:</td>
	                                <td>
	                                  <span v-for="(flight,index) in trips.flightDetails.itinerary" :key="'f'+index">
										<span v-for="(flightSegment,index) in flight.flightSegment" :key="'segment'+index">
										  <i style="color:#3d4ed7;" class="fas fa-map-marker-alt"></i>
										   {{flightSegment.flightAirports}} 
                                            <br/>{{flightSegment.cabinClass}} 
										   {{flightSegment.cabinClassText==''?'':'('+flightSegment.cabinClassText+')'}}
                                        </span>
                                         <br/><i  v-if="index==0"  class="fas fa-exchange-alt text-muted" style="color: #777a7f;"></i>

										</span>
									  
	                                </td>
	                              </tr>
	                              <tr>
	                                <td>Ticket Status:</td>
	                                <td>
	                                  {{ trips.booking.ticketStatus }}
	                                </td>
	                              </tr>

	                              <tr>
	                                <td>Passengers:</td>
	                                <td>
	                                  <table>
	                                    <tr
	                                      v-for="(psngr, index) in trips.travellerInfo"
	                                    >
	                                      <td>
	                                        {{
	                                          (psngr.title +
	                                            ' ' +
	                                            psngr.firstName +
	                                            ' ' +
	                                            psngr.lastName)
	                                            | capitalize
	                                        }}
	                                      </td>
	                                    </tr>
	                                  </table>
	                                </td>
	                              </tr>
	                            </tbody>
	                          </template>
	                        </v-simple-table>

	                        <!--TABLE TO DISPLAY HERE-->
	                      </div>

	                </div>
	            </div>

	          </div>
	        </div>

	        <div v-if="trips.engine == 'hotel' && (trips.status == 'booked' || trips.status == 'completed')">
	          <div class="">
	            <div class="booked-tabs">  
	              <div
	                class="tabs-text-content accordian-content"
	              >
	                    <!--hotel booking area-->

	                    <div class="acord-body">

	                            <h3 v-if="Array.isArray(trips.booking)== false">

	                                <span>
	                                    <i class="fas fa-hotel"></i>
	                                </span>

	                                &nbsp;
	                                
	                                Hotel Booking Fee: {{ currencySymbol}}{{ trips.packagePrice }}
	                            </h3>

	                            <h3 v-if="Array.isArray(trips.booking)== true">

	                                <span>
	                                    <i class="fas fa-hotel"></i>
	                                </span>

	                                &nbsp;
	                                
	                                Hotel Booking Error

	                            </h3>                                      

	                      <v-simple-table>
	                        <template v-slot:default>
	                          <tbody>
	                            <tr>
	                              <td>Hotel Name:</td>
	                              <td>
	                                {{ trips.item.engineDetails.displayName }}
	                              </td>
	                            </tr>

	                            <tr>
	                              <td>
	                                Check-In:
	                              </td>
	                              <td>
	                                {{
	                                  getDateInFormat(
	                                    trips.item.searchData.checkinDate,
	                                    fullDateFormat()
	                                  )
	                                }}
	                              </td>
	                            </tr>

	                            <tr>
	                              <td>
	                                Check-Out:
	                              </td>
	                              <td>
	                                {{
	                                  getDateInFormat(
	                                    trips.item.searchData.checkoutDate,
	                                    fullDateFormat()
	                                  )
	                                }}
	                              </td>
	                            </tr>

	                            <tr>
	                              <td>Hotel Phone:</td>
	                              <td>
	                                {{
	                                  trips.item.engineDetails.phone
	                                    | numberFormat(
	                                      cCodes,
	                                      trips.item.engineDetails.countryCode
	                                    )
	                                }}
	                              </td>
	                            </tr>

	                            <tr>
	                              <td>Hotel Address:</td>
	                              <td>{{ trips.item.engineDetails.address }}</td>
	                            </tr>

	                            <tr>
	                              <td>Booking Number:</td>
	                              <td>
	                                {{ trips.booking.bookingId }}
	                              </td>
	                            </tr>


	                            <tr>
	                              <td colspan="2" class="p-0">
	                                <div
	                                  v-for="(passenger,
	                                  pasengrIndex) in trips.travellerInfo"
	                                  v-if="
	                                    Array.isArray(trips.hotelDetails) == false
	                                  "
	                                >
	                                  <v-simple-table
	                                    v-for="(room, roomIndex) in trips
	                                      .hotelDetails.package.rooms"
	                                    v-if="passenger.roomId == room.roomId"
	                                    style=""
										class="booked-inner-table"
	                                  >
	                                    <template v-slot:default>
	                                      <tbody>
	                                        <tr
	                                          style="background: #1e255d; color: #FFF; font-weight: bold;"
	                                        >
	                                          <td
	                                            style="font-size: 13px !important;"
	                                          >
	                                            Room Selection
	                                            {{ ++pasengrIndex }} of
	                                            {{
	                                              trips.hotelDetails.package.rooms
	                                                .length
	                                            }}
	                                          </td>
	                                          <td
	                                            style="font-size: 13px !important;"
	                                          >
	                                            Adults:
	                                            {{ parseInt(room.adults) }}
	                                            Children:
	                                            {{
	                                              parseInt(room.kidsAges.length)
	                                            }}
	                                          </td>
	                                        </tr>

	                                        <tr>
	                                          <td>
	                                            Confirmation Number
	                                          </td>
	                                          <td>
	                                            {{ room.roomKey }}
	                                          </td>
	                                        </tr>

	                                        <tr>
	                                          <td>Record Locator:</td>
	                                          <td>
	                                            N/A
	                                          </td>
	                                        </tr>

	                                        <tr>
	                                          <td>Guest Name:</td>
	                                          <td>
	                                            {{ passenger.title | ucwords }}
	                                            {{
	                                              passenger.firstName | ucwords
	                                            }}
	                                            {{ passenger.lastName | ucwords }}
	                                          </td>
	                                        </tr>

	                                        <tr>
	                                          <td>Email:</td>
	                                          <td>
	                                            {{ passenger.email }}
	                                          </td>
	                                        </tr>

	                                        <tr>
	                                          <td>Street/Address:</td>
	                                          <td>
	                                            {{ passenger.address }}
	                                          </td>
	                                        </tr>

	                                        <tr>
	                                          <td>Town/City:</td>
	                                          <td>
	                                            {{ passenger.city }}
	                                          </td>
	                                        </tr>

	                                        <tr>
	                                          <td>ZIP CODE:</td>
	                                          <td>
	                                            {{ passenger.zip }}
	                                          </td>
	                                        </tr>

	                                        <tr>
	                                          <td>Country:</td>
	                                          <td>
	                                            {{ passenger.country }}
	                                          </td>
	                                        </tr>

	                                        <tr>
	                                          <td>User Type:</td>
	                                          <td>
	                                            {{ passenger.userType }}
	                                          </td>
	                                        </tr>

	                                        <tr>
	                                          <td>Room Name:</td>
	                                          <td>
	                                            {{ room.roomName }}
	                                          </td>
	                                        </tr>

	                                        <tr>
	                                          <td>Room Type:</td>
	                                          <td>
	                                            {{ room.roomBasis }}
	                                          </td>
	                                        </tr>

	                                        <tr
	                                          v-if="
	                                            Array.isArray(room.roomContent) ==
	                                              false
	                                          "
	                                        >
	                                          <td>Rate Description:</td>
	                                          <td>
	                                            <p
	                                              v-if="
	                                                room.facilities.length>0
	                                              "
	                                            >
	                                              {{
	                                                room.facilities.join()
	                                              }}
	                                            </p>
	                                          </td>
	                                        </tr>

	                                        <tr>
	                                          <td>Number Of Nights:</td>
	                                          <td>
	                                            {{
	                                              setNightCount(
	                                                trips.item.searchData
	                                              )
	                                            }}
	                                            <!-- trips.item.searchData.totalNights -->
	                                          </td>
	                                        </tr>

	                                        <tr>
	                                          <td>Room Subtotal:</td>
	                                          <td>
	                                            {{ currencySymbol }}
	                                            {{ room.price.FinalPrice }}
	                                          </td>
	                                        </tr>
	                                      </tbody>
	                                    </template>
	                                  </v-simple-table>
	                                </div>
	                                <!--Inner UL Ends-->
	                              </td>
	                            </tr>

	                            <tr>
	                              <td><b>Status:</b></td>
	                              <td class="clr-blue">
	                              <b>  {{ trips.booking.status | capitalize }}</b>
	                              </td>
	                            </tr>
	                            <tr v-if="Array.isArray(trips.hotelDetails) == false">
	                              <td colspan="2">
				                        <a
				                          role="button"
				                          @click="
				                            doCancelPolicyPopUp(trips.hotelDetails.package, 'hotel')
				                          "
				                        >
				                          cancellation policy
				                        </a>
	                              </td>
	                            </tr>
	                          </tbody>
	                        </template>
	                      </v-simple-table>
	                    </div>
	              </div>
	            </div>
	          </div>
	        </div>

	        <div v-if="trips.engine == 'villa' && (trips.status == 'booked' || trips.status == 'completed')">
	          <div class="">
	            <div class="booked-tabs">  
	              <div
	                class="tabs-text-content accordian-content"
	              >
	                    <!--villa booking area-->

	                    <div class="acord-body">

	                            <h3 v-if="Array.isArray(trips.booking)== false">

	                                <span>
	                                    <i class="fas fa-umbrella-beach"></i>
	                                </span>

	                                &nbsp;
	                                
	                                Villa Booking Fee: {{ currencySymbol}}{{ trips.booking.totalPrice }}
	                            </h3>

	                            <h3 v-if="Array.isArray(trips.booking)== true">

	                                <span>
	                                    <i class="fas fa-umbrella-beach"></i>
	                                </span>

	                                &nbsp;
	                                
	                                Villa Booking Error

	                            </h3>                                      

		                      <v-simple-table>
		                        <template v-slot:default>
		                          <tbody>
		                            <tr>
		                              <td>Villa Name:</td>
		                              <td>
		                                {{ trips.villaDetails.villaData.displayName }}
		                              </td>
		                            </tr>

		                            <tr>
		                              <td>
		                                Check In Date:
		                              </td>
		                              <td>
		                                {{
		                                  getDateInFormat(
		                                    trips.item.searchData.checkinDate,
		                               fullDateFormat()
		                                  )
		                                }}
		                              </td>
		                            </tr>

		                            <tr>
		                              <td>
		                                Check Out Date:
		                              </td>
		                              <td>
		                                {{
		                                  getDateInFormat(
		                                    trips.item.searchData.checkoutDate,
		                                    fullDateFormat()
		                                  )
		                                }}
		                              </td>
		                            </tr>

		                            <tr>
		                              <td>Villa Phone:</td>
		                              <td>
		                                {{
		                                  trips.booking.hotel_contact_info
		                                }}
		                              </td>
		                            </tr>

		                            <tr>
		                              <td>Villa Address:</td>
		                              <td>{{ trips.villaDetails.villaData.address }}</td>
		                            </tr>

		                            <tr>
		                              <td>Reservation ID:</td>
		                              <td>
		                                {{ trips.booking.reservationId }}
		                              </td>
		                            </tr>

                                    <tr v-if="trips.booking.pincode!=''">
                                        <td>PIN Code: </h4>
                                        <td>{{ trips.booking.pincode }}</td>
                                    </tr>

                                    <!---->

                                    <tr>
                                        <td>Primary Guests Name(s):</td>
                                        <td>
                                            {{ 
                                            trips.travellerInfo[0].title+' '+
                                            trips.travellerInfo[0].firstName+' '+
                                            trips.travellerInfo[0].lastName | ucwords 
                                            }}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Guest Email:</td>
                                        <td>
                                            {{
                                                trips.travellerInfo[0].email
                                            }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Guest Street/Address:</td>
                                        <td>
                                            {{
                                                trips.travellerInfo[0].address
                                            }}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Guest Town/City:</td>
                                        <td>
                                            {{
                                                trips.travellerInfo[0].city
                                            }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Guest ZIP CODE:</td>
                                        <td>
                                            {{
                                                trips.travellerInfo[0].zip
                                            }}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colspan="2">
                                        <a
                                          style="margin-left: 20px;"
                                          @click="doCancelPolicyPopUp(findBookedRoomsInVilla(trips.villaDetails.blockData, trips.villaDetails.villaData.rooms), 'villa')"
                                        >
                                          Cancellation Policy
                                        </a>
                                        </td>
                                    </tr>

		                          </tbody>
		                        </template>
		                      </v-simple-table>

	                    </div>
	              </div>
	            </div>
	          </div>
	        </div>


	      </div>
	    </div>

	    <p class="noAvailability text-center" v-show="hasBookedItems.length==0" style="font-size: 16px;">
	       No booked items available.
	    </p>

	</span>

</template>

<script>

var moment = require('moment');

import Slider from '@/components/front/hotels/Slider';

import ExtraAvailableTab from '../../Carstabs/ExtraAvailableTab.vue';
import TripSummaryTab from '../../Carstabs/TripSummaryTab.vue';
import PackageDetailsTab from '../../Carstabs/PackageDetailsTab.vue';
import CancellationPoliciesTab from '../../Carstabs/CancellationPoliciesTab.vue';

import FlightDetailTab from '../../tabs/FlightDetailTab.vue';
import FareSummaryTab from '../../tabs/FareSummaryTab.vue';
import FareDisclamierTab from '../../tabs/FareDisclamierTab.vue';

import StarRating from 'vue-star-rating';
import { mapState } from 'vuex';
import { evBus } from '@/services/bus.js';
import countryCodes from '@/services/data/countraycodes';
import tripServices from '@/services/api/Trips.js';
export default {
	name: 'BookedItineraryTab',
	components: {
	    StarRating,
	    ExtraAvailableTab,
	    TripSummaryTab,
	    PackageDetailsTab,
	    CancellationPoliciesTab,

	    FlightDetailTab,
	    FareSummaryTab,
	    FareDisclamierTab,
	    Slider
	},
	mounted() {
	 	this.compTripBooking;
  	},
  	methods:{

	  findBookedRoomsInVilla(content, sfindables) {

	        let findables = sfindables.map(i=>Number(i.id));
	        let bookedRooms = [];
	        let allRoomsOfBlock = content.rooms;

	        for(let index in allRoomsOfBlock) {

	            let room = allRoomsOfBlock[index];

	            if(findables.includes(Number(room.room_id))) {
	              bookedRooms.push(room);
	            }

	        };
	        
	        if(bookedRooms.length)
	            content.rooms = bookedRooms;

	        return content;
	  }
  	},
  	computed: {
  		compTripBooking() {

  			let _tripBookings = this.tripBooking;

	        _tripBookings.forEach(bookItem => {

	          if (bookItem.engine=='car')
	          	if('item' in bookItem == false)
	          		bookItem.item = JSON.parse(bookItem.details);
	        
	        });

  			return _tripBookings;
  		}
  	},
	props: [
		'tripBooking',
		'getTripQuote',
		'itemDetials',
		'activeDomain',
		'CSymbol',
		'fType',
		'transformToCode',
		'setNightCount',
		'removeTrip',
		'ckTripInfo',
		'hasBookedItems',
		'cCodes',
		'numberFormat',
		'searchData',
		'userTrip',
		'personCount'
	],
	filters: {
		formatDate: function(value) {
		  return moment(value).format('MM/DD/YYYY');
		},

		numberFormat(value, countryCodes, code) {

		if(!value)
			return;
			
		  //creating variable name to get from json
		  var CountryCodeMask = countryCodes[code];

		  // count hashes
		  var count = (CountryCodeMask.match(/#/g) || []).length;

		  // clean number
		  var number = value.replace(/[^\d.]/g, '');

		  // number to apply mask
		  var maskToApplyNumber = number.substring(number.length - count);

		  // apply format
		  //var returnNumber = format(maskToApplyNumber,CountryCodeMask);
		  var i = 0,
		    v = maskToApplyNumber.toString();
		  // eslint-disable-next-line no-unused-vars
		  let returnNumber = CountryCodeMask.replace(/#/g, _ => v[i++]);

		  return returnNumber;
		}
	}
};
</script>

<style></style>