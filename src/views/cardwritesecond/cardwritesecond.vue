<template>
  <div class="outCarint margin45">
    <Header post-title="身份验证"></Header>
    <div class="rebinding-box card margin16">
      <div class="box-timeline  cardText">
        <div class="alltimeball">
          <div class="timeball acitiveball">1</div>
          <div class="timeball acitiveball">2</div>
          <div class="timeball">3</div>
        </div>
        <div class="alltimeball">
          <span class="acitivestep">手机验证</span>
          <span class="acitivestep">身份验证</span>
          <span>资料确认</span>
        </div>
        <div class="timeballline"></div>
        <div class="timeballline2"></div>
      </div>
    </div>
    <p>
      <md-radio style="line-height:50px;color:#4A4A4A" name="0" v-model="checked" label="同意采集个人身份信息" />
    </p>
    <h4 style="line-height:20px">说明：</h4>
    <p>1、成人上传身份证的正面+反面一共2张照片；或进行人脸识别； </p>
    <p>2、儿童如果没有身份证，需上传父母其中一人的身份证的正面+反面一共2张照片； </p>
    <p>3、资料提交后，需医院人工审核，请耐心等待；</p>
    <p>4、请上传真实、清晰的证件照片，并填写正确的资料，以免造成就诊信息错误；</p>
    <p>5、注册成功后，三个月可解绑一次！</p>
    <md-button @click="cardwriteson(1)" type="primary" round class="margin16">成人身份证认证</md-button>
    <md-button @click="cardwriteson(2)" type="primary" round class="margin16">儿童身份证认证</md-button>
    <md-button type="primary" round class="margin16">人脸识别</md-button>
  </div>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      currentStep: 0,
      checked: '0',
    };
  },
  created() {

  },
  mounted() {
    document.title = '身份验证';
  },
  methods: {
    cardwriteson: function (value) {
      let argu = {};
      argu.isSon = value;
      this.$router.push({
        name: 'cardwriteson',
        query: argu
      });
    },
  },
  computed: {

  },

};
</script>
 <style scoped>
@import url("../cardwrite/cardwrite.css");
.cardwritesecond {
  margin-top: 28px;
}
.cardwritesecond p {
  line-height: 50px;
  letter-spacing: 2px;
  color: #9e9e9e;
}
</style>