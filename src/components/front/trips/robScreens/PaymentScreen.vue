<template>
  <div class="trip-tab-box">
    <v-card>
      <v-row>
        <v-col cols="12">
          <h6>
            PayTypes Accepted:
            <span style="color: #1e255d">Card, VISA, AMEX and Discover</span>
          </h6>
        </v-col>
      </v-row>
      <div class="register-trip-tab-box">
        <v-row>
          <v-col cols="12" sm="6">
            <label class="trip-label">Card Number:*</label>
            <v-text-field pattern="[0-9]" v-mask="compMask" v-model="card" :rules="[
              (v) => !!v || 'Card number is required.',
              validateCards,
            ]" :messages="
                          errors['paymentDetails.ccNumber']
                            ? ' Please input valid card number.'
                            : ''
                        " placeholder="0000-0000-0000-0000" v-bind:class="
                                errors['paymentDetails.ccNumber']
                                  ? 'input-error'
                                  : ''
                              " @keyup="creditCardInput" validate-on-blur></v-text-field>
            <svg ref="ccicon" class="ccicon" width="750" height="471" viewBox="0 0 750 471" version="1.1"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>
          </v-col>
          <v-col cols="12" sm="3">
            <label class="trip-label">CVV</label>
            <v-text-field type="number" v-model="csv" v-bind:class="
              errors['paymentDetails.cardCvv']
                ? 'input-error'
                : ''
            " placeholder="***" :messages="
  errors['paymentDetails.cardCvv']
    ? 'Please input valid card CVV.'
    : ''
" :rules="[
  (v) => !!v || 'CVV field is required.',
  validateCsv,
]"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <label class="trip-label">Payment Amount</label>
            <v-text-field single-line label="212.33" disabled></v-text-field>
          </v-col>
        </v-row>
      </div>

      <v-row>
        <v-col cols="12" sm="6">
          <label class="trip-label">Name on Card:*</label>
          <v-text-field single-line placeholder="Enter name" :rules="[
            (v) => !!v || 'card Holder name is required',
          ]"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <label class="trip-label">Valid Until:*</label>
          <v-text-field pattern="[0-9]" required v-mask="expMask" v-model="expDate" placeholder="mm/yy" :rules="[
            (v) => !!v || 'Expiry date is required.',
            validateExpiryDate,
          ]" :messages="
  errors['paymentDetails.cardExpireMonth']
    ? 'Please input valid Expiry date.'
    : ''
" @keyup="creditExpiryInput">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <label class="trip-label">Billing Address Line 1:*</label>
          <v-text-field v-model="billingAddress1" single-line placeholder="Enter billing address 1" :rules="[
            (v) => !!v || 'Billing address is required ',
          ]"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <label class="trip-label">Billing Address Line 2:</label>
          <v-text-field v-model="billingAddress2" single-line placeholder="Enter billing address 2"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <label class="trip-label">Country:*</label>
          <country-select v-model="country" :updateValue="country" />
        </v-col>
        <v-col cols="12" sm="6">
          <label class="trip-label">State:*</label>
          <region-select v-if="country" v-model="state" :country="country" :rules="[
            (v) => !!v || 'State field is required.',
          ]" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <label class="trip-label">City:*</label>
          <v-text-field :hide-details="false" id="city" background-color="white" height="40" placeholder="City"
            v-model="city" :rules="[(v) => !!v || 'City is required.']"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <label class="trip-label">Zip Code:*</label>
          <v-text-field :hide-details="false" id="zip" background-color="white" height="40" placeholder="Enter Zip code"
            v-model="zip" :rules="[(v) => !!v || 'ZIP code is required.']"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <label class="trip-label">Contact Number:*</label>
          <phone-num-select v-model="mobile" :value="premobileval" placeholder="Mobile Number" :phoneDetails="false"
            id="phone" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-checkbox v-model="checkbox">
            <template v-slot:label>
              I have read and agree to the payment terms &
              schedule, and agree to take responsibility to
              have my client make any future payments on their
              holiday or risk penalties and/or cancelations.
            </template>
          </v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-checkbox v-model="checkbox">
            <template v-slot:label>
              I have obtained a signed copy of the Credit card
              authorization form from my client giving me
              authorization to use their credit card for this
              holiday.
            </template>
          </v-checkbox>
        </v-col>
      </v-row>
      <div class="register-trip-tab-box">
        <v-row>
          <v-col cols="6" sm="2">
            <v-btn color="primary" dense class="car-search-btn" @click.prevent="updateView(-1)">
              <strong>BACK</strong>
            </v-btn>
          </v-col>
          <v-col cols="6" sm="3">
            <v-btn @click="submitBooking" style="width:300px;" color="error" dense class="car-search-btn">
              <strong>Register And Pay For Booking</strong>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script type="text/javascript">
