<template>
  <div class="chooseCase">
    <Header post-title="选择复印病案"></Header>
    <div class="margin55" style="margin-bottom:70px">
      <div class="tabAdiv flatCard" v-for="(item,i) in copyResultData" v-if="copyResultData.length!=0" v-show="!loadingtrue"><!-- -->
        <!--<div class="chooseCaseBtn">-->
          <!--<div class="md-agree" @click="onChange()">-->
            <!--<div :class="{ 'md-agree-icon':true,'checked':true}">-->
              <!--<div class="md-agree-icon-container">-->
                <!--<i class="md-icon icon-font md-icon-checked lg"></i>-->
                <!--<i class="md-icon icon-font md-icon-check lg"></i>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <div class="listData mu-secondary-text-color" @click="getJumpId(item.id)">
          <md-check-group v-model="favorites" :check="checkedFun(favorites)">
            <md-check :name=i.toString()  class="lg"/>
            <span style="margin-left: 4px">{{item.recipeDate | time}}</span>
          </md-check-group>
          <span>{{item.code}}</span>
        </div>
        <div class="chooseCaseText">
          <p>住院科室：</p>
          <p>出院诊断： </p>
          <p>如愿日期：217-12-12 12:22</p>
          <p>出院日期：217-12-12 12:22</p>
        </div>
        <div class="chooseCaseTime">
          <span>第<span class="number">1</span>次 </span>
          <!--第-->
          <!--<div class="number">1</div>-->
          <!--次-->
        </div>
          <p class="addbTN">确认提交</p>
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
let copyApply_page_url="/app/bizCopyApply/read/page";

export default {
  data() {
    return {
        favorites:[],
        busy: true,
        nomore: false,
        loadingtrue: true,
        page: 1,
        pageSize: 10,
        copyResultData:[],
      agreeConf: {
        checked: true,
        name: 'agree0',
        size: 'md',
        disabled: false,
        introduction: '选中状态',
      },


    };
  },
  created() {



  },
  watch: {

  },
  mounted() {
    this.addadress();
  },
  methods: {
      addadress(flag) {
        const params = {};
        params.pageNumber = this.page;
        params.pageSize = this.pageSize;
        this.$axios.put(copyApply_page_url,params).then(res => {
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
      checkedFun: function (val) {

      },
      getJumpId(val) {

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
}
.chooseCase .chooseCaseBtn {
  width: 15%;
  height: 200px;
  text-align: center;
  display: inline-block;
  color: #ffffff;
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
  width: 25%;
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
   .chooseCase .flatCard{
     border-top: none;
   }
</style>