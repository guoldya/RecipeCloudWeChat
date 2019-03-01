<template>
  <div class="online">
    <div :class="{'outCarint':true, }">
      <div class="onlineheader">在线问诊</div>
      <Search></Search>
      <div class="tools">
        <div class="nav2">
          <span @click="expertpage"><img src="@/assets/images/online1.png" alt="">内科</span>
          <span @click="expertpage"><img src="@/assets/images/online2.png" alt="">外科</span>
          <span @click="expertpage"><img src="@/assets/images/online3.png" alt="">妇科</span>
          <span @click="expertpage"><img src="@/assets/images/online4.png" alt="">产科</span>
        </div>
        <div class="nav2">
          <span><img src="@/assets/images/online5.png" alt="">儿科</span>
          <span><img src="@/assets/images/online6.png" alt="">五官科</span>
          <span><img src="@/assets/images/online7.png" alt="">骨科</span>
          <span><img src="@/assets/images/online8.png" alt="">皮肤科</span>
        </div>
      </div>
      <div class="tabA">
        <div class="tabAdiv">
          <div class="yellowWarn">关注的医生</div>
          <div class="tabAdivright">
            <img src="@/assets/images/online9.png" alt="">
          </div>
        </div>
        <div class="tabAdiv">
          <div class="yellowWarn">问诊记录</div>
          <div class="tabAdivright">
            <img src="@/assets/images/online10.png" alt="">
          </div>
        </div>
      </div>

      <md-tab-picker title="请选择科室" :data="Fdata" v-model="show" @change="chooseDepart" />
      <md-selector v-model="isSelectorShow" :data="sortData" @choose="chooseSort" title="选择排序"></md-selector>
      <md-action-sheet v-model="testshow" cancel-text="取消" confir-text="重置" @selected="$_selected" @cancel="$_cancel">
        <div>我是要一个</div>
      </md-action-sheet>
      <h2>药品资讯</h2>
      <div class="yaobutton">
        <div :class="{'yaoActive':isChecked==0}" @click="choose">
          {{addressStr}}
          <span class="downImg">
            <img v-show="isChecked==0" src="@/assets/images/top11.png">
            <img v-show="isChecked!=0" src="@/assets/images/icon_down.png">
          </span>
        </div>
        <div :class="{'yaoActive':isChecked==1}" @click="sort()">{{selectorValue}}
          <span class="downImg">
            <img v-show="isChecked==1" src="@/assets/images/top11.png">
            <img v-show="isChecked!=1" src="@/assets/images/icon_down.png">
          </span>
        </div>
        <div :class="{'yaoActive':isChecked==2}" @click="filter">筛选
          <span class="downImg">
            <img v-show="isChecked==2" src="@/assets/images/top11.png">
            <img v-show="isChecked!=2" src="@/assets/images/icon_down.png">
          </span>
        </div>
      </div>
      <div class="fast-consult-card-item">
        <div class="comment-info">
          <div class="header"><img src="@/assets/images/3.jpg"></div>
          <div class="comment-right">
            <p class="introduce">
              <span class="name">何某</span>&nbsp;
              <span>主任医师</span>&nbsp;
              <span>内科</span>&nbsp;
            </p>
            <p class="colo13">
              <span class="picture">图文</span>&nbsp;
              <span class="picture">电话</span>&nbsp;
              <span class="video">视频</span>&nbsp;
              <span class="reputation">好评率 98%</span>&nbsp;
            </p>
            <p class="content"> 擅长：儿科常见病、多发病 #先天性心脏病</p>
            <p class="colo13">
              <span>咨询数：66 </span>&nbsp;
              <span>平均回复时长：1小时</span>&nbsp; </p>
            <p class="price"> ￥20 起 </p>
            <em>已满</em>
          </div>
        </div>
        <!-- <div class="comment-info">
          <div class="header"><img src="@/assets/images/3.jpg"></div>
          <div class="comment-right">
            <p class="introduce">
              <span class="name">何某</span>&nbsp;
              <span>主任医师</span>&nbsp;
              <span>内科</span>&nbsp;
            </p>
            <p class="colo13">
              <span class="picture">图文</span>&nbsp;
              <span class="picture">电话</span>&nbsp;
              <span class="video">视频</span>&nbsp;
              <span class="reputation">好评率 98%</span>&nbsp;
            </p>
            <p class="content  "> 擅长：儿科常见病、多发病 #先天性心脏病</p>
            <p class="colo13">
              <span>咨询数：66 </span>&nbsp;
              <span>平均回复时长：1小时</span>&nbsp; </p>
            <p class="price"> ￥20 起</p>
            <em>已满</em>
          </div>
        </div>
        <div class="comment-info">
          <div class="header"><img src="@/assets/images/3.jpg"></div>
          <div class="comment-right">
            <p class="introduce">
              <span class="name">何某</span>&nbsp;
              <span>主任医师</span>&nbsp;
              <span>内科</span>&nbsp;
            </p>
            <p class="colo13">
              <span class="picture">图文</span>&nbsp;
              <span class="picture">电话</span>&nbsp;
              <span class="video">视频</span>&nbsp;
              <span class="reputation">好评率 98%</span>&nbsp;
            </p>
            <p class="content  "> 擅长：儿科常见病、多发病 #先天性心脏病</p>
            <p class="colo13">
              <span>咨询数：66 </span>&nbsp;
              <span>平均回复时长：1小时</span>&nbsp; </p>
            <p class="price"> ￥20 起</p>
            <em>已满</em>
          </div>
        </div> -->
      </div>
    </div>
    <div class="components-mask">
      <div class="online-mask"></div>
      <div class="g-filter-ssr--content">
        <section class="components-screenbox">
          <ul>
            <li class="components-screenbox--item">
              <h3>
                <label>服务类型</label>
                <div>
                </div>
              </h3>
              <div class="components-screenbox--other">
                <div>
                  <span class="tag chosen-condition">可咨询</span>
                  <span class="tag">可挂号</span>
                  <span class="tag">服务包</span>
                  <span class="tag">手术预约</span>
                </div>
              </div>
            </li>
            <li class="components-screenbox--item">
              <h3>
                <label>医院等级</label>
                <div>
                </div>
              </h3>
              <div class="components-screenbox--other">
                <div>
                  <span class="tag chosen-condition">三级甲等</span>
                </div>
              </div>
            </li>
            <li class="components-screenbox--item">
              <h3>
                <label>医生职称</label>
                <div>
                </div>
              </h3>
              <div class="components-screenbox--other">
                <div>
                  <span class="tag chosen-condition">主任医生</span>
                  <span class="tag">副主任医生</span>
                  <span class="tag">主治医生</span>
                </div>
              </div>
            </li>
          </ul>
          <div class="components-screenbox--btn-group">
            <a class="components-screenbox-reset">重置</a>
            <a class="components-screenbox-confirm">确定</a>
          </div>
        </section>
      </div>

    </div>

    <Footer></Footer>
  </div>

