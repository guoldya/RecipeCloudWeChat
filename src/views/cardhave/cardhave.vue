<template>
  <div :class="{'outCarint':true,'margin45':isWeixin}">
    <Header post-title="资料确认" v-show="isWeixin"></Header>
    <div class="rebinding-box card margin16">
      <div class="box-timeline  cardText">
        <div class="alltimeball">
          <div class="timeball acitiveball">1</div>
          <div class="timeball acitiveball">2</div>
          <div class="timeball acitiveball">3</div>
        </div>
        <div class="alltimeball">
          <span class="acitivestep">手机验证</span>
          <span class="acitivestep">上传证件</span>
          <span class="acitivestep">资料确认</span>
        </div>
        <div class="timeballline"></div>
        <div class="timeballline2" style="background:#1da1f3"></div>
      </div>
    </div>
    <p>
      <md-icon name="success-color" size="lg" svg style="position:relative;top:5px; "></md-icon>
      <span style="margin-left:10px;color:#1da1f3">验证成功！请确认家长信息是否正确</span>
    </p>
    <div class="card margin16">
      <div class="cardText login-box">
        <div class="content">
          <div class="login-box">
            <div class="login-box-div">
              <span class="flexF">姓名</span>
              <input class="flexF" type="text" name="username" id="phone" placeholder="姓名" :value="name" maxlength="11">
            </div>
            <md-field-item title="性别" solid>
              <md-radio name="1" v-model="sex" label="男" inline />
              <md-radio name="2" v-model="sex" label="女" inline />
            </md-field-item>
            <div class="login-box-div">
              <span class="flexF">民族</span>
              <input class="flexF" type="text" name="username" id="phone" placeholder="民族" :value="national" maxlength="11">
            </div>
            <div class="login-box-div">
              <span class="flexF">出生日期</span>
              <input id="verify" type="text" class="infos flexF" name="yanz" :value="birth" placeholder="出生日期" />
            </div>
            <div class="login-box-div">
              <span class="flexF">地址</span>
              <input class="flexF" type="text" name="username" id="phone" placeholder="地址" :value="address" maxlength="11">
            </div>
            <div class="login-box-div">
              <span class="flexF">身份证号</span>
              <input id="verify" type="text" class="infos flexF" name="yanz" placeholder="身份证号" :value="idCard" maxlength="4" />
            </div>
            <div class="login-box-div">
              <span class="flexF">身份证有效期</span>
              <input id="verify" type="text" class="infos flexF" name="yanz" placeholder="身份证有效期" :value="goodtime" maxlength="4" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <md-button type="primary" round class="margin16" @click="tijiao">正确</md-button>
    <md-button @click="$router.go(-1)" type="default" round style="margin-bottom:20px;">错误，重新上传</md-button>
  </div>
</template>
<script type="text/babel">
let bizPatientCard = "/app/bizPatientCard/insert"
export default {
  data() {
    return {
      isWeixin: false,
      name: '',
      idCard: '',
      national: '',
      birth: '',
      address: '',
      goodtime: '',
      sex: '1',
      licenseTime: '',
      validityTime: '',
      photo0Data: [],
      photo1Data: [],
    };
  },
  created() {

  },
  mounted() {

    // var date = '20150305';
    // var date1 = date.substring(0, 4);
    // var date2 = date.substring(4, 6);
    // var date3 = date.substring(6, 8);
    // var aa = date1 + "-" + date2 + "-" + date3;
    //  alert(aa.replace(/\b(0+)/gi, ""));
    document.title = '资料确认';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
    } else {
      this.isWeixin = true;
    }

    if (this.$store.state.photo0Data) {
      console.log(this.$store.state.photo0Data.sex)
      console.log(this.$store.state.photo0Data)
      this.photo0Data = this.$store.state.photo0Data;
      this.address = this.photo0Data.address;
      this.name = this.photo0Data.name;
      this.idCard = this.photo0Data.idCard;
      if (this.photo0Data.sex == "男") {
        this.sex = "1";
      } else {
        this.sex = "2";
      }
      this.national = this.photo0Data.national;
      var date1 = this.photo0Data.birth.substring(0, 4);
      var date2 = this.photo0Data.birth.substring(4, 6);
      var date3 = this.photo0Data.birth.substring(6, 8);
      this.birth = date1 + "-" + date2 + "-" + date3;
    }
    if (this.$store.state.photo1Data) {
      console.log(this.$store.state.photo1Data);
      this.licenseTime = this.$store.state.photo1Data.licenseTime;
      this.validityTime = this.$store.state.photo1Data.validityTime;
      this.goodtime = this.$store.state.photo1Data.licenseTime + '~' + this.$store.state.photo1Data.validityTime;
    }

  },
  methods: {
    tijiao() {

      if (this.$store.state.photo0Data) {
        if (this.idCard != this.photo0Data.idCard) {
          this.$toast.info("请核对身份证号码");
          return
        }
      }


      this.$axios.post(bizPatientCard, {
        idCardFrontImg: this.$store.state.idCardFrontImg,
        idCardBackImg: this.$store.state.idCardBackImg,
        orgCode: localStorage.getItem("hospitalId") * 1,
        address: this.address,
        patientName: this.name,
        idCard: this.idCard,
        sex: this.sex * 1,
        national: this.national,
        birthday: this.birth,
        mobile: this.$store.state.mobile,
      }).then((res) => {
        if (res.data.code == '200') {
          this.$toast.info("绑定成功");
          this.$router.go(-4);
          this.$router.options.routes[0].meta.keepAlive=false;
        } else {
          console.log(res.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  },
  computed: {

  },

};
</script>
 <style scoped>
@import url("../cardwrite/cardwrite.css");
</style>