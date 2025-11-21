import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    overlay: false,

    // 认证状态
    auth: {
      isAuthenticated: false,
      user: null,
      token: null
    },

    // 对话框状态
    dialog: {
      login: false,
      logout: false,
      setPassword: false,
      source: false,
      gameDetail: false,
      currentGame: null
    },

    // 通知状态
    snackbar: {
      show: false,
      message: '',
      color: 'success',
      timeout: 3000
    },

    // 新闻数据
    news: {
      list: [],
      filters: {
        class: 'all',
        platform: 'all'
      }
    },

    // 游戏数据
    games: {
      slot: [],
      live: [],
      hunter: [],
      yp: []
    },

    // 文档数据
    documents: {
      tree: [],
      current: null
    }
  },

  mutations: {
    SET_OVERLAY(state, value) {
      state.overlay = value
    },

    SET_AUTH(state, { user, token }) {
      state.auth.isAuthenticated = true
      state.auth.user = user
      state.auth.token = token
    },

    CLEAR_AUTH(state) {
      state.auth.isAuthenticated = false
      state.auth.user = null
      state.auth.token = null
    },

    SET_DIALOG(state, { name, value, data = null }) {
      state.dialog[name] = value
      if (name === 'gameDetail' && data) {
        state.dialog.currentGame = data
      }
    },

    SHOW_SNACKBAR(state, { message, color = 'success', timeout = 3000 }) {
      state.snackbar = {
        show: true,
        message,
        color,
        timeout
      }
    },

    HIDE_SNACKBAR(state) {
      state.snackbar.show = false
    },

    SET_NEWS(state, news) {
      state.news.list = news
    },

    SET_NEWS_FILTER(state, { type, value }) {
      state.news.filters[type] = value
    },

    SET_GAMES(state, { type, games }) {
      state.games[type] = games
    },

    SET_DOCUMENTS(state, documents) {
      state.documents.tree = documents
    },

    SET_CURRENT_DOCUMENT(state, doc) {
      state.documents.current = doc
    }
  },

  actions: {
    async login({ commit }, credentials) {
      commit('SET_OVERLAY', true)
      try {
        // API 调用
        // const response = await api.login(credentials)
        // commit('SET_AUTH', { user: response.user, token: response.token })

        // 临时模拟
        commit('SET_AUTH', { user: { name: 'Test User' }, token: 'test-token' })
        commit('SHOW_SNACKBAR', { message: '登录成功', color: 'success' })
        return true
      } catch (error) {
        commit('SHOW_SNACKBAR', { message: '登录失败', color: 'error' })
        return false
      } finally {
        commit('SET_OVERLAY', false)
      }
    },

    logout({ commit }) {
      commit('CLEAR_AUTH')
      commit('SHOW_SNACKBAR', { message: '已登出', color: 'info' })
    },

    async loadNews({ commit }) {
      commit('SET_OVERLAY', true)
      try {
        // 模拟加载新闻数据
        const news = [
          {
            id: 1,
            class: '在线活动',
            platform: 'all',
            title: '《PlayAce平台》赌神赛活动通知',
            date: '2025-12-09 ~ 2025-12-18',
            content: 'PA平台将于2025年12月09日(二) 至 12月18日(四)举办《赌神荣耀再升级》PA赌神赛活动...'
          }
        ]
        commit('SET_NEWS', news)
      } catch (error) {
        commit('SHOW_SNACKBAR', { message: '加载新闻失败', color: 'error' })
      } finally {
        commit('SET_OVERLAY', false)
      }
    },

    async loadGames({ commit }, type) {
      commit('SET_OVERLAY', true)
      try {
        // 模拟加载游戏数据
        const games = []
        commit('SET_GAMES', { type, games })
      } catch (error) {
        commit('SHOW_SNACKBAR', { message: '加载游戏失败', color: 'error' })
      } finally {
        commit('SET_OVERLAY', false)
      }
    }
  },

  getters: {
    isAuthenticated: state => state.auth.isAuthenticated,
    currentUser: state => state.auth.user,
    filteredNews: state => {
      let news = state.news.list

      if (state.news.filters.class !== 'all') {
        news = news.filter(n => n.class === state.news.filters.class)
      }

      if (state.news.filters.platform !== 'all') {
        news = news.filter(n => n.platform === state.news.filters.platform || n.platform === 'all')
      }

      return news
    }
  }
})
