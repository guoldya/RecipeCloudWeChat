<template>
  <div class="workdoctor">
    <Header :post-title="postTitle"  ></Header>
    <div class=" margin45">
      <div class="doctorList">
        <ul v-show="!loadingtrue" v-if="doctorData.length!=0">
          <li v-for="(item,i) in doctorData" :key="i" class="outCarint">
            <div class="card" @click="intodoctorschedu(item.id)">
              <div class="cardText">
                <div class="headimg">
                  <img src=" https://kano.guahao.cn/iqw2633790_image140.jpg" alt="医生头像">
                </div>
                <div>
                  <p class="headname">
                    <span>{{item.name}}</span>
                    <span class="levle">{{item.title}}</span>
                  </p>
                  <p class="headdesc" v-if="item.skill">擅长：{{item.skill}}</p>
                </div>
              </div>
            </div>
          </li>
          <p v-show="nomore" class="noMore">没有更多数据了</p>
        </ul>
        <div v-show="!loadingtrue" class="nullDiv" v-else>
          <img src="@/assets/images/null1.png">
        </div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="clearfix">
                <span v-if="doctorData.length!=0&&!nomore">
                    <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                </span>
        </div>
        <Loading v-show="loadingtrue"></Loading>
      </div>
    </div>
  </div>
</template>
<script>
    let doctor_url="/app/bdHospitalDoctor/read/selectDoctorPage";
    let doctor_query_url="/app/bdHospitalOrg/read/searchClinicListByClinicOrDoctor";
    export default {
        data() {
            return {
                active: 0,
                value: '',
                isSeemore: false,
                choosedate: '',
                busy: true,
                nomore: false,
                time: [],
                dayWeek: ["日", "一", "二", "三", "四", "五", "六"],
                postTitle:'',
                deptId:'',
                loadingtrue: true,
                doctorData:[],
                page: 1,
                pageSize: 10,
            }
        },
        mounted() {
          this.postTitle=this.$route.query.deptName;
          this.deptId=parseInt(this.$route.query.deptId);
            document.title = '医生排班';
            var today = new Date();
            this.choosedate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
            this.getData();
            this.addWeek();
            this.workDoctorFun(false);

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
            intodoctorschedu(val) {
                let argu = {doctorId:val};
                this.$router.push({
                    name: 'doctorschedu',
                    query: argu
                });
            },
            workDoctorFun(flag){
                let doctorPar={};
                doctorPar.pageNumber = this.page;
                doctorPar.pageSize = this.pageSize;
                doctorPar.orgId = this.deptId;
                this.$axios.put(doctor_url, doctorPar).then((res) => {
                    if (res.data.rows) {
                        this.loadingtrue = false;
                        if (flag) {
                            this.doctorData = this.doctorData.concat(res.data.rows);  //concat数组串联进行合并
                            if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
                                this.busy = false;
                                this.nomore = false;
                            } else {
                                this.busy = true;
                                this.nomore = true;
                            };
                        } else {
                            this.doctorData = res.data.rows;
                            this.busy = true;
                            if (res.data.total < 10) {
                                this.busy = true;
                                this.nomore = true;
                            } else {
                                this.busy = false;
                                this.nomore = false;
                            }
                        }
                    } else {
                        this.doctorData = []
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            },
            loadMore() {
                this.busy = true;  //将无限滚动给禁用
                setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
                    this.page++;  //滚动之后加载第二页
                    this.getGoodslist(true);
                }, 500);
            },
        },
        beforeRouteLeave(to, from, next) {
            if (to.path == "/result") {
                to.meta.keepAlive = true;
                //this.$destroy();
            } else {
                to.meta.keepAlive = false;
                //this.$destroy();
            }
            next();
        },
    }
</script>

<style scoped>

</style>

