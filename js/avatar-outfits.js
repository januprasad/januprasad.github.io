(() => {
  const hero = document.querySelector('.avatar-home .janu-avatar');
  if (!hero) return;
  const looks = [
    ['images/januprasad-avatar.png', 'navy blue shirt'],
    ['images/avatar-outfit-1.png', 'cream polo'],
    ['images/avatar-outfit-2.png', 'suede jacket'],
    ['images/avatar-outfit-3.png', 'ivory knit'],
    ['images/avatar-outfit-4.png', 'brown blazer']
  ];
  const key = 'janu-avatar-last-outfit';
  let previous = -1;
  try {
    const saved = sessionStorage.getItem(key);
    if (saved !== null && /^[0-4]$/.test(saved)) previous = Number(saved);
  } catch (_) { /* Random selection still works if storage is unavailable. */ }
  const choices = looks.map((_, index) => index).filter(index => index !== previous);
  const selected = choices[Math.floor(Math.random() * choices.length)];
  const [src, name] = looks[selected];
  const preload = new Image();
  preload.onload = () => {
    document.querySelectorAll('.janu-avatar').forEach(img => {
      img.src = src;
      if (img.closest('.avatar-home')) img.alt = `Full-body 3D avatar of Januprasad wearing a ${name} outfit`;
    });
    try { sessionStorage.setItem(key, String(selected)); } catch (_) {}
  };
  preload.src = src;
})();
