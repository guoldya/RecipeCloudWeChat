<template>
   <div class="workdepart choosedepart">
      <Header post-title="医生排班"></Header>
      <div class=" margin50">
         <Search type="workdepart" post-placeholder="请输入医生，科室名称"></Search>
         <!--<input class="oc_val" type="text" id="inputVal" name="names" placeholder="搜索医生、科室"  v-model="value" @input="search(value)"/>-->
          <Apptab :tab-title="departs" v-on:childByValue="childByValue"></Apptab>
         <div v-if="departData.length!=0" v-show="!loadingtrue">
            <div class="flatCard" >
               <p class="xuanze">选择科室</p>
               <div>
                  <md-cell-item v-for="(item,index) in departData" arrow @click="intoworkdoctor(item)" :key="index" :title="item.orgName" />
               </div>
            </div>
            <p v-show="nomore" class="noMore">没有更多数据了</p>
         </div>

         <div v-show="!loadingtrue" class="nullDiv" v-else>
            <img src="@/assets/images/null1.png">
         </div>
         <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
                <span v-if="departData.length!=0&&!nomore">
                   <span class="mu-light-text-color">加载中</span>
                    <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                </span>
         </div>
         <Loading v-show="loadingtrue"></Loading>
      </div>
   </div>
</template>
<script type="text/babel">
    let bdHospitalOrg = '/app/bdHospitalOrg/read/selectClinicListByHospitalArea';
    let input_search_url = "/app/bdHospitalOrg/read/searchClinicListByClinicOrDoctor";
    export default {
        data() {
            return {
                value:'',
                yuanId: "",
                departs: [],
                departData: [],
                page:1,
                pageSize:10,
                loadingtrue:true,
                busy: true,
                nomore: false,
                debounces:null,
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
                this.nomore=true;
                this.yuanId = childValue.id;
                this.$store.commit('departFun', childValue.orgName);
                this.$store.commit('feeActiveFun', childValue.id);
                this.loadingtrue = true;
                this.page = 1;
                this.orgFun();
            },
            orgFun(flag) {
                let deptparams = {};
                deptparams.pageNumber = this.page;
                deptparams.pageSize = this.pageSize;
                deptparams.id = this.yuanId;
                //this.departData=[];
                this.$axios.put(bdHospitalOrg,deptparams).then((res) => {
                    if (res.data.rows) {
                        this.loadingtrue = false;
                        //this.departData=[];
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
   .workdepart .flatCard{
      margin-top: 0px;
      border-top: 1px solid #e9e9e9;
   }
</style>