<template>
   <div class="gp-order">
      <div :class="{'outCarint':true,'margin45':isWeixin}">
         <Header post-title="预约信息" v-show="isWeixin"></Header>
         <div class="order-info">
            <div class="doctor-info g-clear">
               <img src="https://kano.guahao.cn/pYf27810846" alt="卞晶" title="卞晶" onerror="this.src='https://static.guahao.cn/img/character/doc-unknow.png';this.onerror='';">
               <span class="doctor-name">卞晶</span>
               <span>主任医生</span>
            </div>

            <ul>
               <li>
                  <label>就诊医院：</label>
                  <p>重庆市妇幼保健院(冉家坝院区)</p>
               </li>
               <li>
                  <label>科室医生：</label>
                  <p>口腔科 - 卞晶</p>
               </li>
               <li>
                  <label>门诊时间：</label>
                  <p class="mu-secondary-text-color">2019-02-22&nbsp;周五下午</p>
               </li>
               <li>
                  <label>门诊类型：</label>
                  <p>专家门诊</p>
               </li>
               <li>
                  <label>费用：</label>
                  <p>以医院实际为准</p>
               </li>

            </ul>

            <div class="rule-list">
               <p class="g-arrow-d  J_ShowRules">我已了解并同意以下规则（点击查看详情）</p>
               <!-- <ul class="J_RuleList">
                  <li>停诊将短信通知，请保持手机畅通</li>
                  <li>实名制预约，就诊人信息不符将无法取号</li>
               </ul> -->
            </div>

         </div>
      </div>
      <div style="height:20px; background: #f8f8f8"></div>
      <div class="order-info ">
         <ul class="g-items">
            <li class="input-line g-arrow-r J_PatientsDropDown J_AdjustWidth">
               <div>
                  <label class="nowidth">就诊人：</label>
                  <span class="input-box">
                     试试
                  </span>
               </div>
            </li>
            <input type="hidden" class="patient_type" value="0">
            <li class="input-line g-arrow-r GJ_Dropdown J_AdjustWidth J_TimeSelect">

               <div>
                  <label class="nowidth">预约时间段：</label>
                  <span class="input-box">

                  </span>
               </div>

            </li>
            <li class="input-line g-arrow-r GJ_Dropdown J_AdjustWidth">

               <div>
                  <label class="nowidth">初/复诊：</label>
                  <span class="input-box">
                     初诊（初次就诊时，选择此项）
                  </span>
               </div>
            </li>

            <li class="input-line g-arrow-r" id="J_SelectDis" data-init="[{&quot;name&quot;:&quot;尚未确诊&quot;,&quot;uuid&quot;:&quot;0&quot;}]">
               <div>
                  <label class="nowidth">就诊卡</label>
                  <span class="input-box">
                  </span>
               </div>
            </li>
         </ul>

      </div>
      <div class="outCarint">
         <md-button type="primary" round>提交</md-button>
      </div>
   </div>

</template>
<script type="text/babel">
export default {
   data() {
      return {
         isWeixin: false,

      };
   },
   created() {

   },
   mounted() {
      document.title = '预约信息';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
      } else {
         this.isWeixin = true;
      }
   },
   methods: {

   },
   computed: {

   },

};
</script>
 <style scoped>
@import url("./reservation.css");
</style>