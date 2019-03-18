<template>
  <div class="appTabCarint">
    <div class="appTab">
      <span v-for="(item, index) in tabTitle" v-if="item.orgName" :key="'time' + index" @click="switchTo(item)" :class="active1 === item.id ? 'appTabAcitive' : '' ">
        {{item.title}}
      </span>
      <span v-for="(item, index) in tabTitle" v-if="item.type" :key="'time' + index" @click="switchTo(item)" :class="active1 === (index+1) ? 'appTabAcitive' : '' ">
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
    if (this.$store.state.feeActiveId) {
      this.active1 = this.$store.state.feeActiveId
    }
  },
  methods: {
    switchTo(item) {
      if (item.orgName) {
        this.active1 = item.id;
      } else {
        this.active1 = item.type;
      }
      this.$emit('childByValue', item);
    },
  },
}
</script>

<style scoped>
/**tab样式*/
.appTabCarint {
  /*margin: 110px 20px 0px;*/
  text-align: center;
  width: 100%;
  /* margin-left: 10%; */
}
.appTitle {
  padding: 28px 0px;
  border-bottom: 2px solid #ededed;
  display: flex;
  justify-content: space-between;
}
.appTab {
  display: flex;
  justify-content: space-around;
}
.appTab span {
  padding: 0 8px 8px;
  font-size: 30px;
}

.appTabAcitive {
  color: #1da1f3;
  border-bottom: 4px solid #1da1f3;
}
</style>
