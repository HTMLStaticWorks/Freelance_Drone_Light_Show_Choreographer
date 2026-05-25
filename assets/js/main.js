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
        const rawPath = window.location.pathname.split('/').pop();
        let path = rawPath || 'index.html';
        if (path === '' || path === '/') {
            path = 'index.html';
        }
        
        const navLinks = document.querySelectorAll('nav a, #mobile-menu a');
        const navBtns = document.querySelectorAll('nav button');
        
        // Strictly determine branding context: index-2.html is purple theme, all other pages are cyan theme
        const isHome2 = path === 'index-2.html';
        const activeColorClass = isHome2 ? 'text-[#8a2be2]' : 'text-[#00f0ff]';
        const activeColor = isHome2 ? '#8a2be2' : '#00f0ff';
        const activeBg = isHome2 ? 'rgba(138,43,226,0.13)' : 'rgba(0,240,255,0.13)';
        const activeShadow = isHome2 ? '0 0 10px rgba(138,43,226,0.18)' : '0 0 10px rgba(0,240,255,0.18)';

        // Clear all active styles first
        navLinks.forEach(l => {
            l.classList.remove('text-[#00f0ff]', 'text-[#8a2be2]', 'active');
            l.style.removeProperty('background-color');
            l.style.removeProperty('border-radius');
            l.style.removeProperty('font-weight');
            l.style.removeProperty('box-shadow');
            l.style.removeProperty('padding');
        });
        navBtns.forEach(b => {
            b.classList.remove('text-[#00f0ff]', 'text-[#8a2be2]', 'active');
            b.style.removeProperty('background-color');
            b.style.removeProperty('border-radius');
            b.style.removeProperty('font-weight');
            b.style.removeProperty('box-shadow');
            b.style.removeProperty('padding');
        });

        // Fallback checks for subpages / detail pages
        let searchPath = path;
        if (path.includes('event-details.html') || path.includes('blog-details')) {
            searchPath = 'events.html';
        }

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === searchPath) {
                link.classList.add(activeColorClass);
                link.classList.add('active');

                // Apply highlight styles directly via JS to guarantee visibility
                link.style.setProperty('background-color', activeBg, 'important');
                link.style.setProperty('border-radius', '6px', 'important');
                link.style.setProperty('font-weight', '600', 'important');
                link.style.setProperty('box-shadow', activeShadow, 'important');
                link.style.setProperty('padding', '4px 10px', 'important');

                // Highlight parent dropdown group button if applicable
                const group = link.closest('.group');
                if (group) {
                    const btn = group.querySelector('button');
                    if (btn) {
                        btn.classList.add(activeColorClass);
                        btn.classList.add('active');
                        btn.style.setProperty('background-color', activeBg, 'important');
                        btn.style.setProperty('border-radius', '6px', 'important');
                        btn.style.setProperty('font-weight', '600', 'important');
                        btn.style.setProperty('padding', '4px 10px', 'important');
                    }
                }
            }
        });
    };
    highlightActiveLink();
});
