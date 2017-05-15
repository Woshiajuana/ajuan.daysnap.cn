<template>
    <div class="view-part view-1 list-wrap">
        <article-list-item
            v-for="(article_list_item,article_list_index) in article_list_arr"
            :article_type="article_list_item.article_type"
            :article_time="article_list_item.article_time"
            :article_title="article_list_item.article_title"
            :article_href="article_href + article_list_item.article_id"
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
</template>
<script>
    import ArticleListItem from '../../components/article-list-item.vue'
    export default {
        name: 'list',
        components: {
            ArticleListItem
        },
        props: ['article_list_arr','article_href'],
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
    .list-wrap{
        @extend %oya;
        padding: 10px 20px;
    }
    .pagination-wrap{
        padding: 30px 0;
        .el-pager li.active {
            border-color: #333;
            background-color: #333;
            @extend %cfff;
            cursor: default;
            &:hover{
                @extend %cfff;
            }
        }
        .el-pager li:hover {
            @extend %c3;
        }
    }
</style>
