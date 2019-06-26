<template>
  <div class="writeSon   realname">
    <Header post-title="实名认证"></Header>
    <div class="cardText flatCard">
      <p style="color:#000;padding-top: 16px">请上传证件照片</p>
      <div class="pg_positive">
        <div class="pg_positive_img">
          <input class="ivu-upload-input" @change="uploadPos($event)" type="file" name="positive" id="positive" accept="image/*" />
          <label class="ivu-upload-input_label" for="positive">
            <img :src="othUrl" alt="">
          </label>
          <p>点击上传人面像</p>
        </div>
        <div class="pg_positive_img">
          <label class="ivu-upload-input_label" for="outside">
            <input class="ivu-upload-input" @change="uploadOth($event)" type="file" name="outside" id="outside" accept="image/*" />
            <img :src="posUrl" alt="">
          </label>
          <p>点击上传国徽面</p>
        </div>
      </div>
    </div>
    <div class="cardText flatCard cardtilte">
      <p>身份证照片要求</p>
      <p>拍摄时确保身份证
        <span style=" color: var(--primary); font-size: 14px;">边缘完整，字体清晰，亮度均匀</span>
      </p>
      <p>拍摄示例</p>
      <div>
        <img src="@/assets/images/znanwu (8).png" alt="" style="width:100%">
      </div>
    </div>
    <div class="flatCard margin5 outCarint">
      <div>
        <md-input-item ref="input13" v-model="name" title="姓名" placeholder="请输入您的姓名" maxlength="20"></md-input-item>
        <md-input-item v-model="idCard" title="身份证号" maxlength="18" placeholder="请输入您的身份证号" clearable></md-input-item>
      </div>
    </div>
    <p class="addbTN" @click="cardconfirm()">下一步</p>
  </div>
</template>
<script type="text/babel">
// let uploadImgimage = "/api/hos/uploadImg/image";
let uploadImgimage = "/api/hos/uploadImg/authentication";
import pg_negative from '@/assets/images/znanwu (7).png'
import pg_positive from '@/assets/images/znanwu (10).png'
import { mapState } from 'vuex';
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      AAA: '',
      BBB: '',
      files: {
        posFile: null,
        othFile: null,
      },
      posUrl: pg_negative,
      othUrl: pg_positive,
      name: '',
      idCard: '',
    };
  },

  computed: {
    ...mapState({
      _accountinfo: state => state.my.accountinfo,
    }),
  },
  methods: {
    uploadPos(e) {
      let that = this,
        file = e.target.files[0],
        fileReader = new FileReader();
      this.files.posFile = file;
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        that.othUrl = this.result;
      };
      fileReader.onloadend = function () {
        that.othUrl = this.result;
      };
      this.AAA = e.target.files[0];
    },
    uploadOth(e) {
      let that = this,
        file = e.target.files[0],
        fileReader = new FileReader();
      this.files.othFile = file;
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        that.posUrl = this.result;
      };
      fileReader.onloadend = function () {
        that.posUrl = this.result;
      };

      this.BBB = e.target.files[0];
    },

    cardconfirm() {
      let param = new FormData(); //创建form对象
      if (!this.AAA.name || !this.BBB.name) {
        this.$toast.info("请上传图片")
        return;
      }
      this.$toast.loading('图片上传中...')
      setTimeout(() => {
        this.$toast.hide();
      }, 5000);
      var index1 = this.AAA.name.lastIndexOf(".");
      var index2 = this.AAA.name.length;
      var suffix = this.AAA.name.substring(index1 + 1, index2);//后缀名

      var index11 = this.BBB.name.lastIndexOf(".");
      var index22 = this.BBB.name.length;
      var suffix1 = this.BBB.name.substring(index11 + 1, index22);//后缀名

      param.append('photo0', this.AAA, "photo0." + suffix);//通过append向form对象添加数据
      param.append('photo1', this.BBB, "photo1." + suffix1);//通过append向form对象添加数据
      if (!this.name || !this.idCard) {
        this.$toast.info("请完善信息");
        return
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };  //添加请求头
      this.$axios.post(uploadImgimage + '?name=' + this.name + '&idCard=' + this.idCard + '&patientId=' + sessionStorage.getItem("patientId"), param, config)
        .then(res => {
          if (res.data.code == '200') {
            setTimeout(() => {
              this.$toast.hide();
              this.$store.dispatch('getAccount', { update: true });
              this.$router.go(-1);
            }, 1000)
          } else if (res.data.code == '500') {
            this.$toast.info(res.data.msg)
          } else if (res.data.code == '800') {
            this.$toast.info(res.data.msg)
          }
        }).catch(function (err) {
          console.log(err);
        });

    },

  },


};
</script>
 <style lang="scss" scoped>
@import url("../../cardwrite/cardwrite.css");
.realname {
  margin: 110px 0;
}
.cardwritesecond {
  margin-top: 28px;
}
.pg_positive_img {
  p {
    background: var(--primary);
    color: #ffffff;
    line-height: 65px;
  }
}
.cardtilte {
  line-height: 50px;
  :first-child {
    font-size: 34px;
  }
  div {
    border: 2px solid #dedede;
    padding: 30px;
    border-radius: 10px;
  }
}

#positive,
#outside {
  display: none;
}
.cardwritesecond p {
  line-height: 50px;
  letter-spacing: 2px;
  color: #9e9e9e;
}
.changenet {
  /*padding: 30px 0;*/
  display: flex;
  justify-content: space-between;
  letter-spacing: 3px;
  color: #3a3a3a;
  border-bottom: 2px solid #e9e9e9;
  padding-bottom: 24px;
}
.changenet .icon_right {
  width: 14px;
  height: 26px;
  position: relative;
  top: 4px;
  left: 20px;
}
.changenetright {
  color: var(--primary--light);
  margin-right: 20px;
}
.pg_positive {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  text-align: center;
  line-height: 50px;
  color: #000000;
}
.pg_positive div {
  width: 49%;
  /*height: 240px;*/
}
.pg_positive div img {
  width: 100%;
  height: 100%;
}
/* .ivu-upload-input{
  display: none;
} */
.ivu-upload-input_label img {
  width: 100%;
  height: 100%;
}
.ivu-upload-input_label {
  position: relative;
  display: block;
  height: 240px;
}

.ivu-upload-input_label::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>