<template>
    <div id="app">
        <!-- 也可以用单标签 <FooterNav/> -->
        <FooterNav v-if="is_show" />
        <router-view />
    </div>
</template>

<script>
// 导入需要使用的组件
import FooterNav from '@/components/FooterNav';
export default {
    data() {
        return {
            is_show: true,
        };
    },
    components: {
        FooterNav,
    },
    created() {
        this.eventBus.$on('footernav', mark => {
            this.is_show = mark;
        });
    },
};
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}
html,
body {
    touch-action: none; //移动端不允许缩放
    height: 100%;
    ul,
    li {
        list-style: none;
    }
}
</style>
