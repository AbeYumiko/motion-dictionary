/* 全シーンをまとめて SCENES を作る（scenes/*.js を読んだあとに読む） */
const SCENES = MOTION.list.slice().sort((a, b) => a.id - b.id);
SCENES.forEach(s => { if (!s.loop) s.loop = 4500; });
(() => {
  const ids = SCENES.map(s => s.id), dup = ids.filter((v, i) => ids.indexOf(v) !== i);
  if (dup.length) console.error("シーン番号が重複しています:", dup);
  const st = document.createElement("style");
  st.textContent = SCENES.map(s => (s.css || "") + (s.css2 || "")).join("\n");
  document.body.appendChild(st);   // core.css より後ろに置く（同じ強さのセレクタはシーン側が勝つ）
})();
