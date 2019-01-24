import Vue from 'vue'
import Router from 'vue-router'
import control from '@/views/control/control.vue'
import article from '@/views/article/article.vue'


Vue.use(Router)

export default new Router({
   routes: [
      {
         path: '/control',
         name: 'control',
         component: control
      },
      {
         path: '/article',
         name: 'article',
         component: article
      },
   ]
})
