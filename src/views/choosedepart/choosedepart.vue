<template>
  <div class="choosedepart">
    <Header post-title="选择科室"></Header>
    <div class=" margin50">
      <Search type="choosedepart" post-placeholder="请输入医生，科室名称"></Search>
      <div class="rightflatCardBtn">
        <Apptab :tab-title="departs" v-on:childByValue="childByValue" :depart="1"></Apptab>
      </div>
      
      <div class="departList" v-if="departList">
        <section class="classification_list">
          <div class="listSuperBox">
            <ul>
              <li v-for="(item,index) in departList" :key="index" @click="checkedFun(item,index,departList)">
                <a :class="{'list_cur':chooseID==item.id}">{{item.orgName}}</a>
              </li>
            </ul>
          </div>
          <div class="super_users_box">
            <div class="super_scllor">
              <div class="card-list">
                <ul>
                  <li v-for="(item2,index) in rightDepart" :key="index" @click="intodoctorList(item2)">
                    <a>{{item2.orgName}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">

let yuanquURL = "/api/hos/bdHospitalOrg/read/selectHospitalAreaList"
export default {
  data() {
    return {
      departs: [],
      chooseID: '',
      rightDepart: '',
      departList: '',
    };
  },
  created() {

  },

  mounted() {

    this.$axios.put(yuanquURL, {
      // orgId: _this.$route.query.hospitalId ? _this.$route.query.hospitalId * 1 : localStorage.getItem("hospitalId") * 1,
      orgType: 1
    }).then((res) => {
      if (res.data.code == '200') {
        if (res.data.total != 0) {
          this.departs = res.data.rows;
          for (let i = 0; i < res.data.rows.length; i++) {
            this.departs[i].title = res.data.rows[i].orgName;
          }
          if (!this.orgId) {
            this.orgId = res.data.rows[0].id;
          }
          this.$store.commit('departFun', res.data.rows[0].orgName);
          this.orgFun();
        } else {
          this.loadingtrue = false;
        }

      } else {
        console.log(res.msg);
      }
    }).catch(function (err) {
      console.log(err);
    });


  },
  methods: {
    checkedFun: function (val, i, departData) {
      this.chooseID = val.id
      this.rightDepart = departData[i].orgList
    },
    back() {
      if (this.TOKEN && !this.isWin) {
        WebViewJavascriptBridge.callHandler(
          'back'
          , {}
          , function (responseData) {

          }
        );
      } else {
        this.$router.go(-1)
      }
    },

    childByValue: function (childValue) {

      this.orgId = childValue.id;
      this.$store.commit('departFun', childValue.orgName);
      sessionStorage.setItem('feeActiveFun', childValue.id)
      this.loadingtrue = true;
      this.orgFun();

    },

    orgFun() {
      let deptparams = {};
      deptparams.pageSize = 1000;
      deptparams.orgType = 2;
      this.$axios.put(yuanquURL, deptparams).then((res) => {
        if (res.data.code == '200') {
          if (res.data.rows) {
            this.departList = res.data.rows;
          } else {
            this.departList = [];
          }

        }
      }).catch(function (err) {
        console.log(err);
      });
    },



    intodoctorList(data) {
      this.$router.push({
        name: 'doctorList',
        query: { deptId: data.id, today: this.$route.query.today, deptName: data.orgName, parentId: data.parentId, }
      });
    },




  },


};
</script>
 <style scoped>
@import "choosedepart.css";
.choosedepart .xuanze {
  font-size: 30px;
  /* margin-top: 30px; */
  border-bottom: 1px solid var(--primary--line);
  padding-bottom: 30px;
}
.choosedepart .margin20 {
  margin-top: 20px;
}
.choosedepart .cardText p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.choosedepart .buttonDepart {
  font-size: 14px;
  padding: 0 16px;
  line-height: 36px;
  border-radius: 5px;
  background: pink;
}
.choosedepart .cardText {
  padding: 0 16px;
}
.choosedepart .departRow {
  display: flex;
}
.choosedepart .departRow span {
  width: 50%;
  font-size: 13px;
  color: #0b0b0b;
}
.choosedepart .grid-cell {
  line-height: 50px;
}
.choosedepart .mubutton {
  color: #8a8a8a;
  border-radius: 5px;
  font-size: 28px;
  width: 180px;
  text-align: center;
  /* height: 60px; */
  /* padding: 0 10px; */
  line-height: 57px;
  border: 2px solid var(--primary);
  color: var(--primary);
  display: inline-block;
}
.choosedepart .activebtn {
  background: var(--primary);
  color: #ffffff;
}
.choosedepart .warn {
  font-size: 24px;
  color: #f44336;
}
.choosedepart .departLi {
  width: 100%;
  float: left;
  border-bottom: 1px solid var(--primary--line);
}
.choosedepart .grid-cell p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 50px;
}

.choosedepart .aui-footer {
  width: 120px;
  z-index: 100;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  height: 120px;
  background-color: var(--primary);
  position: fixed;
  bottom: 30px;
  text-align: center;
  color: #ffffff;
  border-radius: 50%;
  right: 24px;
  box-shadow: 2px 0px 2px 2px rgba(0, 0, 0, 0.2);
}
.choosedepart .aui-footer:after {
  border-top: none;
}
.choosedepart .aui-footer span {
  font-size: 32px;
  position: relative;
  text-align: center;
  left: 16px;
  letter-spacing: 1px;
}

/**tab样式*/

#app .choosedepart .md-cell-item-title {
  font-size: 15px;
}
</style>