<template>

  <div class="container">
    <div class="heade-box">
      <div class="header">
        <ul class="header-cont">
          <li v-for="one in menu" @click="currentMenu(one)" :class="{liActive:current.title==one.title}">
            <img :src="one.icon" height="26" width="26">
            <p>{{one.title||''}}</p>
          </li>
        </ul>
        <div class="header-right">
          <p class="header-touxiang">
            <img src="images/touxiang.png" height="36" width="36">
            <span>管理员</span>
          </p>
          <p class="header-back">
            <a href="###">退出</a>
          </p>
        </div>
      </div>
    </div>
    <ul class="subnav" v-if="current.childs&&current.childs.length>0">
      <li v-for="two in current.childs" @click="currentSecMenu(two)" :class="{subActive:two.title==currentTow.title}">
        <span>{{two.title||''}}</span>
        <img v-if="two.title==currentTow.title" src="images/arrowTop.png" height="7" width="14">
      </li>
    </ul>
    <div class="content" v-if="currentTow.childs&&currentTow.childs.length>0">
      <div class="content-left">
        <ul class="contentLeft-title">
          <li v-for="three in currentTow.childs" @click="currentThree=three" :class="{leftActive:three.title==currentThree.title}">
            <a :class="{leftHref:three.title==currentThree.title}" target="iframe" :href="three.href">
              <b :class="{leftActive:three.title==currentThree.title}"></b>
              <span> {{three.title||''}}</span>
              <img v-if="three.title==currentThree.title" src="images/arrowLeft.png" height="14" width="7">
            </a>
          </li>
        </ul>
      </div>
      <div class="content-right">
        <iframe scrolling="no" frameborder="0" name="iframe" id="iframe"></iframe>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'myAddress',
  data() {
    return {
      menu: [
        {
          title: '综合运行', icon: 'images/nav1.png', childs:
            [
              {
                title: '实时监控', childs: [
                  { title: '河道监控', href: 'http://www.baidu.com' },
                  { title: '泵闸站监控', href: 'http://www.baidu.com' },
                ]
              },
              {
                title: '无人机监控', childs: []
              },
              {
                title: '水位监测', childs: [
                  { title: '河道水位', href: 'http://www.baidu.com' },
                  { title: '窨井水位', href: 'http://www.baidu.com' },
                ]
              },
              {
                title: '水质监测', childs: []
              },
              {
                title: '应急处置车辆定位监控', childs: []
              }
            ]
        },
        { title: '河道实景系统', icon: 'images/nav2.png', childs: [] },
        {
          title: '管网信息', icon: 'images/nav3.png', childs: [
            {
              title: '流量流向信息分析', childs: []
            },
            {
              title: '横断面信息分析', childs: []
            },
            {
              title: '纵剖面信息分析', childs: []
            },
            {
              title: '连通性分析', childs: []
            },
            {
              title: '预警分析', childs: []
            },
            {
              title: '污染源分析', childs: []
            },
            {
              title: '污染源追踪', childs: []
            },
            {
              title: '排放口分析', childs: []
            }
          ]
        },
        { title: '管网三维模型系统', childs: [] },
        {
          title: '巡检管理', childs: [
            {
              title: '巡检计划', childs: []
            },
            {
              title: '审核分配', childs: []
            },
            {
              title: '任务接收信息', childs: []
            },
            {
              title: '任务执行信息', childs: []
            },
            {
              title: '任务完成审核', childs: []
            },
            {
              title: '巡查单查询', childs: []
            }
          ]
        },
        {
          title: '报警信息', childs: [
            {
              title: '实时报警信息', childs: []
            },
            {
              title: '报警类别分析', childs: []
            },
            {
              title: '报警级别分析', childs: []
            },
            {
              title: '报警对象信息', childs: []
            },
            {
              title: '报警处理信息', childs: []
            },
            {
              title: '报警信息统计', childs: []
            }
          ]
        },

        {
          title: '应急指挥', childs: [
            {
              title: '防汛预案基本信息', childs: []
            },
            {
              title: '防汛组人员物资信息', childs: []
            },
            {
              title: '防汛值班管理', childs: []
            },
            {
              title: '防汛值班日志', childs: []
            },
            {
              title: '灾情上报', childs: []
            },
            {
              title: '防汛报告文件上传', childs: []
            },
            {
              title: '灾情上报', childs: []
            }
          ]
        },
        {
          title: '长效管理', childs: [
            {
              title: '水位水质历史信息', childs: []
            },
            {
              title: '积水历史', childs: []
            },
            {
              title: '阻水历史', childs: []
            },
            {
              title: '汛期信息历史', childs: []
            },
            {
              title: '避灾点使用信息', childs: []
            },
            {
              title: '无人机视频拍摄信息', childs: []
            },
          ]
        },
      ],
      current: menu[0],
      currentTow: menu[0].childs[0],
      currentThree: menu[0].childs[0].childs[0]
    }
  },
  methods: {
    currentMenu(item) {
      this.current = item || [];
      this.currentTow = item.childs[0] || [];
    },
    currentSecMenu(item) {
      this.currentTow = item || [];
      this.currentThree = item.childs[0] || []
    },
  }
}

