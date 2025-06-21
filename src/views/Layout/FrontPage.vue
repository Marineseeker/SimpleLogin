<template>
  <div class="carousel-wrapper">
    <el-carousel :interval="4000" arrow="always" height="500px" indicator-position="outside">
      <el-carousel-item v-for="(news, index) in newsItems" :key="index">
        <div class="news-slide" :style="{ backgroundImage: `url(${news.image})` }">
          <div class="news-content">
            <span class="news-date">{{ news.date }}</span>
            <h2 class="news-title">{{ news.title }}</h2>
            <p class="news-summary">{{ news.summary }}</p>
            <el-button type="primary" class="read-more">阅读更多</el-button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>

  <!-- 新闻模块 -->
  <div class="news-section">
    <h2 class="section-title">最新动态</h2>
    <div class="news-grid">
      <div v-for="(news, index) in newsItems" :key="index" class="news-card">
        <div class="news-image">
          <img :src="news.image" :alt="news.title" />
        </div>
        <div class="news-content">
          <span class="news-date">{{ news.date }}</span>
          <h3 class="news-title">{{ news.title }}</h3>
          <p class="news-summary">{{ news.summary }}</p>
          <el-button type="primary" text class="read-more">阅读更多</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import swpuimg from '../../assets/swpuimg.jpg'
import canteen from '../../assets/canteen.jpg'
import swpuimg3 from '../../assets/swpuimg3.jpg'
import oilresearch from '../../assets/oilresearch.jpg'
import Oildrillingrig from '../../assets/Oildrillingrig.jpg'

const loading = ref(true)
const newsItems = ref([])

// 模拟从后端获取数据
const fetchNews = async () => {
  try {
    // 模拟数据
    newsItems.value = [
      {
        title: '学校举办2024年春季开学典礼',
        summary:
          '新学期伊始, 我校隆重举行2024年春季开学典礼, 校长发表重要讲话, 勉励全体师生在新学期取得更大进步。',
        date: '2024-03-01',
        image: swpuimg,
      },
      {
        title: '我校科研团队取得重大突破',
        summary: '近日, 我校科研团队在新能源领域取得重大突破, 相关研究成果发表在国际顶级期刊。',
        date: '2024-02-28',
        image: oilresearch,
      },
      {
        title: '校园文化活动月正式启动',
        summary: '为丰富校园文化生活, 提升学生综合素质, 我校启动为期一个月的校园文化活动。',
        date: '2024-02-25',
        image: swpuimg3,
      },
      {
        title: '钻井平台实地考察',
        summary: '学校组织了针对钻井平台的实地考察, 培养学生对于钻井平台的兴趣',
        date: '2025-2-18',
        image: Oildrillingrig,
      },
      {
        title: '食堂实景展示',
        summary:
          '积极响应学生口粮改善考察, 为学生与教工提供 集美味、健康、便捷于一体的现代化用餐空间',
        date: '2025-3-5',
        image: canteen,
      },
    ]
  } catch (error) {
    console.error('获取新闻数据失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchNews()
})
</script>

<style scoped>
.carousel-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 60px auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.news-slide {
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
}

.news-slide::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
}

.news-content {
  position: relative;
  z-index: 2;
  color: white;
  padding: 40px;
  max-width: 600px;
}

.news-date {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 12px;
  display: block;
  color: inherit;
}

.news-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 20px 0;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  color: inherit;
}

.news-summary {
  font-size: 0.8rem;
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.read-more {
  padding: 12px 30px;
  font-size: 1rem;
  border: 2px solid currentColor;
  background: transparent;
  color: inherit;
  transition: all 0.3s ease;
}

.read-more:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 新闻模块样式 */
.news-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.section-title {
  font-size: 2rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #409eff;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.news-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.news-image {
  height: 200px;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-card:hover .news-image img {
  transform: scale(1.05);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .carousel-wrapper {
    margin: 0 10px 40px 10px;
  }

  .news-content {
    padding: 20px;
  }

  .news-title {
    font-size: 1.8rem;
  }

  .news-summary {
    font-size: 1rem;
  }

  .read-more {
    padding: 10px 24px;
    font-size: 0.9rem;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
