<template>
  <div>
    <!-- 悬浮聊天按钮 -->
    <div class="chat-float-btn" @click="toggleChatDialog" :class="{ active: showDialog }">
      <i class="fas fa-comments" v-if="!showDialog"></i>
      <i class="fas fa-times" v-else></i>
      <!-- 未读消息提示点 -->
      <div class="notification-dot" v-if="hasUnreadMessages && !showDialog"></div>
    </div>

    <!-- 对话框遮罩 -->
    <div class="chat-overlay" v-if="showDialog" @click="closeChatDialog"></div>

    <!-- AI对话框 -->
    <transition name="chat-slide">
      <div class="chat-dialog" v-if="showDialog">
        <!-- 对话框头部 -->
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="ai-avatar">
              <i class="fas fa-robot"></i>
            </div>
            <div class="ai-info">
              <h3>教务系统AI助手</h3>
              <span class="online-status">在线</span>
            </div>
          </div>
          <div class="header-actions">
            <el-button class="clear-btn" @click="clearChat" circle size="small" title="清除对话">
              <i class="fas fa-trash"></i>
            </el-button>
            <el-button class="close-btn" @click="closeChatDialog" circle size="small">
              <i class="fas fa-times"></i>
            </el-button>
          </div>
        </div>

        <!-- 对话内容区域 -->
        <div class="chat-content" ref="chatContent">
          <div class="message-list">
            <!-- 欢迎消息 -->
            <div class="message ai-message" v-if="messages.length === 0">
              <div class="message-avatar">
                <i class="fas fa-robot"></i>
              </div>
              <div class="message-content">
                <div class="message-bubble">
                  我是高校教务系统网站的智能助手，请问有什么我可以帮您的？
                </div>
                <div class="message-time">{{ currentTime }}</div>
              </div>
            </div>

            <!-- 消息列表 -->
            <div v-for="(message, index) in messages" :key="index"
              :class="['message', message.type === 'user' ? 'user-message' : 'ai-message']">
              <div class="message-avatar" v-if="message.type === 'ai'">
                <i class="fas fa-robot"></i>
              </div>

              <div class="message-content">
                <div class="message-bubble">
                  <pre class="message-text">{{ message.content }}</pre>
                </div>
                <div class="message-time">{{ message.time }}</div>
              </div>

              <div class="message-avatar" v-if="message.type === 'user'">
                <i class="fas fa-user"></i>
              </div>
            </div>

            <!-- 正在输入提示 -->
            <div class="message ai-message" v-if="isTyping">
              <div class="message-avatar">
                <i class="fas fa-robot"></i>
              </div>
              <div class="message-content">
                <div class="message-bubble typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 输入区域 -->
        <div class="chat-input-area">
          <div class="input-container">
            <el-input v-model="inputMessage" placeholder="输入您的问题..." @keyup.enter="sendMessage" :disabled="isTyping"
              class="message-input" maxlength="500" show-word-limit>
              <template #prepend>
                <el-button @click="toggleEmojiPanel" class="emoji-btn" :disabled="isTyping">
                  😊
                </el-button>
              </template>
            </el-input>
            <el-button type="primary" @click="sendMessage" :disabled="!inputMessage.trim() || isTyping"
              class="send-btn">
              <i class="fas fa-paper-plane"></i>
            </el-button>
          </div>

          <!-- 快捷回复 -->
          <div class="quick-replies" v-if="quickReplies.length > 0">
            <el-tag v-for="reply in quickReplies" :key="reply" @click="sendQuickReply(reply)" class="quick-reply-tag"
              :disabled="isTyping">
              {{ reply }}
            </el-tag>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, computed, onMounted, Ref } from 'vue'
import { ElMessage } from 'element-plus'
import { knowledgeStreamService } from '@/apis/chat'

type MessageType = 'user' | 'ai'
interface Message {
  type: MessageType
  content: string
  time: string
}

interface AIResponse {
  response: string
  sessionId?: string
  useContext: boolean
}
// 响应式数据
const showDialog = ref(false)
const inputMessage = ref('')
const messages: Ref<Message[]> = ref([]) // 消息列表
const isTyping = ref(false)
const hasUnreadMessages = ref(false)
const currentSessionId = ref(null) // 会话ID管理

// 快捷回复选项
const quickReplies = ref(['你好', '帮助', '功能介绍', '使用指南'])

// 聊天内容容器引用
const chatContent = ref(null)

// 当前时间
const currentTime = computed(() => {
  return new Date().toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  })
})

// 切换对话框显示状态
const toggleChatDialog = () => {
  showDialog.value = !showDialog.value
  if (showDialog.value) {
    hasUnreadMessages.value = false
    nextTick(() => {
      scrollToBottom()
    })
  }
}

// 关闭对话框
const closeChatDialog = () => {
  showDialog.value = false
}

// 清除对话
const clearChat = () => {
  messages.value.splice(0, messages.value.length) // 清空消息列表
  currentSessionId.value = null // 重置会话ID
  ElMessage.success('对话已清除')
}

// 发送消息
const sendMessage = async () => {
  if (!inputMessage.value.trim() || isTyping.value) return

  const userMessage: Message = {
    type: 'user' as MessageType,
    content: inputMessage.value.trim(),
    time: currentTime.value,
  }

  messages.value.push(userMessage)
  inputMessage.value = ''

  nextTick(() => {
    scrollToBottom()
  })

  await simulateAIResponse()
}

