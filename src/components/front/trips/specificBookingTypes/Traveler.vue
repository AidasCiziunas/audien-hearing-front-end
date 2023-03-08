<template>
  <div class="trip-tab-box">
    <v-form lazy-validation ref="travellerForm">
    <v-card>
      <v-row>
        <v-col cols="4">
          <h6>Choose Guest</h6>
        </v-col>
      </v-row>
      <div class="register-trip-tab-box">
        <v-row>
          <v-col cols="12" sm="4">
            <label class="trip-label">Booking for</label>
            <v-select
              v-model="bookingForType"
              :items="[
                'Please Choose One',
                'New Customer',
                'Existing Customer',
              ]"
              label="Search Traveller"
              @change="resetForm($event)"
            ></v-select>
          </v-col>
          <v-col v-if="bookingForType == 'Existing Customer'" cols="12" sm="4">
            <label class="trip-label">Existing Guest</label>
            <v-text-field
              v-model="srchTraveller"
              append-icon="mdi-magnify"
              label="Search Customers"
              single-line
              hide-details
              clearable
              @click:clear="clearTable()"
              :loading="isTravellerLoading"
              @keyup="filterTravelers($event)"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="4" v-if="isTravellerExist && bookingForType == 'Existing Customer' ">
            <label class="trip-label">Travelers On This Trip</label>
             <ul>
              <li v-for="(traveller, travellerIndex) in computedExistingTraveller" :key="travellerIndex">
                <a href="javascript:void(0)" @click="populateTravelerFormByExisting(traveller)">{{ traveller.firstName }} {{ traveller.lastName }}</a>
              </li>
             </ul>
            
          </v-col>
        </v-row>
        <v-row v-if="computedTravellers.length > 0 && showTable">
          <v-col cols="12" sm="12">
            <v-data-table
              :headers="computedHeaders"
              :items="computedTravellers"
              :items-per-page="5"
              
            >
              <template v-slot:item="row">
                <tr>
                  <td>
                    {{ row.item.sno }}
                  </td>
                  <td>
                    {{ row.item.vcFName }}
                  </td>
                  <td>
                    {{ row.item.vcLName }}
                  </td>
                  <td>
                    {{ row.item.vcHPhone }}
                  </td>
                  <td>
                    {{ row.item.vcEmail }}
                  </td>
                  <td>
                    <v-btn
                      x-small
                      color="primary"
                      dark
                      @click="populateTravelerFormBySrch(row.item)"
                    >
                      SELECT
                    </v-btn>
                
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </div>

      <v-row>
        <v-col cols="12">
          <h6>New Guest Information</h6>
        </v-col>
      </v-row>
      <div class="register-trip-tab-box">
        <v-row>
          <v-col cols="12">
            <label class="trip-label">Salutation<span class="red--text" >*</span></label>
            <v-radio-group
              v-model="travelerInfo.salutation"
              row
              :rules="[(v) => v.length > 0 || 'Salutation field is required.']"
            >
              <v-radio
                label="Mr."
                value="Mr."
                name="rdSalutation[]['salutation']"
                :checked="travelerInfo.checked"
              ></v-radio>
              <v-radio
                label="Mrs."
                value="Mrs."
                name="rdSalutation[]['salutation']"
              ></v-radio>
              <v-radio
                label="Ms."
                value="Ms."
                name="rdSalutation[]['salutation']"
              ></v-radio>
              <v-radio
                label="Dr."
                value="Dr."
                name="rdSalutation[]['salutation']"
              ></v-radio>
              <v-radio
                label="Other"
                value="Other"
                name="rdSalutation[]['salutation']"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </div>
      <div class="register-trip-tab-box">
        <v-row>
          <v-col cols="12" sm="4">
            <label class="trip-label">First Name<span class="red--text">*</span></label>
            <v-text-field
              v-model="travelerInfo.firstName"
              single-line
              label="First Name"
              placeholder="Enter Your First Name Here"
              :rules="[(v) => !!v || 'First name is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <label class="trip-label">Middle Name</label>
            <v-text-field
              v-model="travelerInfo.middleName"
              single-line
              label="Middle Name"
              placeholder="Enter Your Middle Name Here"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <label class="trip-label">Last Name<span class="red-text">*</span></label>
            <v-text-field
              v-model="travelerInfo.lastName"
              single-line
              label="Last Name"
              placeholder="Enter Your Last Name Here"
              :rules="[(v) => !!v || 'Last name is required']"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div class="register-trip-tab-box">
        <v-row>
          <v-col cols="12" sm="4">
            <label class="trip-label">Email Address<span class="red--text">*</span></label>
            <v-text-field
              v-model="travelerInfo.emailAddress"
              single-line
              label="Email Address"
              placeholder="Enter Your Email Address Here"
              :rules="[(v) => CheckvalidEmail(v)]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <label class="trip-label">Mobile Number</label>
            <vue-tel-input-vuetify
              v-bind="$attrs"
              v-model="travelerInfo.mobileNumber"
              background-color="white"
              v-on:country-changed="countryChanged"
              :preferredCountries="preferredCountries"
              :defaultCountry="defaultCountry"
              :disabledFetchingCountry="true"
              :onlyCountries="whiteList"
              @input="onUpdatePhone"
              name="traveller[][phone]"
              placeholder="Enter Your Mobile Number Here"
            />
          </v-col>
        </v-row>
      </div>
      <div class="register-trip-tab-box">
        <v-row>
          <v-col cols="12" sm="4">
            <label class="trip-label">Street Address</label>
            <v-text-field
              v-model="travelerInfo.streetAddress"
              single-line
              label="Street Address"
              placeholder="Enter Your Street Addresss"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <label class="trip-label">Country</label>
            <country-select
              v-model="travelerInfo.country"
              :updateValue="travelerInfo.country"
            />
          </v-col>
        <v-col cols="12" sm="4">
            <label class="trip-label">State</label>
            <region-select
              v-if="travelerInfo.country"
              v-model="travelerInfo.state"
              :country="travelerInfo.country"
            />
          </v-col>
        </v-row>
      </div>
      <div class="register-trip-tab-box">
        <v-row>
          <v-col cols="4" sm="2">
                <v-btn
                  @click.prevent="updateStep('prev')"
                  color="primary"
                  class="car-search-btn"
                >
                  <strong>BACK</strong>
                </v-btn>
          </v-col>
          <v-col cols="4" sm="2">
                <v-btn
                  @click="submitBooking()"
                  color="error"
                  class="car-search-btn"
                  style="width:210px;"
                >
                  <strong>Only Register Booking</strong>
                </v-btn>
          </v-col>
          <v-col cols="4" sm="2" v-if="domain == 'uk'">
                <v-btn
                  @click.prevent="updateStep('next')"
                  color="error"
                  class="car-search-btn"
                  style="width:210px; margin-left:70px;"
                >
                  <strong>Proceed to Payment</strong>
                </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>
    </v-form>
  </div>
