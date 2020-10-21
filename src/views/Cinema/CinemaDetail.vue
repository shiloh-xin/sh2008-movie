<template>
    <div>
        <div class="main">
            <div class="scroll">
                <div class="cinema-schedule" data-enter-time="1603093560">
                    <div class="header-left">
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAA2CAMAAACRK2tAAAAAkFBMVEVHcEwcHBwZGhsaGhwZHBwqKioZGhv///8bGxs/Pz8ZGhseHh4eHh4cHBwZGxsaGhsZGxsfHx8ZGhwZGhsZGhsdHR0ZGhsZGhsaGhwbGxsZGhsbGxsZGxseHh4ZGxsZGhsaGhskJCQZGxsaGhwZGxsZGhwaGhwZGhwZGhsZHh4fHx8aGhsZGhsZGhsZGhsZGhteFmxMAAAAL3RSTlMAEv1YdgzJAUsE+hkhP5WksQi+0/c08uWGStxnZirs3c0HsoeWo4W91DMp6+T28faGh4gAAADjSURBVDjLxZXZkoJADEUbVxBQlG1AYRZ3Z/T8/9/5gK9JqgZL83puVVd3TjrO/bumfjVVA3PwNf4BVAofAXvliA2QBDIfDuD4LXN/BpOxzOMMUk/meQF1KPOmhb9I5lEJvxeZhzXczjL3UrjGMh9PYKZ0YLmCwVDmQQJsFAEWwEgXgIMhwNwQYNFTgNXyfQK4Lygj1yeQF/CpHeHiDE6elrCuaT+Uc2vgJ3A9mtW1e2f9GGzVP8dSrpN2rSUs7e3B6UYvi7VEWEORa4mohLbREk37HD3Sl+iRPEGPqtdCsVfSo+6AByDPg79r1AAAAABJRU5ErkJggg=="
                            width="11px"
                            height="18px"
                            style=""
                            @click="goCinema()"
                        />
                    </div>
                    <div :class="fixed ? 'fixed' : ''" class="footer">
                        {{ detail.name }}
                    </div>
                    <div class="cinema-wrap" style="">
                        <div class="cinema-info" style="">
                            <div class="tags" @click="goTags()">
                                <div
                                    class="tag"
                                    v-for="(item, index) in detail.services"
                                    :key="index"
                                >
                                    {{ item.name }}
                                </div>

                                <!-- <i class="tag-more" style="font-size: 10px;"></i> -->
                                <van-icon name="arrow" />
                            </div>
                            <div class="address">
                                <img
                                    src="data:image/png;base64,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"
                                    width="14px"
                                    height="21px"
                                    alt=""
                                />
                                <div
                                    class="address-des"
                                    data-enter-time="1603093560"
                                    data-click-fun="track_f_295997"
                                >
                                    {{ detail.address }}
                                </div>
                                <a
                                    href="tel:021-63594933"
                                    class="tel-icon"
                                    data-enter-time="1603093560"
                                    data-click-fun="track_f_598194"
                                    ><img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA2CAMAAABdslGrAAACJVBMVEVHcEwhISEzMzMZHBwZMzMZGhsZGxsZGhsZGhv///8ZGxsbGxsfHx8kJCQaGh0bGxsZGhsZJiYqKioaGhwZHR0ZGhsZGhsZGxsZGhsaGh5VVVV/f38ZGhscHBwZGhsZGhsaGigZGhsZGhwZGhsZGhsaGh8ZGhsaGhsbGxsaGhsaGhsZHBwaGh0fHx8nJycZGhwZGxscHBwZGxsZGhscHBwbGxsZGxsaGhsaGhscHBwaGiAZGxsaGhsaGhwZHBwZGxsaGh4ZGhsZGhsZGhsZGxsZGhscHBwZGhsaGhwdHR0fHx8ZGhwZGxsZGhwkJCQaGiMZGhsZGhsbGxsdHR0ZGhsbGxsaGhsaGhsaGhsZGxscHBwbGxsZGxsZGhwZHx8ZGxsaGhseHh4aGh0cHBwbGxsZHh4bGxsaGhsZGhweHh4ZGxsZGxsZGhsZHh4ZGxsaGhseHh4cHBw/Pz8ZGhsfHx8ZGxsZGxsZGhsaGh0ZGxsZGhwcHBwaGhsaGhwbGxsZGhwZGhwZGxsZGhsZGhwZGxsaGhsiIiIZGhsZGhscHBwZHBwaGhwqKioZGhwZGhsaGh8ZIiIaGhseHh4ZGxsaGhwbGxsbGxsZGxsZGxsZGhsaGh8ZGhwaGh0ZGhsZGhsZGxsZGhwaGh0aGhwZHBwaGhwbGxsZGxsaGh0ZGxsbGxsfHx8eHh4ZGhsdHR0ZGhsbGxsZGhsZGhsZHR0ZGhsZGhwaGhwZGhuqFRxRAAAAtnRSTlMAFwVZCvqy/v0Bl2cQB2kl5RQGYT3M+NnKQwMC8iTq8BP7vfbtMO65QsOldk4gDceDPs75G16zkq4SJ52TiFtuTOfd5Kr3CfR/Iwi1oNoVHfPWcTS3L5u6nLtISWW/KHfrImg/SjNBxLQqlajUO8bXITUE6RiEje9Wiq029WpA45mx0qNvpBbByy1kYgyr5jkerxGMkS43eGbbMch78dWe0V+FbHxUgXJ5XCkZ4CvJOOj8RdOYkJ3guaYAAAJ3SURBVBgZvcEFcxNRAEbRr22S3dTd3XApLoVCi7u7u7u7u7u7u97fR5NNCkM2vGWY4Rz9m025DUH9jQHJmUC7Ennma7QIS5JXqT1o5c+EU/LoXDcgryg7qwZy5c04sJcEJR2Cy/KkzoYchSywsEfLiwAMk2MsNMqDtBqsMjmKYGSqzJbCV0U9goUyS4dvinoMLYkySofvisoeCoNltASS1eYe5MloGXxQm8oaWCqT1CrsCWqTDIdlNB9y1GaAhZ0hk5fQTz/1gd0yKYORYxTVqwOsktFkWKaInFIgSUaDYKAc6y2wO8nsBgyfoLDNwDx5cRdeyLEHugXlwXNYNEJhXYZDb3lQ3AzpcnSHC1fkwVMYX6Iw30EYG5SZrxZuyTHEglHy4BnUn5DjCdhzZZY2Ho7KUTIT6hfIrAhoL0flO/j0XmbHoSBNjuWlsKhORgk7oa8iPlZA/VSFrBjVOah4UoCzilheC5NeS4kzgHYJimct9LyoiOnlwLj+AUK2zlEcvh4wtJci3kwG9gErbbB2ZMvdpXIoHKEI30NCktU+E8jLkLsGP5zsqqjBpTCtWMrqA0zqLXcpQGF/RWX0W+NTSFM+0LGrXB2z4EiCYkzfCDTvlaszNhRMVAzfLMDfKSg3SVVQPlexdlUAsxPkpnM+WFcTFaPLBmBdqtzktgCFoxVjy3Yb9stVZQC4n1KsGB0gXXE05QMPhug3ddBzm+K5U0Cr+VP1q8RqGKj4xtysAKxhB4KKCnYEa7X+JOuan1a3X71V2OKZwBQZlJ0n5HNg3pc5KQE/MEhmp/vW8lNVd3mSllRtEWZVX5dnixfOmj1txpSJ+t9+AAZEC6aFGvT2AAAAAElFTkSuQmCC"
                                        width="17px"
                                        height="18px"
                                        alt=""
                                /></a>
                            </div>
                        </div>
                        <div class="schedule-wrap">
                            <div class="film-bg">
                                <div
                                    class="img"
                                    ref="srb"
                                    style='background-image: url("https://pic.maizuo.com/usr/movie/fad9f1e9a5c38f3883d7f9b5e561e5fe.jpg");'
                                ></div>
                            </div>
                            <div class="film-list">
                                <div class="swiper-container">
                                    <div
                                        class="swiper-wrapper"
                                        style="transition-duration: 0ms; transform: translate3d(146.625px, 0px, 0px);"
                                    >
                                        <div
                                            class="swiper-slide"
                                            v-for="(item, index) in film"
                                            :key="index"
                                        >
                                            <div
                                                @click="
                                                    touchSwiper(item.filmId)
                                                "
                                                class="film-item"
                                            >
                                                <div class="img-wrap">
                                                    <img
                                                        :src="item.poster"
                                                        alt=""
                                                        ref="src"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span
                                        class="swiper-notification"
                                        aria-live="assertive"
                                        aria-atomic="true"
                                    ></span>
                                </div>
                                <div class="triangle">
                                    <img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUAgMAAACCKJcoAAAACVBMVEVHcEz////////mcEUwAAAAAnRSTlMAgJsrThgAAABLSURBVAgdBcEBDQAACAMg/GYDAxnB/mkEUAuBPgjMQOAagtpaBM0hGAbB0Qi11BIajjAwhIMmaqFWNHBigBEHtNQCtWmAywBMDqAfx4oGipkmrUEAAAAASUVORK5CYII="
                                        width="20px"
                                        height="10px"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div
                                class="film-info"
                                v-for="(item, index) in film"
                                :key="index"
                                v-if="filmId == item.filmId"
                                @click="goDetail(item.filmId)"
                            >
                                <div class="film-head">
                                    <span class="film-name">{{
                                        item.name
                                    }}</span>
                                    <span class="film-score">{{
                                        item.grade
                                    }}</span>
                                    <span class="film-score-unit">分</span>
                                </div>
                                <div class="film-desc">
                                    {{ item.category }} | {{ item.runtime }}分钟
                                    | {{ item.director }} |
                                    {{ item.actors | parseActors }}
                                </div>
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAYCAMAAAD57OxYAAAAZlBMVEVHcEwZGhseHh4aGh8zMzMZGhsZGhwZGhsfHx8ZGhsbGxsZGhsZGxsZGxsZGxsZGxsbGxsaGhsaGh0aGh0ZGhwbGxsZGhweHh4ZGhsaGh0ZGxsZGxsZGxsZGhsZGxsZGxsaGhwZGhtuA7MxAAAAIXRSTlMA6iE5Bda99xD+OOWenXh6VddWV9BxviLpe7x5jeSBgI/e7hU0AAAAeUlEQVQY023PyRqCMAyFUSilA2VGnBX/939JN01QP7O6Z5ObFGt6FjoPuCjuEBeBvYKvRKGG8iQyZ5iCqPFwtKIxQqsre2BQdV8F7rfgoJh2WAe+yWghjjkPQJ/zHKHLufLg8jmmhDp8vGD+LH1BnKU6wU3vXdOm+Q34ngmHHMc+eAAAAABJRU5ErkJggg=="
                                    width="4px"
                                    height="8px"
                                    alt=""
                                    class="film-more"
                                />
                            </div>
                            <div class="date-list">
                                <div class="tabs-bar-wrapper dateWrap">
                                    <ul
                                        class="tabs-nav"
                                        v-for="(item, index) in timeList"
                                        :key="index"
                                    >
                                        <van-tabs
                                            v-model="active"
                                            @click="onClick($event)"
                                        >
                                            <van-tab
                                                v-for="(v, k) in timeList[index]
                                                    .time"
                                                :key="k"
                                            >
                                                <template #title>
                                                    {{ v | parsePremiereAt }}
                                                </template>
                                            </van-tab>
                                        </van-tabs>
                                    </ul>
                                </div>
                            </div>
                            <div class="schedule-list">
                                <div>
                                    <div
                                        class="schedule-item"
                                        v-for="(item, index) in cinemaFilm"
                                        :key="index"
                                    >
                                        <div class="left">
                                            <div class="start-at">
                                                {{ item.showAt | showEndAt }}
                                            </div>
                                            <div class="end-at">
                                                {{ item.endAt | showEndAt }}散场
                                            </div>
                                        </div>
                                        <div class="middle">
                                            <div class="language">
                                                {{ item.filmLanguage
                                                }}{{ item.imagery }}
                                            </div>
                                            <div class="hall">
                                                {{ item.hallName }}
                                            </div>
                                        </div>
                                        <div class="right">
                                            <div class="buy-ticket">
                                                {{
                                                    item.isOnsell == true
                                                        ? '购票'
                                                        : '停售'
                                                }}
                                            </div>
                                            <div class="lowest-price">
                                                <span class="price-icon"
                                                    >￥</span
                                                >{{ item.salePrice / 100 }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="service-info"
                        style="display: none;"
                        ref="style"
                    >
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAMAAAC7xnO3AAAAQlBMVEVHcEwZGxsfHx8ZGhsZHh4ZGhsZHx////8aGhsZGhsbGxsaGhwcHBwYGRoZGhwaGhsaGh0aGh4bGxsZGhwZGhwZGhuZ90I0AAAAFXRSTlMAnRDlO/MoAZznQYY1+qvEVjpx0NGKQfLiAAAA8klEQVRIx+3WSQ6DMAwFUIbSUKAMbXP/q5apAoMdf0di1ywtniwF+0OS/M/F55XXDnpweHcZKeTelwi9Fd73pFJ7iE7wQXu6EqEzvB+KCGUhQgWoUxFqNADDNAhDVIEyVaFEAchTCHIUhGcKwyM1QEpNcE+NcKNm+KMRcKXPCLjSGDheztjRty4CFlNPLBHPs9pG0OVWsURkt8NMt/dopPsBMFE6OQZ6HDmYnmcVpNyQQ5TfDoBKa6VSeR8VGlrkmaYu4muVuFSkWnSIVM8cgSJhxdIBSrmF0toHC6uZVqTUgSk30YZUsj4Dl7dq/n/Jl58vF/caAGebDs0AAAAASUVORK5CYII="
                            width="19px"
                            height="19px"
                            style="margin:-130px 0 100px 30px"
                            @click="display()"
                        />
                        <div class="services">
                            <div
                                class="detail clearfix"
                                v-for="(item, index) in detail.services"
                                :key="index"
                            >
                                <div class="left">
                                    {{ item.name }}
                                </div>
                                <div class="right">
                                    {{ item.description }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!---->
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/swiper-bundle.min.css';
import Vue from 'vue';
import { Icon, Tab, Tabs } from 'vant';
import 'vant/lib/index.css';

import moment from 'moment';
moment.locale('zh-cn');

Vue.use(Icon);
Vue.use(Tab);
Vue.use(Tabs);

import {
    cinemaDetailData,
    cinemaDetailFilmData,
    cinemaFilmListData,
} from '@/api/api';
export default {
    data() {
        return {
            detail: [],
            film: [],
            cinemaFilm: [],
            filmId: '',
            fixed: false,
            timeList: [],
            active: 0,
            time: [],
        };
    },

    async mounted() {
        let ret = await cinemaDetailData(this.$route.params.cinemaId);
        this.detail = ret.data.data.cinema;

        let res = await cinemaDetailFilmData(this.$route.params.cinemaId);
        this.film = res.data.data.films;

        // 页面一上来默认展示 发起第一次请求
        this.filmId = this.film[0].filmId;
        this.timeList = this.film[0].showDate;

        let req = await cinemaFilmListData(
            this.$route.params.cinemaId,
            this.filmId,
            this.timeList[0]
        );
        this.cinemaFilm = req.data.data.schedules;

        // 页面加载完展示第一个轮播图对应的数据
        this.filmId = this.film[0].filmId;

        let _this = this;
        this.$nextTick(() => {
            var swiper = new Swiper('.swiper-container', {
                effect: 'coverflow',
                grabCursor: true,
                slidesPerView: 4,
                spaceBetween: 30,
                centeredSlides: true,
                slideToClickedSlide: true,
                centeredSlides: true,
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 500,
                    modifier: 1,
                    slideShadows: true,
                },

                on: {
                    slideChange: async function() {
                        _this.filmId = _this.film[this.activeIndex].filmId;

                        let bgc = _this.$refs.src[this.activeIndex].src;
                        let res = `url(${bgc})`;
                        _this.$refs.srb.style.backgroundImage = res;

                        // 点击或者切换轮播图，对应展示数据跟随变动，发起第二次请求
                        let time = _this.film[this.activeIndex].showDate;

                        let req = await cinemaFilmListData(
                            _this.$route.params.cinemaId,
                            _this.filmId,
                            time[0]
                        );
                        _this.cinemaFilm = req.data.data.schedules;
                    },
                },
            });
        });
        // 监听滚动条
        window.addEventListener(
            'scroll',
            e => {
                let top = document.documentElement.scrollTop;
                if (top > 30 * 2) {
                    // 吸顶
                    this.fixed = true;
                } else {
                    // 不吸顶
                    this.fixed = false;
                }
            },
            true
        );
    },

    methods: {
        touchSwiper: function(id) {
            this.filmId = id;
        },
        goTags: function() {
            this.$refs.style.style.display = 'block';
        },
        display: function() {
            this.$refs.style.style.display = 'none';
        },
        goCinema: function() {
            this.$router.go(-1);
        },
        goDetail: function(filmId) {
            this.$router.push({ name: 'detail', params: { filmId } });
        },
        async onClick(event) {
            // 点击切换时间，发起第三次请求
            let int = this.timeList[event];
            let req = await cinemaFilmListData(
                this.$route.params.cinemaId,
                this.filmId,
                int
            );
            this.cinemaFilm = req.data.data.schedules;
        },
    },
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
            return moment(value * 1000).format('ddd MM月DD日');
        },
        showEndAt: function(value) {
            return moment(value * 1000).format('H:mm');
        },
    },
    watch: {
        filmId: function(value) {
            this.film.forEach((v, k) => {
                let time = v.showDate;
                let film = v.filmId;

                var obj = { film: film, time: time };
                if (value == v.filmId) {
                    this.timeList = [obj];
                }
            });
        },
    },
};
</script>

