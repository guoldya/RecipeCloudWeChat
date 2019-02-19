<template>
   <div class="cardblind">
      <Header post-title="绑定就诊卡" v-show="isWeixin"></Header>
      <div :class="{margin45:isWeixin,outCarint:true }">
         <md-field>
            <md-input-item ref="input13" v-model="name" title="姓名" placeholder="姓名" is-highlight></md-input-item>
            <md-input-item type="phone" v-model="phonenumber" title="手机号码" placeholder="xxx xxxx xxxx" clearable></md-input-item>

            <md-button @click="tijiao" type="primary" round style="margin-top:16px">保存</md-button>
         </md-field>
      </div>
   </div>
</template>
<script>
import { InputItem, Field } from 'mand-mobile'
let sendNewVerifyCode = "/appLogin/sendNewVerifyCode";

export default {
   name: 'input-item-demo',
   title: '普通输入框',
   data() {
      return {
         isWeixin: false,
         phonenumber: '',
         name: ''
      }
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

      tijiao() {
         this.$dialog.alert({
            title: '提示',
            content: '该卡绑定成功!',
            confirmText: '确定',
            onConfirm: () => {
               this.$router.push({
                  name: 'cardblind',
               });
            },
         })
         // if (this.phonenumber.length < 11 || this.name.length == 0) {
         //    this.$toast.info('请完善信息')
         // } else {
         //    this.$axios.post(sendNewVerifyCode + '?name=' + _this.name + '?mobile=' + _this.phonenumber + '&verifyType=' + 1, {
         //    }, {
         //          headers: {
         //             'TOKEN': `edd169b85704410aa5219512cb6f1f00`,
         //             'UUID': `AAA`
         //          },
         //       }).then(res => {
         //          if (res.data.code == '200') {

         //          } else if (res.data.code == '800') {

         //          }
         //       }).catch(function (err) {
         //          console.log(err);
         //       });
         // }

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