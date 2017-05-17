<template>
    <div class="views-wrap home-view">
        <article-list-item
            v-for="(article_list_item,article_list_index) in article_list_arr"
            :article_type="article_list_item.article_type"
            :article_time="article_list_item.article_time"
            :article_title="article_list_item.article_title"
            :article_href="'#/article/' + article_list_item.article_type + '/content/' + article_list_item.article_id"
        ></article-list-item>
        <p class="loading-prompt">
            <svg class="load-icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#load-icon"></use>
            </svg>
            <span>正在加载中···</span>
        </p>
    </div>
</template>
<script>
    import ArticleListItem from '../../components/article-list-item.vue'
    import types from '../../store/mutation-types'
    export default {
        name: 'home',
        data () {
             return {
                 article_list_arr: [
                     {
                         article_type: 'html',
                         article_time: '2017-05-12 14:36',
                         article_title: '如何有效的学习html',
                         article_id: '1'
                     },
                     {
                         article_type: 'html',
                         article_time: '2017-05-12 14:36',
                         article_title: '如何有效的学习html',
                         article_id: '2'
                     },
                     {
                         article_type: 'html',
                         article_time: '2017-05-12 14:36',
                         article_title: '如何有效的学习html',
                         article_id: '3'
                     },
                     {
                         article_type: 'html',
                         article_time: '2017-05-12 14:36',
                         article_title: '如何有效的学习html',
                         article_id: '4'
                     },
                     {
                         article_type: 'html',
                         article_time: '2017-05-12 14:36',
                         article_title: '如何有效的学习html',
                         article_id: '5'
                     },
                     {
                         article_type: 'html',
                         article_time: '2017-05-12 14:36',
                         article_title: '如何有效的学习html',
                         article_id: '6'
                     },
                     {
                         article_type: 'html',
                         article_time: '2017-05-12 14:36',
                         article_title: '如何有效的学习html',
                         article_id: '7'
                     },
                     {
                         article_type: 'html',
                         article_time: '2017-05-12 14:36',
                         article_title: '如何有效的学习html',
                         article_id: '8'
                     },
                     {
                         article_type: 'html',
                         article_time: '2017-05-12 14:36',
                         article_title: '如何有效的学习html',
                         article_id: '9'
                     },
                     {
                         article_type: 'html',
                         article_time: '2017-05-12 14:36',
                         article_title: '如何有效的学习html',
                         article_id: '10'
                     },
                     {
                         article_type: 'html',
                         article_time: '2017-05-12 14:36',
                         article_title: '如何有效的学习html',
                         article_id: '11'
                     },
                     {
                         article_type: 'html',
                         article_time: '2017-05-12 14:36',
                         article_title: '如何有效的学习html',
                         article_id: '12'
                     },
                     {
                         article_type: 'html',
                         article_time: '2017-05-12 14:36',
                         article_title: '如何有效的学习html',
                         article_id: '13'
                     },
                     {
                         article_type: 'html',
                         article_time: '2017-05-12 14:36',
                         article_title: '如何有效的学习html',
                         article_id: '14'
                     }
                 ]
             }
        },
        created () {
            this.$store.commit( types.SET_TITLE, '首页：' )
        },
        components: {
            ArticleListItem
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .loading-prompt{
        @extend %tac;
        @extend %c9;
        padding: 30px 0;
        span{
            @extend %vam;
        }
    }
    .load-icon{
        @extend %vam;
        width: 20px;
        height: 20px;
        margin-right: 10px;
        fill: #999;
        animation: rotate360 1s linear infinite;
    }
</style>
