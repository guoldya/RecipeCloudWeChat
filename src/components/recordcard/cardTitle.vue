<template>
  <div class="listData">
    <span class="title" v-if="type==1||type==4"><img :src="type|payTypeIMG" alt=""> {{content.patientName}}</span>
    <span class="title" v-if="type==3"><img src="@/assets/images/mse(1).png" alt=""> {{content.name}}</span>
    <span class="title" v-if="type==2">
      <img :src="content.feeType|feeTypeFilterIMG"> {{content.feeType|feeTypeFilter}}费
    </span>
    <span class="mu-secondary-text-color" v-if="type==1">{{content.payType | payTypeFilter}}</span>
    <span class="mu-secondary-text-color" v-if="type==3">{{content.status|busistatus}}</span>
    <span class="mu-secondary-text-color" v-if="type==2">{{content.status | paystatusFilter}}</span>
    <span class="mu-secondary-text-color" v-if="type==4">{{content.code}}</span>
    <!-- // 住院缴费记录 -->
    <span class="title" v-if="type==7"> <img src="@/assets/images/record1.png" alt=""> {{content.name}}</span>
    <span class="titleright" v-if="type==7">{{content.ihNo}}</span>
    <!-- 就医评价 -->
    <span class="title jiuyi" v-if="type==9">
      <img :src="content.type|filterTypeIMG" alt=""> {{content.type|filterType}}评价
    </span>
    <span v-if="type==9">{{content.cardNo}}</span>
  </div>
</template>
<script>
export default {
  filters: {
    payTypeIMG(value) {
      // 挂号记录
      if (value == 1) {
        return require('@/assets/images/mse(4).png')
        // 处方记录
      } else if (value == 4) {
        return require('@/assets/images/record1.png')
        // 病案记录
      } else if (value == 3) {
        return require('@/assets/images/mse(1).png')
      }

    }
  },
  props: ['content', 'type'],
}
</script>

 <style lang="scss"  scoped>
.recordcard .listData {
  padding: 24px 24px 6px;
  border-bottom: 1px solid #e5e5e5;
  .title {
    position: relative;
    top: -10px;
    img {
      width: 40px;
      margin-right: 5px;
      position: relative;
      top: 10px;
    }
  }
  .jiuyi img {
    width: 45px;
  }
}
</style>