<style lang="css" scoped>
.main,
body {
    height: 100%;
}
.scroll {
    overflow-x: hidden;
}
.cinema-schedule {
    overflow: hidden;
    padding-top: 44px;
    background: #fff;
    min-height: 100vh;
}
.header-left {
    position: fixed;
    top: 0;
    height: 44px;
    line-height: 44px;
    padding-left: 20px;
    z-index: 303;
}
.cinema-schedule .header-left img {
    vertical-align: middle;
}
.footer {
    text-align: center;
    background: #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 44px;
    width: 100%;
    line-height: 44px;
}
.fixed {
    position: fixed;
    top: 0;
    background: #ffffff;
    text-align: center;
    font-size: 17px;
    color: #191a1b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: #fff;
    height: 44px;
    width: 100%;
    line-height: 44px;
    z-index: 302;
}
.cinema-schedule .cinema-info .tags {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    color: #ffb232;
    overflow: hidden;
    position: relative;
    padding: 5px 0 15px;
}
.cinema-schedule .cinema-info .tags .tag {
    position: relative;
    padding: 0 6px;
    margin: 0 2.5px;
    font-size: 10px;
}
.cinema-schedule .cinema-info .tags .tag:after {
    content: ' ';
    transform: scale(0.5);
    position: absolute;
    border: 1px solid #ffb232;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border-radius: 1px;
}
.cinema-schedule .cinema-info .tags:after {
    content: ' ';
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ededed;
    color: #ededed;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
}
.cinema-schedule .cinema-info .address {
    height: 50px;
    position: relative;
    display: flex;
    padding-left: 17px;
    align-items: center;
}
.cinema-schedule .cinema-info .address .address-des {
    font-size: 14px;
    height: 20px;
    padding: 0 12px;
    flex: 1;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.cinema-schedule .cinema-info .address .address-des:after {
    content: ' ';
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-right: 1px solid #ededed;
    color: #ededed;
    transform-origin: 100% 0;
    transform: scaleX(0.5);
}
.cinema-schedule .cinema-info .address .tel-icon {
    height: 18px;
    padding: 0 25px;
}
.cinema-schedule .schedule-wrap {
    position: relative;
}
.cinema-schedule .schedule-wrap .film-bg {
    position: absolute;
    top: 0;
    height: 160px;
    width: 100%;
    overflow: hidden;
}
.cinema-schedule .schedule-wrap .film-bg .img {
    height: 100%;
    width: 100%;
    filter: blur(30px);
}
.cinema-schedule .schedule-wrap .triangle {
    display: flex;
    justify-content: center;
}
.cinema-schedule .schedule-wrap .film-list {
    height: 128px;
    position: relative;
    padding: 15px 0;
}
.gallery-thumbs {
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 100;
    top: -165px;
}
.swiper-container img {
    width: 90px;
    height: 130px;
}
.swiper-container .swiper-notification {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    opacity: 0;
    z-index: -1000;
}
.swiper-slide {
    align-items: center;
    transition: 300ms;
    transform: scale(0.8);
}
.swiper-slide-active,
.swiper-slide-duplicate-active {
    transform: scale(1);
}
.gallery-top {
    width: 100%;
}
.gallery-top .swiper-wrapper {
    width: 100%;
    height: 160px;
}
.gallery-top .swiper-slide {
    width: 100%;
}
.gallery-top .swiper-wrapper img {
    width: 100%;
    height: 160px;
    position: absolute;
    filter: blur(10px);
}
.cinema-schedule .schedule-wrap .film-info {
    width: 100%;
    background: #fff;
    /* height: 80px; */
    padding: 15px 0;
    position: relative;
}
.cinema-schedule .schedule-wrap .film-info .film-head {
    margin-bottom: 10px;
    text-align: center;
    line-height: 18px;
}
.cinema-schedule .schedule-wrap .film-info .film-head .film-name {
    font-size: 15px;
    color: #191a1b;
    padding-right: 5px;
}
.cinema-schedule .schedule-wrap .film-info .film-head .film-score {
    font-size: 16px;
    font-style: italic;
    color: #ffb232;
}
.cinema-schedule .schedule-wrap .film-info .film-head .film-score-unit {
    font-size: 10px;
    color: #ffb232;
}
.cinema-schedule .schedule-wrap .film-info .film-desc {
    text-align: center;
    height: 18px;
    color: #797d82;
    font-size: 13px;
    padding: 0 12%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.cinema-schedule .schedule-wrap .film-info .film-more {
    position: absolute;
    right: 15px;
    top: 0;
    margin-top: 36px;
}
.cinema-schedule .schedule-wrap .film-info:after {
    content: ' ';
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ededed;
    color: #ededed;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
}
.cinema-schedule .schedule-wrap .date-list {
    width: 100%;
}
.tabs-bar-wrapper {
    position: relative;
    z-index: 100;
    width: 100%;
    overflow-x: hidden;
    background: #fff;
}
.tabs-bar-wrapper .tabs-bar {
    height: 49px;
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    transition: -webkit-transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
    transition: transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
    transition: transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
    position: relative;
}
.tabs-bar-wrapper .tabs-bar .tabs-nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    width: 100%;
}
.tabs-bar-wrapper .tabs-bar .tabs-nav li.active {
    color: #ff5f16;
}
.tabs-bar-wrapper .tabs-bar .tabs-nav li.active {
    color: #ff5f16;
}
.tabs-bar-wrapper .tabs-bar .tabs-nav li {
    flex-shrink: 0;
    color: #191a1b;
    text-align: center;
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    cursor: pointer;
}
.tabs-bar-wrapper .tabs-bar .tabs-nav .tab-ink-bar-wrapper {
    position: absolute;
    margin: auto;
    top: 30px;
    left: 0;
    transform: translateZ(0);
    transition: transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
    transition: transform 0.2s cubic-bezier(0.35, 0, 0.25, 1);
}
.tabs-bar-wrapper .tabs-bar .tabs-nav .tab-ink-bar-wrapper .tab-ink-bar {
    border-bottom: 2px solid #ff5f16;
    border-radius: 20px;
    display: block;
    margin: auto;
}
.tabs-bar-wrapper .tabs-bar:after {
    content: ' ';
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ededed;
    color: #ededed;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
}
.cinema-schedule .schedule-wrap .schedule-list {
    min-height: calc(100vh - 44px);
}
.cinema-schedule .schedule-wrap .schedule-list .schedule-item {
    height: 60px;
    padding: 15px;
    position: relative;
    background: #fff;
}
.cinema-schedule
    .schedule-wrap
    .schedule-list
    .schedule-item:not(:first-child):before {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #ededed;
    color: #ededed;
    transform-origin: 0 0;
    transform: scaleY(0.5);
}
.cinema-schedule .schedule-wrap .schedule-list .schedule-item .left {
    float: left;
    width: 100px;
    margin-top: 12px;
}
.cinema-schedule .schedule-wrap .schedule-list .schedule-item .left .start-at {
    font-size: 16px;
    color: #191a1b;
}
.cinema-schedule .schedule-wrap .schedule-list .schedule-item .left .end-at {
    font-size: 13px;
    color: #797d82;
    margin-top: 4px;
}
.cinema-schedule .schedule-wrap .schedule-list .schedule-item .middle {
    float: left;
    width: calc(100% - 240px);
}
.cinema-schedule
    .schedule-wrap
    .schedule-list
    .schedule-item
    .middle
    .language {
    font-size: 15px;
    color: #191a1b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 12px;
}
.cinema-schedule .schedule-wrap .schedule-list .schedule-item .middle .hall {
    font-size: 13px;
    color: #797d82;
    margin-top: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.cinema-schedule .schedule-wrap .schedule-list .schedule-item .right {
    float: right;
    padding: 10px 0;
    line-height: 25px;
    color: #ff5f16;
    margin-top: 12px;
}
.cinema-schedule
    .schedule-wrap
    .schedule-list
    .schedule-item
    .right
    .buy-ticket {
    float: right;
    height: 25px;
    width: 50px;
    border-radius: 2px;
    position: relative;
    text-align: center;
    font-size: 13px;
}
.cinema-schedule
    .schedule-wrap
    .schedule-list
    .schedule-item
    .right
    .buy-ticket:after {
    content: ' ';
    transform: scale(0.5);
    position: absolute;
    border: 1px solid #ff5f16;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border-radius: 4px;
}
.cinema-schedule
    .schedule-wrap
    .schedule-list
    .schedule-item
    .right
    .lowest-price {
    float: right;
    padding-right: 20px;
    font-size: 15px;
}
.cinema-schedule
    .schedule-wrap
    .schedule-list
    .schedule-item
    .right
    .lowest-price
    .price-icon {
    font-size: 10px;
}
.cinema-schedule .service-info {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #fff;
    overflow: auto;
    z-index: 900;
    overflow-x: hidden;
    font-size: 12px;
    padding: 170px 0 0 0;
}
.cinema-schedule .service-info .services {
    padding: 0 30px;
}
.cinema-schedule .service-info .services .detail {
    margin-top: 20px;
    color: #797d82;
}
.cinema-schedule .service-info .services .detail .left {
    position: relative;
    display: inline;
    float: left;
    height: 100%;
    text-align: center;
    padding: 0 6px;
    margin: 0 2.5px;
    font-size: 10px;
    color: #ffb232;
}
.cinema-schedule .service-info .services .detail .right {
    padding: 0 0 0 70px;
    line-height: 15px;
}
.clearfix:after,
.clearfix:before {
    content: '';
    display: table;
}
.clearfix:after {
    clear: both;
}
.cinema-schedule .service-info .services .detail .left:after {
    content: ' ';
    transform: scale(0.5);
    position: absolute;
    border: 1px solid #ffb232;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border-radius: 4px;
    border-radius: 1px;
}
</style>
