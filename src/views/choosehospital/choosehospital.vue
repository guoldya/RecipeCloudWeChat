<template>
  <div class="choosehospital">
    <Header post-title="选择医院"></Header>
    <div class="margin50">
      <Search post-placeholder="请输入医院名称" type="choosehospital"></Search>
      <ul v-if="hospitaldata.length!=0" v-show="!loadingtrue">
        <li class="booking-index--hospitals-item" v-for="(item,index) in hospitaldata" :key="index">
          <div @click="intoDepart(item)">
            <span class="thumb"><img src="@/assets/images/hosiptal.png" class="x-img-fadein" normal="loaded"></span>
            <span class="media">
              <p class="title">{{item.orgName}}</p>
              <p class="sub-title">
                <span class="lv">三级甲等</span>
                <span class="type">{{item.contacts}}</span>
              </p>
              <p class="feature">
                <span class="dept-title">地址：{{item.address}}</span>
              </p>
            </span>
          </div>
        </li>
        <p v-show="nomore" class="noMore">没有更多数据了</p>
      </ul>

      <Null :loading-true="!loadingtrue "></Null>
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
let bdHospitalOrg = '/bdOrgHospital/read/page';
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
    // if (this.$store.state.feeActiveId) {
    //    this.orgId = this.$store.state.feeActiveId;
    // }
  },
  watch: {

  },
  mounted() {
    this.orgFun(false);
  },
  methods: {

    intoDepart(data) {
      this.$router.push({
        name: 'choosedepart',
        query: { hospitalId: data.id, hospitalName: data.orgName, }
      });
    },

    back() {
      if (this.TOKEN && !this.isWin) {
        WebViewJavascriptBridge.callHandler(
          'back'
          , {}
          , function (responseData) {

          }
        );
      } else {
        this.$router.go(-1)
      }
    },
    orgFun(flag) {
      let deptparams = {};
      deptparams.pageNumber = this.page;
      deptparams.pageSize = this.pageSize;
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
  computed: {

  },

};
</script>
 <style scoped>
@import "choosehospital.css";
</style>