import * as dataKey from '@/services/data/dsources.js';
import * as cardIcons from '@/services/data/creditcards.js';
import PhoneNumSelect from '@/components/common/widgets/PhoneNumSelect.vue';
import RegionSelect from '@/components/common/widgets/RegionSelect.vue';
import CountrySelect from '@/components/common/widgets/CountrySelect.vue';
import robServices from '@/services/api/RegisterOutsideBookings.js';
import { mapState } from 'vuex';

export default {
  name: 'PaymentScreen',
  components: {
    PhoneNumSelect,
    RegionSelect,
    CountrySelect,
  },
  data() {
    return {
      billingAddress1: '',
      billingAddress2: '',
      checkbox: false,
      typeOfTrip: '',
      tripBooking: [],
      tripdetailsget: [],
      itemDetials: [],
      errors: [],
      mobile: null,
      premobileval: null,
      country: null,
      countryCode: null,
      state: null,
      city: null,
      zip: null,
      card: null, // card number
      cardName: null, // card name
      cardHolderFirstName: null,
      cardHolderLastName: null,
      cardHolderEmail: null,
      cardHolderAddress: null,
      cardHolderAddressTwo: '',
      compMask: '#### #### #### ####',
      expMask: '##/##',
      csv: null,
      expMon: null,
      expYer: null,
      expDate: null,
      validCardLength: null,
      validCsvLength: null,
      cardMasks: [],
      displayExpMon: [],
      displayExpYrs: [],
      disablePaymentCheck: false,
      paymentPreferences: '',
      paymentCommissions: [],
      allowedCardTypes: [],
      excludedCards: [
        'BC Card',
        'Hipercard',
        'Argencard',
        'Pacific',
        'Switch',
        'Carte Blanche',
      ],
    }
  },

  computed: {
    ...mapState({
      vcClientPIN:(state) => state.RegisterOutsideBookingStore.vcClientPIN,
      tripId:(state) => state.RegisterOutsideBookingStore.tripId,
      nBookingTypeID:(state) => state.RegisterOutsideBookingStore.nBookingTypeID,
      nSupplierID:(state) => state.RegisterOutsideBookingStore.nSupplierID,
      nBookingID:(state) => state.RegisterOutsideBookingStore.nBookingID,
      vcGroupNumber:(state) => state.RegisterOutsideBookingStore.vcGroupNumber,
      vcConfirmationID:(state) => state.RegisterOutsideBookingStore.vcConfirmationID,
      vcClientName:(state) => state.RegisterOutsideBookingStore.vcClientName,
      nNumberOfPsgrs:(state) => state.RegisterOutsideBookingStore.nNumberOfPsgrs,
      nTotalCharges:(state) => state.RegisterOutsideBookingStore.nTotalCharges,
      nTotalCurrency:(state) =>state.RegisterOutsideBookingStore.nTotalCurrency, 
      dTravelStartDate:(state) => state.RegisterOutsideBookingStore.dTravelStartDate,
      dTravelEndDate:(state) => state.RegisterOutsideBookingStore.dTravelEndDate,
      dBooked:(state) => state.RegisterOutsideBookingStore.dBooked,
      vcVendor: (state) => state.RegisterOutsideBookingStore.vcVendor,
      nTotalCommission:(state) => state.RegisterOutsideBookingStore.nTotalCommission,
      vcFinalDestination:(state) => state.RegisterOutsideBookingStore.vcFinalDestination,
      files: (state)=> state.RegisterOutsideBookingStore.files

    }),

  },
  mounted() {
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

  },

  methods: {
    submitBooking() {
      let reqHeaders = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };


      let formData = new FormData();

      formData.append('vcClientPIN', 'A106930');
      formData.append('tripId', this.tripId);
      formData.append('nBookingTypeID', this.nBookingTypeID);
      formData.append('nSupplierID', this.nSupplierID);
      formData.append('nBookingID', this.nBookingID);
      formData.append('vcConfirmationID', this.vcConfirmationID);
      formData.append('vcClientName', this.vcClientName);
      formData.append('nNumberOfPsgrs', this.nNumberOfPsgrs);
      formData.append('dTravelStartDate', this.dTravelStartDate);
      formData.append('dTravelEndDate', this.dTravelEndDate);
      formData.append('nTotalCharges', this.nTotalCharges);
      formData.append('nTotalCurrency', this.nTotalCurrency);
      formData.append('dBooked', this.dBooked);
      formData.append('vcVendor', this.vcVendor);
      formData.append('nTotalCommission', this.nTotalCommission);
      formData.append('vcFinalDestination', this.vcFinalDestination);
      for (let i = 0; i < this.files.length; i++) {
        
        formData.append('files[]', this.files[i]);
      }
      robServices.registerBooking(formData, reqHeaders)
        .then((rsp) => {
          console.log('rsp', rsp);
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

        if (!this.allowedCardTypes.includes(this.cardName)) {
          return 'Provided credit card not allowed.';
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
  }
}
</script>