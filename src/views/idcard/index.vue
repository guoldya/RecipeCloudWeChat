<style>
    @import "index.css";
</style>
<template>
    <div>
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
        <div class="idCard">
            <div class="id-title">请上传证件照片</div>
        </div>
        <div class="id-photo">
            <div>
                <label>
                    <input @change="uploadPos($event)" type="file" name="positive" id="positive" accept="image/gif,image/jpeg,image/x-png"/>
                    <div class="photo">
                        <img :src="posUrl" alt="">
                    </div>
                </label>
                <div class="pos-btn">上传正面照</div>
            </div>
            <div>
                <label>
                    <input @change="uploadOth($event)" type="file" name="outside" id="outside" accept="image/gif,image/jpeg,image/x-png"/>
                    <div class="photo">
                        <img :src="othUrl" alt="">
                    </div>
                </label>
                <div class="pos-btn">上传反面照</div>
            </div>
        </div>
        <div class="btn">下一步</div>
        <div class="slt">
            <h4 class="color-red">身份证上传示例:</h4>
            <div class="slphoto"></div>
        </div>
    </div>
</template>
<script>
    import zone from '@/assets/images/icon_zone.png'
    export default {
        data(){
            return{
                activeStep:1,
                posUrl:zone,
                othUrl:zone,
                files:{
                    posFile:null,
                    othFile:null
                }
            }
        },
        mounted(){
            document.title = '身份验证';
        },
        methods:{
            uploadPos(e){
                let that = this,file = e.target.files[0],fileReader = new FileReader();
                this.files.posFile = file;
                fileReader.readAsDataURL(file);
                fileReader.onload = function () {
                    that.posUrl = this.result;
                }
            },
            uploadOth(e){
                let that = this,file = e.target.files[0],fileReader = new FileReader();
                this.files.othFile = file;
                fileReader.readAsDataURL(file);
                fileReader.onload = function () {
                    that.othUrl = this.result;
                }
            }
        }
    }
</script>