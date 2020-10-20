<template>
    <div class="list scroll" :style="{ height: height + 'px' }">
        <v-touch v-on:swipeleft="onSwipeLeft">
            <!-- loading导入 -->
            <Loading v-if="loading" />
            <!-- 展示数据 -->
            <div>
                <div
                    class="item"
                    v-for="(item, index) in data"
                    :key="index"
                    @click="goDetail(item.filmId)"
                >
                    <div class="left">
                        <img :src="item.poster" />
                    </div>
                    <div class="middle">
                        <div>
                            {{ item.name }}
                            <span class="item">{{ item.filmType.name }}</span>
                        </div>
                        <div v-if="type == 2">
                            <span
                                >上映日期：
                                {{ item.premiereAt | parsePremiereAt }}</span
                            >
                        </div>
                        <div v-if="type == 1">
                            <span>观众评分 </span>
                            <span class="grade">{{ item.grade }}</span>
                        </div>
                        <div>主演：{{ item.actors | parseActors }}</div>
                        <div>{{ item.nation }} | {{ item.runtime }}分钟</div>
                    </div>
                    <div class="right">
                        <span v-if="type == 1">购票</span>
                        <span v-else>预购</span>
                    </div>
                </div>
            </div>
        </v-touch>
    </div>
</template>

<script>
// loading导入
import Loading from '@/components/Loading';
import moment from 'moment';
import Bscroll from 'better-scroll';
// 导入请求方法
import { nowPlayingListData, comingSoonListData } from '@/api/api';
export default {
    data() {
        return {
            loading: true,
            height: 0,
            // bs：保存better-scroll实例结果
            bs: null,
            pageNum: 1,
            flag: true, //控制是否可以继续加载更多
            data: [], //用来拼数据的
        };
    },
    props: ['list', 'type'],
    components: {
        Loading,
    },
    created() {
        // 当进入页面后需要将父传子的数据list转交给data
        this.data = this.list;
        // 判断数据是否获取到，获取到之后就去除loading组件
        if (this.data.length > 0) {
            this.loading = false;
        } else {
            this.loading = true;
        }
    },
    // 处理演员的数据，将主演的数据从数组的形式转化成字符串形式以便输出
    filters: {
        parseActors: function(value) {
            let actors = '';
            if (value) {
                value.forEach(element => {
                    actors += element.name + ' ';
                });
            }
            return actors;
        },
        parsePremiereAt: function(value) {
            // 时间戳的单位是秒，需要乘以1000转化成毫秒进行处理
            return moment(value * 1000).format('YYYY-MM-DD');
        },
    },
    methods: {
        goDetail: function(filmId) {
            this.$router.push({ name: 'detail', params: { filmId } });
        },
        // 获取数据的方法
        getData: async function() {
            if (this.flag) {
                this.pageNum++;
                // 获取数据
                let cityId = localStorage.getItem('clickId');
                if (cityId == null || cityId == undefined) {
                    cityId = localStorage.getItem('cityId');
                    if (cityId == '310113') {
                        cityId = '310100';
                    }
                }
                if (this.type == 1) {
                    // 正在热映
                    var ret = await nowPlayingListData(this.pageNum, cityId);
                } else {
                    // 即将上映
                    var ret = await comingSoonListData(this.pageNum, cityId);
                }
                // 如果当前请求道的数据数量少于10，则说明后面没有数据可以请求，此时需要将标志设置成false
                if (ret.data.data.films.length < 10) {
                    this.flag = false;
                }
                // 将数据处理好，新增到列表中展示
                this.data = this.data.concat(ret.data.data.films);
                console.log(this.data);
            }
        },
        onSwipeLeft() {
            this.$router.push({ path: '/cinema' });
        },
    },
    mounted() {
        // 获取可视高度
        this.height = document.documentElement.clientHeight - 103;
    },
    updated() {
        this.bs = new Bscroll('.scroll', {
            pullUpLoad: true,
            pullDownRefresh: true,
            click: true,
        });
        this.bs.on('pullingUp', () => {
            // 获取数据
            this.getData();
            this.bs.finishPullUp();
        });
        this.bs.on('pullingDown', () => {
            // 获取数据
            this.getData();
            this.bs.finishPullDown();
        });
    },
};
</script>

<style lang="scss" scoped>
.list {
    margin-bottom: 50px;

    .item {
        margin-top: 15px;
        padding-bottom: 15px;
        display: flex;
        color: #797d82;
        font-size: 13px;
        border-bottom: 1px solid #ededed;

        .left {
            width: 77px;
            height: 100px;
            margin-left: 20px;
            img {
                width: 66px;
                height: 100%;
            }
        }

        .middle {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 55%;
            padding: 10px 0;
            margin-right: 5px;

            div:nth-of-type(1) {
                color: #191a1b;
                font-size: 16px;
                display: flex;

                .item {
                    font-size: 9px;
                    color: #fff;
                    background-color: #d2d6dc;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 2px;
                    border-radius: 2px;
                    margin: 4px 0 0 7px;
                }
            }

            div:nth-of-type(2) {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            div:nth-of-type(3) {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .grade {
                color: #ffb232;
                font-size: 14px;
            }
        }

        .right {
            width: 15%;
            display: flex;
            align-items: center;

            span {
                border: 1px solid #ff5f16;
                background: white;
                color: #ff5f16;
                border-radius: 2px;
                height: 25px;
                line-height: 25px;
                font-size: 13px;
                width: 50px;
                text-align: center;
            }
        }
    }
}
.scroll {
    overflow: hidden;
}
</style>
