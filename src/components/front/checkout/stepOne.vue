<template>
  <span style="display: block !important">
    <section class="trip-search-filter">
      <v-container>
        <div class="title-heading">
          <h1 class="blue-heading">Checkout</h1>
        </div>
      </v-container>
    </section>
    <div class="checkout-tep-bg">
      <section class="add-travel-section">
        <v-container>
          <v-row class="reversing-here" style="margin-top: 10px">
            <div class="col-lg-9 col-md-12 col-sm-12">
              <v-row class="mt-0 mb-0">
                <div class="col-md-12 checkout-accordians">
                  <v-expansion-panels
                    v-model="panel"
                    :disabled="false"
                    multiple
                  >
                    <v-expansion-panel
                      expand
                      v-for="(car, ind) in dynamicForms"
                      :key="'checkout' + ind"
                    >
                      <!--For Trip-->
                      <div
                        class="customEngineSelection"
                        v-if="car.engine == 'trip'"
                      >
                        <v-expansion-panel-header>
                          <div class="accordian-header">
                            <div class="in-left" v-if="car.engine == 'trip'">
                              <img
                                :src="
                                  require('@/assets/images/trip-icon-new.png')
                                    .default
                                "
                              />
                            </div>
                            <div class="in-right">
                              <div class="step1-pickup-data">
                                <p>Trip Information</p>
                              </div>
                            </div>
                          </div>
                        </v-expansion-panel-header>

                        <v-expansion-panel-content>
                          <div class="add-travel-box-top step1-add-travel-box">
                            <div class="step2-payment-information">
                              <h3>Trip Information</h3>
                            </div>

                            <div class="travel-box-iner step1-travel-box">
                              <!--main inner form div-->

                              <div class="add-travel-form">
                                <v-form ref="tripForm">
                                  <v-row class="m-0">
                                    <div class="col-md-12 col-sm-12 mt-4">
                                      <div class="add-travel-input">
                                        <v-text-field
                                          label="Trip name"
                                          placeholder="Enter trip name"
                                          name="trip_name"
                                          :label="getCountryDFOnly(tripDate)"
                                          v-model="tripName"
                                          :rules="tripNameRules"
                                          required
                                        ></v-text-field>
                                      </div>
                                    </div>
                                    <!--
                                                                        <div
                                                                            class="col-md-6 col-sm-6"
                                                                        >
                                                                            <v-menu
                                                                                v-model="
                                                                                    menu2
                                                                                "
                                                                                :close-on-content-click="
                                                                                    false
                                                                                "
                                                                                :nudge-right="
                                                                                    50
                                                                                "
                                                                                transition="scale-transition"
                                                                                min-width="290px"
                                                                            >
                                                                                <template
                                                                                    v-slot:activator="{
                                                                                        on,
                                                                                        attrs
                                                                                    }"
                                                                                >
                                                                                    <div
                                                                                        class="add-travel-date"
                                                                                    >
                                                                                        <v-text-field
                                                                                            v-model="
                                                                                                compTripStartDateFormatted
                                                                                            "
                                                                                            readonly
                                                                                            v-bind="
                                                                                                attrs
                                                                                            "
                                                                                            v-on="
                                                                                                on
                                                                                            "
                                                                                            :placeholder="
                                                                                                tripStartdateFormatPlaceHolder
                                                                                            "
                                                                                            :rules="
                                                                                                tripDateRules
                                                                                            "
                                                                                            name="tripDate"
                                                                                            label="Trip creation date"
                                                                                        >
                                                                                        </v-text-field>
                                                                                    </div>
                                                                                </template>
                                                                                <v-date-picker
                                                                                    v-model="
                                                                                        date2
                                                                                    "
                                                                                    :min="
                                                                                        minTripStartDate
                                                                                    "
                                                                                    @input="
                                                                                        menu2 = false
                                                                                    "
                                                                                    no-title
                                                                                >
                                                                                </v-date-picker>
                                                                            </v-menu>
                                                                        </div>
                                                                        -->

                                    <div
                                      class="col-md-12 col-sm-12 mb-10 text-center"
                                    >
                                      <v-btn
                                        color="error"
                                        @click="saveTripForm()"
                                        style="color: #fff !important"
                                      >
                                        <img
                                          src="@/assets/images/save-trip-icon.png"
                                          class="mr-2"
                                          width="20px"
                                          alt="img"
                                        />
                                        Update Trip
                                      </v-btn>
                                    </div>
                                  </v-row>
                                </v-form>
                              </div>
                            </div>
                            <!--main inner form div-->
                          </div>
                          <!--main outer div-->
                        </v-expansion-panel-content>
                      </div>
                      <!--For Trip Ends-->

                      <!--For Cars-->
                      <div
                        class="customEngineSelection"
                        v-if="car.engine == 'car'"
                      >
                        <carTravellerForm
                          :ref="'trvSubForm_99' + ind"
                          :ind="ind"
                          :car="car"
                          :doOpenTerms="doOpenTerms"
                          :makeCardInfo="makeCardInfo"
                          :saveTravelerByCk="saveTravelerByCk"
                          :makePrimaryTraveler="makePrimaryTraveler"
                          :CheckvalidEmail="CheckvalidEmail"
                          :populateTravelerFormBySrch="
                            populateTravelerFormBySrch
                          "
                          :populateTravelerFormByTraveler="
                            populateTravelerFormByTraveler
                          "
                          :filterTravelers="filterTravelers"
                          :filterByUserType="filterByUserType"
                          :checkOutType="checkOutType"
                          :dobUpdate="dobUpdate"
                          :tripTravellers="travellersOfTrip"
                          :saveTravelerByCkInGroup="saveTravelerByCkInGroup"
                        />
                      </div>
                      <!--For Cars Ends-->

                      <!--For Flights-->
                      <div
                        class="customEngineSelection"
                        v-if="car.engine == 'flight'"
                      >
                        <flightTravellerForm
                          :ref="'trvSubForm_99' + ind"
                          :ind="ind"
                          :car="car"
                          :doOpenTerms="doOpenTerms"
                          :makeCardInfo="makeCardInfo"
                          :copyTrip="copyTrip"
                          :saveTravelerByCk="saveTravelerByCk"
                          :makePrimaryTraveler="makePrimaryTraveler"
                          :CheckvalidEmail="CheckvalidEmail"
                          :populateTravelerFormBySrch="
                            populateTravelerFormBySrch
                          "
                          :populateTravelerFormByTraveler="
                            populateTravelerFormByTraveler
                          "
                          :filterTravelers="filterTravelers"
                          :filterByUserType="filterByUserType"
                          :checkOutType="checkOutType"
                          :dobFlightUpdate="dobFlightUpdate"
                          :expiryDateRules="expiryDateRules"
                          :expiryUpdate="expiryUpdate"
                          :tripTravellers="travellersOfTrip"
                          :saveTravelerByCkInGroup="saveTravelerByCkInGroup"
                        />
                      </div>
                      <!--For Flights Ends-->

                      <!--For Hotel-->
                      <div
                        class="customEngineSelection"
                        v-if="car.engine == 'hotel'"
                      >
                        <hotelTravellerForm
                          :ref="'trvSubForm_99' + ind"
                          :ind="ind"
                          :car="car"
                          :doOpenTerms="doOpenTerms"
                          :makeCardInfo="makeCardInfo"
                          :saveTravelerByCk="saveTravelerByCk"
                          :makePrimaryTraveler="makePrimaryTraveler"
                          :CheckvalidEmail="CheckvalidEmail"
                          :populateTravelerFormBySrch="
                            populateTravelerFormBySrch
                          "
                          :populateTravelerFormByTraveler="
                            populateTravelerFormByTraveler
                          "
                          :filterTravelers="filterTravelers"
                          :filterByUserType="filterByUserType"
                          :checkOutType="checkOutType"
                          :dobFlightUpdate="dobFlightUpdate"
                          :expiryDateRules="expiryDateRules"
                          :expiryUpdate="expiryUpdate"
                          :tripTravellers="travellersOfTrip"
                          :saveTravelerByCkInGroup="saveTravelerByCkInGroup"
                        />
                      </div>
                      <!--For Hotel Ends-->

                      <!--For Villa-->
                      <div
                        class="customEngineSelection"
                        v-if="car.engine == 'villa'"
                      >
                        <villaTravellerForm
                          :ref="'trvSubForm_99' + ind"
                          :ind="ind"
                          :car="car"
                          :doOpenTerms="doOpenTerms"
                          :makeCardInfo="makeCardInfo"
                          :saveTravelerByCk="saveTravelerByCk"
                          :makePrimaryTraveler="makePrimaryTraveler"
                          :CheckvalidEmail="CheckvalidEmail"
                          :populateTravelerFormBySrch="
                            populateTravelerFormBySrch
                          "
                          :populateTravelerFormByTraveler="
                            populateTravelerFormByTraveler
                          "
                          :filterTravelers="filterTravelers"
                          :checkOutType="checkOutType"
                          :dobFlightUpdate="dobFlightUpdate"
                          :dobUpdate="dobUpdate"
                          :tripTravellers="travellersOfTrip"
                          :saveTravelerByCkInGroup="saveTravelerByCkInGroup"
                        />
                      </div>
                      <!--For Villa Ends-->

                      <!--For Activity-->
                      <div
                        class="customEngineSelection"
                        v-if="car.engine == 'activity'"
                      >
                        <activityTravellerForm
                          :ref="'trvSubForm_99' + ind"
                          :ind="ind"
                          :car="car"
                          :doOpenTerms="doOpenTerms"
                          :makeCardInfo="makeCardInfo"
                          :saveTravelerByCk="saveTravelerByCk"
                          :makePrimaryTraveler="makePrimaryTraveler"
                          :CheckvalidEmail="CheckvalidEmail"
                          :populateTravelerFormBySrch="
                            populateTravelerFormBySrch
                          "
                          :populateTravelerFormByTraveler="
                            populateTravelerFormByTraveler
                          "
                          :filterTravelers="filterTravelers"
                          :checkOutType="checkOutType"
                          :dobFlightUpdate="dobFlightUpdate"
                          :dobUpdate="dobUpdate"
                          :tripTravellers="travellersOfTrip"
                          :saveTravelerByCkInGroup="saveTravelerByCkInGroup"
                        />
                      </div>
                      <!--For Activity Ends-->
                    </v-expansion-panel>
                  </v-expansion-panels>

                  <div class="travel-box-button" style="">
                    <div class="form-checkBox">
                      <div class="setmargin blackwido">
                        <v-btn
                          color="primary mb-5"
                          dark
                          @click="doMoveToBack()"
                        >
                          Back
                        </v-btn>
                      
                        <v-btn
                          class="error mb-5 checkout-one-submit"
                          @click="submitForm()"
                          :disabled="
                            disableProceedBtn || emailDupplication.length>0 ||
                            (bookingExist == false && lastCartMode == 'trip')
                          "
                        >
                          Proceed To Payment
                        </v-btn>
                      </div>
                    </div>
                  </div>

                  <div
                    class="travel-box-button"
                    style=""
                    v-if="disableProceedBtn"
                  >
                    <div class="form-checkBox">
                      <div class="setmargin blackwido">
                        <v-alert dense outlined prominent type="error">
                          Please refresh your expired items in the right side
                          Trip Itinerary box by clicking "Update" to enable the
                          Proceed to Payment button.
                        </v-alert>
                      </div>
                    </div>
                  </div>
                </div>
              </v-row>
            </div>

            <direct-summary v-if="lastCartMode == 'direct'" />

            <trip-summary data="step" v-if="lastCartMode == 'trip'" />
          </v-row>
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
                <v-col class="col-sm-1" style="max-width: fit-content">
                  <img
                  v-if="domain == 'uk'"
                  :src="require('@/assets/images/atol-warning.jpg').default"
                    style="max-width: 65px; max-height: 90px"
                  />
                  <img
                  v-if="domain == 'ie'"
                  :src="require('@/assets/images/topps.jpg').default"
                    style="width: 60px; height: 30px"
                  />
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
      </section>
    </div>
    <!--last div-->
  </span>
</template>
<style>
.uk-flight-alert {
  top: 15px;
  font-size: 30px;
  overflow: auto;
}
</style>
<script>
import { mapState, mapGetters } from 'vuex';
import tripServices from '@/services/api/Trips';
import travellerServices from '@/services/api/Travellers';
import DirectSummary from '@/components/common/widgets/DirectSummary.vue';
import TripSummary from '@/components/common/widgets/TripSummary.vue';
import * as widgetCountries from '@/services/data/countryregion.js';
import carTravellerForm from '@/components/front/checkout/forms/carTraveller.vue';
import flightTravellerForm from '@/components/front/checkout/forms/flightTraveller.vue';
import hotelTravellerForm from '@/components/front/checkout/forms/hotelTraveller.vue';
import villaTravellerForm from '@/components/front/checkout/forms/villaTraveller.vue';
import activityTravellerForm from '@/components/front/checkout/forms/activityTraveller.vue';
import { evBus } from '@/services/bus.js';
import { exit } from 'process';
var moment = require('moment');

