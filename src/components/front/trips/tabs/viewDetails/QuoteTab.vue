<template>

	<span class="tipdetail-page-listing" style="display: block !important;">
<div class="title-heading border-bottom current-item-heading">
          <h2 class="blue-heading">Share a Quote</h2>
        </div>

        <div class="hotel-back-btn ml-5 w-50" 
		style="border: none; margin-top:0;padding: 0;"
		 v-show="tripBookingOfQuote.length > 0 && onlineMode">
    
        </div>

        <div class="boxParentDiv" style="display: block !important;
		margin-top: 0px;
		" v-show="tripBookingOfQuote.length > 0">
            
		          <div v-if="$route.name=='TRIP-DETAILS'"
				    class="title-heading w-100 mt-2">  
		          <p>This is a quote based on the items in the Trip created. For Customer view of the quote, you may share the link below. </p>
		      	</div>
				    <div v-if="$route.name=='TRIP-DETAILS'" class="w-100 float-right" style="display: flex;">
		             <v-text-field
				       color="primary"
				      class=" mr-2"
				      v-model="url"
				      id="inpudID"
				      outlined
      				   > 
        			</v-text-field> 
				  
				          <v-btn
				            @click="copy"
				            style="height: 56px;"
				            class=""
				            color="primary"
						    large
							
							x-large
				           >Copy Link</v-btn>
				
				     </div>
					 <div v-if="$route.name=='TRIP-DETAILS' && userType == 'agent'" class="w-100 float-right" style="display: flex;">
					 <v-text-field
				       color="primary"
				      class=" mr-2"
				      v-model="widgetLink"
				      id="widgetInputID"
				      outlined
      				   > 
        			</v-text-field> 
				  
				          <v-btn
				            @click="copyWidgetLink"
				            style="height: 56px;"
				            class=""
				            color="primary"
						    large
							x-large
				           >{{currentDomain == 'com' || currentDomain == 'mx' ? 'External Link' : 'Paste Widget Link here'}} </v-btn>
				</div>
			
			<div class="hotel-back-btn">
				<v-alert
				    border="top"
				    colored-border
				    color="primary"
				    type="info"
					class=""
				    elevation="2"
				    >DISCLAIMER : Prices are not guaranteed until a booking is made and a confirmation is received.
				</v-alert>
					<v-alert
					v-if="(domain == 'uk' || domain == 'ie') && !onlineMode"
				    border="top"
				    colored-border
				    color="primary"
				    type="info"
					class=""
				    elevation="2"
				    >
				   <p>
					Thank you for requesting a quotation from InteleTravel {{ domain == 'uk'? 'UK': ''}}, Ltd. Here are the details of the 
					travel services included in your trip. Please take a moment to carefully check the information. 
				   </p>
				   <p>
					Please ensure you have read, understood the booking terms and conditions. 

				   </p>
				</v-alert>
			</div>   
	        
	        <!--cars box-->
	        <div class="hotel-back-btn">
				<!--Trip DateFormat is from API side, therefore, no need to call makeDisplayTripName -->
             <h2 class="blue-heading">{{tripId}} - {{tripName}}</h2>
         	</div>

	        <div class="hotel-back-btn" style="" v-show="hasCarTrip">

			    <div class="title-heading mt-2">  
		          <h2 class="blue-heading">
				<i class="fas fa-car" style="font-size: 24px;"></i>Cars</h2> 
		        </div> 

		        <!--Cars-->

			    <v-expansion-panels class="">
			      
			      <v-expansion-panel
			        v-for="(trips, index) in tripBookingOfQuote"
			        :key="'A' + index"
			        class="mb-4 bottom-mr"
			        v-if="trips.engine == 'car'"
			      >

			      	<!--Signle Repeat List-->
			        <div class="single-listing-repeat">

			          <!--Cars Single Listing -->
			          <div class="single-listing">
			            <div class="main-left car-left-box">
			              <div class="outer-left">
			                <div class="product-text">
			                  <h3>
			                    {{ itemDetials[index].search.CarHireCompany }}
			                  </h3>
			                  <p>
			                    {{ itemDetials[index].searchCarModel }}
			                  </p>
			                </div>
			                <div class="product-img">
			                  <img
			                    v-bind:src="itemDetials[index].search.PicLargeURL"
			                    alt="car"
			                  />
			                </div>
			              </div>
			              <div class="outer-right car-outer-right">
			                <div class="product-reviews">
			                  <div class="in-left">
			                    <ul>
			                      <li class="product-meta">
			                        <span>{{
			                          itemDetials[index].search.RepresentingCategory
			                        }}</span>
			                      </li>
			                      <li>
			                        <v-tooltip top>
			                          <template
			                            v-slot:activator="{
			                              on,
			                              attrs
			                            }"
			                          >
			                            <i
			                              class="fas fa-users"
			                              v-bind="attrs"
			                              v-on="on"
			                            ></i>
			                            {{ itemDetials[index].search.NumberOfPassenges }}
			                          </template>
			                          <span>Number Of Passengers</span>
			                        </v-tooltip>
			                      </li>
			                      <li>
			                        <v-tooltip top>
			                          <template
			                            v-slot:activator="{
			                              on,
			                              attrs
			                            }"
			                          >
			                            <i
			                              class="fas fa-suitcase-rolling"
			                              v-bind="attrs"
			                              v-on="on"
			                            ></i>
			                            {{ itemDetials[index].search.NumberOfBaggages }}
			                          </template>
			                          <span>Number Of Bags</span>
			                        </v-tooltip>
			                      </li>
			                      <li>
			                        <v-tooltip top>
			                          <template
			                            v-slot:activator="{
			                              on,
			                              attrs
			                            }"
			                          >
			                            <i
			                              class="fas fa-door-open"
			                              v-bind="attrs"
			                              v-on="on"
			                            ></i>
			                            {{ itemDetials[index].search.NumberOfDoors }}
			                          </template>
			                          <span>Number Of Doors</span>
			                        </v-tooltip>
			                      </li>
								  <li>
									  <span><strong>Pick Up Date :</strong> {{ justFormatRawDate(searchData[index].searchRecord.pickUp.date)}}</span>&nbsp;
									  <span><strong>Drop Off Date :</strong> {{ justFormatRawDate(searchData[index].searchRecord.dropOff.date)}}</span>
								  </li>
			                    </ul>
								
			                  </div>
			                  <div class="in-right"></div>
			                </div>
			                <div class="product-specs">
			                  <ul>
			                    <li v-if="activeDomain == 'us'">
			                      <i class="fas fa-gas-pump"></i>
			                      Gasoline
			                    </li>

			                    <li v-if="activeDomain != 'us'">
			                      <i class="fas fa-gas-pump"></i>
			                      {{ itemDetials[index].search.FuelType }}
			                    </li>

			                    <li>
			                      <i class="fas fa-cog"></i>
			                      {{ itemDetials[index].search.TransmissionType }}
			                    </li>
			                    <li>
			                      <i class="fas fa-dharmachakra"></i>
			                      {{ itemDetials[index].search.DriveType }}
			                    </li>
			                    <li
			                      v-if="
			                        (itemDetials[index].search.AirConditioning = 'Yes')
			                      "
			                    >
			                      <i class="fas fa-stroopwafel"></i>
			                      Air Conditioning
			                    </li>
			                  </ul>
			                </div>
			                <div
			                  class="product-varify"
			                  v-if="itemDetials[index].search.PackageName"
			                >
			                  <h5>Price includes:</h5>
			                  <ul>
			                    <li
			                      v-for="(pval, pkey) in itemDetials[index].search
			                        .PackageName"
			                      :key="pkey"
			                    >
			                      <span v-if="pkey != 'UNKNOWN'">
			                        <i class="fas fa-check"></i>
			                        <span v-if="pval == 'Mileage Unlimited'"
			                          >Unlimited Mileage</span
			                        >
			                        <span v-if="pval != 'Mileage Unlimited'">{{
			                          pval
			                        }}</span>
			                      </span>
			                    </li>
			                  </ul>
			                </div>
			              </div>
			            </div>
			            <div class="main-right car-right-box">
			              <div class="product-reverse">
			                <h2>
			                  {{CSymbol}}{{ itemDetials[index].search.FinalPrice }}
			                </h2>

			                <ul>

			                  <li>
			    
			                       <p class="status-blue"
			                        v-if="trips.status == 'booked' || trips.status == 'completed'"
			                      >
			                        Booked
			                      </p>
			                      <p class="status-blue"
			                        v-if="trips.status != 'booked' && trips.status != 'completed'"
			                      >
			                        Not Booked
			                      </p>

			                  </li>

			                  <li
			                    v-if="trips.status != 'booked' && trips.status != 'completed' && trips.sessionDetails.expire  && onlineMode"
			                  >
		                        <v-btn color="error"
								 class="btn-save" @click="searchExpireItem(trips, trips.engine, 'trip')" style="margin-top:10px;">
		                          Update
		                        </v-btn>
			                  </li>

			                  <li
			                    v-if="trips.status != 'booked' && trips.status != 'completed' && trips.sessionDetails.expire && onlineMode"
			                  	style="text-align: center; display: inline-block;"
			                  >
		                          <div
		                            class="sidebar-remove-box qoutetabe-remove-btn">
		                            <a
		                              href="#"
		                              @click="removeTrip(trips)"
		                              class="show-more-btn"
		                            >
		                              <i class="far fa-trash-alt"></i>
		                              Remove
		                            </a>
		                          </div>
			                  </li>

			                </ul>
			                <v-expansion-panel-header @click="
			                        itemDetials[index].search.expanded = !itemDetials[
			                          index
			                        ].search.expanded
			                      ">
			                  <div class="collpase-heading">
			                    <span
			                      v-if="itemDetials[index].search.expanded"
			                      >Hide Details</span
			                    >
			                    <span
			                      v-if="!itemDetials[index].search.expanded"
			                      >Show Details</span
			                    >
			                  </div>
			                </v-expansion-panel-header>
			              </div>
			            </div>
			          </div>

			        <v-expansion-panel-content v-if="trips.engine == 'car'">
			          <div
			            class="car-listing-tabs-outer"
			            v-if="
			              trips.carDetails == null &&
			                trips.booking &&
			                Array.isArray(trips.booking) == false
			            "
			          >
			            <div class="car-listing-tabs">
			              <template>
			                <v-tabs
			                  v-model="trips.tab"
			                  background-color="primary"
			                  class="tabs-car-ul"
			                >
			                  <v-tab href="#tab-1">
			                    <span>Booking Details</span>
			                  </v-tab>
			                </v-tabs>

			                <div class="tabs-text-content pt-0">
			                  <v-tabs-items v-model="trips.tab">
			                    <v-tab-item value="tab-1">
			                      <!--car booking detail-->
			                      <div class="acord-body">
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

			                              <!--
			                                                      <tr>
			                                                          <td>Pickup City:</td>
			                                                          <td>{{ trips.item.searchData.pickUp }}</td>
			                                                      </tr>
			                                                      -->

			                              <tr>
			                                <td>Supplier Order ID:</td>
			                                <td>
			                                  {{ trips.booking.orderId }}
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
			                                  {{ trips.item.searchData.pickUp.date }}
			                                </td>
			                              </tr>

			                              <!--
			                                                      <tr>
			                                                          <td>Return City:</td>
			                                                          <td>{{ trips.item.searchData.pickUp.locationName }}</td>
			                                                      </tr>
			                                                      -->

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
			                                  {{ trips.item.searchData.dropOff.date }}
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
			                                <td>Status:</td>
			                                <td class="clr-blue">
			                                  {{ trips.booking.status | capitalize }}
			                                </td>
			                              </tr>
			                            </tbody>
			                          </template>
			                        </v-simple-table>
			                      </div>
			                      <!--car booking detail-->
			                    </v-tab-item>
			                  </v-tabs-items>
			                </div>
			              </template>
			            </div>
			          </div>

			          <div class="car-listing-tabs-outer" v-if="trips.carDetails != null">
			            <div class="car-listing-tabs">
			              <span
			                class="alert alert-warning details-tab"
			                v-if="trips.carDetails == null"
			              >
			                <i
			                  class="fas fa-exclamation-triangle"
			                  style="color: #856404"
			                ></i>
			                Unfortunately, we have no further details on this vehicle.
			              </span>

			              <template>
			                <v-tabs
			                  v-model="trips.tab"
			                  background-color="primary"
			                  class="tabs-car-ul"
			                >
			                  <v-tab href="#tab-1">
			                    <span>Car Features</span>
			                  </v-tab>
			                  <v-tab href="#tab-2">
			                    <span>Extras Available</span>
			                  </v-tab>
			                  <v-tab href="#tab-3">
			                    <span>Trip Summary</span>
			                  </v-tab>
			                  <v-tab href="#tab-6">
			                    <span>Package Details</span>
			                  </v-tab>
			                  <v-tab href="#tab-7">
			                    <span>Cancellation and Policies</span>
			                  </v-tab>
			                  <v-tab
			                    href="#tab-8"
			                    v-if="
			                      trips.booking && Array.isArray(trips.booking) == false
			                    "
			                  >
			                    <span>Booking Details</span>
			                  </v-tab>
			                </v-tabs>

			                <div class="tabs-text-content">
			                  <v-tabs-items v-model="trips.tab">
			                    <v-tab-item value="tab-1">
			                      <div class="cartab-specs-content">
			                        <ul>
			                          <li v-if="activeDomain == 'us'">
			                            <i class="fas fa-gas-pump"></i>
			                            Gasoline
			                          </li>
			                          <li v-if="activeDomain != 'us'">
			                            <i class="fas fa-gas-pump"></i>
			                            Petrol
			                          </li>
			                          <li>
			                            <i class="fas fa-cog"></i>
			                            Automatic
			                          </li>
			                          <li>
			                            <i class="fas fa-dharmachakra"></i>
			                            2WD
			                          </li>
			                          <li>
			                            <i class="fas fa-stroopwafel"></i>
			                            Air Conditioning
			                          </li>
			                          <li>
			                            <i class="fas fa-stroopwafel"></i>
			                            Airbag
			                          </li>
			                          <li>
			                            <i class="fas fa-stroopwafel"></i>
			                            FM Radio
			                          </li>
			                          <li>
			                            <i class="fas fa-stroopwafel"></i>
			                            Sensor
			                          </li>
			                          <li>
			                            <i class="fas fa-stroopwafel"></i>
			                            Power Windows
			                          </li>
			                          <li>
			                            <i
			                              class="fas fa-stroopwafel"
			                              v-if="activeDomain == 'us'"
			                            ></i>
			                            Speed MPH
			                          </li>
			                          <li>
			                            <i class="fas fa-stroopwafel"></i>
			                            Enhanced Cleaning
			                          </li>
			                          <li v-if="activeDomain != 'us'">
			                            <i class="fas fa-stroopwafel"></i>
			                            Speed MPH
			                          </li>
			                        </ul>
			                      </div>
			                    </v-tab-item>
			                    <v-tab-item value="tab-2">
			                      <ExtraAvailableTab :car="trips.carDetails.carDetails" />
			                    </v-tab-item>
			                    <v-tab-item value="tab-3">
			                      <TripSummaryTab :car="trips.carDetails.carDetails" />
			                    </v-tab-item>
			                    <v-tab-item value="tab-6">
			                      <PackageDetailsTab :car="trips.carDetails.carDetails" />
			                    </v-tab-item>
			                    <v-tab-item value="tab-7">
			                      <CancellationPoliciesTab
			                        :car="trips.carDetails.carDetails"
			                      />
			                    </v-tab-item>
			                    <v-tab-item value="tab-8">
			                      <!--car booking detail-->
			                      <div class="acord-body">
			                        <div
			                          v-if="
			                            trips.booking &&
			                              Array.isArray(trips.booking) == false
			                          "
			                        >
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

			                              <!--
			                                                      <tr>
			                                                          <td>Pickup City:</td>
			                                                          <td>{{ trips.item.searchData.pickUp }}</td>
			                                                      </tr>
			                                                      -->

			                              <tr>
			                                <td>Supplier Order ID:</td>
			                                <td>
			                                  {{ trips.booking.orderId }}
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
			                                  {{ trips.item.searchData.pickUp.date }}
			                                </td>
			                              </tr>

			                              <!--
			                                                      <tr>
			                                                          <td>Return City:</td>
			                                                          <td>{{ trips.item.searchData.pickUp.locationName }}</td>
			                                                      </tr>
			                                                      -->

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
			                                  {{ trips.item.searchData.dropOff.date }}
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
			                                <td>Status:</td>
			                                <td class="clr-blue">
			                                  {{ trips.booking.status | capitalize }}
			                                </td>
			                              </tr>
			                            </tbody>
			                          </template>
			                        </v-simple-table>
			                      </div>
			                      <!--car booking detail-->
			                    </v-tab-item>
			                  </v-tabs-items>
			                </div>
			              </template>
			            </div>
			          </div>

			          <div v-if="trips.carDetails == null && Array.isArray(trips.booking) == true">

			            <div class="car-listing-tabs" style="margin-top: 20px;">
			              <span
			                class="alert alert-warning details-tab"
			              >
			                	<i class="fas fa-exclamation-triangle" style="color: #856404"></i>
			                	Unfortunately, we have no further details on this vehicle.
			             </span>
			            </div>

			          </div>

			        </v-expansion-panel-content>

	        		</div>

	        	  </v-expansion-panel>

	    	  </v-expansion-panels>

	    	</div><!--cars box-->





         <!-- Activity Box -->
     <div class="hotel-back-btn" style="" v-show="hasActivityTrip">

			    <div class="title-heading">  
		          	<h2 class="blue-heading">
			    	<i class="fas fa-tasks" style="font-size: 24px;"></i>Activity</h2>  
		        </div>
				    <v-expansion-panels class="">
			      
			      <v-expansion-panel
			        v-for="(trips, index) in tripBookingOfQuote"
			        :key="'A' + index"
			        class="mb-8 bottom-mr"
			        v-if="trips.engine == 'activity'"
			      >
  <div class="single-listing-repeat">
                    <div class="single-listing" v-if="trips.engine == 'activity'">
                        <div
                            class="main-left car-left-box hotel-main-left activity-main-left"
                        >
                            <div class="hotel-name activity-listing-img">
                                <div
                                    class="product-text hotel-product-text activity-product-text"
                                >
                                    <star-rating
                                        :star-size="15"
                                        :border-width="1"
                                        border-color="#fff"
                                        :rounded-corners="true"
                                        :star-points="[
                                            23,
                                            2,
                                            14,
                                            17,
                                            0,
                                            19,
                                            10,
                                            34,
                                            7,
                                            50,
                                            23,
                                            43,
                                            38,
                                            50,
                                            36,
                                            34,
                                            46,
                                            19,  
                                            31,
                                            17
                                        ]"
                                        :rating="Number(Math.round(itemDetials[index].search.starRating))"
                                        :read-only="true"
                                        :show-rating="false"
                                        style="padding-top: 5px;"
                                    >
                                    </star-rating>
                                    <div
                                        class="activity-reviews"
                                        v-if="itemDetials[index].search.reviewCount > 0"
                                    >
                                        <p>
                                            ({{ itemDetials[index].search.reviewCount }} Review)
                                        </p>
                                    </div>
                                    <h3 class="hotel-name  activity-name">
                                        {{ itemDetials[index].search.displayName }}
                                    </h3>
                                </div>
                                <div class="product-img">
                                    <img
									v-bind:src="itemDetials[index].search.images[0].variants[12].url"
                                        alt="img"
                                    />
                                </div>
                                <div class=" activity-outer-right">
                                    <div
                                        class="product-specs hotel-product-specs"
                                    >
                                        <p>
                                            {{
                                                itemDetials[index].search.categories.string.toString()
                                            }}
                                        </p>
                                    </div>
                                    <div class="activity-anitmiteis">
                                        <ul
                                            v-if="
                                                typeof itemDetials[index].search.subCategories.string
                                                     == 'string'
                                            "
                                        >
                                            <i class="fas fa-tags"></i>
                                            <li>
                                                {{
                                                    itemDetials[index].search.subCategories
                                                        .string
                                                }}
                                            </li>
                                        </ul>

                                        <ul v-else>
                                            <i class="fas fa-tags"></i>
                                            <li
                                                v-for="(subcat,
                                                index) in itemDetials[index].search.subCategories
                                                    .string"
                                                :key="index"
                                            >
                                                {{ subcat }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="hotel-main-right">
                            <div class="product-reverse hotel-product-reverse">
                                <p>Prices From</p>
                                <h2>
                                    {{currencySymbol}}
                                    <span> {{ itemDetials[index].search.finalPrice }} </span>
                                </h2>
         <ul>
                  <li>
                     <p class="status-blue"
                      v-if="
                        trips.status == 'booked' || trips.status == 'completed'
                      "
                    >
                      Booked
                    </p>
                     <p class="status-blue"
                      v-if="
                        trips.status != 'booked' && trips.status != 'completed'
                      "
                    >
                      Not Booked
                    </p>
                  </li>
                  <div
                    class="sidebar-remove-box"
                    v-if="trips.status != 'booked'"
                  >
                    <a
                      href="#"
                      @click="removeTrip(trips)"
                      class="show-more-btn in-right"
                    >
                      <i class="far fa-trash-alt"></i>
                      Remove
                    </a>
                  </div>
                 </ul>
                                <v-expansion-panel-header @click="itemDetials[index].search.expanded = !itemDetials[index].search.expanded">
                                    <div class="collpase-heading">
                                        <span v-if="!itemDetials[index].search.expanded" >Show Details</span>
                                        <span v-if="itemDetials[index].search.expanded"> Hide Details</span>
                                    </div>
                                </v-expansion-panel-header>
                            
                            </div>
                        </div>
                    </div>
                </div>
                <v-expansion-panel-content v-if="trips.engine ==='activity'">
                    <div class="car-listing-tabs-outer">
                        <div class="car-listing-tabs">
                            <v-card flat>
                                <v-card-text v-html="itemDetials[index].search.description">
                                </v-card-text>
                            </v-card>
                        </div>
                    </div>
					
                </v-expansion-panel-content>

				  </v-expansion-panel>
					</v-expansion-panels>
	 </div>

		 <!--End Activity Box-->
	    	<!--villa box-->
	        <div class="hotel-back-btn" style="" v-show="hasVillaTrip">

			    <div class="title-heading">  
		          	<h2 class="blue-heading">
			    	<i class="fas fa-umbrella-beach" style="font-size: 24px;"></i>Villas</h2>  
		        </div>

			    <v-expansion-panels class="">
			      
			      <v-expansion-panel
			        v-for="(trips, index) in tripBookingOfQuote"
			        :key="'A' + index"
			        class="mb-8 bottom-mr"
			        v-if="trips.engine == 'villa'"
			      >

			      	<div class="single-listing-repeat">

                    <div class="single-listing" v-if="trips.engine=='villa'">
                        <div class="main-left car-left-box hotel-main-left">
                            <div class="hotel-name">
                                <div class="product-text hotel-product-text">
                                    <div
                                        class="rating-row"
                                        style="margin: 10px 0px 0px 0px"
                                    >
                                        <div style="margin: 20px 0px 20px 0px">
                                            <span class="hotelTotalStar">
                                                <star-rating
                                                    :star-size="15"
                                                    :border-width="1"
                                                    border-color="#fff"
                                                    :rounded-corners="true"
                                                    :star-points="[
                                                        23,
                                                        2,
                                                        14,
                                                        17,
                                                        0,
                                                        19,
                                                        10,
                                                        34,
                                                        7,
                                                        50,
                                                        23,
                                                        43,
                                                        38,
                                                        50,
                                                        36,
                                                        34,
                                                        46,
                                                        19,
                                                        31,
                                                        17
                                                    ]"
                                                    :rating="
                                                        Number(Math.round(itemDetials[index].search.starRating))
                                                    "
                                                    :show-rating="false"
                                                    :read-only="true"
                                                >
                                                </star-rating>
                                            </span>
                                        </div>
                                    </div>

                                    <span class="hotel-star hotel-star-villa">
                                        <span
                                            v-if="
                                                itemDetials[index].search.review_nr ||
                                                    itemDetials[index].search.review_nr > 0
                                            "
                                            >({{ itemDetials[index].search.review_nr }})
                                            Reviews</span
                                        >
                                    </span>
                                    <h3>
                                        {{ itemDetials[index].search.displayName }}
                                    </h3>
                                    <p>
                                        <i class="fas fa-map-marker-alt"></i>
                                        {{ itemDetials[index].search.address }} &nbsp;
                                        <i class="fas fa-road"> </i>
                                        {{ itemDetials[index].search.distance }}
                                        {{ itemDetials[index].search.distanceUnit }}
                                    </p>
                                </div>
                                <div class="product-img">
                                    <span
                                        v-if="itemDetials[index].search.breakfast_included"
                                        class="ribbon"
                                        >Breakfast included</span
                                    >
                                    <img v-bind:src="itemDetials[index].search.img" alt="img" />
                                </div>

                                <div
                                    class="outer-right hotel-outer-right hhh-col-hotel-outer"
                                >
                                    <div
                                        class="product-reviews hotel-product-reviews bb"
                                    >
                                        <div class="in-left hotel-in-left">
                                            <ul>
                                                <li>
                                                    <v-tooltip top>
                                                        <template
                                                            v-slot:activator="{
                                                                on,
                                                                attrs
                                                            }"
                                                        >
                                                            <i
                                                                class="fas fa-bed"
                                                                v-bind="attrs"
                                                                v-on="on"
                                                            ></i>
                                                            {{
                                                                itemDetials[index].search.nbrOfBedrooms
                                                            }}
                                                        </template>
                                                        <span
                                                            >up to
                                                            {{
                                                                itemDetials[index].search.nbrOfBedrooms
                                                            }}
                                                            Bedrooms</span
                                                        >
                                                    </v-tooltip>
                                                </li>
                                                <li>
                                                    <v-tooltip top>
                                                        <template
                                                            v-slot:activator="{
                                                                on,
                                                                attrs
                                                            }"
                                                        >
                                                            <i
                                                                class="fas fa-users"
                                                                v-bind="attrs"
                                                                v-on="on"
                                                            ></i>
                                                            {{
                                                                itemDetials[index].search.maxOccupancy
                                                            }}
                                                        </template>
                                                        <span
                                                            >up to
                                                            {{
                                                                itemDetials[index].search.maxOccupancy
                                                            }}
                                                            Guests</span
                                                        >
                                                    </v-tooltip>
                                                </li>
                                                <li>
                                                    <v-tooltip top>
                                                        <template
                                                            v-slot:activator="{
                                                                on,
                                                                attrs
                                                            }"
                                                        >
                                                            <i
                                                                class="fas fa-bath"
                                                                v-bind="attrs"
                                                                v-on="on"
                                                            ></i>
                                                            {{
                                                                itemDetials[index].search.nbrOfBathrooms
                                                            }}
                                                        </template>
                                                        <span
                                                            >up to
                                                            {{
                                                                itemDetials[index].search.nbrOfBathrooms
                                                            }}
                                                            Bathrooms</span
                                                        >
                                                    </v-tooltip>
                                                </li>
                                            </ul>
                                        </div>
                                        <div
                                            class="in-right hotel-in-right"
                                        ></div>
                                    </div>
                                    <div
                                        class="product-specs hotel-product-specs b-bottom-0"
                                        v-for="(room, index) in itemDetials[index].search.rooms"
                                        :key="index"
                                    >
                                        <p>
                                            <b
                                                ><i class="fas fa-user"></i> x
                                                {{
                                                    room.persons.adult +
                                                        room.persons.child
                                                }}
                                                &nbsp;
                                                {{ room.name }}
                                            </b>
                                             
                                            <span class="">
                                                {{
                                                    room.policies
                                                        .POLICY_PRE_PAYMENT
                                                }}
                                            </span>
                                             
                                            <span>{{
                                                room.policies
                                                    .POLICY_CANCELLATION
                                            }}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hotel-main-right">
                            <div class="product-reverse hotel-product-reverse">
                                <p class="p-form">Prices From:</p>
                                <h2>
                                    {{ currencySymbol }}
                                    <span
                                        >{{ itemDetials[index].search.totalPrice }}
                                    </span>
                                </h2>
                                <p>
                                    {{ getTotalDaysInDates(trips.item.searchData.checkinDate, trips.item.searchData.checkoutDate) }} <span class="nightColor" v-if="Number(getTotalDaysInDates(trips.item.searchData.checkinDate, trips.item.searchData.checkoutDate)) == 1">night,</span>
                                    <span class="nightColor" v-if="Number(getTotalDaysInDates(trips.item.searchData.checkinDate, trips.item.searchData.checkoutDate)) > 1">nights,</span>
                                    {{ personCount(itemDetials[index].search.rooms) }}
                                </p>

					            <ul>

					              <li v-if="trips.status == 'booked' || trips.status == 'completed'">
					                 <p class="status-blue">
					                  Booked
					                </p>
					              </li>

					              <li v-if="trips.status != 'booked' && trips.status != 'completed'">
					                 <p class="status-blue" mall>
					                  Not Booked
					                </p>
					              </li>

				                  <li
				                    v-if="trips.status != 'booked' && trips.status != 'completed' && trips.sessionDetails.expire  && onlineMode"
				                  >
			                        <v-btn color="error"
									 class="btn-save" @click="searchExpireItem(trips, trips.engine, 'trip')" style="margin-top:10px;">
			                          Update
			                        </v-btn>
				                  </li>

				                  <li
				                    v-if="trips.status != 'booked' && trips.status != 'completed' && trips.sessionDetails.expire && onlineMode"
				                  	style="text-align: center; display: inline-block;"
				                  >
			                          <div
			                            class="sidebar-remove-box qoutetabe-remove-btn">
			                            <a
			                              href="#"
			                              @click="removeTrip(trips)"
			                              class="show-more-btn"
			                            >
			                              <i class="far fa-trash-alt"></i>
			                              Remove
			                            </a>
			                          </div>
				                  </li>

					            </ul>

                                <ul class="villa-fee-canellation">
                                    <li v-if="itemDetials[index].search.refundable">
                                       <p class="status-blue">Free Cancellation
                                            <span class="break"></span>
                                            Refundable</p>
                                    </li>
                                </ul>
                                <v-expansion-panel-header>
                                    <div class="collpase-heading">
						                <span v-if="trips.expanded" @click="trips.expanded=false">Hide Details</span>
						                <span v-if="!trips.expanded" @click="trips.expanded=true">Show Details</span>
                                    </div>
                                </v-expansion-panel-header>
                            </div>
                        </div>
			      	</div>

			        <v-expansion-panel-content v-if="trips.engine == 'villa'">
			          <div class="quote-tab-grouping">
			            <div class="quote-grouping-box">
                         	
							<VillaRoom 
								:rooms="trips.rooms" 
								:villa="trips.item.engineDetails" 
								:checkInDate="trips.item.searchData.checkinDate" 
								:checkOutDate="trips.item.searchData.checkoutDate"
								:totalAdults="trips.totalAdults"
								:totalChilds="trips.totalChilds"
								:totalNights="trips.totalNights"
								:displayVillaBasics="trips.basicVillaInfoDisplay"
							/>

			              <div
			                class="tabs-text-content"
			              >
			                <v-tabs-items v-model="trips.tab">
			                </v-tabs-items>

			              </div>

			            </div>
			          </div>
			        </v-expansion-panel-content>

			      	</div>
			      </v-expansion-panel>

			    </v-expansion-panels>

			</div>
			<!--villa box-->


	    	<!--hotel box-->
	        <div class="hotel-back-btn" style="" v-show="hasHotelTrip">

			    <div class="title-heading">  
		          <h2 class="blue-heading">
			    <i class="fas fa-hotel" style="font-size: 24px;"></i>Hotels</h2>  
		        </div>

			    <v-expansion-panels class="">
			      
			      <v-expansion-panel
			        v-for="(trips, index) in tripBookingOfQuote"
			        :key="'A' + index"
			        class="mb-8 bottom-mr"
			        v-if="trips.engine == 'hotel'"
			      >
                   
			      	<!--Signle Repeat List-->
			        <div class="single-listing-repeat">

			          <div class="single-listing" v-if="trips.engine == 'hotel'">
			            <div class="main-left car-left-box hotel-main-left">
			              <div class="hotel-name">
			                <div class="product-text hotel-product-text">
			                  <star-rating
			                    :star-size="15"
			                    :border-width="1"
			                    border-color="#fff"
			                    :rounded-corners="true"
			                    :star-points="[
			                      23,
			                      2,
			                      14,
			                      17,
			                      0,
			                      19,
			                      10,
			                      34,
			                      7,
			                      50,
			                      23,
			                      43,
			                      38,
			                      50,
			                      36,
			                      34,
			                      46,
			                      19,
			                      31,
			                      17
			                    ]"
			                    :rating="Number(Math.round(itemDetials[index].search.starRating))"
			                    :show-rating="false"
			                    :read-only="true"
			                    style="top: 10px;position: relative;"
			                  >
			                  </star-rating>

			                  <h3>
			                    {{ itemDetials[index].search.displayName }}
						
			                  </h3>
			                  <p>
			                    <i class="fas fa-map-marker-alt"></i>
			                    {{ itemDetials[index].search.address }}
			                  </p>
			                </div>
			                <div class="product-img">
			                  <img v-bind:src="itemDetials[index].search.img" alt="img" />
			                </div>

			                <div
			                  class="outer-right hotel-outer-right hhh-col-hotel-outer"
			                >
			                  <div class="product-reviews hotel-product-reviews">
			                    <div class="in-left hotel-in-left">
			                      <ul>
			                        <li v-if="itemDetials[index].search.phone !== null">
			                          <i class="fas fa-phone-alt"></i>
			                          {{
			                            itemDetials[index].search.phone
			                              | numberFormat(
			                                cCodes,
			                                itemDetials[index].search.countryCode
			                              )
			                          }}
			                        </li>
			                     
									 <li v-if="domain=='uk' || domain == 'ie'">
                                                    <i class="fas fa-road"> </i>
                                                     {{itemDetials[index].search.distance/1000}}
                                                   
                                                    {{compDistanceUnit()}} 
                                                </li>
                                                <li v-else>
                                                    <i class="fas fa-road"> </i>
                                                    {{itemDetials[index].search.distance}}
                                                    {{itemDetials[index].search.distanceUnit}} 
                                                  
                                                </li>
									<li>
									<span><strong>Check In Date : </strong> {{ justFormatRawDate(searchData[index].searchRecord.checkinDate) }}</span>&nbsp;
									  <span><strong>Check Out Date : </strong> {{ justFormatRawDate(searchData[index].searchRecord.checkoutDate) }}</span>
									</li>
			                      </ul>
			                    </div>
			                    <div class="in-right hotel-in-right"></div>
			                  </div>
							
			        <div 
                      v-if="itemDetials[index].search.hotelFacility"
                  class="product-specs hotel-product-specs">
                    <ul>
						   <li v-for="(value,name,index) in itemDetials[index].search.hotelFacility" v-bind:index="index" v-bind:key="name+'-'+index">
                       
                        <v-tooltip top>
                          <template
                            v-slot:activator="{
                              on,
                              attrs
                            }"
                          >
                          
                           <i v-if="name=='Restaurant'" v-bind="attrs" v-on="on" class="material-icons">restaurant</i>
                           <i v-if="name=='Internet'" v-bind="attrs" v-on="on" class="material-icons">language</i>
                           <i v-if="name=='FitnessFacility'" v-bind="attrs" v-on="on" class="material-icons">fitness_center</i>
                           <i v-if="name=='Parking'" v-bind="attrs" v-on="on" class="material-icons">directions_car</i>
                           <i v-if="name=='Lounge'" v-bind="attrs" v-on="on" class="material-icons">weekend</i>
                           <i v-if="name=='ChildcareService'" v-bind="attrs" v-on="on" class="material-icons">child_care</i>
                           <i v-if="name=='Casino'" v-bind="attrs" v-on="on" class="material-icons">casino</i>
                           <i v-if="name=='Breakfast'" v-bind="attrs" v-on="on" class="material-icons">local_dining</i>
                           <i v-if="name=='BusinessCenter'" v-bind="attrs" v-on="on" class="material-icons">business_center</i>
                           <i v-if="name=='CurrencyExchange'"  v-bind="attrs" v-on="on" class="material-icons">monetization_on</i> 
                           <i v-if="name=='Bar'"  v-bind="attrs" v-on="on" class="material-icons">local_bar</i>
                           <i v-if="name=='Spa'"  v-bind="attrs" v-on="on" class="material-icons">spa</i> 
                           <i v-if="name=='NonSmoking'"  v-bind="attrs" v-on="on" class="material-icons">smoke_free</i>
                           <i v-if="name=='Television'"  v-bind="attrs" v-on="on" class="material-icons">personal_video</i>
                           <i v-if="name=='LaundryServices'"  v-bind="attrs" v-on="on" class="material-icons">local_laundry_service</i>
                           <i v-if="name=='SwimmingPool'"  v-bind="attrs" v-on="on" class="material-icons">pool</i>
                           <i v-if="name=='Refrigerator'"  v-bind="attrs" v-on="on" class="material-icons">kitchen</i>
                           <i v-if="name=='Balcony'"  v-bind="attrs" v-on="on" class="material-icons">balcony</i>
                           <i v-if="name=='Golf'"  v-bind="attrs" v-on="on" class="material-icons">golf_course</i>
                           <i v-if="name=='Suite'"  v-bind="attrs" v-on="on" class="material-icons">airline_seat_individual_suite</i>
                           <i  v-if="name=='Villas'" v-bind="attrs" v-on="on" class="material-icons">villa</i>
                           <i v-if="name=='Roomservice'"  v-bind="attrs" v-on="on" class="material-icons">room_service</i>
                           <i v-if="name=='Kitchenette'"  v-bind="attrs" v-on="on" class="material-icons">countertops</i>   
                           <i v-if="name=='Powerbanks'"  v-bind="attrs" v-on="on" class="material-icons">battery_saver</i>
                           <i  v-if="name=='Headphones'" v-bind="attrs" v-on="on" class="material-icons">headset</i>
                           <i  v-if="name=='Barbeque'" v-bind="attrs" v-on="on" class="material-icons">outdoor_grill</i> 
                           <i  v-if="name=='Banquet'" v-bind="attrs" v-on="on" class="material-icons">soup_kitchen</i>
                           <i v-if="name=='Medical'" v-bind="attrs" v-on="on" class="material-icons">medical_services</i>
                           <i v-if="name=='Sauna'" v-bind="attrs" v-on="on" class="material-icons">bathtub</i>
                           <i v-if="name=='TravelDesk'" v-bind="attrs" v-on="on" class="material-icons">flight_class</i>  
                           <i v-if="name=='DisableFriendly'" v-bind="attrs" v-on="on" class="material-icons">person_off</i>    
                           <i v-if="name=='Multilingual'" v-bind="attrs" v-on="on" class="material-icons">translate</i> 
                           <i v-if="name=='NightClub'" v-bind="attrs" v-on="on" class="material-icons">nightlife</i>
                           <i v-if="name=='HairSalon'" v-bind="attrs" v-on="on" class="material-icons">chair_alt</i>   
                           <i v-if="name=='Library'" v-bind="attrs" v-on="on" class="material-icons">local_library</i> 
                           <i v-if="name=='LazyRiver'" v-bind="attrs" v-on="on" class="material-icons">kayaking</i>  
                           <i v-if="name=='WaterSlide'" v-bind="attrs" v-on="on" class="material-icons">water</i>    
                           <i v-if="name=='WaterPark'" v-bind="attrs" v-on="on" class="material-icons">pool</i>      
                           <i v-if="name=='RoofTopTerrace'" v-bind="attrs" v-on="on" class="material-icons">deck</i>    
                           <i v-if="name=='Karaoke'" v-bind="attrs" v-on="on" class="material-icons">library_music</i> 
                           <i v-if="name=='SharedMicrowave'" v-bind="attrs" v-on="on" class="material-icons">microwave</i> 
                           <i v-if="name=='Clubhouse'" v-bind="attrs" v-on="on" class="material-icons">liquor</i> 
                           <i v-if="name=='Dock'" v-bind="attrs" v-on="on" class="material-icons">dock</i> 
                           <i v-if="name=='AmexReserve'" v-bind="attrs" v-on="on" class="material-icons">payment</i> 
                           <i v-if="name=='ATM'" v-bind="attrs" v-on="on" class="material-icons">atm</i> 
                           <i v-if="name=='ConciergeServices'" v-bind="attrs" v-on="on" class="material-icons">assist_walker</i> 
                           <i v-if="name=='Billiards'" v-bind="attrs" v-on="on" class="material-icons">Games</i> 
                           <i v-if="name=='Tennis'" v-bind="attrs" v-on="on" class="material-icons">tennis</i> 
                           <i v-if="name=='HospitalBed'" v-bind="attrs" v-on="on" class="material-icons">hotel</i> 
                           <i v-if="name=='CoupleDining'" v-bind="attrs" v-on="on" class="material-icons">table_restaurant</i>  
                           <img   v-on="on" v-if="name=='AirportShuttle' || name=='Safedepositbox' || name=='PetsAllowed'" :src="require('@/assets/images/facility.svg').default"/>
                             
                          </template>
                          <span v-if="name=='Safedepositbox' ">Safe Deposit Box</span>
                          <span v-else-if="name=='LaundryServices'">Laundry Services</span>
                          <span v-else-if="name=='AirportShuttle'">Airport Shuttle</span>
                          <span v-else-if="name=='PetsAllowed'">Pets Allowed</span>
                          <span v-else-if="name=='CoupleDining'">Couple Dining</span>
                          <span v-else-if="name=='HospitalBed'">Hospital Bed</span>
                          <span v-else-if="name=='AmexReserve'">Amex Reserve</span>
                          <span v-else-if="name=='Clubhouse'">Club house</span>
                          <span v-else-if="name=='SharedMicrowave'">Shared Microwave</span>
                          <span v-else-if="name=='RoofTopTerrace'">Roof Top Terrace</span>
                          <span v-else-if="name=='WaterPark'">Water Park</span>
                          <span v-else-if="name=='WaterSlide'">Water Slide</span>
                          <span v-else-if="name=='LazyRiver'">Lazy River</span>
                          <span v-else-if="name=='HairSalon'">Hair Salon</span>
                          <span v-else-if="name=='NightClub'">Night Club</span>
                          <span v-else-if="name=='DisableFriendly'">Disable Friendly</span>
                          <span v-else-if="name=='TravelDesk'">Travel Desk</span>
                          <span v-else-if="name=='Roomservice'">Room Service</span>
                          <span v-else-if="name=='FitnessFacility'">Fitness Facility</span>
                          <span v-else-if="name=='SwimmingPool'">Swimming Pool</span>
                          <span v-else-if="name=='NonSmoking'">Non-Smoking</span>
                          <span v-else-if="name=='CurrencyExchange'">Currency Exchange</span>
                          <span v-else-if="name=='BusinessCenter'">Business Center</span>
                          <span v-else-if="name=='ChildcareService'">Childcare Service</span>
                          <span v-else>{{name}}</span>
                          
                        </v-tooltip>
                      </li>
                   
                    </ul>
                  </div>
			                  <p class="room-basis">
			                    <b>
			                      <span
			                        v-if="itemDetials[index].search.basisList.length > 0"
			                      >
			                        {{ itemDetials[index].search.basisList.join(',') }}
			                      </span>
			                    </b>
			                  </p>
			                </div>

			                <div class="nin-col-aminities-box">
			                  <div
			                    class="outer-right hotel-outer-right hhh-col-hotel-outer"
			                  >
			                    <div class="product-varify ">
			                      <h5>Available Amenities</h5>
			                      <ul>
			                        <li>
			                          <i class="fas fa-check"></i>
			                          <span>Smoke-Free zone</span>
			                        </li>
			                        <li>
			                          <i class="fas fa-check"></i>
			                          <span>Spa</span>
			                        </li>
			                        <li>
			                          <i class="fas fa-check"></i>
			                          <span>Lounge</span>
			                        </li>
			                        <li>
			                          <i class="fas fa-check"></i>
			                          <span>Airport Transport</span>
			                        </li>
			                        <li
			                          v-if="itemDetials[index].search.hasFitness == 'YES'"
			                        >
			                          <i class="fas fa-check"></i>
			                          <span>Fitness Center</span>
			                        </li>
			                      </ul>
			                    </div>
			                  </div>
			                </div>
			              </div>
			            </div>
			            <div class="hotel-main-right">
			              <div class="product-reverse hotel-product-reverse">
							 <span v-if="domain=='uk' && trips.hotelDetails.package.rooms[0].isMor=='true'">
                               <img :src="require('@/assets/images/atol-warning.jpg').default" 
                               style="width:40px;
                               height:40px;"
                               title="ATOL certificate required when purchased within 24 hours of a flight booking." 
                               alt="ATOL certificate required when purchased within 24 hours of a flight booking."/>
                               </span>
							   <span v-if="domain == 'ie' && trips.hotelDetails.package.rooms[0].isMor=='true'">
                               <img :src="require('@/assets/images/topps.jpg').default" 
                               style="width:60px;
                               height:30px;"
                               title="TOPPS certificate required when purchased within 24 hours of a flight booking." 
                               alt="TOPPS certificate required when purchased within 24 hours of a flight booking."/>
                               </span>
			                <h2>

			                  {{ CSymbol }}<span>{{trips.hotelDetails.length > 0
			                        ? trips.hotelDetails.package.finalPrice
			                        : trips.packagePrice
			                    }}
			                  </span>
			                </h2>
			                <p v-if="itemDetials[index].search.hasCugHotel == 'YES'">
			                  ITA Preferred
			                </p>
			                <p>
			                  Total for
			                  {{ setNightCount(searchData[index].searchRecord) }}
			                  nights
			                </p>

			                <ul>
			                  <li v-if="trips.status == 'booked' || trips.status == 'completed'">
			                     <p class="status-blue">
			                      Booked
			                    </p>
			                  </li>

			                  <li v-if="trips.status != 'booked' && trips.status != 'completed'">
			                     <p class="status-blue" mall>
			                      Not Booked
			                    </p>
			                  </li>

			                  <li
			                    v-if="trips.status != 'booked' && trips.status != 'completed' && trips.sessionDetails.expire  && onlineMode"
			                  >
		                        <v-btn color="error" class="btn-save" @click="searchExpireItem(trips, trips.engine, 'trip')" style="margin-top:10px;">
		                          Update
		                        </v-btn>
			                  </li>

			                  <li
			                    v-if="trips.status != 'booked' && trips.status != 'completed' && trips.sessionDetails.expire  && onlineMode"
			                  	style="text-align: center; display: inline-block;"
			                  >
		                          <div
		                            class="sidebar-remove-box qoutetabe-remove-btn">
		                            <a
		                              href="#"
		                              @click="removeTrip(trips)"
		                              class="show-more-btn in-right"
		                            >
		                              <i class="far fa-trash-alt"></i>
		                              Remove
		                            </a>
		                          </div>
			                  </li>

			                </ul>
			                <v-expansion-panel-header
			                >
			                  <div class="collpase-heading">

			                    <span v-if="trips.expanded"
			                      @click="trips.expanded=false; viewHotel(trips, index ,false);"
			                      >Hide Details </span
			                    >
			                    <span v-if="!trips.expanded"
			                    	@click="trips.expanded=true; viewHotel(trips, index ,true);"
			                      >Show Details </span
			                    >

			                  </div>
			                </v-expansion-panel-header>
			              </div>
			            </div>
			          </div>

				        <!-- hotel -->
				        <v-expansion-panel-content v-if="trips.engine == 'hotel'">
				          <div class="quote-tab-grouping">
				            <div class="quote-grouping-box">

		                    <HotelRoom
		                        :totalNights="totalNights"
		                        :slides="slides"
		                        :packages="packages"
		                        :showAddCart="false"
		                        :showTripSummary="false"
		                        :defaultClass9Lg="false"
								:hotelimg="itemDetials[index].search.img"
								:roomData="trips.hotelDetails.roomData"
								:fixPathOfImage="fixPathOfImage"
		                    /> 
				              <div
				                class="tabs-text-content"
				              >
				                <v-tabs-items v-model="trips.tab">
				                </v-tabs-items>

				              </div>

				            </div>
				          </div>
				        </v-expansion-panel-content>

	        		</div><!--Single List Repeat-->

	        	  </v-expansion-panel>

	    	  </v-expansion-panels>

	    	</div><!--hotel box-->


	    	<!--flight box-->
	        <div class="hotel-back-btn" style="margin-bottom:10px;" v-show="hasFlightTrip">

			    <div class="title-heading">  
		          <h2 class="blue-heading">
			 <i class="fas fa-plane" style="font-size: 24px;"></i>Flights</h2>  
		        </div>

			    <v-expansion-panels class="">
			      
			      <v-expansion-panel
			        v-for="(trips, index) in tripBookingOfQuote"
			        :key="'A' + index"
			        class="mb-4 bottom-mr"
			        v-if="trips.engine == 'flight'"
			      >

			      	<!--Signle Repeat List-->
			        <div class="single-listing-repeat">

			          <div class="single-listing" v-if="trips.engine == 'flight'">
			            <div class="main-left">
			              <div class="outer-right flight-outer-right">
			                <div
			                  class="flight-schedule"
			                  v-bind:class="
			                    fType === 'oneWay' ? 'oneWay-results' : 'multiple-results'
			                  "
			                  v-for="(route, routeIndex) in itemDetials[index].search
			                    .flights"
			                  :key="routeIndex"
			                >
			                  <div class="f-in-left">
			                    <div class="d-inline-block text-center">
			                      <div
			                        class="Airline-Image"
			                        :class="`airline-${route.airlineIata}`"
			                        id="logoairline"
			                      ></div>
			                      <p>
			                        {{ route.airlineName }}
			                      </p>
								   <p class="mt-2 text-align-cabin">
                                    {{ route.cabinClass }} {{route.cabinClassText == undefined || route.cabinClassText==''?'':'('+route.cabinClassText+')'}}
                                   </p>
			                    </div>
			                  </div>
			                  <div class="f-in-right">
			                    <ul>
			                      <li>
			                        <div class="schedule-time-01">
			                          <h3>
			                            {{
			                              route.flightDetails.departData.departTime.split(
			                                ' '
			                              )[0]
			                            }}
			                            <span>
			                              {{
			                                route.flightDetails.departData.departTime.split(
			                                  ' '
			                                )[1]
			                              }}
			                            </span>
			                          </h3>
			                          <p>
			                            {{
			                              transformToCode(
			                                route.flightDetails.departData.departCity
			                              )
			                            }}
			                          </p>
			                        </div>
			                        <div class="schedule-time-02">
			                          <div class="plane-icon-img">
			                            <img
			                              src="@/assets/images/plane-icon.png"
			                              alt="img"
			                            />
			                          </div>
			                          <p>
			                            {{ route.totalHours }}
			                          </p>
									<!--   <span> <strong>Date :</strong> {{searchData[index].searchRecord.date[0]}}</span>&nbsp; -->
			                        </div>
			                        <div class="schedule-time-01">
			                          <h3>
			                            {{
			                              route.flightDetails.arriveData.arriveTime.split(
			                                ' '
			                              )[0]
			                            }}
			                            <span>{{
			                              route.flightDetails.arriveData.arriveTime.split(
			                                ' '
			                              )[1]
			                            }}</span>
			                          </h3>
			                          <p>
			                            {{
			                              transformToCode(
			                                route.flightDetails.arriveData.arriveCity
			                              )
			                            }}
			                          </p>
			                        </div>
									
									
			                      </li>
			                    </ul>
			                  </div>
			                </div>
			              </div>
			            </div>
			            <div class="main-right">
			              <div class="product-reverse">
								 <span v-if="domain=='uk' && trips.atol">
                               <img :src="require('@/assets/images/atol-warning.jpg').default" 
                               style="width:40px;
                               height:40px;"
                               title="ATOL certificate required when purchased within 24 hours of a flight booking." 
                               alt="ATOL certificate required when purchased within 24 hours of a flight booking."/>
                               </span>
							   <span v-if="domain=='ie' && trips.atol">
                               <img :src="require('@/assets/images/topps.jpg').default" 
                               style="width:60px;
                               height:30px;"
                               title="TOPPS certificate required when purchased within 24 hours of a flight booking." 
                               alt="TOPPS certificate required when purchased within 24 hours of a flight booking."/>
                               </span>
			                <b v-if="itemDetials[index].search.instantBooking">
			                  <span class="instant_booking">Instant Book</span></b
			                >
			                <h2>
			                  <p class="d-inline-block">From:</p>
			                  {{ CSymbol }}{{ itemDetials[index].search.totalPrice }}
			                </h2> 

			                <ul>
			                  <li v-if="itemDetials[index].search.isRefundable!='No'">
			                    <p class="status-blue">Refundable</p>
			                  </li>
			                  <li v-else>
			                    <p class="status-blue">Non-refundable</p>
			                  </li>

			                  <li v-if="trips.status == 'booked' || trips.status == 'completed'">
			                     <p class="status-blue">
			                      Booked
			                    </p>
			                  </li>

			                  <li v-if="trips.status != 'booked' && trips.status != 'completed'">
			                     <p class="status-blue">
			                      Not Booked
			                    </p>
			                  </li>
			                  <li
			                    v-if="trips.status != 'booked' && trips.status != 'completed' && trips.sessionDetails.expire  && onlineMode"
			                  >
		                        <v-btn color="error" class="btn-save" @click="searchExpireItem(trips, trips.engine, 'trip')" style="margin-top:10px;">
		                          Update
		                        </v-btn>
			                  </li>

			                  <li
			                    v-if="trips.status != 'booked' && trips.status != 'completed' && trips.sessionDetails.expire  && onlineMode"
			                  	style="text-align: center; display: inline-block;"
			                  >
		                          <div
		                            class="sidebar-remove-box qoutetabe-remove-btn">
		                            <a
		                              href="#"
		                              @click="removeTrip(trips)"
		                              class="show-more-btn in-right"
		                            >
		                              <i class="far fa-trash-alt"></i>
		                              Remove
		                            </a>
		                          </div>
			                  </li>
			                </ul>
			                <v-expansion-panel-header
			                  class="hidandshow-flight-btn"
			                >
			                  <div class="collpase-heading">
			                    <span v-if="itemDetials[index].search.expanded"
			                      >Hide Details</span
			                    >
			                    <span v-if="!itemDetials[index].search.expanded"
			                      >Show Details</span
			                    >
			                  </div>
			                </v-expansion-panel-header>
			              </div>
			            </div>
			          </div>

					    <v-expansion-panel-content v-if="trips.engine == 'flight'">
				          <div class="car-listing-tabs-outer">
				            <div class="car-listing-tabs">
				              <template>
				                <v-tabs
				                  v-model="trips.tab"
				                  background-color="primary"
				                  class="tabs-car-ul"
				                >
				                  <v-tab
				                    href="#tab-1"
				                    v-if="
				                      trips.flightDetails != null &&
				                        Array.isArray(trips.flightDetails) == false
				                    "
				                  >
				                    <span>Flight Details</span>
				                  </v-tab>
				                  <v-tab
				                    href="#tab-3"
				                    v-if="
				                      trips.flightDetails != null &&
				                        Array.isArray(trips.flightDetails) == false
				                    "
				                  >
				                    <span>Fare Summary</span>
				                  </v-tab>
				                  <v-tab
				                    href="#tab-5"
				                    v-if="
				                      trips.flightDetails != null &&
				                        Array.isArray(trips.flightDetails) == false
				                    "
				                  >
				                    <span>Fare Rules</span>
				                  </v-tab>
				                  <v-tab
				                    href="#tab-8"
				                    v-if="
				                      trips.booking && Array.isArray(trips.booking) == false
				                    "
				                  >
				                    <span>Booking Details</span>
				                  </v-tab>
				                </v-tabs>

				                <div class="tabs-text-content">
				                  <v-tabs-items v-model="trips.tab">
				                    <v-tab-item
				                      value="tab-1"
				                      v-if="
				                        trips.flightDetails != null &&
				                          Array.isArray(trips.flightDetails) == false
				                      "
				                    >
									
				                      <FlightDetailTab
				                        v-if="trips.flightDetails"
				                        :details="trips.flightDetails"
				                      />
				                    </v-tab-item>

				                    <v-tab-item
				                      value="tab-3"
				                      v-if="
				                        trips.flightDetails != null &&
				                          Array.isArray(trips.flightDetails) == false
				                      "
				                    >
				                      <FareSummaryTab
				                        v-if="trips.flightDetails"
				                        :details="trips.flightDetails.fareDetails"
				                      />
				                    </v-tab-item>

				                    <v-tab-item value="tab-5">
				                      <FareDisclamierTab
				                        v-if="trips.flightDetails"
				                        :details="trips.flightDetails.fareRules"
										:flight="trips"
				                      />
				                    </v-tab-item>

				                    <v-tab-item
				                      value="tab-8"
				                      v-if="
				                        trips.booking && Array.isArray(trips.booking) == false
				                      "
				                    >
				                      <div class="acord-body">
				                        <!--TABLE TO DISPLAY HERE-->

				                        <v-simple-table>
				                          <template v-slot:default>
				                            <tbody>
				                              <tr>
				                                <td>Booking Number:</td>
				                                <td>
				                                  {{ trips.booking.bookingId }}
				                                </td>
				                              </tr>

				                              <tr>
				                                <td>Flight Frequent Flyer:</td>
				                                <td>
				                                  {{
				                                    getObjectValue(
				                                      trips.flightDetails.frequentFlyer
				                                    )
				                                  }}
				                                </td>
				                              </tr>

				                              <!--
				                              <tr v-if="typeof item.dropLoc">
				                                <td>Departure Location:</td>
				                                <td>{{ item.pickLoc }}</td>
				                              </tr>
				                              
				                                                          <tr>
				                                                              <td>Arrival Location:</td>
				                                                              <td>{{ item.dropLoc }}</td>
				                                                          </tr>
				                                                          -->
				                              <tr>
				                                <td>Ticket Status:</td>
				                                <td>
				                                  {{ trips.booking.ticketStatus }}
				                                </td>
				                              </tr>

				                              <tr v-if="typeof trips.booking
				                                        .passengers!='undefined'">
				                                <td>Passengers:</td>
				                                <td>
				                                  <table>
				                                    <tr
				                                      v-for="(psngr, index) in trips.booking
				                                        .passengers"
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
				                    </v-tab-item>
				                  </v-tabs-items>
				                </div>
								
				              </template>
				            </div>

				            <div class="car-listing-tabs" v-if="trips.flightDetails == null">
				              <div class="tabs-text-content">
				                <p>
				                  We have not received the details needed from our supplier to
				                  book this flight. Please select another flight.
				                </p>
				              </div>
				            </div>
				          </div>
				        </v-expansion-panel-content>

	        		</div><!--Single List Repeat-->

	        	  </v-expansion-panel>

	    	  </v-expansion-panels>

	    	</div><!--flight box-->
		<v-row v-if="domain=='uk'  && !onlineMode">
		<v-col cols="6">
			  <a
                       
                          style="margin-left: 20px;"
                          role="button"
                          @click="termsAndConditionPopup = true"
                        >
                          Terms & Conditions
                        </a>
			</v-col>
		<v-col cols="6">
		 <div class="setmargin pl-2">
			    <span style="font-size:12px; font-weight: 500;">
					AGENT NAME: {{ agentName }}
				</span>
				<br>
				<span style="font-size:12px; font-weight: 500;">
					AGENT PIN: {{ agentID }}
				</span>
				<p>
                  By signing and returning this document, you agree to the terms and conditions.
                </p>
                <p>
                  I confirm I have read, understood, and accept the booking conditions.
                </p>

                <hr>

                 <!--  <v-form>
                    <v-checkbox
                      value=""
                      :rules="[v => !!v || 'Please check this box to agree..!']"
                      label=""
                    >
                      <template slot="label">
                        <span class="accept-read">
                          I confirm i have read, understood and accept the booking conditions</span
                        >
                        &nbsp;
                                        
                     </template>
                    </v-checkbox>
                  </v-form> -->
                </div>

		</v-col>
		</v-row>

		<!--IE-->
		<v-row v-if="domain == 'ie' && !onlineMode">
		<v-col cols="6">
			  <a style="margin-left: 20px;" href="https://www2.inteletravel.com.co/package-holiday-terms-and-conditions" target="_blank">Terms & Conditions</a>      
		</v-col>
		<v-col cols="6">
		 <div class="setmargin pl-2">
			    <span style="font-size:12px; font-weight: 500;">
					AGENT NAME: {{ agentName }}
				</span>
				<br>
				<span style="font-size:12px; font-weight: 500;">
					AGENT PIN: {{ agentID }}
				</span>
				<p>
                  By signing and returning this document, you agree to the terms and conditions.
                </p>
                <p>
                  I confirm I have read, understood, and accept the booking conditions.
                </p>
                <hr>
                </div>

		</v-col>
		</v-row>
                               
                             
    	</div>
		
		<!-- Terms and Conditions Popup -->
    <v-dialog
            v-model="termsAndConditionPopup"
            max-width="1000px"
            style="z-index: 99999!important;"
        >
            <v-card>
                <v-form>
                    <div class="car-popup-header">
                        <div class="in-left">
                            <ul>
                                <li>Terms & Conditions</li>
                            </ul>
                        </div>
                        <div class="in-right">
                            <v-btn icon @click="termsAndConditionPopup=false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </div>
                    </div>
                    <div class="car-popup-body">
                        <div
                            class="car-popup-content"
                            style="min-height: auto;"
                        >
                            <div class="car-popup-button">
                                <div
                                    _ngcontent-tvt-c13=""
                                    class="modal-body"
                                    
                                >
                                
                            
                                   <div style="padding: 12px;">
									<p>Should you need to refer to these again, they are available here.</p>

									<p>Combination of travel services offered to you is a package within the meaning of the Package Travel and Linked Travel Arrangements Regulations 2018.
									Therefore, you will benefit from all UK rights applying to the packages. InteleTravel will be fully responsible for the proper performance of the entire package. Required by law, InteleTravel has protection in place to refund your payments, where transport is included 
									in the package, to ensure your repatriation if it becomes insolvent.</p>

									<p>For information on the Package Travel and Linked Travel Arrangement Regulations 2018 and your key rights, please click here:</p>
									<p>Key rights under the PTR Regulations 2018</p> 
									<p><a href="https://travelaware.campaign.gov.uk/">https://travelaware.campaign.gov.uk</a></p>
									<p>Travel Advice: For the most up-to-date travel advice, please visit:</p>
									<p><a href="https://www.gov.uk/foreign-travel-advice">https://www.gov.uk/foreign-travel-advice</a></p>

									<p>Many countries update their regulations frequently- please refer to the website for medical and travel information, prior to departure.
									Please ensure you have adequate travel insurance, InteleTravel has preferred travel insurance rates with Journey’s Travel Insurance, please ask your Advisor for further details.</p>
									
									<p>Passenger Names: All names on the booking should match the ones displayed in your passport. Failure to provide this will result in administration charges and could even affect entry into your destination. Remember to ensure your passport is valid.</p>
									<p>Travel Services: These can be subject to change, especially if your holiday is booked well in advance. In compliance with the Package Travel Regulations, we are obliged to inform you of these changes as soon as we receive them. If the changes have a considerable effect on the travel arrangements, customers are legally entitled to a refund or credit without penalty.</p>
									<p>Advance Passenger Information: The UK Government requires that we collect your passport details for security purposes, prior to travel. This should be submitted when your holiday is confirmed or no later than 3 months before departure.</p>
									<p>Specific mandatory requirements by the holiday provider will be sent to you prior to departure. Each supplier will differ for this information so please check carefully.</p>
									
									<p>Financial Protection: InteleTravel has insolvency protection in place with CAA for flight-based packages and ABTA for nonflight packages. You can contact these organizations at:</p>
									<p><a href="https://www.caa.co.uk/">https://www.caa.co.uk</a></p>

									<p>Special Assistance: If you have special requirements or need assistance, please provide the information in advance of confirming your booking, we will try to accommodate your request. Any requests will be visible on your confirmation document.</p>
									
									<p>Sometimes there are charges associated with the request and your advisor will inform you of these prior to confirming your booking.</p>
									
									<p>Emergency Information: In the case of an emergency, the details of the travel service provider will be visible on the documentation.</p>
									
									<p>Please remember to always have your travel insurance information with you.</p>

                            </div>
                        
                                </div>


                            </div>
                        </div>
                    </div>
                </v-form>
            </v-card>
        </v-dialog>
		  <!--End Terms and Condition popup-->
		<p class="noAvailability" v-show="tripBookingOfQuote.length==0 && isLoading==false">
			No items available to quote.
		</p>

		<p class="noAvailability" v-show="isLoading">
			Please wait loading data...
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
import hotelServices from '@/services/api/Hotel';

