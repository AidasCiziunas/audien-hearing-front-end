<template>
  <div>
    <headerVue />
    <div class="flex-align flex-mobile-align">
     <div class="left-side mobile-left mobile-left-side">
        <div class="audien-title">
          <span class="steps">STEP 19 of 20</span>
          <h1 class="mt-5">Disclaimer</h1>
          <p class="mt-5">
            This screening is for informational purposes only and does not
            constitute medical advice. The information provided is not intended
            as a medical diagnosis nor as a diagnostic hearing evaluation.
          </p>
          <p>
            Consult a hearing care professional for a diagnosis or, if you are
            experiencing pain or discomfort, or if you have experienced a sudden
            change in hearing. This screener is intended for use only for ages
            18 and above. For self perceived mild - moderate hearing loss.
          </p>
        </div>
        <div class="align-step-button mt-16">
          <v-btn
            class="warning-button-outline mr-2 mt-2"
            @click="$router.push('/result')"
            color="#ffb404"
            outlined
          >
            <img :src="require('@/assets/media/arrow-right-1.png')"
          /></v-btn>

          <v-btn
            class="warning-button mt-2"
            @click="$router.push('/aid-simulator')"
            >Next Step
            <img class="ml-2" :src="require('@/assets/media/arrow-right.png')"
          /></v-btn>
        </div>
      </div>

      <div class="back-office-page mobile-right right-side banner-with-person">
        <div class="banner-image">
          <img :src="require('@/assets/media/instruction.png').default" />
        </div>
      </div>
    </div>
    <footerVue />
  </div>
</template>
<script>
import footerVue from '../../components/audien/footer.vue';
import headerVue from '../../components/audien/header.vue';
export default {
  components: {
    footerVue,
    headerVue,
  },
};
</script>
<style scoped>
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
.align-content-space-between {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 27vw;
  margin-left: 11vw;
  margin-right: auto;
}
.audien-title p {
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
}
@media only screen and (min-width: 801px) {
  .audien-title p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    min-width: 30vw;
    width: 24vw;
    line-height: 4vh;
    color: #ffffff;
  }
}
</style>
