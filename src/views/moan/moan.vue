<template>
  <div class="md-example-child md-example-child-reader md-example-child-reader-1">
    <ul class="image-reader-list">
      <li class="image-reader-item" v-for="(img, index) in imageList['reader0']" :key="index" :style="{
          'backgroundImage': `url(${img})`,
          'backgroundPosition': 'center center',
          'backgroundRepeat': 'no-repeat',
          'backgroundSize': 'cover'
        }">
        <md-tag class="image-reader-item-del" size="small" shape="quarter" fill-color="#111A34" type="fill" font-color="#fff" @click.native="onDeleteImage('reader0', index)">
          <md-icon name="close"></md-icon>
        </md-tag>
      </li>
      <li class="image-reader-item add">
        <md-image-reader name="reader0" @select="onReaderSelect" @complete="onReaderComplete" @error="onReaderError" is-multiple></md-image-reader>
      </li>
    </ul>
  </div>
</template>

<script>
import { Icon, ImageReader, Tag, Toast } from 'mand-mobile'
import imageProcessor from 'mand-mobile/components/image-reader/image-processor'
export default {
  name: 'image-reader-demo',
  /* DELETE */
  title: '图片选择并轴向修正，压缩处理',
  titleEnUS: 'Picture selection and axial correction, compression processing',
  describe: 'width: 200&nbsp;&nbsp;height: 200&nbsp;&nbsp;quality: 0.1',
  /* DELETE */
  components: {
    [Icon.name]: Icon,
    [ImageReader.name]: ImageReader,
    [Tag.name]: Tag,
  },
  data() {
    return {
      imageList: {
        reader0: ['../pg_negative.png'],
      },
    }
  },
  methods: {
    AA() {
      // Toast.loading('图片读取中...')
    },
    onReaderSelect() {
      Toast.loading('图片读取中...')
    },
    onReaderComplete(name, { dataUrl }) {
      console.log()
      const demoImageList = this.imageList[name] || []

      imageProcessor({
        dataUrl,
        width: 200,
        height: 200,
        quality: 0.1,
      }).then(({ dataUrl }) => {
        dataUrl && demoImageList.push(dataUrl)
      })
      this.$set(this.imageList, name, demoImageList)

      Toast.hide()
    },
    onReaderError(name, { msg }) {
      Toast.failed(msg)
    },
    onDeleteImage(name, index) {
      console.log(name, index)
      const demoImageList = this.imageList[name] || []
      demoImageList.splice(index, 1)
      this.$set(this.imageList, name, demoImageList)
    },
  },
}

</script>

<style lang="stylus" scoped>
</style>