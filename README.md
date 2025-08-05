# 江西财经大学程序设计竞赛协会网站

## 项目简介

这是江西财经大学程序设计竞赛协会的官方网站，采用现代化的组件系统架构，支持多目录层级的统一管理。网站展示了协会的基本信息、竞赛成果、成员风采以及各类活动资讯。

## 项目结构

```
code_community-github/
├── components/              # 组件目录
│   ├── header.html         # 导航栏组件模板
│   └── footer.html         # 页脚组件模板
├── css/                    # 样式文件
│   ├── style_v1.css        # 主样式文件
│   ├── competition_v1.css  # 竞赛页面样式
│   ├── contest_v1.css      # 竞赛信息页面样式
│   ├── leader_v1.css       # 负责人页面样式
│   ├── excellent_v1.css    # 优秀成员页面样式
│   ├── links_v1.css        # 友链页面样式
│   ├── big_migrate_v1.css  # 大迁移页面样式
│   └── training_v1.css     # 训练页面样式
├── js/                     # JavaScript文件
│   ├── components.js       # 组件系统核心文件
│   └── main.js            # 主要功能脚本
├── images/                 # 图片资源
│   ├── logo.png           # 协会Logo
│   ├── mini_logo.png      # 小图标
│   ├── leader/            # 负责人照片
│   ├── excellent_member/  # 优秀成员照片
│   ├── contest/           # 竞赛相关图片
│   ├── prize/             # 奖项照片
│   └── big_migrate/       # 大迁移相关图片
├── action/                 # 活动页面目录
│   ├── 4-19-tts/          # 天梯赛活动
│   ├── 5-4-xa/            # 西安邀请赛活动
│   ├── 5-25-cc/           # 长春站活动
│   ├── 6-1-zz/            # 郑州站活动
│   └── 8-1-jx/            # 江西省赛活动
├── competition/            # 竞赛详情页面
│   ├── icpc/              # ICPC竞赛
│   ├── ccpc/              # CCPC竞赛
│   ├── gplt/              # 团体程序设计天梯赛
│   ├── baidu/             # 百度之星
│   ├── lanqiao/           # 蓝桥杯
│   ├── chuanzhi/          # 传智杯
│   └── raicom/            # 睿抗机器人大赛
├── big_migrate/            # 大迁移专题
│   └── materials/         # 相关资料
├── index.html              # 首页
├── contest.html            # 竞赛信息页面
├── leader.html             # 协会负责人页面
├── excellent.html          # 优秀成员页面
├── links.html              # 友链页面
├── 404.html               # 404错误页面
├── jxufe.png              # 学校Logo
└── README.md              # 项目说明文档
```

## 核心特性

### 🎯 统一组件系统
- **智能路径调整**: 根据页面所在目录层级自动调整资源路径
- **组件占位符**: 使用 `<div id="header-placeholder"></div>` 和 `<div id="footer-placeholder"></div>`
- **动态加载**: JavaScript动态插入header和footer内容
- **无服务器依赖**: 使用内联HTML避免CORS问题

### 🔧 技术架构
- **ComponentLoader类**: 负责组件加载和路径调整
- **MobileMenuHandler类**: 处理移动端菜单交互
- **ScrollHandler类**: 管理滚动效果
- **路径智能识别**: 自动识别根目录、一级子目录、二级子目录

### 📱 响应式设计
- **桌面端**: 1200px+ 完整导航栏显示
- **平板端**: 768px-1200px 适配中等屏幕
- **移动端**: <768px 汉堡菜单模式

## 页面功能

### 主要页面
- **首页** (`index.html`): 协会介绍、轮播图、最新动态
- **竞赛信息** (`contest.html`): 各类竞赛概览和链接
- **协会负责人** (`leader.html`): 历届负责人信息展示
- **优秀成员** (`excellent.html`): 优秀成员介绍和成就
- **友链栏** (`links.html`): 官方友链和成员个人网站

### 竞赛专题页面
- **ICPC**: 国际大学生程序设计竞赛
- **CCPC**: 中国大学生程序设计竞赛
- **团体程序设计天梯赛**: 教育部认可的权威赛事
- **百度之星**: 百度举办的程序设计大赛
- **蓝桥杯**: 工信部人才交流中心主办
- **传智杯**: 全国IT技能大赛
- **睿抗机器人大赛**: CAIP编程设计赛道

### 活动页面
- **天梯赛活动**: 团体赛参赛记录
- **各站比赛**: ICPC/CCPC各站比赛详情
- **省赛活动**: 江西省内竞赛活动

## 组件系统使用方法

### 1. 页面结构模板
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题</title>
    <link rel="stylesheet" href="../../css/style_v1.css">
    <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="icon" href="../../images/mini_logo.png" type="image/x-icon">
</head>
<body>
<!-- 导航栏占位符 -->
<div id="header-placeholder"></div>

<!-- 页面内容 -->
<main>
    <!-- 具体页面内容 -->
</main>

<!-- 页脚占位符 -->
<div id="footer-placeholder"></div>

<script src="../../js/components.js"></script>
<script src="../../js/main.js"></script>
</body>
</html>
```

### 2. 路径规则
- **根目录文件**: 直接使用 `css/`, `js/`, `images/` 路径
- **一级子目录**: 使用 `../css/`, `../js/`, `../images/` 路径
- **二级子目录**: 使用 `../../css/`, `../../js/`, `../../images/` 路径

### 3. 组件自动调整
组件系统会根据页面位置自动调整：
- 图片路径 (`images/logo.png` → `../../images/logo.png`)
- 导航链接 (`index.html` → `../../index.html`)
- 资源引用 (`jxufe.png` → `../../jxufe.png`)

## 开发指南

### 添加新页面
1. 创建HTML文件，使用标准模板结构
2. 根据目录层级调整CSS和JS引用路径
3. 添加页面特定的样式和功能

### 修改组件
- **导航栏**: 编辑 `components/header.html`
- **页脚**: 编辑 `components/footer.html`
- **样式**: 修改对应的CSS文件
- **功能**: 更新 `js/components.js` 或 `js/main.js`

### 路径调整规则
```javascript
// 根据目录层级自动计算前缀
if (currentPath.includes('/competition/')) {
    backLevels = 2; // ../../
} else if (currentPath.includes('/action/') || currentPath.includes('/big_migrate/')) {
    backLevels = 1; // ../
}
```

## 技术栈

- **HTML5**: 语义化页面结构
- **CSS3**: 现代样式设计，Flexbox/Grid布局
- **JavaScript ES6+**: 组件系统、类模块化开发
- **Font Awesome 6.4.0**: 图标库
- **响应式设计**: 移动优先的设计理念

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 部署说明

### 本地开发
1. 克隆项目到本地
2. 使用Live Server或类似工具启动本地服务器
3. 访问 `http://localhost:port/index.html`

### 生产部署
1. 将整个项目上传到Web服务器
2. 确保所有文件权限正确
3. 访问域名即可查看网站

## 维护说明

### 常见维护任务
- **更新导航**: 修改 `components/header.html` 和 `js/components.js`
- **添加竞赛**: 在 `competition/` 目录下创建新的子目录和页面
- **更新成员**: 修改 `excellent.html` 和相关图片
- **添加活动**: 在 `action/` 目录下创建新的活动页面

### 注意事项
- 修改组件后需要同步更新 `js/components.js` 中的内联HTML
- 新增页面时注意路径层级和引用关系
- 图片资源建议压缩后上传，提高加载速度

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

© 2025 江西财经大学程序设计竞赛协会 版权所有

**联系我们**: 3200513041@qq.com | 19970929018
**地址**: 江西财经大学麦庐园校区