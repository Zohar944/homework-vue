<template>
  <div class="class-style">
    <el-form>
      <el-form-item>
        <el-button style="width: 15%;height: 10%" class="el-icon-picture-outline" @click="funEdit('head')">更换头像
        </el-button>
        <el-form v-if="this.isStatus==='head'">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 15%;height: 10%" class="el-icon-magic-stick" @click="funEdit('name')">换个昵称</el-button>
        <el-form :rules="updateRules" :model="nameForm" ref="nameForm" v-if="this.isStatus==='name'">
          <el-form-item prop="name">
            <el-input style="width: 30%;height: 10%" v-model="nameForm.name" placeholder="请输入新的昵称" clearable></el-input>
          </el-form-item>
          <el-button type="success" icon="el-icon-check" round @click="funButton('name',nameForm.name)"></el-button>
          <el-button type="danger" icon="el-icon-delete" round @click="funEdit('')"></el-button>
        </el-form>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 15%;height: 10%" class="el-icon-refresh" @click="funEdit('password')">修改密码</el-button>
        <el-form :rules="updateRules" :model="password" ref="password" v-if="this.isStatus === 'password'">
          <el-form-item prop="oldPassword">
            <el-input style="width: 30%;height: 10%" v-model="password.oldPassword" placeholder="请输入旧密码" show-password
                      clearable></el-input>
          </el-form-item>
          <el-form-item prop="newPassword">
            <el-input style="width: 30%;height: 10%" v-model="password.newPassword" placeholder="请输入新密码" show-password
                      clearable></el-input>
          </el-form-item>
          <el-form-item prop="conPassword">
            <el-input style="width: 30%;height: 10%" v-model="password.conPassword" placeholder="请再次确认新密码" show-password
                      clearable></el-input>
          </el-form-item>
          <el-button type="success" icon="el-icon-check" round
                     @click="funButton('password',password.newPassword)"></el-button>
          <el-button type="danger" icon="el-icon-delete" round @click="funEdit('')"></el-button>
        </el-form>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 15%;height: 10%" class="el-icon-phone" @click="funEdit('telNumber')">更换手机号码</el-button>
<!--        缺个手机验证码验证-->
        <el-form :rules="updateRules" :model="telForm" ref="telForm" v-if="this.isStatus==='telNumber'">
          <el-form-item prop="telNumber">
            <el-input style="width: 30%;height: 10%" v-model="telForm.telNumber" placeholder="请输入新手机号码"
                      clearable></el-input>
          </el-form-item>
          <el-button type="success" icon="el-icon-check" round @click="funButton('telNumber',telForm.telNumber)"></el-button>
          <el-button type="danger" icon="el-icon-delete" round @click="funEdit('')"></el-button>
        </el-form>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    data() {
      var nameFunction = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('昵称不能为空'));
        } else if (value === sessionStorage.getItem('userName')) {
          return callback(new Error('昵称不能重复'));
        } else {
          callback()
        }
      }//校验规则
      var oldPasswordFun = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        } else if (value !== sessionStorage.getItem('password')) {
          return callback(new Error('旧密码错误'));
        } else {
          callback()
        }
      }
      var newPasswordFun = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        } else if (value === sessionStorage.getItem('password')) {
          return callback(new Error('新旧密码不能一样'));
        } else {
          callback()
        }
      }
      var conPasswordFun = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('密码不能为空'));
        } else if (value === sessionStorage.getItem('password')) {
          return callback(new Error('新旧密码不能一样'));
        } else if (value !== this.password.newPassword) {
          return callback(new Error('两次密码不对'));
        } else {
          callback()
        }
      }
      var telNumberFun = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('号码不能为空'));
        } else if (value === sessionStorage.getItem('telNumber')) {
          return callback(new Error('号码重复'));
        } else {
          callback()
        }
      }
      return {
        isStatus: '',
        nameForm: {
          name: ''
        },
        password: {
          oldPassword: '',
          newPassword: '',
          conPassword: ''
        },
        telForm: {
          telNumber: ''
        },
        updateRules: {
          name: [
            {required: true, validator: nameFunction, trigger: 'blur'}
          ],
          oldPassword: [
            {required: true, validator: oldPasswordFun, trigger: 'blur'}
          ],
          newPassword: [
            {required: true, validator: newPasswordFun, trigger: 'blur'}
          ],
          conPassword: [
            {required: true, validator: conPasswordFun, trigger: 'blur'}
          ],
          telNumber: [
            {pattern: /^1[3456789]\d{9}$/, message: '手机号格式不对', trigger: 'blur'},
            {required: true, validator: telNumberFun, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      funEdit(value) {
        this.isStatus = value
      },
      funButton(value, status) {
        if (value === "name") {
          this.$refs['nameForm'].validate((valid) => {
            if (valid) {
              this.$axios({
                method: 'post',
                url: 'http://localhost:80/api/userservice/userEdit',
                data: this.qs.stringify({    //这里是发送给后台的数据
                  userId: sessionStorage.getItem('userId'),
                  userName: status
                })
              }).then((response) => {//这里使用了ES6的语法
                if (response.data.data === "SUCCESS") {
                  console.log(response)
                  sessionStorage.setItem('userName', status)
                  alert("修改成功!")
                } else {
                  alert("操作数据库失败")
                }
              }).catch((error) => {
                alert('请求服务器失败！！')       //请求失败返回的数据
              })
            } else {
              alert('表单数据错误！！！')
            }
          })
        } else if (value === "password") {
          this.$refs['password'].validate((valid) => {
            if (valid) {
              this.$axios({
                method: 'post',
                url: 'http://localhost:80/api/userservice/userEdit',
                data: this.qs.stringify({    //这里是发送给后台的数据
                  userId: sessionStorage.getItem('userId'),
                  password: status
                })
              }).then((response) => {//这里使用了ES6的语法
                if (response.data.data === "SUCCESS") {
                  sessionStorage.setItem('password', status)
                  alert("修改成功!")
                } else {
                  alert("操作数据库失败")
                }
              }).catch((error) => {
                alert('请求服务器失败！！')       //请求失败返回的数据
              })
            } else {
              alert('表单数据错误！！！')
            }
          })
        } else if (value === "telNumber") {
          this.$refs['telForm'].validate((valid) => {
            if (valid) {
              this.$axios({
                method: 'post',
                url: 'http://101.200.219.156:80/api/userservice/userEdit',
                data: this.qs.stringify({    //这里是发送给后台的数据
                  userId: sessionStorage.getItem('userId'),
                  telNumber: status
                })
              }).then((response) => {//这里使用了ES6的语法
                if (response.data.data === "SUCCESS") {
                  sessionStorage.setItem('telNumber', status)
                  alert("修改成功!")
                } else {
                  alert("操作数据库失败")
                }
              }).catch((error) => {
                alert('请求服务器失败！！')       //请求失败返回的数据
              })
            } else {
              alert('表单数据错误！！！')
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }

  .class-style {
    width: 100%;
    text-align: center;
  }
</style>
