<template>
   <div class="inhospital">
      <Header post-title="住院服务"></Header>
      <img src="@/assets/images/hospital.png" alt="" width="100%">
      <div class="inhospitalcontent">
         <img src="@/assets/images/hh1.png" alt="" width="94%" @click="payfee">
         <img src="@/assets/images/hh2.png" alt="" width="94%" @click="admission">
         <!-- <img src="@/assets/images/hh3.png" alt="" width="94%" @click="quickpay"> -->
      </div>
   </div>
</template>
<script type="text/babel">
export default {
   data() {
      return {

      };
   },
   created() {
   },
   mounted() {
      document.title = '住院服务';
   },
   methods: {
      payfee() {
         this.$router.push({
            name: 'payfee',
         })
      },
      // 入院办理
      admission() {
         this.$router.push({
            name: 'admission',
         })
      },

      quickpay() {
         this.$router.push({
            name: 'quickpay'
         })
      }


   },
   computed: {

   },

};
</script>
 <style scoped>
@import url("./inpatient.css");
</style>