<template>
   <div class="outCarint margin45 payfee">
      <Header post-title="住院预交金"></Header>
      <md-field>
         <md-field-item solid title="入院日期" content="反复复" disabled />
         <md-field-item solid title="床号" content="反复复" disabled />
         <md-field-item solid title="姓名" content="飞洒发" disabled />
         <md-field-item solid title="性别" content="反复复" disabled />
         <md-field-item solid title="病区" content="反复复" disabled />
         <md-field-item solid title="入院号" content="反复复" disabled />
         <md-field-item solid title="入院诊断" content="反复复" disabled />
         <md-field-item solid title="主治医生" content="反复复" disabled />
         <md-field-item solid title="病情摘要" content="反复复反复复反复复反复复反复复反复复反复复反复复反复复反复复反复复反复复反复复反复复反复复反复复" disabled />
         <md-field-item solid title="诊疗措施" content="反复复" disabled />
         <md-field-item solid title="住址" content="反复复" disabled />
      </md-field>
      <md-button type="primary" @click="tijiao" round style="  margin:24px 0">保存</md-button>
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
      document.title = '住院预交金';

   },
   methods: {
      tijiao() {
         this.$router.push({
            name: 'paymeet',
         });
      },
   },
   computed: {

   },

};
</script>
 <style scoped>
</style>