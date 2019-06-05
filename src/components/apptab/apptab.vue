<template>
  <div class="appTabCarint margin45">
    <div class="appTab">
      <span v-for="(item, index) in tabTitle" v-if="item.orgName" :key="'time' + index" @click="switchTo(item)" :class="active1 === item.id ? 'appTabAcitive' : '' ">
        {{item.title}}
      </span>
      <span v-for="(item, index) in tabTitle" v-if="item.type" :key="'time' + index" @click="switchTo(item)" :class="active1 === item.type ? 'appTabAcitive' : '' ">
        {{item.title}}
        <label v-if="item.unReadTotal">未读({{item.unReadTotal}})</label>
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
  mounted() {
    if (sessionStorage.getItem('feeActiveFun')) {
      this.active1 = sessionStorage.getItem('feeActiveFun') * 1
    }
  },
  methods: {
    switchTo(item) {
      if (this.active1 === item.type || this.active1 === item.id || this.tabTitle[0].loading) return;

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
  /* background-color: #ffffff; */
}
.appTitle {
  padding: 28px 0px;
  border-bottom: 2px solid var(--primary--line);
  display: flex;
  justify-content: space-between;
}
.appTab {
  display: flex;
  justify-content: space-around;
  padding: 0 100px;
  /* line-height: 72px; */
  padding-bottom: 0;
  line-height: 67px;
  margin-bottom: 20px;
}
.appTab span {
  /* padding: 0 8px 8px; */
  font-size: 30px;
  position: relative;
}
.appTab label {
  font-size: 26px;
}
.appTab .appTabAcitive {
  color: var(--primary);
  border-bottom: 4px solid var(--primary);
  z-index: 2;
}
/* .appTab .appTabAcitive:after {
  content: " ";
  background-color: var(--primary);
  width: 64px;
  height: 4px;
  display: block;
  position: absolute;
  bottom: -1px;
  left: 28%;
  border-radius: 4px;
} */
</style>
