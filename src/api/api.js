// 发送具体的请求

// 导入需要使用的模块
import http from '@/api/http';

import {
    nowPlayingListUrl,
    comingSoonListUrl,
    movieDetail,
    cinemaListUrl,
    cinemaTop,
    cityListUrl,
    loginUrl,
    centerUrl,
} from '@/config/url';

// 请求正在热映的列表数据
export const nowPlayingListData = pageNum => {
    http.defaults.headers.info = 'film';
    http.defaults.headers.authorization = '';
    return http.get(nowPlayingListUrl + pageNum);
};

// 请求即将上映的列表数据
export const comingSoonListData = pageNum => {
    http.defaults.headers.info = 'film';
    http.defaults.headers.authorization = '';
    return http.get(comingSoonListUrl + pageNum);
};

// 请求电影详情的数据
export const movieDetailData = filmId => {
    // 给axios设置请求头
    http.defaults.headers.info = 'info';
    http.defaults.headers.authorization = '';
    return http.get(movieDetail + filmId);
};

// 请求电影院的数据
export const cinemaListData = () => {
    http.defaults.headers.info = 'cinema';
    http.defaults.headers.authorization = '';

    return http.get(cinemaListUrl);
};
export const cinemaTopData = () => {
    http.defaults.headers.info = 'banners';
    http.defaults.headers.authorization = '';

    return http.get(cinemaTop);
};

// 请求城市列表的数据
export const cityListData = async () => {
    http.defaults.headers.authorization = '';
    http.defaults.headers.info = 'city';
    let ret = await http.get(cityListUrl);
    // 定义基本的数据
    let cities = ret.data.data.cities;
    let codeList = []; //'A','B','C'......（完整的26个字母）
    let dataList = []; //城市信息
    let indexList = []; //'A','B','C'......（经过筛选的字母）

    // for循环生成26个字母
    for (let i = 65; i <= 90; i++) {
        codeList.push(String.fromCharCode(i));
    }

    // 开始处理
    codeList.forEach(element => {
        // 与城市信息的pinyin字段首字母进行对比，如果符合则留下大字母
        let tempArr = cities.filter(
            item => element.toLowerCase() == item.pinyin.substr(0, 1)
        );
        if (tempArr.length > 0) {
            indexList.push(element);
            dataList.push({
                index: element,
                data: tempArr,
            });
        }
    });
    // 返回数据
    return Promise.resolve([dataList, indexList]);
};

// 登录
export const userLogin = data => {
    return http.post(loginUrl, data);
};

// 获取用户个人信息
export const userInfo = _token => {
    http.defaults.headers.authorization = _token;
    // 响应拦截器
    // http.interceptors.response.use(
    //     function(response) {
    //         response.data.user_info.gender = response.data.user_info.gender
    //             ? '女'
    //             : '男';

    //         return response;
    //     },
    //     function(error) {
    //         // 错误的处理
    //     }
    // );
    return http.get(centerUrl);
};
