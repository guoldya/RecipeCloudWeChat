<template>
   <div class="md-example-child md-example-child-result-page md-example-child-result-page-3" style="margin-top:150px">
      <Headerapp post-title="错误页面"></Headerapp>
      <md-result-page class="customized" img-url="//manhattan.didistatic.com/static/manhattan/do1_JX7bcfXqLpStKRv31xlp" text="服务器开了小差...">
      </md-result-page>
   </div>
</template>

<script>
import { ResultPage } from 'mand-mobile'

export default {
   name: 'result-page-demo',
   /* DELETE */
   title: '自定义图案',
   titleEnUS: 'Custom pattern',
   /* DELETE */
   components: {
      [ResultPage.name]: ResultPage,
   },
}

</script>