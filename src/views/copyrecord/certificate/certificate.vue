<template>
   <div class="outCarint margin45">
      <Header post-title="上传证件"></Header>
      <div class="rebinding-box card margin16">
         <div class="box-timeline  cardText">
            <div class="alltimeball">
               <div class="timeball acitiveball">1</div>
               <div class="timeball acitiveball">2</div>
               <div class="timeball">3</div>
            </div>
            <div class="alltimeball">
               <span class="acitivestep">业务选择</span>
               <span class="acitivestep">证件上传</span>
               <span>信息确认</span>
            </div>
            <div class="timeballline"></div>
            <div class="timeballline2"></div>
         </div>
      </div>
      <div class="card margin16">
         <div class="cardText changenet">
            <span>关系</span>
            <span class="changenetright" @click="showSelector">{{selectorValue}}<img class="icon_right" src="@/assets/images/icon_right.png" alt=""></span>
         </div>
      </div>
      <p style="color:#000">拍摄/上传您的二代身份证</p>
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
               <img src="@/assets/images/icon_handheld.png" alt="">
            </label>
            <p>手持身份证</p>
         </div>
      </div>
      <div style="margin-top:20px">
         <md-input-item ref="input13" v-model="name" title="患者姓名" placeholder="患者姓名" is-highlight></md-input-item>
         <md-input-item type="phone" v-model="idcard" title="身份证号" placeholder="患者身份证号" clearable is-highlight></md-input-item>
      </div>
      <!-- 申请人 -->
      <div v-show="isSelf">
         <p style="color:#000;margin-top:20px">申请人证件照</p>
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
                  <img src="@/assets/images/icon_handheld.png" alt="">
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
            <md-input-item ref="input13" v-model="name" title="申请人姓名" placeholder="申请人姓名" is-highlight></md-input-item>
            <md-input-item type="phone" v-model="idcard" title="身份证号" placeholder="申请人身份证号" clearable is-highlight></md-input-item>
         </div>
      </div>
      <md-button @click="cardconfirm" type="primary" round style="margin:20px 0">下一步</md-button>
      <md-selector v-model="isSelectorShow" default-value="2" :data="test" max-height="320px" title="普通模式" @choose="onSelectorChoose"></md-selector>
      <md-landscape v-model="showPic" :mask-closable="true">
         <img src="@/assets/images/u152.png" alt="">
      </md-landscape>
   </div>
</template>
<script type="text/babel">
let uploadImgimage = "/uploadImg/image";
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
         isSelf: false,
         isSelectorShow: false,
         selectorValue: '本人',
         files: {
            posFile: null,
            othFile: null,
         },
         imgFiles: [],
         posUrl: pg_negative,
         othUrl: pg_positive,
         hanUrl: pg_positive,
         posAppUrl: pg_negative,
         othAppUrl: pg_positive,
         hanAppUrl: pg_positive,
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
      uploadHan(e) {
         let that = this,
            file = e.target.files[0],
            fileReader = new FileReader();
         this.files.othFile = file;
         fileReader.readAsDataURL(file);
         fileReader.onload = function () {
            that.CCC = this.result;
         };

      },
      // 申请人
      uploadPosApp(e) {
         let that = this,
            file = e.target.files[0],
            fileReader = new FileReader();
         this.files.posFile = file;
         fileReader.readAsDataURL(file);
         fileReader.onload = function () {
            that.othUrl = this.result;
         };
         this.DDD = e.target.files[0];

      },
      uploadOthApp(e) {
         let that = this,
            file = e.target.files[0],
            fileReader = new FileReader();
         this.files.othFile = file;
         fileReader.readAsDataURL(file);
         fileReader.onload = function () {
            that.posUrl = this.result;
         };
         this.EEE = e.target.files[0];
      },
      uploadHanApp(e) {
         let that = this,
            file = e.target.files[0],
            fileReader = new FileReader();
         this.files.othFile = file;
         fileReader.readAsDataURL(file);
         fileReader.onload = function () {
            that.FFF = this.result;
         };
      },
      // 选着人
      showSelector() {
         this.isSelectorShow = true
      },
      onSelectorChoose(data) {
         this.selectorValue = data.text;
         if (data.value == 1) {
            this.isSelf = false
         } else {
            this.isSelf = true
         }
      },

      cardconfirm() {
         this.$router.push({
            name: 'putinfo'
         });
         // let param = new FormData(); //创建form对象
         // console.log(this.AAA.name, this.BBB.name, "sss");
         // if (!this.AAA.name || !this.BBB.name) {
         //    this.$toast.info("请上传图片")
         //    return;
         // }
         // var index1 = this.AAA.name.lastIndexOf(".");
         // var index2 = this.AAA.name.length;
         // var suffix = this.AAA.name.substring(index1 + 1, index2);//后缀名
         // var index11 = this.BBB.name.lastIndexOf(".");
         // var index22 = this.BBB.name.length;
         // var suffix1 = this.BBB.name.substring(index11 + 1, index22);//后缀名

         // param.append('photo0', this.AAA, "photo0." + suffix);//通过append向form对象添加数据
         // param.append('photo1', this.BBB, "photo1." + suffix1);//通过append向form对象添加数据
         // console.log(param);
         // let config = {
         //    headers: {
         //       'Content-Type': 'multipart/form-data',
         //    }
         // };  //添加请求头
         // this.$axios.post(uploadImgimage + '?certificateName=idCard', param, config)
         //    .then(res => {
         //       if (res.data.code == '200') {
         //          this.$store.commit('photo0DataFun', res.data.fileData.photo0);
         //          this.$store.commit('photo1DataFun', res.data.fileData.photo1);
         //          console.log(res.data.fileInfo[0].fileName, "我是正面");
         //          console.log(res.data.fileInfo[1].fileName, "我是正面");
         //          this.posUrl = this.$conf.constant.img_base_url + res.data.fileInfo[0].fileName;
         //          this.othUrl = this.$conf.constant.img_base_url + res.data.fileInfo[1].filename;

         //          this.$store.commit('idCardFrontImgFun', res.data.fileInfo[0]);
         //          this.$store.commit('idCardBackImgFun', res.data.fileInfo[1]);

         //          this.$store.commit('posUrlFun', this.posUrl);
         //          this.$store.commit('othUrlFun', this.othUrl);
         //          this.$router.push({
         //             name: 'cardhave',
         //             // query: argu
         //          });
         //       } else {
         //          this.$toast.info(res.data.msg)
         //       }
         //    });

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
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  letter-spacing: 3px;
  color: #3a3a3a;
}
.changenet .icon_right {
  width: 14px;
  height: 26px;
  position: relative;
  top: 4px;
  left: 20px;
}
.changenetright {
  color: #acacac;
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
</style>