<template>
  <div class="margin55 cardhave">
    <Header post-title="资料确认"></Header>
    <div class="rebinding-box flatCard outCarint" style="padding-top: 10px">
      <div class="box-timeline">
        <div class="alltimeball">
          <div class="timeball acitiveball">1</div>
          <div class="timeball acitiveball">2</div>
          <div class="timeball acitiveball">3</div>
        </div>
        <div class="alltimeball">
          <span class="acitivestep">手机验证</span>
          <span class="acitivestep">身份验证</span>
          <span class="acitivestep">资料确认</span>
        </div>
        <div class="timeballline"></div>
        <div class="timeballline2" style="background:var(--primary)"></div>
      </div>
    </div>
    <p class="havePadd">
      <md-icon name="success-color" size="lg" svg style="position:relative;top:5px  "></md-icon>
      <span style="margin-left:10px;color:var(--primary)">验证成功！请确认个人信息是否正确</span>
    </p>
    <div class="flatCard margin16" style="margin-top:20px">
      <div class="cardText login-box">
        <md-field>
          <md-detail-item title="姓名" :content="name" />
          <md-detail-item v-if="sex==1" title="性别" content="男" />
          <md-detail-item v-else title="性别" content="女" />
          <md-detail-item title="民族" :content="national" />
          <md-detail-item title="出生日期" :content="birth" />
          <md-detail-item title="地址" :content="address" />
          <md-detail-item title="身份证号" :content="idCard" />
          <md-detail-item title="身份证有效期" :content="goodtime">
          </md-detail-item>
        </md-field>

      </div>
    </div>
    <md-button type="primary" round class="margin16" @click="tijiao">正确</md-button>

    <md-button @click="$router.go(-1)" type="default" round style="margin-bottom:20px;">错误，重新上传</md-button>
  </div>
</template>
<script type="text/babel">
let bizPatientCard = "/api/hos/bizPatientCard/insert";
export default {
  data() {
    return {

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
    document.scrollingElement.scrollTop = 0
  },
  mounted() {

    // var date = '20150305';
    // var date1 = date.substring(0, 4);
    // var date2 = date.substring(4, 6);
    // var date3 = date.substring(6, 8);
    // var aa = date1 + "-" + date2 + "-" + date3;
    //  alert(aa.replace(/\b(0+)/gi, ""));
    document.title = '资料确认';
    console.log(this.$store.state.photo0Data);
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
          this.$store.dispatch('getCards', { update: true });
          this.$toast.info("绑定成功");
          this.$router.go(-4);
          // this.$router.options.routes[0].meta.keepAlive = false;
        } else {
          this.$toast.info(res.data.msg);
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
.cardhave .md-detail-item {
  line-height: 1.7;
  font-size: 30px;
}
.cardhave .havePadd {
  padding: 18px 24px 0;
}

.cardhave /deep/.md-detail-item div {
  width: 30%;
  line-height: 36px;
}
.cardhave /deep/.md-detail-item div:first-child:after {
  display: block;
}
.cardhave .default:after {
  border: transparent !important;
}
</style>