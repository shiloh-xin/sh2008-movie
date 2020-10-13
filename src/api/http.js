// 封装axios，添加请求的拦截器（2个奇怪的请求头）
import axios from 'axios';

// 设置基础域名（请求地址）
axios.defaults.baseURL = 'https://m.maizuo.com/';

// 请求拦截器处理，添加2个请求头
axios.interceptors.request.use(
    function(config) {
        let host = '';
        let info = config.headers.info;
        if (info == 'film') {
            host = 'mall.film-ticket.film.list';
        }
        if (info == 'cinema') {
            host = 'mall.film-ticket.cinema.list';
        }
        if (info == 'info') {
            host = 'mall.film-ticket.film.info';
        }
        if (info == 'banners') {
            host = 'mall.cfg.cinema.banners';
        }
        // ......后续如果有其他的数据请求需求，接着写就行
        // 设置请求头
        config.headers = {
            'X-Client-Info':
                '{"a":"3000","ch":"1002","v":"5.0.4","e":"16022268312862711666900993","bc":"310100"}',
            'X-Host': host,
        };

        return config;
    },
    function(err) {
        // 错误处理
    }
);

// 导出封装好的axios，供后续使用

export default axios;
