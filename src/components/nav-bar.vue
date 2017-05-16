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
        <router-link class="nav-item" to="/category">
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
        @extend %oh;
        @extend %r0;
        @extend %t50;
        margin-top: -10px;
        height: 30px;
        padding: 0 10px;
        border-bottom: 1px solid #ccc;
        &:after,
        &:before{
            content: '';
            @extend %pa;
            @extend %b0;
            width: 1px;
            height: 5px;
            background-color: #ccc;
        }
        &:after{
            @extend %r0;
        }
        &:before{
            @extend %l0;
        }
    }
    .nav-item{
        @extend %dib;
        @extend %pr;
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin: 5px 5px;
        &.router-link-active{
            .nav-item-icon{
                @extend %w100;
                @extend %h100;
                @extend %t0;
                @extend %l0;
                fill: #ffd000;
                fill: #000;
            }
        }
        &:hover{
            &.router-link-active{
                .nav-item-icon{
                    fill: #000;
                }
            }
            .nav-item-icon{
                fill: #666;
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
