import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: 'mp项目后台首页',icon: 'dashboard'}
    }]
  }]
  export const asyncRoutes =[
  {
    path: '/actor',
    component: Layout,
    redirect: '/actor/table',
    name: '演员管理',
    meta: { title: '演员管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '演员列表',
        component: () => import('@/views/actor/list'),
        meta: { title: '演员列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加演员',
        component: () => import('@/views/actor/save'),
        meta: { title: '添加演员', icon: 'tree' },
      }
    ]
  },
  {
    path: '/movie',
    component: Layout,
    redirect: '/movie/list',
    name: '影视分类管理',
    meta: { title: '影视分类管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '分类列表',
        component: () => import('@/views/movie/list'),
        meta: { title: '分类列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加分类',
        component: () => import('@/views/movie/save'),
        meta: { title: '添加分类', icon: 'tree' },
      }
    ]
  },
  {
    path: '/mv',
    component: Layout,
    redirect: '/resource/list',
    name: '资源管理',
    meta: { title: '资源管理', icon: 'example' },
    children: [
      {
        path: 'save',
        name: '添加影视',
        component: () => import('@/views/resource/save'),
        meta: { title: '添加资源', icon: 'eye' }
      },
      {
        path: 'list',
        name: '资源列表',
        component: () => import('@/views/resource/list'),
        meta: { title: '资源列表', icon: 'table' },
      }
    ]
  },
  {
    path: '/statistics/daily',
    component: Layout,
    redirect: '/statistics/daily/create',
    name: '统计分析',
    meta: { title: '统计分析', icon: 'table' },
    children: [
      {
        path: 'create',
        name: 'StatisticsDailyCreate',
        component: () => import('@/views/statistics/daily/create'),
        meta: { title: '生成统计' }
      },
      {
        path: 'echartShow',
        name: 'StatisticShow',
        hidden: true,
        component: () => import('@/views/statistics/daily/echartShow'),

        meta: { title: '统计图表' }

      }
    ]
  },
  {
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    name: '权限管理',
    meta: { title: '权限管理', icon: 'table' },
    children: [
      {
        path: 'user/list',
        name: '用户列表',
        component: () => import('@/views/acl/user/list'),
        meta: { title: '用户列表' }
      },
      {
        path: 'user/add',
        name: '用户添加',
        component: () => import('@/views/acl/user/form'),
        meta: { title: '用户添加' },
        hidden: true
      },
      {
        path: 'user/update/:id',
        name: '用户修改',
        component: () => import('@/views/acl/user/form'),
        meta: { title: '用户修改' },
        hidden: true
      },
      {
        path: 'user/role/:id',
        name: '用户角色',
        component: () => import('@/views/acl/user/roleForm'),
        meta: { title: '用户角色' },
        hidden: true
      },
      {
        path: 'menu/list',
        name: '菜单管理',
        component: () => import('@/views/acl/menu/list'),
        meta: { title: '菜单管理' }
      },
      {
        path: 'role/list',
        name: '角色列表',
        component: () => import('@/views/acl/role/list'),
        meta: { title: '角色列表' }
      },
      {
        path: 'role/form',
        name: '角色添加',
        component: () => import('@/views/acl/role/form'),
        meta: { title: '角色添加' },
        hidden: true
      },
      {
        path: 'role/update/:id',
        name: '角色修改',
        component: () => import('@/views/acl/role/form'),
        meta: { title: '角色修改' },
        hidden: true
      },
      {
        path: 'role/distribution/:id',
        name: '角色修改',
        component: () => import('@/views/acl/role/roleForm'),
        meta: { title: '角色权限' },
        hidden: true
      },


    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

  const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export default router
