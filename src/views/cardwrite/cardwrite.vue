<template>
  <div class="outCarint margin45">
    <Header post-title="手机验证"></Header>
    <div class="rebinding-box card margin16">
      <div class="box-timeline  cardText">
        <div class="alltimeball">
          <div class="timeball acitiveball">1</div>
          <div class="timeball">2</div>
          <div class="timeball">3</div>
        </div>
        <div class="alltimeball">
          <span class="acitivestep">手机验证</span>
          <span>身份验证</span>
          <span>资料确认</span>
        </div>
        <div class="timeballline acitiveline"></div>
        <div class="timeballline2"></div>
      </div>
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
              <input v-model="verifyCode" id="verify" type="text" class="infos flexF" name="yanz" placeholder="请输入验证码" maxlength="6" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <md-button type="primary" round @click="tijiao">提交</md-button>
  </div>
</template>
<script type="text/babel">
let bizPatientCardinsert = "/app/bizPatientCard/insert";
let sendNewVerifyCode = "/appLogin/sendNewVerifyCode";
let appLogingetVerifyCode = "/app/bizPatientCard/checkMobile";
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
  mounted() {
    document.title = '手机验证';
    
    
      
     
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
            if (res.data.code == '200') {
              _this.$toast.info('请查看验证码')
            } else {
              _this.$toast.info(res.data.msg)
            }
          }).catch(function (err) {
            console.log(err);
          });
        }
      }

    },

    tijiao() {
      if (this.phonenumber.length < 11 || this.verifyCode.length < 6) {
        this.$toast.info('请完善信息')
      } else {
        this.$axios.put(appLogingetVerifyCode + '?mobile=' + this.phonenumber + '&verifyType=' + 1 + '&verifyCode=' + this.verifyCode, {
          mobile: this.phonenumber,
          verifyType: 1,
        }).then(res => {
          if (res.data.code == '200') {
            this.$store.commit('mobileFun', this.phonenumber);
            let argu = {}
            this.$router.push({
              name: 'cardwritesecond',
              query: argu,
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
  computed: {

  },

};
</script>
 <style scoped>
@import url("./cardwrite.css");
</style>