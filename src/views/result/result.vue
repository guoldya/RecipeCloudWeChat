<template>
  <div class="result">
    <Header post-title="搜索" v-show="isWeixin"></Header>
    <div :class="{'outCarint':true,'margin45':isWeixin,'margin7':!isWeixin}">
      <div style="text-align:center;">
        <input v-model="value" placeholder="搜索医生、科室" class="oc_val" @input="loadMorelist(value)">
      </div>
      <div class="mu-sub-header margin16">科室</div>
      <md-cell-item v-for="(item2,index2) in departData" :title="item2.name" arrow @click="intodoctorList(item2.name)" :key="'AAA'+index2" />
      <div class="mu-sub-header margin16">医生</div>
      <md-cell-item v-for="(item,index) in test3" :key="index+'aa'" :title="item.name" :brief="item.good" arrow>
        <span class="holder" slot="left"><img src="@/assets/images/3.jpg"></span>
      </md-cell-item>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      isWeixin: false,
      departData: [
        { name: "妇科门诊" },
        { name: "生殖内分泌门诊生殖内分泌" },
        { name: "儿科" },
        { name: "放射科" },
      ],
      test3: [
        { name: "冉有钱", good: "擅长：急性呼吸窘迫综合征、 呼吸衰竭的救治" },
        { name: "唐浩瀚", good: "擅长：急性呼吸窘迫综合征、重症感染及呼吸衰竭的救治" },
        { name: "安未", good: "擅长：急性呼吸窘迫综合征、重症感染及呼吸衰竭的救治" },
        { name: "吴政阳", good: "擅长：急性呼吸窘迫综合征、重症感染 " },
      ],
    }
  },
  mounted() {
    document.title = '搜索';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
      return true;
    } else {
      this.isWeixin = true;
      return false;
    }
  },
  methods: {
    intodoctordetail() {
      let argu = {}
      this.$router.push({
        name: 'doctordetail',
        query: argu
      });
    },
    intodoctorList(title) {
      let argu = { title: title }
      this.$router.push({
        name: 'doctorList',
        query: argu
      });
    },
    loadMorelist(value) {
      let _this = this;
      console.log("搜索数据", value);

      clearTimeout(this.t);
      this.t = setTimeout(function () {

        _this.$axios.put(bdDrugstorereadpage, {
          status: 1, name: value, enable: 1, type: "wx",
        }).then(function (res) {
          if (res.code == '400') {
          } else {
            if (value) {
              _this.AAA = false;
            } else {
              _this.AAA = true;
            }

            _this.list = res.data.rows;
          }
        }).catch(function (err) {

        });
      }, 300);
    },
  }
}
</script>

<style scoped>
@import url("./result.css");
</style>

