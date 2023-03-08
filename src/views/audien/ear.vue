<template>
  <div>
    <headerVue/>
    <div class="flex-align flex-mobile-align">
       <div class="left-side mobile-left mobile-left-side">
      
        <div class="audien-title">
          <p class="mb-10 steps">STEP 3 of 20</p>
          <h1>In which ear do you hear the sound?</h1>
        </div>
        <div class="radio-content">
          <div class="example ex1 mt-5">
            <label class="radio">
              <input v-model="ear" value="left" type="radio" name="group1" />
              <span>
                <div
                  :class="ear == 'left' ? 'yellow-circle-tick' : 'circle'"
                ></div>
                <img :src="require('@/assets/media/right-ear.png')" />
                <p>Left</p>
              </span>
            </label>
            <label class="radio">
              <input type="radio" name="group1" v-model="ear" value="both" />
              <span>
                <div
                  :class="ear == 'both' ? 'yellow-circle-tick' : 'circle'"
                ></div>
                <img :src="require('@/assets/media/both-ear.png')" />
                <p>Both</p>
              </span>
            </label>
            <label class="radio">
              <input type="radio" name="group1" v-model="ear" value="right" />
              <span>
                <div
                  :class="ear == 'right' ? 'yellow-circle-tick' : 'circle'"
                ></div>
                <img :src="require('@/assets/media/left-ear.png')" />
                <p>Right</p>
              </span>
            </label>
          </div>
        </div>
        <div class="align-step-button mt-10">
          <v-btn
            class="warning-button-outline mr-5 mt-10"
            @click="$router.push('/best-result')"
            color="#ffb404"
            outlined
          >
            <img :src="require('@/assets/media/arrow-right-1.png')"
          /></v-btn>
          <v-btn
            class="warning-button mt-10"
            @click="$router.push('/adjust-volume')"
            >Next step
            <img class="ml-2" :src="require('@/assets/media/arrow-right.png')"
          /></v-btn>
        </div>
      </div>
       <div class="back-office-page mobile-right right-side">
       
        <headephone />
      </div>
    </div>
    <footerVue />
  </div>
</template>
<script>
import headephone from './headephone.vue';
import footerVue from '@/components/audien/footer.vue';
import headerVue from '@/components/audien/header.vue';

export default {
  components: {
    headephone,
    footerVue,
    headerVue
  },
  data() {
    return {
      ear: 'left',
    };
  },
};
</script>
<style scoped>
.radio-content {
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  /* width: 34vw; */
  max-width: 39vw;
  min-width: 26vw;
  margin-left: 10.6vw;
  margin-right: auto;
}
.ex1 span {
  display: block;
  /* padding: 24px 4px 3px 11px; */
  border: 2px solid #142435;
  background: #1f2f40;
  border-radius: 5px;
  width: 11vw;
  height: 8.2vw;
  padding-top: 27px;
  position: relative;
  border-radius: 10px;
  -webkit-transition: all 0.25s linear;
  transition: all 0.25s linear;
  text-align: center;
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
.banner-image img {
  height: 54vh;
}
</style>
