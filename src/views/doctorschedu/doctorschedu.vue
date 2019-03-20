<template>
    <div class="doctorschedu">
        <Header post-title="医生排班"  ></Header>
        <div class="outCarint margin45">
            <div class="doctor-head" v-show="!loadingtrue">
                <div class="outCarint">
                    <div class="doctor-info">
                        <div class="header">
                            <img src=" https://kano.guahao.cn/iqw2633790_image140.jpg" alt="医生头像">
                        </div>
                        <div class="doctor-right">
                            <p class="introduce">
                                <span class="doctor-name">{{doctorData.name}} </span>
                                <span class="doctor-tag">{{doctorData.title}} </span>
                            </p>
                            <p class="hospital"> {{depart}} </p>
                            <p v-if="doctorData.skill" class="content" :class="{'nomore':!isSeemore,'yy_dateAA':isSeemore}">
                                擅长：{{doctorData.skill}}
                            </p>
                            <p class="content" :class="{'nomore':!isSeemore,'yy_dateAA':isSeemore}">
                                介绍：{{doctorData.introduce}}
                            </p>
                            <p class="open" @click="isSeemore=!isSeemore" v-show="moreButton"> 更多</p>
                        </div>
                    </div>
                </div>
            </div>
            <Calendar v-show="!loadingtrue" v-on:choseDay="clickDay" v-on:changeMonth="changeDate" :sundayStart="true"></Calendar>
            <Loading v-show="loadingtrue"></Loading>

        </div>

    </div>
</template>
<script>
    let doctor_url="/app/bdHospitalDoctor/read/selectOne ";
    import Calendar from 'vue-calendar-component';
    export default {
        components: {
            Calendar
        },//修改
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
            this.docId=this.$route.query.id;
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
                    para.style.color="#b5b5b5";
                    para.style.height="20px";
                    para.style.marginTop="-5px";
                    paraPm.style.color="#b5b5b5";
                    paraPm.style.height="20px";
                    paraPm.style.marginTop="-5px";
                    paraAll.style.color="#b5b5b5";
                    paraAll.style.height="20px";
                    paraAll.style.marginTop="-5px";
                    var am=document.createTextNode("上午");
                    var pm=document.createTextNode("下午");
                    var all=document.createTextNode("全天");
                    para.appendChild(am);
                    paraPm.appendChild(pm);
                    paraAll.appendChild(all);
                    // for(let i=0;i<element.length;i++){
                    //     if(element[i].children[0].className!="wh_item_date wh_other_dayhide"){
                    //         if(element[i].children[0].innerText==this.nowDate && this.spliceM==this.nowMonth){
                    //             element[i].appendChild(paraPm)
                    //         }else if(element[i].children[1]){
                    //             element[i].children[1].parentNode.removeChild(element[i].children[1]);
                    //         }
                    //     }
                    // }
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
                         console.log(this.doctorData.introduce)
                        if(this.doctorData.introduce.length>14){
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
        }
    }
</script>

<style scoped>
    .doctorschedu  .doctor-head{
        height:auto;
    }
    /deep/.wh_content_all{
        background-color: transparent !important;
    }
    /deep/.wh_item_date, /deep/.wh_top_tag,/deep/.wh_top_changge li{
        color: #333333;
        width: 64px;
        height: 64px;
    }
    /deep/.wh_jiantou1{
        border-top: 4px solid #333333;
        border-left: 4px solid #333333;
    }
    /deep/.wh_jiantou2{
        border-top: 4px solid #333;
        border-right: 4px solid #333;
    }
    /deep/.wh_content{
        margin-left: 22px;
    }
    /deep/.wh_content_item{
        height: 90px;
    }
    /deep/.wh_content_item .wh_isToday{
        background-color: #e5e5e5;
    }
    /deep/.wh_content_item .wh_chose_day{
        background-color: #e5e5e5;
    }
    .nomore{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .yy_dateAA {
        height: auto;
    }
    .doctorschedu .open{
        padding: 10px 14px 0;
    }
    .doctorschedu .content{
        margin: 4px 0;
    }
    .doctorschedu .introduce {
        height: 72px;
    }
</style>

