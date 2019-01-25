import Vue from 'vue'
import Router from 'vue-router'
import control from '@/views/control/control.vue'
import article from '@/views/article/article.vue'
import inspectionCheck from '@/views/inspectionCheck/inspectionCheck.vue'
import medicalEvaluation from '@/views/medicalEvaluation/medicalEvaluation.vue'


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
       {
           path: '/inspectionCheck',
           name: 'inspectionCheck',
           component: inspectionCheck
       },
       {
           path: '/medicalEvaluation',
           name: 'medicalEvaluation',
           component: medicalEvaluation
       },
   ]
})
