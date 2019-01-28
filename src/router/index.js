import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/home/home.vue'
import control from '@/views/control/control.vue'
import online from '@/views/online/online.vue'
import article from '@/views/article/article.vue'
import my from '@/views/my/my.vue'
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
import notice from '@/views/notice/notice.vue'
import lookagain from '@/views/lookagain/lookagain.vue'
import doctorplan from '@/views/doctorplan/doctorplan.vue'
import workdepart from '@/views/workdepart/workdepart.vue'
import workdoctor from '@/views/workdoctor/workdoctor.vue'
import workdotorinfo from '@/views/workdotorinfo/workdotorinfo.vue'
import adress from '@/views/adress/adress.vue'
import fillinfo from '@/views/fillinfo/index.vue'
import identity from '@/views/identity/index.vue'
import idcard from '@/views/idcard/index.vue'
import idcardlist from '@/views/idcardlist/idcardlist.vue'
import adressinfo from '@/views/adressinfo/adressinfo.vue'

import cardmy from '@/views/cardmy/cardmy.vue'

// 



import inspectionCheck from '@/views/inspectionCheck/inspectionCheck.vue'
import medicalEvaluation from '@/views/medicalEvaluation/medicalEvaluation.vue'


Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: index
    },
    {
      path: '/home',
      name: 'home',
      component: index
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/cardmy',
      name: 'cardmy',
      component: cardmy
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
      path: '/online',
      name: 'online',
      component: online
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
    , {
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
      path: '/idcardlist',
      name: 'idcardlist',
      component: idcardlist
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
      path: '/workdepart',
      name: 'workdepart',
      component: workdepart
    },
    {
      path: '/workdoctor',
      name: 'workdoctor',
      component: workdoctor
    },
    {
      path: '/workdotorinfo',
      name: 'workdotorinfo',
      component: workdotorinfo
    },
    {
      path: '/adress',
      name: 'adress',
      component: adress
    },
    {
      path: '/adressinfo',
      name: 'adressinfo',
      component: adressinfo
    },

  ]

})
