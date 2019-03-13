<template>
  <div class="result-doctor">
    <Header post-title="搜索" v-show="isWeixin"></Header>
    <div :class="{'outCarint':true,'margin45':isWeixin,'margin7':!isWeixin}">
      <div style="text-align:center;">
        <input v-model="value" placeholder="搜索医生、科室" class="oc_val" @input="loadMorelist(value)">
      </div>
      <!-- <div class="mu-sub-header margin16">科室</div>
      <doctorItem v-for="(item,index) in departData" :key="index"></doctorItem>
      <div v-if="departData.length==0">
        <p>暂无科室信息</p>
      </div> -->
      <div class="mu-sub-header margin16">医生</div>
      <doctorItem v-for="(item,index) in doctorList" :key="index"></doctorItem>
      <div v-if="doctorList.length==0">
        <p>暂无医生信息</p>
      </div>
    </div>
  </div>
</template>
<script>
import doctorItem from "../../components/doctorList";

let searchClinicListByClinicOrDoctor = "/app/bdHospitalOrg/read/searchClinicListByClinicOrDoctor";
export default {
  data() {
    return {
      value: '',
      isWeixin: true,
      // departData: [],
      doctorList: [],
      timer:null
    }
  },
  components:{
    doctorItem
  },
  mounted() {
    // var ua = window.navigator.userAgent.toLowerCase();
    // if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    //   this.isWeixin = false;
    //   return true;
    // } else {
    //   this.isWeixin = true;
    //   return false;
    // }
  },
  methods: {
    intodoctordetail() {
      let argu = {}
      this.$router.push({
        name: 'doctordetail',
        query: argu
      });
    },
    intodoctorList(data) {
      this.$router.push({
        name: 'doctorList',
        query: { deptId: data.id, yuanId: data.parentId, departName: data.orgName }
      });
    },

    intodoctorinfo(data) {
      this.$router.push({
        name: 'doctordetail',
        query: { doctorId: data.id, islist: 1 }
      });
    },
    loadMorelist(value) {
      let _self = this
      value = value.trim() // 清除空格
      if (!value) return;
      clearTimeout(_self.timer);
      _self.timer = setTimeout(() => {
        _self.$axios.put(searchClinicListByClinicOrDoctor, {
          name: value
        }).then(function (res) {
          if (res.data.code == 200) {
            _self.doctorList = res.data.data.doctorList;
            // this.departData = res.data.data.orgList;
          } 
        }).catch(function (err) {
           console.error(err)
        });
      }, 300);
    },


  }
}
</script>

<style scoped>
@import url("./result.css");
</style>

