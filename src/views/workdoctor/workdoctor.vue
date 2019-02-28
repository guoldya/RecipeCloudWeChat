<template>
  <div class="workdoctor">
    <Header :post-title="postTitle" v-show="isWeixin"></Header>
    <div :class="{'outCarint':false,'margin45':isWeixin,'margin7':!isWeixin}">
      <div class="doctorList">
        <ul v-show="!loadingtrue" v-if="doctorData.length!=0">
          <li v-for="(item,i) in doctorData" :key="i" class="outCarint">
            <div class="card" @click="intodoctordetail(item,2)">
              <div class="cardText">
                <div class="headimg">
                  <img src=" https://kano.guahao.cn/iqw2633790_image140.jpg" alt="医生头像">
                </div>
                <div>
                  <p class="headname">{{item.name}}
                    <span class="levle">{{item.title}}</span>
                    <!--<span v-if="item.valNum!=0" class="have">余{{item.valNum}}</span>-->
                    <!--<span v-if="item.valNum==0" class="have no">余{{item.valNum}}</span>-->
                  </p>
                  <p class="headdesc">擅长:{{item.introduce}}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div v-show="!loadingtrue" class="nullDiv" v-else>
          <img src="@/assets/images/null1.png">
        </div>
        <Loading v-show="loadingtrue"></Loading>
      </div>
    </div>
  </div>
</template>
<script>
    let doctor_url="/app/bdHospitalDoctor/read/selectDoctorList";
    let doctor_query_url="/app/bdHospitalOrg/read/searchClinicListByClinicOrDoctor";
    export default {
        data() {
            return {
                active: 0,
                value: '',
                isSeemore: false,
                choosedate: '',
                isWeixin: false,
                time: [],
                dayWeek: ["日", "一", "二", "三", "四", "五", "六"],
                postTitle:'',
                deptId:'',
                loadingtrue: true,
                doctorData:[],
            }
        },
        mounted() {
          this.postTitle=this.$route.query.deptName;
          this.deptId=parseInt(this.$route.query.deptId);
          console.log(this.$route.query);
            document.title = '医生排班';
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.isWeixin = false;
            } else {
                this.isWeixin = true;
            };
            var today = new Date();
            this.choosedate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
            this.getData();
            this.addWeek();
            this.workDoctorFun();

        },
        methods: {
            choose(value, index) {
                this.active = index;
                this.choosedate = value.year + '-' + value.month + '-' + value.date;
            },
            getData() {
                for (let i = 0; i < 30; i++) {
                    let nowTime = new Date();
                    let d = nowTime.setDate(nowTime.getDate() + i - 1);
                    let data = this.addDate(d, 1);
                    let time = {};
                    time = { date: data.newData, month: data.newMonth, year: data.newYear }
                    this.time.push(time);
                }
            },
            addWeek() {
                var today = new Date();
                var dayWeeka = this.dayWeek.slice(0, today.getDay());
                var dayWeekb = this.dayWeek.slice(today.getDay(), 7);
                this.dayWeek = dayWeekb.concat(dayWeeka);
            },
            addDate(val, days) {
                var d = new Date(val);
                var data = {};
                let dayArr = ["日", "一", "二", "三", "四", "五", "六"];
                d.setDate(d.getDate() + days);
                var m = d.getMonth() + 1;
                var y = d.getFullYear();
                var newDay = dayArr.slice(0, d.getDay());
                data.newData = d.getDate();
                data.newDay = newDay;
                data.newMonth = d.getMonth() + 1;
                data.newYear = d.getFullYear();
                return data;
            },
            intodoctordetail() {
                let argu = {}
                this.$router.push({
                    name: 'doctorschedu',
                    query: argu
                });
            },
            workDoctorFun(){
                this.$axios.put(doctor_url, { orgId: this.deptId }).then((res) => {
                    if (res.data.code == '200') {
                        this.loadingtrue=false;
                        for(let i=0;i<res.data.data.amList.length;i++){
                            this.doctorData.push(res.data.data.amList[i])
                        }
                        for(let i=0;i<res.data.data.otherList.length;i++){
                            this.doctorData.push(res.data.data.otherList[i])
                        }
                        for(let i=0;i<res.data.data.pmList.length;i++){
                            this.doctorData.push(res.data.data.pmList[i])
                        }
                        console.log(this.doctorData);
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            },


        }
    }
</script>

<style scoped>

</style>

