<template>
  <div class="skeleton page">
    <div class="skeleton-nav"></div>
    <div class="skeleton-swiper"></div>
    <ul class="skeleton-tabs">
      <li v-for="i in 8" class="skeleton-tabs-item">
        <span></span>
      </li>
    </ul>
    <div class="skeleton-banner"></div>
    <div v-for="i in 6" class="skeleton-productions"></div>
  </div>
</template>

<style>
.skeleton {
  position: relative;
  height: 100%;
  overflow: hidden;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}
.skeleton-nav {
  height: 90px;
  background: #eee;
  margin-bottom: 30px;
}
.skeleton-swiper {
  height: 320px;
  background: #eee;
  margin-bottom: 30px;
}
.skeleton-tabs {
  list-style: none;
  padding: 0;
  margin: 0 -30px;
  display: flex;
  flex-wrap: wrap;
}
.skeleton-tabs-item {
  width: 25%;
  height: 110px;
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 30px;
}
.skeleton-tabs-item span {
  display: inline-block;
  width: 110px;
  height: 110px;
  border-radius: 110px;
  background: #eee;
}
.skeleton-banner {
  height: 120px;
  background: #eee;
  margin-bottom: 30px;
}
.skeleton-productions {
  height: 40px;
  margin-bottom: 30px;
  background: #eee;
}
</style>
