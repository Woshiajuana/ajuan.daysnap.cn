<template>
    <div class="view-wrap">
        <div class="view-part view-1 category-wrap">
            <div class="category-list-con">
                <a href="#/">HTML</a>
                <a href="#/">HTML</a>
                <a href="#/">HTML</a>
                <a href="#/">HTML</a>
                <a href="#/">HTML</a>
                <a href="#/">HTML</a>
                <a href="#/">HTML</a>
                <a href="#/">HTML</a>
                <a href="#/">HTML</a>
                <a href="#/">HTML</a>
                <a href="#/">HTML</a>
                <a href="#/">HTML</a>
                <a href="#/">HTML</a>
            </div>
        </div>

        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'category'
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .key-words-wrap{
        @extend %ma;
        @extend %tac;
        padding: 10px;
        width: 60%;
        max-width: 560px;
        a{
            @extend %dib;
            @extend %f12;
            @extend %c9;
            @extend %oh;
            padding: 0 20px;
            line-height: 24px;
            height: 24px;
            border: 1px solid #ccc;
            border-radius: 15px;
            margin: 5px 5px;
            transition: all .5s;
            background-color: #fff;
            &:hover{
                @extend %cfff;
                background-color: #333;
            }
        }
    }
    .category-wrap{
        @extend %oya;
        padding: 10px 20px;
    }
    .category-list-con{
        @extend %pa;
        @extend %t50;
        margin-top: -195px;
        a{
            @extend %db;
            line-height: 1.8;
        }
    }
</style>
