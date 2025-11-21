import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './styles/utilities.css'

Vue.config.productionTip = false

// 全局混入，添加 window size name 检测
Vue.mixin({
  data() {
    return {
      windowSizeName: 'lg'
    }
  },
  mounted() {
    this.updateWindowSize()
    window.addEventListener('resize', this.updateWindowSize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateWindowSize)
  },
  methods: {
    updateWindowSize() {
      const width = window.innerWidth
      if (width < 600) {
        this.windowSizeName = 'xs'
      } else if (width < 960) {
        this.windowSizeName = 'sm'
      } else if (width < 1264) {
        this.windowSizeName = 'md'
      } else if (width < 1904) {
        this.windowSizeName = 'lg'
      } else {
        this.windowSizeName = 'xl'
      }
    }
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
