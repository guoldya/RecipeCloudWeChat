<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-3">
    <md-scroll-view ref="scrollView" :scrolling-x="false" @endReached="$_onEndReached">
      <div v-for="(item,index) in collectData" :key="index"  class="scroll-view-list">
        <p class="scroll-view-item">{{item.name}}</p>
      </div>
      <md-scroll-view-more slot="more" :is-finished="isFinished">
      </md-scroll-view-more>
    </md-scroll-view>
  </div>
</template>
 
<script>
import { ScrollView, ScrollViewMore } from 'mand-mobile'
let bizLisReportreadpage = 'app/bizLisReport/read/page';
export default {
  name: 'scroll-view-demo-2',
  /* DELETE */
  title: '加载更多',
  titleEnUS: 'Load More',
  /* DELETE */
  components: {
    [ScrollView.name]: ScrollView,
    [ScrollViewMore.name]: ScrollViewMore,
  },
  data() {
    return {
      collectData: [],
      isFinished: false,
      pageSize: 10,
      pageNumber: 1,
    }
  },
  mounted() {
    // this.collectReport()
  },
  methods: {

    $_onEndReached() {
 this.collectReport()
      if (this.isFinished) {
        return
      }
     
      // async data
      setTimeout(() => {
        // this.pageNumber++;
        // this.list += 5
        // if (this.list >= 20) {
        //   this.isFinished = true
        // }
        
        this.$refs.scrollView.finishLoadMore()
      }, 1000)


    },

    collectReport() {
      console.log("aaa")
      let collectParams = {};
      collectParams.patientId = null;
      collectParams.pageSize = this.pageSize;
      collectParams.pageNumber = this.pageNumber;
      this.$axios.put(bizLisReportreadpage, collectParams).then((res) => {
        if (res.data.code == '200') {
          if (res.data.rows) {
            this.collectData = res.data.rows;
            // if (this.pageNumber <= Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
            //   this.isFinished = false;
            // } else {
            //   this.isFinished = true;
            // }
          } else {
          }
        }
      }).catch(function (err) {
        console.log(err);
      });
    },




  },



}

</script>

<style lang="stylus">
.md-example-child-scroll-view-3 {
  background: #FFF;

  .scroll-view-item {
    padding: 30px 0;
    text-align: center;
    font-size: 32px;
    font-family: DINAlternate-Bold;
    border-bottom: 0.5px solid #efefef;
  }
}
</style>