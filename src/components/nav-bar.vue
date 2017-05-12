<template>
    <nav class="nav-wrap">
        <router-link class="nav-item" to="/" exact>
            <span class="nav-item-con">
                <svg slot="icon" class="nav-item-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#home-icon"></use>
                </svg>
                <span class="nav-text">首页</span>
            </span>
        </router-link>
        <router-link class="nav-item" to="/search">
            <span class="nav-item-con">
                <svg slot="icon" class="nav-item-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search-icon"></use>
                </svg>
                <span class="nav-text">搜索</span>
            </span>
        </router-link>
        <router-link class="nav-item" to="/article">
            <span class="nav-item-con">
                <svg slot="icon" class="nav-item-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#article-icon"></use>
                </svg>
                <span class="nav-text">文章</span>
            </span>
        </router-link>
        <router-link class="nav-item" to="/directory">
            <span class="nav-item-con">
                <svg slot="icon" class="nav-item-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#directory-icon"></use>
                </svg>
                <span class="nav-text">目录</span>
            </span>
        </router-link>
        <router-link class="nav-item" to="/other">
            <span class="nav-item-con">
                <svg slot="icon" class="nav-item-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#other-icon"></use>
                </svg>
                <span class="nav-text">其它</span>
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
        @extend %fr;
        @extend %pr;
    }
    .nav-item{
        @extend %f14;
        @extend %c6;
        margin: 0 10px;
        &.router-link-active{
            @extend %fwb;
            color: #000;
            .nav-item-icon{
                fill: #000;
            }
        }
    }
    .nav-item-icon{
        @extend %vam;
        width: 20px;
        height: 20px;
        fill: #999;
    }
    .nav-text{
        @extend %vam;
    }

</style>
