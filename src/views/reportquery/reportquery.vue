<template>
  <div class="page-loadmore">
    <Header post-title="报告查询" v-show="isWeixin"></Header>
    <div :class="{margin45:isWeixin,outCarint:true}">
      <div class="user">
        <mu-select style="width:50%;float:left" filterable="" v-model="selected3" full-width :solo='false'>
          <mu-option v-for="city,index in citys" :key="city.value" :label="city.name" :value="city.value"></mu-option>
        </mu-select>
        <div class="datepick" @click="datePick">
          <span :class="{'mu-secondary-text-color':datepick}">选择时间<img v-if="!datepick" src="@/assets/images/icon_open@2x.png">
            <img v-else src="@/assets/images/icon_open_pre@2x.png">
          </span>
        </div>
      </div>
      <div class="card">
        <div class="cardText" @click="intoreportinfo">
          <div class="cardTextLeft">
            <p>医院：艘船大学华西</p>
            <p>医院：艘船大学华西</p>
            <p>医院：艘船大学华西</p>
          </div>
          <div class="cardTextRight">
            <img src="@/assets/images/icon_more2@2x.png" alt="">
          </div>
        </div>
      </div>
      <mu-date-picker :click="datePick" :date.sync="date" v-show="datepick"></mu-date-picker>
    </div>
  </div>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      datepick: false,
      date: undefined,
      isWeixin: false,
      selected3: 55,
      citys: [
        { name: '妇科', value: 1 },
        { name: '内科', value: 2 },
        { name: '外科', value: 31 },
        { name: '生殖内分泌', value: 55 },
      ],
    };
  },
  created() {

  },
  mounted() {
    document.title = '报告查询';
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
    datePick() {
      this.datepick = !this.datepick
    },

    intoreportinfo() {
      let argu = {}
      this.$router.push({
        name: 'reportinfo',
        query: argu
      });
    },
    change() {
      console.log("sssssssss")
    }
  },
  computed: {

  },

};
</script>
 <style   scoped>
.user {
  width: 80%;
  line-height: 50px;
  height: 50px;
}
.datepick {
  width: 40%;
  float: right;
}
.datepick img {
  width: 12px;
  margin-left: 10px;
}
.cardText {
  display: flex;
}
.cardTextLeft {
  width: 99%;
}

.cardTextRight img {
  margin-top: 21px;
  width: 10px;
  margin-left: 40px;
}
</style>