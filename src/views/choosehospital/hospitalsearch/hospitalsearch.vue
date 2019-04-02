<template>
      <div class="result">
            <Header post-title="搜索"></Header>
            <div class="margin50" style="background-color: #ffffff">
                  <div class="search">
                        <form action="">
                              <input type="search" v-model="value" placeholder="搜索医院" autofocus="autofocus" class="oc_val" @keyup.enter="SearchVal(value)">
                        </form>
                  </div>
            </div>
            <!-- <form action="">
                  <div class="g-suggest">
                        <div class="g-suggest--input">
                              <div class="g-suggest--input-wrap"><input type="search" placeholder="搜索医生、疾病、科室，查看本院医生"></div>
                              <span class="g-search--input-cancel">取消</span>
                        </div>
                  </div>
            </form> -->
            <div class="line"></div>
            <div class="outCarint" style="background-color: #ffffff">
                  <div class="resulthistory" v-show="HistoryHosiptalList.length!=0">
                        <div class="history">
                              <div class="container fl">
                                    <span class="lf">搜索历史</span>
                                    <span class="clear rt" @click="clear()">
                                          <md-icon name="delete" @click="clearT()"></md-icon>
                                    </span>
                              </div>
                        </div>
                        <div>
                              <ul class="emp">
                                    <li class="history" v-for="(item,index) in HistoryHosiptalList" :key="index">
                                          <span class="hj" @click="resultT(item)">{{item}}</span>
                                          <span class="delete">
                                                <md-icon name="close" @click="clearT(index)"></md-icon>
                                          </span>
                                    </li>
                                    <p class="noMore">没有更多记录了</p>
                              </ul>
                        </div>
                  </div>
            </div>
      </div>

</template>

<script>
export default {
      data() {
            return {
                  value: '',
                  HistoryHosiptalList: []
            }
      },
      mounted() {

            document.getElementsByClassName("oc_val")[0].focus();
            var aa = window.localStorage;
            if (aa.getItem("HistoryHosiptalList") != null && aa.getItem("HistoryHosiptalList") != undefined) {
                  var json = aa.getItem("HistoryHosiptalList");
                  this.HistoryHosiptalList = JSON.parse(json);
            }
      },
      methods: {
            resultT: function (value) {
                  this.SearchVal(value);
            },
            clearT: function (value) {
                  this.HistoryHosiptalList.splice(value, 1);
                  localStorage.setItem('HistoryHosiptalList', JSON.stringify(this.HistoryHosiptalList));
            },
            clear: function () {
                  this.HistoryHosiptalList = [],
                        localStorage.setItem('HistoryHosiptalList', JSON.stringify(this.HistoryHosiptalList));
            },
            SearchVal(val) {
                  if (!val) return;
                  val = val.trim() // 清除空格
                  if (this.HistoryHosiptalList.length > 0) { // 有数据的话 判断
                        if (this.HistoryHosiptalList.indexOf(val) !== -1) { // 有相同的，先删除 再添加 
                              this.HistoryHosiptalList.splice(this.HistoryHosiptalList.indexOf(val), 1)
                              this.HistoryHosiptalList.unshift(val);
                        } else { // 没有相同的 添加
                              this.HistoryHosiptalList.unshift(val);
                        }
                  } else { // 没有数据 添加
                        this.HistoryHosiptalList.unshift(val);
                  }
                  if (this.HistoryHosiptalList.length > 6) { // 保留六个值
                        this.HistoryHosiptalList.pop();
                  }
              
                  this.$router.push({
                        name: 'hospitalresult',
                        query: {val:val}
                  });
                  localStorage.setItem('HistoryHosiptalList', JSON.stringify(this.HistoryHosiptalList));
            }

      }
}
</script>

<style scoped>
/* .g-suggest {
  position: relative;
  height: 92px;
  background-color: #fff;
}
.g-suggest--input {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 16px 24px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.g-suggest--input-wrap {
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 1%;
  margin-right: 20px;
}
.g-suggest--input-wrap:before {
  position: absolute;
  z-index: 1;
  content: "";
  width: 28px;
  height: 28px;
  left: 22px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  background: url(./search.png) no-repeat 50%;
  background-size: cover;
}
.g-suggest--input-wrap input[type="search"] {
  padding: 10px 56px 10px 72px;
  background: #f0f3fa;
  width: 100%;
  height: 70px;
  line-height: 40px;
  font-size: 28px;
  color: var(--primary--content);
  border-radius: 5px;
  border: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
}
.g-search--active .g-search--input-cancel {
  display: block;
  color: var(--primary--content);
  font-size: 28px;
} */
</style>

