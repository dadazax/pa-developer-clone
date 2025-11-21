<template>
  <div class="news-section">
    <v-row>
      <v-col
        v-for="item in filteredNews"
        :key="item.id"
        cols="12"
        md="6"
      >
        <v-card elevation="2" class="news-card">
          <!-- News Header -->
          <v-card-title class="pb-2">
            <v-chip
              small
              :color="getClassColor(item.class)"
              text-color="white"
              class="mr-2"
            >
              {{ item.class }}
            </v-chip>
            <span class="fz-20-px font-weight-bold">{{ item.title }}</span>
          </v-card-title>

          <!-- News Date -->
          <v-card-subtitle class="fz-12-px">
            {{ item.date }}
          </v-card-subtitle>

          <!-- News Content -->
          <v-card-text class="fz-14-px">
            <div class="news-content" v-html="formatContent(item.content)"></div>
          </v-card-text>

          <!-- Action Buttons -->
          <v-card-actions>
            <v-btn
              v-if="item.hasDoc"
              small
              elevation="2"
              dark
              class="m-3-px bg-sub mr-1"
              @click="openDocument(item)"
            >
              说明文档
            </v-btn>
            <v-btn
              v-if="item.hasMedia"
              small
              elevation="2"
              dark
              class="m-3-px bg-sub mr-1"
              @click="openMedia(item)"
            >
              影像素材
            </v-btn>
            <v-btn
              v-if="item.hasTech"
              small
              elevation="2"
              dark
              class="m-3-px bg-sub mr-1"
              @click="openTechDoc(item)"
            >
              技术文档
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-row v-if="filteredNews.length === 0">
      <v-col cols="12" class="text-center py-10">
        <v-icon size="64" color="grey lighten-1">mdi-information-outline</v-icon>
        <p class="mt-4 text-h6 grey--text">暂无相关公告</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'News',
  computed: {
    ...mapGetters(['filteredNews'])
  },
  mounted() {
    this.loadMockNews()
  },
  methods: {
    ...mapMutations(['SET_NEWS', 'SET_DIALOG']),

    loadMockNews() {
      // 模拟新闻数据
      const mockNews = [
        {
          id: 1,
          class: '在线活动',
          platform: 'all',
          title: '《PlayAce平台》赌神赛活动通知',
          date: '2025-12-09 ~ 2025-12-18',
          content: 'PA平台将于2025年12月09日(二) 至 12月18日(四)举办《赌神荣耀再升级》PA赌神赛活动\n\n【奖金派发】每场总奖金50万人民币，每场冠军可独得20万人民币，前500名皆可获得奖金',
          hasDoc: true,
          hasMedia: true,
          hasTech: true
        },
        {
          id: 2,
          class: '新游戏上线',
          platform: '视讯',
          title: 'PlayAce视讯新增游戏桌台',
          date: '2025-11-25',
          content: 'PA视讯将于2025年11月25日(二)在《欧洲厅》新增20张百家乐桌台\n\n百家乐 Baccarat：L001、L002、L005...',
          hasDoc: false,
          hasMedia: false,
          hasTech: true
        },
        {
          id: 3,
          class: '新游戏上线',
          platform: '电子',
          title: 'PA SLOTS《酒馆宝藏》上线',
          date: '2025-11-24',
          content: 'PA电子 预计将于2025.11.24(一)推出一款电子游戏：\n\n酒馆宝藏/Tavern Treasures\nGI_gametype：HG01',
          hasDoc: true,
          hasMedia: true,
          hasTech: true
        },
        {
          id: 4,
          class: '新游戏上线',
          platform: 'YOPLAY',
          title: 'YOPLAY《极速传说》上线',
          date: '2025-11-17',
          content: 'YOPLAY游戏平台预计将于2025.11.17(一)推出街机游戏：\n\n极速传说/Speed-Up!\nGI_H5_gametype：YP909',
          hasDoc: true,
          hasMedia: true,
          hasTech: true
        }
      ]
      this.SET_NEWS(mockNews)
    },

    getClassColor(newsClass) {
      const colors = {
        '在线活动': 'primary',
        '新游戏上线': 'success',
        '系统维护': 'warning',
        '重要通知': 'error'
      }
      return colors[newsClass] || 'info'
    },

    formatContent(content) {
      return content.replace(/\n/g, '<br>')
    },

    openDocument(item) {
      this.SET_DIALOG({ name: 'source', value: true, data: item })
    },

    openMedia(item) {
      this.SET_DIALOG({ name: 'source', value: true, data: item })
    },

    openTechDoc(item) {
      if (this.$store.getters.isAuthenticated) {
        this.$router.push('/document')
      } else {
        this.SET_DIALOG({ name: 'login', value: true })
      }
    }
  }
}
</script>

<style scoped>
.news-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.news-card:hover {
  transform: translateY(-5px);
}

.news-content {
  max-height: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fz-20-px {
  font-size: 20px;
}

.fz-14-px {
  font-size: 14px;
}

.fz-12-px {
  font-size: 12px;
}

.m-3-px {
  margin: 3px;
}

.bg-sub {
  background-color: #ff6600;
}
</style>
