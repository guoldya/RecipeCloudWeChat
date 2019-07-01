<template>
  <div class="hacker-news-list  ">
    <div class="article">
      <Header :post-title="title"></Header>
      <div class="swiper-container">
        <div class="swiper-wrapper">
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="content articlecontent">
        <div class="cainter">
          <h1>{{articleInfo.title}}</h1>
          <p class="info-article">
            <span class="info-head"><img src="@/assets/images/3.jpg" alt=""></span>
            <span class="info-name">{{articleInfo.creator}} &nbsp; </span>
            <span>{{articleInfo.createTime|lasttime}}</span>
          </p>
          <p style="overflow:hidden; word-wrap:break-word;" v-html='articleInfo.content'>
          </p>
          <!-- <img :src="$conf.constant.img_base_url + articleInfo.photoUrl" alt="" style="width:100%"> -->
        </div>

      </div>
      <!-- <div class="cainter content-bottom">
        <span> 阅读 {{articleInfo.readNum}}</span>
        <span class="mu-secondary-text-color"> 写留言</span>
      </div> -->
    </div>
    <!-- <div class="cainter propagandainfo">
      <p class="liuyan">精选留言</p>
      <div class="content">
        <div id="commentList">
          <div class="comment-info">
            <div class="header"><img src="@/assets/images/3.jpg"></div>
            <div class="comment-right">
              <h3>
                <span class="assess">匿名</span>
                <span class="good mu-secondary-text-color"><img src="@/assets/images/3.jpg">&nbsp; 15</span>
              </h3>
              <p class="content">到菜市场买菜，看到一个孩子在看摊，我问：“一只鸡多少钱？” 那孩子回答：“23。” 我又问：“两只鸡多少钱？” 孩子愣了一下，一时间没算过来，急中生智大吼一声：“一次只能买一只！”</p>
            </div>
          </div>
          <div class="comment-info">
            <div class="header"><img src="@/assets/images/u152.png"></div>
            <div class="comment-right">
              <h3>
                <span class="assess">匿名</span>
                <span class="good"><img src="@/assets/images/3.jpg">&nbsp; 15</span>
              </h3>
              <p class="content">1111111111111111111111111111111111111aaaa111111111111111111111111111111111</p>
            </div>
          </div>
        </div>
      </div>

    </div> -->
  </div>
</template>
<script > 
import { Toast } from 'mand-mobile';
let bdProductreaddetail = '/api/hos/bizArticle/read/detailPublic';
const scrollTopList = {};
export default {
  data() {
    return {
      articleInfo: "",
      title: '宣教信息详情'
    };
  },
  props: {
    id: String,
  },
 
  mounted() {
    if (this.$route.query.type == 25) {
      this.title = "科室介绍详情"
    } else if (this.$route.query.type == 27) {
      this.title = "医院动态详情"
    }
    this.$toast.loading('请求中...')
    this.$axios.put(bdProductreaddetail, {
      articleId:this.$route.query.id * 1
    }).then((res) => {
      if (res.data.code == '200') {
        this.$toast.hide()
        this.articleInfo = res.data.data
      } else { 
        this.$toast.hide()
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
<style  lang="scss" scoped>
.article {
  background: #ffffff;
}
.cainter h1 {
  font-size: 34px;
  letter-spacing: 1px;
}
.cainter {
  margin: 0 24px 50px;
  .liuyan {
    color: #8d8d8d;
  }
}
.articlecontent p {
  line-height: 50px;
}
.propagandainfo {
  .comment-info {
    border: none;
    .header img {
      border-radius: 10px;
      height: 90px;
      width: 90px;
    }
  }
  .comment-right h3 {
    text-align: left;
    display: flex;
    font-weight: 500;
    font-size: #272727;
    justify-content: space-between;
    .good {
      font-size: 28px;
      color: #8d8d8d;
      img {
        width: 30px;
      }
    }
  }
}

.info-head img {
  width: 80px;
  border-radius: 50%;
}
.cainter .colo13 span {
  line-height: 100px;
}
.content-bottom {
  border-top: 2px solid #e5e5e5;
  line-height: 100px;
  display: flex;
  justify-content: space-between;
}
.info-article {
  font-size: 26px;
  color: var(--primary--content);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  span {
    margin-right: 10px;
  }
  .info-name {
    color: var(--primary--title);
  }
}
.doctor-comment-item {
  padding: 0 24px;
  background: #ffffff;
  > div {
    padding: 24px 0;
    margin-top: 20px;
  }
  .skill {
    margin-top: 0;
    padding: 0 0 24px;
  }
}

.doctor-comment-item-header {
  span {
    margin-right: 20px;
    &:nth-last-child(1) {
      margin-right: 0;
      float: right;
    }
  }
  .assess {
    color: var(--primary);
    border: 2px solid var(--primary);
    padding: 0px 10px;
    border-radius: 6px;
  }
}
.doctor-comment-item-content {
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  .ellipsis {
    overflow: hidden;
    display: -webkit-box;
    /* autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
  }
}
</style>
