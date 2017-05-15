<template>
    <div class="view-part view-2">
        <div class="view-part df">
            <div class="view-part view-1 content-wrap">
                    <h2>文章</h2>
                    <a href="#/index/article/1/comment">评论</a>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
                    <p>xsxasxasxsa</p>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'article',
        created () {
            console.log(this.$route.meta.view);
            this.$emit('addView',1)
        },
        methods: {

        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .content-wrap{
        @extend %oya;
        padding: 10px 20px;
    }
    p{
        line-height: 30px;
    }
</style>
