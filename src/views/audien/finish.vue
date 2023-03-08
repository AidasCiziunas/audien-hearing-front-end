<template>
  <div>
    <headerVue />
   <div class="flex-align flex-mobile-align">
      <div class="left-side mobile-left mobile-left-side">
        <div class="audien-title">
          <span class="mb-5 steps">Finish</span>
          <h1 class="mt-5">Thank you for taking our <span>hearing screener</span></h1>
          <p class="mb-5">Hearing solutions an Audient Hearing</p>
          <div>
            <v-row no-gutters>
              <v-col>
                <div class="button-dev">
                  <div class="button-placeholder">
                    <img
                      class="button-img"
                      height="70"
                      width="70"
                      :src="require('@/assets/media/1.png').default"
                    />

                    <div class="text-card">
                      Audien Atom Pro OTC Hearing Aid (Pair)
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col>
                <div class="button-dev">
                  <div class="button-placeholder">
                    <img
                      class="button-img"
                      height="70"
                      width="70"
                      :src="require('@/assets/media/2.png').default"
                    />
                    <div>
                      <div class="text-card">
                        Audien Atom OTC Hearing Aid (Pair)
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col>
                <div class="button-dev">
                  <div class="button-placeholder">
                    <img
                      class="button-img"
                      height="70"
                      width="70"
                      :src="require('@/assets/media/3.png').default"
                    />

                    <div class="text-card">Audien EV3 Hearing Aid (Pair)</div>
                  </div>
                </div>
              </v-col>
              <v-col>
                <div class="button-dev">
                  <div class="button-placeholder">
                    <img
                      class="button-img"
                      height="70"
                      width="70"
                      :src="require('@/assets/media/4.png').default"
                    />

                    <div class="text-card">Audien EV1 Hearing Aid (Pair)</div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
        <div class="align-step-button mt-16">
          <v-btn
            class="warning-button-outline mr-5 mt-2"
            @click="$router.push('/')"
            color="#ffb404"
            outlined
          >
            <img :src="require('@/assets/media/rotate-cw.png')"
          /></v-btn>
          <v-btn class="warning-button mt-2" @click="$router.push('/finish')"
            >Hear the benefit of a hearing aid

            <img class="ml-2" :src="require('@/assets/media/arrow-right.png')"
          /></v-btn>
        </div>
      </div>
      <div class="back-office-page mobile-right right-side">
        <div class="banner-image">
          <img :src="require('@/assets/media/photo.png').default" />
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

.ex1 span {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  /* padding: 24px 4px 3px 11px; */
  border: 2px solid #142435;
  background: #1f2f40;
  border-radius: 5px;
  width: 11vw;
  height: auto;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  padding-bottom: 7px;
  border-radius: 10px;
  -webkit-transition: all 0.25s linear;
  transition: all 0.25s linear;
  text-align: center;
}
.button-label {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  /* or 130% */

  text-align: center;

  /* #FFFFFF */

  color: #ffffff;
}
</style>
