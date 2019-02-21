<template>
  <div class="workdoctor">
    <Header post-title="医生排班" v-show="isWeixin"></Header>
    <div :class="{'outCarint':false,'margin45':isWeixin,'margin7':!isWeixin}">
      <div class="yy_date_today">
        <span class="date_today">{{choosedate}}</span>
        <a @click="isSeemore=!isSeemore" id="date_btn" class="change_date" href="javascript:void(0);">更多时间
          <span :class="{'time_btn':true,'tinmdown':!isSeemore,'tinmup':isSeemore}" ></span>
        </a>
      </div>
      <div class="yy_date_wrap">
        <div class="wx_week">
          <a v-for="(item,index) in dayWeek" :key="index+'aa'">{{item}}</a>
        </div>
      </div>
      <div :class="{'yy_date':true,'yy_dateAA':isSeemore}">
        <div v-for="(item,index) in time" :key="index+'aa'" @click="choose(item,index)">
          <span class="state_full" :class="{'state_full':true,'current': index == active}">
            <span class="date">{{item.date}}</span>
            <input type="hidden" class="getFullDate" value="2019-02-16">
            <span>无号</span>
          </span>
        </div>
        <div>
          <span class="state_full have">
            <span class="date">14</span>
            <input type="hidden" class="getFullDate" value="2019-02-14">
            <span>剩 13</span>
          </span>
        </div>
      </div>
      <div class="doctorList outCarint margin16">
        <ul>
          <li>
            <div class="card" @click="intodoctordetail">
              <div class="cardText">
                <div class="headimg"><img src="@/assets/images/user.png" alt="医生头像"></div>
                <div>
                  <p class="headname">刘秀娟
                    <span class="levle">主任医师</span>
                    <span class="have">余56</span>
                  </p>
                  <p class="headdesc">擅长:儿科、新生儿疾病、急救医学儿科、新生儿疾病、急救医学儿科、新生儿疾病、急救医学</p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="card" @click="intodoctordetail">
              <div class="cardText">
                <div class="headimg"><img src="https://kano.guahao.cn/iPb2687320_image140.jpg?timestamp=1504077956258" alt="医生头像"></div>
                <div>
                  <p class="headname">孙强
                    <span class="levle">副主任医师</span>
                    <span class="have">余56</span>
                  </p>
                  <p class="headdesc">擅长:前列腺增生微创治疗、腹腔镜及输尿管镜等腔内泌尿外科、泌尿系肿瘤的诊...</p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="card" @click="intodoctordetail">
              <div class="cardText">
                <div class="headimg"><img src="https://kano.guahao.cn/u0w2684511_image140.jpg" alt="医生头像"></div>
                <div>
                  <p class="headname">胡必杰
                    <span class="levle">主任医师</span>
                    <span class="have">余56</span>
                  </p>
                  <p class="headdesc">擅长:心脏病的临床诊断，心血管影像诊断，尤其是各种冠心病治疗方法的合理选择。</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                active: 0,
                value: '',
                isSeemore: false,
                choosedate: '',
                isWeixin: false,
                time: [],
                dayWeek: ["日", "一", "二", "三", "四", "五", "六"],
            }
        },
        mounted() {
          
            document.title = '医生排班';
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.isWeixin = false;
            } else {
                this.isWeixin = true;
            };
            var today = new Date();
            this.choosedate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
            this.getData();
            this.addWeek();

        },
        methods: {
            choose(value, index) {
                this.active = index;
                this.choosedate = value.year + '-' + value.month + '-' + value.date;
            },
            getData() {
                for (let i = 0; i < 30; i++) {
                    let nowTime = new Date();
                    let d = nowTime.setDate(nowTime.getDate() + i - 1);
                    let data = this.addDate(d, 1);
                    let time = {};
                    time = { date: data.newData, month: data.newMonth, year: data.newYear }
                    this.time.push(time);
                }
            },
            addWeek() {
                var today = new Date();
                var dayWeeka = this.dayWeek.slice(0, today.getDay());
                var dayWeekb = this.dayWeek.slice(today.getDay(), 7);
                this.dayWeek = dayWeekb.concat(dayWeeka);
            },
            addDate(val, days) {
                var d = new Date(val);
                var data = {};
                let dayArr = ["日", "一", "二", "三", "四", "五", "六"];
                d.setDate(d.getDate() + days);
                var m = d.getMonth() + 1;
                var y = d.getFullYear();
                var newDay = dayArr.slice(0, d.getDay());
                data.newData = d.getDate();
                data.newDay = newDay;
                data.newMonth = d.getMonth() + 1;
                data.newYear = d.getFullYear();
                return data;
            },
            intodoctordetail() {
                let argu = {}
                this.$router.push({
                    name: 'doctordetail',
                    query: argu
                });
            },



        }
    }
</script>

<style scoped>

  
</style>

