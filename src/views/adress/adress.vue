<template>
   <div class="adress">
      <Header post-title="地址管理" v-show="isWeixin"></Header>
      <div :class="{margin45:isWeixin,outCarint:true}" style="margin-bottom:70px">
         <ul>
            <li v-for="(i,index) in num" :key="i">
               <div class="card">
                  <div class="cardText">
                     <p class="order-number">
                        <span>冉有钱</span>
                        <span>13594409399</span>
                     </p>
                     <p class="headdesc">重庆市渝北区洪湖西路</p>
                     <p class="order-bottom">
                        <span>
                           <md-radio :name="index+'a'" v-model="checked" label="默认地址" />
                        </span>
                        <span class="fr">
                           <span @click="adressinfo" class="bbb mui-icon mui-icon-compose">
                              <label class="bianji">编辑</label>
                           </span>
                           <span class="mui-icon" style="font-size: 13px;" @click="dedete">
                              <img class="lajitong" src="@/assets/images/lajitong.png"> 删除
                           </span>
                        </span>
                     </p>
                  </div>
               </div>
            </li>
         </ul>
      </div>

      <p class="add">添加地址</p>

   </div>
</template>
<script type="text/babel">
import { Toast } from 'mand-mobile';
import { Dialog, Button } from 'mand-mobile'
export default {
   data() {
      return {
         isWeixin: false,
         num: 7,
         checked: '0a',
      };
   },
   created() {

   },
   watch: {
      checked: function (newChecked, oldChecked) {
         // this.checked = newnewChecked;
         Toast.succeed('操作成功')
      },
   },
   mounted() {
      document.title = '地址管理';
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
      dedete() {
         Dialog.confirm({
            title: '确认',
            content: '请确认删除该地址吗',
            confirmText: '确定',
            onConfirm: () => console.log('[Dialog.confirm] confirm clicked'),
         })
      },
      adressinfo() {
         let argu = {}
         this.$router.push({
            name: 'adressinfo',
            query: argu
         });
      },

   },
   computed: {

   },

};
</script>
 <style scoped>
@import "../adress/adress.css";
</style>