<!--用户登录代码-->
<template>
  <div class="usernew">
    <el-form class="userClass" :rules="registeRules" :model="userRegist" ref="userRegist" @keyup.enter.native="registFunction
    (userRegist.uname,userRegist.telNumber,userRegist.password,userRegist.repassword,userRegist.newfile,userRegist.sex)">
      <el-form-item prop="uname">
        <el-input placeholder="请输入用户名" v-model="userRegist.uname" clearable>用户名</el-input>
      </el-form-item>
      <el-form-item prop="telNumber">
        <el-input placeholder="请输入手机号码" v-model.number="userRegist.telNumber" clearable>手机号码
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" v-model="userRegist.password" show-password clearable>密码
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="再次确认密码" v-model="userRegist.repassword" show-password clearable>
          确认密码
        </el-input>
      </el-form-item>
      <!--      缺个上传图像-->
      <el-form-item>
        <el-input type="file" v-model="userRegist.newfile"></el-input>
      </el-form-item>
      <el-radio-group v-model="userRegist.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
      <br>
      <el-button
        type="success" icon="el-icon-check" round
        @click="registFunction(userRegist.uname,userRegist.telNumber,userRegist.password,userRegist.repassword,userRegist.newfile,userRegist.sex)">
        注册
      </el-button>
      <el-button type="primary" icon="el-icon-back" round @click="indexPage">返回</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'UserRegist',
    data () {
      return {
        userRegist: {
          id: '',
          uname: '',
          telNumber: '',
          password: '',
          repassword: '',
          newfile: '',
          sex: '男'
        },
        registeRules: {
          uname: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          telNumber: [
            {required: true, message: '手机号码不能为空', trigger: 'blur'},
            {type: 'number', message: '手机号码需为数字'},
            {
              pattern: /^1[3456789]\d{9}$/,
              message: '手机号格式不对',
              trigger: 'blur'
            }
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {
              pattern: /^(?=.*\d)[\s\S]{6,16}$/,
              message: '密码过于简单，长度在6~16',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      indexPage () {
        this.$router.push('/')
      },
      registFunction (uname, telNumber, password, repassword, newfile, sex) {
        if (password == repassword) {
          // console.log(this.$refs)
          this.$refs['userRegist'].validate((valid) => {
            if (valid) {
              this.$axios({
                method: 'post',
                url: 'http://localhost:8081/userservice/userRegister',
                data: {
                  telNumber: telNumber,
                  userName: uname,
                  password: password,
                  headPortrait: newfile,
                  gender: sex
                }
              }).then((response) => {//这里使用了ES6的语法
                alert('您的账号ID为:'+response.data.data) //调用后台传过来的数据
                this.$router.push('/')
              })
            } else {
              this.$route.push('views/user_login')
            }
          })
          this.$router.push('/')
        } else {
          alert('密码不一致!')
        }
      }
    },
  }
</script>

<style>
  .userClass input.el-input__inner {
    width: 16%;
  }

  .usernew .el-form-item__error {
    width: 100%;
    align-content: center;
  }
</style>
