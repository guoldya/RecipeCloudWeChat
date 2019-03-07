<!--图文咨询 -->
<template>
  <div class="picture-consult">
    <!-- 医生信息 -->
    <div class="doctor-info doctor-item b-m">
      <div class="doctor-info-top">
        <div class="doctor-info-header">
          <img src="@/assets/images/3.jpg" alt="" />
        </div>
        <div class="doctor-info-content">
          <p>周洋</p>
          <p class="gray"><span>主治医生</span><span>儿科</span></p>
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
    <md-cell-item title="为谁咨询" addon="点击选择就诊人" arrow @click="routerTo(1)"/>
    <!-- 问题描述 -->
    <div class="picture-consult-problem">
      <p>
        问题描述&nbsp;&nbsp;<span>(症状表现、检查/用药和希望获得的帮助)</span>
      </p>
      <textarea maxlength="500"></textarea>
      <!-- 上传图片 -->
      <ul class="image-reader-list">
        <li
          class="image-reader-item"
          v-for="(img, index) in imageList"
          :key="index"
          :style="{
            backgroundImage: `url(${img})`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }"
        >
          <md-tag
            class="image-reader-item-del"
            size="small"
            shape="quarter"
            fill-color="#111A34"
            type="fill"
            font-color="#fff"
            @click.native="onDeleteImage(index)"
          >
            <md-icon name="close"></md-icon>
          </md-tag>
        </li>
        <li class="image-reader-item add" v-if="imageList.length<3">
          <md-image-reader
            name="reader0"
            @select="onReaderSelect"
            @complete="onReaderComplete"
            @error="onReaderError"
            is-multiple
          ></md-image-reader>
          <md-icon name="camera" size="md" color="#CCC"></md-icon>
          <p>添加图片</p>
        </li>
        <li class="tips"  v-if="imageList.length<3">(最多上传3张)</li>
      </ul>
    </div>

    <md-cell-item title="选择报告" arrow @click="routerTo(2)"/>
    <md-cell-item title="选择病例" arrow @click="routerTo(3)"/>
    <div class="btn">
      <md-button type="primary" round>发送给医生</md-button>
    </div>
  </div>
</template>
<script>
import { Icon, ImageReader, Tag, Toast } from "mand-mobile";

export default {
  data() {
    return {
      imageList:[],
    };
  },
  methods: {
    // 路由跳转 type 1 为谁咨询 2  选择报告 3选择病例
    routerTo(type) { 
      let url = ''
      if(type === 1) {
        url = '/selectPeople'
      } else if(type === 2) {
        
      } else if(type === 3) {

      }
      this.$router.push(url)
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

<style lang="less" scoped>
@border: 1px solid #e0e0e0;
.picture-consult {
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
    border-bottom: @border;
    p span {
      color: #999;
      font-size: 24px;
    }
    textarea {
      width: 100%;
      height: 200px;
      margin-top: 20px;
      box-sizing: border-box;
      resize: none;
      border: @border;
      padding: 10px;
    }
  }
  .image-reader-list {
    overflow: hidden;
    margin-top: 10px;
    .md-tag .md-icon.icon-font {
      transform: scale(0.7);
    }
    .image-reader-item {
      width: 156px;
      height: 156px;
    }
    .md-image-reader {
      border: @border;
    }
    .add {
      p {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        margin-top: 15px;
        font-size: 22px;
        color: #ccc;
        text-align: center;
      }
    }
    .tips {
      font-size: 24px;
      vertical-align: bottom;
      color:#999;
      float: left;
      margin-top:120px;
    }
  }
}
</style>
