<template>
  <div class="games-section">
    <v-card flat>
      <v-card-title class="text-h4 justify-center mb-5">
        游戏展示
      </v-card-title>

      <!-- Game Type Tabs -->
      <v-tabs
        v-model="activeTab"
        centered
        color="primary"
        class="mb-5"
      >
        <v-tab v-for="tab in gameTabs" :key="tab.value">
          {{ tab.label }}
        </v-tab>
      </v-tabs>

      <!-- Games Grid -->
      <v-row>
        <v-col
          v-for="game in currentGames"
          :key="game.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            class="game-card"
            elevation="3"
            @click="showGameDetail(game)"
          >
            <div class="flip-card">
              <div class="flip-card-inner">
                <!-- Front -->
                <div class="flip-card-front">
                  <v-img
                    :src="game.image || '/images/game-placeholder.png'"
                    height="200"
                    cover
                  >
                    <v-chip
                      v-if="game.isNew"
                      small
                      color="error"
                      class="ma-2"
                    >
                      NEW
                    </v-chip>
                  </v-img>
                  <v-card-title class="text-center">
                    {{ game.name }}
                  </v-card-title>
                </div>

                <!-- Back -->
                <div class="flip-card-back">
                  <v-card-text class="fill-height d-flex flex-column justify-center">
                    <h3 class="text-center mb-3">{{ game.name }}</h3>
                    <p class="text-center">{{ game.description }}</p>
                    <v-btn
                      color="primary"
                      block
                      class="mt-3"
                      @click.stop="playGame(game)"
                    >
                      立即体验
                    </v-btn>
                  </v-card-text>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Empty State -->
      <v-row v-if="currentGames.length === 0">
        <v-col cols="12" class="text-center py-10">
          <v-icon size="64" color="grey lighten-1">mdi-gamepad-variant-outline</v-icon>
          <p class="mt-4 text-h6 grey--text">暂无游戏</p>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Games',
  data() {
    return {
      activeTab: 0,
      gameTabs: [
        { label: '电子游戏', value: 'slot' },
        { label: '真人视讯', value: 'live' },
        { label: 'YOPLAY', value: 'yp' },
        { label: '捕鱼王', value: 'hunter' }
      ],
      games: {
        slot: [
          {
            id: 's1',
            name: '酒馆宝藏',
            nameEn: 'Tavern Treasures',
            type: 'slot',
            gameType: 'HG01',
            image: '/images/games/tavern-treasures.jpg',
            description: '进入神秘酒馆，寻找隐藏的宝藏',
            isNew: true
          },
          {
            id: 's2',
            name: '麻将狂人',
            nameEn: 'Mahjong Maniac Deluxe',
            type: 'slot',
            gameType: 'VG01',
            image: '/images/games/mahjong-maniac.jpg',
            description: '经典麻将主题，刺激玩法',
            isNew: true
          },
          {
            id: 's3',
            name: '龙族宝藏',
            nameEn: 'Dragon Isle',
            type: 'slot',
            gameType: 'MA31',
            image: '/images/games/dragon-isle.jpg',
            description: '探索龙族的神秘岛屿',
            isNew: false
          }
        ],
        live: [
          {
            id: 'l1',
            name: '百家乐',
            nameEn: 'Baccarat',
            type: 'live',
            gameType: 'BAC',
            image: '/images/games/baccarat.jpg',
            description: '经典百家乐游戏',
            isNew: false
          },
          {
            id: 'l2',
            name: '女团色碟',
            nameEn: 'Girl Group Xoc Dia',
            type: 'live',
            gameType: 'XD',
            image: '/images/games/xoc-dia.jpg',
            description: '五位荷官同时热舞、摇碟、开碗',
            isNew: true
          }
        ],
        yp: [
          {
            id: 'y1',
            name: '极速传说',
            nameEn: 'Speed-Up!',
            type: 'yp',
            gameType: 'YP909',
            image: '/images/games/speed-up.jpg',
            description: '极速街机游戏',
            isNew: true
          },
          {
            id: 'y2',
            name: '黑白战歌',
            nameEn: 'Haven Divided: B&W',
            type: 'yp',
            gameType: 'YP906',
            image: '/images/games/bw.jpg',
            description: '黑白对战，策略为王',
            isNew: false
          }
        ],
        hunter: [
          {
            id: 'h1',
            name: '捕鱼大师',
            nameEn: 'Ocean Hunter',
            type: 'hunter',
            gameType: 'UH01',
            image: '/images/games/ocean-hunter.jpg',
            description: '全新风格捕鱼游戏',
            isNew: true
          }
        ]
      }
    }
  },
  computed: {
    currentGames() {
      const tabValue = this.gameTabs[this.activeTab].value
      return this.games[tabValue] || []
    }
  },
  methods: {
    ...mapMutations(['SET_DIALOG']),

    showGameDetail(game) {
      this.SET_DIALOG({
        name: 'gameDetail',
        value: true,
        data: game
      })
    },

    playGame(game) {
      if (this.$store.getters.isAuthenticated) {
        // 打开游戏
        console.log('Playing game:', game)
        this.$store.commit('SHOW_SNACKBAR', {
          message: `正在启动游戏：${game.name}`,
          color: 'success'
        })
      } else {
        this.SET_DIALOG({ name: 'login', value: true })
      }
    }
  }
}
</script>

<style scoped>
.games-section {
  padding: 20px 0;
}

.game-card {
  cursor: pointer;
  transition: transform 0.3s ease;
  height: 280px;
}

.game-card:hover {
  transform: scale(1.05);
}

.flip-card {
  width: 100%;
  height: 100%;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.game-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-back {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: rotateY(180deg);
}
</style>
