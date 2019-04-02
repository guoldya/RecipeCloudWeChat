import Vue from 'vue';
import Vuex from 'vuex';
import home from './home';
import chat from './modules/chat'

console.log(home)


Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        userInfo: {
            id: 125,
        },
        jumpArr: [],
        payWay: [],
        posUrl: '',
        othUrl: '',
        activeId: '',
        TOKEN: '',
        UUID: '',
        fileData: '',
        photo1Data: '',
        photo0Data: '',
        feeActiveId: '',
        orgId: '',
        payType: '',
        patientId: '',
        cardNo: '',
        idCardFrontImg: '',
        idCardBackImg: '',
        mobile: '',
        depart: '',
        major: '',
        patientName: '',
        cardId: '',
        keepAlive: '',
        cardList: '',
        searchType: '',
    },
    mutations: {
        searchTypeFun: (state, n) => {
            state.searchType = n;
        },
        cardListFun: (state, n) => {
            state.cardList = n;
        },
        mobileFun: (state, n) => {
            state.mobile = n;
        },
        cardIdFun: (state, n) => {
            state.cardId = n;
        },
        cardNnameFun: (state, n) => {
            state.patientName = n;
        },
        majorFun: (state, n) => {
            state.major = n;
        },
        departFun: (state, n) => {
            state.depart = n;
        },

        addjumpArr: (state, n) => {
            state.jumpArr = n;
        },
        photo0DataFun: (state, n) => {
            state.photo0Data = n;
        },
        photo1DataFun: (state, n) => {
            state.photo1Data = n;
        },
        payWayFun: (state, n) => {
            state.payWay = n;
        },
        // 身份证信息
        fileDataFun: (state, n) => {
            state.fileData = n;
        },
        posUrlFun: (state, n) => {
            state.posUrl = n;
        },
        othUrlFun: (state, n) => {
            state.othUrl = n;
        },
        activeFun: (state, n) => {
            state.activeId = n;
        },
        feeActiveFun: (state, n) => {
            state.feeActiveId = n;
        },
        patientIdFun: (state, n) => {
            state.patientId = n;
        },
        cardNoFun: (state, n) => {
            state.cardNo = n;
        },
        TOKENFun: (state, n) => {
            state.TOKEN = n;
        },
        UUIDFun: (state, n) => {
            state.UUID = n;
        },
        payTypeFun: (state, n) => {
            state.payType = n;
        },
        idCardFrontImgFun: (state, n) => {
            state.idCardFrontImg = n;
        },
        idCardBackImgFun: (state, n) => {
            state.idCardBackImg = n;
        },
    },
    actions: {

    },
    modules: {
        home,
        chat
    }
})

