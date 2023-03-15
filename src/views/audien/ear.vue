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
              <input v-model="ear" value="-1" type="radio" name="group1" />
              <span>
                <div
                  :class="ear == -1 ? 'yellow-circle-tick' : 'circle'"
                ></div>
                <img :src="require('@/assets/media/right-ear.png')" />
                <p>Left</p>
              </span>
            </label>
            <label class="radio">
              <input type="radio" name="group1" v-model="ear" value="0" />
              <span>
                <div
                  :class="ear == 0 ? 'yellow-circle-tick' : 'circle'"
                ></div>
                <img :src="require('@/assets/media/both-ear.png')" />
                <p>Both</p>
              </span>
            </label>
            <label class="radio">
              <input type="radio" name="group1" v-model="ear" value="1" />
              <span>
                <div
                  :class="ear == 1 ? 'yellow-circle-tick' : 'circle'"
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
            @click="submitEar()"
            >Next step
            <img class="ml-2" :src="require('@/assets/media/arrow-right.png')"
          /></v-btn>
          
          <audio ref="test" id="audio" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3" crossorigin="anonymous" ></audio>
        </div>
      </div>
       <div  ref="myBtn" class="back-office-page mobile-right right-side">
     
        <headephone />
      </div>
    </div>
    <footerVue />
  </div>
</template>

<script>
import headephone from './headephone2.vue';
import footerVue from '@/components/audien/footer.vue';
import headerVue from '@/components/audien/header.vue';
import apiClient from '@/config/axios';
let audioElement,audioCtx,pannerOptions,gainNode,track,AudioContext,panner
export default {
  components: {
    headephone,
    footerVue,
    headerVue
  },
  computed:{
   sound(){
     return this.audios[Math.floor(Math.random()*this.audios.length)];
   }
  },
   watch: {
    // whenever question changes, this function will run
    ear(selectedEar, oldQuestion) {
     panner.pan.value = selectedEar;
      // this.refreshData();
      	// panner.pan.value = newQuestion;	
    
    }
  },

    created(){
       if(this.$store.state.HearingTest.dataLog.ear=='left'){
        this.ear = -1
       }
       if(this.$store.state.HearingTest.dataLog.ear=='both'){
        this.ear = 0
       }
       if(this.$store.state.HearingTest.dataLog.ear=='right'){
        this.ear = 1
       }
    this.$refs.myBtn.click()
    },
  mounted(){
    this.$refs.myBtn.click()
   
     this.refreshData()
    setInterval(this.refreshData, 5000)
  },
  methods:{
    submitEar(){
      let selectectEar=0;
    
          if(this.ear==0) {
           selectectEar='both'
          }
          if(this.ear==1) {
           selectectEar='right'
          }
          if(this.ear==-1) {
           selectectEar='left'
          }
 
    apiClient.post("ear",{ear:selectectEar}).then((response)=>{
    
       this.$router.push('/adjust-volume')
    })  
   
    },
     refreshData() {
      console.clear()
       AudioContext = window.AudioContext || window.webkitAudioContext;
 audioCtx = new AudioContext();

// load some sound
 audioElement =  this.$refs.test;

 pannerOptions = {pan: -1};
 track = audioCtx.createMediaElementSource(audioElement);
 panner = new StereoPannerNode(audioCtx, pannerOptions);
 gainNode = audioCtx.createGain();
track.connect(gainNode).connect(panner).connect(audioCtx.destination);
      	panner.pan.value = this.ear;
       
      audioElement.play()
        
    }
  },
  data() {
    return {
      ear: 1,
      audios:[
        {
          id:1,
          sound:require('@/assets/media/sounds/10-sec-countdown-with-echo-77616.mp3')
        },
        {
          id:1,
          sound:require('@/assets/media/sounds/10-second-count-down-104235.mp3')
        },
        {
          id:1,
          sound:require('@/assets/media/sounds/answering-machine-female-out-of-town-103769.mp3')
        },
        {
          id:1,
          sound:require('@/assets/media/sounds/birds-19624.mp3')
        },
        {
          id:1,
          sound:require('@/assets/media/sounds/children2-75773.mp3')
        },
        {
          id:1,
          sound:require('@/assets/media/sounds/corona-announcement-subway-hvv-hamburg-63822.mp3')
        },
        {
          id:1,
          sound:require('@/assets/media/sounds/countdown-stereo-delay-102242.mp3')
        },
        {
          id:1,
          sound:require('@/assets/media/sounds/fantastic-end-skirt-from-the-book-of-death-rhymes-72723.mp3')
        },
        {
          id:1,
          sound:require('@/assets/media/sounds/morning-street-car-passing-by-birds-singing-63924.mp3')
        },
        {
          id:1,
          sound:require('@/assets/media/sounds/no-one-likes-to-be-told-what-to-do-36534.mp3')
        },
        {
          id:1,
          sound:require('@/assets/media/sounds/rain-sounds-the-sound-of-summer-rain-141793.mp3')
        },
        {
          id:1,
          sound:require('@/assets/media/sounds/theatre-class-lecture-29730.mp3')
        },
        {
          id:1,
          sound:require('@/assets/media/sounds/video-game-count-and-more-63828.mp3')
        },
        {
          id:1,
          sound:require('@/assets/media/sounds/what-are-you-doing-22344.mp3')
        },
        {
          id:1,
          sound:require('@/assets/media/sounds/what-is-this-what-are-these-63645.mp3')
        },
        {
          id:1,
          sound:require('@/assets/media/sounds/writing-on-paper-6988.mp3')
        }
      ]
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
  padding-bottom: 25px;
  display: block;
  /* padding: 24px 4px 3px 11px; */
  border: 2px solid #142435;
  background: #1f2f40;
  border-radius: 5px;
  width: 11vw;
  /* height: 8.2vw; */
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
