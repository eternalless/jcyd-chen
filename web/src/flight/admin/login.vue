<template>
  <div class="page-login">
    <div class="login-box">
      <div class="login-title">
        <h3>行李服务管理后台</h3>
        <p>登录</p>
      </div>
      <div class="login-form">
        <el-form label-position="top" :model="loginForm" :rules="loginRule" ref="loginForm" >
          <el-form-item  prop="username">
            <el-input placeholder="工号" type="text" v-model="loginForm.username" @keyup.enter.native="handleSubmit" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="pass">
            <el-input placeholder="密码" type="password" v-model="loginForm.pass" @keyup.enter.native="handleSubmit" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../../auth'
import md5 from 'md5'

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        pass: ''
      },
      loginRule: {
        username: [
            { required: true,message: '请填写员工号',trigger: 'blur' }
        ],
        pass: [
          { required: true,message: '请填写密码',trigger: 'blur' }
        ]
      }
    }
  },
  mouted () {
    if (auth.loggedIn()) {
      this.goDashboard()
    }
  },
  methods: {
    goDashboard () {
      this.$router.push({path:"/"})
    },
    handleSubmit () {
      let md5pwd = md5(this.loginForm.pass)
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          auth.login(this.loginForm.username, md5pwd, (val) => {
            if (val) {
              //store 存储用户信息
              this.$store.commit('SET_USER',val.userInfo)
              this.$store.commit('SET_TOKEN',val.token)
              //跳转主页
              this.goDashboard()
            }
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
html, body, .page-login {
  min-height: 100vh;
}
.page-login {
  background-color: #f7f7f7;
  padding-top: 50px;
}
.login-title {
  color: #2a323c;
  text-align: center;
  padding: 20px 0 0;
  h3 {
    margin: 0 0 30px 0;
  }
  p {
    font-weight: bold;
    color: #898989;
    margin: 0;
  }
}
.login-box {
  margin: 0 auto;
  max-width: 400px;
  border-radius: 5px;
  background-color: #fff;
}
.login-form {
  padding: 20px 30px;
  border: 0;

  button {
    display: block;
    width: 100%;
  }
}
</style>
