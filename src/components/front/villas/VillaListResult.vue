<template>
  <div
    class="col-md-12 listArea"
    v-bind:class="[bookingExist == true ? 'nnn col-lg-9' : 'col-lg-12']"
  >
    <v-expansion-panels>
      <v-expansion-panel
        v-for="(villa, index) in compResults"
        :key="'A' + index"
      >
        <div class="single-listing-repeat">
          <div class="single-listing">
            <div class="main-left car-left-box hotel-main-left">
              <div class="hotel-name">
                <div class="product-text hotel-product-text">
                  <div class="rating-row" style="margin: 10px 0px 0px 0px">
                    <div style="margin: 20px 0px 20px 0px">
                      <span class="hotelTotalStar">
                        <star-rating
                          :star-size="15"
                          :border-width="1"
                          border-color="#fff"
                          :rounded-corners="true"
                          :star-points="[
                            23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50,
                            36, 34, 46, 19, 31, 17,
                          ]"
                          :rating="Number(Math.round(villa.starRating))"
                          :show-rating="false"
                          :read-only="true"
                        >
                        </star-rating>
                      </span>
                    </div>
                  </div>

                  <span class="hotel-star hotel-star-villa">
                    <span v-if="villa.review_nr || villa.review_nr > 0"
                      >({{ villa.review_nr }}) Reviews</span
                    >
                  </span>
                  <h3>
                    {{ villa.displayName }}
                  </h3>
                  <p>
                    <i class="fas fa-map-marker-alt"></i>
                    {{ villa.address }} &nbsp;
                    <i class="fas fa-road"> </i>
                    {{ villa.distance }}
                    {{ villa.distanceUnit }}
                  </p>
                </div>
                <div class="product-img">
                  <span v-if="villa.breakfast_included" class="ribbon"
                    >Breakfast included</span
                  >
                  <img v-bind:src="villa.img" alt="img" />
                </div>

                <div class="outer-right hotel-outer-right hhh-col-hotel-outer">
                  <div class="product-reviews hotel-product-reviews bb">
                    <div class="in-left hotel-in-left">
                      <ul>
                        <li>
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <i
                                class="fas fa-bed"
                                v-bind="attrs"
                                v-on="on"
                              ></i>
                              {{ villa.nbrOfBedrooms }}
                            </template>
                            <span
                              >up to
                              {{ villa.nbrOfBedrooms }}
                              Bedrooms</span
                            >
                          </v-tooltip>
                        </li>
                        <li>
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <i
                                class="fas fa-users"
                                v-bind="attrs"
                                v-on="on"
                              ></i>
                              {{ villa.maxOccupancy }}
                            </template>
                            <span
                              >up to
                              {{ villa.maxOccupancy }}
                              Guests</span
                            >
                          </v-tooltip>
                        </li>
                        <li>
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <i
                                class="fas fa-bath"
                                v-bind="attrs"
                                v-on="on"
                              ></i>
                              {{ villa.nbrOfBathrooms }}
                            </template>
                            <span
                              >up to
                              {{ villa.nbrOfBathrooms }}
                              Bathrooms</span
                            >
                          </v-tooltip>
                        </li>
                      </ul>
                    </div>
                    <div class="in-right hotel-in-right"></div>
                  </div>
                  <div
                    class="product-specs hotel-product-specs b-bottom-0"
                    v-for="(room, index) in villa.rooms"
                    :key="index"
                  >
                    <p>
                      <b
                        ><i class="fas fa-user"></i> x
                        {{ room.persons.adult + room.persons.child }}
                        &nbsp;
                        {{ room.name }}
                      </b>

                      <span class="">
                        {{ room.policies.POLICY_PRE_PAYMENT }}
                      </span>

                      <span>{{ room.policies.POLICY_CANCELLATION }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="hotel-main-right">
              <div class="product-reverse hotel-product-reverse">
                <p class="p-form">Prices From:</p>
                <h2>
                  {{ CSymbol }}<span>{{ villa.totalPrice | toFixed }} </span>
                </h2>
                <p>
                  {{ totalNights }}
                  <span class="nightColor" v-if="totalNights == 1">night,</span>
                  <span class="nightColor" v-if="totalNights > 1">nights,</span>
                  {{ personCount(villa.rooms) }}
                </p>
                <button
                  @click.prevent="viewVilla(villa.villaId)"
                  type="button"
                  class="btn-save v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default error"
                >
                  <span class="v-btn__content"> Choose Rooms </span>
                </button>
                <ul class="villa-fee-canellation">
                  <li v-if="villa.refundable">
                    <p class="status-blue">Free Cancellation
                      <span class="break"></span>
                      Refundable</p>
                  </li>
                </ul>

                <v-expansion-panel-header @click="doMeToggle(villa)">
                  <div class="collpase-heading">
                    <span v-if="!villa.expanded">Show Details</span>
                    <span v-if="villa.expanded">Hide Details</span>
                  </div>
                </v-expansion-panel-header>
              </div>
            </div>
          </div>
        </div>
        <v-expansion-panel-content>
          <div class="car-listing-tabs-outer">
            <div class="car-listing-tabs">
              <v-card flat>
                <v-card-text v-text="villa.villaDescription"></v-card-text>
              </v-card>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import VillaHelper from '@/helper/VillaHelper.js';
import villaServices from '@/services/api/Villa';
import { mapState } from 'vuex';
import StarRating from 'vue-star-rating';

export default {
  name: 'VillaListResult',
  props: ['searchAgain', 'results', 'panel', 'totalNights'],
  mixins: [VillaHelper],
  components: { StarRating },
  data() {
    return {};
  },

  methods: {
    doMeToggle(infos) {
      this.results.find((o) => {
        if (o.villaId == infos.villaId) {
          o.expanded = !o.expanded;
        } else {
          o.expanded = false;
        }
      });

      this.$forceUpdate();
    },

    stars(number) {
      if (number) {
        return Number(number);
      } else return 0;
    },

    viewVilla(villaId) {
      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let reqPayLoad = {
        sessionId: this.VillaStore.sessionId,
        villaId: villaId,
      };

      villaServices
        .getVillaDetails(reqPayLoad, reqHeaders)
        .then((response) => {
          if (response.data.errors.message == 'Session is expired.') {
            this.$awn.success(
              'Your being timed out due to inactivity, Please try View Villa again !'
            );
            this.$emit('resetSearch', villaId);
            this.searchAgain();
          } else if (
            response.data.message == 'Villa detail not found in search.'
          ) {
            this.$awn.alert(
              'We have not received the details needed from our supplier to view this Villa . Please select another Villa.'
            );
          } else if (
            response.data.message ==
            'Sorry, No results matched your search, please try again'
          ) {
            this.$awn.alert(
              'Sorry Search Data Not Found, please try another Villa'
            );
          } else {
            this.$router.push({
              name: 'Choose Room',
              params: { id: villaId },
            });
          }
        })
        .catch((err) => {
          if (err.response)
            this.$awn.alert(
              'Sorry Search Data Not Found, please initiate new request.'
            );

          let that = this;
          that.$sentry.withScope(function (scope) {
            scope.setExtra('villa sessionId', that.VillaStore.sessionId);
            that.$sentry.captureException(new Error(err));
          });
        });
    },

    makeTabAbles: function (arrOfObj) {
      let result = arrOfObj.map(function (el) {
        var o = Object.assign({}, el);
        o.expanded = false;
        return o;
      });

      return result;
    },
  },

  computed: {
    ...mapState({
      globalData: (state) => state.envStore,
      VillaStore: (state) => state.villaStore,
      searchData: (state) => state.villaStore.searchData,
      CType: (state) => state.envStore.CType,
      CSymbol: (state) => state.envStore.CSymbol,
      DFormat: (state) => state.envStore.DFormat,
      countryDF: (state) => state.envStore.countryDF,
      domain: (state) => state.envStore.domain,
      urlDomain: (state) => state.envStore.urlDomain,
    }),

    activeDomain() {
      return this.$store.state.envStore.domain;
    },
    compResults() {
      return this.results;
    },
  },

  filters: {
    toFixed(value) {
      value = parseFloat(value);
      return value.toFixed(2);
    },
  },
};
</script>
<style scoped>
.nightColor {
  color: #737578;
}
</style>
