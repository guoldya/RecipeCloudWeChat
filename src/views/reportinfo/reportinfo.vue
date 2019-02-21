<template>

  <div class="reportinfo">
    <Header :post-title="postTitle" v-show="isWeixin"></Header>
    <div :class="{margin45:isWeixin,outCarint:true}" v-for="(item,i) in reportInfoData" :key="i">
        <div v-if="activeId==0">
            <div class="card margin16">
                <div class="cardText" >
                    <div class="cardTextPP">
                        <span>姓名：{{item.name}}</span>
                        <span style="width: 50%">
                  性别：
                  <span>{{item.sex}}</span>
              </span>
                    </div>
                    <div class="cardTextNN">
                        <span>检查科室：{{item.execDept}} </span>
                        <div>
                            <span>申请时间：{{item.applyTime}}</span>
                        </div>
                    </div>
                    <div class="cardTextPP">
                        <span>检查类别：{{item.type}} </span>
                        <span style="width: 50%">
                  检查子类：
                  <span>{{item.subType}} </span>
              </span>
                    </div>
                    <div class="cardTextNN cardTextBor">
                        <span>检查项目：{{item.itemName}}</span>
                        <div>
                            <span>报告时间：{{item.reportTime}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <p style="margin-top:15px;font-weight:700">检查结果</p>
            <div class="card margin16">
                <div class="cardText">
                    <div class="cardTextPP">
                        <span>检查参数：{{item.params}}</span>
                    </div>
                    <div class="cardTextPP">
                        <span> 检查所见：{{item.findings}}</span>
                    </div>
                    <div class="cardTextPP">
                        <span> 印象：</span>
                        <span style="width: 85%;">{{item.impression}}</span>
                    </div>
                    <div class="cardTextPP">
                        <span style="width: 15%;"> 建议：</span>
                        <span style="width: 85%;">{{item.advise}}</span>
                    </div>
                    <div class="listData cardTextPP">
                        <span style="width: 15%;">备注：</span>
                        <span style="width: 85%;">{{item.remark}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="activeId==1">
            <div class="card margin16">
                <div class="cardText" >
                    <div class="cardTextPP">
                        <span>姓名：{{item.name}}</span>
                        <span style="width: 50%">性别：
                            <span>{{item.sex}}</span>
                        </span>
                    </div>
                    <div class="cardTextPP">
                        <span>年龄：{{item.age}}岁 </span>
                        <span style="width: 50%">科别：
                            <span>{{item.execDept}}</span>
                        </span>
                    </div>
                    <div class="cardTextNN">
                        <span>收样日期：{{item.applyTime}} </span>
                        <div >
                          <span>标本类型：{{item.sampleType}} </span>
                        </div>
                    </div>
                    <div class="cardTextNN">
                        <span>送检项目：{{item.itemName}}</span>
                        <div>
                          <span>报告时间：{{item.reportTime}} </span>
                        </div>
                    </div>
                    <div class="cardTextPP">
                        <span>临床诊断：</span>
                        <span style="width: 76%;">{{item.diag}}</span>
                    </div>
                </div>
            </div>
            <p style="margin-top:15px;font-weight:700">报告结果</p>
            <div class="card margin16">
                <div class="cardText">
                    <div class="resultTitle">
                        <span>项目名称</span>
                        <span>结果值</span>
                        <span>单位</span>
                        <span>参考值</span>
                    </div>
                    <div class="cardTextPP" v-for="(item,i) in reportResult" :key="i">
                        <span>{{item.itemName}}</span>
                        <span>{{item.itemValue}}</span>
                        <span>{{item.unit}}</span>
                        <span>{{item.referenceValue}}</span>
                    </div>
                </div>
            </div>
            <p class="textCenter">注意：此结果仅供参考,最终结果以医院打印报告为准。</p>
        </div>

    </div>
  </div>
</template>
<script  >
    let bizbizPacsReportreaddetail = 'app/bizPacsReport/read/detail';
    let bizLisReportreaddetail = 'app/bizLisReport/read/detail';
export default {
  data() {
    return {
      isWeixin: false,
      normal: {
        checkbox: true,
        radio: 1,
        switch: false
      },
      time: [
        { title: '待支付' },
        { title: '预约成功' },
        { title: '预约关闭' }
      ],
        reportInfoId:'',
        collectInfoId:'',
        reportInfoData:[],
        reportResult:[],
        pageSize:10,
        pageNumber:1,
        activeId:'',
        postTitle:'',
    };
  },

  created() {

  },
  mounted() {
      this.activeId=this.$store.state.activeId;
      if(this.$store.state.activeId==0){
          this.checkReportDetail();
          this.postTitle="检查报告详情";
      }else if(this.$store.state.activeId==1){
          this.collectReportDetail();
          this.postTitle="检验报告详情"
      }

    document.title = '检查报告详情';
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
    payment() {
      this.$router.push({
        name: 'payment',
      });
    },
    setStyle(rowIndex, row) {
      if (row.id === this.currentRow.id) {
        return 'background-color:#ddd'
      } else {
        return 'background-color:#abc'
      }
    },
      checkReportDetail(){
          let _this = this;
          this.reportInfoId= this.$route.query.id;
          let checkParams={};
          checkParams.id=parseInt(this.reportInfoId);
          checkParams.pageSize=this.pageSize;
          checkParams.pageNumber=this.pageNumber;
          this.$axios.put(bizbizPacsReportreaddetail,checkParams,{
          }).then((res) => {
              if (res.data.code == '200') {
                  this.reportInfoData.push(res.data.data);
              }
          }).catch(function (err) {
              console.log(err);
          });
      },
      collectReportDetail(){
          let _this = this;
          this.collectInfoId= this.$route.query.id;
          this.$axios.put(bizLisReportreaddetail,{id:parseInt(this.collectInfoId),pageSize:this.pageSize,pageNumber:this.pageNumber},{
          }).then((res) => {
              if (res.data.code == '200') {
                  this.reportInfoData.push(res.data.data);
                  this.reportResult=res.data.data.details;
              }
          }).catch(function (err) {
              console.log(err);
          });
      },
  },
  computed: {

  },
};
</script>
 <style   scoped>
.reportinfo .cardText {
  padding: 0;
}
.reportinfo .cardText .cardTextPP {
  display: flex;
  justify-content: space-between;
  padding: 32px 0;
  font-size: 28px;
  border-bottom: 1px solid #e9e9e9;
}
.reportinfo .cardText .cardTextNN {
    display: block;
    padding: 40px 0;
    font-size: 28px;
    border-bottom: 1px solid #e9e9e9;
}
.reportinfo .cardText .cardTextNN div{
    padding-top: 40px;
}
.reportinfo .cardText .cardTextPP:last-child ,.reportinfo .cardText .cardTextBor{
  border: none;
}
.reportinfo .resultTitle{
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    border-bottom: 4px solid #cccccc;
    padding: 14px 0px;
}
</style>