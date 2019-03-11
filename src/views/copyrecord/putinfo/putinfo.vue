<template>
  <div :class="{'outCarint':true,'margin45':isWeixin}">
    <Header post-title="信息确认" v-show="isWeixin"></Header>
    <div class="rebinding-box card margin16">
      <div class="box-timeline  cardText">
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
        <div class="timeballline2" style="background:#1da1f3"></div>
      </div>
    </div>
    <div class="card margin16">
      <md-input-item ref="input13" v-model="name" title="患者姓名" placeholder="姓名" is-highlight></md-input-item>
      <md-input-item ref="input13" v-model="idcard" title="身份证号" placeholder="身份证号" is-highlight></md-input-item>
    </div>
    <p style="background: #1da1f3 "> <img src="@/assets/images/jia.png" @click="num--"></p>
    <div class="card margin16">
      <div class="content">
        <div class="login-box">
          <md-input-item ref="input13" v-model="copyUse" title="复印用途" placeholder="复印用途" is-highlight></md-input-item>
          <div class="login-box-div">
            <span class="flexF">复印份数</span>
            <div class="flexR calculate">
              <span class="addValue ">
                <img src="@/assets/images/icon_reduce@2x(1).png" @click="num--">
                <span> {{num}}</span>
                <img src="@/assets/images/icon_add@2x.png" @click="num++">
              </span>
            </div>
          </div>
          <md-field-item title="复印用途" arrow="arrow-right" :addon="selectorValue" @click="showSelector "> </md-field-item>
          <md-input-item ref="input13" v-model="useInfo" title="用途说明" placeholder="用途说明" is-highlight></md-input-item>
          <md-input-item ref="input13" v-model="remark" title="备注" placeholder="备注" is-highlight></md-input-item>
          <md-input-item type="phone" v-model="mobile" title="手机号码" placeholder="xxx xxxx xxxx" clearable is-highlight></md-input-item>
          <div class="hq login-box-div">
            <span class="flexF">验证码</span>
            <input class="flexF" type="text" name="username" v-model="verifyCode" placeholder="请输入验证码" maxlength="11">
            <p class="flexR">
              <span v-show="show" class="send1" @click="getCode">获取验证码</span>
              <span v-show="!show" class="send1">发送 {{count}} 秒</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <md-selector v-model="isSelectorShow" default-value="2" :data="test" max-height="320px" title="选择卡类型" @choose="onSelectorChoose"></md-selector>
    <md-agree v-model="agreeConf.checked" :disabled="false" size="md" @change="onChange(agreeConf.checked)">
      我已阅读并了解
      <a @click="openPgmodel" style="color:#1da1f3">《病历复印规定》</a>
    </md-agree>
    <Pgmodal ref="Pgmodal"></Pgmodal>
    <md-button type="primary" round class="margin16">确认提交</md-button>
  </div>
</template>
<script type="text/babel">
import Pgmodal from "../component/pgmodal/pgmodal.vue";
let sendNewVerifyCode = "/appLogin/sendNewVerifyCode";
export default {
  data() {
    return {
      isWeixin: false,
      name: '张三丰',
      copyUse: '',
      idcard: '454444444',
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
      selectorValue: '全套复印',
      isSelectorShow: false,
      test: [
        {
          value: '1',
          text: '全套复印',
        },
        {
          value: '2',
          text: '交通事故',
        },
        {
          value: '2',
          text: '保险',
        },
        {
          value: '2',
          text: '商业保险',
        },
        {
          value: '2',
          text: '报销',
        },
      ],
    };
  },
  created() {
    this.$refs.Pgmodal.type = 2
  },
  watch: {
    num(newValue) {
      if (newValue < 1) this.num = 1
    }
  },
  mounted() {
    document.title = '资料确认';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
    } else {
      this.isWeixin = true;
    }
  },
  methods: {
    onChange(checked) {
      console.log(`agree name =  ${checked ? 'checked' : 'unchecked'}`);
    },
    openPgmodel() {
      this.$refs.Pgmodal.openPgmodel();
    },
    onSelectorChoose(data) {
      this.selectorValue = data.text;
      this.type = data.value * 1;
    },
    showSelector() {
      this.isSelectorShow = true
    },
    getCode() {
      let _this = this;
      const TIME_COUNT = 60;
      if (this.phonenumber.length < 11) {
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
          this.$axios.post(sendNewVerifyCode + '?mobile=' + _this.phonenumber + '&verifyType=' + 1, {
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
  margin-left: 100px;
}
</style>