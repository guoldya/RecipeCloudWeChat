<template>
  <div class="appTabCarint">
    <div class="appTab">
      <span v-for="(item, index) in tabTitle" :key="'time' + index" @click="switchTo(item)" :class="active1 === (index+1) ? 'appTabAcitive' : '' ">
        {{item.title}}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active1: 1,
    }
  },
  props: ['tabTitle'],
  created() {

  },
  mounted() {
    console.log(this.$store.state.feeActiveId,"this.$store.state.feeActiveId")
    if (this.$store.state.feeActiveId) {
      this.active1 = this.$store.state.feeActiveId
    }

  },
  methods: {
    switchTo(item) {
      this.active1 = item.type;
      this.$emit('childByValue', item);
    },
  },
}
</script>

<style scoped>
/**tab样式*/
.appTabCarint {
  margin: 110px 20px 0px;
  text-align: center;
  width: 80%;
  margin-left: 10%;
}
.appTitle {
  padding: 28px 0px;
  border-bottom: 2px solid #ededed;
  display: flex;
  justify-content: space-between;
}
.appTab {
  display: flex;
  justify-content: space-between;
}
.appTab span {
  padding: 0 8px 8px;
  font-size: 28px;
}

.appTabAcitive {
  color: #1da1f3;
  border-bottom: 4px solid #1da1f3;
}
</style>
