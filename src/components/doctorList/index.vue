<!--医生信息列表组件 -->
<template>
    <div  class="doctor-list">
      <div class="header"><img src="@/assets/images/3.jpg" /></div>
      <div class="comment-right">
        <p class="introduce">
          <span class="name">{{datas.name||'--'}}</span>&nbsp; <span>主任医师</span>&nbsp;
          <span>{{datas.orgName||'--'}}</span>&nbsp;
        </p>
        <p class="colo13">
          <span class="picture" :class="datas.type<1||!datas.type ?'noOpen' :''">图文</span>&nbsp;
          <span class="picture" :class="datas.type<2||!datas.type ?'noOpen' :''">电话</span>&nbsp;
          <span class="picture" :class="datas.type<3||!datas.type ?'noOpen' :''">视频</span>&nbsp;
          <span class="reputation">好评率 {{datas.praiseRate||'--'}}%</span>&nbsp;
        </p>
        <p class="content">擅长：儿科常见病、多发病 #先天性心脏病</p>
        <p class="colo13">
          <span>咨询数：{{datas.diagnosisNum||'0'}}</span>&nbsp; <span>平均回复时长：{{datas.replyTime||'0'}}分</span>&nbsp;
        </p>
        <p class="price">￥{{datas.price||'0.00'}} 起
          <router-link :to="{ path: '/consultDetail', query: { id: datas.id }}" class="consult">立即咨询</router-link>
          <router-link v-show="false" to="/pictureConsult">免费咨询</router-link>
        </p>
        <em>已满</em>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props:['datas']
};
</script>
<style scoped lang="scss">
/* .doctor-list {} */
.doctor-list {
   position: relative;
   margin-top: 20px;
   border-bottom: 1px solid #e0e0e0;
}

.doctor-list .header {
   width: 98px;
   position: absolute;
}

.doctor-list .header img {
   width: 100%;
   border-radius: 50%;
   padding: 5px;
}

.doctor-list .comment-right {
   padding: 10px 0px 30px 108px;
}
/* #e2e4ea */
.doctor-list em {
  position: absolute;
  top: 0;
  right: 0;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  font-size: 28px;
  font-style: normal;
  color: #fff;
  background: #979797;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
}
.doctor-list p {
  line-height: 50px;
}

.doctor-list .name {
  font-size: 32px;
}
.doctor-list p {
  line-height: 50px;
}

.doctor-list .name {
  font-size: 32px;
}

.picture {
  border: 1px solid #1da1f3;
  padding: 1px 10px;
  border-radius: 7px;
  color: #1da1f3;
}

.noOpen {
  border: 2px solid #979797;
  padding: 1px 10px;
  border-radius: 7px;
  color: #979797;
}

.doctor-list .price {
  color: #1da1f3;
  font-weight: 500;
  letter-spacing: 1px;
  overflow: hidden;
  margin-top:10px;
  a {
    font-size:26px;
    float:right;
    display:inline-block;
    height:55px;
    line-height:55px;
    padding:0 30px;
    border:1px solid #1da1f3;
    border-radius:30px;
    margin-left:30px;
    color: #1da1f3;
  }
  .consult{
    color:#fff;
    background: #1da1f3;
  }
}

.doctor-list:last-child {
  border: none;
}
</style>

