<template>
  <div class="medical  ">
    <Navigation type="title" title="体检报告">
      <span class="mu-secondary-text-color" @click="getJumpId">历史报告</span>
    </Navigation>
    <div class="outCarint">
      <div v-if="goodsList.length!=0" v-show="!isloading">
        <div v-for="(item,i) in goodsList" :key="i" @click="appointinfo(item)">
          <div class="medical-box">
            <div class="box-left">
              <div>
                <!-- <img src="@/assets/images/medica1 (7).png" alt="医生头像"> -->
                <img src="@/assets/images/medica1 (11).png" alt="状态">
              </div>
            </div>
            <div class="box-center">
              <h2>{{item.name}}</h2>
              <p>就诊卡号：
                <span>{{item.cardNo}}</span>
              </p>
              <p>体检日期：
                <span>{{item.examDate|time}}</span>
              </p>
            </div>
            <div class="box-right">
              <img src="@/assets/images/icon_more.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div v-show="!isloading" class="nullDiv" v-else>
        <img src="@/assets/images/null1.png">
        <p class="nullTEXT">最近一年没有体检报告</p>
      </div>
      <p v-show="!isloading&&doctorParams.pageNumber == doctorPages" class="noMore">没有更多数据了</p>
      <div class="loadmore" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <md-icon v-if="!isloading &&  busy" name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
        <div v-show="!isloading" class="nomore" v-if="doctorParams.pageNumber == doctorPages">
          没有更多了
        </div>
      </div>

      <Loading v-show="isloading"></Loading>
    </div>

  </div>
</template>
<script >
let pay_list_url = "/api/hos/bizExamReport/read/page";

export default {
  data() {
    return {
      goodsList: '',
      isloading: true, // 是否正在请求
      doctorPages: null, // 医生总页数
      busy: false,
      doctorParams: {
        pageNumber: 1,
        year: 1

      },

    };
  },

  async mounted() {
    await this.getGoodslist();
    this.isloading = false;
  },
  methods: {
    async  getGoodslist() {
      this.isloading = true;
      try {
        let res = await this.$axios.put(pay_list_url, this.doctorParams);
        if (res.data.code != 200) {
          throw Error(res.data.msg);
        }
        if (res.data.rows) {
          this.goodsList = this.doctorParams.pageNumber == 1 ? res.data.rows : this.goodsList.concat(res.data.rows);
        }
        // this.$toast.hide()
        this.isloading = false;
        this.departs[0].loading = false;
        console.log(this.departs[0].loading, "请求之后")
        // this.departs[1].loading = false;
        this.doctorParams.pageNumber = res.data.current;
        this.doctorPages = res.data.pages;

      } catch (error) {
        console.log(error.message);
      }
    },


    loadMore() {
      if (this.isloading) return false;
      if (this.doctorParams.pageNumber == this.doctorPages) return false;
      this.busy = true;
      setTimeout(() => {
        this.doctorParams.pageNumber++;
        this.getGoodslist();
        this.busy = false;
      }, 1000);
    },
    getJumpId: function () {
      this.$router.push({
        name: 'medicalhistory',
      });
    },


    appointinfo: function (val) {
      let arg = {}
      arg.id = val.id;
      arg.reportDate = val.reportDate;
      this.$router.push({
        name: 'medicalinfo',
        query: arg
      });
    },






  },






};
</script>
 <style lang="scss"  scoped>
.medical {
  margin-top: 120px;
  .medical-box {
    display: flex;
    background: #ffffff;
    margin-bottom: 20px;
    border-radius: 14px;
    .box-left {
      flex: 0 0 100px;
      img {
        border-radius: 0;
        width: 100%;
        margin-right: 0;
      }
    }
    .box-center {
      padding: 20px;
      padding-left: 0;
      flex: 1;
      /* max-width: 60%; */

      h2 {
        font-weight: 500;
        line-height: 70px;
        font-size: 38px;
      }
      p {
        line-height: 50px;
      }
      span {
        color: #8d8d8d;
      }
    }
    .box-right {
      display: flex;
      align-items: center;
      margin-top: 0;
      flex: 0 0 0.5rem;
      img {
        width: 14px;
      }
    }
  }
}
</style>