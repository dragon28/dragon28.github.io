(function () {
  var head = document.querySelector('#masthead, #masthead-no-image-header, #masthead-with-text, #masthead-with-pattern, #masthead-with-background-color');
  if (!head) return;
  head.classList.add('d28-head');
  var root = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var KEY = 'd28-fx-paused';
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v ? '1' : '0'); } catch (e) {} }
  var paused = mq.matches ? saved() !== '0' : saved() === '1';

  /* typed slogan: types once, stops on the main slogan */
  var FINAL = 'Technology Research and Information';
  var phrases = ['Bio · Chemical · Computer · Mechatronic', FINAL];
  var box = document.createElement('p');
  box.className = 'd28-typed';
  box.setAttribute('aria-label', FINAL);
  var span = document.createElement('span');
  span.setAttribute('aria-hidden', 'true');
  box.appendChild(span);
  (head.querySelector('.small-12.columns') || head).appendChild(box);
  var pi = 0, ci = 0, del = false, done = false, timer = null;
  function finish() { done = true; span.textContent = FINAL; clearTimeout(timer); timer = null; setTimeout(function () { box.classList.add('done'); }, 2500); }
  function tick() {
    timer = null;
    if (paused || done) return;
    var p = phrases[pi];
    ci += del ? -1 : 1;
    span.textContent = p.slice(0, ci);
    var wait = del ? 30 : 70;
    if (!del && ci === p.length) {
      if (pi === phrases.length - 1) return finish();
      del = true; wait = 1600;
    } else if (del && ci === 0) { del = false; pi++; wait = 350; }
    timer = setTimeout(tick, wait);
  }

  /* particles */
  var c = document.createElement('canvas'), ctx = null;
  c.className = 'd28-canvas'; c.setAttribute('aria-hidden', 'true');
  try { ctx = c.getContext('2d'); } catch (e) {}
  var W = 0, H = 0, pts = [], mouse = { x: -999, y: -999 }, visible = true, raf = 0;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  function resize() {
    W = head.clientWidth; H = head.clientHeight;
    c.width = W * dpr; c.height = H * dpr; c.style.width = W + 'px'; c.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = W < 640 ? 40 : 90; pts = [];
    for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5, r: Math.random() * 1.8 + .6, h: Math.random() < .5 ? '34,211,238' : '168,85,247' });
  }
  function draw(move) {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      if (move) {
        var dx = mouse.x - p.x, dy = mouse.y - p.y;
        if (dx * dx + dy * dy < 19600) { p.x -= dx * .01; p.y -= dy * .01; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fillStyle = 'rgba(' + p.h + ',.9)'; ctx.shadowBlur = 8; ctx.shadowColor = 'rgb(' + p.h + ')'; ctx.fill();
      ctx.shadowBlur = 0;
      for (var j = i + 1; j < pts.length; j++) {
        var q = pts[j], ex = p.x - q.x, ey = p.y - q.y, e = ex * ex + ey * ey;
        if (e < 11000) { ctx.strokeStyle = 'rgba(' + p.h + ',' + (1 - e / 11000) * .45 + ')'; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      }
    }
  }
  function frame() { raf = 0; if (paused || !visible || document.hidden) return; draw(true); raf = requestAnimationFrame(frame); }
  function startLoop() { if (ctx && !raf && !paused && visible && !document.hidden && window.requestAnimationFrame) raf = requestAnimationFrame(frame); }
  if (ctx) {
    head.insertBefore(c, head.firstChild);
    resize();
    window.addEventListener('resize', function () { resize(); if (paused) draw(false); });
    head.addEventListener('mousemove', function (e) { var b = head.getBoundingClientRect(); mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top; });
    head.addEventListener('mouseleave', function () { mouse.x = mouse.y = -999; });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; startLoop(); }).observe(head);
    document.addEventListener('visibilitychange', startLoop);
  }

  /* pause button */
  var btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'd28-pause';
  head.appendChild(btn);
  function apply() {
    root.classList.toggle('d28-paused', paused);
    btn.setAttribute('aria-pressed', paused ? 'true' : 'false');
    btn.textContent = paused ? '\u25B6 Resume animations' : '\u275A\u275A Pause animations';
    if (paused) {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      if (!done) finish();
      if (ctx) draw(false);
    } else { startLoop(); }
  }
  btn.addEventListener('click', function () { paused = !paused; save(paused); apply(); });
  if (mq.addEventListener) mq.addEventListener('change', function (e) { if (e.matches && !paused) { paused = true; apply(); } });
  apply();
  if (!paused) timer = setTimeout(tick, 400);
})();
