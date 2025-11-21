<template>
  <v-container>
    <v-card elevation="2">
      <v-card-title class="primary white--text">
        会员中心
      </v-card-title>

      <v-tabs v-model="tab" background-color="primary" dark>
        <v-tab>个人信息</v-tab>
        <v-tab>账户设置</v-tab>
        <v-tab>操作日志</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- Personal Info Tab -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="userInfo.username"
                    label="用户名"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="userInfo.email"
                    label="邮箱"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="userInfo.phone"
                    label="电话"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="userInfo.company"
                    label="公司"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn color="primary" class="mt-3">
                保存修改
              </v-btn>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Account Settings Tab -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-list>
                <v-list-item @click="openPasswordDialog">
                  <v-list-item-icon>
                    <v-icon>mdi-lock</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>修改密码</v-list-item-title>
                    <v-list-item-subtitle>更新您的登录密码</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-list-item-action>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-bell</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>通知设置</v-list-item-title>
                    <v-list-item-subtitle>管理通知偏好</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-switch v-model="settings.notifications"></v-switch>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Activity Log Tab -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-data-table
                :headers="logHeaders"
                :items="activityLogs"
                :items-per-page="10"
                class="elevation-1"
              >
                <template v-slot:item.timestamp="{ item }">
                  {{ formatDate(item.timestamp) }}
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Member',
  data() {
    return {
      tab: 0,
      userInfo: {
        username: 'demo_user',
        email: 'demo@example.com',
        phone: '+86 138 0000 0000',
        company: 'Demo Company'
      },
      settings: {
        notifications: true
      },
      logHeaders: [
        { text: '操作', value: 'action' },
        { text: 'IP地址', value: 'ip' },
        { text: '时间', value: 'timestamp' }
      ],
      activityLogs: [
        {
          action: '登录系统',
          ip: '192.168.1.100',
          timestamp: new Date().toISOString()
        },
        {
          action: '查看文档',
          ip: '192.168.1.100',
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['SET_DIALOG']),

    openPasswordDialog() {
      this.SET_DIALOG({ name: 'setPassword', value: true })
    },

    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString('zh-CN')
    }
  }
}
</script>
