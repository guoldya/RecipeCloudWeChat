<template>
   <div :class="{'outCarint':true,'margin45':isWeixin}">
      <Header post-title="信息确认" v-show="isWeixin"></Header>
      <div class="rebinding-box card margin16">
         <div class="box-timeline  cardText">
            <div class="alltimeball">
               <div class="timeball acitiveball">1</div>
               <div class="timeball acitiveball">2</div>
               <div class="timeball acitiveball">3</div>
            </div>
            <div class="alltimeball">
               <span class="acitivestep">业务选择</span>
               <span class="acitivestep">上传证件</span>
               <span class="acitivestep">信息确认</span>
            </div>
            <div class="timeballline"></div>
            <div class="timeballline2" style="background:#1da1f3"></div>
         </div>
      </div>
      <div class="card margin16">
         <div class="cardText login-box">
            <div class="content">
               <div class="login-box">
                  <div class="login-box-div">
                     <span class="flexF">患者姓名</span>
                     <input class="flexF" type="text" name="username" id="phone" placeholder="姓名" :value="name" maxlength="11">
                  </div>
                  <div class="login-box-div">
                     <span class="flexF">身份证号</span>
                     <input id="verify" type="text" class="infos flexF" name="yanz" placeholder="身份证号" maxlength="4" />
                  </div>
                  <div class="login-box-div">
                     <span class="flexF">复印用途</span>
                     <input class="flexF" type="text" name="username" id="phone" placeholder="民族" :value="name" maxlength="11">
                  </div>
                  <div class="login-box-div">
                     <span class="flexF">用途说明</span>
                     <input id="verify" type="text" class="infos flexF" name="yanz" placeholder="出生日期" maxlength="4" />
                  </div>
                  <div class="login-box-div">
                     <span class="flexF">复印份数</span>
                     <input class="flexF" type="text" name="username" id="phone" placeholder="地址" value="" maxlength="11">
                  </div>

                  <!-- <md-input-item ref="input13" v-model="receiver" title="name" placeholder="姓名" is-highlight></md-input-item>
                  <md-input-item ref="input13" v-model="receiver" title="idcard" placeholder="身份证号" is-highlight></md-input-item>
                  <md-input-item type="phone" v-model="mobile" title="手机号码" placeholder="xxx xxxx xxxx" clearable is-highlight></md-input-item>
                  <md-input-item ref="input13" v-model="zipCode" maxlength="6" title="邮政编码" placeholder="邮政编码" is-highlight></md-input-item>
                  <Address ref="openAdress" :default-value="pickerDefaultValue" v-on:adressByValue="adressByValue"></Address>
                  <md-input-item ref="input13" v-model="address" title="详细地址" placeholder="详细地址" is-highlight></md-input-item>
              
               -->
               </div>
            </div>
         </div>
      </div>
      <md-agree v-model="agreeConf.checked" :disabled="false" size="md" @change="onChange(agreeConf.checked)">
         我已阅读并了解
         <a @click="openPgmodel" style="color:#1da1f3">《病历复印规定》</a>
      </md-agree>
      <Pgmodal ref="Pgmodal"></Pgmodal>
      <md-button type="primary" round class="margin16">正确</md-button>
   </div>
</template>
<script type="text/babel">
import Pgmodal from "../component/pgmodal/pgmodal.vue";
export default {
   data() {
      return {
         isWeixin: false,
         name: '张三丰',
         idcard:'',
         gender: '1',
         marriage: '2',
         agreeConf: {
            checked: true,
         },
      };
   },
   created() {

   },
   mounted() {
      document.title = '资料确认';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
      } else {
         this.isWeixin = true;
      }
   },
   methods: {
      onChange(checked) {
         console.log(`agree name =  ${checked ? 'checked' : 'unchecked'}`);
      },
      openPgmodel() {
         this.$refs.Pgmodal.openPgmodel();
      },
   },
   components: {
      Pgmodal,
   }
};
</script>
 <style scoped>
@import url("../../cardwrite/cardwrite.css");
</style>