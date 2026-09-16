const sections = document.querySelectorAll('main section[id]');
const links = document.querySelectorAll('.navbar nav a');

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) => l.classList.remove('active'));

        const a = document.querySelector(`.navbar nav a[href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  },
  { rootMargin: '-35% 0px -55% 0px' }
);

sections.forEach((s) => obs.observe(s));

// Scroll-triggered reveal animations
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  revealEls.forEach((el) => revealObs.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// Contact form: fake "sent to admin" popup, no page reload/navigation
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

if (contactForm && toast) {
  let toastTimeout;

  const showToast = () => {
    clearTimeout(toastTimeout);
    toast.classList.add('show');
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 4000);
  };

  const hideToast = () => {
    clearTimeout(toastTimeout);
    toast.classList.remove('show');
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast();
    contactForm.reset();
  });

  toast.querySelector('.toast-close').addEventListener('click', hideToast);
}

// Close the mobile nav collapse after a link is tapped
const mainNav = document.getElementById('mainNav');
if (mainNav && window.bootstrap) {
  const collapseInstance = window.bootstrap.Collapse.getOrCreateInstance(mainNav, { toggle: false });
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('show')) {
        collapseInstance.hide();
      }
    });
  });
}

