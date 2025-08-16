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


