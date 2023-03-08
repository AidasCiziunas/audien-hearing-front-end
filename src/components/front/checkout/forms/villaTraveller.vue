<template>
    <span style="display: block !important;">
        <v-expansion-panel-header>
            <div class="accordian-header">
                <div class="in-left">
                    <i class="fas fa-umbrella-beach" style="color: #FFF!important; font-size: 20px!important;"></i>
                    <!--
                        <img :src="require('@/assets/images/hotel.png').default" alt="" />
                    -->
                </div>
                <div class="in-right">
                    <div class="step1-pickup-data">
                        <p>
                            {{ car.item.villa.displayName }}
                        </p>
                    </div>

                    <div class="accordian-compare-img">
                        <img
                            src="@/assets/images/checkout-compare-arrow.png"
                            alt=""
                        />
                    </div>

                    <div class="step1-pickup-date">
                        <p>
                            {{ justFormatRawDate(car.item.pdate) }} -
                            {{ justFormatRawDate(car.item.ddate) }}
                        </p>
                    </div>
                </div>
            </div>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
            <div class="add-travel-box-top step1-add-travel-box">
                <div class="step2-payment-information">
                    <h3>Guests</h3>
                    <p>
                        *Guests names must match the traveler’s passport or
                        Government-issued photo ID
                    </p>
                </div>

                <div class="travel-box-iner step1-travel-box">
                    <div
                        class="add-travel-form"
                        v-for="(objTraveler, trvInd) in car.traveler"
                        :key="trvInd"
                    >
                        <v-form :ref="'form99' + ind">
                            <hr class="solid" v-if="trvInd > 0" />

                            <v-row class="m-0">
                                <div class="col-md-12 col-sm-12">
                                    <v-row
                                        align="center"
                                        class="ml-0 mr-o mb-5"
                                    >
                                        <div class="add-travel-input mt-10">
                                            <v-select
                                                :items="objTraveler.pTravelers"
                                                item-text="text"
                                                item-value="value"
                                                :label="
                                                    objTraveler.pTravelersLabel
                                                "
                                                :rules="[
                                                    v =>
                                                        !!v ||
                                                        'Title is required'
                                                ]"
                                                v-model="
                                                    objTraveler.pTravelersVal
                                                "
                                                width="300"
                                                @change="showInvitation($event)"
                                                @focus="phoneFocusedForm(ind, trvInd)"
                                            >
                                            </v-select>
                                        </div>

                                       

                                        <div
                                            v-if="
                                                objTraveler.pTravelersVal == 2
                                            "
                                            class="add-travel-input row col-md-12 col-sm-12"
                                        >
                                            <!--Start Search CRM-->

                                            <div
                                                :class="
                                                    tripTravellers.length > 0
                                                        ? 'col-md-12 col-sm-12'
                                                        : 'col-md-12 col-sm-12'
                                                "
                                                style="padding: 0px!important;"
                                            >
                                                Existing Guest

                                                <v-spacer></v-spacer>

                                                <v-text-field
                                                    v-model="
                                                        objTraveler
                                                            .searchTravelers
                                                            .search
                                                    "
                                                    append-icon="mdi-magnify"
                                                    label="Search Customers"
                                                    single-line
                                                    hide-details
                                                    clearable
                                                    outlined
                                                    :loading="
                                                        objTraveler.searchTravelers.loading
                                                    "
                                                    @keyup="
                                                        filterTravelers(
                                                            $event,
                                                            ind,
                                                            trvInd
                                                        )
                                                    "
                                                    @focus="phoneFocusedForm(ind, trvInd)"
                                                >
                                                </v-text-field>

                                                <v-data-table
                                                    class="tablerows"
                                                    :headers="
                                                        objTraveler
                                                            .searchTravelers
                                                            .headers
                                                    "
                                                    :items="
                                                        objTraveler
                                                            .searchTravelers
                                                            .travellers
                                                    "
                                                    :items-per-page="5"
                                                    v-if="
                                                        objTraveler
                                                            .searchTravelers
                                                            .travellers.length >
                                                            0
                                                    "
                                                    style="margin-top: 20px;"
                                                >
                                                    <template v-slot:item="row">
                                                        <tr>
                                                            <td>
                                                                {{
                                                                    row.item
                                                                        .srIndex
                                                                }}
                                                            </td>
                                                            <td>
                                                                {{
                                                                    row.item
                                                                        .vcFName
                                                                }}
                                                            </td>
                                                            <td>
                                                                {{
                                                                    row.item
                                                                        .vcLName
                                                                }}
                                                            </td>
                                                            <td>
                                                                {{
                                                                    row.item
                                                                        .vcHPhone
                                                                }}
                                                            </td>
                                                            <td>
                                                                {{
                                                                    row.item
                                                                        .vcEmail
                                                                }}
                                                            </td>
                                                            <td>
                                                                <v-btn
                                                                    x-small
                                                                    color="primary"
                                                                    dark
                                                                    @click="
                                                                        populateTravelerFormBySrch(
                                                                            $event,
                                                                            row.item,
                                                                            ind,
                                                                            trvInd
                                                                        )
                                                                    "
                                                                >
                                                                    SELECT
                                                                </v-btn>
                                                            </td>
                                                        </tr>
                                                    </template>
                                                </v-data-table>
                                            </div>

                                            <div
                                                class="col-md-12 pl-0 pb-2"
                                                style=""
                                                v-if="tripTravellers.length"
                                            >
                                                Travelers Of Trip

                                                <v-spacer></v-spacer>

                                                <a
                                                    href="javascript:void(0);"
                                                    v-for="(traveler,
                                                    trvIndExisting) in tripTravellers"
                                                    @click="
                                                        populateTravelerFormByTraveler(
                                                            traveler.traveller,
                                                            ind,
                                                            trvInd
                                                        )
                                                    "
                                                    :key="'villa'+trvIndExisting"
                                                >
                                                    {{
                                                        traveler.traveller
                                                            .firstName +
                                                            ' ' +
                                                            traveler.traveller
                                                                .lastName
                                                    }}
                                                </a>
                                            </div>

                                          <div class="col-md-12 pt-3 pl-0" v-if="objTraveler.searchTravelers.error">
                      
                                            <v-alert dense outlined prominent type="error">
                                              There are no records that match the search criteria.
                                            </v-alert>

                                            <!--
                                              <v-alert type="error">
                                                No records found against your search..!
                                              </v-alert>
                                            -->
                      
                                          </div>
                                            <!--Ends Search CRM-->
                                        </div>
                                    </v-row>

                                    <v-row
                                        align="center"
                                        class="ml-0 mr-0 mb-5 mt-0 gender"
                                        v-if="
                                            objTraveler.pTravelersVal == 1 ||
                                                objTraveler.showFormForcely == true"
                                    >
                                        <label class="aligment"
                                            >Salutation</label
                                        >

                                        <v-radio-group
                                            row
                                            class="ml-8 gender"
                                            v-model="objTraveler.saluation"
                                            :rules="[
                                                v =>
                                                    v.length > 0 ||
                                                    'Salutation field is required.'
                                            ]"
                                        >
                                            <v-radio
                                                class="px-4"
                                                label="Mr."
                                                value="Mr."
                                                name="rdSalutation[]['salutation']"
                                                color="primary"
                                                :checked="objTraveler.checked"
                                            ></v-radio>
                                            <v-radio
                                                class="px-4"
                                                label="Mrs."
                                                value="Mrs."
                                                name="rdSalutation[]['salutation']"
                                                color="primary"
                                            ></v-radio>
                                            <v-radio
                                                class="px-4"
                                                label="Ms."
                                                value="Ms."
                                                name="rdSalutation[]['salutation']"
                                                color="primary"
                                            ></v-radio>
                                            <v-radio
                                                class="px-4"
                                                label="Dr."
                                                value="Dr."
                                                name="rdSalutation[]['salutation']"
                                                color="primary"
                                            ></v-radio>
                                            <v-radio
                                                class="px-4"
                                                label="Other."
                                                value="Other."
                                                name="rdSalutation[]['salutation']"
                                                color="primary"
                                            ></v-radio>
                                        </v-radio-group>
                                    </v-row>
                                </div>

                                <div
                                    class="col-md-12 col-sm-12"
                                     v-if="objTraveler.pTravelersVal == 1 ||
                                            objTraveler.showFormForcely == true"
                                >
                                    <div class="row ml-0 mr-o  align-center">
                                        <div class="col-md-4 col-sm-4">
                                            <div class="add-travel-input">
                                                <v-text-field
                                                    label="First Name"
                                                    placeholder="Enter Your First Name"
                                                    v-model="
                                                        objTraveler.firstName
                                                    "
                                                    :rules="[
                                                        v =>
                                                            !!v ||
                                                            'First name field is required.',
                                                        v => (v && v.length >= 3) ||
                                                          'First name field must have atleast 3 characters'
                                                    ]"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-4 col-sm-4">
                                            <div class="add-travel-input">
                                                <v-text-field
                                                    label="Middle Name"
                                                    placeholder="Enter Your Middle Name"
                                                    v-model="
                                                        objTraveler.middleName
                                                    "
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-4 col-sm-4">
                                            <div class="add-travel-input">
                                                <v-text-field
                                                    label="Last Name"
                                                    placeholder="Enter Your Last Name"
                                                    v-model="
                                                        objTraveler.lastName
                                                    "
                                                    :rules="[
                                                        v =>
                                                            !!v ||
                                                            'Last name field is required.',
                                                        v => (v && v.length >= 3) ||
                                                          'Last name field must have atleast 3 characters'
                                                    ]"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-sm-6">
                                            <div class="add-travel-input">
                                                <v-text-field
                                                    label="Email"
                                                    placeholder="Enter Your Email"
                                                    v-model="
                                                        objTraveler.regemail
                                                    "
                                                    :rules="[
                                                        v => CheckvalidEmail(v)
                                                    ]"
                                                ></v-text-field>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-sm-6"></div>

                                        <div class="col-md-6 col-sm-6">
                                            <label class="input-label"
                                                >Birth Date</label
                                            >
                                            <dobFlight
                                                class="mt-2"
                                                v-model="objTraveler.date1"
                                                @fgchange="dobFlightUpdate"
                                                :index="ind"
                                                :travelIndex="trvInd"
                                                :fgbod="objTraveler.date1"
                                                :fgDepartDate="
                                                    car.item.pdate.split('T')
                                                "
                                                :role="'adult'"
                                                :rules="birthDateRules"
                                            />
                                        </div>

                                        <div class="col-md-6 col-sm-6">
                                            <label
                                                class="input-label mpl"
                                                style="color: rgba(0, 0, 0, 0.6) !important;"
                                            >
                                                Mobile Phone Number
                                            </label>
                                            <div
                                                class="add-travel-input mobile-feild-styling"
                                            >
                                            
                                            <vue-tel-input-vuetify
                                                    v-bind="$attrs"
                                                    v-model="
                                                        objTraveler.regmobile
                                                    "
                                                    background-color="white"
                                                    v-on:country-changed="
                                                        countryChanged
                                                    "
                                                    :rules="[
                                                        v =>
                                                            !!v ||
                                                            'Cell Phone is required',
                                                        checkValidNumber
                                                    ]"
                                                    :value="
                                                        objTraveler.premobileval
                                                    "
                                                    :preferredCountries="
                                                        preferredCountries
                                                    "
                                                    :defaultCountry="
                                                        defaultCountry
                                                    "
                                                    :disabledFetchingCountry="
                                                        true
                                                    "
                                                    :onlyCountries="whiteList"
                                                    @input="onUpdatePhone"
                                                    @focus="phoneFocusedForm(ind, trvInd)"
                                                    name="traveller[][phone]"
                                                />


                                                <!-- <phone-num-select
                                                    v-model="
                                                        objTraveler.regmobile
                                                    "
                                                    name="traveller[][phone]"
                                                    :value="
                                                        objTraveler.premobileval
                                                    "
                                                    :phoneDetails="false"
                                                /> -->
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-sm-6">
                                            <div class="add-travel-input">
                                                <country-select
                                                    v-model="
                                                        objTraveler.country
                                                    "
                                                />
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-sm-6">
                                            <div
                                                class="add-travel-input"
                                                style="margin-top: 32px;"
                                            >
                                                <region-select
                                                    v-model="objTraveler.state"
                                                    :country="
                                                        objTraveler.country
                                                    "
                                                    :updateValue="
                                                        objTraveler.state
                                                    "
                                                />
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-sm-6">
                                            <div class="add-travel-input">
                                                <label
                                                    class="input-label"
                                                ></label>
                                                <v-text-field
                                                    label="Street Address"
                                                    placeholder="Enter Your Street Address"
                                                    v-model="
                                                        objTraveler.address
                                                    "
                                                    :rules="addressRules"
                                                ></v-text-field>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-sm-6">
                                            <div
                                                class="add-travel-input"
                                                style=""
                                            >
                                                <v-text-field
                                                    :hide-details="false"
                                                    label="City"
                                                    placeholder="City"
                                                    v-model="objTraveler.city"
                                                    :rules="[
                                                        v =>
                                                            !!v ||
                                                            'City field is required.'
                                                    ]"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-sm-6">
                                            <div
                                                class="add-travel-input"
                                                style=""
                                            >
                                                <v-text-field
                                                    :hide-details="false"
                                                    label="Zip Code"
                                                    placeholder="Zip Code"
                                                    v-model="objTraveler.zip"
                                                    :rules="[
                                                        v =>
                                                            !!v ||
                                                            'Zip Code is required.'
                                                    ]"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <!--
                                        <div
                                            class="travel-box-button"
                                            v-if="checkOutType == 'trip'"
                                        >
                                            <div class="setmargin">
                                                <v-checkbox
                                                    label="Save Traveler? Selecting this will save this user"
                                                    v-model="
                                                        objTraveler.ckBoxSaveTraveler
                                                    "
                                                    v-on:change="
                                                        saveTravelerByCk(
                                                            $event,
                                                            'villa',
                                                            car,
                                                            ind,
                                                            trvInd,
                                                            objTraveler,
                                                            objTraveler.ckBoxSaveTraveler
                                                        )
                                                    "
                                                    input-value="true"
                                                    :readonly="
                                                        objTraveler.ckBoxSaveTravelerReadOnly
                                                    "
                                                    :error-messages="
                                                        objTraveler.ckBoxSaveTravelerError
                                                    "
                                                    :class="'form99ck' + ind"
                                                    :rules="[
                                                        v =>
                                                            !!v ||
                                                            'Please complete the required fields.'
                                                    ]"
                                                ></v-checkbox>
                                            </div>
                                        </div>
                                        -->
                                        <div 
                                            class="travel-box-button"                                       
                                        >
                                            <div
                                                class="setmargin"
                                                style="margin-bottom: 10px!important; margin-left: 0px!important; padding-left: 0px!important;"
                                            >
                                                <v-checkbox
                                                    label="Use this traveler's information as the Credit Card payment information. You can only select one traveler's information."
                                                    v-model="
                                                        objTraveler.ckBoxCardInfo
                                                    "
                                                    @change="
                                                        v =>
                                                            makeCardInfo(
                                                                'car',
                                                                car.item.Id,
                                                                trvInd,
                                                                objTraveler.ckBoxCardInfo
                                                            )
                                                    "
                                                    input-value="true"
                                                    :checked="
                                                        doCheckByDefault(
                                                            ind,
                                                            objTraveler.ckBoxCardInfo
                                                        )
                                                    "
                                                ></v-checkbox>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <!--ends if objTraveler.pTravelersVal==1 -->
                            </v-row>
                        </v-form>
                    </div>
                    <!--form ends-->

                    <!--checkbox for car details-->
                    <v-row class="m-0">
                        <div class="col-md-12 col-sm-12">
                            <div class="form-checkBox">
                                
                                <div
                                    class="setmargin"
                                    style="margin-top: 20px;"
                                    v-if="checkOutType != 'trip'"
                                >
                                    <v-form :ref="'refAgreeTerms' + ind">
                                        <v-checkbox
                                            v-model="car.agreeTerms"
                                            :rules="[
                                                v =>
                                                    !!v ||
                                                    'Please check this box to agree..!'
                                            ]"
                                            label=""
                                        >
                                            <template slot="label">
                                                I have read and accept the
                                                &nbsp;
                                                <a
                                                    href="https://wp.inteletravel.com/terms/"
                                                    target="_blank"
                                                    @click="doOpenTerms()"
                                                >
                                                    Terms & Conditions
                                                </a>

                                                ,&nbsp;

                                                <a
                                                    href="javascript: void(0);"
                                                    @click="
                                                        doCancelPolicyPopUp(
                                                            car.item,
                                                            'villa'
                                                        );
                                                        car.agreeTerms = true;
                                                    "
                                                >
                                                    Cancellation Policy
                                                </a>

                                                ,&nbsp;

                                                <a
                                                    href="javascript: void(0);"
                                                    @click="
                                                        doCancelPolicyPopUp(
                                                            car.item,
                                                            'villa'
                                                        );
                                                        car.agreeTerms = true;
                                                    "
                                                >
                                                    Taxes and Fees
                                                </a>
                                            </template>
                                        </v-checkbox>
                                    </v-form>
                                </div>

                                <div class="setmargin" style="margin-top: 20px;" v-if="checkOutType== 'trip'">

                                    <v-form :ref="'refAgreeTerms' + ind">
                                          <v-checkbox
                                              :error-messages="car.agreeTermsError" 
                                              v-model="car.agreeTerms"
                                              :rules="[
                                                  v =>
                                                      !!v ||
                                                      'Please check this box to agree..!'
                                              ]"
                                              label=""
                                              ref="refAgreeTerms"
                                              v-on:change="saveTravelerByCkInGroup($event, 'villa', car, ind, car.agreeTerms)"
                                          >
                                              <template slot="label">
                                               <span class="accept-read">
                                                   I have read and accept the </span>
                                                  &nbsp;
                                                  <a
                                                      href="https://wp.inteletravel.com/terms/"
                                                      target="_blank"
                                                      @click="doOpenTerms()"
                                                  >
                                                      Terms & Conditions
                                                  </a>

                                                  ,&nbsp;

                                                  <a
                                                      href="javascript: void(0);"
                                                      @click="
                                                          doCancelPolicyPopUp(
                                                            car.item,
                                                            'villa'
                                                          );
                                                          // eslint-disable-next-line vue/no-mutating-props
                                                          car.agreeTerms = true;
                                                      "
                                                  >
                                                      Cancellation Policy
                                                  </a>

                                                  ,&nbsp;

                                                  <a
                                                      href="javascript: void(0);"
                                                      @click="
                                                          doCancelPolicyPopUp(
                                                            car.item,
                                                            'villa'
                                                          );
                                                          // eslint-disable-next-line vue/no-mutating-props
                                                          car.agreeTerms = true;
                                                      "
                                                  >
                                                      Taxes and Fees
                                                  </a>
                                              </template>
                                          </v-checkbox>
                                      </v-form>

                                </div>

                                <div class="setmargin pl-2 travel-box-button pt-5" style="" v-if="car.saveUserError">
                                    <div class="form-checkBox">
                                        <div class="setmargin blackwido">
                                            <v-alert
                                                dense
                                                outlined
                                                prominent
                                                type="error"
                                            >
                                              <span v-html="car.saveUserErrorDetail"></span>
                                            </v-alert>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </v-row>
                    <!--checkbox for car details-->
                </div>
            </div>
        </v-expansion-panel-content>
     <invitation-pop-form 
      :DisplayPopUp="openDetailPopUp" 
      @hideDetailsBox="openDetailPopUp = false">
    </invitation-pop-form> 
    </span>