export default {
  name: 'StepOne',
  components: {
    DirectSummary,
    TripSummary,
    carTravellerForm,
    flightTravellerForm,
    hotelTravellerForm,
    villaTravellerForm,
    activityTravellerForm,
  },
  data() {
    return {
      domain: '',
      activityExtraDetails: {},
      ukAlertATOL: false,
      isFormValid: true,
      displayFormTitle: 'Traveler',
      multiDriverFlag: true,
      isPassportNeeded: true,
      panel: [0],
      checkAgree: true,
      disableProceedBtn: false,
      emailDupplication:[],
      checkOutType: this.$store.getters.cartType, // direct or trip
      travellerCards: [],
      trip_id: null,
      hasEarlyReturn: false,
      dynamicForms: [],
      maxPickStartDate: this.formattedDate(new Date(), 'YYYY-MM-DD'),
      dateFormatPlaceHolder: this.$store.state.envStore.countryDF,
      iTraveler: {
        showFormForcely: false,
        bookingId: null,
        travellerId: null,
        saluation: '',
        checked: true,
        ckBoxChecked: false,
        ckBoxCardInfo: false,
        ckBoxSaveTraveler: false,
        ckBoxSaveTravelerError: [],
        ckBoxSaveTravelerReadOnly: false,
        isPrimary: false,
        firstName: null,
        middleName: null,
        lastName: null,
        regemail: null,
        regmobile: '',
        areaCode: '1',
        regmobileMeta: {},
        premobileval: null,
        defaultCountry: this.defaultCountry,
        date1: this.formattedDate(moment().subtract(1, 'days'), 'YYYY-MM-DD'),
        defaultDOB: this.formattedDate(moment().subtract(1, 'days'), 'YYYY-MM-DD'),
        menu1: false,
        passport: null,
        passportExpiry: this.formattedDate(new Date(), 'YYYY-MM-DD'),
        frequentFlyer: '',
        frequentFlyerNo: '',
        address: null,
        country: '',
        city: '',
        state: '',
        zip: '',
        pTravelers: [],
        pTravelersTitle: '',
        pTravelersLabel: '',
        pTravelersVal: 0,
        gender: null,
      },
      birthDateRules: [
        (v) => !!v || 'Birth date is required',
        (v) => v || (v && v.length >= 10) || 'yes',
      ],
      expiryDateRules: [
        (v) => !!v || 'Passport expiry date is required',
        (v) => v || (v && v.length >= 10) || 'yes',
      ],
      addressRules: [
        (v) => !!v || 'Address is required',
        (v) =>
          (v && v.length >= 10) || 'Address must have atleast 10 characters',
      ],

      /****trip related data settings****/
      date2: null,
      menu2: false,
      minTripStartDate: this.formattedDate(new Date(), 'YYYY-MM-DD'),
      tripNameRules: [
        (v) => !!v || 'Trip name is required',
        (v) =>
          (v && v.length >= 3) || 'Trip name must have atleast 3 characters',
      ],
      tripDateRules: [(v) => !!v || 'Trip Start Date is required'],
      tripStartdateFormatPlaceHolder: 'Please select trip start date',
      /****mobile widget****/
      validNumber: false,
      showMobileDetails: false,
      premobileval: null,
      country: '',
      defaultCountry: '',
      tripDate: '',
      phone: {
        countryCode: '',
        isValid: false,
        phoneNumber: '',
        countryCallingCode: '',
        formattedNumber: '',
        nationalNumber: '',
        formatInternational: '',
        formatNational: '',
        uri: '',
        e164: '',
      },
      preferredCountries: ['US', 'GB', 'MX'],
      defCountryInDropDown: null,
      formIndexInProcess: 0,
    };
  },
  mounted() {
    this.domain = this.$store.state.envStore.domain;
    this.scrollToElement();

    if (process.env.VUE_APP_DOMAIN == 'uk' || process.env.VUE_APP_DOMAIN == 'ie') this.ukAlertATOL = true;

    let _domain = this.$store.state.envStore.domain;

    if (_domain == 'us') {
      this.defaultCountry = 'US';
      this.defCountryInDropDown = 'United States';
    } else if (_domain == 'uk') {
      this.defaultCountry = 'GB';
      this.defCountryInDropDown = 'United Kingdom';
    } else if (_domain == 'mx') {
      this.defaultCountry == 'MX';
      this.defCountryInDropDown = 'Mexico';
    } else {
      this.defaultCountry = _domain.toUpperCase();
      this.defCountryInDropDown = _domain.toUpperCase();
    }

    this.checkoutStepTwoDefCountry = '';
  },
  created: function () {
    this.trips.forEach( (booking)=> {
      if (booking.engine == 'hotel') {
        console.log(
          'SessionId: ' +
            booking.details.searchData.sessionId +
            ' - Room Name: ' +
            booking.hotelDetails.package.rooms[0].roomName +
            ' -  Supplier Name: ' +
            booking.hotelDetails.package
            ? this.encodeSuppliers(booking.hotelDetails.package.providerId)
            : ''
        );
      }
    });

    if (this.checkOutType == 'trip') {
      if (
        this.tripSummary.trip_name != '' &&
        this.tripSummary.trip_from_time != ''
      ) {
        this.panel = [1];
      }

      this.setUpTripForm();
    }

    if (this.focusedEngine == 'car' || this.focusedEngine == 'hotel') {
      this.displayFormTitle = 'driver';
      this.multiDriverFlag = false;
      this.isPassportNeeded = false;
    }

    this.trip_id = this.tripDetail.trip_id;
    this.bookingItems; // needs to init process in computed property, d`nt remove it
    this.travellersOfTrip; // needs to init process in computed property, d`nt remove it

    evBus.$on('phoneDetails', (mobileDeepObj) => {

      this.setAreaCodeFltPsngr(mobileDeepObj);
    });

    evBus.$on('expireItem', (status) => {
      this.disableProceedBtn = status;
    });

    evBus.$on('removedItemOfTrip', (itemId) => {
      this.removeFormOfDeletedItem(itemId);
    });
  },
  methods: {
    encodeSuppliers(supplierId){
     let code ='';
     if(supplierId == 'it-agoda-live' || supplierId == 'it-agoda-test'){
      code = 'AGO298';
     }
     else if(supplierId == 'it-bookingcom-live' || supplierId == 'it-bookingCom-test-latest' || supplierId == 'it-bookingcom-dev'){
       code ='BKN212';
     }
     else if(supplierId =='it-ean-b2b-live' || supplierId == 'it-eanb2b-test'){
      code = 'EPS751';
     }
     else if(supplierId == 'it-hotelbeds-live' || supplierId == 'it-hotelbeds-uk-live' || supplierId == 'it-hotelbeds-us-live'){
      code = 'HBS421';
     }
     else if(supplierId == 'it-hoteldo-test' || supplierId == 'it-hoteldo-live'){
      code = 'HDS111';
     }
     else if(supplierId == 'it-ppn8114-live' || supplierId == 'it-ppn8114-test'){
      code = 'PLG114';
     }
     else if(supplierId == 'it-ppn8940-live' || supplierId == 'it-ppn8940-test'){
      code = 'PLC940';

     }
     else{
      code = '';
     }
     
     return code;
    },
    copyTrip(type, carId, trvInd, objTraveler, index) {
      let traveler = this.dynamicForms[index].traveler;

      this.dynamicForms.forEach((item) => {
        item.traveler = traveler;
      });
    },
    removeFormOfDeletedItem(itemId) {
      let index = this.dynamicForms.length - 1;

      while (index >= 0) {
        if (this.dynamicForms[index].engine == 'car')
          if (this.dynamicForms[index].item.bookingId === itemId) {
            this.dynamicForms.splice(index, 1);
          }

        if (
          this.dynamicForms[index].engine == 'flight' ||
          this.dynamicForms[index].engine == 'hotel'
        )
          if (this.dynamicForms[index].item.id === itemId) {
            this.dynamicForms.splice(index, 1);
          }

        index -= 1;
      }
    },
    setUpTripForm() {
      let _tripAccordionInfo = {
        engine: 'trip',
        item: '',
      };
         if(this.tripSummary.trip_name){
      let strArr = this.tripSummary.trip_name.split('-');

      this.tripName = strArr[0] + strArr.pop();

      this.tripDate = this.tripSummary.trip_name.split('-').pop();

      this.date2 = this.tripSummary.trip_from_time;

      if (this.date2 == '' || this.date2 == null)
        this.date2 = new Date().toISOString().substr(0, 10);

      this.dynamicForms.push(_tripAccordionInfo);
         }

      /*

            let strArr = this.tripSummary.trip_name.split('-');

            let makeTripName = this.makeTripDisplayName(this.tripSummary.trip_name);
            // strArr[0] + this.getCountryDFOnly(strArr[1]);
            
            this.tripName = makeTripName.replace(/- /g,'');

            this.tripDate =  this.tripSummary.trip_name.split('-').pop();
            */
    },
    saveTripForm() {
      if (!this.$refs.tripForm[0].validate()) return false;

      let storePayload = { tripName: this.tripName, pTraveler: '' };

      let _startDateOfTrip = ''; // this.compTripStartDateFormatted;

      /*
                _startDateOfTrip = moment(
                    _startDateOfTrip,
                    this.$store.state.envStore.DFormat
                ).unix();
                _startDateOfTrip = moment(_startDateOfTrip, 'X').format(
                    'YYYY-MM-DD'
                );
            */

      let saveTripPayLoad = {
        tripId: this.tripSummary.trip_id,
        tripName: this.tripName,
        // tripStartDate: _startDateOfTrip
      };

      let reqHeaders = {
        headers: { 'Content-Type': 'application/json' },
      };

      var reqDataForm = new FormData();

      this.appendFormdata(reqDataForm, saveTripPayLoad);

      tripServices
        .updateTrip(reqDataForm, reqHeaders)
        .then((rsp) => {
          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            this.doPopLogout();
            return true;
          } else {
            storePayload.tripId = this.tripSummary.trip_id;
            storePayload.tripStartDate = rsp.data.data.tripStartDate;
            storePayload.primaryTravellerId = rsp.data.data.primaryTravellerId;

            this.saveNavTripInfo(storePayload);

            this.doClosePop();

            this.$awn.success('Trip has updated successfully..!', {
              labels: { success: 'Trip Information Updated' },
            });
          } // ENDS IF ELSE
        })
        .catch((error) => {
          this.$awn.alert('Please try later, trip cannot be updated..!');
          this.doClosePop();
        })
        .finally(() => {
          // do some thing here
        });
    },
    saveNavTripInfo: function (tripNavInfo) {
      let storePayload = {
        name: tripNavInfo.tripName,
        trv_name: tripNavInfo.pTraveler,
        trip_id: tripNavInfo.tripId,
        primaryTravellerId: tripNavInfo.primaryTravellerId,
        tripStartDate: tripNavInfo.tripStartDate.substr(0, 10),
      };

      this.$store.dispatch('setTripDetail', { TRIP: storePayload });

      this.getTripById(tripNavInfo.tripId);
    },
    setAreaCodeFltPsngr: function (phoneDetail) {

      let parentIndex =
        phoneDetail && phoneDetail.parentFormIndex == ''
          ? 0
          : phoneDetail.parentFormIndex;

      let subFormIndex =
        phoneDetail && phoneDetail.subFormIndex == ''
          ? 0
          : phoneDetail.subFormIndex;

      if (this.dynamicForms[parentIndex].traveler) {
        this.dynamicForms[parentIndex].traveler[subFormIndex].areaCode =
          phoneDetail.countryCallingCode;

        this.dynamicForms[parentIndex].traveler[subFormIndex].defaultCountry =
          phoneDetail.countryCode;
      }
    },
    populateTravelerFormBySrch: function (event, user, index, trvFormIndex) {
      let that = this,
        _bDate = user.dBirthDate;

      if (_bDate != null) _bDate = user.dBirthDate.substr(0, 10);

      that.dynamicForms[index].traveler[
        trvFormIndex
      ].searchTravelers.loading = false;
      that.dynamicForms[index].traveler[trvFormIndex].address = user.vcAddress;
      that.dynamicForms[index].traveler[trvFormIndex].bookingId = '';
      that.dynamicForms[index].traveler[trvFormIndex].checked = '';
      that.dynamicForms[index].traveler[trvFormIndex].city = user.vcCity;
      that.dynamicForms[index].traveler[trvFormIndex].ckBoxChecked = '';
      that.dynamicForms[index].traveler[trvFormIndex].defaultDOB = _bDate;
      that.dynamicForms[index].traveler[trvFormIndex].date1 = _bDate;
      that.dynamicForms[index].traveler[trvFormIndex].firstName = user.vcFName;
      that.dynamicForms[index].traveler[trvFormIndex].lastName = user.vcLName;
      that.dynamicForms[index].traveler[trvFormIndex].menu1 = '';
      that.dynamicForms[index].traveler[trvFormIndex].middleName = '';
      that.dynamicForms[index].traveler[trvFormIndex].passport = user.passport;
      that.dynamicForms[index].traveler[trvFormIndex].regmobile = user.vcHPhone;
      that.dynamicForms[index].traveler[trvFormIndex].regemail = user.vcEmail;
      that.dynamicForms[index].traveler[trvFormIndex].regmobileMeta = '';
      that.dynamicForms[index].traveler[trvFormIndex].saluation = 'Mr.';
      that.dynamicForms[index].traveler[trvFormIndex].state = user.vcState;
      that.dynamicForms[index].traveler[trvFormIndex].travellerId =
        user.iUserID;
      that.dynamicForms[index].traveler[trvFormIndex].zip = user.vcZip;
      that.dynamicForms[index].traveler[trvFormIndex].showFormForcely = true;

      if (typeof user.passportExpiry != 'undefined') {
        if (user.passportExpiry != null) {
          let _dopasport = user.passportExpiry;
          _dopasport = user.passportExpiry.substr(0, 10);

          that.dynamicForms[index].traveler[trvFormIndex].passportExpiry =
            _dopasport;
        }
      }

      if (typeof user.vcSalutation != 'undefined')
        that.dynamicForms[index].traveler[trvFormIndex].saluation =
          user.vcSalutation;

      if (typeof user.gender != 'undefined')
        that.dynamicForms[index].traveler[trvFormIndex].gender = user.gender;

      that.$awn.info(
        'Infomation has loaded in the form, please click to save..!',
        { labels: { info: 'Information Added' } }
      );
    },
    populateTravelerFormByTraveler: function (user, index, trvFormIndex) {
      let that = this,
        _bDate = user.dob,
        _ntrvFormIndex = trvFormIndex,
        _nIndex = index;

      if (_bDate != null) _bDate = user.dob.substr(0, 10);

      that.dynamicForms[index].traveler[trvFormIndex].address = user.address;
      that.dynamicForms[index].traveler[trvFormIndex].bookingId = '';
      that.dynamicForms[index].traveler[trvFormIndex].checked = '';
      that.dynamicForms[index].traveler[trvFormIndex].city = user.city;
      that.dynamicForms[index].traveler[trvFormIndex].ckBoxChecked = '';
      that.dynamicForms[index].traveler[trvFormIndex].date1 = _bDate;
      that.dynamicForms[index].traveler[trvFormIndex].defaultDOB = _bDate;
      that.dynamicForms[index].traveler[trvFormIndex].firstName =
        user.firstName;
      that.dynamicForms[index].traveler[trvFormIndex].lastName = user.lastName;
      that.dynamicForms[index].traveler[trvFormIndex].menu1 = '';
      that.dynamicForms[index].traveler[trvFormIndex].middleName = '';
      that.dynamicForms[index].traveler[trvFormIndex].passport =
        user.passportNo;
      that.dynamicForms[index].traveler[trvFormIndex].premobileval =
        user.contactNumber;
      that.dynamicForms[index].traveler[trvFormIndex].regmobile =
        user.contactNumber;
      that.dynamicForms[index].traveler[trvFormIndex].regemail = user.email;
      that.dynamicForms[index].traveler[trvFormIndex].regmobileMeta = '';
      that.dynamicForms[index].traveler[trvFormIndex].saluation = user.title;
      that.dynamicForms[index].traveler[trvFormIndex].state = user.state;
      that.dynamicForms[index].traveler[trvFormIndex].travellerId =
        user.iUserID;
      that.dynamicForms[index].traveler[trvFormIndex].zip = user.zip;
      that.dynamicForms[index].traveler[trvFormIndex].frequentFlyer =
        user.frequentFlyer;
      that.dynamicForms[index].traveler[trvFormIndex].frequentFlyerNo =
        user.frequentFlyerNo;
      that.dynamicForms[index].traveler[trvFormIndex].gender = user.gender;
      that.dynamicForms[index].traveler[trvFormIndex].showFormForcely = true;

      if (typeof user.passportExpiry != 'undefined') {
        if (user.passportExpiry != null) {
          let _dopasport = user.passportExpiry;
          _dopasport = user.passportExpiry.substr(0, 10);

          that.dynamicForms[index].traveler[trvFormIndex].passportExpiry =
            _dopasport;
        }
      }

      that.$forceUpdate();

      evBus.$emit('updatePhoneNumber', user.contactNumber);

      that.$awn.info(
        'Infomation has loaded in the form, please click to save..!',
        { labels: { info: 'Information Added' } }
      );
    },
    resetTravelerFormByIndex: function (index, trvFormIndex) {
      let that = this;

      that.dynamicForms[index].traveler[trvFormIndex].address = '';
      that.dynamicForms[index].traveler[trvFormIndex].bookingId = '';
      that.dynamicForms[index].traveler[trvFormIndex].checked = '';
      that.dynamicForms[index].traveler[trvFormIndex].city = '';
      that.dynamicForms[index].traveler[trvFormIndex].ckBoxCardInfo = '';
      that.dynamicForms[index].traveler[trvFormIndex].ckBoxChecked = '';
      that.dynamicForms[index].traveler[trvFormIndex].country =
        this.defCountryInDropDown;
      that.dynamicForms[index].traveler[trvFormIndex].date1 = '';
      that.dynamicForms[index].traveler[trvFormIndex].defaultDOB = '';
      that.dynamicForms[index].traveler[trvFormIndex].firstName = '';
      that.dynamicForms[index].traveler[trvFormIndex].lastName = '';
      that.dynamicForms[index].traveler[trvFormIndex].menu1 = '';
      that.dynamicForms[index].traveler[trvFormIndex].middleName = '';
      that.dynamicForms[index].traveler[trvFormIndex].passport = '';
      that.dynamicForms[index].traveler[trvFormIndex].premobileval = '';
      that.dynamicForms[index].traveler[trvFormIndex].regemail = '';
      that.dynamicForms[index].traveler[trvFormIndex].regmobile = '';
      that.dynamicForms[index].traveler[trvFormIndex].regmobileMeta = '';
      that.dynamicForms[index].traveler[trvFormIndex].saluation = '';
      that.dynamicForms[index].traveler[trvFormIndex].state = '';
      that.dynamicForms[index].traveler[trvFormIndex].travellerId = '';
      that.dynamicForms[index].traveler[trvFormIndex].zip = '';
      that.dynamicForms[index].traveler[trvFormIndex].showFormForcely = false;

      that.dynamicForms[index].traveler[trvFormIndex].pTravelersVal = 1;
    },

    makeActionAbles: function (arrOfObj) {
      let result = arrOfObj.map(function (el, index) {
        var o = Object.assign({}, el);
        o.srIndex = index + 1;
        o.action = '';
        return o;
      });

      return result;
    },

    filterTravelers: function (event, index, travellerFormIndex, displayLabel) {
      var that = this;

      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.timer = setTimeout(() => {
        let val = event.target.value;

        if (!val) return;

        if (val.length < that.min_search_autocomplete_length) return;

        // Items have already been requested
        if (
          that.dynamicForms[index].traveler[travellerFormIndex].searchTravelers
            .loading
        )
          return;

        that.dynamicForms[index].traveler[
          travellerFormIndex
        ].searchTravelers.loading = true;
        that.dynamicForms[index].traveler[
          travellerFormIndex
        ].searchTravelers.error = false;

        let usertype =
          that.dynamicForms[index].traveler[travellerFormIndex].userType;

        // Lazily load input items
        travellerServices
          .searchTraveller({
            searchTraveller: val,
            userType: 'customer',
          })
          .then((response) => {
            if (
              response.data.success == false &&
              response.data.message == 'Token has expired'
            ) {
              that.doPopLogout();
              return true;
            }

            if (response.data.data.length == 0) {
              that.dynamicForms[index].traveler[
                travellerFormIndex
              ].searchTravelers.error = true;
            }

            that.dynamicForms[index].traveler[
              travellerFormIndex
            ].searchTravelers.travellers = that.makeActionAbles(
              response.data.data
            );
          })
          .catch((error) => {
            that.$awn.alert('Please try later, server encounter error..!');
          })
          .finally(() => {
            // do some thing here
            that.dynamicForms[index].traveler[
              travellerFormIndex
            ].searchTravelers.loading = false;
          });
      }, 800); // debounce
    },
    filterByUserType(event, index, travellerFormIndex, displayLabel) {
      this.dynamicForms[index].traveler[
        travellerFormIndex
      ].searchTravelers.loading = false;
      this.dynamicForms[index].traveler[
        travellerFormIndex
      ].searchTravelers.error = false;
      this.dynamicForms[index].traveler[
        travellerFormIndex
      ].searchTravelers.search = '';
      this.dynamicForms[index].traveler[
        travellerFormIndex
      ].searchTravelers.travellers = [];
    },
    scrollToElement() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    dobUpdate: function (value) {
      this.dynamicForms[value.index].traveler[value.travelIndex].date1 =
        value.date;
      this.iTraveler.date1 = value;
    },
    dobFlightUpdate: function (value) {
      this.dynamicForms[value.index].traveler[value.travelindex].date1 =
        value.date;
    },
    expiryUpdate: function (value) {
      this.dynamicForms[value.index].traveler[
        value.travelindex
      ].passportExpiry = value.date;
    },
    doOpenTerms: function () {
      this.checkAgree = true;
      window.open('https://wp.inteletravel.com/terms/', '_blank');
    },
    formattedDate: function (reqDate, reqFormat) {
      if (!reqDate) return null;

      reqDate = moment(reqDate).format(reqFormat);

      return reqDate;
    },
    departDateFormatted(dd) {
      if (!dd) return '';

      return this.formattedDate(dd, this.dateFormatPlaceHolder);
    },
    getPrimaryTravellerInfo: function () {
      let _travellerCader = '';

      if (this.checkOutType == 'trip') {
        let _tripTravellers = this.doCleanArray(
            this.$store.getters.tripSummary.trip_travellers
          ),
          i = 0;

        for (i = 0; i < _tripTravellers.length; i++) {
          if (typeof _tripTravellers[i].primaryTraveller !== 'undefined') {
            let _searchedTraveller = _tripTravellers[i].traveller_info;

            _travellerCader = {
              title: _searchedTraveller.title,
              firstName: _searchedTraveller.firstName,
              lastName: _searchedTraveller.lastName,
              email: _searchedTraveller.email,
              contactNumber: _searchedTraveller.mobile,
              dob: this.formattedDate(_searchedTraveller.dob, 'YYYY-MM-DD'),
              customerType: 'adult',
              passportNo: _searchedTraveller.passport,

              passportExpiry: '',
              frequentFlyer: '',
              frequentFlyerNo: '',
              nameLength: 8,
            };

            break;
          } // Ends IF
        } // Ends Outer FOR LOOP
      } // Ends IF TRIP

      if (this.checkOutType == 'direct') {
        let _allBookings = this.dynamicForms,
          i = 0;

        for (i = 0; i < _allBookings.length; i++) {
          let _bookingTravelers = _allBookings[i].traveler;
          let _bookingId = _allBookings[i].item.bookingId;

          _bookingTravelers.forEach((travelerInfo, index) => {
            if (travelerInfo.isPrimary == true) {
              _travellerCader = {
                title: travelerInfo.saluation,
                firstName: travelerInfo.firstName,
                lastName: travelerInfo.lastName,
                email: travelerInfo.regemail,
                contactNumber: travelerInfo.regmobile,
                dob: this.formattedDate(travelerInfo.date1, 'YYYY-MM-DD'),
                customerType: 'adult',
                passportNo: travelerInfo.passport,
                // dialingCountryCode:'+99',
                passportExpiry: '',
                frequentFlyer: '',
                frequentFlyerNo: '',
                nameLength: 8,
              };
            } // Ends IF
          });
        } // Ends Outer FOR LOOP
      } // Ends IF direct

      return [_travellerCader];
    },
    getPaymentTravellerInfo: function () {
      let _travellerCader = '',
        flagMark = false;

      let _allBookings = this.dynamicForms,
        i = 0,
        startindex = 0;

      if (this.checkOutType == 'trip') startindex = 1;

      for (i = startindex; i < _allBookings.length; i++) {
        let _bookingTravelers = _allBookings[i].traveler;

        _bookingTravelers.forEach((travelerInfo, index) => {
          if (travelerInfo.ckBoxCardInfo == true) {
            _travellerCader = {
              title: travelerInfo.saluation,
              firstName: travelerInfo.firstName,
              lastName: travelerInfo.lastName,
              email: travelerInfo.regemail,
              address: travelerInfo.address,
              contactNumber: travelerInfo.regmobile,
              dob: this.formattedDate(travelerInfo.date1, 'YYYY-MM-DD'),
              customerType: 'adult',
              passportNo: travelerInfo.passport,
              passportExpiry: '',
              frequentFlyer: '',
              frequentFlyerNo: '',
              nameLength: 8,
              country: travelerInfo.country,
              state: travelerInfo.state,
              city: travelerInfo.city,
              zip: travelerInfo.zip,
              defaultCountry: travelerInfo.defaultCountry,
              areaCode: travelerInfo.areaCode,
            };

            flagMark = true;
          } // Ends IF
        });
      } // Ends Outer FOR LOOP

      if (flagMark) return [_travellerCader];

      return [];
    },
    makeTravellerInfo: function (travelerInfo, reqEngine) {

      let cleanMobileNumber = travelerInfo.regmobile.replaceAll(' ', ''),
        _customerType = 'adult',
        _userType = 'traveller';

      cleanMobileNumber = cleanMobileNumber.replaceAll('-', '');
      cleanMobileNumber = cleanMobileNumber.replaceAll('(', '');
      cleanMobileNumber = cleanMobileNumber.replaceAll(')', '');

      let _allCountries = widgetCountries.countries;
      let _searchCountry = travelerInfo.country;
      let _searchCountryCode = '';

      if (travelerInfo.passport == null) travelerInfo.passport = '';

      if (travelerInfo.middleName == null) travelerInfo.middleName = '';

      if (typeof travelerInfo.customerType != 'undefined')
        _customerType = travelerInfo.customerType;

      if (
        travelerInfo.customerType == 'adult' ||
        travelerInfo.customerType == 'senior'
      )
        _userType = 'customer';

      for (var i = 0; i < _allCountries.length; i++) {
        if (_allCountries[i].countryName == _searchCountry) {
          _searchCountryCode = _allCountries[i].countryShortCode;
          break;
        }
      } // Ends FOR

      let ageDateChunks = '';
      let makeCustomerAge = '';

      if (travelerInfo.date1 != '' && travelerInfo.date1 != null) {
        ageDateChunks = this.formattedDate(travelerInfo.date1, 'YYYY-MM-DD'); // .split('-');
        makeCustomerAge = this.getAgeByDecimal(ageDateChunks);
        // this.getAge(ageDateChunks[0], ageDateChunks[1], ageDateChunks[2]);
      }

      let _singleTravelerInfo = {
        title: travelerInfo.saluation,
        firstName: travelerInfo.firstName,
        middleName: travelerInfo.middleName,
        lastName: travelerInfo.lastName,
        email: travelerInfo.regemail,
        contactNumber: cleanMobileNumber,
        dob: this.formattedDate(travelerInfo.date1, 'YYYY-MM-DD'),
        customerAge: makeCustomerAge,
        customerType: _customerType,
        userType: _userType,
        nameLength: 8,
        address: travelerInfo.address,
        country: travelerInfo.country,
        city: travelerInfo.city,
        state: travelerInfo.state,
        zip: travelerInfo.zip.replace(/\s/g, ''),
        countryCode: _searchCountryCode,
        defaultCountry: travelerInfo.defaultCountry,
        ckBoxCardInfo: travelerInfo.ckBoxCardInfo,
        isPrimary: false, // travelerInfo.ckBoxCardInfo,
        engine: reqEngine,
        sessionId: travelerInfo.sessionId,
        dialingCountryCode:'+' + travelerInfo.areaCode.replace('+', '')
      };

      if (reqEngine == 'car') {
        // for a car it will be always true

        _singleTravelerInfo.isPrimary = true;
      }

      if (reqEngine == 'villa') {
        _singleTravelerInfo.userType = 'customer';
      }

      if (reqEngine == 'flight') {
        _singleTravelerInfo.gender = travelerInfo.gender;
        _singleTravelerInfo.passportNo = travelerInfo.passport;
        _singleTravelerInfo.passportExpiry = this.formattedDate(
          travelerInfo.passportExpiry,
          'YYYY-MM-DD'
        );
        _singleTravelerInfo.frequentFlyer = travelerInfo.frequentFlyer;
        _singleTravelerInfo.frequentFlyerNo = travelerInfo.frequentFlyerNo;

        if (_userType == 'customer') {
          _singleTravelerInfo.areaCode =
            '+' + travelerInfo.areaCode.replace('+', '');
          _singleTravelerInfo.dialingCountryCode =
            '+' + travelerInfo.areaCode.replace('+', '');
        }
      }

      if (reqEngine == 'hotel') {

        _singleTravelerInfo.roomId = travelerInfo.roomId;

        if (_singleTravelerInfo.customerType == 'child') {
          _singleTravelerInfo.country = '';
          _singleTravelerInfo.countryCode = '';
          _singleTravelerInfo.email = '';

          _singleTravelerInfo.customerAge = 1;

          if (typeof travelerInfo.ageOfChild != 'undefined')
            _singleTravelerInfo.customerAge = parseInt(travelerInfo.ageOfChild);
        }

        if (_singleTravelerInfo.customerType == 'adult') {
          delete _singleTravelerInfo.dob;
          delete _singleTravelerInfo.customerAge;

          if (typeof _singleTravelerInfo.age != 'undefined')
            delete _singleTravelerInfo.age;

          if (travelerInfo.iteratingIndex == 0)
            _singleTravelerInfo.isPrimary = true;
        }
      }

      return _singleTravelerInfo;
    },
    getExtraDetailOfActivity: function (payloads, checkOutMode, communication) {

        let _allTravelers = payloads.traveler;
        // QUESTIONS OF PER_TRAVELLER_BOOKING
        let _packageBookingQuestionAnswers = [];

        if (this.checkOutType != 'trip') {

        _allTravelers.forEach(travelerInfo => {

             let bookingQuestionAnswers = (travelerInfo.hasBookingQuestions) ? travelerInfo.bookingQuestionAnswers : [];

             if(bookingQuestionAnswers.length) {

                let remakeBookingQuestionsOfTraveler = bookingQuestionAnswers;

                remakeBookingQuestionsOfTraveler.forEach(element => {
                  let answer = element.answer;
                  let unit = element.unit;
                  if(answer == 'I_DONT_SEE_MY_PICKUP_LOCATION' && typeof element.free_answer != undefined){
                    answer = element.free_answer;
                    unit   = 'FREETEXT';
                  }
                  _packageBookingQuestionAnswers.push({
                    question: element.question,
                    answer: answer,
                    travelerNum: element.travelerNum,
                    unit:unit
                  });

                });

             } // Ends IF

        });

        }

        // QUESTIONS OF PER_BOOKING
        if(payloads.hasBookingQuestions) {

          let remakeBookingQuestionsOfTraveler = payloads.bookingQuestions;

          remakeBookingQuestionsOfTraveler.forEach(element => {
            let answer = element.answer;
            let unit = element.unit;
            if(answer == 'I_DONT_SEE_MY_PICKUP_LOCATION' && typeof element.free_answer != undefined){
              answer = element.free_answer;
              unit   = 'FREETEXT';
            }

            _packageBookingQuestionAnswers.push({
              question: element.question,
              answer: answer,
              unit:unit
            });

          });
        }

      let _languageGuides = {};
      let _languageGuide = {};
      if (this.checkOutType == 'direct'){
        _languageGuides = payloads.item.details.activityDetails.languageGuides;
        _languageGuides = this.doCleanArray(_languageGuides);

        if(_languageGuides && _languageGuides.length > 0){
          let language = payloads.item.details.activityDetails.language
          let filteredLanguageGuide = _languageGuides.filter((item)=>item.language == language);
          if(filteredLanguageGuide.length > 0){
            _languageGuide = filteredLanguageGuide[0];
          }
        }
      }
      if (this.checkOutType == 'trip'){
        _languageGuides = payloads.item.activityDetails.activityDetail.languageGuides;
        _languageGuides = this.doCleanArray(_languageGuides);

        if(_languageGuides && _languageGuides.length > 0){
          let language = payloads.item.activityDetails.activityDetail.language
          let filteredLanguageGuide = _languageGuides.filter((item)=>item.language == language);
          if(filteredLanguageGuide.length > 0){
            _languageGuide = filteredLanguageGuide[0];
          }
        }
        
      }

      if(_packageBookingQuestionAnswers.length > 0){
        _packageBookingQuestionAnswers = _packageBookingQuestionAnswers.filter((question)=>{
        if(question.answer){
          return true;
        }
        return false;
      });
      }
      
       this.activityExtraDetails[payloads.item.Id] = {
          "languageGuide": _languageGuide,
          "bookingQuestionAnswers" : _packageBookingQuestionAnswers,
          "communication": {
            "email": communication.email,
            "phone": communication.phone
          }
      };


      let _startTimes = 0;

      if (this.checkOutType == 'direct')
        _startTimes = payloads.item.details.startTime;

      if (this.checkOutType == 'trip')
        _startTimes = payloads.item.startTime;

      if(_startTimes && (_startTimes != 0) && (_startTimes != ''))
        this.activityExtraDetails[payloads.item.Id]["startTime"] = _startTimes;
      
      this.$store.dispatch('saveExtraDetailOfActivity', {'xtraDtl' : this.activityExtraDetails});

      return this.activityExtraDetails;
    },
    getExtraDetailOfVilla: function (payloads, checkOutMode) {
      let _extraDetail = {
        villas: {
          incrementalPrice: [],
          block_quantities: [],
          block_ids: [],
          pay_now: 0,
          guest_quantities: [],
        },
      };

      if (checkOutMode == 'direct') {
        let _rooms = payloads.item.rooms;
        let items = this.$store.state.villaStore.searchData.rooms;
        _rooms.forEach((room, index) => {
          _extraDetail.villas.incrementalPrice.push(
            parseFloat(this.getRoomPriceByDomain(room.incremental_price))
          );

          _extraDetail.villas.block_quantities.push(
            parseInt(room.block_quantities)
          );

          _extraDetail.villas.block_ids.push(room.block_id);
          for(let i=0; i < Number(room.block_quantities); i++){
            let all = items[i].childs.filter(function(ac){
              return ac >= room.max_children_free_age;
            })
            _extraDetail.villas.guest_quantities.push(items[i].adults + all.length);
          }
        });

        _extraDetail.villas.pay_now = payloads.item.payNow;
      } // Ends If Direct

      return _extraDetail;
    },
    getBookingDetails: function () {

      let _allBookings = this.dynamicForms,
        _bookingDetailsCatalog = [],
        i = 0;

      for (i = 0; i < _allBookings.length; i++) {

        if (_allBookings[i].engine == 'trip') continue;

        let _bookingTravelers = _allBookings[i].traveler;
        let _bookingId = _allBookings[i].item.Id;
        let _cart = _allBookings[i];

        let _bookingCader = {
          sessionId: this.$store.state.carStore.carSearchedId,
          engine: _cart.engine,
          engineId: _cart.item.Id,
          supplier: 'Nexus', // _cart.item.CarHireCompany,
          packageId: "",
          travellerInfo: [],
        };

        if (_cart.engine == 'car') {
          _bookingCader.supplier = 'priceline';
        }

        if (_cart.engine == 'flight') {
          _bookingCader.sessionId = this.$store.state.flightStore.sessionId;
          _bookingCader.supplier = 'msf';
          _bookingCader.extraServices = [];
        }

        if (_cart.engine == 'hotel') {
          _bookingCader.sessionId = this.$store.state.hotelStore.sessionId;
          _bookingCader.supplier = 'Nexus';
          _bookingCader.packageId = _allBookings[i].item.room.packageId;
          _bookingCader.engineId = _cart.item.hotelId;
        }

        if (_cart.engine == 'villa') {
          _bookingCader.sessionId = this.$store.state.villaStore.sessionId;
          _bookingCader.supplier = 'booking.com';
          _bookingCader.engineId = _cart.item.villaId;
          _bookingCader.extraDetail = this.getExtraDetailOfVilla(
            _cart,
            this.checkOutType
          );
        }


        let leadEmail = '';
        let leadContact = '';

        _bookingTravelers.forEach((travelerInfo, index) => {

          travelerInfo.sessionId = _bookingCader.sessionId;
          travelerInfo.iteratingIndex = index;

          let _makeTravelerInfos = this.makeTravellerInfo(
            travelerInfo,
            _cart.engine
          );

          _makeTravelerInfos.pTravelersVal = travelerInfo.pTravelersVal;

          if (
            _cart.engine == 'flight' &&
            index == 0 &&
            (_makeTravelerInfos.customerType == 'adult' ||
              _makeTravelerInfos.customerType == 'senior')
          ) {
            _makeTravelerInfos.isPrimary = true;
            leadEmail = _makeTravelerInfos.email;
            leadContact = _makeTravelerInfos.contactNumber;
          }
          if (
            _cart.engine == 'activity' &&
            index == 0 &&
            (_makeTravelerInfos.customerType == 'adult' ||
              _makeTravelerInfos.customerType == 'senior' || 
              _makeTravelerInfos.customerType == 'traveler')
          ) {
            _makeTravelerInfos.isPrimary = true;
            leadEmail = _makeTravelerInfos.email;
            leadContact = _makeTravelerInfos.contactNumber;
          }

          if (
            _cart.engine == 'flight' &&
            (_makeTravelerInfos.customerType == 'infant' ||
              _makeTravelerInfos.customerType == 'child')
          ) {
            _makeTravelerInfos.email = leadEmail;
            _makeTravelerInfos.contactNumber = leadContact;
          }

          if (
            _cart.engine == 'flight' &&
            travelerInfo.isPassportRequired == false
          )
            _makeTravelerInfos.passportExpiry = '';

          if (_cart.engine == 'flight')
            _makeTravelerInfos.customerAge = this.getAgeByDecimalInComp(
              _makeTravelerInfos.dob,
              _cart.item.pdate[0]
            );

          if(_cart.engine == 'activity')
              if(typeof travelerInfo.areaCode!='undefined' && this.checkOutType == 'direct') {
                
                _makeTravelerInfos.areaCode = '+' + travelerInfo.areaCode.replace('+', '');
                _makeTravelerInfos.dialingCountryCode = '+' + travelerInfo.areaCode.replace('+', '');
              }

          _bookingCader.travellerInfo.push(_makeTravelerInfos);
        });

        if (_cart.engine == 'activity') {
          _bookingCader.sessionId = this.$store.state.ActivityStore.sessionId;
          if(this.checkOutType == 'direct'){
            _bookingCader.supplier = 'viator';
          }
          else{
            _bookingCader.supplier = 'Travo';
          }
          
          _bookingCader.engineId = _cart.item.activityId;
          _bookingCader.packageId = _cart.item.gradeId;

          /**
           * Start time under bookingDetails object
           */
          let _startTimes = 0;
          if (this.checkOutType == 'direct')
            _startTimes = _cart.item.details.startTime;
          if (this.checkOutType == 'trip')
            _startTimes = _cart.item.startTime;
          if(_startTimes && (_startTimes != 0) && (_startTimes != ''))
            _bookingCader.startTime = _startTimes;

          let activityExtraDetail = this.getExtraDetailOfActivity(
            _cart,
            this.checkOutType,
            {'email': leadEmail, 'phone': leadContact}
          );

          if (activityExtraDetail != false)
            _bookingCader['_extraDetail'] = activityExtraDetail;
        }

        leadEmail = '';
        leadContact = '';

        _bookingDetailsCatalog.push(_bookingCader);
      } // Ends Outer FOR LOOP

      return _bookingDetailsCatalog;
    },
    openAllExpansions: function (makeDefaultOpen) {
      let that = this;

      return new Promise((resolve, reject) => {
        let _totalExpensions = that.dynamicForms.length,
          i = 0;

        while (i < _totalExpensions) {
          that.panel.push(i);

          if (that.dynamicForms[i].engine != 'trip')
            that.dynamicForms[i].traveler.forEach((objTraveler, index) => {
              if (makeDefaultOpen) objTraveler.pTravelersVal = 1;
            });

          i++;
        }

        /**
         * needed to hold while expansions
         * work to display all forms respectively before validate
         **/
        setTimeout(function () {
          resolve();
        }, 1500);
      });
    },
    getCountryCode(reqCountryName) {
      let _allCountries = widgetCountries.countries;
      let _searchCountry = reqCountryName;
      let _searchCountryCode = '';

      for (var i = 0; i < _allCountries.length; i++) {
        if (_allCountries[i].countryName == _searchCountry) {
          _searchCountryCode = _allCountries[i].countryShortCode;
          break;
        }
      } // Ends FOR

      return _searchCountryCode;
    },
    doRemoveTripTraveller(reqTravelerId, reqTripMetaId) {
      return new Promise((resolve) => {
        let reqHeaders = {
          headers: { 'Content-Type': 'application/json' },
        };

        var reqDataForm = {}; // new FormData();
        reqDataForm.tripId = this.trip_id;
        reqDataForm.tripMetaId = reqTripMetaId;
        reqDataForm.travellerId = reqTravelerId;

        tripServices
          .removeTravellerOfTrip(reqDataForm, reqHeaders)
          .then((rsp) => {
            if (
              rsp.data.success == false &&
              rsp.data.message == 'Token has expired'
            ) {
              this.doPopLogout();
              return false;
            } else {
              resolve({ status: true, response: rsp });
            }
          })
          .catch((error) => {
            resolve({ status: false, response: '' });
          })
          .finally(() => {
            // resolve();
          });
      }); // Ends Main Promise
    },
    doSaveTraveler(travelerInfos, bookID, reqEngine, reqItem) {

      let travellerPayLoad = {
        travellers: [],
      };

      let lastIteratedEngine = '';
      let lastIteratedPrimary = false;
      let leadEmail = '';
      let leadContact = '';

      let _xtraDetail = {}, _primaryLeadOfActivity = {
                                  "email": "abdev@example.com",
                                  "phone": "+61 431532778"
                              };

      return new Promise((resolve, reject) => {

        travelerInfos.forEach((travelerInfo, index) => {

          let _bDay = this.formattedDate(travelerInfo.date1, 'YYYY-MM-DD');

          let ageDateChunks = '';

          if (_bDay) {
            ageDateChunks = _bDay.split('-');
          }

          let cleanMobileNumber = travelerInfo.regmobile.replaceAll(' ', '');
          cleanMobileNumber = cleanMobileNumber.replaceAll('-', '');
          cleanMobileNumber = cleanMobileNumber.replaceAll('(', '');
          cleanMobileNumber = cleanMobileNumber.replaceAll(')', '');

          let _customerType = 'adult',
            _userType = 'traveller',
            _details = 'Car Passenger';

          if (typeof travelerInfo.customerType != 'undefined')
            _customerType = travelerInfo.customerType;

          if (travelerInfo.passport == null) travelerInfo.passport = '';
          let stats = widgetCountries.countries.find(
            ({ countryName }) => countryName === travelerInfo.country
          ).regions;

          let stateCode = '';

          if (travelerInfo.state != '')
            stateCode = stats.find(
              ({ name }) => name === travelerInfo.state
            ).shortCode;

          let objTrvPayload = {
            travellerId: null,
            title: travelerInfo.saluation,
            firstName: travelerInfo.firstName,
            lastName: travelerInfo.lastName,
            email: travelerInfo.regemail,
            mobile: cleanMobileNumber,
            address: travelerInfo.address,
            dob: _bDay,
            age: this.getAgeByDecimal(_bDay),
            details: _details,
            state: travelerInfo.state,
            stateCode: stateCode,
            zip: travelerInfo.zip.replace(/\s/g, ''),
            city: travelerInfo.city,
            country: travelerInfo.country,
            nameLength: 8,
            countryCode: this.getCountryCode(travelerInfo.country),
            customerType: _customerType,
            userType: _userType,
            isPrimary: true,
            engine: reqEngine,
            sessionId: travelerInfo.sessionId,
            dialingCountryCode : '+' + travelerInfo.areaCode.replace('+', '')
          };

          if (reqEngine == 'villa') {
            objTrvPayload.details = 'New';
            objTrvPayload.userType = 'customer';

            /*
                            objTrvPayload.roomId = travelerInfo.roomId;
                            objTrvPayload.hotelId = travelerInfo.hotelId;

                            if (_customerType == 'child') {

                                objTrvPayload.country = '';
                                objTrvPayload.countryCode = '';
                                objTrvPayload.customerType = 'child';
                                objTrvPayload.customerAge = 0;
                                objTrvPayload.userType = 'traveller';
                                travelerInfo.isPrimary = false;

                                if(typeof travelerInfo.ageOfChild!="undefined")
                                    objTrvPayload.customerAge = travelerInfo.ageOfChild;
                            }
                        */
          }

          // if(travelerInfo.ckBoxCardInfo==true)
          if (reqEngine == 'car')
            // always true incase of car
            objTrvPayload.isPrimary = true;


          if (reqEngine == 'activity') {

            objTrvPayload.details = 'New';
            objTrvPayload.userType = 'customer';
            objTrvPayload.customerAge = objTrvPayload.age;
            objTrvPayload.hotelId = travelerInfo.hotelId;
            objTrvPayload.areaCode = '';
            objTrvPayload.dialingCountryCode = '';

            if(typeof travelerInfo.areaCode!='undefined' && this.checkOutType == 'direct') {
              
              objTrvPayload.areaCode = '+' + travelerInfo.areaCode.replace('+', '');
              objTrvPayload.dialingCountryCode = '+' + travelerInfo.areaCode.replace('+', '');
            }

            if (_customerType == 'child' || _customerType == 'infant' || _customerType == 'youth') {
              objTrvPayload.country = '';
              objTrvPayload.countryCode = '';
              objTrvPayload.customerType = _customerType;
              objTrvPayload.customerAge = 0;
              objTrvPayload.userType = 'traveller';
              objTrvPayload.isPrimary = false;

              if (typeof travelerInfo.ageOfChild != 'undefined' && _customerType == 'child')
                objTrvPayload.customerAge = travelerInfo.ageOfChild;
              if (typeof travelerInfo.ageOfInfant != 'undefined' && _customerType == 'infant')
                objTrvPayload.customerAge = travelerInfo.ageOfInfant;
            }

            

            if (_customerType == 'traveler') {
              
              objTrvPayload.customerType = 'traveler';
              _customerType  = 'traveler';
            }

            if (_customerType == 'adult' || _customerType == 'traveler') {

              delete objTrvPayload.age;
              delete objTrvPayload.dob;

              if (index == 0) {
                objTrvPayload.isPrimary = true;

                _primaryLeadOfActivity.email = objTrvPayload.email;
                _primaryLeadOfActivity.phone = objTrvPayload.mobile;

              } else {
                objTrvPayload.isPrimary = false;
              }
            }

             objTrvPayload.bookingQuestionAnswers = (travelerInfo.hasBookingQuestions) ? travelerInfo.bookingQuestionAnswers : [];

             if(objTrvPayload.bookingQuestionAnswers.length) {

                let remakeBookingQuestionsOfTraveler = objTrvPayload.bookingQuestionAnswers, requiredPayloadsInBook = [];

                remakeBookingQuestionsOfTraveler.forEach(element => {
                  let answer = element.answer;
                  let unit = element.unit;
                  if(answer == 'I_DONT_SEE_MY_PICKUP_LOCATION' && typeof element.free_answer != undefined){
                    answer = element.free_answer;
                    unit   = 'FREETEXT';
                  }

                  requiredPayloadsInBook.push({
                    question: element.question,
                    answer: answer,
                    travelerNum: element.travelerNum,
                    unit: unit,
                  });

                });

                objTrvPayload.bookingQuestionAnswers = requiredPayloadsInBook;
             } // Ends IF

              delete objTrvPayload.age;
              delete objTrvPayload.dob;

          } // Ends Activity


          if (reqEngine == 'hotel') {
            objTrvPayload.details = 'New';
            objTrvPayload.userType = 'customer';
            objTrvPayload.roomId = travelerInfo.roomId;
            objTrvPayload.hotelId = travelerInfo.hotelId;

            if (_customerType == 'child') {
              objTrvPayload.country = '';
              objTrvPayload.countryCode = '';
              objTrvPayload.customerType = 'child';
              objTrvPayload.customerAge = 0;
              objTrvPayload.userType = 'traveller';
              objTrvPayload.isPrimary = false;

              if (typeof travelerInfo.ageOfChild != 'undefined')
                objTrvPayload.customerAge = travelerInfo.ageOfChild;
            }

            if (_customerType == 'adult') {
              delete objTrvPayload.age;
              delete objTrvPayload.dob;

              if (index == 0) {
                objTrvPayload.isPrimary = true;
              } else {
                objTrvPayload.isPrimary = false;
              }
            }
          }

          if (reqEngine == 'flight') {
            objTrvPayload.details = 'Flight Passenger';
            objTrvPayload.areaCode =
              '+' + travelerInfo.areaCode.replace('+', '');
            objTrvPayload.dialingCountryCode =
              '+' + travelerInfo.areaCode.replace('+', '');
            objTrvPayload.gender = travelerInfo.gender;
            // objTrvPayload.customerAge = objTrvPayload.age;
            objTrvPayload.customerAge = this.getAgeByDecimalInComp(
              objTrvPayload.dob,
              travelerInfo.dptDate
            );

            if (travelerInfo.isPassportRequired) {
              objTrvPayload.passportNo = travelerInfo.passport;
              objTrvPayload.passportExpiry = travelerInfo.passportExpiry;
              objTrvPayload.frequentFlyer = travelerInfo.frequentFlyer;
              objTrvPayload.frequentFlyerNo = travelerInfo.frequentFlyerNo;
            } else {
              objTrvPayload.passportNo = '';
              objTrvPayload.passportExpiry = '';
            }

            objTrvPayload.contactNumber = objTrvPayload.mobile;

            if (index == 0) {
              leadEmail = objTrvPayload.email;
              leadContact = objTrvPayload.contactNumber;
            }

            if (index > 0) {
              objTrvPayload.userType = 'traveller';
              objTrvPayload.isPrimary = false;
            }

            if (
              objTrvPayload.customerType == 'infant' ||
              objTrvPayload.customerType == 'child'
            ) {
              objTrvPayload.email = leadEmail;
              objTrvPayload.contactNumber = leadContact;

              if (
                objTrvPayload.customerType == 'infant' &&
                travelerInfo.isPassportRequired == false
              )
                objTrvPayload.passportExpiry = '';
            }

            if (objTrvPayload.customerType == 'senior')
              objTrvPayload.customerType = 'adult';
          }

          if (travelerInfo.isPrimary == true)
            objTrvPayload.userType = 'customer';

          if (_customerType == 'adult' || _customerType == 'senior')
            objTrvPayload.userType = 'customer';

          if (travelerInfo.travellerId > 0)
            objTrvPayload.travellerId = travelerInfo.travellerId.toString();

          travellerPayLoad.travellers.push(objTrvPayload);

          lastIteratedEngine = reqEngine;
          lastIteratedPrimary = objTrvPayload.isPrimary;
        }); // Ends FOREACH


        if (reqEngine == 'activity') {

            let _packageBookingQuestionAnswers = [];

            if(reqItem.hasBookingQuestions) {

              let remakeBookingQuestionsOfTraveler = reqItem.bookingQuestions, requiredPayloadsInBook = [];

              remakeBookingQuestionsOfTraveler.forEach(element => {
                let answer = element.answer;
                let unit = element.unit;
                if(answer == 'I_DONT_SEE_MY_PICKUP_LOCATION' && typeof element.free_answer != undefined){
                  answer = element.free_answer;
                  unit   = 'FREETEXT';
                }

                requiredPayloadsInBook.push({
                  question: element.question,
                  answer: answer,
                  unit: unit
                });

              });

              _packageBookingQuestionAnswers = requiredPayloadsInBook;
            }

            
            let _subPackageOfBookingQuestions=  {
                "startTime": reqItem.item.startTime,
                "languageGuide": this.doCleanArray(reqItem.item.activityDetails.activityDetail.languageGuides),
                "bookingQuestionAnswers": _packageBookingQuestionAnswers,
                "communication": _primaryLeadOfActivity
             };

            this.activityExtraDetails[reqItem.item.Id] = _subPackageOfBookingQuestions;

        } // Ends IF Activity

        
        let reqHeaders = {
          headers: { 'Content-Type': 'application/json' },
        };

        var reqDataForm = {
          data: travellerPayLoad,
          tripId: this.trip_id,
          bookingIds: bookID.toString(),
        }; // new FormData();

        // this.$store.dispatch('saveExtraDetailOfActivity', {'xtraDtl' : this.activityExtraDetails});
        this.disableProceedBtn = false;

        travellerServices
          .addTraveller(reqDataForm, reqHeaders)
          .then((rsp) => {

            if (
              rsp.data.success == false &&
              rsp.data.message == 'Token has expired'
            ) {
              this.doPopLogout();
              return false;
            
            } else if (
              rsp.data.success == false &&
              rsp.data.message == 'Email address is already in the system and cannot be added again.'
            ) {

              this.$awn.alert(rsp.data.message);
              this.disableProceedBtn = true;
              evBus.$emit('uncheckBoxOfAgree', 'abc');
              return false;
            } else {
              let _tripTravellers = rsp.data.data[0].triptravellers;

              this.$store.dispatch('addTraveller', {
                TRAVELLERS: _tripTravellers,
              });

              resolve({ status: true, response: rsp });
            }
          })
          .catch((error) => {
            if (error.response.data.success == false) {
              this.$awn.alert(error.response.data.message);
            }
            resolve({ status: false, response: error.response });
          })
          .finally(() => {
            // resolve({status: false, response: rsp });
          });
      }); // Ends Main Promise
    },
    makePrimaryTraveler(reqBookId, reqTravelerFormIndex, ckStatus) {
      // unselect all checkboxes and select the current

      let _allBookings = this.dynamicForms,
        i = 0;

      for (i = 0; i < _allBookings.length; i++) {
        let _bookingTravelers = _allBookings[i].traveler;
        let _bookingId = _allBookings[i].item.Id;

        _bookingTravelers.forEach((travelerInfo, index) => {
          travelerInfo.ckBoxChecked = false;
          travelerInfo.isPrimary = false;

          if (
            _bookingId == reqBookId &&
            reqTravelerFormIndex == index &&
            ckStatus == true
          ) {
            travelerInfo.ckBoxChecked = true;
            travelerInfo.isPrimary = true;
          }

          if (i == 0 && index == 0 && ckStatus == false) {
            travelerInfo.ckBoxChecked = true;
            travelerInfo.isPrimary = true;
          }
        });
      } // Ends Outer FOR LOOP
    },
    saveTravelerByCkInGroup: async function (
      ev,
      reqEngine,
      reqItem,
      reqItemIndex,
      status
    ) {
      

      if (!status) return;

      reqItem.agreeTermsError = [];

      let _displayLiteral = 'Driver';

      let _formToBook = this.dynamicForms[reqItemIndex];
      _formToBook.saveUserError = false;
      _formToBook.saveUserErrorDetail = '';
      this.formIndexInProcess = reqItemIndex;

      let _travelerForms = this.dynamicForms[reqItemIndex].traveler;

      let formName = 'form99' + reqItemIndex;

      let parentRef = 'trvSubForm_99' + reqItemIndex;

      let validationStatuses = [];

      let proTrvForms = [];

      _travelerForms.forEach((reqFormData, reqTravelerFormIndex) => {

        if (reqEngine == 'flight') {
          _displayLiteral = 'Passenger';
          formName = 'form99' + reqItemIndex + '' + reqTravelerFormIndex;
          reqItem.item.bookingId = reqItem.item.id;
          reqFormData.dptDate = reqItem.item.pdate[0];
        }

        if (reqEngine == 'hotel') {

          _displayLiteral = 'Traveler';

          formName = 'form99' + reqItemIndex + '' + reqTravelerFormIndex;

          reqItem.item.bookingId = reqItem.item.id;

          reqItem.item.hotelId = reqItem.item.engineId;
        }

        if (reqEngine == 'hotel' || reqEngine == 'car') {

          delete reqFormData['passportExpiry'];
          delete reqFormData['passport'];
          delete reqFormData['frequentFlyer'];
          delete reqFormData['frequentFlyerNo'];
        }

        if (reqEngine == 'villa') {
          _displayLiteral = 'Traveler';

          reqItem.item.bookingId = reqItem.item.id;

          // reqItem.item.hotelId = reqItem.item.engineId;
        }

        if (reqEngine == 'activity') {
        
          _displayLiteral = 'Traveler';

          formName = 'form99' + reqItemIndex + '' + reqTravelerFormIndex;

          reqItem.item.bookingId = reqItem.item.id;
        }

        let _searchedForm = this.$refs[parentRef][0].$refs[formName];

        if (Array.isArray(_searchedForm)) _searchedForm = _searchedForm[0];

        if (!_searchedForm.validate()) {

          validationStatuses.push('falisfy');
        } else {

          validationStatuses.push('truthly');
        }

        proTrvForms.push(this.doCleanArray(reqFormData));
      });

      if (validationStatuses.includes('falisfy')) {

        this.$nextTick(() => {
          reqItem.agreeTerms = false;
        });

        reqItem.agreeTermsError = ['Please complete the required fields.'];

        return false;
      }
    
     
    
      this.doSaveTraveler(
        proTrvForms,
        reqItem.item.bookingId,
        reqItem.engine,
        reqItem
      ).then((rsp) => {
      
      if(rsp.response.data.success == false){ 
          this.emailDupplication = rsp.response.data.data;  
        for(let i=0; i<rsp.response.data.data.length;i++){  
          
        this.$awn.alert(  
          rsp.response.data.data[i]+ " is already in the system and cannot be added again", 
            { 
              labels: { success: 'Information Added' }, 
            } 
          );  
        } 
        return false; 
      }

      if (reqEngine == 'activity')
       this.$store.dispatch('saveExtraDetailOfActivity', {'xtraDtl' : this.activityExtraDetails});

        if (rsp.status == true) {
          this.emailDupplication = [];
        
          this.$awn.success(
            _displayLiteral + ' Information Has Added To Trip',
            {
              labels: { success: 'Information Added' },
            }
          );
        }

        if (rsp.status == false) {
        
          let errorDetails = rsp.response.data;
          _formToBook.saveUserError = true;
          _formToBook.saveUserErrorDetail =
            errorDetails.message + '<b>' + errorDetails.data.join() + '</b>';
        }

      });
    },
    saveTravelerByCk: async function (
      ev,
      reqEngine,
      reqItem,
      reqItemIndex,
      reqTravelerFormIndex,
      travelerForm,
      status
    ) {
      let reqFormData =
        this.dynamicForms[reqItemIndex].traveler[reqTravelerFormIndex];

      let _displayLiteral = 'Driver';

      let formName = 'form99' + reqItemIndex;

      let parentRef = 'trvSubForm_99' + reqItemIndex;

      if (reqEngine == 'flight') {
        _displayLiteral = 'Passenger';
        formName = 'form99' + reqItemIndex + '' + reqTravelerFormIndex;
        reqItem.item.bookingId = reqItem.item.id;
      }

      if (reqEngine == 'hotel' || reqEngine == 'villa') {
        _displayLiteral = 'Traveler';
        reqItem.item.bookingId = reqItem.item.id;

        if (reqEngine == 'hotel') {
          formName = 'form99' + reqItemIndex + '' + reqTravelerFormIndex;
          reqItem.item.hotelId = reqItem.item.engineId;
        }

        // if(reqEngine == 'hotel') {

        //     formName = 'form99' + reqItemIndex + '' + reqTravelerFormIndex;
        //     reqItem.item.hotelId = reqItem.item.engineId;
        // }
      }

      if (reqEngine == 'villa' || reqEngine == 'hotel' || reqEngine == 'car') {
        delete travelerForm['passportExpiry'];
        delete travelerForm['passport'];
        delete travelerForm['frequentFlyer'];
        delete travelerForm['frequentFlyerNo'];
      }

      reqFormData.ckBoxSaveTravelerError = [];

      let _searchedForm = this.$refs[parentRef][0].$refs[formName];

      if (Array.isArray(_searchedForm)) _searchedForm = _searchedForm[0];

      if (!_searchedForm.validate()) {
        if (status) {
          this.$nextTick(() => {
            reqFormData.ckBoxSaveTraveler = false;
          });

          reqFormData.ckBoxSaveTravelerError = [
            'Please complete the required fields.',
          ];

          return false;
        }
      }

      reqFormData.ckBoxSaveTravelerReadOnly = true;

      if (status) {
        // case to create
        this.doSaveTraveler(
          [this.doCleanArray(travelerForm)],
          reqItem.item.bookingId,
          reqItem.engine,
          reqItem
        ).then((rsp) => {
          if (rsp.status == true) {
            if (reqEngine == 'hotel') {
              let _searchMail = travelerForm.regemail,
                _usersOfTrip = rsp.response.data.data[0].triptravellers;

              _usersOfTrip.forEach((userInfo, index) => {
                if (reqFormData.customerType == 'child') {
                  if (userInfo.traveller.firstName == travelerForm.firstName) {
                    reqFormData.travellerId = userInfo.traveller.iUserID;
                  }
                } else {
                  if (userInfo.traveller.email == _searchMail) {
                    reqFormData.travellerId = userInfo.traveller.iUserID;
                  }
                }
              });
            } else {
              // Old Code Might Be A Response Changed For Hotel
              let _searchMail = travelerForm.regemail,
                _usersOfTrip = rsp.response.data.data[0].triptravellers;

              _usersOfTrip.forEach((userInfo, index) => {
                if (userInfo.traveller.email == _searchMail)
                  reqFormData.travellerId = userInfo.traveller.iUserID;
              });
            } // Ends IF ELSE

            this.$awn.success(
              _displayLiteral + ' Information Has Added To Trip',
              {
                labels: { success: 'Information Added' },
              }
            );
          } else {
            // console.log(
            //     'Unable to get response of doSaveTraveller'
            // );
          } // IF Status

          reqFormData.ckBoxSaveTravelerReadOnly = false;
        });
      } else {
        // case to delete
        this.doRemoveTripTraveller(
          reqFormData.travellerId,
          reqItem.item.bookingId
        ).then((rsp) => {
          if (rsp.status == true) {
            // reqFormData.travellerId = user.iUserID;
            this.$awn.success(
              _displayLiteral + ' Information Has Removed from Trip',
              {
                labels: {
                  success: 'Trip ' + _displayLiteral + ' Removed',
                },
              }
            );

            this.resetTravelerFormByIndex(reqItemIndex, reqTravelerFormIndex);
          } else {
            // console.log(
            //     'Unable to get response of doRemoveTripTraveller'
            // );
          } // IF Status

          reqFormData.ckBoxSaveTravelerReadOnly = false;
        });
      }
    },
    makeCardInfo(reqEngine, reqBookId, reqTravelerFormIndex, ckStatus) {
      // unselect all checkboxes and select the current

      let _allBookings = this.dynamicForms,
        i = 0,
        hasTripAcordion = false;

      for (i = 0; i < _allBookings.length; i++) {
        if (_allBookings[i].engine == 'trip') {
          // case if first accordion is trip info

          hasTripAcordion = true;
          continue;
        }

        let _bookingTravelers = _allBookings[i].traveler;
        let _bookingId = _allBookings[i].item.Id;

        _bookingTravelers.forEach((travelerInfo, index) => {
          travelerInfo.ckBoxCardInfo = false;
          travelerInfo.isPrimary = false;

          if (
            _bookingId == reqBookId &&
            reqTravelerFormIndex == index &&
            ckStatus == true
          ) {
            // ckStatus == false ||
            travelerInfo.ckBoxCardInfo = true;
            travelerInfo.isPrimary = true;
          }
        });
      } // Ends Outer FOR LOOP
    },
    saveTravellersOfTrip: function () {

      var promises = [];

      return new Promise((resolve, reject) => {
        // case for direct
        if (
          this.$store.getters.cartType == 'direct' ||
          this.$store.getters.cartType == 'trip'
        ) {
          resolve();
        }
      });
    },
    focusErrorFields() {
      const el = document.querySelector(
        '.v-messages.error--text:first-of-type'
      );
      let first = document.getElementById('firstname');
      let last = document.getElementById('lastname');
      let email = document.getElementById('email');
      let phone = document.getElementById('phone');
      let address = document.getElementById('address');
      let city = document.getElementById('city');
      let zip = document.getElementById('zip');
      let text = document.getElementsByClassName('v-messages__message');

      switch (text[0].innerText) {
        case 'First name field is required.':
          first.scrollIntoView();
          first.focus();
          break;

        case 'Last name field is required.':
          last.scrollIntoView();
          last.focus();
          break;

        case 'Enter Your Email':
          email.scrollIntoView();
          email.focus();
          break;

        case 'Cell Phone is required':
          phone.scrollIntoView();
          phone.focus();
          break;

        case 'Enter Your Street Address':
          address.scrollIntoView();
          address.focus();
          break;

        case 'City field is required.':
          city.scrollIntoView();
          city.focus();
          break;

        case 'Enter Zip Code':
          zip.scrollIntoView();
          zip.focus();
          break;

        default:
          console.log('default');
      }
    },
    submitForm: async function () {
      this.openAllExpansions(false).then((rsp) => {
        this.doValidateAllForms().then((validationStatuses) => {
          if (validationStatuses.includes('falisfy')) {
            this.focusErrorFields();
            return false;
          } else {

            this.saveTravellersOfTrip().then(() => {
          
              let _travellerForms = this.getBookingDetails();

              // console.log('_travellerForms', _travellerForms);
              // return false;

              let _stepOnePayLoads = {
                bookVia: this.$store.getters.cartType,
                travellerPaymentInfos: this.getPaymentTravellerInfo(),
              };

              if (this.checkOutType == 'trip')
                _stepOnePayLoads.tripId =
                  this.$store.getters.tripDetails.trip_id;

              if (this.checkOutType == 'direct')
                _stepOnePayLoads.bookingData = _travellerForms;

              let _stepOneCader = [_stepOnePayLoads];

              this.$store
                .dispatch('saveCheckoutOnePayload', {
                  PAYLOADS: _stepOneCader,
                })
                .then(() => {
                  if (this.checkOutType == 'trip') {
                    let _tempDataPayload = Object.assign({}, _stepOnePayLoads);
                    _tempDataPayload.bookingData = _travellerForms;
                    this.$store.dispatch('saveCheckoutTempData', {
                      PAYLOADS: [_tempDataPayload],
                    });
                  }

                  this.$router.push('/checkout-two').catch(() => {});
                });
            }); // Reolved 2nd traveller
          } // Ends IF ELSE IF ALL FORMS VALID
        }); // do validate all forms
      }); // ENDS PROMISE
    }, // Ends submitForm
    doValidateAllForms: function () {
      // validate all forms
      return new Promise((resolve, reject) => {
        let REFS = this.$refs,
          _formNames = [],
          _validStatuses = [];

        Object.keys(REFS).forEach((key) => {
          _formNames.push(key);
        });

        for (var i = 0; i < _formNames.length; i++) {
          if (_formNames[i].includes('trvSubForm')) {
            // validation for component sub-forms

            let subFormRef = 'form' + _formNames[i].split('_')[1];

            if (typeof this.$refs[_formNames[i]][0] != 'undefined')
              for (const [key, value] of Object.entries(
                this.$refs[_formNames[i]][0].$refs
              )) {
                let validStatus = 'falisfy';

                if (Array.isArray(value)) {
                  if (value[0].validate()) validStatus = 'truthly';
                } else {
                  if (value.validate()) validStatus = 'truthly';
                }

                _validStatuses.push(validStatus);
              }
          } else {
            // validation for component in parent

            let validStatus = 'falisfy';

            if (this.$refs[_formNames[i]][0].validate())
              validStatus = 'truthly';

            _validStatuses.push(validStatus);
          }
        }

        resolve(_validStatuses);
      });
    },
    CheckvalidEmail: function (emailAdress) {
      if (emailAdress == null) {
        return 'Email is required';
      }
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailAdress.match(regexEmail)) {
        return true;
      } else {
        return 'Email must be valid';
      }
    },
    populateBookingForms: function (ckMode) {
      if (ckMode == 'direct') {
        if (!this.$store.getters.ckStepOneCaders) return false;

        let preBookings = this.doCleanArray(
          this.$store.getters.ckStepOneCaders
        );

        this.dynamicForms.forEach((obj, index) => {
          preBookings.forEach((bkObj, bIndex) => {
            let _bookingAvData = bkObj.bookingData;

            _bookingAvData.forEach((avObj, avIndex) => {
              // if (avObj.engine == 'hotel') {

              // if (obj.item.Id != avObj.packageId)
              // return false;

              // } else {

              if (obj.item.Id != avObj.engineId) return false;
              // }

              if (obj.engine == avObj.engine) {
                avObj.travellerInfo.forEach((travellerInfo, tvIndex) => {
                  this.dynamicForms[index].traveler[tvIndex].saluation =
                    travellerInfo.title;
                  this.dynamicForms[index].traveler[tvIndex].firstName =
                    travellerInfo.firstName;

                  if (typeof travellerInfo.middleName != 'undefined')
                    this.dynamicForms[index].traveler[tvIndex].middleName =
                      travellerInfo.middleName;

                  this.dynamicForms[index].traveler[tvIndex].lastName =
                    travellerInfo.lastName;
                  this.dynamicForms[index].traveler[tvIndex].date1 =
                    travellerInfo.dob;
                  this.dynamicForms[index].traveler[tvIndex].defaultDOB =
                    travellerInfo.dob;
                  this.dynamicForms[index].traveler[tvIndex].regemail =
                    travellerInfo.email;
                  this.dynamicForms[index].traveler[tvIndex].premobileval =
                    travellerInfo.contactNumber;
                  this.dynamicForms[index].traveler[tvIndex].regmobile =
                    travellerInfo.contactNumber;
                  this.dynamicForms[index].traveler[tvIndex].address =
                    travellerInfo.address;
                  this.dynamicForms[index].traveler[tvIndex].country =
                    travellerInfo.country;
                  this.dynamicForms[index].traveler[tvIndex].state =
                    travellerInfo.state;
                  this.dynamicForms[index].traveler[tvIndex].city =
                    travellerInfo.city;
                  this.dynamicForms[index].traveler[tvIndex].zip =
                    travellerInfo.zip;
                  this.dynamicForms[index].traveler[tvIndex].country =
                    travellerInfo.country;
                  this.dynamicForms[index].traveler[tvIndex].state =
                    travellerInfo.state;
                  this.dynamicForms[index].traveler[tvIndex].pTravelersVal =
                    travellerInfo.pTravelersVal;

                  if (typeof travellerInfo.defaultCountry != 'undefined') {
                    this.dynamicForms[index].traveler[tvIndex].defaultCountry =
                      travellerInfo.defaultCountry;
                  }

                  //  if (travellerInfo.pTravelersVal == 2)
                  this.dynamicForms[index].traveler[
                    tvIndex
                  ].showFormForcely = true;

                  this.dynamicForms[index].traveler[tvIndex].ckBoxCardInfo =
                    travellerInfo.ckBoxCardInfo;

                  if (travellerInfo.userType == 'customer') {
                    this.dynamicForms[index].traveler[tvIndex].isPrimary = true;
                  } else {
                    this.dynamicForms[index].traveler[
                      tvIndex
                    ].isPrimary = false;
                  }

                  if (obj.engine == 'flight') {
                    this.dynamicForms[index].traveler[tvIndex].gender =
                      travellerInfo.gender;
                    this.dynamicForms[index].traveler[tvIndex].passport =
                      travellerInfo.passportNo;
                    this.dynamicForms[index].traveler[tvIndex].passportExpiry =
                      travellerInfo.passportExpiry;
                    this.dynamicForms[index].traveler[tvIndex].frequentFlyer =
                      travellerInfo.frequentFlyer;
                    this.dynamicForms[index].traveler[tvIndex].frequentFlyerNo =
                      travellerInfo.frequentFlyerNo;

                    if (travellerInfo.userType == 'customer')
                      this.dynamicForms[index].traveler[tvIndex].areaCode =
                        travellerInfo.areaCode;
                  }
                });

                /*

                                if(obj.engine=='activity') { // Needed to pre-populate questions and answers

                                    let _questions = obj.questions;

                                        if ('_extraDetail' in avObj) {

                                            let _avQuestions = avObj.['_extraDetail'].activity[0][avObj.engineId];

                                            _questions.forEach((question, index) => {
                                                
                                                _avQuestions.forEach((avQuestion, index) => {

                                                    if(avQuestion.quationId==question.Id)
                                                        question.Answer = avQuestion.quationAns;

                                                });

                                            });

                                        } // Check if has key

                                } // Ends IF activity

                                */
              }
            }); // _bookingAvData
          }); // preBookings
        }); // dynamicForms
      } // IF direct

      if (ckMode == 'trip') {
        if (!this.$store.getters.ckStepOneTripCaders) return false;

        let preBookings = this.doCleanArray(
          this.$store.getters.ckStepOneTripCaders
        );

        this.dynamicForms.forEach((obj, index) => {
          preBookings.forEach((bkObj, bIndex) => {
            let _bookingAvData = bkObj.bookingData;

            _bookingAvData.forEach((avObj, avIndex) => {
              if (avObj.engine == 'hotel') {
                if (obj.item.Id != avObj.packageId) return false;
              } else {
                if (obj.item.Id != avObj.engineId) return false;
              }

              if (obj.engine == avObj.engine) {
                avObj.travellerInfo.forEach((travellerInfo, tvIndex) => {
                  this.dynamicForms[index].traveler[tvIndex].saluation =
                    travellerInfo.title;
                  this.dynamicForms[index].traveler[tvIndex].firstName =
                    travellerInfo.firstName;

                  if (typeof travellerInfo.middleName != 'undefined')
                    this.dynamicForms[index].traveler[tvIndex].middleName =
                      travellerInfo.middleName;

                  this.dynamicForms[index].traveler[tvIndex].lastName =
                    travellerInfo.lastName;
                  this.dynamicForms[index].traveler[tvIndex].date1 =
                    travellerInfo.dob;
                  this.dynamicForms[index].traveler[tvIndex].defaultDOB =
                    travellerInfo.dob;
                  this.dynamicForms[index].traveler[tvIndex].regemail =
                    travellerInfo.email;

                  if (typeof travellerInfo.dialingCountryCode != 'undefined') {
                    this.dynamicForms[index].traveler[tvIndex].premobileval =
                      travellerInfo.dialingCountryCode.replace('+', '') +
                      travellerInfo.contactNumber;
                  } else {
                    this.dynamicForms[index].traveler[tvIndex].premobileval =
                      travellerInfo.contactNumber;
                  }

                  this.dynamicForms[index].traveler[tvIndex].regmobile =
                    travellerInfo.contactNumber;
                  this.dynamicForms[index].traveler[tvIndex].address =
                    travellerInfo.address;
                  this.dynamicForms[index].traveler[tvIndex].country =
                    travellerInfo.country;
                  this.dynamicForms[index].traveler[tvIndex].state =
                    travellerInfo.state;
                  this.dynamicForms[index].traveler[tvIndex].city =
                    travellerInfo.city;
                  this.dynamicForms[index].traveler[tvIndex].zip =
                    travellerInfo.zip;
                  this.dynamicForms[index].traveler[tvIndex].country =
                    travellerInfo.country;
                  this.dynamicForms[index].traveler[tvIndex].state =
                    travellerInfo.state;
                  this.dynamicForms[index].traveler[
                    tvIndex
                  ].ckBoxSaveTraveler = true;

                  if (typeof travellerInfo.defaultCountry != 'undefined') {
                    this.dynamicForms[index].traveler[tvIndex].defaultCountry =
                      travellerInfo.defaultCountry;
                  }

                  this.dynamicForms[index].traveler[tvIndex].ckBoxCardInfo =
                    travellerInfo.ckBoxCardInfo;

                  if (travellerInfo.userType == 'customer') {
                    this.dynamicForms[index].traveler[tvIndex].isPrimary = true;
                  } else {
                    this.dynamicForms[index].traveler[
                      tvIndex
                    ].isPrimary = false;
                  }

                  if (obj.engine == 'flight') {
                    this.dynamicForms[index].traveler[tvIndex].gender =
                      travellerInfo.gender;
                    this.dynamicForms[index].traveler[tvIndex].passport =
                      travellerInfo.passportNo;
                    this.dynamicForms[index].traveler[tvIndex].passportExpiry =
                      travellerInfo.passportExpiry;
                    this.dynamicForms[index].traveler[tvIndex].frequentFlyer =
                      travellerInfo.frequentFlyer;
                    this.dynamicForms[index].traveler[tvIndex].frequentFlyerNo =
                      travellerInfo.frequentFlyerNo;

                    if (travellerInfo.userType == 'customer')
                      this.dynamicForms[index].traveler[tvIndex].areaCode =
                        travellerInfo.areaCode;
                  }

                  this.dynamicForms[index].traveler[tvIndex].pTravelersVal =
                    travellerInfo.pTravelersVal;

                  if (travellerInfo.pTravelersVal == 2)
                    this.dynamicForms[index].traveler[
                      tvIndex
                    ].showFormForcely = true;
                });
              }
            }); // _bookingAvData
          }); // preBookings
        }); // dynamicForms
      } // IF trip
    },
    selectTraveler: function (bookingId, item) {
      if (this.multiDriverFlag == false) {
        this.populateTravelerInfo(bookingId, [item]);
      } else {
        this.populateTravelerInfo(bookingId, item);
      }
    },
    populateTravelerInfo: function (bookingId, travelers) {
      let _reqTravelers = this.doCleanArray(travelers);
      this.dynamicForms = this.doCleanArray(this.dynamicForms);

      this.dynamicForms.forEach((obj, index) => {
        if (obj.item.Id == bookingId) {
          obj.traveler = [];

          _reqTravelers.forEach((trv, index) => {
            let _travellerChuck = this.populateTravelerForm(trv);

            obj.traveler.push(_travellerChuck);
          });
        }

        let _currentTravelersOfBooking = obj.traveler;
        _currentTravelersOfBooking = this.doCleanArray(
          _currentTravelersOfBooking
        );

        if (!_currentTravelersOfBooking.length) {
          obj.traveler.push(this.doCleanArray(this.iTraveler));
        }
      });
    },
    populateTravelerForm: function (info) {
      let _title = info.title;

      if (_title !== null) _title = _title.replace(/\./g, '') + '.';

      return {
        bookingId: null,
        travellerId: info.id,
        saluation: _title,
        checked: true,
        ckBoxChecked: info.isPrimaryTraveler == 1 ? true : false,
        isPrimary: info.isPrimaryTraveler,
        firstName: info.firstName,
        middleName: info.lastName,
        lastName: info.lastName,
        regemail: info.email,
        regmobile: info.mobile,
        regmobileMeta: {},
        date1: info.dob != '' ? info.dob : '',
        menu1: false,
        passport: info.passport,
        address: info.address,
      };
    },
    onUpdatePhone(formattedNumber, { number, valid, country }) {
      this.validNumber = valid;
      this.country = country.name;
      this.phone.countryCode = country.iso2;
      this.phone.isValid = valid;
      this.phone.phoneNumber = formattedNumber.replace(/\s+/g, '');
      this.phone.countryCallingCode = country.dialCode;
      this.phone.formattedNumber = number.e164;
      this.phone.nationalNumber = number.significant;
      this.phone.formatInternational = number.international;
      this.phone.formatNational = number.national;
      this.phone.uri = number.rfc3966;
      this.phone.e164 = number.e164;

      this.$emit('onPhoneData', this.phone);

      let num = number.international;

      if (num) {
        num = num.replace('+', '');
        num = num.replace(/\s+/g, '');
        num = num.replace('undefined', '');

        this.mobile = num;
      }
    },
    checkValidNumber() {
      if (!this.validNumber) return 'Please enter valid mobile number';
      return true;
    },
    countryChanged(country) {
      this.country = country.name;
    },
    getDisplayTitlesByEngine(engine) {
      let _displayTitle = '',
        _displayLabel = '',
        _displayVals = '';

      if (engine == 'car') {
        _displayTitle = 'Driver';
        _displayLabel = 'Choose Driver';
        _displayVals = [
          { text: 'Please choose', value: 0 },
          { text: 'New Driver', value: 1 },
          { text: 'Existing Driver', value: 2 },
        ];
      }

      if (engine == 'flight') {
        _displayTitle = 'Passenger';
        _displayLabel = 'Choose Passenger';
        _displayVals = [
          { text: 'Please choose', value: 0 },
          { text: 'New Passenger', value: 1 },
          { text: 'Existing Passenger', value: 2 },
        ];
      }

      if (engine == 'hotel' || engine == 'villa' || engine == 'activity') {
        _displayTitle = 'Guest';
        _displayLabel = 'Choose Guest';
        _displayVals = [
          { text: 'Please choose', value: 0 },
          { text: 'New Guest', value: 1 },
          { text: 'Existing Guest', value: 2 },
        ];
      }

      return {
        displayTitle: _displayTitle,
        displayLabel: _displayLabel,
        displayVals: _displayVals,
      };
    },
    getCountryByDomain() {
      let _domain = this.$store.state.envStore.domain;

      if (_domain == 'us') return 'United States';

      if (_domain == 'uk') return 'United Kingdom';

      if (_domain == 'mx') return 'Mexico';

      return _domain.toUpperCase();
    },
    makeFlightForms(item, travelerPayloads, index) {
      let travelerForms = [],
        kIndex = 0;

      let { adults, child, infants, seniors } = item.item.details.searchData;

      let passengenrs = {
        adult: Number(adults),
        senior: Number(seniors),
        child: Number(child),
        infant: Number(infants),
      };

      let isPrimaryIdentified = false;

      for (const key of Object.keys(passengenrs)) {
        if (passengenrs[key] > 0) {
          let i = 1;
          while (i <= passengenrs[key]) {
            const pTypeForm = Object.assign({}, travelerPayloads);

            pTypeForm.customerType = key;
            // pTypeForm.isPassportRequired = true;
            pTypeForm.isPassportRequired =
              item.item.isPassportMandatory == true ? true : false;
            pTypeForm.isLead = false;

            if (
              (key.toLowerCase().trim() == 'adult' ||
                key.toLowerCase().trim() == 'senior') &&
              isPrimaryIdentified == false
            ) {
              pTypeForm.displayTitle = 'Lead Passenger';
              pTypeForm.isLead = true;
              isPrimaryIdentified = true;
            } else {
              pTypeForm.displayTitle =
                this.capitalizeFirstLetter(key) + ' # ' + i;
            }

            if (key == 'child' || key == 'infant') {
              pTypeForm.pTravelersVal = 1;
              pTypeForm.FlagSearchTravelers = true;

              if (moment().diff(moment(pTypeForm.date1), 'years', false) < 12) {
                pTypeForm.isActive = false;
              } else {
                pTypeForm.isActive = true;
              }
            } else {
              pTypeForm.isActive = true;
            }

            if (index == 0 && kIndex > 0) {
              pTypeForm.ckBoxChecked = false;
              pTypeForm.isPrimary = false;
              pTypeForm.ckBoxCardInfo = false;
            }

            travelerForms.push(pTypeForm);

            i++;
            kIndex++;
          } // Ends While
        } // IF
      } // ENDS FOR LOOP

      return travelerForms;
    },
    makeHotelForms(item, travelerPayloads, index) {
      let hotelForms = [],
        kIndex = 0,
        lastRoomNumber = 0,
        _bookedRooms = item.item.room.rooms,
        brIndex = 0;

      let _hotelId = item.item.engineId;
      let _roomId = item.item.roomId;

      travelerPayloads.roomNumber = false;

      _bookedRooms.forEach((room, roomNumber) => {
        let _roomNumberStats = roomNumber;

        _roomNumberStats = ++_roomNumberStats;

        let { adults, kidsAges } = room;

        let guests = {
          adult: adults,
          child: kidsAges,
        };

        let reqKidsAges = guests.child;

        _roomId = room.roomId;

        for (const key of Object.keys(guests)) {
          if (Array.isArray(guests[key])) guests[key] = guests[key].length;

          if (guests[key] > 0) {
            let i = 1;
            let isPrimaryIdentified = false;

            while (i <= guests[key]) {
              const pTypeForm = Object.assign({}, travelerPayloads);

              pTypeForm.customerType = key;

              if (
                roomNumber == 0 &&
                key.toLowerCase().trim() == 'adult' &&
                isPrimaryIdentified == false
              ) {
                pTypeForm.displayTitle = 'Primary Traveler';
                isPrimaryIdentified = true;
              } else {
                pTypeForm.displayTitle =
                  this.capitalizeFirstLetter(key) + ' # ' + i;
              }

              pTypeForm.roomId = _roomId;
              pTypeForm.hotelId = _hotelId;

              if (key == 'child') {
                pTypeForm.pTravelersVal = 1;
                pTypeForm.FlagSearchTravelers = true;
                pTypeForm.ageOfChild = reqKidsAges[i - 1];

                if (
                  moment().diff(moment(pTypeForm.date1), 'years', false) < 12
                ) {
                  pTypeForm.isActive = false;
                } else {
                  pTypeForm.isActive = true;
                }
              } else {
                pTypeForm.isActive = true;
              }

              if (index == 0 && kIndex > 0) {
                pTypeForm.ckBoxChecked = false;
                pTypeForm.isPrimary = false;
                pTypeForm.ckBoxCardInfo = false;
              }

              if (lastRoomNumber == 0 || lastRoomNumber != _roomNumberStats) {
                pTypeForm.roomNumber = 'Room # ' + _roomNumberStats;
                lastRoomNumber = _roomNumberStats;
              }

              hotelForms.push(pTypeForm);

              i++;
              kIndex++;
            } // Ends While
          } // Ends If guests greates than 0
        } // ENDS FOR LOOP
      }); // Ends Foreach On _bookedRooms

      return hotelForms;
    },
    makeActivityForms(item, travelerPayloads, index) {
        
        let isPrimaryIdentified = false;
        let countForms = 1;
        let travellerForms = [];
        let matrixes = this.doCleanArray(this.$store.state.ActivityStore.searchedAvailabilityData.requestData.ageRange);
        matrixes.sort((a,b)=> (a.ageRangeId > b.ageRangeId ? 1 : -1));
        
        matrixes.forEach((key, indexNumber) => {

            let ageGroup = key.ageRangeId.toLowerCase().trim();
            let noOfAgeForms = key.count;
            let i = 1;

              while (i <= noOfAgeForms) {

                const pTypeForm = Object.assign({}, travelerPayloads);

                pTypeForm.customerType = ageGroup;

                if (
                  ageGroup == 'adult' &&
                  isPrimaryIdentified == false
                ) {

                  pTypeForm.displayTitle = 'Primary Traveler';
                  isPrimaryIdentified = true;
                  pTypeForm.isPrimary = true;
                  pTypeForm.order     = 1;
                } else {

                  pTypeForm.displayTitle =
                    this.capitalizeFirstLetter(ageGroup) + ' # ' + i;
                }


                if (ageGroup == 'child') {
                  pTypeForm.pTravelersVal = 1;
                  pTypeForm.isActive = true;
                  pTypeForm.order     = 3;
                }
                if (ageGroup == 'infant') {
                  pTypeForm.pTravelersVal = 1;
                  pTypeForm.isActive = true;
                  pTypeForm.order     = 4;
                }
                if (ageGroup == 'youth') {
                  pTypeForm.pTravelersVal = 1;
                  pTypeForm.isActive = true;
                  pTypeForm.order     = 2;
                }
                if (ageGroup == 'traveler') {
                  pTypeForm.pTravelersVal = 1;
                  pTypeForm.isActive = true;
                  pTypeForm.order     = 1;
                }

                if (index == 0 && countForms > 0) {
                
                  pTypeForm.ckBoxChecked = false;
                  pTypeForm.isPrimary = false;
                  pTypeForm.ckBoxCardInfo = false;
                }

                pTypeForm.bookingQuestionAnswers = pTypeForm.bookingQuestionAnswers.map((v) => ({ ...v, travelerNum: countForms }));

                if(!pTypeForm){
                  
                }

                travellerForms.push(pTypeForm);

                i++;
                countForms++;
              } // Ends While
        });
        
        travellerForms.sort((a, b) => a.order - b.order);

        return travellerForms;

    }, // Ends makeActivityForms
    drawQuestionsOfActivity(questions, offType = 'PER_BOOKING') { // PER_TRAVELER

        let _formattedQuestions = [];

        questions.forEach(function(question) {

          if(question.group==offType)
            _formattedQuestions.push(question);
        });

      _formattedQuestions = _formattedQuestions.sort(function (a, b) {
        return Number(a.SortOrder) - Number(b.SortOrder);
      });

      _formattedQuestions = _formattedQuestions.map((v) => ({ ...v, answer: null, question: v.id }));

      return this.doCleanArray(_formattedQuestions);
    },
    drawSearchExisting() {
      return {
        search: '',
        loading: false,
        headers: [
          { text: 'Sr No', value: 'id' },
          { text: 'First Name', value: 'vcFName' },
          { text: 'Last Name', value: 'vcLName' },
          { text: 'Phone', value: 'vcHPhone' },
          { text: 'Email', value: 'vcEmail' },
          { text: 'Action', value: 'action' },
        ],
        travellers: [],
        error: false,
      };
    },
  },
  watch: {},
  computed: {
    ...mapState({
      domain: (state) => state.envStore.domain,
      countryDF: (state) => state.envStore.countryDF,
      trips: (state) => state.tripStore.tripBookings,
    }),

    whiteList() {
      if (this.domain == 'us')
        return [
          'US',
          'AS',
          'BS',
          'BB',
          'BZ',
          'BM',
          'KY',
          'DO',
          'FM',
          'GU',
          'JM',
          'MH',
          'UM',
          'MP',
          'PS',
          'PZ',
          'KN',
          'TT',
          'TC',
          'VI',
        ];
      else if (this.domain == 'uk') return ['GB', 'VG'];
      else if (this.domain == 'mx') return ['MX'];
      else if (this.domain == 'fr')
        return [
          'PF',
          'TF',
          'GP',
          'GY',
          'MQ',
          'YT',
          'NC',
          'RE',
          'BL',
          'MF',
          'PM',
          'WF',
        ];
    },
    mobile: {
      get: function () {
        return this.value;
      },
      set: function (newVal) {
        this.$emit('input', newVal);
      },
    },

    birthdayDate: {
      get: function () {
        return this.formattedDate(
          this.iTraveler.date1,
          this.dateFormatPlaceHolder
        );
      },
      set: function (newValue) {
        // default setters auto call
      },
    },

    compTripStartDateFormatted: {
      get: function () {
        return this.formattedDate(this.date2, 'MM/DD/YYYY');
        // this.dateFormatPlaceHolder
      },
      set: function (newValue) {},
    },

    lastCartMode() {
      return this.$store.getters.cartType;
    },
    bookingItems() {
      let that = this;

      if (that.hasEarlyReturn == false) {
        // Booking Itertaions
        let _myBookings = that.doCleanArray(
          that.$store.state.cartStore.cartBulk
        );

        _myBookings.forEach((item, index) => {
          if (this.lastCartMode == 'trip') {
            // incase flight item is already expired
            if (item.engine == 'flight' || item.engine == 'hotel')
              if (item.item.sessionDetails.expire) {
                this.disableProceedBtn = true;
                return;
              }

            // incase car item is already expired
            if (item.engine == 'car')
              if (item.item.expire) {
                this.disableProceedBtn = true;
                return;
              }
          }

          let _iTraveler = that.doCleanArray(that.iTraveler),
            displayTitleOfEngine = this.getDisplayTitlesByEngine(item.engine);

          if (typeof _iTraveler.defaultCountry == 'undefined') {
            let _domain = this.$store.state.envStore.domain;

            if (_domain == 'us') {
              _iTraveler.defaultCountry = 'US';
              this.defCountryInDropDown = 'United States';
            } else if (_domain == 'uk') {
              _iTraveler.defaultCountry = 'GB';
              this.defCountryInDropDown = 'United Kingdom';
            } else if (_domain == 'mx') {
              _iTraveler.defaultCountry == 'MX';
              this.defCountryInDropDown = 'Mexico';
            } else {
              _iTraveler.defaultCountry = _domain.toUpperCase();
              this.defCountryInDropDown = _domain.toUpperCase();
            }
          } // Ends IF

          if (typeof item.item.sessionId != 'undefined')
            _iTraveler.sessionId = item.item.sessionId;

          _iTraveler.country = this.getCountryByDomain();
          _iTraveler.pTravelersTitle = displayTitleOfEngine.displayTitle;
          _iTraveler.pTravelersLabel = displayTitleOfEngine.displayLabel;
          _iTraveler.pTravelers = displayTitleOfEngine.displayVals;
          _iTraveler.FlagSearchTravelers = false;
          item.agreeTerms = false;
          item.agreeTermsError = [];
          item.saveUserError = false;
          item.saveUserErrorDetail = '';
          item.details = null;

          if (item.engine == 'car') {
            if (that.checkOutType == 'trip') {
              let _bookingDetails = this.doCleanArray(
                this.$store.getters.tripSummary.trip_bookings
              );

              _bookingDetails.forEach((bookedItem, indek) => {
                if (
                  bookedItem.id == item.item.bookingId &&
                  bookedItem.engine == item.engine
                ) {
                  if (bookedItem.carDetails != null)
                    item.details = bookedItem.carDetails.carDetails;

                  if (
                    bookedItem.carDetails == null &&
                    typeof bookedItem.details != 'undefined'
                  )
                    item.details = bookedItem.details.engineDetails;
                }
              });
            } // IF Checkout Is Trip, Then grab details from booking items

            if (that.checkOutType == 'direct') {
              item.details = item.item.searchedDetail.carDetails;
            } // IF Checkout Is Trip, Then grab details from booking items
          } // Ends IF ENGINE CAR

          if (item.engine == 'activity') {

            item.hasBookingQuestions = false;
            item.bookingQuestions = [];
            _iTraveler.hasBookingQuestions = false;
            _iTraveler.bookingQuestionAnswers = [];


              if (that.checkOutType == 'trip') {

                  if (
                    typeof item.item.activityDetails.activityDetail != 'undefined'
                  ) {
                    if (
                      typeof item.item.activityDetails.activityDetail.bookingQuestions !=
                      'undefined'
                    ) {
                      if (
                        item.item.activityDetails.activityDetail.bookingQuestions.length
                      ) {

                        item.bookingQuestions = this.drawQuestionsOfActivity(item.item.activityDetails.activityDetail.bookingQuestions, 'PER_BOOKING'); // PER_BOOKING
                        item.hasBookingQuestions = (item.bookingQuestions.length ) ? true : false;

                  
                        _iTraveler.bookingQuestionAnswers = this.drawQuestionsOfActivity(item.item.activityDetails.activityDetail.bookingQuestions, 'PER_TRAVELER');
                        _iTraveler.hasBookingQuestions = (_iTraveler.bookingQuestionAnswers.length ) ? true : false;
                      }
                    }
                  } //

              } // If Checkout type trip


            if (that.checkOutType == 'direct') {

                  if (
                    typeof item.item.details.activityDetails != 'undefined'
                  ) {
                    if (
                      typeof item.item.details.activityDetails.bookingQuestions !=
                      'undefined'
                    ) {
                      if (
                        item.item.details.activityDetails.bookingQuestions.length
                      ) {

                        item.bookingQuestions = this.drawQuestionsOfActivity(item.item.details.activityDetails.bookingQuestions, 'PER_BOOKING'); // PER_BOOKING
                        item.hasBookingQuestions = (item.bookingQuestions.length ) ? true : false;

                  
                        _iTraveler.bookingQuestionAnswers = this.drawQuestionsOfActivity(item.item.details.activityDetails.bookingQuestions, 'PER_TRAVELER');
                        _iTraveler.hasBookingQuestions = (_iTraveler.bookingQuestionAnswers.length ) ? true : false;
                      }
                    }
                  } //

              } // If Checkout type trip


          } // Ends IF ACTIVITY

          _iTraveler.searchTravelers = this.drawSearchExisting();
          _iTraveler.userType = 'traveller';

          item.traveler = [_iTraveler];

          if (item.engine == 'flight')
            item.traveler = this.makeFlightForms(item, _iTraveler, index);

          if (item.engine == 'hotel')
            item.traveler = this.makeHotelForms(item, _iTraveler, index);

          if (item.engine == 'activity')
            item.traveler = this.makeActivityForms(item, _iTraveler, index);


            let newIndex = index+1;

          that.dynamicForms.push(item);

        });

        that.hasEarlyReturn = true;

        that.dynamicForms = that.doCleanArray(that.dynamicForms);

        console.log('dynamicForms',that.dynamicForms);

        // All Forms Need to open by default
        that.openAllExpansions(true);

        that.populateBookingForms(that.checkOutType);
      }
    },
    travellersOfTrip() {
      let _tripTravellers = this.doCleanArray(
        this.$store.getters.tripSummary.trip_travellers
      );

      return _tripTravellers;
    },
  },
};
</script>

