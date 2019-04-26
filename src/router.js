import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { title: "行政平台" }
    },
    {
      path: '/me/record/borrow',
      name: 'returnRecord',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "record" */ './views/record/ReturnRecord.vue')
    },
    {
      path: '/me/record/goods',
      name: 'goodsRecord',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "record" */ './views/record/GoodsRecord.vue'),
      meta: { title: "物品领取记录" }
    },
    {
      path: '/me',
      name: 'me',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "me" */ './views/Me.vue'),
      meta: { title: "个人中心" }
    },
    {
      path: '/book',
      name: 'book',
      component: () => import(/* webpackChunkName: "book" */ './views/book/book.vue'),
      meta: { title: "共享图书" }
    },
    {
      path: '/book/detail',
      name: 'bookDetail',
      component: () => import(/* webpackChunkName: "book" */ './views/book/BookDetail.vue'),
      meta: { title: "图书详情" }
    },
    {
      path: '/umbrella',
      name: 'umbrella',
      component: () => import(/* webpackChunkName: "umbrella" */ 'views/Umbrella/Umbrella.vue'),
      meta: { title: "共享雨伞" }
    },
    {
      path: '/good',
      name: 'good',
      component: () => import(/* webpackChunkName: "good" */ 'views/good/Good.vue'),
      meta: { title: "物品领取" }
    }
    // {
    //   path: '/return',
    //   name: 'return',
    //   component: ()=> import(/* webpackChunkName: "record" */ 'views/return/Return.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {

  if (to.path === "/me/record/borrow") {

    if (to.query.assets_id === "1") {
      document.title = "雨伞借取记录"
    } else if (to.query.assets_id === "2") {
      document.title = "图书借取记录"
    }
  } else {
    document.title = to["meta"]["title"]
  }
  localStorage.from = from.path
  next() // 确保一定要调用 next()

})

export default router
