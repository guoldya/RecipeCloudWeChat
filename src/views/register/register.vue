<template>
   <div class="outCarint">
      <Header post-title="注册"></Header>
      <div>
         <!-- <img src="@/assets/images/AAAA.png" alt=""> -->
      </div>
      <div class="card margin16">
         <div class="cardText login-box">
            <div class="content">
               <div class="login-box">
                  <div class="hq login-box-div">
                     <span class="flexF">手机号</span>
                     <input class="flexF" type="text" name="username" v-model="phonenumber" placeholder="请输入手机号" maxlength="11">
                     <p class="flexR">
                        <span v-show="show" class="send1" @click="getCode">获取验证码</span>
                        <span v-show="!show" class="send1">发送 {{count}} 秒</span>
                     </p>
                  </div>
                  <div class="login-box-div">
                     <span class="flexF">验证码</span>
                     <input id="verify" class="infos flexF" v-model="verifyCode" type="text" name="yanz" placeholder="请输入验证码" maxlength="6" />
                  </div>
               </div>
            </div>
         </div>
      </div>
      <md-button type="primary" round @click="tijiao">注册</md-button>
   </div>
</template>
<script type="text/babel">
let sendNewVerifyCode = '/appLogin/sendNewVerifyCode';
let appregister = '/appLogin/login';
export default {
   data() {
      return {
         phonenumber: '',
         verifyCode: '',
         show: true,
         count: '',
         timer: null,
      };
   },
   created() {

   },

   methods: {
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
                  console.log(res.data.code, "ss")
                  if (res.data.code == '200') {

                     _this.$toast.info('已发送验证码')
                  } else if (res.data.code == '800') {

                  }
               }).catch(function (err) {
                  console.log(err);
               });

            }
         }

      },

      tijiao() {
         this.isTijiao = false;
         this.$toast.loading("提交中...")
         this.$axios.post(appregister, {
            mobile: this.mobile,
            verifyCode: this.verifyCode,
            accessToken: sessionStorage.getItem("accessToken"),
            openid: sessionStorage.getItem("openid"),
         }).then(res => {
            if (res.data.code == '200') {
               var storage = window.localStorage;
               storage.setItem("token7", res.data.data.token);
               sessionStorage.removeItem('openid');
               sessionStorage.removeItem('accessToken');
               this.$store.dispatch('getAccount', { update: true });
               // storage.setItem("memberId", res.data.data.memberId);
               // storage.setItem("mobile", res.data.data.mobile);
               this.$axios.put(myDetailed, {}).then((res) => {
                  if (res.data.code == '200') {
                     this.isTijiao = true;
                     storage.setItem("patientId", res.data.data.id);
                     setTimeout(() => {
                        this.$toast.info("绑定成功");
                        this.$router.go(-1);
                     }, 1000);


                  } else {
                     this.$toast.info(res.data.msg)
                  }
               }).catch(function (err) {
                  console.log(err);
               });

            } else {
               this.isTijiao = true;
               this.count = '';
               this.$toast.info(res.data.msg)
            }
         }).catch(function (err) {
            console.log(err);
         });;

      },

      
   },


};
</script>
 <style scoped>
@import url("../cardwrite/cardwrite.css");
</style>