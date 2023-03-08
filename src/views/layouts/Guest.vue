<template>
  <div class="v-main v-main__wrap" style="display: block !important">
    <app-navigation />

    <main class="login-page">
      <router-view style="display: block"></router-view>
    </main>

    <app-footer />

    <app-info-box />
  </div>
</template>
<script>
import AppNavigation from '@/components/partials/app/AppNavigation';
import AppFooter from '@/components/partials/app/AppFooter';
import AppInfoBox from '@/components/partials/app/AppInfoBox';
import LocalStorageService from '@/config/LocalStorageService';

export default {
  name: 'Guest',
  components: {
    AppNavigation,
    AppFooter,
    AppInfoBox,
  },
  mounted() {
    let app_domain = process.env.VUE_APP_DOMAIN;

    let has_valid_domain = this.getDomainName();

    if (has_valid_domain) app_domain = has_valid_domain;

    this.$store.dispatch('setSiteScope', app_domain);

    LocalStorageService.setAppDomain(app_domain);
  },
};
</script>
<style></style>