</template>
<script>
import dobFlight from '@/components/common/widgets/dobFlight.vue';
import PhoneNumSelect from '@/components/common/widgets/PhoneNumSelect.vue';
import CountrySelect from '@/components/common/widgets/CountrySelect.vue';
import RegionSelect from '@/components/common/widgets/RegionSelect.vue';
import { evBus } from "@/services/bus.js";
import { mapState } from 'vuex';
import InvitationPopForm from '../InvitationPopForm.vue';
export default {
    name: 'carTraveller',
    components: {
        PhoneNumSelect,
        CountrySelect,
        RegionSelect,
        dobFlight,
        InvitationPopForm
    },
    props: [
        'car',
        'ind',
        'doOpenTerms',
        'makeCardInfo',
        'saveTravelerByCk',
        'makePrimaryTraveler',
        'CheckvalidEmail',
        'populateTravelerFormBySrch',
        'filterTravelers',
        'dobUpdate',
        'checkOutType',
        'tripTravellers',
        'populateTravelerFormByTraveler',
        'dobFlightUpdate',
        'saveTravelerByCkInGroup'
    ],
    data() {
        return {
            birthDateRules: [
                v => !!v || 'Birth date is required',
                v => v || (v && v.length >= 10) || 'yes'
            ],
            addressRules: [
                v => !!v || 'Address is required',
                v =>
                    (v && v.length >= 10) ||
                    'Address must have atleast 10 characters',
                v => (v && v.length <= 30) || 'Address maximum 30 characters allowed'
            ],
            openDetailPopUp:false,
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
                e164: ''
            },
            mainFormIndex: '',
            subFormIndex: ''
        };
    },

    methods:{

        phoneFocusedForm(mainFormIndex, subFormIndex) {

          this.mainFormIndex = mainFormIndex;
          this.subFormIndex = subFormIndex;
        },

        showInvitation(val){
          
            if(val==3){
              this.openDetailPopUp = true;
            }
        },

        checkedDob(date) {
            return Number(moment().diff(moment(date), 'years', false));
        },

        doCheckByDefault(index, value) {

            if (index == 0) {
                return value != value;
            } else {
                return value != value;
            }
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

              this.phone.parentFormIndex = this.mainFormIndex;  
              this.phone.subFormIndex = this.subFormIndex;

              evBus.$emit('phoneDetails', this.phone);
        },
        checkValidNumber() {
            if (!this.validNumber) return 'Please enter valid mobile number';
            return true;
        },
        countryChanged(country) {
            this.country = country.name;
        }
    },
      created: function() {

        evBus.$on('uncheckBoxOfAgree', (data) => {

          this.car.agreeTerms = false;
        });
      
      },
    mounted(){

        if (this.domain == 'us') {
            this.defaultCountry = 'US';
        } else if (this.domain == 'uk') {
            this.defaultCountry = 'GB';
        } else if (this.domain == 'mx') {
            this.defaultCountry == 'MX';
        } else {
            // eslint-disable-next-line no-undef
            this.defaultCountry = domain.toUpperCase();
        }

        if (typeof this.phoneDetails !== 'undefined') {
            // needed to not show details of input-number as per requirements

            this.showMobileDetails = this.phoneDetails;
        }

        if (typeof this.value !== 'undefined') {
            // needed to not show details of input-number as per requirements

            this.defaultCountry = null;
            this.premobileval = this.value;
        }

        if (typeof this.formMatrix !== 'undefined') {
            // needed to not show details of input-number as per requirements

            this.emitDetailEvents = true;
        }

    },
    computed:{
        ...mapState({
            domain: state => state.envStore.domain
        }),
        // eslint-disable-next-line vue/return-in-computed-property
        whiteList() {
            
            return [];

            /*
             white list feature has disabled as per instructions from lead, please don`t enable this whitelist coz we need all countries. The code is still there and not removed thinking if we ever need whitelist we can reuse it.
            */

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
                    'VI'
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
                    'WF'
                ];
        },
        mobile: {
            get: function() {
                return this.value;
            },
            set: function(newVal) {
                this.$emit('input', newVal);
            }
        }
    }
};
</script>
