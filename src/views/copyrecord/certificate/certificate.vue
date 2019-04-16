<template>
  <div class="margin55 certificate">
    <Header post-title="上传证件"></Header>
    <div class="rebinding-box flatCard">
      <div class="box-timeline">
        <div class="alltimeball">
          <div class="timeball acitiveball">1</div>
          <div class="timeball acitiveball">2</div>
          <div class="timeball">3</div>
        </div>
        <div class="alltimeball">
          <span class="acitivestep">业务选择</span>
          <span class="acitivestep">上传证件</span>
          <span>信息确认</span>
        </div>
        <div class="timeballline"></div>
        <div class="timeballline2"></div>
      </div>
    </div>
    <div class="flatCard margin5 outCarint">
      <div class=" changenet">
        <span>关系</span>
        <span class="changenetright" @click="showSelector">{{selectorValue}}<img class="icon_right" src="@/assets/images/icon_right.png" alt=""></span>
      </div>
      <p style="color: var(--primary--title);margin-top: 15px">拍摄/上传您的二代身份证</p>
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
      <div class="pg_positive" style="padding-top:10px">
        <div class="pg_positive_img">
          <label class="ivu-upload-input_label" for="hanside" style="display:block; height: 120px;">
            <input class="ivu-upload-input" @change="uploadHan($event)" type="file" name="hanside" id="hanside" accept="image/gif,image/jpeg,image/x-png" />
            <img :src="hanUrl" alt="">
          </label>
          <p>手持身份证</p>
        </div>
      </div>
      <div style="margin-top: 20px">
        <md-input-item ref="input13" v-model="name" title="患者姓名" placeholder="患者姓名" is-highlight></md-input-item>
        <md-input-item v-model="idcard" title="身份证号" placeholder="患者身份证号" clearable is-highlight></md-input-item>
      </div>
      <!-- 申请人 -->
      <div v-show="isSelf">
        <p style="margin-top:40px ">申请人证件照</p>
        <div class="pg_positive">
          <div class="pg_positive_img">
            <input class="ivu-upload-input" @change="uploadPosApp($event)" type="file" name="positiveApp" id="positiveApp" accept="image/gif,image/jpeg,image/x-png" />
            <label class="ivu-upload-input_label" for="positiveApp" style="display:block; height: 120px;">
              <img :src="othAppUrl" alt="">
            </label>
            <p>身份证正面</p>
          </div>
          <div class="pg_positive_img">
            <label class="ivu-upload-input_label" for="outAppside" style="display:block; height: 120px;">
              <input class="ivu-upload-input" @change="uploadOthApp($event)" type="file" name="outAppside" id="outAppside" accept="image/gif,image/jpeg,image/x-png" />
              <img :src="posAppUrl" alt="">
            </label>
            <p>身份证反面</p>
          </div>
        </div>
        <div class="pg_positive" style="padding-top:10px">
          <div class="pg_positive_img">
            <label class="ivu-upload-input_label" for="hanAppside" style="display:block; height: 120px;">
              <input class="ivu-upload-input" @change="uploadHanApp($event)" type="file" name="hanAppside" id="hanAppside" accept="image/gif,image/jpeg,image/x-png" />
              <img :src="hanAppUrl" alt="">
            </label>
            <p>手持身份证</p>
          </div>
          <div class="pg_positive_img" @click="showPic=true">
            <label class="ivu-upload-input_label" style="display:block; height: 120px;">
              <img src="@/assets/images/u152.png" alt="">
            </label>
            <p class="mu-secondary-text-color">委托书样例</p>
          </div>
        </div>
        <div style="margin-top:20px">
          <md-input-item ref="input13" v-model="nameApp" title="申请人姓名" placeholder="申请人姓名" is-highlight></md-input-item>
          <md-input-item v-model="idcardApp" title="身份证号" placeholder="申请人身份证号" clearable is-highlight></md-input-item>
        </div>
      </div>
    </div>
    <div style="height:78px;background-color: #ffffff"></div>
    <p @click="cardconfirm" class="addbTN">下一步</p>
    <md-selector v-model="isSelectorShow" default-value="1" :data="test" max-height="320px" title="普通模式" @choose="onSelectorChoose"></md-selector>
    <md-landscape v-model="showPic" :mask-closable="true">
      <img src="@/assets/images/u152.png" alt="">
    </md-landscape>
  </div>
