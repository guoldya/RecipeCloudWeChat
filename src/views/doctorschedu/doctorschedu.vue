<template>
    <div class="doctorschedu">
        <Header post-title="医生排班" ></Header>
        <div class="doctor-head margin50" v-show="!loadingtrue">
            <!--<div class="outCarint">-->
                <!--<div class="doctor-info">-->
                    <!--<div class="header">-->
                        <!--<img src="@/assets/images/user.png" alt="医生头像">-->
                    <!--</div>-->
                    <!--<div class="doctor-right">-->
                        <!--<p>-->
                            <!--<span class="doctor-name">{{doctorData.name}} </span>-->
                            <!--<span class="doctor-tag">{{doctorData.title}} </span>-->
                        <!--</p>-->
                        <!--<p class="hospital"> {{depart}} </p>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="content">-->
                    <!--<p v-if="doctorData.skill" >擅长：{{doctorData.skill}}</p>-->
                    <!--<p :class="{'ismore':!isSeemore,'yy_dateAA':isSeemore}">-->
                        <!--介绍：{{doctorData.introduce}}-->
                    <!--</p>-->
                    <!--&lt;!&ndash;<p class="open" @click="isSeemore=!isSeemore"> 更多</p>&ndash;&gt;-->
                    <!--<div class="open" @click="isSeemore=!isSeemore"  v-show="moreButton">-->
                            <!--<span class="openUp">-->
                                <!--<span :class="{'disNone':isSeemore,}">展开</span>-->
                                <!--<span :class="{'disNone':!isSeemore,}">收起</span>-->
                                <!--&lt;!&ndash;<i class="icon i_open" :class="{'nomore':isSeemore,}"></i>&ndash;&gt;-->
                                <!--<img :class="{'down':isSeemore,}" src="@/assets/images/icon_up.png" alt="">-->
                            <!--</span>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <div class="doc_info ">
                <div class="pic fl">
                    <img src="@/assets/images/user.png" onerror="@/assets/images/user.png" :alt="doctorData.name">
                </div>
                <div class="detail">
                    <div class="headname">
                        <div style="height: 25px">
                            <span class="name">{{doctorData.name}}</span>
                            <span class="levle"> {{doctorData.title}}</span>
                        </div>

                        <p style="font-size: 14px">{{depart}} </p>
                        <!--<p style="font-size: 14px">擅长：{{doctorInfo.skill}}</p>-->
                    </div>
                </div>
            </div>
            <div class="doc_info">
                <p class="mu-light-text-color">擅长：{{doctorData.skill}}</p>
            </div>
            <div class="doc_introduce">
                <div class="title">
                    <i class="icon i_info"></i>
                    <span class="doc_info_txt">医生介绍</span>
                    <!--<div class="doc_open_btn" @click="isSeemore=!isSeemore">-->
                        <!--<span id="open"  class="openUp">-->
                            <!--<span :class="{'disNone':isSeemore,}">展开</span>-->
                            <!--<span :class="{'disNone':!isSeemore,}">收起</span>-->
                            <!--&lt;!&ndash;<i class="icon i_open" :class="{'nomore':isSeemore,}"></i>&ndash;&gt;-->
                            <!--<img :class="{'nomore':isSeemore,}" src="@/assets/images/icon_up.png" alt="">-->
                        <!--</span>-->
                    <!--</div>-->
                    <div class="open" @click="isSeemore=!isSeemore" >
                            <span class="openUp">
                                <span :class="{'disNone':isSeemore,}">展开</span>
                                <span :class="{'disNone':!isSeemore,}">收起</span>
                                <!--<i class="icon i_open" :class="{'nomore':isSeemore,}"></i>-->
                                <img :class="{'down':isSeemore,}" src="@/assets/images/icon_up.png" alt="">
                            </span>
                    </div>
                </div>
            </div>
            <div class="doc_detail" v-show="isSeemore">
                <div id="doc_detail">{{doctorData.introduce}}</div>
            </div>
            <div class="flatCard">
                <Calendar style="margin-top: 8px;padding-top: 5px" v-show="!loadingtrue" v-on:choseDay="clickDay" v-on:changeMonth="changeDate" :sundayStart="true"></Calendar>

            </div>
            <Loading v-show="loadingtrue"></Loading>
        </div>
    </div>
</template>
<script>
    let doctor_url="/app/bdHospitalDoctor/read/selectDoctorDetail ";
    import Calendar from 'vue-calendar-component';
    export default {
        components: {
            Calendar
        },
        data() {
            return {
                isSeemore: false,
                
                docId:'',
                loadingtrue:true,
                moreButton:false,
                doctorData:[],
                depart:'',
                spliceM:'',
                nowMonth:'',
                nowDate:'',
            }
        },
        mounted() {
            this.changeCalendar();
            this.docId=this.$route.query.doctorId;
            this.depart = this.$store.state.depart;
            document.title = '医生排班';
             
            this.doctorscheduFun();
        },
        methods: {
            changeCalendar(){
                this.$nextTick(()=> {
                    let _this=this;
                    let element=document.getElementsByClassName("wh_content")[1].children;
                    let para=document.createElement("div");
                    let paraPm=document.createElement("div");
                    let paraAll=document.createElement("div");
                    para.style.color="var(--primary)";
                    para.style.height="20px";
                    para.style.marginTop="-5px";
                    paraPm.style.color="var(--primary)";
                    paraPm.style.height="20px";
                    paraPm.style.marginTop="-5px";
                    paraAll.style.color="var(--primary)";
                    paraAll.style.height="20px";
                    paraAll.style.marginTop="-5px";
                    var am=document.createTextNode("上午");
                    var pm=document.createTextNode("下午");
                    var all=document.createTextNode("全天");
                    para.appendChild(am);
                    paraPm.appendChild(pm);
                    paraAll.appendChild(all);
                    //for(let i=0;i<element.length;i++){
                        // if(element[i].children[0].className!="wh_item_date wh_other_dayhide"){
                        //     if(element[i].children[0].innerText==this.nowDate && this.spliceM==this.nowMonth){
                        //         element[i].appendChild(paraPm)
                        //     }else if(element[i].children[1]){
                        //         element[i].children[1].parentNode.removeChild(element[i].children[1]);
                        //     }
                        // }
                    //}
                    if(this.spliceM==this.nowMonth){
                        element[12].appendChild(paraPm);
                        element[16].appendChild(paraAll);
                    }else if(element[12].children[1]){
                        element[12].children[1].parentNode.removeChild(element[12].children[1]);
                        element[16].children[1].parentNode.removeChild(element[16].children[1]);
                    }
                })
            },
            doctorscheduFun(){
                let scheduPar={};
                scheduPar.id=this.docId;
                this.$axios.put(doctor_url, scheduPar).then((res) => {
                    if (res.data.code == '200') {
                        this.loadingtrue=false;
                         this.doctorData=res.data.data;
                        if(this.doctorData.introduce.length>22){
                            this.moreButton=true;
                        }
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            },
            clickDay(data) {
                console.log(data); //选中某天
            },
            changeDate(data) {
                 //console.log(data); //左右点击切换月份
                var nowTime = new Date();
                this.nowDate= nowTime.getDate();
                this.nowMonth=nowTime.getMonth()+1;
                if(data.length==8){
                    this.spliceM=data.substr(5,1)
                }else if(data.length==9 || data.length==10){
                    if(data.split("/")[1].length==2){
                        this.spliceM=data.substr(5,2)
                    }else{
                        this.spliceM=data.substr(5,1)
                    }
                }
                this.changeCalendar();
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

<style  scoped>
    @import "doctorschedu.css";

</style>

