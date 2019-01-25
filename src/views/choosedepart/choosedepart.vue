<template>
  <div class="choosedepart">
    <Header post-title="选择科室" v-show="isWeixin"></Header>
    <div :class="{'outCarint':true,'margin45':isWeixin,'margin7':!isWeixin}">
      <Search></Search>
      <div class="appTab">
        <span v-for="(item, index) in departs" :key="'departs' + index" @click="switchTo(index)" :class="active1 === index ? 'appTabAcitive' : '' ">
          {{item.title}}
        </span>
      </div>
      <div>
        <div v-for="(item, index) in spacia" :key="'departsname' + index" :class="active2 === index ? 'mubutton activebtn' : 'mubutton' " @click="switchDE(index)" style=" margin-right: 10px;">
          {{item.title}}
        </div>
        <p class="xuanze">选择科室
          <span class="warn">(周末及节假日不可预约)</span>
        </p>
        <div v-if="this.active1==0">
          <md-cell-item v-for="(item2,index2) in departData" arrow @click="intodoctorList(item2)" :key="index2" :title="item2.name" />
        </div>
        <div v-if="this.active1==1">
          <md-cell-item v-for="(item2,index2) in test3" arrow @click="intodoctorList(item2)" :key="index2" :title="item2.name" />
        </div>

      </div>
    </div>
    <div class="aui-footer" @click="lookagain">
      <span>复诊</span>
    </div>
  </div>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      isWeixin: false,
      active1: 0,
      departs: [
        { title: '华西医院' },
        { title: '晋江园区' },
      ],
      num: 10,
      active2: 0,
      spacia: [
        { title: '专家/普通门诊' },
        { title: '特色门诊挂号' },
      ],
      departData: [
        { name: "妇科门诊", value: 77 },
        { name: "生殖内分泌门诊", value: 88 },
        { name: "儿科", value: 99 },
        { name: "放射科", value: 111 },
        { name: '妇科', value: 1 },
        { name: '内科', value: 2 },
        { name: '外科', value: 31 },
        { name: '生殖内分泌', value: 55 },
      ],
      test3: [
        { name: "不孕不育", value: 555 },
        { name: "生殖内分泌门诊", value: 888 },
      ],
    };
  },
  created() {

  },
  mounted() {
    document.title = '选择科室';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
      return true;
    } else {
      this.isWeixin = true;
      return false;
    }
  },
  methods: {
    switchTo(num) {
      this.active1 = num;
    },
    switchDE(num) {
      this.active2 = num;
    },
    lookagain() {
      this.$router.push({
        name: 'lookagain',
      });
    },
    intodoctorList(aa) {
      let argu = { value: aa.value };
      this.$router.push({
        name: 'doctorList',
        query: argu
      });
    },
  },
  computed: {

  },

};
</script>
 <style scoped>
.choosedepart .xuanze {
  font-size: 28px;
  margin-top: 30px;
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
  /* color: #ffffff; */
  border-radius: 5px;
  font-size: 28px;
  width: 240px;
  text-align: center;
  height: 70px;
  line-height: 70px;
  border: 1px solid #1da1f3;
  color: #1da1f3;
  display: inline-block;
}
.choosedepart .activebtn {
  background: #1da1f3;
  color: #ffffff;
}
.choosedepart .warn {
  font-size: 24px;
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
  font-size: 32px;
}
.choosedepart .appTab span {
  padding: 0 8px 8px;
}

.choosedepart .appTabAcitive {
  color: #1da1f3;
  border-bottom: 4px solid #1da1f3;
}
</style>