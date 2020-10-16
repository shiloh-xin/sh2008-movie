import Vue from 'vue';
import App from './App.vue';
import router from './router';

// 引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;

// axios体验
// import axios from 'axios';
// // 配置域名
// axios.defaults.baseURL = 'https://m.maizuo.com/';
// axios.interceptors.request.use(
//     function(config) {
//         config.headers = {
//             'X-Client-Info':
//                 '{"a":"3000","ch":"1002","v":"5.0.4","e":"1598087896889693885431809","bc":"110100"}',
//             'X-Host': 'mall.film-ticket.film.list',
//         };
//         // 返回配置
//         return config;
//     },
//     function(err) {
//         // 对错误的处理
//     }
// );
// axios.get('gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=5301029');

// 使用懒加载
import VueLazyLoad from 'vue-lazyload';
Vue.use(VueLazyLoad, {
    loading:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602503911195&di=cacb4928c00f86e302a6967e024be94e&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F464ac755e43f02f80cb4821cbdea95116f02d23b234b8-X6O8RP_fw658',
});

// 定义事件总线（后续需要使用）
Vue.prototype.eventBus = new Vue();

// 导入vuex的store对象
import store from '@/store/vuex';

// 同步一下localStorage数据到Vuex
let _token = localStorage.getItem('_token');
if (_token) {
    store.commit('updateToken', _token);
}

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
