<template>
  <div v-bind:class="[bookingExist == true ? 'col-lg-9' : 'col-lg-12']">
    <v-expansion-panels>
      <v-expansion-panel v-for="(activity, index) in compResults" :key="index">
        <div class="single-listing-repeat">
          <div class="single-listing">
            <div
              class="main-left car-left-box hotel-main-left activity-main-left"
            >
              <div class="hotel-name activity-listing-img">
                <div
                  class="product-text hotel-product-text activity-product-text"
                >
                  <star-rating
                    :star-size="15"
                    :border-width="1"
                    border-color="#fff"
                    :rounded-corners="true"
                    :star-points="[
                      23,
                      2,
                      14,
                      17,
                      0,
                      19,
                      10,
                      34,
                      7,
                      50,
                      23,
                      43,
                      38,
                      50,
                      36,
                      34,
                      46,
                      19,
                      31,
                      17
                    ]"
                    :rating="Number(Math.round(activity.starRating))"
                    :read-only="true"
                    :show-rating="false"
                    style="padding-top: 5px;"
                  >
                  </star-rating>
                  <div class="activity-reviews" v-if="activity.reviewCount > 0">
                    <p>({{ activity.reviewCount }} Review)</p>
                  </div>
                  <h3 class="hotel-name  activity-name">
                    {{ activity.title }}
                  </h3>
                </div>
                <div class="product-img">
                  <img
                    v-bind:src="activity.images[0].variants[12].url"
                    alt="img"
                  />
                </div>
                <div class=" activity-outer-right">
                  <div class="product-specs hotel-product-specs">
                    <p>
                      {{ activity.categories.string.toString() }}
                    </p>
                  </div>
                  <div class="activity-anitmiteis">
                    <ul v-if="typeof activity.subCategories.string == 'string'">
                      <li>
                        <i class="fas fa-tags"></i>
                        <p>{{ activity.subCategories.string }}</p>
                      </li>
                    </ul>

                    <activity-sub-categories
                      v-else
                      :subCategories="activity.subCategories.string"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="hotel-main-right">
              <div class="product-reverse hotel-product-reverse">
                <p>Prices From</p>
                <h2>
                  {{ globalData.CSymbol
                  }}<span>{{ activity.finalPrice }} </span>
                </h2>
                <button
                  type="button"
                  class="btn-save v-btn v-btn--is-elevated v-btn--has-bg theme--light 
          v-size--default error"
                  @click="viewActivity(activity, activity.activityId)"
                >
                  <span class="v-btn__content">
                    View Activity
                  </span>
                </button>
                <p class="status-blue" v-if="activity.free_cancellation">
                Free Cancellation
                </p>

                <v-expansion-panel-header
                  @click="activity.expanded = !activity.expanded"
                >
                  <div class="collpase-heading">
                    <span v-if="!activity.expanded">Show Details</span>
                    <span v-if="activity.expanded"> Hide Details</span>
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
                <v-card-text v-html="activity.description"> </v-card-text>
              </v-card>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ActivityServices from '@/services/api/Activity';
import ActivityHelper from '@/helper/ActivityHelper.js';
import countryCodes from '@/services/data/countraycodes';
import StarRating from 'vue-star-rating';
import ActivitySubCategories from './ActivitySubCategories.vue';
export default {
  name: 'ActivityListResult',
  props: ['searchAgain', 'results', 'panel'],
  mixins: [ActivityHelper],
  components: {
    StarRating,
    ActivitySubCategories
  },
  data() {
    return {
      readMore: 'a',
      cCodes: countryCodes,
      envData: this.$store.getters.envInfo,
      expanded: false
    };
  },

  methods: {
    viewActivity(selectedActivity, activityId) {

      let reqHeaders = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      let reqPayLoad = {
        sessionId: this.ActivityStore.sessionId,
        activityId: activityId
      };

      ActivityServices.getActivityDetail((reqHeaders, reqPayLoad)).then(
        response => {
          if (
            response.data.errors.message ==
            'Session Expired. Please initiate a new search request.'
          ) {
            this.$awn.success(
              'Your being timed out due to inactivity, Please try View Activity again !'
            );

            this.$emit('resetSearch', activityId);
          } else if (response.data.message == 'Activity detail not found.') {
            this.$awn.alert(response.data.message);
          } else {
            console.log({selectedActivity});
            this.$store.dispatch('setOngoingParentActivity', this.doCleanArray(selectedActivity));

            this.$store
              .dispatch(
                'setindividualActivityDetail',
                response.data.data.activityDetail
              )
              .then(() => {
                this.$store.dispatch('reSetActivityAvailabilityData');
                this.$router.push({
                  name: 'room-activity',
                  params: {
                    id: activityId
                  }
                });
              });
          }
        }
      );
    }
  },

  computed: {
    ...mapState({
      globalData: state => state.envStore,
      ActivityStore: state => state.ActivityStore,
      searchData: state => state.ActivityStore.searchData
    }),
    activeDomain() {
      return this.envData.domain;
    },
    compResults() {
      return this.results;
    }
  }
};
</script>
<style scoped>
.hotel-product-varify ul li i {
  color: #949494;
  margin-right: 5px;
  font-size: 18px;
}

.product-specs.hotel-product-specs ul li {
  width: 9% !important;
  text-align: left;
}

.paragraph {
  font-size: 13px;
  color: #454850;
  padding-top: 10px;
}
</style>
