<template>
    <div class="result">
        <Header post-title="搜索医生"></Header>
        <div class="outCarint" style="margin-top:1.2rem">
            <div style="text-align:center;">
                <input v-model="value" placeholder="搜索医生" class="oc_val" @input="loadMorelist(value)">
            </div>
            <div class="mu-sub-header margin14">医生</div>
            <Skeleton v-if="isloading"></Skeleton>
            <md-cell-item v-else v-for="(item,index) in doctorList" :key="index+'aa'" @click="intodoctorinfo(item)" :title="item.name" :brief="item.introduce" arrow>
                <span class="holder" slot="left"><img src="@/assets/images/user.png"></span>
            </md-cell-item>

            <div class="loadmore" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                <md-icon v-if="!isloading && busy" name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                <div class="nomore" v-if="doctorParams.pageNumber == doctorPages">
                    没有更多了
                </div>
            </div>
            <div v-if="doctorList.length==0" class="margin7">
                <p>暂无医生信息</p>
            </div>
        </div>
    </div>
</template>
<script>
let selectDoctorList = "/bdHospitalDoctor/read/selectDoctorPage";
export default {
    data() {
        return {
            isloading: true, // 是否正在请求
            busy: false, // 用于请求添加页面
            value: '',
            doctorList: [],
            doctorParams: {
                pageNumber: 1,
            },
        }
    },
    async mounted() {
        document.title = '搜索医生';
        document.getElementsByClassName("oc_val")[0].focus();
        this.isloading = false;
    },
    methods: {
        intodoctordetail() {
            let argu = {}
            this.$router.push({
                name: 'doctordetail',
                query: argu
            });
        },
        intodoctorList(title) {
            let argu = { title: title }
            this.$router.push({
                name: 'doctorList',
                query: argu
            });
        },

        intodoctorinfo(data) {
            this.$router.push({
                name: 'doctordetail',
                query: { doctorId: data.id, islist: 1 }
            });
        },


        // loadMorelist(value) {
        //     this.doctorList = [];
        //     value = value.trim(); // 清除空格
        //     if (!value) return;
        //     let _this = this;
        //     console.log("搜索数据", value);
        //     clearTimeout(this.t);
        //     this.t = setTimeout(function () {
        //         _this.$axios.put(selectDoctorList, {
        //             keyword: value
        //         }).then(function (res) {
        //             if (res.data.code == '200') {
        //                 console.log("状态", res.data.rows);
        //                 _this.doctorList = res.data.rows;

        //             } else {
        //             }
        //         }).catch(function (err) {

        //         });
        //     }, 300);
        // },

        // 得到推荐医生
        async loadMorelist() {
            this.doctorList = [];
            if (this.value)
                this.doctorParams.keyword = this.value;
            try {
                let res = await this.$axios.put(selectDoctorList, this.doctorParams);
                if (res.data.code != 200) {
                    throw Error(res.data.msg);
                }
                if (res.data.rows) {
                    this.doctorList = this.doctorParams.pageNumber == 1 ? res.data.rows : this.doctorList.concat(res.data.rows);
                }
                this.doctorPages = res.data.pages;
                this.doctorParams.pageNumber = res.data.current;
            } catch (error) {
                console.log(error.message);
            }
        },
        loadMore() {
            if (this.isloading) return false;
            if (this.doctorParams.pageNumber == this.doctorPages) return false;
            this.busy = true;
            setTimeout(() => {
                this.doctorParams.pageNumber++;
                this.loadMorelist();
                this.busy = false;
            }, 1000);
        },


    }
}
</script>

<style scoped>
@import url("../result/result.css");
</style>

