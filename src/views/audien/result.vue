<template>
  <div>
    <div 
      class="overlay"
      :class="{ show: isTooltipVisible }"
      @click="toggleTooltip"
    ></div>
    <div
      class="mobile-tooltip"
      :style="{ display: isTooltipVisible ? 'block' : 'none' }"
    >
      <div class="content">
        <p class="mobile-tooltip__header mb-5 mx-16"> 
          <img
            class="tooltip-close"
            @click="toggleTooltip"
            :src="require('@/assets/media/arrow-left.png')"
          />
           Hearing levels
        </p>

        <div class="text-center">
          <div class="mb-10">
            <h3 style="color: #4EBD25;">Your Hearing is OK</h3>
            <span>You can understand conversations <br> whe there is backgroung noise</span>
          </div>
          <div class="mb-10">
            <h3 style="color: #FFB404;">Some Difficulty Hearing</h3>
            <span>You may have difficulty understanding <br> conversations when there is background noise</span>
          </div>
          <div class="mb-10">
            <h3 style="color: #FF3B17">Significant Hearing Difficulties</h3>
            <span>You may have significant difficulties understanding <br> speech when a person is talking at a normal level <br> either in a quiet or noisy environment</span>
          </div>
        </div>

      </div>
    </div>
    <headerComponent />
    <div class="flex-align flex-mobile-align">
      <div class="left-side mobile-left mobile-left-side">
        <div class="audien-title">
          <span class="mb-5 steps">STEP 18 of 20</span>
          <h1 class="mt-5">Your hearing test results:</h1>

          <p class="mb-5">
            You have <span class="difficulty">some difficulty</span> hearing
          </p>
        </div>
        
        <div class="align-content-space-between small-screen">
          <div class="small-slider-container">
            <v-slider
              v-model="slider1"
              color="css(0,0,0,0)"
              track-color="linear-gradient(
                90deg,
                #ff3b16 0%,
                #ffe600 50%,
                #4cbc25 100%
              )"
            >
            </v-slider>

            <div class="result-table">
              <div class="">
                <div class="hearing-condition__title">Your Hearing is OK</div>
              </div>
              <div class="">
                <div class="hearing-condition__title">Some Difficulty Hearing</div>
              </div>
              <div class="">
                <div class="hearing-condition__title">Significant Hearing Difficulties</div>
              </div>
            </div>

            <div class="help-button">
              <v-btn color="#1F2F40;" class="mr-2" height="60" @click="toggleTooltip" depressed>
                <img :src="require('@/assets/media/help-circle.png')" />
              </v-btn>
            </div>
          </div>
          <div class="mobile-popup">
            
          </div>
        </div>
        <div class="align-content-space-between-2 large-screen">
          <div class="personal-info result">
            <div class="slider-container">
              <v-slider
                v-model="slider1"
                thumb-label="always"
                track-color="none"
                color="css(0,0,0,0)"
                vertical
              >
                <template v-slot:thumb-label="hello">
                  <div class="thumb-label" style="">Your Hearing</div>
                </template>
              </v-slider>
            </div>

            <div class="result-table-2">
              <div class="hearing-row">
                <div class="hearing-condition__title">Your Hearing is OK</div>
                <div class="hearing-condition__description">You can understand conversations whe there is backgroung noise</div>
              </div>
              <div class="hearing-row">
                <div class="hearing-condition__title">Some Difficulty Hearing</div>
                <div class="hearing-condition__description">You may have difficulty understanding conversations when there is background noise</div>
              </div>
              <div class="hearing-row hearing-row--last">
                <div class="hearing-condition__title">Significant Hearing Difficulties</div>
                <div class="hearing-condition__description">You may have significant difficulties understanding speech when a person is talking at a normal level either in a quiet or noisy environment</div>
              </div>
            </div>

          </div>
        </div>
        <div class="align-content-space-between-3 mt-8">
          <v-btn
            class="warning-button-outline mr-5"
            @click="$router.push('/completing-hearing')"
            color="#ffb404"
            outlined
          >
            <img :src="require('@/assets/media/arrow-right-1.png')"
          /></v-btn>
          <v-btn
            class="warning-button warning-button-next"
            @click="$router.push('/disclaimer')"
            >Next step
            <img class="ml-2" :src="require('@/assets/media/arrow-right.png')"
          /></v-btn>
        </div>
      </div>
      <div class="back-office-page mobile-right right-side banner-with-person">
        <div class="banner-image">
          <img :src="require('@/assets/media/test-women.png').default" />
        </div>
      </div>
    </div>
    <footerVue />
  </div>
</template>
<script>
import footerVue from '@/components/audien/footer.vue';
import headerComponent from '@/components/audien/header.vue';
// import PhoneNumSelect from '@/components/common/widgets/PhoneNumSelect.vue';

