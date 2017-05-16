<template>
    <div class="views-wrap">
        <div class="search-view">
            <search-box @searchByKeyWords="searchByKeyWords" v-model="search_key_words"></search-box>
            <div class="key-words-wrap">
                <span>关键字：</span>
                <a href="#/">v建环境</a>
                <a href="#/">vue如建环境</a>
                <a href="#/">vue如何搭建环境</a>
                <a href="#/">vue建环境</a>
                <a href="#/">vue建环境</a>
                <a href="#/">vue建环境</a>
                <a href="#/">html</a>
                <a href="#/">html</a>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    import SearchBox from '../../components/search-box.vue'
    export default {
        name: 'search',
        data () {
            return {
                search_key_words: ''
            }
        },
        methods: {
            searchByKeyWords (key_words) {
                console.log(key_words,this.search_key_words)
            }
        },
        components: {
            SearchBox
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/define";
    .key-words-wrap{
        @extend %ma;
        width: 85%;
        max-width: 600px;
        line-height: 30px;
        span,a{
            @extend %vam;
        }
        span{
            @extend %f14;
            color: #FF4949;
        }
        a{
            @extend %f12;
            @extend %c9;
            @extend %oh;
            margin: 0 5px;
            transition: all .5s;
            border-bottom: 1px solid transparent;
            &:hover{
                @extend %c3;
                border-bottom: 1px solid #000;
            }
        }
    }
    .search-view{
        padding-top: 150px;
    }
</style>
