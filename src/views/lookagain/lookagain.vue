<template>
   <div class="doctorList">
      <Header post-title="复诊医生"  ></Header>
      <div class="outCarint margin45">
         <ul>
            <li v-for="i in num" :key="i">
               <div class="card margin16" @click="intodoctordetail">
                  <div class="cardText">
                     <div class="headimg"><img src="@/assets/images/user.png" alt="医生头像"></div>
                     <div>
                        <p class="headname">医师
                           <span class="have">余56</span>
                        </p>
                        <p class="headdesc">擅长:儿科、新生儿疾病、急救医学儿科、新生儿疾病、急救医学儿科、新生儿疾病、急救医学</p>
                     </div>
                  </div>
               </div>
            </li>
         </ul>
      </div>
   </div>
</template>
<script type="text/babel">
export default {
   data() {
      return {
         
         num: 1,
      };
   },
   created() {

   },
   mounted() {
      document.title = '复诊医生';
   },
   methods: {
      intodoctordetail() {
         let argu = {}
         this.$router.push({
            name: 'doctordetail',
            query: argu
         });
      },
   },
   computed: {

   },
};
</script>
 <style scoped>
@import "../doctorList/doctorList.css";
</style>