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
    </div>
    <div class="flatCard margin5 outCarint">
      <div v-show="isSelf">
        <p style="padding-top:20px ">申请人证件照</p>
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
          <div class="pg_positive_img">
            <label class="ivu-upload-input_label" for="helpAppside" style="display:block; height: 120px;">
              <input class="ivu-upload-input" @change="uploadhelpApp($event)" type="file" name="helpAppside" id="helpAppside" accept="image/gif,image/jpeg,image/x-png" />
              <img :src="helpAppUrl" alt="">
            </label>
            <p style="text-align: center;line-height: 30px;">上传委托书</p>
          </div>
        </div>
        <div @click="showPic=true">
          <div class="pg_positive_img" style="width:50%;margin-top:50px;">
            <label class="ivu-upload-input_label" style="display:block; height: 120px;">
              <img src="@/assets/images/u152.png" alt="">
            </label>
            <p class="mu-secondary-text-color">委托书样例</p>
          </div>
        </div>

      </div>

      <div>
        <md-input-item ref="input13" v-model="name" title="患者姓名" placeholder="患者姓名" maxlength="20" is-highlight></md-input-item>
        <md-input-item v-model="idcard" title="身份证号" maxlength="18" placeholder="患者身份证号" clearable is-highlight></md-input-item>
        <md-input-item v-show="isSelf" ref="input13" v-model="nameApp" title="申请人姓名" placeholder="申请人姓名" maxlength="20" is-highlight></md-input-item>
        <md-input-item v-show="isSelf" v-model="idcardApp" title="身份证号" placeholder="申请人身份证号" clearable is-highlight maxlength="18"></md-input-item>
      </div>

    </div>
    <div style="height:55px"></div>
    <p @click="cardconfirm" class="addbTN">下一步</p>
    <md-selector v-model="isSelectorShow" default-value="1" :data="test" max-height="320px" title="选择方式" @choose="onSelectorChoose"></md-selector>
    <md-landscape v-model="showPic" :mask-closable="true">
      <div class="codema">
        <img src="@/assets/images/u152.png" alt="">
        <p class="namecodema">委托书样例</p>
      </div>
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
import pg_hep from '@/assets/images/icon_handheld.png'

export default {
  data() {
    return {
      DDD: '',
      FFF: '',
      EEE: '',
      GGG: '',
      name: this.$store.state.accountinfo.name,
      idcard: this.$store.state.accountinfo.idCard,
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
      helpAppUrl: pg_hep,
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
      shibie: false,
      shibieOther: false,
    };
  },
  created() {
    document.scrollingElement.scrollTop = 0
  },
  mounted() {
    document.title = '身份验证';
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
      if (this.DDD.name && this.EEE.name && this.FFF.name && this.GGG.name) {
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
      if (this.DDD.name && this.EEE.name && this.FFF.name && this.GGG.name) {
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
      if (this.DDD.name && this.EEE.name && this.FFF.name && this.GGG.name) {
        this.applyKnoeledge()
      }
    },
    uploadhelpApp(e) {
      let that = this,
        file = e.target.files[0],
        fileReader = new FileReader();
      this.files.othFile = file;
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        that.helpAppUrl = this.result;
      };
      this.GGG = e.target.files[0];
      if (this.DDD.name && this.EEE.name && this.FFF.name && this.GGG.name) {
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
   
    applyKnoeledge() {
      let param = new FormData(); //创建form对象
      let param2 = new FormData(); //创建form对象
    
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
      if (this.GGG) {
        var indexGGG = this.GGG.name.lastIndexOf(".");
        var GGGPng = this.GGG.name.length;
        var suffixGGG = this.GGG.name.substring(indexGGG + 1, GGGPng);//后缀名
      }
      param.append('photo0', this.DDD, "photo0." + suffixDDD);//通过append向form对象添加数据
      param.append('photo1', this.EEE, "photo1." + suffixEEE);//通过append向form对象添加数据
      param.append('photo2', this.FFF, "photo2." + suffixFFF);//通过append向form对象添加数据
      param.append('photo3', this.GGG, "photo3." + suffixGGG);//通过append向form对象添加数据

      param2.append('photo0', this.DDD, "photo0." + suffixDDD);//通过append向form对象添加数据
      param2.append('photo1', this.EEE, "photo1." + suffixEEE);//通过append向form对象添加数据
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };
      this.$toast.loading('正在识别');
      //添加请求头
      this.$axios.post(uploadImgimage + '?certificateName=idCard', param2, config)
        .then(res => {
          if (res.data.code == '200') {

            this.$toast.hide();
            this.nameApp = res.data.fileData.photo0.name;
            this.idcardApp = res.data.fileData.photo0.idCard;
          } else {
            this.$toast.info(res.data.msg)
          }
        });
      // 上传图片文件
      this.$axios.post(appLoginuploadImage + '?certificateName=idCard', param, config)
        .then(res => {
          if (res.data.code == '200') {
            this.shibieOther = false;
            this.$store.commit('idCardAPPInfoFun', res.data.fileInfo);
          } else {
            this.shibieOther = true;
            this.$toast.info(res.data.msg)
          }
        });
    },
    cardconfirm() {
      if (this.receiverType == 2) {
        if (!this.DDD.name || !this.EEE.name || !this.FFF.name || !this.GGG.name) {
          this.$toast.info("请上传图片");
          return;
        } else {
          if (!this.shibieOther) {
            if (!this.name || !this.idcard || !this.nameApp || !this.idcardApp) {
              this.$toast.info("请输入代理人姓名和身份证号");
              return;
            }
          }

        }

      }
      this.nextPar = this.$route.query;
      this.nextPar.receiverType = this.receiverType;
      this.nextPar.idCardImg = this.cardImg;
      this.$router.push({
        name: 'putinfo',
        query: { name: this.name, idcard: this.idcard, receiverType: this.receiverType, mail: this.$route.query.mail }
      });


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
#helpAppside,
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