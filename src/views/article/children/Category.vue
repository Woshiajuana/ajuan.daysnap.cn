<template>
    <div class="article-view">
        <div class="category-list-con">
            <a href="#/article/html">HTML</a>
            <a href="#/article/js">JS</a>
            <a href="#/article/css">CSS</a>
            <a href="#/article/html">HTML</a>
            <a href="#/article/html">HTML</a>
            <a href="#/article/html">HTML</a>
            <a href="#/article/html">HTML</a>
            <a href="#/article/html">HTML</a>
            <a href="#/article/html">HTML</a>
            <a href="#/article/html">HTML</a>
            <a href="#/article/html">HTML</a>
            <a href="#/article/html">HTML</a>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'category'
    }
</script>
<style lang="scss">
    @import "../../../assets/scss/define";

    .category-wrap{
        @extend %oya;
        padding: 10px 20px;
    }
    .category-list-con{
        a{
            @extend %db;
            line-height: 1.8;
        }
    }
</style>
