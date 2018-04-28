import Vue from 'vue'
import Router from 'vue-router'
import Scenery from '@/views/Scenery.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/scenery',
      name: 'Scenery',
      components: {
        default: Scenery
      }
    }
  ]
})
