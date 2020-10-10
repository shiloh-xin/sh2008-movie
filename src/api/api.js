// 发送具体的请求

// 导入需要使用的模块
import http from '@/api/http';
import {
    nowPlayingListUrl,
    comingSoonListUrl,
    movieDetail,
} from '@/config/url';

// 请求正在热映的列表数据
export const nowPlayingListData = pageNum => {
    http.defaults.headers.info = 'film';
    return http.get(nowPlayingListUrl + pageNum);
};

// 请求即将上映的列表数据
export const comingSoonListData = pageNum => {
    http.defaults.headers.info = 'film';
    return http.get(comingSoonListUrl + pageNum);
};

// 请求电影详情的数据
export const movieDetailData = filmId => {
    // 给axios设置请求头
    http.defaults.headers.info = 'info';
    return http.get(movieDetail + filmId);
};
