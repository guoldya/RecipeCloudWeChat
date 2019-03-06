<template>
   <div class="outCarint margin45 ">
      <div class="pgwModalWrapper" v-show="showPgwModal" @click="closePgmodal"></div>
      <div id="pgwModal" class="confirm" v-show="showPgwModal">
         <div class="pm-container">
            <div class="pm-body active transition" style="max-width: 85%; margin-top: 75px; margin-left: 7.5%">
               <div class="pm-title"></div>
               <div class="pm-content cntr">
                  <div class="g-msg">
                     <p class="g-msg-title">病案复印规定</p>
                     <div class="book-rules">
                        <pre> 
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
         showPgwModal: true,
      };
   },
   methods: {
      closePgmodal() {
         this.showPgwModal = false;
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