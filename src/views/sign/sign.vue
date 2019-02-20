<template>
  <div class="sign">
    <header class="aui-navBar aui-navBar-fixed" v-show="isWeixin">
      <span href="javascript:;" class="aui-navBar-item" @click="$router.go(-1)">
        <img src="@/assets/images/icon_back.png">
      </span>
      <div class="aui-center">
        <span class="aui-center-title">就诊签到</span>
      </div>
      <span class="aui-navBar-item">
        <div>
          <md-field>
            <md-field-item :content="selectorValue" @click="showSelector" solid/>
          </md-field>
          <md-selector v-model="isSelectorShow" default-value="7" :data="optionsData" max-height="320px" title="选择就诊卡" @choose="onSelectorChoose"></md-selector>
        </div>
        <span class="downImg"><img src="@/assets/images/icon_down.png"></span>
      </span>
    </header>
    <div :class="{margin45:isWeixin}">
      <md-notice-bar icon="location">
        重庆西南医院.骨科
      </md-notice-bar>
      <div id="allmap"></div>
      <div class="outCarint">
        <div v-if="ishave" class="signUp" @click="signUp()">
          <p>签到</p>
        </div>
        <div v-else class="signUp signUpno">
          <p>没到范围</p>
        </div>
        <p class="signUpTime">{{nowTime}}</p>
        <p v-if="ishave" class="signUpAdress">
          <md-icon name="success-color" size="lg" style="position:relative;top:3px; "></md-icon>
          您已进入我们医院的考勤签到区...</p>
        <p v-else class="signUpAdress">
          <md-icon name="warn-color" size="lg" style="position:relative;top:5px;right:5px"></md-icon>
          您还没有进入医院就诊区域...</p>
        <p v-show="!ishave" style="text-align:center;margin-top:5px">温馨提醒：距离定位在医院300m范围内</p>
        <p class="signUpAgin" @click="signUpAgin">去重新定位</p>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
let appbizPatientRegistersign = '/app/bizPatientRegister/sign';
let bizPatientCard = "/wechat/bizPatientCard/read/page";
export default {
  data() {
    return {
      isWeixin: false,
      optionsData: [],
      isSelectorShow: false,
      selectorValue: '',
      id: '',
      nowTime: '',
      ishave: false,
      pointBposition: 106.53066501,
      pointBpositionlat: 29.54460611,
    };
  },
  created() {
  },
  mounted() {
    document.title = '就诊签到';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
    } else {
      this.isWeixin = true;
    };
    var today = new Date();
    this.nowTime = today.getFullYear() + "年" + today.getMonth() + "月" + today.getDate() + "日" + today.getHours() + "时" + today.getMinutes() + "分" + today.getSeconds() + "秒";

    this.$axios.put(bizPatientCard, {
    }).then(res => {
      if (res.data.code == '200') {
        for (let i = 0; i < res.data.rows.length; i++) {
          this.selectorValue = res.data.rows[0].patientName;
          this.id = String(res.data.rows[0].id);
          let neslist = {
            text: res.data.rows[i].patientName,
            value: String(res.data.rows[i].id)
          }
          this.optionsData.push(neslist);
        }

      } else if (res.data.code == '800') {

      }
    }).catch(function (err) {
      console.log(err);
    });

    this.drawmap(this.pointBpositionlat)
  },
  methods: {
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorChoose(data) {
      this.selectorValue = data.text;
      this.id = data.value * 1;
    },
    drawmap(e) {
      let _this = this;
      var map = new BMap.Map("allmap");
      var pointA1;
      var pointA2;
      var point = new BMap.Point(106.53063501, 29.54460611);
      map.centerAndZoom(point, 12);
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
          var pointA = new BMap.Point(r.point.lng, r.point.lat);  // 创建点坐标A--大渡口区
          var pointB = new BMap.Point(_this.pointBposition, e);  // 创建点坐标B--江北区
          if ((map.getDistance(pointA, pointB)).toFixed(2) * 1 <= 300) {
            _this.ishave = true;
          } else {
            _this.ishave = false;
          }
          // alert('当前所在的位置到江北区的距离是：' + (map.getDistance(pointA, pointB)).toFixed(2) + ' 米。');  //获
          // alert('您的位置：' + r.point.lng+','+r.point.lat);
        }
        else {
          alert('failed' + this.getStatus());
        }
      });
    },

    continueApply() {
      let argu = { name: this.selectorValue };
      this.$router.push({
        name: 'recipeDetail',
        query: argu
      });
    },
    signUp() {
      this.$axios.post(appbizPatientRegistersign, {
        id: this.id * 1
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


    },
    signUpAgin() {
      let argu = {};
      this.$router.push({
        name: 'signagin',
        query: argu
      });
    },

    handler(name, active) {
      console.log(`Status of switch ${name} is ${active ? 'active' : 'inactive'}`)
    },
  }
};
</script>
<style  scoped>
.sign .downImg img {
  width: 26px !important;
  height: 14px !important;
  top: -3px;
  position: relative;
}
.signUp {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #1da1f3;
  text-align: center;
  margin: 0 auto;
  margin-top: 25%;
}
.signUpno {
  background: #9b9999;
}
.signUp p {
  color: #ffffff;
  line-height: 200px;
  font-size: 36px;
  letter-spacing: 2px;
}
.signUpTime {
  text-align: center;
  line-height: 100px;
}
.signUpAdress {
  font-size: 28px;
  text-align: center;
}
.signUpAgin {
  color: #1da1f3;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
}
.sign .md-notice-bar {
  color: #1da1f3 !important;
}
</style>

