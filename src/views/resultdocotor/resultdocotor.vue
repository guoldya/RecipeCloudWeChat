<template>
   <div class="result">
      <Header post-title="搜索医生" v-show="isWeixin"></Header>
      <div :class="{'outCarint':true,'margin45':isWeixin,'margin7':!isWeixin}">
         <div style="text-align:center;">
            <input v-model="value" placeholder="搜索医生" class="oc_val" @input="loadMorelist(value)">
         </div>

         <div class="mu-sub-header margin16">医生</div>
         <md-cell-item v-for="(item,index) in dotorList" :key="index+'aa'" :title="item.name" :brief="item.good" arrow>
            <span class="holder" slot="left"><img src="@/assets/images/user.png"></span>
         </md-cell-item>
         <div v-if="dotorList.length==0">
            <p>暂无医生信息</p>
         </div>
      </div>
   </div>
</template>
<script>
let selectDoctorList = "/biz/app/bdHospitalDoctor/read/selectDoctorList";
export default {
   data() {
      return {
         value: '',
         isWeixin: false,
         dotorList: [
            { name: "冉有钱", good: "擅长：急性呼吸窘迫综合征、 呼吸衰竭的救治" },
            { name: "唐浩瀚", good: "擅长：急性呼吸窘迫综合征、重症感染及呼吸衰竭的救治" },
            { name: "安未", good: "擅长：急性呼吸窘迫综合征、重症感染及呼吸衰竭的救治" },
            { name: "吴政阳", good: "擅长：急性呼吸窘迫综合征、重症感染 " },
         ],
      }
   },
   mounted() {
      document.title = '搜索医生';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
         return true;
      } else {
         this.isWeixin = true;
         return false;
      }
   },
   methods: {
      intodoctordetail() {
         let argu = {}
         this.$router.push({
            name: 'doctordetail',
            query: argu
         });
      },
      intodoctorList(title) {
         let argu = { title: title }
         this.$router.push({
            name: 'doctorList',
            query: argu
         });
      },
      loadMorelist(value) {
         let _this = this;
         if (!value) return;
         value = value.trim() // 清除空格
         console.log("搜索数据", value);
         clearTimeout(this.t);
         this.t = setTimeout(function () {
            _this.$axios.put(selectDoctorList, {
               name: value,
               orgIdVO: _this.$route.query.orgIdVO * 1,
               orgIdVO: this.orgIdVO * 1,
               totalNum: _this.$route.query.totalNum ? 1 : undefined,
               time: _this.$route.query.isTime,
            }).then(function (res) {
               if (res.data.code == '200') {
                  _this.dotorList = res.data.rows;
               } else {
                  if (value) {
                     _this.AAA = false;
                  } else {
                     _this.AAA = true;
                  }
                  _this.list = res.data.rows;
               }
            }).catch(function (err) {

            });
         }, 300);
      },

   }
}
</script>

<style scoped>
@import url("../result/result.css");
</style>