// 发送快捷回复
const sendQuickReply = (reply) => {
  if (isTyping.value) return

  inputMessage.value = reply
  sendMessage()
}

// AI响应处理
const simulateAIResponse = async () => {
  isTyping.value = true

  try {
    const userMessage = messages.value[messages.value.length - 1].content
    const response = (await knowledgeStreamService(
      userMessage,
      true, // useContext
      currentSessionId.value, // 传递当前会话ID
    )) as unknown as AIResponse
    console.log('解析后的响应数据:', response) // 添加调试日志

    // 检查响应状态 - 更灵活的检查方式
    if (response) {
      // 更新会话ID
      currentSessionId.value = response.sessionId

      const aiMessage: Message = {
        type: 'ai' as MessageType,
        content: response.response || '抱歉，我无法回答您的问题。',
        time: currentTime.value,
      }

      messages.value.push(aiMessage)
    } else {
      // 处理API返回的错误
      console.warn('响应数据格式不符合预期:', response)
      const errorMessage: Message = {
        type: 'ai' as MessageType,
        content: '抱歉，处理您的请求时出现了问题。',
        time: currentTime.value,
      }
      messages.value.push(errorMessage)
    }

    nextTick(() => {
      scrollToBottom()
    })
  } catch (error) {
    console.error('AI响应错误:', error)
    ElMessage.error('AI助手暂时不可用，请稍后再试。')

    const errorMessage: Message = {
      type: 'ai' as MessageType,
      content: '抱歉，AI助手暂时不可用，请稍后再试。',
      time: currentTime.value,
    }

    messages.value.push(errorMessage)
  } finally {
    isTyping.value = false

    // 如果对话框未打开，显示未读消息提示
    if (!showDialog.value) {
      hasUnreadMessages.value = true
    }

    nextTick(() => {
      scrollToBottom()
    })
  }
}

// 滚动到底部
const scrollToBottom = () => {
  if (chatContent.value) {
    chatContent.value.scrollTop = chatContent.value.scrollHeight
  }
}

// 切换表情面板（占位函数）
const toggleEmojiPanel = () => {
  ElMessage.info('表情功能开发中...')
}

// 组件挂载时的初始化
onMounted(() => {
  // 可以在这里添加初始化逻辑
})
</script>

<style scoped>
/* 悬浮聊天按钮 */
.chat-float-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  z-index: 999;
}

.chat-float-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
}

.chat-float-btn.active {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
}

.chat-float-btn i {
  color: white;
  font-size: 24px;
  transition: all 0.3s ease;
}

.notification-dot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 12px;
  height: 12px;
  background: #ff4757;
  border-radius: 50%;
  border: 2px solid white;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 遮罩层 */
.chat-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;
}

/* 对话框 */
.chat-dialog {
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 400px;
  height: 600px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 999;
  overflow: hidden;
}

/* 对话框头部 */
.chat-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ai-avatar {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-avatar i {
  font-size: 18px;
}

.ai-info h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.online-status {
  font-size: 12px;
  opacity: 0.8;
}

.header-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.close-btn,
.clear-btn {
  background: rgba(255, 255, 255, 0.2) !important;
  border: none !important;
  color: white !important;
  transition: background 0.2s ease;
}

.close-btn:hover,
.clear-btn:hover {
  background: rgba(255, 255, 255, 0.3) !important;
}

/* 对话内容区域 */
.chat-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  background: #f8f9fa;
}

.message-list {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 消息样式 */
.message {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.user-message {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-message .message-avatar {
  background: #667eea;
  color: white;
}

.ai-message .message-avatar {
  background: #28a745;
  color: white;
}

.message-content {
  flex: 1;
  max-width: 70%;
}

.user-message .message-content {
  text-align: right;
}

.message-bubble {
  background: white;
  padding: 12px 16px;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  line-height: 1.4;
}

.message-text {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.user-message .message-bubble {
  background: #667eea;
  color: white;
  border-bottom-right-radius: 6px;
}

.ai-message .message-bubble {
  border-bottom-left-radius: 6px;
}

.message-time {
  font-size: 11px;
  color: #6c757d;
  margin-top: 4px;
  padding: 0 4px;
}

/* 正在输入动画 */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 16px !important;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  background: #6c757d;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {

  0%,
  60%,
  100% {
    transform: translateY(0);
  }

  30% {
    transform: translateY(-10px);
  }
}

/* 输入区域 */
.chat-input-area {
  border-top: 1px solid #e9ecef;
  padding: 16px;
  background: white;
}

.input-container {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}

.message-input {
  flex: 1;
}

.emoji-btn {
  border: none !important;
  background: transparent !important;
  padding: 0 8px !important;
}

.send-btn {
  height: 40px;
  min-width: 40px;
  border-radius: 20px !important;
}

/* 快捷回复 */
.quick-replies {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quick-reply-tag {
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-reply-tag:hover {
  background: #667eea !important;
  color: white !important;
}

/* 对话框动画 */
.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.3s ease;
}

.chat-slide-enter-from {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}

.chat-slide-leave-to {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .chat-dialog {
    width: calc(100vw - 20px);
    height: calc(100vh - 120px);
    right: 10px;
    bottom: 90px;
  }

  .chat-float-btn {
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
  }

  .chat-float-btn i {
    font-size: 20px;
  }
}

/* 滚动条样式 */
.chat-content::-webkit-scrollbar {
  width: 6px;
}

.chat-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.chat-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.chat-content::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
