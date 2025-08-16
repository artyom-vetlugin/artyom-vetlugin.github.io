const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.addEventListener('click', (event) => {
        if (event.target && event.target.tagName === 'A') {
            siteNav.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

const links = siteNav ? Array.from(siteNav.querySelectorAll('a')) : [];
const sections = links
    .map((anchor) => document.querySelector(anchor.getAttribute('href')))
    .filter(Boolean);

if (sections.length > 0) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const id = `#${entry.target.id}`;
                const anchor = links.find((l) => l.getAttribute('href') === id);
                if (!anchor) return;
                if (entry.isIntersecting) {
                    links.forEach((l) => l.classList.remove('active'));
                    anchor.classList.add('active');
                }
            });
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, alt) {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt || 'preview';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.matches('img.project-image:not(.tbd)[data-lightbox]')) {
        openLightbox(target.src, target.alt);
    }
});

lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
lightbox && lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});


