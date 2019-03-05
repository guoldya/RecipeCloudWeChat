<template>
  <div class="doctor-list">
    <div class="comment-info">
      <div class="header"><img src="@/assets/images/3.jpg" /></div>
      <div class="comment-right">
        <p class="introduce">
          <span class="name">何某</span>&nbsp; <span>主任医师</span>&nbsp;
          <span>内科</span>&nbsp;
        </p>
        <p class="colo13">
          <span class="picture">图文</span>&nbsp;
          <span class="picture">电话</span>&nbsp;
          <span class="video">视频</span>&nbsp;
          <span class="reputation">好评率 98%</span>&nbsp;
        </p>
        <p class="content">擅长：儿科常见病、多发病 #先天性心脏病</p>
        <p class="colo13">
          <span>咨询数：66 </span>&nbsp; <span>平均回复时长：1小时</span>&nbsp;
        </p>
        <p class="price">￥20 起</p>
        <em>已满</em>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.comment-info em {
  position: absolute;
  top: 0;
  right: 0;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  font-size: 28px;
  font-style: normal;
  color: #fff;
  background: #979797;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
}
.comment-info p {
  line-height: 50px;
}

.comment-info .name {
  font-size: 32px;
}
.comment-info p {
  line-height: 50px;
}

.comment-info .name {
  font-size: 32px;
}

.picture {
  border: 1px solid #24a5f1;
  padding: 1px 10px;
  border-radius: 7px;
  color: #24a5f1;
}

.video {
  border: 1px solid #979797;
  padding: 1px 10px;
  border-radius: 7px;
  color: #979797;
}

.comment-info .price {
  color: #24a5f1;
  font-weight: 500;
  letter-spacing: 1px;
}

.comment-info:last-child {
  border: none;
}
</style>

