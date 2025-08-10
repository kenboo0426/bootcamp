(function() {
  const root = document.documentElement;
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const saved = localStorage.getItem('theme');
  const isLight = saved ? saved === 'light' : false; // default dark
  if (isLight) root.classList.add('light');

  const themeBtn = document.getElementById('theme-toggle');
  themeBtn?.addEventListener('click', () => {
    root.classList.toggle('light');
    const now = root.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', now);
  });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  navToggle?.addEventListener('click', () => {
    const expanded = nav?.getAttribute('aria-expanded') === 'true';
    nav?.setAttribute('aria-expanded', String(!expanded));
    const btnExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!btnExpanded));
  });

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href.length <= 1) return;
      const id = href.substring(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  const form = document.getElementById('newsletter-form');
  const msg = document.getElementById('form-msg');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = new FormData(form).get('email');
    if (!email || !String(email).includes('@')) {
      msg.textContent = '有効なメールアドレスを入力してください。';
      msg.style.color = 'salmon';
      return;
    }
    msg.textContent = '送信中...';
    msg.style.color = '';
    await new Promise((r) => setTimeout(r, 800));
    msg.textContent = '登録が完了しました。ご確認メールをお送りしました。';
  });
})();