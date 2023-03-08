<template>
  <span style="display: block !important; height: 100%" class="room-container">
    <v-container v-if="slides.length > 0">
      <div class="hotel-back-btn">
        <router-link to="/hotels">
          <i class="fas fa-angle-double-left"></i> Back to Hotel Listing
        </router-link>
      </div>
      <div class="hotel-room-page">
        <div class="row">
          <div class="col-md-9">
            <Header
              v-if="slides.length > 0"
              :showMapTab="showMapTab"
              :mapURL="mapURL"
              :HotelDetail="HotelDetail"
            />
            <Slider v-if="slides.length > 0" :slides="slides" />
          </div>
          <div class="col-md-3">
            <checkAvailibity
              v-if="slides.length > 0"
              v-on:initData="initData()"
              :totalNights="totalNights"
            />
          </div>
        </div>
        <div v-if="slides.length > 0" class="hotel-room-tabs">
          <v-toolbar class="remove-head-bg" style="height: auto !important">
            <template v-slot:extension>
              <v-tabs v-model="tabs" fixed-tabs>
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#mobile-tabs-5-1" class="primary--text">
                  DESCRIPTION
                </v-tab>
                <v-tab href="#mobile-tabs-5-2" class="primary--text">
                  FACILITIES
                </v-tab>
                <v-tab
                  id="map"
                  ref="map"
                  href="#mobile-tabs-5-3"
                  class="primary--text"
                >
                  GOOGLE MAP
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
          <v-tabs-items v-model="tabs">
            <v-tab-item :value="'mobile-tabs-5-1'">
              <v-card flat v-if="HotelStore.hotelDetails.description">
                <v-card-text v-html="HotelStore.hotelDetails.description">
                </v-card-text>
                <!-- <a
                                    v-if="
                                        HotelDetail.description.length >
                                            this.description.length
                                    "
                                    role="button"
                                    class="ml-5 float-right pr-10 pb-4"
                                    @click="showMore()"
                                    >Read More...</a
                                >
                                <a
                                    v-if="
                                        HotelDetail.description.length ==
                                            this.description.length
                                    "
                                    role="button"
                                    class="ml-5 float-right pr-10 pb-4"
                                    @click="hideMore()"
                                    >Hide More</a
                                > -->
              </v-card>
            </v-tab-item>
          </v-tabs-items>
          <v-tabs-items v-model="tabs">
            <v-tab-item :value="'mobile-tabs-5-2'">
              <div
                class="choose-room-aminities product-varify hotel-product-varify"
              >
               <ul v-if="HotelDetail" class="">
                <li v-for="(value,name,index) in HotelDetail.hotelFacility" :key="'facility'+index">
                    <i class="fas fa-circle"
                          style="color: #000 !important"
                        ></i>
                  {{name}}
                  </li>
               </ul>
              
              </div>
            </v-tab-item>
          </v-tabs-items>
          <v-tabs-items v-model="tabs">
            <v-tab-item :value="'mobile-tabs-5-3'">
              <v-card flat>
                <v-card-text>
                  <GmapMap
                    :center="center"
                    :zoom="12"
                    style="width: 100%; height: 500px"
                  >
                    <GmapMarker
                      v-for="(m, index) in markers"
                      :position="m.position"
                      :clickable="true"
                      :draggable="false"
                      :key="index"
                      @click="openInfoWindowTemplate(index)"
                    />
                    <gmap-info-window
                      :options="{
                        maxWidth: 300,
                        pixelOffset: {
                          width: 0,
                          height: -35,
                        },
                      }"
                      :position="infoWindow.position"
                      :opened="infoWindow.open"
                      @closeclick="infoWindow.open = false"
                    >
                      <div v-html="infoWindow.template"></div>
                    </gmap-info-window>
                  </GmapMap>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </div>
        <div class="room-heading">
          <h4>Rooms</h4>
        </div>
        <div class="refundable-tabs-data" v-if="packages.length">
          <HotelRoom
            :totalNights="totalNights"
            :slides="slides"
            :packages="visiblePages"
            :showAddCart="true"
            :showTripSummary="propSummaryDisplay"
            :defaultClass9Lg="true"
            :roomData="HotelStore.hotelDetails.roomData"
            :description="HotelDetail.description"
            :hotelimg="HotelDetail.img"
            :fixPathOfImage="fixPathOfImage"
          />
          <template>
            <div class="text-center">
              <v-pagination
                v-model="page"
                :total-visible="totalVisibleIndexes"
                :length="Math.ceil(packages.length / perPage)"
              />
            </div>
          </template>
        </div>
        <p v-else>
          <i class="fas fa-info" style="color: blue"></i>
          Sorry, We couldn't find any results matching your criteria, but
          changing your search may help. (Session id:
          {{ availabilitySessionId }})
        </p>
      </div>
    </v-container>
  </span>
