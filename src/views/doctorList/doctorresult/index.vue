<template>
  <div class="result">
    <Header post-title="搜索结果"></Header>
    <div class="margin50">
      <div v-if="hospitaldata.length!=0" v-show="!loadingtrue">
        <md-cell-item v-for="(item,index) in hospitaldata" :key="index+'aa'" @click="intodoctorinfo(item)" :title="item.name" :brief="item.introduce" arrow>
          <span class="holder" slot="left"><img src="@/assets/images/user.png"></span>
        </md-cell-item>
        <p v-show="nomore" class="noMore">没有更多数据了</p>
      </div>
      <div v-show="!loadingtrue" class="nullDiv" v-else>
        <img src="@/assets/images/null1.png">
      </div>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
        <span v-if="hospitaldata.length!=0&&!nomore">
          <span class="mu-light-text-color">加载中</span>
          <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
        </span>
      </div>
      <Loading v-show="loadingtrue"></Loading>
    </div>
    <!-- <div class="aui-footer" @click="lookagain">
      <span>复诊</span>
    </div> -->
  </div>
</template>
<script type="text/babel">
let bdHospitalOrg = '/bdHospitalDoctor/read/selectDoctorPage';
export default {
  data() {
    return {
      hospitaldata: [],
      page: 1,
      pageSize: 10,
      loadingtrue: true,
      busy: true,
      nomore: false,
    };
  },
  created() {

  },
  watch: {

  },
  mounted() {
    this.orgFun(false);
  },
  methods: {


    intodoctorinfo(data) {
      this.$router.push({
        name: 'doctordetail',
        query: { doctorId: data.id, islist: 1 }
      });
    },

    orgFun(flag) {
      let deptparams = {};
      deptparams.pageNumber = this.page;
      deptparams.pageSize = this.pageSize;
      deptparams.keyword = this.$route.query.val;
      this.$axios.put(bdHospitalOrg, deptparams).then((res) => {
        if (res.data.rows) {
          this.loadingtrue = false;
          if (flag) {
            this.hospitaldata = this.hospitaldata.concat(res.data.rows);
            //concat数组串联进行合并
            if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
              this.busy = false;
              this.nomore = false;
            } else {
              this.busy = true;
              this.nomore = true;
            };
          } else {
            this.hospitaldata = res.data.rows;
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
          this.hospitaldata = []
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

  },


};
</script>
 <style scoped>
 
</style>