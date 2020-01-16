<template>
  <div class="myclass">
    <el-form class="itemClass" :rules="userRules" :model="user" ref="user"
             @keyup.enter.native="login(user.userId,user.password)">
      <el-form-item prop="userId">
        <el-input placeholder="账号" v-model.number="user.userId" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" v-model="user.password" show-password clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-user-solid" round @click="login(user.userId,user.password)">登录
        </el-button>
        <el-button type="primary" icon="el-icon-edit" round @click="regist">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: 'HelloWorld',

    data () {
      return {
        msg: 'denglu',
        user: {
          password: '',
          userId: '',
          userName: ''
        },
        userRules: {
          userId: [
            {required: true, message: '请输入用户ID', trigger: 'blur'},
            {type: 'number', message: '无效ID，ID应为数字'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      regist () {
        this.$router.push('/views/user_login')
      },
      login (userId, password) {
        this.$refs['user'].validate((valid) => {
          // alert(valid)
          if (valid) {
            this.$axios({
              method: 'post',
              url: 'http://localhost:8081/userservice/userLogin',
              data: this.qs.stringify({    //这里是发送给后台的数据
                userId: userId,
                password: password,
              })
            }).then((response) => {//这里使用了ES6的语法
              if (response.data.data.status == 'SUCCESS') {  //调用后台数据
                sessionStorage.setItem('userName', response.data.data.userName)
                sessionStorage.setItem('userId', response.data.data.userId)
                this.$router.push('/views/index')
              } else {
                alert('用户密码错误!')
              }
            }).catch((error) => {
              alert('用户密码错误!!!!!')       //请求失败返回的数据
            })
          } else {
            this.$router.push('/')
          }
        })
      }
    }
  }
</script>

<style>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .myclass input.el-input__inner {
    width: 16%;
  }

  .itemClass .el-form-item__error {
    width: 100%;
    text-align: center;
  }
</style>
