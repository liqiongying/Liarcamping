import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
import register from '@/components/register'
import reset from '@/components/reset'
import comment from '@/components/comment'
import search from '@/components/Search'
import SearchContent from '@/page/SearchContent'
import ContentDetail from '@/page/ContentDetail'
import rules from '@/page/rules'
import main from '@/components/main'
import uploadtails from '@/components/uploadtails'
Vue.use(Router);
export default new Router({
    mode:'history',
    routes: [
        {
            path: '*',
            // name: '/index',
            redirect:'/index'
        },{
            path: '/',
            // name: '/index',
            redirect:'/index'
        },
        {
           name:'Main',
           path:'/',
           component:main,
            children:[

                {
                    path: 'index',
                    // name: '/index',
                    // redirect:'/index',
                    component: index
                },
                {
                    path: 'comment',
                    // name: '/comment',
                    component: comment
                },
                {
                    path:'uploadtails',
                    component:uploadtails

                },
                {
                    path:'ContentDetail',
                    component:ContentDetail

                }
            ]
        },{
            path: '/login',
            // name: '/login',
            component: login
        },{
            path: '/register',
            // name: '/register',
            component: register
        },{
            path: '/rules',
            // name: '/register',
            component: rules
        },{
            path: '/reset',
            // name: '/reset',
            component: reset
        },
        {
            path:'/search/:searchText',
            component:search

        },{
            path:'/SearchContent',
            component:SearchContent

        }]
})
