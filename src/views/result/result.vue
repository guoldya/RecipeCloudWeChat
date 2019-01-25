<template>
  <div class="header">
    <Header post-title="搜索" v-show="isWeixin"></Header>
    <div style=" text-align: center;">
      <input v-model="value" placeholder="搜索医生、科室" class="oc_val" @input="loadMorelist(value)">
    </div>
    <mu-paper :z-depth="1" class="demo-list-wrap">

      <ul class="mu-list">
        <div class=" mu-sub-header ">科室</div>
        <li v-for="(item2,index2) in departData" :key="index2" @click="intodoctorList(item2.name)">
          <a class="mu-item-wrapper">
            <div class="mu-item  has-avatar  ">
              <div class="mu-item-title">{{item2.name}}</div>
              <div class="mu-item-action  "><img src="@/assets/images/jianright.png" alt="" width="20px"></div>
            </div>
          </a>
          <hr class="mu-divider">
        </li>
      </ul>

      <ul class="mu-list">
        <div class=" mu-sub-header ">医生</div>
        <li v-for="(item,index) in test3" :key="index+'aa'">
          <a class="mu-item-wrapper" @click="intodoctordetail">
            <div class="mu-item  has-avatar">
              <div class="mu-item-action  ">
                <div class="mu-avatar  " style="width: 40px; height: 40px; font-size: 20px;">
                  <div class="mu-avatar-inner"><img src="@/assets/images/3.jpg"></div>
                </div>
              </div>
              <div class="mu-item-content">
                <div class="mu-item-title">{{item.name}}</div>
                <div class="mu-item-sub-title">擅长：吃屎</div>
              </div>
              <div class="mu-item-action"><img src="@/assets/images/jianright.png" alt="" width="20px"></div>
            </div>
          </a>
          <hr class=" mu-divider  ">
        </li>

      </ul>
    </mu-paper>
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
        { name: "生殖内分泌门诊生殖内分泌门诊生殖内分泌门诊" },
        { name: "儿科" },
        { name: "放射科" },
      ],
      test3: [
        { name: "冉有钱" },
        { name: "唐浩瀚" },
        { name: "安未" },
        { name: "吴政阳" },
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
.departLi2 {
  width: 100%;
  float: left;
  border-bottom: 1px solid #ededed;
}
.grid-cell2 {
  line-height: 50px;
  margin: 0 12px;
}
.mubadge {
  font-size: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 6px;
  line-height: 1.5;
  font-size: 12px;
  font-style: normal;
  background-color: #bdbdbd;
  color: #e01212;
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid #bdbdbd;
}
</style>

