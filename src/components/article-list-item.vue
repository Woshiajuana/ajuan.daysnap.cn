<template>
    <div class="article-list-item">
        <a :href="'#/article?tab='+article_type" class="article-list-item-type">
            <svg class="article-list-item-type-icon">
                 <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#'+ article_type"></use>
            </svg>
        </a>
        <a :href="article_href" class="article-list-item-title" v-text="article_title"></a>
        <p class="article-list-item-time" v-text="article_time"></p>
    </div>
</template>
<script>
    export default {
        name: 'article-list-item',
        props: [ 'article_href', 'article_type', 'article_title', 'article_time']
    }
</script>
<style lang="scss">
    @import "../assets/scss/define";
    .article-list-item{
        @extend %pr;
        @extend %db;
        padding: 20px;
        max-width: 800px;
        margin-left: 50px;
        border-bottom: 1px solid #ddd;
        &:last-child{
            border-bottom: none;
            margin-bottom: 100px;
        }
    }
    .article-list-item-type{
        @extend %pa;
        @extend %t50;
        left: -50px;
        width: 50px;
        height: 50px;
        margin-top: -25px;
        &:hover{
            .article-list-item-type-icon{
                fill: #000;
            }
        }
    }
    .article-list-item-type-icon{
        @extend %pa;
        @extend %t50;
        @extend %l50;
        width: 30px;
        height: 30px;
        margin-top: -15px;
        margin-left: -15px;
        fill: #666;
        transition: fill .3s;
    }
    .article-list-item-title{
        @extend %oh;
        @extend %c6;
        font-size: 13px;
        transition: color .3s;
        line-height: 30px;
        &:hover{
            @extend %c0;
        }
    }
    .article-list-item-time{
        @extend %oh;
        @extend %tar;
        @extend %f12;
        @extend %c9;
        height: 20px;
        line-height: 20px;
    }
</style>
