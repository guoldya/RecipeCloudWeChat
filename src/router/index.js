import Vue from 'vue'
import Router from 'vue-router'

// 主页
const index = () => import(/* webpackChunkName: "home" */ "@/views/home/home.vue")
const druginfo = () => import(/* webpackChunkName: "home" */ "@/views/druginfo/druginfo.vue")
const result = () => import(/* webpackChunkName: "home" */ "@/views/result/result.vue")
const feeinfo = () => import(/* webpackChunkName: "home" */ "@/views/feeinfo/feeinfo.vue")
const feerecord = () => import(/* webpackChunkName: "home" */ "@/views/feerecord/feerecord.vue")
const feesucces = () => import(/* webpackChunkName: "home" */ "@/views/feesucces/feesucces.vue")
const doctor = () => import(/* webpackChunkName: "home" */ "@/views/doctordetail/doctor.vue")
const outpatientinfo = () => import(/* webpackChunkName: "home" */ "@/views/home/outpatientinfo")
const outpatient = () => import(/* webpackChunkName: "home" */ "@/views/home/outpatient")
const medicalinfo = () => import(/* webpackChunkName: "home" */ "@/views/home/medicalinfo")
const medical = () => import(/* webpackChunkName: "home" */ "@/views/home/medical")
const medicalhistory = () => import(/* webpackChunkName: "home" */ "@/views/home/medicalhistory")
const medicaldetail = () => import(/* webpackChunkName: "home" */ "@/views/home/medicaldetail")
import acctest from '@/views/acctest/acctest.vue'
import acctestinfo from '@/views/acctestinfo/acctestinfo.vue'
import suggestion from '@/views/suggestion/suggestion.vue'
import valuationList from '@/views/my/valuationList/valuationList.vue'
import valuation from '@/views/my/valuationList/valuation/valuation.vue'
 
import payment from '@/views/payment/payment.vue'
import doctorList from '@/views/doctorList/doctorList.vue'
import doctorresult from '@/views/doctorList/doctorresult'
import doctorsearch from '@/views/doctorList/doctorsearch'
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
import departsearch from '@/views/choosedepart/departsearch'
import news from '@/views/home/news'
import propaganda from '@/views/home/propaganda'
import propagandainfo from '@/views/home/propagandainfo'


import newsinfo from '@/views/home/newsinfo'
import choose from '@/views/inspectionCheck/choose'
import confirmOrder from '@/views/inspectionCheck/confirmOrder'
import inspectSuccess from '@/views/inspectionCheck/inspectSuccess'





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
import bedhosipital from '@/views/inhospital/bedhosipital'
import admuoload from '@/views/inhospital/admuoload'
import admupayfee from '@/views/inhospital/admupayfee'
import myhospital from '@/views/inhospital/myhospital'
import hospitalinfo from '@/views/inhospital/hospitalinfo'
import hospitalization from '@/views/inhospital/hospitalization'
import myhospitalfirst from '@/views/inhospital/myhospitalfirst'
import hospitalhistroy from '@/views/inhospital/hospitalhistroy'


import payfee from '@/views/inhospital/payfee/payfee.vue'
import payfeerecord from '@/views/inhospital/payfeerecord'
import payfeerecordinfo from '@/views/inhospital/payfeerecordinfo'


import paymeet from '@/views/inhospital/paymeet/paymeet.vue'
import quickpay from '@/views/inhospital/quickpay/quickpay.vue'
import admission from '@/views/inhospital/admission/admission.vue'
import dayof from '@/views/inhospital/dayof/dayof.vue'
import paysucced from '@/views/inhospital/paysucced'



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
import onlineresult from '@/views/onlines/onlineresult'
import onlinesearch from '@/views/onlines/onlinesearch'




import business from '@/views/copyrecord/business/business.vue'
import chooseCase from '@/views/copyrecord/chooseCase/chooseCase.vue'
import copyresult from '@/views/copyrecord/copyresult/copyresult.vue'
import businssrecord from '@/views/copyrecord/businssrecord'
import certificate from '@/views/copyrecord/certificate/certificate.vue'
import putinfo from '@/views/copyrecord/putinfo/putinfo.vue'


