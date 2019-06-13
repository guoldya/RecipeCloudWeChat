<template>
  <div class=" valuation">
    <Headerwhite :post-title="title+'评价'"></Headerwhite>
    <img class="Img" src="@/assets/images/pingjia.png" alt="">
    <div class="margin55">
        <div class="divP">
          <p>您好，您于{{$route.query.time.substring(0,10)}}在重庆市南川区人民医院{{place}}，请您对本次体检的就医感受进行评价，祝您身体健康!
          </p>
        </div>
        <div class="divBody">
          <div class="divCheck" v-if="$route.query.id == 1">
            <div class="divCard">
              <p>1、 您对医生的诊疗技术是否满意? </p>
              <div class="divAllSpan">
                <div class="divSpan"><span id="span1" @click="checked" :style="backColor">非常满意</span></div><div class="divSpan"><span>满意</span></div><div class="divSpan"><span>基本满意</span></div>
                <div class="divSpan"><span>不太满意</span></div><div class="divSpan"><span>不满意</span></div>
              </div>
            </div>
            <div class="divCard">
              <p>2、您对护士的操作技术是否满意? </p>
              <div><span>非常满意</span></div><div><span>满意</span></div><div><span>基本满意</span></div><div><span>不太满意</span></div><div><span>不满意</span></div>
            </div>
            <div class="divCard">
              <p>3、您对医生的服务态度是否满意? </p>
              <div><span>非常满意</span></div><div><span>满意</span></div><div><span>基本满意</span></div><div><span>不太满意</span></div><div><span>不满意</span></div>
            </div>
            <div class="divCard">
              <p>4、您对护士的服务态度是否满意? </p>
              <div><span>非常满意</span></div><div><span>满意</span></div><div><span>基本满意</span></div><div><span>不太满意</span></div><div><span>不满意</span></div>
            </div>
            <div class="divCard">
              <p>5、您对医院保护患者安全方面(如预防跌倒坠床,保护病人隐私等)的满意程度? </p>
              <div><span>非常满意</span></div><div><span>满意</span></div><div><span>基本满意</span></div><div><span>不太满意</span></div><div><span>不满意</span></div>
            </div>
          </div>
          <div class="divCheck" v-else-if="$route.query.id == 2">
            <div class="divCard">
              <p>1、 您对医生的诊疗技术是否满意? </p>
              <div><span>非常满意</span></div><div><span>满意</span></div><div><span>基本满意</span></div><div><span>不太满意</span></div><div><span>不满意</span></div>
            </div>
            <div class="divCard">
              <p>2、您对医生的服务态度是否满意? </p>
              <div><span>非常满意</span></div><div><span>满意</span></div><div><span>基本满意</span></div><div><span>不太满意</span></div><div><span>不满意</span></div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script  >
import { mapState } from "vuex";

let updateContent = "/app/bizFeedback/update";

export default {
  data() {
    return {
      suggestion:'',
      isSubmit:false,
      title:'',
      place,
      backColor:{ background:"rgb(255,255,255,0)" },
    };
  },
  created() {
    if (this.$route.query.id == 1) {
      this.title = "住院";
    } else {
      if (this.$route.query.id == 2) {
        this.title = "门诊"
      } else {
        this.title = "体检"
      }
    }
    if (this.$route.query.id == 1) {
      this.place = "【"+this.$route.query.pla+"】"+"出院";
    } else {
      if (this.$route.query.id == 2) {
        this.place = "【"+this.$route.query.pla+"】"+"就诊";
      } else {
        this.place = "【体检科】检查";
      }
    }
  },
  methods: {
    checked() {
      document.getElementById('span1').style.backgroundColor('red');
    },
    submit(){
      this.isSubmit = true;
      // if(!this.suggestion || this.suggestion.replace(/(^\s*)|(\s*$)/g, "").length < this.suggestion.length){
      if(!this.suggestion){
        this.$toast.info('请输入您的意见');
      }else{
        this.$axios.post(updateContent, {
          content: this.suggestion
        }).then((res) => {
          if (res.data.code == '200') {
              this.$toast.info('提交成功');
              this.isSubmit = false;
          } else {
            this.$toast.info(res.msg);
          }
        }).catch(function (err) {
          console.log(err);
        });
      }
    }
  },
};
</script>
<style   scoped>
.navigation {
  background: none;
}
.Img {
  position:absolute;
  left:0px;
  top:0px;
  width: 750px;
  height: 368px;
  z-index: -1;
}
.divP {
  height: 120px;
  padding: 0 24px;
  line-height: 45px;
  color: var(--primary--body);
  font-size: 26px;
}
.divBody {
  margin: 40px 24px 0;
  background: var(--primary--body);
  border-radius: 10px;
}
.divCard {
  height: 283px;
  padding: 40px 20px 0;
  border-bottom: 0.01rem solid var(--primary--line);
}
.divAllSpan {
  height: 168px;
  margin: 30px 0 10px;
  display: flex;
  flex-wrap: wrap;
}
.divSpan {
  width: 217.96px;
  height: 84px;
  text-align: center;
}
.divSpan span {
  color: var(--primary--right);
  display: block;
  position: absolute;
  width: 160px;
  height: 54px;
  margin: 0 0 30px;
  transform: translateX(25%);
  line-height: 54px;
  border: 0.01rem solid var(--primary--line);
  border-radius: 27px;
}
</style>