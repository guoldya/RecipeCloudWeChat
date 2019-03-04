<template>

  <div class="adressinfo">
    <Header :post-title="post" v-show="isWeixin"></Header>
    <div :class="{margin45:isWeixin,outCarint:true }">
      <md-field>
        <md-input-item ref="input13" v-model="receiver" title="姓名" placeholder="姓名" is-highlight></md-input-item>
        <md-input-item type="phone" v-model="mobile" title="手机号码" placeholder="xxx xxxx xxxx" clearable is-highlight></md-input-item>
        <md-input-item ref="input13" v-model="zipCode" maxlength="6" title="邮政编码" placeholder="邮政编码" is-highlight></md-input-item>
        <md-field-item title="所在区域" v-model="areaId" arrow="arrow-right" :content="pickerValue1" @click="isPickerShow1 = true">
        </md-field-item>
        <md-input-item ref="input13" v-model="address" title="详细地址" placeholder="详细地址" is-highlight></md-input-item>
        <md-button type="primary" @click="tijiao" round style="margin-top:16px">保存</md-button>
      </md-field>
    </div>
    <md-picker ref="picker1" :default-value="pickerDefaultValue" v-model="isPickerShow1" :data="pickerData1" :cols="3" is-cascade title="选择省市区/县" @confirm="onPickerConfirm(1)"></md-picker>
  </div>
</template>
<script>
import { InputItem, Field } from 'mand-mobile'
let appshippingAddressareaList = '/app/shippingAddress/areaList';
let addressDetails = "/app/shippingAddress/addressDetails";

let addOrUpdate = "/app/shippingAddress/addOrUpdate";

export default {
  name: 'input-item-demo',
  /* DELETE */
  title: '普通输入框',
  titleEnUS: 'Normal input',
  data() {
    return {
      isPickerShow1: false,
      pickerData1: [],
      pickerValue1: '',
      isWeixin: false,
      receiver: '',
      mobile: '',
      address: '',
      areaId: '',
      zipCode: '',
      post: "编辑地址",
      pickerDefaultIndex: [],
      pickerDefaultValue: [],
      test: '',
    }
  },
  /* DELETE */
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
  },
  created() {
    if (this.$route.query.id) {
      document.title = '编辑地址';
      this.post = '编辑地址';
      this.$axios.put(addressDetails, {
        id: this.$route.query.id * 1,
      }).then(res => {
        if (res.data.code == '200') {
          this.receiver = res.data.data.receiver;
          this.mobile = res.data.data.mobile;
          this.address = res.data.data.address;
          this.areaId = res.data.data.areaId;
          this.pickerDefaultValue = [parseInt(this.areaId / 1000) * 1000, parseInt(this.areaId / 100) * 100, this.areaId]
          this.zipCode = res.data.data.zipCode;
        }
      }).catch(function (err) {
        console.log(err);
      });
    } else {
      document.title = '新增地址';
      this.post = '新增地址';
    }
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
    } else {
      this.isWeixin = true;
    };

    this.$axios.put(appshippingAddressareaList, {
    }).then(res => {
      if (res.data.code == '200') {
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
        res.data.rows.forEach(value => {
          if (value.areaCode == this.pickerDefaultValue[0]) {
            var aa = value.label;
            value.children.forEach(test => {
              if (test.areaCode == this.pickerDefaultValue[1]) {
                var bb = test.label;
                test.children.forEach(data => {
                  if (data.areaCode == this.pickerDefaultValue[2]) {
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
      console.log(test, test.split(' ')[2])
      this.areaId = test.split(' ')[2];
      this[`pickerValue${index}`] = res;


    },
    tijiao() {
      if (!this.receiver || !this.mobile || !this.address || !this.areaId || !this.zipCode) {
        this.$toast.info("请完善信息")
      } else {
        this.$axios.post(addOrUpdate, {
          id: this.$route.query.id * 1,
          receiver: this.receiver,
          mobile: this.mobile,
          address: this.address,
          areaId: this.areaId,
          zipCode: this.zipCode,
        }).then(res => {
          if (res.data.code == '200') {
            this.$router.go(-1);
          }
        }).catch(function (err) {
          console.log(err);
        });
      }

    },

  },
}

</script>
<style scoped>
.adressinfo .md-field-item-title {
  margin-right: 40px;
}
</style>
