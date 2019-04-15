<template>
   <div class="container  margin55">
      <Header post-title="新闻动态"></Header>
      <div class="mui-card">
         <div class="mui-card-header mui-card-media">
            <img src="@/assets/images/bg.png" alt="" style="height:40vw;width:100%"></div>
         <div class="mui-card-content">
            <div class="mui-card-content-inner">
               <p>Posted on January 18, 2016</p>
               <p style="color: #333;">这里显示文章摘要，让读者对文章内容有个粗略的概念这里显示文章摘要，让读者对文章内容有个粗略的概念...</p>
            </div>
         </div>
         <div class="mui-card-footer">
            <a class="mui-card-link">Like</a>
            <a class="mui-card-link">Read more</a>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {

      };
   },
   created() {

   },
   mounted() {

   },
   methods: {




   },

};
</script>

<style>
.mui-card {
  font-size: 14px;
  position: relative;
  overflow: hidden;
  margin: 10px;
  border-radius: 2px;
  background-color: #fff;
  background-clip: padding-box;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.mui-card-header.mui-card-media {
  display: block;
  padding: 10px;
}
.mui-card-media {
  vertical-align: bottom;
  color: #fff;
  background-position: center;
  background-size: cover;
}
.mui-card-content {
  font-size: 14px;
  position: relative;
}
.mui-card-content-inner {
  position: relative;
  padding: 15px;
}
.mui-card-content-inner p {
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #8f8f94;
}
</style>
