/* モーション辞典：パレット・補助関数・シーン登録。辞典（dictionary.html）と書き出し（render.html）の共通部分 */

/* ===== Palettes ===== */
const PALETTES = {
  glowup:  {name:"Glowup / Yam",       bg:"#313841", surf:"#3A4750", ink:"#EEEEEE", onSurf:"#EEEEEE", acc:"#EA9216", onAcc:"#313841", sub:"#EEEEEE", chips:["#EEEEEE","#EA9216","#3A4750","#313841"]},
  lemon:   {name:"Lemon / Saffron",    bg:"#C3E7F1", surf:"#20373B", ink:"#20373B", onSurf:"#C3E7F1", acc:"#FFC64F", onAcc:"#20373B", sub:"#519CAB", chips:["#C3E7F1","#519CAB","#FFC64F","#20373B"]},
  mp213:   {name:"MP213 / Banana King",bg:"#09324A", surf:"#1B6F81", ink:"#F3F2EA", onSurf:"#F3F2EA", acc:"#FFFB08", onAcc:"#09324A", sub:"#AED0C9", chips:["#DAD7C8","#1B6F81","#09324A","#F3F2EA","#AED0C9","#FFFB08"]},
  clustr:  {name:"Clustr / Coral",     bg:"#DED9D3", surf:"#3E5889", ink:"#3E5889", onSurf:"#DED9D3", acc:"#EF6A45", onAcc:"#FFFFFF", sub:"#3E5889", chips:["#3E5889","#EF6A45","#DED9D3"]},
  tanzania:{name:"Tanzania / Lichen",  bg:"#3D3D3D", surf:"#EBECEE", ink:"#EBECEE", onSurf:"#3D3D3D", acc:"#C4E326", onAcc:"#3D3D3D", sub:"#8A8C8F", chips:["#3D3D3D","#EBECEE","#C4E326","#8A8C8F"]},
  zanzibar:{name:"Zanzibar / Turquoise",bg:"#2E1F1A", surf:"#4A3324", ink:"#F3E9DF", onSurf:"#F3E9DF", acc:"#4CC4C0", onAcc:"#2E1F1A", sub:"#A0704F", chips:["#A0704F","#4A3324","#4CC4C0","#2E1F1A"]},
  ibiza:   {name:"Ibiza / Bougainvillea",bg:"#EDECE8", surf:"#3E8597", ink:"#3E8597", onSurf:"#EDECE8", acc:"#9C2F6E", onAcc:"#EDECE8", sub:"#C2A878", chips:["#EDECE8","#C2A878","#9C2F6E","#3E8597"]},
  maldives:{name:"Maldives / Scale Yellow",bg:"#1E2F55", surf:"#8A3D8F", ink:"#DCD6C8", onSurf:"#DCD6C8", acc:"#E3B23C", onAcc:"#1E2F55", sub:"#8A3D8F", chips:["#1E2F55","#8A3D8F","#E3B23C","#DCD6C8"]},
  madeira: {name:"Madeira / Purple",   bg:"#A8ABAD", surf:"#3D734B", ink:"#424548", onSurf:"#FFFFFF", acc:"#87549C", onAcc:"#FFFFFF", sub:"#3D734B", chips:["#3D734B","#424548","#87549C","#A8ABAD"]},
  cherry:  {name:"Cherry / Sangria",   bg:"#FFF8E7", surf:"#95BBEA", ink:"#930500", onSurf:"#930500", acc:"#930500", onAcc:"#FFF8E7", sub:"#95BBEA", chips:["#FFF8E7","#930500","#95BBEA"]},
  reel:    {name:"Reel / Lime×Sky",    bg:"#14213D", surf:"#FFFFFF", ink:"#FFFFFF", onSurf:"#14213D", acc:"#D6E86A", onAcc:"#14213D", sub:"#8EDBF7", chips:["#14213D","#D6E86A","#8EDBF7","#FFFFFF"]},
};

const CATS = ["メーター・ゲージ","グラフ・数値","リスト・カード","図解・フロー","ターミナル・コード","チャット・会話","タイトル・文字","ロゴ","アイコン","フック・冒頭"];

