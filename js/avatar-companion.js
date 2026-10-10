(() => {
  const home = document.querySelector('.avatar-home');
  const hero = document.querySelector('.hero');
  const portrait = home?.querySelector('.janu-avatar');
  if (!home || !hero || !portrait) return;
  const companion = document.createElement('aside');
  companion.className = 'avatar-companion';
  companion.setAttribute('aria-label', 'Januprasad’s avatar companion');
  companion.hidden = true;
  companion.innerHTML = '<div class="avatar-speech"><span class="avatar-speech-label">JANU SAYS</span><p>Hello, world! 👋</p><span class="avatar-speech-detail">Welcome to my little corner of the web.</span></div><button class="avatar-bubble-toggle" type="button" aria-label="Hide avatar speech bubble" aria-expanded="true">···</button>';
  const mini = portrait.cloneNode();
  mini.removeAttribute('fetchpriority');
  mini.alt = '';
  companion.append(mini);
  document.body.append(companion);
  const bubble = companion.querySelector('.avatar-speech');
  const toggle = companion.querySelector('button');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const messages = [
    ['Hello, world! 👋', 'Welcome to my little corner of the web.'],
    ['Thinking in Kotlin.', 'Turning ideas into thoughtful Android experiences.'],
    ['Small screen. Big ideas.', 'Jetpack Compose, reusable UI, and a little curiosity.'],
    ['Let’s talk programming.', 'Clean code today. Easier changes tomorrow.'],
    ['Connected journeys.', 'Cars, onboarding, and dashboards that feel effortless.'],
    ['Built with care.', 'Good UI makes the complicated feel simple.']
  ];
  let active = false, queued = false, index = 0, transition;
  function update() {
    queued = false;
    const rect = home.getBoundingClientRect();
    const shouldPin = rect.bottom < window.innerHeight * .72 || hero.getBoundingClientRect().bottom < window.innerHeight * .7;
    if (shouldPin === active) return;
    active = shouldPin;
    transition?.cancel();
    if (active) {
      companion.hidden = false;
      const target = mini.getBoundingClientRect();
      home.classList.add('avatar-is-pinned');
      if (!motion.matches && rect.bottom > 0 && rect.width && target.width) {
        transition = mini.animate([
          {transform:`translate(${rect.left-target.left}px, ${rect.top-target.top}px) scale(${rect.width/target.width}, ${rect.height/target.height})`},
          {transform:'translate(0,0) scale(1)'}
        ], {duration:600,easing:'cubic-bezier(.2,.8,.2,1)'});
      }
    } else {
      companion.hidden = true;
      home.classList.remove('avatar-is-pinned');
    }
  }
  function schedule() { if (!queued) {queued = true; requestAnimationFrame(update);} }
  toggle.addEventListener('click', () => {
    bubble.hidden = !bubble.hidden;
    toggle.setAttribute('aria-expanded', String(!bubble.hidden));
    toggle.setAttribute('aria-label', bubble.hidden ? 'Show avatar speech bubble' : 'Hide avatar speech bubble');
  });
  setInterval(() => {
    if (!active || document.hidden || bubble.hidden || motion.matches) return;
    index = (index + 1) % messages.length;
    bubble.querySelector('p').textContent = messages[index][0];
    bubble.querySelector('.avatar-speech-detail').textContent = messages[index][1];
    bubble.animate([{opacity:0,transform:'translateY(7px) scale(.95)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:400,easing:'ease-out'});
  }, 6500);
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule, {passive:true});
  portrait.addEventListener('load', schedule);
  update();
})();
