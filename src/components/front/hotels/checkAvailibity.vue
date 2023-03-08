<template>
  <div>
    <div class="room-search-box">
      <div class="room-seach-box-header">
        <p>
          from <b> {{ currencySymbol }}{{ hotelPrice }} </b> /
          {{ totalNights }} night<span v-if="totalNights > 1">s</span>
        </p>
      </div>

      <div class="choose-rrom-date-box">
        <div class="choose-room-check-in b-r">
          <h6>Check In</h6>
          <div ref="checkin">
            <div class="single-input">
              <div class="input-icon">
                <Calendar
                  v-model="checkInDate"
                  :minimumDate="minimumCheckInDate"
                  :attach="$refs.checkin"
                  :hideLabel="true"
                  :hideIcon="true"
                  @input="checkInSelected()"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="choose-room-check-in">
          <h6>Check Out</h6>
          <div ref="checkout">
            <div class="single-input">
              <div class="input-icon">
                <Calendar
                  v-model="checkOutDate"
                  :hideLabel="true"
                  :hideIcon="true"
                  :attach="$refs.checkout"
                  :minimumDate="minimumCheckOutDate"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="room-guest-box">
        <div
          class="hotel-guests-feild"
          style="width: 100% !important; border-right: 0px"
        >
          <span class="guests_text"><b>Guests</b></span>
          <div class="single-input">
            <Guests v-model="roomsValue" :hideIcon="true" />
          </div>
        </div>
      </div>

      <div class="room-guest-box">
        <div class="add-rrom-btn-box">
          <v-row align="center" justify="space-around">
            <v-btn class="error" @click.prevent="checkAvailibility()">
              Check Availability
            </v-btn>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import hotelServices from '@/services/api/Hotel';
import moment from 'moment';
import Calendar from '@/components/common/Calendar.vue';
import Guests from '@/components/common/Guests.vue';

import {
  nextDay,
  addDayToDate,
  getVeryNextDate,
} from '@/components/common/utils';

export default {
  name: 'checkAvailability',
  props: ['totalNights'],
  components: {
    Calendar,
    Guests,
  },
  data() {
    return {
      checkInDate: '',
      checkOutDate: '',
      spickupvalue: '',
      HotelDetail: [],
      hotelPrice: '',

      minimumCheckInDate: getVeryNextDate(
        new Date(new Date().setDate(new Date().getDate() + 1))
      ),
      roomsValue: {
        guests: '1 Adults - 0 Children',
        selectedPeopleSets: [
          {
            adults: 1,
            childs: 0,
            edit: false,
            childsAge: 0,
          },
        ],
      },
    };
  },
  mounted() {
    this.SearchDataPopulate();
    this.HotelDetail = this.HotelStore.hotels.filter((element) => {
      return element.hotelId == this.$route.params.id;
    });

    this.roomsValue.selectedPeopleSets = this.searchData.rooms;

    this.getDetail();
    this.spickupvalue = this.searchData.destination;
    this.totalGuest();
  },

  computed: {
    ...mapState({
      HotelStore: (state) => state.hotelStore,
      searchData: (state) => state.hotelStore.searchData,
      CType: (state) => state.envStore.CType,
    }),

    minimumCheckOutDate() {
      return addDayToDate(this.checkInDate);
    },
  },
  methods: {
    checkInSelected() {
      let nextDayValue = nextDay(this.checkInDate, this.checkOutDate);
      if (nextDayValue) {
        this.checkOutDate = nextDayValue;
      }
    },
    getDetail() {
      this.hotelPrice = this.HotelStore.hotelData.lowestPrice;
    },
    checkAvailibility() {
      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let searchData = {
        hotelId: this.$route.params.id,
        checkinDate:
          moment(this.checkInDate).format('YYYY-MM-DDTHH:mm:ss') + 'Z',
        checkoutDate:
          moment(this.checkOutDate).format('YYYY-MM-DDTHH:mm:ss') + 'Z',
        desiredResultCurrency: this.CType,
        rooms: this.roomsValue.selectedPeopleSets,
        search: true,
        residency: 'us',
        radius: this.searchData.radius,
        name: this.searchData.name,
        code: this.searchData.code,
        geoLat: this.searchData.geoLat,
        geoLong: this.searchData.geoLong,
        sessionId: this.HotelStore.sessionId,
      };

      hotelServices
        .checkAvailability((reqHeaders, searchData))
        .then((response) => {
          // if(response.data.data.galleryImages.length==0){
          //      this.$awn.alert("No room available against applied search. please try new search");
          //     return false;
          // }

          this.$store.dispatch('hotelDetail', response.data.data);
          this.$store.dispatch('HotelSearch', response.data.data.searchData);
          this.$store.dispatch('updateSessionId', response.data.data.sessionId);
          this.$emit('initData', response.data.data);
          this.getDetail();
        });
    },

    totalGuest() {
      let totalAudlt = 0;
      let totalChild = 0;
      for (let i = 0; i < this.searchData.rooms.length; i++) {
        totalAudlt += parseInt(this.searchData.rooms[i].adults);
        totalChild += parseInt(this.searchData.rooms[i].childs.length);
      }
      this.roomsValue.guests =
        totalAudlt + ' Adults - ' + totalChild + ' Children';
    },

    SearchDataPopulate() {
      // pre-populate main filters
      setTimeout(() => {
        if (this.searchData) {
          this.spickupvalue = this.searchData.destination;
          this.sradius = Number(this.searchData.radius);

          this.destination = {
            name: this.searchData.destination,
            code: this.searchData.code,
            ID: this.searchData.ID,
            geoLat: this.searchData.geoLat,
            geoLong: this.searchData.geoLong,
          };
          let _searchedPayload = this.doCleanArray(this.searchData);
          let myPickTime = _searchedPayload.checkinDate;
          let myDropTime = _searchedPayload.checkoutDate;
          this.checkInDate = moment(myPickTime.split('T')[0]).format(
            'YYYY-MM-DD'
          );
          this.checkOutDate = moment(myDropTime.split('T')[0]).format(
            'YYYY-MM-DD'
          );
          this.roomsValue.selectedPeopleSets = this.searchData.rooms;
          this.spickupvalue = _searchedPayload.name;
        }
      }, 2000);
    },
  },
};
</script>
