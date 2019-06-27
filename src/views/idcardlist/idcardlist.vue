<template>
  <div class="idcardlist">
    <Header post-title="管理就诊卡"></Header>
    <div class="outCarint" style="margin:1.14rem 0 0">
      <ul v-show="!loadingtrue&&cardlist.length!=0">
        <li v-for="(item,index) in cardlist" :key="index" class="margin14">
          <div class="homeCard">
            <div class="homeCardText">
              <div class="homeCardTextLeft" @click="unblind(item)">
                <p class="patientName">{{item.patientName}}<img class="renzhen" src="@/assets/images/renzhen.png" alt="" style="width:1rem;"></p>
                <p>{{item.cardNo}}</p>
              </div>
              <div class="towma" @click="showPicFun(item)">
                <!-- <img src="@/assets/images/lili.jpg" alt=""> -->
                <me-qrcode :qr-url='item.cardNo' :qr-size='60'></me-qrcode>
              </div>
            </div>
          </div>
        </li>
        <Loading v-show="loadingtrue"></Loading>
      </ul>
      <div v-show="cardlist.length==0" class="blindcardBtn">
        <div class="nullDiv">
          <img src="@/assets/images/znanwu (1).png">
          <p class="nullTEXT">暂无就诊卡</p>
        </div>
      </div>
      <div class="bindcardwarn">
        <p>
          温馨提示：您累计可注册5张电子就诊卡，如已办理实体就诊卡，可在注册时进行绑定
        </p>
      </div>
    </div>
    <div v-show="cardlist.length==0||cardlist.length<5">
      <div style="height: 50px"></div>
      <p @click="blidcard" class="addbTN">注册电子就诊卡</p>
    </div>
    <!-- <md-dialog title="系统信息" :mask-closable="true" :closable="false" layout="column" v-model="actDialog.open" :btns="actDialog.btns">
      是否已有就诊卡？绑定已有就诊卡，将会关联该就诊卡的就医档案。
    </md-dialog> -->
    <md-landscape :mask-closable="true" :closable="false" layout="column" v-model="actDialog.open" :btns="actDialog.btns">
      <div class="blind-card">
        <div class="blind-card-one">
          <p class="title">温馨提示</p>
        </div>
        <div class="blind-card-two">
          <p> 是否已有就诊卡？绑定已有就诊卡，将会关联该就诊卡的就医档案。</p>
          <div>
            <md-button type="default" size="small" inline round @click="onActConfirm3" style="margin:20px 0">已有就诊卡</md-button>
            <md-button type="primary" size="small" inline round @click="onActConfirm2">没有就诊卡</md-button>
          </div>

        </div>
      </div>
    </md-landscape>
    <md-landscape v-model="showPic">
      <div class="codema">
        <p class="namecodema">{{picName}}</p>
        <me-qrcode :qr-url='link2' :qr-size='250'></me-qrcode>
        <p class="namecodema">就诊卡二维码</p>
        <md-button type="primary" size="small" inline round @click="showPic=false">关闭</md-button>
      </div>
    </md-landscape>
  </div>
</template>
<script type="text/babel">
// let wechatbizPatientCardreadpage = "/app/bizPatientCard/read/list";
import { Dialog, Button, Toast } from 'mand-mobile'
import { mapState } from 'vuex';
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      link2: " ", // 二维码2
      loadingtrue: true,
      showPic: false,
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

  },
  async created() {
    await this.$store.dispatch('getCards'/* , { update: true } */);
    this.loadingtrue = false;
  },

  mounted() {
    if (this._cardlist) {
      if (this._cardlist.length == 0) {
        return
      }
      this.link2 = this._cardlist[0].cardNo;
    }

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
      console.log(data.cardNo)
      this.showPic = true;
      this.link2 = data.cardNo;
      this.picName = data.patientName;
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
 <style lang="scss"  scoped>
@import "../doctorList/doctorList.css";
.md-landscape-content {
  width: 6rem !important;
}
.blind-card {
  background: #ffffff;
  border-radius: 20px;
  .blind-card-one {
    background-image: url("~@/assets/images/znanwu (2).jpg");
    background-size: 100%;
    background-repeat: no-repeat;
    border-radius: 20px 20px 0 0;
    text-align: center;
    height: 200px;
    .title {
      font-size: 30px;
      line-height: 70px;
      color: #ffffff;
    }
  }
  .blind-card-two {
    padding: 40px 24px;
    p {
      line-height: 50px;
    }
    div {
      margin: 20px;
    }
  }
}
.idcardlist .homeCard {
  .homeCardText {
    padding: 40px;
    display: flex;
    justify-content: space-between;
  }

  .homeCardTextLeft {
    flex-flow: column;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  /*height: 200px;*/
  border-radius: 20px;
  background: #ffffff;
  color: var(--primary--title);
  img {
    width: 120px;
  }
}
.bindcardwarn {
  color: var(--primary);
  bottom: 0;
  padding-top: 40px;
  margin-top: 20px;
}
.addisFive {
  background-color: var(--primary--content);
}

.idcardlist .md-button.small.round {
  width: 100%;
}
</style>