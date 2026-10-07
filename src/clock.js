/* 書き出し用の時計。?capture=1 のときだけ setTimeout / requestAnimationFrame / performance.now と
   CSS アニメーションを止めて、window.__seek(ms) で好きな時刻へ進められるようにする。
   こうすると JS で動く数字やタイピングも1コマずつ同じ絵で撮れる。ふつうに開いたときは何もしない。 */
(() => {
  if (!/[?&]capture=1\b/.test(location.search)) return;
  let now = 0, seq = 0;
  const q = [];                  // {id, t, fn, args, every}
  const born = new WeakMap();    // Animation -> 生まれた時刻（仮想）
  const flush = () => {
    for (const a of document.getAnimations()) {
      if (!born.has(a)) { born.set(a, now); a.pause(); }
      a.currentTime = Math.max(0, now - born.get(a));
    }
  };
  const push = (fn, ms, args, every) => { const id = ++seq; q.push({ id, t: now + Math.max(0, +ms || 0), fn, args, every }); return id; };
  window.setTimeout = (fn, ms, ...args) => push(fn, ms, args, 0);
  window.setInterval = (fn, ms, ...args) => push(fn, ms, args, Math.max(1, +ms || 1));
  window.clearTimeout = window.clearInterval = id => { const i = q.findIndex(x => x.id === id); if (i >= 0) q.splice(i, 1); };
  window.requestAnimationFrame = fn => push(() => fn(now), 1000 / 60, [], 0);
  window.cancelAnimationFrame = window.clearTimeout;
  performance.now = () => now;
  window.__seek = target => {
    for (;;) {
      let k = -1;
      for (let i = 0; i < q.length; i++) if (q[i].t <= target && (k < 0 || q[i].t < q[k].t || (q[i].t === q[k].t && q[i].id < q[k].id))) k = i;
      if (k < 0) break;
      const job = q[k];
      now = job.t;
      if (job.every) job.t += job.every; else q.splice(k, 1);
      try { typeof job.fn === "function" && job.fn(...job.args); } catch (e) { console.error(e); }
      flush();
    }
    now = target;
    flush();
    return now;
  };
  window.__clockStart = () => flush();
  window.__reset = () => { q.length = 0; };
})();