</template>
<script type="text/babel">
let uploadImgimage = "/uploadImg/image";
let addOrUpdate = "/app/bizCopyApply/uploadIdCard";
let appLoginuploadImage = "/appLogin/uploadImage";
import pg_negative from '@/assets/images/pg_negative.png'
import pg_positive from '@/assets/images/pg_positive.png'
import pg_handheld from '@/assets/images/icon_handheld.png'
export default {
  data() {
    return {
      AAA: '',
      BBB: '',
      CCC: '',
      DDD: '',
      FFF: '',
      EEE: '',
      name: '',
      idcard: '',
      nameApp: '',
      idcardApp: '',
      isSelf: false,
      isSelectorShow: false,
      selectorValue: '本人',
      receiverType: '1',
      files: {
        posFile: null,
        othFile: null,
      },
      imgFiles: [],
      posUrl: pg_negative,
      othUrl: pg_positive,
      hanUrl: pg_handheld,
      posAppUrl: pg_negative,
      othAppUrl: pg_positive,
      hanAppUrl: pg_handheld,
      showPic: false,
      test: [
        {
          value: '1',
          text: '本人',
        },
        {
          value: '2',
          text: '代理人',
        },
      ],
      nextPar: '',
      cardImg: [],
    };
  },
  created() {
    document.scrollingElement.scrollTop = 0
  },
  mounted() {
    document.title = '身份验证';
    console.log(this.$store.state.posUrl);
    console.log(this.$store.state.othUrl);
    // if (this.$store.state.othUrl) {
    //   this.posUrl = this.$store.state.othUrl;
    // } else {
    //   this.posUrl = pg_negative
    // }
    // if (this.$store.state.posUrl) {
    //   this.othUrl = this.$store.state.posUrl;
    // } else {
    //   this.othUrl = pg_positive
    // }


  },
  methods: {
    //患者正面
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
      console.log(this.AAA)
      if (this.AAA.name && this.BBB.name && this.CCC.name) {
        this.cardKnowledge()
      }
    },
    //患者反面
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
      if (this.AAA.name && this.BBB.name && this.CCC.name) {
        this.cardKnowledge()
      }
    },
    //患者手持
    uploadHan(e) {
      let that = this,
        file = e.target.files[0],
        fileReader = new FileReader();
      this.files.othFile = file;
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        that.hanUrl = this.result;
      };
      this.CCC = e.target.files[0];
      if (this.AAA.name && this.BBB.name && this.CCC.name) {
        this.cardKnowledge()
      }
    },
    // 申请人
    uploadPosApp(e) {
      let that = this,
        file = e.target.files[0],
        fileReader = new FileReader();
      this.files.posFile = file;
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        that.othAppUrl = this.result;
      };
      this.DDD = e.target.files[0];
      if (this.DDD.name && this.EEE.name && this.FFF.name) {
        this.applyKnoeledge()
      }
    },
    uploadOthApp(e) {
      let that = this,
        file = e.target.files[0],
        fileReader = new FileReader();
      this.files.othFile = file;
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        that.posAppUrl = this.result;
      };
      this.EEE = e.target.files[0];
      if (this.DDD.name && this.EEE.name && this.FFF.name) {
        this.applyKnoeledge()
      }
    },
    uploadHanApp(e) {
      let that = this,
        file = e.target.files[0],
        fileReader = new FileReader();
      this.files.othFile = file;
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        that.hanAppUrl = this.result;
      };
      this.FFF = e.target.files[0];
      if (this.DDD.name && this.EEE.name && this.FFF.name) {
        this.applyKnoeledge()
      }
    },
    // 选着人
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorChoose(data) {
      this.selectorValue = data.text;
      this.receiverType = data.value;
      if (data.value == 1) {
        this.isSelf = false
      } else {
        this.isSelf = true
      }
    },
    cardKnowledge() {
      let param = new FormData(); //创建form对象
      let param2 = new FormData(); //创建form对象
      if (this.AAA) {
        var index1 = this.AAA.name.lastIndexOf(".");
        var index2 = this.AAA.name.length;
        var suffix = this.AAA.name.substring(index1 + 1, index2);//后缀名
      }
      if (this.BBB) {
        var index11 = this.BBB.name.lastIndexOf(".");
        var index22 = this.BBB.name.length;
        var suffix1 = this.BBB.name.substring(index11 + 1, index22);//后缀名
      }
      if (this.CCC) {
        var indexCCC = this.CCC.name.lastIndexOf(".");
        var cccPng = this.CCC.name.length;
        var suffixCCC = this.CCC.name.substring(indexCCC + 1, cccPng);//后缀名
      }
      console.log(this.receiverType);
      param.append('photo0', this.AAA, "photo0." + suffix);//通过append向form对象添加数据
      param.append('photo1', this.BBB, "photo1." + suffix1);//通过append向form对象添加数据
      param2.append('photo0', this.AAA, "photo0." + suffix);//通过append向form对象添加数据
      param2.append('photo1', this.BBB, "photo1." + suffix1);//通过append向form对象添加数据
      param2.append('photo2', this.CCC, "photo2." + suffixCCC);//通过append向form对象添加数据
      console.log(param);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };
      this.$toast.loading('正在识别');
      //添加请求头


      this.$axios.post(appLoginuploadImage + '?certificateName=idCard', param2, config)
        .then(res => {
          if (res.data.code == '200') {
            this.$store.commit('idCardInfoFun', res.data.fileInfo);
          } else {
            this.$toast.info(res.data.msg)
          }
        });


      this.$axios.post(uploadImgimage + '?certificateName=idCard', param, config)
        .then(res => {
          if (res.data.code == '200') {
            this.$toast.hide();
            this.cardImg = res.data.fileInfo;
            this.$store.commit('cardImg', res.data.fileInfo);
            console.log(res.data.fileData.photo0);
            this.name = res.data.fileData.photo0.name;
            this.idcard = res.data.fileData.photo0.idCard;
            this.$store.commit('photo0DataFun', res.data.fileData.photo0);
            this.$store.commit('photo1DataFun', res.data.fileData.photo1);

            this.othUrl = this.$conf.constant.img_base_url + res.data.fileInfo[0].fileName;
            this.posUrl = this.$conf.constant.img_base_url + res.data.fileInfo[1].fileName;

            this.$store.commit('idCardFrontImgFun', res.data.fileInfo[0]);
            this.$store.commit('idCardBackImgFun', res.data.fileInfo[1]);

            this.$store.commit('posUrlFun', this.posUrl);
            this.$store.commit('othUrlFun', this.othUrl);

            // this.$router.push({
            //     name: 'cardhave',
            // });
            // app/bizCopyApply/uploadIdCard?json={asdsadsadd}


          } else {
            this.$toast.info(res.data.msg)
          }
        });
    },
    applyKnoeledge() {
      let param = new FormData(); //创建form对象
      console.log(this.receiverType);
      if (this.DDD) {
        var indexDDD = this.DDD.name.lastIndexOf(".");
        var dddPng = this.DDD.name.length;
        var suffixDDD = this.DDD.name.substring(indexDDD + 1, dddPng);//后缀名
      }
      if (this.EEE) {
        var indexEEE = this.DDD.name.lastIndexOf(".");
        var eeePng = this.DDD.name.length;
        var suffixEEE = this.DDD.name.substring(indexEEE + 1, eeePng);//后缀名
      }
      if (this.FFF) {
        var indexFFF = this.FFF.name.lastIndexOf(".");
        var fffPng = this.FFF.name.length;
        var suffixFFF = this.FFF.name.substring(indexFFF + 1, fffPng);//后缀名
      }
      param.append('photo0', this.DDD, "photo0." + suffixDDD);//通过append向form对象添加数据
      param.append('photo1', this.EEE, "photo1." + suffixEEE);//通过append向form对象添加数据
      //param.append('photo5', this.FFF, "photo5." + suffixFFF);//通过append向form对象添加数据

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };
      this.$toast.loading('正在识别');
      //添加请求头
      this.$axios.post(uploadImgimage + '?certificateName=idCard', param, config)
        .then(res => {
          if (res.data.code == '200') {
            this.$toast.hide();
            this.nameApp = res.data.fileData.photo0.name;
            this.idcardApp = res.data.fileData.photo0.idCard;

            this.$store.commit('photo0DataFun', res.data.fileData.photo0);
            this.$store.commit('photo1DataFun', res.data.fileData.photo1);

            this.othAppUrl = this.$conf.constant.img_base_url + res.data.fileInfo[0].fileName;
            this.posAppUrl = this.$conf.constant.img_base_url + res.data.fileInfo[1].fileName;

            this.$store.commit('idCardFrontImgFun', res.data.fileInfo[0]);
            this.$store.commit('idCardBackImgFun', res.data.fileInfo[1]);

            this.$store.commit('posUrlFun', this.posUrl);
            this.$store.commit('othUrlFun', this.othUrl);
            // this.$router.push({
            //     name: 'cardhave',
            // });

          } else {
            this.$toast.info(res.data.msg)
          }
        });
    },
    cardconfirm() {
      if (this.receiverType == 1) {
        if (!this.name || !this.idcard) {
          this.$toast.info("请上传图片");
          return;
        }
      }
      if (this.receiverType == 2) {
        if (!this.name || !this.idcard || !this.nameApp || !this.idcardApp) {
          this.$toast.info("请上传图片");
          return;
        }
      }
      this.nextPar = this.$route.query;
      this.nextPar.receiverType = this.receiverType;
      this.nextPar.idCardImg = this.cardImg;
      this.$store.commit('chooseInfoFun', "");
      this.$router.push({
        name: 'putinfo',
        query: { name: this.name, idcard: this.idcard, receiverType: this.receiverType, mail: this.$route.query.mail }
      });
      console.log(JSON.stringify(this.cardImg));
      console.log(JSON.stringify(this.nextPar.cardImg));
      console.log(this.nextPar);
      // this.$axios.post(addOrUpdate,this.nextPar).then(res => {
      //     if (res.data.code == '200') {
      //
      //         // this.$router.go(-1);
      //     }
      // }).catch(function (err) {
      //     console.log(err);
      // });
    },
  },

  computed: {

  },

};
</script>
 <style scoped>
@import url("../../cardwrite/cardwrite.css");
.cardwritesecond {
  margin-top: 28px;
}
#positive,
#outside,
#hanside,
#positiveApp,
#outAppside,
#hanAppside {
  display: none;
}
.cardwritesecond p {
  line-height: 50px;
  letter-spacing: 2px;
  color: #9e9e9e;
}
.changenet {
  /*padding: 30px 0 16px 0;*/
  /*padding: 30px 0 0 0;*/
  display: flex;
  justify-content: space-between;
  letter-spacing: 3px;
  color: #3a3a3a;
  border-bottom: 1px solid #f2f3f5;
  padding: 30px 0 44px 0;
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
  height: 240px;
}
.pg_positive div img {
  width: 100%;
  border-radius: 10px;
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
}

.ivu-upload-input_label::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.certificate .partLine {
  border-bottom: 1px solid #f2f3f5;
  margin: 0 0 -6px 0;
}
</style>