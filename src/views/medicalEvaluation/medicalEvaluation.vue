 <template>
    <div class="page-loadmore">
        <Header post-title="就医评价" selectOption="" v-show="isWeixin"></Header>
        <div :class="{margin45:isWeixin,outCarint:true}">
            <div class="outCarint" >
                <div class="card margin16">
                    <div class="cardText">
                        <div class="star">
                            <img src="@/assets/images/1.jpg" alt="" style="width: 40px;height: 40px">
                            <rater class="diy-box" :score="3" :stars=this.starArray></rater>
                            <span>请选择评分</span>
                        </div>
                        <p class="partLine"></p>
                        <div>
                            <textarea name="" id="" cols="30" rows="5" placeholder="服务满足你的期待吗？请大胆说出它的优点与美中不足的地方吧！"></textarea>
                            <ul class="image-reader-list">
                                <li class="image-reader-item"
                                    v-for="(img, index) in imageList['reader0']"
                                    :key="index"
                                    :style="{
                                              'backgroundImage': `url(${img})`,
                                              'backgroundPosition': 'center center',
                                              'backgroundRepeat': 'no-repeat',
                                              'backgroundSize': 'cover'
                                            }">
                                    <md-tag
                                            class="image-reader-item-del"
                                            size="small"
                                            shape="quarter"
                                            fill-color="#111A34"
                                            type="fill"
                                            font-color="#fff"
                                            @click.native="onDeleteImage('reader0', index)"
                                    >
                                        <md-icon name="close"></md-icon>
                                    </md-tag>
                                </li>
                                <li class="image-reader-item add">
                                    <md-image-reader
                                            name="reader0"
                                            @select="onReaderSelect"
                                            @complete="onReaderComplete"
                                            @error="onReaderError"
                                            is-multiple
                                    ></md-image-reader>
                                    <md-icon name="camera" size="md" color="#CCC"></md-icon>
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

        </div>
    </div>
