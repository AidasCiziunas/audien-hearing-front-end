
<template>
  <div>
    <headerVue />
    <div class="flex-align flex-mobile-align">
      <div class="left-side mobile-left mobile-left-side">
        <div class="audien-title">
          <span class="mb-5 steps">STEP 17 of 20</span>
          <h1 class="mt-5">Thank you for completing the hearing screener</h1>

          <p class="mt-5">
            In order to view your results, please complete your details below:
          </p>
        </div>

        <div class="align-content-space-content mt-5">
          <div>
            <div class="personal-info">
              <v-row>
                <v-col class="col-md-6 col-sm-12 col-lg-6" cols="12">
                  <v-text-field
                    v-model="firstName"
                    class="completing-input"
                    outlined
                    label="First name"
                    color="rgba(255, 255, 255, 0.2)"
                    dense
                    required
                  >
                    <template slot="append">
                      <img
                        class="input-append-icon"
                        :src="require('@/assets/media/user.png')"
                      />
                    </template>
                  </v-text-field>
                </v-col>
                <v-col class="col-md-6 col-sm-12 col-lg-6" cols="12">
                  <v-text-field
                    v-model="lastName"
                    class="completing-input"
                    outlined
                    textFieldClasses="completing-input"
                    inputClasses="completing-input"
                    dense
                    label="Last name"
                    color="rgba(255, 255, 255, 0.2)"
                    required
                  >
                    <template slot="append">
                      <img
                        class="input-append-icon"
                        :src="require('@/assets/media/user.png')"
                      />
                    </template>
                  </v-text-field>
                </v-col>
                <v-col class="col-md-6 col-sm-12 col-lg-6" cols="12"
                  ><v-text-field
                    v-model="email"
                    outlined
                    class="completing-input"
                    label="E-mail"
                    dense
                    single-line
                    required
                    color="rgba(255, 255, 255, 0.2)"
                  >
                    <template slot="append">
                      <img
                        class="input-append-icon"
                        :src="require('@/assets/media/at-sign.png')"
                      />
                    </template> </v-text-field
                ></v-col>
                <v-col class="col-md-6 col-sm-12 col-lg-6" cols="12">
                  <vue-tel-input-vuetify
                    selectClasses="completing-input"
                    color="rgba(255, 255, 255, 0.2)"
                    class="completing-input"
                    label="Contact Number"
                    outlined
                    v-model="contactNumber"
                    wrapperClasses="completing-input-phone"
                    size="sm"
                    dense
                    ><template slot="append">
                      <img
                        class="input-append-icon"
                        :src="require('@/assets/media/icon-phone.svg').default"
                      />
                    </template>
                  </vue-tel-input-vuetify>
                </v-col>
                <v-col
                  class="col-md-6 col-sm-12 small-screen col-lg-6"
                  cols="12"
                >
                  <v-checkbox
                    color="white"
                    class="black-label"
                    label="I agree to the terms & conditions"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </div>
            <v-checkbox
              color="white"
              class="black-label large-screen"
              label="I agree to the terms & conditions"
            ></v-checkbox>
          </div>
        </div>
        <div class="align-step-button">
          <v-btn
            class="warning-button-outline mr-5"
            @click="$router.push('/hearing-test')"
            color="#ffb404"
            outlined
          >
            <img :src="require('@/assets/media/arrow-right-1.png')"
          /></v-btn>

          <v-btn
            class="warning-button"
            @click="submitUser"
            >Next step
            <img class="ml-2" :src="require('@/assets/media/arrow-right.png')"
          /></v-btn>
        </div>
      </div>
      <div class="back-office-page mobile-right right-side banner-with-person">
        <div class="banner-image">
          <img :src="require('@/assets/media/complete-women.png').default" />
        </div>
      </div>
    </div>
    <footerVue />
  </div>
