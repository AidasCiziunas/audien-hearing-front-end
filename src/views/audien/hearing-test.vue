<template>
  <div>
    <headerVue />
    <div class="flex-align flex-mobile-align">
      <div class="left-side mobile-left mobile-left-side">
        <div class="audien-title">
          <span class="mb-5 steps">STEP 6 of 20</span>
          <h1 class="mt-5">Hearing Test</h1>
  
          <p class="mt-5">
            Click 'Start' to begin, then click the 'Can't Hear' button when you
            can no longer hear the sound
       
          </p>
           <p v-if="unplayed.length==0" class="mt-5">
            Test Successfully completed.
       
          </p>
        </div>
        <div v-if="unplayed.length>0" class="align-content-steps">
          <div class="align-btn">
            <v-btn
              v-if="!played"
              class="warning-button mt-10"
              @click="nextSoundPlayed(); played=!played"
              style="width: 40%"
            >
              <img class="mr-2" :src="require('@/assets/media/play-circle.png')" />Start
            </v-btn>
             <v-btn
              v-if="played"
              class="warning-button mt-10"
              @click="play(); played=!played"
              style="width: 40%"
            >
              <img
                class="mr-2"
                :src="require('@/assets/media/play-circle.png')"
              />Stop
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
        <div v-if="unplayed.length>0" class="align-content-space-between">
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
              v-model="volume"
            >
            </v-slider>
          </div>
          <div class="desktop-only">
            <div class="d-flex justify-space-between">
              <v-btn 
                class="warning-button-outline mt-5" 
                color="#ffb404" 
                style="width: 47%"
                outlined
              ><img :src="require('@/assets/media/icon-minus-orange.png')" 
              /></v-btn>
              <v-btn 
                class="warning-button-outline mt-5" 
                color="#ffb404" 
                style="width: 47%"
                outlined
              ><img :src="require('@/assets/media/icon-plus-orange.png')" 
              /></v-btn>
            </div>
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
            v-if="unplayed.length==0"
            class="warning-button mt-5"
            style="width: 65%"
            @click="suspendNext()"
            >Next step
            <img class="ml-2" :src="require('@/assets/media/arrow-right.png')"
          /></v-btn>
          <v-btn
            v-if="unplayed.length>0"
            class="warning-button mt-5"
            style="width: 65%"
            :disabled="!hearingTest[currentPlayedIndex].played"
            @click="NextPlay()"
            >Next
            <!-- <img class="ml-2" :src="require('@/assets/media/arrow-right.png')" -->
          <!-- /> -->
          </v-btn>
             <audio ref="test" id="audio" :src="hearingTest[currentPlayedIndex].sound.default" crossorigin="anonymous" ></audio>
        </div>
        <div class="mobile-only" style="display: none;">
          <div class="mobile-only__content">
            <v-btn class="warning-button mt-5" style="width: 47%"
              ><img class="ml-2" :src="require('@/assets/media/icon-minus.png')" />
            </v-btn>
            <v-btn class="warning-button mt-5" style="width: 47%"
              ><img class="ml-2" :src="require('@/assets/media/icon-plus.png')"
            /></v-btn>
          </div>
        </div>
      </div>
      <div ref="myBtn" class="back-office-page mobile-right right-side">
        <headphone />
      </div>
    </div>
    <footerVue />
  </div>
</template>
<script>
import headphone from '../../views/audien/headephone2.vue';
import footerVue from '@/components/audien/footer.vue';
import headerVue from '@/components/audien/header.vue';
import { mapState } from 'vuex';
import apiClient from '@/config/axios';
let audioElement,audioCtx,pannerOptions,gainNode,track,AudioContext,panner

