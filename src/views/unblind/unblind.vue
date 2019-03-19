<template>
  <div class="outCarint margin45">
    <Header post-title="就诊卡详情"></Header>
    <p>
      <md-icon name="warn-color" size="lg" color="orange" svg style="position:relative;top:5px; "></md-icon>
      <span style="margin-left:10px;color:red">绑定3个月以上才可以解绑一次</span>
    </p>
    <div class="card margin16"  style="margin-top:10px">
      <div class="cardText login-box">
        <div class="content">
          <div class="login-box">
            <div class="login-box-div">
              <span class="flexF">姓名</span>
              <input class="flexF" type="text" name="username" placeholder="姓名" :value="patientName" maxlength="11">
            </div>
            <div class="login-box-div">
              <span class="flexF">电子就诊卡号</span>
              <input class="flexF" type="text" name="cardNo" placeholder="电子就诊卡号" :value="cardNo">
            </div>
            <!-- <div class="login-box-div">
              <span class="flexF">登记号</span>
              <input type="text" class="infos flexF" name="yanz" placeholder="登记号" :value="registerNo" maxlength="4" />
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="card margin16">
      <div class="cardText login-box">
        <div class="content">
          <div class="login-box">
            <div class="login-box-div">
              <span class="flexF">手机号码</span>
              <input type="text" class="infos flexF" name="yanz" :value="mobile" placeholder="手机号码" maxlength="4" />
            </div>
            <div class="login-box-div">
              <span class="flexF">身份证号</span>
              <input class="flexF" type="text" name="username" placeholder="身份证号" :value="idCard" maxlength="11">
            </div>
            <div class="login-box-div">
              <span class="flexF">绑卡时间</span>
              <input type="text" class="infos flexF" name="yanz" placeholder="绑卡时间" :value="createTime" maxlength="4" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <md-button type="primary" round class="margin16" @click="unBlind">解除绑定</md-button>

  </div>
</template>
<script type="text/babel">
let appbizPatientCarduntie = "/app/bizPatientCard/untie";
let cardDetail = "/app/bizPatientCard/read/detail";
export default {
  data() {
    return {
      
      patientName: '',
      cardNo: '',
      registerNo: '',
      idCard: '',
      createTime: '',
      mobile: '',
      cardinfo: '',
    };
  },
  created() {
    this.$axios.put(cardDetail, {
      id: this.$route.query.id * 1,
    }).then(res => {
      if (res.data.code == '200') {
        this.cardinfo = res.data.data;
        this.patientName = res.data.data.patientName;
        this.cardNo = res.data.data.cardNo;
        this.mobile = res.data.data.mobile;
        this.idCard = res.data.data.idCard;
        this.createTime = res.data.data.createTime;
      }
    }).catch(function (err) {
      console.log(err);
    });


  },
  mounted() {

    document.title = '就诊卡详情';
  },
  methods: {
    unBlind() {
      this.$dialog.confirm({
        title: '提示',
        content: '确定解除绑定吗!',
        confirmText: '确定',
        cancelText: '取消',
        onConfirm: () => {
          this.$axios.post(appbizPatientCarduntie, {
            id: this.$route.query.id * 1,
            patientName: this.patientName,
            cardNo: this.cardNo,
            mobile: this.mobile,
            idCard: this.idCard,
            createTime: this.createTime,
          }).then(res => {
            if (res.data.code == '200') {
              this.$router.go(-1);
            } else {
              this.$toast.info(res.data.msg)
            }
          }).catch(function (err) {
            console.log(err);
          });

        },
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