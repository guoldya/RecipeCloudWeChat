<template>
   <div class="outCarint margin45 ">
      <Header post-title="病案复印"></Header>
      <Pgmodal ref="filterPop"></Pgmodal>
   </div>
</template>
<script type="text/babel">
import Pgmodal from "../component/pgmodal/pgmodal.vue";
export default {
   data() {
      return {

      };
   },
   created() {

   },
   mounted() {
      document.title = '病案复印';

   },
   methods: {
      filter() {
         this.$refs.Pgmodal.closePgmodal();
      },
   },
   components: {
      Pgmodal,
   }

};
</script>
 <style scoped>
</style>