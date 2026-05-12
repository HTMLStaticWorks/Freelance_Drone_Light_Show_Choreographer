document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check local storage for theme
    if (localStorage.getItem('theme') === 'light') {
        htmlElement.classList.add('light-mode');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('light-mode');
            if (htmlElement.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // RTL Toggle
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    if (rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('rtl');
            if (htmlElement.classList.contains('rtl')) {
                htmlElement.setAttribute('dir', 'rtl');
                rtlToggleBtn.textContent = 'LTR';
            } else {
                htmlElement.setAttribute('dir', 'ltr');
                rtlToggleBtn.textContent = 'RTL';
            }
        });
    }

    // Sticky Header
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('glass-panel');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('glass-panel');
                header.classList.add('bg-transparent');
            }
        });
    }

    // Initialize Swiper (if present)
    if (typeof Swiper !== 'undefined') {
        const swipers = document.querySelectorAll('.swiper');
        swipers.forEach(swiperEl => {
            new Swiper(swiperEl, {
                loop: true,
                pagination: {
                    el: swiperEl.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                navigation: {
                    nextEl: swiperEl.querySelector('.swiper-button-next'),
                    prevEl: swiperEl.querySelector('.swiper-button-prev'),
                },
                breakpoints: {
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                }
            });
        });
    }
});
