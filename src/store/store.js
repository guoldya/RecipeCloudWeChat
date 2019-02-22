import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        jumpArr: [],
        payWay: [],
        detailData: [],
        posUrl: '',
        othUrl: '',
        activeId: '',
        TOKEN: '',
        UUID: '',
        fileData: '',
        photo1Data: '',
        photo0Data: '',
        feeActiveId: '',
        feeActiveId:'',
        payType:'',
        patientId: '',
    },
    mutations: {
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
        recordDetailFun: (state, n) => {
            state.detailData = n;
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
        TOKENFun: (state, n) => {
            state.TOKEN = n;
        },
        UUIDFun: (state, n) => {
            state.UUID = n;
        },
        payTypeFun: (state, n) => {
            state.payType = n;
        },
    },
    actions: {

    }
})