<style>
.v-application .ml-8 {
  margin-left: 0px !important;
}

.accordian-header {
  line-height: 2;
}
.date-dropdown-select {
  outline: none;
}
.date-dropdown-select {
}
@media (max-width: 599.98px) {
  .travel-box-button .form-checkBox .setmargin {
    margin-right: 2px !important;
  }
}
.date-dropdown-select {
  display: inline-block;
  border-bottom: 0px solid #949494 !important;
  border-radius: 0px !important;
  width: 100%;
  height: 35px;
  line-height: 20px;
  border-top: 0px !important;
  margin-right: 10px;
  border-left: 0px !important;
  background: #fff;
  border-right: 0px !important;
}
.date-dropdown-select {
  font-size: 14px;
}
@media screen and (max-width: 601px) and (min-width: 400px) {
  .date-dropdown-select {
    display: inline-block;
    border-bottom: 1px solid #949494 !important;
    border-radius: 0px !important;
    /* padding: 8px; */
    /* width: 100%; */
    width: 26.5vw;
    height: 35px;
    line-height: 20px;
    border-top: 0px solid #949494 !important;
    margin-right: 10px;
    border-left: 0px solid #949494 !important;
    background: #fff;
    border-right: 0px solid #949494 !important;
  }
}
@media screen and (max-width: 1100px) and (min-width: 601px) {
  .date-dropdown-select {
    display: inline-block;
    border-bottom: 1px solid #949494 !important;
    border-radius: 0px !important;
    /* padding: 8px; */
    /* width: 100%; */
    width: 14vw;
    height: 35px;
    line-height: 20px;
    border-top: 0px solid #949494 !important;
    margin-right: 10px;
    border-left: 0px solid #949494 !important;
    background: #fff;
    border-right: 0px solid #949494 !important;
  }
}

