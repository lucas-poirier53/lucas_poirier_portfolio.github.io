// Portfolio Lucas Poirier — Fonctions principales + animations

// ── Basculer l'affichage d'un projet (déplier/replier) ──
function toggleProject(projectId) {
  const project = document.getElementById(projectId);
  if (project) project.classList.toggle('open');
}

// ── Changer d'onglet dans un projet ──
function switchTab(btn, projectId, tabName) {
  const project = document.getElementById(projectId);
  if (!project) return;
  project.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  project.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const targetPanel = project.querySelector('.tab-panel[data-tab="' + tabName + '"]');
  if (targetPanel) targetPanel.classList.add('active');
}

// ── Lightbox ──
function openLightbox(src) {
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ── Initialisation ──
document.addEventListener('DOMContentLoaded', function () {
  // Lightbox : clic en dehors & touche Escape
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // Cut-in sur chaque lien de navigation
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      const c = document.querySelector('.cutin');
      if (c) {
        c.classList.remove('active');
        void c.offsetWidth; // reflow
        c.classList.add('active');
      }
    });
  });

  // Parallaxe souris sur les cards
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    document.querySelectorAll('.card, .logiciel-card').forEach(el => {
      el.style.setProperty('--mx', x + 'px');
      el.style.setProperty('--my', y + 'px');
    });
  });

  
  const loader=document.querySelector('.loader');
  if(sessionStorage.getItem('loader_seen')){
      if(loader) loader.remove();
  }else{
      sessionStorage.setItem('loader_seen','1');
      setTimeout(()=>{
        if(loader) loader.style.opacity='0';
        setTimeout(()=>{ if(loader) loader.remove(); },300);
      },1900);
  }

  document.querySelectorAll('a[href*=".html"]').forEach(link=>{
    link.addEventListener('click',function(e){
      const href=this.getAttribute('href');
      if(!href) return;
      e.preventDefault();
      const c=document.querySelector('.cutin');
      if(c){ c.classList.remove('active'); void c.offsetWidth; c.classList.add('active'); }
      setTimeout(()=>{ window.location.href=href; },650);
    });
  });

  // ── Ouvrir automatiquement le projet ciblé par l'ancre de l'URL (ex: projets.html#proj-201) ──
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const target = document.getElementById(targetId);
    if (target && target.classList.contains('projet-item')) {
      target.classList.add('open');
      setTimeout(() => { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 300);
    }
  }
});

