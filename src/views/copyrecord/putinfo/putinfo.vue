<template>
  <div class="putinfo margin55 ">
    <Header post-title="信息确认"></Header>
    <div class="rebinding-box flatCard margin5">
      <div class="box-timeline ">
        <div class="alltimeball">
          <div class="timeball acitiveball">1</div>
          <div class="timeball acitiveball">2</div>
          <div class="timeball acitiveball">3</div>
        </div>
        <div class="alltimeball">
          <span class="acitivestep">业务选择</span>
          <span class="acitivestep">上传证件</span>
          <span class="acitivestep">信息确认</span>
        </div>
        <div class="timeballline"></div>
        <div class="timeballline2" style="background:var(--primary)"></div>
      </div>
    </div>
    <div class="flatCard margin5 outCarint">
      <md-input-item ref="input13" v-model="name" title="患者姓名" placeholder="姓名" maxlength="10"></md-input-item>
      <md-input-item ref="input13" v-model="idcard" title="身份证号" placeholder="身份证号"></md-input-item>
    </div>
    <!-- <p class="chooseBtn" @click="chooseCase">
      <img src="@/assets/images/jia.png">
      <span>
        选择复印病案
      </span>
    </p> -->
    <p class="smallTitle">
      病案信息
    </p>
    <div class="flatCard   outCarint">
      <div style="background:#ffffff">
        <md-detail-item title="住院科室" :content="_cardlist.dept" />
        <md-detail-item title="住院诊断" :content="_cardlist.diag" />
        <md-detail-item title="住院次数" :content="_cardlist.renewalMum">
          <span>{{_cardlist.renewalMum}}次</span>
        </md-detail-item>
        <md-detail-item title="入院时间">
          <span>{{_cardlist.inTime|lasttime}}</span>
        </md-detail-item>
        <md-detail-item title="出院时间">
          <span>{{_cardlist.outTime|lasttime}}</span>
        </md-detail-item>
      </div>
    </div>
    <p class="smallTitle">
      复印用途
    </p>
    <div class="flatCard margin16 outCarint">
      <div class="content">
        <div class="login-box">
          <md-field-item title="复印用途" arrow="arrow-right" :addon="selectorValue" @click="showSelector "> </md-field-item>
          <md-input-item ref="input13" v-show="type==1" v-model="useInfo" title="用途说明" placeholder="用途说明"></md-input-item>
          <div class="login-box-div">
            <span class="flexF">复印份数</span>
            <div class="flexR calculate">
              <md-stepper slot="right" v-model="num" min="1" />
            </div>
          </div>
          <md-input-item ref="input13" v-model="remark" title="备注" placeholder="备注 (选填)">
            <!-- <div class="input-operator" slot="right" style="color:#c5cad5">(选填)</div> -->
          </md-input-item>
          <p class="partLine outCarint"></p>
          <md-input-item type="phone" v-model="mobile" title="手机号码" placeholder="xxx xxxx xxxx" clearable></md-input-item>
          <div class="hq login-box-div">
            <span class="flexF">验证码</span>
            <input class="flexF flexS" type="text" name="username" v-model="verifyCode" placeholder="请输入验证码" maxlength="11">
            <p class="flexR">
              <span v-show="show" class="send1" @click="getCode">获取验证码</span>
              <span v-show="!show" class="send1">发送 {{count}} 秒</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- <form>
      <input type="file" name="json" value="aaaa">
    </form> -->
    <md-selector v-model="isSelectorShow" :data="test" :default-value="1" @choose="onSelectorChoose" title="复印用途"></md-selector>
    <md-agree class="outCarint" v-model="agreeConf.checked" :disabled="false" size="md" @change="onChange(agreeConf.checked)">
      我已阅读并了解
      <a @click="openPgmodel" style="color:var(--primary)">《病历复印规定》</a>
    </md-agree>
    <Pgmodal ref="Pgmodal"></Pgmodal>
    <div style="height:55px"></div>
    <p @click="tijiao" class="addbTN">下一步</p>
  </div>
