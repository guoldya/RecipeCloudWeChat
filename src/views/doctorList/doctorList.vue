<template>
  <div class="doctorList">
    <Header post-title="医生列表"></Header>
    <div class="titleTag">
      <div class="tag1">
        <div class="tagdiv">
          <div class="showSelecA">
            <span @click="showSelector">{{selectorValue}}</span>
          </div>
          <md-selector v-model="isSelectorShow" :default-value="deptId" :data="departData" max-height="320px" title="选择科室" @choose="onSelectorChoose"></md-selector>
        </div>
      </div>
      <div class="line"></div>
      <div class="tag2">
        <div class="tagdiv">
          <span v-if="valNum" @click="handler">查看所有</span>
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
          <li @click="switchTo(index,item)" v-for="(item,index) in time" :class="activetime === index ? 'timeAcitve' : '' " :key="index+'aa'">
            <p>{{item.date}}</p>
            <p>{{item.week}}</p>
          </li>
        </ul>
      </div>
      <div v-show="!isTop">
        <div class="timeAcitve chooseTime">
          <p>{{choosedate}}</p>
          <p>{{chooseweek}}</p>
        </div>
        <div class="timeRight">
          <span @click="goAfternoon" :class="{ afternoonActive: isActive == 2 ,'afternoon':true}">下午</span>
          <span @click="goMornign" :class="{ afternoonActive: isActive == 1 ,'afternoon':true}">上午</span>
        </div>
      </div>
    </div>

    <div :class="{ pt50: !isTop}" style="margin-bottom:20px; ">
      <div class="doctorList" id="mornign">
        <!-- <div v-show="isAAA" style="height:90px">aa</div> -->
        <p class="forenoon">上午</p>
        <ul v-if="amList.length!=0" v-show="!loadingtrue">
          <li v-for="(info,index2) in amList" :key="index2+'aa'" @click="intodoctordetail(info)"> </li>
        </ul>

        <!-- 测试用的 -->
         <!-- <li v-for="aa in 11">
          <div class="flatCard">
            <div class="cardText">
              <div class="headimg"><img src="@/assets/images/user.png" alt="医生头像"></div>
              <div>
                <div class="headname">
                  <span>{{aa}}{{aa}}{{aa}}{{isAAA}}</span>
                  <span class="levle">s</span>

                </div>
                <p class="headdesc">擅长:{sfo.skill}}</p>
              </div>
            </div>
          </div>
        </li> -->
        <!-- 测试用的end-->
        <ul v-if="amList.length!=0">
          <li v-for="(info,index2) in amList" :key="index2+'aa'" @click="intodoctordetail(info,1 )">
            <div class="flatCard">

              <div class="cardText">
                <div class="headimg"><img src="@/assets/images/user.png" alt="医生头像"></div>
                <div>
                  <div class="headname">
                    <span>{{info.name}}</span>
                    <span class="levle">{{info.title}}</span>
                    <span v-if="info.valNum!=0" class="have">余{{info.valNum}}</span>
                    <span v-if="info.valNum==0" class="have no">余{{info.valNum}}</span>
                  </div>
                  <p class="headdesc">擅长:{{info.skill}}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div v-else v-show="!loadingtrue">
          <p style="margin-left: 9px">暂无号源</p>
        </div>
        <Loading v-show="loadingtrue"></Loading>
      </div>

      <div class="doctorList" id="afternoon">
        <!-- <div v-show="isBottom" style="height:90px"></div> -->
        <p class="forenoon">下午</p>

        <!-- 测试用的 -->
        <!-- <li v-for="aa in 11">
          <div class="flatCard">
            <div class="cardText">
              <div class="headimg"><img src="@/assets/images/user.png" alt="医生头像"></div>
              <div>
                <div class="headname">
                  <span>下午{{aa}}</span>
                  <span class="levle">s</span>

                </div>
                <p class="headdesc">擅长:{sfo.skill}}</p>
              </div>
            </div>
          </div>
        </li> -->
        <!-- 测试用的end -->
        <ul v-if="pmList.length!=0" v-show="!loadingtrue">
          <li v-for="(pmItem,index) in pmList" :key="index">
            <div class="flatCard" @click="intodoctordetail(pmItem,2)">
              <div class="cardText">
                <div class="headimg">
                  <img src="@/assets/images/user.png" alt="医生头像">
                </div>
                <div>
                  <p class="headname">
                    <span>{{pmItem.name}}</span>
                    <span class="levle" style="padding-bottom: 4px;">{{pmItem.title}}</span>
                    <span v-if="pmItem.valNum!=0" class="have">余{{pmItem.valNum}}</span>
                    <span v-if="pmItem.valNum==0" class="have no">余{{pmItem.valNum}}</span>
                  </p>
                  <!-- <p class="headdesc"><span> {{pmItem.regStage}}</span></p> -->
                  <p class="headdesc">擅长:{{pmItem.skill}}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div v-else v-show="!loadingtrue">
          <p style="margin-left: 9px">暂无号源</p>
        </div>
        <Loading v-show="loadingtrue"></Loading>
      </div>

    </div>
  </div>
