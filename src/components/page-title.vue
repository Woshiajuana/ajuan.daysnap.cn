<template>
    <h1 class="page-title" v-text="title"></h1>
</template>
<script>
    export default {
        name: 'page-title',
        props: [ 'title' ]
    }
</script>
<style lang="scss">
    @import "../assets/scss/define";
    .page-title{
        @extend %f16;
        @extend %fwn;
        @extend %c3;
        @extend %oh;
        @extend %cd;
        line-height: 80px;
        height: 80px;
        width: 420px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
