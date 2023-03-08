<template>
    <span style="display: block !important" class="pt-10">
        <section class="auth-heading">
            <div class="text-center">
                <h2>Welcome To InteleTravel</h2>
            </div>
        </section>

        <section class="mt-0 auth-login-screen register-screen">
            <v-container>
                <v-row class="justify-center">
                    <div class="col-lg-10 col-11 px-4 customer-login py-10">
                        <v-form ref="form" class="" lazy-validation>
                            <v-row class="text-center" align="center">
                                <div class="col-lg-12">
                                    <div class="inner-auth-heading">
                                        <h2>
                                            Registered Free User Information
                                        </h2>
                                    </div>
                                </div>
                            </v-row>

                            <v-row class="justify-center">
                                <div class="col-lg-10 col-sm-12">
                                    <div class="register-buttn">
                                        <p class="alredy-register">
                                            Already Registered?
                                        </p>
                                        <v-btn
                                            class="error"
                                            @click="moveToLogin()"
                                        >
                                            Login To Dashboard
                                        </v-btn>
                                    </div>

                                    <v-row
                                        align="center"
                                        class="mt-4 text-center"
                                    >
                                        <div class="col-lg-12">
                                            <h3 style="color: black">
                                                <span style="color: #262c5c"
                                                    >FREE</span
                                                >
                                                Registration is required to use
                                                our site.
                                            </h3>
                                            <div>
                                                <p class="required-fields">
                                                    Please complete all required
                                                    fields.
                                                </p>
                                            </div>
                                        </div>
                                    </v-row>

                                    <v-row
                                        class="mt-8 justify-center px-sm-10 register"
                                    >
                                        <div class="col-md-12 col-sm-12">
                                            <v-row
                                                align="center"
                                                class="ml-0 mr-0 mb-5"
                                            >
                                                <label
                                                    >Salutation<span
                                                        class="reqFlag"
                                                        >*</span
                                                    ></label
                                                >

                                                <v-radio-group
                                                    row
                                                    class="ml-8"
                                                    v-model="saluation"
                                                    required
                                                >
                                                    <v-radio
                                                        class="px-4"
                                                        label="Ms."
                                                        value="Ms."
                                                        name="rdSalutation"
                                                        color="primary"
                                                        :checked="checked"
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
                                        <div class="col-md-6 col-sm-6">
                                            <div class="add-travel-input pb-0">
                                                <label>
                                                    First Name<span
                                                        class="reqFlag"
                                                        >*</span
                                                    ></label
                                                >
                                                <v-text-field
                                                    :hide-details="false"
                                                    background-color="white"
                                                    height="40"
                                                    placeholder="First Name"
                                                    ref="trvFName"
                                                    v-model="firstName"
                                                    :rules="fNameRules"
                                                ></v-text-field>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-6">
                                            <div class="add-travel-input pb-0">
                                                <label
                                                    >Last Name<span
                                                        class="reqFlag"
                                                        >*</span
                                                    ></label
                                                >
                                                <v-text-field
                                                    :hide-details="false"
                                                    background-color="white"
                                                    height="40"
                                                    placeholder="Last Name"
                                                    v-model="lastName"
                                                    :rules="lNameRules"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-12 col-sm-12">
                                            <div class="add-travel-input">
                                                <label
                                                    >Email<span class="reqFlag"
                                                        >*</span
                                                    ></label
                                                >
                                                <v-text-field
                                                    :hide-details="false"
                                                    background-color="white"
                                                    height="40"
                                                    placeholder="Email"
                                                    v-model="regemail"
                                                    :rules="emailRules"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-sm-6">
                                            <div class="add-travel-input">
                                                <label>
                                                    Password<span
                                                        class="reqFlag"
                                                        >*</span
                                                    ></label
                                                >
                                                <v-text-field
                                                    :hide-details="false"
                                                    background-color="white"
                                                    height="40"
                                                    placeholder="Password"
                                                    v-model="upassword"
                                                    :rules="passwordRules"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-sm-6">
                                            <div class="add-travel-input">
                                                <label
                                                    >Confirm Password<span
                                                        class="reqFlag"
                                                        >*</span
                                                    ></label
                                                >
                                                <v-text-field
                                                    :hide-details="false"
                                                    background-color="white"
                                                    height="40"
                                                    placeholder="Confirm Password"
                                                    v-model="repassword"
                                                    :rules="[
                                                        v =>
                                                            !!v ||
                                                            'Confirm password is required',
                                                        upassword ===
                                                            repassword ||
                                                            'Confirm Password must match'
                                                    ]"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-12 col-sm-12">
                                            <div class="add-travel-input">
                                                <label>Address 1</label>
                                                <v-text-field
                                                    :hide-details="false"
                                                    background-color="white"
                                                    height="40"
                                                    placeholder="Address 1"
                                                    v-model="addressOne"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-12 col-sm-12">
                                            <div class="add-travel-input">
                                                <label>Address 2</label>
                                                <v-text-field
                                                    :hide-details="false"
                                                    placeholder="Address 2"
                                                    background-color="white"
                                                    height="40"
                                                    v-model="addressTwo"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-sm-6">
                                            <div class="add-travel-input">
                                                <label> Country </label>
                                                <country-select
                                                    v-model="ucountry"
                                                />
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-sm-6">
                                            <div class="add-travel-input">
                                                <label> State </label>
                                                <region-select
                                                    v-model="ustate"
                                                    :country="ucountry"
                                                />
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-sm-6">
                                            <div class="add-travel-input">
                                                <label> City </label>
                                                <v-text-field
                                                    :hide-details="true"
                                                    background-color="white"
                                                    height="40"
                                                    placeholder="City"
                                                    v-model="ucity"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-sm-6">
                                            <div class="add-travel-input">
                                                <label> Zip Code </label>
                                                <v-text-field
                                                    :hide-details="true"
                                                    background-color="white"
                                                    height="40"
                                                    placeholder="Zip code"
                                                    v-model="uzip"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-sm-6">
                                            <div class="add-travel-input">
                                                <label>
                                                    Home Phone<span
                                                        class="reqFlag"
                                                        >*</span
                                                    >
                                                </label>
                                                <v-text-field
                                                    :hide-details="true"
                                                    background-color="white"
                                                    height="40"
                                                    placeholder="home phone"
                                                    v-model="homephone"
                                                    :rules="homePhoneRules"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-sm-6">
                                            <div class="add-travel-input">
                                                <label>
                                                    Work Phone<span
                                                        class="reqFlag"
                                                        >*</span
                                                    >
                                                </label>
                                                <v-text-field
                                                    :hide-details="true"
                                                    background-color="white"
                                                    height="40"
                                                    placeholder="work phone"
                                                    v-model="workphone"
                                                    :rules="workPhoneRules"
                                                ></v-text-field>
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-sm-6">
                                            <div
                                                class="add-travel-input pb-0 cellNumber"
                                            >
                                                <label>
                                                    Cell Phone<span
                                                        class="reqFlag"
                                                        >*</span
                                                    ></label
                                                >
                                                <phone-num-select
                                                    v-model="regmobile"
                                                    @onPhoneData="
                                                        regmobileMeta = $event
                                                    "
                                                />
                                            </div>
                                        </div>

                                        <div
                                            class="col-md-6 col-sm-6"
                                            style="margin-top: 5px"
                                        >
                                            <div
                                                class="add-travel-input pb-0 dateofbirth"
                                            >
                                                <label>
                                                    BirthDay<span
                                                        class="reqFlag"
                                                        >*</span
                                                    >
                                                </label>

                                                <!-- Date Picker Work -->
                                                <v-menu
                                                    content-class="date-picker-backoffice"
                                                    v-model="menu2"
                                                    :close-on-content-click="
                                                        false
                                                    "
                                                    :nudge-right="50"
                                                    transition="scale-transition"
                                                    min-width="290px"
                                                >
                                                    <template>
                                                        <div
                                                            class="add-travel-input mt-2"
                                                        >
                                                            <!-- <v-text-field
                                v-model="birthdayDate"
                                readonly
                                background-color="white"
                                height="40"
                                v-bind="attrs"
                                v-on="on"
                                :placeholder="dateFormatPlaceHolder"
                              ></v-text-field> -->
                                                            <date-dropdown
                                                                min="1921"
                                                                v-model="
                                                                    birthdayDate
                                                                "
                                                            />
                                                        </div>

                                                        <!-- <small class="far fa-calendar-alt"></small> -->
                                                    </template>
                                                    <v-date-picker
                                                        v-model="date2"
                                                        :max="maxPickStartDate"
                                                        @input="menu2 = false"
                                                        no-title
                                                    ></v-date-picker>
                                                </v-menu>
                                                <!-- Date Picker Work -->
                                            </div>
                                            <!--
                                        <v-text-field
                                            class="mt-1"
                                            :hide-details="true"
                                            dense
                                            solo
                                            flat
                                            placeholder="month"  
                                        ></v-text-field>
                                    </div>
                                    <div class="col-3">
                                        <v-text-field
                                            class="mt-1"
                                            :hide-details="true"
                                            dense
                                            solo
                                            flat
                                            placeholder="day"
                                        ></v-text-field>
                                    </div>
                                    <div class="col-3">
                                        <v-text-field
                                            class="mt-1"
                                            :hide-details="true"
                                            dense
                                            solo
                                            flat
                                            placeholder="year"
                                        ></v-text-field>
                                    </div>
                                    -->
                                        </div>
                                    </v-row>

                                    <v-row
                                        class="justify-center px-sm-10"
                                        align="center"
                                    >
                                        <div
                                            class="d-flex flex-column justify-center align-center pb-10"
                                        >
                                            <div
                                                class="d-flex align-center px-3"
                                            >
                                                <v-checkbox
                                                    v-model="agree"
                                                    :checked="checked"
                                                ></v-checkbox>
                                                <p class="ma-0">
                                                    Yes, I want to receive
                                                    InteleTravel Hot Deals and
                                                    other Special offers by
                                                    email.
                                                </p>
                                            </div>
                                            <div class="mt-6">
                                                <v-btn
                                                    depressed
                                                    class="error"
                                                    @click="doRegister()"
                                                >
                                                    Register Now!
                                                </v-btn>
                                            </div>
                                        </div>
                                    </v-row>
                                </div>
                            </v-row>
                        </v-form>
                    </div>
                </v-row>
            </v-container>
        </section>
    </span>
