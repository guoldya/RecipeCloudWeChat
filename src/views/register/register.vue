<template>
   <div :class="{'outCarint':true,'margin45':isWeixin, }">
      <Header post-title="注册"  ></Header>
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
         isWeixin: false,
         show: true,
         count: '',
         timer: null,
      };
   },
   created() {

   },
   mounted() {
      document.title = '注册';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
         return true;
      } else {
         this.isWeixin = true;
         return false;
      }
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
         let _this = this;
         this.$axios.post(appregister + '?mobile=' + _this.phonenumber + '&appType=' + 1 + '&verifyType=' + 1 + '&verifyCode=' + _this.verifyCode + '&wechatCode=' + '06198ZBu0yPS8i1ugYAu0f71Cu098ZBp', {
            
         }).then(res => {
            if (res.data.code == '200') {
               var storage = window.localStorage;
               storage.setItem("token", res.data.data.token);
               storage.setItem("memberId", res.data.data.memberId);
               storage.setItem("mobile", res.data.data.mobile);
               console.log(localStorage.getItem("token"), "缓存的 loca ")
               _this.$router.back();

            } else if (res.data.code == '800') {

            }
         });
      },
   },
   computed: {

   },

};
</script>
 <style scoped>
@import url("../cardwrite/cardwrite.css");
</style>