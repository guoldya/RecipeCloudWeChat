<!-- 在线问诊首页-->
<template>
  <div class="online">
    <div class="outCarint">
      <div class="onlineheader">在线问诊</div>
      <Search type="onlines"></Search>
      <Loading v-if="isloading"></Loading>
      <div class="online-content" v-else>
        <div class="tools">
          <div class="nav2">
            <router-link
              tag="span"
              :to="{ path: 'expertpage', query: { id: item.id ,orgName:item.orgName} }"
              v-for="(item, index) in departmentList"
              :key="index"
            >
              <img
                :src="$conf.constant.img_base_url + item.orgPicFileName"
                alt=""
              />{{ item.orgName }}
            </router-link>
          </div>
        </div>
        <div
          class="more"
          @click="loadMoredepartment"
          v-if="
            departmenParams.pages > 1 &&
              departmenParams.num < departmenParams.pages
          "
        >
          展开<img src="./xiangxia.png" alt="" />
        </div>
        <div class="tabA">
          <router-link to="/followDoctor" tag="div" class="tabAdiv">
            <div class="yellowWarn">关注的医生</div>
            <div class="tabAdivright">
              <img src="@/assets/images/online9.png" alt="" />
            </div>
          </router-link>
          <router-link class="tabAdiv" to="/inquiryRecord" tag="div">
            <div class="yellowWarn">问诊记录</div>
            <div class="tabAdivright">
              <img src="@/assets/images/online10.png" alt="" />
            </div>
          </router-link>
        </div>

        <md-tab-picker
          title="请选择科室"
          :data="Fdata"
          v-model="show"
          @change="chooseDepart"
        />
        <md-selector
          v-model="isSelectorShow"
          :data="sortData"
          @choose="chooseSort"
          title="选择排序"
        ></md-selector>

        <h2>推荐医生</h2>
        <div class="yaobutton">
          <div :class="{ yaoActive: isChecked == 0 }" @click="choose">
            {{ addressStr }}
            <span class="downImg">
              <img v-show="isChecked == 0" src="@/assets/images/top11.png" />
              <img
                v-show="isChecked != 0"
                src="@/assets/images/icon_down.png"
              />
            </span>
          </div>
          <div :class="{ yaoActive: isChecked == 1 }" @click="sort()">
            {{ selectorValue }}
            <span class="downImg">
              <img v-show="isChecked == 1" src="@/assets/images/top11.png" />
              <img
                v-show="isChecked != 1"
                src="@/assets/images/icon_down.png"
              />
            </span>
          </div>
          <div :class="{ yaoActive: isChecked == 2 }" @click="filter">
            筛选
            <span class="downImg">
              <img v-show="isChecked == 2" src="@/assets/images/top11.png" />
              <img
                v-show="isChecked != 2"
                src="@/assets/images/icon_down.png"
              />
            </span>
          </div>
        </div>
        <!-- 医生列表 -->
        <doctorList
          v-for="(item, index) in doctorList"
          :datas="item"
          :key="index"
        ></doctorList>
        <div
          class="loadmore"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="10"
        >
          <md-icon
            v-if="!isloading && busy"
            name="spinner"
            size="lg"
            style="-webkit-filter:invert(1)"
          ></md-icon>
          <div class="nomore" v-if="doctorParams.pageNumber == doctorPages">
            没有更多了
          </div>
        </div>
      </div>
    </div>
    <!-- 筛选弹窗 -->
    <filterPop ref="filterPop"></filterPop>

    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>
<script type="text/babel">
import { Field, FieldItem, TabPicker } from "mand-mobile";
import filterPop from "../component/filterPop";
import doctorList from "../../../components/doctorList";
const departmentUrl = "/app/bdHospitalOrg/read/selectClinicListByHospitalArea";
const recommendUrl = "/app/bdOnlineDoctor/read/page";
export default {
  name: "action-sheet-demo",
  height: 500,
  data() {
    return {
      isloading: true, // 是否正在请求
      busy: false, // 用于请求添加页面
      isChecked: 0,
      show: false,
      isSelectorShow: false,
      address: [],
      addressStr: "科室",
      selectorValue: "排序",
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
        ]
      },
      departmentList: [], // 科室数据
      departmenParams: {
        // 科室分页信息
        num: 1,
        pages: 1
      },
      doctorPages: null, // 医生总页数
      doctorParams: {
        type: null,
        level: null,
        status: null,
        price: null,
        deptId: null,
        pageNumber: 1
      },
      doctorList: []
    };
  },
  async mounted() {
    await this.getDepartment();
    await this.getRecommendDoctor();
    this.isloading = false;
  },
  methods: {
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
    loadMoredepartment() {
      // 加载更多
      this.departmenParams.num++;
      this.getDepartment();
    },
    loadMore() {
      if (this.isloading) return false;
      if (this.doctorParams.pageNumber == this.doctorPages) return false;
      this.busy = true;
      setTimeout(() => {
        this.doctorParams.pageNumber++;
        this.getRecommendDoctor();
        this.busy = false;
      }, 1000);
    },
    expertpage() {
      this.$router.push({
        name: "expertpage",
        query: {}
      });
    },
    chooseSort(data) {
      this.selectorValue = data.text.substring(0, 5);
      // this.doctorParams.
    },
    choose() {
      this.show = !this.show;
      this.isChecked = 0;
    },
    sort() {
      this.isChecked = 1;
      this.isSelectorShow = true;
    },
    filter() {
      this.isChecked = 2;
      this.$refs.filterPop.openPop();
    },
    chooseDepart({ options }) {
      this.address = options;
      this.addressStr = (options[0].label + options[1].label).substring(0, 5);
    }
  },
  components: {
    filterPop,
    doctorList
  }
};
</script>
 <style scoped>
@import url("./online.css");
</style>