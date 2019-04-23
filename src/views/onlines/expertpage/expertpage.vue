<!-- 专家问诊 -->
<template>
  <div class="outCarint expertpage margin45">
    <Header :post-title="$route.query.orgName"></Header>
    <Search type="onlines"></Search>
    <!-- 搜索框 -->
    <Loading v-if="isloading"></Loading>
    <!-- 弹窗 -->
    <!-- <md-tab-picker title="请选择科室" :data="Fdata" v-model="isDepartShow" @change="chooseDepart" /> -->

    <md-selector v-model="isDepartShow" :data="departData" @choose="chooseDepart" title="请选择科室"></md-selector>
    <md-selector v-model="isSortShow" :data="sortData" @choose="chooseSort" title="选择排序"></md-selector>
    <!-- 查询菜单栏 -->
    <div class="selectTool" v-if="doctorList.length&&!isloading">
      <div :class="isChecked == 0 ? 'isActive' : ''" @click="department">
        <span>{{ departmentText }}</span>
        <span class="downImg">
          <img v-if="isChecked == 0" src="@/assets/images/top11.png" />
          <img v-else src="@/assets/images/icon_down.png" />
        </span>
      </div>
      <div :class="isChecked == 1 ? 'isActive' : ''" @click="sort">
        <span>{{ sortText }}</span>
        <span class="downImg">
          <img v-if="isChecked == 1" src="@/assets/images/top11.png" />
          <img v-else src="@/assets/images/icon_down.png" />
        </span>
      </div>
      <div :class="isChecked == 2 ? 'isActive' : ''" @click="filterCotent">
        <span>筛选</span>
        <span class="downImg">
          <img v-if="isChecked == 2" src="@/assets/images/top11.png" />
          <img v-else src="@/assets/images/icon_down.png" />
        </span>
      </div>
    </div>
    <div class="doctorlist-warp">
      <!-- 医生列表 -->
      <doctorList v-for="(item, index) in doctorList" :key="index" :datas="item"></doctorList>
      <div class="nodata" v-if="!doctorList.length&&!isloading">
        <img src="@/assets/images/null1.png" alt="">
      </div>
      <div class="loadmore" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <md-icon v-if="!isloading && busy" name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
        <div class="nomore" v-if="this.doctorPages==this.doctorParams.pageNumber">没有更多了</div>
      </div>
    </div>

    <!-- 筛选弹窗 -->
    <filterPop ref="filterPop" v-on:childByValue="childByValue"></filterPop>
  </div>
</template>
<script type="text/babel">
import { Field, FieldItem, TabPicker } from "mand-mobile";
import filterPop from "../component/filterPop";
import doctorList from "../../../components/doctorList";
const departmentUrl = "/app/bdHospitalOrg/read/selectClinicListByHospitalArea";
const recommendUrl = "/app/bdOnlineDoctor/read/page";

