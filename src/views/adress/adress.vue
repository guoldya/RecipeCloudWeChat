<template>
    <div class="adress">
        <Header post-title="地址管理"></Header>
        <div class=" margin55" style="margin-bottom:70px">
            <ul v-if="addressInfo.length!=0" v-show="!loadingtrue">
                <li v-for="(item,index) in addressInfo" :key="index">
                    <div class="flatCard">
                        <div class="outCarint">
                            <div class="addImg" >
                                <div class="selectIcon">
                                    <md-radio :name=index.toString() v-model="checked" @input="selectFun(checked)"  :select="selectRadio(checked)"/>
                                </div>
                                <div class="reciverInfo">
                                    <div class="order-number">
                                        <span class="patientName">{{item.receiver}}</span>
                                        <span>{{item.mobile}}</span>
                                    </div>
                                    <div> <span>{{item.address}}</span> </div>
                                </div>
                            </div>
                            <p class="partLine"></p>
                            <p class="order-bottom">
                                <span class="fr">
                                    <span @click="adressinfo(item)" class="bbb mui-icon mui-icon-compose">
                                        <label class="bianji">编辑</label>
                                    </span>
                                    <span class="mui-icon" style="font-size: 13px;" @click="dedete(item.id)">
                                        <img class="lajitong" src="@/assets/images/lajitong.png"> 删除
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>

            <div v-show="!loadingtrue" v-else class="nullDurg">
                <img src="@/assets/images/null1.png" alt="">
            </div>
        </div>
        <Loading v-show="loadingtrue"></Loading>
        <div style="height: 50px"></div>
        <p class="addbTN" @click="addadress()">添加地址</p>

    </div>
</template>
<script type="text/babel">
import { Toast } from 'mand-mobile';
import { Dialog, Button } from 'mand-mobile'

let appshippingAddressaddressList = "/app/shippingAddress/addressList";
let deleteAddress = "/app/shippingAddress/delete";

let isDefault = "/app/shippingAddress/isDefault"
export default {
    data() {
        return {
            loadingtrue: true,
            num: 7,
            checked: '',
            addressInfo: '',

            // agreeConf: {
            //     checked: true,
            //     name: 'agree0',
            //     size: 'md',
            //     disabled: false,
            //     introduction: '选中状态',
            // },
        };
    },
    created() {
        this.$axios.put(appshippingAddressaddressList, {
        }).then((res) => {
            this.loadingtrue = false;
            if (res.data.code == '200') {
                this.addressInfo = res.data.rows;
            } else {
                console.log(res.msg);
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    watch: {

    },
    mounted() {
        this.checked=this.$route.query.checked;
        document.title = '地址管理';

    },
    methods: {

        onChange(data, index) {
            if (index == 1) {
                return
            }
            this.$axios.post(isDefault, {
                id: data
            }).then((res) => {
                if (res.data.code == '200') {
                    this.$toast.info("设置成功");
                    this.$axios.put(appshippingAddressaddressList, {
                    }).then((res) => {
                        if (res.data.code == '200') {
                            this.addressInfo = res.data.rows;
                        } else {
                            console.log(res.msg);
                        }
                    }).catch(function (err) {
                        console.log(err);
                    });
                } else {
                    console.log(res.msg);
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        dedete(data) {
            console.log(data)
            let params = {}, p_data = {};
            p_data.id = data;
            params.data = p_data;
            Dialog.confirm({
                title: '确认',
                content: '请确认删除该地址吗',
                confirmText: '确定',
                onConfirm: () => {
                    this.$axios.delete(deleteAddress, params).then((res) => {
                        console.log(res)
                        if (res.data.code == '200') {
                            this.$toast.info("删除成功");
                            this.$axios.put(appshippingAddressaddressList, {
                            }).then((res) => {
                                if (res.data.code == '200') {
                                    this.addressInfo = res.data.rows;
                                } else {
                                    console.log(res.msg);
                                }
                            }).catch(function (err) {
                                console.log(err);
                            })
                        } else {
                            console.log(res.msg);
                        }
                    }).catch(function (err) {
                        console.log(err);
                    });
                }
            })
        },
        adressinfo(data) {
            this.$router.push({
                name: 'adressinfo',
                query: { id: data.id, isDefault: data.isDefault }
            });
        },
        addadress() {
            this.$router.push({
                name: 'adressinfo',
                query: { addadress: 1 }
            });
        },
        selectRadio(val){
            //console.log(val);

        },
        selectFun(val){
            setTimeout(()=>{
                let argu = {
                    params:val,
                    receiver:this.addressInfo[val].receiver,
                    mobile:this.addressInfo[val].mobile,
                    address:this.addressInfo[val].address,
                    isDefault:this.addressInfo[val].isDefault};
                this.$router.push({
                    name: 'submitOrder',
                    query: argu
                });
            },300)
        },

    },
    computed: {

    },

};
</script>
 <style scoped>
@import "../adress/adress.css";
</style>