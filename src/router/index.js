import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home.vue'
import Search from '../views/search/Search.vue'
import Article from '../views/article/Article.vue'
import Directory from '../views/directory/Directory.vue'
import Other from '../views/other/Other.vue'

Vue.use(Router);

export default new Router({
    routes: [
        /**首页*/
        {
            path: '/',
            name: 'home',
            component: Home
        },
        /**搜索页*/
        {
            path: '/search',
            name: 'search',
            component: Search
        },
        /**文章页*/
        {
            path: '/article',
            name: 'article',
            component: Article
        },
        /**目录页*/
        {
            path: '/directory',
            name: 'directory',
            component: Directory
        },
        /**其它页*/
        {
            path: '/other',
            name: 'other',
            component: Other
        }
    ]
})
