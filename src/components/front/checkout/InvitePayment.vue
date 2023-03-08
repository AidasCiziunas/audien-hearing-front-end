<template>
  <span style="display: block !important">
    <section class="trip-search-filter">
      <v-container>
        <div class="title-heading box-heading">
          <h1 class="blue-heading">Customer Payment</h1>
        </div>
      </v-container>
    </section>
    <section class="search-results add-travel-sectionTop">
      <v-container>
        <v-row align="center">
          <div class="col-lg-12">
            <div class="search-heading" style="color: #ffffff">
              <!-- <h1 style="color:#ffffff" class="blue-heading">Checkout</h1> -->
            </div>
          </div>
        </v-row>
      </v-container>
    </section>

    <section class="add-travel-section">
      <v-container>
        <v-row class="reversing-here">
          <div class="col-lg-9 col-md-12">
            <!--Inner Structure Starts-->
            <v-form ref="form" class="" lazy-validation>
              <v-row class="mt-0 mb-0">
                <div class="col-md-12">
                  <!-- <div class="left-corner"></div>
                                    <div class="right-corner"></div> -->
                  <div class="add-travel-box-top step2-travel-box">
                    <div class="step2-payment-information">
                      <h3 class="">Payment Information</h3>
                    </div>
                    <div class="step2-travel-box-inner">
                      <div class="travel-box-iner">
                        <v-row class="m-0" v-if="paymentPreferences != ''">
                          <div class="pb-4 ml-3 col-md-12 col-sm-12">
                            <h6>PayTypes Accepted:</h6>

                            <span
                              class="mt-1"
                              style="color: #982727 !important; text-transform: capitalize;"
                            >
                              {{ paymentPreferences }}
                            </span>
                          </div>
                        </v-row>

                        <h4 class="pb-4">Card Holder Information</h4>

                        <div class="payment-info-box mt-5">
                          <v-row class="m-0">
                            <div class="col-md-6 col-sm-6">
                              <div class="add-travel-input">
                                <label>First Name</label>
                                <v-text-field
                                  placeholder="Enter Your First Name"
                                  v-model="cardHolderFirstName"
                                  :rules="[
                                    (v) =>
                                      !!v || 'First name field is required.',
                                  ]"
                                ></v-text-field>
                              </div>
                            </div>

                            <div class="col-md-6 col-sm-6">
                              <div class="add-travel-input">
                                <label>Last Name</label>
                                <v-text-field
                                  placeholder="Enter Your Last Name"
                                  v-model="cardHolderLasttName"
                                  :rules="[
                                    (v) =>
                                      !!v || 'Last name field is required.',
                                  ]"
                                ></v-text-field>
                              </div>
                            </div>

                            <div class="col-md-6 col-sm-6">
                              <div class="add-travel-input">
                                <label>Email</label>
                                <v-text-field
                                  placeholder="Enter Your Email"
                                  v-model="cardHolderEmail"
                                  :rules="[
                                    (v) => !!v || 'Email field is required.',
                                    (v) =>
                                      /.+@.+/.test(v) || 'Email must be valid',
                                  ]"
                                ></v-text-field>
                              </div>
                            </div>

                            <div class="col-md-6 col-sm-6">
                              <label>Mobile Phone Number</label>
                              <div
                                class="add-travel-input mobile-feild-styling"
                              >
                                <phone-num-select
                                  v-model="mobile"
                                  label="Mobile Number"
                                  :phoneDetails="false"
                                />
                              </div>
                            </div>

                            <div class="col-md-6 col-sm-6">
                              <div class="add-travel-input">
                                <label>Street Address</label>
                                <v-text-field
                                  placeholder="Enter Your Street Address"
                                  height="40"
                                  v-model="cardHolderAddress"
                                  :rules="[
                                    (v) =>
                                      !!v ||
                                      'Street Address field is required.',
                                    (v) =>
                                      (v && v.length >= 10) ||
                                      'Street Address must have atleast 10 characters',
                                    (v) => (v && v.length <= 30) || 'Address maximum 30 characters allowed'
                                  ]"
                                ></v-text-field>
                              </div>
                            </div>

                            <div class="col-md-6 col-sm-6">
                              <div class="add-travel-input">
                                <label>Country</label>
                                <country-select
                                  v-model="country"
                                  :updateValue="country"
                                />
                              </div>
                            </div>

                            <!-- <div
                                                            class="col-md-6 col-sm-6"
                                                        >
                                                            <div
                                                                class="add-travel-input"
                                                            >
                                                                <label
                                                                    >Country code</label
                                                                >
                                                                <v-text-field
                                                                    :hide-details="
                                                                        false
                                                                    "
                                                                    background-color="white"
                                                                    height="40"
                                                                    placeholder="+1"
                                                                    v-model="
                                                                        country
                                                                    "
                                                                    :rules="[
                                                                        v =>
                                                                            !!v ||
                                                                            'Country code is required.',

                                                                    ]"
                                                            ></v-text-field>
                                                            </div>
                                                        </div> -->

                            <div class="col-md-6 col-sm-6">
                              <div class="add-travel-input">
                                <label>City</label>
                                <v-text-field
                                  :hide-details="false"
                                  background-color="white"
                                  placeholder="City"
                                  v-model="city"
                                  height="40"
                                  :rules="[(v) => !!v || 'City is required.']"
                                ></v-text-field>
                              </div>
                            </div>

                            <div class="col-md-6 col-sm-6">
                              <div class="add-travel-input">
                                <label>State</label>
                                <region-select
                                  v-model="state"
                                  :country="country"
                                  :rules="[
                                    (v) => !!v || 'State field is required.',
                                  ]"
                                />
                              </div>
                            </div>

                            <div class="col-md-6 col-sm-6">
                              <div class="add-travel-input">
                                <label>Zip Code</label>
                                <v-text-field
                                  :hide-details="false"
                                  background-color="white"
                                  height="40"
                                  placeholder="Enter Zip code"
                                  v-model="zip"
                                  :rules="[
                                    (v) => !!v || 'ZIP code is required.',
                                  ]"
                                ></v-text-field>
                              </div>
                            </div>
                          </v-row>
                        </div>
                      </div>
                      <div class="travel-box-iner">
                        <h4 class="pb-4">Card Information</h4>
                        <div class="payment-info-box mt-5">
                          <v-row class="m-0">
                            <div class="col-md-6 col-sm-6">
                              <div class="add-travel-input">
                                <label>Card Number</label>
                                <v-text-field
                                  pattern="[0-9]"
                                  required
                                  v-mask="compMask"
                                  v-model="card"
                                  placeholder="0000-0000-0000-0000"
                                  :rules="[
                                    (v) => !!v || 'Card number is required.',
                                    validateCards,
                                  ]"
                                  @keyup="creditCardInput"
                                  validate-on-blur
                                >
                                </v-text-field>
                                <svg
                                  ref="ccicon"
                                  class="ccicon"
                                  width="750"
                                  height="471"
                                  viewBox="0 0 750 471"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                ></svg>
                              </div>
                            </div>
                            <div class="col-md-6 col-sm-6">
                              <div class="add-travel-input">
                                <label>Expiry Date</label>
                                <div class="flex-here">
                                  <v-text-field
                                    pattern="[0-9]"
                                    required
                                    v-mask="expMask"
                                    v-model="expDate"
                                    placeholder="mm/yy"
                                    :rules="[
                                      (v) => !!v || 'Expiry date is required.',
                                      validateExpiryDate,
                                    ]"
                                    @keyup="creditExpiryInput"
                                  >
                                  </v-text-field>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6 col-sm-6">
                              <div class="add-travel-input">
                                <label>CVV</label>
                                <v-text-field
                                  v-model="csv"
                                  placeholder="***"
                                  :rules="[
                                    (v) => !!v || 'CVV field is required.',
                                    validateCsv,
                                  ]"
                                >
                                </v-text-field>
                              </div>
                            </div>
                          </v-row>
                        </div>
                      </div>

                      <div class="travel-box-button">
                        <div class="form-checkBox">
                          <!-- <div
                                                        class=""
                                                        style="text-align: right; float: right; width: 100%;font-weight:600;"
                                                    >
                                                        Trip Total Amount:
                                                        {{ currencySymbol
                                                        }}{{
                                                            TotalAmount==0.00 ? getTotalTripAmount : TotalAmount
                                                        }}
                                                    </div> -->
                        </div>

                        <div class="form-checkBox">
                          <div class="form-checkBox">
                            
                            <v-btn class="error" 
                            @click="SaveUserInfor"
                            :disabled="disableProceedBtn || disableProceedBtnViaCall">
                              Book Now
                            </v-btn>

                          </div>
                        </div>
                      </div>


                      <div v-show="disableProceedBtn && errorMessage!=''">
                          <div class="setmargin col-md-12" style="margin-top: 10px; padding-left: 0px!important;">
                              <v-alert
                                  dense
                                  prominent
                                  outlined
                                  type="error"
                              >
                                  {{ errorMessage }}
                              </v-alert>
                          </div>
                      </div>
                    </div>

                  </div>

                </div>

               

              </v-row>

            </v-form>

            <!--Inner Structure Ends-->
          </div>

          <trip-summary v-if="compDisplaySummary"/>

        </v-row>

        <spreedly-s-c-a
          v-if="ShowSpreedlySCAAuthentication"
          :currency="SpreedlySCACurrency"
          :amount="SpreedlySCAAmount"
          :payment-method-token="PaymentMethodToken"
          :id-of-trip="tripIdOfSpreedly"
          :invitedBearerToken="spreedlyBearerToken"
          :engineSCA="itemEngineInSCA"
          @action-succeeded="scaSuccess"
          @action-finalization-timeout="scaFailed"
          @action-error="scaError"
          @ds-message="scaMessage"
          @browser-info="scaBrowserInfo"
        ></spreedly-s-c-a>

      </v-container>
    </section>
  </span>
