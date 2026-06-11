document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // CANVAS WAVE ANIMATION
    // ============================================
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H;
        let waveOffset = 0;

        function resize() {
            W = canvas.width  = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize, { passive: true });

        const C = {
            saffron: 'rgba(251,139,36,',
            coral:   'rgba(248,90,64,',
        };

        function drawWaves() {
            for (let w = 0; w < 6; w++) {
                const yBase = H * (0.12 + (w / 5) * 0.78);
                const amp   = 26 + w * 7;
                const freq  = 0.0024 - w * 0.00018;
                const spd   = waveOffset * (0.38 + w * 0.11);
                const a     = 0.038 + w * 0.013;
                const col   = w % 2 === 0 ? C.saffron : C.coral;

                ctx.beginPath();
                ctx.moveTo(0, yBase);
                for (let x = 0; x <= W; x += 4) {
                    const y = yBase
                        + Math.sin(x * freq + spd) * amp
                        + Math.sin(x * freq * 1.7 + spd * 0.6) * amp * 0.38;
                    ctx.lineTo(x, y);
                }
                ctx.strokeStyle = `${col} ${a})`;
                ctx.lineWidth = 1.4;
                ctx.stroke();
            }
        }

        function animate() {
            ctx.clearRect(0, 0, W, H);
            waveOffset += 0.017;
            drawWaves();
            requestAnimationFrame(animate);
        }
        animate();
    }

    // --- Mobile Navigation Toggle ---
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            toggle.classList.toggle('active');
        });
        // Close menu when a non-dropdown link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            if (!link.closest('.dropdown-menu') && !link.parentElement.classList.contains('dropdown')) {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('open');
                    toggle.classList.remove('active');
                });
            }
        });
    }

    // --- Cities dropdown chevron: toggle sub-menu on mobile ---
    document.querySelectorAll('.dropdown-chevron').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.closest('.dropdown').classList.toggle('open');
        });
    });

    // --- Navbar scroll effect ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });
    }

    // --- Carousel ---
    document.querySelectorAll('.carousel').forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const dotsWrap = carousel.parentElement.querySelector('.carousel-dots');
        let current = 0;
        const total = slides.length;

        function goTo(index) {
            current = (index + total) % total;
            track.style.transform = `translateX(-${current * 100}%)`;
            if (dotsWrap) {
                dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
                    d.classList.toggle('active', i === current);
                });
            }
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

        if (dotsWrap) {
            dotsWrap.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.addEventListener('click', () => goTo(i));
            });
        }

        let autoplay = setInterval(() => goTo(current + 1), 5000);
        carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
        carousel.addEventListener('mouseleave', () => {
            autoplay = setInterval(() => goTo(current + 1), 5000);
        });
    });

    // --- Scroll fade-in animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    const animateSelectors = [
        '.intro-card', '.city-card', '.product-card', '.contact-card',
        '.highlight-card', '.program-card', '.practical-card',
        '.about-product-card', '.about-text', '.about-image',
        '.city-intro-text', '.city-intro-image',
        '.mcp-card', '.identity-content',
        '.section-header', '.fact-item',
        '.experience-card', '.intro-image',
        '.split-content-inner', '.split-image',
        '.image-banner', '.intro-prose', '.searchtool-banner'
    ];

    animateSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${i % 4 * 0.1}s`;
            observer.observe(el);
        });
    });

    // --- Testimonial video: show placeholder until the file is added ---
    document.querySelectorAll('.video-banner').forEach(banner => {
        const video = banner.querySelector('video');
        if (!video) return;
        const markMissing = () => banner.classList.add('video-missing');
        video.addEventListener('error', markMissing);
        video.querySelectorAll('source').forEach(src => src.addEventListener('error', markMissing));
        // The source may already have failed before these listeners attached
        const checkFailed = () => {
            if (video.error || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) markMissing();
        };
        checkFailed();
        setTimeout(checkFailed, 1500);
    });

    // --- Smooth scroll for anchor links ---
    // Move city card name from image overlay into the content bar below
    document.querySelectorAll('.city-mini-card').forEach(function(card) {
        var name = card.querySelector('.city-mini-name');
        var content = card.querySelector('.city-mini-content');
        if (name && content) content.insertBefore(name, content.firstChild);
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
});
