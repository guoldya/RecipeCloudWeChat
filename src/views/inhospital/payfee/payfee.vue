<template>
   <div class="outCarint margin45 payfee">
      <Navigation type="title" title="预缴款缴纳">
         <span class="mu-secondary-text-color" @click="tijiao">预缴款记录</span>
      </Navigation>
      <md-field>
         <md-field-item solid title="患者姓名" content="zhuy" disabled />
         <md-field-item solid title="患者姓名" content="zhuy" disabled />
         <md-field-item solid title="住院号" content="反复复" disabled />
         <md-field-item solid title="住院科室" content="飞洒发" disabled />
         <md-field-item solid title="本次预交款" content="反复复" disabled />
         <md-field-item solid title="预交款余额" content="反复复" disabled />
      </md-field>
      <div>
         <p>请选择预交款</p>
      </div>
      <md-button type="primary" @click="tijiao" round style="  margin:24px 0">立即缴纳</md-button>
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