<template>
   <div id="allmap"></div>
</template>
<script>
import { TMap } from '../sign/TMap'
export default {
   data() {
      return {
      }
   },
   mounted() {
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
            alert('您的位置：' + r.point.lng + ',' + r.point.lat);
         }
         else {
            alert('failed' + this.getStatus());
         }
      }, { enableHighAccuracy: true })
      // TMap('WZ7BZ-LGYW5-UELIJ-QWPO2-S4CZH-STFA5').then(qq => {
      //    var map = new qq.maps.Map(document.getElementById("container"), {
      //       // 地图的中心地理坐标。
      //       center: new qq.maps.LatLng(39.916527, 116.397128),
      //       zoom: 8
      //    });
      // });
   },
   methods: {
   },
   created: function () {
   }
}
</script>
<style>
#container {
  min-width: 600px;
  min-height: 767px;
}
</style>