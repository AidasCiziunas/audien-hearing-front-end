/* eslint-disable no-undef */
<template>
    <span style="display: block !important">
        <section class="search-results add-travel-sectionTop">
            <v-container>
                <v-row align="center">
                    <div class="col-lg-12">
                        <div class="search-heading">
                            <h2>Customer Payment Info</h2>
                        </div>
                    </div>
                </v-row>
            </v-container>
        </section>

        <section class="add-travel-section">
            <v-container>
                <v-row class="reversing-here">
                    <div class="col-lg-9 col-md-12">
                        <v-form ref="form" class="" lazy-validation>
                            <v-row class="mt-0 mb-0">
                                <div class="col-md-12">
                                    <div class="add-travel-box-top">
                                        <div
                                            class="travel-box-iner min-height-auto"
                                        >
                                            <h3 class="mb-0">
                                                Payment Information
                                            </h3>
                                        </div>
                                        <div class="travel-box-iner">
                                            <h4 class="pb-4">
                                                Card Holder Information
                                            </h4>
                                            <div class="mt-5">
                                                <v-row class="m-0">
                                                    <div
                                                        class="col-md-6 col-sm-6"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <div
                                                                class="flex-here"
                                                            >
                                                                <v-select>
                                                                    <v-option
                                                                        >Not
                                                                        Listed</v-option
                                                                    >
                                                                </v-select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </v-row>
                                                <v-row class="m-0">
                                                    <div
                                                        class="col-md-6 col-sm-6"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <label
                                                                >First
                                                                Name</label
                                                            >
                                                            <v-text-field
                                                                placeholder="Sam Robillota"
                                                                v-model="
                                                                    cardHolderFirstName
                                                                "
                                                                :rules="[
                                                                    v =>
                                                                        !!v ||
                                                                        'First name field is required.'
                                                                ]"
                                                            ></v-text-field>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="col-md-6 col-sm-6"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <label
                                                                >Last
                                                                Name</label
                                                            >
                                                            <v-text-field
                                                                placeholder="Sam Robillota"
                                                                v-model="
                                                                    cardHolderLasttName
                                                                "
                                                                :rules="[
                                                                    v =>
                                                                        !!v ||
                                                                        'Last name field is required.'
                                                                ]"
                                                            ></v-text-field>
                                                        </div>
                                                    </div>

                                                    <!--
                                                <div class="col-md-6 col-sm-6">
                                                    <div class="add-travel-input">
                                                        <label>Email</label>
                                                        <v-text-field placeholder="sam@mediamind.com"
                                                        v-model="cardHolderEmail"  
                                                        :rules="[
                                                            (v) => !!v || 'Email field is required.',
                                                            (v) => /.+@.+/.test(v) || 'Email must be valid' 
                                                        ]"
                                                        ></v-text-field>
                                                    </div>
                                                </div>
                                                -->

                                                    <div
                                                        class="col-md-4 col-sm-4"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <label>
                                                                Country Code
                                                            </label>
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
                                                                        'Country code is required.'
                                                                ]"
                                                            ></v-text-field>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="col-md-4 col-sm-4"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <label>
                                                                City
                                                            </label>
                                                            <v-text-field
                                                                :hide-details="
                                                                    false
                                                                "
                                                                background-color="white"
                                                                height="40"
                                                                placeholder="City"
                                                                v-model="city"
                                                                :rules="[
                                                                    v =>
                                                                        !!v ||
                                                                        'City is required.'
                                                                ]"
                                                            ></v-text-field>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="col-md-4 col-sm-4"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <label>
                                                                Zip Code
                                                            </label>
                                                            <v-text-field
                                                                :hide-details="
                                                                    false
                                                                "
                                                                background-color="white"
                                                                height="40"
                                                                placeholder="Zip code"
                                                                v-model="zip"
                                                                :rules="[
                                                                    v =>
                                                                        !!v ||
                                                                        'ZIP code is required.'
                                                                ]"
                                                            ></v-text-field>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="col-md-12 col-sm-12"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <label
                                                                >Address</label
                                                            >
                                                            <v-text-field
                                                                placeholder="San Francisco - Airport (California), 780 McDonnell Road"
                                                                v-model="
                                                                    cardHolderAddress
                                                                "
                                                                :rules="[
                                                                    v =>
                                                                        !!v ||
                                                                        'Address One field is required.',
                                                                    v =>
                                                                        (v &&
                                                                            v.length >=
                                                                                10) ||
                                                                        'Address must have atleast 10 characters'
                                                                ]"
                                                            ></v-text-field>
                                                        </div>
                                                    </div>
                                                </v-row>
                                            </div>
                                        </div>
                                        <div class="travel-box-iner">
                                            <h4 class="pb-4">
                                                Card Information
                                            </h4>
                                            <div class="mt-5">
                                                <v-row class="m-0">
                                                    <div
                                                        class="col-md-6 col-sm-6"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <label
                                                                >Card
                                                                Number</label
                                                            >
                                                            <v-text-field
                                                                required
                                                                v-mask="
                                                                    compMask
                                                                "
                                                                v-model="card"
                                                                placeholder="0000-0000-0000-0000"
                                                                :rules="[
                                                                    v =>
                                                                        !!v ||
                                                                        'Card number is required.',
                                                                    validateCards
                                                                ]"
                                                                @keyup="
                                                                    creditCardInput
                                                                "
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
                                                    <div
                                                        class="col-md-6 col-sm-6"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <label
                                                                >Expiry
                                                                Date</label
                                                            >
                                                            <div
                                                                class="flex-here"
                                                            >
                                                                <v-text-field
                                                                    required
                                                                    v-mask="
                                                                        expMask
                                                                    "
                                                                    v-model="
                                                                        expDate
                                                                    "
                                                                    placeholder="mm/yy"
                                                                    :rules="[
                                                                        v =>
                                                                            !!v ||
                                                                            'Expiry date is required.',
                                                                        validateExpiryDate
                                                                    ]"
                                                                    @keyup="
                                                                        creditExpiryInput
                                                                    "
                                                                >
                                                                </v-text-field>

                                                                <!--
                                                            <v-select 
                                                            v-model="expMon" 
                                                            :items="displayExpMon" 
                                                            :rules="expRules"
                                                            item-text="title"
                                                            item-value="value"
                                                            >
                                                            </v-select>
                                                            <v-select 
                                                            v-model="expYer" 
                                                            :rules="expRules"
                                                            :items="displayExpYrs" 
                                                            class="ml-4">
                                                            </v-select>
                                                        -->
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-md-6 col-sm-6"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <label>CSV</label>
                                                            <v-text-field
                                                                v-model="csv"
                                                                placeholder="***"
                                                                :rules="[
                                                                    v =>
                                                                        !!v ||
                                                                        'CSV field is required.',
                                                                    validateCsv
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
                                                <v-btn
                                                    class="error"
                                                    @click="submitForm"
                                                    >Book Now</v-btn
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </v-row>
                        </v-form>
                    </div>

                    <!--adding trip summary-->
                    <customer-trip-summary />

                    <!--
                        <div class="col-lg-3 col-md-12 position-relative">
                            <div class="listing-right-sidebar">
                            <label id="trip-summary">
                                <div class="listing-sidebar-head">
                                <h4>Trip Summary</h4> <i class="fas fa-info-circle"></i>
                                </div>
                                <input class="d-none" type="checkbox" id="trip-summary-toggle">
                                <div class="listing-sidebar-body">
                                <div class="sidebar-content">
                                    <div class="in-top">
                                    <div class="in-left">
                                        <img src="@/assets/images/car-small-icon.png" alt="img">
                                    </div>
                                    <div class="in-right">
                                        <h5>Total Amount: $284.97 <i class="fas fa-angle-down"></i></h5>
                                    </div>
                                    </div>
                                    <div class="in-bottom">
                                    <ul>
                                        <li>Ace</li>
                                        <li>Las Vegas <span>(30/07/2020, 18:30)</span> <img src="@/assets/images/small-reverse-arrow.png" alt="img">  San Francisco <span>(31/07/2020, 00:00)</span></li>
                                        <li>Status:</li>
                                    </ul>
                                    <div class="time-left">
                                        <small>Time Left:</small>
                                        <h4><img src="@/assets/images/clock-small.png" alt="img"> 4:45 min</h4>
                                    </div>
                                    <div class="time-buttons">
                                        <v-btn
                                        color="primary"
                                        dark
                                        v-bind="attrs"
                                        >Save To Later</v-btn>
                                        <h5 class="notBook">
                                        Not Booked
                                    </h5>
                                    </div>
                                    </div>
                                </div>
                                <div class="sidebar-content">
                                    <div class="in-top">
                                    <div class="in-left">
                                        <img src="@/assets/images/small-plane.png" alt="img">
                                    </div>
                                    <div class="in-right">
                                        <h5>Total Amount: $124.72 <i class="fas fa-angle-down"></i></h5>
                                    </div>
                                    </div>
                                    <div class="in-bottom">
                                    <ul>
                                        <li>2, Economy, Frontier Airlines</li>
                                        <li>San Diego <span>(30/07/2020, 18:30)</span> <img src="@/assets/images/small-reverse-arrow.png" alt="img">  San Francisco <span>(31/07/2020, 00:00)</span></li>
                                        <li>Status:</li>
                                    </ul>
                                    <div class="time-left">
                                        <small>Time Left:</small>
                                        <h4><img src="@/assets/images/clock-small.png" alt="img"> 4:45 min</h4>
                                    </div>
                                    <div class="time-buttons">
                                        <v-btn
                                        color="primary"
                                        dark
                                        v-bind="attrs"
                                        >Save To Later</v-btn>
                                        <h5 class="notBook">
                                        Not Booked
                                    </h5>
                                    </div>
                                    </div>
                                </div>
                                <div class="sidebar-content">
                                    <div class="text-center">
                                    <v-btn
                                    color="error"
                                    dark
                                    v-bind="attrs"
                                    class="w-100"
                                    >Checkout</v-btn>
                                    </div>
                                </div>
                                </div>
                            </label>
                            </div>
                        </div>
                    -->
                </v-row>
            </v-container>
        </section>
    </span>
