<template>
   <div class="doctorList">
      <Header post-title="管理就诊卡"></Header>
      <div class="outCarint" style="margin-top:127px">
         <ul>
            <li v-for="(item,index) in cardlist" :key="index">
               <div class="homeCard">
                  <div class="homeCardText">
                     <div class="homeCardTextLeft">
                        <p>{{item.patientName}}<img class="renzhen" src="@/assets/images/renzhen.png" alt=""></p>
                        <p>{{item.cardNo}}</p>
                        <p>
                           <span class="icon_switch"> {{item.orgCode}}</span>
                        </p>
                     </div>
                     <div class="towma">
                        <p><img src="@/assets/images/lili.jpg" alt=""></p>
                        <p>刷卡请出示</p>
                     </div>
                  </div>
               </div>
            </li>
         </ul>
         <md-button @click="onActConfirm2" type="primary" round>注册电子就诊卡</md-button>
      </div>
   </div>
</template>
<script type="text/babel">
let wechatbizPatientCardreadpage = "/app/bizPatientCard/read/list";
export default {
   data() {
      return {
         isWeixin: false,
         num: 2,
         cardlist: '',
      };
   },
   created() {

      this.$axios.put(wechatbizPatientCardreadpage, {
      }).then(res => {
         if (res.data.code == '200') {
            this.cardlist = res.data.rows;
         } else if (res.data.code == '800') {
            console.log(res.data.msg)
         }
      }).catch(function (err) {
         console.log(err)
      });;
   },
   watch: {
      selected3: function (newselectedStatus, oldselectedStatus) {
         console.log(newselectedStatus)
      },
   },
   mounted() {
      document.title = '医生列表';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
         return true;
      } else {
         this.isWeixin = true;
         return false;
      };


   },
   methods: {
      onActConfirm2() {

         this.$router.push({
            name: 'cardwrite',
         });
      },
   },
   computed: {
   },
};
</script>
 <style   scoped>
@import "../doctorList/doctorList.css";
</style>