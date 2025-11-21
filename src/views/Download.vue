<template>
  <v-container>
    <v-card elevation="2">
      <v-card-title class="primary white--text">
        下载中心
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col
            v-for="item in downloadItems"
            :key="item.id"
            cols="12"
            md="6"
          >
            <v-card outlined>
              <v-card-title>
                <v-icon left>{{ item.icon }}</v-icon>
                {{ item.name }}
              </v-card-title>
              <v-card-subtitle>
                {{ item.description }}
              </v-card-subtitle>
              <v-card-text>
                <p><strong>版本：</strong>{{ item.version }}</p>
                <p><strong>大小：</strong>{{ item.size }}</p>
                <p><strong>更新时间：</strong>{{ item.updateTime }}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="downloadFile(item)"
                >
                  <v-icon left>mdi-download</v-icon>
                  下载
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Download',
  data() {
    return {
      downloadItems: [
        {
          id: 1,
          name: 'SDK 开发包',
          description: 'PA 平台游戏集成 SDK',
          version: 'v2.0.5',
          size: '12.5 MB',
          updateTime: '2025-11-20',
          icon: 'mdi-code-braces',
          url: '/downloads/pa-sdk-v2.0.5.zip'
        },
        {
          id: 2,
          name: 'API 文档',
          description: '完整的 API 接口文档',
          version: 'v1.8.0',
          size: '3.2 MB',
          updateTime: '2025-11-15',
          icon: 'mdi-file-document',
          url: '/downloads/api-docs-v1.8.0.pdf'
        },
        {
          id: 3,
          name: '游戏素材包',
          description: '游戏图标和宣传素材',
          version: 'v1.0.0',
          size: '156 MB',
          updateTime: '2025-10-30',
          icon: 'mdi-image-multiple',
          url: '/downloads/game-assets-v1.0.0.zip'
        },
        {
          id: 4,
          name: '集成示例代码',
          description: '各平台集成示例',
          version: 'v1.5.2',
          size: '8.7 MB',
          updateTime: '2025-11-10',
          icon: 'mdi-code-tags',
          url: '/downloads/integration-examples-v1.5.2.zip'
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['SHOW_SNACKBAR']),

    downloadFile(item) {
      // 模拟下载
      this.SHOW_SNACKBAR({
        message: `正在下载 ${item.name}...`,
        color: 'info'
      })

      // 实际应用中，这里应该触发文件下载
      // window.location.href = item.url

      setTimeout(() => {
        this.SHOW_SNACKBAR({
          message: `${item.name} 下载完成`,
          color: 'success'
        })
      }, 2000)
    }
  }
}
</script>
