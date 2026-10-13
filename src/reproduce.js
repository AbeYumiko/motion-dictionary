/* 再現用のコピー：1シーンを「単体で動く HTML」か「AI に頼むプロンプト」にする（dictionary.html から使う） */
const SITE_URL = "https://abeyumiko.github.io/motion-dictionary/";

/* core.css の中身（同じサイトから読めればそのまま埋め込む。file:// などで読めないときは公開版を link で読む） */
let CORE_CSS = null;
fetch("src/core.css").then(r => r.ok ? r.text() : null).then(t => { CORE_CSS = t; }).catch(() => {});

/* シーンの init が使う補助関数（core.js から、そのまま書き写す） */
function helpersSource() {
  const fns = [countUp, typeText, ch, every, after, svgArc, reveal, typeSeq];
  const consts = { D, fmtc, num, TW, SV };
  return [
    ...Object.entries(consts).map(([k, f]) => `const ${k} = ${f.toString()};`),
    `const DOTS = ${JSON.stringify(DOTS)};`,
    `const HEART = ${JSON.stringify(HEART)};`,
    ...fns.map(f => f.toString()),
  ].join("\n");
}

/* 別のシーンの css に書かれた @keyframes を借りているシーンがある（例：#021 の m8s、#143 の w14）。
   辞典では全シーンの css を一度に読むので動くが、1シーンだけ書き出すときは、使っている分を探して足す */
function keyframesIn(css) {
  const out = {}, re = /@keyframes\s+([\w-]+)\s*\{/g;
  for (let m; (m = re.exec(css));) {
    let i = re.lastIndex, depth = 1;
    while (i < css.length && depth) { if (css[i] === "{") depth++; else if (css[i] === "}") depth--; i++; }
    out[m[1]] = css.slice(m.index, i);
  }
  return out;
}
function borrowedKeyframes(s, html) {
  const own = (s.css || "") + (s.css2 || "");
  const mine = keyframesIn(own + (CORE_CSS || ""));
  const all = keyframesIn(SCENES.map(x => (x.css || "") + (x.css2 || "")).join("\n"));
  const used = own + html;
  return Object.entries(all).filter(([k]) => !mine[k] && new RegExp("(^|[^\\w-])" + k + "([^\\w-]|$)").test(used)).map(([, v]) => v).join("\n");
}

const sceneId = s => "#" + String(s.id).padStart(3, "0");
const sceneHTML = (s, p) => typeof s.html === "function" ? s.html(p) : s.html;

/* 単体で動く HTML（9:16 の舞台に1回再生 → 尺ごとにくり返し） */
function buildCode(s, pal) {
  const p = sceneProps(s);
  const vars = ROLES.map(([k]) => `--${k}:${pal[k]}`).join(";");
  let init = s.init ? s.init.toString() : "";
  if (init && !/^init\s*\(/.test(init)) init = "init: " + init;
  const html = sceneHTML(s, p);
  const own = [(s.css || "") + (s.css2 || ""), borrowedKeyframes(s, html)].filter(Boolean).join("\n");
  const css = CORE_CSS
    ? `<style>\n${CORE_CSS}\n${own}\n</style>`
    : `<link rel="stylesheet" href="${SITE_URL}src/core.css">\n<style>\n${own}\n</style>`;
  return `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${sceneId(s)} ${s.name}</title>
<!-- モーション辞典 ${sceneId(s)}「${s.name}」 ${SITE_URL}
     © 2026 FUN WEB DESIGN　ご自身の制作での利用のみ。再配布・販売はできません。 -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;600&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
${css}
<style>
  html, body { margin: 0; height: 100%; background: #111; }
  body { display: grid; place-items: center; }
  #stage { width: min(100vw, 56.25vh); }   /* 9:16。幅を 1080px にすれば 1080×1920 で描かれる */
</style>
</head><body>
<div class="stage" id="stage" style="${vars}"></div>
<script>
${helpersSource()}

const P = ${JSON.stringify(p)};          // 差し替えできる文言（HTML にはすでに入っています）
const HTML = ${JSON.stringify(html)};
const scene = { ${init} };
const LOOP = ${s.loop};                   // 1回の長さ（ミリ秒）

function play() {
  const st = document.getElementById("stage");
  st.innerHTML = HTML;
  scene.init && scene.init(st, P);
  setTimeout(play, LOOP);
}
play();
</script>
</body></html>
`;
}

/* 画面に出る文言（props があればその値、なければ HTML の文字を拾う） */
function sceneTexts(s) {
  const p = sceneProps(s);
  const flat = v => Array.isArray(v) ? v.flatMap(flat) : [String(v)];
  let list;
  if (s.props) list = Object.values(p).flatMap(flat).filter(v => !/^[01]$/.test(v));
  else {
    const d = document.createElement("div"); d.innerHTML = sceneHTML(s, p);
    const w = document.createTreeWalker(d, NodeFilter.SHOW_TEXT); list = [];
    let buf = "";   // 1文字ずつ span に分かれた見出しは、つなげて1つにする
    for (let n; (n = w.nextNode());) {
      const t = n.textContent.replace(/\s+/g, " ").trim();
      if (!t) continue;
      if (t.length === 1 && n.parentElement.classList.contains("ib")) { buf += t; continue; }
      if (buf) { list.push(buf); buf = ""; }
      list.push(t);
    }
    if (buf) list.push(buf);
  }
  return [...new Set(list.map(t => t.replace(/<br\s*\/?>/g, " ").replace(/<[^>]+>/g, "")))].filter(Boolean);
}

/* AI（Claude・ChatGPT など）に同じ動きを作ってもらうための指示文 */
function buildPrompt(s, pal) {
  const names = { bg: "背景", ink: "文字", surf: "カード面", onSurf: "カードの上の文字", acc: "アクセント", onAcc: "アクセントの上の文字", sub: "サブ" };
  const colors = ROLES.map(([k]) => `${names[k]} ${pal[k]}`).join("／");
  const texts = sceneTexts(s);
  return `次のモーショングラフィックを、HTML・CSS・JavaScript の1ファイルで作ってください。

【参考】モーション辞典 ${sceneId(s)}「${s.name}」（カテゴリ：${s.cat}）
【動き】${s.desc}
【画面】縦長 9:16。サイズは幅に対する割合（container query の cqw など）で指定し、どの大きさで表示しても崩れないようにする。
【尺】1回 ${s.loop / 1000}秒。最後の絵でいったん止めてから、頭に戻ってくり返す。
【色】${colors}
【文言】${texts.length ? texts.join("／") : "（文字なし）"}
【動きの作法】
- 要素は少しずれた位置から、cubic-bezier(.2,.8,.2,1) のように勢いよく入ってピタッと止まる
- 複数の要素は 0.1〜0.2 秒ずつずらして、順番に出す
- 数字のカウントアップや文字のタイピングなど、JS で動かす部分は requestAnimationFrame か setTimeout で
【フォント】日本語は Noto Sans JP（700〜900）、英数字は Inter（800）。Google Fonts から読み込む。
`;
}
