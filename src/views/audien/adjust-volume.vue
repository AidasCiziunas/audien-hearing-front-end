<template>
  <div>
    <headerVue />
      <div class="flex-align flex-mobile-align">
        <div class="left-side mobile-left mobile-left-side">
        <div class="audien-title">
          <span class="mb-5 steps">STEP 4 of 20</span>
          <h1>Adjust the volume to a comfortable listening level</h1>
        </div>
        <div class="align-content-space-between mt-5">
          <div
            style="text-align: start; display: flex; gap: 20px"
            class="volume"
          >
            <v-slider
              prepend-icon="mdi-volume-high"
              v-model="slider1"
              color="orange"
              thumb-color="#fff"
              track-color="#102132"
            >
            </v-slider>

            <b style="color: #fff" class="mt-1"> {{ slider1 }}</b>
          </div>
        </div>
        <div class="align-content-space-between mt-16">
          <div class="media">
            <div class="mt-1">
              <v-btn color="#1F2F40;" class="mr-2" height="60">
                <img :src="require('@/assets/media/help-circle.png')"
              /></v-btn>
              <!-- <img :src="require('@/assets/media/timer.png')" /> -->
            </div>
            <div class="media-content">
              <p class="mb-2">Why ask my birth year?</p>

              <span
                >A comfortable listening level differs from one individual to
                the next. Please find your own comfortable listening level. You
                should be able to clearly hear numbers being spoken. Setting the
                volume levels “too loud” or “too soft” will risk the accuracy of
                your hearing screener results..</span
              >
            </div>
          </div>
        </div>
        <div class="align-step-button mt-16">
          <v-btn
            class="warning-button-outline mr-5"
            @click="$router.push('/ear-select')"
            color="#ffb404"
            outlined
          >
            <img :src="require('@/assets/media/arrow-right-1.png')"
          /></v-btn>
          <v-btn class="warning-button" @click="$router.push('/instruction')"
            >Next step
            <img class="ml-2" :src="require('@/assets/media/arrow-right.png')"
          /></v-btn>
        </div>
      </div>
      <div class="back-office-page mobile-right right-side">
        <headephone />
      </div>
    </div>
    <AppFooterVue />
  </div>
</template>
<script>
import AppFooterVue from '../../components/audien/footer.vue';
import headephone from './headephone2.vue';
import headerVue from '../../components/audien/header.vue';
export default {
  components: {
    headephone,
    AppFooterVue,
    headerVue,
  },

  data() {
    return {
      slider1: 0,
    };
  },
};
</script>
<style scoped>
.w-10 {
  width: fit-content;
}
.audien-title {
  width: 60%;
  color: #fff;
  margin-left: auto;
  margin-right: auto;
  margin-top: 11vh;
  height: auto;
}
.audien-title h1 {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 800;
  font-size: 2.2vw;
  line-height: 4vw;
  color: #ffffff;
}
.volume {
  text-align: start;
  width: 28vw;
  height: 80px;
  left: 310px;
  top: 446px;
  background: #1f2f40;
  border-radius: 10px;
  padding-top: 23px;
  padding-left: 20px;
  padding-right: 20px;
}
.align-content-space-between {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 34vw;
  max-width: 40vw;
  margin-left: 10.6vw;
  margin-right: auto;
}
.e-control.e-slider .e-slider-track .e-range {
  background: linear-gradient(
    left,
    #e1451d 0,
    #fdff47 17%,
    #86f9fe 50%,
    #2900f8 65%,
    #6e00f8 74%,
    #e33df9 83%,
    #e14423 100%
  );
}
>>> .v-slider--horizontal .v-slider__track-container {
  width: 100%;
  height: 0.5vh !important;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
/* .align-content-space-between {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  max-width: 38vw;
  margin-left: 7vw;
  margin-right: auto;
} */
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
.banner-image img {
  height: 54vh;
}
.theme--light.v-icon {
    color: #fff !important;
}
/* .audien-title {
  width: 72%;
  color: #fff;
  margin: 9vh auto;
  height: auto;
} */
</style>
