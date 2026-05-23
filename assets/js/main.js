document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex', 'flex-col');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex', 'flex-col');
            }
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

    // Sticky Header logic removed as header should not be transparent

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

    // Scroll to Top
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active Link Highlighting
    const highlightActiveLink = () => {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a, #mobile-menu a');
        const navBtns = document.querySelectorAll('nav button');
        
        // Determine theme color based on page or default
        const isHome2 = path === 'index-2.html' || document.querySelector('.text-\\[\\#8a2be2\\]');
        const activeColorClass = isHome2 ? 'text-[#8a2be2]' : 'text-[#00f0ff]';

        // Clear all first
        navLinks.forEach(l => l.classList.remove('text-[#00f0ff]', 'text-[#8a2be2]', 'active'));
        navBtns.forEach(b => b.classList.remove('text-[#00f0ff]', 'text-[#8a2be2]'));

        let matchFound = false;
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === path) {
                link.classList.add(activeColorClass);
                link.classList.add('active');
                matchFound = true;
                
                // Dropdown parent highlighting
                const group = link.closest('.group');
                if (group) {
                    const btn = group.querySelector('button');
                    if (btn) {
                        btn.classList.add(activeColorClass);
                        btn.classList.add('active');
                    }
                }
            }
        });

        // Fallback for details/subpages
        if (!matchFound) {
            if (path.includes('blog-details')) {
                const blogLink = document.querySelector('nav a[href="events.html"]');
                if (blogLink) blogLink.classList.add(activeColorClass);
            }
        }
    };
    highlightActiveLink();
});
