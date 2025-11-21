<template>
  <div>
    <!-- Header Area -->
    <v-card
      class="header-area bg-main h-300-px mb-60-px"
      flat
      fixed
    >
      <!-- Top Toolbar -->
      <v-app-bar
        flat
        dense
        dark
        color="transparent"
      >
        <v-spacer></v-spacer>
        <v-btn
          plain
          rounded
          small
          @click="toggleLanguage"
        >
          {{ language }}
        </v-btn>
        <v-btn
          plain
          rounded
          small
          @click="handleLogin"
        >
          {{ isAuthenticated ? 'LOGOUT' : 'LOGIN' }}
        </v-btn>
      </v-app-bar>

      <!-- Header Content -->
      <v-card
        id="header-content"
        flat
        color="transparent"
        class="w-100-pct text-center"
      >
        <!-- Logo -->
        <v-img
          src="/images/logo.png"
          max-width="304"
          height="80"
          contain
          class="mx-auto mb-5"
        ></v-img>

        <!-- Navigation Menu -->
        <div class="mb-20-px">
          <v-btn
            v-for="menu in menus"
            :key="menu.name"
            :to="menu.path"
            plain
            rounded
            dark
            class="menu-btn"
          >
            {{ menu.label }}
          </v-btn>
        </div>

        <!-- Filter Section -->
        <v-sheet
          elevation="3"
          class="p-30-px bg-sub mx-auto"
          style="max-width: 700px; width: 100%;"
        >
          <!-- Class Filters -->
          <v-slide-group
            dark
            class="mb-3"
          >
            <v-btn
              v-for="filter in classFilters"
              :key="filter.value"
              small
              class="fz-15-px bg-transparent mx-1"
              :class="{ 'ft-color-sub white': newsClassFilter === filter.value }"
              @click="setNewsFilter('class', filter.value)"
            >
              {{ filter.label }}
            </v-btn>
          </v-slide-group>

          <!-- Platform Filters -->
          <v-slide-group dark>
            <v-btn
              v-for="filter in platformFilters"
              :key="filter.value"
              small
              class="fz-15-px bg-transparent mx-1"
              :class="{ 'ft-color-sub white': newsPlatformFilter === filter.value }"
              @click="setNewsFilter('platform', filter.value)"
            >
              {{ filter.label }}
            </v-btn>
          </v-slide-group>
        </v-sheet>
      </v-card>
    </v-card>

    <!-- Content Area -->
    <v-container>
      <News />
      <Games class="mt-10" />
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import News from '@/components/News.vue'
import Games from '@/components/Games.vue'

export default {
  name: 'Home',
  components: {
    News,
    Games
  },
  data() {
    return {
      language: 'EN',
      menus: [
        { name: 'news', label: '最新公告', path: '/' },
        { name: 'document', label: '技术文档', path: '/document' },
        { name: 'games', label: '游戏展示', path: '/' }
      ],
      classFilters: [
        { label: '全部公告', value: 'all' },
        { label: '新游戏上线', value: '新游戏上线' },
        { label: '在线活动', value: '在线活动' }
      ],
      platformFilters: [
        { label: '全部平台', value: 'all' },
        { label: '视讯', value: '视讯' },
        { label: '电子', value: '电子' },
        { label: 'YOPLAY', value: 'YOPLAY' },
        { label: '捕鱼王', value: '捕鱼王' }
      ]
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    ...mapState({
      newsClassFilter: state => state.news.filters.class,
      newsPlatformFilter: state => state.news.filters.platform
    })
  },
  methods: {
    ...mapMutations(['SET_DIALOG', 'SET_NEWS_FILTER']),

    toggleLanguage() {
      this.language = this.language === 'EN' ? 'CN' : 'EN'
    },

    handleLogin() {
      if (this.isAuthenticated) {
        this.SET_DIALOG({ name: 'logout', value: true })
      } else {
        this.SET_DIALOG({ name: 'login', value: true })
      }
    },

    setNewsFilter(type, value) {
      this.SET_NEWS_FILTER({ type, value })
    }
  }
}
</script>

<style scoped>
.header-area {
  position: relative;
}

.bg-main {
  background: linear-gradient(135deg, #ff6600 0%, #ff8800 100%);
}

.bg-sub {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.h-300-px {
  height: 300px;
}

.mb-60-px {
  margin-bottom: 60px;
}

.mb-20-px {
  margin-bottom: 20px;
}

.p-30-px {
  padding: 30px;
}

.w-100-pct {
  width: 100%;
}

.fz-15-px {
  font-size: 15px;
}

.ft-color-sub {
  color: #ff6600 !important;
}

.menu-btn {
  margin: 0 10px;
}
</style>
