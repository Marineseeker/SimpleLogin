<template>
  <div class="app-container">
    <!-- 顶部导航 -->
    <el-header class="header">
      <div class="logo">实训平台-BCP</div>
      <el-menu mode="horizontal" @select="handleSelect" class="nav-menu">
        <el-menu-item index="1" @click="turnToFrontPage">首页</el-menu-item>
        <el-menu-item index="2">教学中心</el-menu-item>
        <el-menu-item index="3" @click="turnToTrainCenter">实训中心</el-menu-item>
        <el-menu-item index="4">考试中心</el-menu-item>
        <el-menu-item index="5">工具超市</el-menu-item>
        <el-menu-item index="6">数据超市</el-menu-item>
      </el-menu>
      <div class="user-info">
        <el-dropdown v-if="userStore.user">
          <span class="el-dropdown-link">
            {{ userStore.user.username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="turnToUserHome">个人中心</el-dropdown-item>
              <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button v-else @click="router.push('/login')" type="primary" round>未登录</el-button>
      </div>
    </el-header>

    <!-- Banner 区域 -->
    <div class="banner">
      <div class="banner-content">
        <div class="banner-text">SWPU实训平台</div>
        <div class="banner-subtext">注重教学质量, 推动数字化改革</div>
      </div>
    </div>

    <!-- 添加 router-view 来显示子路由内容 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import router from '@/router'
import { userLogoutService } from '@/apis/user.js'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

const logout = async () => {
  try {
    // 调用后端登出接口
    await userLogoutService()
    // 清除前端存储
    userStore.clearUser()
    ElMessage.success('退出成功')
    // 跳转到登录页
    router.push('/login')
  } catch (error) {
    console.error('登出失败:', error)
    ElMessage.error('登出失败，请重试')
  }
}

const turnToUserHome = () => {
  router.push('/userhome')
}

const turnToFrontPage = () => {
  router.push('/frontpage')
}

const turnToTrainCenter = () => {
  router.push('/traincenter')
}

</script>

<style scoped>
.app-container {
  background-color: #f8fafc;
  min-height: 100vh;
  color: #1e293b;
  font-family: 'Segoe UI', 'PingFang SC', Arial, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 0 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 64px;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-right: 40px;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-menu {
  background: transparent;
  flex-grow: 1;
  border: none;
}

.el-menu-item {
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 500;
  font-size: 15px;
  padding: 0 20px;
  transition: all 0.3s ease;
  height: 64px;
  line-height: 64px;
}

.el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: #ffd600 !important;
  transform: translateY(-2px);
}

.user-info {
  margin-left: auto;
  padding-left: 20px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.el-dropdown-link:hover {
  color: #ffd600;
  transform: translateY(-1px);
}

.el-button {
  background-color: #ffd600;
  border: none;
  color: #333;
  font-weight: 500;
  transition: all 0.3s ease;
}

.el-button:hover {
  background-color: #e6bf00;
}

.banner {
  background: linear-gradient(135deg, #e3f0ff 0%, #f6faff 100%);
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../../assets/swpuimg.jpg') center/cover;
  opacity: 0.1;
  z-index: 0;
}

.banner-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.banner-text {
  font-size: 48px;
  font-weight: 800;
  color: #1e3c72;
  letter-spacing: 2px;
  margin-bottom: 12px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.banner-subtext {
  font-size: 20px;
  color: #475569;
  font-weight: 500;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .header {
    padding: 0 20px;
    height: 56px;
  }

  .logo {
    font-size: 20px;
    margin-right: 20px;
  }

  .el-menu-item {
    padding: 0 12px;
    font-size: 14px;
    height: 56px;
    line-height: 56px;
  }

  .banner {
    height: 120px;
  }

  .banner-text {
    font-size: 32px;
  }

  .banner-subtext {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .header {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }

  .nav-menu {
    width: 100%;
    margin-top: 10px;
  }

  .el-menu-item {
    padding: 0 8px;
    font-size: 13px;
  }

  .user-info {
    margin: 10px 0 0 0;
    width: 100%;
    text-align: center;
  }

  .banner-text {
    font-size: 24px;
  }

  .banner-subtext {
    font-size: 14px;
  }
}
</style>
