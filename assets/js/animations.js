document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Fade up animations
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
        gsap.fromTo(el, 
            { y: 50, autoAlpha: 0 },
            {
                y: 0,
                autoAlpha: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Parallax backgrounds
    const parallaxImages = document.querySelectorAll('.parallax-img');
    parallaxImages.forEach((img) => {
        gsap.to(img, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: img.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
});
