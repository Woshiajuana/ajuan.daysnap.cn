<template>
    <a href="#/index" class="logo">
        <img src="../assets/img/owulia-text.png" alt="">
    </a>
</template>
<script>
    export default {
        name: 'logo'
    }
</script>
<style lang="scss">
    @import "../assets/scss/define";
    .logo{
        @extend %pa;
        @extend %l0;
        @extend %c0;
        @extend %t50;
        margin-top: -25px;
        height: 50px;
        line-height: 50px;
        font-size: 36px;
        width: 80px;
        img{
            @extend %db;
            @extend %w100;
            @extend %h100;
        }
    }
</style>
