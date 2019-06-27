import Vue from 'vue'
import Router from 'vue-router'

// 主页
const home = () => import(/* webpackChunkName: "home" */ "@/views/home/home.vue")
const index = () => import(/* webpackChunkName: "home" */ "@/views/home/judge")
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
const acctest = () => import(/* webpackChunkName: "home" */ "@/views/acctest/acctest.vue")
const acctestinfo = () => import(/* webpackChunkName: "home" */ "@/views/acctestinfo/acctestinfo.vue")
const valuationList = () => import(/* webpackChunkName: "my" */ "@/views/my/valuationList/valuationList.vue")
const valuation = () => import(/* webpackChunkName: "my" */ "@/views/my/valuationList/valuation/valuation.vue")
const suggestion = () => import(/* webpackChunkName: "home" */ "@/views/suggestion/suggestion.vue")
const payment = () => import(/* webpackChunkName: "home" */ "@/views/payment/payment.vue")
const doctorList = () => import(/* webpackChunkName: "doctorList" */ "@/views/doctorList/doctorList.vue")
const doctorresult = () => import(/* webpackChunkName: "doctorList" */ "@/views/doctorList/doctorresult")
const doctorsearch = () => import(/* webpackChunkName: "doctorList" */ "@/views/doctorList/doctorsearch")

const reportrecord = () => import(/* webpackChunkName: "report" */ "@/views/reportrecord/reportrecord.vue")
const reportquery = () => import(/* webpackChunkName: "report" */ "@/views/reportquery/reportquery.vue")
const reportinfo = () => import(/* webpackChunkName: "report" */ "@/views/reportinfo/reportinfo.vue")


const lineupnow = () => import(/* webpackChunkName: "report" */ "@/views/lineupnow/lineupnow.vue")
const lineupinfo = () => import(/* webpackChunkName: "report" */ "@/views/lineupinfo/lineupinfo.vue")
const notice = () => import(/* webpackChunkName: "report" */ "@/views/notice/notice.vue")

const lookagain = () => import(/* webpackChunkName: "workdepart" */ "@/views/lookagain/lookagain.vue")
const doctorplan = () => import(/* webpackChunkName: "workdepart" */ "@/views/doctorplan/doctorplan.vue")
const workdepart = () => import(/* webpackChunkName: "workdepart" */ "@/views/workdepart/workdepart.vue")
const workdoctor = () => import(/* webpackChunkName: "workdepart" */ "@/views/workdoctor/workdoctor.vue")
const workdotorinfo = () => import(/* webpackChunkName: "workdepart" */ "@/views/workdotorinfo/workdotorinfo.vue")

const adress = () => import(/* webpackChunkName: "workdepart" */ "@/views/adress/adress.vue")
const adressinfo = () => import(/* webpackChunkName: "workdepart" */ "@/views/adressinfo/adressinfo.vue")
const idcard = () => import(/* webpackChunkName: "workdepart" */ "@/views/idcard/index.vue")
const idcardlist = () => import(/* webpackChunkName: "workdepart" */ "@/views/idcardlist/idcardlist.vue")



const sign = () => import(/* webpackChunkName: "workdepart" */ "@/views/sign/sign.vue")
const signagin = () => import(/* webpackChunkName: "workdepart" */ "@/views/signagin/signagin.vue")
 
