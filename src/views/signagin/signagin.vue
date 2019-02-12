<template>
  <div>
    <Header post-title="就诊签到" v-show="isWeixin"></Header>
    <div id="allmap" :class="{ 'margin45':isWeixin}" style="width:100%;height:500px">

    </div>
    <div class="outCarint">
      <p style="padding:10px 0">
        <md-icon name="location" size="md"></md-icon>
        <span>
          重庆西南医院.骨科 重庆西南医院.骨科 重庆西南医院.骨科 重庆西南医院.骨科
        </span>
      </p>
      <md-button type="primary" round>{{nowTime}} 签到</md-button>
    </div>
  </div>

</template>
<script>
import { TMap } from '../sign/TMap'
export default {
  data() {
    return {
      isWeixin: false,
      nowTime: '',
    }
  },
  mounted() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
    } else {
      this.isWeixin = true;
    };
    // 百度地图API功能
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 12);
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
      }
      else {
        alert('failed' + this.getStatus());
      }
    }, { enableHighAccuracy: true })
    //添加折线到地图上



    // 获取当前时间
    var today = new Date();
    this.nowTime = today.getFullYear() + "年" + today.getMonth() + "月" + today.getDate() + "日" + today.getHours() + "时" + today.getMinutes() + "分" + today.getSeconds() + "秒";

  },
  methods: {



  },
  created: function () {
  }
}
</script>
<style scoped>
#container {
  min-width: 600px;
  min-height: 767px;
}
</style>