<template>
  <div class="user-home">
    <!-- 用户信息卡片 -->
    <div class="user-card">
      <div class="user-header">
        <div class="user-avatar">
          <el-avatar
            :size="100"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </div>
        <div class="user-info">
          <h2 class="user-name">{{ userStore.user.username }}</h2>
          <p class="user-role">学生 | 计算机科学与技术</p>
          <div class="user-stats">
            <div class="stat-item">
              <span class="stat-value">12</span>
              <span class="stat-label">实训课程</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">8</span>
              <span class="stat-label">已完成</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">4</span>
              <span class="stat-label">进行中</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-section">
      <!-- 左侧：最近活动 -->
      <div class="recent-activities">
        <h3 class="section-title">最近活动</h3>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.time"
            :type="activity.type"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>

      <!-- 右侧：快捷操作 -->
      <div class="quick-actions">
        <h3 class="section-title">快捷操作</h3>
        <div class="action-grid">
          <div class="action-card" v-for="(action, index) in quickActions" :key="index">
            <el-icon class="action-icon" :size="24">
              <component :is="action.icon" />
            </el-icon>
            <span class="action-text">{{ action.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const activities = ref([
  {
    content: '完成了"石油钻井平台操作"实训课程',
    time: '2024-03-05 14:30',
    type: 'success',
  },
  {
    content: '参加了"新能源技术发展"专题讲座',
    time: '2024-03-03 10:00',
    type: 'primary',
  },
  {
    content: '提交了"石油工程概论"课程作业',
    time: '2024-03-01 16:45',
    type: 'info',
  },
  {
    content: '加入了"石油工程创新实践"小组',
    time: '2024-02-28 09:15',
    type: 'warning',
  },
])

const quickActions = ref([
  { icon: 'Calendar', text: '我的课程' },
  { icon: 'Document', text: '学习记录' },
  { icon: 'Message', text: '消息通知' },
  { icon: 'Star', text: '收藏内容' },
  { icon: 'Collection', text: '学习资料' },
  { icon: 'Setting', text: '个人设置' },
])
</script>

<style scoped>
.user-home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 用户信息卡片样式 */
.user-card {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-radius: 16px;
  padding: 40px;
  color: white;
  margin-bottom: 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.user-header {
  display: flex;
  align-items: center;
  gap: 30px;
}

.user-avatar {
  flex-shrink: 0;
}

.user-info {
  flex-grow: 1;
}

.user-name {
  font-size: 2rem;
  margin: 0 0 8px 0;
  font-weight: 600;
}

.user-role {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0 0 20px 0;
}

.user-stats {
  display: flex;
  gap: 40px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* 主要内容区样式 */
.content-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.section-title {
  font-size: 1.5rem;
  color: #1e3c72;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f2f5;
}

/* 最近活动样式 */
.recent-activities {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* 快捷操作样式 */
.quick-actions {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.action-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-card:hover {
  background: #f0f7ff;
  transform: translateY(-2px);
}

.action-icon {
  color: #1e3c72;
}

.action-text {
  font-size: 1rem;
  color: #2c3e50;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .user-home {
    padding: 20px;
  }

  .user-card {
    padding: 30px;
  }

  .user-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .user-stats {
    justify-content: center;
  }

  .content-section {
    grid-template-columns: 1fr;
  }

  .action-grid {
    grid-template-columns: 1fr;
  }
}
</style>
