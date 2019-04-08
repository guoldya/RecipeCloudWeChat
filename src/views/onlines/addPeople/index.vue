<!-- 添加就诊人 -->
<template>
  <div class="add-people">
    <Header post-title="添加问诊人"></Header>
    <!-- 性别选择器 -->
    <md-selector v-model="isSelectorShow" default-value="2" :data="sexData" max-height="320px" title="普通模式" @choose="onSelectorChoose"></md-selector>

    <!-- 日期弹窗 -->
    <md-date-picker ref="datePicker" v-model="isDatePickerShow" type="custom" title="选择出生日期" :custom-types="['yyyy', 'MM','dd']" :min-date="minDate" :default-date="currentDate" @confirm="onDatePickerConfirm"></md-date-picker>
    <!-- <md-field> -->
    <md-input-item ref="input0" v-model="name" title="姓名" placeholder="请输入真实姓名" is-amount :maxlength="5"></md-input-item>

    <md-field-item solid title="性别" arrow :content="selectorValue" @click.native="isSelectorShow = true" />
    <md-field-item solid title="生日" arrow @click.native="isDatePickerShow = true" :content="datePickerValue" />
    <!-- <md-input-item ref="input0" v-model="age" title="年龄" placeholder="请输入真实年龄" is-amount :maxlength="5"></md-input-item> -->
    <!-- </md-field> -->
    <div class="btn">
      <md-button type="primary" round @click="tijiao">提交</md-button>
    </div>
  </div>
</template>
<script>
 
let appbizFamilyMemberfamilyMemberManage = "/app/bizFamilyMember/familyMemberManage";

export default {
  data() {
    return {
      isDatePickerShow: false,
      isSelectorShow: false,
      minDate: new Date('1800/1/1'),
      datePickerValue: '',
      selectorValue: '',
      sex: '',
      age: '',
      currentDate: new Date(),
      sexData: [{
        value: '0',
        text: '男'
      }, {
        value: '1',
        text: '女'
      }],
      name: '',
    }
  },
  methods: {
   
    onDatePickerConfirm() {
      this.datePickerValue = this.$refs.datePicker.getFormatDate('yyyy-MM-dd')
    },
    onSelectorChoose({ text, value }) {
      this.selectorValue = text;
      this.sex = value * 1;
    },

    tijiao() {
      let param = {};
      param.name = this.name;
      param.sex = this.sex;
      param.birthday = this.datePickerValue;
      this.$axios.post(appbizFamilyMemberfamilyMemberManage, param, {
      }).then((res) => {
        if (res.data.code == '200') {
          this.$router.go(-1);
        }
      }).catch(function (err) {
        console.log(err);
      });
    }

  }
}
</script>
<style lang="scss" scoped>
.add-people {
  padding-top: 100px;
  .btn {
    width: 90%;
    margin: 60px auto 0;
  }
}
/deep/.md-field-item-content {
  padding: 0 30px;
}
</style>
