<template>
   <div class="sign">
      <header class="aui-navBar aui-navBar-fixed">
         <span href="javascript:;" class="aui-navBar-item" @click="$router.go(-1)">
            <img src="@/assets/images/icon_back.png">
         </span>
         <div class="aui-center">
            <span class="aui-center-title">就诊签到</span>
         </div>
         <span class="aui-navBar-item">
            <div>
               <md-field>
                  <md-field-item :content="selectorValue" @click="showSelector" solid/>
               </md-field>
               <md-selector v-model="isSelectorShow" default-value="7" :data="optionsData[0]" max-height="320px" title="选择姓名" @choose="onSelectorChoose"></md-selector>
            </div>
            <span class="downImg"><img src="@/assets/images/icon_down.png"></span>
         </span>
      </header>
      <div :class="{margin45:isWeixin}">
         <md-notice-bar icon="location" type="default" style="margin-top:10px;">
            重庆西南医院.骨科
         </md-notice-bar>

         <div class="outCarint">
            <div class="signUp">
               <p>签到</p>
            </div>
            <p class="signUpTime">2018-12-03 12-12-00</p>
            <p class="signUpAdress">
               <md-icon name="success-color" size="lg" style="position:relative;top:5px;right:5px"></md-icon>
               您已进入我们医院的考勤签到区...</p>
            <p class="signUpAgin" @click="signUpAgin">去重新定位</p>
         </div>
      </div>

   </div>
</template>

<script type="text/babel">
export default {
   data() {
      return {
         isWeixin: false,
         titleIndex: 0,
         optionsData: [[
            { text: "范冰冰", value: "1" },
            { text: "郑凯", value: "2" },
            { text: "邓超", value: "3" },
            { text: '孙俪', value: "4" },
            { text: '王祖蓝', value: "5" },
            { text: '薛之谦', value: "6" },
            { text: '陈楚生得', value: "7" },
            { text: "张信哲", value: "8" },
            { text: "汪涵", value: "9" },
            { text: "李晨", value: "10" },
         ]],

         isSelectorShow: false,
         selectorValue: '陈楚生得',
         isActive: true,
      };
   },
   created() {
   },
   mounted() {
      document.title = '就诊签到';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
      } else {
         this.isWeixin = true;
      }

   },
   methods: {
      showSelector() {
         this.isSelectorShow = true
      },
      onSelectorChoose({ text }) {
         this.selectorValue = text;
      },
      switchTo(num) {
         this.titleIndex = num;
      },
      continueApply() {
         let argu = { name: this.selectorValue };
         this.$router.push({
            name: 'recipeDetail',
            query: argu
         });
      },
      signUpAgin() {
         let argu = {};
         this.$router.push({
            name: 'signagin',
            query: argu
         });
      },

      handler(name, active) {
         console.log(`Status of switch ${name} is ${active ? 'active' : 'inactive'}`)
      },
   }
};
</script>
<style  scoped>
.sign .downImg img {
  width: 26px !important;
  height: 14px !important;
  top: -3px;
  position: relative;
}
.signUp {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #1da1f3;
  text-align: center;
  margin: 0 auto;
  margin-top: 25%;
}
.signUp p {
  color: #ffffff;
  line-height: 200px;
  font-size: 36px;
  letter-spacing: 2px;
}
.signUpTime {
  text-align: center;
  line-height: 100px;
}
.signUpAdress {
  font-size: 28px;
  text-align: center;
}
.signUpAgin {
  color: #1da1f3;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
}
</style>

