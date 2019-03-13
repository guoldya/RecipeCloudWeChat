<template>
  <div class="outCarint margin45 ">
    <div class="pgwModalWrapper" v-show="showPgwModal"></div>
    <div id="pgwModal" @click="closePgmodal" class="confirm" v-show="showPgwModal">
      <div class="pm-container">
        <div class="pm-body active transition" style="max-width: 85%; margin-top: 75px; margin-left: 7.5%">
          <div class="pm-title"></div>
          <div class="pm-content cntr">
            <div class="g-msg">
              <p class="g-msg-title">病案复印规定</p>
              <div class="book-rules">
                <pre v-show="istype==1"> 
 尊敬的患者和家属:
     首先，感谢您对我院的信任并前来就医，为了满足广大患者复印住院病历的需求，解决在以往复印住院病历过程中排队拥挤、填表缴费等候时间较长等不便问题，更好地为您提供高效、精确、满意的服务，我们开展通过关注微信公众号-办理预约病案打印和邮寄业务，以下是您需要注意的几点:
 
   一、预约复印病历必须知道患者姓名和住院号;凡死亡病例，必须到医院的人工窗口进行打印。

   二、预约复印步骤分为三步，分别是填写病历信息、填写申请单信息和上传证件照;提交申请后我院工作人员会尽快审核并通过微信端即时推送消息。
                       
   三、申请病历复印时请提供真实有效的身份信息，所需的材料分别为:
   1.申请人为患者本人的，提供患者有效身份证明(不可缺少) ;
   2.申请人为新生儿的，提供医院出生证明、监护人的有效身份证明(两项缺一不可) ;  若提供身份证明真实性有异，系统有权拒绝提供服务,且在病历邮寄过程中出现的差错与系统无关;

   四、可复印的内容包括:门(急)诊病历和住院病历中的首页、出院记录、入院记录、体温单、医嘱单、手术同意书、麻醉同意书、麻醉记录、手术记录、病重(病危)患者护理记录、输血治疗知情同意书、特殊检查(特殊治疗) 同意书、病理报告、检验报告等辅助检查报告单、医学影像检查资料等病历资料。

   五、收费问题:凡申请邮寄的病历均通过微信支付复印费用，快递费用到付，超过24小时未支付的申请单自动取消;自提的病历到现场复印时再核算金额
                        </pre>
                <pre v-show="istype==2"> 
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
            <p @click="closePgmodal">
              <span class="dob">我已了解，关闭</span>
            </p>
          </div>
        </div>
      </div>
    </div>

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
  props: ['showPgw'],
  created() {
  },
  methods: {
    closePgmodal() {
      this.showPgwModal = false;
    },
    openPgmodel() {
      this.showPgwModal = true;
    }
  }
};
</script>
 <style scoped>
.pm-content {
  border-radius: 12px;
  background: #fff;
  color: #83889a;
  padding: 0;
  font-size: 28px;
}
.pm-container {
  text-align: center;
  z-index: 9020;
}
.g-msg {
  padding: 40px;
  text-align: center;
  font-size: 28px;
  max-height: 750px;
  overflow-y: scroll;
}
.book-rules pre {
  margin-top: 10px;
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
  color: #1da1f3;
  letter-spacing: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
#pgwModalWrapper {
  background: #000;
  opacity: 0.5;
  filter: alpha(opacity=50);
  width: 100%;
  height: 100%;
  z-index: 9000;
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
  line-height: 47px;
  text-align: justify;
  white-space: pre-wrap;
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
  color: #333333;
}
.g-msg-title:before {
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
}
</style>