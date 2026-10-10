(() => {
  const numbers = [...document.querySelectorAll('#moments .stats strong')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;
  const durations = [1800, 2600, 1400, 2200];
  const counters = new Map();
  numbers.forEach((element, index) => {
    const label = element.textContent.trim();
    const target = Number.parseInt(label, 10);
    if (!Number.isFinite(target)) return;
    const suffix = label.replace(/^\d+/, '');
    const value = document.createElement('span');
    value.setAttribute('aria-hidden', 'true');
    value.textContent = '0' + suffix;
    element.setAttribute('aria-label', label);
    element.replaceChildren(value);
    counters.set(element, {value, target, suffix, duration: durations[index % durations.length]});
  });
  const frames = new Map();
  const visibility = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.6) return;
      const element = entry.target;
      const counter = counters.get(element);
      if (!counter || counter.started) return;
      counter.started = true;
      visibility.unobserve(element);
      let start;
      const tick = now => {
        if (start === undefined) start = now;
        const progress = Math.min(1, (now - start) / counter.duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.value.textContent = Math.round(counter.target * eased) + counter.suffix;
        if (progress < 1) frames.set(element, requestAnimationFrame(tick));
        else frames.delete(element);
      };
      frames.set(element, requestAnimationFrame(tick));
    });
  }, {threshold: 0.6, rootMargin: '0px 0px -30px 0px'});
  counters.forEach((_, element) => visibility.observe(element));
  motion.addEventListener('change', event => {
    if (!event.matches) return;
    visibility.disconnect();
    frames.forEach(id => cancelAnimationFrame(id));
    frames.clear();
    counters.forEach(counter => {counter.value.textContent = counter.target + counter.suffix;});
  });
})();
