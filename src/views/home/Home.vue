<template>
    <div class="views-wrap home-view">
        <article-list-item
            v-for="(article_list_item,article_list_index) in article_list_arr"
            :article_type="article_list_item.article_type"
            :article_time="article_list_item.article_time"
            :article_title="article_list_item.article_title"
            :_id="article_list_item._id"
        ></article-list-item>
        <loading></loading>
    </div>
</template>
<script>
    import ArticleListItem from '../../components/article-list-item.vue'
    import types from '../../store/mutation-types'
    import loading from '../../components/loading.vue'
    import Util from '../../assets/lib/Util'
    export default {
        name: 'home',
        data () {
             return {
                 article_list_arr: []
             }
        },
        created () {
            this.$store.commit( types.SET_TITLE, '首页：' );
            this.fetchArticlesList();
        },
        methods: {
            /**获取文章列表信息*/
            fetchArticlesList () {
                Util.fetchArticlesList({},(result) => {
                    if ( result.status ) {
                        var data = result.data;
                        this.article_list_arr = data.article_arr;
                    }
                });
            }
        },
        components: {
            ArticleListItem,
            loading
        }
    }
</script>
