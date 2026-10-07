/* メーター・ゲージ（#001〜#015）— 番号・名前・動きは変えない。新しいシーンは #151 から */
MOTION.add("メーター・ゲージ", [
 {id:1, name:"リングゲージ（達成率）", pal:"glowup", loop:4200,
  desc:"円形メーターが目標値まで伸び、中央の数字がカウントアップ。",
  html:`<div class="center s-ring"><div style="position:relative">
    <svg viewBox="0 0 100 100"><circle class="track" cx="50" cy="50" r="45"/><circle class="val" cx="50" cy="50" r="45" style="--off:${283*(1-.78)}"/></svg>
    <div class="num"><span data-n>0</span><small>%</small></div></div>
    <div class="lbl">目標達成率</div></div>`,
  init(el){ countUp(el.querySelector("[data-n]"),78,1800,400); }},
{ id:2, pal:"clustr", name:"横バー進捗", desc:"横長のバーが目標値まで伸び、右端の数字が追いかけてカウント。", loop:4000,
  css:`.m1 .tr{width:76cqw;height:5cqw;border-radius:9cqw;background:var(--surf);overflow:hidden}.m1 .fl{height:100%;width:64%;background:var(--acc);border-radius:9cqw}`,
  html:`<div class="center m1 fc" style="gap:4cqw"><div class="h3 a fu">プロジェクト進捗</div>
  <div class="fr" style="width:76cqw;justify-content:space-between"><span class="sm sb a fu" style="--d:.2s">STEP 3 / 5</span><span class="en" style="font-size:9cqw"><span data-n>0</span>%</span></div>
  <div class="tr"><div class="fl gx" style="--d:.4s;--du:1.6s"></div></div></div>`,
  init(el){ countUp(el.querySelector("[data-n]"),64,1600,400); } },
{ id:3, pal:"ibiza", name:"半円スピードメーター", desc:"半円メーターの針が振り切れる手前まで回転。勢いや速さの演出に。", loop:4200,
  css:`.m2 svg{width:80cqw;overflow:visible}.m2 .nd{transform-origin:50px 50px;animation:m2n 1.8s cubic-bezier(.3,1.4,.5,1) .4s both}@keyframes m2n{from{transform:rotate(-90deg)}to{transform:rotate(55deg)}}`,
  html:`<div class="center m2 fc" style="gap:3cqw"><svg viewBox="0 0 100 58"><path d="M10 50a40 40 0 0 1 80 0" fill="none" stroke="var(--surf)" stroke-width="8" stroke-linecap="round"/>
  <path d="M10 50a40 40 0 0 1 80 0" fill="none" stroke="var(--acc)" stroke-width="8" stroke-linecap="round" pathLength="100" class="dwp" style="--d:.4s;--du:1.8s;--o:20"/>
  <g class="nd"><line x1="50" y1="50" x2="50" y2="16" stroke="var(--ink)" stroke-width="2.6" stroke-linecap="round"/></g><circle cx="50" cy="50" r="4.5" fill="var(--ink)"/></svg>
  <div class="en" style="font-size:13cqw"><span data-n>0</span><span class="sm"> km/h</span></div><div class="sm sb a fu" style="--d:1.6s">作業スピード 3倍</div></div>`,
  init(el){ countUp(el.querySelector("[data-n]"),180,1800,400); } },
{ id:4, pal:"cherry", name:"バッテリー残量", desc:"電池のセグメントが1つずつ点灯し、満タンで光る。", loop:4200,
  css:`.m3 .bt{width:56cqw;height:26cqw;border:1.6cqw solid var(--ink);border-radius:4cqw;padding:2cqw;display:flex;gap:1.6cqw;position:relative}.m3 .bt:after{content:"";position:absolute;right:-5cqw;top:8cqw;width:3cqw;height:7cqw;border-radius:0 1.5cqw 1.5cqw 0;background:var(--ink)}.m3 .sg{flex:1;border-radius:1.6cqw;background:var(--acc)}.m3 .bt.full{animation:pulse .8s ease 2.2s 2}`,
  html:`<div class="center m3 fc" style="gap:6cqw"><div class="bt">${[0,1,2,3,4].map(i=>`<div class="sg a pp" style="${D(.4,i,.32)}"></div>`).join("")}</div>
  <div class="en" style="font-size:12cqw"><span data-n>0</span>%</div><div class="h3 a fu" style="--d:2s">やる気、フル充電。</div></div>`,
  init(el){ countUp(el.querySelector("[data-n]"),100,1600,400); el.querySelector(".bt").classList.add("full"); } },
{ id:5, pal:"mp213", name:"温度計ゲージ", desc:"縦型の温度計が下から上昇。人気度・熱量の表現に。", loop:4200,
  css:`.m4 .tb{width:10cqw;height:70cqw;border-radius:9cqw;background:var(--surf);position:relative;display:flex;align-items:flex-end;padding:1.6cqw}.m4 .lq{width:100%;height:82%;border-radius:9cqw;background:var(--acc)}.m4 .bl{width:20cqw;height:20cqw;border-radius:50%;background:var(--acc);margin-top:-5cqw;position:relative;z-index:-0}`,
  html:`<div class="center m4 fr" style="gap:8cqw"><div class="fc"><div class="tb"><div class="lq gy" style="--d:.3s;--du:1.8s"></div></div><div class="bl"></div></div>
  <div class="fc" style="align-items:flex-start;gap:2cqw"><span class="sm sb a fu">注目度</span><span class="en" style="font-size:16cqw"><span data-n>0</span>°</span><span class="h3 ac a fu" style="--d:1.8s">急上昇中</span></div></div>`,
  init(el){ countUp(el.querySelector("[data-n]"),82,1800,300); } },
{ id:6, pal:"zanzibar", name:"ステップドット", desc:"5つのドットが順に塗られ、現在地のステップで脈打つ。", loop:4600,
  css:`.m5 .ln{position:absolute;left:0;right:0;top:50%;height:1cqw;background:var(--surf);transform:translateY(-50%)}.m5 .lf{position:absolute;left:0;top:50%;height:1cqw;width:50%;background:var(--acc);transform:translateY(-50%)}.m5 .dt{width:9cqw;height:9cqw;border-radius:50%;background:var(--surf);position:relative;display:grid;place-items:center;font-size:3.6cqw}.m5 .on{background:var(--acc);color:var(--onAcc)}.m5 .now{animation:pop .4s ease 1.4s both,pulse 1s ease 1.8s infinite}`,
  html:`<div class="center m5 fc" style="gap:8cqw"><div class="h2 a fu">いまココ</div><div style="position:relative;width:78cqw" class="fr"><div class="ln"></div><div class="lf gx" style="--d:.3s;--du:1.2s"></div>
  <div class="fr" style="justify-content:space-between;width:100%;position:relative">${[1,2,3,4,5].map(i=>`<div class="dt en ${i<=3?'on':''} ${i==3?'now':'a pp'}" style="${D(.3,i,.2)}">${i}</div>`).join("")}</div></div>
  <div class="sm sb a fu" style="--d:1.6s">STEP 3 ／ 5　デザイン制作</div></div>` },
{ id:7, pal:"madeira", name:"星評価", desc:"5つの星が順に塗られ、平均スコアがカウントアップ。口コミ紹介に。", loop:4200,
  css:`.m6 svg{width:13cqw;height:13cqw}.m6 .st{fill:var(--surf)}.m6 .sf{fill:var(--acc)}`,
  html:`<div class="center m6 fc" style="gap:5cqw"><div class="en" style="font-size:20cqw"><span data-n>0.0</span></div>
  <div class="fr" style="gap:1.6cqw">${[0,1,2,3,4].map(i=>`<svg viewBox="0 0 24 24"><path class="st" d="M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21.1l1.4-7L2 9.3l7-.8z"/><path class="sf a zo" style="${D(.5,i,.18)};${i==4?'clip-path:inset(0 20% 0 0)':''}" d="M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21.1l1.4-7L2 9.3l7-.8z"/></svg>`).join("")}</div>
  <div class="sm sb a fu" style="--d:1.5s">レビュー 1,235 件</div></div>`,
  init(el){ countUp(el.querySelector("[data-n]"),48,1400,500,v=>(v/10).toFixed(1)); } },
{ id:8, pal:"lemon", name:"マルチリング", desc:"3重のリングがそれぞれ違う量まで伸びる。複数指標をまとめて見せる。", loop:4400,
  css:`.m7 svg{width:62cqw;transform:rotate(-90deg)}.m7 circle{fill:none;stroke-width:7;stroke-linecap:round}`,
  html:`<div class="center m7 fc" style="gap:6cqw"><svg viewBox="0 0 100 100">${[[44,.86,'var(--acc)'],[34,.64,'var(--sub)'],[24,.45,'var(--ink)']].map(([r,p,c],i)=>`<circle cx="50" cy="50" r="${r}" stroke="var(--surf)"/><circle cx="50" cy="50" r="${r}" stroke="${c}" pathLength="100" class="dwp" style="${D(.3,i,.25)};--du:1.6s;--o:${100-p*100}"/>`).join("")}</svg>
  <div class="fr sm" style="gap:4cqw">${[['集客','86%','var(--acc)'],['成約','64%','var(--sub)'],['継続','45%','var(--ink)']].map(([a,b,c],i)=>`<span class="a fu" style="${D(1.4,i,.15)}"><i class="ib" style="width:2.6cqw;height:2.6cqw;border-radius:50%;background:${c};margin-right:1cqw"></i>${a} ${b}</span>`).join("")}</div></div>` },
{ id:9, pal:"tanzania", name:"セグメントドーナツ", desc:"ドーナツ型が3色の区分に分かれて描かれ、中央に合計値。", loop:4400,
  css:`.m8 svg{width:66cqw;transform:rotate(-90deg)}.m8 circle{fill:none;stroke-width:14}.m8 .ct{position:absolute;inset:0;display:grid;place-items:center;text-align:center}`,
  html:`<div class="center m8 fc" style="gap:5cqw"><div style="position:relative"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" stroke="var(--surf)"/>
  ${[[0,50,'var(--acc)'],[50,30,'var(--sub)'],[80,20,'var(--ink)']].map(([o,l,c],i)=>`<circle cx="50" cy="50" r="38" stroke="${c}" pathLength="100" style="stroke-dasharray:0 100;stroke-dashoffset:${-o};animation:m8s .7s ease ${.3+i*.45}s forwards;--l:${l-1}"/>`).join("")}</svg>
  <div class="ct"><div><div class="en" style="font-size:11cqw">320</div><div class="sm sb">件の相談</div></div></div></div>
  <div class="fr sm" style="gap:3cqw"><span class="ac">Web 50%</span><span class="sb">AI 30%</span><span>他 20%</span></div></div>`,
  css2:`@keyframes m8s{to{stroke-dasharray:var(--l) 100}}` },
{ id:10, pal:"maldives", name:"レベルアップ", desc:"経験値バーが満タンになった瞬間「LEVEL UP!」が弾ける。", loop:4600,
  css:`.m9 .tr{width:74cqw;height:6cqw;border-radius:2cqw;background:var(--surf);overflow:hidden}.m9 .fl{height:100%;background:var(--acc);transform-origin:left;animation:growX 1.4s cubic-bezier(.6,0,.4,1) .4s both}.m9 .lv{font-size:13cqw;opacity:0;animation:punch .4s cubic-bezier(.2,.9,.2,1) 1.9s forwards}.m9 .ring{position:absolute;width:40cqw;height:40cqw;border-radius:50%;border:1cqw solid var(--acc);opacity:0;animation:burst .8s ease-out 1.9s forwards}`,
  html:`<div class="center m9 fc" style="gap:4cqw"><div class="ring"></div><div class="fr sm" style="width:74cqw;justify-content:space-between"><span>Lv.<span data-lv>9</span></span><span class="sb">EXP</span></div><div class="tr"><div class="fl"></div></div>
  <div class="lv en ac">LEVEL UP!</div><div class="sm a fu" style="--d:2.2s">Lv.10 になりました</div></div>`,
  init(el){ after(el,1900,()=>el.querySelector("[data-lv]").textContent="10"); } },
{ id:11, pal:"glowup", name:"ローディング100%", desc:"大きな数字が0→100へ駆け上がり、細いバーと「完了」で締める。", loop:4000,
  css:`.m10 .lb{width:70cqw;height:.8cqw;background:var(--surf)}.m10 .bf{height:100%;background:var(--acc);transform-origin:left;animation:growX 2s cubic-bezier(.5,0,.3,1) .2s both}`,
  html:`<div class="center m10 fc" style="gap:5cqw;align-items:flex-start;padding-left:15cqw"><div class="sm sb mono a fi">LOADING</div><div class="en" style="font-size:30cqw;line-height:.9"><span data-n>0</span></div><div class="lb"><div class="bf"></div></div><div class="h3 ac a fu" style="--d:2.2s">準備完了</div></div>`,
  init(el){ countUp(el.querySelector("[data-n]"),100,2000,200); } },
{ id:12, pal:"clustr", name:"ビフォーアフター比較バー", desc:"Before と After の2本のバーが伸び、差がひと目でわかる。", loop:4400,
  css:`.m11 .rw{width:76cqw;display:flex;flex-direction:column;gap:2cqw}.m11 .tr{height:9cqw;border-radius:2cqw;background:var(--surf);overflow:hidden}.m11 .fl{height:100%;border-radius:2cqw;display:flex;align-items:center;justify-content:flex-end;padding-right:3cqw}`,
  html:`<div class="center m11 fc" style="gap:6cqw"><div class="h2 a fu">作業時間</div>
  <div class="rw"><span class="sm sb">Before（手作業）</span><div class="tr"><div class="fl gx" style="--d:.4s;width:100%;background:var(--sub)"><span class="sm en" style="color:var(--bg)">60分</span></div></div></div>
  <div class="rw"><span class="sm ac">After（AI活用）</span><div class="tr"><div class="fl gx bxa" style="--d:1.1s;width:14%"></div></div></div>
  <div class="h3 a pp" style="--d:1.8s">たった <span class="en ac" style="font-size:9cqw">5分</span></div></div>` },
{ id:13, pal:"ibiza", name:"ドットマトリクス", desc:"10×10のドットが順に点灯して割合を表す。100人中◯人の表現に。", loop:4800,
  css:`.m12 .g{display:grid;grid-template-columns:repeat(10,5cqw);gap:1.4cqw}.m12 .g i{width:5cqw;height:5cqw;border-radius:50%;background:var(--surf)}.m12 .g i.on{background:var(--acc)}`,
  html:`<div class="center m12 fc" style="gap:6cqw"><div class="g">${Array.from({length:100},(_,i)=>`<i class="${i<73?'on a pp':''}" style="${i<73?D(.2,i,.018):''}"></i>`).join("")}</div>
  <div class="h3">100人中 <span class="en ac" style="font-size:10cqw" data-n>0</span> 人が実感</div></div>`,
  init(el){ countUp(el.querySelector("[data-n]"),73,1300,200); } },
{ id:14, pal:"cherry", name:"イコライザー", desc:"音量メーターのようにバーが上下し続ける。BGM・音声紹介に。", loop:6000,
  css:`.m13 .eq{display:flex;align-items:flex-end;gap:2cqw;height:50cqw}.m13 .eq i{width:6cqw;border-radius:1.4cqw 1.4cqw 0 0;background:var(--acc);transform-origin:bottom;animation:m13 var(--s) ease-in-out infinite alternate;height:100%}.m13 .eq i:nth-child(odd){background:var(--sub)}@keyframes m13{from{transform:scaleY(.15)}to{transform:scaleY(1)}}`,
  html:`<div class="center m13 fc" style="gap:6cqw"><div class="eq a fi">${[.5,.35,.6,.42,.3,.55,.38,.47,.33].map(s=>`<i style="--s:${s}s"></i>`).join("")}</div><div class="h2 a fu" style="--d:.3s">NOW PLAYING</div><div class="sm sb a fu" style="--d:.5s">作業用BGM ― Vol.12</div></div>` },
{ id:15, pal:"mp213", name:"円形タイマー", desc:"リングが減りながら10→0のカウントダウン。制限時間の演出に。", loop:11500,
  css:`.m14 svg{width:64cqw;transform:rotate(-90deg)}.m14 .rg{fill:none;stroke:var(--acc);stroke-width:7;stroke-linecap:round;animation:m14 10s linear .3s both}@keyframes m14{from{stroke-dashoffset:0}to{stroke-dashoffset:100}}.m14 .n{position:absolute;inset:0;display:grid;place-items:center}`,
  html:`<div class="center m14 fc" style="gap:5cqw"><div style="position:relative"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="var(--surf)" stroke-width="7"/><circle class="rg" cx="50" cy="50" r="44" pathLength="100" stroke-dasharray="100"/></svg><div class="n en" style="font-size:24cqw" data-n>10</div></div><div class="h3 a fu">10秒で答えて！</div></div>`,
  init(el){ const n=el.querySelector("[data-n]"); every(el,1000,i=>{ n.textContent=Math.max(0,10-i); n.animate([{transform:"scale(1.2)"},{transform:"none"}],{duration:300}); },300); } },
]);
