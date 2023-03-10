<template>
  <div>
    <headerVue />
     <div class="flex-align flex-mobile-align">
       <div class="left-side mobile-left mobile-left-side">
        <div class="audien-title">
          <span class="steps">STEP 5 of 20</span>
          <h1 class="mt-5">Hearing screener instructions</h1>
          <p class="mt-5">
            You will hear a series of sounds at different frequencies that range
            in volume from loud to quiet.
          </p>
          <p>
            The moment you can no longer hear the sound, click the
            <b style="font-weight: 800">"Can't Hear"</b> button that displays on
            the screen
          </p>
        </div>
        <div class="align-step-button mt-16">
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
</style>
