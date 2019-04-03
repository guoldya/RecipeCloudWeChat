<template>
  <div class="writeSon margin55">
    <Header post-title="身份验证"></Header>
    <div class="rebinding-box flatCard">
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
    <div class="cardText flatCard">
      <div v-show="isSon" class=" margin5">
        <div class="changenet" >
          <span>关系</span>
          <span class="changenetright" @click="showSelector">{{selectorValue}}<img class="icon_right" src="@/assets/images/icon_right.png" alt=""></span>
        </div>
      </div>
      <p style="color:#000;padding-top: 16px">拍摄/上传您的二代身份证</p>
      <div class="pg_positive">
        <div class="pg_positive_img">
          <input class="ivu-upload-input" @change="uploadPos($event)" type="file" name="positive" id="positive" accept="image/gif,image/jpeg,image/x-png" />
          <label class="ivu-upload-input_label" for="positive" style="display:block; height: 120px;">
            <img :src="othUrl" alt="">
          </label>
          <p>身份证正面</p>
        </div>
        <div class="pg_positive_img">
          <label class="ivu-upload-input_label" for="outside" style="display:block; height: 120px;">
            <input class="ivu-upload-input" @change="uploadOth($event)" type="file" name="outside" id="outside" accept="image/gif,image/jpeg,image/x-png" />
            <img :src="posUrl" alt="">
          </label>
          <p>身份证反面</p>
        </div>
      </div>
    </div>
    <p class="addbTN" @click="cardconfirm()">下一步</p>
    <!--<md-button @click="cardconfirm" type="primary" round style="margin-top:60px">下一步</md-button>-->
    <md-selector v-model="isSelectorShow" default-value="1" :data="test" max-height="320px" title="普通模式" @choose="onSelectorChoose"></md-selector>
  </div>
</template>
<script type="text/babel">
let uploadImgimage = "/uploadImg/image";
import pg_negative from '@/assets/images/pg_negative.png'
import pg_positive from '@/assets/images/pg_positive.png'
export default {
  data() {
    return {
      AAA: '',
      BBB: '',
      isSon: false,
      isSelectorShow: false,
      selectorValue: '爸爸',
      files: {
        posFile: null,
        othFile: null,
      },
      imgFiles: [],
      posUrl: pg_negative,
      othUrl: pg_positive,
      test: [
        {
          value: '1',
          text: '爸爸',
        },
        {
          value: '2',
          text: '妈妈',
        },
      ],
    };
  },
  created() {

  },
  mounted() {
    document.title = '身份验证';
    // if (this.$store.state.posUrl) {
    //   this.posUrl = this.$store.state.posUrl;
    // } else {
    //   this.posUrl = pg_negative
    // }
    // if (this.$store.state.othUrl) {
    //   this.othUrl = this.$store.state.othUrl;
    // } else {
    //   this.othUrl = pg_positive
    // }

    if (this.$route.query.isSon * 1 == 2) {
      this.isSon = true;
    }

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
      this.BBB = e.target.files[0];
    },
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorChoose({ text }) {
      this.selectorValue = text;
    },



    cardconfirm() {
      let param = new FormData(); //创建form对象
      console.log(this.AAA.name, this.BBB.name, "sss");
      if (!this.AAA.name || !this.BBB.name) {
        this.$toast.info("请上传图片")
        return;
      }

      var index1 = this.AAA.name.lastIndexOf(".");
      var index2 = this.AAA.name.length;
      var suffix = this.AAA.name.substring(index1 + 1, index2);//后缀名

      var index11 = this.BBB.name.lastIndexOf(".");
      var index22 = this.BBB.name.length;
      var suffix1 = this.BBB.name.substring(index11 + 1, index22);//后缀名

      param.append('photo0', this.AAA, "photo0." + suffix);//通过append向form对象添加数据
      param.append('photo1', this.BBB, "photo1." + suffix1);//通过append向form对象添加数据
      console.log(param);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };  //添加请求头
      this.$axios.post(uploadImgimage + '?certificateName=idCard', param, config)
        .then(res => {
          if (res.data.code == '200') {
            this.$store.commit('photo0DataFun', res.data.fileData.photo0);
            this.$store.commit('photo1DataFun', res.data.fileData.photo1);
            console.log(res.data.fileInfo[0].fileName, "我是正面");
            console.log(res.data.fileInfo[1].fileName, "我是正面");
            this.posUrl = this.$conf.constant.img_base_url + res.data.fileInfo[0].fileName;
            this.othUrl = this.$conf.constant.img_base_url + res.data.fileInfo[1].filename;


            this.$store.commit('idCardFrontImgFun', res.data.fileInfo[0]);
            this.$store.commit('idCardBackImgFun', res.data.fileInfo[1]);

            this.$store.commit('posUrlFun', this.posUrl);
            this.$store.commit('othUrlFun', this.othUrl);
            this.$router.push({
              name: 'cardhave',
              // query: argu
            });
          } else {
            this.$toast.info(res.data.msg)
          }
        }).catch(function (err) {
          console.log(err);
        });;

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
  border-bottom: 1px solid #e9e9e9;
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
  border-radius: 10px;
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