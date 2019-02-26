<template>
   <div>
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
                  <md-field-item :content="selectorValue" @click="selectStyle" solid/>
               </md-field>
               <md-selector v-model="isSelectorShow" default-value="7" :data="optionsData" max-height="320px" title="选择就诊卡" @choose="onSelectorChoose "></md-selector>
            </div>
            <span class="downImg"><img src="@/assets/images/icon_down.png"></span>
         </span>
      </header>

   </div>

</template>
<script>

let bizPatientCard = "/biz/app/bizPatientCard/read/list";
export default {
   data() {
      return {
         isSelectorShow: false,
         selectorValue: '',
      }
   },
   mounted() {
      this.$axios.put(bizPatientCard, {
      }).then(res => {
         if (res.data.code == '200') {
            for (let i = 0; i < res.data.rows.length; i++) {
               this.selectorValue = res.data.rows[0].patientName;
               this.cardNo = res.data.rows[0].cardNo;
               let neslist = {
                  text: res.data.rows[i].patientName,
                  value: res.data.rows[i].cardNo,
                  aaa: res.data.rows[i].createTime,

               }
               this.optionsData.push(neslist);
            }

         } else if (res.data.code == '800') {

         }
      }).catch(function (err) {
         console.log(err);
      });
   },
   methods: {
      selectStyle(data) {
         this.isSelectorShow = true
      },

   }
}
</script>

<style>
</style>