const signsucceed = () => import(/* webpackChunkName: "workdepart" */ "@/views/signsucceed/signsucceed.vue")
const cardblind = () => import(/* webpackChunkName: "workdepart" */ "@/views/cardblind/cardblind.vue")
const cardhave = () => import(/* webpackChunkName: "workdepart" */ "@/views/cardhave/cardhave.vue")
const resultdocotor = () => import(/* webpackChunkName: "workdepart" */ "@/views/resultdocotor/resultdocotor.vue")
const registrecorddetail = () => import(/* webpackChunkName: "workdepart" */ "@/views/registrecorddetail/registrecorddetail.vue")
const doctorschedu = () => import(/* webpackChunkName: "workdepart" */ "@/views/doctorschedu/doctorschedu.vue")
const online = () => import(/* webpackChunkName: "workdepart" */ "@/views/onlines/online/online.vue")
const article = () => import(/* webpackChunkName: "workdepart" */ "@/views/article/article.vue")
const inquiryOnline = () => import(/* webpackChunkName: "workdepart" */ "@/views/onlines/inquiryOnline")
const my = () => import(/* webpackChunkName: "workdepart" */ "@/views/my/my.vue")


 
const appoint = () => import(/* webpackChunkName: "choosehospital" */ "@/views/appoint/appoint.vue")
const appointinfo = () => import(/* webpackChunkName: "choosehospital" */ "@/views/appointinfo/appointinfo.vue")
const choosedepart = () => import(/* webpackChunkName: "choosehospital" */ "@/views/choosedepart/choosedepart.vue")
const choosehospital = () => import(/* webpackChunkName: "choosehospital" */ "@/views/choosehospital/choosehospital.vue")
const hospitalsearch = () => import(/* webpackChunkName: "choosehospital" */ "@/views/choosehospital/hospitalsearch/hospitalsearch.vue")
const hospitalresult = () => import(/* webpackChunkName: "choosehospital" */ "@/views/choosehospital/hospitalresult/hospitalresult.vue")
const lostpage = () => import(/* webpackChunkName: "choosehospital" */ "@/views/resultpage/lostpage/lostpage.vue")
const departsearch = () => import(/* webpackChunkName: "choosehospital" */ "@/views/choosedepart/departsearch")
const news = () => import(/* webpackChunkName: "choosehospital" */ "@/views/home/news")
const newsinfo = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/home/newsinfo")
const choose = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/inspectionCheck/choose")
const confirmOrder = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/inspectionCheck/confirmOrder")
const inspectSuccess = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/inspectionCheck/inspectSuccess")
 


const cardwrite = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/cardwrite/cardwrite.vue")
const cardwritesecond = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/cardwritesecond/cardwritesecond.vue")
const cardwriteson = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/cardwriteson/cardwriteson.vue")
const cardneed = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/cardneed/cardneed.vue")
const unblind = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/unblind/unblind.vue")
 
 
 
const orderrecord = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/orderrecord/orderrecord.vue")
const orderinfo = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/orderinfo/orderinfo.vue")
const askorder = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/askorder/askorder.vue")
const registrecord = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/registrecord/registrecord.vue")
const inspectionCheck = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/inspectionCheck/inspectionCheck.vue")
const medicalEva = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/medicalEva/medicalEva.vue")
const recipeDetail = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/recipeDetail/recipeDetail.vue")
const slowConfirm = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/slowConfirm/slowConfirm.vue")
const applyDetail = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/applyDetail/applyDetail.vue")
const examine = () => import(/* webpackChunkName: "inspectionCheck" */ "@/views/examine/examine.vue")

 
import onlineEva from '@/views/onlineEva/onlineEva.vue'
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
 
import register from '@/views/register/register.vue'
import inpatient from '@/views/inhospital/inpatient/inpatient.vue'
 
 
const admupayfee = () => import(/* webpackChunkName: "inhospital" */ "@/views/inhospital/admupayfee")
const myhospital = () => import(/* webpackChunkName: "inhospital" */ "@/views/inhospital/myhospital")
const admuoload = () => import(/* webpackChunkName: "inhospital" */ "@/views/inhospital/admuoload")
const bedhosipital = () => import(/* webpackChunkName: "inhospital" */ "@/views/inhospital/bedhosipital")
 

const hospitalization = () => import(/* webpackChunkName: "inhospital" */ "@/views/inhospital/hospitalization")
const hospitalinfo = () => import(/* webpackChunkName: "inhospital" */ "@/views/inhospital/hospitalinfo")
const myhospitalfirst = () => import(/* webpackChunkName: "inhospital" */ "@/views/inhospital/myhospitalfirst")
const hospitalhistroy = () => import(/* webpackChunkName: "inhospital" */ "@/views/inhospital/hospitalhistroy")
 
 