</template>
<script type="text/babel">
    import {Toast} from 'mand-mobile'
    export default {
        data() {
            return {
                isWeixin: false,
                starArray:[
                    {
                        light: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ4RUFEM0U4MEU3NjExRTlBQjg3OEZGQkFBMDg0NTJBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ4RUFEM0U5MEU3NjExRTlBQjg3OEZGQkFBMDg0NTJBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDhFQUQzRTYwRTc2MTFFOUFCODc4RkZCQUEwODQ1MkEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDhFQUQzRTcwRTc2MTFFOUFCODc4RkZCQUEwODQ1MkEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Hf2GzAAABv0lEQVR42sSXzysFURTHZ4b8BQrJCmVFofd6fhYbP4q8Z8hGWdiKpexlSbYWZCMsJIWdbGX1Un6EYkFeIj9KyY/vrftq0r1zf5o59amZO+ed8+2cO+fOcytWXh1NqwS7wAW94FwniOfo2ySoBlVgSjeIZ/C7TOB+ABREKaAFlAXuS0BblAJ8xtpQVAL+lt+oDZ6F8hu1wbNUfplnVgTwyp+3tGobVAU0c8qv3YZC0A7GQZGEf42EzwI4lfD7BEsuRnEOF8VOPPZIWpB14rMsEdAPlmNIvkpyEwHkOBwDw+ApgsTPYASMgpfgW7AO6sDBPyY/pDnWeK/hLegE03SX2jISawZ0gBvRHPgGcyAFziwkv6DzYxZ8qQyiY9AANgySb4J6cKQ7Cd/BnYGAB/BmMopFs19kaVEOkYAmUG4goBS0mgjwLWxCX1eAbPl/BM8zYXnCBKQE5c/RMd5HN5tWG8IEhH1k7oNasA126HTbC/EfVBXAK/8H/RPSDe4D6+S6B0xQH5YAT0UAq/zk2E6AeU7fydoiaGQc8dw28AQkGYETkt8OJxyhSRUBpK+X4EpQWp7lW9UFrmmsLZbjrwADAIxuU2mDQor1AAAAAElFTkSuQmCC",
                        gray:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk5QTg4MThGMUZBNDExRTk5QjYyRkExNUMzQUFGRTM1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk5QTg4MTkwMUZBNDExRTk5QjYyRkExNUMzQUFGRTM1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTlBODgxOEQxRkE0MTFFOTlCNjJGQTE1QzNBQUZFMzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTlBODgxOEUxRkE0MTFFOTlCNjJGQTE1QzNBQUZFMzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7HLKBwAAACnElEQVR42ryXW4hNURjHz94Yg0eK4RElcojQuF9m5FLDOM5ISpTJg0t4k3d5kduL8OaBhoSmGHk45MGdTMp1hAdyErklt/Fb9T+12u29z95rc776ddZZe+21vvN93/qvdbxSqZRztJFwATxYCk9cJvFz7rYNRsMo2O46iZ/hvYL1vRX61NKBmdAAz+EpDIXZtXSgqM/T0KF2W60csMPfISec0+BnDP9duJ8lDX7G8OesSNjP/psDdvhPWf0VZ1akTUNaB2ZY4b9j9TunoS/MgXaoSzB+TEj47TTsggPwKMFcP+GYhxSXaQxJGYkpcDvQNxHupZznvYlAN8xTx2U4UuWlPyGLV9JQSFADJtrNancbB5bBQVgHTfANNkDZYYeciXlmonzUWvw4bDZF+BnWwyr4AC3wABbm/p01a87l8BFWw1r45AeKaAKY83kYXIR9UJ9h4f6wF7q0e65qjZNR2/A1LICd8EtH7g0Y57D4WLgJOzSX2SHz4VU1HTBFtgca4THkVXRbdPmoZmbMJr2Tlz4Y/dgNv9MIkRGayVK8el06ehM40KvIDZBeTIJbrkr4Fd7EiE+UVWT6HXzJIsXBozep2WeDn8WB6TACXkSIT14KGDRzTD/TbpqVxYFiRPg9a4dcV6V7EWkoujoQdfQ2BDSiTnv9EgwPSUMhbp04Bxqt8Feq2FbJsmS8RcXWpGetadIQ50Cb9UsGwmE4J03vUv7PQ6fUzURlsM4Dc6ANsiK3Mq0Ddvh79Gs2wnfpwWJ4a4037SWwVWPa9c5Ly4HQtbyIv2ZGua6p/UN5Nsf2Gn3GmZHtEzBel45+6p8LV5JGYJrVNhMcgqkJFjf2UGP368YVNmdVBzp17+sJhDapVVK1SEVs5jobNvCvAAMAd5GbNiaKuGIAAAAASUVORK5CYII=",
                    },{
                        light: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ4RUFEM0U4MEU3NjExRTlBQjg3OEZGQkFBMDg0NTJBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ4RUFEM0U5MEU3NjExRTlBQjg3OEZGQkFBMDg0NTJBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDhFQUQzRTYwRTc2MTFFOUFCODc4RkZCQUEwODQ1MkEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDhFQUQzRTcwRTc2MTFFOUFCODc4RkZCQUEwODQ1MkEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Hf2GzAAABv0lEQVR42sSXzysFURTHZ4b8BQrJCmVFofd6fhYbP4q8Z8hGWdiKpexlSbYWZCMsJIWdbGX1Un6EYkFeIj9KyY/vrftq0r1zf5o59amZO+ed8+2cO+fOcytWXh1NqwS7wAW94FwniOfo2ySoBlVgSjeIZ/C7TOB+ABREKaAFlAXuS0BblAJ8xtpQVAL+lt+oDZ6F8hu1wbNUfplnVgTwyp+3tGobVAU0c8qv3YZC0A7GQZGEf42EzwI4lfD7BEsuRnEOF8VOPPZIWpB14rMsEdAPlmNIvkpyEwHkOBwDw+ApgsTPYASMgpfgW7AO6sDBPyY/pDnWeK/hLegE03SX2jISawZ0gBvRHPgGcyAFziwkv6DzYxZ8qQyiY9AANgySb4J6cKQ7Cd/BnYGAB/BmMopFs19kaVEOkYAmUG4goBS0mgjwLWxCX1eAbPl/BM8zYXnCBKQE5c/RMd5HN5tWG8IEhH1k7oNasA126HTbC/EfVBXAK/8H/RPSDe4D6+S6B0xQH5YAT0UAq/zk2E6AeU7fydoiaGQc8dw28AQkGYETkt8OJxyhSRUBpK+X4EpQWp7lW9UFrmmsLZbjrwADAIxuU2mDQor1AAAAAElFTkSuQmCC",
                        gray:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk5QTg4MThGMUZBNDExRTk5QjYyRkExNUMzQUFGRTM1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk5QTg4MTkwMUZBNDExRTk5QjYyRkExNUMzQUFGRTM1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTlBODgxOEQxRkE0MTFFOTlCNjJGQTE1QzNBQUZFMzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTlBODgxOEUxRkE0MTFFOTlCNjJGQTE1QzNBQUZFMzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7HLKBwAAACnElEQVR42ryXW4hNURjHz94Yg0eK4RElcojQuF9m5FLDOM5ISpTJg0t4k3d5kduL8OaBhoSmGHk45MGdTMp1hAdyErklt/Fb9T+12u29z95rc776ddZZe+21vvN93/qvdbxSqZRztJFwATxYCk9cJvFz7rYNRsMo2O46iZ/hvYL1vRX61NKBmdAAz+EpDIXZtXSgqM/T0KF2W60csMPfISec0+BnDP9duJ8lDX7G8OesSNjP/psDdvhPWf0VZ1akTUNaB2ZY4b9j9TunoS/MgXaoSzB+TEj47TTsggPwKMFcP+GYhxSXaQxJGYkpcDvQNxHupZznvYlAN8xTx2U4UuWlPyGLV9JQSFADJtrNancbB5bBQVgHTfANNkDZYYeciXlmonzUWvw4bDZF+BnWwyr4AC3wABbm/p01a87l8BFWw1r45AeKaAKY83kYXIR9UJ9h4f6wF7q0e65qjZNR2/A1LICd8EtH7g0Y57D4WLgJOzSX2SHz4VU1HTBFtgca4THkVXRbdPmoZmbMJr2Tlz4Y/dgNv9MIkRGayVK8el06ehM40KvIDZBeTIJbrkr4Fd7EiE+UVWT6HXzJIsXBozep2WeDn8WB6TACXkSIT14KGDRzTD/TbpqVxYFiRPg9a4dcV6V7EWkoujoQdfQ2BDSiTnv9EgwPSUMhbp04Bxqt8Feq2FbJsmS8RcXWpGetadIQ50Cb9UsGwmE4J03vUv7PQ6fUzURlsM4Dc6ANsiK3Mq0Ddvh79Gs2wnfpwWJ4a4037SWwVWPa9c5Ly4HQtbyIv2ZGua6p/UN5Nsf2Gn3GmZHtEzBel45+6p8LV5JGYJrVNhMcgqkJFjf2UGP368YVNmdVBzp17+sJhDapVVK1SEVs5jobNvCvAAMAd5GbNiaKuGIAAAAASUVORK5CYII=",
                    },{
                        light: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ4RUFEM0U4MEU3NjExRTlBQjg3OEZGQkFBMDg0NTJBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ4RUFEM0U5MEU3NjExRTlBQjg3OEZGQkFBMDg0NTJBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDhFQUQzRTYwRTc2MTFFOUFCODc4RkZCQUEwODQ1MkEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDhFQUQzRTcwRTc2MTFFOUFCODc4RkZCQUEwODQ1MkEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Hf2GzAAABv0lEQVR42sSXzysFURTHZ4b8BQrJCmVFofd6fhYbP4q8Z8hGWdiKpexlSbYWZCMsJIWdbGX1Un6EYkFeIj9KyY/vrftq0r1zf5o59amZO+ed8+2cO+fOcytWXh1NqwS7wAW94FwniOfo2ySoBlVgSjeIZ/C7TOB+ABREKaAFlAXuS0BblAJ8xtpQVAL+lt+oDZ6F8hu1wbNUfplnVgTwyp+3tGobVAU0c8qv3YZC0A7GQZGEf42EzwI4lfD7BEsuRnEOF8VOPPZIWpB14rMsEdAPlmNIvkpyEwHkOBwDw+ApgsTPYASMgpfgW7AO6sDBPyY/pDnWeK/hLegE03SX2jISawZ0gBvRHPgGcyAFziwkv6DzYxZ8qQyiY9AANgySb4J6cKQ7Cd/BnYGAB/BmMopFs19kaVEOkYAmUG4goBS0mgjwLWxCX1eAbPl/BM8zYXnCBKQE5c/RMd5HN5tWG8IEhH1k7oNasA126HTbC/EfVBXAK/8H/RPSDe4D6+S6B0xQH5YAT0UAq/zk2E6AeU7fydoiaGQc8dw28AQkGYETkt8OJxyhSRUBpK+X4EpQWp7lW9UFrmmsLZbjrwADAIxuU2mDQor1AAAAAElFTkSuQmCC",
                        gray:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk5QTg4MThGMUZBNDExRTk5QjYyRkExNUMzQUFGRTM1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk5QTg4MTkwMUZBNDExRTk5QjYyRkExNUMzQUFGRTM1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTlBODgxOEQxRkE0MTFFOTlCNjJGQTE1QzNBQUZFMzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTlBODgxOEUxRkE0MTFFOTlCNjJGQTE1QzNBQUZFMzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7HLKBwAAACnElEQVR42ryXW4hNURjHz94Yg0eK4RElcojQuF9m5FLDOM5ISpTJg0t4k3d5kduL8OaBhoSmGHk45MGdTMp1hAdyErklt/Fb9T+12u29z95rc776ddZZe+21vvN93/qvdbxSqZRztJFwATxYCk9cJvFz7rYNRsMo2O46iZ/hvYL1vRX61NKBmdAAz+EpDIXZtXSgqM/T0KF2W60csMPfISec0+BnDP9duJ8lDX7G8OesSNjP/psDdvhPWf0VZ1akTUNaB2ZY4b9j9TunoS/MgXaoSzB+TEj47TTsggPwKMFcP+GYhxSXaQxJGYkpcDvQNxHupZznvYlAN8xTx2U4UuWlPyGLV9JQSFADJtrNancbB5bBQVgHTfANNkDZYYeciXlmonzUWvw4bDZF+BnWwyr4AC3wABbm/p01a87l8BFWw1r45AeKaAKY83kYXIR9UJ9h4f6wF7q0e65qjZNR2/A1LICd8EtH7g0Y57D4WLgJOzSX2SHz4VU1HTBFtgca4THkVXRbdPmoZmbMJr2Tlz4Y/dgNv9MIkRGayVK8el06ehM40KvIDZBeTIJbrkr4Fd7EiE+UVWT6HXzJIsXBozep2WeDn8WB6TACXkSIT14KGDRzTD/TbpqVxYFiRPg9a4dcV6V7EWkoujoQdfQ2BDSiTnv9EgwPSUMhbp04Bxqt8Feq2FbJsmS8RcXWpGetadIQ50Cb9UsGwmE4J03vUv7PQ6fUzURlsM4Dc6ANsiK3Mq0Ddvh79Gs2wnfpwWJ4a4037SWwVWPa9c5Ly4HQtbyIv2ZGua6p/UN5Nsf2Gn3GmZHtEzBel45+6p8LV5JGYJrVNhMcgqkJFjf2UGP368YVNmdVBzp17+sJhDapVVK1SEVs5jobNvCvAAMAd5GbNiaKuGIAAAAASUVORK5CYII=",
                    },{
                        light: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ4RUFEM0U4MEU3NjExRTlBQjg3OEZGQkFBMDg0NTJBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ4RUFEM0U5MEU3NjExRTlBQjg3OEZGQkFBMDg0NTJBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDhFQUQzRTYwRTc2MTFFOUFCODc4RkZCQUEwODQ1MkEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDhFQUQzRTcwRTc2MTFFOUFCODc4RkZCQUEwODQ1MkEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Hf2GzAAABv0lEQVR42sSXzysFURTHZ4b8BQrJCmVFofd6fhYbP4q8Z8hGWdiKpexlSbYWZCMsJIWdbGX1Un6EYkFeIj9KyY/vrftq0r1zf5o59amZO+ed8+2cO+fOcytWXh1NqwS7wAW94FwniOfo2ySoBlVgSjeIZ/C7TOB+ABREKaAFlAXuS0BblAJ8xtpQVAL+lt+oDZ6F8hu1wbNUfplnVgTwyp+3tGobVAU0c8qv3YZC0A7GQZGEf42EzwI4lfD7BEsuRnEOF8VOPPZIWpB14rMsEdAPlmNIvkpyEwHkOBwDw+ApgsTPYASMgpfgW7AO6sDBPyY/pDnWeK/hLegE03SX2jISawZ0gBvRHPgGcyAFziwkv6DzYxZ8qQyiY9AANgySb4J6cKQ7Cd/BnYGAB/BmMopFs19kaVEOkYAmUG4goBS0mgjwLWxCX1eAbPl/BM8zYXnCBKQE5c/RMd5HN5tWG8IEhH1k7oNasA126HTbC/EfVBXAK/8H/RPSDe4D6+S6B0xQH5YAT0UAq/zk2E6AeU7fydoiaGQc8dw28AQkGYETkt8OJxyhSRUBpK+X4EpQWp7lW9UFrmmsLZbjrwADAIxuU2mDQor1AAAAAElFTkSuQmCC",
                        gray:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk5QTg4MThGMUZBNDExRTk5QjYyRkExNUMzQUFGRTM1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk5QTg4MTkwMUZBNDExRTk5QjYyRkExNUMzQUFGRTM1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTlBODgxOEQxRkE0MTFFOTlCNjJGQTE1QzNBQUZFMzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTlBODgxOEUxRkE0MTFFOTlCNjJGQTE1QzNBQUZFMzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7HLKBwAAACnElEQVR42ryXW4hNURjHz94Yg0eK4RElcojQuF9m5FLDOM5ISpTJg0t4k3d5kduL8OaBhoSmGHk45MGdTMp1hAdyErklt/Fb9T+12u29z95rc776ddZZe+21vvN93/qvdbxSqZRztJFwATxYCk9cJvFz7rYNRsMo2O46iZ/hvYL1vRX61NKBmdAAz+EpDIXZtXSgqM/T0KF2W60csMPfISec0+BnDP9duJ8lDX7G8OesSNjP/psDdvhPWf0VZ1akTUNaB2ZY4b9j9TunoS/MgXaoSzB+TEj47TTsggPwKMFcP+GYhxSXaQxJGYkpcDvQNxHupZznvYlAN8xTx2U4UuWlPyGLV9JQSFADJtrNancbB5bBQVgHTfANNkDZYYeciXlmonzUWvw4bDZF+BnWwyr4AC3wABbm/p01a87l8BFWw1r45AeKaAKY83kYXIR9UJ9h4f6wF7q0e65qjZNR2/A1LICd8EtH7g0Y57D4WLgJOzSX2SHz4VU1HTBFtgca4THkVXRbdPmoZmbMJr2Tlz4Y/dgNv9MIkRGayVK8el06ehM40KvIDZBeTIJbrkr4Fd7EiE+UVWT6HXzJIsXBozep2WeDn8WB6TACXkSIT14KGDRzTD/TbpqVxYFiRPg9a4dcV6V7EWkoujoQdfQ2BDSiTnv9EgwPSUMhbp04Bxqt8Feq2FbJsmS8RcXWpGetadIQ50Cb9UsGwmE4J03vUv7PQ6fUzURlsM4Dc6ANsiK3Mq0Ddvh79Gs2wnfpwWJ4a4037SWwVWPa9c5Ly4HQtbyIv2ZGua6p/UN5Nsf2Gn3GmZHtEzBel45+6p8LV5JGYJrVNhMcgqkJFjf2UGP368YVNmdVBzp17+sJhDapVVK1SEVs5jobNvCvAAMAd5GbNiaKuGIAAAAASUVORK5CYII=",
                    },{
                        light: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ4RUFEM0U4MEU3NjExRTlBQjg3OEZGQkFBMDg0NTJBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ4RUFEM0U5MEU3NjExRTlBQjg3OEZGQkFBMDg0NTJBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDhFQUQzRTYwRTc2MTFFOUFCODc4RkZCQUEwODQ1MkEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDhFQUQzRTcwRTc2MTFFOUFCODc4RkZCQUEwODQ1MkEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Hf2GzAAABv0lEQVR42sSXzysFURTHZ4b8BQrJCmVFofd6fhYbP4q8Z8hGWdiKpexlSbYWZCMsJIWdbGX1Un6EYkFeIj9KyY/vrftq0r1zf5o59amZO+ed8+2cO+fOcytWXh1NqwS7wAW94FwniOfo2ySoBlVgSjeIZ/C7TOB+ABREKaAFlAXuS0BblAJ8xtpQVAL+lt+oDZ6F8hu1wbNUfplnVgTwyp+3tGobVAU0c8qv3YZC0A7GQZGEf42EzwI4lfD7BEsuRnEOF8VOPPZIWpB14rMsEdAPlmNIvkpyEwHkOBwDw+ApgsTPYASMgpfgW7AO6sDBPyY/pDnWeK/hLegE03SX2jISawZ0gBvRHPgGcyAFziwkv6DzYxZ8qQyiY9AANgySb4J6cKQ7Cd/BnYGAB/BmMopFs19kaVEOkYAmUG4goBS0mgjwLWxCX1eAbPl/BM8zYXnCBKQE5c/RMd5HN5tWG8IEhH1k7oNasA126HTbC/EfVBXAK/8H/RPSDe4D6+S6B0xQH5YAT0UAq/zk2E6AeU7fydoiaGQc8dw28AQkGYETkt8OJxyhSRUBpK+X4EpQWp7lW9UFrmmsLZbjrwADAIxuU2mDQor1AAAAAElFTkSuQmCC",
                        gray:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk5QTg4MThGMUZBNDExRTk5QjYyRkExNUMzQUFGRTM1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk5QTg4MTkwMUZBNDExRTk5QjYyRkExNUMzQUFGRTM1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTlBODgxOEQxRkE0MTFFOTlCNjJGQTE1QzNBQUZFMzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTlBODgxOEUxRkE0MTFFOTlCNjJGQTE1QzNBQUZFMzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7HLKBwAAACnElEQVR42ryXW4hNURjHz94Yg0eK4RElcojQuF9m5FLDOM5ISpTJg0t4k3d5kduL8OaBhoSmGHk45MGdTMp1hAdyErklt/Fb9T+12u29z95rc776ddZZe+21vvN93/qvdbxSqZRztJFwATxYCk9cJvFz7rYNRsMo2O46iZ/hvYL1vRX61NKBmdAAz+EpDIXZtXSgqM/T0KF2W60csMPfISec0+BnDP9duJ8lDX7G8OesSNjP/psDdvhPWf0VZ1akTUNaB2ZY4b9j9TunoS/MgXaoSzB+TEj47TTsggPwKMFcP+GYhxSXaQxJGYkpcDvQNxHupZznvYlAN8xTx2U4UuWlPyGLV9JQSFADJtrNancbB5bBQVgHTfANNkDZYYeciXlmonzUWvw4bDZF+BnWwyr4AC3wABbm/p01a87l8BFWw1r45AeKaAKY83kYXIR9UJ9h4f6wF7q0e65qjZNR2/A1LICd8EtH7g0Y57D4WLgJOzSX2SHz4VU1HTBFtgca4THkVXRbdPmoZmbMJr2Tlz4Y/dgNv9MIkRGayVK8el06ehM40KvIDZBeTIJbrkr4Fd7EiE+UVWT6HXzJIsXBozep2WeDn8WB6TACXkSIT14KGDRzTD/TbpqVxYFiRPg9a4dcV6V7EWkoujoQdfQ2BDSiTnv9EgwPSUMhbp04Bxqt8Feq2FbJsmS8RcXWpGetadIQ50Cb9UsGwmE4J03vUv7PQ6fUzURlsM4Dc6ANsiK3Mq0Ddvh79Gs2wnfpwWJ4a4037SWwVWPa9c5Ly4HQtbyIv2ZGua6p/UN5Nsf2Gn3GmZHtEzBel45+6p8LV5JGYJrVNhMcgqkJFjf2UGP368YVNmdVBzp17+sJhDapVVK1SEVs5jobNvCvAAMAd5GbNiaKuGIAAAAASUVORK5CYII=",
                    }
                ],
                imageList: {
                    reader0: [
                         "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ4RUFEM0U4MEU3NjExRTlBQjg3OEZGQkFBMDg0NTJBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ4RUFEM0U5MEU3NjExRTlBQjg3OEZGQkFBMDg0NTJBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDhFQUQzRTYwRTc2MTFFOUFCODc4RkZCQUEwODQ1MkEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDhFQUQzRTcwRTc2MTFFOUFCODc4RkZCQUEwODQ1MkEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Hf2GzAAABv0lEQVR42sSXzysFURTHZ4b8BQrJCmVFofd6fhYbP4q8Z8hGWdiKpexlSbYWZCMsJIWdbGX1Un6EYkFeIj9KyY/vrftq0r1zf5o59amZO+ed8+2cO+fOcytWXh1NqwS7wAW94FwniOfo2ySoBlVgSjeIZ/C7TOB+ABREKaAFlAXuS0BblAJ8xtpQVAL+lt+oDZ6F8hu1wbNUfplnVgTwyp+3tGobVAU0c8qv3YZC0A7GQZGEf42EzwI4lfD7BEsuRnEOF8VOPPZIWpB14rMsEdAPlmNIvkpyEwHkOBwDw+ApgsTPYASMgpfgW7AO6sDBPyY/pDnWeK/hLegE03SX2jISawZ0gBvRHPgGcyAFziwkv6DzYxZ8qQyiY9AANgySb4J6cKQ7Cd/BnYGAB/BmMopFs19kaVEOkYAmUG4goBS0mgjwLWxCX1eAbPl/BM8zYXnCBKQE5c/RMd5HN5tWG8IEhH1k7oNasA126HTbC/EfVBXAK/8H/RPSDe4D6+S6B0xQH5YAT0UAq/zk2E6AeU7fydoiaGQc8dw28AQkGYETkt8OJxyhSRUBpK+X4EpQWp7lW9UFrmmsLZbjrwADAIxuU2mDQor1AAAAAElFTkSuQmCC",
                   ],
                },
                checked: false,
            };
        },
        created() {

        },
        mounted() {
            this.evaluation();
            document.title = '就医评价';
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
            evaluation:function(){
            },
            onReaderSelect(name, {files}) {
                files.forEach(file => {
                    console.log('[Mand Mobile] ImageReader Selected:', 'File Name ' + file.name)
                })
                Toast.loading('图片读取中...')
            },
            onReaderComplete(name, {dataUrl, file}) {
                Toast.hide();
                setTimeout(() => {
                    const demoImageList = this.imageList[name] || [];
                    demoImageList.push(dataUrl);
                    this.$set(this.imageList, name, demoImageList)
                }, 100)
            },
            onReaderError(name, {msg}) {
                Toast.failed(msg)
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
    @import "medicalEvaluation.css";
</style>