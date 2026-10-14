const links = [...document.querySelectorAll('.nav-link')];
const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id)); }), { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));

document.querySelectorAll('[role="tab"]').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('[role="tab"]').forEach(item => item.setAttribute('aria-selected', String(item === tab)));
  document.querySelectorAll('.panel').forEach(panel => panel.classList.toggle('hidden', panel.id !== tab.dataset.panel));
}));

document.querySelectorAll('.copy').forEach(button => button.addEventListener('click', async () => {
  await navigator.clipboard.writeText(button.dataset.copy); const original = button.textContent; button.textContent = 'Copied'; setTimeout(() => button.textContent = original, 1400);
}));

document.getElementById('focus-toggle').addEventListener('click', () => { document.body.classList.toggle('focus'); document.querySelector('.sidebar').toggleAttribute('hidden'); });
