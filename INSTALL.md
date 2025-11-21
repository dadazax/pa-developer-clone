# 安装和运行指南

## 系统要求

- Node.js 14.x 或更高版本
- npm 6.x 或更高版本（或 yarn 1.x）
- 现代浏览器（Chrome, Firefox, Safari, Edge）

## 安装步骤

### 1. 安装依赖

```bash
cd pa-developer-clone
npm install
```

或使用 yarn:

```bash
yarn install
```

### 2. 配置环境变量

复制 `.env.example` 文件并重命名为 `.env`:

```bash
cp .env.example .env
```

根据需要修改 `.env` 文件中的配置：

```env
VUE_APP_API_BASE_URL=https://docs.agin.cc:8080/api/
VUE_APP_NAME=PA Developer Portal
VUE_APP_VERSION=1.0.0
```

### 3. 运行开发服务器

```bash
npm run serve
```

或使用 yarn:

```bash
yarn serve
```

应用将在 `http://localhost:8080` 启动

### 4. 构建生产版本

```bash
npm run build
```

或使用 yarn:

```bash
yarn build
```

构建文件将输出到 `dist/` 目录

## 项目结构说明

```
pa-developer-clone/
├── public/              # 静态资源
│   ├── index.html      # HTML 模板
│   ├── favicon.ico     # 网站图标
│   └── images/         # 图片资源
├── src/
│   ├── assets/         # 资源文件
│   ├── components/     # Vue 组件
│   │   ├── Dialog.vue      # 对话框组件
│   │   ├── Games.vue       # 游戏展示组件
│   │   ├── News.vue        # 新闻组件
│   │   └── Snackbar.vue    # 通知组件
│   ├── plugins/        # Vue 插件
│   │   └── vuetify.js      # Vuetify 配置
│   ├── router/         # 路由配置
│   │   └── index.js        # 路由定义
│   ├── store/          # Vuex store
│   │   └── index.js        # 状态管理
│   ├── views/          # 页面视图
│   │   ├── Home.vue        # 首页
│   │   ├── Document.vue    # 文档页
│   │   ├── Member.vue      # 会员中心
│   │   └── Download.vue    # 下载中心
│   ├── services/       # API 服务
│   │   └── api.js          # API 接口
│   ├── styles/         # 全局样式
│   │   └── utilities.css   # 工具类 CSS
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── .gitignore          # Git 忽略文件
├── .env.example        # 环境变量示例
├── babel.config.js     # Babel 配置
├── package.json        # 项目配置
├── vue.config.js       # Vue CLI 配置
├── README.md           # 项目说明
└── INSTALL.md          # 安装指南
```

## 主要功能模块

### 1. 首页 (Home)
- 展示最新公告和新闻
- 游戏展示区域
- 分类和平台筛选

### 2. 技术文档 (Document)
- 树形文档结构
- 文档查看和管理
- 需要登录访问

### 3. 会员中心 (Member)
- 个人信息管理
- 账户设置
- 操作日志查看
- 需要登录访问

### 4. 下载中心 (Download)
- SDK 和文档下载
- 版本管理
- 文件列表展示

## 开发注意事项

### 认证系统
当前使用模拟认证，生产环境需要连接真实的后端 API。

### API 配置
在 `src/services/api.js` 中配置 API 基础地址和请求拦截器。

### 主题定制
在 `src/plugins/vuetify.js` 中可以自定义 Vuetify 主题颜色。

### 工具类 CSS
在 `src/styles/utilities.css` 中定义了大量原子化 CSS 类，可以快速应用样式。

## 常见问题

### 1. 端口被占用
如果 8080 端口已被占用，可以在 `vue.config.js` 中修改端口：

```javascript
devServer: {
  port: 3000, // 修改为其他端口
  // ...
}
```

### 2. API 跨域问题
在 `vue.config.js` 中已配置代理，开发环境不会有跨域问题。生产环境需要配置后端 CORS。

### 3. 依赖安装失败
尝试清除缓存后重新安装：

```bash
rm -rf node_modules package-lock.json
npm install
```

## 生产部署

### 使用 Nginx

1. 构建项目：
```bash
npm run build
```

2. 配置 Nginx：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /path/to/pa-developer-clone/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass https://docs.agin.cc:8080/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 使用 Docker

创建 `Dockerfile`:

```dockerfile
FROM node:14-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

构建和运行：

```bash
docker build -t pa-developer .
docker run -p 80:80 pa-developer
```

## 技术支持

如有问题，请查看：
- 项目文档：README.md
- Vue.js 文档：https://vuejs.org/
- Vuetify 文档：https://vuetifyjs.com/
- 原站点：https://docs.infopa.cc/
