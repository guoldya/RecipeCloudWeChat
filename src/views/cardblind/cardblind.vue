<template>
  <div class="cardblind">
    <Header post-title="绑定就诊卡"  ></Header>
    <div :class="{margin45:isWeixin,outCarint:true }">
      <md-field>
        <md-input-item ref="input13" v-model="name" title="姓名" placeholder="姓名" is-highlight></md-input-item>
        <md-field-item title="卡类型" arrow="arrow-right" :addon="selectorValue" @click="showSelector ">
        </md-field-item>
        <md-input-item ref="input13" v-model="cardNo" :title="selectorValue+'号'" placeholder="请输入卡号" is-highlight></md-input-item>
        <md-input-item type="phone" v-model="phonenumber" title="手机号码" placeholder="xxx xxxx xxxx" clearable is-highlight></md-input-item>
        <div class="hq login-box-div">
          <span class="flexF">验证码</span>
          <input class="flexF" type="text" name="username" v-model="verifyCode" placeholder="请输入手机号" maxlength="11">
          <p class="flexR">
            <span v-show="show" class="send1" @click="getCode">获取验证码</span>
            <span v-show="!show" class="send1">发送 {{count}} 秒</span>
          </p>
        </div>
        <md-button @click="tijiao" type="primary" round style="margin-top:16px">保存</md-button>
      </md-field>
      <md-selector v-model="isSelectorShow" default-value="2" :data="test" max-height="320px" title="选择卡类型" @choose="onSelectorChoose"></md-selector>

      <p class="warnbottom">温馨提示：就诊卡绑定成功后，三个月可解绑一次！</p>
    </div>
  </div>
</template>
<script>
import { InputItem, Field } from 'mand-mobile'
let sendNewVerifyCode = "/appLogin/sendNewVerifyCode";
let wechatbizPatientCardbinding = "/app/bizPatientCard/insert";
export default {
  name: 'input-item-demo',
  title: '普通输入框',
  data() {
    return {
      phonenumber: '',
      type: 1,
      name: '',
      cardNo: '',
      verifyCode: '',
      count: '',
      show: true,
      isSon: false,
      isSelectorShow: false,
      pickerData1: [],
      pickerValue1: '',
      isWeixin: false,
      selectorValue: '就诊卡',
      test: [
        {
          value: '1',
          text: '就诊卡',
        },
        {
          value: '2',
          text: '社保卡',
        },
      ],
    }
  },
  /* DELETE */
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
  },
  mounted() {
    document.title = '绑定就诊卡';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
    } else {
      this.isWeixin = true;
    };
  },
  methods: {
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorChoose(data) {
      this.selectorValue = data.text;
      this.type = data.value * 1;
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
    tijiao() {
      if (this.phonenumber.length < 11 || this.name.length == 0) {
        this.$toast.info('请完善信息')
      } else {
        this.$axios.post(wechatbizPatientCardbinding, {
          patientName: this.name,
          mobile: this.phonenumber,
          verifyType: 1,
          type: this.type,
          cardNo: this.cardNo,
          verifyCode: this.verifyCode,
          orgCode: localStorage.getItem("hospitalId") * 1,
        }, {
            headers: {
              'TOKEN': `edd169b85704410aa5219512cb6f1f00`,
              'UUID': `AAA`
            },
          }).then(res => {
            if (res.data.code == '200') {
              this.$dialog.alert({
                title: '提示',
                content: '该卡绑定成功!',
                confirmText: '确定',
                onConfirm: () => {
                  this.$router.go(-1);
                  this.$router.options.routes[0].meta.keepAlive=false;
                },
              });
            } else if (res.data.code == '800') {
              this.$toast.info(res.data.msg)
            }
          }).catch(function (err) {
            console.log(err);
          });
      }
    },
  },
}

</script>
 <style scoped>
.cardblind .login-box-div {
  display: flex;
  width: 100%;
  height: 100px;
  position: relative;
  border-bottom: 1px solid #f0f1f4;
}

.cardblind .hq p .send1 {
  width: 100%;
  height: 50px;
  font-size: 26px;
  border: 2px solid #2aa4f3;
  border-radius: 10px;
  padding: 0 10px;
  color: #2aa4f3;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cardblind div input {
  flex: 4;
  height: 100%;
  border: none;
  font-size: 28px;
  color: #111a34;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 0;
  background: transparent;
  padding-left: 50px;
}
</style>