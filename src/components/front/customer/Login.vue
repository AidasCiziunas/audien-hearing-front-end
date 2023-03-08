<!-- eslint-disable prettier/prettier -->
<template>
  <span style="display: block !important" class="pt-10">
    <section class="auth-heading">
      <div class="text-center"></div>
    </section>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="customer-login">
              <v-card-title><h2 class="card-title">Login</h2></v-card-title>
              <v-card-text>
                <v-form ref="form" class="mx-2" lazy-validation>
                  <v-text-field
                    label="Login"
                    type="text"
                    name="username"
                    v-model="form.username"
                    :rules="emailRules"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    v-model="form.password"
                    :rules="passwordRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions
                class="d-flex flex-column pb-15 justify-center align-center"
              >
                <v-spacer></v-spacer>
                <v-btn
                  @click="doLogin"
                  class="error justify-center align-center"
                  >SIGN IN</v-btn
                >
                <div>
                  <div class="chekc">
                    <p
                      class="required-fields text-center mt-2 mb-0"
                      id="error"
                      v-if="showError"
                    >
                      Invalid username or password
                    </p>
                  </div>
                </div>
              </v-card-actions>
              <!-- <div class="bottom-bottons">
                                <div class="in-left">
                                    <router-link to="/forget-password"
                                        >Forget Password?</router-link
                                    >
                                </div>
                                <div class="in-right">
                                    <router-link to="/customer-register"
                                        >Register New User</router-link
                                    >
                                </div>
                            </div> -->
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>

    <!-- <section class="mt-0 auth-login-screen">
      <v-container>
        <v-row class="justify-center">
          <div class="col-lg-8 col-11 customer-login py-10">
            <v-form ref="form" class="mx-2" lazy-validation>
              <v-row class="text-center" align="center">
                <div class="col-lg-12">
                  <div class="inner-auth-heading">
                    <h2>User Login</h2>
                  </div>
                </div>
              </v-row>
              <v-row class="mt-8 justify-center register">
                <div class="col-md-5 col-sm-9">
                  <div class="add-travel-input">
                    <label> PIN or Email </label>
                    <v-text-field
                      :hide-details="false"
                      background-color="white"
                      height="40"
                      placeholder="Enter Your pin or email"
                      name="username"
                      v-model="form.username"
                      :rules="emailRules"
                    ></v-text-field>
                  </div>
                </div>
                <div class="col-md-5 col-sm-9">
                  <div class="add-travel-input">
                    <label>Password</label>
                    <v-text-field
                      :hide-details="false"
                      height="40"
                      background-color="white"
                      placeholder="Enter Your Password"
                      type="password"
                      name="password"
                      v-model="form.password"
                      :rules="passwordRules"
                    ></v-text-field>
                  </div>
                </div>
              </v-row>
              <div class="d-flex flex-column justify-center align-center">
                <div class="mt-3">
                  <v-btn class="error" @click="doLogin"> Login To Dashboard </v-btn>
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

            <div class="bottom-bottons">
              <div class="in-left">
                <router-link to="/forget-password">Forget Password?</router-link>
              </div>
              <div class="in-right">
                <router-link to="/customer-register">Register New User</router-link>
              </div>
            </div>
          </div>
        </v-row>
      </v-container>
    </section> -->
  </span>
</template>
<!-- eslint-disable prettier/prettier -->

<script>
import apiClient from '@/services/api/Auth';
import carServices from '@/services/api/Cars';
import { evBus } from '@/services/bus.js';
import { mapState } from 'vuex';

