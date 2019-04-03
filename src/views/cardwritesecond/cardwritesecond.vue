<template>
  <div class="second margin55">
    <Header post-title="身份验证"></Header>
    <div class="rebinding-box flatCard margin16">
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
    <div class="outCarint writeContent">
      <h4 style="line-height:20px">说明：</h4>
      <div>1、成人上传身份证的正面+反面一共2张照片；或进行人<p style="text-indent: 22px">脸识别；</p></div>
      <div>2、儿童如果没有身份证，需上传父母其中一人的身份证<p style="text-indent: 22px">的正面+反面一共2张照片；</p></div>
      <div>3、资料提交后，需医院人工审核，请耐心等待；</div>
      <div>4、请上传真实、清晰的证件照片，并填写正确的资料，<p style="text-indent: 22px">以免造成就诊信息错误；</p></div>
      <div>5、注册成功后，三个月可解绑一次！</div>
      <div class="agree">
        <md-radio name="0" size="lg" v-model="checked" label="同意采集个人身份信息" />
      </div>
    </div>

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
   .writeContent div{
     line-height: 54px;
     text-align: justify;
     color: #979797;
   }.box-timeline .timeball
   .writeContent .agree{
     font-size: 30px;
     color:#333333;
   }
</style>