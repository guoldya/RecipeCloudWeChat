<template>
   <div class=" copyresult  margin55 ">
      <Header post-title="确认支付"></Header>
      <md-field>
         <div class="outCarint addr">
            <md-detail-item title="收件人：众但是安" content="1345648648" bold />
            <!--<md-detail-item class="addr" title="重庆市渝北区大龙山202" />-->
            <p style="padding-bottom: 6px">重庆市渝北区大龙山202</p>
         </div>
         <div style="height:5px;background:#f8f8f8">
         </div>
         <div class="outCarint">
            <md-detail-item title="申请信息" bold/>
            <p class="partLine" style="margin-top: 0"></p>
            <md-detail-item title="申请编号" content="可用8000.34" />
            <md-detail-item title="住院号" content="00022010010002201001 " />
            <md-detail-item title="患者姓名" content="众安" />
            <md-detail-item title="入院时间" content="2018/08/08 ~ 2019/08/08" />
            <md-detail-item title="出院时间" content="123456789" />
         </div>
         <div style="height:5px;background:#f8f8f8">
         </div>
         <div class="outCarint">
            <md-detail-item title="复印用途" bold/>
            <p class="partLine" style="margin-top: 0"></p>
            <md-detail-item title="保险报销" content="1份" />
         </div>
         <div style="height:5px;background:#f8f8f8">
         </div>
         <div class="outCarint">
            <md-detail-item title="费用信息" bold/>
            <p class="partLine" style="margin-top: 0"></p>
            <md-detail-item title="复印费">
               <span style="color:#1da1f3; ">50.00元</span>
            </md-detail-item>
            <md-detail-item title="快递费">
               <span style="color:#1da1f3; ">22.00元</span>
            </md-detail-item>
            <md-detail-item title="需支付费用" class="payFee">
               <span style="color:#1da1f3;font-size:17px; ">72.00元</span>
            </md-detail-item>
         </div>
      </md-field>
      <div class="outCarint">
         <md-button type="primary" round style="margin-top:16px;">支付</md-button>
      </div>
   </div>
</template>
<script>
import { Field, DetailItem } from 'mand-mobile'
export default {
   name: 'detail-item-demo',
   components: {
      [Field.name]: Field,
      [DetailItem.name]: DetailItem,
   },
}

</script>
<style>
   .copyresult .md-detail-item div:first-child{
      position: relative;
      top: 10px;
   }
   .copyresult .addr .md-detail-item div:first-child{
      width: 32%;
   }
   .copyresult .payFee .md-detail-title{
      width: 20%;
   }
   .copyresult .outCarint{
      padding: 16px 24px;
   }
   .copyresult .partLine{
      height: 2px;
   }
</style>
