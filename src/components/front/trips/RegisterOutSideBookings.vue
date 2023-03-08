<template>
  <div class="col-md-12 col-lg-12">
    <section class="trip-detail-wrapper" style="margin-bottom:25px;">
      <v-container>
        <div  class="title-heading">
          <h1 class="blue-heading">Trip Details</h1>
        </div>

        <section>
          <v-form ref="form" class="" lazy-validation>
            <v-card class="trip-card">
              <div class="w-60 float-left" style="padding-top: 15px">
                <p>
                  <img :src="require('@/assets/images/trip-blue-icon.svg').default"
                    style="width: 23px; margin-left: -3px" />
                  <span v-if="tripExist && !isROSNewTripCreated">
                    {{ userTrips[0].tripId }} -
                  {{ userTrips[0].tripName }}
                </span>
                <span style="margin-left:3px;" v-if="!tripExist && isROSNewTripCreated">
                    {{ ROSNewlyCreatedTrip[0].tripId }} -
                  {{ ROSNewlyCreatedTrip[0].tripName }}
                </span>
                  <span v-if="!tripExist && !isROSNewTripCreated" style="font-weight: 400; margin-left:5px;">
                    NA
                  </span>

                </p>
              </div>

              <div class="w-40 float-left mt-3">
                <router-link to="/my_trips" style="text-decoration: none">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" v-if="tripExist" color="primary" class="btn-save" width="auto"
                        @click="selectTrip(userTrips[0].tripId)">
                        Select This Trip
                      </v-btn>
                    </template>
                    <span>This is not your current selected trip. To refresh this
                      item please click the "Select this trip" button
                      first.</span>
                  </v-tooltip>
        
                  <v-btn color="error" class="btn-save ml-3">
                    Back To My Trips
                  </v-btn>
                </router-link>
              </div>
            </v-card>
          </v-form>
        </section>

        <div class="roso-box">
          <div class="title-heading">
            <h1 class="blue-heading">Register Outside Bookings</h1>
          </div>
          <v-card class="trip-card">
            <div class="w-100 float-left" style="padding-top: 15px" id="stepper-tabs-holder">
              <v-stepper v-model="steps">
                <v-stepper-header :class="{'stepper-padding': domain  !== 'uk'}" >
                  <v-stepper-step ref="step1" style="cursor: pointer" class="step-active " :complete="steps > 1"
                    step="1" @click="steps > 1 ? updateView(1, true) : false">
                    <div class="trip-tab step-active">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        preserveAspectRatio="xMidYMid" width="45" height="45" viewBox="0 0 200 200">
                        <path
                          d="M179.000,184.000 L174.000,184.000 L174.000,195.000 C174.000,195.000 173.130,196.548 171.000,198.000 L167.000,198.000 C167.000,198.000 164.996,197.665 164.000,195.000 L164.000,184.000 L119.539,184.000 C117.718,192.013 110.564,198.000 102.000,198.000 L20.000,198.000 C10.059,198.000 2.000,189.941 2.000,180.000 L2.000,127.000 C2.000,117.059 10.059,109.000 20.000,109.000 L36.000,109.000 L36.000,102.000 C36.000,102.000 39.393,89.761 52.000,87.000 L69.000,87.000 C69.000,87.000 73.862,87.704 76.000,90.000 L76.000,66.000 C76.000,66.000 79.983,50.679 94.000,49.000 L100.000,49.000 L100.000,19.000 C100.000,19.000 103.188,3.452 118.000,2.000 L157.000,2.000 C157.000,2.000 171.465,5.506 174.000,20.000 L174.000,49.000 L181.000,49.000 C181.000,49.000 196.000,53.280 198.000,67.000 L198.000,165.000 C198.000,165.000 196.013,180.045 179.000,184.000 ZM29.000,119.000 L19.000,119.000 C19.000,119.000 15.250,119.250 12.000,125.000 L12.000,182.000 C12.000,182.000 12.875,185.875 17.000,188.000 L29.000,188.000 L29.000,119.000 ZM92.000,189.000 L103.000,189.000 C103.000,189.000 108.750,186.000 110.000,182.000 L110.000,126.000 C110.000,126.000 108.500,120.625 103.000,119.000 L92.000,119.000 L92.000,189.000 ZM75.000,104.000 C74.130,98.888 69.000,97.000 69.000,97.000 L53.000,97.000 C48.433,97.950 46.000,104.000 46.000,104.000 L46.000,110.000 L75.000,110.000 L75.000,104.000 ZM83.000,119.000 L39.000,119.000 L39.000,189.000 L83.000,189.000 L83.000,119.000 ZM164.000,20.000 C164.000,20.000 163.456,13.865 154.000,11.000 L120.000,11.000 C120.000,11.000 114.095,11.373 110.000,20.000 L110.000,49.000 L164.000,49.000 L164.000,20.000 ZM189.000,69.000 C189.000,69.000 187.834,62.343 178.000,58.000 L96.000,58.000 C96.000,58.000 89.750,59.113 85.000,68.000 L85.000,80.000 L189.000,80.000 L189.000,69.000 ZM189.000,89.000 L85.000,89.000 L85.000,109.000 C85.000,109.000 107.368,107.882 110.000,111.000 C110.000,111.000 117.826,114.093 120.000,124.000 L120.000,174.000 L177.000,174.000 C177.000,174.000 184.447,173.366 188.000,164.000 L189.000,163.000 L189.000,89.000 Z"
                          class="cls-1" />
                      </svg>
                    </div>
                    <div class="rob-arrow">
                      <img src="@//assets/images/rob-arrow.jpg" />
                    </div>
                    TRIP
                   <!--  <i class="fas fa-check"></i> -->
                  </v-stepper-step>

                  <i class="step-active fas fa-arrow-right"></i>

                  <v-stepper-step style="cursor: pointer" :complete="steps > 2" step="2"
                    @click="steps > 2 ? updateView(2, true) : false">
                    <div class="trip-tab">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        preserveAspectRatio="xMidYMid" width="45" height="45" viewBox="0 0 252 260">
                        <path
                          d="M158.500,130.000 C157.997,130.000 157.500,130.026 157.000,130.038 L157.000,19.000 L18.000,19.000 L18.000,168.000 L99.699,168.000 C96.897,174.208 95.050,180.936 94.337,188.000 L18.000,188.000 L18.000,215.000 L97.330,215.000 C99.517,221.528 102.718,227.591 106.749,233.000 L20.000,233.000 C8.954,233.000 0.000,224.046 0.000,213.000 L0.000,20.000 C0.000,8.954 8.954,0.000 20.000,0.000 L164.000,0.000 C169.523,0.000 174.000,4.477 174.000,10.000 L174.000,131.888 C169.033,130.662 163.845,130.000 158.500,130.000 ZM45.000,54.000 C45.000,48.477 49.477,44.000 55.000,44.000 L121.000,44.000 C126.523,44.000 131.000,48.477 131.000,54.000 C131.000,59.523 126.523,64.000 121.000,64.000 L55.000,64.000 C49.477,64.000 45.000,59.523 45.000,54.000 Z"
                          class="cls-1" />
                        <path
                          d="M158.500,259.000 C122.878,259.000 94.000,230.122 94.000,194.500 C94.000,158.878 122.878,130.000 158.500,130.000 C194.122,130.000 223.000,158.878 223.000,194.500 C223.000,230.122 194.122,259.000 158.500,259.000 ZM158.500,143.000 C129.505,143.000 106.000,166.505 106.000,195.500 C106.000,224.495 129.505,248.000 158.500,248.000 C187.495,248.000 211.000,224.495 211.000,195.500 C211.000,166.505 187.495,143.000 158.500,143.000 Z"
                          class="cls-1" />
                        <path
                          d="M120.000,194.231 L130.759,183.338 L153.172,203.308 L186.345,167.000 L198.000,176.985 L153.172,226.000 L120.000,194.231 Z"
                          class="cls-1" />
                      </svg>
                    </div>
                    <div class="rob-arrow">
                      <img src="@//assets/images/rob-arrow.jpg" />
                    </div>
                    GENERAL<br />
                    BOOKING
                  </v-stepper-step>

                  <i class="fas fa-arrow-right"></i>

                  <v-stepper-step style="cursor: pointer" :complete="steps > 3" step="3"
                    @click="steps > 3 ? updateView(3, true) : false">
                    <div class="trip-tab">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        preserveAspectRatio="xMidYMid" width="45" height="45" viewBox="0 0 174 175">
                        <path
                          d="M173.000,151.000 L168.000,151.000 L157.000,139.000 L155.800,139.000 L138.000,157.000 L151.000,170.000 L151.000,172.000 L150.000,174.000 L146.000,175.000 L132.000,161.000 L132.000,155.600 L134.000,151.000 L123.650,140.650 C110.757,150.288 94.794,156.000 77.500,156.000 C34.698,156.000 0.000,121.078 0.000,78.000 C0.000,34.922 34.698,-0.000 77.500,-0.000 C96.853,-0.000 114.535,7.156 128.116,18.961 L128.000,19.000 C129.894,24.810 124.895,25.069 123.411,25.023 C111.074,14.422 95.042,8.000 77.500,8.000 C38.564,8.000 7.000,39.564 7.000,78.500 C7.000,117.436 38.564,149.000 77.500,149.000 C116.436,149.000 148.000,117.436 148.000,78.500 C148.000,66.015 144.741,54.296 139.047,44.124 C139.439,39.538 143.268,39.543 145.070,39.812 C151.383,51.102 155.000,64.122 155.000,78.000 C155.000,95.483 149.259,111.600 139.604,124.604 L150.000,135.000 L152.000,135.000 L154.800,132.000 L159.000,132.000 L160.000,133.000 L174.000,146.000 L174.000,149.000 L173.000,151.000 ZM146.000,139.000 L145.000,139.000 L135.909,129.000 L134.000,129.000 L129.000,134.000 L129.000,136.000 L129.143,136.143 C128.987,136.284 128.823,136.416 128.665,136.555 L130.000,137.000 L139.000,146.000 L140.000,147.000 L140.000,146.000 L146.000,141.000 L146.000,139.000 ZM77.500,140.000 C43.534,140.000 16.000,112.465 16.000,78.500 C16.000,44.534 43.534,17.000 77.500,17.000 C111.465,17.000 139.000,44.534 139.000,78.500 C139.000,112.465 111.465,140.000 77.500,140.000 ZM77.500,24.000 C47.400,24.000 23.000,48.400 23.000,78.500 C23.000,108.600 47.400,133.000 77.500,133.000 C107.600,133.000 132.000,108.600 132.000,78.500 C132.000,48.400 107.600,24.000 77.500,24.000 ZM134.500,35.000 C132.567,35.000 131.000,33.433 131.000,31.500 C131.000,29.567 132.567,28.000 134.500,28.000 C136.433,28.000 138.000,29.567 138.000,31.500 C138.000,33.433 136.433,35.000 134.500,35.000 Z"
                          class="cls-1" />
                        <path
                          d="M100.000,116.000 L55.000,116.000 C50.582,116.000 47.000,112.418 47.000,108.000 L47.000,49.000 C47.000,44.582 50.582,41.000 55.000,41.000 L100.000,41.000 C102.761,41.000 105.000,43.239 105.000,46.000 L105.000,111.000 C105.000,113.761 102.761,116.000 100.000,116.000 ZM98.000,48.000 L54.000,48.000 L54.000,95.000 L98.000,95.000 L98.000,48.000 ZM98.000,102.000 L54.000,102.000 L54.000,110.000 L98.000,110.000 L98.000,102.000 ZM65.500,55.000 L87.500,55.000 C89.433,55.000 91.000,56.567 91.000,58.500 C91.000,60.433 89.433,62.000 87.500,62.000 L65.500,62.000 C63.567,62.000 62.000,60.433 62.000,58.500 C62.000,56.567 63.567,55.000 65.500,55.000 Z"
                          class="cls-1" />
                      </svg>
                    </div>
                    <div class="rob-arrow">
                      <img src="@//assets/images/rob-arrow.jpg" />
                    </div>
                    SPECIFIC<br />
                    BOOKING
                  </v-stepper-step>

                  <i class="fas fa-arrow-right"></i>

                  <v-stepper-step style="cursor: pointer" :complete="steps > 4" step="4"
                    @click="steps > 4 ? updateView(4, true) : false">
                    <div class="trip-tab">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        preserveAspectRatio="xMidYMid" width="45" height="45" viewBox="0 0 225 215">
                        <path
                          d="M220.000,173.000 L161.000,173.000 C154.833,172.833 155.000,169.000 155.000,169.000 L155.000,136.000 C155.000,130.667 160.000,130.000 160.000,130.000 L172.000,130.000 L172.000,120.000 L181.000,125.000 L181.000,130.000 L199.000,130.000 L199.000,122.000 L203.000,118.000 C204.667,116.000 204.000,113.000 204.000,113.000 C206.000,113.000 208.000,116.000 208.000,116.000 L208.000,130.000 L216.000,130.000 C222.667,128.500 225.000,134.000 225.000,134.000 L225.000,168.000 C224.667,171.333 220.000,173.000 220.000,173.000 ZM183.000,116.000 L154.000,103.000 C154.000,103.000 150.333,102.333 149.000,96.000 L144.000,64.000 L143.000,64.000 L141.000,100.000 C141.000,100.000 140.167,108.333 164.000,117.000 L164.000,123.000 C164.000,123.000 157.000,119.167 151.000,127.000 L150.000,127.000 L147.000,121.000 L141.000,121.000 L147.000,156.000 C147.000,156.000 148.000,162.000 145.000,166.000 L129.000,209.000 C129.000,209.000 125.333,216.000 117.000,214.000 C117.000,214.000 108.333,210.833 111.000,202.000 L126.000,160.000 L128.000,155.000 C128.000,155.000 124.167,146.667 121.000,119.000 L124.000,79.000 L122.000,79.000 C122.000,79.000 110.333,91.000 104.000,104.000 C104.000,104.000 97.500,117.333 94.000,118.000 C94.000,118.000 93.333,115.833 88.000,126.000 L44.000,191.000 C44.000,191.000 43.333,193.667 46.000,197.000 C46.000,197.000 48.833,211.000 33.000,215.000 C33.000,215.000 16.833,214.000 19.000,198.000 L0.000,185.000 L0.000,179.000 L49.000,106.000 C49.000,106.000 52.833,103.500 56.000,106.000 L79.000,121.000 L84.000,115.000 L84.000,113.000 C84.000,113.000 81.833,111.000 84.000,107.000 L103.000,76.000 C103.000,76.000 103.667,73.167 110.000,68.000 C110.000,68.000 122.000,56.833 126.000,55.000 C126.000,55.000 125.833,50.500 129.000,47.000 C129.000,47.000 132.000,43.000 138.000,43.000 C138.000,43.000 156.000,44.833 164.000,45.000 C164.000,45.000 173.333,49.667 173.000,57.000 L171.000,82.000 L162.000,62.000 L160.000,61.000 L164.000,88.000 C164.000,88.000 169.667,92.667 177.000,95.000 L193.000,103.000 C193.000,103.000 199.833,106.833 195.000,115.000 C195.000,115.000 189.333,119.667 183.000,116.000 ZM32.000,196.000 C29.239,196.000 27.000,198.239 27.000,201.000 C27.000,203.761 29.239,206.000 32.000,206.000 C34.761,206.000 37.000,203.761 37.000,201.000 C37.000,198.239 34.761,196.000 32.000,196.000 ZM156.000,36.000 C146.059,36.000 138.000,27.941 138.000,18.000 C138.000,8.059 146.059,-0.000 156.000,-0.000 C165.941,-0.000 174.000,8.059 174.000,18.000 C174.000,27.941 165.941,36.000 156.000,36.000 ZM192.000,195.000 C194.667,205.167 193.000,209.000 193.000,209.000 C189.000,215.500 184.000,214.000 184.000,214.000 C178.500,214.500 175.000,209.000 175.000,209.000 L172.000,195.000 L168.000,181.000 L189.000,181.000 L192.000,195.000 Z"
                          class="cls-1" />
                      </svg>
                    </div>
                    <div class="rob-arrow">
                      <img src="@//assets/images/rob-arrow.jpg" />
                    </div>
                    TRAVELERS
                  </v-stepper-step>

                  <i v-if="domain == 'uk'" class="fas fa-arrow-right"></i>

                  <v-stepper-step v-if="domain == 'uk'" style="cursor: pointer" :complete="steps > 5" step="5"
                    @click="steps > 5 ? updateView(5, true) : false">
                    <div class="trip-tab">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        preserveAspectRatio="xMidYMid" width="45" height="45" viewBox="0 0 193 150">
                        <path
                          d="M169.000,150.000 L24.000,150.000 C10.745,150.000 -0.000,139.255 -0.000,126.000 L-0.000,24.000 C-0.000,10.745 10.745,-0.000 24.000,-0.000 L169.000,-0.000 C182.255,-0.000 193.000,10.745 193.000,24.000 L193.000,126.000 C193.000,139.255 182.255,150.000 169.000,150.000 ZM176.000,18.000 L17.000,18.000 L17.000,132.000 L176.000,132.000 L176.000,18.000 ZM37.500,103.000 L58.500,103.000 C62.090,103.000 65.000,105.910 65.000,109.500 C65.000,113.090 62.090,116.000 58.500,116.000 L37.500,116.000 C33.910,116.000 31.000,113.090 31.000,109.500 C31.000,105.910 33.910,103.000 37.500,103.000 ZM81.500,103.000 L122.500,103.000 C126.090,103.000 129.000,105.910 129.000,109.500 C129.000,113.090 126.090,116.000 122.500,116.000 L81.500,116.000 C77.910,116.000 75.000,113.090 75.000,109.500 C75.000,105.910 77.910,103.000 81.500,103.000 ZM32.000,83.000 C32.000,79.134 35.134,76.000 39.000,76.000 L154.000,76.000 C157.866,76.000 161.000,79.134 161.000,83.000 C161.000,86.866 157.866,90.000 154.000,90.000 L39.000,90.000 C35.134,90.000 32.000,86.866 32.000,83.000 ZM153.000,64.000 L125.000,64.000 C121.134,64.000 118.000,60.866 118.000,57.000 L118.000,41.000 C118.000,37.134 121.134,34.000 125.000,34.000 L153.000,34.000 C156.866,34.000 160.000,37.134 160.000,41.000 L160.000,57.000 C160.000,60.866 156.866,64.000 153.000,64.000 Z"
                          class="cls-1" />
                      </svg>
                    </div>
                    <div class="rob-arrow">
                      <img src="@//assets/images/rob-arrow.jpg" />
                    </div>
                    PAYMENT<br />
                    SCREEN
                  </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items style="margin-top: 30px">
                  <v-stepper-content step="1" style="margin-top: 30px">
                    <TripScreen v-on:updateSteps="updateView(2)" v-on:newTripCreated="setnewTripStatus($event)" />
                  </v-stepper-content>
                  <v-stepper-content step="2" style="margin-top: 30px">
                    <GeneralBookingScreen v-on:updateSteps="$event == 'next' ? updateView(3) : updateView(-1)"
                      v-on:updateBookingType="bookingTypeId = $event" />
                  </v-stepper-content>
                  <v-stepper-content step="3" style="margin-top: 30px">
                    <SpecificBookingActivity v-on:updateSteps="
                      $event == 'next' ? updateView(4) : updateView(-1)
                    " v-if="bookingTypeId == 11" />
                    <SpecificBookingHotel v-on:updateSteps="
                      $event == 'next' ? updateView(4) : updateView(-1)
                    " v-if="bookingTypeId == 3" />
                    <SpecificBookingFlight v-on:updateSteps="
                      $event == 'next' ? updateView(4) : updateView(-1)
                    " v-if="bookingTypeId == 1" />
                    <SpecificBookingCar v-on:updateSteps="
                      $event == 'next' ? updateView(4) : updateView(-1)
                    " v-if="bookingTypeId == 2" />

                    <SpecificBookingCruise v-on:updateSteps="
                      $event == 'next' ? updateView(4) : updateView(-1)
                    " v-if="bookingTypeId == 4" />
                    <SpecificBookingVacation v-on:updateSteps="
                      $event == 'next' ? updateView(4) : updateView(-1)
                    " v-if="bookingTypeId == 5" />
                  </v-stepper-content>
                  <v-stepper-content step="4" style="margin-top: 30px">
                    <Traveler v-on:updateSteps="$event == 'next' ? updateView(5) : updateView(-1)" />
                  </v-stepper-content>
                  <v-stepper-content step="5" style="margin-top: 30px">
                    <PaymentScreen/>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </div>
          </v-card>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script>
