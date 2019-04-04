<template>
   <div class="paymeet">
      <div class="outCarint margin45">
         <Header post-title="缴纳预交款"></Header>
         <md-field>
            <md-field-item solid title="患者姓名" :content="selectorValue" arrow @click="onClick" />
            <md-field-item solid title="住院号" content="反复复" disabled />
            <md-field-item solid title="本次预交款" content="飞洒发" disabled />
            <md-field-item solid title="预交款余额" content="反复复" disabled />
         </md-field>
      </div>
      <div class="divHeight"></div>
      <div class="outCarint">
         <p class="choosepay">选择预交金额</p>
            <md-check-box name="self" v-model="insurants">￥500</md-check-box>
            <md-check-box name="couple" v-model="insurants">￥1500</md-check-box>
            <md-check-box name="parent" v-model="insurants">￥1000</md-check-box>
            <md-check-box name="child" v-model="insurants">￥2000</md-check-box>
            <md-input-item title="金额" type="money" v-model="money" placeholder="请输入预交款"></md-input-item>
         
         <md-field>
            <md-button type="primary" @click="tijiao" round style="margin:24px 0">立即缴纳</md-button>
         </md-field>
      </div>
      <md-selector v-model="isSelectorShow" default-value="2" :data="test" max-height="320px" title="普通模式" @choose="onSelectorChoose"></md-selector>
   </div>
</template>
<script type="text/babel">
export default {
   data() {
      return {
         insurants: ['self'],
         selectorValue: '爸爸',
         isSelectorShow: false,
         money: '',
         test: [
            {
               value: '1',
               text: '爸爸',
            },
            {
               value: '2',
               text: '妈妈',
            },
         ],
      };
   },
   created() {

   },
   mounted() {
      document.title = '缴纳预交款';

   },
   methods: {
      tijiao() {

      },
      onClick() {
         this.isSelectorShow = true
      },
      onSelectorChoose({ text }) {
         this.selectorValue = text;
      },


   },
   computed: {

   },

};
</script>
 <style scoped>
.choosepay {
  line-height: 100px;
}
.md-check-box {
  margin-right: 15px;
}
</style>