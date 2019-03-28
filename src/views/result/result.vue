<template>
    <div class="result">
        <Header post-title="搜索"></Header>
        <div class="outCarint margin45">
            <div style="text-align:center;">
                <input v-model="value" placeholder="搜索医生、科室" autofocus="autofocus" class="oc_val" @input="loadMorelist(value)">
            </div>

            <div class="line"></div>
            <div class="resulthistory" v-show="isResult">
                <div class="history">
                    <div class="container fl">
                        <span class="lf">搜索历史</span>
                        <span class="clear rt" @click="clear()">
                            <md-icon name="delete" @click="clearT(index)"></md-icon>
                        </span>
                    </div>
                </div>
                <div>
                    <ul class="emp" v-if="HistoryList.length!=0">
                        <li class="history" v-for="(item,index) in HistoryList" :key="index">
                            <span class="hj" @click="resultT(item)">{{item}}</span>
                            <span class="delete">
                                <md-icon name="close" @click="clearT(index)"></md-icon>
                            </span>
                        </li>
                    </ul>
                    <p v-else>
                        暂无
                    </p>
                </div>
            </div>
            <div v-show="!isResult">
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
    </div>
</template>
<script>
let searchClinicListByClinicOrDoctor = "/app/bdHospitalOrg/read/searchClinicListByClinicOrDoctor";
export default {
    data() {
        return {
            value: '',
            HistoryList: [],
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
            searchType: '',
            isResult: true,
        }
    },
    mounted() {
        document.title = '搜索';
        var aa = window.localStorage;
        if (aa.getItem("HistoryList") != null && aa.getItem("HistoryList") != undefined) {
            var json = aa.getItem("HistoryList");
            this.HistoryList = JSON.parse(json);
        };
        this.searchType = this.$store.state.searchType;
        document.getElementsByClassName("oc_val")[0].focus();
    },
    methods: {
        resultT: function (value) {
            this.loadMorelist(value);
        },
        clearT: function (value) {
            this.HistoryList.splice(value, 1);
            localStorage.setItem('HistoryList', JSON.stringify(this.HistoryList));
        },
        clear: function () {
            this.HistoryList = [],
                localStorage.setItem('HistoryList', JSON.stringify(this.HistoryList));
        },
  
        intodoctorList(data) {
            let argu = { deptName: data.orgName, deptId: data.id, yuanId: data.parentId };
            if (this.searchType == "workdepart") {
                this.$router.push({
                    name: 'workdoctor',
                    query: argu
                });
                return;
            }
            this.$router.push({
                name: 'doctorList',
                query: argu
            });

            if (this.HistoryList.length > 0) { // 有数据的话 判断
                if (this.HistoryList.indexOf(data.orgName) !== -1) { // 有相同的，先删除 再添加 
                    this.HistoryList.splice(this.HistoryList.indexOf(data.orgName), 1)
                    this.HistoryList.unshift(data.orgName);
                } else { // 没有相同的 添加
                    this.HistoryList.unshift(data.orgName);
                }
            } else { // 没有数据 添加
                this.HistoryList.unshift(data.orgName);
            }
            if (this.HistoryList.length > 6) { // 保留六个值
                this.HistoryList.pop();
            }

            localStorage.setItem('HistoryList', JSON.stringify(this.HistoryList));

        },
        intodoctorinfo(data) {
            let argu = { doctorId: data.id };
            if (this.searchType == "workdepart") {
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

            if (this.HistoryList.length > 0) { // 有数据的话 判断
                if (this.HistoryList.indexOf(data.name) !== -1) { // 有相同的，先删除 再添加 
                    this.HistoryList.splice(this.HistoryList.indexOf(data.name), 1)
                    this.HistoryList.unshift(data.name);
                } else { // 没有相同的 添加
                    this.HistoryList.unshift(data.name);
                }
            } else { // 没有数据 添加
                this.HistoryList.unshift(data.name);
            }
            if (this.HistoryList.length > 6) { // 保留六个值
                this.HistoryList.pop();
            }

            localStorage.setItem('HistoryList', JSON.stringify(this.HistoryList));
        },
        loadMorelist(value) {
            this.isResult = false;


            this.doctorList = [];
            this.departData = [];
            if (!value) {
                this.isResult = true;
                return;
            }
            value = value.trim() // 清除空格
            if (!value) {
                this.isResult = true;
                return;
            }
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
    },
    watch: {
        "$route": function (to, from) {
            from.meta.keepAlive = false;
            to.meta.keepAlive = false;
        }
    },
}
</script>

<style scoped>
@import url("./result.css");
</style>

