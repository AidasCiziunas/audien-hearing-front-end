<template>
  <div>
    <headerVue />
     <div class="flex-align flex-mobile-align">
      <div class="left-side mobile-left mobile-left-side">
        <div class="audien-title">
          <span class="steps mb-10">STEP 2 of 20</span>
          <h1 class="mt-5"> 
            For best results, please make sure that you’re in a quiet place
          </h1>
          <p class="mt-5">
            Make sure that your headphones or earphones are plugged in or
            paired.
          </p>
        </div>
        <div class="align-step-button mt-lg-16">
          <v-btn
            class="warning-button-outline mr-5 mt-2"
            @click="$router.push('/birth-day')"
            color="#ffb404"
            outlined
          >
            <img :src="require('@/assets/media/arrow-right-1.png')" />
          </v-btn>
          <v-btn
            class="warning-button mt-2"
            @click="$router.push('/ear-select')"
            >Next step
            <img class="ml-2" :src="require('@/assets/media/arrow-right.png')"
          /></v-btn>
        </div>
      </div>

    <div class="back-office-page mobile-right right-side banner-with-person">
        <div class="banner-image">
          <img :src="require('@/assets/media/men.png').default" />
        </div>
      </div>
    </div>

    <footerVue />
  </div>
</template>
<script>
import footerVue from '@/components/audien/footer.vue';
import headerVue from '@/components/audien/header.vue';
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
@media only screen and (min-width: 801px) {
  .audien-title p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 2.7vh;
    max-width: 31vw;
    width: 30vw;
    line-height: 4vh;
    color: #ffffff;
  }
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
</style>
