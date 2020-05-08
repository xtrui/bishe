import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import editor from "../views/Editor";
import Article from "../views/Article";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/articles/:id',
        name: 'article',
        component: Article
    },
    //管理员路由
    {
        path: '/admin',
        name: 'admin',
        redirect: '/admin/blog',
        children: [
            {
                path: 'blog',
                name: 'blog',
                component: editor
            }

        ],
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/admin.vue')
    },
    {
        path: '/editor',
        name: 'editor',
        component: editor
    },
    {
        path: '/test',
        name: 'test'
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

export default router
