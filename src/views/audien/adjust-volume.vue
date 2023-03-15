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
          <a class="volume-info-link" @click="toggleTooltip">What is a comfortable listening level?</a>
        </div>
        <div 
          class="align-content-space-between mt-16 mobile-popup"
          :style="{ display: isTooltipVisible ? 'block' : 'none' }"
        >
          <div class="media">
            <div class="media__icon mt-1 mr-2">
              <v-btn color="#1F2F40;" height="60">
                <img :src="require('@/assets/media/help-circle.png')"
              /></v-btn>
              <!-- <img :src="require('@/assets/media/timer.png')" /> -->
            </div>
            <div class="media-content">
              <div>
                <v-btn
                  class="media-content__close"
                  @click="$router.push('/hearing-test')"
                  color="#ffffff"
                >
                  <img :src="require('@/assets/media/arrow-right-1.png')"
                /></v-btn>
                
              </div>
              <p class="mb-2 mx-16">What is a comfortable listening level?</p>

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
          <v-btn class="warning-button" @click="suspendNext()"
            >Next step
            <img class="ml-2" :src="require('@/assets/media/arrow-right.png')"
          /></v-btn>
           <audio ref="test" id="audio" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3" crossorigin="anonymous" ></audio>
        </div>
      </div>
      <div ref="myBtn" class="back-office-page mobile-right right-side">
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
import apiClient from '@/config/axios';
let audioElement,audioCtx,pannerOptions,gainNode,track,AudioContext,panner
export default {
  components: {
    headephone,
    AppFooterVue,
    headerVue,
  },

  data() {
    return {
      slider1: 0,
      volume:0.2,
      isTooltipVisible: true
    };
  },
     watch: {
    // whenever question changes, this function will run
    slider1(volume, oldQuestion) {
     gainNode.gain.value =volume/100;
      // this.refreshData();
      	// panner.pan.value = newQuestion;	
    
    }
  },
   created(){
    this.volume = this.$store.state.HearingTest.dataLog.sound_frequency*10;
    this.slider1 = this.$store.state.HearingTest.dataLog.sound_frequency*10;
    this.$refs.myBtn.click()
    },
  mounted(){
    this.$refs.myBtn.click()
   
     this.refreshData()
    setInterval(this.refreshData, 5000)
  },
   methods:{
    suspendNext(){
      apiClient.post("sound-frequency",{frequency:(this.slider1/100)*10}).then((response)=>{
	console.log(audioCtx.state);
  this.$router.push('/instruction');
  })
    },
     refreshData() {
       AudioContext = window.AudioContext || window.webkitAudioContext;
 audioCtx = new AudioContext();

// load some sound
 audioElement =  this.$refs.test;

 pannerOptions = {pan: -1};
 track = audioCtx.createMediaElementSource(audioElement);
 panner = new StereoPannerNode(audioCtx, pannerOptions);
 gainNode = audioCtx.createGain();
track.connect(gainNode).connect(panner).connect(audioCtx.destination);
     gainNode.gain.value = this.volume/100;
 
      audioElement.play()
    },
    toggleTooltip() {
      this.isTooltipVisible = !this.isTooltipVisible
    }
  
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
.media-content__close {
  display: none;
}
.volume-info-link {
  display: none;
}
@media only screen and (max-width: 800px) {
  .mobile-popup {
    /* display: none; */

    position: fixed;
    /* bottom: 0; */
    z-index: 100;
    max-width: 100vw;
    bottom: 0;
    width: 100vw !important;
    height: 40vh;
    margin: 0 !important;
    background: #102132;
    border-radius: 30px 30px 0px 0px;
    padding-top: 40px;
  }
  .mobile-popup:before {
    content: " ";
    position: absolute;
    width: 60px;
    height: 4px;

    background: #1C2E40;
    border-radius: 4px;

    top: 18px;
    left: calc(50% - 30px);
  }
  .media {
    margin: 0 20px;
  }
  .media__icon {
    display: none;
  }
  .media-content p {
    font-size: 24px;
    line-height: 32px;
    margin: 0 20px;
    text-align: center;
  }
  .media-content p:before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;

  }
  .align-content-space-between {
    flex-direction: column;
  }
  .volume-info-link {
    display: inline-block;
    color: #FFB404;
    margin: 10px 0;
    /* border-bottom: 1px solid #FFB404; */


    font-family: 'Lato';
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
  }
}
</style>
