# 江西财经大学程序设计竞赛协会网站

## 项目结构

```
code_community-github/
├── components/           # 组件目录
│   ├── header.html      # 导航栏组件
│   └── footer.html      # 页脚组件
├── css/                 # 样式文件
│   ├── style.css        # 主样式
│   ├── links.css        # 友链页面样式
│   ├── leader.css       # 负责人页面样式
│   ├── excellent.css    # 优秀成员页面样式
│   └── contest.css      # 竞赛信息页面样式
├── js/                  # JavaScript文件
│   ├── components.js    # 组件加载器
│   └── main.js          # 主要功能脚本
├── images/              # 图片资源
├── index.html           # 首页
├── contest.html         # 竞赛信息页面
├── leader.html          # 协会负责人页面
├── excellent.html       # 优秀成员页面
└── links.html           # 友链页面
```

## 模块化特性

### 组件化结构
- **header.html**: 统一的导航栏组件，包含所有页面的导航链接
- **footer.html**: 统一的页脚组件，包含联系信息和快速链接
- **components.js**: 组件加载器，自动加载header和footer，并设置当前页面的active状态

### 优势
1. **代码复用**: header和footer只需维护一份代码
2. **易于维护**: 修改导航栏或页脚时，只需修改组件文件
3. **自动active状态**: 组件加载器会自动为当前页面的导航项添加active样式
4. **统一性**: 确保所有页面的导航栏和页脚保持一致

### 使用方法
每个HTML页面只需要包含：
```html
<!-- 导航栏占位符 -->
<div id="header-placeholder"></div>

<!-- 页面内容 -->
<main>
    <!-- 具体页面内容 -->
</main>

<!-- 页脚占位符 -->
<div id="footer-placeholder"></div>

<!-- 引入组件加载器 -->
<script src="js/components.js"></script>
<script src="js/main.js"></script>
```

## 页面功能

- **首页**: 协会介绍、最新动态、参与赛事展示
- **竞赛信息**: ICPC、CCPC、天梯赛等竞赛详情
- **协会负责人**: 历届会长信息和成就展示
- **优秀成员**: 优秀成员介绍和荣誉展示
- **友链栏**: 官方友链、成员个人网站、申请友链

## 友链栏功能

### 官方友链
- 江西财经大学网络安全协会

### 成员个人网站
- Mohao（技术大神）
- Louisdlee（算法专家）
- 有毒的羊（可爱成员）
- WoodFish（全栈开发）

### 申请友链
提供申请要求和联系方式，支持友链申请。

## 技术栈

- **HTML5**: 页面结构
- **CSS3**: 样式设计，包含响应式布局
- **JavaScript**: 组件加载和交互功能
- **Font Awesome**: 图标库

## 响应式设计

网站支持多种设备访问：
- 桌面端（1200px+）
- 平板端（768px-1200px）
- 移动端（<768px）

## 部署说明

1. 确保所有文件结构完整
2. 将整个项目上传到Web服务器
3. 访问index.html即可查看网站

## 维护说明

- 修改导航栏：编辑 `components/header.html`
- 修改页脚：编辑 `components/footer.html`
- 添加新页面：创建HTML文件，使用相同的组件结构
- 修改样式：编辑对应的CSS文件

---

© 2025 江西财经大学程序设计竞赛协会 版权所有