export default {
  components: {
    headphone,
    footerVue,
    headerVue,
  },
  data() {
    return {
      played:false,
      slider1: 0,
      volume:1,
      audios:[
        {
          id:1,
          sound:require('@/assets/media/sounds/10-sec-countdown-with-echo-77616.mp3'),
          played:false,
        },
        {
          id:2,
          sound:require('@/assets/media/sounds/10-second-count-down-104235.mp3'),
          played:false,
        },
        {
          id:3,
          sound:require('@/assets/media/sounds/answering-machine-female-out-of-town-103769.mp3'),
          played:false,
        },
        {
          id:4,
          sound:require('@/assets/media/sounds/birds-19624.mp3'),
          played:false,
        },
        {
          id:5,
          sound:require('@/assets/media/sounds/children2-75773.mp3'),
          played:false,
        },
        {
          id:6,
          sound:require('@/assets/media/sounds/corona-announcement-subway-hvv-hamburg-63822.mp3'),
          played:false,
        },
        {
          id:7,
          sound:require('@/assets/media/sounds/countdown-stereo-delay-102242.mp3'),
          played:false,
        },
        {
          id:8,
          sound:require('@/assets/media/sounds/fantastic-end-skirt-from-the-book-of-death-rhymes-72723.mp3'),
          played:false,
        },
        {
          id:9,
          sound:require('@/assets/media/sounds/morning-street-car-passing-by-birds-singing-63924.mp3'),
          played:false,
        },
        {
          id:10,
          sound:require('@/assets/media/sounds/no-one-likes-to-be-told-what-to-do-36534.mp3'),
          played:false,
        },
        {
          id:11,
          sound:require('@/assets/media/sounds/rain-sounds-the-sound-of-summer-rain-141793.mp3'),
          played:false,
        },
        {
          id:12,
          sound:require('@/assets/media/sounds/theatre-class-lecture-29730.mp3'),
          played:false,
        },
        {
          id:13,
          sound:require('@/assets/media/sounds/video-game-count-and-more-63828.mp3'),
          played:false,
        },
        {
          id:14,
          sound:require('@/assets/media/sounds/what-are-you-doing-22344.mp3'),
          played:false,
        },
        {
          id:15,
          sound:require('@/assets/media/sounds/what-is-this-what-are-these-63645.mp3'),
          played:false,
        },
        {
          id:16,
          sound:require('@/assets/media/sounds/writing-on-paper-6988.mp3'),
          played:false,
        }
      ]
    };
  },
  computed:{
    currentPlayedIndex(){
      return this.$store.state.HearingTest.currentPlayedIndex
    },
    hearingTest(){
      return this.$store.state.HearingTest.testSounds
    },
    unplayed(){
      return this.$store.state.HearingTest.testSounds.filter((item)=>{
        return item.played == false;
      })
    }
  },
    watch: {
    // whenever question changes, this function will run
    volume(volume, oldQuestion) {
     gainNode.gain.value =volume/100;
      // this.refreshData();
      	// panner.pan.value = newQuestion;	
    
    }
  },
   created(){
let seletecdSound = this.audios.slice(0, 5).map(function () { 
        return this.splice(Math.floor(Math.random() * this.length), 1)[0];
    }, this.audios.slice());
    this.$store.dispatch('setHearingTestSounds',seletecdSound)
    this.$refs.myBtn.click()
    },
  mounted(){
    
    this.$refs.myBtn.click()
   
     this.refreshData()
    setInterval(this.refreshData, 5000)
  },
   methods:{
    nextSoundPlayed(){
      console.log(this.currentPlayedIndex);
       this.$store.dispatch('nextSoundPlayed',this.currentPlayedIndex)
       if(this.played===false){
        console.log('@@@@')
         audioElement.play()
         }else{
           audioElement.pause()
         }
         this.volume =1;
    },
    NextPlay(){
     let volume = (this.volume/100)*10;
     let soundId = this.hearingTest[this.currentPlayedIndex].id;
     apiClient.post("attempt-test",{
      "sound_id": soundId,
      "sound_volume": volume
     }).then((response)=>{

     ;
       this.$store.dispatch('nextSound',this.currentPlayedIndex+1)
       audioElement.pause();
       console.log('##############')
       this.played=false;
         })
   
    },
    play(){
      console.clear()
      console.log(this.played);
      if(this.played===false){
        console.log('@@@@')
         audioElement.play()
         }else{
           audioElement.pause()
         }
    },
    suspendNext(){
	console.log(audioCtx.state);
  this.$router.push('/completing-hearing');
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
   
    },
   }
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
.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
    background-color: rgb(255 180 4 / 57%) !important;
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
>>> .pause-button .v-btn__content {
  color: #fff !important;
}

@media only screen and (max-width: 800px) {
  .align-step-button {
    /* display: none; */
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
@media only screen and (max-width: 800px) {
  .desktop-only {
    display: none;
  }
}
.align-content-space-between {
  flex-direction: column;
}
</style>
