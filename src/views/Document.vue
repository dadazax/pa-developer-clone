<template>
  <v-container fluid>
    <v-row>
      <!-- Sidebar - Document Tree -->
      <v-col cols="12" md="3">
        <v-card elevation="2">
          <v-card-title class="primary white--text">
            技术文档
          </v-card-title>
          <v-card-text class="pa-0">
            <v-treeview
              :items="documentTree"
              activatable
              item-key="id"
              open-on-click
              @update:active="selectDocument"
            >
              <template v-slot:prepend="{ item }">
                <v-icon>
                  {{ item.children ? 'mdi-folder' : 'mdi-file-document' }}
                </v-icon>
              </template>
            </v-treeview>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Main Content -->
      <v-col cols="12" md="9">
        <v-card elevation="2" v-if="currentDocument">
          <v-card-title>
            {{ currentDocument.name }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div v-html="currentDocument.content"></div>
          </v-card-text>
        </v-card>
        <v-card elevation="2" v-else>
          <v-card-text class="text-center py-10">
            <v-icon size="64" color="grey lighten-1">mdi-file-document-outline</v-icon>
            <p class="mt-4 text-h6 grey--text">请选择一个文档</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Document',
  data() {
    return {
      documentTree: [
        {
          id: 1,
          name: 'API 文档',
          children: [
            {
              id: 11,
              name: '认证接口',
              content: '<h2>认证接口</h2><p>用于用户登录和认证...</p>'
            },
            {
              id: 12,
              name: '游戏接口',
              content: '<h2>游戏接口</h2><p>游戏相关的 API...</p>'
            }
          ]
        },
        {
          id: 2,
          name: '集成指南',
          children: [
            {
              id: 21,
              name: '快速开始',
              content: '<h2>快速开始</h2><p>本指南将帮助您快速集成...</p>'
            },
            {
              id: 22,
              name: '游戏集成',
              content: '<h2>游戏集成</h2><p>如何集成游戏...</p>'
            }
          ]
        },
        {
          id: 3,
          name: '平台说明',
          children: [
            {
              id: 31,
              name: 'PA 视讯',
              content: '<h2>PA 视讯平台</h2><p>真人视讯游戏平台...</p>'
            },
            {
              id: 32,
              name: 'PA SLOTS',
              content: '<h2>PA SLOTS 平台</h2><p>电子游戏平台...</p>'
            },
            {
              id: 33,
              name: 'YOPLAY',
              content: '<h2>YOPLAY 平台</h2><p>街机游戏平台...</p>'
            }
          ]
        }
      ],
      currentDocument: null
    }
  },
  methods: {
    selectDocument(items) {
      if (items.length > 0) {
        const findDoc = (tree, id) => {
          for (const node of tree) {
            if (node.id === id) return node
            if (node.children) {
              const found = findDoc(node.children, id)
              if (found) return found
            }
          }
          return null
        }
        this.currentDocument = findDoc(this.documentTree, items[0])
      }
    }
  }
}
</script>
