<template>
   <div class="choosedepart">
      <Header post-title="医生排班" v-show="isWeixin"></Header>
      <div :class="{'outCarint':true,'margin45':isWeixin,'margin7':!isWeixin}">
         <Search></Search>
          <Apptab :tab-title="departs" v-on:childByValue="childByValue"></Apptab>
         <!--<div class="appTab">-->
            <!--<span v-for="(item, index) in departs" :key="'departs' + index" @click="switchTo(item,index)" :class="active1 === index ? 'appTabAcitive' : '' ">-->
              <!--{{item.orgName}}-->
            <!--</span>-->
         <!--</div>-->
         <div>
            <p class="xuanze">选择科室</p>
            <div v-if="departData.length!=0" v-show="!loadingtrue">
               <md-cell-item v-for="(item,index) in departData" arrow @click="intoworkdoctor(item)" :key="index" :title="item.orgName" />
               <p v-show="nomore" class="noMore">没有更多数据了</p>
            </div>
            <div v-show="!loadingtrue" class="nullDiv" v-else>
               <img src="@/assets/images/null1.png">
            </div>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="clearfix">
                <span v-if="departData.length!=0&&!nomore">
                    <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                </span>
            </div>
            <Loading v-show="loadingtrue"></Loading>
         </div>
      </div>
   </div>
</template>
<script type="text/babel">
    let bdHospitalOrg = '/app/bdHospitalOrg/read/selectClinicListByHospitalArea';
    export default {
        data() {
            return {
                isWeixin: false,
                active1: 0,
                yuanId: "",
                departs: [],
                num: 10,
                active2: 0,
                departData: [],
                page:1,
                pageSize:10,
                loadingtrue:true,
                busy: true,
                nomore: false,
            };
        },
        created() {
            if (this.$store.state.feeActiveId) {
                this.yuanId = this.$store.state.feeActiveId;
            }
        },
        watch: {
        },
        mounted() {
            document.title = '选择科室';
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.isWeixin = false;
            } else {
                this.isWeixin = true;
            };
            let _this = this;
            this.$axios.put(bdHospitalOrg, {
                orgId: localStorage.getItem("hospitalId") * 1
            }).then((res) => {
                if (res.data.code == '200') {
                    this.departs = res.data.rows;
                    for(let i=0;i<res.data.rows.length;i++){
                        this.departs[i].title = res.data.rows[i].orgName;
                    }
                    if(!this.yuanId){
                        this.yuanId = res.data.rows[0].id;
                    }
                    //this.$store.commit('departFun', res.data.rows[0].orgName);
                    this.orgFun();
                } else {
                    console.log(res.msg);
                }
            }).catch(function (err) {
                console.log(err);
            });


        },
        methods: {
            childByValue: function (childValue) {
                //this.active1 = index;
                this.yuanId = childValue.id;
                this.$store.commit('departFun', childValue.orgName);
                this.orgFun(this.yuanId);
                this.$store.commit('feeActiveFun', childValue.id);
                this.loadingtrue = true;
                this.page = 1;
            },
            orgFun(flag) {
                let deptparams = {};
                deptparams.pageNumber = this.page;
                deptparams.pageSize = this.pageSize;
                deptparams.id = this.yuanId;
                this.$axios.put(bdHospitalOrg,deptparams).then((res) => {
                    if (res.data.rows) {
                        this.loadingtrue = false;
                        this.departData=[];
                        if (flag) {
                            this.departData = this.departData.concat(res.data.rows);  //concat数组串联进行合并
                            if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
                                this.busy = false;
                                this.nomore = false;
                            } else {
                                this.busy = true;
                                this.nomore = true;
                            };
                        } else {
                            this.departData = res.data.rows;
                            this.busy = true;
                            if (res.data.total <= 10) {
                                this.busy = true;
                                this.nomore = true;
                            } else {
                                this.busy = false;
                                this.nomore = false;
                            }
                        }
                    } else {
                        this.departData = []
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            },
            loadMore() {
                this.busy = true;  //将无限滚动给禁用
                setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
                    this.page++;  //滚动之后加载第二页
                    this.orgFun(true);
                }, 500);
            },
            // switchTo(num, index) {
            //     this.active1 = index;
            //     this.yuanId = num.id;
            //     this.$store.commit('departFun', num.orgName);
            //     this.orgFun(this.yuanId)
            // },
            intoworkdoctor(data) {
                this.$router.push({
                    name: 'workdoctor',
                    query: {deptId: data.id, yuanId: this.yuanId, deptName: data.orgName}
                });
            },

        },
        computed: {

        },

    };
</script>
<style scoped>
@import "../choosedepart/choosedepart.css";
</style>