import businssrecordinfo from '@/views/copyrecord/businssrecordinfo'
import needkown from '@/views/copyrecord/needkown'



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
    path: '/outpatient',
    name: 'outpatient',
    component: outpatient,
  },
  {
    path: '/outpatientinfo',
    name: 'outpatientinfo',
    component: outpatientinfo,
  },
  {
    path: '/confirmOrder',
    name: 'confirmOrder',
    component: confirmOrder,
    meta: {
      title: '订单确认'
    }
  },
  {
    path: '/inspectSuccess',
    name: 'inspectSuccess',
    component: inspectSuccess,
    meta: {
      title: '支付成功'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },

  {
    path: '/propagandainfo',
    name: 'propagandainfo',
    component: propagandainfo,
    meta: {
      title: '宣教信息详情'
    }
  },
  {
    path: '/propaganda',
    name: 'propaganda',
    component: propaganda,
    meta: {
      title: '宣教信息'
    }
  },
  {
    path: '/newsinfo',
    name: 'newsinfo',
    component: newsinfo,
    meta: {
      title: '新闻详情'
    }
  },
  {
    path: '/news',
    name: 'news',
    component: news
  },
  {
    path: '/inpatient',
    name: 'inpatient',
    component: inpatient
  },
  {
    path: '/bedhosipital',
    name: 'bedhosipital',
    component: bedhosipital,
    meta: {
      title: '入院信息'
    }
  },
  {
    path: '/admuoload',
    name: 'admuoload',
    component: admuoload,
    meta: {
      title: '证件上传'
    }
  },

  {
    path: '/payfee',
    name: 'payfee',
    component: payfee
  },

  {
    path: '/payfeerecord',
    name: 'payfeerecord',
    component: payfeerecord,
    meta: {
      title: '缴费记录'
    }
  },
  {
    path: '/payfeerecordinfo',
    name: 'payfeerecordinfo',
    component: payfeerecordinfo,
    meta: {
      title: '缴费记录'
    }
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
    path: '/admupayfee',
    name: 'admupayfee',
    component: admupayfee,
    meta: {
      title: '缴费'
    }
  },
  {
    path: '/myhospital',
    name: 'myhospital',
    component: myhospital,
    meta: {
      title: '我的住院'
    }
  },
  {
    path: '/hospitalization',
    name: 'hospitalization',
    component: hospitalization,
    meta: {
      title: '住院费用'
    }
  },
  {
    path: '/hospitalhistroy',
    name: 'hospitalhistroy',
    component: hospitalhistroy,
    meta: {
      title: '住院历史记录'
    }
  },
  {
    path: '/hospitalinfo',
    name: 'hospitalinfo',
    component: hospitalinfo,
    meta: {
      title: '住院费用详情'
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
    path: '/paysucced',
    name: 'paysucced',
    component: paysucced,
    meta: {
      title: '支付成功'
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
    path: '/departsearch',
    name: 'departsearch',
    component: departsearch
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
    path: '/acctest',
    name: 'acctest',
    component: acctest,
  },
  {
    path: '/acctestinfo',
    name: 'acctestinfo',
    component: acctestinfo,
  },
  {
    path: '/suggestion',
    name: 'suggestion',
    component: suggestion,
  },
  {
    path: '/valuationList',
    name: 'valuationList',
    component: valuationList,
  },
  {
    path: '/valuation',
    name: 'valuation',
    component: valuation,
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
    path: '/medical',
    name: 'medical',
    component: medical,
  },
  {
    path: '/medicalhistory',
    name: 'medicalhistory',
    component: medicalhistory,
  },
  {
    path: '/medicaldetail',
    name: 'medicaldetail',
    component: medicaldetail,
  },
  {
    path: '/medicalinfo',
    name: 'medicalinfo',
    component: medicalinfo,
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
    // meta: {
    //   keepAlive: true
    // }
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
    path: '/inquiryOnline',
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
    component: putinfo,
    // meta: {
    //   keepAlive: true
    // }
  }, {
    path: '/myhospitalfirst',
    name: 'myhospitalfirst',
    component: myhospitalfirst,
    // meta: {
    //   keepAlive: true
    // }
  },



  {
    path: '/businssrecordinfo',
    name: 'businssrecordinfo',
    component: businssrecordinfo,
  },
  {
    path: '/choose',
    name: 'choose',
    component: choose,
    meta: {
      title: "邮寄方式"
    }
  },
  {
    path: '/needkown',
    name: 'needkown',
    component: needkown,
    meta: {
      title: "用户需知"
    }
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
    path: '/businssrecord',
    name: 'businssrecord',
    component: businssrecord,
    meta: {
      title: "复印记录"
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
      title: '图文咨询',
      keepAlive: true,
    }
  }, {
    path: '/selectPeople',
    name: 'selectPeople',
    component: selectPeople,
    meta: {
      title: '选择就诊人',
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
    path: '/onlinesearch',
    name: 'onlinesearch',
    component: onlinesearch,
    meta: {
      title: '在线医生搜索'
    }
  },
  {
    path: '/onlineresult',
    name: 'onlineresult',
    component: onlineresult,
    meta: {
      title: '搜索结果'
    }
  },
  {
    path: '/doctorresult',
    name: 'doctorresult',
    component: doctorresult,
    meta: {
      title: '搜索结果'
    }
  },
  {
    path: '/doctorsearch',
    name: 'doctorsearch',
    component: doctorsearch,
    meta: {
      title: '医生搜索'
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