import HotelRoom from '@/components/front/hotels/HotelRoom';
import VillaRoom from "@/components/common/widgets/VillaRoom.vue";

export default {

	name: 'QuoteTab',

	components: {
	    StarRating,
	    ExtraAvailableTab,
	    TripSummaryTab,
	    PackageDetailsTab,
	    CancellationPoliciesTab,

	    FlightDetailTab,
	    FareSummaryTab,
	    FareDisclamierTab,
	    Slider,

	    HotelRoom,
	    VillaRoom
	},

	data() {

		return {
		 termsAndConditionPopup:false,
		  hasCarTrip: false,
		  hasFlightTrip: false,
		  url:"",
		  widgetLink: "",
		  hasHotelTrip: false,
		  currentDomain :process.env.VUE_APP_DOMAIN,
		  hasVillaTrip: false,
		  hasActivityTrip: false,
		  tripBookingOfQuote: [],
		  itemDetials: [],
		  searchData: [],
		  isLoading: false,
		  packages: [],
		  slides: [],
		  totalNights: 0,
		
		  cCodes: countryCodes,
		  tripName: '',
		  dialog: false,
		  agentName: '',
		  agentID: ''
	
		 }

	},

	props: [
		'fType',
		'transformToCode',
		'setNightCount',
		'removeTrip',
		'tripId',
		'onlineMode',
		'tripDisplayName',
        'personCount'
	],

	mounted() {
		this.isLoading = true;
		if(this.$route.name=='trip-quote'){
		this.getQuoteOfTrip(this.tripId);
		}
		if(this.$route.name!='trip-quote'){
		this.getQuoteTripLink(this.tripId);
		}
		console.log('Item Details', this.tripBookingOfQuote);

	},

	computed: {
        ...mapState({
			countryDF: state=>state.envStore.countryDF,
			domain: state =>state.envStore.domain,
			CSymbol: state => state.envStore.CSymbol,
			userType: state=>state.authStore.userType
		}),

		activeDomain() {
		  return this.$store.state.envStore.domain;
		}

	},

	methods: {
		 compDistanceUnit() {
          if(this.domain == 'com'){
          return this.distanceUnit = 'Miles';
          } else if(this.domain == 'uk' || this.domain == 'ie') {
          return this.distanceUnit = 'Kilometer';
         }
       },
        fixPathOfImage(path) {

            if(path.indexOf("square60") >= 0)
                return path.replace("square60", "square810");

            return path;
        },
		copy(e){
            this.code = e.target.value;
            this.cStype = 'text';
            let copyText = document.querySelector('#inpudID');
            copyText.select();
            document.execCommand("copy");
		},

		updateTripExtra(){
			let that = this;
			let reqHeaders = {headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authStore.token }};
            var reqDataForm = {tripId : this.tripId, tripExtra: this.widgetLink};
			
			tripServices.updateTripExtra(reqDataForm, reqHeaders).then(res =>{
			     if(res.data.success){
					that.$awn.info(res.data.message)
				}
		
			})
			.catch((err) =>{
				let error_array = Object.keys(err.data.errors);
				let is_array_of_errors =  Array.isArray(error_array);
				if(is_array_of_errors){
					let key_of_error = error_array.pop();
					let message = err.data.errors[key_of_error];
					that.$awn.alert(message.pop())
				}
			})

		},

		copyWidgetLink(e){
            this.code = e.target.value;
            this.cStype = 'text';
            let copyText = document.querySelector('#widgetInputID');
            copyText.select();
            document.execCommand("copy");
			this.updateTripExtra();

		},

	
		
		getCurrentDomain(){
           let availableDomains =[{domain: 'us', value: '.com'},
		   {domain: 'uk', value: '.uk'}, {domain: 'mx', value:'.mx'}, {domain: 'ie', value: '.com.co'}];
		   const founded = availableDomains.find(element => element.domain === this.domain);
		   return founded.value;
		},

		getQuoteTripLink(tripId){ 
			let reqHeaders = {headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.authStore.token }};
            var reqDataForm = {tripId : tripId};

            tripServices.getQuoteOfTripLink(reqDataForm,reqHeaders).then(res=>{
            
            let quoteUrl  = (process.env.VUE_APP_BASE_URL ? process.env.VUE_APP_BASE_URL: 'localhost:8090');
            let hash=res.data.data.hash;
            this.url=quoteUrl+"/quote/"+hash;
			this.getQuoteOfTrip(hash);
       
            })
       
		},
		generateTripQuote() {

			this.$router.push({
				name: 'trip-quote',
				params: { id: this.tripId }
			});		
		},

		getQuoteOfTrip(tripId) {

            let reqHeaders = {headers: { 'Content-Type': 'application/json' }};
            
          

        		var reqDataForm = {hash : tripId};
        	

            tripServices.getQuoteOfTrip(reqDataForm, reqHeaders).then(rsp => {

            	this.isLoading = false;

                if (rsp.data.success == false && rsp.data.message == 'Token has expired') {

                    this.doPopLogout();
                    return true;
                } else {
                	
                	if(this.onlineMode==false){

                		evBus.$emit('offlineTripQuoteDetails', rsp.data.data);
                		this.tripName = rsp.data.data.tripName;
                	}

                    this.tripName = rsp.data.data.tripName;
                	this.makeTripDisplay(rsp.data.data.tripbookings);
                }

				  this.agentName = rsp.data.data.agentName;
				  this.agentID = rsp.data.data.agentPIN;

	
            
            }).catch(error => {
                    
                if (error.response) {

                    this.$awn.alert(
                        'Please try later, server encounter error..!'
                    );
                }

            }).finally(() => {
                // do some thing here
            });

		},

		makeTripDisplay(tripBookings) {

		  let _myBookings = tripBookings;
		  let tripBookingInQuote = [];

		  _myBookings.forEach((bookItem, index) => {

		  	let tripObj = bookItem;

		  	tripObj.item = JSON.parse(bookItem.details);
		  	tripObj.expanded = false;

	        if (bookItem.engine == 'car') {

	          	this.hasCarTrip = true;
	        }

	        if (bookItem.engine == 'flight') {

	          	this.hasFlightTrip = true;
	        }

	        if (bookItem.engine == 'hotel') {
	        	
	        	this.hasHotelTrip = true;
	        }

			if(bookItem.engine == 'activity'){
				this.hasActivityTrip = true;
			}

	        if (bookItem.engine == 'villa') {
	        	
	        	this.hasVillaTrip = true;
	       

                let persons = tripObj.item.searchData.rooms;
                let totalAdults = 0;
                let totalChilds = 0;

                for(let i=0; i<persons.length; i++) {
                     
                     totalAdults += Number(persons[i].adults);
                     totalChilds += persons[i].childs.length;
                }

                tripObj.basicVillaInfoDisplay = false;
                tripObj.rooms = this.findBookedRoomsInVilla(tripObj.villaDetails.blockData, tripObj.villaDetails.villaData.rooms, tripObj);
                tripObj.totalAdults = totalAdults;
                tripObj.totalChilds = totalChilds;
				tripObj.totalNights = this.getTotalDaysInDates(tripObj.item.searchData.checkinDate, tripObj.item.searchData.checkoutDate);

			      let villaBookingDetails = tripObj.item.villaDetails;

			      for(let k=0; k<tripObj.rooms.length; k++) {
			        
			        for(let i=0; i<villaBookingDetails.length; i++) {

			            for(let j=0; j<villaBookingDetails[i].block_ids.length;j++) {

			                if(tripObj.rooms[k].block_id==villaBookingDetails[i].block_ids[j]) {

			                    tripObj.rooms[k].totalIncrementalPrice = parseFloat(villaBookingDetails[i].incrementalPrice[j]) * parseFloat(villaBookingDetails[i].block_quantities[j]);
			                    tripObj.rooms[k].block_quantities = Number(villaBookingDetails[i].block_quantities[j]);
			                }

			            }

			        }

	        	}
        	}
	        	tripBookingInQuote.push(tripObj);
		  
		  });

			this.itemDetials = tripBookings.map(item => {			
	
		        return {
		          search: JSON.parse(item.details).engineDetails
		        };
			});

			this.searchData = tripBookings.map(item => {
				return {
				  searchRecord: JSON.parse(item.details).searchData
				};
			});


		  	this.tripBookingOfQuote = tripBookingInQuote;
			
		
		},

        viewHotel(reqItem, index,expand) {
		
        	this.packages = [];

        	this.slides = [];

        	this.totalNights = 0;

			// if(!expand)
        	// 	return false;

            this.packages.push(reqItem.hotelDetails.package);

    		this.totalNights = this.setNightCount(JSON.parse(reqItem.details).searchData); 
        	
        },

	    findBookedRoomsInVilla(content, sfindables, tripObj) {

	        let findables = sfindables.map(i=>i.block_id);
	        let bookedRooms = [];
	        let allRoomsOfBlock = content.rooms;

	        for(let index in allRoomsOfBlock) {

	            let room = allRoomsOfBlock[index];

	            if(findables.includes(room.block_id)) {


	            	room.pdate = tripObj.item.searchData.checkinDate;
	            	room.ddate = tripObj.item.searchData.checkoutDate;
	              	bookedRooms.push(room);
	            }

	        };
	        
	        return bookedRooms;
	    }

	},

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

<style lang="scss" scoped>
.hotel-product-specs ul li img {
    margin: 1px 8px 0 0;
    float: left;
    height: 27px;
}
</style>