</template>
<script type="text/babel">
import { Field, FieldItem, TabPicker } from 'mand-mobile'

export default {
  name: 'action-sheet-demo',
  height: 500,

  data() {
    return {
      testshow: false,
      insurants: ['self'],
      isChecked: 0,
      show: false,
      isSelectorShow: false,
      address: [],
      addressStr: '科室',
      selectorValue: '排序',
      isWeixin: false,
      sortData: [
        {
          value: '1',
          text: '综合排序',
        },
        {
          value: '2',
          text: '问诊量',
        },
        {
          value: '3',
          text: '回复速度快',
        },
        {
          value: '4',
          text: '价格从高到低',
        },
        {
          value: '5',
          text: '价格从低到高',
        },
      ],
      Fdata: {
        // 唯一键名
        name: '科室',
        // 面板标签
        label: '科室',
        // 选项列表
        options: [
          {
            // 选项值
            value: "1",
            // 选项标签
            label: "骨科",
            // 级联子面板
            children: {
              name: '骨头断了',
              label: '骨头断了',
              options: [
                {
                  value: '骨头断了',
                  label: '骨头断了',
                }
              ]
            }
          },
          {
            // 选项值
            value: "2",
            // 选项标签
            label: "妇科",
            // 级联子面板
            children: {
              name: '妇科',
              label: '妇科',
              options: [
                {
                  value: '宫颈',
                  label: '宫颈',
                }
              ]
            }
          },
        ],
        testshow: false,

      }
    };
  },

  created() {

  },
  mounted() {
    document.title = '在线问诊';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
    } else {
      this.isWeixin = true;
    }
  },
  methods: {
    expertpage() {
      this.$router.push({
        name: 'expertpage',
        query: {}
      });
    },
    chooseSort(data) {
      this.selectorValue = (data.text).substring(0, 5);
    },
    choose() {
      this.show = !this.show;
      this.isChecked = 0;
    },
    sort() {
      this.isChecked = 1;
      this.isSelectorShow = true;
    },
    filter() {
      this.isChecked = 2;
      this.testshow = true;

    },

    $_selected(item) {
      Dialog.alert({
        content: `selected: ${JSON.stringify(item)}`,
      })
      console.log('action-sheet selected:', JSON.stringify(item))
    },
    $_cancel() {
      Dialog.alert({
        content: 'cancel',
      })
      console.log('action-sheet cancel')
    },
    chooseDepart({ options }) {
      this.address = options;
      this.addressStr = (options[0].label + options[1].label).substring(0, 5);
    },
    $_selected(item) {

      console.log('action-sheet selected:', JSON.stringify(item))
    },
    $_cancel() {

      console.log('action-sheet cancel')
    },

  },


};
</script>
 <style scoped>
@import url("./online.css");
</style>