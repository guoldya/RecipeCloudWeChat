<style>
    @import "index.css";
</style>
<template>
    <div class="identity">
        <mu-stepper :active-step="activeStep">
            <mu-step>
                <mu-step-label>手机验证</mu-step-label>
            </mu-step>
            <mu-step>
                <mu-step-label>身份验证</mu-step-label>
            </mu-step>
            <mu-step>
                <mu-step-label>资料确认</mu-step-label>
            </mu-step>
        </mu-stepper>
        <div class="checkbox"><input type="checkbox"><div>同意采集个人身份证信息</div></div>
        <div class="btn">成人身份证</div>
        <div class="btn">儿童身份证</div>
        <div class="btn">人脸识别</div>
        <div class="sm">
            <h4>说明：</h4>
            <p>1、<span class="color-red">成人</span>上传<span class="color-red">身份证的正面+反面</span>一共2张照片；或进行人脸识别；</p>
            <p>2、<span class="color-red">儿童</span>如果没有身份证，需上传<span class="color-red">父母其中一人</span>的<span class="color-red">身份证的正面+反面</span>一共2张照片；</p>
            <p>3、资料提交后，需医院人工审核，请耐心等待；</p>
            <p>4、请上传真实、清晰的证件照片，并填写正确的资料，以免造成就诊信息错误；</p>
            <p>5、<span class="color-red">注册成功后，三个月可解绑一次！</span></p>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                activeStep:1,
            }
        },
        mounted(){

        },
        methods:{

        }
    }
</script>