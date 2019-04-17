<template>
  <div class="hacker-news-list article" id="scrollup" style="background: #ffffff;">
    <div class="article" id="scrollup">
      <Header post-title="宣教信息详情"></Header>
      <div class="swiper-container">
        <div class="swiper-wrapper">
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="content articlecontent">
        <div class="cainter">
          <h1>{{articleInfo.title}}</h1>
          <p class="colo13">
            <span>{{articleInfo.audit}} | </span>
            <span>{{articleInfo.createTime}}</span>
          </p>
          <p style="overflow:hidden; word-wrap:break-word;" v-html='articleInfo.content'>
          </p>
          <img :src="$conf.constant.img_base_url + articleInfo.photoUrl" alt="" style="width:100%">
        </div>
      </div>

    </div>
  </div>
</template>
<script >
import { Toast } from 'mand-mobile';
let bdProductreaddetail = '/app/bizArticle/read/detail';
const scrollTopList = {};
export default {
  data() {
    return {
      articleInfo: ""
    };
  },
  props: {
    id: String,
  },
  computed: {

  },
  mounted() {

    this.$axios.put(bdProductreaddetail, {
      articleId: this.$route.query.id
    }).then((res) => {
      if (res.data.code == '200') {

        this.articleInfo = res.data.data

      } else {
        console.log(res.msg);
      }
    }).catch(function (err) {
      console.log(err);
    });

  },
  methods: {


  }
};
</script>
<style  scoped>
.swiper-container-horizontal
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  margin: 0 5px;
}
.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background: #efefef;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background: #f2cf30;
  width: 22px;
  height: 10px;
  display: inline-block;
  border-radius: 10px;
}
.swiper-slide {
  border-radius: 20px !important;
}
.swiper-container img {
  width: 100%;
  border-radius: 20px;
  height: 340px;
}
.content {
  text-align: left;
}
.cainter h1 {
  font-size: 34px;
  letter-spacing: 1px;
}
.cainter {
  margin: 0 24px;
}
.articlecontent p {
  line-height: 50px;
}
.comment-right h3 {
  text-align: left;
}
</style>
