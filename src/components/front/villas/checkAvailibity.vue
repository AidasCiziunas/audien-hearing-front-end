<template>
  <div>
    <div class="room-search-box">
      <div class="room-seach-box-header">
        <p>
          from <b> {{ currencySymbol }}{{ villaData.totalPrice }}</b>
          {{ totalNights }}/night
        </p>
      </div>
      <div class="choose-room-location">
        <h6>Location</h6>
        <div class="single-input">
          <div class="input-icon">
            <div class="listing-location">
              <v-text-field
                placeholder="E.g. London"
                autocomplete="off"
                class="form-control input-lg"
                v-model="spickupvalue"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="choose-rrom-date-box">
        <div class="choose-room-check-in b-r">
          <h6>Check In</h6>

          <div class="single-input">
            <div style="" class="input-icon">
              <Calendar
                v-model="checkInDate"
                :minimumDate="minimumCheckInDate"
                :hideLabel="true"
                :hideIcon="true"
                @input="checkInSelected()"
              />
            </div>
          </div>
        </div>
        <div class="choose-room-check-in">
          <h6>Check Out</h6>

          <div class="single-input">
            <div style="" class="input-icon">
              <Calendar
                v-model="checkOutDate"
                :hideLabel="true"
                :hideIcon="true"
                :minimumDate="minimumCheckOutDate"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="room-guest-box">
        <div class="hotel-guests-feild" style="width: 111% !important">
          <span class="guests_text"><b>Guests</b></span>
          <div class="single-input">
            <Guests v-model="roomsValue" :hideIcon="true" />
          </div>
        </div>
      </div>

      <div class="room-guest-box">
        <div class="add-rrom-btn-box">
          <v-row align="center" justify="space-around">
            <v-btn class="error" @click="checkAvailability()">
              Check Availibility
            </v-btn>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { evBus } from '@/services/bus.js';
import { mapState } from 'vuex';
import villaServices from '@/services/api/Villa';

import Calendar from '@/components/common/Calendar.vue';
import Guests from '@/components/common/Guests.vue';

import {
  nextDay,
  addDayToDate,
  getVeryNextDate,
} from '@/components/common/utils';

export default {
  name: 'checkAvailibility',
  props: ['villaData', 'totalNights'],
  components: {
    Calendar,
    Guests,
  },
  data() {
    return {
      checkInDate: '',
      checkOutDate: '',
      spickupvalue: '',
      locationData: [],
      price: 0,
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
    this.checkInDate = this.searchData.checkinDate;
    this.checkOutDate = this.searchData.checkoutDate;
    this.price = this.villaData.totalPrice;
    this.roomsValue.selectedPeopleSets = this.searchData.rooms;
    this.locationData = this.searchData.locationData;
    this.spickupvalue = this.locationData.label;

    this.totalGuest();
  },

  computed: {
    ...mapState({
      searchData: (state) => state.villaStore.searchData,
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
    totalGuest() {
      let totalAudlt = 0;
      let totalChild = 0;
      for (let i = 0; i < this.roomsValue.selectedPeopleSets.length; i++) {
        totalAudlt += parseInt(this.roomsValue.selectedPeopleSets[i].adults);
        totalChild += parseInt(
          this.roomsValue.selectedPeopleSets[i].childs.length
        );
      }
      this.roomsValue.guests =
        totalAudlt + ' Adults - ' + totalChild + ' Children';
    },
    checkAvailability() {
      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let reqPayload = {
        villaId: this.$route.params.id,
        rooms: this.roomsValue.selectedPeopleSets,
        checkinDate: this.checkInDate,
        checkoutDate: this.checkOutDate,
        desiredResultCurrency: 'USD',
        sessionId: this.searchData.searchId,
      };

      let _searchedPayload = this.doCleanArray(this.searchData);
      reqPayload = this.doCleanArray({ ..._searchedPayload, ...reqPayload });
      delete reqPayload.search;
      delete reqPayload.searchId;
      delete reqPayload.sessionId;

      villaServices
        .getVillaCheckAvailability((reqHeaders, reqPayload))
        .then((response) => {
          this.$store.dispatch('updateSessionId', response.data.data.sessionId);
          if (response.success) {
            evBus.$emit(
              'rooms',
              response.data.data.length == 0 ||
                response.data.data.villaDetails.blockData == 0
                ? []
                : response.data.data.villaDetails.blockData.rooms
            );
          } else {
            evBus.$emit('rooms', []);
          }
        })
        .catch(() => {
          evBus.$emit('rooms', []);
        });
    },
  },
};
</script>
