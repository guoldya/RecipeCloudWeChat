<template>
  <div class="outCarint timefilter">
    <p class="time-picker">
      <span class="timePicker" @click="showSelector" :style="hightValue">
        <label v-show="type != 'payfee'"> {{selectorValue}}<img src="@/assets/images/sanjiao.png" alt=""></label>
      </span>
      <span class="otherpay" @click="otherpay" v-show="type != 'payfeerecord'&&type != 'visitingrecord' ">为他人代付 </span>
      <ul class="hog-chart-tab" v-show="type == 'visitingrecord' ">
        <li v-for="(item2,index2) in tabTime" @click="selectStyle(item2)" :class="{ 'chart-button' : item2.value == istabTime}" :key="index2+'aa'">{{item2.label}} </li>
      </ul>
    </p>
    <md-selector v-model="isSelectorShow" default-value='1' :data="timeData" @choose="onSelectorChoose" title="选择时间"></md-selector>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isSelectorShow: false,
      selectorValue: '近一个月',
      hightValue: `background: transparent`,
      timeData: [
        { text: '近一个月', value: '1', timeClass: 1 },
        { text: '近三个月', value: '2', timeClass: 2 },
        { text: '近半年', value: '3', timeClass: 3 },
      ],
      isActive: false,
      istabTime: 0,
      tabTime: [{
        label: '全部',
        value: 0,
      }, {
        label: '门诊',
        value: 1,
      }, {
        label: '住院',
        value: 2,
      }],
    };
  },
  props: ['type'],
  async mounted() {
    if (this.type != 'payfee') {
      this.hightValue = `background: #fff`
    };

    if (this.$store.state.feeType) {
      this.istabTime = this.$store.state.feeType 
    }
  },
  methods: {
    selectStyle(data) {
      this.istabTime = data.value;
      this.$emit('tabTime', data.value);
    },
    showSelector() {
      this.isSelectorShow = true
    },
    otherpay() {
      this.$router.push({
        name: 'otherpay',
      });
    },
    onSelectorChoose(data) {
      this.selectorValue = data.text;
      this.$emit('childByTime', data);
      // this.getGoodslist(false);
    },

  }
}
</script>

<style lang="scss" scoped>
.time-picker {
  // padding: 0 0 30px;
  display: flex;
  justify-content: space-between;
}

 .hog-chart-tab li {
   font-size: 24px;
   color: #1da1f3;
   display: inline-block;
   height: 52px;
   line-height: 48px;
   width: 105px;
   position: relative;
   box-sizing: border-box;
   border: 2px solid #1da1f3;
   text-align: center;
   
}

.hog-chart-tab li:first-child {
   border-radius: 8px 0 0 8px;
   border-right: none;
}

.hog-chart-tab li:last-child {
   border-radius: 0 8px 8px 0;
   border-left: none;
}

.hog-chart-tab li.chart-button {
   color: #ffffff;
   background: #1da1f3
}
.timefilter .time-picker .timePicker {
  padding: 6px 30px 10px;
  background: #ffffff;
  border-radius: 30px;
  font-size: 26px;
  letter-spacing: 1px;
}

.timefilter .time-picker .otherpay {
  padding: 7px 15px;
  background: #ffffff;
  color: var(--primary);
  border: 2px solid var(--primary);
  box-sizing: border-box;
  border-radius: 30px;
  margin-top: 20px;
}

.timefilter .time-picker img {
  width: 24px;
  margin-top: 4px;
  margin-left: 5px;
}
</style>
