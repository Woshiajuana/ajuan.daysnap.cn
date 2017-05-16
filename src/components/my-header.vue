<template>
    <header class="header-wrap">
        <div class="header-container">
            <logo></logo>
            <nav-bar></nav-bar>
        </div>
    </header>
</template>
<script>
    import NavBar from './nav-bar.vue'
    import Logo from './logo.vue'
    export default {
        name: 'my-header',
        components: {
            NavBar,
            Logo
        }
    }
</script>
<style lang="scss">
    @import "../assets/scss/define";
    .header-wrap{
        @extend %pf;
        @extend %t0;
        @extend %l0;
        @extend %r0;
        z-index: 1;
        transform: translateZ(0);
    }
    .header-container{
        @extend %ma;
        @extend %pr;
        height: 80px;
        width: 800px;
    }
</style>
