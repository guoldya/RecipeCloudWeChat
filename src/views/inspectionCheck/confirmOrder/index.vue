<template>
   <div class="submitOrder">
      <Header post-title="提交订单"></Header>
      <div class="margin50">
         <div class="flatCard outCarint " style="border-top: 1px solid #ededed;margin-top: 0" v-if="titleIndex===1">
            <div class="submitUser">
               <div class="iconInfo">
                  <div class="iconImg">
                     <img style="width: 16px" v-if="addressInfo.length!=0" class="addPic" src="@/assets/images/icon_address1.png" alt="">
                  </div>
                  <div class="userInfo" v-for="(item,i) in addressInfo" :key="i" v-if="addressInfo.length!=0 && i==0" @click="acceptAdd">
                     <div>
                        <span>{{item.receiver}}</span>
                        <span>{{item.mobile}}</span>
                        <span class="first" v-if="item.isDefault==1">默认</span>
                     </div>
                     <div>{{item.address}}</div>
                  </div>
                  <div @click="toAddress" v-if="addressInfo.length==0" class="addAddr">
                     添加收货地址
                  </div>
               </div>
               <div class="addImg nextImg">
                  <img style="width: 8px" src="@/assets/images/icon_more2@2x.png" alt="">
               </div>
            </div>
         </div>
         <div class="flatCard outCarint" style="border-top: 1px solid #ededed;margin-top: 0" v-if="titleIndex===2">
            <div class="submitUser">
               <div class="iconInfo">
                  <div class="iconImg">
                     <img class="addPic" src="@/assets/images/icon_address1.png" alt="">
                  </div>
                  <div class="storeInfo" v-for="(item,i) in storeAdd" :key="i">
                     <div>
                        <span>药店地址：</span>
                        <span>{{item.add}}</span>
                     </div>
                     <div>
                        <span>电话：</span>
                        <span>{{item.tel}}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="flatCard outCarint margin5">
            <div>
               <span class="storeName">和平大药房</span>
               <p class="partLine"></p>
               <div v-for="(item,i) in medData" :key="i">
                  <div class="med">
                     <div class="addImg">
                        <img class="medImg" :src=item.img alt="">
                     </div>
                     <div class="medRight">
                        <div class="medInfo">
                           <div>
                              <span style="padding-right: 10px">{{item.medBrand}}</span>
                              <span>{{item.medName}}</span>
                           </div>
                           <span>x{{item.num}}</span>
                        </div>
                        <div class="listData">
                           <span>{{item.weight}}</span>
                           <span class="mu-secondary-text-color">￥{{item.price}}</span>
                        </div>
                     </div>
                  </div>
                  <p class="partLine"></p>
               </div>
               <div class="smallTotal">
                  <span>共{{medData.length}}件药品</span>
                  <span>小计：</span>
                  <span class="mu-secondary-text-color">￥198.00</span>
               </div>
            </div>
         </div>
         <div class="flatCard outCarint margin5">
            <div class="onlinePay">
               <div>
                  <span>绑定社保卡可在线医保支付</span>
                  <span class="mu-secondary-text-color">开通医保支付</span>
               </div>
               <p class="partLine"></p>
            </div>
            <div v-for="(item,i) in priceData" class="onlinePay" :key="i">
               <div v-if="titleIndex==1">
                  <span>{{item.pei}}</span>
                  <span class="mu-secondary-text-color">￥{{item.peiPri}}</span>
               </div>
               <p class="partLine" v-if="i!=priceData.length-1 && titleIndex==1"></p>
               <div v-if="titleIndex==2 && i!==0">
                  <span>{{item.pei}}</span>
                  <span class="mu-secondary-text-color">￥{{item.peiPri}}</span>
               </div>
               <p class="partLine" v-if="i!=priceData.length-1 && i!==0 &&titleIndex==2"></p>
            </div>
         </div>
         <!--<div class="bButton addbTN">-->
         <!--<div class="grayButton">-->
         <!--<span>应付金额￥198.00</span>-->
         <!--</div>-->
         <!--<div class="blueButton" @click="isCashierhow = !isCashierhow">-->
         <!--<span >{{ isCashierhow ? '' : '提交订单' }}</span>-->
         <!--</div>-->
         <!--</div>-->
         <div style="height: 70px;"></div>
         <div class="addbTN" style="padding: 0 15px;background-color: #fff">
            <span>
               <span>应付金额 </span>
               <span class="payMoney mu-secondary-text-color">￥198.00</span>
            </span>
            <span class="orderSubmit" @click="isCashierhow = !isCashierhow">{{ isCashierhow ? '' : '提交订单' }}</span>
         </div>
         <md-cashier ref="cashier" v-model="isCashierhow" :channels="cashierChannels" :channel-limit="2" :payment-amount="cashierAmount" @select="onCashierSelect" @pay="onCashierPay" @cancel="onCashierCancel" :default-index=0></md-cashier>
      </div>
   </div>
