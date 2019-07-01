<template>
  <div class="valuation  ">
    <div id="scrollup" class="navigation">
      <div class="icon-iconfontjiantou" @click="$router.go(-1)">
        <img id="back" src="@/assets/images/icon_back_white.png">
      </div>
      <div class="navigation-content">
        {{$route.query.type|filterType}}评价
      </div>
      <div class="right"> </div>
    </div>
    <div class="valuation-top">
      <div class="content">
        <p>您好，您于{{$route.query.time|time}}在重庆市南川区人民医院
          <span v-if="$route.query.type==1">【{{$route.query.title}}】出院,</span>
          <span v-if="$route.query.type==2">【{{$route.query.title}}】就诊,</span>
          <span v-if="$route.query.type==3">【体检科】检查,</span>
          <span v-show="$route.query.evaluateStatus == 0">
            请您对本次{{$route.query.type|filterType}}的就医感受进行评价，祝您身体健康!
          </span>
          <span v-show="$route.query.evaluateStatus == 1">
            感谢您对本次{{$route.query.type|filterType}}的就医感受进行评价，我们将继续努力提供更满意的服务！
          </span>
        </p>
      </div>

      <div class="content-card" v-show="isshow">
        <div class="content-card-div">
          <p>1、 {{list[num0].title}}? </p>
          <div class="content-card-tag">
            <div v-for="(item,index) in consultList0" :key="index" :class="{'active':list[num0].evaluation==item.value}" @click="checkedFun(item,num0)">
              <span>{{item.text}}</span>
            </div>
          </div>
        </div>
        <div class="content-card-div">
          <p>2、{{list[num0+1].title}}? </p>
          <div class="content-card-tag">
            <div v-for="(item,index) in consultList1" :key="index+'1'" :class="{'active':list[num0+1].evaluation==item.value}" @click="checkedFun(item,num0+1)">
              <span>{{item.text}}</span>
            </div>
          </div>
        </div>

        <div class="content-card-div" v-if="$route.query.type==1||$route.query.type==3">
          <p>3、{{list[num0+2].title}} ? </p>
          <div class="content-card-tag">
            <div v-for="(item,index) in consultList2" :key="index" :class="{'active':list[num0+2].evaluation==item.value}" @click="checkedFun(item,num0+2)">
              <span>{{item.text}}</span>
            </div>
          </div>
        </div>
        <div class="content-card-div" v-if="$route.query.type==1 ">
          <p> 4、{{list[num0+3].title}}? </p>
          <div class="content-card-tag">
            <div v-for="(item,index) in consultList3" :key="index" :class="{'active':list[num0+3].evaluation==item.value}" @click="checkedFun(item,num0+3)">
              <span>{{item.text}}</span>
            </div>
          </div>
        </div>
        <div class="content-card-div" v-if="$route.query.type==1 ">
          <p> 5、{{list[num0+4].title}} ? </p>
          <div class="content-card-tag">
            <div v-for="(item,index) in consultList4" :key="index" :class="{'active':list[num0+4].evaluation==item.value}" @click="checkedFun(item,num0+4)">
              <span>{{item.text}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content-bottom">
        <p>意见反馈</p>
        <div>
          <textarea name="yijian" v-model="suggest" cols="30" rows="10" :disabled="$route.query.evaluateStatus == 1" placeholder="请输入您的意见或建议以便我们提供更好的服务" maxlength="200"></textarea>
        </div>
      </div>
    </div>
    <p v-show="$route.query.evaluateStatus == 0" class="addbTN" @click="tijiao">提交</p>

  </div>
</template>

<script>
import data from './data.js'
let updateByList = "/api/hos/bizPatientEvaluate/updateByList";
let detailurl = "/api/hos/bizPatientEvaluate/read/detail";
export default {

  data() {
    return {
      isshow: false,
      recordDetai: '',
      title: '',
      suggest: '',
      num0: 0,
      count: 1,
      // 住院
      list1: [
        {
          type: this.$route.query.type * 1,
          recordId: this.$route.query.id * 1,
          title: '您对医生的诊疗技术是否满意',
          evaluation: 1,
          suggest: "",
        },
        {
          type: this.$route.query.type * 1,
          recordId: this.$route.query.id * 1,
          title: '您对护士的操作技术是否满意',
          evaluation: 1,
          suggest: "",
        },
        {
          type: this.$route.query.type * 1,
          recordId: this.$route.query.id * 1,
          title: '您对医生的服务态度是否满意',
          evaluation: 1,
          suggest: "",
        },
        {
          type: this.$route.query.type * 1,
          recordId: this.$route.query.id * 1,
          title: '您对护士的服务态度是否满意',
          evaluation: 1,
          suggest: "",
        },
        {
          type: this.$route.query.type * 1,
          recordId: this.$route.query.id * 1,
          title: '您对医院保护患者安全方面(如预防跌倒坠床,保护病人隐私等)的满意程度',
          evaluation: 1,
          suggest: "",
        }

      ],
      // 门诊
      list2: [
        {
          type: this.$route.query.type * 1,
          recordId: this.$route.query.id * 1,
          title: '您对医生的诊疗技术是否满意',
          evaluation: 1,
          suggest: "",
        },
        {
          type: this.$route.query.type * 1,
          recordId: this.$route.query.id * 1,
          title: '您对医生的服务态度是否满意',
          evaluation: 1,
          suggest: "",
        },

      ],
      // 体检
      list3: [
        {
          type: 3,
          recordId: this.$route.query.id * 1,
          title: '您对体检医务人员的诊疗技术是否满意',
          evaluation: 1,
          suggest: "",
        },
        {
          type: 3,
          recordId: this.$route.query.id * 1,
          title: '您对体检人员的服务态度是否满意',
          evaluation: 1,
          suggest: "",
        },
        {
          type: 3,
          recordId: this.$route.query.id * 1,
          title: '您对体检导医人员的服务态度是否满意',
          evaluation: 1,
          suggest: "",
        },

      ],
      consultList0: data,
      consultList1: data,
      consultList2: data,
      consultList3: data,
      consultList4: data,
    }
  },

  computed: {
    list() {
      return this.count && this[`list${this.$route.query.type}`]
    }

    // list: {
    //   get() {
    //     return this[`list${this.$route.query.type}`]
    //   },
    //   set(value) {
    //     this[`list${this.$route.query.type}`] = value
    //   }
    // }
  },
  created() {
    this.suggest = '';
    if (this.$route.query.evaluateStatus == 1) {
      this.$axios.put(detailurl, {
        recordId: this.$route.query.id * 1,
        type: this.$route.query.type * 1
      }).then((res) => {
        if (res.data.code == '200') {
          this.isshow = true;
          this.count++;
          this[`list${this.$route.query.type}`] = res.data.data.list;
          this.suggest = res.data.data.list[0].suggest
          console.log(this.list)
          // this[`list0${this.$route.query.type}`] = res.data.data.list

        } else {
          console.log(res.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });

    } else {
      this.isshow = true;
    }


  },
  methods: {
    // 住院评价
    checkedFun: function (val, i) {
      if (this.$route.query.evaluateStatus == 1) { return }
      this.list[i].evaluation = val.value
    },

    tijiao() {
      this.$toast.loading("提交中...")
      this.list[0].suggest = this.suggest;
      this.$axios.post(updateByList, {
        list: this.list
      }).then(res => {
        if (res.data.code == '200') {
          this.$store.dispatch('getMessage', { update1: true });
          this.$toast.info("评价成功")
          this.$router.go(-1)
        } else {
          this.$toast.hide()
          this.$toast.info(res.data.msg)
        }
      }).catch(function (err) {
        this.$toast.hide()
        console.log(err);
      });

    },

  }
}
</script>

<style lang="scss" scoped>
.valuation {
  margin-top: 12px;
  margin-bottom: 150px;
}
.valuation .navigation {
  position: fixed;
  width: 100%;
  height: 100px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  background: -webkit-linear-gradient(left, #1e78fe 15%, #5684fc);
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, #1e78fe 15%, #5684fc);
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #1e78fe 15%, #5684fc);
  /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #1e78fe 15%, #5684fc);
  color: #ffffff;
  z-index: 99;
  img {
    width: 20px;
    height: 35px;
  }
  .navigation-content {
    font-size: 32px;
    text-align: center;
    p {
      font-size: 28px;
    }
  }
  .icon-iconfontjiantou {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 24px;
    width: 100px;
  }
  .icon-iconfontjiantou img {
    width: 20px;
    height: 35px;
  }
  .right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 30px;
  }
}
.valuation-top {
  min-height: 360px;
  background-image: url("~@/assets/images/pingjia.png");
  background-size: 100%;
  background-repeat: no-repeat;
  .content {
    padding: 24px;
    padding-top: 110px;
    color: rgba(255, 255, 255, 0.87);
    font-size: 26px;
    letter-spacing: 1px;
    line-height: 40px;
  }
  .content-card {
    background: #ffffff;
    border-radius: 10px;
    margin: 0 24px;
    .content-card-div {
      padding: 40px 24px 0;
      border-bottom: 1px solid rgba(136, 136, 136, 0.27);
      p {
        line-height: 35px;
      }
      &:last-child {
        border-bottom: none;
      }
      .content-card-tag {
        margin: 30px 0 10px;
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        div {
          width: 33.33%;
          span {
            min-width: 160px;
            color: #8b8b8b;
            line-height: 50px;
            display: inline-block;
            border: 2px solid #dedede;
            border-radius: 60px;
            text-align: center;
            margin-bottom: 30px;
            &:nth-child(3) {
              margin-right: 0;
            }
          }
        }
        .active {
          span {
            background: #1da1f3;
            color: #ffffff;
            border: 2px solid #1da1f3;
          }
        }
      }
    }
  }
  .content-bottom {
    background: #ffffff;
    border-radius: 10px;
    margin: 24px;
    textarea {
      width: 100%;
      height: 200px;
      margin-top: 20px;
      box-sizing: border-box;
      resize: none;
      padding: 10px;
      background: #ffffff;
    }
    p {
      line-height: 100px;
      border-bottom: 1px solid #dedede;
      text-indent: 24px;
    }
    div {
      padding: 20px;
      height: 250px;
      background: #ffffff;
    }
  }
}
</style>
 
