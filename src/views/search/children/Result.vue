<template>
    <div class="result-wrap">
        <article-list-item
            v-for="(article_list_item,article_list_index) in article_list_arr"
            :article_type="article_list_item.article_type"
            :article_time="article_list_item.article_time"
            :article_title="article_list_item.article_title"
            :article_href="'#/article/' + article_list_item.article_type + '/content/' + article_list_item.article_id"
        ></article-list-item>
        <p class="result-prompt" v-show="article_list_arr.length">没有了</p>
        <p class="result-null-prompt" v-show="!article_list_arr.length">
            <svg class="null-icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#null-icon"></use>
            </svg>
            <span>没有搜索到结果</span>
        </p>
    </div>
</template>
<script>
    import ArticleListItem from '../../../components/article-list-item.vue'
    export default {
        name: 'result',
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
            this.$emit('hasKeyWords',this.$route.params.key_words);
            this.searchArticle();
        },
        watch :{
            '$route': 'searchArticle'
        },
        components: {
            ArticleListItem
        },
        methods: {
            searchArticle () {
                this.$emit('hasKeyWords',this.$route.params.key_words);
                console.log('正在搜索' + this.$route.params.key_words)
            }
        }
    }
</script>
<style lang="scss">
    @import "../../../assets/scss/define";
    .result-null-prompt{
        @extend %f16;
        @extend %c6;
        @extend %tac;
        padding: 120px 0;
        span{
            line-height: 30px;
        }
    }
    .null-icon{
        @extend %db;
        @extend %ma;
        width: 100px;
        height: 100px;
        fill: #999;
    }
    .result-prompt{
        @extend %tac;
        @extend %c9;
        padding: 30px;
    }
</style>
