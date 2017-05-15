/**
 * Created by Administrator on 2017/5/15.
 */
export default {
    install ( Vue, options ) {
        Vue.prototype.$top = function ( top ) {
            this.$nextTick( () => {
                window.scrollTop = top;
                document.body.scrollTop = top;
            })
        }
    }
}
