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
import { comingSoonListData } from '@/api/api';
import FilmList from '@/components/FilmList';
export default {
    data: () => {
        return {
            pageNum: 1,
            list: [],
            type: 2,
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
        let ret = await comingSoonListData(this.pageNum, cityId);
        this.list = ret.data.data.films;
    },
    components: {
        FilmList,
    },
};
</script>
