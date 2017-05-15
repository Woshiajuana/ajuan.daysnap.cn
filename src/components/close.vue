<template>
    <div @click="close()" class="close-wrap">
         <svg class="close-icon">
             <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close-icon"></use>
         </svg>
    </div>
</template>
<script>
    export default {
        name: 'close',
        methods: {
            close () {
                window.history.go(-1);
            }
        }
    }
</script>
<style lang="scss">
    @import "../assets/scss/define";
    .close-wrap{
        @extend %pa;
        @extend %cp;
        width: 20px;
        height: 20px;
        top: 20px;
        right: 20px;
    }
    .close-icon{
        @extend %w100;
        @extend %h100;
        transition: fill .5s;
        fill: #ccc;
        &:hover{
            fill: #333;
        }
    }
</style>
