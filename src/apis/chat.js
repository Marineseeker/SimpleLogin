import request from '@/utils/request'

// AI知识问答服务
export const knowledgeStreamService = (message, useContext = true, sessionId = null) => {
  const data = {
    message: message,
    useContext: useContext.toString(),
  }

  // 如果有会话ID，添加到请求数据中
  if (sessionId) {
    data.sessionId = sessionId
  }

  return request({
    url: '/chat/knowledge',
    method: 'post',
    data: data,
  })
}
