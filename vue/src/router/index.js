import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import editor from "../views/Editor";
import Article from "../views/Article";
import Category from "../views/Category";
import Search from "../views/Search";
import Login from "../views/Login";
import CategoryAll from '../views/CategoryAll';
import ManageArticle from '../views/ManageArticle'
import ManageComment from '../views/ManageComment'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/articles/:id',
        name: 'article',
        component: Article
    },
    {
        path: '/category/:id',
        name: 'category',
        component: Category
    },
    {
        path: '/categories/page',
        name: 'categoryPage',
        component: CategoryAll
    },
    {
        path: '/search/:key',
        name: 'search',
        component: Search
    },
    // 管理员路由
    {
        path: '/admin',
        name: 'admin',
        redirect: '/admin/blog',
        children: [
            {
                path: 'blog',
                name: 'blog',
                component: editor
            },
            {
                path: 'update/:id',
                name: 'update',
                component: editor
            },


            {
                path: 'manageArticle',
                name: 'manageArticle',
                component: ManageArticle
            },
            {
                path: 'manageComment',
                name: 'manageComment',
                component: ManageComment
            }

        ],
        component: () => import(/* webpackChunkName: "about" */ '../views/admin.vue')
    },
    {
        path: '*',
        name: '*',
        redirect: '/'
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});
let flag = false;

export default router
