<template>
  <div class="acctest">
    <Header post-title="账号设置"></Header>
    <div class="margin55">
      <div class="container1">
        <div class="box1">头像</div>
        <div class="head-img">
          <img v-if="userInfo.headUrl" :src="$conf.constant.img_base_url + userInfo.headUrl" alt="">
          <img v-else src="@/assets/images/user.png">
        </div>
      </div>
      <div class="container2 md-example-child md-example-child-icon md-example-child-icon-2">
        <div class="box1">昵称</div>
        <div class="box2" @click="acctestinfo">
          {{userInfo.nickname}}
          <md-icon name="arrow-right" size="sm"></md-icon>
        </div>
      </div>
      <div class="container2">
        <div class="box1">用户名</div>
        <div class="box2">{{userInfo.name}}</div>
      </div>
      <div class="container2">
        <div class="box1">性别</div>
        <div class="box2">{{userInfo.sex=="1"?'男':'女'}}</div>
      </div>
      <div class="container2">
        <div class="box1">出生日期</div>
        <div class="box2">{{userInfo.birthday.substring(0,10)}}</div>
      </div>
      <Loading v-show="loadingtrue"></Loading>
    </div>
  </div>
</template>

<script  >
import { mapState } from "vuex";
import { Icon } from "mand-mobile";

let appoint_order_url = "/bizExamApply/read/page";
export default {
  name: "icon-demo",
  data() {
    return {
      active1: 0,

      loadingtrue: false,
      busy: true,
      nomore: false,
      page: 1,
      pageSize: 10,
      payType: 0
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.home.userInfo
    })
  },
  components: {
    [Icon.name]: Icon
  },
  async mounted() {
    await this.$store.dispatch("getUserInfo", { update: true });
    console.log(this.userInfo,"userInfo")
  },
  methods: {
    acctestinfo() {
      let argu = {};
      this.$router.push({
        name: "acctestinfo",
        query: argu
      });
    },
    loadMore() {
      this.busy = true; //将无限滚动给禁用
      setTimeout(() => {
        //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
        this.page++; //滚动之后加载第二页
        this.appointFun(true);
      }, 500);
    }
  },
};
</script>
<style   scoped>
.container1 {
  width: 100%;
  height: 141px;
  margin-top: 5px;
  border-bottom: 1px solid var(--primary--line);
  display: flex;
  line-height: 100px;
  justify-content: space-between;
  padding: 20px;
}
.box1 {
  color: var();
}
.head-img {
  width: 100px;
  height: 100px;
}
.head-img img {
  width: 100%;
  height: 100%;
}
.container2 {
  width: 100%;
  height: 101px;
  margin-top: 5px;
  border-bottom: 1px solid var(--primary--line);
  display: flex;
  line-height: 60px;
  justify-content: space-between;
  padding: 20px;
}
.box2 {
  width: auto;
  height: 60px;
  padding-right: 10px;
}
</style>