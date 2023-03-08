<template>
  <div class="hotel-back-btn" style="">
    <div class="title-heading">
      <h2 class="blue-heading">
        <i class="fas fa-hotel" style="font-size: 24px;"></i>Hotel
      </h2>
    </div>
    <v-expansion-panels>
      <v-expansion-panel>
        <div class="single-listing-repeat">
          <div class="single-listing">
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

                <div class="outer-right hotel-outer-right hhh-col-hotel-outer">
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
                		 <span v-if="domain == 'uk'  && trips.hotelDetails.package.rooms[0].isMor=='true' " >
                               <img :src="require('@/assets/images/atol-warning.jpg').default" 
                               style="width:40px;
                               height:40px;"
                               title="ATOL certificate required when purchased within 24 hours of a flight booking." 
                               alt="ATOL certificate required when purchased within 24 hours of a flight booking."/>
                               </span>

                               <span v-if="domain == 'ie' && trips.hotelDetails.package.rooms[0].isMor=='true' " >
                               <img :src="require('@/assets/images/topps.jpg').default" 
                               style="width:60px;
                               height:30px;"
                               title="TOPPS certificate required when purchased within 24 hours of a flight booking." 
                               alt="TOPPS certificate required when purchased within 24 hours of a flight booking."/>
                               </span>
                <h2>
                  {{ currencySymbol }}
                  <span>
                    {{
                      trips.hotelDetails.length > 0
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
                  <li
                    v-if="
                      trips.status == 'booked' || trips.status == 'completed'
                    "
                  >
                     <p class="status-blue">
                      Booked
                    </p>
                  </li>

                  <li
                    v-if="
                      trips.status != 'booked' && trips.status != 'completed'
                    "
                  >
                     <p class="status-blue" mall>
                      Not Booked
                    </p>

                  </li>
                  <li
                    v-if="
                     trips.sessionDetails.expire &&
                      trips.status != 'booked' && trips.status != 'completed'
                    "
                  >
                    <v-btn
                      v-bind:color="tripExist ? 'error' : ''"
                      color="error"
                      class="btn-save mt-2"
                      width="auto"
                      @click="searchExpireItem(trips, trips.engine, 'trip')"
                    >
                      Update
                    </v-btn>
                  </li>

                  <li style="text-align: center; display: inline-block;">
                    <div class="sidebar-remove-box qoutetabe-remove-btn">
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

                  <li v-if="trips.hotelDetails.package">
                     <p class="status-blue"
                          v-if="
                              trips.hotelDetails.package.chargeReq === 'ImmediatePayment'"
                           >Pay Now
                      </p>
                  </li>

                </ul>
                <v-expansion-panel-header
                  v-if="
                    trips.sessionDetails.expire == false ||
                      trips.status == 'booked'
                  "
                  @click="doMeToggle(index)"
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
        </div>
        <v-expansion-panel-content v-if="trips.engine == 'hotel'">
          <div class="car-listing-tabs-outer">
            <div class="car-listing-tabs">
              <v-tabs
                background-color="primary"
                class="tabs-car-ul"
                v-model="trips.tab"
              >
                <v-tab href="#tab-1">
                  <span>OVERVIEW</span>
                </v-tab>
                <v-tab href="#tab-2">
                  <span>GALLERY</span>
                </v-tab>
                <v-tab href="#tab-3">
                  <span>FACILITIES</span>
                </v-tab>

                <v-tab href="#tab-7">
                  <span>CANCELLATION</span>
                </v-tab>

                <v-tab
                  href="#tab-8"
                  v-if="trips.booking && Array.isArray(trips.booking) == false"
                >
                  <span>Booking Details</span>
                </v-tab>
              </v-tabs>

              <div class="tabs-text-content">
                <v-tabs-items v-model="trips.tab">
                  <v-tab-item value="tab-1">
                    <p
                      v-if="
                        Array.isArray(trips.hotelDetails) == false &&
                          trips.hotelDetails.package.rooms[0].roomContent != ''
                      "
                      v-html="
                        trips.hotelDetails.package.rooms[0].roomContent
                      "
                    ></p>
                    <p v-else>
                      Unfortunately, our supplier has not provided any package
                      details.
                    </p>
                  </v-tab-item>
                  <v-tab-item value="tab-2">
                    <div
                      v-if="
                        Array.isArray(trips.hotelDetails) == false &&
                          typeof trips.hotelDetails.galleryImages !='undefined'
                      "
                      class="gallery-slider-box"
                    >
                   
                      <Slider
                        v-if="trips.hotelDetails.galleryImages"
                        :slides="
                          getImages(trips.hotelDetails.galleryImages)
                        "
                      />
                    </div>
                    <div v-else>
                      <p>
                        Unfortunately, our supplier has not provided any package
                        details.
                      </p>
                    </div>
                  </v-tab-item>
                  <v-tab-item value="tab-3">
                    <div
                      class="product-varify hotel-product-varify  choose-room"
                    >
                      <ul
                        v-if="
                          Array.isArray(trips.hotelDetails) == false &&
                            typeof trips.hotelDetails.package.rooms[0].facilities!='undefined'
                        "
                      >
                        <li
                          v-for="(amenity, index) in trips.hotelDetails.package.rooms[0].facilities"
                          :key="index"
                        >
                          <i class="fas fa-check"></i>
                          {{ amenity }}
                        </li>
                      </ul>
                      <p v-else>
                        Unfortunately, our supplier has not provided any package
                        details.
                      </p>
                    </div>
                  </v-tab-item>
                  <v-tab-item value="tab-7">
                    <div
                    v-if="trips.hotelDetails.package.cancelPolicy.length"
                    >
                      
                      <p v-for="(itemCancellation,index) in trips.hotelDetails.package.cancelPolicy[0].datesFees" :key="index">
                        
                        <b>Cancellation Fee : </b>

                        Between
                       {{
                          getHotelCountryDFOnly(itemCancellation.start, countryDF)
                        }}
                        to
                        {{
                          getHotelCountryDFOnly(itemCancellation.after, countryDF)
                        }}

                        Fee is {{ currencySymbol}}{{itemCancellation.fee}}
                      </p>
                      
                      <!--
                      <p
                      v-html="trips.hotelDetails.package.cancelPolicy[0].remarks"
                      ></p>
                      -->

                    </div>

                    <p v-else>
                      Unfortunately, our supplier has not provided any package
                      details.
                    </p>

                    <div v-if="typeof trips.hotelDetails.package.policies!= 'undefined'">
                        <div v-if="trips.hotelDetails.package.policies.length">
                            <div v-for="(cPolicy) in trips.hotelDetails.package.policies" class="product-text hotel-product-text">
                                <h3 class="primary--text font-14">
                                    {{ cPolicy.type }}
                                </h3>
                                <p v-html="cPolicy.text"></p>
                            </div>
                        </div>    
                    </div>
                     <div >
                            <div  class="product-text hotel-product-text">
                                <h3 class="primary--text font-14">
                                  Payment, Taxes, and Fees Disclaimer:
                                </h3>
                                <p >These charges, if applicable, will be payable by you to the hotel directly at checkout. When you check in, a credit card or, in the hotel’s discretion, a debit card, will be required to secure there charges and fees that you may incur during your stay. Please contact the hotel directly as to whether and which charges or service fees apply.</p>
                            </div>
                        </div>  

                  </v-tab-item>

                  <v-tab-item
                    value="tab-8"
                    v-if="
                      trips.booking && Array.isArray(trips.booking) == false
                    "
                  >
                    <!--hotel booking area-->

                    <div class="acord-body">
                      <br />

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
                                    'ddd, MMM Do, YYYY'
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
                                    'ddd, MMM Do, YYYY'
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
                              <td>
                                {{ trips.item.engineDetails.address }}
                              </td>
                            </tr>

                            <tr>
                              <td>Booking Number:</td>
                              <td>
                                {{ trips.booking.bookingId }}
                              </td>
                            </tr>

                            <tr v-if="trips.booking.orderId != ''">
                              <td>Order ID:</td>
                              <td>
                                {{ trips.booking.orderId }}
                              </td>
                            </tr>

                            <tr v-if="trips.booking.segmentId != ''">
                              <td>Segment ID:</td>
                              <td>
                                {{ trips.booking.segmentId }}
                              </td>
                            </tr>

                            <tr>
                              <td colspan="2">
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
                                    style="padding: 10px;"
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
                                            {{ parseInt(room.kidsAges.length) }}
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
                                            {{ passenger.firstName | ucwords }}
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
                                                typeof room.roomContent
                                                  .amenities != undefined
                                              "
                                            >
                                              {{
                                                room.roomContent.amenities.join()
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
                              <td>Status:</td>
                              <td class="clr-blue">
                                {{ trips.booking.status | capitalize }}
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>

                    <!--hotel booking area-->
                  </v-tab-item>
                </v-tabs-items>
              </div>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>

import { mapState } from 'vuex';
import StarRating from 'vue-star-rating';
import Slider from '@/components/front/hotels/Slider';
import moment from 'moment';
export default {
  name: 'HotelCurrentItem',
  components: {
    StarRating,
    Slider
  },

  props: {
    itemDetials: {
      type: Array
    },

    trips: {
      type: Object
    },

    activeDomain: {
      type: String
    },

    hasHotelTrip: {
      type: Boolean
    },
    index: {
      type: Number
    },
    doMeToggle: {
      type: Function
    },
    personCount: {
      type: Function
    },
    removeTrip: {
      type: Function
    },
    cCodes: {
      type: Object
    },
    setNightCount: {
      type: Function
    },
    searchData: {
      type: Array
    },
    countryDF: {
      type: String
    },
    fixPathOfImage: {
      type: Function
    }
  },

  created: function() {

  },

  computed: {
     ...mapState({
        domain: state=>state.envStore.domain
     })
  },
  methods:{
      compDistanceUnit() {
          if(this.domain == 'com'){
          return this.distanceUnit = 'Miles';
          } else if(this.domain == 'uk' || this.domain =='ie') {
          return this.distanceUnit = 'Kilometer';
         }
       },
    getImages(images){
      let that = this;
      if(typeof images == 'object'){
       images = Object.values(images);
      }
      return images.map(item=>({
        img:that.fixPathOfImage(item)
      }));
    }
  },
  filters: {
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
    },
    formatDate: function(value, countryDFormat) {
      return moment(value).format(countryDFormat);
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