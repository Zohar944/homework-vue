import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserRegist from '@/views/user_login/UserRegist'
import UserFinanceIndex from '../views/finance/UserFinanceIndex'
import DateCalendar from '../views/date/DateCalendar'
import P404 from '../views/error_page/P404'
import UserData from "../views/user_login/data/UserData";
import FinanceData from "../views/user_login/data/finance/FinanceData";
import CsvUpload from "../views/user_login/data/function/CsvUpload";
import UserInfo from "../views/user_login/user/UserInfo";
import DateFinance from "../views/finance/date_finance/DateFinance";
import Friend from "../views/user_login/friend/Friend";
import Index from "../views/index/Index";

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
        // {
        //   path: '/views/date',
        //   name: 'DateCalendar',
        //   component: DateCalendar
        // },
      ]
    },
    {
      path: '*',
      name: 'P404',
      component: P404
    },//这里是保证错误地址会跳转到404界面进行提示
    {
      path: '/views/user_login/data',
      name: 'UserData',
      component: UserData
    },
    {
      path: '/views/user_login/data/finance',
      name: 'FinanceData',
      component: FinanceData
    },
    {
      path: '/views/user_login/data/function',
      name: "CsvUpload",
      component: CsvUpload
    }, {
      path: '/views/finance/date_finance',
      name: 'DateFinance',
      component: DateFinance
    },
    {
      path: '/views/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/views/finance',
          name: 'UserFinanceIndex',
          component: UserFinanceIndex,
        }, {
          path: '/views/user_login/friend',
          name: 'Friend',
          component: Friend
        }, {
          path: '/views/user_login/user',
          name: "UserInfo",
          component: UserInfo
        }, {
          path: '/views/finance/date_finance',
          name: 'DateFinance',
          component: DateFinance
        },{
          path: '/views/date',
          name: 'DateCalendar',
          component: DateCalendar
        },
      ],
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    }
  ]
})

