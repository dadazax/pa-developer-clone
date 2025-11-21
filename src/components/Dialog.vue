<template>
  <div>
    <!-- Login Dialog -->
    <v-dialog
      v-model="dialog.login"
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">
          登录
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog('login')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="loginForm">
            <v-text-field
              v-model="loginForm.username"
              label="用户名"
              prepend-icon="mdi-account"
              required
            ></v-text-field>
            <v-text-field
              v-model="loginForm.password"
              label="密码"
              type="password"
              prepend-icon="mdi-lock"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog('login')">取消</v-btn>
          <v-btn color="primary" @click="handleLogin">登录</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Logout Dialog -->
    <v-dialog
      v-model="dialog.logout"
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h5">
          确认登出
        </v-card-title>
        <v-card-text>
          您确定要登出吗？
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog('logout')">取消</v-btn>
          <v-btn color="primary" @click="handleLogout">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Set Password Dialog -->
    <v-dialog
      v-model="dialog.setPassword"
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">
          修改密码
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog('setPassword')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="passwordForm">
            <v-text-field
              v-model="passwordForm.oldPassword"
              label="旧密码"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              v-model="passwordForm.newPassword"
              label="新密码"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              v-model="passwordForm.confirmPassword"
              label="确认密码"
              type="password"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog('setPassword')">取消</v-btn>
          <v-btn color="primary" @click="handleSetPassword">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Game Detail Dialog -->
    <v-dialog
      v-model="dialog.gameDetail"
      max-width="600"
    >
      <v-card v-if="dialog.currentGame">
        <v-img
          :src="dialog.currentGame.image"
          height="300"
        ></v-img>
        <v-card-title class="text-h5">
          {{ dialog.currentGame.name }}
          <v-chip
            v-if="dialog.currentGame.isNew"
            small
            color="error"
            class="ml-2"
          >
            NEW
          </v-chip>
        </v-card-title>
        <v-card-subtitle>
          {{ dialog.currentGame.nameEn }}
        </v-card-subtitle>
        <v-card-text>
          <p class="text-body-1 mb-3">{{ dialog.currentGame.description }}</p>
          <v-divider class="mb-3"></v-divider>
          <p><strong>游戏类型：</strong>{{ dialog.currentGame.gameType }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog('gameDetail')">关闭</v-btn>
          <v-btn color="primary" @click="playGame(dialog.currentGame)">
            立即体验
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Source Dialog -->
    <v-dialog
      v-model="dialog.source"
      max-width="800"
      scrollable
    >
      <v-card>
        <v-card-title class="text-h5">
          文档资料
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog('source')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text style="max-height: 600px;">
          <p>这里显示相关文档和资料</p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Dialog',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    ...mapState(['dialog'])
  },
  methods: {
    ...mapMutations(['SET_DIALOG', 'SHOW_SNACKBAR']),

    closeDialog(name) {
      this.SET_DIALOG({ name, value: false })
      if (name === 'login') {
        this.loginForm = { username: '', password: '' }
      } else if (name === 'setPassword') {
        this.passwordForm = { oldPassword: '', newPassword: '', confirmPassword: '' }
      }
    },

    async handleLogin() {
      const result = await this.$store.dispatch('login', this.loginForm)
      if (result) {
        this.closeDialog('login')
      }
    },

    handleLogout() {
      this.$store.dispatch('logout')
      this.closeDialog('logout')
    },

    handleSetPassword() {
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        this.SHOW_SNACKBAR({
          message: '两次输入的密码不一致',
          color: 'error'
        })
        return
      }
      // API call to change password
      this.SHOW_SNACKBAR({
        message: '密码修改成功',
        color: 'success'
      })
      this.closeDialog('setPassword')
    },

    playGame(game) {
      console.log('Playing game:', game)
      this.closeDialog('gameDetail')
    }
  }
}
</script>
