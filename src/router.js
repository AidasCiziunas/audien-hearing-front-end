import Vue from 'vue';
import Router from 'vue-router';
import apiClient from '@/config/axios';
import store from './store';
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

         
          banner: true,
        },
        {
          path: '/birth-day',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/BirthDay.vue'),

         
          banner: true,
        },
        {
          path: '/best-result',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/bestResult.vue'),

        
          banner: true,
        },
        {
          path: '/adjust-volume',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/adjust-volume.vue'),

         
          banner: true,
        },
        {
          path: '/ear-select',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/ear.vue'),

       
          banner: true,
        },
        {
          path: '/instruction',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/instruction.vue'),

        
          banner: true,
        },
        {
          path: '/hearing-test',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/hearing-test.vue'),

       
          banner: true,
        },
        {
          path: '/completing-hearing',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/completing.vue'),

      
          banner: true,
        },
        {
          path: '/result',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/result.vue'),

       
          banner: true,
        },
        {
          path: '/disclaimer',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/disclaimer.vue'),

        
          banner: true,
        },
        {
          path: '/aid-simulator',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/aid-simulator.vue'),

        
          banner: true,
        },
        {
          path: '/finish',
          name: 'HOME',
          slug: 'fb',
          component: () => import('./views/audien/finish.vue'),

        
          banner: true,
        },
      ],
    }]
});

router.beforeEach((to, from, next)=>{
  console.log(store.state.HearingTest.ID);
  if(store.state.HearingTest.ID){
   
  apiClient.get("user-added-data?id="+store.state.HearingTest.ID,{}).then((response)=>{
    console.log(response);
    store.dispatch('maintainHistory',response.data.data)
    next()
  })
  console.log("3232323");
}
  next()
  
})

export default router;
