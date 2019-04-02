<template>
  <div class="idcardlist">
    <Header post-title="管理就诊卡"></Header>
    <div class="outCarint" style="margin:57px 0 0">
      <ul v-show="!loadingtrue">
        <li v-for="(item,index) in cardlist" :key="index" class="margin14">
          <div class="homeCard">
            <div class="homeCardText">
              <div class="homeCardTextLeft" @click="unblind(item)">
                <p class="patientName">{{item.patientName}}<img class="renzhen" src="@/assets/images/renzhen.png" alt=""></p>
                <p>{{item.cardNo}}</p>
              </div>
              <div class="towma" @click="showPicFun(item)">
                <p><img src="@/assets/images/lili.jpg" alt=""></p>
              </div>
            </div>
          </div>
        </li>
        <Loading v-show="loadingtrue"></Loading>
      </ul>
      <div v-show="!loadingtrue">
        <!-- <md-button @click="blidcard" type="primary">注册电子就诊卡</md-button> -->
        <!-- <md-button @click="blidcard" type="primary" round :inactive="isFive">注册电子就诊卡</md-button> -->
        <md-dialog title="系统信息" :mask-closable="true" :closable="false" layout="column" v-model="actDialog.open" :btns="actDialog.btns">
          是否已有就诊卡？绑定已有就诊卡，将会关联该就诊卡的就医档案。
        </md-dialog>
        <p class="warnbottitle margin14">温馨提示：</p>
        <p class="warnbot margin5">
          您累计可注册5张电子就诊卡，如已办理实体就诊卡，可在注册时进行绑定
        </p>
        <p class="warnbottom" @click="cardneed">
          电子就诊卡需知</p>
      </div>
    </div>
    <p @click="blidcard" class="addbTN" v-show="cardlist.length<6">注册电子就诊卡</p>
    <!-- <p class="add addisFive" v-show="isFive">注册电子就诊卡</p> -->
    <md-landscape v-model="showPic" :mask-closable="true">
      <div class="codema">
        <p class="namecodema">{{picName}}</p>
        <img src="@/assets/images/lili.jpg" alt="">
        <p class="namecodema">就诊卡二维码</p>
      </div>
    </md-landscape>
  </div>
</template>
<script type="text/babel">
// let wechatbizPatientCardreadpage = "/app/bizPatientCard/read/list";
import { Dialog, Button, Toast } from 'mand-mobile'
import { mapState } from 'vuex';

export default {
  data() {
    return {
      loadingtrue: true,
      // isFive: false,
      showPic: false,
      num: 2,
      // cardlist: '',
      picName: '',
      actDialog: {
        open: false,
        btns: [
          {
            text: '取消',
            type: 'danger',
            handler: this.onActConfirm,
          },
          {
            text: '已有',
            type: 'danger',
            handler: this.onActConfirm3,
          },
          {
            text: '没有',
            type: 'danger',
            handler: this.onActConfirm2,
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      cardlist: state => state.home.cardList,
    }),
    isFive() {
      return this.cardlist.length > 5
    },
  },
  async created() {
    await this.$store.dispatch('getCards'/* , { update: true } */);

    this.loadingtrue = false;

  },
  watch: {
    selected3: function (newselectedStatus, oldselectedStatus) {

    },
  },
  mounted() {

  },
  methods: {
    unblind(data) {
      this.$router.push({
        name: 'unblind',
        query: { id: data.id }
      });
    },
    cardneed() {
      this.$router.push({
        name: 'cardneed',
      });
    },
    showPicFun(data) {
      this.picName = data.patientName;
      this.showPic = true;
    },
    onActConfirm() {
      // Toast({
      //    content: '你点击了确认',
      // })
      this.actDialog.open = false
    },
    onActConfirm2() {
      this.actDialog.open = false;
      this.$router.push({
        name: 'cardwrite',
      });
    },
    onActConfirm3() {
      this.actDialog.open = false;
      this.$router.push({
        name: 'cardblind',
      });
    },
    blidcard() {
      this.actDialog.open = true
    },

  },

};
</script>
 <style   scoped>
@import "../doctorList/doctorList.css";

.idcardlist .homeCard {
  height: 200px;
  border-radius: 20px;
  background: #ffffff;
}

.addisFive {
  background-color: #979797;
}
</style>