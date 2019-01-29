<template>
  <div class="reportquery">
    <Header post-title="报告查询" v-show="isWeixin"></Header>
    <div :class="{margin45:isWeixin,outCarint:true}">
      <div class="user">
        <md-field>
          <md-field-item title="选择患者" align="left" :content="selectorValue" @click="showSelector" down solid />
        </md-field>
        <md-field-item style="padding: 10px 0" name="name" title="选择时间" align="left" :content="datePickerValue" @click.native="isDatePickerShow = true">
        </md-field-item>
        <div class="datepick">
          <!-- <span :class="{'mu-secondary-text-color':datepick}">选择时间<img v-if="!datepick" src="@/assets/images/icon_open@2x.png">
            <img v-else src="@/assets/images/icon_open_pre@2x.png">
          </span> -->

        </div>
        <md-selector v-model="isSelectorShow" default-value="2" :data="data111" max-height="320px" title="普通模式" @choose="onSelectorChoose"></md-selector>
      </div>
      <div class="appTab" style="margin-top:20px">
        <span v-for="(item, index) in departs" :key="'departs' + index" @click="switchTo(index)" :class="active1 === index ? 'appTabAcitive' : '' ">
          {{item.title}}
        </span>
      </div>
      <div v-if="this.active1==0">
        <div class="card">
          <div class="cardText" @click="intoreportinfo">
            <div class="cardTextLeft">
              <p>患者：演示医院</p>
              <p>医院：演示医院</p>
              <p>报告：血液分析/CPRRP （2019-02-28）</p>
            </div>
            <div class="cardTextRight">
              <img src="@/assets/images/icon_more2@2x.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.active1==1">
        <div class="card">
          <div class="cardText" @click="intoreportinfo">
            <div class="cardTextLeft">
              <p>检查报告</p>
              <p>医院：演示医院</p>
              <p>报告：血液分析/CPRRP （2019-02-28）</p>
            </div>
            <div class="cardTextRight">
              <img src="@/assets/images/icon_more2@2x.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <md-date-picker ref="datePicker" v-model="isDatePickerShow" type="custom" title="选择出险时间" :text-render="textRender" :custom-types="['yyyy', 'MM','dd', 'hh', 'mm']" :default-date="currentDate" @change="onDatePickerChange" @confirm="onDatePickerConfirm"></md-date-picker>
    </div>
  </div>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      datepick: false,
      date: undefined,
      isWeixin: false,
      isDatePickerShow: false,
      selected3: 55,
      active1: 0,
      departs: [
        { title: '检查报告' },
        { title: '检验报告' },
      ],
      citys: [
        { name: '妇科', value: 1 },
        { name: '内科', value: 2 },
        { name: '外科', value: 31 },
        { name: '生殖内分泌', value: 55 },
      ],
      text: '一级选项1',
      options: [
        {
          value: '0',
          text: '二级选项1',
        },
        {
          value: '1',
          text: '二级选项2',
        },
      ],
      isSelectorShow: false,
      data111:
        [
          {
            value: '1',
            text: '患者一',
          },
          {
            value: '2',
            text: '患者二',
          },
          {
            value: '3',
            text: '患者三',
          },
          {
            value: '4',
            text: '患者四',
          },
          {
            value: '5',
            text: '患者五',
          },
          {
            value: '6',
            text: '患者六',
          },
          {
            value: '7',
            text: '患者七',
          },
          {
            value: '8',
            text: '患者八',
          },
          {
            value: '9',
            text: '患者九',
          },
          {
            value: '10',
            text: '患者十',
          },
        ],
      selectorValue: '患者二',
      currentDate: new Date(),
      isDatePickerShow: false,
      datePickerValue: '',
    };
  },
  created() {

  },
  mounted() {
    document.title = '报告查询';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
      return true;
    } else {
      this.isWeixin = true;
      return false;
    }
  },
  methods: {
    switchTo(num) {
      this.active1 = num;
    },
    datePick() {
      this.datepick = !this.datepick
    },
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorChoose({ text }) {
      this.selectorValue = text
    },
    intoreportinfo() {
      let argu = {}
      this.$router.push({
        name: 'reportinfo',
        query: argu
      });
    },
    change() {
      console.log("sssssssss")
    },
    textRender() {
      const args = Array.prototype.slice.call(arguments)
      const typeFormat = args[0] // 类型
      // const column0Value = args[1] // 第1列选中值
      // const column1Value = args[2] // 第2列选中值
      const column2Value = args[3] // 第3列选中值
      if (typeFormat === 'dd') {
        return `*${column2Value}日`
      }
    },
    onDatePickerChange(columnIndex, itemIndex, value) {
      console.log(
        `[Mand Mobile] DatePicker Change\ncolumnIndex: ${columnIndex},\nitemIndex:${itemIndex},\nvalue: ${JSON.stringify(
          value,
        )}`,
      )
    },
    onDatePickerConfirm(columnsValue) {
      console.log(`[Mand Mobile] DatePicker Confirm\nvalue: ${JSON.stringify(columnsValue)}`)
      this.datePickerValue = this.$refs.datePicker.getFormatDate('yyyy/MM/dd hh:mm')
    },
  },
  computed: {

  },

};
</script>
 <style   scoped>
@import url("./reportquery.css");
</style>