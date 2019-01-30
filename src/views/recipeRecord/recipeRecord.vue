<template>
    <div class="page-loadmore">
        <Header post-title="处方记录" v-show="isWeixin"></Header>
        <div :class="{margin45:isWeixin,outCarint:true}">
            <div class="outCarint">
                <div class="card margin16" v-for="(item,i) in recordData">
                    <div class="cardText">
                        <div class="md-check-group md-example-child md-example-child-check md-example-child-check-1">
                            <md-check-group v-model="favorites" :check="checkedFun(11)">
                                <md-check :name=item.name />
                                <span>{{item.date}}</span>
                            </md-check-group>
                            <span>{{item.no}}</span>
                            <span class="mu-secondary-text-color">{{item.isChecked}}</span>
                        </div>
                        <p class="partLine"></p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script type="text/babel">
export default {
    data() {
        return {
            isWeixin: false,
            agreeConf: {
                checked: true,
                name: 'agree0',
                size: 'md',
                disabled: false,
                introduction: '选中状态',
            },
            recordData: [
                { date: "2018-12-11", no: "S0027520", isChecked: "未选店", name: "1" },
                { date: "2018-12-11", no: "S0027520", isChecked: "未选店", name: "2" },
                { date: "2018-12-11", no: "S0027520", isChecked: "未选店", name: "3" },
            ],
            checked: '0',
            favorites: [],
        };
    },
    created() {

    },
    mounted() {
        document.title = '处方记录';
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
        onChange(name, checked) {
            console.log(`agree name = ${name} is ${checked ? 'checked' : 'unchecked'}`)
        },
        checkedFun: function (name) {
            console.log(name)
        }
    },
    computed: {

    },

};
</script>
<style   scoped>
.md-check-group {
  display: flex;
  justify-content: space-between;
}
.md-check-group span {
  height: 66px;
  line-height: 66px;
  margin-left: 12px;
}
</style>