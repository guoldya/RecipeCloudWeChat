<template>
  <div class="chooseCase">
    <Header post-title=" "></Header>
    <Navigation type="title" title="选择复印病案">
      <span v-show="copyResultData.length!=0" class="mu-secondary-text-color" @click="getJumpId">确定</span>
    </Navigation>
    <div class="margin55">
      <div class="recipeRecord">
        <div class="recordcard" v-for="(item,i) in copyResultData" v-if="copyResultData.length!=0" v-show="!loadingtrue" :key="i">
          <div class="listData">
            <span class="title">
              <span class="tag">
                第{{item.ihCount}}次住院
              </span>
            </span>
            <span>
              <label class="md-radio" :class="{'is-checked':checked==item.id}" @click="checkedFun(item,i)">
                <div class="md-radio-icon">
                  <i class="md-icon icon-font md-icon-checked checked md"></i>
                </div>
              </label>
            </span>
          </div>
          <div class="recordcard-content">
            <p class="parElem listData">
              <span class="sonElem">姓名</span>
              <span> {{item.name}}</span>
            </p>
            <p class="parElem listData">
              <span class="sonElem">病区</span>
              <span>{{item.area}}</span>
            </p>
            <p class="parElem listData">
              <span class="sonElem">出院诊断</span>
              <span> {{item.diag}}</span>
            </p>
            <p class="parElem listData">
              <span class="sonElem">入院日期</span>
              <span> {{item.inTime | lasttime}}</span>
            </p>
          </div>
        </div>
      </div>
      <Null :loading-true="!loadingtrue&&copyResultData.length==0"></Null>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
        <span v-if="copyResultData.length!=0&&!nomore">
          <span class="mu-light-text-color">加载中</span>
          <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
        </span>
      </div>
      <Loading v-show="loadingtrue"></Loading>
    </div>
  </div>
</template>
<script type="text/babel"> 


let copyApply_page_url = "/bizIhRecord/read/page";
export default {
  data() {
    return {
      checked: '',
      favorites: [],
      busy: true,
      nomore: false,
      loadingtrue: true,
      page: 1,
      pageSize: 10,
      copyResultData: [],
      totalMoney: '',
    };
  },

  mounted() {
    this.addadress();
    this.$axios.put(copyApply_page_url, { status: 3, }).then(res => {
      this.checked = res.data.rows[0].id;
      this.$store.commit('chooseInfoFun', res.data.rows[0]);
    })
  },
  methods: {
    addadress(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = this.pageSize;
      params.status = 3;
      this.$axios.put(copyApply_page_url, params).then(res => {
        if (res.data.rows) {
          this.loadingtrue = false;
          if (flag) {
            this.copyResultData = this.copyResultData.concat(res.data.rows);  //concat数组串联进行合并
            if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
              this.busy = false;
              this.nomore = false;
            } else {
              this.busy = true;
              this.nomore = true;
            };
          } else {
            this.copyResultData = res.data.rows;
            this.busy = true;
            if (res.data.total < 10) {
              this.busy = true;
              this.nomore = true;
            } else {
              this.busy = false;
              this.nomore = false;
            }
          }
        } else {
          this.copyResultData = []
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    loadMore() {
      this.busy = true;  //将无限滚动给禁用
      setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
        this.page++;  //滚动之后加载第二页
        this.addadress(true);
      }, 500);
    },
    checkedFun: function (val, i) {
      let setInfo = JSON.stringify(val)
      sessionStorage.setItem('chooseInfo', setInfo)
      this.$store.commit('chooseInfoFun', val);
      this.checked = val.id

    },

    getJumpId(val) {
      if (!this.checked) {
        this.$toast.info("请选择复印病案")
        return
      }
      this.$router.push({
        name: 'business',
      });
      // this.$router.go(-1)
    },

  },
  computed: {

  },

};
</script>
 <style lang="scss"  scoped>
 .recordcard {
  background: #fff;
  border-radius: 17px;
  margin: 24px;
  .listData {
    padding: 24px 24px 6px;
    border-bottom: 1px solid #e5e5e5;
    .title {
      position: relative;
      top: -10px;
      img {
        width: 40px;
        margin-right: 5px;
        position: relative;
        top: 10px;
      }
    }
  }
  .recordcard-content {
    padding: 14px 0;
    .listData {
      padding: 7px 24px;
      border-bottom: none;
      span {
        padding: 0;
        max-width: 70%;
      }
      .have {
        font-size: 28px;
        color: #ffffff;
        float: right;
        background: var(--primary);
        border-radius: 40px;
        letter-spacing: 1px;
        width: 134px;
        line-height: 60px;
        text-align: center;
        margin-top: 20px;
      }
    }
  }
}
.chooseCase .tag {
  width: 150px;
  height: 60px;
  background: #1da1f3;
  position: absolute;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 0 40px 40px 0;
  color: #ffffff;
  line-height: 40px;
  padding: 10px;
  font-size: 26px;
  left: -38px;
}
.chooseCase .tag:before {
  content: "";
  position: absolute;
  right: 100%;
  top: -8px;
  left: 0px;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-right: 14px solid #0b96d2;
}
.chooseCase .recipeRecord .listData {
  padding-bottom: 18px;
}
.chooseCase .md-radio {
  margin-top: 0;
  margin-bottom: 0;
}
</style>