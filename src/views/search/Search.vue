<template>
    <div class="container-view">
        <search-box></search-box>
        <div class="result-wrap">
            <p class="result-prompt">搜索结果：</p>
            <article-list-item
                v-for="(article_list_item,article_list_index) in article_list_arr"
                :article_type="article_list_item.article_type"
                :article_time="article_list_item.article_time"
                :article_title="article_list_item.article_title"
                :article_href="article_list_item.article_href"
            ></article-list-item>
            <!--分页组件-->
            <div class="pagination-wrap">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, prev, pager, next, jumper"
                    :total="1000">
                </el-pagination>
            </div>
            <!--/分页组件-->
        </div>
    </div>
</template>
<script>
    import ArticleListItem from '../../components/article-list-item.vue'
    import Pagination from '../../components/pagination.vue'
    import SearchBox from '../../components/search-box.vue'
    export default {
        name: 'search',
        data () {
            return {
                article_list_arr: [
                    {
                        article_type: 'html',
                        article_time: '2017-05-12 14:36',
                        article_title: '如何有效的学习html',
                        article_href: '#/article'
                    },
                    {
                        article_type: 'html',
                        article_time: '2017-05-12 14:36',
                        article_title: '如何有效的学习html',
                        article_href: '#/article'
                    },
                    {
                        article_type: 'html',
                        article_time: '2017-05-12 14:36',
                        article_title: '如何有效的学习html',
                        article_href: '#/article'
                    },
                    {
                        article_type: 'html',
                        article_time: '2017-05-12 14:36',
                        article_title: '如何有效的学习html',
                        article_href: '#/article'
                    },
                    {
                        article_type: 'html',
                        article_time: '2017-05-12 14:36',
                        article_title: '如何有效的学习html',
                        article_href: '#/article'
                    },
                    {
                        article_type: 'html',
                        article_time: '2017-05-12 14:36',
                        article_title: '如何有效的学习html',
                        article_href: '#/article'
                    },
                    {
                        article_type: 'html',
                        article_time: '2017-05-12 14:36',
                        article_title: '如何有效的学习html',
                        article_href: '#/article'
                    },
                    {
                        article_type: 'html',
                        article_time: '2017-05-12 14:36',
                        article_title: '如何有效的学习html',
                        article_href: '#/article'
                    },
                    {
                        article_type: 'html',
                        article_time: '2017-05-12 14:36',
                        article_title: '如何有效的学习html',
                        article_href: '#/article'
                    },
                    {
                        article_type: 'html',
                        article_time: '2017-05-12 14:36',
                        article_title: '如何有效的学习html',
                        article_href: '#/article'
                    },
                    {
                        article_type: 'html',
                        article_time: '2017-05-12 14:36',
                        article_title: '如何有效的学习html',
                        article_href: '#/article'
                    },
                    {
                        article_type: 'html',
                        article_time: '2017-05-12 14:36',
                        article_title: '如何有效的学习html',
                        article_href: '#/article'
                    },
                    {
                        article_type: 'html',
                        article_time: '2017-05-12 14:36',
                        article_title: '如何有效的学习html',
                        article_href: '#/article'
                    },
                    {
                        article_type: 'html',
                        article_time: '2017-05-12 14:36',
                        article_title: '如何有效的学习html',
                        article_href: '#/article'
                    }
                ],
                page_total: 10,
                page_current: 2
            }
        },
        components: {
            ArticleListItem,
            Pagination,
            SearchBox
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .result-wrap{
        margin-top: 30px;
    }
    .result-prompt{
        @extend %f16;
        @extend %c3;
        line-height: 30px;
    }

</style>
