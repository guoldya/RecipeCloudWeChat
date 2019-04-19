<template>
   <div class="inspectionCheck">
      <Header post-title="选择邮寄方式"></Header>

      <div style="margin-top:150px;text-align:center;">
         <img src="@/assets/images/icon_selftaking1.png" alt="" width="94%" @click="askself">
         <img src="@/assets/images/icon_send1.png" alt="" width="94%" @click="mail" style="margin-top:15px;">
      </div>

   </div>
</template>
 
<script>
export default {
   data() {
      return {

      };
   },
   mounted() {
      this.$store.commit('selectAdressFun', '');
   },
   methods: {
      askself() {
         let argu = {};
         this.$router.push({
            name: 'confirmOrder',
            query: { recipeId: this.$route.query.recipeId, id: this.$route.query.id, deliveryMode: 2, 
            orderId: this.$route.query.orderId,orgId:this.$route.query.orgId,orgName:this.$route.query.orgName, }
         });
      },

      mail() {
         let argu = {};
         this.$router.push({
            name: 'confirmOrder',
            query: { recipeId: this.$route.query.recipeId, id: this.$route.query.id, deliveryMode: 1, orderId: this.$route.query.recipeId,orgName:this.$route.query.orgName,  }
         });
      },


   }
}
</script>

<style>
</style>