const payfee = () => import(/* webpackChunkName: "inhospital" */ "@/views/inhospital/payfee/payfee.vue")
const payfeerecord = () => import(/* webpackChunkName: "inhospital" */ "@/views/inhospital/payfeerecord")
const payfeerecordinfo = () => import(/* webpackChunkName: "inhospital" */ "@/views/inhospital/payfeerecordinfo")
 
 
 
const paymeet = () => import(/* webpackChunkName: "inhospital" */ "@/views/inhospital/paymeet/paymeet.vue")
const quickpay = () => import(/* webpackChunkName: "inhospital" */ "@/views/inhospital/quickpay/quickpay.vue")
const admission = () => import(/* webpackChunkName: "inhospital" */ "@/views/inhospital/admission/admission.vue")
const dayof = () => import(/* webpackChunkName: "inhospital" */ "@/views/inhospital/dayof/dayof.vue")
const paysucced = () => import(/* webpackChunkName: "inhospital" */ "@/views/inhospital/paysucced")
 


 
const followDoctor = () => import(/* webpackChunkName: "onlines" */ "@/views/onlines/followDr")
const inquiryRecord = () => import(/* webpackChunkName: "onlines" */ "@/views/onlines/inquiryRecord")
const consultDetail = () => import(/* webpackChunkName: "onlines" */ "@/views/onlines/consultDetail")
const buyService = () => import(/* webpackChunkName: "onlines" */ "@/views/onlines/buyService")
const pictureConsult = () => import(/* webpackChunkName: "onlines" */ "@/views/onlines/pictureConsult")
const selectPeople = () => import(/* webpackChunkName: "onlines" */ "@/views/onlines/selectPeople")
const addPeople = () => import(/* webpackChunkName: "onlines" */ "@/views/onlines/addPeople")
const seeCase = () => import(/* webpackChunkName: "onlines" */ "@/views/onlines/seeCase")
const inspectionReport = () => import(/* webpackChunkName: "onlines" */ "@/views/onlines/inspectionReport")
const caseDetail = () => import(/* webpackChunkName: "onlines" */ "@/views/onlines/caseDetail")
const inspectionDetail = () => import(/* webpackChunkName: "onlines" */ "@/views/onlines/inspectionDetail")
const onlineresult = () => import(/* webpackChunkName: "onlines" */ "@/views/onlines/onlineresult")
const onlinesearch = () => import(/* webpackChunkName: "onlines" */ "@/views/onlines/onlinesearch")



 

 
const business = () => import(/* webpackChunkName: "copyrecord" */ "@/views/copyrecord/business/business.vue")
const chooseCase = () => import(/* webpackChunkName: "copyrecord" */ "@/views/copyrecord/chooseCase/chooseCase.vue")
const copyresult = () => import(/* webpackChunkName: "copyrecord" */ "@/views/copyrecord/copyresult/copyresult.vue")
const businssrecord = () => import(/* webpackChunkName: "copyrecord" */ "@/views/copyrecord/businssrecord")
const certificate = () => import(/* webpackChunkName: "copyrecord" */ "@/views/copyrecord/certificate/certificate.vue")
const putinfo = () => import(/* webpackChunkName: "copyrecord" */ "@/views/copyrecord/putinfo/putinfo.vue")
const businssrecordinfo = () => import(/* webpackChunkName: "copyrecord" */ "@/views/copyrecord/businssrecordinfo")
const needkown = () => import(/* webpackChunkName: "copyrecord" */ "@/views/copyrecord/needkown")
const resultDoctor = () => import(/* webpackChunkName: "copyrecord" */ "@/views/resultDr/result.vue")
const privacy = () => import(/* webpackChunkName: "copyrecord" */ "@/views/appwarn/privacy/privacy.vue")
const agreement = () => import(/* webpackChunkName: "copyrecord" */ "@/views/appwarn/agreement/agreement.vue")


Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: '互联网医院'
    }
  },
  {
    path: '/',
    name: 'judge',
    component: index,
  },
  {
    path: '/outpatientinfo',
    name: 'outpatientinfo',
    component: outpatientinfo,
  },
    {
    path: '/outpatient',
    name: 'outpatient',
    component: outpatient,
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
    path: '/lookagain',
    name: 'lookagain',
    component: lookagain
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
    // path: '/inquiryOnline/:fromId',
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