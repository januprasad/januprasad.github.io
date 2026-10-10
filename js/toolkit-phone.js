(() => {
  const phone = document.querySelector('.skill-phone');
  if (!phone) return;
  const home = phone.querySelector('.phone-home');
  const clock = phone.querySelector('.phone-status > span:first-child');
  let clockTimer;
  const updateClock = () => {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    clock.setAttribute('aria-label', 'Local device time: ' + clock.textContent);
    clearTimeout(clockTimer);
    clockTimer = setTimeout(updateClock, 60000 - (Date.now() % 60000) + 20);
  };
  updateClock();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearTimeout(clockTimer);
    else updateClock();
  });
  window.addEventListener('focus', updateClock);

  const screen = document.createElement('section');
  screen.className = 'toolkit-app-screen';
  screen.id = 'toolkit-app-screen';
  screen.hidden = true;
  screen.setAttribute('aria-labelledby', 'toolkit-app-title');
  screen.innerHTML = '<header class="toolkit-app-nav"><button type="button" class="toolkit-back" aria-label="Back to toolkit home">‹ <span>Toolkit</span></button><span class="toolkit-app-category"></span></header><div class="toolkit-app-content"><span class="toolkit-app-icon" aria-hidden="true"></span><p class="toolkit-app-eyebrow">MY ENGINEERING TOOLKIT</p><h3 id="toolkit-app-title"></h3><div class="toolkit-detail"><span>HOW I USE IT</span><p></p></div><a class="toolkit-work-link" href="#projects">Explore my work <span aria-hidden="true">↗</span></a></div><button type="button" class="toolkit-home-button">Back to home</button>';
  phone.append(screen);
  let launcher = null;
  const closeApp = (restoreFocus = true) => {
    if (screen.hidden) return;
    screen.hidden = true;
    home.inert = false;
    home.removeAttribute('aria-hidden');
    phone.classList.remove('is-app-open');
    if (launcher) {
      launcher.setAttribute('aria-expanded', 'false');
      if (restoreFocus) launcher.focus({preventScroll:true});
    }
  };
  home.querySelectorAll('.tech-app').forEach(button => {
    button.setAttribute('aria-controls', screen.id);
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      launcher = button;
      screen.querySelector('#toolkit-app-title').textContent = button.dataset.name;
      screen.querySelector('.toolkit-detail p').textContent = button.dataset.detail;
      screen.querySelector('.toolkit-app-category').textContent = button.dataset.category;
      const sourceIcon = button.querySelector('.app-icon');
      const icon = screen.querySelector('.toolkit-app-icon');
      icon.textContent = sourceIcon.textContent;
      icon.className = 'toolkit-app-icon ' + [...sourceIcon.classList].filter(c => c.startsWith('family-')).join(' ');
      screen.hidden = false;
      screen.scrollTop = 0;
      phone.classList.add('is-app-open');
      button.setAttribute('aria-expanded', 'true');
      screen.querySelector('.toolkit-back').focus({preventScroll:true});
      home.inert = true;
      home.setAttribute('aria-hidden', 'true');
    });
  });
  screen.querySelector('.toolkit-back').addEventListener('click', () => closeApp());
  screen.querySelector('.toolkit-home-button').addEventListener('click', () => closeApp());
  screen.querySelector('.toolkit-work-link').addEventListener('click', () => closeApp(false));
  phone.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !screen.hidden) {event.preventDefault();closeApp();}
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => closeApp(false)));
})();
