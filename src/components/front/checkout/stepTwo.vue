<template>
  <span style="display: block !important">
    <section class="trip-search-filter">
      <v-container>
        <div class="title-heading">
          <h1 class="blue-heading">Checkout</h1>
        </div>
      </v-container>
    </section>
    <section class="search-results add-travel-sectionTop">
      <v-container>
        <v-row align="center">
          <div class="col-lg-12">
            <div class="search-heading"></div>
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
                  <div class="left-corner"></div>
                  <div class="right-corner"></div>
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
                              style="color: #982727 !important"
                            >
                              {{ paymentPreferences }}
                            </span>
                          </div>
                        </v-row>

                        <div
                          class="col-md-12 pl-0 pb-2"
                          style=""
                          v-if="displayTripTravelers"
                        >
                          <span v-if="travellersOfTrip.length > 0">
                            <v-checkbox v-model="ckDisplayTravellersOfTrip">
                              <template slot="label">
                                <h4 class="pb-4">
                                  Invite & Get Customer Payment Details
                                </h4>
                              </template>
                            </v-checkbox>

                            <v-spacer
                              v-show="ckDisplayTravellersOfTrip"
                            ></v-spacer>

                            <v-alert
                              dense
                              outlined
                              prominent
                              type="info"
                              v-if="
                                displayTripTravelers && travelerInvitedToPay && ckDisplayTravellersOfTrip
                              "
                            >
                              <b>Important</b> Please wait until the payment made/fill up by customer.
                            </v-alert>


                              <div v-if="displayTripTravelers && travelerInvitedToPay && ckDisplayTravellersOfTrip" class="w-100 float-right" style="display: flex;">
                                
                                <v-text-field
                                 color="primary"
                                  class=" mr-2"
                                  v-model="invitedCustomerLink"
                                  id="inputLinkID"
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

                            <v-data-table
                              :headers="[
                                { text: 'Sr No', value: 'id' },
                                {
                                  text: 'First Name',
                                  value: 'traveller.firstName',
                                },
                                {
                                  text: 'Last Name',
                                  value: 'traveller.lastName',
                                },
                                { text: 'Email', value: 'traveller.email' },
                                { text: 'Action', value: 'action' },
                              ]"
                              :items="travellersOfTrip"
                              :items-per-page="5"
                              class="tablerows"
                              style="margin-top: 20px"
                              v-show="ckDisplayTravellersOfTrip"
                            >
                              <template v-slot:item="row">
                                <tr>
                                  <td>
                                    {{ row.item.srIndex }}
                                  </td>
                                  <td>
                                    {{ row.item.traveller.firstName }}
                                  </td>
                                  <td>
                                    {{ row.item.traveller.lastName }}
                                  </td>
                                  <td>
                                    {{ row.item.traveller.email }}
                                  </td>

                                  <td>
                                    <v-btn
                                      x-small
                                      color="primary"
                                      class="white--text"
                                      @click="
                                        inviteToPay(
                                          row.item.traveller.email,
                                          row.item
                                        )
                                      "
                                      v-if="row.item.sent == false && !row.item.paid"
                                      :disabled="row.item.action"
                                    >
                                      INVITE
                                    </v-btn>
                                    <v-btn
                                      x-small
                                      color="primary"
                                      class="white--text"
                                      v-if="row.item.sent && !row.item.paid"
                                      :disabled="row.item.action"
                                    >
                                      SENT &nbsp;&nbsp;

                                      <v-icon
                                        small
                                        color="teal darken-2"
                                        v-if="row.item.sent && !row.item.paid"
                                      >
                                        mdi-email
                                      </v-icon>
                                    </v-btn>

                                    <v-btn
                                      x-small
                                      color="primary"
                                      class="white--text"
                                      v-if="row.item.paid"
                                      :disabled="row.item.action"
                                    >
                                      PAID &nbsp;&nbsp;

                                      <v-icon
                                        small
                                        color="teal darken-2"
                                        v-if="row.item.paid"
                                      >
                                        mdi-email
                                      </v-icon>
                                    </v-btn>

                                  </td>
                                </tr>
                              </template>
                            </v-data-table>
                          </span>
                        </div>

                        <div v-show="!ckDisplayTravellersOfTrip">

                          <h4 class="pb-4">Card Holder Information</h4>

                          <div class="payment-info-box mt-5" id="diverror">
                            <v-row class="m-0">
                              <div class="col-md-6 col-sm-6">
                                <div class="add-travel-input">
                                  <label>First Name</label>
                                  <v-text-field
                                    placeholder="Enter Your First Name"
                                    v-model="cardHolderFirstName"
                                    id="firstname"
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
                                    v-model="cardHolderLastName"
                                    id="lastname"
                                    :rules="[
                                      (v) =>
                                        !!v || 'Last name field is required.',
                                    ]"
                                  ></v-text-field>
                                </div>
                              </div>

                              <div class="col-md-6 col-sm-6 mt-5">
                                <div class="add-travel-input">
                                  <label>Email</label>
                                  <v-text-field
                                    placeholder="Enter Your Email"
                                    v-model="cardHolderEmail"
                                    id="email"
                                    :rules="[(v) => CheckvalidEmail(v)]"
                                  ></v-text-field>
                                </div>
                                <div id="error_email"></div>
                              </div>

                              <div class="col-md-6 col-sm-6">
                                <label>Mobile Phone Number </label>
                                <div
                                  class="add-travel-input mobile-feild-styling"
                                >
                                  <phone-num-select
                                    v-model="mobile"
                                    :value="premobileval"
                                    label="Mobile Number"
                                    :phoneDetails="false"
                                    id="phone"
                                  />
                                </div>
                              </div>

                              <div class="col-md-6 col-sm-6">
                                <div class="add-travel-input">
                                  <label>Street Address</label>
                                  <v-text-field
                                    placeholder="Enter Your Street Address"
                                    height="40"
                                    id="address"
                                    v-model="cardHolderAddress"
                                    :rules="[
                                      (v) =>
                                        !!v ||
                                        'Street Address field is required.',
                                      (v) =>
                                        (v && v.length >= 10) ||
                                        'Street Address must have atleast 10 characters',
                                      (v) =>
                                        !/[^a-zA-Z0-9 ]/.test(v) ||
                                        'Address must contain only alphabets, numbers and space.',
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

                              <div class="col-md-6 col-sm-6">
                                <div class="add-travel-input">
                                  <label>City</label>
                                  <v-text-field
                                    :hide-details="false"
                                    id="city"
                                    background-color="white"
                                    height="40"
                                    placeholder="City"
                                    v-model="city"
                                    :rules="[(v) => !!v || 'City is required.']"
                                  ></v-text-field>
                                </div>
                              </div>

                              <div class="col-md-6 col-sm-6">
                                <div class="add-travel-input">
                                  <label>State</label>
                                  <region-select
                                    v-if="country"
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
                                    id="zip"
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

                      </div>

                      <div class="travel-box-iner" v-show="!ckDisplayTravellersOfTrip">
                        <h4 class="pb-4">Card Information</h4>
                        <div class="payment-info-box mt-5">
                          <v-row class="m-0">
                            <div class="col-md-6 col-sm-6">
                              <div
                                class="add-travel-input"
                                v-if="IsByinvite == true"
                              >
                                <label>Card Number</label>
                                <v-text-field
                                  pattern="[0-9]"
                                  required
                                  v-mask="compMask"
                                  v-model="card"
                                  :messages="
                                    errors['paymentDetails.ccNumber']
                                      ? ' Please input valid card number.'
                                      : ''
                                  "
                                  placeholder="0000-0000-0000-0000"
                                  v-bind:class="
                                    errors['paymentDetails.ccNumber']
                                      ? 'input-error'
                                      : ''
                                  "
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

                              <div
                                class="add-travel-input"
                                v-if="IsByinvite == false"
                              >
                                <label>Card Number</label>
                                <v-text-field
                                  pattern="[0-9]"
                                  required
                                  v-mask="compMask"
                                  v-model="card"
                                  :messages="
                                    errors['paymentDetails.ccNumber']
                                      ? ' Please input valid card number.'
                                      : ''
                                  "
                                  placeholder="0000-0000-0000-0000"
                                  v-bind:class="
                                    errors['paymentDetails.ccNumber']
                                      ? 'input-error'
                                      : ''
                                  "
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
                                    :messages="
                                      errors['paymentDetails.cardExpireMonth']
                                        ? 'Please input valid Expiry date.'
                                        : ''
                                    "
                                    @keyup="creditExpiryInput"
                                  >
                                  </v-text-field>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6 col-sm-6">
                              <div
                                class="add-travel-input"
                                v-if="IsByinvite == false"
                              >
                                <label> CVV </label>
                                <v-text-field
                                  type="number"
                                  v-model="csv"
                                  v-bind:class="
                                    errors['paymentDetails.cardCvv']
                                      ? 'input-error'
                                      : ''
                                  "
                                  placeholder="***"
                                  :messages="
                                    errors['paymentDetails.cardCvv']
                                      ? 'Please input valid card CVV.'
                                      : ''
                                  "
                                  :rules="[
                                    (v) => !!v || 'CVV field is required.',
                                    validateCsv,
                                  ]"
                                >
                                </v-text-field>
                              </div>

                              <div
                                class="add-travel-input"
                                v-if="IsByinvite == true"
                              >
                                <label> CVV </label>
                                <v-text-field
                                  type="number"
                                  v-model="csv"
                                  v-bind:class="
                                    errors['paymentDetails.cardCvv']
                                      ? 'input-error'
                                      : ''
                                  "
                                  placeholder="***"
                                  :messages="
                                    errors['paymentDetails.cardCvv']
                                      ? 'Please input valid card CVV.'
                                      : ''
                                  "
                                >
                                </v-text-field>
                              </div>
                            </div>
                          </v-row>
                        </div>
                      </div>

                      <div class="travel-box-button">
                        <div class="form-checkBox">
                          <div
                            class=""
                            style="
                              text-align: right;
                              float: right;
                              width: 100%;
                              font-weight: 600;
                            "
                          >
                            Trip Total Amount:
                            {{ currencySymbol
                            }}{{
                              TotalAmount == 0.0
                                ? getTotalTripAmount
                                : TotalAmount
                            }}
                          </div>
                        </div>

                        <div class="form-checkBox">
                          <div
                            class="setmargin step-two-back"
                            style="margin-top: 10px"
                          >
                            <v-btn
                              color="primary mb-3"
                              dark
                              @click="doMoveToCheckoutOne()"
                            >
                              Back
                            </v-btn>
                          </div>
                          <v-btn
                            class="error step-two-back"
                            v-if="booked == false"
                            @click="submitForm"
                            :disabled="
                              disableProceedBtn || disableProceedBtnViaCall || paymentFailureStatus
                            "
                          >
                            Book Now
                          </v-btn>

                          <v-btn
                            class="error step-two-back"
                            v-if="booked == true"
                            v-show="!ckDisplayTravellersOfTrip"
                            @click="submitForm"
                            :disabled="
                              disableProceedBtn || disableProceedBtnViaCall || paymentFailureStatus
                            "
                          >
                            Book Now
                          </v-btn>
                        </div>
                      </div>

                      <div class="form-checkBox" v-if="disableProceedBtn">
                        <div
                          class="setmargin step-two-back"
                          style="margin-top: 10px"
                        >
                          <v-alert dense prominent outlined type="error">
                            Please refresh your expired items in the right side
                            Trip Itinerary box by clicking "Update" to enable
                            the Proceed to Payment button.
                          </v-alert>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bottom-left-corner"></div>
                  <div class="bottom-right-corner"></div>
                </div>
              </v-row>
            </v-form>

            <!--Inner Structure Ends-->
          </div>

          <direct-summary data="step-two" v-if="lastCartMode == 'direct'" />

          <trip-summary data="step" v-if="lastCartMode == 'trip'" />
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
import * as dataKey from '@/services/data/dsources.js';
import * as cardIcons from '@/services/data/creditcards.js';
import * as phoneCountries from '@/services/data/countryOfPhone.js';
import * as widgetCountries from '@/services/data/countryregion.js';
import DirectSummary from '@/components/common/widgets/DirectSummary.vue';
import TripSummary from '@/components/common/widgets/TripSummary.vue';
import CountrySelect from '@/components/common/widgets/CountrySelect.vue';
import RegionSelect from '@/components/common/widgets/RegionSelect.vue';
import PhoneNumSelect from '../../common/widgets/PhoneNumSelect.vue';
import tripServices from '@/services/api/Trips';
import carServices from '@/services/api/Cars';
import hotelServices from '@/services/api/Hotel';
import villaServices from '@/services/api/Villa';
import activityServices from '@/services/api/Activity';
import InvitationServices from '@/services/api/Invitation';
import SpreedlySCA from '../../common/widgets/SpreedlySCA';
import { evBus } from '@/services/bus.js';
import axios from 'axios';
export default {
  name: 'PaymentInfo',
  data() {
    return {
      ukAlertATOL: false,
      checkAgree: true,
      card: null, // card number
      cardName: null, // card name
      cardHolderFirstName: null,
      cardHolderLastName: null,
      cardHolderEmail: null,
      cardHolderAddress: null,
      cardHolderAddressTwo: '',
      disableProceedBtn: false,
       paymentFailureStatus:false,
      errors: [],
      formSubmitted: false,
      disablePaymentCheck: false,
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
      paymentPreferences: '',
      paymentCommissions: [],
      allowedCardTypes: [],
      attrs: null,
      expRules: [(v) => !!v || 'Required'],
      preCountryVal: null,
      preStateVal: null,
      country: null,
      countryCode: null,
      state: null,
      city: null,
      zip: null,
      agree: true,
      booked: true,
      kount_ris_session_id: Math.random().toString(36).substr(2, 33),
      accountId: '604140',
      tripId: 0,
      IsByinvite: false,
      TotalAmount: 0,
      userpin: this.$store.state.authStore.agentData.pin,
      callInProcess: false,
      disableProceedBtnViaCall: false,
      paymentFailureStatus:false,
      SpreedlySCACurrency: 'USD',
      SpreedlySCAAmount: 1,
      PaymentMethodToken: '',
      ShowSpreedlySCAAuthentication: false,
      tripIdOfSpreedly: 0,
      browserInfo: '',
      sca_auth_token: '',
      checkOutType: this.$store.getters.cartType,
      excludedCards: [
        'BC Card',
        'Hipercard',
        'Argencard',
        'Pacific',
        'Switch',
        'Carte Blanche',
      ],
      displayTripTravelers: false,
      ckDisplayTravellersOfTrip: false,
      travelerInvitedToPay: false,
      addExDtsActivity: false,
      invitedCustomerLink: '',
      invitedCustomerEmail: '',
      spreedlyBearerToken: 'no',
      itemEngineInSCA: 'flight',
      domain: ''
    };
  },
  components: {
    SpreedlySCA,
    DirectSummary,
    TripSummary,
    CountrySelect,
    RegionSelect,
    PhoneNumSelect,
  },

  mounted: function () {
    this.domain = this.$store.state.envStore.domain;
    if (process.env.VUE_APP_DOMAIN == 'uk' || process.env.VUE_APP_DOMAIN == 'ie' ) this.ukAlertATOL = true;

    let _myBookings = this.doCleanArray(
      this.$store.getters.tripSummary.trip_bookings
    );

    this.TotalAmount = this.tripTotalAmount(_myBookings);
    this.scrollToElement();

    this.cardMasks = dataKey.creditCards;
    this.displayExpMon = dataKey.months;
    this.displayExpYrs = dataKey.Fyears;

    let domain = this.$store.state.envStore.domain;

    if (domain == 'us') {
      this.country = 'United States';
    } else if (domain == 'uk') {
      this.country = 'United Kingdom';
    } else if (domain == 'mx') {
      this.country == 'Mexico';
    } else {
      this.country = domain.toUpperCase();
    }

    this.fetchPaymentPreferences();
    this.populatePaymentInformation();
    //this.getPaymentInfoById();

    evBus.$on('SavePayment', (data) => {

      if (data != undefined) {
        if (this.userpin == data.customer.vcAgentPIN) {

          this.$awn.success('Credit card detail store successfully..!', {
            labels: { success: 'Card Added' },
          });
          this.getPaymentInfoById(data.tripId);
        }
      }
    });


    evBus.$on('customerPaymentPerfromed', (data) => {

        this.invitedCustomerEmail = this.$store.state.tripStore.invitedCustomerEmail;
        this.invitedCustomerLink = this.$store.state.tripStore.invitedCustomerLink;
        this.travelerInvitedToPay = true;

        this.travellersOfTrip.forEach((traveller) => {

          if (traveller.traveller.email == this.invitedCustomerEmail) {

            traveller.sent = false;
            traveller.paid = true;

            traveller.traveller.sent = false;
            traveller.traveller.paid = true;
          }

        }); // Ends ForEach

        this.ckDisplayTravellersOfTrip = true;

        this.$forceUpdate();
    });

  },
  created: function () {

    this.travellersOfTrip; // needs to init process in computed property, d`nt remove it

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
  computed: {
    signedUserDetails() {
      this.scrollToElement();
      return this.$store.getters.signedUserDetails;
    },
    bookingItem() {
      return this.doCleanArray(this.$store.state.cartStore.cartBulk);
    },
    lastCartMode() {
      return this.$store.getters.cartType;
    },
    getTotalTripAmount() {


      let _myBookings = this.bookingItem,
        amount = 0;
      _myBookings.forEach((bookItem) => {

        if (bookItem.engine == 'car')
          amount += parseFloat(bookItem.item.FinalPrice);

        if (bookItem.engine == 'flight') {
          if (!bookItem.item.hasOwnProperty('totalPrice'))
            bookItem.item.totalPrice = bookItem.item.flightDetails.price;

          amount += parseFloat(bookItem.item.totalPrice);
        }

        if (bookItem.engine == 'hotel')
          amount += parseFloat(bookItem.item.room.finalPrice);

        if (bookItem.engine == 'villa') {
          if (this.$store.getters.cartType == 'trip')
            amount += parseFloat(
              this.calculateRoomsPricesInVilla(
                this.doCleanArray(bookItem.item.rooms)
              )
            );

          if (this.$store.getters.cartType == 'direct')
            amount += parseFloat(
              this.getPriceOfVillaRooms(bookItem.item.rooms)
            );
        }

        if (bookItem.engine == 'activity') {

          this.addExDtsActivity = true;
            
          if (this.$store.getters.cartType == 'direct') {

            let numbOfTraveller = this.$store.getters.ckStepOneCaders[0];
            numbOfTraveller = numbOfTraveller.bookingData[0].travellerInfo.length;

            amount += parseFloat(bookItem.item.activity[0].finalPrice)*parseInt(numbOfTraveller);
          }

          if (this.$store.getters.cartType == 'trip')
            amount += parseFloat(bookItem.packagePrice);
        }
      });

      return amount.toFixed(2);
    },
    travellersOfTrip() {

      let _adultsOnly = [];

      let _tripTravellers = this.makeActionAble02(
        this.doCleanArray(this.$store.getters.tripSummary.trip_travellers)
      );

      _tripTravellers.forEach((traveler) => {

        if (
          traveler.traveller.customerType != 'child' &&
          traveler.traveller.userType == 'customer'
        )
          _adultsOnly.push(traveler);
      });

      return _adultsOnly;
    },
  },
  methods: {

    copy(e) {

      document.querySelector('#inputLinkID').select();
      document.execCommand("copy");
    },

    inviteToPay(email, rowItem) {

      let reqPayLoad = {
        email: email,
        tripId: this.$store.state.tripStore.tripID,
      };

      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      this.$store.dispatch('reSetInvitedCustomerDetails');

      this.invitedCustomerLink = '';
      this.invitedCustomerEmail = '';
      this.travelerInvitedToPay = false;

      InvitationServices.sendPaymetMethod(reqPayLoad, reqHeaders)
        .then((rsp) => {
          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            this.doPopLogout();
            return true;
          } else {
            this.$awn.success('Please Check Your Email', {
              labels: { success: 'Email Sent Successfully ...' },
            });

            // this.doPopClose();

            this.travellersOfTrip.forEach((traveller) => {

              traveller.action = true;

              if (traveller.traveller.email == reqPayLoad.email)
                traveller.sent = true;
            });

            this.invitedCustomerEmail = email;
            this.invitedCustomerLink = rsp.data.data;
            this.travelerInvitedToPay = true;

            this.$store.dispatch('setInvitedCustomerDetails', {
              email: this.invitedCustomerEmail,
              link: this.invitedCustomerLink
            });

          } // Ends IF ELSE
        })
        .catch((err) => {

          console.log('Error', err);

          this.$awn.alert('Invalid Email', {
            labels: { success: 'Please check your email' },
          });
        });
    },
    makeActionAble02: function (arrOfObj) {

      let result = arrOfObj.map(function (el, index) {
        var o = Object.assign({}, el);
        o.srIndex = index + 1;
        o.action = false;
        o.sent = false;
        return o;
      });

      return result;
    },
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

      this.doPaymentReq(paymentInfo, 'spreedly');
    },
    scaFailed(event) {

      this.$awn.alert(event.message);
      this.disableProceedBtnViaCall = false;
      this.ShowSpreedlySCAAuthentication = false;
    },
    scaError(event) {
      this.$awn.alert(event.message);
      this.ShowSpreedlySCAAuthentication = false;

      this.disableProceedBtn = false;
      this.disableProceedBtnViaCall = false;
      this.paymentFailureStatus = false;
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

    scrollToElement() {

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    getPaymentInfoById(TripId) {
      this.tripId = TripId;
      this.IsByinvite = true;

      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let reqPayLoad = {
        tripId: TripId,
      };

      InvitationServices.getPaymentMethodByTripId(reqPayLoad, reqHeaders)
        .then((rsp) => {
          if (
            rsp.data.success == false &&
            rsp.data.message == 'Token has expired'
          ) {
            this.doPopLogout();
            return true;
          } else {
            let paymentDetails = rsp.data;
            this.fillpaymentDetails(paymentDetails);
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    },

    fillpaymentDetails: function (paymentDetails) {
      let cardDetails = paymentDetails.data;
      this.card = cardDetails.ccNumber;
      // this.csv =  paymentDetails.data.ccNumber;
      this.expDate =
        '0' +
        cardDetails.cardExpiredMonth +
        '/' +
        cardDetails.cardExpiredYear.slice(
          cardDetails.cardExpiredYear.length - 2
        );
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
    doMoveToCheckoutOne: function () {
      let that = this;

      let paymentBasicInfo = that.makeBasicPaymentDetails();

      this.$store.dispatch('savePaymentBasicInfo', {
        payload: paymentBasicInfo,
      });

      setTimeout(function () {
        that.$router.go(-1);
      }, 1200);
    },
    doOpenTerms: function () {
      window.open('https://wp.inteletravel.com/terms/', '_blank');
    },
    checkPriorityOfEngines: function (_myBookings) {
      let priority = {
        hotelPriority: false,
        hotelIndex: 0,
      };

      return new Promise((resolve) => {
        for (let index = 0; index < _myBookings.length; index++) {
          if (_myBookings[index].engine == 'hotel') {
            priority.hotelPriority = true;
            priority.hotelIndex = index;
            break;
          }
        }

        resolve(priority);
      });
    },
    getPaymentPrefOfAllItems: function (_myBookings) {
      let promises = [];

      let reqHeaders = {
        headers: { 'Content-Type': 'application/json' },
      };

      return new Promise((resolve, reject) => {
        for (let index = 0; index < _myBookings.length; index++) {
          var reqDataForm = {};

          // case for car
          if (_myBookings[index].engine == 'car') {
            if (_myBookings[index].item.sessionId == undefined) {
              reqDataForm.sessionId = this.$store.state.carStore.carSearchedId;
            } else {
              reqDataForm.sessionId = _myBookings[index].item.sessionId;
            }
            reqDataForm.carId = _myBookings[index].item.engineId;

            let promise = this.loadCarPayments(reqDataForm, reqHeaders);

            promises.push(promise);
          }

          // case for hotel
          if (_myBookings[index].engine == 'hotel') {
            if (_myBookings[index].item.sessionId == undefined) {
              reqDataForm.sessionId = this.$store.state.hotelStore.sessionId;
            } else {
              reqDataForm.sessionId = _myBookings[index].item.sessionId;
            }

            reqDataForm.hotelId = _myBookings[index].item.hotel.hotelId;
            reqDataForm.packageId = _myBookings[index].item.room.packageId;

            let promise = this.loadHotelPayments(reqDataForm, reqHeaders);
            promises.push(promise);
          }

          // case for villa
          if (_myBookings[index].engine == 'villa') {
            if (_myBookings[index].item.sessionId == undefined) {
              reqDataForm.sessionId = this.$store.state.hotelStore.sessionId;
            } else {
              reqDataForm.sessionId = _myBookings[index].item.sessionId;
            }
            reqDataForm.villaId = _myBookings[index].item.engineId;

            let promise = this.loadVillaPayments(reqDataForm, reqHeaders);
            promises.push(promise);
          }

          // case for activity
          /*

            if (_myBookings[index].engine == 'activity') {

              if (_myBookings[index].item.sessionId == undefined) {
                reqDataForm.sessionId = this.$store.state.hotelStore.sessionId;
              } else {
                reqDataForm.sessionId = _myBookings[index].item.sessionId;
              }
              reqDataForm.activityId = _myBookings[index].item.engineId;
              reqDataForm.activityDate = this.justFormatMyDate(
                _myBookings[index].item.activityDetails.searchData.fromDate,
                'YYYY-MM-DD'
              );
              reqDataForm.gradeId = _myBookings[index].item.gradeId;

              let promise = this.loadActivityPayments(reqDataForm, reqHeaders);
              promises.push(promise);
            }

          */

        } // Ends FOR

        // when all calls are done
        Promise.all(promises).then((cards) => {
          resolve(cards);
        });
      });
    },
    fetchPaymentPreferences: async function () {

      let _myBookings = this.doCleanArray(this.$store.state.cartStore.cartBulk);
      let _madePreferenceCall = false;

      _myBookings.forEach((booking) => {
        if (booking.engine != 'flight' && booking.engine != 'activity') _madePreferenceCall = true;
      });

      if (!_madePreferenceCall) {
        this.disablePaymentCheck = true;
        return false;
      }

      /*
            if(_myBookings.length==1 && (_myBookings[0].engine=='flight')) { 
                // && this.$store.getters.cartType=='direct'
                // || _myBookings[0].engine=='villa'

                this.disablePaymentCheck = true;
                return false;
            }
        */

      let restrictedCards = this.excludedCards;

      if (_madePreferenceCall)
        // made call only if there is other engine than flight
        this.getPaymentPrefOfAllItems(_myBookings).then((preferences) => {
          let pIndex = 0;
          let cardTypes = [];
          let preferncesCardnames = '';
      
          while (pIndex < preferences.length) {
            let _payees = preferences[pIndex];
   
            for (var i in _payees) {
              if (_payees[i].name) {
                // case when we hv car and hotel
                
                if (
                  !cardTypes.includes(_payees[i].name.toLowerCase()) &&
                  !restrictedCards.includes(_payees[i].name)
                ) {
                  cardTypes.push(_payees[i].name.toLowerCase());
                  preferncesCardnames += _payees[i].name + ', ';
                }
              } // Ends IF

              if (_payees[i].CardType && _payees[i].Issuer) {
                // case when we hv villa
  
                if (!cardTypes.includes(_payees[i].Issuer.toLowerCase()) ) {
                  if (
                    _payees[i].Issuer.length > 2 &&
                    !restrictedCards.includes(_payees[i].Issuer)
                  ) {
                    cardTypes.push(_payees[i].Issuer.toLowerCase());
                    preferncesCardnames += _payees[i].Issuer + ', ';
                  }
                }
              } // Ends IF

              if (_payees[i].CardType) {
                // case when we hv villa

                if (
                  !cardTypes.includes(_payees[i].CardType.toLowerCase()) &&
                  _payees[i].CardType.length > 2
                ) {
                  if (!restrictedCards.includes(_payees[i].CardType)) {
                    cardTypes.push(_payees[i].CardType.toLowerCase());
                    preferncesCardnames += _payees[i].CardType + ', ';
                  }
                }
              } // Ends IF
            } // Ends FOR

            pIndex++;
          } // Ends While

          if (cardTypes.length == 0) {
            this.disablePaymentCheck = false;
            this.$awn.alert('No payment preferences found..!');
          } else {
            let _availableCards = cardTypes;
            let _allCards = [];

            _availableCards.forEach((cardName) => {
              if (cardName.includes('/')) {
                let _optionalCards = cardName.split('/');
                _allCards.push(..._optionalCards);
              }
            });

            cardTypes = _availableCards.concat(_allCards);
          }

          this.allowedCardTypes = this.resolveCardNameConvention(cardTypes);
          this.paymentPreferences = preferncesCardnames.substring(
            0,
            preferncesCardnames.length - 2
          );
        });
    },

    resolveCardNameConvention: function (_allAvailableCards) {
      let _cardSynonames = [];

      _allAvailableCards.forEach((cardName) => {
        console.log(cardName);
        if (cardName == 'chinaunionpay' || cardName == 'unionpay credit card')
          _cardSynonames.push('unionpay');

        if (cardName == "diner's club international")
          _cardSynonames.push('diners');

        if (cardName == 'american express')
          _cardSynonames.push('americanexpress');

        if (cardName == 'euro') _cardSynonames.push('eurocard');

        if (cardName == 'diners club') _cardSynonames.push('diners');

        if (cardName == 'master card') _cardSynonames.push('mastercard');

       

        if (cardName == 'elo creditcard' || cardName == 'elo')
          _cardSynonames.push('maestro');
      });

      _cardSynonames.push('default');

      _allAvailableCards = _allAvailableCards.concat(_cardSynonames);

      return _allAvailableCards;
    },

    populatePaymentInformation: function () {
      if (
        !this.$store.getters.ckStepOneCaders &&
        !this.$store.getters.ckStepTwoPaymentInfo
      )
        return false;

      let _allCountries = phoneCountries.default;

      if (
        this.$store.getters.ckStepOneCaders[0].travellerPaymentInfos.length > 0
      ) {
        let travellerInfo =
          this.$store.getters.ckStepOneCaders[0].travellerPaymentInfos[0];

        if (travellerInfo.defaultCountry != undefined) {
          let searchCountryObj = _allCountries.find(
            (country) =>
              country.iso2 === travellerInfo.defaultCountry.toUpperCase()
          );

          travellerInfo.countryDialCode = `+${searchCountryObj.dialCode}`;
        }

        this.fillPaymentForm(travellerInfo);
      } else if (this.$store.getters.ckStepTwoPaymentInfo) {
        let travellerInfo = this.$store.getters.ckStepTwoPaymentInfo;

        if (typeof travellerInfo.defaultCountry != 'undefined') {
          let searchCountryObj = _allCountries.find(
            (country) =>
              country.iso2 === travellerInfo.defaultCountry.toUpperCase()
          );

          travellerInfo.countryDialCode = `+${searchCountryObj.dialCode}`;
        } else {
          let _getDomain = this.$store.state.envStore.domain;

          if (_getDomain == 'us') {
            travellerInfo.countryDialCode = '+1';
          } else if (_getDomain == 'uk') {
            travellerInfo.countryDialCode = '+44';
          } else if (_getDomain == 'mx') {
            travellerInfo.countryDialCode = '+52';
          } else {
            travellerInfo.countryDialCode = '';
          }
        } // Ends IF ELSE FOR COUNTRY CODE

        travellerInfo.contactNumber = '';

        if (travellerInfo.phoneNumber !== null)
          travellerInfo.contactNumber = travellerInfo.phoneNumber;

        this.fillPaymentForm(travellerInfo);
      }
    },
    fillPaymentForm: function (travellerInfo) {
      if (typeof travellerInfo.firstName != 'undefined')
        this.cardHolderFirstName = travellerInfo.firstName;

      if (typeof travellerInfo.lastName != 'undefined')
        this.cardHolderLastName = travellerInfo.lastName;

      if (typeof travellerInfo.email != 'undefined')
        this.cardHolderEmail = travellerInfo.email;

      if (typeof travellerInfo.contactNumber != 'undefined')
        this.mobile = travellerInfo.contactNumber;

      if (typeof travellerInfo.contactNumber != 'undefined')
        this.premobileval = travellerInfo.contactNumber;

      if (typeof travellerInfo.address != 'undefined')
        this.cardHolderAddress = travellerInfo.address;

      if (typeof travellerInfo.country != 'undefined')
        this.country = travellerInfo.country;

      if (typeof travellerInfo.state != 'undefined')
        this.state = travellerInfo.state;

      if (typeof travellerInfo.city != 'undefined')
        this.city = travellerInfo.city;

      if (typeof travellerInfo.zip != 'undefined') this.zip = travellerInfo.zip;

      if (typeof travellerInfo.country != 'undefined')
        this.preCountryVal = travellerInfo.country;

      if (typeof travellerInfo.state != 'undefined')
        this.preStateVal = travellerInfo.state;

      if (typeof travellerInfo.state != 'undefined')
        evBus.$emit('updateStateVal', travellerInfo.state);

      if (typeof travellerInfo.contactNumber != 'undefined') {
        evBus.$emit(
          'updatePhoneNumber',
          travellerInfo.countryDialCode + travellerInfo.contactNumber
        );
      }
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
    loadCarPayments: function (reqDataForm, reqHeaders) {
      return new Promise((resolve, reject) => {
        carServices
          .getCarPaymentPreferences(reqDataForm, reqHeaders)
          .then((rsp) => {
            if (rsp.data.success == false) {
                this.$awn.alert(rsp.data.message);
                 this.paymentFailureStatus = true;
                return false;
            }

            if (rsp.data.success == true) {
              let _payees =
                  rsp.data.data.AcceptedCreditCards.CreditCardPaymentCommision,
                s = '';

              resolve(_payees);
            } else {
              resolve([]);
            }
          })
          .catch((err) => {
            resolve([]);
          });
      });
    },
    loadHotelPayments: function (reqDataForm, reqHeaders) {
      return new Promise((resolve, reject) => {
        hotelServices
          .getHotelPaymentPreferences(reqDataForm, reqHeaders)
          .then((rsp) => {
            if (rsp.data.success == false) {
                this.$awn.alert(rsp.data.message);
                 this.paymentFailureStatus = true;
                return false;
            }

            if (rsp.data.success == true) {
              let _payees = rsp.data.data.paymentPref.cards,
                s = '';
              resolve(_payees);
            } else {
              // resolve([]);
              let _defaultCards = this.doCleanArray(cardIcons.defaultCards);

              resolve(_defaultCards);
            }
          })
          .catch((err) => {
            resolve([]);
          });
      });
    },
    loadVillaPayments: function (reqDataForm, reqHeaders) {
      return new Promise((resolve, reject) => {
        villaServices
          .getVillaPaymentPreferences(reqDataForm, reqHeaders)
          .then((rsp) => {
            if (rsp.data.success == false) {
                this.$awn.alert(rsp.data.message);
                 this.paymentFailureStatus = true;
                return false;
            }

            if (rsp.data.success == true) {
              let _payees = rsp.data.data,
                s,
                _refinedPayees = [];

              _payees = _payees.find((obj) => {
                if (obj.bookable == true) _refinedPayees.push(obj);
              });

              resolve(_refinedPayees);
            } else {
              resolve([]);
            }
          })
          .catch((err) => {
            resolve([]);
          });
      });
    },
    loadActivityPayments: function (reqDataForm, reqHeaders) {
      return new Promise((resolve, reject) => {
        activityServices
          .getActivitypaymentPreferences(reqDataForm, reqHeaders)
          .then((rsp) => {
             if (rsp.data.success == false) {
               this.$awn.alert(rsp.data.message);
                this.paymentFailureStatus = true;
               return false;
            }
            if (rsp.data.success == true) {
              let _payees =
                rsp.data.data.AcceptedCreditCards.CreditCardPaymentCommision;

              resolve(_payees);
            } else {
              resolve([]);
            }
          })
          .catch((err) => {
            resolve([]);
          });
      });
    },
    loadDefaultPayments: function () {

      this.disablePaymentCheck = false;

      let _payees = cardIcons.defaultCards,
        s = '';

      this.paymentCommissions = _payees;
      this.allowedCardTypes = [];

      for (var i in _payees) {
        this.allowedCardTypes.push(_payees[i].CardType.toLowerCase());
        s += _payees[i].CardType + ', ';
      }

      this.paymentPreferences = s.substring(0, s.length - 2);
    },
    submitForm: function () {

      axios.get(
        process.env.VUE_APP_KAPTCHA +
          this.accountId +
          '&s=' +
          this.kount_ris_session_id
      );

      this.makeCountryCode();

      let valid = this.$refs.form.validate();

      if (valid) {

        this.callInProcess = true;
        this.disableProceedBtnViaCall = true;

        let expParts = this.expDate.split('/');
        let paymentInfo = {};
        if (this.IsByinvite == false) {
          paymentInfo = {
            card: this.card.replace(/\s+/g, ''),
            csv: this.csv,
            expMonth: expParts[0],
            expYear: expParts[1],
            cardType: this.cardName.toUpperCase(),
          };
        }

        if (process.env.VUE_APP_DOMAIN === 'uk' || process.env.VUE_APP_DOMAIN === 'UK'
        ||process.env.VUE_APP_DOMAIN === 'ie' || process.env.VUE_APP_DOMAIN === 'IE') {
          // && this.checkOutType == 'trip', plz don`t remove this line of code

          const bookingData = this.bookingItem;

          //TODO getting payment method token
          const PAYMENT_METHOD_PAYLOAD = '/api/trip/savePaymentMethod';

          let ckOneCader = this.$store.getters.ckStepOneCaders[0],
            _paymentDetails = this.makeBasicPaymentDetails();

            console.log('ckOneCader',ckOneCader);

          if (this.IsByinvite == false) {
            _paymentDetails.ccNumber = paymentInfo.card;
            _paymentDetails.cardCvv = paymentInfo.csv;
            _paymentDetails.type = paymentInfo.cardType;
            _paymentDetails.cardExpireMonth = paymentInfo.expMonth;
            _paymentDetails.cardExpireYear = '20' + paymentInfo.expYear;
          }

          // CALL TO SAVE PAYMENT
          let reqHeaders = { headers: { 'Content-Type': 'application/json' } };
          let reqDataForm = {};
          let termsAgreed = this.agree ? 1 : 0;

          if (typeof ckOneCader.tripId !== 'undefined')
            reqDataForm.tripId = ckOneCader.tripId;

          if (typeof ckOneCader.bookingData !== 'undefined') {
            ckOneCader.bookingData[0].travellerInfo.forEach((trvInfo) => {
              let customiseTitle = trvInfo.title;
              customiseTitle = customiseTitle.replace(/\./g, '');
              trvInfo.title = customiseTitle.toLowerCase();

              delete trvInfo.pTravelersVal;
              delete trvInfo.ckBoxCardInfo;
              delete trvInfo.defaultCountry;

              if (
                ckOneCader.bookingData[0].engine == 'flight' &&
                trvInfo.customerType == 'senior'
              )
                trvInfo.customerType = 'adult';

              if (
                ckOneCader.bookingData[0].engine == 'activity' &&
                trvInfo.customerType == 'traveler'
              )
                trvInfo.customerType = 'adult';
            });

            reqDataForm.bookingData = ckOneCader.bookingData;

          }

          reqDataForm.bookVia = ckOneCader.bookVia;
          if (this.IsByinvite == false) {
            reqDataForm.paymentDetails = _paymentDetails;
          }

          if(this.addExDtsActivity) {
            reqDataForm.extraDetail = this.doCleanArray(this.$store.state.ActivityStore.extraDetails);
          }

          reqDataForm.termsAccepted = termsAgreed;
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

            if (this.checkOutType != 'trip') reqDataForm.tripId = null;

            bookingData.forEach((bookItem) => {

              if (bookItem.engine == 'flight') {
                if (!bookItem.item.hasOwnProperty('totalPrice'))
                  bookItem.item.totalPrice = bookItem.item.flightDetails.price;

                _scaInPrice += parseFloat(bookItem.item.totalPrice);
                _allowSpreedlyStatuses.push('truly');


                this.itemEngineInSCA = 'flight';

              }

              if (this.checkOutType == 'trip')
                if (
                  bookItem.engine == 'hotel' &&
                  bookItem.item.room.isMor == 'true'
                ) {
                  // case of trip-ck
                  _scaInPrice += parseFloat(bookItem.item.room.finalPrice);
                  _allowSpreedlyStatuses.push('truly');
                  this.itemEngineInSCA = 'hotel';

                }

              if (this.checkOutType != 'trip')
                if (
                  bookItem.engine == 'hotel' &&
                  bookItem.item.room.rooms[0].isMor == 'true'
                ) {
                  // case of direct-ck
                  _scaInPrice += parseFloat(bookItem.item.room.finalPrice);
                  _allowSpreedlyStatuses.push('truly');
                  this.itemEngineInSCA = 'hotel';
                }



                if (bookItem.engine == 'activity') {
                    
                  if (this.checkOutType == 'direct') {

                    let numbOfTraveller = this.$store.getters.ckStepOneCaders[0];
                    numbOfTraveller = numbOfTraveller.bookingData[0].travellerInfo.length;

                    _scaInPrice += parseFloat(bookItem.item.activity[0].finalPrice)*parseInt(numbOfTraveller);
                    _allowSpreedlyStatuses.push('truly');
                  } // Ends IF direct
 
                  if (this.checkOutType == 'trip') {

                    _scaInPrice += parseFloat(bookItem.item.packagePrice);
                    _allowSpreedlyStatuses.push('truly');
                  } // Ends IF trip

                  this.itemEngineInSCA = 'activity';
                } // Ends IF activity



            }); // Ends ForEach

            if (_allowSpreedlyStatuses.includes('truly') == false) {
              this.doPaymentReq(paymentInfo, 'nospreedly');
              return false;
            }

            this.SpreedlySCACurrency = this.domainCurrency;
            _scaInPrice = _scaInPrice * 100;
            this.SpreedlySCAAmount = Math.trunc(_scaInPrice);


            if (this.checkOutType != 'trip') {
              delete reqDataForm.tripId;
            } // incase of direct checkout need to remove tripId param

            let reqHeaders = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authStore.token,
              },
            };

            // console.log({reqDataForm});
            // return false;

            axios
              .post(PAYMENT_METHOD_PAYLOAD, reqDataForm, reqHeaders)
              .then((response) => {
                this.PaymentMethodToken = response.data.data.token;
                this.tripIdOfSpreedly = 0;

                if (typeof reqDataForm.tripId != 'undefined')
                  this.tripIdOfSpreedly = reqDataForm.tripId;

                this.ShowSpreedlySCAAuthentication = true;
              })
              .catch((error) => {
                this.$awn.alert(error.response.data.message);
              });
          } else {
            this.doPaymentReq(paymentInfo, 'nospreedly');
          }
        } else {
          this.doPaymentReq(paymentInfo, 'nospreedly');
        }
      } else {
        const el = document.querySelector(
          '.v-messages.error--text:first-of-type'
        );
        let diverror = document.getElementById('diverror');
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
            diverror.scrollIntoView();
            first.focus();
            break;
          case 'Last name field is required.':
            diverror.scrollIntoView();
            last.focus();
            break;
          case 'Email must be valid':
            last.scrollIntoView();
            email.focus();
            break;
          case 'Cell Phone is required':
            last.scrollIntoView();
            phone.focus();
            break;
          case 'Enter Your Street Address':
            last.scrollIntoView();
            address.focus();
            break;
          case 'City field is required.':
            last.scrollIntoView();
            city.focus();
            break;
          case 'Enter Zip Code':
            zip.scrollIntoView();
            zip.focus();
            break;
          default:
            console.log('not error');
        }
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

    doPaymentReq(cardInfo, calledOn) {

      this.errors = [];
      let that = this;
      let ckOneCader = this.$store.getters.ckStepOneCaders[0],
        _paymentDetails = this.makeBasicPaymentDetails();
      if (this.IsByinvite == false) {
        _paymentDetails.ccNumber = cardInfo.card;
        _paymentDetails.cardCvv = cardInfo.csv;
        _paymentDetails.type = cardInfo.cardType;
        _paymentDetails.cardExpireMonth = cardInfo.expMonth;
        _paymentDetails.cardExpireYear = '20' + cardInfo.expYear;
      }

      // CALL TO SAVE PAYMENT
      let reqHeaders = { headers: { 'Content-Type': 'application/json' } };
      let reqDataForm = {};
      let termsAgreed = this.agree ? 1 : 0;

      if (typeof ckOneCader.tripId !== 'undefined')
        reqDataForm.tripId = ckOneCader.tripId;

      if (typeof ckOneCader.bookingData !== 'undefined') {

        ckOneCader.bookingData[0].travellerInfo.forEach((trvInfo) => {
          let customiseTitle = trvInfo.title;
          customiseTitle = customiseTitle.replace(/\./g, '');
          trvInfo.title = customiseTitle.toLowerCase();

          delete trvInfo.pTravelersVal;
          delete trvInfo.ckBoxCardInfo;
          delete trvInfo.defaultCountry;

          if (
            ckOneCader.bookingData[0].engine == 'flight' &&
            trvInfo.customerType == 'senior'
          )
            trvInfo.customerType = 'adult';
          
            if (
            ckOneCader.bookingData[0].engine == 'activity' &&
            trvInfo.customerType == 'traveler'
          )
            trvInfo.customerType = 'adult';
        });

        
        if (ckOneCader.bookingData[0].engine == 'activity') {

          let activityCader = ckOneCader.bookingData[0];

          if ('_extraDetail' in activityCader) {
            delete ckOneCader.bookingData[0]['_extraDetail'];
          }
        }
      }

      reqDataForm.bookVia = ckOneCader.bookVia;
      if (this.IsByinvite == false) {
        reqDataForm.paymentDetails = _paymentDetails;
      }

      reqDataForm.termsAccepted = termsAgreed;
      reqDataForm.device_data = {
        device_session_id: this.kount_ris_session_id,
        fraud_merchant_id: this.accountId,
      };

      reqDataForm.bookingData = ckOneCader.bookingData;

      reqDataForm.paymentDetails.paymentMethodToken = this.PaymentMethodToken;

      reqDataForm.paymentDetails['3dsData'] = [];

      if (calledOn == 'spreedly') {
        let _sscaInPrice = 0,
          inBookingData = this.bookingItem;

        inBookingData.forEach((bookItem) => {

          if (bookItem.engine == 'flight' && bookItem.status !='booked') {
            if (!bookItem.item.hasOwnProperty('totalPrice'))
              bookItem.item.totalPrice = bookItem.item.flightDetails.price;

            _sscaInPrice += parseFloat(bookItem.item.totalPrice);
          }

          if (bookItem.engine == 'hotel' && bookItem.status !='booked')
            _sscaInPrice += parseFloat(bookItem.item.room.finalPrice);

            if (bookItem.engine == 'activity') {
                
              if (this.$store.getters.cartType == 'direct') {

                let numbOfTraveller = this.$store.getters.ckStepOneCaders[0];
                numbOfTraveller = numbOfTraveller.bookingData[0].travellerInfo.length;

                _sscaInPrice += parseFloat(bookItem.item.activity[0].finalPrice)*parseInt(numbOfTraveller);
              }

              if (this.$store.getters.cartType == 'trip')
                _sscaInPrice += parseFloat(bookItem.item.packagePrice);
            }
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

      /*
              -- DO NOT REMOVE THIS CODE
              -- For Using Static JSON

              let _cards = dataKey.scsCKHtlFgtRsp; 
              
              // Success Cases
              // dataKey.scsCKHtlFgtRsp

              // Error Cases
              // dataKey.dummyCKHotelFlightRsp;
              // dataKey.dummyCKHotelResp;

              this.$store.dispatch('addCards', {CARDS: _cards});

              this.booked = true;

              this.$awn.success("Payment information complete..!", {
                labels: { success: "Payment Added" },
              });

                setTimeout(function(){

                    that.$router.push("/customer-confirm-trip");
                }, 1500);

        */

      if(this.addExDtsActivity) {
        
        reqDataForm.extraDetail = this.doCleanArray(this.$store.state.ActivityStore.extraDetails);

      } // Do need to add extra details if any engines there for activity

      // console.log('checkoutTrip payloads', reqDataForm);
      // return false;

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
                let _errorDisplay = "As an added temporary security measure, new air engine users are allowed to purchase 4 airline tickets every 72 hours. The 4 ticket allowance will reset automatically every 72 hours. Once new users have established a pattern of secure transactions, there will be no limit on ticket purchases. Thank you for trusting InteleTravel with your secure travel plans.";

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
          } else if ( typeof rsp.data.success == 'undefined' &&  rsp.data.bookingData != 'undefined') {
            let _cards = rsp.data;

            this.$store.dispatch('addCards', { CARDS: _cards });

            this.booked = true;

            this.$awn.success('Payment information complete..!', {
              labels: { success: 'Payment Added' },
            });

            setTimeout(function () {
              that.$router.push('/customer-confirm-trip').catch(() => {});
            }, 1500);
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
    validateCards: function () {
      if (this.card) {
        let myCardLen = this.card;
        myCardLen = myCardLen.replace(/\s+/g, '');

        var cardMasks = this.doCleanArray(this.cardMasks);

        var arrayLength = cardMasks.length;

        for (var i = 0; i < arrayLength; i++) {
          let re = new RegExp(cardMasks[i].regex);

          if (this.card.match(re) != null) {
            let mLen = cardMasks[i].mask;

            mLen = mLen.replace(/\s+/g, '');

            cardMasks[i].cardLength = mLen.length;

            this.loadCardInfos(cardMasks[i]);

            break;
          }
        }

        if (!this.disablePaymentCheck) {
          if (!this.allowedCardTypes.includes(this.cardName)) {
            return 'Provided credit card not allowed.';
          }
        }

        if (
          myCardLen.length != this.validCardLength ||
          !this.validateLuhnMod(this.card)
        ) {
          return 'Not a valid credit card Number.';
        }

        return true;
      }

      return true;
    },
    validateLuhnMod: function (val) {
      val = val.replace(/\s+/g, '');

      let checksum = 0; // running checksum total
      let j = 1; // takes value of 1 or 2

      // Process each digit one by one starting from the last
      for (let i = val.length - 1; i >= 0; i--) {
        let calc = 0;
        // Extract the next digit and multiply by 1 or 2 on alternative digits.
        calc = Number(val.charAt(i)) * j;

        // If the result is in two digits add 1 to the checksum total
        if (calc > 9) {
          checksum = checksum + 1;
          calc = calc - 10;
        }

        // Add the units element to the checksum total
        checksum = checksum + calc;

        // Switch the value of j
        if (j == 1) {
          j = 2;
        } else {
          j = 1;
        }
      }

      //Check if it is divisible by 10 or not.
      return checksum % 10 == 0;

      /*
            num = num.replace(/\s+/g, '');

            let arr = (num + '').split('').reverse().map(x => parseInt(x));
            let lastDigit = arr.splice(0, 1)[0];
            let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);

            sum += lastDigit;

            return sum % 10 === 0;
        */
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

      if (_cardNumber == '') {
        $(this.$refs.ccicon).html('');
        return false;
      }

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
  watch: {
    disablePaymentCheck: function (val) {
      if (val == true) this.loadDefaultPayments();
    },
  },
};
</script>
<style scoped>
.awn-popup-body .awn-popup-confirm {
    color: #000 !important;
    font-size: 15px !important;
}
#awn-popup-wrapper .awn-popup-body {
    position: relative;
    border-radius: 6px;
    word-break: break-word;
    background: none!important;
    padding: 24px;
    min-width: 320px;
    font-size: 14px;
    max-width: 500px;
    color: #000!important;
}
.ccicon {
  height: 32px;
  position: absolute;
  right: 2px;
  top: calc(48% - 17px);
  width: 60px;
}
.vue-tel-input-vuetify {
  min-height: 95px !important;
}

.theme--light.v-btn.v-btn--has-bg {
  background-color: #d500327a;
  color: #fff;
}
.mobile-feild-styling {
  margin-top: 20px;
}
</style>