export default {
  name: 'SignIn',
  data() {
    return {
      token: null,
      carSearchId: null,
      form: {
        username: '',
        password: '',
      },
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) =>
          (v && v.length >= 3) ||
          'Password must be equal to greater than 3 characters',
      ],
      emailRules: [(v) => !!v || 'PIN or Email is required'],
    };
  },
  mounted() {
    if (this.$route.query.token) {
      this.$store.dispatch('falsifyErrorLogin');

      let token = this.$route.query.token;
      this.token = token;
      this.carSearchId = this.$route.query.searchId;

      // case for carsearchId and token
      if (
        this.token != null &&
        this.token != '' &&
        typeof this.token != 'undefined' &&
        typeof this.carSearchId != 'undefined'
      ) {
        this.doSearchCarById();
      }

      // case for customer invitation token
      if (
        this.token != null &&
        this.token != '' &&
        typeof this.token != 'undefined' &&
        typeof this.carSearchId == 'undefined'
      )
        this.$store.dispatch('customerInviteToken', {
          payload: { token: this.token },
        });
    }
  },

  computed: {
    ...mapState({
      domain: (state) => state.envStore.domain,
      userType:(state)=>state.authStore.userType
    }),
    showError() {
      return this.$store.getters.loginError;
    },
  },
  methods: {
    doSearchCarById() {
      let reqHeaders = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + this.token,
        },
      };

      let reqDataForm = new FormData();
      reqDataForm.append('searchId', this.carSearchId);

      carServices
        .getCarBySearchId(reqDataForm, reqHeaders)
        .then((rsp) => {
          //  SETUP DETAILS FOR LOGGED IN USER

          let _cadeLoggedUser = {
            data: [
              {
                userType: this.userType,
                agent: {
                  iAgentID: rsp.data.data.agentData.pin,
                  vcPIN: rsp.data.data.agentData.pin,
                  vcEmail: rsp.data.data.agentData.email,
                  vcFName: rsp.data.data.agentData.first_name,
                  vcMName: '',
                  vcLName: rsp.data.data.agentData.last_name,
                },
              },
            ],
            token: this.token,
            auth: true,
          };

          this.$store.dispatch('setAuthentication', {
            payload: _cadeLoggedUser,
          });

          let cRespond = rsp.data;
          let _pickObj = {
            LABEL: rsp.data.data.searchData.pickUp.locationName,
            VALUE: rsp.data.data.searchData.pickUp.locationKey,
            CODE: '',
          };
          let _dropObj = {
            LABEL: rsp.data.data.searchData.dropOff.locationName,
            VALUE: rsp.data.data.searchData.dropOff.locationKey,
            CODE: '',
          };

          cRespond.pickLocations = JSON.parse(JSON.stringify([_pickObj]));
          cRespond.dropLocations = JSON.parse(JSON.stringify([_dropObj]));
          cRespond.spickLocations = JSON.parse(JSON.stringify(_pickObj));
          cRespond.sdropLocations = JSON.parse(JSON.stringify(_dropObj));
          cRespond.sDriverAge = rsp.data.data.searchData.driversAge;
          cRespond.sInDriverAge = rsp.data.data.searchData.driversAge;
          cRespond.mainLocation = 'Airport';

          this.$store
            .dispatch('setSearchedCarDetails', {
              SRCH_CAR_RESPOND: cRespond,
            })
            .then(() => {
              this.$router.push('/cars').catch(() => {});
            });
        })
        .catch((err) => {
          this.$sentry.captureException(new Error(err));
        });

      ////////////////
    },
    doLogin() {
      if (this.$refs.form.validate()) {
        let payload = {
          // email: "karen@creativeoptions.us",
          username: this.form.username, // "0001162",
          password: this.form.password, // "xanadu",
          // lastName: "Kauk",
          // engine: "flight",
          domain: this.domain,
        };

        if (
          this.$store.getters.inviteToken != false &&
          this.$store.getters.inviteToken != 'undefined'
        )
          payload.invitationToken = this.$store.getters.inviteToken;

        this.$store.dispatch('userLogin', {
          reqParmas: payload,
          apiClient: apiClient,
        });
      }
    }, // Ends doLogin
  },
};
</script>
<!-- eslint-disable prettier/prettier -->

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

.theme--light.v-card {
  background-color: #d9e2ea;
}
</style>
