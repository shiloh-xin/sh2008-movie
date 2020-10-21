// 定义电影列表需要的地址
// type(1是正在热映，2是即将上映)
// pageNum动态生成
// pageSize每页显示的个数
// 按需导出export
export const nowPlayingListUrl =
    'gateway?pageSize=10&type=1&k=1892533&pageNum=';

export const comingSoonListUrl =
    'gateway?pageSize=10&type=2&k=8332160&pageNum=';

// 电影详情的数据
export const movieDetail = 'gateway?k=6434202&filmId=';

// 电影院的数据
export const cinemaListUrl = 'gateway?ticketFlag=1&k=2156444&cityId=';
export const cinemaTop = 'gateway?k=8369753&cityId=';

// 电影院详情
export const cinemaDetail = 'gateway/?k=3512815&cinemaId=';
export const cinemaDetailFilm = 'gateway/?k=8956618&cinemaId=';
export const cinemaFilmList = 'gateway/?k=6503121&cinemaId=';

// 城市列表的数据
export const cityListUrl = 'gateway?k=7357613';

// 个人中心相关接口
// export const loginUrl = 'http://127.0.0.1:3000/api/v1/login';
// export const centerUrl = 'http://127.0.0.1:3000/api/v1/user_info';

export const loginUrl = 'http://106.14.174.55:3000/api/v1/login';
export const centerUrl = 'http://106.14.174.55:3000/api/v1/user_info';

// 后续有其他地址请求，届时再加
