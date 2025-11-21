# 部署指南

项目已推送到 GitHub，可以使用以下方式部署到公网。

## GitHub 仓库

**仓库地址**: https://github.com/dadazax/pa-developer-clone

---

## 方式一：使用 Vercel 部署（推荐）

Vercel 提供免费的静态网站托管服务，支持自动部署。

### 步骤 1: 访问 Vercel

打开 https://vercel.com/

### 步骤 2: 登录/注册

- 点击 "Sign Up" 或 "Login"
- 选择 "Continue with GitHub"
- 授权 Vercel 访问你的 GitHub 账户

### 步骤 3: 导入项目

1. 点击 "Add New..." → "Project"
2. 找到 `dadazax/pa-developer-clone` 仓库
3. 点击 "Import"

### 步骤 4: 配置项目

保持默认设置：
- **Framework Preset**: Vue.js
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

点击 "Deploy"

### 步骤 5: 等待部署完成

- 部署通常需要 2-5 分钟
- 完成后会显示预览链接
- 例如: `https://pa-developer-clone.vercel.app`

### 自动部署

每次推送代码到 GitHub，Vercel 会自动重新部署。

---

## 方式二：使用 Netlify 部署

### 步骤 1: 访问 Netlify

打开 https://www.netlify.com/

### 步骤 2: 登录/注册

- 点击 "Sign up" 或 "Log in"
- 选择 "GitHub"
- 授权 Netlify 访问你的 GitHub 账户

### 步骤 3: 导入项目

1. 点击 "Add new site" → "Import an existing project"
2. 选择 "GitHub"
3. 找到 `pa-developer-clone` 仓库
4. 点击仓库名称

### 步骤 4: 配置构建设置

保持默认设置（已在 netlify.toml 中配置）：
- **Build command**: `npm run build`
- **Publish directory**: `dist`

点击 "Deploy site"

### 步骤 5: 等待部署完成

- 部署通常需要 3-5 分钟
- 完成后会显示预览链接
- 例如: `https://pa-developer-clone.netlify.app`

### 自定义域名（可选）

在 "Site settings" → "Domain management" 中可以添加自定义域名。

---

## 方式三：使用 GitHub Pages 部署

### 步骤 1: 添加 GitHub Pages 配置

在本地项目中创建 `vue.config.js` 并添加：

```javascript
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/pa-developer-clone/'
    : '/'
}
```

### 步骤 2: 安装 gh-pages

```bash
npm install --save-dev gh-pages
```

### 步骤 3: 添加部署脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### 步骤 4: 部署

```bash
npm run deploy
```

### 步骤 5: 启用 GitHub Pages

1. 访问 https://github.com/dadazax/pa-developer-clone/settings/pages
2. Source 选择 `gh-pages` 分支
3. 点击 "Save"

访问地址: https://dadazax.github.io/pa-developer-clone/

---

## 快速部署按钮

### 一键部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dadazax/pa-developer-clone)

### 一键部署到 Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/dadazax/pa-developer-clone)

---

## 环境变量配置（可选）

如果需要配置 API 地址等环境变量：

### Vercel

1. 进入项目 Settings → Environment Variables
2. 添加变量：
   - `VUE_APP_API_BASE_URL`: API 基础地址

### Netlify

1. 进入 Site settings → Build & deploy → Environment
2. 添加变量：
   - `VUE_APP_API_BASE_URL`: API 基础地址

---

## 部署状态检查

### Vercel
- 访问: https://vercel.com/dadazax/pa-developer-clone
- 查看部署历史和日志

### Netlify
- 访问: https://app.netlify.com/sites/[your-site-name]/deploys
- 查看部署历史和日志

---

## 常见问题

### 1. 构建失败

检查依赖是否完整：
```bash
npm install
npm run build
```

### 2. 页面空白

可能是路由模式问题，检查 `vue.config.js` 中的 `publicPath` 配置。

### 3. API 跨域

需要在后端配置 CORS，或使用代理。

---

## 推荐方案

**推荐使用 Vercel**，原因：
- ✅ 部署速度快（~2分钟）
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 自动部署
- ✅ 免费额度充足
- ✅ 支持自定义域名

---

## 部署后验证

部署完成后，访问网站并检查：
- ✅ 首页能正常显示
- ✅ 导航菜单功能正常
- ✅ 新闻列表展示正常
- ✅ 游戏卡片能够翻转
- ✅ 登录对话框能打开
- ✅ 路由跳转正常

---

## 下一步

1. 添加真实的图片资源
2. 连接后端 API
3. 配置自定义域名
4. 添加 Google Analytics
5. 优化 SEO

