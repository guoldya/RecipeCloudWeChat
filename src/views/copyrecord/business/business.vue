<template>
  <div>
    <Header post-title="病案复印"></Header>
    <div class="margin55 business" style="margin-bottom: 52px">
      <div class="rebinding-box cardText flatCard">
        <div class="box-timeline  ">
          <div class="alltimeball">
            <div class="timeball acitiveball">1</div>
            <div class="timeball">2</div>
            <div class="timeball">3</div>
          </div>
          <div class="alltimeball">
            <span class="acitivestep">业务选择</span>
            <span>证件上传</span>
            <span>信息确认</span>
          </div>
          <div class="timeballline acitiveline"></div>
          <div class="timeballline2"></div>
        </div>
      </div>
      <div class="cardText textTip">
        <p class="mu-light-text-color" style="text-align: justify">复印预约仅适用于本人或代理人申请，公检法保险机构和死亡病历复印需到医院窗口复印。住院病历一.般在出院后七个工作日归档，请在七个工作日后申请。
        </p>
        <p class="kinds">领取方式</p>
        <md-radio-list v-model="mail" :options="reasons" icon-size="lg" />
        <p v-show="mail==1" style="color: var(--primary--content);margin:6px 0">
          为保正您能及时收到病历，请确保收件地址准确无误!
        </p>
        <p v-show="mail==2" style="color: var(--primary--content); margin-top:0.2rem">
          医院病案室审核通过后，会将预约时间推送给您，请按通知约定日期工作时间内携带所申请惠者有效证件前往医院领取复印病历。如无法前往请代理人携带双方身份证原件、复印件及委托书前往代办或选择邮寄服务
        </p>

        <p class="letter" v-show="mail==2" @click="showPic=true">委托书样例</p>
      </div>
      <md-field v-show="mail==1">
        <md-input-item style="padding: 0 12px" type="text" v-model="receiver" title="收件人" placeholder="收件人"></md-input-item>
        <md-input-item style="padding: 0 12px" type="phone" v-model="mobile" title="手机号码" placeholder="xxx xxxx xxxx" clearable></md-input-item>
        <Address style="padding: 0 12px" ref="openAdress" :default-value="pickerDefaultValue" v-on:adressByValue="adressByValue"></Address>
        <md-input-item style="padding: 0 12px" ref="input13" v-model="address" title="详细地址" placeholder="详细地址"></md-input-item>
      </md-field>
      <md-agree class="outCarint" style="margin: 6px 0" v-model="agreeConf.checked" :disabled="false" size="md" @change="onChange(agreeConf.checked)">
        我已阅读并了解
        <a @click="openPgmodel" style="color:var(--primary)">《病历复印规定》</a>
      </md-agree>
    </div>

    <!-- <md-button type="primary" @click="tijiao" round style="margin-top:16px">下一步</md-button> -->
    <Pgmodal ref="Pgmodal"></Pgmodal>
    <md-landscape v-model="showPic" :mask-closable="true">
      <div class="codema">
        <img src="@/assets/images/u152.png" alt="">
        <p class="namecodema">委托书样例</p>
      </div>
    </md-landscape>
    <p @click="tijiao" class="addbTN">下一步</p>
  </div>
</template>
<script type="text/babel">
import Pgmodal from "../component/pgmodal/pgmodal.vue";
let addOrUpdate = "/app/bizCopyApply/uploadIdCard";///app/shippingAddress/addOrUpdate
export default {
  data() {
    return {
      agreeConf: {
        checked: true,
      },
      showPic: false,
      pay: 'month',
      mail: '1',
      receiver: '',
      mobile: '',
      address: '',
      areaId: '',
      pickerDefaultValue: '',

      reasons: [
        {
          value: '1',
          text: '自提',
        },
        {
          value: '2',
          text: '邮寄',
        },

      ],
    };
  },
  created() {

  },
  mounted() {
    document.title = '病案复印';
    this.$refs.Pgmodal.showPgwModal = false
  },
  watch: {
    mail(newValue) {
      this.mail = newValue;
    },
    pay(newValue) {
      this.pay = newValue;
    }
  },
  methods: {
    onChange(checked) {
      console.log(`agree name =  ${checked ? 'checked' : 'unchecked'}`);
    },
    openPgmodel() {
      this.$refs.Pgmodal.openPgmodel();
    },
    adressByValue: function (childValue) {
      this.areaId = childValue;
      console.log(this.address)
    },

    tijiao() {
      if (this.mail == 1) {
        let addParam = {};
        addParam.receiveBy = this.receiver;
        addParam.tel = this.mobile;
        addParam.area = this.areaId;
        addParam.address = this.address;
        addParam.receiveMode = this.mail;
        addParam.adressname = this.$store.state.adressname;
        this.$store.commit('recipientsFun', addParam);
        if (!this.receiver || !this.mobile || !this.address || !this.areaId) {
          this.$toast.info("请完善信息")
        } else {
          this.$router.push({
            name: 'certificate',
            query: { mail: this.mail }
          });
        }
      } else {
        this.$router.push({
          name: 'certificate',
          query: { mail: this.mail }
        });
      }

    },
  },
  components: {
    Pgmodal,
  }

};
</script>
 <style scoped>
.md-check-box {
  margin-right: 20px;
}
.business .md-landscape-content {
  width: 7rem !important;
}
.letter {
  font-size: 30px;
  line-height: 75px;
  color: var(--primary);
}
.kinds {
  line-height: 70px;
  font-size: 30px;
}
.business .flatCard {
  border-top: none;
}
.business .textTip {
  line-height: 36px;
  margin: 12px 0;
  font-size: 24px;
  /*padding: 0 24px;*/
  background: #ffffff;
}
.business .md-check-box {
  color: var(--primary--content);
}
.business .md-check-box.is-checked {
  color: #2f86f6;
}
.business .partLine {
  border-bottom: 1px solid #f2f3f5;
  position: absolute;
  z-index: 9999;
  margin: 0 0 0 24px;
  width: 698px;
}
.business /deep/.title-bar-left,
.business /deep/.title-bar-right {
  font-size: 32px;
}
</style>