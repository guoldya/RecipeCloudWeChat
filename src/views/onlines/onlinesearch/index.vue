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
                  <div class="resulthistory" v-show="onlineHistory.length!=0">
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
                                    <li class="history" v-for="(item,index) in onlineHistory" :key="index">
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
                  onlineHistory: []
            }
      },
      mounted() {

            document.getElementsByClassName("oc_val")[0].focus();
            var aa = window.localStorage;
            if (aa.getItem("onlineHistory") != null && aa.getItem("onlineHistory") != undefined) {
                  var json = aa.getItem("onlineHistory");
                  this.onlineHistory = JSON.parse(json);
            }
      },
      methods: {
            resultT: function (value) {
                  this.SearchVal(value);
            },
            clearT: function (value) {
                  this.onlineHistory.splice(value, 1);
                  localStorage.setItem('onlineHistory', JSON.stringify(this.onlineHistory));
            },
            clear: function () {
                  this.onlineHistory = [],
                        localStorage.setItem('onlineHistory', JSON.stringify(this.onlineHistory));
            },
            SearchVal(val) {
                  if (!val) return;
                  val = val.trim() // 清除空格
                  if (this.onlineHistory.length > 0) { // 有数据的话 判断
                        if (this.onlineHistory.indexOf(val) !== -1) { // 有相同的，先删除 再添加 
                              this.onlineHistory.splice(this.onlineHistory.indexOf(val), 1)
                              this.onlineHistory.unshift(val);
                        } else { // 没有相同的 添加
                              this.onlineHistory.unshift(val);
                        }
                  } else { // 没有数据 添加
                        this.onlineHistory.unshift(val);
                  }
                  if (this.onlineHistory.length > 6) { // 保留六个值
                        this.onlineHistory.pop();
                  }

                  this.$router.push({
                        name: 'onlineresult',
                        query: { val: val }
                  });
                  localStorage.setItem('onlineHistory', JSON.stringify(this.onlineHistory));
            }

      }
}
</script>

<style scoped>
</style>

