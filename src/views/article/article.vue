<template>
  <div>
    <Header post-title="预约记录" v-show="isWeixin"></Header>
    <div :class="{outCarint:true,margin45:isWeixin}">
      <md-button type="warning" size="small" inline>Warning</md-button>
      <md-button type="disabled" size="small" inline>Disabled</md-button>
      <p>s22222ssssssssssssss预约记录sssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
    </div>
  </div>
</template>

<script type="text/babel">
import { Button } from 'mand-mobile'
export default {
  data() {
    return {
      isWeixin: false,
    };
  },

  components: {
    [Button.name]: Button,
  },
  created() {

  },
  mounted() {
    document.title = '选择科室';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
      return true;
    } else {
      this.isWeixin = true;
      return false;
    }
  },
  methods: {

  },
  computed: {

  },

};
</script>
 <style   scoped>
</style>