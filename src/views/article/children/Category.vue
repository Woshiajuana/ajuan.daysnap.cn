<template>
    <div class="category-view">
        <div class="category-list-con">
            <a href="#/article/html">HTML</a>
            <a href="#/article/js">JS</a>
            <a href="#/article/css">CSS</a>
            <a href="#/article/html">HTML</a>
            <a href="#/article/html">HTML</a>
            <a href="#/article/html">HTML</a>
            <a href="#/article/html">HTML</a>
            <a href="#/article/html">HTML</a>
            <a href="#/article/html">HTML</a>
            <a href="#/article/html">HTML</a>
            <a href="#/article/html">HTML</a>
            <a href="#/article/html">HTML</a>
        </div>
    </div>
</template>
<script>
    import types from '../../../store/mutation-types'
    export default {
        name: 'category',
        created () {
            this.$store.commit( types.SET_TITLE, '分类：' )
        }
    }
</script>
<style lang="scss">
    @import "../../../assets/scss/define";
    .category-list-con{
        a{
            @extend %db;
            line-height: 1.8;
        }
    }
</style>
