<template>
  <div :class="{'outCarint':true,'margin45':isWeixin, }">
    <Header post-title="上传证件" v-show="isWeixin"></Header>
    <div class="rebinding-box card margin16">
      <div class="box-timeline  cardText">
        <div class="alltimeball">
          <div class="timeball acitiveball">1</div>
          <div class="timeball acitiveball">2</div>
          <div class="timeball">3</div>
        </div>
        <div class="alltimeball">
          <span class="acitivestep">手机验证</span>
          <span class="acitivestep">上传证件</span>
          <span>资料确认</span>
        </div>
        <div class="timeballline"></div>
        <div class="timeballline2"></div>
      </div>
    </div>
    <div v-show="isSon" class="card margin16">
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
    <md-button @click="cardconfirm" type="primary" round style="margin-top:150px">下一步</md-button>
    <md-selector v-model="isSelectorShow" default-value="2" :data="test" max-height="320px" title="普通模式" @choose="onSelectorChoose"></md-selector>
  </div>
</template>
<script type="text/babel">
let appLoginGuploadImage = "/appLogin/uploadImage";
import pg_negative from '@/assets/images/pg_negative.png'
import pg_positive from '@/assets/images/pg_positive.png'
export default {
  data() {
    return {
      AAA: '',
      isWeixin: false,
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
    if (this.$route.query.isSon * 1 == 2) {
      this.isSon = true;
    }
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;

    } else {
      this.isWeixin = true;

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
      }
    },
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorChoose({ text }) {
      this.selectorValue = text
    },



    cardconfirm() {
      let param = new FormData(); //创建form对象
      param.append('file', this.AAA, this.AAA.name);//通过append向form对象添加数据
      param.append('chunk', '0');//添加form表单中其他数据
      console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'TOKEN': `edd169b85704410aa5219512cb6f1f00`,
          'UUID': `AAA`,
        }
      };  //添加请求头
      this.$axios.post(appLoginGuploadImage, param, config)
        .then(res => {
          if (res.data.code == '200') {
            console.log(res.data, "我是一个小青龙");
          }
          console.log(res.data, "我是一个小青龙");
        });
      // let argu = {}
      // this.$router.push({
      //   name: 'cardconfirm',
      //   query: argu
      // });
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