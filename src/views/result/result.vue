<template>
  <div class="result">
    <Header post-title="搜索" v-show="isWeixin"></Header>
    <div :class="{'outCarint':true,'margin45':isWeixin,'margin7':!isWeixin}">
      <div style="text-align:center;">
        <input v-model="value" placeholder="搜索医生、科室" class="oc_val" @input="loadMorelist(value)">
      </div>
      <div class="mu-sub-header margin16">科室</div>
      <md-cell-item v-if="departData.length!=0" v-for="(item2,index2) in departData" :title="item2.orgName" arrow @click="intodoctorList(item2)" :key="'AAA'+index2" />
      <div v-if="departData.length==0">
        <p>暂无科室信息</p>
      </div>
      <div class="mu-sub-header margin16">医生</div>
      <md-cell-item v-if="doctorList.length!=0" v-for="(item,index) in doctorList" :key="index+'aa'" :title="item.name" :brief="item.introduce" arrow>
        <span class="holder" slot="left"><img src="@/assets/images/user.png"></span>
      </md-cell-item>
      <div v-if="doctorList.length==0">
        <p>暂无医生信息</p>
      </div>
    </div>
  </div>
</template>
<script>
let searchClinicListByClinicOrDoctor = "/biz/app/bdHospitalOrg/read/searchClinicListByClinicOrDoctor";
export default {
  data() {
    return {
      value: '',
      isWeixin: false,
      departData: [
        // { name: "妇科门诊" },
        // { name: "生殖内分泌门诊生殖内分泌" },
        // { name: "儿科" },
        // { name: "放射科" },
      ],
      doctorList: [
        // { name: "冉有钱", good: "擅长：急性呼吸窘迫综合征、 呼吸衰竭的救治" },
        // { name: "唐浩瀚", good: "擅长：急性呼吸窘迫综合征、重症感染及呼吸衰竭的救治" },
        // { name: "安未", good: "擅长：急性呼吸窘迫综合征、重症感染及呼吸衰竭的救治" },
        // { name: "吴政阳", good: "擅长：急性呼吸窘迫综合征、重症感染 " },
      ],
    }
  },
  mounted() {
    document.title = '搜索';
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
    intodoctorList(data) {
      console.log(data)
      this.$router.push({
        name: 'doctorList',
        query: { deptId: data.id, yuanId: data.parentId, departName: data.orgName }
      });
    },
    loadMorelist(value) {
      if (!value) return;
      value = value.trim() // 清除空格
      let _this = this;
      console.log("搜索数据", value);
      clearTimeout(this.t);
      this.t = setTimeout(function () {
        _this.$axios.put(searchClinicListByClinicOrDoctor, {
          name: value
        }).then(function (res) {
          console.log("状态", res.data.code, res.data.data);
          if (res.data.code == '200') {
            _this.doctorList = res.data.data.doctorList;
            _this.departData = res.data.data.orgList;
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
@import url("./result.css");
</style>

