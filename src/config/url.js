// 定义电影列表需要的地址
// type(1是正在热映，2是即将上映)
// pageNum动态生成
// pageSize每页显示的个数
// 按需导出export
export const nowPlayingListUrl =
    'gateway?cityId=310100&pageSize=10&type=1&k=1892533&pageNum=';

export const comingSoonListUrl =
    'gateway?cityId=310100&pageSize=10&type=2&k=8332160&pageNum=';

// 电影详情的数据
export const movieDetail = 'gateway?k=6434202&filmId=';

// 电影院的数据
export const cinemaListUrl = 'gateway?cityId=310100&ticketFlag=1&k=2156444';
export const cinemaTop = 'gateway?cityId=310100&k=8369753';

// 后续有其他地址请求，届时再加
