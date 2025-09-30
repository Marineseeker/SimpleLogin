<template>
  <div class="lesson-detail-container">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>正在加载课程详情...</p>
    </div>

    <!-- 课程内容 -->
    <div v-else>
      <!-- 课程头部信息 -->
      <div class="lesson-header">
        <div class="lesson-hero">
          <div
            class="lesson-image"
            :style="{
              background: lessonData.imageCover
                ? `url(${lessonData.imageCover}) center/cover`
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }"
          >
            <div class="lesson-overlay">
              <h1 class="lesson-title">{{ lessonData.title }}</h1>
              <div class="lesson-badge">热门课程</div>
            </div>
          </div>
          <div class="lesson-meta">
            <div class="meta-grid">
              <div class="meta-item">
                <i class="el-icon-star-on"></i>
                <span class="meta-label">难度等级</span>
                <span class="meta-value">{{
                  '★'.repeat(lessonData.difficulty || 0) +
                  '☆'.repeat(5 - (lessonData.difficulty || 0))
                }}</span>
              </div>
              <div class="meta-item">
                <i class="el-icon-time"></i>
                <span class="meta-label">课程时长</span>
                <span class="meta-value">{{ lessonData.durationWeeks }}周</span>
              </div>
              <div class="meta-item">
                <i class="el-icon-money"></i>
                <span class="meta-label">课程费用</span>
                <span class="meta-value free">{{ lessonData.free ? '免费' : '付费' }}</span>
              </div>
              <div class="meta-item">
                <i class="el-icon-user"></i>
                <span class="meta-label">学习人数</span>
                <span class="meta-value">{{ lessonData.enrolledCount }}人</span>
              </div>
            </div>
            <div class="action-buttons">
              <button class="btn-primary">立即报名</button>
              <button class="btn-secondary">收藏课程</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 课程内容区域 -->
      <div class="lesson-content">
        <div class="content-grid">
          <!-- 课程章节列表 -->
          <div class="chapters-section">
            <div class="section-header">
              <h2>课程章节</h2>
              <span class="chapter-count">{{ lessonData.chapter?.length || 0 }} 个章节</span>
            </div>
            <div class="chapters-list">
              <div
                v-for="(section, index) in lessonData.chapter || []"
                :key="section.title"
                class="chapter-item"
                :class="{ 'chapter-active': section.status === 'available' }"
              >
                <div class="chapter-info">
                  <div class="chapter-number">{{ index + 1 }}</div>
                  <div class="chapter-details">
                    <h3 class="chapter-title">{{ section.title }}</h3>
                    <div class="chapter-meta">
                      <span class="duration">{{ section.duration }}分钟</span>
                      <span
                        class="status"
                        :class="section.status === 'available' ? 'status-active' : 'status-locked'"
                      >
                        {{ section.status === 'available' ? '可学习' : '待解锁' }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="chapter-action">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- 课程信息侧边栏 -->
          <div class="sidebar">
            <!-- 课程简介 -->
            <div class="info-card">
              <h3>课程简介</h3>
              <p class="course-description">
                {{
                  lessonData.description
                }}
              </p>
            </div>

            <!-- 学习目标 -->
            <div class="info-card">
              <h3>学习目标</h3>
              <ul class="learning-objectives">
                <li
                  v-for="(objective, index) in lessonData.objectives"
                  :key="index"
                >
                  {{ objective }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 课程内容结束 -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getLessonDetailService } from '@/apis/lessons.js'

// 获取路由实例
const route = useRoute()

// 获取课程ID
const lessonId = ref(route.params.id)

// 定义课程数据类型
interface ChapterItem {
  title: string
  status: 'available' | 'locked'
  duration: number
}

interface LessonData {
  id?: number
  title?: string
  description?: string
  createdBy?: number
  createdAt?: string
  difficulty?: number
  durationWeeks?: number
  free?: boolean
  enrolledCount?: number
  chapter?: ChapterItem[]
  objectives?: string[]
  imageCover?: string
}

// 课程数据
const loading = ref(false)
let lessonData: LessonData = {}

// 根据ID获取课程详情的函数
const fetchLessonDetail = async (id) => {
  try {
    loading.value = true
    const response = await getLessonDetailService(id)
    // 由于axios拦截器已经返回了data，直接使用即可
    lessonData = (response as LessonData) || {}
    console.log('lessonData: ', lessonData)
  } catch (error) {
    console.error('获取课程详情失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // 组件挂载时获取课程详情
  if (lessonId.value) {
    fetchLessonDetail(lessonId.value)
  }
})
</script>

<style scoped>
.lesson-detail-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 加载状态样式 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #667eea;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 课程头部样式 */
.lesson-header {
  background: #fff;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.lesson-hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.lesson-image {
  height: 300px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lesson-overlay {
  text-align: center;
  color: #fff;
  z-index: 2;
  position: relative;
}

.lesson-title {
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 20px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.lesson-badge {
  background: rgba(255, 255, 255, 0.3);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
}

/* 课程元信息样式 */
.meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 12px;
}

.meta-item i {
  font-size: 20px;
  color: #667eea;
}

.meta-label {
  font-size: 14px;
  color: #6c757d;
  flex: 1;
}

.meta-value {
  font-weight: 600;
  color: #495057;
}

.meta-value.free {
  color: #28a745;
}

/* 操作按钮样式 */
.action-buttons {
  display: flex;
  gap: 15px;
}

.btn-primary,
.btn-secondary {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.btn-secondary {
  background: #fff;
  color: #667eea;
  border: 2px solid #667eea;
}

/* 课程内容区域 */
.lesson-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

/* 章节列表样式 */
.chapters-section {
  background: #fff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f1f3f4;
}

.section-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.chapter-count {
  background: #667eea;
  color: #fff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.chapters-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.chapter-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 12px;
  background: #f8f9fa;
  cursor: pointer;
  border: 2px solid transparent;
}

.chapter-item.chapter-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-color: #667eea;
}

.chapter-info {
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
}

.chapter-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #667eea;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
}

.chapter-active .chapter-number {
  background: rgba(255, 255, 255, 0.2);
}

.chapter-details {
  flex: 1;
}

.chapter-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: inherit;
}

.chapter-meta {
  display: flex;
  gap: 15px;
  font-size: 14px;
}

.duration {
  color: #6c757d;
}

.chapter-active .duration {
  color: rgba(255, 255, 255, 0.8);
}

.status {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.status-active {
  background: #28a745;
  color: #fff;
}

.status-locked {
  background: #6c757d;
  color: #fff;
}

.chapter-action {
  color: #6c757d;
  font-size: 18px;
}

.chapter-active .chapter-action {
  color: rgba(255, 255, 255, 0.8);
}

/* 侧边栏样式 */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  background: #fff;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.info-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #f1f3f4;
}

.course-description {
  line-height: 1.6;
  color: #6c757d;
  margin: 0;
}

.learning-objectives {
  list-style: none;
  padding: 0;
  margin: 0;
}

.learning-objectives li {
  padding: 8px 0;
  color: #6c757d;
  position: relative;
  padding-left: 25px;
}

.learning-objectives li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #28a745;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .lesson-hero {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 20px;
  }

  .lesson-title {
    font-size: 28px;
  }

  .lesson-image {
    height: 200px;
  }

  .meta-grid {
    grid-template-columns: 1fr;
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .chapters-section {
    padding: 20px;
  }

  .chapter-item {
    padding: 15px;
  }

  .chapter-info {
    gap: 10px;
  }

  .chapter-number {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .lesson-detail-container {
    padding: 0;
  }

  .lesson-hero {
    padding: 15px;
  }

  .lesson-title {
    font-size: 24px;
  }

  .meta-item {
    padding: 12px;
  }

  .chapters-section {
    padding: 15px;
  }

  .info-card {
    padding: 20px;
  }
}
</style>