/* count-up helper */
function countUp(el, to, ms, delay, fmt=(v)=>v){
  const t0 = performance.now()+delay;
  const tick = (t)=>{
    if(!el.isConnected) return;
    const p = Math.min(1, Math.max(0,(t-t0)/ms));
    const e = 1-Math.pow(1-p,3);
    el.textContent = fmt(Math.round(to*e));
    if(p<1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
/* typewriter helper */
function typeText(el, text, speed, delay, done){
  let i=0;
  const go=()=>{ if(!el.isConnected) return; el.textContent=text.slice(0,++i); if(i<text.length) setTimeout(go,speed); else done&&done(); };
  setTimeout(go,delay);
}


/* ===== scene helpers ===== */
const D = (base, i, step) => `--d:${(base + i * step).toFixed(2)}s`;
/* split text into animated spans */
function ch(text, cls = "a fu", start = 0, step = .06) {
  return [...text].map((c, i) => c === " " ? "&nbsp;" : `<span class="ib ${cls}" style="${D(start, i, step)}">${c}</span>`).join("");
}
const fmtc = v => v.toLocaleString("en-US");
/* repeat fn every ms while the scene root is on screen */
function every(el, ms, fn, delay = 0) {
  const root = el.firstElementChild; let n = 0;
  const tick = () => { if (!root || !root.isConnected) return; fn(n++); setTimeout(tick, ms); };
  setTimeout(tick, delay);
}
/* run fn after ms if scene still on screen */
function after(el, ms, fn) { const root = el.firstElementChild; setTimeout(() => { if (root && root.isConnected) fn(); }, ms); }
function svgArc(r, pct) { const c = 2 * Math.PI * r; return `stroke-dasharray:${c};stroke-dashoffset:${c * (1 - pct)}`; }
/* reveal children one by one */
function reveal(el, sel, start, step) { el.querySelectorAll(sel).forEach((n, i) => after(el, start + i * step, () => { n.style.transition = "opacity .25s"; n.style.opacity = 1; })); }
/* type into several targets in sequence */
function typeSeq(el, parts, speed, delay, done) {
  let t = delay;
  parts.forEach(([sel, txt], k) => { const n = el.querySelector(sel); const d = t; after(el, d, () => typeText(n, txt, speed, 0, k === parts.length - 1 ? done : null)); t += txt.length * speed + 250; });
}

/* シーン間で使い回す部品 */
const TW = (title, body, cls = "") => `<div class="tw a pp ${cls}" style="--d:.1s"><div class="tb"><i></i><i></i><i></i><span style="margin-left:2cqw;opacity:.7">${title}</span></div><div class="cb">${body}</div></div>`;
const DOTS = `<span class="dots"><i></i><i></i><i></i></span>`;
const SV = (d, cls = "", st = "") => `<svg viewBox="0 0 24 24" class="${cls}" style="${st}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const HEART = `<path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6C19 16.5 12 21 12 21z"/>`;

/* ===== シーン登録 ===== */
/* scenes/*.js が MOTION.add(カテゴリ, [シーン…]) を呼ぶ。並べ替えと CSS の注入は index.js */
const MOTION = { list: [], add(cat, list) { list.forEach(s => this.list.push({ cat, ...s })); } };

/* 色の役割（舞台の CSS 変数 --bg --ink --surf --onSurf --acc --onAcc --sub） */
const ROLES = [
  ["bg","背景"],["ink","文字"],["surf","面（カード・吹き出し）"],["onSurf","面の上の文字"],
  ["acc","アクセント"],["onAcc","アクセント上の文字"],["sub","サブ"]
];
function applyPal(stage, p){ ROLES.forEach(([k])=>stage.style.setProperty("--"+k, p[k])); }

/* "12,480" のような文字列も数として扱う */
const num = v => typeof v === "number" ? v : Number(String(v).replace(/[^0-9.\-]/g, "")) || 0;
/* 差し替え文言：シーンの props（初期値）に上書き分を重ねる */
function sceneProps(s, over){ return Object.assign({}, s.props || {}, over || {}); }
/* 舞台にシーンを1回置く（繰り返し再生は呼ぶ側で） */
function mount(stage, s, over){
  const p = sceneProps(s, over);
  stage.innerHTML = typeof s.html === "function" ? s.html(p) : s.html;
  s.init && s.init(stage, p);
}
