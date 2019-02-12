import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/home/home.vue'
import druginfo from '@/views/druginfo/druginfo.vue'
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
import sign from '@/views/sign/sign.vue'
import signagin from '@/views/signagin/signagin.vue'
import moan from '@/views/moan/moan.vue'
import signsucceed from '@/views/signsucceed/signsucceed.vue'



import cardmy from '@/views/cardmy/cardmy.vue'
import cardwrite from '@/views/cardwrite/cardwrite.vue'
import cardwritesecond from '@/views/cardwritesecond/cardwritesecond.vue'
import cardwriteson from '@/views/cardwriteson/cardwriteson.vue'

import cardneed from '@/views/cardneed/cardneed.vue'
// 
import orderrecord from '@/views/orderrecord/orderrecord.vue'
import orderinfo from '@/views/orderinfo/orderinfo.vue'
import askorder from '@/views/askorder/askorder.vue'
import registrecord from '@/views/registrecord/registrecord.vue'

import inspectionCheck from '@/views/inspectionCheck/inspectionCheck.vue'
import medicalEva from '@/views/medicalEva/medicalEva.vue'
import recipeDetail from '@/views/recipeDetail/recipeDetail.vue'
import slowConfirm from '@/views/slowConfirm/slowConfirm.vue'
import applyDetail from '@/views/applyDetail/applyDetail.vue'
import examine from '@/views/examine/examine.vue'
import onlineEva from '@/views/onlineEva/onlineEva.vue'
import evaContent from '@/views/evaContent/evaContent.vue'
import recipeRecord from '@/views/recipeRecord/recipeRecord.vue'
import selectStore from '@/views/selectStore/selectStore.vue'

import storeInfo from '@/views/storeInfo/storeInfo.vue'
import submitOrder from '@/views/submitOrder/submitOrder.vue'
import acceptAdd from '@/views/acceptAdd/acceptAdd.vue'

import cardconfirm from '@/views/cardconfirm/cardconfirm.vue'



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
      path: '/signsucceed',
      name: 'signsucceed',
      component: signsucceed
    },
    {
      path: '/moan',
      name: 'moan',
      component: moan
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
      path: '/sign',
      name: 'sign',
      component: sign
    },
    {
      path: '/signagin',
      name: 'signagin',
      component: signagin
    },
    {
      path: '/cardmy',
      name: 'cardmy',
      component: cardmy
    },
    {
      path: '/cardwrite',
      name: 'cardwrite',
      component: cardwrite
    },
    {
      path: '/cardwritesecond',
      name: 'cardwritesecond',
      component: cardwritesecond
    },
    {
      path: '/cardwriteson',
      name: 'cardwriteson',
      component: cardwriteson
    },
    {
      path: 'cardconfirm',
      name: 'cardconfirm',
      component: cardconfirm
    },
    {
      path: '/cardneed',
      name: 'cardneed',
      component: cardneed
    },

    {
      path: '/druginfo',
      name: 'druginfo',
      component: druginfo
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
      component: inspectionCheck,
      meta:{keepAlive:true}
    },
    {
      path: '/medicalEva',
      name: 'medicalEva',
      component: medicalEva
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
      path: '/onlineEva',
      name: 'onlineEva',
      component: onlineEva
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
    {
      path: '/evaContent',
      name: 'evaContent',
      component: evaContent
    },
    {
      path: '/recipeRecord',
      name: 'recipeRecord',
      component: recipeRecord
    },
    {
      path: '/orderrecord',
      name: 'orderrecord',
      component: orderrecord
    },
    {
      path: '/orderinfo',
      name: 'orderinfo',
      component: orderinfo
    },
    {
      path: '/selectStore',
      name: 'selectStore',
      component: selectStore
    },
    {
      path: '/askorder',
      name: 'askorder',
      component: askorder
    },
    {
      path: '/registrecord',
      name: 'registrecord',
      component: registrecord
    },
      {
          path: '/storeInfo',
          name: 'storeInfo',
          component: storeInfo
      },
      {
          path: '/submitOrder',
          name: 'submitOrder',
          component: submitOrder,
      },
      {
          path: '/acceptAdd',
          name: 'acceptAdd',
          component: acceptAdd,
          meta:{keepAlive:true}
      },
  ]
})
