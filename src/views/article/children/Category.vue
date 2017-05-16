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
