<!-- 选择就诊人 -->
<template>
  <div class="select-people">
    <Header post-title="选择就诊人"></Header>
     <ul>
       <li>
          <img src="../images/m.png" alt="">
          <p>弟弟</p>
       </li>
       <li>
          <img src="../images/w.png" alt="">
          <p>妈妈</p>
       </li>
       <li>
          <img src="../images/m.png" alt="">
          <p>爸爸</p>
       </li>
       <router-link tag="li" to="addPeople">
         <img src="../images/w.png" alt="">
          <p class="add">添加家人</p>
       </router-link>
     </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
.select-people {
  padding:100px 40px 0;
  background: rgb(242,242,242);
  height:100vh;
  overflow:auto;
  ul {
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    li{
      display: flex;
      flex-wrap:wrap;
      width:200px;
      height:200px;
      background:#fff;
      margin-top:40px;
      justify-content: center;
      align-content: space-evenly;
      img {
        width:80px;
        height:80px;
        border-radius: 40px;
      }
      p{
        width: 100%;
        text-align: center;
      }
      .add {
        color:rgb(77, 174, 215);
      }
    }
  }
}
</style>
