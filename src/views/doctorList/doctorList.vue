<template>
  <div>
    <div class="titleTag">
      <div class="tag1">
        <div class="tagdiv">
          <!-- <mu-select filterable="" v-model="selected3" full-width :solo='false'>
            <mu-option v-for="city,index in citys" :key="city.value" :label="city.name" :value="city.value"></mu-option>
          </mu-select> -->

          <div class="showSelecA" @click="showSelector">
            <p>{{selectorValue}}
              <span>▾</span>
            </p>
          </div>
          <!-- <md-selector v-model="isSelectorShow" default-value="2" :data="citys" max-height="320px" title="普通模式" @choose="onSelectorChoose"></md-selector> -->
          <md-selector v-model="isSelectorShow" :data="citys" max-height="320px" title="选择科室" @choose="onSelectorChoose"></md-selector>
        </div>
      </div>
      <div class="line"></div>
      <div class="tag2">
        <div class="tagdiv">
          <!-- <span @click="isSwitch=!isSwitch" :class="{'activeAA':isSwitch}">只看有号</span> -->
          <span v-if="isSwitch" @click="handler">查看所有</span>
          <span v-else @click="handler" class="activeAA">只看有号</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="tag3">
        <div class="tagdiv">
          <input class="oc_val" placeholder="搜索医生" value="" type="text" @click="searchT()" />
        </div>
      </div>
    </div>

    <div :class="{'butTime':true,'butTimeaa':!isTop}">
      <div class="time" v-show="isTop">
        <ul>
          <li @click="switchTo(index)" v-for="(item,index) in time" :class="activetime === index ? 'timeAcitve' : '' " :key="index+'aa'">
            <p>{{item.date}}</p>
            <p>{{item.week}}</p>
          </li>
        </ul>
      </div>
      <div v-show="!isTop">
        <div class="timeAcitve chooseTime">
          <p>01-27</p>
          <p>星期四</p>
        </div>
        <div class="timeRight">
          <span @click="goAfternoon" :class="{ afternoonActive: isActive == 2 ,'afternoon':true}">下午</span>
          <span @click="goMornign" :class="{ afternoonActive: isActive == 1 ,'afternoon':true}">上午</span>
        </div>
      </div>
    </div>
    <div :class="{ pt50: true  ,'outCarint':true}" style="margin-bottom:20px; ">
      <p class="forenoon">上午</p>
      <div class="doctorList" id="mornign">
        <ul>
          <li v-for="i in num" :key="i">
            <div class="card" @click="intodoctordetail">
              <div class="cardText">
                <div class="headimg"><img src="@/assets/images/3.jpg" alt="医生头像"></div>
                <div>
                  <p class="headname">冉有钱1
                    <span class="have">余56</span>
                  </p>
                  <p class="headdesc">擅长:儿科、新生儿疾病、急救医学儿科、新生儿疾病、急救医学儿科、新生儿疾病、急救医学</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <p class="forenoon">下午</p>
      <div class="doctorList" id="afternoon">
        <ul>
          <li v-for="i in 3" :key="i">
            <div class="card">
              <div class="cardText">
                <div class="headimg"><img src="@/assets/images/3.jpg" alt="医生头像"></div>
                <div>
                  <p class="headname">冉有钱
                    <span class="have no">余56</span>
                  </p>
                  <p class="headdesc">擅长:儿科、新生儿疾病、急救医学儿科、新生儿疾病、急救医学儿科、新生儿疾病、急救医学</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <p class="forenoon">夜诊</p>
      <div class="doctorList">
        <ul>
          <li>
            <div class="card">
              <div class="cardText">
                <div class="headimg"><img src="@/assets/images/3.jpg" alt="医生头像"></div>
                <div>
                  <p class="headname">冉有钱
                    <span class="have">余0</span>
                  </p>
                  <p class="headdesc">擅长:儿科、新生儿疾病、急救医学儿科、新生儿疾病、急救医学儿科、新生儿疾病、急救医学</p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="card">
              <div class="cardText">
                <div class="headimg"><img src="@/assets/images/3.jpg" alt="医生头像"></div>
                <div>
                  <p class="headname">冉有钱
                    <span class="have no">余0</span>
                  </p>
                  <p class="headdesc">擅长:儿科、新生儿疾病、急救医学儿科、新生儿疾病、急救医学儿科、新生儿疾病、急救医学</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      isSelectorShow: false,
      selectorValue: '生殖内分泌门诊',
      num: 5,
      isTop: true,
      isActive: 1,
      isSwitch: true,
      selected3: 55,
      activetime: 0,
      normal: {
        checkbox: true,
        radio: 1,
        switch: false
      },
      isWeixin: false,
      citys: [
        { text: "妇科门诊", value: '77' },
        { text: "生殖内分泌门诊", value: '88' },
        { text: "儿科", value: '99' },
        { text: "放射科", value: '111' },
        { text: '妇科', value: '1' },
        { text: '内科', value: '2' },
        { text: '外科', value: '31' },
        { text: '生殖内分泌', value: '55' },
        { text: "不孕不育", value: '555' },
        { text: "生殖内分泌门诊", value: '888' },
      ],


      time: [
      ]
    };
  },
  created() {
  },
  watch: {
    selected3: function (newselectedStatus, oldselectedStatus) {
      console.log(newselectedStatus)
    },
  },
  mounted() {
    document.title = '医生列表';
    if (this.$route.query.value) {
      this.selected3 = this.$route.query.value * 1;
    };
    var box = document.getElementById('mornign');
    var w = box.style.width;
    var h = box.style.height;
    let mornignHeight = document.getElementById("mornign").offsetHeight;
    let mornignTop = document.getElementById("mornign").offsetTop;
    let afternoonHeight = document.getElementById("afternoon").offsetHeight;
    let afternoonTop = document.getElementById("afternoon").offsetTop;
    let _this = this;
    window.addEventListener('scroll', function () {
      let bodyTop = document.body.scrollTop || document.documentElement.scrollTop;
      if (bodyTop * 1 < 30) {
        _this.isTop = true;
      } else {
        _this.isTop = false;
      }
      const isToBottom = bodyTop + window.innerHeight > document.body.offsetHeight
      if (bodyTop >= mornignHeight) {
        _this.isActive = 2;

      } else {
        _this.isActive = 1

      }
    })
    this.getData();
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
      return true;
    } else {
      this.isWeixin = true;
      return false;
    };


  },
  methods: {

    handler() {
      this.isSwitch = !this.isSwitch;
    },
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorChoose({ text }) {
      console.log(text)
      this.selectorValue = text
    },
    intodoctordetail() {
      let argu = {}
      this.$router.push({
        name: 'doctordetail',
        query: argu
      });
    },
    goMornign() {
      this.isActive = 1
      document.querySelector("#mornign").scrollIntoView();
    },
    goAfternoon() {
      this.isActive = 2;
      document.querySelector("#afternoon").scrollIntoView();

    },
    getData() {
      for (let i = 0; i < 15; i++) {
        let nowTime = new Date();
        let d = nowTime.setDate(nowTime.getDate() + i - 1);
        let data = this.addDate(d, 1);
        let time = {};
        if (i == 0) {
          time = { date: data.newData, week: '当日号' }
        } else {
          time = { date: data.newData, week: data.newDay }
        }
        this.time.push(time)
      }
    },
    addDate(val, days) {
      var d = new Date(val);
      var data = {};
      let dayArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      d.setDate(d.getDate() + days);
      var m = d.getMonth() + 1;
      var newDay = dayArr[d.getDay()];
      data.newData = m + '-' + d.getDate();
      data.newDay = newDay;
      return data;
    },
    searchT: function () {
      // let argu = { selected3: this.selected3 };
      this.$router.push({
        name: 'result',
      });
    },
    switchTo(num) {
      this.activetime = num;
    },
  },
  computed: {
  },
};
</script>
 <style   scoped>
@import "doctorList.css";
</style>