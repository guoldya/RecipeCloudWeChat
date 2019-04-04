<!--图文咨询 -->
<template>
  <div class="picture-consult margin50">
    <Header post-title="医生信息"></Header>
    <!-- 医生信息 -->
    <div class="doctor-info doctor-item b-m">
      <div class="doctor-info-top">
        <div class="doctor-info-header">
          <img src="@/assets/images/3.jpg" alt="" />
        </div>
        <div class="doctor-info-content">
          <p class="name">周洋</p>
          <p class="gray">
            <span>主治医生</span>
            <span>儿科</span>
          </p>
        </div>
      </div>
      <div class="doctor-info-bottom">
        <div>
          <p class="gray">问诊量</p>
          <p>6555</p>
        </div>
        <div>
          <p class="gray">评论率</p>
          <p>80%</p>
        </div>
        <div>
          <p class="gray">关注</p>
          <p>3625</p>
        </div>
      </div>
    </div>
    <md-cell-item title="为谁咨询" addon="点击选择就诊人" arrow @click="routerTo(1)" />
    <!-- 问题描述 -->
    <div class="picture-consult-problem">
      <p>
        问题描述&nbsp;&nbsp;
        <span>(症状表现、检查/用药和希望获得的帮助)</span>
      </p>
      <textarea maxlength="500"></textarea>
      <!-- 上传图片 -->
      <ul class="image-reader-list">
        <li class="image-reader-item" v-for="(img, index) in imageList" :key="index" :style="{
            backgroundImage: `url(${img})`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }">
          <md-tag class="image-reader-item-del" size="small" shape="quarter" fill-color="#111A34" type="fill" font-color="#fff" @click.native="onDeleteImage(index)">
            <md-icon name="close"></md-icon>
          </md-tag>
        </li>
        <li class="image-reader-item add" v-if="imageList.length<3">
          <md-image-reader name="reader0" @select="onReaderSelect" @complete="onReaderComplete" @error="onReaderError" is-multiple></md-image-reader>
          <md-icon name="camera" size="lg" color="var(--primary--content);"></md-icon>
          <p>添加图片</p>
        </li>
        <li class="tips" v-if="imageList.length<3">(最多上传3张)</li>
      </ul>
      
    </div>
    <md-cell-item title="选择报告" arrow @click="routerTo(2)" />
    <md-cell-item title="选择病例" arrow @click="routerTo(3)" />

    <p class="addbTN" @click="isCashierhow=true">发送给医生</p>
    <!-- <div class="btn">
      <md-button type="primary" round>发送给医生</md-button>
    </div> -->
  </div>
</template>
<script>
import { Icon, ImageReader, Tag, Toast } from "mand-mobile";

export default {
  data() {
    return {
      imageList: [],
    };
  },
  methods: {
    // 路由跳转 type 1 为谁咨询 2  选择报告 3选择病例
    routerTo(type) {
      let url = ''
      if (type === 1) {
        url = '/selectPeople'
      } else if (type === 2) {

      } else if (type === 3) {

      }
      this.$router.push({ path: url })
    },
    onReaderSelect(name, { files }) {
      files.forEach(file => {
        console.log(
          "[Mand Mobile] ImageReader Selected:",
          "File Name " + file.name
        );
      });
      Toast.loading("图片读取中...");
    },
    onReaderComplete(name, { dataUrl, file }) {
      Toast.hide();
      setTimeout(() => {
        this.imageList.push(dataUrl)
      }, 100);
    },
    onReaderError(name, { msg }) {
      Toast.failed(msg);
    },
    onDeleteImage(index) {
      this.imageList.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
$border: 1px solid var(--primary--line);
.picture-consult {
  background: #ffffff;
  .b-m {
    border-bottom: 1px solid #f1f3f1;
  }
  .doctor-item {
    padding: 24px 40px;
  }
  .doctor-info-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .doctor-info-header {
      margin-right: 20px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
      }
    }
    .doctor-info-content {
      .name{
        font-size: 32px;
      }
      flex: 1;
      .gray span {
        margin-right: 20px;
      }
    }
  }
  .doctor-info-bottom {
    display: flex;

    margin-top: 20px;
    > div {
      flex: 1;
      border-right: 1px solid #f1f3f1;
      &:last-child {
        border-right: none;
      }
      p {
        text-align: center;
        font-size: 24px;
      }
    }
  }
  .md-cell-item /deep/.md-cell-item-body {
    padding: 0 20px;
  }
  .btn {
    position: relative;
    width: 90%;
    margin: auto;
    margin-top: 40px;
  }
  .picture-consult-problem {
    padding: 40px;
    overflow: hidden;
    border-bottom: $border;
    background: #ffffff;
    p span {
      color: var(--primary--content);
      font-size: 24px;
    }
    textarea {
      width: 100%;
      height: 200px;
      margin-top: 20px;
      box-sizing: border-box;
      resize: none;
      border: $border;
      padding: 10px;
    }
  }
  .image-reader-list {
    display: flex;
    position: relative;
    overflow: hidden;
    margin-top: 10px;
    .md-tag .md-icon.icon-font {
      transform: scale(0.7);
      line-height: 2;
    }
    .image-reader-item {
      width: 156px;
      height: 156px;
    }
    .md-image-reader {
      // border: $border;
    }
    .add {
      border: 1px solid var(--primary--line);
      line-height: 2;
      text-align: center;
      p {
        // position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        margin-top: 15px;
        font-size: 22px;
        color: var(--primary--content);;
        text-align: center;
      }
      .md-icon {
        // position: absolute;
        margin-top: 50px;
      }
    }
    .tips {
      font-size: 24px;
      vertical-align: bottom;
      color: #999;
      float: left;
      margin-top: 120px;
    }
  }
}
</style>
