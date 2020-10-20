// 引入vue和vuex
import Vue from 'vue';
import Vuex from 'vuex';

// 在vue中使用vuex
Vue.use(Vuex);

// 创建Store对象，用于存储数据
export default new Vuex.Store({
    state: {
        count: 0,
        positionCity: '定位失败',
        // 如果有更多的数据需要存储，接着写就行
        showCity: '全国',
        _token: '',
    },
    // 修改数据（监听），同步程序放这里
    mutations: {
        add: function(state, step) {
            state.count += step;
        },

        setCity: function(state, cityName) {
            localStorage.setItem('clickName', cityName);
            state.showCity = cityName;
        },
        // 获取定位的城市名
        getCityName: function(state, cityName) {
            localStorage.setItem('cityName', cityName);
            state.positionCity = cityName;
        },
        updateToken: function(state, _token) {
            localStorage.setItem('_token', _token);
            state._token = _token;
        },
        // 获取定位的城市ID，并存储在localStorage中
        getCityId: function(state, cityId) {
            localStorage.setItem('cityId', cityId);
            state.cityId = cityId;
        },
        // 获取城市列表点击的城市ID，并存储在localStorage中
        clickCityId: function(state, cityId) {
            localStorage.setItem('clickId', cityId);
            state.clickCityId = cityId;
        },

        // ......
    },
    // 异步程序放这里
    actions: {
        addAsync: function(context, step) {
            setTimeout(() => {
                context.commit('add', step);
            }, 3000);
        },
    },
    getters: {
        getCount: function(state) {
            return state.count;
        },
    },
});
