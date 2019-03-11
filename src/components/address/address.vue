<template>
   <div class="adressinfo">
      <md-field-item title="所在区域"   arrow="arrow-right" :addon="pickerValue1" @click="openAdress"> </md-field-item>
      <md-picker ref="picker1" v-model="isPickerShow1" :data="pickerData1" :cols="3" is-cascade title="选择省市区/县" @confirm="onPickerConfirm(1)"></md-picker>
   </div>
</template>
<script>
let appshippingAddressareaList = '/app/shippingAddress/areaList';
export default {
   data() {
      return {
         pickerData1: [],
         pickerValue1: '',
         isPickerShow1: false,
      }
   },
   props: ['defaultValue'],
   created() {
      this.$axios.put(appshippingAddressareaList, {
      }).then(res => {
         if (res.data.code == '200') {
            res.data.rows.forEach(value => {
               // var a = res.data.rows.find(item => {
               //   item.areaCode == this.pickerDefaultValue[0];
               //   var aa = item.label;
               //   return item;
               // });
               // var b = a.find(item => {
               //   item.areaCode == this.pickerDefaultValue[1];
               //   var bb = item.label;
               //   console.log(item, bb);
               //   return item;
               // });
               // b.find(item => {
               //   item.areaCode == this.pickerDefaultValue[2];
               //   var cc = item.label;
               //   console.log(item, cc);
               //   return item;
               // });
               if (value.areaCode == this.defaultValue[0]) {
                  var aa = value.label;
                  value.children.forEach(test => {
                     if (test.areaCode == this.defaultValue[1]) {
                        var bb = test.label;
                        test.children.forEach(data => {
                           if (data.areaCode == this.defaultValue[2]) {
                              var cc = data.label;
                              this.pickerValue1 = aa + bb + cc;
                           }
                        })
                     }
                  })
               }
            })


            this.pickerData1 = [this.areaList(res.data.rows)];
         }
      }).catch(function (err) {
         console.log(err);
      });


   },
   mounted() {

   },
   methods: {
      openAdress() {
         this.isPickerShow1 = !this.isPickerShow1;
      },
      areaList(list) {
         let newArea = [];
         for (let i = 0; i < list.length; i++) {
            let neslist = {
               text: list[i].label,
               value: list[i].value
            }
            if (list[i].children) {
               neslist.children = this.areaList(list[i].children)
            }
            newArea.push(neslist);
         }
         return newArea;
      },
      onPickerConfirm(index) {
         const values = this.$refs[`picker${index}`].getColumnValues()
         let res = ''
         let test = ''
         values.forEach(value => {
            value && (res += `${value.text || value.label} `)
         })
         values.forEach(value => {
            value && (test += `${value.value || value.label} `)
         })
         this.$emit('adressByValue', test.split(' ')[2]);
         this[`pickerValue${index}`] = res;
      },

   },
}
</script>

<style scoped>
</style>