</template>
<script>
// import PhoneNumSelect from '../../components/common/widgets/PhoneNumSelect.vue';
import footerVue from '@/components/audien/footer.vue';
import headerVue from '@/components/audien/header.vue';
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue';
import apiClient from '@/config/axios';
export default {
  components: {
    // PhoneNumSelect,
    footerVue,
    VueTelInputVuetify,
    headerVue,
  },
  data() {
    return {
      slider1: 0,
      yourValue: null,
      premobileval: null,
      firstName:null,
      lastName:null,
      email:null,
      contactNumber:null
    };
  },
  computed:{
   
  },
  mounted(){
    this.firstName = this.$store.state.HearingTest.dataLog.user.first_name;
    this.lastName  = this.$store.state.HearingTest.dataLog.user.last_name;
    this.email  = this.$store.state.HearingTest.dataLog.user.email
    this.contactNumber  = this.$store.state.HearingTest.dataLog.user.contact_number
  },
  methods:{
    submitUser(){
      apiClient.post("user",{
         "first_name":this.firstName,
         "last_name":this.lastName,
         "email":this.email,
         "contact_number":this.contactNumber
      }).then((response)=>{
        apiClient.post("complete-test",
        {
           "test":"complete"
        }).then((response)=>{
        this.$router.push('/result')
        }).catch((error)=>{
          this.$router.push('/result')
        })
      })
    }
  }
};
</script>
<style scoped>
.banner-with-person > .banner-image {
  left: -4vw;
}
@media only screen and (min-width: 301px) and (max-width: 800px) {
  .left-side {
    /* height: 100vh; */
    /* padding-bottom: 160px; */
  }
  .right-side {
    display: none;
  }
}
.align-content-space-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  /* width: 26vw; */
  min-width: 26vw;
  margin-left: 10.6vw;
  margin-right: auto;
}
>>> .vue-tel-input-vuetify .country-code {
  width: 29% !important;
}
.black-label label {
  color: #fff !important;
}
.black-label /deep/ label {
  color: #fff;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 36px;
  /* identical to box height, or 277% */

  /* #FFFFFF */

  color: #ffffff;
}
.completing-input >>> .country-selector__toggle {
  position: absolute;
  right: 26px;
  top: calc(20% - 7px);
  -webkit-transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  text-align: center;
  display: inline-block;
  cursor: pointer;
  height: 24px;
}
.completing-input >>> .country-selector__country-flag[data-v-46e105de] {
  margin: auto 0;
  position: absolute;
  top: 20px;
  left: 9px;
  z-index: 1;
  cursor: pointer;
}
.completing-input
  >>> .vue-phone-number-input
  .select-country-container[data-v-19c9a1c7] {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 120px;
  flex: 0 0 120px;
  width: 55px;
  min-width: 92px;
  max-width: 111px;
}
.completing-input >>> .country-selector__toggle {
  position: absolute;
  right: 22px;
  top: calc(50% - 7px);
  -webkit-transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  text-align: center;
  display: inline-block;
  cursor: pointer;
  height: 24px;
}
.completing-input >>> .country-selector__label[data-v-46e105de] {
  cursor: pointer;
  background-color: #1f2f40;
  position: relative;
  width: 100%;
  height: 55px;
  min-height: 40px;
  padding-right: 22px;
  font-weight: 400;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border: 1px solid #4c5966;
  font-size: 13px;
  z-index: 0;
  padding-left: 36px;
  color: #fff;
  padding-bottom: 13px;
  line-height: 44px;
  display: none;
}
.completing-input >>> .input-tel__input {
  cursor: pointer;
  background-color: #1f2f40 !important;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  position: relative;
  width: 100%;
  padding: 0 12px;
  height: 56px !important;
  font-weight: 400;
  -webkit-appearance: none;
  height: 45px !important;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border: 1px solid #4c5966 !important;
  font-size: 14px;
  z-index: 0;
  /* margin-left: -1px; */
  height: 40px;
  min-height: 55px;
}
.completing-input >>> .vue-phone-number-input .select-country-container {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 120px;
  flex: 0 0 120px;
  width: 116px;

  height: 45px;
  background: red;
}
.completing-input >>> .country-selector__input[data-v-46e105de] {
  cursor: pointer;
  background-color: #1f2f40;
  position: relative;
  width: 100%;
  height: 55px;
  min-height: 40px;
  padding-right: 22px;
  font-weight: 400;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border: 1px solid #4c5966;
  font-size: 13px;
  z-index: 0;
  padding-left: 40px;
  color: #fff;
  padding-bottom: 19px;
  line-height: 44px;
}
.completing-input >>> .country-selector__list[data-v-46e105de] {
  max-width: 100%;
  top: 100%;
  width: 100%;
  min-width: 230px;
  position: absolute;
  background-color: #4c5966;
  overflow: hidden;
  -webkit-box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  z-index: 9;
  list-style: none;
  overflow-y: auto;
  height: 45px;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
}

.footer {
  height: 100px;
  background: #07121c;
  display: flex;
  justify-content: space-around;
}
.flex-align {
  display: flex;
  flex-direction: row;
}
.personal-info {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  gap: 20px;
  max-width: 29vw;
  padding-left: 2%;
  padding-right: 2%;
  padding-bottom: 2%;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding-top: 22px;
  border-radius: 10px;
  background: #1f2f40 !important;
}
/* .align-content-space-between {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 36vw;
  min-width: 36vw;
  margin-left: 10.6vw;
  margin-right: auto;
} */
.audien-title h1 {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 800;
  font-size: 2.7vw;
  line-height: 3vw;
  color: #ffffff;
}

.input-append-icon {
  position: relative;
  bottom: -2px;
  left: 2px;
  height: 2vh;
}
.vue-tel-input-vuetify .country-code {
  width: 10vh !important;
}
.align-content-space-between {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 26vw;
  min-width: 26vw;
  margin-left: 9.6vw;
  margin-right: auto;
}

@media only screen and (min-width: 801px) {
  .audien-title p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    min-width: 29vw;
    width: 27vw;
    line-height: 4vh;
    color: #ffffff;
  }
}
@media only screen and (max-width: 800px) {
  .align-step-button button.warning-button {
    position: relative;
    bottom: inherit;

  }
  /* .personal-info {
    margin-bottom: 20px;
  } */
  .large-screen {
    display: none;
  }
}

</style>
