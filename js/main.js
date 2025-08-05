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

    // 注意：移动端菜单功能已移动到components.js中的MobileMenuHandler类处理
    // 滚动效果也已移动到components.js中的ScrollHandler类处理

    // 平滑滚动到锚点 - 延迟执行以确保组件已加载
    setTimeout(() => {
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

                    // 移动端点击后关闭菜单 - 使用components.js中的方法
                    const header = document.querySelector('header');
                    if (window.innerWidth <= 768 && header && header.classList.contains('menu-open')) {
                        // 触发菜单关闭
                        const menuToggle = document.querySelector('.menu-toggle');
                        if (menuToggle) {
                            menuToggle.setAttribute('aria-expanded', 'false');
                            header.classList.remove('menu-open');
                        }
                    }
                }
            });
        });
    }, 150); // 稍微延迟更长时间确保所有组件都已加载

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