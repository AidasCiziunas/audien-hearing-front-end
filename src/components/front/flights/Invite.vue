<template>
    <span style="display: block !important;" class="pt-10">
        <section class="auth-heading">
            <div class="text-center">
                <h2>Passenger Invitation Page</h2>
            </div>
        </section>

        <section class="add-travel-section">
            <v-container>
                <v-row class="reversing-here">
                    <div class="col-lg-9 col-md-12">
                        <v-row class="mt-0 mb-0">
                            <div class="col-md-12">
                                <div class="add-travel-box-top">
                                    <v-form ref="form" class="" lazy-validation>
                                        <div class="travel-box-iner">
                                            <h3>Invite To Edit (Individual)</h3>
                                            <h6>
                                                You have been invited to edit
                                                your own details. See below
                                            </h6>
                                            <div
                                                class="add-travel-form"
                                                style="margin-top: 36px;"
                                            >
                                                <v-row class="m-0">
                                                    <div
                                                        class="col-md-12 col-sm-12"
                                                    >
                                                        <v-row
                                                            align="center"
                                                            class="ml-0 mr-0 mb-5"
                                                        >
                                                            <label
                                                                >Salutation /
                                                                Title
                                                            </label>
                                                            <v-radio-group
                                                                row
                                                                class="ml-8"
                                                                v-model="
                                                                    saluation
                                                                "
                                                                required
                                                            >
                                                                <v-radio
                                                                    class="px-4"
                                                                    label="Ms."
                                                                    value="Ms."
                                                                    name="rdSalutation"
                                                                    color="primary"
                                                                    :checked="
                                                                        checked
                                                                    "
                                                                ></v-radio>
                                                                <v-radio
                                                                    class="px-4"
                                                                    label="Mrs."
                                                                    value="Mrs."
                                                                    name="rdSalutation"
                                                                    color="primary"
                                                                ></v-radio>
                                                                <v-radio
                                                                    class="px-4"
                                                                    label="Mr."
                                                                    value="Mr."
                                                                    name="rdSalutation"
                                                                    color="primary"
                                                                ></v-radio>
                                                            </v-radio-group>
                                                        </v-row>
                                                    </div>

                                                    <div
                                                        class="col-md-6 col-sm-6"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <v-text-field
                                                                label="First Name"
                                                                ref="trvFName"
                                                                placeholder="Enter Your First Name"
                                                                v-model="
                                                                    firstName
                                                                "
                                                                :rules="
                                                                    fNameRules
                                                                "
                                                                v-bind:readonly="
                                                                    propReadOnly
                                                                "
                                                            ></v-text-field>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-md-6 col-sm-6"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <v-text-field
                                                                label="Last Name"
                                                                placeholder="Enter Your First Name"
                                                                v-model="
                                                                    lastName
                                                                "
                                                                :rules="
                                                                    lNameRules
                                                                "
                                                                v-bind:readonly="
                                                                    propReadOnly
                                                                "
                                                            ></v-text-field>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="col-md-6 col-sm-6"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <v-text-field
                                                                label="Email"
                                                                placeholder="Enter Your Email"
                                                                v-model="email"
                                                                :rules="
                                                                    emailRules
                                                                "
                                                                v-bind:readonly="
                                                                    propEmailReadOnly
                                                                "
                                                            ></v-text-field>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="col-md-6 col-sm-6"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <v-text-field
                                                                label="Address"
                                                                placeholder="Enter Your Address"
                                                                v-model="
                                                                    address
                                                                "
                                                                :rules="
                                                                    addressRules
                                                                "
                                                                v-bind:readonly="
                                                                    propReadOnly
                                                                "
                                                            ></v-text-field>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="col-md-6 col-sm-6"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <v-text-field
                                                                label="Passport Number"
                                                                placeholder="Enter Your Passport Number"
                                                                v-model="
                                                                    passport
                                                                "
                                                                v-bind:readonly="
                                                                    propReadOnly
                                                                "
                                                            ></v-text-field>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="col-md-6 col-sm-6"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <div
                                                                class="add-travel-input"
                                                            >
                                                                <!-- Date Picker Work -->
                                                                <v-menu
                                                                    v-model="
                                                                        menu1
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
                                                                        <v-text-field
                                                                            v-model="
                                                                                compPickDateFormatted
                                                                            "
                                                                            readonly
                                                                            v-bind="
                                                                                attrs
                                                                            "
                                                                            v-on="
                                                                                on
                                                                            "
                                                                            :rules="
                                                                                birthDateRules
                                                                            "
                                                                            :placeholder="
                                                                                dateFormatPlaceHolder
                                                                            "
                                                                            prepend-icon="mdi-calendar"
                                                                        ></v-text-field>
                                                                        <!--
                                                                        <small class="far fa-calendar-alt"></small>
                                                                        -->
                                                                    </template>
                                                                    <v-date-picker
                                                                        v-model="
                                                                            date1
                                                                        "
                                                                        :max="
                                                                            maxPickStartDate
                                                                        "
                                                                        @input="
                                                                            menu1 = false
                                                                        "
                                                                        no-title
                                                                    ></v-date-picker>
                                                                </v-menu>
                                                                <!-- Date Picker Work -->
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="col-md-6 col-sm-6"
                                                    >
                                                        <div
                                                            class="add-travel-input cellNumber"
                                                        >
                                                            <phone-num-select
                                                                v-model="mobile"
                                                                value="premobileval"
                                                                label="Mobile Number"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="col-md-6 col-sm-6"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <country-select
                                                                v-model="
                                                                    country
                                                                "
                                                            />
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="col-md-6 col-sm-6"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <region-select
                                                                v-model="state"
                                                                :country="
                                                                    country
                                                                "
                                                                :rules="[
                                                                    v =>
                                                                        !!v ||
                                                                        'State field is required.'
                                                                ]"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="col-md-6 col-sm-6"
                                                    >
                                                        <div
                                                            class="add-travel-input"
                                                        >
                                                            <v-text-field
                                                                :hide-details="
                                                                    false
                                                                "
                                                                background-color="white"
                                                                placeholder="Country Code e.g: US"
                                                                v-model="
                                                                    countryCode
                                                                "
                                                                label="Country Code"
                                                                height="40"
                                                                :rules="[
                                                                    v =>
                                                                        !!v ||
                                                                        'Country code is required.'
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
                                                            <v-text-field
                                                                :hide-details="
                                                                    false
                                                                "
                                                                background-color="white"
                                                                placeholder="City"
                                                                v-model="city"
                                                                label="City"
                                                                :rules="[
                                                                    v =>
                                                                        !!v ||
                                                                        'City is required.'
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
                                                            <v-text-field
                                                                :hide-details="
                                                                    false
                                                                "
                                                                background-color="white"
                                                                placeholder="Zip code"
                                                                v-model="zip"
                                                                label="Zip Code"
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
                                                            <v-select
                                                                :items="
                                                                    customerTypes
                                                                "
                                                                placeholder="Customer Type"
                                                                v-model="
                                                                    cusType
                                                                "
                                                            >
                                                            </v-select>
                                                        </div>
                                                    </div>
                                                </v-row>
                                            </div>
                                        </div>
                                        <div class="travel-box-button">
                                            <div class="form-checkBox">
                                                <div class="setmargin">
                                                    <v-checkbox
                                                        v-model="ckPrimaryTrv"
                                                        label="Primary Traveler"
                                                    ></v-checkbox>
                                                </div>

                                                <v-btn
                                                    class="primary"
                                                    @click="submitForm"
                                                >
                                                    SAVE
                                                </v-btn>

                                                <v-btn
                                                    class="ma-2"
                                                    color="secondary"
                                                    @click="resetAddForm"
                                                    >RESET</v-btn
                                                >
                                            </div>
                                        </div>
                                    </v-form>
                                </div>
                            </div>
                        </v-row>
                    </div>

                    <div class="col-lg-3 col-md-3">
                        <div
                            class="your-agent-profile listing-right-sidebar mt-0"
                        >
                            <div class="listing-sidebar-head">
                                <h4>Your Agent</h4>
                            </div>
                            <div class="listing-sidebar-body">
                                <div class="sidebar-content">
                                    <div class="agent-content">
                                        <div class="in-outer">
                                            <div class="in-left">
                                                <img
                                                    src="@/assets/images/avatar.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div class="in-right">
                                                <h6 v-if="agenInfos">
                                                    {{
                                                        agenInfos.first_name
                                                            | capitalize
                                                    }}
                                                    {{
                                                        agenInfos.last_name
                                                            | capitalize
                                                    }}
                                                </h6>
                                            </div>
                                        </div>
                                        <p v-if="this.$store.getters.hasTrip">
                                            Trip Name:
                                            <span>{{
                                                tripDetail.trip_name
                                                    | capitalize
                                            }}</span>
                                        </p>
                                        <p v-if="!this.$store.getters.hasTrip">
                                            Trip Name: <span>None</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-row>
            </v-container>
        </section>
    </span>
