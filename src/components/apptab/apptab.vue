<template>
  <div class="appTabCarint">
    <div class="appTab">
      <span v-for="(item, index) in tabTitle" v-if="item.orgName" :key="'time' + index" @click="switchTo(item)" :class="active1 === item.id ? 'appTabAcitive' : '' ">
        {{item.title}}
      </span>
      <span v-for="(item, index) in tabTitle" v-if="item.type" :key="'time' + index" @click="switchTo(item)" :class="active1 === item.type ? 'appTabAcitive' : '' ">
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
      if (this.active1 === item.type || this.active1 === item.id) return

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
  text-align: center;
  width: 100%;
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
  padding: 20px 100px 20px;
}
.appTab span {
  padding: 0 8px 8px;
  font-size: 32px;
  position: relative;
}

.appTab .appTabAcitive {
  color: #1da1f3;
  border-bottom: 4px solid #1da1f3;
}
/* .appTab .appTabAcitive:after {
  content: " ";
  background-color: #1da1f3;
  width: 64px;
  height: 4px;
  display: block;
  position: absolute;
  bottom: -1px;
  left: 28%;
  border-radius: 4px;
} */
</style>
