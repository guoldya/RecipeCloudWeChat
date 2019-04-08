import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/home/home.vue'
import druginfo from '@/views/druginfo/druginfo.vue'
import online from '@/views/onlines/online/online.vue'
import article from '@/views/article/article.vue'
import inquiryOnline from '@/views/onlines/inquiryOnline'
import my from '@/views/my/my.vue'
import appoint from '@/views/appoint/appoint.vue'
import appointinfo from '@/views/appointinfo/appointinfo.vue'
import choosedepart from '@/views/choosedepart/choosedepart.vue'
import choosehospital from '@/views/choosehospital/choosehospital.vue'
import hospitalsearch from '@/views/choosehospital/hospitalsearch/hospitalsearch.vue'
import hospitalresult from '@/views/choosehospital/hospitalresult/hospitalresult.vue'
import lostpage from '@/views/resultpage/lostpage/lostpage.vue'


import result from '@/views/result/result.vue'
import feeinfo from '@/views/feeinfo/feeinfo.vue'
import feerecord from '@/views/feerecord/feerecord.vue'
import feesucces from '@/views/feesucces/feesucces.vue'
import doctor from '@/views/doctordetail/doctor.vue'
import payment from '@/views/payment/payment.vue'
import doctorList from '@/views/doctorList/doctorList.vue'
import reportrecord from '@/views/reportrecord/reportrecord.vue'
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
import cardblind from '@/views/cardblind/cardblind.vue'
import cardhave from '@/views/cardhave/cardhave.vue'
import resultdocotor from '@/views/resultdocotor/resultdocotor.vue'
import registrecorddetail from '@/views/registrecorddetail/registrecorddetail.vue'
import doctorschedu from '@/views/doctorschedu/doctorschedu.vue'



import cardmy from '@/views/cardmy/cardmy.vue'
import cardwrite from '@/views/cardwrite/cardwrite.vue'
import cardwritesecond from '@/views/cardwritesecond/cardwritesecond.vue'
import cardwriteson from '@/views/cardwriteson/cardwriteson.vue'

import cardneed from '@/views/cardneed/cardneed.vue'

import unblind from '@/views/unblind/unblind.vue'

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
import paySuccess from '@/views/paySuccess/paySuccess.vue'
import recordDetail from '@/views/recordDetail/recordDetail.vue'
import examineDetail from '@/views/examineDetail/examineDetail.vue'
import examineOrder from '@/views/examineOrder/examineOrder.vue'
import expertpage from '@/views/onlines/expertpage/expertpage.vue'



import reservation from '@/views/reservation/reservation.vue'
import storeInfo from '@/views/storeInfo/storeInfo.vue'
import submitOrder from '@/views/submitOrder/submitOrder.vue'
import acceptAdd from '@/views/acceptAdd/acceptAdd.vue'

import cardconfirm from '@/views/cardconfirm/cardconfirm.vue'
import register from '@/views/register/register.vue'
import inpatient from '@/views/inhospital/inpatient/inpatient.vue'
import payfee from '@/views/inhospital/payfee/payfee.vue'
import paymeet from '@/views/inhospital/paymeet/paymeet.vue'
import quickpay from '@/views/inhospital/quickpay/quickpay.vue'
import admission from '@/views/inhospital/admission/admission.vue'
import dayof from '@/views/inhospital/dayof/dayof.vue'



import followDoctor from '@/views/onlines/followDr'
import inquiryRecord from '@/views/onlines/inquiryRecord'
import consultDetail from '@/views/onlines/consultDetail'
import buyService from '@/views/onlines/buyService'
import pictureConsult from '@/views/onlines/pictureConsult'
import selectPeople from '@/views/onlines/selectPeople'
import addPeople from '@/views/onlines/addPeople'
import seeCase from '@/views/onlines/seeCase'
import inspectionReport from '@/views/onlines/inspectionReport'
import caseDetail from '@/views/onlines/caseDetail'
import inspectionDetail from '@/views/onlines/inspectionDetail'

import business from '@/views/copyrecord/business/business.vue'
import chooseCase from '@/views/copyrecord/chooseCase/chooseCase.vue'
import copyresult from '@/views/copyrecord/copyresult/copyresult.vue'
import certificate from '@/views/copyrecord/certificate/certificate.vue'
import putinfo from '@/views/copyrecord/putinfo/putinfo.vue'




import resultDoctor from '@/views/resultDr/result.vue'

