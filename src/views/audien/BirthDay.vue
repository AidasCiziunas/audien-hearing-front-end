<template>
  <div>
    <headerVue />
    <div class="flex-align flex-mobile-align">
      <div class="left-side mobile-left mobile-left-side">
        <div class="audien-title">
          <span class="mb-5 steps">STEP 1 of 20</span>
          <h1 class="mt-5">Select your birth year:</h1>

          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <!-- <v-text-field
                v-model="date"
                prepend-inner-icon="event"
                outlined
                readonly
                class="birth-day"
                color="#1F2F40"
                v-on="on"
              >
                <template slot="append">
                  <v-btn v-on="on" color="#1F2F40" class="mb-3">
                    <img :src="require('@/assets/media/arrow-down.png')" />
                  </v-btn>
                </template>
              </v-text-field> -->
              <div class="input-container mt-10">
                <i class="icon right calendar-icon" v-on="on">
                  <img :src="require('@/assets/media/date-calendar.png')" />
                </i>
                <select
                  class="input-field"
                  type="text"
                  v-model="date"
                  placeholder="Username"
                  name="usrnm"
                 
                >
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1997</option>
                <option value="1996">1996</option>
                 <option value="1995">1995</option>
                 <option value="1994">1994</option>
                 <option value="1993">1993</option>
                 <option value="1992">1992</option>
                 <option value="1991">1991</option>
                 <option value="1990">1990</option>
                 <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                </select>
                <i class="icon left arrow-down-icon">
                  <img

                    :src="require('@/assets/media/arrow-down.png')"
                  />
                </i>
              </div>
            </template>
            <v-date-picker 
               v-model="date"  
               min="2018-NaN-NaN"
                max="2020-NaN-NaN"
                @change='monthMenu = false'
               type="year" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </div>
        <div class="align-content-space-between mt-10">
          <div>
            <div class="media">
              <div class="mt-1">
                <v-btn color="#1F2F40;" class="mr-2" height="60">
                  <img :src="require('@/assets/media/help-circle.png')"
                /></v-btn>
              </div>
              <div class="media-content">
                <p class="mb-2">Why ask my birth year?</p>

                <span
                  >Having this information adds critical context for the accuracy of your
                  hearing screener results, as hearing loss levels vary by age. This
                  hearing screener is only designed for users over the age of 18.</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="align-step-button mt-10">
          <v-btn
            class="warning-button mt-lg-15"
            @click="submitYear"
            >Next step
            <img class="ml-2" :src="require('@/assets/media/arrow-right.png')"
          /></v-btn>
        </div>
      </div>
      <div class="back-office-page mobile-right right-side">
        <div class="calendar2">
          <img :src="require('@/assets/media/calendar.png').default" />
        </div>
      </div>
    </div>

    <footerVue />
  </div>
</template>
<script>
import footerVue from '@/components/audien/footer.vue';
import headerVue from '@/components/audien/header.vue';
import apiClient from '@/config/axios';
export default {
  components: {
    footerVue,
    headerVue,
  },

  data: () => ({
    date: 2003,
    menu: false,
    modal: false,
  }),
  methods:{
    submitYear(){
      apiClient.post('birth-year',{
        birth_year:this.date
      }).then((response)=>{
       this.$router.push('/best-result')
      })
      // 
    }
  }
};
</script>
<style scoped>
.calendar2 {
  position: relative;
  margin-left: 20px;
}
.calendar2 img {
  /* width: 70%; */
  width: 37vw;
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
.input-container {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  width: 100%;
  margin-bottom: 15px;
  height: 70px;
}
.right {
  border-top-left-radius: 10px !important;
  border-bottom-left-radius: 10px !important;
  /* height: 7vh; */
}
.icon {
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 9px;
  padding-bottom: 9px;
  /* padding: 5px; */
  background: #102132;
  color: white;
  min-width: 37px;
  text-align: center;
  width: 69px;
  border-top: 2px solid #1f2f40;
  border-bottom: 2px solid #1f2f40;
  border-left: 2px solid #1f2f40;
}
.left {
  background: #1f2f40;
  border-end-end-radius: 10px;
  border-top-right-radius: 10px;
}
.input-field {
  width: 100%;
  padding: 0px;
  /* height: 7vh; */
  color: #fff;
  max-width: 20vw;
  outline: none;
  background: #102132 !important;
  border-top: 2px solid #1f2f40 !important;
  border-bottom: 2px solid #1f2f40 !important;
}
input:focus {
  border: 2px solid #102132 !important;
  background: #102132 !important;
  border-top: 2px solid #1f2f40 !important;
  border-bottom: 2px solid #1f2f40 !important;
}

.align-content-space-between {
  /* display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 26vw;
  min-width: 30vw;
  margin-left: 10.6vw;
  margin-right: auto; */
}
.calendar-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.calendar-icon img {
  width: 24px;
  height: 24px;
}
.arrow-down-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (min-width: 801px) {
  .calendar2 {
    left: -9vh;
    top: 15vh;
  }
}
@media screen and (max-width: 800px) {
  .mobile-right {
    min-height: 46vh;
  }
  .calendar2 {
    position: relative;
    top: -5vw;
  }
  .calendar2 img {
    max-width: 500px;
    width: 80vw;
    -webkit-mask-image: -webkit-gradient(linear, left 10%, 
        left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
  }
  .input-container {
    justify-content: center;
  }
}
</style>
