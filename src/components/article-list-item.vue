<template>
    <div class="article-list-item">
        <a :href="article_href" class="article-list-item-title" v-text="article_title"></a>
        <p class="article-list-item-prompt">
            <svg class="article-list-item-time-icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#time-icon"></use>
            </svg>
            <span class="article-list-item-time" v-text="article_time"></span>
            <svg class="article-list-item-type-icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bookmark-icon"></use>
            </svg>
            <a :href="'#/article/'+article_type" class="article-list-item-type" v-text="article_type.toUpperCase()"></a>
        </p>
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
    .article-list-item-time-icon,
    .article-list-item-type-icon{
        @extend %vam;
        width: 14px;
        height: 14px;
        fill: #999;
        margin-right: 5px;
    }
    .article-list-item-time,
    .article-list-item-type{
        @extend %vam;
        color: #bbb;
    }
    .article-list-item-type{
        transition: color .3s;
        &:hover{
            @extend %c6;
        }
    }
    .article-list-item-time{
        @extend %dib;
        width: 200px;
    }
    .article-list-item{
        @extend %pr;
        @extend %db;
        padding: 20px;
        max-width: 800px;
        border-bottom: 1px solid #ddd;
        &:last-child{
            border-bottom: none;
            margin-bottom: 100px;
        }
    }
    .article-list-item-title{
        @extend %oh;
        @extend %c6;
        font-size: 13px;
        transition: color .3s;
        line-height: 1.8;
        &:hover{
            @extend %c0;
        }
    }
    .article-list-item-prompt{
        @extend %oh;
        @extend %f12;
        @extend %c9;
        height: 30px;
        line-height: 30px;
    }
</style>
