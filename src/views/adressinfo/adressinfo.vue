<template>
  <div class="adressinfo">
    <Header :post-title="post"></Header>
    <div class="outCarint">
      <md-field>
        <md-input-item ref="input13" v-model="receiver" title="姓名" placeholder="姓名" is-highlight></md-input-item>
        <md-input-item type="phone" v-model="mobile" title="手机号码" placeholder="xxx xxxx xxxx" clearable is-highlight></md-input-item>
        <md-input-item ref="input13" v-model="zipCode" maxlength="6" title="邮政编码" placeholder="邮政编码" is-highlight></md-input-item>
        <Address ref="openAdress" :default-value="pickerDefaultValue" v-on:adressByValue="adressByValue"></Address>
        <md-input-item ref="input13" v-model="address" title="详细地址" placeholder="详细地址" is-highlight></md-input-item>
        <md-button type="primary" @click="tijiao" round style="margin-top:16px">保存</md-button>
      </md-field>
    </div>
  </div>
</template>
<script>
import { InputItem, Field } from 'mand-mobile'
let addressDetails = "/app/shippingAddress/addressDetails";
let addOrUpdate = "/app/shippingAddress/addOrUpdate";

export default {
  name: 'input-item-demo',
  /* DELETE */
  title: '普通输入框',
  titleEnUS: 'Normal input',
  data() {
    return {
      receiver: '',
      mobile: '',
      address: '',
      areaId: '',
      zipCode: '',
      post: "编辑地址",
      pickerDefaultValue: [],
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


  },
  mounted() {

  },
  methods: {
    adressByValue: function (childValue) {
      this.areaId = childValue
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
