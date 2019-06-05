<template>

   <div class="margin50">
      <Navigation type="title" title="住院费用"></Navigation>
      <div v-if="waitPayData.length!=0" v-show="!loadingtrue">
         <div class="flatCard" v-for="(item,i) in waitPayData" :key="i" @click="hospitalinfo(item)">
            <div class="appTitle">
               <span>第
                  <span class="mu-secondary-text-color">{{waitPayData.length-i}}</span> 次住院</span>
            </div>
            <div class="cardText">
               <p class="parElem listData">
                  <span class="sonElem">患者姓名</span>
                  <span>{{item.inTime|lasttime}}</span>
               </p>
               <p class="parElem listData">
                  <span class="sonElem">住院号</span>
                  <span>{{item.outTime|lasttime}}</span>
               </p>
               <p class="parElem listData">
                  <span class="sonElem">住院科室</span>
                  <span>{{item.dept}}</span>
               </p>
               <p class="parElem listData">
                  <span class="sonElem">住院费用</span>
                  <span>{{item.money|keepTwoNum}} 元</span>
               </p>
            </div>
         </div>
         <p v-show="nomore" class="noMore">没有更多数据了</p>
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
let appbizIhRecordreadselectIhRecordPriceList = "/app/bizIhRecord/read/selectIhRecordPriceList";
export default {
   data() {
      return {
         waitPayData: [],
         page: 1,
         pageSize: 10,
         busy: true,
         nomore: false,
         loadingtrue: true,
      };
   },
   mounted() {
      this.WaitPay(false);
   },
   methods: {
      WaitPay(flag) {
         const params = {};
         params.pageNumber = this.page;
         params.pageSize = this.pageSize;
         // params.type = 1;
          params.cardNo = JSON.parse(sessionStorage.getItem('objInfo')).cardNo;
         this.$axios.put(appbizIhRecordreadselectIhRecordPriceList, params).then((res) => {
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

      tijiao() {
         this.$router.push({
            name: 'payfeerecord',
         });
      },

      hospitalinfo: function (val) {
         this.$router.push({
            name: 'hospitalinfo',
            query: { id: val.id }
         });
      },


   },


}
</script>

<style>
</style>
