<template>
    <div class="adress">
        <Header post-title="地址管理"></Header>
        <div class="margin55">
            <ul>
                <li v-for="(item,index) in addressInfo" :key="index">
                    <div class="card">
                        <div class="cardText">
                            <p class="order-number">
                                <span>{{item.receiver}}</span>
                                <span>{{item.mobile}}</span>
                            </p>
                            <p class="headdesc">{{item.address}}</p>
                            <p class="order-bottom">
                                <span>
                                    <div class="md-agree" @click="onChange(item.id,item.isDefault)">
                                        <div :class="{ 'md-agree-icon':true,'checked':item.isDefault==1}">
                                            <div class="md-agree-icon-container">
                                                <i class="md-icon icon-font md-icon-checked md"></i>
                                                <i class="md-icon icon-font md-icon-check md"></i>
                                            </div>
                                        </div>
                                        <div class="md-agree-content">
                                            默认地址
                                        </div>
                                    </div>
                                </span>
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
        </div>
        <p class="add" @click="addadress()">添加地址</p>
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
            num: 7,
            checked: '0a',
            addressInfo: '',
            agreeConf: {
                checked: true,
                name: 'agree0',
                size: 'md',
                disabled: false,
                introduction: '选中状态',
            },


        };
    },
    created() {
        this.$axios.put(appshippingAddressaddressList, {
        }).then((res) => {
            console.log(res)
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
                console.log(res)
                if (res.data.code == '200') {
                    this.$toast.info("设置成功");
                    this.$axios.put(appshippingAddressaddressList, {
                    }).then((res) => {
                        console.log(res)
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
                            this.$toast.info("删除成功")
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


    },
    computed: {

    },

};
</script>
 <style scoped>
@import "../adress/adress.css";
</style>