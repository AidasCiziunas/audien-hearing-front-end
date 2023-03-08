import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active active',
  base: process.env.BASE_URL,
  routes: [
    // Autheticated Only
    {
      path: '/',
      name: 'Backend',
      slug: 'fb',
      component: () => import('./views/layouts/Backend.vue'),
      redirect: { name: 'HOME' },

      banner: true,
      children: [
        {
          path: '/',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/index.vue'),

          external: !JSON.parse(process.env.VUE_APP_ALLOW_HOME_TAB),
          banner: true,
        },
        {
          path: '/birth-day',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/BirthDay.vue'),

          external: !JSON.parse(process.env.VUE_APP_ALLOW_HOME_TAB),
          banner: true,
        },
        {
          path: '/best-result',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/bestResult.vue'),

          external: !JSON.parse(process.env.VUE_APP_ALLOW_HOME_TAB),
          banner: true,
        },
        {
          path: '/adjust-volume',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/adjust-volume.vue'),

          external: !JSON.parse(process.env.VUE_APP_ALLOW_HOME_TAB),
          banner: true,
        },
        {
          path: '/ear-select',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/ear.vue'),

          external: !JSON.parse(process.env.VUE_APP_ALLOW_HOME_TAB),
          banner: true,
        },
        {
          path: '/instruction',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/instruction.vue'),

          external: !JSON.parse(process.env.VUE_APP_ALLOW_HOME_TAB),
          banner: true,
        },
        {
          path: '/hearing-test',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/hearing-test.vue'),

          external: !JSON.parse(process.env.VUE_APP_ALLOW_HOME_TAB),
          banner: true,
        },
        {
          path: '/completing-hearing',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/completing.vue'),

          external: !JSON.parse(process.env.VUE_APP_ALLOW_HOME_TAB),
          banner: true,
        },
        {
          path: '/result',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/result.vue'),

          external: !JSON.parse(process.env.VUE_APP_ALLOW_HOME_TAB),
          banner: true,
        },
        {
          path: '/disclaimer',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/disclaimer.vue'),

          external: !JSON.parse(process.env.VUE_APP_ALLOW_HOME_TAB),
          banner: true,
        },
        {
          path: '/aid-simulator',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/aid-simulator.vue'),

          external: !JSON.parse(process.env.VUE_APP_ALLOW_HOME_TAB),
          banner: true,
        },
        {
          path: '/finish',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/finish.vue'),

          external: !JSON.parse(process.env.VUE_APP_ALLOW_HOME_TAB),
          banner: true,
        },
      ],
    }]
});

export default router;