</script>

<style   scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
}

html,
body {
  height: 100%;
  width: 100%;
}

.container {
  height: 100%;
  width: 100%;
}
.heade-box {
  height: 110px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.header {
  width: 100%;
  height: 110px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #3e68f0;
  position: relative;
}
.header-cont {
  display: flex;
  flex-direction: row;
  color: #fff;
}
.header-cont li {
  padding: 0 25px;
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.header-cont li img {
  margin-bottom: 8px;
}

.header-right {
  position: absolute;
  right: 40px;
  display: flex;
  color: #fff;
}

.header-back {
  padding-left: 40px;
  height: 110px;
  line-height: 110px;
}
.header-right a {
  color: #fff;
  text-decoration: none;
}
.header-touxiang {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 110px;
  align-items: center;
}
.header-touxiang img {
  margin-right: 10px;
}

.liActive {
  background-color: #7391f3;
}

.subnav {
  width: 100%;
  height: 60px;
  background-color: #fff;
  padding-left: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #4464ed;
  position: absolute;
  top: 110px;
  left: 0;
}
.subnav li {
  height: 60px;
  padding: 0 15px;
  color: #7e7e7e;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.subnav li.subActive {
  color: #3e68f0;
}

.subnav li img {
  position: absolute;
  bottom: 0;
}
.content {
  position: absolute;
  top: 170px;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.content-left {
  width: 240px;
  background-color: #fff;
  height: 100%;
}

.content-right {
  flex: 1;
  background-color: #f4f7ff;
  position: relative;
}
.contentLeft-title {
  width: 240px;
}
.contentLeft-title li {
  height: 60px;
  width: 240px;
  line-height: 60px;
  color: #7e7e7e;
  border-bottom: 1px solid #f0f0f0;
}

.contentLeft-title li b {
  height: 6px;
  width: 6px;
  display: inline-block;
  background-color: #7e7e7e;
  border-radius: 100%;
  margin-right: 10px;
  position: absolute;
  left: 55px;
}
.contentLeft-title li a {
  text-decoration: none;
  color: #7e7e7e;
  display: flex;
  height: 60px;
  width: 240px;
  padding-left: 70px;
  align-items: center;
  position: relative;
}
.contentLeft-title li img {
  position: absolute;
  right: 0;
}

.contentLeft-title li a.leftHref {
  color: #fff;
}
.contentLeft-title li.leftActive {
  background-color: #3e68f0;
}

.contentLeft-title li b.leftActive {
  background-color: #fff;
}

#iframe {
  margin: 2px;
  border: none;
  height: 99%;
  width: 99.3%;
}
</style>