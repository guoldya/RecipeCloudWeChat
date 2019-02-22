<template>
   <div :class="{'outCarint':true,'margin45':isWeixin}">
      <Header post-title="解除绑定" v-show="isWeixin"></Header>

      <p>
         <md-icon name="warn-color" size="lg" color="orange" svg style="position:relative;top:5px; "></md-icon>
         <span style="margin-left:10px;color:red">绑定3个月以上才可以解绑一次</span>
      </p>
      <div class="card margin16">
         <div class="cardText login-box">
            <div class="content">
               <div class="login-box">
                  <div class="login-box-div">
                     <span class="flexF">姓名</span>
                     <input class="flexF" type="text" name="username" placeholder="姓名" :value="name" maxlength="11">
                  </div>
                  <div class="login-box-div">
                     <span class="flexF">电子就诊卡号</span>
                     <input class="flexF" type="text" name="cardNo" placeholder="电子就诊卡号" :value="cardNo">
                  </div>
                  <div class="login-box-div">
                     <span class="flexF">登记号</span>
                     <input type="text" class="infos flexF" name="yanz" placeholder="登记号" :value="registerNo" maxlength="4" />
                  </div>

               </div>
            </div>
         </div>
      </div>
      <div class="card margin16">
         <div class="cardText login-box">
            <div class="content">
               <div class="login-box">
                  <div class="login-box-div">
                     <span class="flexF">手机号码</span>
                     <input type="text" class="infos flexF" name="yanz" :value="phone" placeholder="手机号码" maxlength="4" />
                  </div>
                  <div class="login-box-div">
                     <span class="flexF">身份证号</span>
                     <input class="flexF" type="text" name="username" placeholder="身份证号" :value="idCard" maxlength="11">
                  </div>

                  <div class="login-box-div">
                     <span class="flexF">绑卡时间</span>
                     <input type="text" class="infos flexF" name="yanz" placeholder="绑卡时间" :value="unblindTime" maxlength="4" />
                  </div>
               </div>
            </div>
         </div>
      </div>

      <md-button type="primary" round class="margin16" @click="unBlind">解除绑定</md-button>

   </div>
</template>
<script type="text/babel">
export default {
   data() {
      return {
         isWeixin: false,
         name: '',
         cardNo: '',
         registerNo: '',
         idCard: '',
         unblindTime: '',
         phone: '',


      };
   },
   created() {

   },
   mounted() {

      document.title = '解除绑定';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
      } else {
         this.isWeixin = true;
      }


   },
   methods: {
      onBasicConfirm() {
         Toast({
            content: '你点击了确认',
         })
         this.basicDialog.open = false
      },
      onBasicCancel() {
         Toast({
            content: '你点击了取消',
         })
         this.basicDialog.open = false
      },

      unBlind() {

         this.$dialog.confirm({
            title: '提示',
            content: '确定解除绑定吗!',
            confirmText: '确定',
            cancelText: '取消',
            onConfirm: () => {
              $router.go(-1)
            },
         });
      }
   },
   computed: {

   },

};
</script>
 <style scoped>
@import url("../cardwrite/cardwrite.css");
</style>