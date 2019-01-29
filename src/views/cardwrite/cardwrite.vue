<template>
   <div :class="{'outCarint':true,'margin45':isWeixin}">
      <Header post-title="注册电子就诊卡" v-show="isWeixin"></Header>
      <div class="rebinding-box">
         <div class="box-timeline">
            <div>
               <span class="timeline1">1</span>
               <span class="line1"> </span>
            </div>
            <div>
               <span class="timeline2">2</span>
               <span class="line2"> </span>
            </div>
            <div>
               <span class="timeline3">3</span>
               <span class="line3"> </span>
            </div>
         </div>
      </div>
   </div>
</template>
<script type="text/babel">
export default {
   data() {
      return {
         isWeixin: false,
         steps: [
            {
               name: '手机验证',
            },
            {
               name: '身份验证',
            },
            {
               name: '资料确认',
            },
         ],
         currentStep: 0,
      };
   },
   created() {

   },
   mounted() {
      document.title = '注册电子就诊卡';
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

   },
   computed: {

   },

};
</script>
 <style scoped>
.box-timeline {
  width: 100%;
}
.box-timeline div {
  /* width: 30%; */
  float: left;
}
.timeline1,
.timeline3,
.timeline2 {
  text-align: center;
  padding: 20px 32px;
  font-size: 32px;
  border: 50%;
  display: block;
  font-weight: 700;
  color: #ffffff;
  border-radius: 50%;
  background: #24a5f1;
  position: relative;
  /* margin: 20%; */
}
.line1 {
  width: 20%;
  position: absolute;
  height: 5px;
  display: block;
  background: #24a5f1;
}
 
</style>