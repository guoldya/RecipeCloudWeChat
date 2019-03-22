<template>
  <div class="result-doctor">
    <Header post-title="搜索"  ></Header>
    <div class="outCarint margin45">
      <div style="text-align:center;">
        <input v-model="value" placeholder="搜索医生、科室" class="oc_val" @input="loadMorelist(value)">
      </div>
      <!-- <div class="mu-sub-header margin16">科室</div>
      <doctorItem v-for="(item,index) in departData" :key="index"></doctorItem>
      <div v-if="departData.length==0">
        <p>暂无科室信息</p>
      </div> -->
      <div class="mu-sub-header margin16">医生</div>
      <doctorItem v-for="(item,index) in doctorList" :key="index" :datas="item"></doctorItem>
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
      // departData: [],
      doctorList: [],
      timer:null
    }
  },
  components:{
    doctorItem
  },
  mounted() {
     
  },
  methods: {
    loadMorelist(value) {
      let _self = this
      value = value.trim() // 清除空格
      if (!value) return;
      clearTimeout(_self.timer);
      _self.timer = setTimeout(() => {
        _self.$axios.put(searchClinicListByClinicOrDoctor, {
          name: value,
          orgType:3
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

