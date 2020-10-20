<template>
    <div>
        <FilmList
            :list="list"
            :type="type"
            :key="'film' + list.length"
        ></FilmList>
    </div>
</template>

<script>
// 导入正在热映的请求方法
import { nowPlayingListData } from '@/api/api';
// 导入电影列表子组件
import FilmList from '@/components/FilmList';
export default {
    data() {
        return {
            pageNum: 1,
            // 存储页面展示的数组
            list: [],
            type: 1, //当前传递的数据为正在热映的电影数据
        };
    },
    async mounted() {
        let cityId = localStorage.getItem('clickId');
        if (cityId == null || cityId == undefined) {
            cityId = localStorage.getItem('cityId');
            if (cityId == '310113') {
                cityId = '310100';
            }
        }
        let ret = await nowPlayingListData(this.pageNum, cityId);
        this.list = ret.data.data.films;
    },
    components: {
        FilmList,
    },
};
</script>
