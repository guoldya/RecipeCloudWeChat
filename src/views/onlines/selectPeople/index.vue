<!-- 选择就诊人 -->
<template>
  <div class="select-people">
    <Header post-title="选择就诊人"></Header>
    <ul v-show="!loadingtrue&&cardlist.length!=0">
      <li v-for="(item,index) in cardlist" :key="index" @click="selectPeople(item)">
        <img src="../images/m.png" alt="">
        <p>{{item.patientName}}</p>
      </li>
      <p v-show="!loadingtrue&&cardlist.length==0" class="noCardText">暂无就诊卡</p>
      <Loading v-show="loadingtrue"></Loading>
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
    <p class="warnbot">
      您累计可注册5张电子就诊卡，如已办理实体就诊卡，可在注册时进行绑定
      <span class="warnbottom" @click="cardneed" style="text-align:center;line-height:30px;color:#f44336">
        电子就诊卡需知</span>
    </p>
    <div  v-show="cardlist.length<5">
      <div style="height: 50px" ></div>
      <p  @click="blidcard" class="addbTN">添加电子就诊卡</p>
    </div>

    <md-dialog title="系统信息" :mask-closable="true" :closable="false" layout="column" v-model="actDialog.open" :btns="actDialog.btns">
      是否已有就诊卡？绑定已有就诊卡，将会关联该就诊卡的就医档案。
    </md-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
let appbdDrugsAlertreadselectMember = "/app/bizPatientCard/read/selectMemberByCard"
export default {
  data() {
    return {
      familyList: '',
      loadingtrue: true,
      actDialog: {
        open: false,
        btns: [
          {
            text: '取消',
            handler: this.onActConfirm,
          },
          {
            text: '已有',
            handler: this.onActConfirm3,
          },
          {
            text: '没有',
            handler: this.onActConfirm2,
          },]
      }

    }
  },
  computed: {
    ...mapState({
      cardlist: state => state.home.cardList,
    }),
  },
  async created() {
    await this.$store.dispatch('getCards'/* , { update: true } */);
    this.loadingtrue = false;
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
    onActConfirm() {
      // Toast({
      //    content: '你点击了确认',
      // })
      this.actDialog.open = false
    },
    onActConfirm2() {
      this.actDialog.open = false;
      this.$router.push({
        name: 'cardwrite',
      });
    },
    onActConfirm3() {
      this.actDialog.open = false;
      this.$router.push({
        name: 'cardblind',
      });
    },
    blidcard() {
      this.actDialog.open = true
    },

    cardneed() {
      this.$router.push({
        name: 'cardneed',
      });
    },
    selectPeople(data) {
      console.log("birthday："+data)
      if(data.birthday) {
        data.age = this.getAge(data.birthday);
        data.put("age",this.getAge(data.birthday));
        // JSON.parse(data).age = this.getAge(data.birthday);
      }
      this["chat/setPatienDetail"](data);
      // console.log("pe:"+JSON.stringify(data))
      this.$router.go(-1);
    },
    getAge(value) {
      // if (value) return
      if (!value.split(" ")) return
      var strBirthdayArr = value.split(" ");
      var strBirthdayArr = strBirthdayArr[0].split("-");
      var birthYear = strBirthdayArr[0];
      var birthMonth = strBirthdayArr[1];
      var birthDay = strBirthdayArr[2];

      var d = new Date();
      var nowYear = d.getFullYear();
      var nowMonth = d.getMonth() + 1;
      var nowDay = d.getDate();

      if (nowYear == birthYear) {
        value = 0;//同年 则为0岁
      }
      else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
          if (nowMonth == birthMonth) {
            var dayDiff = nowDay - birthDay;//日之差
            if (dayDiff < 0) {
              value = ageDiff - 1;
            }
            else {
              value = ageDiff;
            }
          }
          else {
            var monthDiff = nowMonth - birthMonth;//月之差
            if (monthDiff < 0) {
              value = ageDiff - 1;
            }
            else {
              value = ageDiff;
            }
          }
        }
        else {
          value = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
      }
      // this._patienDetail.age = value;
      console.log(this._patienDetail.age, "岁数")
      return value;//返回周岁年龄
    },
  }
}
</script>
<style lang="scss" scoped>
.warnbot {
  line-height: 50px;
  font-size: 28px;
  margin-top: 50px;
}

.noCardText {
  line-height: 150px;
  text-align: center;
}
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
