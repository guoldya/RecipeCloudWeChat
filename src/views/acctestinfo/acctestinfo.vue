<template>
  <div class="acctest">
    <Header post-title="账号设置"></Header>
    <div class="margin55">
      <div class="container2">
        <div>昵称</div>
        <div class="box2">
          <input type="text" maxlength="20" v-model="name" placeholder="请输入你要修改的昵称">
        </div>
      </div>
      <div class="bt">
        <md-button type="primary" round @click="submit()">确定修改</md-button>
      </div>
    </div>
  </div>
</template>

<script  >
import { mapState } from "vuex";

let updateAccountName = "/app/bizPatientCard/updateAccount";

export default {
  data() {
    return {
      name:'',
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.home.userInfo
    })
  },
  async mounted() {
    await this.$store.dispatch("getUserInfo");
    this.name = this.userInfo.nickname;
  },
  methods: {
    submit(){
      console.log(this.name);
      if(!this.name || this.name.length == 0 || this.name.indexOf(' ') != -1){
        this.$toast.info('请输入你要修改的昵称');
      }else{
        this.$axios.post(updateAccountName, {
          nickname: this.name
        }).then((res) => {
          if (res.data.code == '200') {
              this.$store.dispatch("getUserInfo", { update: true });
              this.$toast.info('修改成功');
              this.$router.go(-1);
          } else {
            this.$toast.info(res.msg);
          }
        }).catch(function (err) {
          console.log(err);
        });
        }
    }
    
  },
};
</script>
<style   scoped>
.container2 {
  width: 100%;
  height: 101px;
  margin-top: 5px;
  border-bottom: 1px solid var(--primary--line);
  display: flex;
  line-height: 60px;
  justify-content: space-between;
  padding: 20px;
}
.box2 {
  width: auto;
  height: 60px;
  padding-right: 10px;
}
.box2 input{
  text-align: right;
}
.bt{
  margin-top: 109px;
}
</style>