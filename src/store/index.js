import Vuex from 'vuex' //引入状态管理
import Vue from 'vue'


Vue.use(Vuex) ;


const ADD_COUNT = 'ADD_COUNT'; // 用常量代替事件类型，使得代码更清晰
const REMOVE_COUNT = 'REMOVE_COUNT';
//注册状态管理全局参数
export default Vuex.Store({
  state:{
    token:'',
    userName:'',
    userId:'',
    telNumber:'',
    password:'',
    headPortrait:'',
    gender:''
  },
  mutations: {
    //写法与getters相类似
    //组件想要对于vuex 中的数据进行的处理
    //组件中采用this.$store.commit('方法名') 的方式调用，实现充分解耦
    //内部操作必须在此刻完成(同步)
    [ADD_COUNT] (state, token) { // 第一个参数为 state 用于变更状态 登录
      sessionStorage.setItem("token", token);
      state.token = token;
    },
    [REMOVE_COUNT] (state, token) { // 退出登录

      sessionStorage.removeItem("token", token);

      state.token = token;
    },
  }
});
