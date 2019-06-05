<template>
  <div class="recordcard">
    <cardTitle :content="content" :type="type" />
    <cardContent :content="content" :type="type" :queryType="queryType"/>
    <cardBottom :argn="argn" :type="type" :path="path" v-show="isShow" />
  </div>
</template>
<script>
import cardTitle from './cardTitle'
import cardBottom from './cardBottom'
import cardContent from './cardContent'
export default {
  data() {
    return {
      argn: '',
      path: '',
      isShow: true,
    };
  },
  components: { cardTitle, cardBottom, cardContent },
  props: ['content', 'type', 'queryType'],
  async mounted() {
    if (this.type == 1) {
      this.argn = { id: this.content.id, sourceId: this.content.sourceId, regType: this.content.regType, payType: this.content.payType, payOrderId: this.content.payOrderId }
      this.path = '/registrecorddetail';
    } else if (this.type == 2) {
      let aa = {};
      aa.id = this.content.id;
      aa.objId = this.content.objId;
      aa.feeType = this.content.feeType;
      aa.status = this.content.status;
      if (this.content.feeType == 3 || this.content.feeType == 4 || this.content.feeType == 2) {
        aa.objId = this.content.objId;
      }
      this.path = '/feeinfo';
      this.argn = aa;
    } else if (this.type == 3) {
      this.argn = { id: this.content.id, }
      this.path = '/businssrecordinfo';
    } else if (this.type == 4) {
      this.argn = { id: this.content.id, }
      this.path = '/recordDetail';
    } else if (this.type == 7) {
      this.argn = { id: this.content.id, }
      this.path = '/payfeerecordinfo';
    } else if (this.type == 9) {
      if (this.queryType == 1) {
        this.isShow = false
      }
      let bb = {};
      bb.id = this.content.id;
      bb.type = this.content.type;
      bb.evaluateStatus = this.queryType - 1;
      if (this.queryType - 1 == 0) {
        bb.time = this.content.outTime;
      } else {
        bb.time = this.content.createTime;
      }
      if (this.content.type == 1) {
        bb.title = this.content.area
      } else if (this.content.type == 2) {
        bb.title = this.content.dept
      }
      this.argn = bb;
      this.path = '/valuation';
    }

  },
}

</script>

<style lang="scss" scoped>
.recordcard {
  background: #fff;
  border-radius: 17px;
  margin: 24px;
}
</style>
