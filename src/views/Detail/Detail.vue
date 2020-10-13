<template>
    <div class="detail" v-cloak>
        <div class="img">
            <img v-lazy="film.poster" />
        </div>
        <div class="film-detail">
            <div class="box">
                <div class="film-name">
                    {{ film.name }}
                    <span class="item">{{ film.filmType.name }}</span>
                </div>
                <div class="film-grade" v-if="open">
                    <span class="grade">{{ film.grade }}</span>
                    <span class="grade-text"> 分</span>
                </div>
            </div>
            <div class="film-detail-all">{{ film.category }}</div>
            <div class="film-detail-all">
                {{ film.premiereAt | parsePremiereAt }}上映
            </div>
            <div class="film-detail-all">
                {{ film.nation }} | {{ film.runtime }} 分钟
            </div>
            <div
                :class="{
                    filmDetailall: isfilm,
                    hidde: ishidde,
                    filmsynopsis: isfilmsynopsis,
                }"
                class="film-detail-all"
            >
                {{ film.synopsis }}
            </div>
            <div class="toggle" @click="handerClick">
                <img
                    :class="{ upper: isupper }"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAMAAADHqI+lAAAAOVBMVEVHcEy9xcW9wMW9wcW////Bwca9wcW9wMW9wMW+wMW+wcW9wcXMzMy+wMa+wce9wMe9wca9wMW9wMWKU/2FAAAAEnRSTlMAH+jGBDa6/vaatcIPdlNSdckJHB8JAAAASUlEQVQIHQXBhwGDMAADMCVksQr4/2MrObYCQNkOZ2oH6DWna2Q9wG9lXLQ984V3Zm/gntlb2zNvgN/KGFkPAL0mtQNA+b4C/AGl4gJfgEWzrAAAAABJRU5ErkJggg=="
                />
            </div>
        </div>
        <div class="actors">
            <span class="actors-title-text">演职人员</span>
            <Swiper :key="'actors_' + film.actors.length">
                <!-- 循环输出图片信息 -->
                <div
                    v-for="(item, index) in film.actors"
                    :key="index"
                    class="swiper-slide"
                >
                    <img :src="item.avatarAddress" alt="" />
                    <span class="actors-name">{{ item.name }}</span>
                    <span class="actors-role">{{ item.role }}</span>
                </div>
            </Swiper>
        </div>
        <!-- 剧照 -->
        <div class="pic">
            <span class="actors-title-text">剧照</span>
            <Swiper :key="'photos_' + film.photos.length">
                <div
                    v-for="(item, index) in film.photos"
                    :key="index"
                    class="swiper-slide"
                >
                    <img :src="item" alt="" />
                </div>
            </Swiper>
        </div>
        <!-- 返回按钮 -->
        <div class="film-header">
            <div class="goBack" @click="goBack()">
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
                    alt=""
                />
            </div>
        </div>
    </div>
</template>

<script>
import { movieDetailData } from '@/api/api';
// 引入mement
import moment from 'moment';
import Swiper from '@/components/Swiper';
export default {
    data() {
        return {
            isfilm: true,
            film: { actors: [] },
            ishidde: true,
            isupper: false,
            isfilmsynopsis: true,
            open: false,
        };
    },
    async mounted() {
        let ret = await movieDetailData(this.$route.params.filmId);
        this.film = ret.data.data.film;
        this.type = this.$route.params.type;
        if (ret.data.data.film.grade) {
            this.open = true;
        }
    },
    methods: {
        handerClick() {
            this.ishidde = !this.ishidde;
            this.isupper = !this.isupper;
        },
        // 返回上一页
        goBack: function() {
            this.$router.go(-1);
        },
    },
    filters: {
        parsePremiereAt: function(value) {
            // 时间戳的单位是秒，需要乘以1000转化成毫秒进行处理
            return moment(value * 1000).format('YYYY-MM-DD');
        },
    },
    components: {
        Swiper,
    },
    // 发布订阅
    created() {
        // 发起通知，通知app.vue组件移除底部菜单
        this.eventBus.$emit('footernav', false);
    },
    beforeDestroy() {
        // 发起通知，通知app.vue组件恢复底部菜单
        this.eventBus.$emit('footernav', true);
    },
};
</script>

<style lang="scss" scoped>
[v-cloak] {
    display: none;
}
.detail {
    overflow-x: hidden;

    .swiper-slide {
        text-align: center;

        img {
            width: 85px;
            height: 85px;
            margin-top: 15px;
        }
    }
    .img {
        width: 100%;
        height: 236px;

        img {
            width: 100%;
            height: 100%;
        }
    }
    .film-detail {
        padding: 0 15px;
        background-color: #fff;
        .filmsynopsis {
            transition: max-height 0.7s ease;
        }
        .hidde {
            max-height: 34px !important;
        }
        .box {
            display: flex;
            justify-content: space-between;

            .film-name {
                color: #191a1b;
                font-size: 18px;
                height: 24px;
                line-height: 24px;
                margin-right: 7px;
                margin-top: 10px;
                line-height: 24px;

                .item {
                    font-size: 9px;
                    color: #fff;
                    background-color: #d2d6dc;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 2px;
                    border-radius: 2px;
                    display: inline-block;
                }
            }
            .film-grade {
                width: calc(100% - 250px);
                text-align: right;
                color: #ffb232;
                margin-top: 10px;

                .grade {
                    font-size: 18px;
                    font-style: italic;
                }
                .grade-text {
                    font-size: 10px;
                }
            }
        }
        .toggle {
            text-align: center;
            display: block;
            height: auto;
            width: 20px;
            margin: auto;
            line-height: normal;
            img {
                width: 8px;
                margin: auto;
            }
            .upper {
                -webkit-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                transform: rotate(180deg);
            }
        }
        .film-detail-all {
            font-size: 13px;
            color: #797d82;
            margin-top: 4px;
        }
        .filmDetailall {
            font-size: 13px;
            color: #797d82;
            margin-top: 4px;
            max-height: 150px;
            overflow: hidden;
        }
        .film-detail-all:nth-of-type(5) {
            margin-top: 13px;
        }
    }
    .actors {
        margin-top: 15px;
        border-top: 10px solid #f4f4f4;
        border-bottom: 10px solid #f4f4f4;
        padding: 15px 0;

        .actors-title-text {
            font-size: 16px;
            text-align: left;
            color: #191a1b;
            margin-left: 15px;
        }
        .actors-name {
            padding-top: 6px;
            font-size: 12px;
            color: #191a1b;
            display: block;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .actors-role {
            font-size: 10px;
            color: #797d82;
        }
    }
    .pic {
        border-bottom: 10px solid #f4f4f4;
        padding: 15px 0;
        width: 640px;
        overflow: hidden;

        .actors-title-text {
            font-size: 16px;
            text-align: left;
            color: #191a1b;
            margin-left: 15px;
        }

        img {
            width: 150px;
            height: 100px;
            margin-left: 15px;
        }
    }
}
.film-header {
    position: fixed;
    background-color: hsla(0, 0%, 100%, 0);
    color: transparent;
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    width: 100vw;
    height: 44px;
    z-index: 1;
    top: 15px;
    left: 20px;

    .goBack {
        width: 20px;
        height: 30px;
        position: absolute;
        top: 5px;
        left: 5px;

        img {
            width: 35px;
        }
    }
}
</style>
