<template>
    <span style="display: block !important" class="pt-10">
        <section class="auth-heading">
            <div class="text-center">
                <h2>Welcome To InteleTravel</h2>
            </div>
        </section>

        <section class="mt-0 auth-login-screen">
            <v-container>
                <v-row class="justify-center">
                    <div class="col-lg-10 col-11 customer-login py-10">
                        <v-row class="text-center" align="center">
                            <div class="col-lg-12">
                                <div class="inner-auth-heading">
                                    <h2>Customer Invitation</h2>
                                </div>
                            </div>
                        </v-row>

                        <v-row
                            align="center"
                            class="mt-4 text-center"
                            v-if="!validToken"
                        >
                            <div class="col-lg-12">
                                <div>
                                    <p class="required-fields">
                                        Invalid Invitation Request Or Token.
                                    </p>
                                </div>
                            </div>
                        </v-row>

                        <div
                            class="d-flex flex-column justify-center align-center"
                            v-if="validToken"
                        >
                            <div class="auth-button">
                                <!--
                                    <v-btn class="error" @click="moveToLogin()">
                                     Login To Dashboard 
                                    </v-btn>
                                -->
                                <p style="color: #391dab !important;">
                                    Please wait a moment, you will be redirected
                                    in {{ leftSeconds }} seconds.
                                </p>
                            </div>
                            <!--
                            <div class="auth-button">
                                <v-btn class="error" @click="moveToRegister()"> Register New Customer </v-btn>
                            </div>
                            -->
                        </div>
                    </div>
                </v-row>
            </v-container>
        </section>
    </span>
</template>
<script>
import apiClient from '@/services/api/Auth';
export default {
    name: 'Invite',
    data() {
        return {
            token: null,
            isLoggedIn: this.$store.getters.isAuthenticated,
            validToken: true,
            leftSeconds: 5
        };
    },
    mounted: function() {},
    created: function() {
        this.token = this.$route.query.token;

        if (
            this.token === null ||
            this.token == '' ||
            typeof this.token == 'undefined'
        ) {
            this.validToken = false;
        } else {
            this.validToken = true;

            this.$store.dispatch('customerInviteToken', {
                payload: { token: this.token }
            });

            this.countDownTimer();
        }
    },
    methods: {
        countDownTimer() {
            setTimeout(() => {
                this.leftSeconds -= 1;

                if (this.leftSeconds == 0) this.moveToLogin();

                this.countDownTimer();
            }, 1000);
        },
        moveToLogin() {
            this.$router.push('/sign-in').catch(() => {});
        },
        moveToRegister() {
            this.$router.push('/customer-register').catch(() => {});
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
