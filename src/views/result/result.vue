<template>
  <div class="result">
    <Header post-title="搜索"></Header>
    <div class="outCarint margin45">
      <div style="text-align:center;">
        <input v-model="value" placeholder="搜索医生、科室" class="oc_val" @input="loadMorelist(value)">
      </div>
      <div class="mu-sub-header margin14">科室</div>
      <md-cell-item v-if="departData.length!=0" v-for="(item2,index2) in departData" :title="item2.orgName" arrow @click="intodoctorList(item2)" :key="'AAA'+index2" />
      <div v-if="departData.length==0" class="margin7">
        <p>暂无科室信息</p>
      </div>
      <div class="mu-sub-header  margin14">医生</div>
      <md-cell-item v-if="doctorList.length!=0" v-for="(item,index) in doctorList" @click="intodoctorinfo(item)" :key="index+'aa'" :title="item.name" :brief="item.introduce" arrow>
        <span class="holder" slot="left"><img src="@/assets/images/user.png"></span>
      </md-cell-item>
      <div v-if="doctorList.length==0" class="margin7">
        <p>暂无医生信息</p>
      </div>
    </div>
  </div>
</template>
<script>
    let searchClinicListByClinicOrDoctor = "/app/bdHospitalOrg/read/searchClinicListByClinicOrDoctor";
    export default {
        data() {
            return {
                value: '',

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
                searchType:'',
            }
        },
        mounted() {
            document.title = '搜索';
            this.searchType=this.$store.state.searchType;
        },
        methods: {
            intodoctordetail() {
                let argu = {};
                if(this.searchType=="workdepart"){
                    this.$router.push({
                        name: 'workdoctor',
                        query: argu
                    });
                    return;
                }
                this.$router.push({
                    name: 'doctordetail',
                    query: argu
                });
            },
            intodoctorList(data) {
                let argu={};
                if(this.searchType=="workdepart"){
                    this.$router.push({
                        name: 'workdoctor',
                        query: argu
                    });
                    return;
                }
                this.$router.push({
                    name: 'doctorList',
                    query: { deptId: data.id, yuanId: data.parentId, departName: data.orgName }
                });
            },
            intodoctorinfo(data) {
                let argu={};
                if(this.searchType=="workdepart"){
                    this.$router.push({
                        name: 'doctorschedu',
                        query: argu
                    });
                    return;
                }
                this.$router.push({
                    name: 'doctordetail',
                    query: { doctorId: data.id, islist: 1 }
                });
            },
            loadMorelist(value) {
                this.doctorList = [];
                this.departData = [];
                if (!value) return;
                value = value.trim() // 清除空格
                if (!value) return;
                console.log("搜索数据", value, value.length);
                let _this = this;
                // console.log("搜索数据", value);
                clearTimeout(this.t);
                this.t = setTimeout(function () {
                    _this.$axios.put(searchClinicListByClinicOrDoctor, {
                        name: value,
                        orgId: _this.$store.state.feeActiveId,
                    }).then(function (res) {
                        if (res.data.code == '200') {
                            _this.doctorList = res.data.data.doctorList;
                            _this.departData = res.data.data.orgList;
                        } else {
                        }
                    }).catch(function (err) {
                    })
                })
            }
        }
    }
</script>

<style scoped>
  @import url("./result.css");
</style>