</template>
<script>
import travellerServices from '@/services/api/Travellers';
import { evBus } from '@/services/bus.js';
import PhoneNumSelect from '@/components/common/widgets/PhoneNumSelect.vue';
import CountrySelect from '@/components/common/widgets/CountrySelect.vue';
import RegionSelect from '@/components/common/widgets/RegionSelect.vue';
var moment = require('moment');
export default {
    name: 'Invite',
    components: {
        PhoneNumSelect,
        CountrySelect,
        RegionSelect
    },
    data() {
        return {
            invToken: null,
            mobile: '',
            premobileval: null,
            propReadOnly: false,
            propReadOnlyType: true,
            propEmailReadOnly: false,
            birthMonths: [],
            birthDays: [],
            birthYears: [],
            firstName: null,
            lastName: null,
            email: null,
            address: null,
            passport: null,
            ckPrimaryTrv: true,
            dateFormatPlaceHolder: this.$store.state.envStore.countryDF,
            date1: null,
            menu1: false,
            maxPickStartDate: this.formattedDate(new Date(), 'YYYY-MM-DD'),
            saluation: 'Ms.',
            checked: true,
            country: null,
            countryCode: null,
            state: null,
            city: null,
            zip: null,
            cusType: null,
            customerTypes: ['Infant', 'Child', 'Adult', 'Senior'],
            fNameRules: [
                v => !!v || 'First name is required',
                v =>
                    (v && v.length >= 3) ||
                    'First name must have atleast 3 characters'
            ],
            lNameRules: [
                v => !!v || 'Last name is required',
                v =>
                    (v && v.length >= 3) ||
                    'Last name must have atleast 3 characters'
            ],
            phoneRules: [
                v => !!v || 'Mobile Number is required',
                v =>
                    (v && v.length >= 7) ||
                    'Mobile Number must have atleast 7 digits'
            ],
            addressRules: [
                v => !!v || 'Address is required',
                v =>
                    (v && v.length >= 10) ||
                    'Address must have atleast 10 characters'
            ],
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+/.test(v) || 'Email must be valid'
            ],
            birthDateRules: [v => !!v || 'Birth date is required']
        };
    },
    created: function() {
        this.invToken = this.$route.query.token;
    },
    mounted: function() {
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

        // this.country = '';

    },
    computed: {
        compPickDateFormatted: {
            get: function() {
                return this.formattedDate(
                    this.date1,
                    this.dateFormatPlaceHolder
                );
            },
            set: function() {}
        }
    },
    methods: {
        formattedDate: function(reqDate, reqFormat) {
            if (!reqDate) return null;

            reqDate = moment(reqDate).format(reqFormat);

            return reqDate;
        },
        resetAddForm: function() {
            this.$refs.form.reset();

            this.propReadOnly = false;
            this.propEmailReadOnly = false;
            this.traveler_id = null;
            this.date1 = null;
            this.compPickDateFormatted;
            this.ckPrimaryTrv = true;
            this.saluation = 'Ms.';
            this.checked = true;
        },
        submitForm: function() {
            if (!this.$refs.form.validate()) return false;

            let _bDay = this.compPickDateFormatted;
            _bDay = moment(_bDay, this.$store.state.envStore.DFormat).unix();
            _bDay = moment(_bDay, 'X').format('YYYY-MM-DD');

            let ageDateChunks = _bDay.split('-');

            let phone = this.mobile.match(/\d/g);
            phone = phone.join('');

            let objTrvPayload = {
                title: this.saluation,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                mobile: phone,
                address: this.address,
                country: this.country,
                countryCode: this.countryCode,
                state: this.state,
                city: this.city,
                zip: this.zip,
                passport: this.passport,
                dob: _bDay,
                isPrimaryTraveler: this.ckPrimaryTrv,
                age: this.getAge(
                    ageDateChunks[0],
                    ageDateChunks[1],
                    ageDateChunks[2]
                ),
                customerType: this.cusType
                // type: parseInt(this.servType),
                // password: 'AdminIntele'
            };

            let travellerPayLoad = {
                travellers: [objTrvPayload]
            };

            let reqHeaders = {
                headers: { 'Content-Type': 'application/json' }
            };

            let reqPayLoad = {
                data: this.doStrings(travellerPayLoad),
                invitationToken: this.invToken
            };
            travellerServices
                .saveInvitedTraveller(reqPayLoad, reqHeaders)
                .then(rsp => {
                    if (
                        rsp.data.success == false &&
                        rsp.data.message == 'Token has expired'
                    ) {
                        this.doPopUp(
                            'error',
                            'Invitation Token Expired',
                            'Your infomation cannot be saved, as the invited token/link has expired!'
                        );
                        return true;
                    } else {
                        this.$awn.success(
                            'Your Information has added successfully..!',
                            {
                                labels: {
                                    success: 'Information Added'
                                }
                            }
                        );

                        this.resetAddForm();
                    }
                })
                .catch(error => {
                    this.$awn.alert(
                        'Please try later, server encounter error..!'
                    );
                })
                .finally(() => {});
        }
    }
};
</script>
<style scoped>
.add-travel-box-top {
    margin-top: 0px !important;
}
</style>
