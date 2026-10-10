(() => {
  const scene = document.querySelector('.badge-scene');
  const body = scene?.querySelector('.badge-body');
  const strap = scene?.querySelector('.lanyard');
  const button = scene?.querySelector('.badge-flip');
  if (!body || !strap || !button) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let x = 0, y = 0, vx = 0, vy = 0, frame = 0, lastFrame = 0;
  let active = null, dragged = false;
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const draw = () => {
    const length = Math.hypot(x, 108 + y);
    const angle = -Math.atan2(x, 108 + y) * 180 / Math.PI;
    body.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${x * 0.13}deg)`;
    strap.style.height = `${length}px`;
    strap.style.transform = `rotate(${angle}deg) scaleX(${Math.max(0.76, 108 / length)})`;
    body.classList.toggle('is-pulled', !!active);
  };
  const settle = () => {
    frame = 0;
    lastFrame = 0;
    x = y = vx = vy = 0;
    draw();
  };
  const tick = now => {
    const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.025) : 1 / 60;
    lastFrame = now;
    // Damped spring: a quick return followed by a soft, decaying bounce.
    vx += (-160 * x - 13 * vx) * dt;
    vy += (-160 * y - 13 * vy) * dt;
    x += vx * dt;
    y += vy * dt;
    draw();
    if (Math.hypot(x, y) < 0.12 && Math.hypot(vx, vy) < 0.8) settle();
    else frame = requestAnimationFrame(tick);
  };
  const release = event => {
    if (!active || event.pointerId !== active.id) return;
    active = null;
    if (button.hasPointerCapture(event.pointerId)) button.releasePointerCapture(event.pointerId);
    body.classList.remove('is-pulled');
    if (reducedMotion.matches) settle();
    else { lastFrame = 0; frame = requestAnimationFrame(tick); }
  };
  body.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0 || active) return;
    cancelAnimationFrame(frame);
    frame = 0;
    dragged = false;
    vx = vy = 0;
    active = {id:event.pointerId, startX:event.clientX, startY:event.clientY, x, y, time:event.timeStamp};
    button.setPointerCapture(event.pointerId);
    draw();
  });
  body.addEventListener('pointermove', event => {
    if (!active || active.id !== event.pointerId) return;
    const dx = event.clientX - active.startX, dy = event.clientY - active.startY;
    if (Math.hypot(dx, dy) > 5) dragged = true;
    const dt = Math.max(0.008, (event.timeStamp - active.time) / 1000);
    const limitX = Math.max(15, Math.min(80, (scene.clientWidth - body.offsetWidth) / 2 - 8));
    const nextX = limitX * Math.tanh((active.x + dx) / limitX);
    const nextY = clamp(115 * Math.tanh((active.y + dy) / 115), -32, 100);
    vx = clamp((nextX - x) / dt, -500, 500);
    vy = clamp((nextY - y) / dt, -500, 500);
    x = nextX; y = nextY; active.time = event.timeStamp;
    draw();
  });
  body.addEventListener('pointerup', release);
  body.addEventListener('pointercancel', release);
  body.addEventListener('lostpointercapture', release);
  body.addEventListener('dragstart', event => event.preventDefault());
  // A pull should never accidentally flip the card; normal clicks still flip.
  button.addEventListener('click', event => {
    if (dragged && event.detail !== 0) {event.preventDefault();event.stopImmediatePropagation();}
  }, true);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches && !active) {cancelAnimationFrame(frame);settle();}
  });
  draw();
})();
