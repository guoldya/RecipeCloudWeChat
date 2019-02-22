<template>
   <div class="idcardlist">
      <Header post-title="管理就诊卡"></Header>
      <div class="outCarint" style="margin:117px 0 0">
         <ul>
            <li v-for="(item,index) in cardlist" :key="index" class="margin16">
               <div class="homeCard">
                  <div class="homeCardText">
                     <div class="homeCardTextLeft" @click="unblind(item)">
                        <p>{{item.patientName}}<img class="renzhen" src="@/assets/images/renzhen.png" alt=""></p>
                        <p>{{item.cardNo}}</p>
                     </div>
                     <div class="towma" @click="showPic=true">
                        <p><img src="@/assets/images/lili.jpg" alt=""></p>
                     </div>
                  </div>
               </div>
            </li>
         </ul>
         <md-button @click="blidcard" type="primary" round>注册电子就诊卡</md-button>
         <md-dialog title="系统信息" :mask-closable="true" :closable="false" layout="column" v-model="actDialog.open" :btns="actDialog.btns">
            是否已有就诊卡？绑定已有就诊卡，将会关联该就诊卡的就医档案。
         </md-dialog>

         <p class="warnbottitle margin16">温馨提示：</p>
         <p class="warnbot">
            您累计可注册5张电子就诊卡，如已办理实体就诊卡，可在注册时进行绑定
         </p>
         <p class="warnbottom" @click="cardneed">
            电子就诊卡需知</p>
      </div>

      <md-landscape v-model="showPic" :mask-closable="true">
         <img src="//manhattan.didistatic.com/static/manhattan/do1_6VL7HL8TYaUMsIfygfpz">
         <img src="@/assets/images/lili.jpg" alt="">
      </md-landscape>
   </div>
</template>
<script type="text/babel">
let wechatbizPatientCardreadpage = "/app/bizPatientCard/read/list";
import { Dialog, Button, Toast } from 'mand-mobile'
export default {
   data() {
      return {
         isWeixin: false,
         showPic: false,
         num: 2,
         cardlist: '',
         actDialog: {
            open: false,
            btns: [
               {
                  text: '没有',
                  type: 'danger',
                  handler: this.onActConfirm2,
               },
               {
                  text: '已有',
                  type: 'danger',
                  handler: this.onActConfirm3,
               },
               {
                  text: '取消',
                  type: 'danger',
                  handler: this.onActConfirm,
               },
            ],
         },
      };
   },
   created() {

      this.$axios.put(wechatbizPatientCardreadpage, {
      }).then(res => {
         if (res.data.code == '200') {
            this.cardlist = res.data.rows;
         } else if (res.data.code == '800') {
            console.log(res.data.msg)
         }
      }).catch(function (err) {
         console.log(err)
      });;
   },
   watch: {
      selected3: function (newselectedStatus, oldselectedStatus) {
         console.log(newselectedStatus)
      },
   },
   mounted() {
      document.title = '医生列表';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
         return true;
      } else {
         this.isWeixin = true;
         return false;
      };


   },
   methods: {
      unblind(data) {
         this.$router.push({
            name: 'unblind',
            query: { id: data.id }
         });
      },
      cardneed() {
         this.$router.push({
            name: 'cardneed',
         });
      },
      onActConfirm() {
         // Toast({
         //    content: '你点击了确认',
         // })
         this.actDialog.open = false
      },
      onActConfirm2() {
         this.actDialog.open = false;
         this.$router.push({
            name: 'cardwrite',
         });
      },
      onActConfirm3() {
         this.actDialog.open = false;
         this.$router.push({
            name: 'cardblind',
         });
      },
      blidcard() {
         this.actDialog.open = true
      },

   },
   computed: {
   },
};
</script>
 <style   scoped>
@import "../doctorList/doctorList.css";

.idcardlist .homeCard {
  height: 200px;
}
</style>