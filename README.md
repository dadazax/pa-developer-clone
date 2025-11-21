# PA Developer Portal - Cloned

这是从 https://docs.infopa.cc/ 还原的源代码。

## 🚀 快速部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dadazax/pa-developer-clone)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/dadazax/pa-developer-clone)

## 📦 GitHub 仓库

https://github.com/dadazax/pa-developer-clone

## 📖 文档

- [安装指南](INSTALL.md) - 详细的安装和运行说明
- [部署指南](DEPLOYMENT.md) - 部署到 Vercel、Netlify、GitHub Pages
- [项目总结](PROJECT_SUMMARY.md) - 完整的项目还原总结

## 技术栈

- **Vue 2.6.14** - 渐进式 JavaScript 框架
- **Vuetify 2.6** - Material Design 组件框架
- **Vue Router 3.5** - 官方路由管理器
- **Vuex 3.6** - 状态管理模式
- **Axios** - HTTP 客户端
- **SweetAlert2** - 美化的弹窗库
- **jQuery** - JavaScript 库

## 项目结构

```
pa-developer-clone/
├── public/              # 静态资源
│   ├── index.html
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── assets/         # 资源文件
│   ├── components/     # Vue 组件
│   │   ├── Dialog.vue
│   │   ├── Games.vue
│   │   ├── News.vue
│   │   └── Snackbar.vue
│   ├── plugins/        # Vue 插件
│   │   └── vuetify.js
│   ├── router/         # 路由配置
│   │   └── index.js
│   ├── store/          # Vuex store
│   │   └── index.js
│   ├── views/          # 页面视图
│   │   ├── Home.vue
│   │   ├── Document.vue
│   │   ├── Member.vue
│   │   └── Download.vue
│   ├── services/       # API 服务
│   │   └── api.js
│   ├── styles/         # 全局样式
│   │   └── utilities.css
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── package.json
├── vue.config.js
└── README.md
```

## 安装依赖

```bash
npm install
```

## 开发模式

```bash
npm run serve
```

## 构建生产版本

```bash
npm run build
```

## 功能特性

### 主要页面
- **首页** (`/`) - 展示最新公告和游戏
- **技术文档** (`/document`) - 需要登录，文档管理系统
- **会员中心** (`/member`) - 需要登录，用户管理
- **下载** (`/download`) - 文件下载处理

### 组件
- **News.vue** - 公告列表，支持按类别和平台筛选
- **Games.vue** - 游戏展示，翻牌卡片界面
- **Dialog.vue** - 弹窗管理（登录、登出、修改密码、游戏详情等）
- **Snackbar.vue** - 通知提示系统

### API 端点
- 认证：登录/登出
- 用户管理：密码修改、角色分配
- 内容管理：文档节点操作
- 游戏数据：从 JSON 文件加载（slot, hunter, yp, live）

## 注意事项

1. API 基础地址配置在 `src/services/api.js` 中
2. 需要配置正确的后端 API 地址
3. 某些功能需要有效的认证令牌
4. 游戏数据文件需要放在 `public/` 目录下

## 许可证

仅供学习和研究使用。
