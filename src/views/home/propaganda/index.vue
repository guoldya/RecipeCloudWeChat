<template>
  <div class="container  margin55">
    <Header post-title="宣教信息"></Header>
    <div v-if="waitPayData.length!=0" v-show="!loadingtrue">
      <div class="mui-card" v-for="(item,i) in waitPayData" :key="i" @click="appointinfo(item)">
        <div class="mui-card-header mui-card-media">
          <img src="@/assets/images/bg.png" alt=""></div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p>Posted on January 18, 2016</p>
            <p style="color: #333;">这里显示文章摘要，让读者对文章内容有个粗略的概念这里显示文章摘要，让读者对文章内容有个粗略的概念...</p>
          </div>
        </div>
      </div>
    </div>

    <div v-show="!loadingtrue" class="nullDiv" v-else>
      <img src="@/assets/images/null1.png">
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
      <span v-if="waitPayData.length!=0&&!nomore">
        <span class="mu-light-text-color">加载中</span>
        <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
      </span>
    </div>
    <Loading v-show="loadingtrue"></Loading>
  </div>
</template>

<script>
let pay_list_url = "/app/bizArticle/read/list"
export default {
  data() {
    return {
      waitPayData: [],
      page: 1,
      pageSize: 10,
      type: 0,
      busy: true,
      nomore: false,
      loadingtrue: true,
    };
  },
  created() {

  },
  mounted() {
    this.WaitPay(false);
  },
  methods: {
    WaitPay(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = this.pageSize;
      this.$axios.put(pay_list_url, params).then((res) => {
        this.loadingtrue = false;
        if (res.data.code == 200) {
          if (res.data.rows) {
            if (flag) {
              this.waitPayData = this.waitPayData.concat(res.data.rows);  //concat数组串联进行合并
              if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
                this.busy = false;
                this.nomore = false;
              } else {
                this.busy = true;
                this.nomore = true;
              }
            } else {
              this.waitPayData = res.data.rows;
              this.busy = true;
              if (res.data.total < 10) {
                this.busy = true;
                this.nomore = true;
              } else {
                this.busy = false;
                this.nomore = false;
              }
            }
          }
          //2、
        } else {
          this.waitPayData = []
        }
      })
    },
    loadMore() {
      this.busy = true;  //将无限滚动给禁用
      setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
        this.page++;  //滚动之后加载第二页
        this.WaitPay(true);
      }, 500);
    },
    appointinfo: function (val) {
      this.$router.push({
        name: 'propagandainfo',
        query: { id: val.id }
      });
    },



  },

};
</script>

<style>
.mui-card {
  font-size: 28px;
  position: relative;
  overflow: hidden;
  margin: 20px;
  border-radius: 5px;
  background-color: #fff;
  background-clip: padding-box;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.mui-card-header {
  height: 240px;
  width: 100%;
}
.mui-card-header img {
  height: 100%;
  width: 100%;
}
.mui-card-media {
  vertical-align: bottom;
  color: #fff;
  background-position: center;
  background-size: cover;
}
.mui-card-content {
  font-size: 28px;
  position: relative;
}
.mui-card-content-inner {
  position: relative;
  padding: 20px 30px;
}
.mui-card-content-inner p {
  font-size: 28px;
  margin-top: 0;
  margin-bottom: 20px;
  color: #8f8f94;
  line-height: 34px;
}
</style>
