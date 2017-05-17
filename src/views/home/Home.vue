<template>
    <div class="views-wrap home-view">
        <article-list-item
            v-for="(article_list_item,article_list_index) in article_list_arr"
            :article_type="article_list_item.article_type"
            :article_time="article_list_item.article_time"
            :article_title="article_list_item.article_title"
            :article_href="'#/article/' + article_list_item.article_type + '/content/' + article_list_item.article_id"
        ></article-list-item>
        <loading></loading>
    </div>
</template>
<script>
    import ArticleListItem from '../../components/article-list-item.vue'
    import types from '../../store/mutation-types'
    import loading from '../../components/loading.vue'
    export default {
        name: 'home',
        data () {
             return {
                 article_list_arr: [
                     {
                         article_type: 'css',
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
            ArticleListItem,
            loading
        }
    }
</script>
