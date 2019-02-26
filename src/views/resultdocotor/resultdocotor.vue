<template>
   <div class="result">
      <Header post-title="搜索医生" v-show="isWeixin"></Header>
      <div :class="{'outCarint':true,'margin45':isWeixin,'margin7':!isWeixin}">
         <div style="text-align:center;">
            <input v-model="value" placeholder="搜索医生" class="oc_val" @input="loadMorelist(value)">
         </div>
         <div class="mu-sub-header margin16">医生</div>
         <md-cell-item v-for="(item,index) in doctorList" :key="index+'aa'" @click="intodoctorinfo(item)" :title="item.name" :brief="item.introduce" arrow>
            <span class="holder" slot="left"><img src="@/assets/images/user.png"></span>
         </md-cell-item>
         <div v-if="doctorList.length==0">
            <p>暂无医生信息</p>
         </div>
      </div>
   </div>
</template>
<script>
let selectDoctorList = "/app/bdHospitalDoctor/read/selectDoctorPage";
export default {
   data() {
      return {
         value: '',
         isWeixin: false,
         doctorList: [],
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

      intodoctorinfo(data) {
         this.$router.push({
            name: 'doctordetail',
            query: { doctorId: data.id, islist: 1 }
         });
      },
      // loadMorelist(value) {
      //    let _this = this;
      //    if (!value) return;
      //    value = value.trim() // 清除空格
      //    console.log("搜索数据", value);
      //    clearTimeout(this.t);
      //    this.t = setTimeout(function () {
      //       _this.$axios.put(selectDoctorList, {
      //          name: value,
      //          // orgIdVO: _this.$route.query.orgIdVO * 1,
      //          // orgIdVO: this.orgIdVO * 1,
      //          // totalNum: _this.$route.query.totalNum ? 1 : undefined,
      //          // time: _this.$route.query.isTime,
      //       }).then(function (res) {
      //          if (res.data.code == '200') {
      //             _this.doctorList = res.data.rows;
      //          } else {
      //             if (value) {
      //                _this.AAA = false;
      //             } else {
      //                _this.AAA = true;
      //             }
      //             _this.list = res.data.rows;
      //          }
      //       }).catch(function (err) {

      //       });
      //    }, 300);
      // },


      loadMorelist(value) {
         if (!value) return;
         value = value.trim() // 清除空格
         let _this = this;
         console.log("搜索数据", value);
         clearTimeout(this.t);
         this.t = setTimeout(function () {
            _this.$axios.put(selectDoctorList, {
               keyword: value
            }).then(function (res) {
               console.log("状态", res.data.code);

               if (res.data.code == '200') {
                  console.log("状态", res.data.rows);
                  _this.doctorList = res.data.rows;

               } else {
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

