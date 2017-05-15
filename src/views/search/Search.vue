<template>
    <div class="view-wrap">
        <div class="view-part view-1 search-wrap">
            <search-box></search-box>
            <div class="key-words-wrap">
                <a href="#/">v建环境</a>
                <a href="#/">vue如建环境</a>
                <a href="#/">vue如何搭建环境</a>
                <a href="#/">vue建环境</a>
                <a href="#/">html</a>
                <a href="#/">vue如何搭建环境</a>
                <a href="#/">vue如环境</a>
                <a href="#/">csss</a>
                <a href="#/">vue如搭建环境</a>
                <a href="#/">vu建环境</a>
                <a href="#/">xx</a>
                <a href="#/">xxxasxsax</a>
                <a href="#/">xxxxas</a>
                <a href="#/">xx</a>
                <a href="#/">xsxasxasxasxaasxsaxx</a>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    import SearchBox from '../../components/search-box.vue'
    export default {
        name: 'search',
        components: {
            SearchBox
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
    .search-wrap{
        @extend %oya;
        padding-top: 150px;
    }
</style>
