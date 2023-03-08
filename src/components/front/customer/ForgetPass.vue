<template>
    <span style="display: block !important" class="pt-10">
        <section class="mt-12 auth-login-screen">
            <v-container>
                <v-row class="justify-center">
                    <div class="col-lg-10 col-11 customer-login py-10">
                        <v-form ref="form" class="mx-2" lazy-validation>
                            <v-row class="text-center" align="center">
                                <div class="col-lg-12">
                                    <div class="inner-auth-heading">
                                        <h2>Forget Password</h2>
                                    </div>
                                </div>
                            </v-row>
                            <v-row class="mt-8 justify-center register">
                                <div class="col-md-5 col-sm-9">
                                    <div class="add-travel-input">
                                        <label> Email </label>
                                        <v-text-field
                                            :hide-details="false"
                                            background-color="white"
                                            height="40"
                                            placeholder="Enter Your Email"
                                            type="email"
                                            name="email"
                                            v-model="form.email"
                                            :rules="emailRules"
                                        ></v-text-field>
                                    </div>
                                </div>
                                <div class="col-md-5 col-sm-9">
                                    <div class="add-travel-input">
                                        <label>PIN</label>
                                        <v-text-field
                                            :hide-details="false"
                                            height="40"
                                            background-color="white"
                                            placeholder="Enter Your Pin"
                                            type="number"
                                            name="pin"
                                            v-model="form.pin"
                                        ></v-text-field>
                                    </div>
                                </div>
                            </v-row>
                            <v-row class="mt-4 justify-center register">
                                <div class="col-md-5 col-sm-9">
                                    <div class="add-travel-input">
                                        <label> Password </label>
                                        <v-text-field
                                            :hide-details="false"
                                            background-color="white"
                                            height="40"
                                            placeholder="Enter Your Password"
                                            name="password"
                                            v-model="form.password"
                                            :rules="passwordRules"
                                        ></v-text-field>
                                    </div>
                                </div>
                                <div class="col-md-5 col-sm-9">
                                    <div class="add-travel-input">
                                        <label>Confirm Password</label>
                                        <v-text-field
                                            :hide-details="false"
                                            height="40"
                                            background-color="white"
                                            placeholder="Confirm Password"
                                            type="password"
                                            name="confirm-password"
                                            v-model="form.confirmPassword"
                                            :rules="[
                                                v =>
                                                    !!v ||
                                                    'Confirm password is required',
                                                form.password ===
                                                    form.confirmPassword ||
                                                    'Confirm Password must match'
                                            ]"
                                        ></v-text-field>
                                    </div>
                                </div>
                            </v-row>
                            <div
                                class="d-flex flex-column justify-center align-center"
                            >
                                <div class="mt-6">
                                    <v-btn class="error" @click="doLogin">
                                        Confirm
                                    </v-btn>
                                    <p
                                        class="required-fields text-center mt-2 mb-0"
                                        id="error"
                                        v-if="showError"
                                    >
                                        Invalid username or password
                                    </p>
                                </div>
                            </div>
                        </v-form>
                    </div>
                </v-row>
            </v-container>
        </section>
    </span>
</template>
<script>
import apiClient from '@/services/api/Auth';
export default {
    name: 'ForgetPass',
    data() {
        return {
            form: {
                email: 'karen@creativeoptions.us',
                pin: '',
                password: '',
                confirmPassword: ''
            },
            passwordRules: [
                v => !!v || 'Password is required',
                v =>
                    (v && v.length >= 3) ||
                    'Password must be equal to greater than 3 characters'
            ],
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+/.test(v) || 'Email must be valid'
            ]
        };
    },
    mounted: function() {
        this.$store.dispatch('falsifyErrorLogin');
    },
    methods: {
        doLogin() {
            if (this.$refs.form.validate()) {
                let payload = {
                    email: 'karen@creativeoptions.us',
                    pin: this.form.pin,
                    password: this.form.password,
                    password_confirmation: this.form.confirmPassword
                };

                apiClient.auth
                    .forgetPassword(payload)
                    .then(result => {
                       
                    })
                    .catch(err => {
            
                    });
            }
        } // Ends doLogin
    },
    computed: {
        showError() {
            return this.$store.getters.loginError;
        }
    }
};
</script>
<style scoped>
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
}
</style>
