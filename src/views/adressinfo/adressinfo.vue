<template>

   <div class="md-example-child md-example-child-input-item-0">
      <Header post-title="地址管理" v-show="isWeixin"></Header>
      <div :class="{margin45:isWeixin,outCarint:true }">
         <md-field>
            <md-input-item ref="input13" title="姓名" placeholder="姓名" is-highlight></md-input-item>
            <md-input-item ref="input13" title="手机号码" placeholder="手机号码" is-highlight></md-input-item>
            <md-input-item ref="input13" title="邮政编码" placeholder="邮政编码" is-highlight></md-input-item>
            <md-field-item title="所在区域" arrow="arrow-right" :addon="pickerValue1" @click="isPickerShow1 = true">
            </md-field-item>
            <md-input-item ref="input13" title="详细地址" placeholder="详细地址" is-highlight></md-input-item>
            <md-button type="primary" round style="margin-top:16px">保存</md-button>
         </md-field>
      </div>
      <md-picker ref="picker1" v-model="isPickerShow1" :data="pickerData1" :cols="3" is-cascade title="选择省市区/县" @confirm="onPickerConfirm(1)"></md-picker>
   </div>
</template>
<script>
import { InputItem, Field } from 'mand-mobile'
import district from 'mand-mobile/components/picker/demo/data/district'
export default {
   name: 'input-item-demo',
   /* DELETE */
   title: '普通输入框',
   titleEnUS: 'Normal input',
   data() {
      return {
         isPickerShow1: false,
         pickerData1: district,
         pickerValue1: '',
         isWeixin: false,
      }
   },
   /* DELETE */
   components: {
      [InputItem.name]: InputItem,
      [Field.name]: Field,
   },
   mounted() {
      document.title = '选择科室';
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
      onPickerConfirm(index) {
         const values = this.$refs[`picker${index}`].getColumnValues()

         let res = ''
         values.forEach(value => {
            value && (res += `${value.text || value.label} `)
         })
         this[`pickerValue${index}`] = res
      },


   },
}

</script>