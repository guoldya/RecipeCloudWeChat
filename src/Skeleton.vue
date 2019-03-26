<template>
  <div class="skeleton page">
    <div class="skeleton-nav"></div>
    <div v-for="i in 6" class="skeleton-banner" :key="i">
      <div class="header"> </div>
      <div class="comment-right">
        <p class="skeleton-content"> </p>
        <p class="skeleton-content"> </p>
        <p class="skeleton-content"> </p>
        <p class="skeleton-content"> </p>
      </div>
    </div>
  </div>
</template>

<style>
.skeleton .skeleton-banner {
  /* height: 300px; */
  margin-bottom: 100px;
  background: #ffffff;
}
.skeleton-banner .header {
  width: 98px;
  height: 98px;
  position: absolute;
  background: #f0f3fa;
  border-radius: 98px;
}
.skeleton-banner .comment-right {
  padding: 10px 0px 30px 108px;
}
.skeleton-content {
  height: 42px;
  background: #f0f3fa;
  margin-top: 5px;
}
</style>
