<template>
  <div>
    <headerVue />
    <div class="flex-align flex-mobile-align">
      <div class="left-side mobile-left mobile-left-side">
        <div class="audien-title">
          <span class="mb-5 steps">STEP 6 of 20</span>
          <h1 class="mt-5">Hearing Test</h1>

          <p class="mt-5">
            Click 'Start' to begin, then click the 'Can't Hear' button when you can no
            longer hear the sound
          </p>
        </div>
        <div class="align-content-steps">
          <div class="align-btn">
            <v-btn
              class="warning-button mt-10"
              @click="$router.push('/instruction')"
              style="width: 40%"
            >
              <img class="mr-2" :src="require('@/assets/media/play-circle.png')" />Start
            </v-btn>
            <v-btn
              class="warning-button warning-button__ear mt-10"
              @click="$router.push('/instruction')"
              style="width: 70%"
            >
              <img class="mr-2" :src="require('@/assets/media/user-ear.png')" />Left ear
            </v-btn>
          </div>
        </div>
        <div class="align-content-space-between">
          <div class="volume mt-10">
            <v-slider
              track-color="linear-gradient(
                90deg,
                #ff3b16 0%,
                #ffe600 50%,
                #4cbc25 100%
              )"
              color="css(0,0,0,0)"
              prepend-icon="mdi-volume-low"
              append-icon="mdi-volume-high"
              ticks="always"
              tick-color="#fff"
              thumb-color="#fff"
              thumb-size="50"
              step="10"
              tick-size="10"
              v-model="slider1"
            >
            </v-slider>
          </div>
        </div>
        <!-- <div class="d-flex justify-space-between" style="margin-left: 10.6vw; margin-right: auto; width: 30vw;">
          <v-btn
            style="width: 48%"
            class="warning-button-outline mt-5"
            @click="$router.push('/instruction')"
            color="#ffb404"
            outlined
          >-</v-btn>
          <v-btn
            style="width: 48%"
            class="warning-button-outline mt-5"
            @click="$router.push('/instruction')"
            color="#ffb404"
            outlined
          >+</v-btn>
        </div> -->
        <div class="align-step-button">
          <v-btn
            class="warning-button-outline mr-2 mt-5"
            @click="$router.push('/instruction')"
            color="#ffb404"
            outlined
          >
            <img :src="require('@/assets/media/arrow-right-1.png')"
          /></v-btn>
          <v-btn
            class="warning-button mt-5"
            style="width: 65%;"
            @click="$router.push('/completing-hearing')"
            >Next step <img class="ml-2" :src="require('@/assets/media/arrow-right.png')"
          /></v-btn>
        </div>
        <div class="mobile-only">
          <div class="mobile-only__content">
            <v-btn class="warning-button mt-5" style="width: 47%" @click="decreaseVol"
              ><img class="ml-2" :src="require('@/assets/media/icon-minus.png')" />
            </v-btn>
            <v-btn class="warning-button mt-5" style="width: 47%" @click="increaseVol"
              ><img class="ml-2" :src="require('@/assets/media/icon-plus.png')"
            /></v-btn>
          </div>
        </div>
      </div>
      <div class="back-office-page mobile-right right-side">
        <headphone />
      </div>
    </div>
    <footerVue />
  </div>
</template>
<script>
import headphone from "../../views/audien/headephone2.vue";
import footerVue from "@/components/audien/footer.vue";
import headerVue from "@/components/audien/header.vue";
export default {
  components: {
    headphone,
    footerVue,
    headerVue,
  },
  data() {
    return {
      slider1: 0,
    };
  },
  methods: {
    decreaseVol() {
      this.slider1 = this.slider1 - 5;
    },
    increaseVol() {
      this.slider1 = this.slider1 + 5;
    },
  },
};
</script>
<style>
.v-slider__thumb::after {
  display: none;
}
.v-slider__thumb::before {
  display: none;
}
</style>
<style scoped>
>>> .v-slider__thumb {
  border-radius: 2px;
  height: 32px;
  width: 10px;
  z-index: 1;
}
.volume {
  /* z-index: -11; */
}

