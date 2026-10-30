(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var head = document.querySelector('#masthead, #masthead-no-image-header, #masthead-with-text, #masthead-with-pattern, #masthead-with-background-color');
  if (!head) return;
  head.classList.add('d28-head');

  /* typed slogan */
  var phrases = ['Technology Research and Information', 'Bio · Chemical · Computer · Mechatronic', 'Everyday tech, decoded'];
  var box = document.createElement('p');
  box.className = 'd28-typed';
  box.setAttribute('aria-label', phrases[0]);
  var span = document.createElement('span');
  span.setAttribute('aria-hidden', 'true');
  box.appendChild(span);
  var host = head.querySelector('.small-12.columns') || head;
  host.appendChild(box);
  if (reduce) { span.textContent = phrases[0]; }
  else {
    var pi = 0, ci = 0, del = false;
    (function tick() {
      var p = phrases[pi];
      ci += del ? -1 : 1;
      span.textContent = p.slice(0, ci);
      var wait = del ? 35 : 75;
      if (!del && ci === p.length) { del = true; wait = 2200; }
      else if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; wait = 400; }
      setTimeout(tick, wait);
    })();
  }
  if (reduce || !window.requestAnimationFrame) return;

  /* particle constellation */
  var c = document.createElement('canvas');
  c.className = 'd28-canvas';
  c.setAttribute('aria-hidden', 'true');
  head.insertBefore(c, head.firstChild);
  var ctx = c.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, pts = [], mouse = { x: -999, y: -999 }, visible = true;
  function resize() {
    W = head.clientWidth; H = head.clientHeight;
    c.width = W * dpr; c.height = H * dpr; c.style.width = W + 'px'; c.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = W < 640 ? 40 : 90;
    pts = [];
    for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5, r: Math.random() * 1.8 + .6, h: Math.random() < .5 ? '34,211,238' : '168,85,247' });
  }
  resize();
  window.addEventListener('resize', resize);
  head.addEventListener('mousemove', function (e) { var b = head.getBoundingClientRect(); mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top; });
  head.addEventListener('mouseleave', function () { mouse.x = mouse.y = -999; });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(head);
  function frame() {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      var dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.sqrt(dx * dx + dy * dy);
      if (d < 140) { p.x -= dx * .01; p.y -= dy * .01; }
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fillStyle = 'rgba(' + p.h + ',.9)'; ctx.shadowBlur = 8; ctx.shadowColor = 'rgb(' + p.h + ')'; ctx.fill();
      for (var j = i + 1; j < pts.length; j++) {
        var q = pts[j], ex = p.x - q.x, ey = p.y - q.y, e = ex * ex + ey * ey;
        if (e < 11000) { ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(' + p.h + ',' + (1 - e / 11000) * .45 + ')'; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      }
    }
  }
  frame();
})();
