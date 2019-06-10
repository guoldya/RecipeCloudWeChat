<template>
  <div class="recordcard margin45">
      <div class="cards1">
          <div class="listHeader">
              <div class="listHerder-box">
                <div class="listImg">
                    <img :src="waitData.type|filterTypeIMG" alt="">
                </div>
                <div class="listTxt">
                    {{waitData.type|filterType}}评价
                </div>
              </div>
            <span>
              {{waitData.cardNo}}
            </span>
          </div>
          <div class="listBody">
            <p class="parElem listData">
              <span class="sonElem">姓名 </span>
              <span>{{waitData.patientName}}</span>
            </p>
            <p class="parElem listData">
              <span class="sonElem" v-if="queryType==1&&waitData.type==1">住院日期</span>
              <span class="sonElem" v-if="queryType==1&&waitData.type==2">就诊日期</span>
              <span class="sonElem" v-if="queryType==1&&waitData.type==3">报告日期</span>
              <span class="sonElem" v-if="queryType==2">评价日期 </span>
              <span v-if="queryType==2">{{waitData.createTime|time}}</span>
              <span v-if="queryType!=2">{{waitData.time|time}}</span>
            </p>
            <p class="listData" v-show="queryType==1">
              <span> </span>
              <span class="have" @click="intoDetail(waitData)">去评价</span>
            </p>
          </div>
          <div class="lookmore" @click="intoDetail(waitData)" v-show="queryType!=1">
            <span>查看详情</span>
            <span><img src="@/assets/images/icon_right.png" alt=""></span>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: [
      'waitData',
      'queryType' 
  ],
  created() {
  },
  mounted() {
  },
  methods: {
  },
}
</script>

<style>
.cards1 {
    background: #fff;
    padding: 12px 0 0;
    margin: 24px;
    height: 354px;
    border-radius: 20px;
}
.listHeader {
    height: 88px;
    padding: 24px 24px 6px;
    padding-bottom: 18px;
    border-bottom: 0.01rem solid var(--primary--line);
    display: flex;
    align-items: flex-end;
    justify-content:space-between;
}
.listHerder-box {
    width: 100%;
    display: flex;
    justify-content:flex-start;
}
.listTxt {
    padding: 10px 0 0 20px;
}
.listImg {
    width: 47px;
    height: 47px;
}
.listImg img {
    width: 100%;
    height: 100%;
}
.have {
    font-size: 28px;
    color: #ffffff;
    text-align: center;
    line-height: 33.5px;
    margin-top: 20px;
    width: 134px;
    height: 60px;
    background: var(--primary);
    border-radius: 60px;
}
.listBody {
    padding: 30px 24px 0;
}
 
 
</style>

