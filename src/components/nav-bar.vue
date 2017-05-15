<template>
    <nav class="nav-wrap">
        <router-link class="nav-item" to="/index">
            <span class="nav-item-con">
                <svg slot="icon" class="nav-item-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#home-icon"></use>
                </svg>
            </span>
        </router-link>
        <router-link class="nav-item" to="/search">
            <span class="nav-item-con">
                <svg slot="icon" class="nav-item-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search-icon"></use>
                </svg>
            </span>
        </router-link>
        <router-link class="nav-item" to="/article">
            <span class="nav-item-con">
                <svg slot="icon" class="nav-item-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#article-icon"></use>
                </svg>
            </span>
        </router-link>
        <router-link class="nav-item" to="/directory">
            <span class="nav-item-con">
                <svg slot="icon" class="nav-item-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#directory-icon"></use>
                </svg>
            </span>
        </router-link>
        <router-link class="nav-item" to="/other">
            <span class="nav-item-con">
                <svg slot="icon" class="nav-item-icon other-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#other-icon"></use>
                </svg>
            </span>
        </router-link>
    </nav>
</template>
<script>
    export default {
        name: 'nav-bar'
    }
</script>
<style lang="scss">
    @import "../assets/scss/define";
    .nav-wrap{
        @extend %pa;
        @extend %tac;
        @extend %oh;
        @extend %w100;
        @extend %l0;
        @extend %t50;
        margin-top: -150px;
    }
    .nav-item{
        @extend %db;
        @extend %pr;
        width: 50%;
        padding-top: 50%;
        margin: 10px auto;
        &.router-link-active{
            .nav-item-icon{
                @extend %w100;
                @extend %h100;
                @extend %t0;
                @extend %l0;
                fill: #000;
            }
        }
    }
    .nav-item-con{
        @extend %pa;
        @extend %t0;
        @extend %r0;
        @extend %l0;
        @extend %b0;
    }
    .nav-item-icon{
        @extend %pa;
        top: 10%;
        left: 10%;
        width: 80%;
        height: 80%;
        fill: #ccc;
        transition: all .3s;
        &.other-icon{
            top: 15%;
            left: 15%;
            width: 70%;
            height: 70%;
        }
    }
    .nav-text{
        @extend %vam;
    }

</style>