</template>
<script>
var moment = require('moment');
import { mapState } from 'vuex';
import Slider from '@/components/front/hotels/Slider';
import Header from '@/components/front/hotels/Header';
import checkAvailibity from '@/components/front/hotels/checkAvailibity';
import { evBus } from '@/services/bus.js';
import HotelRoom from '@/components/front/hotels/HotelRoom';
export default {
  name: 'ChooseRoom',
  components: {
    Slider,
    Header,
    checkAvailibity,
    HotelRoom,
  },
  data() {
    return {
      hotelExpand: -1,
      model: 0,
      hoteltab: null,
      Guests: '',
      guestsShow: false,
      HotelDetail: [],
      mapURL: '',
      selectedType: 'refundable',

      calendar_pick_datetime: false,
      spickupvalue: '',
      filteredPackages: [],
      calendar_drop_datetime: false,

      tabs: null,
      destination: '',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      current: 0,
      direction: 1,
      transitionName: 'fade',
      show: false,
      slides: [],

      center: {},
      sizes: [53, 56, 66, 78, 90],
      markers: [],

      infoWindow: {
        position: { lat: 0, lng: 0 },
        open: false,
        template: '',
      },

      page: 1,
      perPage: 5,
      description: '',

      propSummaryDisplay: true,
    };
  },

  mounted() {
    this.show = true;
    this.initData();
  },

  created: function () {
    evBus.$on('displayTripSummary', () => {
      this.propSummaryDisplay = false;

      setTimeout(
        function () {
          this.propSummaryDisplay = true;
        }.bind(this),
        1500
      );
    });
  },

  methods: {
    initData() {
      this.HotelDetail = this.HotelStore.hotelData;
      this.mapURL = this.HotelStore.hotelDetails.mapURL;
      this.slides = this.HotelStore.galleryImages.map((item) => ({
        img: this.fixPathOfImage(item),
      }));

      if (this.slides.length == 0) {
        let _imageOfSlide = this.HotelDetail.img;

        this.slides = [{ img: this.HotelDetail.img }];
      }

      this.shortenStrLen(this.HotelDetail.description);
      this.popupData();
    },
    fixPathOfImage(path) {
      if(!path){
       return false;
      }
      if (path.indexOf('square60') >= 0)
        return path.replace('square60', 'square810');

      return path;
    },
    getSliderImage(images) {
      return images.map((item) => ({
        img: item.split('//')[0] + '://' + item.split('//')[1],
      }));
    },

    showMapTab() {
      this.$refs.map.$el.click();
    },

    shortenStrLen(string) {
      if (string != null && string.length > 500) {
        this.description = string.substr(0, 500) + '....';
      } else {
        this.description = this.HotelDetail.description;
      }
    },

    showMore() {
      this.description = this.HotelDetail.description;
    },

    hideMore() {
      this.description = this.HotelDetail.description.substr(0, 500) + '....';
    },

    popupData() {
      // let Search = this.HotelStore.searchData;

      this.center.lat = parseFloat(this.HotelDetail.lat);
      this.center.lng = parseFloat(this.HotelDetail.lon);
      this.markers.push({
        position: {
          lat: parseFloat(this.HotelDetail.lat),
          lng: parseFloat(this.HotelDetail.lon),
        },
      });
    },

    openInfoWindowTemplate() {
      const { lat, lon, displayName, address, cityName } = this.HotelDetail;
      this.infoWindow.position = {
        lat: parseFloat(lat),
        lng: parseFloat(lon),
      };
      this.infoWindow.template = `<b>${displayName}</b> &nbsp; ${address} &nbsp;, ${cityName}<br>`;
      this.infoWindow.open = true;
    },

    handlePageChange(value) {
      this.panel = null;
      this.currentPage = value;
      this.makeDisplayItems();
      this.scrollToTop();
    },
    makeDisplayItems() {
      let arrOfObj = this.getPageData();
      arrOfObj.forEach((item) => {
        item.tab = null;
        item.details = '';
        item.expanded = false;
      });

      this.filteredPackages = arrOfObj;
    },

    currentImage(ItemIndex) {
      this.model = ItemIndex;
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },

    startSlide: function () {
      this.timer = setInterval(this.next, 10000);
    },

    next: function () {
      this.currentIndex += 1;
    },
    prev: function () {
      this.currentIndex -= 1;
    },

    slide(dir) {
      this.direction = dir;
      dir == 1
        ? (this.transitionName = 'slide-next')
        : (this.transitionName = 'slide-prev');
      var len = this.slides.length;
      this.current = (this.current + (dir % len) + len) % len;
      // this.current = this.current + 1
    },

    toggleGuests() {
      this.showGuests = !this.showGuests;
    },
  },

  computed: {
    ...mapState({
      globalData: (state) => state.envStore,
      HotelStore: (state) => state.hotelStore,
      searchData: (state) => state.hotelStore.searchData,
      totalNights: (state) => state.hotelStore.totalNights,
      availabilitySessionId: (state) => state.hotelStore.sessionId,
      packages: (state) => state.hotelStore.hotelDetails.packages,
    }),
    visiblePages() {
      return this.packages.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      );
    },
    totalPageIndexes() {
      return this.totalPages;
    },
    currentImg: function () {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    },
    compPickDateFormatted() {
      return this.formattedDate(this.date1, this.dateFormatPlaceHolder);
    },
    compDropDateFormatted() {
      return this.formattedDate(this.date2, this.dateFormatPlaceHolder);
    },
    minDropOff() {
      return moment(this.date1, 'YYYY-MM-DD')
        .add('days', 1)
        .format('YYYY-MM-DD');
    },
    loadedDealers() {
      return this.getDealers;
    },
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Crimson+Text');

/* FADE IN */
.fade-enter-active {
  transition: opacity 1s;
}

.fade-enter {
  opacity: 1;
}

.flex {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.v-application ol,
.v-application ul {
  padding-left: 20px;
}

/* GO TO NEXT SLIDE */
.slide-next-enter-active,
.slide-next-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-next-enter {
  transform: translate(100%);
}

.slide-next-leave-to {
  transform: translate(-100%);
}

/* GO TO PREVIOUS SLIDE */
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-prev-enter {
  transform: translate(-100%);
}

.slide-prev-leave-to {
  transform: translate(100%);
}

/* SLIDES CLASSES */

.blue {
  background: #4a69bd;
}

.red {
  background: #e55039;
}

.yellow {
  background: #f6b93b;
}

/* SLIDER STYLES */
body {
  overflow: hidden;
  margin: 0;
  font-size: 50px;
  /* font-family: 'Crimson Text', sans-serif;*/
  color: #fff;
}

#slider {
  top: 0px;
  width: 100%;
  overflow: hidden;
  height: 100vh;
  position: relative;
}

.slide {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  z-index: 10;
  cursor: pointer;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 46px;
  color: white;
  position: absolute;
  top: calc(50% - 35px);
  left: 1%;
  transition: transform 0.3s ease-in-out;
  user-select: none;
}

.btn-expended {
  top: 40px;
  background-color: #4e5254;
  border: 1px solid black;

  z-index: 10;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 46px;
  color: white;
  position: absolute;
  left: 1%;
  border-radius: 50%;
  display: inline-block;
}
.btn-next {
  left: auto;
  right: 1%;
}

.btn:hover {
  transform: scale(1.1);
}

.guests_text {
  color: #63676b;
}
</style>