</template>
<script>
import { evBus } from '@/services/bus.js';
import customerAPI from '@/services/api/Customer';
import CountrySelect from '../../common/widgets/CountrySelect.vue';
import RegionSelect from '../../common/widgets/RegionSelect.vue';
import PhoneNumSelect from '../../common/widgets/PhoneNumSelect.vue';

import DateDropdown from 'vue-date-dropdown';
var moment = require('moment');

export default {
    name: 'REGISTER',
    components: {
        CountrySelect,
        RegionSelect,
        PhoneNumSelect,
        DateDropdown
    },
    data() {
        return {
            regmobile: '',
            regmobileMeta: {},
            premobileval: null,
            validNumber: false,
            birthdayDate: null,

            workphone: null,
            homephone: null,

            checked: true,
            saluation: 'Ms.',

            upassword: null,
            repassword: null,

            firstName: null,
            lastName: null,
            regemail: null,
            addressOne: null,
            addressTwo: null,

            date2: null,
            menu2: false,
            maxPickStartDate: this.formattedDate(new Date(), 'YYYY-MM-DD'),
            dateFormatPlaceHolder: this.$store.state.envStore.countryDF,

            ucountry: null,
            ustate: null,
            ucity: null,
            uzip: null,

            agree: true,

            // RULES
            passwordRules: [
                v => !!v || 'Password is required',
                v =>
                    (v && v.length >= 8) ||
                    'Password must be equal to greater than 8 characters'
            ],
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
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+/.test(v) || 'Email must be valid'
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
                    (v && v.length >= 5) ||
                    'Address must have atleast 20 characters'
            ],
            homePhoneRules: [
                v => !!v || 'Home phone is required',
                v =>
                    (v && v.length >= 5) ||
                    'Home phone must have atleast 5 characters'
            ],
            workPhoneRules: [
                v => !!v || 'Work phone is required',
                v =>
                    (v && v.length >= 5) ||
                    'Work phone must have atleast 5 characters'
            ]
        };
    },
    mounted() {

        let domain = this.$store.state.envStore.domain;
        if (domain == 'us') {
            this.ucountry = 'United States';
        } else if (domain == 'uk') {
            this.ucountry = 'United Kingdom';
        } else if (domain == 'mx') {
            this.ucountry == 'Mexico';
        } else this.ucountry = domain.toUpperCase();
    },
    methods: {
        moveToLogin() {
            this.$router.push('/sign-in').catch(() => {});
        },
        doRegister() {
            if (!this.$refs.form.validate()) return false;

            let formData = new FormData();

            formData.append('salutation', this.saluation);
            formData.append('lastName', this.lastName);
            formData.append('firstName', this.firstName);
            formData.append('email', this.regemail);
            formData.append('password', this.upassword);
            formData.append('password_confirmation', this.repassword);
            formData.append('address1', this.addressOne);
            formData.append('address2', this.addressTwo);
            formData.append('city', this.ucity);
            formData.append('state', this.ustate);
            formData.append('country', this.ucountry);
            formData.append('zip', this.uzip);
            formData.append('homePhone', this.homephone);
            formData.append('workPhone', this.workphone);
            formData.append('cellPhone', this.regmobile);
            formData.append(
                'birthday',
                this.formattedDate(this.birthdayDate, 'YYYY-MM-DD')
            );
            formData.append('specials', 1);
            formData.append('domain', this.$store.state.envStore.domain);
            formData.append('mobileMeta', JSON.stringify(this.regmobileMeta));

            if (this.$store.getters.inviteToken != false)
                formData.append(
                    'invitationToken',
                    this.$store.getters.inviteToken
                );

            let reqHeaders = {
                headers: { 'Content-Type': 'application/json' }
            };

            customerAPI
                .signup(formData, reqHeaders)
                .then(() => {
                    this.$awn.success(
                        'Your account registered successfully..!',
                        {
                            labels: { success: 'Registration' }
                        }
                    );

                    this.moveToLogin();
                })
                .catch(err => {
                    // console.error(err);
                });
        },

        formattedDate: function(reqDate, reqFormat) {
            if (!reqDate) return null;

            reqDate = moment(reqDate).format(reqFormat);

            return reqDate;
        }
    },
    computed: {}
};
</script>
<style>
.v-text-field {
    padding-top: 0px;
}
.underline {
    border-bottom: 1px solid grey;
    margin-bottom: 15px;
}
.underline h2 {
    color: black;
    font-size: 52px;
}
.required-fields {
    color: red;
    font-size: 14px;
    padding: 4px;
    text-decoration: underline;
}
.reqFlag {
    color: #ff0000;
    padding-left: 5px;
}

/* fixes */

.v-select__slot .v-input__append-inner {
    margin-top: 5px;
}

.v-input--radio-group.v-input--radio-group--row .v-radio {
    margin: 5px;
}
.customer-login {
    opacity: 0.9;
}
.date-dropdown-select {
    display: inline-block;
    border-bottom: 0px solid #2c2c2d !important;
    border-radius: 0px !important;
    padding: 8px;
    height: 43px;
    line-height: 30px;
    border-top: 0px !important;
    margin-right: 10px;
    border-left: 0px !important;
    background: #fff;
    border-right: 0px !important;
}
.v-input--has-state.error--text .v-label {
    -webkit-animation: v-shake 0.6s cubic-bezier(0.25, 0.8, 0.5, 1);
    animation: v-shake 0.6s cubic-bezier(0.25, 0.8, 0.5, 1);
    top: 11px !important;
}
.v-application--is-ltr .v-text-field .v-label {
    -webkit-transform-origin: top left;
    transform-origin: top left;
    top: 11px !important;
}
.v-application--is-ltr .v-text-field .v-input__append-inner {
    margin-left: auto;
    padding-left: 4px;
    /* top: 11px; */
    padding-top: 4px;
}
</style>
