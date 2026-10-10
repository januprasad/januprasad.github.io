(() => {
  const tiles = {automotive:[0,0], learning:[1,0], design:[2,0], payments:[0,1], crypto:[1,1], identity:[2,1]};
  const panels = [...document.querySelectorAll('.case-visual[data-industry]')];
  // Each image occupies one square tile in the 1536 × 1024 source atlas.
  // A single scale factor preserves its proportions at every card size.
  const fit = panel => {
    const [column, row] = tiles[panel.dataset.industry] || [0,0];
    const width = panel.clientWidth, height = panel.clientHeight;
    const side = Math.max(width, height);
    panel.style.setProperty('--industry-size', `${side * 3}px ${side * 2}px`);
    panel.style.setProperty('--industry-position', `${(width - side) / 2 - column * side}px ${(height - side) / 2 - row * side}px`);
  };
  panels.forEach(fit);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(entries => entries.forEach(entry => fit(entry.target)));
    panels.forEach(panel => observer.observe(panel));
  } else window.addEventListener('resize', () => panels.forEach(fit), {passive:true});
})();
