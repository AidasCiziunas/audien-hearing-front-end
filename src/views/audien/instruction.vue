<template>
  <div>
    <headerVue />
     <div class="flex-align flex-mobile-align">
       <div class="left-side mobile-left mobile-left-side">
        <div class="audien-title">
          <span class="steps">STEP 5 of 20</span>
          <h1 class="mt-5">Hearing screener instructions</h1>
          <p class="mt-5">
            This test is designed to find the faintest sound you can hear. Use the <b style="font-weight: 700">+/-</b> buttons to adjust the volume then click “<b style="font-weight: 700">Next</b>” when you reach the faintest volume you can hear.
          </p>
        </div>
        <div class="align-step-button">
          <v-btn
            class="warning-button-outline mr-5 mt-5"
            @click="$router.push('/adjust-volume')"
            color="#ffb404"
            outlined
          >
            <img :src="require('@/assets/media/arrow-right-1.png')"
          /></v-btn>

          <v-btn
            class="warning-button mt-5"
            @click="$router.push('/hearing-test')"
            >Next step
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
    <AppFooterVue />
  </div>
</template>
<script>
import AppFooterVue from '../../components/audien/footer.vue';
import headerVue from '../../components/audien/header.vue';
export default {
  components: {
    AppFooterVue,
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
@media only screen and (min-width: 801px) {
  .audien-title p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    min-width: 24vw;
    width: 19vw;
    line-height: 4vh;
    color: #ffffff;
  }
  .align-step-button {
    margin-top: 64px;
  }
}
@media only screen and (max-width: 800px) {
  .audien-title p {
    font-weight: 300;
    font-size: 18px;
    line-height: 30px;
  }

}

</style>
