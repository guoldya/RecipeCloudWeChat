<template>
   <div class="registrecorddetail">
      <Navigation type="title" title="我的住院"></Navigation>
      <div class="margin55">
         <div v-if="cordInfoData&&cordInfoData.length!=0" v-show="!loadingtrue">
            <div class="flatCard outCarint " v-for="(item,i) in cordInfoData" :key="i" v-show="!loadingtrue">
               <md-field>
                  <md-detail-item title="当前就诊人" :content=item.name></md-detail-item>
                  <md-detail-item title="住院号" :content=item.ihNo> </md-detail-item>
                  <md-detail-item title="科室" :content=item.dept></md-detail-item>
                  <md-detail-item title="床号" :content=item.bedNo></md-detail-item>
                  <md-detail-item title="住院次数">
                     <span>{{item.recordCount}} 次</span>
                  </md-detail-item>
                  <md-detail-item title="住院天数" :content=item.recordDaysCount></md-detail-item>
                  <md-detail-item title="住院日期">
                     {{item.inTime|lasttime}}
                  </md-detail-item>
               </md-field>
            </div>
            <div class="flatCard">
               <div class="outCarintcontent">
                  <div class="flatCard outCarint" v-for="(item,i) in cordInfoData" :key="i" v-show="!loadingtrue">
                     <md-field>
                        <md-detail-item title="预交款总额">
                           <span class="mu-secondary-text-color">￥{{item.totalMonty|keepTwoNum}}元</span>
                        </md-detail-item>
                        <md-detail-item title="未结总费用">
                           <span class="mu-secondary-text-color">￥{{item.notPayMoney|keepTwoNum}}元</span>
                        </md-detail-item>
                        <md-detail-item title="剩余款">
                           <span class="mu-secondary-text-color">￥{{item.recordMoney|keepTwoNum}}元</span>
                        </md-detail-item>
                     </md-field>
                  </div>
               </div>
            </div>

            <div class="flatCard">
               <div class="outCarintcontent">
                  <div class="flatCard">
                     <md-field>
                        <md-cell-item title="一日清单" arrow @click="dayof" />
                        <md-cell-item title="预交款缴纳" arrow @click="paymeet" />
                     </md-field>
                  </div>
               </div>
            </div>
         </div>
         <div v-show="!loadingtrue" class="nullDiv" v-else>
            <img src="@/assets/images/null1.png">
         </div>
         <Loading v-show="loadingtrue"></Loading>
      </div>
   </div>

</template>

<script>
let cord_info_url = "/bizIhRecord/read/detail";
export default {
   data() {
      return {
         cordInfoData: [],
         loadingtrue: true,
         id: '',
      };
   },
   mounted() {
      this.cordInfo();
   },

   methods: {
      cordInfo() {
         this.$axios.put(cord_info_url, { id: parseInt(this.$route.query.id), status: 2 }, {
         }).then(res => {
            if (res.data.code == '200') {
               this.loadingtrue = false;
               if (res.data.data) {
                  this.cordInfoData.push(res.data.data);
               } else {
                  this.cordInfoData = []
               }

               this.id = res.data.data.id
            }
         }).catch(function (err) {
            console.log(err);
         });
      },
      dayof() {
         this.$router.push({
            name: 'dayof',
            query: { id: parseInt(this.$route.query.id) }
         });
      },

      paymeet: function (val) {
         this.$router.push({
            name: 'paymeet',
            query: { id: this.id, isMyhospital: 1 }
         });
      },


   },
}
</script>

<style>
</style>