@media screen and (max-width: 1250px) and (min-width: 1100px) {
  .date-dropdown-select {
    display: inline-block;
    border-bottom: 1px solid #949494 !important;
    border-radius: 0px !important;
    /* padding: 8px; */
    /* width: 100%; */
    width: 14.3vw;
    height: 35px;
    line-height: 20px;
    border-top: 0px solid #949494 !important;
    margin-right: 10px;
    border-left: 0px solid #949494 !important;
    background: #fff;
    border-right: 0px solid #949494 !important;
  }
}
@media screen and (max-width: 1500px) and (min-width: 1251px) {
  .date-dropdown-select {
    display: inline-block;
    border-bottom: 1px solid #949494 !important;
    border-radius: 0px !important;
    width: 8.7vw;
    height: 35px;
    line-height: 20px;
    border-top: 0px solid #949494 !important;
    margin-right: 10px;
    border-left: 0px solid #949494 !important;
    background: #fff;
    border-right: 0px solid #949494 !important;
  }
}
.m-45 {
  margin-top: 45px !important;
}
@media screen and (max-width: 1800px) and (min-width: 1500px) {
  .date-dropdown-select {
    display: inline-block;
    border-bottom: 1px solid #949494 !important;
    border-radius: 0px !important;
    width: 7.2vw;
    height: 35px;
    line-height: 20px;
    border-top: 0px solid #949494 !important;
    margin-right: 10px;
    border-left: 0px solid #949494 !important;
    background: #fff;
    border-right: 0px solid #949494 !important;
  }
}
@media screen and (max-width: 1900px) and (min-width: 1801px) {
  .date-dropdown-select {
    display: inline-block;
    border-bottom: 1px solid #949494 !important;
    border-radius: 0px !important;
    width: 7vw;
    height: 35px;
    line-height: 20px;
    border-top: 0px solid #949494 !important;
    margin-right: 10px;
    border-left: 0px solid #949494 !important;
    background: #fff;
    border-right: 0px solid #949494 !important;
  }
}

@media screen and (max-width: 2001px) and (min-width: 1901px) {
  .date-dropdown-select {
    display: inline-block;
    border-bottom: 1px solid #949494 !important;
    border-radius: 0px !important;
    width: 6.5vw;
    height: 35px;
    line-height: 20px;
    border-top: 0px solid #949494 !important;
    margin-right: 10px;
    border-left: 0px solid #949494 !important;
    background: #fff;
    border-right: 0px solid #949494 !important;
  }
}
.date-date-of-birth-label {
  font-size: 14px !important;
  color: rgba(0, 0, 0, 0.6) !important;
}

.Ptrv .v-label,
.input-label {
  color: rgba(0, 0, 0, 0.6);
  height: 20px;
  line-height: 20px;
  letter-spacing: normal;
}

.add-travel-form
  .theme--light.v-text-field
  > .v-input__control
  > .v-input__slot:before {
  border-color: rgba(0, 0, 0, 0.42) !important;
}

::placeholder {
  color: red;
  opacity: 1;
}

:-ms-input-placeholder {
  color: red;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: red;
}
</style>
