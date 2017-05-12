<template>
    <header class="header-wrap">
        <div class="header-content">
            <nav-bar></nav-bar>
        </div>
    </header>
</template>
<script>
    import NavBar from './nav-bar.vue'
    export default {
        name: 'my-header',
        components: {
            NavBar
        }
    }
</script>
<style lang="scss">
    @import "../assets/scss/define";
    .header-wrap{
        @extend %pf;
        @extend %w100;
        @extend %l0;
        @extend %t0;
        @extend %oh;
        z-index: 1;
        height: 60px;
        background-color: #fff;
    }
    .header-content{
        @extend %ma;
        @extend %clearfix;
        margin-top: 20px;
    }
    @media only screen and (min-width:1000px) {
        .header-wrap{
            height: 120px;
        }
        .header-content{
            width: 1000px;
            margin-top: 60px;
        }
    }
</style>
