<template>
  <div class="suggestion">
    <Header post-title="意见收集"></Header>
    <div class="margin55">
      <div class="container">
        <div class="box1">
          为了提高服务水平及质量，为患者提供更加优质、高效、便捷、舒适的服务，请将您的意见或建议反馈给我们！
        </div>
      </div>
      <div class="tarea">
          <div class="box2">
          <p>您的意见或建议</p>
          </div>
          <textarea maxlength="200" v-model="suggestion" placeholder="请输入您的意见或建议以便于我们提供更好的服务"></textarea>
      </div>
      <div class="bt">
        <md-button type="primary" round @click="submit()" :inactive='isSubmit'>提交</md-button>
      </div>
    </div>
  </div>
</template>

<script  >
import { mapState } from "vuex";

let updateContent = "/bizFeedback/update";

export default {
  data() {
    return {
      suggestion:'',
      isSubmit:false,
    };
  },
  methods: {
    submit(){
      this.isSubmit = true;
      // if(!this.suggestion || this.suggestion.replace(/(^\s*)|(\s*$)/g, "").length < this.suggestion.length){
      if(!this.suggestion){
        this.$toast.info('请输入您的意见');
      }else{
        this.$axios.post(updateContent, {
          content: this.suggestion
        }).then((res) => {
          if (res.data.code == '200') {
              this.$toast.info('提交成功');
              this.isSubmit = false;
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
.container {
  width: 100%;
  height: 150px;
  margin-top: 5px;
  display: flex;
  line-height: 50px;
  justify-content: space-between;
  flex-wrap: wrap;
}
.box1{
  width: auto;
  height: 100px;
  color: var(--primary);
  margin: 20px;
}
.box2{
  background: white;
  font-size: 32px;
  color: var(--primary--title);
  width: 100%;
  line-height: 50px;
  padding: 20px;
  border-bottom: 1px solid var(--primary--line);
}
.tarea{
  background: white;
}
.tarea textarea{
  margin: 20px;
  width: 700px;
  height: 200px;
}
.bt{
  margin-top: 309px;
}
</style>