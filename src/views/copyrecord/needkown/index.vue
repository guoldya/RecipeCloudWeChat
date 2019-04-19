<template>
  <div class="outCarint margin55 ">
    <Header post-title="病案复印规定"></Header>
    <div class="confirm">
      <div>
        <div class="pm-body active transition">
          <div class="pm-content cntr">
            <div>
              <div class="book-rules">
                <pre> 
   在使用病案之前，请您仔细阅读本协议，如果您对协议有任何疑问，可向客服咨询。如果您同意接受本协议和条件的约束，使用本平台进行病历复印及快递邮寄服务,我们视为您对协议内容已经了解清楚。
具体内容如下:
一、复印收费标准:
   复印收费际准安医院公开标准收取:
   我们收取一元服务费用于支付平台网络服务费、硬件租赁费及维护成本等。

二、快递收费标准:
   EMS: 22元，如超f按照中国邮政速递标准进行续重收费，邮奇时效性问题的最终解释权归邮政速递
   顺丰:按照顺丰计费标准收费，邮奇时效性问题的最终解释权归顺丰速运

三、退款说明:
   1.后付费模式不能申请退款;
   2、预付费模式在申请审核通过前退款将退还除平台服务费外全部款项;
   院方复印核算之后预付款不足的情况下取消订单不会退换巳缴款项;预付款结余款项格在院方复印核算之后进行退款。
四、提供材料:
   申请人为患者本人的，需提供患者住院号、患者有效身份证明(包括但不限于身份证)。
   申请人为代理人的，需提供患者住院号。患者及代理人的有效身份证明(包括但不限于身份证)、代理人与患者代理关系的法定证明材料、授权委托书。
   患者为不具有身份证的未成年(含新生儿)需提供医院出生证明，户口簿户主页与患者页、监护人有效身份证明，且只能监护人发起申请。
若提供身份证明真实性有异， 我们有权拒绝服务，且在病历复印邮寄过程中出现的差错与我们无关。
   所有上传的证件信息将使用加密。限权。水印等方式进行保护，院方根;据您提交的信息申核预约复印申请单。
五、提供复印内容:
   根据中华人民共和国国务院令第701号《医疗纠纷预防和处理条例》第十六条规定:“患者有权查阅、复制其门诊病历、住院志、体温单、医嘱单、化验单(检验报告)、医学影像检查资料、特殊检查同意书、手术同意书、手术及麻醉记录、病理资料、护理记录、医疗费用以及国务院卫生主管部门规定的其他属于病历的全部资料。”
 
   具体可复印内容以医院规定为准。
 </pre>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <p class="addbTN" @click="next">
      <span class="dob">下一步</span>
    </p>
  </div>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      showPgwModal: false,
      istype: 1,
    };
  },
  mounted() {
     this.$store.commit('chooseInfoFun', ""); 
  
  },

  methods: {

    next() {
      this.$router.push({
        name: 'chooseCase',
        // query: { mail: this.mail }
      });
    }
  }
};
</script>
 <style scoped>
.pm-container {
  text-align: center;
  z-index: 9020;
}
.g-msg {
  padding: 0 40px 10px;
  text-align: center;
  font-size: 28px;
  max-height: 750px;
  overflow-y: scroll;
}
.book-rules pre {
  /* margin-top: 10px; */
  text-align: justify;
  white-space: pre-wrap;
}

.pm-content .dob {
  display: block;
  -webkit-box-flex: 1;
  box-flex: 1;
  text-align: center;
  line-height: 100px;
  font-size: 32px;
  color: var(--primary);
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}

.pgwModalWrapper {
  background: #000;
  opacity: 0.5;
  filter: alpha(opacity=50);
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.pgwModalWrapper {
  position: fixed;
  top: 0;
  left: 0;
}
.pgwModal {
  z-index: 9999;
}
.g-msg {
  border-bottom: 2px solid #eee;
}
.book-rules pre {
  line-height: 40px;
  text-align: justify;
  white-space: pre-wrap;
  font-size: 28px;
  color: var(--primary--content);
  font-family: "PingFang-SC-Medium";
}

#pgwModal {
  right: 0;
  bottom: 0;
  z-index: 9010;
  overflow-x: auto;
  overflow-y: hidden;
  word-break: break-all;
}

#pgwModal {
  position: fixed;
  top: 0;
  left: 0;
}
#pgwModal .pm-container {
  text-align: center;
}

.g-msg-title {
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 32px;
  color: var(--primary--title);
  border-bottom: 1px solid var(--primary--line);
}
/* .g-msg-title:before {
  left: 50%;
  margin-left: -300px;
}
.g-msg-title:after {
  right: 50%;
  margin-right: -300px;
}

.g-msg-title:after,
.g-msg-title:before {
  content: "";
  position: absolute;
  top: 22px;
  width: 194px;
  height: 2px;
  background-color: #92cef3;
} */
</style>