<template>
    <header class="header-wrap">
        <nav-bar></nav-bar>
    </header>
</template>
<script>
    import NavBar from './nav-bar.vue'
    import SearchBox from './search-box.vue'
    export default {
        name: 'my-header',
        components: {
            NavBar,
            SearchBox
        }
    }
</script>
<style lang="scss">
    @import "../assets/scss/define";
    .header-wrap{
        @extend %pa;
        @extend %l0;
        @extend %bsb;
        @extend %t0;
        @extend %b0;
        width: 50px;
        background-color: #FFD000;
        background-color: #F9FAFC;
        border-right: 1px solid #ddd;
    }
</style>
