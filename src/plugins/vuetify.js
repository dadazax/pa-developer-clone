import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#ff6600',
        secondary: '#eeab02',
        accent: '#82b1ff',
        error: '#ff5252',
        info: '#9ca09c',
        success: '#4caf50',
        warning: '#ffc107'
      },
      dark: {
        primary: '#ff6600',
        secondary: '#eeab02'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
