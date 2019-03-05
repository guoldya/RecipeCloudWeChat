<template>
   <div :class="{'outCarint':true,'margin45':isWeixin}">
      <Header post-title="专家问诊" v-show="isWeixin"></Header>
      <!-- 搜索框 -->
      <Search></Search>
      <md-tab-picker title="请选择科室" :data="Fdata" v-model="isDepartShow" @change="chooseDepart" />
      <md-selector v-model="isSortShow" :data="sortData" @choose="chooseSort" title="选择排序"></md-selector>
      <!-- 查询菜单栏 -->
      <div class="selectTool">
         <div :class="isChecked == 0?'isActive':''" @click="department">
          <span>{{departmentText}}</span>
          <span class="downImg">
            <img v-if="isChecked==0" src="@/assets/images/top11.png">
            <img v-else src="@/assets/images/icon_down.png">
          </span>
         </div>
         <div :class="isChecked == 1?'isActive':''" @click="sort">
          <span>{{sortText}}</span>
             <span class="downImg">
            <img v-if="isChecked==1" src="@/assets/images/top11.png">
            <img v-else src="@/assets/images/icon_down.png">
          </span>
         </div>
         <div :class="isChecked == 2?'isActive':''" @click="filterCotent">
          <span>筛选</span>
           <span class="downImg">
            <img v-if="isChecked==2" src="@/assets/images/top11.png">
            <img v-else src="@/assets/images/icon_down.png">
          </span>
         </div>
      </div>
      <!-- 列表 -->
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
        </div>
      </div>
   </div>
</template>
<script type="text/babel">
import { Field, FieldItem, TabPicker } from 'mand-mobile'

export default {
   data() {
      return {
         isWeixin: false,
         isChecked:0,
         departmentText: '科室',
         sortText:'排序',
         isDepartShow:false, // 控制选择科室弹窗是否显示
         isSortShow:false, // 控制选择排序弹窗是否显示
         sortData: [  // 排序数据
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
         Fdata: { // 科室数据
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
      document.title = '专家问诊';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
      } else {
         this.isWeixin = true;
      }
   },
   methods: {
    // 科室选择
    department() {
      this.isChecked = 0;
      this.isDepartShow = true;
    },
    // 排序选择
    sort() {
      this.isChecked = 1;
      this.isSortShow = true;
    },
    // 内容筛选
    filterCotent() {
      this.isChecked = 2;
    },
    // 科室选择弹窗返回的数据
    chooseDepart({options}) {
      this.departmentText = (options[0].label + options[1].label).substring(0, 5);
    },
    // 排序选择返回数据
    chooseSort(data){
      this.sortText = data.text
     
    } 
   },
   computed: {

   },

};
</script>
 <style scoped>
 @import url('./expertpage.css');
</style>