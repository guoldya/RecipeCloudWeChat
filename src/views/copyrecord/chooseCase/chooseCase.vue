<template>
   <div class="chooseCase">
      <Header post-title="选择复印病案"></Header>
      <div class="margin45 outCarint" style="margin-bottom:70px">
         <div class="tabAdiv">
            <div class="chooseCaseBtn">
               <div class="md-agree" @click="onChange()">
                  <div :class="{ 'md-agree-icon':true,'checked':true}">
                     <div class="md-agree-icon-container">
                        <i class="md-icon icon-font md-icon-checked md"></i>
                        <i class="md-icon icon-font md-icon-check md"></i>
                     </div>
                  </div>
               </div>
            </div>
            <div class="chooseCaseText">
               <p>住院科室：</p>
               <p>出院诊断： </p>
               <p>如愿日期：217-12-12 12:22</p>
               <p>出院日期：217-12-12 12:22</p>
            </div>
            <div class="chooseCaseTime"> 第
               <span class="number">1</span>次</div>
         </div>
         <div class="tabAdiv">
            <div class="chooseCaseBtn">
               <div class="md-agree" @click="onChange()">
                  <div :class="{ 'md-agree-icon':true,'checked':true}">
                     <div class="md-agree-icon-container">
                        <i class="md-icon icon-font md-icon-checked md"></i>
                        <i class="md-icon icon-font md-icon-check md"></i>
                     </div>
                  </div>
               </div>
            </div>
            <div class="chooseCaseText">
               <p>住院科室：</p>
               <p>出院诊断： </p>
               <p>如愿日期：217-12-12 12:22</p>
               <p>出院日期：217-12-12 12:22</p>
            </div>
            <div class="chooseCaseTime"> 第
               <span class="number">1</span>次
            </div>
         </div>
         <md-button type="primary" round class="margin16">确认提交</md-button>
      </div>

   </div>
</template>
<script type="text/babel">
import { Toast } from 'mand-mobile';
import { Dialog, Button } from 'mand-mobile'


export default {
   data() {
      return {


         agreeConf: {
            checked: true,
            name: 'agree0',
            size: 'md',
            disabled: false,
            introduction: '选中状态',
         },


      };
   },
   created() {



   },
   watch: {

   },
   mounted() {

   },
   methods: {


      addadress() {

      },


   },
   computed: {

   },

};
</script>
 <style scoped>
.chooseCase .tabAdiv {
  display: flex;
  justify-content: space-around;
  box-shadow: 0 0 0.17rem rgba(131, 179, 208, 0.3);
  border-radius: 20px;
  font-size: 28px;
  margin-bottom: 32px;
}
.chooseCase .tabAdiv div:first-child {
  line-height: 200px;
}
.chooseCase .chooseCaseBtn {
  width: 15%;
  height: 200px;
  text-align: center;
  display: inline-block;
  color: #ffffff;
}

.chooseCase .chooseCaseText {
  width: 60%;
  height: 200px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.chooseCase .chooseCaseTime {
  width: 25%;
  height: 200px;
  line-height: 200px;
  text-align: center;
  background: #1da1f3;
  display: inline-block;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  color: #ffffff;
}
.chooseCase .chooseCaseTime .number {
  background: #ffffff;
  color: #1da1f3;
  font-size: 34px;
  line-height: 1;
  display: inline-block;
  padding: 13px 23px;
  border-radius: 50%;
}
</style>