<template>
  <div class="margin55 certificate">
    <Header post-title="上传证件"></Header>
    <div class="flatCard margin5 outCarint">
      <!-- 申请人 -->
      <div>
        <p style="color:#000;padding-top: 16px">
          拍摄/上传您的二代身份证
          <span v-show="$route.query.type==1">和医保卡</span>
        </p>
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
        <div class="pg_positive" style="padding-top:10px" v-show="$route.query.type==1">
          <div class="pg_positive_img">
            <label class="ivu-upload-input_label" for="hanAppside" style="display:block; height: 120px;">
              <input class="ivu-upload-input" @change="uploadHan($event)" type="file" name="hanAppside" id="hanAppside" accept="image/gif,image/jpeg,image/x-png" />
              <img :src="hanUrl" alt="">
            </label>
            <p>医保卡正面</p>
          </div>
          <div class="pg_positive_img">
            <label class="ivu-upload-input_label" style="display:block; height: 120px;">
              <input class="ivu-upload-input" @change="uploadHealth($event)" type="file" name="Healthside" id="Healthside" accept="image/gif,image/jpeg,image/x-png" />
              <img :src="healthUrl" alt="">
            </label>
            <p>医保卡反面</p>
          </div>
        </div>
      </div>
    </div>
    <div style="height:78px;background-color: #ffffff"></div>
    <p @click="cardconfirm" class="addbTN">下一步</p>
  </div>
</template>
<script type="text/babel">
let uploadImgimage = "/appLogin/uploadImage";
let addOrUpdate = "/app/bizIhRecord/uploadIdCard";
import pg_negative from '@/assets/images/pg_negative.png'
import pg_positive from '@/assets/images/pg_positive.png'
import pg_handheld from '@/assets/images/sb_positive.png'
import pg_health from '@/assets/images/sb_negative.png'
export default {
  data() {
    return {
      AAA: '',
      BBB: '',
      CCC: '',
      DDD: '',
      isSelf: false,
      files: {
        posFile: null,
        othFile: null,
        hanUrl: null,
        healthUrl: null,
      },
      posUrl: pg_negative,
      othUrl: pg_positive,
      hanUrl: pg_handheld,
      healthUrl: pg_health,

    };
  },
  created() {

  },
  mounted() {
    document.title = '身份验证';
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
      this.files.hanUrl = file;
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        that.hanUrl = this.result;
      };
      this.CCC = e.target.files[0];
    },


    uploadHealth(e) {
      let that = this,
        file = e.target.files[0],
        fileReader = new FileReader();
      this.files.healthUrl = file;
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        that.healthUrl = this.result;
      };
      this.DDD = e.target.files[0];
    },
    // 选着人


    cardconfirm() {

      let param = new FormData(); //创建form对象

      if (Number(this.$route.query.type == 0)) {
        if (!this.AAA.name || !this.BBB.name) {
          this.$toast.info("请上传图片")
          return;
        }
      } else {
        if (!this.AAA.name || !this.BBB.name || !this.CCC.name || !this.DDD.name) {
          this.$toast.info("请上传图片")
          return;
        }
      }

      var index1 = this.AAA.name.lastIndexOf(".");
      var index2 = this.AAA.name.length;
      var suffix = this.AAA.name.substring(index1 + 1, index2);//后缀名

      var index11 = this.BBB.name.lastIndexOf(".");
      var index22 = this.BBB.name.length;
      var suffix1 = this.BBB.name.substring(index11 + 1, index22);//后缀名



      param.append('photo0', this.AAA, "photo0." + suffix);//通过append向form对象添加数据
      param.append('photo1', this.BBB, "photo1." + suffix1);//通过append向form对象添加数据
      if (Number(this.$route.query.type == 1)) {
        var index11CCC = this.CCC.name.lastIndexOf(".");
        var index22CCC = this.CCC.name.length;
        var suffix1CCC = this.CCC.name.substring(index11CCC + 1, index22CCC);//后缀名

        var index11DDD = this.DDD.name.lastIndexOf(".");
        var index22DDD = this.DDD.name.length;
        var suffix1DDD = this.DDD.name.substring(index11DDD + 1, index22DDD);//后缀名

        param.append('photo2', this.CCC, "photo2." + suffix1CCC);//通过append向form对象添加数据
        param.append('photo3', this.DDD, "photo2." + suffix1DDD);//通过append向form对象添加数据
      }
      // console.log(param);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };
      this.$toast.loading('图片上传中...')
      //添加请求头
      this.$axios.post(uploadImgimage, param, config)
        .then(res => {
          if (res.data.code == '200') {
            this.uploadIdCard(res.data.fileInfo)
          } else {
            this.$toast.info(res.data.msg);
            this.$toast.hide();
          }
        }).catch(function (err) {
          console.log(err);
        });

    },
    uploadIdCard(data) {
      var param = {};
      param.idCardImg = data;
      param.id = this.$route.query.id;
      this.$axios.post(addOrUpdate, param)
        .then(res => {
          if (res.data.code == '200') {
            this.$toast.hide();
            this.$router.push({
              name: 'admupayfee',
              query: { id: this.$route.query.id, money: this.$route.query.money }
            });
          } else {
            this.$toast.info(res.data.msg)
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
@import url("../../cardwrite/cardwrite.css");
.cardwritesecond {
  margin-top: 28px;
}
#positive,
#outside,
#hanside,
#Healthside,
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