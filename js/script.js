// Small script for carousel, counters, and lightbox
document.addEventListener('DOMContentLoaded',function(){
  // Carousel
  const slides = document.querySelectorAll('.slide');
  let idx = 0;
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  function show(i){
    slides.forEach(s=>s.classList.remove('active'));
    slides[i].classList.add('active');
  }
  function next(){ idx = (idx+1)%slides.length; show(idx); }
  function prev(){ idx = (idx-1+slides.length)%slides.length; show(idx); }
  nextBtn.addEventListener('click',next);
  prevBtn.addEventListener('click',prev);
  let auto = setInterval(next,6000);
  [nextBtn,prevBtn].forEach(b=>b.addEventListener('click',()=>{ clearInterval(auto); auto=setInterval(next,6000); }));

  // Counters
  const counters = document.querySelectorAll('.stat-number');
  const runCounters = ()=>{
    counters.forEach(c=>{
      const target = +c.dataset.target;
      const duration = 1400;
      const start = +c.textContent || 0;
      const startTime = performance.now();
      function tick(now){
        const progress = Math.min((now-startTime)/duration,1);
        c.textContent = Math.floor(progress*(target-start)+start);
        if(progress<1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  };
  // Trigger when stats in view
  const stats = document.querySelector('.stats');
  if(stats){
    const obs = new IntersectionObserver((entries,observer)=>{ if(entries[0].isIntersecting){ runCounters(); observer.disconnect(); } },{threshold:0.4});
    obs.observe(stats);
  }

  // Lightbox for gallery
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbClose = document.getElementById('lightbox-close');
  items.forEach(it=>{
    it.addEventListener('click',function(e){ e.preventDefault(); lbImg.src = this.querySelector('img').src; lbCaption.textContent = this.dataset.caption||this.querySelector('img').alt; lightbox.classList.remove('hidden'); });
  });
  lbClose.addEventListener('click',()=>lightbox.classList.add('hidden'));
  lightbox.addEventListener('click',(e)=>{ if(e.target===lightbox) lightbox.classList.add('hidden'); });

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();
});
