<template>
    <div id="app">

        <!--头部-->
        <my-header></my-header>
        <!--/头部-->

        <!--主体内容视图-->
        <!--<transition-->
            <!--name="custom-classes-transition"-->
                    <!--enter-active-class="animated fadeIn"-->
                    <!--leave-active-class="animated fadeOut">-->
            <!--<keep-alive>-->
            <router-view></router-view>
            <!--</keep-alive>-->
        <!--</transition>-->
        <!--/主体内容视图-->

        <!--svg-->
        <svg-template></svg-template>
        <!--/svg-->
    </div>
</template>

<script>
    import SvgTemplate from './components/svg-template.vue'
    import MyHeader from './components/my-header.vue'
    export default {
        name: 'app',
        components: {
            SvgTemplate,
            MyHeader
        }
    }
</script>

<style lang="scss">
    @import "./assets/scss/reset";
    @import "./assets/scss/common";
</style>
