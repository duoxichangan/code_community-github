// 组件内容定义
const HEADER_HTML = `
<!-- 导航栏 -->
<header class="container-fluid">
    <div class="container">
        <div class="logo">
            <img src="images/logo.png" alt="协会logo" class="logo-image">
            <h1>江西财经大学程序设计竞赛协会</h1>
        </div>
        <nav>
            <ul>
                <li><a href="index.html">首页</a></li>
                <li><a href="contest.html">竞赛信息</a></li>
                <li><a href="leader.html">协会负责人</a></li>
                <li><a href="excellent.html">优秀成员</a></li>
                <li><a href="links.html">友链栏</a></li>
            </ul>
        </nav>
        <div class="menu-toggle" aria-expanded="false">
            <i class="fas fa-bars"></i>
        </div>
    </div>
</header>
`;

const FOOTER_HTML = `
<!-- 页脚 -->
<footer class="container-fluid">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h3>联系我们</h3>
                <p><i class="fas fa-envelope"></i> 3200513041@qq.com </p>
                <p><i class="fas fa-phone"></i> 19970929018 </p>
                <p><i class="fas fa-map-marker-alt"></i> 江西财经大学麦庐园校区</p>
            </div>
            <div class="footer-section">
                <h3>关注我们</h3>
                <div class="social-links">
                    <a href="https://www.jxufe.edu.cn/"><img src="jxufe.png" alt="江西财经大学"  width="40px"></a>
                </div>
            </div>
            <div class="footer-section">
                <h3>快速链接</h3>
                <ul>
                    <li><a href="index.html">首页</a></li>
                    <li><a href="contest.html">竞赛信息</a></li>
                    <li><a href="leader.html">协会负责人</a></li>
                    <li><a href="excellent.html">优秀成员</a></li>
                    <li><a href="links.html">友链栏</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 程序设计竞赛协会 版权所有</p>
        </div>
    </div>
</footer>
`;

// 组件加载器
class ComponentLoader {
    constructor() {
        this.currentPage = this.getCurrentPage();
    }

    // 获取当前页面名称
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        return page.replace('.html', '');
    }

    // 加载组件（使用内联HTML，避免跨域问题）
    loadComponent(elementId, htmlContent) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = htmlContent;
            if (elementId === 'header-placeholder') {
                this.setActiveNavItem();
            }
        }
    }

    // 设置导航栏 active 状态
    setActiveNavItem() {
        setTimeout(() => {
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href) {
                    const linkPage = href.replace('.html', '');
                    if (linkPage === this.currentPage ||
                        (this.currentPage === 'index' && href === 'index.html')) {
                        link.classList.add('active');
                    }
                }
            });
        }, 100);
    }

    // 初始化组件
    init() {
        this.loadComponent('header-placeholder', HEADER_HTML);
        this.loadComponent('footer-placeholder', FOOTER_HTML);
    }
}

// 滚动监听功能
class ScrollHandler {
    constructor() {
        this.header = null;
        setTimeout(() => {
            this.header = document.querySelector('header');
            if (this.header) this.addScrollListener();
        }, 200);
    }

    addScrollListener() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        });
    }
}

// 移动端菜单切换功能
class MobileMenuHandler {
    constructor() {
        setTimeout(() => {
            this.menuToggle = document.querySelector('.menu-toggle');
            this.header = document.querySelector('header');
            this.nav = document.querySelector('nav ul');
            this.navLinks = document.querySelectorAll('nav ul li a');

            if (!this.menuToggle || !this.header || !this.nav) {
                console.error('MobileMenuHandler 初始化失败', {
                    menuToggle: this.menuToggle,
                    header: this.header,
                    nav: this.nav
                });
                return;
            }

            this.toggleMenu = this.toggleMenu.bind(this);
            this.closeMenu = this.closeMenu.bind(this);

            this.menuToggle.addEventListener('click', this.toggleMenu);
            this.navLinks.forEach(link => link.addEventListener('click', this.closeMenu));
            document.addEventListener('click', e => {
                if (!this.header.contains(e.target) && this.header.classList.contains('menu-open')) {
                    this.closeMenu();
                }
            });
        }, 50);
    }

    toggleMenu(e) {
        e.stopPropagation();
        const expanded = this.menuToggle.getAttribute('aria-expanded') === 'true';
        this.menuToggle.setAttribute('aria-expanded', (!expanded).toString());
        this.header.classList.toggle('menu-open');
    }

    closeMenu() {
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.header.classList.remove('menu-open');
    }
}

// DOM Ready 初始化
window.addEventListener('DOMContentLoaded', () => {
    new ComponentLoader().init();
    new ScrollHandler();
    new MobileMenuHandler();
});
