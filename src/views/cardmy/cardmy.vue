<template>
      <div class="cardmy">
            <Header post-title="管理就诊卡" v-show="isWeixin"></Header>
            <div :class="{ 'margin45':isWeixin}">
                  <div class="tiptop">
                        <div class="tiptopwarn">
                              <md-notice-bar>
                                    <md-icon slot="left" class="md-notice-demo-icon md-notice-demo-icon-left" name="security"></md-icon>
                                    您还可以绑定社保卡哦！
                              </md-notice-bar>
                              <span class="tiptopwarnbtn">
                                    开通医保支付
                              </span>
                        </div>
                  </div>
                  <p class="nocard">暂无电子就诊卡</p>
                  <p class="tiptop3">
                        <md-button type="primary" size="small" inline round @click="blidcard">注册电子就诊卡</md-button>
                  </p>
                  <div class="outCarint outCarintwarnbottom">
                        <p class="warnbottitle">温馨提示：</p>
                        <p class="warnbot">
                              您累计可注册5张电子就诊卡，如已办理实体就诊卡，可在注册时进行绑定
                        </p>
                        <p class="warnbottom" @click="cardneed">
                              电子就诊卡需知</p>
                  </div>

                  <md-dialog title="系统信息" :mask-closable="true" :closable="false" layout="column" v-model="actDialog.open" :btns="actDialog.btns">
                        是否已有就诊卡？绑定已有就诊卡，将会关联该就诊卡的就医档案。
                  </md-dialog>
            </div>
      </div>
</template>
<script type="text/babel">
import { Dialog, Button, Toast } from 'mand-mobile'
export default {
      data() {
            return {
                  isWeixin: false,
                  actDialog: {
                        open: false,
                        btns: [
                              {
                                    text: '没有',
                                    type: 'danger',
                                    handler: this.onActConfirm2,
                              },
                              {
                                    text: '已有',
                                    type: 'danger',
                                    handler: this.onActConfirm3,
                              },
                              {
                                    text: '取消',
                                    type: 'danger',
                                    handler: this.onActConfirm,
                              },
                        ],
                  },
            };
      },
      created() {

      },
      mounted() {
            document.title = '管理就诊卡';
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
            cardneed() {
                  this.$router.push({
                        name: 'cardneed',
                  });
            },
            blidcard() {
                  this.actDialog.open = true
            },
            onActConfirm() {
                  Toast({
                        content: '你点击了确认',
                  })
                  this.actDialog.open = false
            },
            onActConfirm2() {
                  this.actDialog.open = false;
                  this.$router.push({
                        name: 'cardwrite',
                  });
            },
            onActConfirm3() {
                  this.actDialog.open = false;
                  this.$router.push({
                        name: 'cardblind',
                  });
            },
            // blidcard() {
            //    let argu = {}
            //    this.$router.push({
            //       name: 'blidcard',
            //       query: argu
            //    });
            // },
      },
      computed: {

      },

};
</script>
 <style scoped>
@import url("./cardmy.css");
</style>