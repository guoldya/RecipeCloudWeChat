<template>
  <div class="md-example-child md-example-child-picker md-example-child-picker-2">
    <md-field>

      <md-field-item title="省市区/县" arrow="arrow-right" :addon="pickerValue1" @click="isPickerShow1 = true">
      </md-field-item>
    </md-field>
    <md-picker ref="picker1" v-model="isPickerShow1" :default-index="pickerDefaultIndex" :default-value="pickerDefaultValue" :data="pickerData1" :cols="3" is-cascade title="选择省市区/县" @confirm="onPickerConfirm(1)"></md-picker>
  </div>
</template>

<script>
import { Picker, Field, FieldItem } from 'mand-mobile'
import simple from 'mand-mobile/components/picker/demo/data/simple'
import district from 'mand-mobile/components/picker/demo/data/district'

export default {
  name: 'picker-demo',
  /* DELETE */
  title: '弹出展示',
  titleEnUS: 'Display in Popup',
  height: 500,
  /* DELETE */
  components: {
    [Picker.name]: Picker,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
  },
  data() {
    return {
      isPickerShow1: false,
      pickerData1: district,
      pickerValue1: '',
      pickerDefaultIndex: [],
      pickerDefaultValue: [],
    }
  },
  mounted() {

    // this.pickerDefaultIndex = [3, 2, 1];
    this.pickerDefaultValue = ['330000', '340500', '341502']
    setTimeout(() => {
      console.log("sss")
      this.$refs.picker.refresh()
    }, 0)
  },
  methods: {
    onPickerConfirm(index) {
      const values = this.$refs[`picker${index}`].getColumnValues()
      let res = ''
      values.forEach(value => {
        value && (res += `${value.text || value.label} `)
      })
      this[`pickerValue${index}`] = res
      console.log(values)
    },
  },
}

</script>
