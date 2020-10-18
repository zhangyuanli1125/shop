import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from "@/pages/Login"
import Layout from "@/pages/Layout"
import Menu from "@/pages/menu/Index"
import Add from "@/pages/menu/Add"
import Edit from "@/pages/menu/Edit"
import Role from "@/pages/role/Index"
import RoleAdd from '@/pages/role/Add'
import RoleEdit from '@/pages/role/Edit'
import Admin from "@/pages/admin/Index"
import AdminAdd from "@/pages/admin/Add"
import AdminEdit from "@/pages/admin/Edit"
import Category from "@/pages/category/Index"
import CateAdd from "@/pages/category/Add"
import CateEdit from "@/pages/category/Edit"
import Specs from "@/pages/specs/Index"
import SpecsAdd from "@/pages/specs/Add"
import SpecsEdit from "@/pages/specs/Edit"
import Goods from "@/pages/goods/Index"
import GoodsAdd from "@/pages/goods/Add"
import GoodsEdit from "@/pages/goods/Edit"
import Echart from "@/pages/echart/Zhu"
import Home from "@/pages/Home"
import Vip from "@/pages/vip/Index"
import VipEdit from "@/pages/vip/Edit"
import Lunbo from "@/pages/lunbo/Index"
import LunboAdd from "@/pages/lunbo/Add"
import LunboEdit from "@/pages/lunbo/Edit"
import Active from "@/pages/active/Index"
import ActiveAdd from "@/pages/active/Add"
import ActiveEdit from "@/pages/active/Edit"
Vue.use(Router)

const router = new Router({
  routes: [

    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: "/home",
          component: Home

        },
        {
          path: "/menu",
          component: Menu,
          meta: {
            title: "菜单列表"
          }
        },
        {
          path: "/menu/add",
          component: Add,
          meta: {
            title: "菜单添加"
          }
        },
        {
          path: "/menu/:id",
          component: Edit,
          meta: {
            title: "菜单编辑"
          }
        },
        {
          path: "/role",
          component: Role,
          meta: {
            title: "角色列表"
          }
        },
        {
          path: "/role/add",
          component: RoleAdd,
          meta: {
            title: "角色添加"
          }
        },
        {
          path: "/role/:id",
          component: RoleEdit,
          meta: {
            title: "角色编辑"
          }
        },
        {
          path: "/admin",
          component: Admin,
          meta: {
            title: "管理员列表"
          }
        },
        {
          path: "/admin/add",
          component: AdminAdd,
          meta: {
            title: "管理员添加"
          }
        },
        {
          path: "/admin/:id",
          component: AdminEdit,
          meta: {
            title: "管理员编辑"
          }
        },
        {
          path: "/category",
          component: Category,
          meta: {
            title: "分类列表"
          }
        }, {
          path: "/category/add",
          component: CateAdd,
          meta: {
            title: "分类添加"
          }
        },
        {
          path: "/category/:id",
          component: CateEdit,
          meta: {
            title: "分类编辑"
          }
        },
        {
          path: "/specs",
          component: Specs,
          meta: {
            title: "角色列表"
          }
        },
        {
          path: "/specs/add",
          component: SpecsAdd,
          meta: {
            title: "角色添加"
          }
        },
        {
          path: "/specs/:id",
          component: SpecsEdit,
          meta: {
            title: "角色编辑"
          }
        },
        {
          path: "/goods",
          component: Goods,
          meta: {
            title: "商品列表"
          }
        },
        {
          path: "/goods/add",
          component: GoodsAdd,
          meta: {
            title: "商品添加"
          }
        },
        {
          path: "/goods/:id",
          component: GoodsEdit,
          meta: {
            title: "商品编辑"
          }
        },
        {
          path: "/echart",
          component: Echart,
          meta: {
            title: "柱状图"
          }
        },
        {
          path: "/vip",
          component: Vip,
          meta: {
            title: "vip列表"
          }
        }, {
          path: "/vip/:id",
          component: VipEdit,
          meta: {
            title: "会员编辑"
          }
        }, {
          path: "/lunbo",
          component: Lunbo,
          meta: {
            title: '轮播图列表'
          }

        },

        {
          path: '/lunbo/add',
          component: LunboAdd,
          meta: {
            title: '轮播图添加'
          }
        }, {
          path: '/lunbo/:id',
          component: LunboEdit,
          meta: {
            title: '轮播图编辑'
          }
        },
        {
          path:"/active",
          component:Active,
          meta:{
            title:"秒杀管理"
          }
        },{
          path:'/active/add',
          component:ActiveAdd,
          meta:{
            title:'秒杀添加'
          }
        },
        {
          path:"/active/:id",
          component:ActiveEdit,
          meta:{
            title:"秒杀修改"
          }
        }

      ]
    }, {
      path: "/login",
      component: Login
    },


  ]
})
router.beforeEach((to, from, next) => {
  if (to.path != "/login") {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || "{}")
    if (!userInfo.token) {
      return next('/login')
    }
    return next()
  }
  next()
})
export default router