import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserRegist from '@/views/user_login/UserRegist'
import UserFinanceIndex from '../views/finance/UserFinanceIndex'
import DateCalendar from '../views/date/DateCalendar'
import P404 from '../views/error_page/P404'
import UserData from "../views/user_login/data/UserData";
import FinanceData from "../views/user_login/data/finance/FinanceData";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/views/user_login',
      name: 'UserRegist',
      component: UserRegist
    },
    {
      path: '/views/finance',
      name: 'UserFinanceIndex',
      component: UserFinanceIndex,
      children: [
        {
          path: '/views/date',
          name: 'DateCalendar',
          component: DateCalendar
        },
      ], meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '*',
      name: 'P404',
      component: P404
    },//这里是保证错误地址会跳转到404界面进行提示
    {
      path:'views/user_login/data',
      name:'UserData',
      component:UserData
    },
    {
      path:'views/user_login/data/finance',
      name:'FinanceData',
      component:FinanceData
    }
  ]
})

