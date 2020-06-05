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
import register from "../views/register";
import Setting from "../views/Setting";
import UserAdmin from "../views/UserAdmin";
import Favorite from "../views/Favorite";
import UserSetting from "../views/UserSetting";
import UserManageComment from "../views/UserManageComment";
import admin from "../views/admin";


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
        path: '/register',
        name: 'register',
        component: register
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
    //登录用户后台路由
    {
        path: '/user',
        name: 'userAdmin',
        redirect: '/user/favorite',
        component: UserAdmin,
        children: [
            {
                path: 'favorite',
                name: 'favorite',
                component: Favorite
            },
            {
                path: 'comment',
                name: 'userComment',
                component: UserManageComment
            },
            {
                path: 'setting',
                name: 'userSetting',
                component: UserSetting
            }
        ]
    },
    // 管理员路由
    {
        path: '/admin',
        name: 'admin',
        redirect: '/admin/blog',
        component: admin,
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
            },
            {
                path: 'setting',
                name: 'setting',
                component: Setting
            },
        ],
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
