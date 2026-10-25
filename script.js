const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#mobile-menu');
function closeMenu() { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; menu.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.nav')) closeMenu(); });
const pieces = [...document.querySelectorAll('.piece')];
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(filter => { const active = filter === button; filter.classList.toggle('active', active); filter.setAttribute('aria-pressed', String(active)); });
  let visible = 0;
  pieces.forEach(piece => { piece.hidden = button.dataset.filter !== 'all' && piece.dataset.category !== button.dataset.filter; if (!piece.hidden) visible++; });
  document.querySelector('#result-count').textContent = `${visible} ${visible === 1 ? 'piece' : 'pieces'} shown`;
}));
const dialog = document.querySelector('#piece-dialog');
let selectedPiece;
pieces.forEach(piece => piece.addEventListener('click', () => {
  selectedPiece = piece;
  document.querySelector('#dialog-title').textContent = piece.dataset.title;
  document.querySelector('#dialog-description').textContent = piece.dataset.description;
  const image = document.querySelector('#dialog-image'); image.src = piece.dataset.image; image.alt = piece.querySelector('img').alt;
  document.querySelector('#dialog-picture').className = `picture ${piece.dataset.crop || 'stag'}`;
  dialog.setAttribute('aria-labelledby', 'dialog-title'); dialog.showModal(); document.body.classList.add('modal-open');
}));
function closeDialog() { dialog.close(); }
document.querySelector('.close-dialog').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog(); } });
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
document.querySelector('#use-piece').addEventListener('click', () => { const mapping = {apparel:'Sweatshirt', headwear:'Headwear', bags:'Bag', signatures:'Something else'}; document.querySelector('#piece').value = mapping[selectedPiece.dataset.category]; closeDialog(); });
document.querySelectorAll('[data-project]').forEach(link => link.addEventListener('click', () => { document.querySelector('#project').value = link.dataset.project; }));
const form = document.querySelector('#brief-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const date = data.get('date');
  const dateText = date ? new Intl.DateTimeFormat('en-CA', {dateStyle:'long'}).format(new Date(`${date}T12:00:00`)) : 'To discuss';
  document.querySelector('#prepared-brief').value = `WINDSOR EMBRO — PROJECT BRIEF\n\nName: ${data.get('name').trim()}\nProject: ${data.get('project')}\nPiece: ${data.get('piece')}\nQuantity: ${data.get('quantity') || 'To discuss'}\nIdeal date: ${dateText}\n\nThe idea:\n${data.get('idea').trim()}\n\nPrepared for discussion. This is not a submitted inquiry, quote or confirmed order.`;
  document.querySelector('#brief-result').hidden = false;
  document.querySelector('#copy-status').textContent = '';
  document.querySelector('#brief-result').focus();
  document.querySelector('#brief-result').scrollIntoView({block:'nearest',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
});
document.querySelector('#copy-brief').addEventListener('click', async () => {
  const brief = document.querySelector('#prepared-brief'); const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText(brief.value); status.textContent = 'Brief copied.'; }
  catch { brief.focus(); brief.select(); status.textContent = 'Select Copy from your browser or press Ctrl/Cmd + C to copy your brief.'; }
});
document.querySelector('#download-brief').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([document.querySelector('#prepared-brief').value], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a'); link.href = url; link.download = 'windsor-embro-project-brief.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
});