</template>
<script>
import * as dataKey from '@/services/data/dsources.js';
import * as cardIcons from '@/services/data/creditcards.js';
import CustomerTripSummary from '@/components/common/widgets/CustomerTripSummary.vue';
import customerServices from '@/services/api/Customer';
import { evBus } from '@/services/bus.js';
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
            expRules: [v => !!v || 'Required'],

            country: null,
            state: null,
            city: null,
            zip: null,
            scountry: null,
            sstate: null,
            scity: null,
            szip: null
        };
    },
    components: {
        CustomerTripSummary
    },
    mounted: function() {
        this.cardMasks = dataKey.creditCards;
        this.displayExpMon = dataKey.months;
        this.displayExpYrs = dataKey.Fyears;

        let _invToken = this.$store.getters.inviteToken;
        let _userRole = this.signedUserRole;

        if (_invToken != false && _userRole == 'customer')
            this.loadCustomerDetails();
    },
    computed: {
        signedUserDetails() {
            return this.$store.getters.signedUserDetails;
        }
    },
    methods: {
        loadCustomerDetails: function() {
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

        populateForm: function(_customerInfo) {
            // set customer info in above form
            this.cardHolderFirstName = _customerInfo.vcFName;
            this.cardHolderLasttName = _customerInfo.vcLName;
            this.cardHolderEmail = _customerInfo.vcEmail;
            this.cardHolderAddress = _customerInfo.vcAddress;
            this.cardHolderAddressTwo = '';

            evBus.$emit('updatePhoneNumber', _customerInfo.vcHPhone);
        },
        displayTripInfo: function(tripDetails) {
            let storePayload = {
                name: tripDetails.tripName,
                trv_name: tripDetails.pTraveler,
                trip_id: tripDetails.tripId,
                tripStartDate: tripDetails.tripStartDate.substr(0, 10)
            };

            this.$store.dispatch('setTripDetail', { TRIP: storePayload });

            this.setUpTripDetails(tripDetails);
        },

        submitForm: function() {
            let valid = this.$refs.form.validate();

            if (valid) {
                let expParts = this.expDate.split('/');

                let paymentInfo = {
                    card: this.card.replace(/\s+/g, ''),
                    csv: this.csv,
                    expMonth: expParts[0],
                    expYear: expParts[1],
                    cardType: this.cardName.toUpperCase()
                };

                this.doPaymentReq(paymentInfo);
            } // Ends IF Validate
        },
        doPaymentReq(cardInfo) {
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
                countryCode: this.country
            };

            // DO A CALL TO SAVE PAYMENT
            let reqHeaders = {
                headers: { 'Content-Type': 'application/json' }
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
            reqDataForm.append('countryCode', reqPayload.countryCode); */

            customerServices
                .savePayment(reqPayload, reqHeaders)
                .then(rsp => {
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

                        this.$awn.alert(
                            'Please try later, server encounter error..!'
                        );
                        return false;
                    } else {
                        let _cards = rsp.data.data;

                        this.$store.dispatch('addCards', { CARDS: _cards });

                        this.$awn.success(
                            'Credit card detail store successfully..!',
                            {
                                labels: { success: 'Card Added' }
                            }
                        );
                    }

                    //
                })
                .catch(err => {
                   // console.log('error in saving request', err);
                });
        },
        validateCards: function() {
            if (this.card) {
                let myCardLen = this.card;
                myCardLen = myCardLen.replace(/\s+/g, '');

                if (myCardLen.length != this.validCardLength)
                    return 'Please input valid card number.';

                return true;
            }

            return true;
        },
        validateCsv: function() {
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
        validateExpiryDate: function() {
            if (this.expDate) {
                if (this.expDate.length < 5)
                    return 'Please input valid expiry date.';

                let expParts = this.expDate.split('/');

                if (expParts[0].length < 2 || expParts[0].length < 2)
                    return 'Please input valid expiry date.';

                return true;
            }

            return true;
        },
        creditCardInput: function(event) {
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
        creditExpiryInput: function(event) {
            let expiry = event.target.value;

            if (expiry.substring(0, 1) > 1) event.target.value = '';
        },
        loadCardInfos: function(item) {
            switch (item.cardtype) {
                case 'american express':
                    $(this.$refs.ccicon).html(cardIcons.amex);
                    this.validCsvLength = 4; // amex has 4 digit csv
                    this.validCardLength = item.cardLength;
                    this.compMask = item.mask;
                    this.cardName = 'american express';
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
                default:
                    $(this.$refs.ccicon).html('');
                    this.validCsvLength = 3;
                    this.validCardLength = 16;
                    this.compMask = item.mask;
                    this.cardName = 'default';
                    break;
            }
        }
    }
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
