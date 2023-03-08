<template>
  <div class="">
    <app-navigation />
    <router-view style="display: block"></router-view>
    <!-- <app-footer /> -->
  </div>
</template>
<script>
import AppNavigation from '@/components/partials/app/AppNavigation';
import AppFooter from '@/components/partials/app/AppFooter';
import AppDialog from '@/components/partials/app/AppDialog';
import AppInfoBox from '@/components/partials/app/AppInfoBox';
import { evBus } from '@/services/bus.js';
import LocalStorageService from '@/config/LocalStorageService';

export default {
  name: 'Front',
  components: {
    AppNavigation,
    AppFooter,
    AppDialog,
    AppInfoBox,
  },
  data() {
    return {
      displayBanner: true,
    };
  },
  created: function () {
    evBus.$on('toggleBannerDisplay', (setDisplay) => {
      this.displayBanner = setDisplay;
    });
  },

  mounted() {
    this.$store.dispatch('setSiteScope', LocalStorageService.getAppDomain());
  },

  methods: {
    getBannerImage() {
      let defaultImage = 'banner-villa';

      if (this.currentRouteName == 'My CARS') defaultImage = 'banner-car';

      if (
        this.currentRouteName == 'My HOTELS' ||
        this.currentRouteName == 'choose-room'
      )
        defaultImage = 'banner-hotel';

      if (this.currentRouteName == 'My FLIGHTS') defaultImage = 'banner-flight';

      if (
        this.currentRouteName == 'My Villas' ||
        this.currentRouteName == 'Choose Room'
      )
        defaultImage = 'banner-villa';

      if (
        this.currentRouteName == 'My Activities' ||
        this.currentRouteName == 'room-activity'
      )
        defaultImage = 'banner-activity';

      return defaultImage;
    },
  },
};
</script>

<style></style>
