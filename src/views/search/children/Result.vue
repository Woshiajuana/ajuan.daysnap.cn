<template>
    <div class="result-wrap">
        <list
            :article_href="'#/search/222/article/'"
            :article_list_arr="article_list_arr"></list>
    </div>
</template>
<script>
    import List from '../../../views/list/List.vue'
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
            List
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
    .result-wrap{
        @extend %oya;
    }
</style>