export default {
  components: {
    // PhoneNumSelect,
    footerVue,
    headerComponent,
  },
  data() {
    return {
      slider1: 0,
      yourValue: null,
      premobileval: null,
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
      isTooltipVisible: false,
    };
  },
  methods: {
    toggleTooltip() {
      this.isTooltipVisible = !this.isTooltipVisible
    }
  }
};
</script>
<style scoped>
.personal-info {
  /* display: -ms-flexbox;
  display: -webkit-box; */
  display: flex;
  gap: 0px;
  max-width: 33vw;
  /* padding-left: 2%;
  padding-right: 2%;
  padding-bottom: 2%; */
  padding: 2%;
  flex-wrap: nowrap;
  /* padding-top: 0px; */
  border-radius: 10px;
  background: #1f2f40 !important;
  position: relative;
}
.side-image {
     position: absolute;
    height: 100%;
    max-height: 26.1vh !important;
    max-width: 5vw !important;
    top: 41vh;
}
.hearing-result {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 800;
  font-size: 11px;
  line-height: 20px;
  text-transform: uppercase;
  top: 17vh;
  width: 4.7vw;
  position: absolute;
  background: #fff;
  color: #102132;
  background: #ffffff;
  /* margin-left: 1px; */
  border-radius: 3px;
  text-align: center;
}
.small-screen {
  display: none;
}
/* >>> .v-slider--horizontal .v-slider__track-container {
  width: 100%;
  height: 20px;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  background: linear-gradient(
    90deg,
    #4cbc25 0%,
    #ffe600 50%,
    #ff3b16 100%
  ) !important;
} */
:deep() .v-table > table > thead > tr {
  border-bottom: thin solid red;
}
:deep() .v-table > table > tbody > tr {
  border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.result-table {
  position: relative;
  z-index: 2;
}

/* .completing-input >>> .country-selector__toggle {
  position: absolute;
  right: 26px;
    top: calc(50% - 7px);
  -webkit-transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  text-align: center;
  display: inline-block;
  cursor: pointer;
  height: 24px;
} */
.completing-input >>> .country-selector__country-flag[data-v-46e105de] {
  margin: auto 0;
  position: absolute;
  top: 20px;
  left: 9px;
  z-index: 1;
  cursor: pointer;
}
.completing-input
  >>> .vue-phone-number-input
  .select-country-container[data-v-19c9a1c7] {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 120px;
  flex: 0 0 120px;
  width: 55px;
  min-width: 92px;
  max-width: 111px;
}
.completing-input >>> .country-selector__toggle {
  position: absolute;
  right: 22px;
  top: calc(50% - 7px);
  -webkit-transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  text-align: center;
  display: inline-block;
  cursor: pointer;
  height: 24px;
}
.completing-input >>> .country-selector__label[data-v-46e105de] {
  cursor: pointer;
  background-color: #1f2f40;
  position: relative;
  width: 100%;
  height: 55px;
  min-height: 40px;
  padding-right: 22px;
  font-weight: 400;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border: 1px solid #4c5966;
  font-size: 13px;
  z-index: 0;
  padding-left: 36px;
  color: #fff;
  padding-bottom: 13px;
  line-height: 44px;
  display: none;
}
.completing-input >>> .input-tel__input {
  cursor: pointer;
  background-color: #1f2f40 !important;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  position: relative;
  width: 100%;
  padding: 0 12px;
  height: 56px !important;
  font-weight: 400;
  -webkit-appearance: none;
  height: 45px !important;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border: 1px solid #4c5966 !important;
  font-size: 14px;
  z-index: 0;
  /* margin-left: -1px; */
  height: 40px;
  min-height: 55px;
}
.completing-input >>> .vue-phone-number-input .select-country-container {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 120px;
  flex: 0 0 120px;
  width: 116px;

  height: 45px;
  background: red;
}
.completing-input >>> .country-selector__input[data-v-46e105de] {
  cursor: pointer;
  background-color: #1f2f40;
  position: relative;
  width: 100%;
  height: 55px;
  min-height: 40px;
  padding-right: 22px;
  font-weight: 400;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border: 1px solid #4c5966;
  font-size: 13px;
  z-index: 0;
  padding-left: 40px;
  color: #fff;
  padding-bottom: 19px;
  line-height: 44px;
}
.completing-input >>> .country-selector__list[data-v-46e105de] {
  max-width: 100%;
  top: 100%;
  width: 100%;
  min-width: 230px;
  position: absolute;
  background-color: #4c5966;
  overflow: hidden;
  -webkit-box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  z-index: 9;
  list-style: none;
  overflow-y: auto;
  height: 45px;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
}
.align-content-space-between-2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 33vw;
  margin-left: 9vw;
  margin-right: auto;
}
.align-content-space-between-3 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  gap: 1vh;
  width: 33vw;
  margin-left: 9vw;
  margin-right: auto;
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

