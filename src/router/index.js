import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

// 引入路由模块化的文件
import centerRouter from './routes/center';
import cinemaRouter from './routes/cinema';
import filmRouter from './routes/film';
import detailRouter from './routes/detail';
import cityRouter from './routes/city';
import vuexRouter from './routes/vuex';
import loginRouter from './routes/login';

const routes = [
    {
        path: '/',
        // 访问根路由跳转到电影页面
        redirect: '/film',
    },
    centerRouter,
    cinemaRouter,
    filmRouter,
    detailRouter,
    cityRouter,
    vuexRouter,
    loginRouter,
];

const router = new VueRouter({
    mode: 'history',
    // 前缀 http://localhost:3000/app/film
    // base: process.env.BASE_URL,
    routes,
});

export default router;
