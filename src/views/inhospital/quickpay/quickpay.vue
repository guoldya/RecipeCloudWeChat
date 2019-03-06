<template>
   <div class="outCarint">
      <Header post-title="快捷结算"></Header>
      <Apptab :tab-title="time" v-on:childByValue="childByValue"></Apptab>
      <div class="card cardcc margin16">
         <p class="appTitle">
            <span> em.type}}费</span>
            <span class="mu-secondary-text-color">{ tem.total | keepTwoNum}}元</span>
         </p>
         <div class="cardText">
            <p>患者： item.patientName}}</p>
            <p>医院： item.hospital}}</p>

            <p>支付时间：{ item.payTime}}</p>
            <div style="height:30px;  text-align: right;">
               <span class="payatnow">立即支付</span>
            </div>
         </div>
      </div>

   </div>
</template>

<script>
export default {

   data() {
      return {
         time: [
            { title: '待支付', type: 1 },
            { title: '待支付', type: 2 },
         ],
         type: 1,
      }
   },
   created() {

   },
   mounted() {
      if (this.$store.state.feeActiveId) {
         this.type = this.$store.state.feeActiveId
      }

   },
   watch: {

   },
   methods: {

      childByValue: function (childValue) {
         console.log(childValue, "childValue")
         this.$store.commit('feeActiveFun', childValue.type);
         this.type = childValue.type;
      },



   },
}
</script>

<style>
</style>
