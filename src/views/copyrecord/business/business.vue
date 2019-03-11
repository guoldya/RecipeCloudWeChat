<template>
   <div class="outCarint margin45 ">
      <Header post-title="病案复印"></Header>
      <div class="rebinding-box card margin16">
         <div class="box-timeline  cardText">
            <div class="alltimeball">
               <div class="timeball acitiveball">1</div>
               <div class="timeball">2</div>
               <div class="timeball">3</div>
            </div>
            <div class="alltimeball">
               <span class="acitivestep">业务选择</span>
               <span>证件上传</span>
               <span>信息确认</span>
            </div>
            <div class="timeballline acitiveline"></div>
            <div class="timeballline2"></div>
         </div>
      </div>

      <p style="color:#a9a9a9">复印预约仅适用于本人或代理人申请，公检法保险机构和死亡病历复印需到医院窗口复印。住院病历一.般在出院后七个工作日归档，请在七个工作日后申请。
      </p>
      <p>病历类型</p>
      <md-check-box name="month" v-model="pay" label="月付" />
      <md-check-box name="season" v-model="pay" label="季度费" />
      <p>领取方式</p>
      <md-check-box name="month" v-model="pay" label="邮寄" />
      <md-check-box name="season" v-model="pay" label="自提" />
      <p style="color:#a9a9a9">
         为了保您正能及时收到复印病历，请确保收件地址准确无误!
      </p>
      <md-field>
         <md-input-item ref="input13" v-model="receiver" title="收件人" placeholder="收件人" is-highlight></md-input-item>
         <md-input-item type="phone" v-model="mobile" title="手机号码" placeholder="xxx xxxx xxxx" clearable is-highlight></md-input-item>
         <Address ref="openAdress" :default-value="pickerDefaultValue" v-on:adressByValue="adressByValue"></Address>
         <md-input-item ref="input13" v-model="address" title="详细地址" placeholder="详细地址" is-highlight></md-input-item>
      </md-field>
      <md-agree v-model="agreeConf.checked" :disabled="false" size="md" @change="onChange(agreeConf.checked)">
         我已阅读并了解
         <a @click="openPgmodel" style="color:#1da1f3">《病历复印规定》</a>
      </md-agree>
      <md-button type="primary" @click="tijiao" round style="margin-top:16px">下一步</md-button>
      <Pgmodal  ref="Pgmodal"></Pgmodal>
   </div>
</template>
<script type="text/babel">
import Pgmodal from "../component/pgmodal/pgmodal.vue";
let addOrUpdate = "/app/shippingAddress/addOrUpdate";
export default {
   data() {
      return {
         agreeConf: {
            checked: true,
         },
         pay: '',
         receiver: '',
         mobile: '',
         address: '',
         areaId: '',
         pickerDefaultValue: '',
      };
   },
   created() {

   },
   mounted() {
      document.title = '病案复印';

   },
   methods: {
      onChange(checked) {
         console.log(`agree name =  ${checked ? 'checked' : 'unchecked'}`);
      },
      openPgmodel() {
         this.$refs.Pgmodal.openPgmodel();
      },
      adressByValue: function (childValue) {
         this.areaId = childValue
      },

      tijiao() {
         this.$router.push({
            name: 'certificate'
         });
         if (!this.receiver || !this.mobile || !this.address || !this.areaId) {
            this.$toast.info("请完善信息")
         } else {

            // this.$axios.post(addOrUpdate, {
            //    receiver: this.receiver,
            //    mobile: this.mobile,
            //    address: this.address,
            //    areaId: this.areaId,
            // }).then(res => {
            //    if (res.data.code == '200') {
            //       this.$router.go(-1);
            //    }
            // }).catch(function (err) {
            //    console.log(err);
            // });
         }

      },
   },
   components: {
      Pgmodal,
   }

};
</script>
 <style scoped>
.md-check-box {
  margin-right: 20px;
}
</style>