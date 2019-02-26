<template>
   <div :class="{'outCarint':true,'margin45':isWeixin}" class="registrecord">
      <Header post-title="挂号记录" v-show="isWeixin"></Header>
      <div :class="{margin45:isWeixin,outCarint:true}">
         <div v-if="cordData.length!=0" v-show="!loadingtrue">
               <div class="card margin16" v-for="(item,i) in cordData" :key="i">
                  <p class="appTitle">
                     <span>{{item.patientName}}</span>
                     <span class="mu-secondary-text-color">{{item.payType | payTypeFilter}}</span>
                  </p>
                  <div class="cordText">
                     <p>科室：{{item.deptName}}</p>
                     <p>医生：{{item.hospital}}</p>
                     <p>预约时间：{{item.createTime}}</p>
                     <!--<p>就诊时间：2019-12-05 12:30:00</p>-->
                  </div>
                  <div class="cardTextRight" @click="cordInfo(item.id,item.payType)">
                     <span>详情</span>
                     <img class="icon_more" src="@/assets/images/icon_more.png" alt="">
                  </div>
               </div>
            <p v-show="nomore" class="noMore">没有更多数据了</p>
         </div>
         <div v-show="!loadingtrue" class="nullDiv" v-else>
            <img src="@/assets/images/null1.png">
         </div>
         <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="clearfix">
                <span v-if="cordData.length!=0&&!nomore">
                    <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                </span>
         </div>
         <Loading v-show="loadingtrue"></Loading>
      </div>

   </div>
</template>
<script type="text/babel">
   let read_page_url="/biz/app/bizPatientRegister/read/page";
export default {
   data() {
      return {
         isWeixin: false,
         page:1,
          pageSize:10,
          loadingtrue:true,
          cordData:[],
          busy: true,
          nomore: false,
      };
   },
   created() {

   },
   mounted() {
      document.title = '挂号记录';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
      } else {
         this.isWeixin = true;
      }
      this.cordFun(false);
   },
   methods: {
       cordFun(flag) {
           const params = {};
           params.pageNumber = this.page;
           params.pageSize = this.pageSize;
           this.$axios.put(read_page_url, params).then((res) => {
               if (res.data.rows) {
                   this.loadingtrue = false;
                   if (flag) {
                       this.cordData = this.cordData.concat(res.data.rows);  //concat数组串联进行合并
                       if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
                           this.busy = false;
                           this.nomore = false;
                       } else {
                           this.busy = true;
                           this.nomore = true;
                       };
                   } else {
                       this.cordData = res.data.rows;
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
                   this.cordData = []
               }
           })
       },
       loadMore() {
           this.busy = true;  //将无限滚动给禁用
           setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
               this.page++;  //滚动之后加载第二页
               this.cordFun(true);
           }, 500);
       },
       cordInfo(val,type){
           this.$store.commit('payTypeFun', type);
           this.$router.push({
               name: 'registrecorddetail',
               query: {id:val}
           });
       }
   },
   computed: {

   },

};
</script>
 <style scoped>
    .registrecord .cordText{
       padding-top: 10px;
    }
    .registrecord .cordText p{
       line-height: 60px;
    }
    .registrecord .cardTextRight{
       text-align: right;
       padding-bottom: 20px;
    }
    .registrecord .cardTextRight img{
       width: 12px;
       position: relative;
       top: 2px;
       margin-left: 10px;
    }
</style>