import privacy from '@/views/appwarn/privacy/privacy.vue'
import agreement from '@/views/appwarn/agreement/agreement.vue'



Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    name: 'home',
    component: index,
    // meta: {
    //   keepAlive: true
    // }
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/inpatient',
    name: 'inpatient',
    component: inpatient
  },
  {
    path: '/payfee',
    name: 'payfee',
    component: payfee
  },
  {
    path: '/paymeet',
    name: 'paymeet',
    component: paymeet
  },
  {
    path: '/quickpay',
    name: 'quickpay',
    component: quickpay
  },
  {
    path: '/admission',
    name: 'admission',
    component: admission,
    meta: {
      title: '入院办理'
    }
  },
  {
    path: '/dayof',
    name: 'dayof',
    component: dayof,
    meta: {
      title: '一日清单'
    }
  },
  {
    path: '/resultdocotor',
    name: 'resultdocotor',
    component: resultdocotor
  },
  {
    path: '/reservation',
    name: 'reservation',
    component: reservation
  },
  {
    path: '/reportrecord',
    name: 'reportrecord',
    component: reportrecord
  },
  {
    path: '/signsucceed',
    name: 'signsucceed',
    component: signsucceed
  },
  {
    path: '/cardhave',
    name: 'cardhave',
    component: cardhave
  },
  {
    path: '/unblind',
    name: 'unblind',
    component: unblind
  },

  {
    path: '/cardblind',
    name: 'cardblind',
    component: cardblind
  },
  {
    path: '/moan',
    name: 'moan',
    component: moan
  },
  {
    path: '/my',
    name: 'my',
    component: my,
    meta: {
      title: '个人中心',
      keepAlive: true
    }
  },
  {
    path: '/sign',
    name: 'sign',
    component: sign,
    meta: {
      title: '就诊签到'
    }
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
    component: online,
    meta: {
      title: '在线问诊',
      keepAlive: true
    }
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
    component: result,
    meta: {
      title: '搜索'
    }
  },
  {
    path: '/resultDoctor',
    name: 'resultDoctor',
    component: resultDoctor,
    meta: {
      title: '搜索'
    }
  },
  {
    path: '/feeinfo',
    name: 'feeinfo',
    component: feeinfo
  },
  {
    path: '/feerecord',
    name: 'feerecord',
    component: feerecord,
    // meta: { keepAlive: true }
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
    component: reportquery,
  },
  {
    path: '/reportinfo',
    name: 'reportinfo',
    component: reportinfo,
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
    component: idcardlist,
    meta: {
      title: '管理就诊卡'
    }
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
    meta: {
      keepAlive: true
    }
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
    path: '/expertpage',
    name: 'expertpage',
    component: expertpage
  },
  {
    path: '/adress',
    name: 'adress',
    component: adress,
      meta: {
          keepAlive: true
      }
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
    component: recipeRecord,
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
    path: '/paySuccess',
    name: 'paySuccess',
    component: paySuccess,
  },
  {
    path: '/recordDetail',
    name: 'recordDetail',
    component: recordDetail,
  },
  {
    path: '/examineDetail',
    name: 'examineDetail',
    component: examineDetail,
  },
  {
    path: '/examineOrder',
    name: 'examineOrder',
    component: examineOrder,
  },
  {
    path: '/acceptAdd',
    name: 'acceptAdd',
    component: acceptAdd,
    meta: {
      keepAlive: true
    }
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
    path: '/registrecorddetail',
    name: 'registrecorddetail',
    component: registrecorddetail,
  },
  {
    path: '/doctorschedu',
    name: 'doctorschedu',
    component: doctorschedu,
  },
  {
    path: '/followDoctor',
    name: 'followDoctor',
    component: followDoctor,
    meta: {
      title: '关注的医生'
    }
  }, {
    path: '/inquiryRecord',
    name: 'inquiryRecord',
    component: inquiryRecord,
    meta: {
      title: '问诊记录'
    }
  },
  {
    path: '/consultDetail',
    name: 'consultDetail',
    component: consultDetail,
    meta: {
      title: '医生详情'
    }
  },
  {
    path: '/inquiryOnline/:fromId',
    name: 'inquiryOnline',
    component: inquiryOnline,
    meta: {
      title: '问诊详情',
      auth: true
    }
  },
  {
    path: '/business',
    name: 'business',
    component: business,
  },
  {
    path: '/certificate',
    name: 'certificate',
    component: certificate
  }, {
    path: '/putinfo',
    name: 'putinfo',
    component: putinfo
  },
  {
    path: '/chooseCase',
    name: 'chooseCase',
    component: chooseCase,
    meta: {
      title: "选择复印病案"
    }
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: privacy,
    meta: {
      title: "处方云隐私政策"
    }
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: agreement,
    meta: {
      title: "用户协议"
    }
  },

  {
    path: '/copyresult',
    name: 'copyresult',
    component: copyresult,
    meta: {
      title: "支付确认"
    }
  },

  {
    path: '/buyService',
    name: 'buyService',
    component: buyService,
    meta: {
      title: '购买服务'
    }
  }, {
    path: '/pictureConsult',
    name: 'pictureConsult',
    component: pictureConsult,
    meta: {
      title: '图文咨询'
    }
  }, {
    path: '/selectPeople',
    name: 'selectPeople',
    component: selectPeople,
    meta: {
      title: '选择就诊人'
    }
  }, {
    path: '/addPeople',
    name: 'addPeople',
    component: addPeople,
    meta: {
      title: '添加就诊人'
    }
  }, {
    path: '/seeCase',
    name: 'seeCase',
    component: seeCase,
    meta: {
      title: '查看病例'
    }
  }, {
    path: '/inspectionReport',
    name: 'inspectionReport',
    component: inspectionReport,
    meta: {
      title: '检查报告'
    }
  }, {
    path: '/caseDetail',
    name: 'caseDetail',
    component: caseDetail,
    meta: {
      title: '病例详情'
    }
  }, {
    path: '/caseDetail',
    name: 'caseDetail',
    component: caseDetail,
    meta: {
      title: '病例详情'
    }
  }, {
    path: '/inspectionDetail',
    name: 'inspectionDetail',
    component: inspectionDetail,
    meta: {
      title: '报告详情'
    }
  },
  {
    path: '/choosehospital',
    name: 'choosehospital',
    component: choosehospital,
    meta: {
      title: '选择医院'
    }
  }, {
    path: '/hospitalresult',
    name: 'hospitalresult',
    component: hospitalresult,
    meta: {
      title: '医院结果'
    }
  },
  {
    path: '/hospitalsearch',
    name: 'hospitalsearch',
    component: hospitalsearch,
    meta: {
      title: '搜索医院'
    }
  },
  {
    path: '/lostpage',
    name: 'lostpage',
    component: lostpage,
    meta: {
      title: '页面丢失'
    }
  },

  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 10)
    })
  }
})