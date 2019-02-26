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
      <md-button v-if="ishave" type="primary" round @click="signUp">{{nowTime}} 签到</md-button>
      <md-button v-else type="primary" round inactive>没在区域范围</md-button>
    </div>
  </div>

</template>
<script>
import { TMap } from '../sign/TMap'
let appbizPatientRegistersign = '/app/bizPatientRegister/sign';
export default {
  data() {
    return {
      isWeixin: false,
      nowTime: '',
      ishave: false,
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
    let _this = this;
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(106.53063501, 29.54460611);
    map.centerAndZoom(point, 17);



    //创建小狐狸

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var mk = new BMap.Marker(r.point);// 创建点
        var circle = new BMap.Circle(r.point, 300, { strokeColor: "rgba(29, 161, 243, 0.7)", fillColor: "rgba(29, 161, 243, 0.2) ", strokeWeight: 2, strokeOpacity: 0.9 }); //创建圆
        map.addOverlay(circle); //增加圆
        map.addOverlay(mk);

        map.panTo(r.point);

        //创建小狐狸
        var pt = new BMap.Point(106.53063501, 29.54460611);
        var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300, 157));
        var marker2 = new BMap.Marker(pt, { icon: myIcon });  // 创建标注
        map.addOverlay(marker2);


        var pointA = new BMap.Point(r.point.lng, r.point.lat);  // 创建点坐标A--大渡口区
        var pointB = new BMap.Point(_this.$route.query.pointBposition * 1, _this.$route.query.pointBpositionlat * 1);
        if ((map.getDistance(pointA, pointB)).toFixed(2) * 1 <= 300) {
          _this.ishave = true;
          var label = new BMap.Label("已进入签到区域", { offset: new BMap.Size(20, -10) });
        } else {
          _this.ishave = false;
          var label = new BMap.Label("当前没有在签到区域", { offset: new BMap.Size(20, -10) });
        }

        mk.setLabel(label);
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

    signUp() {
      if (this.ishave) {
        this.$axios.post(appbizPatientRegistersign, {
        }).then(res => {
          if (res.data.code == '200') {
            this.$toast.info('签到成功')
            let argu = {};
            this.$router.push({
              name: 'signsucceed',
              query: argu
            });
          } else {
            this.$toast.info(res.data.msg)
          }
        }).catch(function (err) {
          console.log(err);
        });
      } else {
        this.$toast.info("没在就诊范围")
      }


    },



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