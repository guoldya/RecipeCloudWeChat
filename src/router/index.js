import Vue from 'vue'
import Router from 'vue-router'
import control from '@/views/control/control.vue'



Vue.use(Router)

export default new Router({
   routes: [
      {
         path: '/control',
         name: 'control',
         component: control
      },

   ]
})
