<template>
  <!-- 底部功能卡片 -->
  <div class="mylessons-section">
    <h2>我的实训</h2>
    <el-row :gutter="20">
      <template v-if="loading">
        <el-col :span="6" v-for="i in 4" :key="i">
          <div class="card skeleton-card">
            <el-skeleton animated>
              <template #template>
                <div class="skeleton-content" style="width: 100%">
                  <el-skeleton-item variant="h3" style="width: 80%" />
                  <el-skeleton-item variant="text" style="width: 60%" />
                </div>
              </template>
            </el-skeleton>
          </div>
        </el-col>
      </template>

      <template v-else>
        <el-col :span="6" v-for="(card, index) in mylessons" :key="card.id">
          <div class="card" :class="colors[index % colors.length]">
            <div class="card-title">{{ card.title }}</div>
            <div class="card-description">{{ card.description }}</div>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMyLessonsService } from '@/apis/lessons'

const mylessons = ref([])
const loading = ref(true)
const colors = ['card-pink', 'card-green', 'card-blue', 'card-yellow', 'card-purple', 'card-orange']

onMounted(async () => {
  try {
    const res = await getMyLessonsService()
    mylessons.value = res.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
    }))
  } catch (error) {
    console.error('获取实训数据失败:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.mylessons-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.mylessons-section h2 {
  font-size: 32px;
  font-weight: 700;
  color: #1e3c72;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
}

.mylessons-section h2::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #1e3c72, #2a5298);
  border-radius: 2px;
}

.card {
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  color: #fff;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.5s ease-in-out;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  z-index: 1;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.card-pink {
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
}

.card-green {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
}

.card-blue {
  background: linear-gradient(135deg, #4682b4 0%, #5c9ce6 100%);
}

.card-yellow {
  background: linear-gradient(135deg, #ffd600 0%, #ffeb3b 100%);
  color: #1e293b;
}

.card-purple {
  background: linear-gradient(135deg, #9b59b6 0%, #b39ddb 100%);
}

.card-orange {
  background: linear-gradient(135deg, #f39c12 0%, #ffb74d 100%);
}

.card-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
  position: relative;
  z-index: 2;
}

.card-description {
  font-size: 15px;
  line-height: 1.6;
  position: relative;
  z-index: 2;
  opacity: 0.9;
}

/* 骨架屏样式 */
.skeleton-card {
  background: #f5f7fa;
  border-radius: 16px;
  padding: 24px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skeleton-card :deep(.el-skeleton__item) {
  margin-bottom: 16px;
}

.skeleton-card :deep(.el-skeleton__item:last-child) {
  margin-bottom: 0;
}

/* 添加淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .mylessons-section {
    padding: 20px;
  }

  .mylessons-section h2 {
    font-size: 24px;
  }

  .skeleton-card {
    height: 160px;
  }

  .card {
    height: 160px;
    padding: 20px;
  }

  .card-title {
    font-size: 18px;
  }

  .card-description {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .card-title {
    font-size: 16px;
  }

  .card-description {
    font-size: 13px;
  }
}
</style>
