<template>
    <div id="app">
        <!-- 也可以用单标签 <FooterNav/> -->
        <FooterNav></FooterNav>
        <router-view />
    </div>
</template>

<script>
// 导入需要使用的组件
import FooterNav from '@/components/FooterNav';
export default {
    components: {
        FooterNav,
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
    height: 100%;
    touch-action: none; //移动端不允许缩放
    ul,
    li {
        list-style: none;
    }
}
</style>
