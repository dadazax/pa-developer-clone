import axios from 'axios'
import store from '../store'

// 创建 axios 实例
const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'https://docs.agin.cc:8080/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    const token = store.state.auth.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit('CLEAR_AUTH')
          store.commit('SHOW_SNACKBAR', {
            message: '认证失败，请重新登录',
            color: 'error'
          })
          break
        case 403:
          store.commit('SHOW_SNACKBAR', {
            message: '没有权限访问',
            color: 'error'
          })
          break
        case 404:
          store.commit('SHOW_SNACKBAR', {
            message: '请求的资源不存在',
            color: 'error'
          })
          break
        case 500:
          store.commit('SHOW_SNACKBAR', {
            message: '服务器错误',
            color: 'error'
          })
          break
        default:
          store.commit('SHOW_SNACKBAR', {
            message: error.response.data.message || '请求失败',
            color: 'error'
          })
      }
    } else {
      store.commit('SHOW_SNACKBAR', {
        message: '网络错误',
        color: 'error'
      })
    }
    return Promise.reject(error)
  }
)

// API 方法
export default {
  // 认证相关
  login(credentials) {
    return api.post('/auth/login', credentials)
  },

  logout() {
    return api.post('/auth/logout')
  },

  changePassword(data) {
    return api.post('/auth/change-password', data)
  },

  // 用户管理
  getUsers() {
    return api.get('/users')
  },

  createUser(user) {
    return api.post('/users', user)
  },

  updateUser(id, user) {
    return api.put(`/users/${id}`, user)
  },

  deleteUser(id) {
    return api.delete(`/users/${id}`)
  },

  // 文档管理
  getDocuments() {
    return api.get('/documents')
  },

  getDocument(id) {
    return api.get(`/documents/${id}`)
  },

  createDocument(doc) {
    return api.post('/documents', doc)
  },

  updateDocument(id, doc) {
    return api.put(`/documents/${id}`, doc)
  },

  deleteDocument(id) {
    return api.delete(`/documents/${id}`)
  },

  // 新闻/公告
  getNews() {
    return api.get('/news')
  },

  getNewsItem(id) {
    return api.get(`/news/${id}`)
  },

  // 游戏数据
  getGames(type) {
    return api.get(`/games/${type}`)
  },

  getGameDetail(id) {
    return api.get(`/games/detail/${id}`)
  }
}
