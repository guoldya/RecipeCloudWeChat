<template>
  <div class="outCarint margin45 payfee">
    <Header post-title="入院办理"></Header>
    <!-- <Navigation type="title">
      <span class="mu-secondary-text-color" @click="tijiao">入院办理</span>
    </Navigation> -->
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
    <p class="addbTN" @click="tijiao()">保存</p>
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