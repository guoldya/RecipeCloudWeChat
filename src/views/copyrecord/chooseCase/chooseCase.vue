<template>
  <div class="chooseCase">
    <Header post-title="选择复印病案"></Header>
    <div class="margin55" style="margin-bottom:70px">
      <div class="tabAdiv flatCard">
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
          <div class="number">1</div>
          次</div>
      </div>
      <div class="tabAdiv flatCard">
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
          <div class="number">12</div>
          次
        </div>
      </div>
      <div style="height: 50px"></div>

      <!--<md-button type="primary" round class="margin14 outCarint">确认提交</md-button>-->
      <p class="addbTN">确认提交</p>
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
  background-color: #ffffff;
  font-size: 28px;
  margin-bottom: 10px;
}
.chooseCase .tabAdiv div:first-child {
  line-height: 200px;
  display: inline-block;
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
  color: #ffffff;
}
.chooseCase .chooseCaseTime .number {
  color: #1da1f3;
  background: #ffffff;
  border-radius: 50%;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  line-height: 44px !important;
  height: 44px;
  width: 44px;
}
   .chooseCase .flatCard{
     border-top: none;
   }
</style>