</template>
<script type="text/babel">
let selectDoctorList = "/app/bdHospitalDoctor/read/selectDoctorList";
let bdHospitalOrg = '/app/bdHospitalOrg/read/selectClinicListByHospitalArea';
export default {
  data() {
    console.log(String(this.$route.query.deptId), "wp")
    return {
      isBottom: false,
      isAAA: false,
      isSelectorShow: false,
      selectorValue: '',
      num: 5,
      isTop: true,
      isActive: 1,
      valNum: false,
      orgId: '',
      deptId: '',
      activetime: 0,
      normal: {
        checkbox: true,
        radio: 1,
        switch: false
      },
      departData: [],
      time: [],
      choosedate: '01-01',
      chooseweek: '当日号',
      isTime: '',
      amList: [],
      pmList: [],
      loadingtrue: true,
    };
  },
  created() {
  },


  mounted() {
    document.title = '医生列表';
    if (!this.deptId) {
      this.deptId = this.$route.query.deptId;
      this.selectorValue = this.$route.query.deptName;
    }
    if (!this.orgId) {
      this.orgId = this.$route.query.orgId * 1;
    }
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
      if (bodyTop * 1 < 45) {
        _this.isTop = true;
      } else {
        _this.isTop = false;
      }
      const isToBottom = bodyTop + window.innerHeight > document.body.offsetHeight
      if (bodyTop >= mornignHeight - 45) {
        _this.isActive = 2;
      } else {
        _this.isActive = 1
      }
    })


    if (!this.isTime) {
      var today = new Date();
      this.isTime = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    }
    this.getData();
    this.orgFun();
    this.doctorListFun();
  },
  methods: {
    orgFun() {
      this.$axios.put(bdHospitalOrg, {
        id: this.orgId,
      }).then((res) => {
        if (res.data.code == '200') {
          for (let i = 0; i < res.data.rows.length; i++) {
            let neslist = {
              text: res.data.rows[i].orgName,
              value: String(res.data.rows[i].id)
            }
            this.departData.push(neslist);
          }
        } else {
          console.log(res.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },

    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorChoose(data) {
      this.isSelectorShow = false;
      this.selectorValue = data.text;
      this.deptId = data.value;
      this.doctorListFun();
    },

    intodoctordetail(data, index) {
      this.$store.commit('majorFun', this.selectorValue);
      let argu = {}
      this.$router.push({
        name: 'doctordetail',
        query: { sourceId: data.regId, doctorId: data.id, time: this.isTime, week: this.chooseweek, afternoon: index }
      });
    },

    goMornign() {
      this.isBottom = false;
      this.isAAA = true;
      this.isActive = 1;
      document.querySelector("#mornign").scrollIntoView();
    },
    goAfternoon() {
      this.isBottom = true;
      this.isAAA = false;
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
          time = { date: data.newData, week: '当日号', year: data.newYear }
        } else {
          time = { date: data.newData, week: data.newDay, year: data.newYear }
        }
        this.time.push(time)
      }
      this.choosedate = this.time[0].date;

    },
    addDate(val, days) {
      var d = new Date(val);
      var data = {};
      let dayArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      d.setDate(d.getDate() + days);
      var y = d.getFullYear();
      var m = (d.getMonth() + 1) <= 9 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
      var newDay = dayArr[d.getDay()];
      var aa = d.getDate();
      aa = aa <= 9 ? "0" + aa : aa;
      data.newData = m + '-' + aa;
      data.newYear = y;
      data.newDay = newDay;
      return data;
    },
    searchT: function () {
      this.$router.push({
        name: 'doctorsearch',
        query: { deptId: this.deptId, isTime: this.isTime, valNum: this.valNum }
      });
    },
    switchTo(num, item) {
      this.activetime = num;
      this.choosedate = item.date;
      this.chooseweek = item.week;
      this.isTime = item.year + '-' + item.date;
      this.doctorListFun();
    },
    handler() {
      this.valNum = !this.valNum;
      this.doctorListFun();
    },
    doctorListFun() {
      this.$axios.put(selectDoctorList, {
        // 后台原因 orgId现在是科室id  parentId 是院区id
        orgId: this.deptId * 1,
        parentId: this.$store.state.feeActiveId * 1,
        valNum: this.valNum ? 1 : undefined,
        time: this.isTime,
      }).then((res) => {
        this.loadingtrue = false;
        if (res.data.code == '200') {
          this.amList = res.data.data.amList;
          this.pmList = res.data.data.pmList;
        } else {
          console.log(res.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },


  },

};
</script>
 <style   scoped>
@import "doctorList.css";
</style>