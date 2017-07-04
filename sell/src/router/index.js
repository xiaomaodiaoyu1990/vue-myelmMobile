import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import goods from '../components/goods/goods.vue'
import ratings from '../components/ratings/ratings.vue'
import seller from '../components/seller/seller.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      //name: 'goods',
      component: goods,
      redirect: '/goods',
      children: [
        {path: '/goods', component: goods}
      ]
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    }
  ]
})
