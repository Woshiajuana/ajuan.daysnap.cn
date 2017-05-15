<template>
    <div class="search-box">
        <input type="text" placeholder="请输入检索关键词" class="search-input">
        <i class="search-btn">
            <svg slot="icon" class="search-btn-icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search-btn-icon"></use>
            </svg>
        </i>
    </div>
</template>
<script>
    export default {
        name: 'search'
    }
</script>
<style lang="scss">
    @import "../assets/scss/define";
    .search-box{
        @extend %pr;
        @extend %df;
        @extend %f14;
        @extend %ma;
        width: 85%;
        height: 45px;
        max-width: 600px;
        line-height: 45px;
        padding-left: 15px;
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
    .search-input{
        @extend %df1;
        height: 45px;
        border: none;
    }
    .search-btn{
        @extend %pr;
        @extend %cp;
        width: 45px;
        height: 45px;
        &:hover{
            .search-btn-icon{
                fill: #333;
            }
        }
    }
    .search-btn-icon{
        @extend %pa;
        @extend %t50;
        @extend %l50;
        width: 20px;
        height: 20px;
        margin-top: -10px;
        margin-left: -10px;
        fill: #999;
        transition: fill .3s;
    }
</style>
