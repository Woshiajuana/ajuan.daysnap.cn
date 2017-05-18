<template>
    <div class="list-view">
        <Loading v-show="is_loading"></Loading>
        <article-list-item
            v-for="(article_list_item,article_list_index) in article_list_arr"
            :article_type="article_list_item.article_type"
            :article_time="article_list_item.article_time"
            :article_title="article_list_item.article_title"
            :_id="article_list_item._id"
        ></article-list-item>
        <p class="result-null-prompt" v-show="!is_loading && !article_list_arr.length">
            <svg class="null-icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#null-icon"></use>
            </svg>
            <span>没有了</span>
        </p>
    </div>
</template>
<script>
    import ArticleListItem from '../../../components/article-list-item.vue'
    import types from '../../../store/mutation-types'
    import Util from '../../../assets/lib/Util'
    import Loading from '../../../components/loading.vue'
    export default {
        name: 'home',
        data () {
            return {
                is_loading: false,
                article_list_arr: []
            }
        },
        created () {
            this.fetchArticlesList();
            this.$store.commit( types.SET_TITLE, this.$route.params.category + '：' )
        },
        methods: {
            /**获取文章列表信息*/
            fetchArticlesList () {
                this.is_loading = true;
                var tab = this.$route.params.category;
                Util.fetchArticlesList({
                    tab: tab
                }, (result) => {
                    setTimeout( () => {
                        this.is_loading = false;
                        if ( result.status ) {
                            var data = result.data;
                            this.article_list_arr = data.article_arr;
                        }
                    },300);
                });
            }
        },
        components: {
            ArticleListItem,
            Loading
        }
    }
</script>
