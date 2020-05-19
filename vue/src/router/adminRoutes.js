import editor from "../views/Editor";

let adminRoutes = [];
adminRoutes = [
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
        component: () => import(/* webpackChunkName: "about" */ '../views/admin.vue')
    },
]

export default adminRoutes