export default {
  data() {
    return {
      isloading: true, // 是否正在请求
      busy: false,
      show: false,
      isChecked: 0, // 科室选择
      departmentText: "科室",
      sortText: "排序",
      isDepartShow: false, // 控制选择科室弹窗是否显示
      isSortShow: false, // 控制选择排序弹窗是否显示
      doctorPages: null, // 医生总页数
      doctorParams: {
        type: null,
        level: null,
        status: null,
        price: null,
        deptId: Number(this.$route.query.id),
        pageNumber: 1
      },
      doctorList: [],
      departData: [
        {
          value: '',
          text: "全部科室"
        },
      ],
      departmenParams: {
        // 科室分页信息
        num: 1,
        pages: 1
      },
      sortData: [
        {
          value: 1,
          text: "问诊量"
        },
        {
          value: "2",
          text: "价格"
        },
        {
          value: "3",
          text: "好评度"
        }
      ],
      Fdata: {
        // 科室数据
        // 唯一键名
        name: "科室",
        // 面板标签
        label: "科室",
        // 选项列表
        options: [
          {
            // 选项值
            value: "1",
            // 选项标签
            label: "骨科",
            // 级联子面板
            children: {
              name: "骨头断了",
              label: "骨头断了",
              options: [
                {
                  value: "骨头断了",
                  label: "骨头断了"
                }
              ]
            }
          },
          {
            // 选项值
            value: "2",
            // 选项标签
            label: "妇科",
            // 级联子面板
            children: {
              name: "妇科",
              label: "妇科",
              options: [
                {
                  value: "宫颈",
                  label: "宫颈"
                }
              ]
            }
          }
        ],
        testshow: false
      }
    };
  },
  components: {
    filterPop,
    doctorList
  },
  async mounted() {
    document.title = this.$route.query.orgName;
    await this.getDepartment();
    await this.getRecommendDoctor();
    this.isloading = false;
  },
  watch: {
    doctorParams: {
      handler(newdoctorParams, olddoctorParams) {
        this.getRecommendDoctor();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {

    childByValue: function (data) {
      var aa = [];
      var bb = [];
      for (var i = 0; i < data[0].length; i++) {
        aa.push(parseInt(data[0][i].value))
      }
      for (var i = 0; i < data[1].length; i++) {
        bb.push(parseInt(data[1][i].value))
      }
      if (data[0].length != 0) {
        this.doctorParams.type = aa;
      } else {
        this.doctorParams.type = null;
      }
      if (data[0].length != 0) {
        this.doctorParams.level = bb;
      } else {
        this.doctorParams.level = null;
      }

    },
    // 得到某院区下的所有科室
    async getDepartment() {
      try {
        let res = await this.$axios.put(departmentUrl, {
          orgId: Number(localStorage.getItem("hospitalId")),
          orgType: 3,
          pageNumber: this.departmenParams.num
        });
        if (res.data.code != 200) {
          throw Error(res.data.msg);
        }
        this.departmenParams.pages = res.data.pages;
        for (let i = 0; i < res.data.rows.length; i++) {
          let neslist = {
            text: res.data.rows[i].orgName,
            value: String(res.data.rows[i].id)
          }
          this.departData.push(neslist);
        }
        this.departmentList = this.departmentList.concat(res.data.rows);
      } catch (error) {
        console.log(error);
      }
    },
    // 得到推荐医生
    async getRecommendDoctor() {
      try {
        let res = await this.$axios.put(recommendUrl, this.doctorParams);
        if (res.data.code != 200) {
          throw Error(res.data.msg);
        }
        if (res.data.rows) {
          this.doctorList =
            this.doctorParams.pageNumber == 1
              ? res.data.rows
              : this.doctorList.concat(res.data.rows);
        }
        this.doctorPages = res.data.pages;
        this.doctorParams.pageNumber = res.data.current;
      } catch (error) {
        console.log(error.message);
      }
    },
    loadMore() {
      if (this.isloading) return false;
      if (this.doctorPages == this.doctorParams.pageNumber) return false
      this.busy = true;
      setTimeout(() => {
        this.doctorParams.pageNumber++
        this.getRecommendDoctor()
        this.busy = false;
      }, 1000);
    },
    // 科室选择
    department() {
      this.isChecked = 0;
      this.isDepartShow = true;
    },
    // 排序选择
    sort() {
      this.isChecked = 1;
      this.isSortShow = true;
    },
    // 内容筛选
    filterCotent() {
      this.isChecked = 2;
      this.$refs.filterPop.openPop();
    },
    // 科室选择弹窗返回的数据
    chooseDepart(data) {
      this.address = data;
      this.doctorParams.deptId = data.value ? data.value * 1 : null;
      this.addressStr = data.text.substring(0, 5);
      // this.addressStr = text;
      // this.addressStr = (options[0].label + options[1].label).substring(0, 5);
    },
    // 排序选择返回数据
    chooseSort(data) {
      this.sortText = data.text;
    }
  },
  computed: {}
};
</script>
 <style scoped lang="scss">
@import url("./expertpage.css");
.loadmore {
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: center;
  .nomore {
    color: #999;
    font-size: 24px;
  }
}
</style>