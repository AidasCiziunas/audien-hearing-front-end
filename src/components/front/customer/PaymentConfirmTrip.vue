<template>
    <div class="confirmation-trip-page">
        <v-container>
            <div class="booking-container">
                
                <div class="confirmation-header" v-if="bookedDetails.bookVia == 'trip'">
                    <div class="in-left">
                       
                        <h3>
                            Confirmation for - {{ bookedDetails.tripName.split('-')[0] }}
                            
                            {{ getCountryDFOnly(bookedDetails.tripName.split('-').pop())}} Trip
                        </h3>
                       
                    </div>
                    <div class="in-right">
                        <p>
                            Total Trip Amount: 
                            {{ currencySymbol}}{{ TotalAmount }} 
                            <br />
                            Trip ID: {{ bookedDetails.tripId }}
                        </p>
                    </div>
                </div>
                <div v-if="(domain == 'uk' || domain == 'ie') && bookedDetails.bookVia == 'trip' && typeof tripBooking[tripBooking.length-1].atol != 'undefined'">
                    <div class="confirmation-header mt-5" style="background:#fff;" 
                                v-if="tripBooking[tripBooking.length-1].atol==true">
                        <div class="in-left">
                            <p  >
                                
                                <img :src="(domain == 'uk' ? require('@/assets/images/atol-warning.jpg').default: domain == 'ie'?  require('@/assets/images/topps.jpg').default: '')" style="width:60px; height:30px;"/>
                                      
                                {{tripBooking[tripBooking.length-1].atolMessage}}
                            </p>
                        </div>               
                    </div>  
                </div>  
                <div class="thankYou-content" v-show="displayIfBooked">
                    
                    <div class="in-left">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    
                    <div class="in-right" v-if="bookedDetails.bookVia == 'trip'">
                        
                        <h5>
                            Thank you. Your booking is confirmed.
                        </h5>
                        <p>
                            A confirmation email has been sent to your provided email address.
                        </p>
                    </div>

                    <div class="in-right" v-if="bookedDetails.bookVia != 'trip'">
                        <h5> 
                            <b>Thank you.</b> Your booking is confirmed.
                        </h5>
                    </div>
                
                </div>
                
                
                <div class="confirmation-body">
                    
                    <div class="left-corner"></div>
                    
                    <div class="right-corner"></div>
                        <div class="accordian-content">
                            <v-expansion-panels v-model="panel" multiple>
                                <v-expansion-panel v-for="(item, index) in bookedDetails.bookItems">
                                    <v-expansion-panel-header>
                                        
                                        <div class="acord-head" v-if="item.engine=='car'">

                                            <h3 v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">

                                                <i class="fas fa-car" style="margin-right: 15px;"></i>
                                                Car Booking Fee: {{ currencySymbol}}{{ item.bookingData.data.carData.totalPrice }}
                                            
                                            </h3>

                                            <h3 v-if="typeof item.bookingData == 'undefined' || !item.bookingData.success">
                                                <i class="fas fa-car" style="margin-right: 15px;"></i>
                                                Car Booking Error
                                            </h3>
                                        </div>

                                        <div class="acord-head" v-if="item.engine=='flight'">

                                            <h3 v-if="typeof item.bookingData != 'undefined'">

                                                <span v-if="item.bookingData.success==false">

                                                    <i class="fas fa-plane" style="margin-right: 15px;"></i>

                                                     Flight Booking Error

                                                </span>

                                                <span v-if="typeof item.bookingData.data!='undefined'  && item.bookingData.success==true">

                                                    <span v-if="typeof item.bookingData.data.flightData!='undefined'">
                                                    
                                                        <i class="fas fa-plane" style="margin-right: 15px;"></i>
                                                    
                                                        Flight Booking Fee: {{ currencySymbol}}{{item.bookingData.data.flightData.price }}

                                                    </span>
                                                          <span  v-if="domain == 'uk'  && item.bookingData.data.atol!=''">
                                                            <img :src="require('@/assets/images/atol-warning.jpg').default" style="float:right; width:45px; height:40px;
                                                            position: relative; left:5px; top:10px;" title="ATOL certificate required when purchased within 24 hours of a flight booking."
                                                            alt="ATOL certificate required when purchased within 24 hours of a flight booking.">
                                                          </span>
                                                          <span  v-if="domain =='ie' && item.bookingData.data.atol!=''">
                                                            <img :src="require('@/assets/images/topps.jpg').default" style="float:right; width:60px; height:30px;
                                                            position: relative; left:5px; top:10px;" title="TOPPS certificate required when purchased within 24 hours of a flight booking."
                                                            alt="TOPPS certificate required when purchased within 24 hours of a flight booking.">
                                                          </span>
                                                </span>

                                            </h3>

                                            <h3 v-if="typeof item.bookingData == 'undefined'">

                                                <i class="fas fa-plane" style="margin-right: 15px;"></i>
                                                
                                                Flight Booking Error

                                            </h3>

                                        </div>

                                        <div class="acord-head" v-if="item.engine=='hotel'">

                                            <h3 v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">

                                                <span>
                                                    <i class="fas fa-hotel"></i>
                                                </span>

                                                &nbsp;
                                          
                                                Hotel Booking Fee: {{ currencySymbol}}{{ item.bookingData.data.totalPrice }}
                                                   <span  v-if="domain == 'uk'  && item.bookingData.data.hotelData.hotelDetails.packages[0].rooms[0].isMor =='true'">
                                                            <img :src="require('@/assets/images/atol-warning.jpg').default" style="float:right; width:45px; height:40px;
                                                            position: relative; left:5px;" title="ATOL certificate required when purchased within 24 hours of a flight booking."
                                                            alt="ATOL certificate required when purchased within 24 hours of a flight booking.">
                                                          </span>
                                                          <span  v-if="domain == 'ie' && item.bookingData.data.hotelData.hotelDetails.packages[0].rooms[0].isMor =='true'">
                                                            <img :src="require('@/assets/images/topps.jpg').default" style="float:right; width:60px; height:30px;
                                                            position: relative; left:5px;" title="TOPPS certificate required when purchased within 24 hours of a flight booking."
                                                            alt="TOPPS certificate required when purchased within 24 hours of a flight booking.">
                                                          </span>
                                            </h3>

                                            <h3 v-if="typeof item.bookingData == 'undefined' || !item.bookingData.success">

                                                <span>
                                                    <i class="fas fa-hotel"></i>
                                                </span>

                                                &nbsp;
                                                
                                                Hotel Booking Error

                                            </h3>

                                        </div>

                                        <div class="acord-head" v-if="item.engine=='villa'">

                                            <h3 v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">

                                                <span>
                                                    <i class="fa-umbrella-beach"></i>
                                                </span>

                                                &nbsp;
                                                
                                                Villa Booking Fee: {{ currencySymbol}}{{ item.bookingData.data.totalPrice }}
                                            </h3>

                                            <h3 v-if="typeof item.bookingData == 'undefined' || !item.bookingData.success">

                                                <span>
                                                    <i class="fa-umbrella-beach"></i>
                                                </span>

                                                &nbsp;
                                                
                                                Villa Booking Error
                                            </h3>

                                        </div>

                                        <div class="acord-head" v-if="item.engine=='activity'">

                                            <h3 v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">

                                                <i class="fas fa-tasks" style="margin-right: 15px;"></i>
                                                Activity Booking Fee: {{ currencySymbol}}{{ item.bookingData.data.booking.totalPrice.FinalPrice }}
                                            
                                            </h3>

                                            <h3 v-if="typeof item.bookingData == 'undefined' || !item.bookingData.success">
                                                <i class="fas fa-tasks" style="margin-right: 15px;"></i>
                                                Activity Booking Error
                                            </h3>
                                        </div>

                                    </v-expansion-panel-header>

                                    <v-expansion-panel-content>
                                        
                                        <!--for cars-->
                                        <div v-if="item.engine=='car'">
                                            
                                            <!--static car table start-->

                                                <div class="confirm-msg" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success"> 
                                                    <h2>Booking Details</h2>
                                                </div>

                                            <!--static car table end-->
                                            <div  class="confirm-msg pl-4" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">
                                                <i class="fas fa-info-circle"></i>
                                                <p>A confirmation email has been sent to your provided email address.</p>
                                            </div>

                                            <!--static car table end-->
                                            <div  class="confirm-msg pl-4" v-if="typeof item.bookingData == 'undefined' ||  !item.bookingData.success">
                                            
                                                <i class="fas fa-info-circle"></i>

                                                <div v-if="typeof item.bookingData.errors!='undefined'">

                                                    <p style="color: #F00;" 
                                                    v-for="(error, index) in item.bookingData.errors" v-bind:key="index">
                                                        
                                                        <span v-if="typeof error.message != 'undefined'">
                                                            {{ error.message }}
                                                        </span>

                                                        <span v-if="typeof error.ErrorText != 'undefined'">
                                                            {{ error.ErrorText }}
                                                        </span>
                                                        
                                                    </p>

                                                </div>

                                                <div v-else>

                                                    <p style="color: #F00;">
                                                        Please contact customer support. Log Id ( {{ item.sessionId }} )
                                                    </p>
                                                
                                                </div>

                                            </div>

                                            <div class="acord-body">

                                                <v-simple-table v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">
                                                    <template v-slot:default> 
                                                        <tbody>
                                                        
                                                    <tr> 
                                                        <td>Booking ID/Confirmation #:</td>
                                                        <td>
                                                            {{
                                                                item.bookingData.data.booking.bookingId
                                                            }}
                                                        </td>
                                                    </tr>
                                                    <tr v-if="item.bookingData.data.booking.bookingReference!=''">
                                                        <td>Booking Reference Id:</td>
                                                        <td>
                                                            {{
                                                                item.bookingData.data.booking.bookingReference
                                                            }}
                                                        </td>
                                                    </tr>
                                                    <!--
                                                    
                                                    -->
                                                    <tr>
                                                        <td>Primary Guests Name(s):</td>
                                                        <td>
                                                            {{ 
                                                            item.bookingData.data.passengers[0].firstName+' '+item.bookingData.data.passengers[0].lastName | ucwords 
                                                            }}
                                                        </td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td>Car Rental Company:</td>
                                                        <td>{{ item.bookingData.data.carData.agency }}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Pickup City:</td>
                                                        <td>{{ item.bookingData.data.carData.pickupCity }}</td>
                                                    </tr>
                                                    <!--
                                                    <tr>
                                                        <td>Supplier Order ID:</td>
                                                        <td>
                                                            {{ item.bookingData.data.booking.orderId }}
                                                        </td>
                                                    </tr>
                                                    -->
                                                    <tr>
                                                        <td>Pickup Location:</td>
                                                        <td>
                                                            {{ item.bookingData.data.carData.pickupLocation }}
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Pickup Date:</td>
                                                        <td>{{ makeMedianCapitals(item.bookingData.data.carData.pickupDate) }}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Return City:</td>
                                                        <td>{{ item.bookingData.data.carData.dropoffCity }}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Return Location:</td>
                                                        <td>{{ item.bookingData.data.carData.dropoffLocation }}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Return Date:</td>
                                                        <td>{{ makeMedianCapitals(item.bookingData.data.carData.dropoffDate) }}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Car Type:</td>
                                                        <td>{{ item.bookingData.data.carData.carType }}</td>
                                                    </tr>

                                                    
                                                    <tr>
                                                        <td>Guest Email:</td>
                                                        <td>
                                                            {{
                                                                item.bookingData.data.passengers[0].email
                                                            }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Guest Street/Address:</td>
                                                        <td>
                                                            {{
                                                                item.bookingData.data.passengers[0].address
                                                            }}
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Guest Town/City:</td>
                                                        <td>
                                                            {{
                                                                item.bookingData.data
                                                                    .passengers[0].city
                                                            }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Guest ZIP CODE:</td>
                                                        <td>
                                                            {{
                                                                item.bookingData.data
                                                                    .passengers[0].zip
                                                            }}
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Estimated Total:</td>
                                                        <td>
                                                            {{ currencySymbol }}{{ item.bookingData.data.carData.totalPrice}}
                                                        </td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td>Status: </td>
                                                        <td class="clr-blue">{{item.bookingData.data.booking.status | capitalize}}</td>
                                                    </tr>
                                                    
                                                 <tr>
                                                        <td>
                                                                <a

      style="margin-left: 20px;"
      @click="doCancelPolicyPopUp(item.bookingData.data.carData, item.engine)"
    >
      Cancellation Policy
    </a>
                                                        </td>
                                                    </tr>
                                                   </tbody> 
                                                 </template>
                                              </v-simple-table> 


                                                <div class="acord-buttons mb-5" v-if="typeof item.bookingData=='undefined' || !item.bookingData.success">

                                                    <v-btn color="primary" class="mr-3">
                                                        Not Booked
                                                    </v-btn>
                                                </div>

                                                
                                                <div class="acord-buttons" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">
                                                    <v-btn color="primary">
                                                        Booked
                                                    </v-btn>
                                                </div>
                                                
                                            </div>

                                            <!--
                                            <div class="acord-body" v-if="typeof item.bookingData == 'undefined' || !item.bookingData.success">
                                                <ul>

                                                    <li>
                                                        <h4>Pick-up Location:</h4>
                                                        <p>{{ item.pickLoc }}</p>
                                                    </li>

                                                    <li>
                                                        <h4>Drop-off Location:</h4>
                                                        <p>{{ item.dropLoc }}</p>
                                                    </li>

                                                    <li>
                                                        <v-alert type="error">
                                                            {{ item.bookingData.errors[0].message }}
                                                        </v-alert>
                                                    </li>
                                            
                                                </ul> 
                                            </div>
                                            -->
                                            
                                            <div class="confirm-text-box" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">
                                             <h3>Important</h3>
                                             <p>
                                                Please check directly with car rental agency for 
                                                driver minimum age requirements and for payment requirements. Credit cards are preferred. Debit cards often incur large credit holds.
                                              </p>   
                                            </div>

                                        </div>
                                        <!--for cars-->

<!--

                                            <span v-if="Array.isArray(item.bookingData.data) && item.bookingData.success==false">

                                                 Flight Booking Error

                                            </span>

-->

                                        <!--for flights-->
                                        <div v-if="item.engine=='flight'">

                                            <div class="confirm-msg" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success==true"> 
                                                <h2>Booking Details</h2>
                                            </div>

                                            <div  class="confirm-msg" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success==true">
                                                <i class="fas fa-info-circle ml-4"></i>
                                                <p>A confirmation email has been sent to your provided email address.</p>
                                            </div>

                                            <div class="confirm-msg" v-if="typeof item.bookingData == 'undefined'">

                                                <span v-if="typeof item.errors!='undefined'">

                                                    <i class="fas fa-info-circle"></i>

                                                    <p style="color: #F00;" 
                                                    v-for="(error, index) in item.errors"
                                                    v-bind:key="'A'+index">
                                                     
                                                        <span v-if="typeof item.errors!='undefined'">
                                                            {{ error.ErrorText }}
                                                        </span>

                                                    </p>

                                                </span>

                                                <span v-if="typeof item.errors=='undefined' && typeof item.message!='undefined'">                                                
                                                    <p style="color: #F00;" v-if="typeof item.errors=='undefined'">
                                                        {{ item.message }}
                                                    </p>

                                                </span>
                                            
                                            </div>

                                            <div  class="confirm-msg" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success==false" style="padding: 10px;">

                                                <i class="fas fa-info-circle"></i>

                                                    <p style="color: #F00;" v-if="typeof item.bookingData.message!='undefined' && item.bookingData.errors.length==0">
                                                        {{ item.bookingData.message }}
                                                    </p>

                                                    <p v-else-if="typeof item.bookingData.message!='undefined' && item.bookingData.errors.length > 0">

                                                        <b style="color: #F00;" 
                                                        v-for="(error, index) in item.bookingData.errors"
                                                        v-bind:key="'A'+index">
                                                         
                                                            <span v-if="error.ErrorCode!=''">
                                                                {{ error.ErrorText }} ({{ error.ErrorCode }})
                                                            </span>

                                                            <span v-else>
                                                                {{ error.ErrorText }}
                                                            </span>                                                            
                                                        </b>

                                                    </p>

                                                    <p v-else>
                                                        <b style="color: #F00;">
                                                            Please contact customer support. Log Id ( {{ item.sessionId }} )
                                                        </b>
                                                    </p>
                                            
                                            </div>

                                            <div class="acord-body" v-if="typeof item.bookingData!='undefined' && item.bookingData.success==true">

                                                <v-simple-table>
                                                    
                                                  <template v-slot:default>

                                                    <tbody>

                                                    <tr>
                                                        <td>Booking Number:</td>
                                                        <td>
                                                            {{
                                                               item.bookingData.success ? item.bookingData.data.booking.bookingId : 'N/A'
                                                            }}
                                                        </td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td>Flight Frequent Flyer:</td>
                                                        <td> 
                                                            {{ 
                                                              getObjectValue(item.bookingData.data.flightData.frequentFlyer)
                                                            }}
                                                        </td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td>Departure Location:</td>
                                                        <td>{{ item.pickLoc }}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Arrival Location:</td>
                                                        <td>{{ item.dropLoc }}</td>
                                                    </tr>
                                                    <tr v-if="item.bookingData.data.flightData.itinerary && item.bookingData.data.flightData.itinerary.length>0">
                                                       <td>Details:</td>

                                                        <td >
                                                            <span  class="border-bottom-1" v-for="(flight,index) in item.bookingData.data.flightData.itinerary" :key="'flight'+index">
                                                                <span v-for="(flightsegment,index) in flight.flightSegment" :key="'segment'+index"> 
                                                                    <i style="color:#3d4ed7;" class="fas fa-map-marker-alt"></i>
                                                                    {{flightsegment.flightAirports}} 
                                                                    {{flightsegment.cabinClass}} 
                                                                    {{flightsegment.cabinClassText==''?'':'('+flightsegment.cabinClassText+')'}}
                                                                </span>
                                                                <i  v-if="index==0"  class="fas fa-exchange-alt text-muted" style="color: #777a7f;"></i>
                                                           </span>
                                                        </td>
                                                    </tr> 
                                                    <tr>
                                                        <td>Ticket Status:</td>
                                                        <td>{{ item.bookingData.success?item.bookingData.data.booking.ticketStatus:'N/A' }}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Passengers:</td>
                                                        <td>
                                                            <table>
                                                                <tr v-for="(psngr, psngrIndex) in item.bookingData.data.passengers"
                                                                v-bind:key="psngrIndex">
                                                                    <td>

                                                                    {{ psngr.title+' '+psngr.firstName+' '+psngr.lastName | capitalize}}

                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>

                                                    
                                                    <!--
                                                    <li>
                                                        <ul v-for="(passenger, pasengrIndex) in item.bookingData.data.passengers"
                                                        v-bind:key="pasengrIndex">
                                                            <li>
                                                                <b>
                                                                    Passenger # {{ ++pasengrIndex }}
                                                                </b>
                                                            </li>

                                                            <li>
                                                                <h4>Title:</h4>
                                                                <p>
                                                                    {{ passenger.title | ucwords }}
                                                                </p>
                                                            </li>

                                                            <li>
                                                                <h4>First Name:</h4>
                                                                <p>
                                                                    {{ passenger.firstName | ucwords }}
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <h4>Last Name:</h4>
                                                                <p>
                                                                    {{ passenger.lastName | ucwords }}
                                                                </p>
                                                            </li>
                                                            
                                                            <li>
                                                                <h4>Email:</h4>
                                                                <p>
                                                                    {{
                                                                        passenger.email
                                                                    }}
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <h4>Street/Address:</h4>
                                                                <p>
                                                                    {{
                                                                        passenger.address
                                                                    }}
                                                                </p>
                                                            </li>

                                                            <li>
                                                                <h4>Town/City:</h4>
                                                                <p>
                                                                    {{
                                                                        passenger.city
                                                                    }}
                                                                </p>
                                                            </li>

                                                            <li>
                                                                <h4>ZIP CODE:</h4>
                                                                <p>
                                                                    {{
                                                                        passenger.zip
                                                                    }}
                                                                </p>
                                                            </li>

                                                            <li>
                                                                <h4>Country:</h4>
                                                                <p>
                                                                    {{
                                                                        passenger.country
                                                                    }}
                                                                </p>
                                                            </li>

                                                            <li>
                                                                <h4>Passport Number:</h4>
                                                                <p>
                                                                    {{
                                                                        passenger.passportNo
                                                                    }}
                                                                </p>
                                                            </li>

                                                            <li>
                                                                <h4>Passport Expiry:</h4>
                                                                <p>
                                                                    {{
                                                                        passenger.passportExpiry
                                                                    }}
                                                                </p>
                                                            </li>

                                                            <li>
                                                                <h4>User Type:</h4>
                                                                <p>
                                                                    {{
                                                                        passenger.userType
                                                                    }}
                                                                </p>
                                                            </li>

                                                        </ul>

                                                    </li>
                                                    -->
                                                    
                                                    <tr>
                                                        <td>Status: </td>
                                                        <td class="clr-blue">
                                                            {{ item.bookingData.success ? item.bookingData.data.booking.status : item.bookingData.message  | capitalize}}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                                <a
    
      style="margin-left: 20px;"
      @click="doCancelPolicyPopUp(item.bookingData.data.flightData, item.engine)"
    >
      Cancellation Policy
    </a>
                                                        </td>
                                                    </tr>

                                                    
                                                        </tbody>
                                                    </template>
                                                </v-simple-table> 

                                                <!--
                                                <div>

                                                    <div class="acord-buttons mb-5" v-if="typeof item.bookingData=='undefined'">

                                                        <v-btn color="primary" class="mr-3">
                                                            Not Booked
                                                        </v-btn>
                                                    </div>
                                                
                                                    <div class="acord-buttons" v-if="typeof item.bookingData != 'undefined'">
                                                        <v-btn color="primary">
                                                            Booked
                                                        </v-btn>
                                                    </div>

                                                </div>
                                                -->
                                                
                                            </div>

                                            <div class="acord-body">

                                                <div class="acord-buttons mb-5" v-if="typeof item.bookingData=='undefined' || item.bookingData.success==false">

                                                    <v-btn color="primary" class="mr-3">
                                                        Not Booked
                                                    </v-btn>
                                                </div>
                                            
                                                <div class="acord-buttons" v-if="item.bookingData.success && typeof item.bookingData != 'undefined'">
                                                    <v-btn color="primary">
                                                        Booked
                                                    </v-btn>
                                                </div>

                                            </div>

                                            <div class="confirm-text-box" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success==true && item.bookingData.errors.length==0">
                                             <h3>Important</h3>
                                             <p>
                                                Message for flight
                                                <!--
                                                Please check directly with car rental agency for 
                                                driver minimum age requirements and for payment requirements. Credit cards are preferred. Debit cards often incur large credit holds.
                                                -->
                                              </p>   
                                            </div>

                                            <div class="confirm-text-box" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success==true && item.bookingData.errors.length > 0">
                                             <h3>Important</h3>
                                             <p>

                                                <b style="color: #F00;" 
                                                v-for="(error, index) in item.bookingData.errors"
                                                v-bind:key="'A'+index">
                                                 
                                                    <span v-if="error.ErrorCode!=''">
                                                        {{ error.ErrorText }} ({{ error.ErrorCode }})
                                                    </span>

                                                    <span v-else>
                                                        {{ error.ErrorText }}
                                                    </span>                                                            
                                                </b>

                                              </p>   
                                            </div>

                                        </div>
                                        <!--for flights-->


                                        <!--for hotels-->
                                        <div v-if="item.engine=='hotel'">

                                            <div class="confirm-msg" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success"> 
                                                <h2>Booking Details</h2>
                                            </div>

                                            <div  class="confirm-msg pl-4" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">
                                                <i class="fas fa-info-circle"></i>
                                                <p>A confirmation email has been sent to your provided email address. </p>
                                            </div>

                                            <div  class="confirm-msg pl-4" v-if="typeof item.bookingData == 'undefined' || !item.bookingData.success">

                                                <i class="fas fa-info-circle"></i>
                                                
                                                <div v-if="typeof item.bookingData.errors!='undefined'">
                                                    
                                                    <p 
                                                        style="color: #F00;" 
                                                        v-for="(error, index) in item.bookingData.errors" v-bind:key="index"
                                                    >

                                                        <span v-if="typeof error.message != 'undefined'" style="color: #F00;"> 

                                                            <b v-if="error.message=='Booking cannot be confirmed due to credit card authorization error.'" style="display: block;">
                                                                Your payment could not processed and the booking was not made. Please use card from another bank or select another booking.
                                                            </b>

                                                            <b v-if="typeof error.title != 'undefined'" style="display: block;">
                                                                {{ error.title }}
                                                            </b>

                                                            <b v-if="error.message!='Booking cannot be confirmed due to credit card authorization error.'" style="display: block;">
                                                                {{ error.message }}
                                                            </b>

                                                        </span>

                                                        <span v-if="typeof error.Message != 'undefined'">

                                                            <b v-if="error.Message=='Booking cannot be confirmed due to credit card authorization error.'">
                                                                Your payment could not processed and the booking was not made. Please use card from another bank or select another booking.
                                                            </b>

                                                            <b v-if="typeof error.title != 'undefined'" style="display: block;">
                                                                {{ error.title }}
                                                            </b>

                                                            <b v-if="error.Message!='Booking cannot be confirmed due to credit card authorization error.'" style="display: block;">
                                                                {{ error.Message }}
                                                            </b>

                                                        </span>

                                                        <span v-if="typeof error.ErrorText != 'undefined'">
                                                            {{ error.ErrorText }}
                                                        </span>
                                                        
                                                    </p>

                                                </div>
                                                <div v-else>

                                                    <p style="color: #F00;">
                                                        Please contact customer support. Log Id ( {{ item.sessionId }} )
                                                    </p>
                                                
                                                </div>

                                            </div>

                                            <div class="acord-body" v-if="typeof item.bookingData!='undefined' && item.bookingData.success">

                                                <v-simple-table v-if="item.bookingData.success == true">
                                                    
                                                  <template v-slot:default>

                                                    <tbody>

                                                    <tr>
                                                        <td>Hotel Name:</td>
                                                        <td>{{ item.pickLoc }}</td>
                                                    </tr>

                                                    <tr>
                                                            <td>
                                                                Check-In: 
                                                            </td>
                                                            <td>
                                                                {{ justFormatMyDate(item.bookingData.data.searchData.checkinDate, fullDateFormat()) }}
                                                            </td>
                                                    </tr>

                                                    <tr>
                                                            <td>
                                                                Check-Out: 
                                                            </td>
                                                            <td>
                                                                {{ justFormatMyDate(item.bookingData.data.searchData.checkoutDate, fullDateFormat() ) }}                                    
                                                            </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Hotel Phone:</td>
                                                        <td>
                                                            {{
                                                                item.bookingData.data.hotelData.phone | numberFormat(cCodes, item.bookingData.data.hotelData.hotelData.countryCode)
                                                            }}
                                                            
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Hotel Address:</td>
                                                        <td>{{ item.bookingData.data.hotelData.address }}</td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td>Booking Number:</td>
                                                        <td>
                                                            {{
                                                                item.bookingData.data.booking.bookingId
                                                            }}
                                                        </td>
                                                    </tr>
                                                  
                                                    <tr>

                                                        <td colspan="2">

                                                        <div v-for="(passenger, pasengrIndex) in item.bookingData.data.passengers" style="width: 105%;margin-left: -16px;" v-bind:key="pasengrIndex">
 

                                                            <v-simple-table v-for="(room, roomIndex) in item.bookingData.data.packageData.rooms"  style="padding-top: 10px;padding-bottom: 10px;" v-bind:key="roomIndex">

                                                            <template v-if="passenger.roomId==room.roomId"  v-slot:default>
                                                                
                                                            <tbody>

                                                            <tr style="background: #1e255d; color: #FFF; font-weight: bold;">
                                                                <td style="font-size: 13px !important;">
                                                                    Room Selection {{ ++pasengrIndex }} of 
                                                                    {{ 
                                                                        
                                                                        item.bookingData.data.packageData.rooms.length   
                                                                    }}
                                                                </td>
                                                                <td style="font-size: 13px !important;">
                                                                    Adults: {{ parseInt(room.adults) }} Children: {{ parseInt(room.kidsAges.length) }} 
                                                                </td>
                                                            </tr>
                                                            <!--
                                                            <tr>
                                                                <td>
                                                                    Confirmation Number 
                                                                </td>
                                                                <td>
                                                                    {{ room.roomKey }}
                                                                </td>
                                                            </tr>
                                                            -->

                                                            <tr>
                                                                <td>Record Locator:</td>
                                                                <td>
                                                                    N/A
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>Guest Name:</td>
                                                                <td>
                                                                    {{ passenger.passengerTitle | ucwords }}
                                                                    {{ passenger.firstName | ucwords }} 
                                                                    {{ passenger.lastName | ucwords }}
                                                                </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td>Email:</td>
                                                                <td>
                                                                    {{
                                                                        passenger.email
                                                                    }}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>Street/Address:</td>
                                                                <td>
                                                                    {{
                                                                        passenger.address
                                                                    }}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>Town/City:</td>
                                                                <td>
                                                                    {{
                                                                        passenger.city
                                                                    }}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>ZIP CODE:</td>
                                                                <td>
                                                                    {{
                                                                        passenger.zip
                                                                    }}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>Country:</td>
                                                                <td>
                                                                    {{
                                                                        passenger.country
                                                                    }}
                                                                </td>
                                                            </tr>


                                                            <tr>
                                                                <td>User Type:</td>
                                                                <td>
                                                                    {{
                                                                        passenger.userType
                                                                    }}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>Room Name:</td>
                                                                <td>
                                                                    {{
                                                                        room.roomName
                                                                    }}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>Room Type:</td>
                                                                <td>
                                                                    {{
                                                                        room.roomBasis
                                                                    }}
                                                                </td>
                                                            </tr>

                                                            <tr v-if="Array.isArray(room.roomContent)==false">
                                                                <td>Rate Description:</td>
                                                                <td>
                                                                    
                                                                   
                                                                <p v-if="room.facilities.length>0">
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
                                                                        item.bookingData.data.searchData.totalNights
                                                                    }}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>Room Subtotal:</td>
                                                                <td>
                                                                    {{ currencySymbol }}{{room.price.FinalPrice}}
                                                                </td>
                                                            </tr>


                                                                </tbody>
                                                            </template>
                                                        </v-simple-table>

                                                        </div> <!--Inner UL Ends-->

                                                        </td>
                                                    </tr>


                                                    
                                                    <tr>
                                                        <td>Status: </td>
                                                        <td class="clr-blue">
                                                                {{item.bookingData.data.booking.status | capitalize}}
                                                        </td>
                                                    </tr>

                                                    <!-- <tr v-if="item.bookingData.data.packageData.tag!='' && domain=='uk'" >

                                                        <td style="text-align: right;" colspan="2">

                                                            <div class="atol-center" >
                                                            
                                                            <img :src="require('@/assets/images/atol-warning.jpg').default" style="max-width: 65px; max-height: 90px; margin-right: 100px;"/>
                                                            
                                                            ATOL certificate required when purchased within 24 hours of a flight booking.

                                                            </div>

                                                        </td>

                                                    </tr> -->

                                                    <tr>
                                                        <td style="text-align: left;">
                                                                <a

                                                                      style="margin-left: 20px;"
                                                                      @click="doCancelPolicyPopUp(item.bookingData.data.packageData, item.engine)"
                                                                    >
                                                                      Cancellation Policy
                                                                </a>
                                                        </td>

                                                    </tr>
                                            

                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                                
                                            </div>

                                            <div class="acord-body">

                                                <div class="acord-buttons mb-5" v-if="typeof item.bookingData=='undefined' || !item.bookingData.success">

                                                    <v-btn color="primary" class="mr-3">
                                                        Not Booked
                                                    </v-btn>
                                                </div>
                                            
                                                <div class="acord-buttons" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">
                                                    <v-btn color="primary">
                                                        Booked
                                                    </v-btn>
                                                </div>

                                            </div>


                                            <div class="confirm-text-box" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">
                                             <h3>Important</h3>
                                             <p>

                                                The rate above is based on single/double occupancy. Extra charges for additional person(s) in room may apply. Nightly rates may change for the duration of stay.
    
                                                <!--
                                                Please check directly with car rental agency for 
                                                driver minimum age requirements and for payment requirements. Credit cards are preferred. Debit cards often incur large credit holds.
                                                -->
                                              </p>   
                                            </div>

                                        </div>
                                        <!--for Hotels-->

                                        <!--for villas-->
                                        <div v-if="item.engine=='villa'">


                                            <!--static car table start-->

                                            <div class="confirm-msg" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success"> 
                                                <h2>Booking Details</h2>
                                            </div>

                                            <!--static car table end-->
                                            <div  class="confirm-msg pl-4" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">
                                                <i class="fas fa-info-circle"></i>
                                                <p>A confirmation email has been sent to your provided email address.</p>
                                            </div>

                                            <!--static car table end-->
                                            <div  class="confirm-msg pl-4" v-if="typeof item.bookingData == 'undefined' ||  !item.bookingData.success">

                                                <i class="fas fa-info-circle"></i>

                                                <div v-if="typeof item.bookingData.errors != 'undefined'">
                                                    
                                                    <p style="color: #F00;" 
                                                    v-for="(error, index) in item.bookingData.errors" v-bind:key="index">
                                                        {{ error.message }}
                                                    </p>

                                                </div>

                                                <div v-else>

                                                    <p style="color: #F00;">
                                                        Please contact customer support. Log Id ( {{ item.sessionId }} )
                                                    </p>
                                                
                                                </div>

                                            </div>


                                            <div class="acord-body" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">


                                                <v-simple-table v-if="item.bookingData.success == true">
                                                    
                                                  <template v-slot:default>

                                                        <tbody>

                                                    <tr>
                                                        <td>Villa Name:</td>
                                                        <td>{{ item.bookingData.data.VillaData.displayName }}</td>
                                                    </tr>
                                                    <tr>
                                                            <td>Check In Date:</td> 
                                                            <td>{{ justFormatMyDate(item.bookingData.data.searchData.checkinDate, fullDateFormat()) }}</td>
                                                    </tr>
                                                    <tr>
                                                            <td>Check Out Date:</td> 
                                                            <td>{{ justFormatMyDate(item.bookingData.data.searchData.checkoutDate, fullDateFormat()) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Villa Phone:</td>
                                                        <td>{{item.bookingData.data.booking.hotel_contact_info}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Villa Address:</td>
                                                        <td>{{ item.bookingData.data.VillaData.address }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Reservation ID:</td>
                                                        <td>
                                                        {{ item.bookingData.data.booking.reservationId }}
                                                        </td>
                                                    </tr>
                                                    <tr v-if="item.bookingData.data.booking.pincode!=''">
                                                        <td>PIN Code:</td>
                                                        <td>{{ item.bookingData.data.booking.pincode }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Primary Guests Name(s):</td>
                                                        <td>
                                                            {{ 
                                                            item.bookingData.data.passengers[0].customerNamePrefix+' '+
                                                            item.bookingData.data.passengers[0].customerGivenName+' '+item.bookingData.data.passengers[0].customerSurname | ucwords 
                                                            }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Guest Email:</td>
                                                        <td>
                                                            {{
                                                                item.bookingData.data.passengers[0].email
                                                            }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Guest Street/Address:</td>
                                                        <td>
                                                            {{
                                                                item.bookingData.data.passengers[0].address
                                                            }}
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Guest Town/City:</td>
                                                        <td>
                                                            {{
                                                                item.bookingData.data
                                                                    .passengers[0].city
                                                            }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Guest ZIP CODE:</td>
                                                        <td>
                                                            {{
                                                                item.bookingData.data
                                                                    .passengers[0].zip
                                                            }}
                                                        </td>
                                                    </tr>



                                                    <tr>
                                                        <td>Estimated Total:</td>
                                                        <td>
                                                            {{ currencySymbol }}{{ item.bookingData.data.booking.totalPrice}}
                                                        </td>
                                                    </tr>
                                                    <!--
                                                    <tr>
                                                        <td>Status: </td>
                                                        <td class="clr-blue">
                                                            {{item.bookingData.data.booking.status | capitalize}}
                                                        </td>
                                                    </tr>
                                                    -->
                                                    <tr>
                                                        <td>
                                                        <a
                                                          style="margin-left: 20px;"
                                                          @click="doCancelPolicyPopUp(getVillaBookedRooms(item.bookingData.data.blockData, item.bookingData.data.roomIds), item.engine)"
                                                        >
                                                          Cancellation Policy
                                                        </a>
                                                        </td>
                                                    </tr>

                                                        </tbody>
                                                    </template>
                                                
                                                </v-simple-table>


                                                <div class="acord-buttons" v-if="typeof item.bookingData=='undefined' || !item.bookingData.success">

                                                    <v-btn color="primary">
                                                        Not Booked
                                                    </v-btn>
                                                </div>
                                                
                                                <div class="acord-buttons" v-if="typeof item.bookingData!='undefined' && item.bookingData.success">
                                                    <v-btn color="primary">
                                                        Booked
                                                    </v-btn>
                                                </div>                                                
                                            </div>


                                            <div class="confirm-text-box" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">
                                             <h3>Important</h3>
                                             <p>
                                                Message for Villa
                                              </p>   
                                            </div>

                                        </div>
                                        <!--for villas-->


                                        <!--for activity-->
                                        <div v-if="item.engine=='activity'">


                                            <!--static car table start-->

                                            <div class="confirm-msg" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success"> 
                                                <h2>Booking Details</h2>
                                            </div>

                                            <!--static car table end-->
                                            <div  class="confirm-msg pl-4" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">
                                                <i class="fas fa-info-circle"></i>
                                                <p>A confirmation email has been sent to your provided email address.</p>
                                            </div>

                                            <!--static car table end-->
                                            <div  class="confirm-msg pl-4" v-if="typeof item.bookingData == 'undefined' ||  !item.bookingData.success">
                                                <i class="fas fa-info-circle"></i>
                                                <p style="color: #F00;" 
                                                v-for="(error, index) in item.bookingData.errors" v-bind:key="index">
                                                    {{ error.message }}
                                                </p>
                                            </div>


                                            <div class="acord-body" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">

                                                <v-simple-table v-if="item.bookingData.success == true">
                                                    
                                                  <template v-slot:default>

                                                        <tbody>

                                                    <tr>
                                                        <td>Activity Name:</td>
                                                        <td>{{ item.bookingData.data.activityData.displayName }}</td>
                                                    </tr>
                                                    <tr>
                                                            <td>Check In Date:</td> 
                                                            <td>{{ getDateInFormat(item.bookingData.data.searchData.fromDate, 'ddd, MMM Do, YYYY') }}</td>
                                                    </tr>
                                                    <tr>
                                                            <td>Check Out Date:</td> 
                                                            <td>{{ getDateInFormat(item.bookingData.data.searchData.toDate, 'ddd, MMM Do, YYYY') }}</td>
                                                    </tr>
                                                    <tr v-if="item.bookingData.data.booking.bookingId!=''">
                                                        <td>Booking ID:</td>
                                                        <td>
                                                        {{ item.bookingData.data.booking.bookingId }}
                                                        </td>
                                                    </tr>
                                                    <tr v-if="item.bookingData.data.booking.bookingReference!=''">
                                                        <td>Booking Reference:</td>
                                                        <td>{{ item.bookingData.data.booking.bookingReference }}</td>
                                                    </tr>
                                                   

                                                    <tr v-if="item.bookingData.data.passengers.length">

                                                        <td colspan="2">

                                                        <div v-for="(passenger, pasengrIndex) in item.bookingData.data.passengers" style="width: 105%;margin-left: -16px;" v-bind:key="pasengrIndex">

                                                            <v-simple-table>
                                                                <template v-slot:default> 
                                                                    <tbody>

                                                                    <tr style="background: #1e255d; color: #FFF; font-weight: bold;">
                                                                        <td style="font-size: 13px !important;">
                                                                            Passenger # {{ ++pasengrIndex }}
                                                                        </td>
                                                                        <td style="font-size: 13px !important;">
                                                                            &nbsp;
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td>Guest Name(s):</td>
                                                                        <td>
                                                                            {{ 
                                                                            passenger.customerNamePrefix+' '+
                                                                            passenger.customerGivenName+' '+passenger.customerSurname | ucwords 
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Guest Email:</td>
                                                                        <td>
                                                                            {{
                                                                                passenger.email
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Guest Phone Number:</td>
                                                                        <td>
                                                                            {{
                                                                                passenger.phoneNumber
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Guest Age:</td>
                                                                        <td>
                                                                            {{
                                                                                passenger.age
                                                                            }} Years
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Guest Country:</td>
                                                                        <td>
                                                                            {{
                                                                                passenger.country
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Guest Town/City:</td>
                                                                        <td>
                                                                            {{
                                                                                passenger.city
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Guest ZIP CODE:</td>
                                                                        <td>
                                                                            {{
                                                                                passenger.zip
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Guest Street/Address:</td>
                                                                        <td>
                                                                            {{
                                                                                passenger.address
                                                                            }}
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </template>
                                                            </v-simple-table>
                                                        </div>

                                                        </td>

                                                    </tr>


                                                    <tr>
                                                        <td>Estimated Total:</td>
                                                        <td>
                                                            {{ currencySymbol }}{{ item.bookingData.data.totalPrice}}
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                        <a
                                                          style="margin-left: 20px;"
                                                          @click="doCancelPolicyPopUp([item.bookingData.data.packageData], 'activity')"
                                                        >

                                                          Cancellation Policy
                                                        </a>
                                                        </td>
                                                    </tr>

                                                        </tbody>
                                                    </template>
                                                
                                                </v-simple-table>


                                                <div class="acord-buttons" v-if="typeof item.bookingData=='undefined' || !item.bookingData.success">

                                                    <v-btn color="primary">
                                                        Not Booked
                                                    </v-btn>
                                                </div>
                                                
                                                <div class="acord-buttons" v-if="typeof item.bookingData!='undefined' && item.bookingData.success">
                                                    <v-btn color="primary">
                                                        Booked
                                                    </v-btn>
                                                </div>                                                
                                            </div>


                                            <div class="confirm-text-box" v-if="typeof item.bookingData != 'undefined' && item.bookingData.success">
                                             <h3>Important</h3>
                                             <p>
                                                Message for Activity
                                              </p>   
                                            </div>

                                        </div>
                                        <!--for activity-->

                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </div>
                    </div>

                    <div class="bottom-left-corner"></div>
                    <div class="bottom-right-corner"></div>
            </div>
        </v-container>

        <v-container class="uk-flight-alert" v-if="ukAlertATOL">
              <v-alert
                color="#3d4ed7"
                border="top"
                colored-border
                dense
                elevation="2"
                class="mt-3 mb-3"
              >
                  <div class="pt-3 pb-3">
                    <v-row align="left">
                      <v-col class="col-sm-1" style=" max-width: fit-content; ">
                        <img  :src="(domain == 'uk' ? require('@/assets/images/atol-warning.jpg').default: domain == 'ie'?  require('@/assets/images/topps.jpg').default: '')" style="width: 60px; height: 30px"/>
                      </v-col>
                      <v-col class="col-sm-11" v-if="domain == 'uk'">
                      All the flight-inclusive holidays on this website are financially protected by the ATOL scheme. When you pay you will be supplied with an ATOL Certificate. Please ask for it and check to ensure that everything you booked (flights, hotels and other services) is listed on it. If you do receive an ATOL Certificate but all the parts of your trip are not listed on it, those parts will not be ATOL protected. Some of the flights on this website are also financially protected by the ATOL scheme, but ATOL protection does not apply to all flights. This website will provide you with information on the protection that applies in the case of each flight before you make your booking. If you do not receive an ATOL Certificate then the booking will not be ATOL protected. Please see our booking conditions for information, or for more information about financial protection and the ATOL Certificate go to: <a href="https://www.caa.co.uk">www.caa.co.uk.</a> ATOL protection does not apply to the other holiday and travel services listed on this website
                      </v-col>
                      <v-col class="col-sm-11" v-if="domain == 'ie'">
                      <h5>Irish Total Payment Protection (topp) Policy</h5>
                        <p>In compliance with The Package Holidays and Travel Trade Act 1995 (Republic of Ireland), an insurance policy has been arranged with Arcus Solutions, to protect Republic of Ireland customers’ prepayments in the unlikely event of our financial failure, and paid in respect of:&nbsp;</p>

                    <p>Travel inclusive packages sold by the Policyholder to Republic of Ireland customers with travel departing from the United Kingdom and European Union and from Republic of Ireland for a refund of such prepayments if customers have not yet travelled, or making arrangements to enable the holiday to continue if customers have already travelled, repatriation of customers as may be applicable, subject to the terms of the insurance policy.&nbsp;In the unlikely event of financial failure please contact the claims helpline on +44 (0) 1702 811397. A copy of the policy is available on request. The combination of travel services offered to you is a package within the meaning of the<em>&nbsp;Package Holidays &amp; Travel Trade Act. </em>Additionally, as required by law, InteleTravel has protection in place to refund your payments and, where transport is included in the package, to ensure your repatriation in the event that it becomes/they become insolvent”. <a href="https://www2.inteletravel.com.co/hubfs/layout/InteleTravel_Irish%20topp%20certificate.pdf?hsLang=en-ie" rel="noopener" target="_blank">View this policy as a PDF.</a> For information, click <a href="https://www.irishstatutebook.ie/eli/1995/act/17/enacted/en/print.html">Package Holidays &amp; Travel Trade Act.</a></p>

                    <p><strong>This policy is provided by:</strong> Arcus Solutions – 3 Cours Charlemagne, 69002 Lyon – SARL au capital de 1 000€ – Téléphone: +44 (0) 207 065 5300. <a href="http://www.arcus-solutions.fr/">www.arcus-solutions.fr</a> RCS de Lyon n°853 774 529 – Code APE n°6622Z – ORIAS n°19006898. Le registre des intermédiaires d’assurances est tenu à jour par l’ORIAS disponible sur <a href="http://www.orias.fr/">www.orias.fr</a> Entreprise régie par le Code des Assurances et soumise au contrôle de l’ACPR – 4 place de Budapest, CS 92459, 75436 Paris Cedex 09 RC Professionnelle et Garantie Financière conformes aux articles L. 512-6 et L. 512-7 du Code des Assurances.</p>

                    <p><strong>This policy is underwritten by:</strong> Accelerant Insurance Europe SA registered and authorised by the National Bank of Belgium and regulated by the Financial Services and Markets Authority (Ref. 3193), Acting in Ireland under Freedom of Services.</p>

                    <p>The combination of travel services offered to you is a package within the meaning of the <a href="https://www.irishstatutebook.ie/eli/1995/act/17/enacted/en/print.html">Package Travel and Linked Travel Arrangements</a> Regulations 2018. Additionally, as required by law, InteleTravel has protection in place to refund your payments and, where transport is included in the package, to ensure your repatriation in the event that it becomes/they become insolvent”. For information, click <a href="https://www.irishstatutebook.ie/eli/1995/act/17/enacted/en/print.html">Package Holidays &amp; Travel Trade Act.</a></p>
                      </v-col>
                  </v-row>
                  </div>
              </v-alert>
        </v-container>

    </div>
</template>
<style>
.uk-flight-alert {
  top: 15px;
  font-size: 30px;
  overflow: auto;
}
</style>
<script>
import countryCodes from '@/services/data/countraycodes';
import * as dataKey from '@/services/data/dsources.js';
import { mapState } from  'vuex';
import tripServices from '@/services/api/Trips';
export default {
    name: 'ConfirmTrip',
    data() {
        return {
            ukAlertATOL: false,
            panel: [],
            bulkedItems: this.$store.state.cartStore.cartBulk,
            bulkedType: this.$store.getters.cartType,
            bookedDetails: [],
            cCodes: countryCodes,
            TotalAmount:0,
            displayIfBooked: false,
            tripBooking:[]
        };
    },
    created: function() {

        // this.getTripByIdInvited(this.$route.params.id, this.$route.params.token).then((resp) => {
                
            if(process.env.VUE_APP_DOMAIN=='uk'  || process.env.VUE_APP_DOMAIN=='ie' )
              this.ukAlertATOL = true;

            let _myBookings = this.doCleanArray(
                this.$store.getters.tripSummary.trip_bookings
            );

            
            this.tripBooking = _myBookings; 

            this.TotalAmount = this.tripTotalAmount(_myBookings)
            this.scrollToElement();

            this.refreshTripWhenItemRemoved = false;

            this.bookedDetailsProcess;
        // });
    },
    methods: {
        getTripByIdInvited: async function (tripId, _headerToken) {
      
            return new Promise((resolve, reject) => {

              let callArea = 'mixins';

              let payLoad = {
                searchBy: 'tripId',
                searchKey: tripId,
                isInvitedCustomer: true
              };

              let reqHeaders = {
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + _headerToken,
                },
              };

              tripServices
                .searchTrip(payLoad, reqHeaders)
                .then((rsp) => {

                  console.log('Search Trip API response 1586:mixins', rsp);

                  if (
                    rsp.data.success == false &&
                    rsp.data.message == 'Token has expired'
                  ) {
                    // this.doPopLogout();
                    return true;
                  } else if (
                    rsp.data.success == false &&
                    rsp.data.message != 'Token has expired'
                  ) {
                    // this.$awn.info(rsp.data.message);
                  } else {

                    console.log('bookObj step 1', bookObj);

                    this.setUpTripDetails(rsp.data.data[0], callArea, false);

                    resolve('trip_detail_setup');
                  }
                })
                .catch((err) => {

                    resolve('trip_detail_error', err);    

                    this.$sentry.captureException(new Error(err));
                    this.$awn.alert('Please try later, server encounter error..!');
                })
                .finally(() => {

                    resolve('trip_detail_setup');
                    // do some thing here
                });

            });
        },
        seeBookingData(data) {

            console.log('Data', data);
        },
        getVillaBookedRooms(content, sfindables) {

            let findables = sfindables.split(',');
                findables = findables.map(i=>Number(i));
            let bookedRooms = [];
            let allRoomsOfBlock = content.rooms;

            for(let index in allRoomsOfBlock) {

                let room = allRoomsOfBlock[index];

                if(findables.includes(Number(room.room_id)))
                    bookedRooms.push(room);

            };
            
            if(bookedRooms.length)
                content.rooms = bookedRooms;

            return content;
        },
        scrollToElement() {

            window.scrollTo({
                top: 0, 
                behavior: 'smooth'
            });
        },
        sumCarPrices: function(bookedCars) {

            let totalPrice = 0;

            if (bookedCars.length > 0)
                bookedCars.forEach((item, index) => {
                    if (typeof item.bookingData.data.carData != 'undefined')
                        totalPrice =
                            parseFloat(totalPrice) +
                            parseFloat(
                                item.bookingData.data.carData.totalPrice
                            );
                });

            return totalPrice;
        },
        getLocationByEngineId: function(engineId) {


            console.log('engineId', engineId);

            let that = this;

            let _bulkedItems = that.doCleanArray(that.bulkedItems);

            let _customRes = {
                pickLoc: 'pick loc one',
                dropLoc: 'drop loc one',
                pickTime: '2021-09-08',
                dropTime: '2021-09-08'
            };

            return new Promise((resolve, reject) => {

                if (that.bulkedType == 'trip') {

                    for (var i = 0; i < _bulkedItems.length; i++) {

                        if (_bulkedItems[i].item.Id == engineId) {
                            let _locPayload = {
                                pickLoc: _bulkedItems[i].item.plocationName,
                                dropLoc: _bulkedItems[i].item.dlocationName,
                                pickTime: _bulkedItems[i].item.pdate,
                                dropTime: _bulkedItems[i].item.ddate
                            };

                            resolve(_locPayload);
                            break;
                        
                        } // Ends IF

                    } // Ends FOR

                    // resolve(_customRes);
                }
            });
        }
    },
    computed: {

        ...mapState({
            domain: state=> state.envStore.domain
        }),

        async bookedDetailsProcess() {

            let that = this, promises = [];

            let bookObj = {
                bookVia: that.bulkedType,
                bookItems: that.$store.getters.getCardDetails
            };

            console.log('this.tripDetail', this.tripDetail);

            if (that.$store.getters.cartType == 'trip') {
                bookObj.tripName = this.tripDetail.trip_name;
                bookObj.tripId = this.tripDetail.trip_id;
                bookObj.tripTrvName = this.tripDetail.trip_trv_name;
                bookObj.tripTotalPrice = this.getTotalTripAmount; // this.sumCarPrices(that.$store.getters.getCardDetails);
            }

            if (that.$store.getters.cartType != 'trip') {
                bookObj.tripName = '';
                bookObj.tripId = '';
                bookObj.tripTrvName = 'You';
                bookObj.tripTotalPrice = this.getTotalTripAmount;
            }


            console.log('bookObj', bookObj);

            let _allBookings = that.doCleanArray(bookObj.bookItems), i = 0;

            for (i = 0; i < _allBookings.length; i++) {

                this.panel.push(i);

                if(typeof _allBookings[i].bookingData!="undefined" && _allBookings[i].bookingData.success==true)
                    this.displayIfBooked = true;

                if(_allBookings[i].engine=='car') {
                    
                    bookObj.bookItems[i].pickLoc = ''; // location.pickLoc;
                    bookObj.bookItems[i].dropLoc = ''; // location.dropLoc;
               
                    if(typeof _allBookings[i].bookingData!="undefined") {
                        
                        bookObj.bookItems[i].pickLoc = '';
                        bookObj.bookItems[i].dropLoc = '';

                        if(_allBookings[i].bookingData.success==true) {

                            bookObj.bookItems[i].pickLoc = _allBookings[i].bookingData.data.carData.pickupCity; 
                            bookObj.bookItems[i].dropLoc = _allBookings[i].bookingData.data.carData.dropoffCity;
                        } // Ends Inner IF
                    }

                }

                if(_allBookings[i].engine=='flight') {
                    
                    if(_allBookings[i].bookingData.success==true) {

                      let location = {};

                      let getALLBookings = this.tripBooking; 

                      getALLBookings.forEach((item, index) => {

                            if(item.engineId==_allBookings[i].engineId && item.engine==_allBookings[i].engine) {

                                    location = {
                                        pickLoc: item.details.engineDetails.flights[0].flightDetails.arriveData.arriveCity,
                                        dropLoc: item.details.engineDetails.flights[0].flightDetails.departData.departCity,
                                    }
                            }

                      });

                        bookObj.bookItems[i].pickLoc = (typeof location.pickLoc!="undefined") ? location.pickLoc : '';
                        bookObj.bookItems[i].dropLoc = (typeof location.dropLoc!="undefined") ? location.dropLoc : '';

                    }

                }

                if(_allBookings[i].engine=='hotel') {
                    
                    bookObj.bookItems[i].pickLoc = '';
                    bookObj.bookItems[i].dropLoc = '';
                    
                    if(typeof _allBookings[i].bookingData!="undefined") {
                        
                        // let location = await that.getLocationByEngineId(_allBookings[i].bookingData.data.packageId);

                        if(typeof _allBookings[i].bookingData.data!="undefined") {
                            
                            bookObj.bookItems[i].pickLoc = _allBookings[i].bookingData.data.hotelData.displayName; 
                            bookObj.bookItems[i].dropLoc = _allBookings[i].bookingData.data.hotelData.displayName;
                        } // if booking has data further
                    }

                }

                if(_allBookings[i].engine=='villa') {
                    
                    let location = await that.getLocationByEngineId(_allBookings[i].engineId);

                    bookObj.bookItems[i].pickLoc = location.pickLoc.label; 
                    bookObj.bookItems[i].dropLoc = location.dropLoc.label;
                }

            } // Ends FOR LOOP
            
            this.bookedDetails = bookObj;


            console.log('this.bookedDetails', this.bookedDetails);

           return false;


            this.$store.state.carStore.searchData = {};
            this.$store.state.carStore.searchedCarsData = {};
            this.$store.state.carStore.selDriverAge = '';
            this.$store.state.carStore.selDropLoc = {};
            this.$store.state.carStore.selPickLoc = {};
            this.$store.state.carStore.selPickLoc = {};
            this.$store.state.carStore.carSearchedId = '';
            
        }, // Ends func::bookedDetailsProcess()
        bookingItem() {

            return this.doCleanArray(this.$store.state.cartStore.cartBulk);
        },
        getTotalTripAmount() {

            let _myBookings = this.bookingItem, amount = 0;

            _myBookings.forEach((bookItem, index) => {

                if(bookItem.engine=='car')
                    amount += parseFloat(bookItem.item.FinalPrice);
            
                if(bookItem.engine=='flight') {

                    if(typeof bookItem.item.totalPrice!="undefined") {
                      
                        amount += parseFloat(bookItem.item.totalPrice);

                    } else if (typeof bookItem.item.flightDetails!="undefined") {

                        amount += parseFloat(bookItem.item.flightDetails.price);
                    }
                }
            
                if(bookItem.engine=='hotel')
                    amount += parseFloat(bookItem.item.room.finalPrice);

                if(bookItem.engine=='villa')
                    amount += parseFloat(this.getPriceOfVillaRooms(bookItem.item.rooms));

            });

            return amount.toFixed(2);
        }
    }, // Ends computed
    filters:{

        numberFormat(value, countryCodes, code) {
             if (value == '') {
                return '';
            }else{
                return value;
            }
            var CountryCodeMask = countryCodes[code];

            var count = (CountryCodeMask.match(/#/g) || []).length;

            var number = value.replace(/[^\d.]/g, '');
           
            var maskToApplyNumber = number.substring(number.length - count) 
           
            var i = 0,
            v = maskToApplyNumber.toString();
            
            let returnNumber = CountryCodeMask.replace(/#/g, _ => v[i++]);
            
            return returnNumber;

       }
    }
};
</script>
<style scoped>
.booking-container {
    width: 950px;
    margin: auto;
    overflow: hidden;
}
.acord-buttons .v-btn {
    margin-right: 10px;
}
.bottom-left-corner { 
    top: -28px;
    left: -10px; 
}
.bottom-right-corner { 
    top: -28px;
    right: -10px; 
}
@media screen and (max-width: 767px) and (min-width: 300px) {
.left-corner {
    top: 15px;
}
.right-corner {
    top: 15px;
}
.bottom-left-corner {
     top: -30px; 
}
.bottom-right-corner { 
    top: -30px; 
}



}
@media screen and (max-width: 700px) and (min-width: 100px) {
    .booking-container {
    width: 95%;
    margin: auto;
}
.accordian-content .acord-body .acord-buttons {
    text-align: center;
}
}

@media screen and (max-width: 2500px) and (min-width: 1501px) {
    .booking-container {
        width: 40vw;
        margin: auto;
    }
}
.atol-icon{
      width: 23px;
    margin-left: 0px;
    position: relative;
    top: 5px;
    right: 3px;
}
</style>