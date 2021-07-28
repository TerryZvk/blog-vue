<template>
  <div class="login-box">
    <video ref="video" id="video" autoplay loop muted>
        <source src="http://qwrf3lzu4.hn-bkt.clouddn.com/bg.mp4" type="video/mp4"  />
    </video>
    <span id="voice"></span>
    <div class="login_container">
      <el-form :label-position="labelPosition" :rules="rules" label-width="100px" :model="form">
        <el-form-item v-if="isloginPage" label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item v-if="!isloginPage" label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item v-if="isloginPage" class="tc">
          <el-button class="submit_btn" size="large" type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
        <el-form-item v-else class="tc">
          <el-button class="submit_btn" size="large" type="primary" @click="handleSignup">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { login } from '@/api/login'
  import { setToken } from '@/utils/cookies'
  export default {
    data() {
      return {
        labelPosition: 'right',
        isloginPage: true,
        form: {
          username: undefined,
          email: undefined,
          password: undefined
        },
        rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur'},
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur'},
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur'},
          ]
        }
      };
    },
    created () {
      if (this.$route.meta.title === '登录') {
        this.isloginPage = true
      } else {
        this.isloginPage = false
      }
    },
    mounted () {
      this.$nextTick(() => {
        let voiceBtn = document.getElementById('voice')
        let video = document.getElementById('video')
        voiceBtn.addEventListener('click', function() {
          video.muted = false
        })
        document.querySelectorAll('input').forEach((item)=> {item.style='background:transparent;color:#fff'})
        document.querySelectorAll('.el-form-item__label').forEach((item)=> {item.style.color='#fff'})
      })
    },
    methods: {
      handleSignup () {
      },
      handleLogin () {
        login(this.form).then(res => {
          setToken(res.auth_token)
          this.$router.push('/')
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  #voice{
    cursor: pointer;
    position: absolute;
    left: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    display: inline-block;
    background: url('./../../assets/img/voice.png') no-repeat;
  }
  button, .el-input input {
    background: transparent;
  }
  .el-form-item__label{
    color: #fff;
  }
  .el-form-item__label{
    color: #fff;
  }
  video{  
    position: fixed;  
    right: 0px;  
    bottom: 0px;  
    min-width: 100%;  
    min-height: 100%;  
    height: auto;  
    width: auto;  
    /*加滤镜*/
    /*filter: blur(15px); //背景模糊设置 */
    /*-webkit-filter: grayscale(100%);*/  
    /*filter:grayscale(100%); //背景灰度设置*/  
    z-index:-11       
  }  
  source{  
    min-width: 100%;  
    min-height: 100%;  
    height: auto;  
    width: auto;  
   } 
  .login_container {
    padding-top: 30vh;
    height: 70vh;
    margin: auto;
    width: 500px;
    margin-right: 38vh;
  }
</style>
