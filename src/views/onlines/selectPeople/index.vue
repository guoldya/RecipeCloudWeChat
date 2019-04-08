<!-- 选择就诊人 -->
<template>
  <div class="select-people">
    <Header post-title="选择就诊人"></Header>
    <ul>
      <li v-for="(item,index) in familyList" :key="index" @click="selectPeople(item)">
        <img src="../images/m.png" alt="">
        <p>{{item.name}}</p>
      </li>

      <!-- <li>
        <img src="../images/w.png" alt="">
        <p>妈妈</p>
      </li>
      <li>
        <img src="../images/m.png" alt="">
        <p>爸爸</p>
      </li> -->
      <!-- <router-link tag="li" to="addPeople">
        <img src="../images/w.png" alt="">
        <p class="addbTN">添加家人</p>
      </router-link> -->
    </ul>
    <router-link tag="li" to="addPeople">
      <!-- <img src="../images/w.png" alt=""> -->
      <p class="addbTN">添加家人</p>
    </router-link>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
let appbdDrugsAlertreadselectMember = "/app/bizPatientCard/read/selectMemberByCard"
export default {
  data() {
    return {
      familyList: '',
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    ...mapActions(["chat/setPatienDetail"]),
    async init() {
      try {
        let res = await this.$axios.put(appbdDrugsAlertreadselectMember, {});
        if (res.data.code != 200) {
          throw Error(res.data.msg);
        }
        this.familyList = res.data.rows;
      } catch (error) {

        console.log(error.message);
      }
    },
    selectPeople(data) {
      this["chat/setPatienDetail"](data);
      this.$router.go(-1);
    },
  }
}
</script>
<style lang="scss" scoped>
.select-people {
  padding: 100px 40px 0;
  background: #f2f2f2;
  height: 100vh;
  overflow: auto;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      display: flex;
      flex-wrap: wrap;
      width: 200px;
      height: 200px;
      background: #fff;
      margin-top: 40px;
      justify-content: center;
      align-content: space-evenly;
      img {
        width: 80px;
        height: 80px;
        border-radius: 40px;
      }
      p {
        width: 100%;
        text-align: center;
      }
      .add {
        color: #4daed7;
      }
    }
  }
}
</style>
