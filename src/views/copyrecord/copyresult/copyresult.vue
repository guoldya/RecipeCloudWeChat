<template>
   <div class="   margin55 ">
      <Header post-title="确认支付"></Header>
      <md-field>
         <div class="outCarint">
            <md-detail-item title="收件人：众安" content="1345648648" bold />
            <md-detail-item title="重庆市渝北区大龙山202" />
         </div>
         <div style="height:10px;background:#f5f5f5">
         </div>
         <div class="outCarint">
            <md-detail-item title="申请信息" bold/>
            <md-detail-item title="申请编号" content="可用8000.34" />
            <md-detail-item title="住院号" content="00022010010002201001 " />
            <md-detail-item title="患者姓名" content="众安" />
            <md-detail-item title="入院时间" content="2018/08/08 ~ 2019/08/08" />
            <md-detail-item title="出院时间" content="123456789" />
         </div>
         <div style="height:10px;background:#f5f5f5">
         </div>
         <div class="outCarint">
            <md-detail-item title="复印用途" bold/>
            <md-detail-item title="保险报销" content="1份" />
         </div>
         <div style="height:10px;background:#f5f5f5">
         </div>
         <div class="outCarint">
            <md-detail-item title="费用信息" bold/>
            <md-detail-item title="复印费">
               <span style="color:#1da1f3; ">50.00元</span>
            </md-detail-item>
            <md-detail-item title="快递费">
               <span style="color:#1da1f3; ">22.00元</span>
            </md-detail-item>
            <md-detail-item title="需支付费用">
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
