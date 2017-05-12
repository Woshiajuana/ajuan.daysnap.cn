<template>
    <div id="app">
        <!--主体内容视图-->
        <!--<transition :name="animateName">-->
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
    export default {
        name: 'app',
        components: {
            SvgTemplate
        }
    }
</script>

<style lang="scss">
    @import "./assets/scss/reset";
    @import "./assets/scss/common";
</style>
