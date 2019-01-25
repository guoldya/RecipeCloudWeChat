<template>
   <div class=" ">
      <Title post-title="在线沟通"> </Title>
      <div class="sort_box ">
         <div class="sort_list" v-for="(item,index) in 10" :key="index" @click="moreillegal">
            <div class="num_logo">
               <img src="@/assets/images/user.png" alt="">
            </div>
            <div class="num_name">张三</div>
         </div>
      </div>
      <Footer></Footer>
   </div>
</template>
<script>
export default {
   methods: {
      moreillegal: function () {
         this.$router.push({
            name: 'inlineinfo',
         });
      },
   }
}
</script>

<style scoped>
.sort_box {
  width: 100%;
  padding-top: 102px;
  overflow: hidden;
  margin-bottom: 302px;
}

.sort_list {
  padding: 20px 120px 20px 160px;
  position: relative;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ddd;
}

.sort_list .num_logo {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  overflow: hidden;
  position: absolute;
  top: 10px;
  left: 40px;
}

.sort_list .num_logo img {
  width: 100px;
  height: 100px;
}

.sort_list .num_name {
  color: #000;
}

.sort_letter {
  height: 60px;
  line-height: 60px;
  padding-left:40px;
  color: #787878;
  font-size: 28px;
  border-bottom: 1px solid #ddd;
}

.initials {
  position: fixed;
  top: 94px;
  right: 0px;
  height: 100%;
  width: 30px;
  padding-right: 20px;
  text-align: center;
  font-size: 24px;
  z-index: 99;
  background: rgba(145, 145, 145, 0);
}

.initials li img {
  width: 28px;
}
</style>
