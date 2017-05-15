<template>
    <div class="view-wrap">
        <div class="view-part view-1 category-wrap">

        </div>

        <router-view></router-view>
    </div>
</template>
<script>

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

        },
        mounted () {
            this.$top(0);
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
    .key-words-wrap{
        @extend %ma;
        @extend %tac;
        padding: 10px;
        width: 60%;
        max-width: 560px;
        a{
            @extend %dib;
            @extend %f12;
            @extend %c9;
            @extend %oh;
            padding: 0 20px;
            line-height: 24px;
            height: 24px;
            border: 1px solid #ccc;
            border-radius: 15px;
            margin: 5px 5px;
            transition: all .5s;
            background-color: #fff;
            &:hover{
                @extend %cfff;
                background-color: #333;
            }
        }
    }
    .category-wrap{
        @extend %oya;
        padding-top: 150px;
    }
</style>
