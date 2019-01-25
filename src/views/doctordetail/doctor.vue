 
<template>
    <div :class="{'outCarint':true,'margin45':isWeixin}">
        <Header post-title="医生详情" v-show="isWeixin"></Header>
        <div class="doctor-head">
            <div class="doctor-img float-left">
                <img :src="img" alt="医生图片">
            </div>
            <div class="doctor-inro float-left">
                <div class="doctor-decrib">
                    <p>
                        <span class="doctor-name">付平 </span>
                        <span class="doctor-tag"> 特需门诊</span>
                    </p>
                    <p>四川大学华西医院</p>
                    <p>特需医疗中心</p>
                </div>
            </div>
            <div class="heart float-right">
                <span class="deta">预约</span>
            </div>
        </div>
        <!-- <ul class="doctor-cz">
            <li>
                <img :src="start" alt="关注">
                <p>电话问诊</p>
            </li>
            <li>
                <img :src="start" alt="关注">
                <p>在线门诊</p>
            </li>
            <li>
                <img :src="start" alt="关注">
                <p>申请随访</p>
            </li>
        </ul> -->
        <div class="doctor-info">付平，男，1967年生，医学博士，教授、博士，发地方噶十多个山东分公司</div>
        <div class="doctor-skill">
            <div class="skill-head">
                <span class="skill-head-title">专业擅长</span>
                <div class="skill-icon float-right" @click="toggleClick">
                    <span v-if="collapsed" style="color: #1976d2">收起</span>
                    <span v-else style="color: #1976d2">展开</span>
                </div>
            </div>
        </div>
        <div :style="{height:collapsed?'100px':'0'}" class="skill-info">
            双方的公司发的两个教室里发动机盖分类登记过类似的飞机过来送积分代理公司东方辅导老师国家历史的房价高了三季度发了个是独立发几个楼上的房间管理卡士大夫
        </div>
        <div class="source-tab">
            <div class="available float-left" :class="isActive?'active-tab':''" @click="tabChange(1)">可用号源</div>
            <div class="all-source float-right" :class="isActive?'':'active-tab'" @click="tabChange(2)">全部号源</div>
        </div>
        <div v-if="isActive">
            <ul class="available-info">
                <li>
                    <div>2018-12-25 星期二 上午 华西院区<br/>医疗主治：肾脏内科</div>
                    <div class="available-tag">已满</div>
                </li>
                <li>
                    <div>2018-12-25 星期二 上午 华西院区<br/>医疗主治：肾脏内科</div>
                    <div class="available-tag">已满</div>
                </li>
                <li>
                    <div>2018-12-25 星期二 上午 华西院区<br/>医疗主治：肾脏内科</div>
                    <div class="available-tag">已满</div>
                </li>
                <li>
                    <div>2018-12-25 星期二 上午 华西院区<br/>医疗主治：肾脏内科</div>
                    <div class="available-tag">已满</div>
                </li>
                <li>
                    <div>2018-12-25 星期二 上午 华西院区<br/>医疗主治：肾脏内科</div>
                    <div class="available-tag available-have">余12</div>
                </li>
                <li>
                    <div>2018-12-25 星期二 上午 华西院区<br/>医疗主治：肾脏内科</div>
                    <div class="available-tag">已满</div>
                </li>
            </ul>
        </div>
        <div v-else>
            <ul class="available-info">
                <li>
                    <div>2018-12-25 星期二 上午 华西院区<br/>医疗主治：肾脏内科</div>
                    <div class="available-tag">已满</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import img from '@/assets/images/3.jpg';
import start from '@/assets/images/icon_star@2x.png'

export default {
    data() {
        return {
            isWeixin: false,
            img,
            start,
            collapsed: false,
            isActive: true,
        }
    },
    mounted() {
        document.title = '医生详情';
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            this.isWeixin = false;
            return true;
        } else {
            this.isWeixin = true;
            return false;
        }
    },
    methods: {
        toggleClick() {
            this.collapsed = !this.collapsed
        },
        tabChange(val) {
            if (val == 1) {
                this.isActive = true
            } else {
                this.isActive = false
            }
        }
    }
}
</script>
<style scoped>
@import "doctor.css";
</style>