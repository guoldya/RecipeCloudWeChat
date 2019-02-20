<template>
  <div class="choosedepart">
    <Header post-title="选择科室" v-show="isWeixin"></Header>
    <div :class="{'outCarint':true,'margin45':isWeixin,'margin7':!isWeixin}">
      <Search></Search>
      <div class="appTab">
        <span v-for="(item, index) in departs" :key="'departs' + index" @click="switchTo(item.id,index)" :class="active1 === index ? 'appTabAcitive' : '' ">
          {{item.orgName}}
        </span>
      </div>
      <div>
        <!-- <div v-for="(item, index) in spacia" :key="'departsname' + index" :class="active2 === index ? 'mubutton activebtn' : 'mubutton' " @click="switchDE(index)" style=" margin-right: 10px;">
          {{item.title}}
        </div> -->
        <p class="xuanze">选择科室
          <span class="warn">(周末及节假日不可预约)</span>
        </p>
        <div v-if="this.active1==0">
          <md-cell-item v-for="(item2,index2) in departData" arrow @click="intodoctorList(item2)" :key="index2" :title="item2.orgName" />
        </div>
        <div v-if="this.active1==1">
          <md-cell-item v-for="(item2,index2) in departData" arrow @click="intodoctorList(item2)" :key="index2" :title="item2.orgName" />
        </div>
      </div>
    </div>
    <!-- <div class="aui-footer" @click="lookagain">
      <span>复诊</span>
    </div> -->
  </div>
</template>
<script type="text/babel">
let bdHospitalOrg = '/app/bdHospitalOrg/read/selectClinicListByHospitalArea';

export default {
  data() {
    return {
      isWeixin: false,
      active1: 0,
      yuanId: "",
      departs: [],
      num: 10,
      active2: 0,
      spacia: [
        { title: '普通门诊', value: 1 },
        { title: '专家门诊', value: 2 },
        { title: '特色门诊', value: 3 },
      ],
      departData: [],
      test3: [
        { name: "不孕不育", value: 555 },
        { name: "生殖内分泌门诊", value: 888 },
      ],
    };
  },
  created() {

  },
  watch: {

  },
  mounted() {
    document.title = '选择科室';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
    } else {
      this.isWeixin = true;
    };
    let _this = this;
    this.$axios.put(bdHospitalOrg, {
      orgId: 49
    }).then((res) => {
      if (res.data.code == '200') {
        this.departs = res.data.rows;
        this.yuanId = res.data.rows[0].id;
        this.orgFun(this.yuanId);
      } else {
        console.log(res.msg);
      }
    }).catch(function (err) {
      console.log(err);
    });


  },
  methods: {
    orgFun(data) {
      this.$axios.put(bdHospitalOrg, {
        id: data
      }).then((res) => {
        if (res.data.code == '200') {
          this.departData = res.data.rows;
        } else {
          console.log(res.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    switchTo(num, index) {

      this.active1 = index;
      this.yuanId = num;
      this.orgFun(this.yuanId)
    },
    switchDE(num) {
      this.active2 = num;
    },
    lookagain() {
      this.$router.push({
        name: 'lookagain',
      });
    },
    intodoctorList(data) {
      console.log(data)
      this.$router.push({
        name: 'doctorList',
        query: { deptId: data.id, yuanId: this.yuanId, departName: data.orgName }
      });
    },

  },
  computed: {

  },

};
</script>
 <style scoped>
.choosedepart .xuanze {
  font-size: 32px;
  /* margin-top: 30px; */
}
.choosedepart .margin20 {
  margin-top: 20px;
}
.choosedepart .cardText p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.choosedepart .buttonDepart {
  font-size: 14px;
  padding: 0 16px;
  line-height: 36px;
  border-radius: 5px;
  background: pink;
}
.choosedepart .cardText {
  padding: 0 16px;
}
.choosedepart .departRow {
  display: flex;
}
.choosedepart .departRow span {
  width: 50%;
  font-size: 13px;
  color: #0b0b0b;
}
.choosedepart .grid-cell {
  line-height: 50px;
}
.choosedepart .mubutton {
  color: #8a8a8a;
  border-radius: 5px;
  font-size: 28px;
  width: 180px;
  text-align: center;
  /* height: 60px; */
  /* padding: 0 10px; */
  line-height: 57px;
  border: 2px solid #1da1f3;
  color: #1da1f3;
  display: inline-block;
}
.choosedepart .activebtn {
  background: #1da1f3;
  color: #ffffff;
}
.choosedepart .warn {
  font-size: 28px;
  color: #f44336;
}
.choosedepart .departLi {
  width: 100%;
  float: left;
  border-bottom: 1px solid #ededed;
}
.choosedepart .grid-cell p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 50px;
}

.choosedepart .aui-footer {
  width: 120px;
  z-index: 100;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  height: 120px;
  background-color: #1da1f3;
  position: fixed;
  bottom: 30px;
  text-align: center;
  color: #ffffff;
  border-radius: 50%;
  right: 24px;
  box-shadow: 2px 0px 2px 2px rgba(0, 0, 0, 0.2);
}
.choosedepart .aui-footer:after {
  border-top: none;
}
.choosedepart .aui-footer span {
  font-size: 32px;
  position: relative;
  text-align: center;
  left: 16px;
  letter-spacing: 1px;
}

/**tab样式*/

.choosedepart .appTitle {
  padding: 32px;
  border-bottom: 1px solid #ededed;
  display: flex;
  justify-content: space-between;
}
.choosedepart .choosedepart .appTab {
  display: flex;
  justify-content: space-between;
  padding: 32px 100px;
  font-size: 36px;
}
.choosedepart .choosedepart .appTab span {
  font-size: 32px;
}
.choosedepart .appTab span {
  padding: 0 8px 8px;
}

.choosedepart .appTabAcitive {
  color: #1da1f3;
  border-bottom: 4px solid #1da1f3;
}
#app .choosedepart .md-cell-item-title {
  font-size: 15px;
}
</style>