</template>
<script>
import * as dataKey from '@/services/data/dsources.js';
import * as cardIcons from '@/services/data/creditcards.js';
import CustomerTripSummary from '@/components/common/widgets/CustomerTripSummary.vue';
import InvitationServices from '@/services/api/Invitation';
import * as widgetCountries from '@/services/data/countryregion.js';
import { evBus } from '@/services/bus.js';
import CountrySelect from '@/components/common/widgets/CountrySelect.vue';
import RegionSelect from '@/components/common/widgets/RegionSelect.vue';
import PhoneNumSelect from '../../common/widgets/PhoneNumSelect.vue';
import tripServices from '@/services/api/Trips';
import TripSummary from '@/components/common/widgets/TripSummary.vue';
import SpreedlySCA from '@/components/common/widgets/SpreedlySCA';
import axios from 'axios';

export default {
  name: 'PaymentInfo',
  data() {
    return {
      card: null, // card number
      cardName: null, // card name
      cardHolderFirstName: null,
      cardHolderLasttName: null,
      cardHolderEmail: null,
      cardHolderAddress: null,
      cardHolderAddressTwo: null,
      compMask: '#### #### #### ####',
      expMask: '##/##',
      csv: null,
      expMon: null,
      expYer: null,
      expDate: null,
      mobile: null,
      premobileval: null,
      validCardLength: null,
      validCsvLength: null,
      cardMasks: [],
      displayExpMon: [],
      displayExpYrs: [],
      attrs: null,
      expRules: [(v) => !!v || 'Required'],
      country: null,
      state: null,
      city: null,
      zip: null,
      scountry: null,
      sstate: null,
      scity: null,
      szip: null,
      Usertoken: null,
      Querytoken: null,
      email: null,
      allowCardType: [],
      tripId: 0,
      paymentPreferences: '',
      disableProceedBtn: false,
      errorMessage: '',
      kount_ris_session_id: Math.random().toString(36).substr(2, 33),
      accountId: '604140',
      selectedCardType: false,
      displaySummary: false,
      ShowSpreedlySCAAuthentication: false,
      spreedlyBearerToken: false,
      tripIdOfSpreedly: 0,
      sca_auth_token: '',
      SpreedlySCACurrency: 'USD',
      SpreedlySCAAmount: 1,
      callInProcess: false,
      errors: [],
      disableProceedBtnViaCall: false,
      itemEngineInSCA: 'flight'
    };
  },

  components: {
    SpreedlySCA,
    CustomerTripSummary,
    CountrySelect,
    RegionSelect,
    PhoneNumSelect,
    TripSummary,
  },
  created: function () {
    evBus.$on('expireItem', (status) => {
    
      if (this.callInProcess == false) 
        this.disableProceedBtn = status;
    });

    if (
      this.$store.state.cartStore.lastBulkOf == 'trip' &&
      process.env.VUE_APP_ALLOW_INVITE == 'true'
    )
      this.displayTripTravelers = true;
  },
  mounted: function () {

    this.cardMasks = dataKey.creditCards;
    this.displayExpMon = dataKey.months;
    this.displayExpYrs = dataKey.Fyears;

    let _invToken = this.$store.getters.inviteToken;
    let _userRole = this.signedUserRole;

    let _domain = process.env.VUE_APP_DOMAIN;

    if (_domain == 'com') {
      // this.country = 'US';
      this.country = 'United States';
    } else if (_domain == 'uk') {
      // this.country = 'GB';
      this.country = 'United Kingdom';
    } else if (_domain == 'mx') {
      // this.country == 'MX';
      this.country = 'Mexico';
    } else {
      // this.country = _domain.toUpperCase();
      this.country = _domain.toUpperCase();
    }

    this.getInviteToken();
  },
  computed: {
    signedUserDetails() {
      return this.$store.getters.signedUserDetails;
    },
    compDisplaySummary() {

      return this.displaySummary;
    },
    bookingItem() {

      let _bookingItems = this.doCleanArray(
        this.$store.getters.tripSummary.trip_bookings
      );

      return _bookingItems;

      // return this.doCleanArray(this.$store.state.cartStore.cartBulk);
    },
  },
  methods: {

      /******************/

    scaSuccess(event) {

      this.$awn.success('Payment information complete..!', {
        labels: { success: event.message },
      });

      //TODO if sca succeeded then submit form
      let paymentInfo = {};
      let expParts = this.expDate.split('/');

      if (this.IsByinvite == false) {
        paymentInfo = {
          card: this.card.replace(/\s+/g, ''),
          csv: this.csv,
          expMonth: expParts[0],
          expYear: expParts[1],
          cardType: this.cardName.toUpperCase(),
        };
      }

      this.doPaymentReq('spreedly');
    },
    scaFailed(event) {

      this.$awn.alert(event.message);

      this.disableProceedBtnViaCall = false;
      this.ShowSpreedlySCAAuthentication = false;
    },
    scaError(event) {

      this.$awn.alert(event.message);
      this.disableProceedBtnViaCall = false;
      this.ShowSpreedlySCAAuthentication = false;
    },
    scaMessage(event) {

      if (event.success)
        this.$awn.success('Payment information complete..!', {
          labels: { success: event.message },
        });
      else this.$awn.alert(event.message);
    },

    scaBrowserInfo(event) {

      if (event.success) {
        this.browserInfo = event.browserInfo;
        this.sca_auth_token = event.sca_authentication_token;
      }
    },

    makeBasicPaymentDetails: function () {
    
      let phone = null;

      if (this.mobile != null) {
        phone = this.mobile.match(/\d/g);
        phone = phone.join('');
      }

      let stats = widgetCountries.countries.find(
        ({ countryName }) => countryName === this.country
      ).regions;

      let stateCode = '';

      if (this.state)
        stateCode = stats.find(({ name }) => name === this.state).shortCode;

      let _basicPaymentData = {
        firstName: this.cardHolderFirstName,
        lastName: this.cardHolderLastName,
        address: this.cardHolderAddress,
        address2: '',
        city: this.city,
        state: this.state,
        stateCode: stateCode,
        zip: this.zip,
        country: this.country,
        countryCode: this.countryCode,
        email: this.cardHolderEmail,
        phoneNumber: phone,
      };

      return _basicPaymentData;
    },

    /**********************/

    getInviteToken: function () {

      let token = this.$route.query.token;
      this.Querytoken = token;

      this.carSearchId = this.$route.query.searchId;

      let reqPayload = { hash: token };

      InvitationServices.getInviteToken(reqPayload)
        .then(async (rsp) => {

          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {

            this.disableProceedBtn = true;
            this.errorMessage = rsp.data.message;
            return;
          } else if (
            rsp.data.success == false &&
            rsp.data.message != 'Token has expired'
          ) {

            this.disableProceedBtn = true;
            this.errorMessage = rsp.data.message;
            return;

          } else {

            let _cards = rsp.data.data;

            this.tripId = _cards.tripId;
            this.Usertoken = _cards.invitationToken;

            this.getCardPreference(_cards.invitationToken, token);

            await this.getTripByIdInvited(this.tripId, this.Usertoken);

            setTimeout(function(){

             this.displaySummary = true;
              
            }.bind(this), 3000);



            // 
          }
        })
        .catch((err) => {
          // console.log('error in getInviteToken', err);
        });
    },

    getTripByIdInvited: function (tripId, _headerToken) {
  
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

                let _SearchedTripResponse = rsp.data.data[0];

                let storePayload = {
                  name: _SearchedTripResponse.tripName,
                  trv_name: _SearchedTripResponse.triptravellers,
                  trip_id: _SearchedTripResponse.tripId,
                  tripStartDate: _SearchedTripResponse.tripStartDate.substr(0, 10),
                };

                this.$store.dispatch('setTripDetail', { TRIP: storePayload });

                this.setUpTripDetails(rsp.data.data[0], callArea, false);

                resolve('trip_detail_setup');
              }
            })
            .catch((err) => {

                resolve('trip_detail_error', err);    


                this.$sentry.captureException(new Error(err));
                this.$awn.alert('Please try later, server encounter erro...r..!');
            })
            .finally(() => {

                resolve('trip_detail_setup');
                // do some thing here
            });

        });
    },

    makePaymentDetails: function() {

        this.makeCountryCode();

        let phone = null;

        if (this.mobile != null) {

          phone = this.mobile.match(/\d/g);
          phone = phone.join('');
        }

        let expParts = this.expDate.split('/');

        return {
          firstName: this.cardHolderFirstName,
          lastName: this.cardHolderLasttName,
          ccNumber: this.card.replaceAll(/\s/g,''),
          cardCvv: this.csv,
          cardType: this.cardName,
          cardExpireMonth: expParts[0],
          cardExpireYear: '20' + expParts[1],
          type: this.cardName,
          address: this.cardHolderAddress,
          address2: '',
          city: this.city,
          state: this.state,     
          country: this.country,
          countryCode: this.countryCode,
          zip: this.zip,
          phoneNumber: phone,
          email: this.cardHolderEmail,
        };
    },
    
    SaveUserInfor: function () {

      axios.get(
        process.env.VUE_APP_KAPTCHA +
          this.accountId +
          '&s=' +
          this.kount_ris_session_id
      );

      let valid = this.$refs.form.validate();

      if (valid) {

        this.callInProcess = true;
        this.disableProceedBtnViaCall = true;

        this.makeCountryCode();

          let phone = null;

          if (this.mobile != null) {
            phone = this.mobile.match(/\d/g);
            phone = phone.join('');
          }

          let reqHeaders = {
            headers: {
              'Content-Type': 'application/json',
               Authorization: 'Bearer ' + this.Usertoken,
            },
          };
        
        let expParts = this.expDate.split('/');

        if (process.env.VUE_APP_DOMAIN === 'uk') {

          const bookingData = this.bookingItem;

          const PAYMENT_METHOD_PAYLOAD = '/api/trip/savePaymentMethod';


          let ckOneCader = this.$store.getters.ckStepOneCaders[0],
            _paymentDetails = this.makePaymentDetails();

          // CALL TO SAVE PAYMENT
          let reqHeaders = { headers: { 'Content-Type': 'application/json' } };
          let reqDataForm = {};
          let termsAgreed = 1;

          reqDataForm.tripId = this.tripId.toString();
          reqDataForm.bookVia = 'trip';
          reqDataForm.paymentDetails = _paymentDetails;
          reqDataForm.termsAccepted = termsAgreed;
          reqDataForm.isInvitedCustomer = true;

          reqDataForm.device_data = {
            device_session_id: this.kount_ris_session_id,
            fraud_merchant_id: this.accountId,
          };

          const flights = bookingData.filter(
            (item) => item.engine === 'flight' || item.engine === 'hotel' || item.engine === 'activity'
          );

          if (flights.length > 0) {

            let _allowSpreedlyStatuses = ['falsify'];
            let _scaInPrice = 0;

            bookingData.forEach((bookItem) => {

                if (bookItem.engine == 'flight' && bookItem.status != 'booked') {
                 
                  _scaInPrice += parseFloat(bookItem.flightDetails.price);
                  _allowSpreedlyStatuses.push('truly');
                  this.itemEngineInSCA = 'flight';
                }
              
                if (
                  bookItem.engine == 'hotel' && bookItem.hotelDetails.package.rooms[0].isMor=='true' && bookItem.status !='booked'                
                ) {
                  _scaInPrice += parseFloat(bookItem.hotelDetails.package.rooms[0].price.FinalPrice);
                  _allowSpreedlyStatuses.push('truly');
                  this.itemEngineInSCA = 'hotel';
                }


                if (bookItem.engine == 'activity' && bookItem.status != 'booked') {
                 
                  _scaInPrice += parseFloat(bookItem.packagePrice);
                  _allowSpreedlyStatuses.push('truly');
                  this.itemEngineInSCA = 'activity';
                }

            }); // Ends ForEach

            if (_allowSpreedlyStatuses.includes('truly') == false) {
              this.doPaymentReq('nospreedly');
              return false;
            }

            this.SpreedlySCACurrency = this.domainCurrency;
            _scaInPrice = _scaInPrice * 100;
            this.SpreedlySCAAmount = Math.trunc(_scaInPrice);

            let reqHeaders = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.Usertoken, // this.authStore.token,
              },
            };

            axios
              .post(PAYMENT_METHOD_PAYLOAD, reqDataForm, reqHeaders)
              .then((response) => {

                this.PaymentMethodToken = response.data.data.token;
                this.tripIdOfSpreedly = 0;

                if (typeof reqDataForm.tripId != 'undefined')
                  this.tripIdOfSpreedly = reqDataForm.tripId;

                this.ShowSpreedlySCAAuthentication = true;
                this.spreedlyBearerToken = this.Usertoken;
              })
              .catch((error) => {
                this.$awn.alert(error.response.data.message);
              });
          } else {

            this.doPaymentReq('nospreedly');
          }

        } else {

          this.doPaymentReq('nospreedly'); 
        } // Ends IF ELSE

      } // Ends If Valid
    },

    makeCountryCode: function () {
      let _allCountries = widgetCountries.countries;
      let _searchCountry = this.country;

      for (var i = 0; i < _allCountries.length; i++) {
        if (_allCountries[i].countryName == _searchCountry) {
          this.countryCode = _allCountries[i].countryShortCode;
          break;
        }
      } // Ends FOR
    },

    getCardPreference(invToken, tripHash) {

      let inviteDomain = 'us';
      if (process.env.VUE_APP_DOMAIN === 'uk' || process.env.VUE_APP_DOMAIN === 'mx') {
        inviteDomain = process.env.VUE_APP_DOMAIN;
      }

      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + invToken,
        },
      };

      let reqPayLoad = {
        hash: tripHash,
        domain: inviteDomain,
      };

      InvitationServices.getTripPaymentPreference(reqPayLoad, reqHeaders)
        .then((rsp) => {

          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            // this.doPopLogout();
            // return true;

            let _defaultCards = this.doCleanArray(cardIcons.defaultCards);
            this.allowCardType = this.resolveCardNameConvention(_defaultCards);
            this.paymentPreferences = this.allowCardType.join(', ').toString();

          } else {

            if(rsp.data.data.length==0)
              rsp.data.data = this.doCleanArray(cardIcons.defaultCards);

            this.allowCardType = this.resolveCardNameConvention(rsp.data.data);
            this.paymentPreferences = this.allowCardType.join(', ').toString();
          }
        })
        .catch((err) => {

            let _defaultCards = this.doCleanArray(cardIcons.defaultCards).map(value => value.CardType);

            this.allowCardType = this.resolveCardNameConvention(_defaultCards);
            this.paymentPreferences = this.allowCardType.join(', ').toString();
        });
    },

    resolveCardNameConvention: function (_allAvailableCards) {

      let _cardSynonames = [];

      _allAvailableCards = _allAvailableCards.map(element => {

        return element.toLowerCase();
      });

      _allAvailableCards.forEach((cardName) => {

        if (cardName == 'chinaunionpay' || cardName == 'unionpay credit card') _cardSynonames.push('unionpay');

        if (cardName == "diner's club international") _cardSynonames.push('diners');

        if (cardName == 'american express') _cardSynonames.push('americanexpress');

        if (cardName == 'euro') _cardSynonames.push('eurocard');

        if (cardName == 'diners club') _cardSynonames.push('diners');

        if (cardName == 'master card' || cardName == 'MasterCard') _cardSynonames.push('mastercard');

        if (cardName == 'elo creditcard' || cardName == 'elo') _cardSynonames.push('maestro');

        if (cardName == 'VISA') _cardSynonames.push('visa');

        if(cardName == 'euro/mastercard') {

          _cardSynonames.push('eurocard');
          _cardSynonames.push('mastercard');
        }

      });

      // _cardSynonames.push('default');

      _allAvailableCards = _allAvailableCards.concat(_cardSynonames);

      return _allAvailableCards;
    },

    loadCustomerDetails: function () {
      // GRAB STORED DATA

      let userDetails = this.doCleanArray(this.signedUserDetails);
      let _customerInfo = userDetails[0].customer;
      // eslint-disable-next-line no-unused-vars
      let _paymentMethods = userDetails[0].paymentMethods;
      let _tripInfo = userDetails[0].tripInvitation.tripDetails;

      // dispatch customer informations
      this.$store.dispatch('addCustomer', { CUSTOMER: _customerInfo });

      this.populateForm(_customerInfo);
      this.displayTripInfo(_tripInfo[0]);
    },

    populateForm: function (_customerInfo) {
      // set customer info in above form
      this.cardHolderFirstName = _customerInfo.vcFName;
      this.cardHolderLasttName = _customerInfo.vcLName;
      this.cardHolderEmail = _customerInfo.vcEmail;
      this.cardHolderAddress = _customerInfo.vcAddress;
      this.cardHolderAddressTwo = '';

      evBus.$emit('updatePhoneNumber', _customerInfo.vcHPhone);
    },

    displayTripInfo: function (tripDetails) {
      let storePayload = {
        name: tripDetails.tripName,
        trv_name: tripDetails.pTraveler,
        trip_id: tripDetails.tripId,
        tripStartDate: tripDetails.tripStartDate.substr(0, 10),
      };

      this.$store.dispatch('setTripDetail', { TRIP: storePayload });

      this.setUpTripDetails(tripDetails);
    },

    submitForm: function () {

      let valid = this.$refs.form.validate();

      if (valid) {
        let expParts = this.expDate.split('/');

        let paymentInfo = {
          card: this.card.replace(/\s+/g, ''),
          csv: this.csv,
          expMonth: expParts[0],
          expYear: expParts[1],
          cardType: this.cardName.toUpperCase(),
        };

       // this.doPaymentReq(paymentInfo);
      } // Ends IF Validate
    },
    
    doPaymentReq(calledOn) {

      let bookingData = this.bookingItem;

      this.errors = [];
      let that = this;
      let ckOneCader = this.bookingItem, _paymentDetails = this.makePaymentDetails();

      // CALL TO SAVE PAYMENT

      let reqHeaders = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.Usertoken
          }
      };
      let reqDataForm = {};
      let termsAgreed = 1;

      reqDataForm.tripId = this.tripId;
      reqDataForm.bookVia = 'trip';
      reqDataForm.paymentDetails = _paymentDetails;
      reqDataForm.termsAccepted = termsAgreed;
      reqDataForm.device_data = {
        device_session_id: this.kount_ris_session_id,
        fraud_merchant_id: this.accountId,
      };
      reqDataForm.isInvitedCustomer = true;

      // reqDataForm.bookingData = [];

      reqDataForm.paymentDetails.paymentMethodToken = this.PaymentMethodToken;

      reqDataForm.paymentDetails['3dsData'] = [];

      if (calledOn == 'spreedly') {

        let _sscaInPrice = 0,
          inBookingData = this.bookingItem;

        inBookingData.forEach((bookItem) => {

          if (bookItem.engine == 'flight') {

            _sscaInPrice += parseFloat(bookItem.flightDetails.price);
          }

          if (bookItem.engine == 'hotel')
            _sscaInPrice += parseFloat(bookItem.hotelDetails.package.rooms[0].price.FinalPrice);
        }); // Ends ForEach

        _sscaInPrice = _sscaInPrice * 100;
        _sscaInPrice = Math.trunc(_sscaInPrice);

        reqDataForm.paymentDetails['3dsData'] = {
          scaAuthenticationToken: this.sca_auth_token,
          amount: _sscaInPrice,
          currencyCode: this.currencySymbol,
          browserInfo: this.browserInfo,
        };
      } // Ends if called by spreedly

      tripServices
        .checkoutTrip(reqDataForm, reqHeaders)
        .then((rsp) => {
          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            that.doPopLogout();
            return true;
          } else if (
            rsp.data.success == false &&
            (rsp.data.message == 'Unable to create payment method.' ||
              rsp.data.message == 'Unable to authorize credit card.')
          ) {
            // Hotel Test Case 1

            let _errors = rsp.data.errors,
              displayErrors = [];

            displayErrors.push(rsp.data.message);

            this.$awn.alert(displayErrors.toString());

            return false;
          } else if (
            rsp.data.success == false &&
            rsp.data.message == 'SECURITY NOTICE: AIRLINE TICKET LIMIT'
          ) {
            // Flight Test Case 1

            let _errors = rsp.data.errors;
            let displayErrors = [];

            if (Array.isArray(_errors)) {
              _errors.forEach((rError) => {
                let _errorDisplay = rError.ErrorText;

                if (typeof rError.ErrorCode != 'undefined')
                  if (rError.ErrorCode != '')
                    _errorDisplay =
                      _errorDisplay + ' ( ' + rError.ErrorCode + ' )';

                displayErrors.push(_errorDisplay);
              });
            } else {
              displayErrors.push(rsp.data.message);
            } // Ends inner IF

            let errorDisplayText =
              rsp.data.message +
              ' \n ' +
              '<br /><br />' +
              displayErrors.toString();

            this.$awn.alert(errorDisplayText, {
              labels: { error: errorDisplayText },
            });

            return false;
          } else if (
            rsp.data.success == false &&
            rsp.data.message.includes('Unable to get payment preference')
          ) {
            this.$awn.alert(rsp.data.message);
            return false;
          } else if (
            rsp.data.success == false &&
            rsp.data.message.includes(' session has been expired')
          ) {
            this.$awn.alert(rsp.data.message);
            return false;
          } else if (
            rsp.data.success == false &&
            rsp.data.message ==
              'Your credit card payment has been declined and we are unable to process your transaction.'
          ) {
            // Flight Test Case 2

            this.$awn.alert(rsp.data.message);
            return false;
          } else if (
            rsp.data.success == false &&
            rsp.data.message == 'The given data is invalid'
          ) {
            // Flight Test Case 4

            this.$awn.alert(
              'Please make sure all fields are filled in correctly.'
            );
            return false;
          } else if (rsp.data.bookingData != 'undefined') {
            let _cards = rsp.data;

            this.$store.dispatch('addCards', { CARDS: _cards });

            this.booked = true;

            this.$awn.success('Payment information complete..!', {
              labels: { success: 'Payment Added' },
            });

            setTimeout(function () {
                
                this.$router.push({
                  name: 'pay-confirm-trip',
                  params: {
                    id: this.tripId,
                    token: this.Usertoken
                  }
                });

            }.bind(this), 1500);

          } else {
            this.$awn.alert(rsp.data.message);
            return false;
          }
        })
        .catch((err) => {

          that.$sentry.captureException(new Error(err));

          if (err.response.status == 422) {
            this.formSubmitted = true;
            this.errors = err.response.data.errors;
          }
        })
        .finally(() => {
          setTimeout(function () {

            that.callInProcess = false;
            that.disableProceedBtnViaCall = false;
          }, 2000);
        });
    },

    doPaymentReqOLD(cardInfo) {

      let that = this;

      let reqPayload = {
        firstName: this.cardHolderFirstName,
        lastName: this.cardHolderLasttName,
        ccNumber: cardInfo.card,
        cvv: cardInfo.csv,
        cardType: cardInfo.cardType,
        ccExpiredMonth: cardInfo.expMonth,
        ccExpiredYear: '20' + cardInfo.expYear,
        address: this.cardHolderAddress,
        city: this.city,
        zip: this.zip,
        countryCode: this.country,
      };

      this.errors = [];
      let ckOneCader = this.$store.getters.ckStepOneCaders[0],
        _paymentDetails = this.makeBasicPaymentDetails();
      if (this.IsByinvite == false) {
        _paymentDetails.ccNumber = cardInfo.card;
        _paymentDetails.cardCvv = cardInfo.csv;
        _paymentDetails.type = cardInfo.cardType;
        _paymentDetails.cardExpireMonth = cardInfo.expMonth;
        _paymentDetails.cardExpireYear = '20' + cardInfo.expYear;
      }

      // DO A CALL TO SAVE PAYMENT
      let reqHeaders = {
        headers: { 'Content-Type': 'application/json' },
      };

      /*    let reqDataForm = new FormData();

            reqDataForm.append('firstName', reqPayload.firstName);
            reqDataForm.append('lastName', reqPayload.lastName);
            reqDataForm.append('ccNumber', reqPayload.ccNumber);
            reqDataForm.append('cvv', reqPayload.cvv);
            reqDataForm.append('cardType', reqPayload.cardType);
            reqDataForm.append('ccExpiredMonth', reqPayload.ccExpiredMonth);
            reqDataForm.append('ccExpiredYear', reqPayload.ccExpiredYear);
            reqDataForm.append('address', reqPayload.address);
            reqDataForm.append('city', reqPayload.city);
            reqDataForm.append('zip', reqPayload.zip);
            reqDataForm.append('countryCode', reqPayload.countryCode); 
      */

      customerServices
        .savePayment(reqPayload, reqHeaders)
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
            let _cards = rsp.data.data;

            this.$store.dispatch('addCards', { CARDS: _cards });

            this.$awn.success('Credit card detail store successfully..!', {
              labels: { success: 'Card Added' },
            });
          }
        })
        .catch((err) => {
          // console.log('error in savePayment api', err);
        });
    },
    validateCards: function () {

      if (this.card) {
        let _cardNumber = this.card;

        var cardMasks = this.doCleanArray(this.cardMasks);

        var arrayLength = cardMasks.length;

        for (var i = 0; i < arrayLength; i++) {
          let re = new RegExp(cardMasks[i].regex);

          if (_cardNumber.match(re) != null) {
            let mLen = cardMasks[i].mask;

            mLen = mLen.replace(/\s+/g, '');

            cardMasks[i].cardLength = mLen.length;

            this.loadCardInfos(cardMasks[i]);

            break;
          }
        }
        let myCardLen = this.card;
        myCardLen = myCardLen.replace(/\s+/g, '');

        if (!this.disablePaymentCheck) {
          if (!this.allowCardType.includes(this.cardName)) {
            return 'Provided credit card not allowed.';
          }
        }

        if (myCardLen.length != this.validCardLength)
          return 'Please input valid card number.';

        return true;
      }

      return true;
    },
    validateCsv: function () {
      if (this.csv) {
        if (this.csv.length != this.validCsvLength)
          return (
            'Please input valid csv number upto ' +
            this.validCsvLength +
            ' digits.'
          );

        return true;
      }

      return true;
    },
     validateExpiryDate: function () {
      if (this.expDate) {
        if (this.expDate.length < 5) {
          return 'Please input valid expiry date.';
        }

        let expParts = this.expDate.split('/');

        var date = new Date();

        if (date.getFullYear().toString().substr(-2) > expParts[1]) {
          return 'Credit Card is Expired.';
        }

        if (date.getFullYear().toString().substr(-2) == expParts[1]) {
          if (date.getMonth() + 1 > expParts[0]) {
            return 'Credit Card is Expired.';
          }
        }

        if (expParts[0].length < 2 || expParts[0].length < 2) {
          return 'Please input valid expiry date.';
        }

        return true;
      }

      return true;
    },
    creditCardInput: function (event) {
      let _cardNumber = event.target.value;

      var cardMasks = this.doCleanArray(this.cardMasks);

      var arrayLength = cardMasks.length;

      for (var i = 0; i < arrayLength; i++) {
        let re = new RegExp(cardMasks[i].regex);

        if (_cardNumber.match(re) != null) {
          let mLen = cardMasks[i].mask;

          mLen = mLen.replace(/\s+/g, '');

          cardMasks[i].cardLength = mLen.length;

          this.loadCardInfos(cardMasks[i]);

          break;
        }
      }
    },
    creditExpiryInput: function (event) {
      let expiry = event.target.value;

      if (expiry.substring(0, 1) > 1) event.target.value = '';
    },
    loadCardInfos: function (item) {

      $(this.$refs.ccicon).html('');

      switch (item.cardtype) {
        case 'americanexpress':
          $(this.$refs.ccicon).html(cardIcons.amex);
          this.validCsvLength = 4; // amex has 4 digit csv
          this.validCardLength = item.cardLength;
          this.compMask = item.mask;
          this.cardName = 'americanexpress';
          break;
        case 'visa':
          $(this.$refs.ccicon).html(cardIcons.visa);
          this.validCsvLength = 3;
          this.validCardLength = item.cardLength;
          this.compMask = item.mask;
          this.cardName = 'visa';
          break;
        case 'diners':
          $(this.$refs.ccicon).html(cardIcons.diners);
          this.validCsvLength = 3;
          this.validCardLength = item.cardLength;
          this.compMask = item.mask;
          this.cardName = 'diners';
          break;
        case 'discover':
          $(this.$refs.ccicon).html(cardIcons.discover);
          this.validCsvLength = 3;
          this.validCardLength = item.cardLength;
          this.compMask = item.mask;
          this.cardName = 'discover';
          break;
        case 'eurocard':
          $(this.$refs.ccicon).html(cardIcons.generic);
          this.validCsvLength = 3;
          this.validCardLength = item.cardLength;
          this.compMask = item.mask;
          this.cardName = 'eurocard';
          break;
        case 'jcb' || 'jcb15':
          $(this.$refs.ccicon).html(cardIcons.jcb);
          this.validCsvLength = 3;
          this.validCardLength = item.cardLength;
          this.compMask = item.mask;
          this.cardName = 'jcb';
          break;
        case 'maestro':
          $(this.$refs.ccicon).html(cardIcons.maestro);
          this.validCsvLength = 3;
          this.validCardLength = item.cardLength;
          this.compMask = item.mask;
          this.cardName = 'maestro';
          break;
        case 'mastercard':
          $(this.$refs.ccicon).html(cardIcons.mastercard);
          this.validCsvLength = 3;
          this.validCardLength = item.cardLength;
          this.compMask = item.mask;
          this.cardName = 'mastercard';
          break;
        case 'unionpay':
          $(this.$refs.ccicon).html(cardIcons.unionpay);
          this.validCsvLength = 3;
          this.validCardLength = item.cardLength;
          this.compMask = item.mask;
          this.cardName = 'unionpay';
          break;
        case 'eurocard':
          $(this.$refs.ccicon).html(cardIcons.eurocard);
          this.validCsvLength = 3;
          this.validCardLength = item.cardLength;
          this.compMask = item.mask;
          this.cardName = 'eurocard';
          break;
        case 'mir':
          $(this.$refs.ccicon).html(cardIcons.mir);
          this.validCsvLength = 3;
          this.validCardLength = item.cardLength;
          this.compMask = item.mask;
          this.cardName = 'mir';
          break;
        case 'instapayment':
          $(this.$refs.ccicon).html(cardIcons.generic);
          this.validCsvLength = 3;
          this.validCardLength = item.cardLength;
          this.compMask = item.mask;
          this.cardName = 'instapayment';
          break;
        case 'dankort':
          $(this.$refs.ccicon).html(cardIcons.dankort);
          this.validCsvLength = 3;
          this.validCardLength = item.cardLength;
          this.compMask = item.mask;
          this.cardName = 'dankort';
          break;
        case 'unknown':
          $(this.$refs.ccicon).html(cardIcons.unknown);
          this.validCsvLength = 3;
          this.validCardLength = 16;
          this.compMask = item.mask;
          this.cardName = 'default';
          break;
        default:
          $(this.$refs.ccicon).html('');
          this.validCsvLength = 3;
          this.validCardLength = 16;
          this.compMask = item.mask;
          this.cardName = 'default';
          break;
      }
    },
  },
};
</script>
<style scoped>
.ccicon {
  height: 32px;
  position: absolute;
  right: 2px;
  top: calc(48% - 17px);
  width: 60px;
}
</style>
