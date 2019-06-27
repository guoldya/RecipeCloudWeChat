<template>
  <div class="cardblind">
    <Header post-title="绑定就诊卡"></Header>
    <div class="margin55">
      <md-field>
        <md-input-item class="outCarint" ref="input13" v-model="name" title="姓名" placeholder="姓名" maxlength="10"></md-input-item>
        <md-field-item class="outCarint" title="卡类型" arrow="arrow-right" :addon="selectorValue" @click="showSelector">
        </md-field-item>
        <md-input-item class="outCarint" ref="input13" v-model="cardNo" :title="selectorValue+'号'" maxlength="11" placeholder="请输入卡号"></md-input-item>
        <md-input-item class="outCarint" type="phone" v-model="mobile" title="手机号码" placeholder="xxx xxxx xxxx" clearable></md-input-item>
        <div class="hq login-box-div outCarint">
          <span class="flexF">验证码</span>
          <input class="flexF" type="text" name="username" v-model="verifyCode" placeholder="请输入验证码" maxlength="6">
          <p class="flexR">
            <span v-show="show" class="send1" @click="getCode">获取验证码</span>
            <span v-show="!show" class="send1">发送 {{count}} 秒</span>
          </p>
        </div>
        <md-button @click="tijiao" type="primary" round style="margin-top:16px">提交</md-button>
      </md-field>
      <md-selector v-model="isSelectorShow" default-value="1" :data="test" max-height="320px" title="选择卡类型" @choose="onSelectorChoose"></md-selector>
      <p class="warnTip">温馨提示：就诊卡绑定成功后，三个月可解绑一次！</p>
    </div>
  </div>
</template>
<script>
import { InputItem, Field } from 'mand-mobile'
let sendNewVerifyCode = "/api/bas/appLogin/sendNewVerifyCode";
let wechatbizPatientCardbinding = "/api/hos/bizPatientCard/insert";
let checkMobile = "/api/hos/bizPatientCard/checkMobile";
export default {
  data() {
    return {
      mobile: '',
      type: 1,
      name: '',
      cardNo: '',
      verifyCode: '',
      count: '',
      show: true,
      isSon: false,
      isSelectorShow: false,
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
    tijiao() {
      if (this.mobile.length < 11 || this.name.length == 0 || this.verifyCode.length < 6 || this.cardNo.length === 0) {
        this.$toast.info('请完善信息')
      } else {
        this.$axios.put(checkMobile + '?verifyCode=' + this.verifyCode + '&verifyType=' + 1 + '&mobile=' + this.mobile, {
        }).then(res => {
          if (res.data.code == '200') {
            this.$axios.post(wechatbizPatientCardbinding, {
              patientName: this.name,
              mobile: this.mobile,
              verifyType: 1,
              type: this.type,
              cardNo: this.cardNo,
              verifyCode: this.verifyCode,
              orgCode: localStorage.getItem("hospitalId") * 1,
            }).then(res => {
              if (res.data.code == '200') {
                this.$store.dispatch('getCards', { update: true });
                this.$dialog.alert({
                  title: '提示',
                  content: '该卡绑定成功!',
                  confirmText: '确定',
                  onConfirm: () => {
                    this.$router.go(-1);
                  },
                });
              } else {
                this.$toast.info(res.data.msg)
              }
            }).catch(function (err) {
              console.log(err);
            });
          } else {
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
.cardblind .md-button.block {
  width: 94%;
}
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
.cardblind .warnTip {
  text-align: left;
  color: red;
  padding: 24px;
}
</style>