>>> .v-slider__ticks-container .v-slider__tick:nth-child(1) {
  height: 10px !important;
  width: 1px !important;
  position: absolute !important;
  /* top: 35% !important; */
  /* z-index: -111; */
  background: #fff !important;
  opacity: 0.2;
  right: 2% !important;
  left: 2% !important;
}
>>> .v-slider__ticks-container .v-slider__tick:nth-child(2) {
  height: 13px !important;
  /* z-index: -111; */
  width: 1px !important;
  position: absolute !important;
  /* top: % !important; */
  right: 2% !important;
  opacity: 0.2;
  background: #fff !important;
}
>>> .v-slider__ticks-container .v-slider__tick:nth-child(3) {
  height: 15px !important;
  /* z-index: -111; */
  width: 1px !important;
  position: absolute !important;
  /* top: -100% !important; */
  /* bottom: 3px; */
  margin-top: -2px;
  background: #fff !important;
  opacity: 0.2;
}
>>> .v-slider__ticks-container .v-slider__tick:nth-child(4) {
  height: 20px !important;
  width: 1px !important;
  /* z-index: -111; */

  position: absolute !important;
  /* top: 22% !important; */
  margin-top: -4px;
  background-color: #fff;
  opacity: 0.2;
  /* z-index: -111; */
}
>>> .v-slider__ticks-container .v-slider__tick:nth-child(5) {
  height: 25px !important;
  /* z-index: -111; */
  width: 1px !important;
  position: absolute !important;
  margin-top: -6px;
  /* z-index: -111; */
  background-color: #fff;
  opacity: 0.2;
}
>>> .v-slider__ticks-container .v-slider__tick:nth-child(6) {
  height: 35px !important;
  width: 1px !important;
  /* z-index: -111; */
  position: absolute !important;
  margin-top: -9px;
  background-color: #fff;
  opacity: 0.2;
}
>>> .v-slider__ticks-container .v-slider__tick:nth-child(7) {
  height: 40px !important;
  width: 1px !important;
  /* z-index: -111; */
  position: absolute !important;
  margin-top: -11px;
  background-color: #fff;
  opacity: 0.2;
}
>>> .v-slider__ticks-container .v-slider__tick:nth-child(8) {
  height: 45px !important;
  width: 1px !important;
  /* z-index: -111; */
  position: absolute !important;
  margin-top: -14px;
  background-color: #fff;
  opacity: 0.2;
}
>>> .v-slider__ticks-container .v-slider__tick:nth-child(9) {
  height: 50px !important;
  width: 1px !important;
  /* z-index: -111; */
  position: absolute !important;
  margin-top: -16px;
  background-color: #fff;
  opacity: 0.2;
}
>>> .v-slider__ticks-container .v-slider__tick:nth-child(10) {
  height: 50px !important;
  /* z-index: -111; */
  width: 1px !important;
  position: absolute !important;
  margin-top: -18px;
  background-color: #fff;
  opacity: 0.2;
}
>>> .v-slider__ticks-container .v-slider__tick:nth-child(11) {
  height: 50px !important;
  /* z-index: -111; */
  width: 1px !important;
  position: absolute !important;
  margin-top: -18px;
  background-color: #fff;
  opacity: 0.2;
}

.align-step-button {
  /* width: 26vw;
  min-width: 26vw;
  margin-left: 10.6vw;
  margin-right: auto;
  display: flex;
  gap: 1vw; */
  margin-top: 64px;
}
.theme--light.v-icon {
  color: #fff;
}
>>> .v-slider--horizontal .v-slider__track-container {
  width: 100%;
  height: 11px;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  background: linear-gradient(90deg, #ff3b16 0%, #ffe600 50%, #4cbc25 100%) !important;
  border-radius: 5px;
  z-index: 1;
}

.flex-align {
  display: flex;
  flex-direction: row;
}
.banner-image img {
  height: 54vh;
}
.align-content-steps {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 26vw;
  min-width: 26vw;
  margin-left: 10.6vw;
  margin-right: auto;
}
.warning-button__ear {
  background: #1f2f40 !important;
}
.warning-button__ear img {
  color: #fff;
}
>>> .warning-button__ear .v-btn__content {
  color: #fff !important;
}

@media only screen and (max-width: 800px) {
  .align-step-button {
    display: none;
  }
  .mobile-only {
    padding-right: 15px;
    padding-left: 15px;
    position: absolute;
    bottom: 40px;

    z-index: 3;
    width: 100vw;

    display: flex;
    justify-content: center;
  }
  .mobile-only__content {
    display: flex;
    justify-content: space-between;
  }
}
@media only screen and (min-width: 801px) {
  .mobile-only {
    display: none;
  }
}
</style>
