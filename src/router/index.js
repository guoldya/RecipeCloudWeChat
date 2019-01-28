import Vue from 'vue'
import Router from 'vue-router'

import control from '@/views/control/control.vue'
import article from '@/views/article/article.vue'

import appoint from '@/views/appoint/appoint.vue'
import appointinfo from '@/views/appointinfo/appointinfo.vue'
import choosedepart from '@/views/choosedepart/choosedepart.vue'
import result from '@/views/result/result.vue'
import feeinfo from '@/views/feeinfo/feeinfo.vue'
import feerecord from '@/views/feerecord/feerecord.vue'
import feesucces from '@/views/feesucces/feesucces.vue'
import doctor from '@/views/doctordetail/doctor.vue'
import payment from '@/views/payment/payment.vue'
import doctorList from '@/views/doctorList/doctorList.vue'
import reportquery from '@/views/reportquery/reportquery.vue'
import reportinfo from '@/views/reportinfo/reportinfo.vue'
import lineupnow from '@/views/lineupnow/lineupnow.vue'
import lineupinfo from '@/views/lineupinfo/lineupinfo.vue'
import home from '@/views/home/home.vue'
import notice from '@/views/notice/notice.vue'
import lookagain from '@/views/lookagain/lookagain.vue'
import doctorplan from '@/views/doctorplan/doctorplan.vue'


// thh

import fillinfo from '@/views/fillinfo/index.vue'
import identity from '@/views/identity/index.vue'
import idcard from '@/views/idcard/index.vue'

// 



import inspectionCheck from '@/views/inspectionCheck/inspectionCheck.vue'
import medicalEvaluation from '@/views/medicalEvaluation/medicalEvaluation.vue'
import recipeDetail from '@/views/recipeDetail/recipeDetail.vue'
import slowConfirm from '@/views/slowConfirm/slowConfirm.vue'
import applyDetail from '@/views/applyDetail/applyDetail.vue'
import examine from '@/views/examine/examine.vue'


Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/home',
      name: 'home',
      component: home
    },
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
      path: '/appoint',
      name: 'appoint',
      component: appoint
    },
    {
      path: '/appointinfo',
      name: 'appointinfo',
      component: appointinfo
    },
    {
      path: '/choosedepart',
      name: 'choosedepart',
      component: choosedepart
    },
    {
      path: '/result',
      name: 'result',
      component: result
    },
    {
      path: '/feeinfo',
      name: 'feeinfo',
      component: feeinfo
    },
    {
      path: '/feerecord',
      name: 'feerecord',
      component: feerecord
    },
    {
      path: '/feesucces',
      name: 'feesucces',
      component: feesucces
    },
    {
      path: '/payment',
      name: 'payment',
      component: payment
    },
    {
      path: '/doctorList',
      name: 'doctorList',
      component: doctorList
    },
    {
      path: '/doctordetail',
      name: 'doctordetail',
      component: doctor
    }, {
      path: '/reportquery',
      name: 'reportquery',
      component: reportquery
    },
    {
      path: '/reportinfo',
      name: 'reportinfo',
      component: reportinfo
    },
     {
      path: '/lineupnow',
      name: 'lineupnow',
      component: lineupnow
    },
    {
      path: '/lineupinfo',
      name: 'lineupinfo',
      component: lineupinfo
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice
    },

    {
      path: '/fillinfo',
      name: 'fillinfo',
      component: fillinfo
    },
    {
      path: '/lookagain',
      name: 'lookagain',
      component: lookagain
    },
    {
      path: '/identity',
      name: 'identity',
      component: identity
    },
    {
      path: '/idcard',
      name: 'idcard',
      component: idcard
    },
    {
      path: '/doctorplan',
      name: 'doctorplan',
      component: doctorplan
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
      {
          path: '/recipeDetail',
          name: 'recipeDetail',
          component: recipeDetail
      },
      {
          path: '/slowConfirm',
          name: 'slowConfirm',
          component: slowConfirm
      },
      {
          path: '/applyDetail',
          name: 'applyDetail',
          component: applyDetail
      },
      {
          path: '/examine',
          name: 'examine',
          component: examine
      },

  ]

})
