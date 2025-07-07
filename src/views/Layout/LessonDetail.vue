<template>
  <div class="lesson-detail-container">
    <!-- 课程头部信息 -->
    <div class="lesson-header">
      <div class="lesson-hero">
        <div
          class="lesson-image"
          :style="{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }"
        >
          <div class="lesson-overlay">
            <h1 class="lesson-title">自然语言处理</h1>
            <div class="lesson-badge">热门课程</div>
          </div>
        </div>
        <div class="lesson-meta">
          <div class="meta-grid">
            <div class="meta-item">
              <i class="el-icon-star-on"></i>
              <span class="meta-label">难度等级</span>
              <span class="meta-value">★★★★☆</span>
            </div>
            <div class="meta-item">
              <i class="el-icon-time"></i>
              <span class="meta-label">课程时长</span>
              <span class="meta-value">5小时</span>
            </div>
            <div class="meta-item">
              <i class="el-icon-money"></i>
              <span class="meta-label">课程费用</span>
              <span class="meta-value free">免费</span>
            </div>
            <div class="meta-item">
              <i class="el-icon-user"></i>
              <span class="meta-label">学习人数</span>
              <span class="meta-value">1,234人</span>
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
            <span class="chapter-count">{{ sections.length }} 个章节</span>
          </div>
          <div class="chapters-list">
            <div
              v-for="(section, index) in sections"
              :key="section.id"
              class="chapter-item"
              :class="{ 'chapter-active': index === 0 }"
            >
              <div class="chapter-info">
                <div class="chapter-number">{{ index + 1 }}</div>
                <div class="chapter-details">
                  <h3 class="chapter-title">{{ section.title }}</h3>
                  <div class="chapter-meta">
                    <span class="duration">{{ section.duration }}分钟</span>
                    <span class="status" :class="index === 0 ? 'status-active' : 'status-locked'">
                      {{ index === 0 ? '可学习' : '待解锁' }}
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
              自然语言处理是人工智能领域的重要分支，涵盖文本处理、机器翻译、情感分析等内容。
              本课程将带你深入了解NLP的核心技术，从基础概念到实际应用，全面提升你的AI技能。
            </p>
          </div>

          <!-- 学习目标 -->
          <div class="info-card">
            <h3>学习目标</h3>
            <ul class="learning-objectives">
              <li>掌握NLP基础理论和核心算法</li>
              <li>学会文本预处理和特征提取</li>
              <li>理解机器翻译的工作原理</li>
              <li>能够独立完成NLP项目开发</li>
            </ul>
          </div>

          <!-- 讲师信息 -->
          <div class="info-card">
            <h3>讲师介绍</h3>
            <div class="instructor">
              <div class="instructor-avatar">
                <img src="https://via.placeholder.com/60x60/667eea/ffffff?text=AI" alt="讲师头像" />
              </div>
              <div class="instructor-info">
                <h4>张教授</h4>
                <p>人工智能专家，拥有10年NLP研究经验</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const sections = reactive([
  { id: 1, title: '第1章 自然语言处理分类', duration: 180 },
  { id: 2, title: '第2章 文本预处理技术', duration: 180 },
  { id: 3, title: '第3章 机器翻译基础', duration: 180 },
  { id: 4, title: '第4章 高级NLP技术', duration: 180 },
  { id: 5, title: '第5章 实战项目开发', duration: 240 },
])
</script>

<style scoped>
.lesson-detail-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
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
  transition: all 0.3s ease;
}

.meta-item:hover {
  background: #e9ecef;
  transform: translateY(-2px);
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
  transition: all 0.3s ease;
  flex: 1;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #fff;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: #fff;
  transform: translateY(-2px);
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
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.chapter-item:hover {
  background: #e9ecef;
  transform: translateX(5px);
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

.instructor {
  display: flex;
  align-items: center;
  gap: 15px;
}

.instructor-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.instructor-info h4 {
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-size: 16px;
}

.instructor-info p {
  margin: 0;
  color: #6c757d;
  font-size: 14px;
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
