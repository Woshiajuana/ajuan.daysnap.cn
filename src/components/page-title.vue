<template>
    <h2 class="page-title" v-text="title"></h2>
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
        @extend %c3;
        padding: 10px 0;
    }
</style>
