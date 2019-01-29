import StarComponent from './star.vue'
const Star_ing = {
    install: function(Vue) {
//  Star_ 引用的组件名称<Star_></Star_>
        Vue.component('star_', StarComponent)
    }
}
export default Star_ing