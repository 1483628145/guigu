import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
const service = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  // 注入token
//  this.$store.getters
  // store.getters.token => 请求头里面
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  // 失败执行promise
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  const { data, message, success } = response.data // 默认json格式
  if (success) {
    // Message({ type: 'success', message })
    return data
  } else {
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
}, async(error) => {
  // 401 token 失效解决
  if (error.response.status === 401) {
    // 提示超时
    Message({ type: 'warning', message: 'token 超时！' })
    // 删除本地token 并删除vuex中的token
    await store.dispatch('user/logout')
    // 跳转路由
    router.push('/login')
    return Promise.reject(error)
  }
  // error.message
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})

export default service
