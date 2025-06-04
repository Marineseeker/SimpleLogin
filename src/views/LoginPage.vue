<template>
  <el-row class="container">
    <el-col class="bg" :span="12"> </el-col>
    <el-col :span="12" class="form-container">
      <div class="form-wrapper">
        <el-form ref="form" size="large" :model="loginData" :rules="rules">
          <el-form-item class="header">
            <h1>SWPU 实训平台</h1>
          </el-form-item>

          <el-form-item prop="email">
            <el-input class="input" type="email" v-model="loginData.email">
              <template #prefix>
                <i class="fas fa-envelope"></i>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              class="input"
              :type="showPassword ? 'text' : 'password'"
              v-model="loginData.password"
            >
              <template #prefix>
                <i class="fa-solid fa-lock"></i>
              </template>

              <template #suffix>
                <el-button
                  style="border: none"
                  :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                  @click="showPassword = !showPassword"
                >
                </el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button class="login-button" @click="login"> login </el-button>
          </el-form-item>

          <el-form-item>
            <el-col :span="12">
              <router-link to="/register" class="register-link" style="text-decoration: none">
                <el-link underline="never">没有账号？注册</el-link>
              </router-link>
            </el-col>

            <el-col style="text-align: right" :span="12">
              <router-link to="/forget" class="register-link" style="text-decoration: none">
                <el-link underline="never">忘记密码?</el-link>
              </router-link>
            </el-col>

            <el-row>
              <router-link
                to="/Thirdpartylogin"
                class="register-link"
                style="text-decoration: none"
              >
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
import { onMounted, ref } from 'vue'
import { userLoginServive } from '@/apis/user'
import { useRoute } from 'vue-router'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const route = useRoute()

const userStore = useUserStore()

const showPassword = ref(false)

const loginData = ref({
  email: '',
  password: '',
})

const login = async () => {
  console.log(loginData.value.data)
  const res = await userLoginServive(loginData.value)
  // 保存token
  localStorage.setItem('token', res.token)
  // 持久化 user 到 pinia
  userStore.setUser(res.user)
  ElMessage.success('欢迎 ' + res.user.username)
  router.push('/mainlayout')
}

const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '长度在 6 到 16 个字符之间', trigger: 'blur' },
  ],
}

onMounted(async() => {
  if (route.query.email) {
    loginData.value.email = route.query.email
    loginData.value.password = route.query.password
  }
})
</script>

<style scoped>
.input {
  width: 100%;
}

.form-wrapper {
  /* 黑色半透明背景 */
  background-color: rgba(0, 0, 0, 0.7);
  /* 圆角 */
  border-radius: 16px;
  /* 内边距 */
  padding: 40px;
  /* 轻微阴影 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  /* 最大宽度 */
  max-width: 450px;
  /* 水平居中 */
  margin: 0 auto;
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

.login-button {
  width: 100%;
}

.header {
  display: flex;
  justify-content: center;
}
</style>