</template>
<script type="text/babel">
let add_list_url = "/app/shippingAddress/addressList";
let recipe_getDetails_url = "/app/recipe/getDetails ";
export default {
   data() {
      return {

         changeTitle: [
            { title: '配送到家', type: 1 },
            { title: '门店自提', type: 2 },
         ],
         titleIndex: this.$route.query.titleIndex,
         medData: [
            { img: require("@/assets/images/pic.png"), medBrand: "万爽力", medName: "盐酸曲美他嗪片", weight: "20mgx30片", num: "1", price: "66.00" },
            { img: require("@/assets/images/pic.png"), medBrand: "万爽力", medName: "999感冒灵", weight: "20mgx30片", num: "1", price: "66.00" },
            { img: require("@/assets/images/pic.png"), medBrand: "万爽力", medName: "肠炎宁", weight: "20mgx30片", num: "1", price: "66.00" },
         ],
         priceData: [
            { pei: "配送费", peiPri: "0.00" },
            { pei: "药品总金额", peiPri: "198.00" },
            { pei: "医保可支付", peiPri: "0.00" }
         ],
         isCashierhow: false,
         isCashierCaptcha: false,
         cashierResult: 'success',
         cashierAmount: '199.00',
         cashierChannels: [
            {
               icon: 'cashier-icon-2',
               text: '支付宝支付',
               value: '002',
            },
            {
               icon: 'cashier-icon-3',
               text: '微信支付',
               value: '003',
            },
         ],
         addIndex: "0",
         addressInfo: [],
         storeAdd: [{ add: "重庆市渝北88号（和平大药房）", tel: "023-52242565" }]
      };
   },
   created() {

   },

   mounted() {
      if (this.$route.query.receiver) {
         this.addIndex = this.$route.query.params;
         this.addressInfo.splice(0, 1);
         this.addressInfo.push(this.$route.query);
      } else {
         this.acceptAddFun();
      }
      this.detailInfo();
      document.title = '提交订单';
   },
   methods: {
      detailInfo() {
         this.detailInfoId = this.$route.query.id;
         console.log(this.detailInfoId)

         this.$axios.put(recipe_getDetails_url, { recipeId: this.detailInfoId }, {
         }).then(res => {
            if (res.data.code == '200') {
               console.log(res.data.data)
               // this.loadingtrue = false;
               // this.recipeData.push(res.data.data.recipe);
               // this.detailData=res.data.data.details;
               // console.log(this.recipeData);
               // console.log(this.detailData);
            }
         }).catch(function (err) {
            console.log(err);
         });
      },
      acceptAddFun() {
         this.$axios.put(add_list_url, {}).then((res) => {
            this.loadingtrue = false;
            if (res.data.code == '200') {
               this.addressInfo = res.data.rows;
            } else {
               console.log(res.msg);
            }
         }).catch(function (err) {
            console.log(err);
         });
      },
      
      doPay() {
         if (this.isCashierCaptcha) {
            this.cashier.next('captcha', {
               text: 'Verification code sent to 156 **** 8965',
               brief: 'The latest verification code is still valid',
               autoCountdown: false,
               countNormalText: 'Send Verification code',
               countActiveText: 'Retransmission after {$1}s',
               onSend: countdown => {
                  console.log('[Mand Mobile] Send Captcha');
                  this.sendCaptcha().then(() => {
                     countdown()
                  })
               },
               onSubmit: code => {
                  console.log(`[Mand Mobile] Send Submit ${code}`);
                  this.checkCaptcha(code).then(res => {
                     if (res) {
                        this.createPay().then(() => {
                           this.cashier.next(this.cashierResult)
                        })
                     }
                  })
               },
            })
         } else {
            this.createPay().then(() => {
               this.cashier.next(this.cashierResult, {
                  buttonText: '好的',
                  handler: () => {
                     this.isCashierhow = false;
                     //this.$toast.info(`${this.cashierResult}点击`)
                     let argu = {};
                     this.$router.push({
                        name: 'inspectSuccess',
                        query: argu
                     });
                  },
               })
            })
         }
      },
      createPay() {
         this.cashier.next('loading');
         return new Promise(resolve => {
            this.timer = setTimeout(() => {
               resolve()
            }, 3000)
         })
      },
      sendCaptcha() {
         return new Promise(resolve => {
            this.timer = setTimeout(() => {
               resolve()
            }, 200)
         })
      },
      checkCaptcha(code) {
         return new Promise(resolve => {
            this.timer = setTimeout(() => {
               resolve(!!code)
            }, 200)
         })
      },
      onCashierSelect(item) {
         console.log(`[Mand Mobile] Select ${JSON.stringify(item)}`);
         this.$store.commit('payWayFun', item);
      },
      onCashierPay(item) {
         console.log(`[Mand Mobile] Pay ${JSON.stringify(item)}`);
         this.doPay()
      },
      onCashierCancel() {
         this.timer && clearTimeout(this.timer)
      },
      acceptAdd() {
         let argu = { checked: this.addIndex };
         this.$router.push({
            name: 'adress',
            query: argu
         });
      },
      toAddress() {
         let argu = { addadress: 1 };
         this.$router.push({
            name: 'adressinfo',
            query: argu
         });
      }
   },
   computed: {
      cashier() {
         return this.$refs.cashier
      },
   },

};
</script>
<style   scoped>
@import "../../submitOrder/submitOrder.css";
</style>