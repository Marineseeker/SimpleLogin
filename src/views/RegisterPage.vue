<template>
  <el-row class="container">
    <el-col class="bg" :span="12"> </el-col>
    <el-col :span="12" class="form-container">
      <div class="form-wrapper">
        <el-form ref="form" size="large" :model="registerData" :rules="rules">
          <el-form-item class="header">
            <h1>register</h1>
          </el-form-item>
          <el-form-item>
            <el-input class="input" type="text" v-model="registerData.username" placeholder="可选, 不填随机">
              <template #prefix>
                <i class="fa-solid fa-user"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input class="input" type="email" v-model="registerData.email">
              <template #prefix>
                <i class="fas fa-envelope"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="input" :type="showPassword ? 'text' : 'password'" v-model="registerData.password">
              <template #prefix>
                <i class="fa-solid fa-lock"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input class="input" :type="showPassword ? 'text' : 'password'" v-model="registerData.repassword"
              placeholder="请再次输入密码">

              <template #prefix>
                <i class="fa-solid fa-lock"></i>
              </template>

              <template #suffix>
                <el-button style="border: none;" :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                  @click="showPassword = !showPassword">
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="register-button" @click="register"> register </el-button>
          </el-form-item>
          <el-form-item>
            <el-col :span="12">
              <router-link to="/login" class="register-link" style="text-decoration: none;">
                <el-link underline="never">已有账号? 登录</el-link>
              </router-link>
            </el-col>
            <el-col style="text-align: right;" :span="12">
              <router-link to="/forget" class="register-link" style="text-decoration: none;">
                <el-link underline="never">忘记密码?</el-link>
              </router-link>
            </el-col>
            <el-row>
              <router-link to="/Thirdpartylogin" class="register-link" style="text-decoration: none;">
                <el-link underline="never">第三方登录</el-link>
              </router-link>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { userRegisterService } from '@/apis/user'
import router from '@/router'

const showPassword = ref(false)

const registerData = ref({
  username: '',
  email: '',
  password: '',
  repassword: ''
})

const register = async () => {
  const result = await userRegisterService(registerData.value)
  if (result.code === 0) {
    router.push({
      path: '/login',
      query: {
        email: registerData.value.email,
        password: registerData.value.password
      }
    })
  }
}

const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码长度应为 6 到 16 个字符', trigger: 'blur' },
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerData.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}


</script>

<style scoped>
.input {
  width: 100%;
}

.form-wrapper {
  background-color: rgba(0, 0, 0, 0.7);
  /* 黑色半透明背景 */
  border-radius: 16px;
  /* 圆角 */
  padding: 40px;
  /* 内边距 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  /* 轻微阴影 */
  max-width: 450px;
  /* 最大宽度 */
  margin: 0 auto;
  /* 水平居中 */
}

.container {
  background-image: url('../assets/swpuimg.jpg');
  background-size: cover;
  background-position: center;
  /* 背景图片居中 */
}

.form-container {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  height: 100vh;
}

.register-button {
  width: 100%;
}

.header {
  display: flex;
  ;
  justify-content: center;
}
</style>
