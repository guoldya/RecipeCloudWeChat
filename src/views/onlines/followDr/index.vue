<!-- 关注的医生-->
<template>
  <div class="follow-dr">
    <Header post-title="关注的医生"></Header>
    <Loading v-if="isloading"></Loading>
     <!--没有数据展示的信息-->
    <div class="nodata" v-if="!isloading&&!followList.length">
      <img src="@/assets/images/null1.png" alt="">
    </div>
       
    <!-- 医生列表 -->
    <doctorList v-for="(item,index) in followList" :key="index" :datas="item"></doctorList>
      <div  class="loadmore" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
          <md-icon v-if="!isloading&&busy" name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
          <div class="nomore" v-if="pageNumber == pages">没有更多了</div>
      </div> 

  </div>
</template>
<script>
import doctorList from "../../../components/doctorList";
const followDrUrl = '/bizDoctorFollow/read/page'
export default {
  data() {
    return{
      isloading:true, // 是否正在请求
      followList:[],
      pageNumber:1,
      pages:null,
      busy:false
    }
  },
 async mounted() {
   this.getFollowList()
  },
  methods:{
   async getFollowList() {
      try {
        let res = await this.$axios.put(followDrUrl, {
          pageNumber:this.pageNumber
        });
        if(res.data.code!=200) {
          throw Error(res.data.meg)
        }
        this.followList = this.pageNumber == 1 ? res.data.rows : this.followList.concat(res.data.rows);
        this.pageNumber = res.data.current
        this.pages = res.data.pages
        this.isloading = false
      } catch (error) {
        this.isloading = false
        console.log(error.message)
      }
    },
    loadMore() {
      if(this.isloading)return false; 
      if(this.pageNumber==this.pages)return false
      this.busy = true;
      setTimeout(() => {
        this.pageNumber++
        this.getFollowList()
        this.busy = false;
      }, 1000);
    }
  },
  components:{
    doctorList
  }
}
</script>
<style lang="scss" scoped>
.follow-dr {
  padding:1rem 24px 0;
  height:100vh;
  overflow: auto;
  box-sizing: border-box;
  .nodata {
    margin-top:100px;
    text-align: center;
    img {
      width:350px;
    }
  }
}
</style>

