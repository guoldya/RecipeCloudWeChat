<template>
    <div class="acceptAdd">
        <Header post-title="选择收获地址"  ></Header>
        <div class="outCarint margin45">
            <div class="outCarint">
                <div   v-for="(item,i) in addInfo">
                    <div class="cardText submitUser">
                        <div class="iconInfo">
                            <div class="addImg" >
                                <md-radio :name=i.toString() v-model="checked" @input="selectFun(checked)"  :select="selectRadio(checked)"/>
                            </div>
                            <div class="userInfo">
                                <div>
                                    <span>{{item.name}}</span>
                                    <span>{{item.tel}}</span>
                                    <span class="first" v-if="item.addDefault==1">默认</span>
                                </div>
                                <div>
                                    <span>{{item.add}}</span>
                                </div>
                            </div>
                        </div>
                        <div  class="addImg nextImg">
                            <img style="height: 18px" src="@/assets/images/icom_write.png" alt="">
                        </div>
                    </div>
                    <p class="partLine" v-if="i!=addInfo.length-1"></p>
                </div>
                <div class="addAddress">
                    <md-button type="primary" round>新增收获地址</md-button>
                </div>
            </div>

        </div>
    </div>
</template>
<script type="text/babel">
    export default {
        data() {
            return {
                favorites: [],
                addInfo:[
                    {name:"土木君",tel:"188****5489",add:"重庆市渝北区仙桃街道xx号",addDefault:"1"},
                    {name:"吴代儿",tel:"138****9549",add:"重庆市江北区开州大道xx号",addDefault:"-1"},
                    {name:"香香",tel:"159****4688",add:"重庆市渝北区仙桃街道xx号",addDefault:"-1"},
                ],
                checked: '0',

            };
        },
        created() {

        },
        mounted() {
            this.checked=this.$route.query.checked;
            document.title = '选择收获地址';
           
        },
        methods: {
            checkedFun:function(val){},
            selectFun(val){
                setTimeout(()=>{
                    let argu = {params:val,name:this.addInfo[val].name,tel:this.addInfo[val].tel,add:this.addInfo[val].add};
                    this.$router.push({
                        name: 'submitOrder',
                        query: argu
                    });
                },300)

            },
            selectRadio(val){
                //console.log(val);

            }
        },
        computed: {

        },

    };
</script>
<style   scoped>
    .acceptAdd .submitUser{
        display: flex;
        justify-content: space-between;
    }
    .acceptAdd .submitUser .iconInfo .userInfo{
        width: 480px;
        margin-left: 10px;
        line-height: 52px;
    }
    .acceptAdd .submitUser .iconInfo{
        display: flex;
    }
    .acceptAdd .submitUser .userInfo div span:not(:last-child){
        padding-right: 20px;
    }
    .acceptAdd .addImg {
        display: flex;
        align-items: center;
    }
    .acceptAdd .addImg img{
        align-items: center;
    }
    .acceptAdd .nextImg{
        justify-content: flex-end;
    }
    .acceptAdd .partLine{
        margin-bottom: 12px;
    }
    .acceptAdd .md-button{
        position: fixed;
        bottom: 20px;
        width: 654px;
    }
</style>