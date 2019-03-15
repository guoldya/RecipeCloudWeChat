<template>
   <div class="admission">
      <!-- <Header post-title="一日清单"></Header> -->
      <header class="aui-navBar aui-navBar-fixed">
         <a href="javascript:;" class="aui-navBar-item" @click="$router.go(-1)">
            <img src="@/assets/images/icon_back_white.png">
         </a>
         <div class="aui-center">
            <span class="aui-center-title">一日清单</span>
         </div>
         <a href="javascript:;" class="aui-navBar-item">
            <!--{{selectOption}} -->
         </a>
      </header>
      <div class="admissionbg">
         <div class="bigDate">
            <span class="bigDateDay">08</span>
            <span class="bigDateTime">
               <span>星期一</span>
               <span class="week">2019.03</span>
            </span>
         </div>

         <div class="big_date">
            <ul>
               <li>
                  <p>日</p>
                  <p class="aa">16</p>
               </li>
               <li>
                  <p>一</p>
                  <p>18</p>
               </li>
               <li>
                  <p>二</p>
                  <p>19</p>
               </li>
               <li>
                  <p>三</p>
                  <p>06</p>
               </li>
               <li>
                  <p>四</p>
                  <p>16</p>
               </li>
               <li>
                  <p>五</p>
                  <p>16</p>
               </li>
               <li>
                  <p>六</p>
                  <p>16</p>
               </li>
               <li>
                  <p>日</p>
                  <p>16</p>
               </li>
               <li>
                  <p>日</p>
                  <p>22</p>
               </li>
               <li>
                  <p>日</p>
                  <p>16</p>
               </li>
            </ul>

         </div>

      </div>
      <div class="outCarint">
         <div class="card">
            <div class="cardText">
               <p class="cardTextPP">
                  预交款总额
                  <span class="mu-secondary-text-color">￥2000.00</span>
               </p>
               <p class="cardTextPP">
                  未结总费用
                  <span class="mu-secondary-text-color">-￥2000.00</span>
               </p>
               <p class="cardTextPP">
                  剩余款
                  <span class="mu-secondary-text-color">￥2000.00</span>
               </p>

            </div>
         </div>
      </div>
      <div class="outCarint">
         <div class="card">
            <div class="cardText">
               <p class="cardTextPP cardTextTitle">
                  <span>类别</span>
                  <span>项目名</span>
                  <span>数量</span>
                  <span>金额</span>
               </p>
               <p class="cardTextPP">
                  <span>西药费</span>
                  <span>
                     <p>肺力咳合剂</p>
                     <p>肺力咳合剂 </p>
                  </span>
                  <span>
                     <p>1</p>
                     <p>1</p>
                  </span>
                  <span>
                     <p>1</p>
                     <p>1</p>
                  </span>
               </p>
               <p class="cardTextPP">
                  <span>检查费</span>
                  <span>
                     <p>肺力咳合剂</p>
                     <p>肺力咳合剂 </p>
                  </span>
                  <span>
                     <p>1</p>
                     <p>1</p>
                  </span>
                  <span>
                     <p>1</p>
                     <p>1</p>
                  </span>
               </p>
            </div>
         </div>
      </div>
   </div>
</template>
<script type="text/babel">
export default {
   data() {
      return {

      };
   },
   created() {
   },
   mounted() {
      document.title = '一日清单';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
      } else {
         this.isWeixin = true;
      }
   },
   methods: {


   },
   computed: {

   },

};
</script>
 <style scoped>
@import "../../submitOrder/submitOrder.css";
.admissionbg {
  /* background: #57d0f4;
  background: #42a3fb; */
  /* height: 400px; */
  background: -moz-linear-gradient(#57d0f4 20%, #42a3fb 90%);
  background: -webkit-linear-gradient(#57d0f4 20%, #42a3fb 90%);
  background: -o-linear-gradient(#57d0f4 20%, #42a3fb 90%);
  background: -ms-linear-gradient(#57d0f4 20%, #42a3fb 90%);
  background: linear-gradient(#57d0f4 20%, #42a3fb 90%);
}
.admission header {
  background: transparent;
}
.admission header .aui-center-title {
  color: #ffffff;
}
.admission .bigDate {
  padding: 100px 44px 0;
  display: flex;
  display: -webkit-flex;
  text-align: left;
  -webkit-box-align: left;
}
.admission .bigDate .bigDateDay {
  font-size: 124px;
  color: #ffffff;
  font-weight: 600;
  font-family: cursive;
}
.admission .bigDate .bigDateTime {
  font-size: 34px;
  color: #ffffff;
  margin-left: 30px;
  letter-spacing: 1px;
  height: 100px;
  margin-top: 17px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.admission .big_date {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  background: transparent;
  margin-top: 10px;
  padding: 0 10px 20px;
}
.big_date li p:last-child {
  line-height: 65px;
  letter-spacing: 1px;
  margin-top: 20px;
}
.big_date .aa {
  display: inline-block;
  width: 65px;
  height: 65px;
  background: #ffffff;
  color: #42a3fb;
  border-radius: 100%;
  box-sizing: border-box;
}

.admission .big_date ul li {
  display: inline-block;
  width: 14.2%;
  text-align: center;
  color: #ffffff;
}
.admission .card {
  margin-top: 30px;
}
.admission .cardText .cardTextPP {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  font-size: 0.28rem;
  border-bottom: 0.01rem solid #e9e9e9;
}
.admission .cardText .cardTextPP:last-child {
  border: none;
}
.admission .cardText .cardTextTitle {
  font-weight: 600;
}
</style>