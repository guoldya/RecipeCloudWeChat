<style>
    @import "index.css";
</style>
<template>
    <div class="info">
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
        <div class="mobile">
            <p>手机号: <input type="text" name="fname" class="mobile-input" placeholder="请输入您的手机号码" v-model="mobile" @blur="validMobile"/></p>
            <img :src="zone" alt="" style="width: 20px;height:20px" class="img" v-if="valid">
        </div>
        <p class="info-color" v-if="mobileEmpty">请输入手机号</p>
        <p class="info-color" v-if="notValid">请输入正确的手机号</p>
        <div class="code">
            <p>验证码: <input type="text" name="fname" class="mobile-input" placeholder="请输入验证码" v-model="code" @blur="validCode"/></p>
            <div class="sendCode" @click="sendCode">{{codeText}}</div>
        </div>
        <p class="info-color" v-if="codeEmpty">请输入验证码</p>
        <div class="btn" @click="submit">提交</div>
    </div>
</template>
<script>
    import zone from '@/assets/images/icon_zone.png'
    export default {
        data(){
            return{
                activeStep:0,
                zone,
                valid:false,
                mobileEmpty:false,
                codeEmpty:false,
                mobile:'',
                code:'',
                notValid:false,
                timer:null,
                codeText:'发送验证码',
            }
        },
        mounted(){
            document.title = '填写社保卡信息'
        },
        methods:{
            validMobile(){
                if(!this.mobile){
                    this.mobileEmpty = true;
                    this.notValid = false
                }else if (!(/^(1[3584679]\d{9})$/.test(this.mobile))) {
                    this.mobileEmpty = false;
                    this.notValid = true
                }else{
                    this.mobileEmpty = false;
                    this.notValid = false;
                    this.valid = true
                }
            },
            validCode(){
                if(!this.code){
                    this.codeEmpty = true
                }else{
                    this.codeEmpty = false
                }
            },
            sendCode(){
                this.validMobile();
                if(!this.valid){
                    return
                }else{
                    let num = 60,that = this;
                    this.timer = setInterval(function () {
                        num--;
                        if(num == 0){
                            clearInterval(that.timer);
                            that.codeText = '重新发送';
                        }else{
                            that.codeText = '发送中'+ num +'s';
                        }
                    },1000);
                }
            },
            submit(){
                this.validMobile();
                this.validCode();
                if(!this.valid && !this.code){
                    return
                }else{
                    console.log(222)
                }
            }
        }
    }
</script>