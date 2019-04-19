<template>
  <div class="chooseCase">
    <Header post-title=" "></Header>
    <Navigation type="title" title="选择复印病案">
      <span class="mu-secondary-text-color" @click="getJumpId">确定</span>
    </Navigation>
    <div class="margin55" style="margin-bottom:70px">
      <div class="tabAdiv flatCard" v-for="(item,i) in copyResultData" v-if="copyResultData.length!=0" v-show="!loadingtrue" :key="i">
        <div class="listData mu-secondary-text-color">
          <!-- <md-radio :name="i" v-model="checked" /> -->
          <label class="md-radio" :class="{'is-checked':checked==item.id}" @click="checkedFun(item,i)">
            <div class="md-radio-icon">
              <i class="md-icon icon-font md-icon-checked checked md"></i>
            </div>
          </label>
        </div>
        <div class="chooseCaseText">
          <p>住院科室：{{item.dept}}</p>
          <p>出院诊断：{{item.diag}} </p>
          <p>入院日期：{{item.inTime | lasttime}}</p>
          <p>出院日期：{{item.recipeDate | lasttime}}</p>
        </div>
        <div class="chooseCaseTime">
          <span>第
            <span class="number">{{item.recordNum}}</span>次 </span>
          <!--第-->
          <!--<div class="number">1</div>-->
          <!--次-->
        </div>
        <!-- <p class="addbTN" @click="getJumpId()">确定</p> -->
      </div>
      <div v-show="!loadingtrue" class="aligncenter nullDiv" v-else>
        <img src="@/assets/images/null1.png">
      </div>
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
let copyApply_page_url = "/app/bizCopyApply/read/page";
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
    };
  },

  created() {

  },
  watch: {

  },
  mounted() {
    this.addadress();
    this.$axios.put(copyApply_page_url, {}).then(res => {
      this.checked = res.data.rows[0].id;
      this.$store.commit('chooseInfoFun', res.data.rows[0]);
    })
  },
  methods: {
    addadress(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = this.pageSize;
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
      this.$store.commit('chooseInfoFun', val);
      this.checked = val.id
    },

    getJumpId(val) {
      if (this.checked == 777) {
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
 <style scoped>
.chooseCase .tabAdiv {
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
  font-size: 28px;
  margin-bottom: 10px;
}
.chooseCase .tabAdiv div:first-child {
  /*line-height: 200px;*/
  display: flex;
  width: 10%;
}
.chooseCase .chooseCaseBtn {
  width: 15%;
  height: 200px;
  text-align: center;
  display: inline-block;
  color: #ffffff;
}
.chooseCase .md-radio {
  margin-left: 20%;
}
.chooseCase .chooseCaseText {
  width: 60%;
  height: 200px;
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.chooseCase .chooseCaseTime {
  width: 30%;
  /*height: 200px;*/
  line-height: 248px;
  text-align: center;
  background: var(--primary);
  display: inline-block;
  color: #ffffff;
}
.chooseCase .chooseCaseTime .number {
  display: inline-block;
  color: var(--primary);
  background: #ffffff;
  border-radius: 50%;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  line-height: 44px !important;
  height: 44px;
  width: 44px;
  margin: 0 6px;
}
.chooseCase .flatCard {
  border-top: none;
}
</style>