</template>
<script type="text/babel">
import { mapState } from 'vuex';
import Pgmodal from "../component/pgmodal/pgmodal.vue";
let sendNewVerifyCode = "/appLogin/sendNewVerifyCode";
let checkMobile = "/app/bizPatientCard/checkMobile";
let wechatbizPatientCardbinding = "/app/bizCopyApply/uploadIdCard"
export default {
  data() {
    return {
      name: '',
      copyUse: '',
      idcard: '',
      mobile: '',
      verifyCode: '',
      count: '',
      show: true,
      isSon: false,
      remark: '',
      useInfo: '',
      agreeConf: {
        checked: true,
      },
      num: 1,
      value: 0,
      type: 1,
      selectorValue: '全套复印',
      isSelectorShow: false,
      test: [
        {
          value: 1,
          text: '全套复印',
        },
        {
          value: 2,
          text: '交通事故',
        },
        {
          value: 3,
          text: '保险',
        },
        {
          value: 4,
          text: '商业保险',
        },
        {
          value: 5,
          text: '报销',
        },
      ],
      jsonStr: '',
      nextPar: '',
    };
  },
  computed: {
    ...mapState({
      _cardlist: state => state.chooseInfo,
    }),
  },
  created() {
    this.name = this.$route.query.name;
    this.idcard = this.$route.query.idcard
  },
  watch: {
    num(newValue) {
      if (newValue < 1) this.num = 1
    }
  },
  mounted() {
    document.title = '资料确认';
    this.$refs.Pgmodal.istype = 2;

    document.scrollingElement.scrollTop = 0


    this.nextPar = this.$route.query;

    this.nextPar.idCardImg = JSON.stringify(this.$store.state.cardImgData)
    console.log(this.$store.state.idCardInfo);
  },
  methods: {
    chooseCase() {
      this.$router.push({
        name: 'chooseCase'
      })
    },

    tijiao() {
      let _this = this;
      if (this.type == 1) {
        if (this.mobile.length < 11 || this.verifyCode.length < 6 || this.useInfo.length === 0) {
          this.$toast.info('请完善信息');
          return
        }
      } else {
        if (this.mobile.length < 11 || this.verifyCode.length < 6) {
          this.$toast.info('请完善信息');
          return
        }
      }

      this.$axios.put(checkMobile + '?verifyCode=' + this.verifyCode + '&verifyType=' + 1 + '&mobile=' + this.mobile, {
      }).then(res => {
        if (res.data.code == '200') {
          var param = {};
          param.name = this.name;
          param.idcard = this.idcard;
          param.mobile = this.mobile;
          param.verifyType = 1;
          param.money = 72;
          param.receiverType = Number(this.$route.query.receiverType);
          param.usageDesc = this.useInfo;
          // 复印用途
          param.usage = this.type;
          // 验证码
          param.verifyCode = this.verifyCode;
          param.num = this.num;
          //  住院id
          param.ihRecordId = this._cardlist.id;
          if (this.$route.query.receiverType == 1) {
            param.idCardImg = this.$store.state.idCardInfo;
          } else {
            param.idCardImg = this.$store.state.idCardAPPInfo;

          }

          param.remark = this.remark;
          this.$axios.post(wechatbizPatientCardbinding, param).then(res => {
            if (res.data.code == '200') {
              this.$router.push({
                name: 'copyresult',
                query: { num: this.num, name: this.name, feeid: res.data.data.orderId, code: res.data.data.code }
              })
            } else {
              console.log(res.data.code);
            }
          }).catch(function (err) {
            console.log(err);
          });
        } else {
          this.$toast.info("验证码错误或超时")
        }
      }).catch(function (err) {
        console.log(err);
      });

    },


    // copyresult() {
    //   if (this.mobile > 0 && this.verifyCode < 5) {
    //     this.$toast.info("请完善信息");
    //     return
    //   }
    //   this.$axios.post("app/bizCopyApply/uploadIdCard", this.nextPar).then(res => {
    //     if (res.data.code == '200') {
    //       this.$router.push({
    //         name: 'copyresult',
    //         query: { num: this.num, name: this.name }
    //       })
    //       // this.$router.go(-1);
    //     }
    //   }).catch(function (err) {
    //     console.log(err);
    //   });
    // },
    onChange(checked) {
      console.log(`agree name =  ${checked ? 'checked' : 'unchecked'}`);
    },
    openPgmodel() {
      this.$refs.Pgmodal.openPgmodel();
    },
    onSelectorChoose(data) {
      this.selectorValue = data.text;
      this.type = data.value * 1;
      console.log(data, "this")
    },


    showSelector() {
      this.isSelectorShow = true
    },
    getCode() {

      let _this = this;
      const TIME_COUNT = 60;
      if (this.mobile.length < 11) {
        this.$toast.info('请输入正确的手机号')
      } else {
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
          this.$axios.post(sendNewVerifyCode + '?mobile=' + _this.mobile + '&verifyType=' + 1, {
          }).then(res => {
            if (res.data.code == '200') {
              _this.$toast.info('请查看验证码')
            } else if (res.data.code == '800') {

            }
          }).catch(function (err) {
            console.log(err);
          });
        }
      }

    },





  },
  components: {
    Pgmodal,
  }
};
</script>
 <style scoped>
@import url("../../cardwrite/cardwrite.css");
.calculate {
  margin-left: 360px;
}

.chooseBtn {
  background: var(--primary);
  line-height: 90px;
  color: #ffffff;
  letter-spacing: 0.03rem;
  text-align: center;
  border-radius: 64px;
  width: 47%;
  margin: 26px auto 0;
  height: 90px;
}
.chooseBtn img {
  width: 27px;
  position: relative;
  top: 3px;
}
.smallTitle {
  line-height: 70px;
  padding: 0 24px;
  color: var(--primary--right);
}

.putinfo .content .login-box div .flexS {
  /* padding-left: 228px; */
  text-align: right;
}
.content .login-box div input::-webkit-input-placeholder {
  color: #c5cad5;
  font-size: 28px;
}
.putinfo .partLine {
  border-bottom: 1px solid #f2f3f5;
  position: absolute;
  margin: 0;
  z-index: 9999;
  width: 698px;
}
</style>