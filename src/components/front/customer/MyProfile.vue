<template>
  <span style="display: block !important" class="pt-10 back-office-page2">
    <section class="auth-login-screen" style="margin-top: 60px">
      <v-container>
        <v-row class="justify-center" style="margin-bottom: 61px">
          <div class="col-lg-8 col-11 profile-page-heading">
            <h1 class="heading-first" v-if="AgentData.replicating != undefined">
              {{ AgentData.replicating.company }}
            </h1>
            <h2
              class="heading-secound"
              v-if="AgentData.replicating != undefined"
            >
              {{ AgentData.replicating.slogan }}
            </h2>
          </div>

          <div class="col-lg-10 col-11 profile-form py-10">
            <div class="w-100 profile-img-wrapper">
              <div class="profile-img w-100">
                <img
                  class="img-center"
                  :src="agentImg"
                  alt=""
                  style="width: 200px"
                />
              </div>
            </div>

            <div class="agent px-4 py-2">
              <h4 class="agent-name">
                {{ AgentData.firstName }} {{ AgentData.lastName }}
              </h4>
              <span>Independent Travel Agent</span>
            </div>
            <div class="col-lg-12 py-5 details-wrapper">
              <div class="row py-4 details-row-wrapper" style="">
                <div class="col-md-4 detalis-row">
                  <i class="fas fa-phone-alt"></i> {{ AgentData.phone }}
                </div>
                <div class="col-md-4 detalis-row">
                  <i class="fas fa-map-marker-alt"></i> {{ AgentData.city }},
                  {{ AgentData.country }}
                </div>
                <div class="col-md-4 detalis-row">
                  <i class="fas fa-envelope"></i> {{ AgentData.email }}
                </div>
              </div>
            </div>
            <div class="review">
              <span class="review-text">Everything is Awesome!!!!</span>
            </div>
            <div class="review pt-2">
              <img
                :src="require('@/assets/images/verify-seal-rm.png').default"
                alt=""
                style="width: 114px"
              />
              <span class="review-text-sec">CERTIFICATIONS</span>
            </div>
          </div>
        </v-row>
      </v-container>
    </section>
  </span>
</template>
<script>
import apiClient from '@/services/api/Auth';
import { mapState } from 'vuex';
import { evBus } from '@/services/bus.js';
export default {
  name: 'Profile',
  components: {},
  data() {
    return {
      AgentData: '',
      AgentPin: '',
      agentImg: '',
    };
  },

  computed: {
    ...mapState({
      agentDetails: (state) => state.authStore,
    }),
  },

  mounted: function () {
    this.UserData();

    evBus.$emit('toggleBannerDisplay', true);
  },

  methods: {
    UserData() {
      let reqHeaders = {
        headers: {
          Authorization: 'Bearer ' + this.authStore.token,
        },
      };
      let reqPayLoad = {
        refagentpin:
          this.agentDetails.user[0].agent.pin == undefined
            ? this.agentDetails.user[0].agent.vcPIN
            : this.agentDetails.user[0].agent.pin,
      };
      apiClient.auth.getAgentDetail(reqPayLoad, reqHeaders).then((rsp) => {
        this.AgentData = rsp.data.data;
        this.agentImg =
          'https://www.inteletravel.com/inteletraveler/agentimages/' +
          this.AgentData.agentPin +
          '.jpg';
      });
    },
  },
};
</script>

<style>
.back-office-page2 {
  background: url('../../../assets/images/backoffice-light.png') no-repeat
    center center / cover !important;
  padding-top: 100px !important;
}

@media (max-width: 700.98px) {
  .back-office-page2 {
    background: url('../../../assets/images/MOB-Profile.png') no-repeat center
      center / cover !important;
    padding-top: 100px !important;
  }
}

.profile-form {
  background: #e8ebf0 !important;
  margin-top: 100px;
  position: relative;
  margin-bottom: 50px;
}
</style>
