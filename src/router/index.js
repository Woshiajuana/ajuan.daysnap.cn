import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home.vue'
import Search from '../views/search/Search.vue'
import Article from '../views/article/Article.vue'
import Directory from '../views/directory/Directory.vue'
import Other from '../views/other/Other.vue'
import Comment from '../views/comment/Comment.vue'

Vue.use(Router);

export default new Router({
    routes: [
        /**首页(重定向)*/
        {
            path: '/',
            redirect: { name: 'home' }
        },
        /**首页*/
        {
            path: '/index',
            name: 'home',
            component: Home,
            children: [
                /**文章内容页*/
                {
                    path: 'article/:id',
                    name: 'article',
                    component: Article,
                    meta: {
                        view: 2
                    },
                    /**文章评论页*/
                    children: [
                        {
                            path: 'comment',
                            name: 'comment',
                            component: Comment
                        }
                    ]
                }
            ]
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
