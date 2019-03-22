<template>
  <div class="choosedepart">
    <Header post-title="选择科室"></Header>
    <div class="outCarint margin45">
      <Search></Search>
      <Apptab :tab-title="departs" v-on:childByValue="childByValue"></Apptab>
      <div>
        <!-- <div v-for="(item, index) in spacia" :key="'departsname' + index" :class="active2 === index ? 'mubutton activebtn' : 'mubutton' " @click="switchDE(index)" style=" margin-right: 10px;">
          {{item.title}}
        </div> -->
        <!-- <p class="xuanze">选择科室
          <span class="warn">(周末及节假日不可预约)</span>
        </p>
        <div v-if="this.active1==0">
          <md-cell-item v-for="(item2,index2) in departData" arrow @click="intodoctorList(item2)" :key="index2" :title="item2.orgName" />
        </div>
        <div v-if="this.active1==1">
          <md-cell-item v-for="(item2,index2) in departData" arrow @click="intodoctorList(item2)" :key="index2" :title="item2.orgName" />
        </div> -->
        <p class="xuanze">选择科室
          <span class="warn">(周末及节假日不可预约)</span>
        </p>
        <div v-if="departData.length!=0" v-show="!loadingtrue">
          <md-cell-item v-for="(item,index) in departData" arrow @click="intodoctorList(item)" :key="index" :title="item.orgName" />
          <p v-show="nomore" class="noMore">没有更多数据了</p>
        </div>
        <div v-show="!loadingtrue" class="nullDiv" v-else>
          <img src="@/assets/images/null1.png">
        </div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="clearfix">
          <span v-if="departData.length!=0&&!nomore">
            <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
          </span>
        </div>
        <Loading v-show="loadingtrue"></Loading>
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
      page: 1,
      pageSize: 10,
      loadingtrue: true,
      busy: true,
      nomore: false,
    };
  },
  created() {
    if (this.$store.state.feeActiveId) {
      this.yuanId = this.$store.state.feeActiveId;
    }
  },
  watch: {

  },
  mounted() {
    document.title = '选择科室';




    let _this = this;
    this.$axios.put(bdHospitalOrg, {
      orgId: localStorage.getItem("hospitalId") * 1
    }).then((res) => {
      if (res.data.code == '200') {
        this.departs = res.data.rows;
        for (let i = 0; i < res.data.rows.length; i++) {
          this.departs[i].title = res.data.rows[i].orgName;
        }
        if (!this.yuanId) {
          this.yuanId = res.data.rows[0].id;
        }
        this.$store.commit('departFun', res.data.rows[0].orgName);
        this.orgFun(this.yuanId);
      } else {
        console.log(res.msg);
      }
    }).catch(function (err) {
      console.log(err);
    });


  },
  methods: {
    // orgFun(data) {
    //   this.$axios.put(bdHospitalOrg, {
    //     id: data
    //   }).then((res) => {
    //     if (res.data.code == '200') {
    //       this.departData = res.data.rows;

    //     } else {
    //       console.log(res.msg);
    //     }
    //   }).catch(function (err) {
    //     console.log(err);
    //   });
    // },
    childByValue: function (childValue) {
      console.log(childValue);
      //this.active1 = index;
      this.yuanId = childValue.id;
      this.$store.commit('departFun', childValue.orgName);
      this.orgFun(this.yuanId);
      // this.type = childValue.type;
      this.$store.commit('feeActiveFun', childValue.id);
      this.loadingtrue = true;
      this.page = 1;
    },
    switchTo(num, index) {
      this.active1 = index;
      this.$store.commit('departFun', num.orgName);
      this.yuanId = num.id;
      this.orgFun()
    },
    orgFun(flag) {
      let deptparams = {};
      deptparams.pageNumber = this.page;
      deptparams.pageSize = this.pageSize;
      deptparams.id = this.yuanId;
      this.$axios.put(bdHospitalOrg, deptparams).then((res) => {
        if (res.data.rows) {
          this.loadingtrue = false;
          this.departData = [];
          if (flag) {
            this.departData = this.departData.concat(res.data.rows);  //concat数组串联进行合并
            if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
              this.busy = false;
              this.nomore = false;
            } else {
              this.busy = true;
              this.nomore = true;
            };
          } else {
            this.departData = res.data.rows;
            this.busy = true;
            if (res.data.total <= 10) {
              this.busy = true;
              this.nomore = true;
            } else {
              this.busy = false;
              this.nomore = false;
            }
          }
        } else {
          this.departData = []
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    loadMore() {
      this.busy = true;  //将无限滚动给禁用
      setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
        this.page++;  //滚动之后加载第二页
        this.orgFun(true);
      }, 500);
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
  font-size: 30px;
  /* margin-top: 30px; */
  border-bottom: 1px solid #ededed;
  padding-bottom: 30px;
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
 
#app .choosedepart .md-cell-item-title {
  font-size: 15px;
}
</style>