import tripServices from '@/services/api/Trips.js';
import SpecificBookingActivity from './specificBookingTypes/SpecificBookingActivity.vue';
import SpecificBookingCar from './specificBookingTypes/SpecificBookingCar.vue';
import SpecificBookingCruise from './specificBookingTypes/SpecificBookingCruise.vue';
import SpecificBookingFlight from './specificBookingTypes/SpecificBookingFlight.vue';
import SpecificBookingHotel from './specificBookingTypes/SpecificBookingHotel.vue';
import SpecificBookingVacation from './specificBookingTypes/SpecificBookingVacation.vue';
import Traveler from './specificBookingTypes/Traveler.vue';
import TripScreen from '@/components/front/trips/robScreens/TripScreen.vue';
import GeneralBookingScreen from '@/components/front/trips/robScreens/GeneralBookingScreen.vue';
import PaymentScreen from '@/components/front/trips/robScreens/PaymentScreen.vue';
import { mapState } from 'vuex';
export default {
  name: 'RegisterOutSideBookings',
  data() {
    return {
      isROSNewTripCreated_v:false,
      ROSNewlyCreatedTrip_v: [],
      bookingTypeId: 0,
      totalNumberOfOptions: 1,
      newTripName_v: '',
      checkbox: false,
      steps: 1,
      typeOfTrip: '',
      tripBooking: [],
      tripdetailsget: [],
      itemDetials: [],
      bookingTab: 'trip',
      tripLocation: 'United States',
      tripLocations: [
        'United States',
        'United Kingdom',
        'Mexico',
        'United Aarab Emirate',
      ],
      mytrips: [],
      existingTripName: '',
      items: ['1', '3', '4'],
      row: 1,
      show: true,
      op1: '',
      op2: '',
      op3: ''
    };
  },
  components: {
    Traveler,
    SpecificBookingCar,
    SpecificBookingFlight,
    SpecificBookingHotel,
    SpecificBookingActivity,
    SpecificBookingCruise,
    SpecificBookingVacation,
    TripScreen,
    GeneralBookingScreen,
    PaymentScreen
  },



  computed: {
    ...mapState({
      userTrips: (state) => state.tripStore.userTripDetais,
      tripExist: (state) => state.tripStore.tripExist,
      domain: state => state.envStore.domain,
    }),

     ROSNewlyCreatedTrip:{
        get(){
           return this.ROSNewlyCreatedTrip_v
        },

        set(newValue){
          this.ROSNewlyCreatedTrip_v = newValue
        }
     },

    isROSNewTripCreated:{
      get(){
         return this.isROSNewTripCreated_v
      },

      set(newValue){
         this.isROSNewTripCreated_v = newValue
      }
    }

  },

  mounted(){
      this.log('tripe', this.tripExist);
      this.log('isROSCreated', this.isROSNewTripCreated)
      this.log('y', this.userTrips)
  },

  methods: {
    setnewTripStatus(e){
      this.isROSNewTripCreated = e;
      if(e){
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
        that.ROSNewlyCreatedTrip = _trips
      });
      }
   
    },
    updateView(val) {
      val == -1 ? (this.steps -= 1) : (this.steps = val);
      let element = document.getElementById('stepper-tabs-holder');
      let top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.round(top - 100),
        behavior: 'smooth',
      });
    },
    isStepCompleted(step) {
      if (this.steps > step) {
        return true;
      }
    },

  },
};
</script>
