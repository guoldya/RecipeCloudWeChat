<template>
    <div class="medicalEva">
        <Header post-title="就医评价"></Header>
        <div class="margin55">
            <div>
                <div class="flatCard outCarint">
                    <div>
                        <div class="star">
                            <img src="@/assets/images/1.jpg" alt="" style="width: 14%;height: 14%">
                            <rater class="diy-box" :score="score" :stars=this.starArray :change="change(score)"></rater>
                            <span>请选择评分</span>
                        </div>
                        <p class="partLine"></p>
                        <div>
                            <textarea name="" id="" v-model="comment" cols="49" rows="5" placeholder="服务满足你的期待吗？请大胆说出它的优点与美中不足的地方吧！"></textarea>
                            <ul class="image-reader-list">
                                <li class="image-reader-item" v-for="(img, index) in imageList['reader0']" :key="index" :style="{
                                              'backgroundImage': `url(${img})`,
                                              'backgroundPosition': 'center center',
                                              'backgroundRepeat': 'no-repeat',
                                              'backgroundSize': 'cover'
                                            }">
                                    <md-tag class="image-reader-item-del" size="small" shape="quarter" fill-color="#111A34" type="fill" font-color="#fff" @click.native="onDeleteImage('reader0', index)">
                                        <md-icon name="close"></md-icon>
                                    </md-tag>
                                </li>
                                <li class="image-reader-item add">
                                    <md-image-reader name="reader0" @select="onReaderSelect" @complete="onReaderComplete" @error="onReaderError" is-multiple></md-image-reader>
                                    <md-icon name="camera" size="lg" color="#CCC"></md-icon>
                                    <p class="p">添加图片</p>
                                </li>
                            </ul>
                            <div style="clear: both"></div>
                        </div>
                        <div class="evaFooter">
                            <div class="md-example-child md-example-child-check md-example-child-check-0">
                                <md-check v-model="checked" label="匿名" />
                            </div>
                            <span>你的评价可以帮助其他小伙伴呦</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height: 50px"></div>

            <p class="addbTN" @click="sendFun()">发布</p>
        </div>
    </div>
</template>
<script type="text/babel">
let appbizOnlineServiceRecordcomment = "/app/bizOnlineServiceRecord/comment";
export default {
    name: "medicalEva",
    data() {
        return {
            starArray: [
                {
                    light: require("@/assets/images/icon_star@2x.png"),
                    gray: require("@/assets/images/icon_star_gray.png"),
                }, {
                    light: require("@/assets/images/icon_star@2x.png"),
                    gray: require("@/assets/images/icon_star_gray.png"),
                }, {
                    light: require("@/assets/images/icon_star@2x.png"),
                    gray: require("@/assets/images/icon_star_gray.png"),
                }, {
                    light: require("@/assets/images/icon_star@2x.png"),
                    gray: require("@/assets/images/icon_star_gray.png"),
                }, {
                    light: require("@/assets/images/icon_star@2x.png"),
                    gray: require("@/assets/images/icon_star_gray.png"),
                },
            ],
            imageList: {
                reader0: [
                    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ4RUFEM0U4MEU3NjExRTlBQjg3OEZGQkFBMDg0NTJBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ4RUFEM0U5MEU3NjExRTlBQjg3OEZGQkFBMDg0NTJBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDhFQUQzRTYwRTc2MTFFOUFCODc4RkZCQUEwODQ1MkEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDhFQUQzRTcwRTc2MTFFOUFCODc4RkZCQUEwODQ1MkEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Hf2GzAAABv0lEQVR42sSXzysFURTHZ4b8BQrJCmVFofd6fhYbP4q8Z8hGWdiKpexlSbYWZCMsJIWdbGX1Un6EYkFeIj9KyY/vrftq0r1zf5o59amZO+ed8+2cO+fOcytWXh1NqwS7wAW94FwniOfo2ySoBlVgSjeIZ/C7TOB+ABREKaAFlAXuS0BblAJ8xtpQVAL+lt+oDZ6F8hu1wbNUfplnVgTwyp+3tGobVAU0c8qv3YZC0A7GQZGEf42EzwI4lfD7BEsuRnEOF8VOPPZIWpB14rMsEdAPlmNIvkpyEwHkOBwDw+ApgsTPYASMgpfgW7AO6sDBPyY/pDnWeK/hLegE03SX2jISawZ0gBvRHPgGcyAFziwkv6DzYxZ8qQyiY9AANgySb4J6cKQ7Cd/BnYGAB/BmMopFs19kaVEOkYAmUG4goBS0mgjwLWxCX1eAbPl/BM8zYXnCBKQE5c/RMd5HN5tWG8IEhH1k7oNasA126HTbC/EfVBXAK/8H/RPSDe4D6+S6B0xQH5YAT0UAq/zk2E6AeU7fydoiaGQc8dw28AQkGYETkt8OJxyhSRUBpK+X4EpQWp7lW9UFrmmsLZbjrwADAIxuU2mDQor1AAAAAElFTkSuQmCC",
                ],
            },
            checked: false,
            comment: "",
            score: 0,
        };
    },
    created() {
    },
    mounted() {
        this.evaluation();
        document.title = '就医评价';
    },
    methods: {
        change(val) {
            console.log(val, "ss")
        },
        async  sendFun() {
            // 查询评论
            try {
                let res = await this.$axios.post(appbizOnlineServiceRecordcomment, {
                    id: Number(this.$route.query.id),
                    score: 4,
                    comment: 'comment',
                });
                if (res.data.code != 200) {
                    throw Error(res.data.msg);
                }
                if (res.data.code == 200) {
                    this.medicalEva();
                }

            } catch (error) {
                console.log(error.message);
            }
        },
        evaluation: function () {
        },
        onReaderSelect(name, { files }) {
            files.forEach(file => {
                console.log('[Mand Mobile] ImageReader Selected:', 'File Name ' + file.name)
            })
            this.$toast.loading('图片读取中...')
        },
        onReaderComplete(name, { dataUrl, file }) {
            this.$toast.hide();
            setTimeout(() => {
                const demoImageList = this.imageList[name] || [];
                demoImageList.push(dataUrl);
                this.$set(this.imageList, name, demoImageList)
            }, 100)
        },
        onReaderError(name, { msg }) {
            this.$toast.failed(msg)
        },
        onDeleteImage(name, index) {
            const demoImageList = this.imageList[name] || [];
            demoImageList.splice(index, 1);
            this.$set(this.imageList, name, demoImageList)
        },
    },
    computed: {

    },

};
</script>
<style   scoped>
@import "medicalEva.css";
</style>