</template>

<script>
import PhoneNumSelect from '../../../common/widgets/PhoneNumSelect.vue';
import RegionSelect from '@/components/common/widgets/RegionSelect.vue';
import CountrySelect from '@/components/common/widgets/CountrySelect.vue';
import travellerServices from '@/services/api/Travellers';
import robServices from '@/services/api/RegisterOutsideBookings.js';
import tripServices from '@/services/api/Trips';
import { mapState } from 'vuex';
export default {
  name: 'Traveler',
  components: {
    PhoneNumSelect,
    RegionSelect,
    CountrySelect,
  },

  data() {
    return {
      tripBooking: [],
      tripdetailsget: [],
      itemDetials: [],
      searchData: [],
      nOfTravellers: 1,
      showTable:false,
      min_search_autocomplete_length: 3,
      travellers: [],
      srchTraveller: '',
      travellerOfTheTrip: null,
      isTravellerLoading: false,
      existingCustomerError: false,
      bookingForType: null,
      travelerInfo: {
        salutation: 'Mr.',
        firstName: null,
        middleName: null,
        lastName: null,
        emailAddress: null,
        mobileNumber: null,
        streetAddress: null,
        state: null,
        country: null,
        checked: true,
      },
      preferredCountries: ['US', 'GB', 'MX'],
      defaultCountry: '',
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
      mainFormIndex: '',
      subFormIndex: '',
      birthDateRules: [
        (v) => !!v || 'Birth date is required',
        (v) => v || (v && v.length >= 10) || 'yes',
      ],
      addressRules: [
        (v) => !!v || 'Address is required',
        (v) =>
          (v && v.length >= 10) || 'Address must have atleast 10 characters',
        (v) => (v && v.length <= 30) || 'Address maximum 30 characters allowed',
        (v) =>
          !/[^a-zA-Z0-9 ]/.test(v) ||
          'Address must contain only alphabets, numbers and space.',
      ],
      domains: {
        mx: 'Mexico',
        uk: 'United Kingdom',
        us: 'United States',
      },
      travellersList:[],
      tripTraveller: null,
      isTravellerExist: false
    };
  },

  mounted(){
    console.log('vvv', this.$store.state.authStore.user[0].agent.pin)
     if(this.computedExistingTraveller.length > 0){
        this.isTravellerExist = true
        this.log('EE', this.computedExistingTraveller)
     } 
     
     this.log('EE', this.computedExistingTraveller)
  },
    
  computed: {
    ...mapState({
      userTrips: (state) => state.tripStore.userTripDetais,
      TripStore: (state) => state.tripStore,
    }),

    computedExistingTraveller(){
        let trv =  this.doCleanArray(this.$store.getters.tripSummary.trip_travellers)
       return trv.map(({traveller}) => traveller)
    },
    computedHeaders() {
      return [
        { text: 'Sr.No', align: 'start', sortable: true, value: 'sno' },
        { text: 'First name', value: 'vcFName' },
        { text: 'Last name', value: 'vcLName' },
        { text: 'Phone', value: 'vcHPhone' },
        { text: 'Email', value: 'vcEmail' },
        { text: 'Action', value: 'icon' },
      ];
    },

    computedTravellers() {
      if (this.travellers) {
        return this.travellers.map((d, index) => ({
          ...d,
          sno: index + 1,
          icon: 'fas fa-chevron-down',
        }));
      }
    },
    ...mapState({
      domain: (state) => state.envStore.domain,
      vcClientPIN:(state) => state.authStore.user[0].agent.pin,
      tripId:(state) => state.RegisterOutsideBookingStore.tripId,
      nBookingTypeID:(state) => state.RegisterOutsideBookingStore.nBookingTypeID,
      nSupplierID:(state) => state.RegisterOutsideBookingStore.nSupplierID,
      vcSupplierName:(state) => state.RegisterOutsideBookingStore.vcSupplierName,
      nBookingID:(state) => state.RegisterOutsideBookingStore.nBookingID,
      nBookingReference:(state)=> state.RegisterOutsideBookingStore.nBookingReference,
      nSupplierReference:(state)=> state.RegisterOutsideBookingStore.nSupplierReference,
      vcGroupNumber:(state) => state.RegisterOutsideBookingStore.vcGroupNumber,
      vcConfirmationID:(state) => state.RegisterOutsideBookingStore.vcConfirmationID,
      vcItineraryID:(state) => state.RegisterOutsideBookingStore.vcItineraryID,
      vcOtherID: (state) => state.RegisterOutsideBookingStore.vcOtherID,
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
      vcLiftCity:(state) => state.RegisterOutsideBookingStore.vcLiftCity,
      files: (state)=> state.RegisterOutsideBookingStore.files
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

    travelerOfTrip:{
      get:function(){
      return this.tripTraveller;
      },
      set:function(newValue){
        this.tripTraveller = newValue;
      }
    },
  },

  methods: {
    submitBooking() {
      let that = this
      if(!this.$refs.travellerForm.validate()) return
      this.$store.dispatch('travellerState',{
        nNumberOfPsgrs: 1,
        vcClientName: this.travelerInfo.firstName.concat(" ", this.travelerInfo.lastName),
      });
      let reqHeaders = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };


      let formData = new FormData();

      formData.append('vcClientPIN', this.vcClientPIN);
      formData.append('tripId', this.tripId);
      formData.append('nBookingTypeID', this.nBookingTypeID);
      if(this.vcSupplierName !== null){
        formData.append('vcSupplierName', this.vcSupplierName);
      }

      formData.append('nSupplierID', this.nSupplierID);

      if( this.nBookingID !== null){
        formData.append('nBookingID', this.nBookingID);
      }
      if( this.vcItineraryID !== null){
         formData.append('vcItineraryID', this.vcItineraryID)
      }
      if(this.vcOtherID !== null){
         formData.append('vcOtherID', this.vcOtherID)
      }
      if(this.nBookingReference !== null){
        formData.append('nBookingReference', this.nBookingReference)
      }

      if(this.nSupplierReference !== null){
        formData.append('nSupplierReference', this.nSupplierReference)

      }

  
    
      formData.append('vcConfirmationID', this.vcConfirmationID);
      formData.append('vcClientName', this.vcClientName);
      formData.append('nNumberOfPsgrs', this.nNumberOfPsgrs);
      formData.append('dTravelStartDate', this.dTravelStartDate);
      formData.append('dTravelEndDate', this.dTravelEndDate);
      formData.append('nTotalCharges', this.nTotalCharges);
      formData.append('nTotalCurrency', this.nTotalCurrency);
      formData.append('dBooked', this.dBooked);
      if(this.vcVendor !== null){
      formData.append('vcVendor', this.vcVendor);
      }
      formData.append('nTotalCommission', this.nTotalCommission);
      formData.append('vcLiftCity', this.vcLiftCity)
      formData.append('vcFinalDestination', this.vcFinalDestination);
      for (let i = 0; i < this.files.length; i++) {
        
        formData.append('files[]', this.files[i]);
      }
      robServices.registerBooking(formData, reqHeaders)
        .then((rsp) => {
          if(rsp.data.success){
            this.$awn.success(`Booking # ${this.vcConfirmationID} has entered`, {
                            labels: { success: 'Booking Added' }
          })

             this.viewTrip(this.tripId)
          }
          if(!rsp.data.success){
             this.$awn.alert(rsp.data.message, {labels:{alert: 'Booking Failed'}})
             this.$store.dispatch('resetRosStore')
          }
          
        })
        .catch((err) =>{
          if(err == 500){
            this.$awn.alert('Server Error Encountred', {labels:{alert: 'Server Error'}})
            this.$store.dispatch('resetRosStore')
          }
          console.log('error', err)
          
        })


    },


    getTripDetials() {
      this.tripBooking = this.userTrips[0].tripbookings;

      this.tripdetailsget = this.userTrips[0].tripbookings;

      this.itemDetials = this.tripdetailsget.map((item) => {
        return {
          search: JSON.parse(item.details).engineDetails,
        };
      });

      this.searchData = this.tripdetailsget.map((item) => {
        return {
          searchRecord: JSON.parse(item.details).searchData,
        };
      });
    },
    viewTrip(tripId, expand_val = '') {
      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let reqPayLoad = {
        searchBy: 'tripId',
        searchKey: tripId,
      };

      tripServices.searchTrip((reqHeaders, reqPayLoad)).then((response) => {
        if (response.data.errors.message == 'Session is expired.') {
          this.$awn.alert(
            'Your being timed out due to inactivity, Please try View Hotel again !'
          );
        } else if (
          response.data.message ==
          'Hotel Package not found! Please try again later.'
        ) {
          this.$awn.alert(
            'We have not received the details needed from our supplier to view this hotel . Please select another hotel.'
          );
        } else {
          if (response.data.data[0].tripbookings.length > 0) {
            this.$store.dispatch('UserAllTripsDetails', response.data.data);
            if (expand_val == 'expand') {
              this.showTrip = response.data.data[0];
              this.getTripDetials();
            } else {
              this.$store.dispatch('resetRosStore')
              this.$router.push('/trip-details').catch(() => {});
            }
          } else {
            this.$awn.alert(
              'Trip booking data not available for this trip ID.'
            );
          }
        }
      });
    },
    resetForm(value){
        if(value == 'New Customer'){
        this.$refs.travellerForm.reset();
        this.srchTraveller = '';
      }
    },
    updateStep(val){
      if(val == 'prev')
      this.$emit('updateSteps', val);

      else if(val == 'next' &&!this.$refs.travellerForm.validate()){
        return
      } 
      else{
      this.$store.dispatch('travellerState',{
        nNumberOfPsgrs: this.nOfTravellers,
        vcClientName: this.travelerInfo.firstName.concat(" ", this.travelerInfo.lastName),
      });
      this.$emit('updateSteps', val);
    }
    },
    clearTable(){
         this.travellers = [];
    },
    populateTravelerFormBySrch(traveller){
      this.log('traveller by search', traveller);
        this.showTable = false;
        if(traveller){
         this.travelerInfo.firstName = traveller.vcFName
         this.travelerInfo.lastName = traveller.vcLName
         this.travelerInfo.salutation = traveller.vcSalutation !== ''? traveller.vcSalutation: 'Mr.'
         this.travelerInfo.mobileNumber = traveller.vcHPhone
         this.travelerInfo.emailAddress = traveller.vcEmail
         this.travelerInfo.streetAddress = traveller.vcAddress
         this.travelerInfo.country = traveller.vcCountry
         this.travelerInfo.state = traveller.vcState

           this.$forceUpdate();
           this.$awn.info(
        'Infomation has loaded in the form, please click to save..!',
        { labels: { info: 'Information Added' } }
      );
        }
    },

    populateTravelerFormByExisting(traveller){
      this.travelerInfo.firstName = traveller.firstName
         this.travelerInfo.lastName = traveller.lastName
         this.travelerInfo.salutation = traveller.title !== ''? traveller.title: 'Mr.'
         this.travelerInfo.mobileNumber = traveller.wPhone
         this.travelerInfo.emailAddress = traveller.email
         this.travelerInfo.streetAddress = traveller.address
         this.travelerInfo.country = traveller.country
         this.travelerInfo.state = traveller.state
    
           this.$awn.info(
        'Infomation has loaded in the form, please click to save..!',
        { labels: { info: 'Information Added' } }
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
    onUpdatePhone(formattedNumber, { number, valid, country }) {
      this.validNumber = valid;
      this.travelerInfo.country = country.name;
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
       
    },

    filterTravelers: function (event) {
      var that = this;
      this.isTravellerLoading = true;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.timer = setTimeout(() => {
        let val = event.target.value;

        if (!val) return;

        if (val.length < that.min_search_autocomplete_length) return;

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
              this.existingCustomerError = true;
              that.$awn.alert(response.data.message)
              this.travellers = [];
              return false;
            }
            this.travellers = response.data.data;
            this.showTable = true;
          })
          .catch((error) => {
            that.$awn.alert(
              'Please try later, server encounter error..!',
              error
            );
          })
          .finally(() => {
            // do some thing here
            this.isTravellerLoading = false;
          });
      }, 800); // debounce
    },
    checkValidNumber() {
      if (!this.validNumber) return 'Please enter valid mobile number';
      return true;
    },
    countryChanged(country) {
      this.travelerInfo.country = country.name;
    },
  },
};
</script>
