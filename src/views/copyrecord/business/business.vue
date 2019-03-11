<template>
   <div class="outCarint margin45 business">
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
      <p class="kinds">病历类型</p>
      <md-check-box name="month" v-model="pay" label="月付" />
      <md-check-box name="season" v-model="pay" label="季度费" />
      <p class="kinds">领取方式</p>
      <md-check-box name="1" v-model="mail" label="邮寄" />
      <md-check-box name="2" v-model="mail" label="自提" />
      <p v-show="mail==1" style="color:#a9a9a9">
         为了保您正能及时收到复印病历，请确保收件地址准确无误!
      </p>
      <p v-show="mail==2" style="color:#a9a9a9">
         医院病案室审核通过后，会将预约时间推送给您，请按通知约定日期工作时间内携带所申请惠者有效证件前往医院领取复印病历。如无法前往请代理人携带双方身份证原件、复印件及委托书前往代办或选择邮寄服务
      </p>

      <p class="letter" v-show="mail==2" @click="showPic=true">委托书样例</p>
      <md-field v-show="mail==1">
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
      <Pgmodal ref="Pgmodal"></Pgmodal>
      <md-landscape v-model="showPic" :mask-closable="true">
         <img src="@/assets/images/u152.png" alt="">
      </md-landscape>
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
         showPic: false,
         pay: '',
         mail: '1',
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
      // this.$refs.Pgmodal.showPgwModal = true
   },
   watch: {
      mail(newValue) {
         console.log(newValue)
      }
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
.business .md-landscape-content {
  width: 7rem !important;
}
.letter {
  font-size: 30px;
  line-height: 75px;
  color: #1da1f3;
}
.kinds{
   line-height: 70px;
}
</style>