.audien-title {
  width: 66%;
  color: #fff;
  margin-left: auto;
  margin-right: auto;

  height: auto;
}
.warning-button-next {
  width: 70% !important;
}
.difficulty {
  color: #ffb404;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
}
.scale-gradient {
  background: linear-gradient(180deg, #4CBC25 0%, #FFE600 50%, #FF3B16 100%);
  border-radius: 5px;

  height: 100%;

  width: 4.7vw;
  height: calc(95% - 4px);
  position: absolute;
  z-index: 1;
}
@media only screen and (min-width: 301px) and (max-width: 800px) {
  .align-content-space-between-3 {
    display: flex;
    justify-content: center;
    margin: 0;
    width: inherit;
  }
  .large-screen {
    display: none;
  }
  .small-screen {
    display: block;
  }
}
.table-with-slider {
  display: flex;
}
.slider-container {
  background: linear-gradient(180deg, #4CBC25 0%, #FFE600 50%, #FF3B16 100%);
  border-radius: 5px;
  padding-top: 6px;
}
>>> .v-slider--vertical {
  height: 270px;
}
>>> .v-slider--vertical .v-slider__thumb {
  display: none;
}
>>> .v-slider--vertical .v-slider__thumb-label {
  border-radius: 0;
  transform: none !important;
  width: 100% !important;
  height: 32px !important;
}
>>> .v-slider--vertical .v-slider__thumb-label > * {
  transform: none;
}
>>> .v-slider--vertical .thumb-label {
  color: black;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 800;
  font-size: 11px;
  line-height: 20px;
  text-transform: uppercase;
  transform: none;

  width: 100px; 
  height: 24px; 
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 3px;
}
>>> .v-slider--vertical .v-slider__track-container {
  width: 110px;
  position: relative;
  border-radius: 5px;
}
>>> .v-slider--vertical .v-slider__thumb-label-container {
  top: 12px;
}
>>> .v-slider--vertical.theme--light.v-slider .v-slider__thumb, 
>>> .v-slider--vertical.theme--light.v-slider .v-slider__track-background, 
>>> .v-slider--vertical.theme--light.v-slider .v-slider__track-fill {
  background: rgba(0,0,0,0);
}

.hearing-condition__title {
  color: #ffffff;
}

.result-table-2 {
  display: flex;
  flex-direction: column;
}
.result-table-2 .hearing-condition__title {
    /* min-width: 5vw; */
    /* margin-bottom: 16px; */
    font-family: 'Lato';
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    line-height: 20px;
    /* or 133% */

    /* #FFFFFF */

    
    display: flex;
    align-items: center;
    width: 45%;
}


.hearing-condition__description {
  width: 55%;
  color: #ffffff;

  font-family: 'Lato';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 20px;

  display: flex;
  align-items: center;
}

.hearing-row {
  flex: 1;
  display: flex;
  border-top: 1px solid rgb(255 255 255 / 24%);
  gap: 2em;
  padding-left: 20px;
}
.hearing-row--last {
  border-bottom: 1px solid rgb(255 255 255 / 24%)
}

.small-slider-container {
  background: #1F2F40;
  border-radius: 10px;
  padding: 5px 10px;
}

/* >>> .theme--light.v-slider .v-slider__thumb, 
>>> .theme--light.v-slider .v-slider__track-background, 
>>> .theme--light.v-slider .v-slider__track-fill {
  background: rgba(0,0,0,0);
} */
>>> .small-slider-container .theme--light.v-slider .v-slider__thumb {
  background: #fff;
  width: 10px;
  height: 32px;
  border-radius: 0;
}
>>> .small-slider-container .v-slider__track-container {
  background: linear-gradient(90deg, #ff3b16 0%, #ffe600 50%, #4cbc25 100% );
  height: 20px;
  border-radius: 5px;
}
>>> .v-slider__thumb::after {
  display: none;
}
>>> .v-slider__thumb::before {
  display: none;
}
.result-table {
  display: flex;
  margin: 0 8px;
  border-right: 1px solid rgb(255, 255, 255, 0.2);
}
.result-table > div {
  border-left: 1px solid rgb(255, 255, 255, 0.2);
  flex: 1;
}
.result-table .hearing-condition__title {
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  margin: 0 10px;
  text-align: center;
}
.help-button {
  text-align: center;
}
.help-button button {
  background-color: #1F2F40 !important;
  width: 35px;
}
.help-button button:before {
  width: 0;
  height: 0;
}
</style>