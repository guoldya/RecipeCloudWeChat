<template>
  <div class="appTabCarint">
    <div class="appTab">
      <span v-for="(item, index) in tabTitle" :key="'time' + index" @click="switchTo(item,index)" :class="active1 === index ? 'appTabAcitive' : '' ">
        {{item.title}}
      </span>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      active1: 0,

    }
  },
  props: ['tabTitle'],
  created() {

  },
  mounted() {


  },
  methods: {
    switchTo(item, index) {
      this.active1 = index;
      this.$emit('childByValue', item.type);
    },
  },
}
</script>

<style scoped>
/**tab样式*/
.appTabCarint {
  margin: 110px 20px 0px;
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
