(() => {
  const steps = [...document.querySelectorAll('[data-feat]')];
  const shots = [...document.querySelectorAll('[data-shot]')];
  const dots  = [...document.querySelectorAll('[data-dot]')];
  if (!steps.length) return;
  const set = (i) => {
    steps.forEach((el, n) => el.classList.toggle('is-active', n === i));
    shots.forEach((el, n) => el.classList.toggle('is-active', n === i));
    dots.forEach((el, n) => {
      el.classList.toggle('is-active', n === i);
      n === i ? el.setAttribute('aria-current', 'step') : el.removeAttribute('aria-current');
    });
  };
  document.documentElement.classList.add('js-features');
  set(0);

  // While a dot-triggered scroll runs, ignore the steps it passes through.
  let locked = false, seen = 0, unlockTimer;
  const unlock = () => {
    if (!locked) return;
    locked = false;
    clearTimeout(unlockTimer);
    set(seen);
  };
  window.addEventListener('scrollend', unlock);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  dots.forEach((d, n) => d.addEventListener('click', () => {
    set(n);
    seen = n;
    locked = true;
    clearTimeout(unlockTimer);
    unlockTimer = setTimeout(unlock, 1200); // fallback where scrollend isn't supported
    steps[n].scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'center' });
  }));

  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      seen = Number(e.target.dataset.feat);
      if (!locked) set(seen);
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  steps.forEach((s) => io.observe(s));
})();
