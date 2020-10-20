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
import cinemaDetail from './routes/cinemaDetail';

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
    cinemaDetail,
];

const router = new VueRouter({
    mode: 'history',
    // 前缀 http://localhost:3000/app/film
    // base: process.env.BASE_URL,
    routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
    let arr = [
        // 存储需要登录的页面地址
        '/cinema',
    ];
    if (arr.includes(to.path)) {
        // 返回真则在数组中（需要登录判断）
        if (localStorage.getItem('_token')) {
            next();
        } else {
            next({ path: '/login', query: { refer: to.fullPath } });
        }
    } else {
        // 不在（不需要登录判断）
        next();
    }
});

export default router;
