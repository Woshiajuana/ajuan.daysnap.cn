<template>
    <div class="pagination-wrap">
        <ul class="pagination-con">
            <li class="pagination-item"><</li>
            <li v-for="page_index in pageTotal" v-text="page_index" class="pagination-item"
                :class="{ 'active': page_index == page_current }"></li>
            <li class="pagination-item-more" v-show="page_total > max">···</li>
            <li class="pagination-item" v-show="page_total > max" v-text="page_total"></li>
            <li class="pagination-item">></li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'pagination',
        props: [ 'page_total', 'page_current' ],
        data () {
            return {
                max: 4
            }
        },
        computed: {
            pageTotal () {
                return this.page_total > this.max ? 4 : this.page_total;
            }
        }
    }
</script>
<style lang="scss">
    @import "../assets/scss/define";
    .pagination-wrap{
        @extend %tac;
        padding: 30px 0;
    }
    .pagination-con{
        @extend %clearfix;
        @extend %ma;
        @extend %fs0;
    }
    .pagination-item-more,
    .pagination-item{
        @extend %dib;
        @extend %tac;
        @extend %f14;
        @extend %c9;
        line-height: 30px;
        width: 30px;
        height: 30px;
        margin: 0 2px;
    }
    .pagination-item{
        @extend %cp;
        transition: color .3s;
        &:hover{
            @extend %c0
        }
        &.active{
            @extend %c0;
            @extend %fwb;
        }
    }
</style>
