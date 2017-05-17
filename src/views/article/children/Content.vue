<template>
    <div class="content-view">
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
</template>
<script>
    import types from '../../../store/mutation-types'
    export default {
        name: 'content',
        created () {
            this.$store.commit( types.SET_TITLE, this.$route.params.id + '：' )
        }
    }
</script>
