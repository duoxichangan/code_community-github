document.addEventListener('DOMContentLoaded', function() {
    // 轮播图功能（保持不变）
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
        if (n >= slides.length) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = n;
        }

        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }


    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function initSlideshow() {
        if (slides.length === 0) return;

        showSlide(0);
        slideInterval = setInterval(nextSlide, 4000);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                slideInterval = setInterval(nextSlide, 4000);
            });
        });
    }

    initSlideshow();

    // 增强的移动端导航菜单功能
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    const header = document.querySelector('header');

    if (menuToggle && nav) {
        // 菜单切换功能
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            nav.classList.toggle('show');
            header.classList.toggle('menu-open'); // 添加菜单打开状态
        });

        // 点击菜单外区域关闭菜单
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && e.target !== menuToggle) {
                nav.classList.remove('show');
                header.classList.remove('menu-open');
            }
        });

        // 点击菜单项后关闭菜单（针对移动端）
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('show');
                    header.classList.remove('menu-open');
                }
            });
        });
    }

    // 滚动时导航栏样式变化效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // 移动端点击后关闭菜单
                if (window.innerWidth <= 768 && nav.classList.contains('show')) {
                    nav.classList.remove('show');
                    header.classList.remove('menu-open');
                }
            }
        });
    });

    // 添加滚动动画效果（保持不变）
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .news-card, .about-content, .about-image');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };

    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .news-card, .about-content, .about-image {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});