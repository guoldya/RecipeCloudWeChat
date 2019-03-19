 
<template>
   <div class="workdotorinfo">
      <Header post-title="医生详情"  ></Header>
      <div :class="{ 'margin45':isWeixin,  }">
         <div class="doctor-head">
            <div class="outCarint">
               <div class="doctor-img float-left">
                  <img :src="img" alt="医生图片">
               </div>
               <div class="doctor-inro float-left">
                  <div class="doctor-decrib">
                     <p>
                        <span class="doctor-name">付平 </span>
                        <span class="doctor-tag">主任医师</span>
                     </p>
                     <p class="school">演示医院</p>
                     <p class="school">特需医疗中心</p>
                  </div>
               </div>
               <div class="heart float-right">
                  <span class="deta">预约</span>
               </div>
            </div>
         </div>
         <div class="source-tab-line"></div>
         <div class="source-tab">
            <div class="available float-left" :class="isActive?'active-tab':''" @click="tabChange(1)">
               <span>门诊排班</span>
            </div>
            <div class="all-source float-right" :class="isActive?'':'active-tab'" @click="tabChange(2)">
               <span>医生简介</span>
            </div>
         </div>
         <div v-if="isActive">
            <div class="outCarint">
               <ul class="available-info">
                  <li>
                     <div>2018-12-25 星期二 上午 华西院区<br/>医疗主治：肾脏内科</div>
                     <div class="available-tag">已满</div>
                  </li>
                  <li>
                     <div>2018-12-25 星期二 上午 华西院区<br/>医疗主治：肾脏内科</div>
                     <div class="available-tag">已满</div>
                  </li>
                  <li>
                     <div>2018-12-25 星期二 上午 华西院区<br/>医疗主治：肾脏内科</div>
                     <div class="available-tag">已满</div>
                  </li>
                  <li>
                     <div>2018-12-25 星期二 上午 华西院区<br/>医疗主治：肾脏内科</div>
                     <div class="available-tag">已满</div>
                  </li>
                  <li>
                     <div>2018-12-25 星期二 上午 华西院区<br/>医疗主治：肾脏内科</div>
                     <div class="available-tag available-have">余12</div>
                  </li>
                  <li>
                     <div>2018-12-25 星期二 上午 华西院区<br/>医疗主治：肾脏内科</div>
                     <div class="available-tag">已满</div>
                  </li>
               </ul>
            </div>
         </div>
         <div v-else>
            <div class="outCarint">
               <div class="doctor-skill">
                  <div class="skill-head">
                     <span class="skill-head-title">专业擅长</span>
                  </div>
               </div>
               <div>
                  <div class="doctor-info">付平，男，1967年生，医学博士，教授、博士，发地方噶十多个山东分公司</div>
                  双方的公司发的两个教室里发动机盖分类登记过类似的飞机过来送积分代理公司东方辅导老师国家历史的房价高了三季度发了个是独立发几个楼上的房间管理卡士大夫
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import img from '@/assets/images/3.jpg';
import start from '@/assets/images/icon_star@2x.png'

export default {
   data() {
      return {
         isWeixin: false,
         img,
         start,
         collapsed: false,
         isActive: true,
      }
   },
   mounted() {
      document.title = '医生详情';
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
      toggleClick() {
         this.collapsed = !this.collapsed
      },
      tabChange(val) {
         if (val == 1) {
            this.isActive = true
         } else {
            this.isActive = false
         }
      }
   }
}
</script>
<style scoped>
@import url("./workdotorinfo.css");
</style>