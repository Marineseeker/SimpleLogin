import axios from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: '/api', // 代理前缀
  timeout: 5000,
  withCredentials: true, // 允许cookie跨域
})

instance.interceptors.response.use((response) => {
  if (response.status === 200) {
    const { code, message, data } = response.data
    if (code === 0) {
      return data
    } else if (code === 1) {
      ElMessage.error(message || '业务处理失败')
      return Promise.reject(response.data)
    }
  } else {
    ElMessage.error('请求失败')
    return Promise.reject(response.data)
  }
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['satoken'] = token // 设置请求头携带 token
  }
  return config
})

export default instance
