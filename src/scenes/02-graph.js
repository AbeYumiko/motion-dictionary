/* グラフ・数値（#016〜#030）— 番号・名前・動きは変えない。新しいシーンは #151 から */
MOTION.add("グラフ・数値", [
 {id:16, name:"棒グラフ成長＋数字", pal:"lemon", loop:4500,
  desc:"月ごとの棒が順に伸び、最終月をアクセント色で強調。合計値がカウントアップ。",
  props:{ title:"今月の再生数", value:320, unit:"万回", labels:["1月","2月","3月","4月"] },
  html:p=>`<div class="center s-bar">
    <div class="ttl">${p.title}</div>
    <div class="big"><span data-n>0</span><small>${p.unit}</small></div>
    <div class="chart">
      ${p.labels.slice(0,4).map((m,i)=>[m,[25,42,60,100][i]]).map(([m,h],i)=>`<div class="col"><div class="b ${i==3?'hi':''}" style="--h:${h*.52}cqw;--d:${.3+i*.18}s"></div><span class="m">${m}</span></div>`).join("")}
    </div></div>`,
  init(el,p){ countUp(el.querySelector("[data-n]"),num(p.value),1500,600); }},
{ id:17, pal:"madeira", name:"折れ線グラフ描画", desc:"折れ線が左から描かれ、最後の点が脈打つ。成長の推移を見せる。", loop:4400,
  css:`.g1 svg{width:80cqw;overflow:visible}.g1 .gl{stroke:var(--surf);stroke-width:.4}.g1 .pt{animation:pop .4s ease 1.9s both,pulse 1s ease 2.3s infinite;transform-box:fill-box;transform-origin:center}`,
  props:{ title:"フォロワー数", value:12480, unit:"人" },
  html:p=>`<div class="center g1 fc" style="gap:5cqw"><div class="fc" style="align-items:flex-start;width:80cqw"><span class="sm sb a fu">${p.title}</span><span class="en" style="font-size:12cqw"><span data-n>0</span><span class="sm"> ${p.unit}</span></span></div>
  <svg viewBox="0 0 100 60">${[10,25,40,55].map(y=>`<line class="gl" x1="0" x2="100" y1="${y}" y2="${y}"/>`).join("")}
  <polyline points="0,52 16,46 32,48 48,34 64,30 80,18 100,6" fill="none" stroke="var(--acc)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round" pathLength="100" class="dw" style="--d:.3s;--du:1.6s"/>
  <circle class="pt" cx="100" cy="6" r="3" fill="var(--acc)"/></svg></div>`,
  init(el,p){ countUp(el.querySelector("[data-n]"),num(p.value),1700,300,fmtc); } },
{ id:18, pal:"lemon", name:"横棒ランキング", desc:"項目ごとの横棒が上から順に伸び、1位だけアクセント色。", loop:4600,
  css:`.g2 .it{display:grid;grid-template-columns:16cqw 1fr;align-items:center;gap:3cqw;width:80cqw}.g2 .br{height:7cqw;border-radius:0 2cqw 2cqw 0;background:var(--sub);display:flex;align-items:center;justify-content:flex-end;padding-right:2cqw}.g2 .br.hi{background:var(--acc)}`,
  props:{ title:"使われている言語", items:[["JS",100],["Python",82],["TS",64],["Go",38],["Rust",26]] },
  html:p=>{ const mx=Math.max(...p.items.map(([,v])=>num(v)));
  return `<div class="center g2 fc" style="gap:3.4cqw"><div class="h2 a fu" style="margin-bottom:3cqw">${p.title}</div>
  ${p.items.map(([n,v],i)=>`<div class="it"><span class="sm" style="text-align:right">${n}</span><div class="br gx ${i?'':'hi'}" style="width:${Math.round(num(v)/mx*100)}%;${D(.4,i,.15)}"><span class="sm en" style="color:${i?'var(--bg)':'var(--onAcc)'}">${v}</span></div></div>`).join("")}</div>`; } },
{ id:19, pal:"tanzania", name:"巨大数字カウント", desc:"桁区切りつきの大きな数字が一気にカウントアップ。実績アピールに。", loop:4000,
  css:`.g3 .big{font-size:17cqw;line-height:1}`,
  props:{ label:"累計再生回数", value:1234567, note:"回 突破しました" },
  html:p=>`<div class="center g3 fc" style="gap:3cqw"><div class="sm sb a fu">${p.label}</div><div class="big en ac" data-n>0</div><div class="h3 a fu" style="--d:1.8s">${p.note}</div></div>`,
  init(el,p){ countUp(el.querySelector("[data-n]"),num(p.value),1800,200,fmtc); } },
{ id:20, pal:"maldives", name:"前年比アップ", desc:"上向き矢印が伸び上がり、増加率が表示される。", loop:4200,
  css:`.g4 svg{width:34cqw}`,
  props:{ value:128, label:"売上 前年比" },
  html:p=>`<div class="center g4 fc" style="gap:3cqw"><svg viewBox="0 0 40 50"><path d="M20 48V6M6 20L20 6l14 14" fill="none" stroke="var(--acc)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" pathLength="100" class="dw" style="--du:1s;--d:.2s"/></svg>
  <div class="en" style="font-size:22cqw;line-height:1">+<span data-n>0</span>%</div><div class="h3 a fu" style="--d:1.4s">${p.label}</div></div>`,
  init(el,p){ countUp(el.querySelector("[data-n]"),num(p.value),1300,300); } },
{ id:21, pal:"glowup", name:"円グラフ", desc:"扇形が時計回りに順番に広がり、凡例がフェードイン。", loop:4600,
  css:`.g5 svg{width:62cqw;transform:rotate(-90deg)}.g5 circle{fill:none;stroke-width:50}`,
  props:{ items:[["インスタ",45],["X",30],["その他",25]] },
  html:p=>{ const C=['var(--acc)','var(--sub)','var(--surf)'], it=p.items.slice(0,3); let o=0; const arcs=it.map(([,v],i)=>{ const a=[o,num(v),C[i]]; o+=num(v); return a; });
  return `<div class="center g5 fc" style="gap:6cqw"><svg viewBox="0 0 100 100">${arcs.map(([o,l,c],i)=>`<circle cx="50" cy="50" r="25" stroke="${c}" pathLength="100" style="stroke-dasharray:0 100;stroke-dashoffset:${-o};animation:m8s .6s ease ${.3+i*.5}s forwards;--l:${l}"/>`).join("")}</svg>
  <div class="fc sm" style="gap:1.6cqw;align-items:flex-start">${it.map(([a,v],i)=>[a,num(v)+'%',C[i]]).map(([a,b,c],i)=>`<span class="a sl" style="${D(1.6,i,.12)}"><i class="ib" style="width:3cqw;height:3cqw;border-radius:1cqw;background:${c};margin-right:2cqw"></i>${a}　<b class="en">${b}</b></span>`).join("")}</div></div>`; } },
{ id:22, pal:"clustr", name:"VS比較", desc:"左右から2つの数字が入ってきて、中央にVS。勝っている側が拡大。", loop:4400,
  css:`.g6 .sx{flex:1;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2cqw}.g6 .vs{position:absolute;width:16cqw;height:16cqw;border-radius:50%;display:grid;place-items:center;font-size:6cqw}.g6 .win{animation:pulse .6s ease 1.6s 2}`,
  props:{ leftLabel:"自力で作る", leftValue:"32", rightLabel:"AIと作る", rightValue:"68", unit:"%" },
  html:p=>`<div class="center g6 fr" style="flex-direction:row"><div class="sx a sl" style="--d:.2s"><span class="sm sb">${p.leftLabel}</span><span class="en" style="font-size:15cqw">${p.leftValue}<small class="sm">${p.unit}</small></span></div>
  <div class="sx bxs a sr" style="--d:.4s"><span class="sm">${p.rightLabel}</span><span class="en win" style="font-size:19cqw;color:var(--acc)">${p.rightValue}<small class="sm">${p.unit}</small></span></div>
  <div class="vs bxa en a zi" style="--d:.9s">VS</div></div>` },
{ id:23, pal:"ibiza", name:"KPIタイル4枚", desc:"2×2のタイルが順に現れ、各数値が同時にカウント。月次報告に。", loop:4600,
  css:`.g7 .gd{display:grid;grid-template-columns:1fr 1fr;gap:3cqw;width:82cqw}.g7 .tl{border-radius:4cqw;padding:5cqw 4cqw;display:flex;flex-direction:column;gap:1cqw}`,
  props:{ title:"9月のまとめ", tiles:[["投稿","48","本"],["保存","3,210","件"],["フォロワー","+820","人"],["問い合わせ","12","件"]] },
  html:p=>`<div class="center g7 fc" style="gap:5cqw"><div class="h2 a fu">${p.title}</div><div class="gd">${p.tiles.slice(0,4).map(([a,b,c],i)=>`<div class="tl ${i==2?'bxa':'bxs'} a pp" style="${D(.3,i,.15)}"><span class="sm" style="opacity:.8">${a}</span><span class="en" style="font-size:9cqw">${b}<small class="sm"> ${c}</small></span></div>`).join("")}</div></div>` },
{ id:24, pal:"cherry", name:"エリアチャート", desc:"塗りつぶしの面グラフが左からワイプで現れる。", loop:4400,
  css:`.g8 svg{width:84cqw}.g8 .wp{animation:g8 1.6s cubic-bezier(.6,0,.3,1) .3s both}@keyframes g8{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}`,
  props:{ title:"アクセス数の推移", legend:["今年","昨年"] },
  html:p=>`<div class="center g8 fc" style="gap:5cqw"><div class="h2 a fu">${p.title}</div><svg viewBox="0 0 100 60"><g class="wp"><path d="M0 60V44C12 40 18 46 28 36S46 30 56 24 74 22 84 12 96 8 100 6V60Z" fill="var(--acc)" opacity=".35"/><path d="M0 44C12 40 18 46 28 36S46 30 56 24 74 22 84 12 96 8 100 6" fill="none" stroke="var(--acc)" stroke-width="2"/><path d="M0 60V52C14 50 22 52 34 46S56 44 66 40 88 36 100 32V60Z" fill="var(--sub)" opacity=".6"/></g><line x1="0" x2="100" y1="60" y2="60" stroke="var(--ink)" stroke-width=".8"/></svg>
  <div class="fr sm" style="gap:5cqw"><span class="ac">● ${p.legend[0]}</span><span class="sb">● ${p.legend[1]}</span></div></div>` },
{ id:25, pal:"mp213", name:"数字スロット", desc:"スロットのリールのように各桁が回転して止まる。", loop:4400,
  css:`.g9 .rl{display:flex;gap:1.6cqw}.g9 .dg{width:15cqw;height:22cqw;border-radius:3cqw;overflow:hidden;font-size:16cqw;line-height:22cqw;text-align:center}.g9 .st{animation:g9 var(--t) cubic-bezier(.2,.8,.2,1) .3s both}@keyframes g9{from{transform:translateY(0)}to{transform:translateY(calc(var(--n) * -22cqw))}}`,
  props:{ label:"今月の新規顧客", value:"1284", note:"人 ありがとうございます" },
  html:p=>`<div class="center g9 fc" style="gap:6cqw"><div class="sm sb a fu">${p.label}</div><div class="rl">${[...String(p.value).replace(/\D/g,"")].map(Number).map((n,i)=>`<div class="dg bxs en"><div class="st" style="--n:${n+20};--t:${1.2+i*.3}s">${Array.from({length:n+21},(_,k)=>`<div>${k%10}</div>`).join("")}</div></div>`).join("")}</div><div class="h3 a fu" style="--d:2.4s">${p.note}</div></div>` },
{ id:26, pal:"zanzibar", name:"積み上げ棒", desc:"棒が下から段ごとに積み上がり、内訳を示す。", loop:4600,
  css:`.g10 .ch{display:flex;gap:5cqw;align-items:flex-end;height:60cqw;border-bottom:.5cqw solid var(--ink)}.g10 .cl{width:12cqw;display:flex;flex-direction:column-reverse}.g10 .cl i{display:block}`,
  props:{ title:"売上の内訳", legend:["制作","保守","講座"] },
  html:p=>`<div class="center g10 fc" style="gap:5cqw"><div class="h2 a fu">${p.title}</div><div class="ch">${[[20,15,8],[26,18,12],[30,22,16],[36,28,22]].map((c,j)=>`<div class="cl">${c.map((h,k)=>`<i class="gy" style="height:${h*.62}cqw;background:${['var(--sub)','var(--surf)','var(--acc)'][k]};${D(.3+j*.12,k,.35)}"></i>`).join("")}</div>`).join("")}</div>
  <div class="fr sm" style="gap:3cqw"><span class="sb">■ ${p.legend[0]}</span><span>■ ${p.legend[1]}</span><span class="ac">■ ${p.legend[2]}</span></div></div>` },
{ id:27, pal:"madeira", name:"数字の書き換え", desc:"古い数字に打ち消し線が入り、新しい数字が飛び込む。値下げ・改善の表現に。", loop:4400,
  css:`.g11 .old{position:relative;font-size:14cqw;opacity:.55}.g11 .old:after{content:"";position:absolute;left:-2cqw;right:-2cqw;top:50%;height:1.4cqw;background:var(--acc);transform-origin:left;animation:growX .4s ease .8s both}`,
  props:{ label:"制作費", before:"¥300,000", after:"¥98,000", note:"AI導入でここまで下がる" },
  html:p=>`<div class="center g11 fc" style="gap:4cqw"><div class="sm sb a fu">${p.label}</div><div class="old en a fi" style="--d:.2s">${p.before}</div><div class="en ac a zi" style="font-size:20cqw;--d:1.3s">${p.after}</div><div class="h3 a fu" style="--d:1.8s">${p.note}</div></div>` },
{ id:28, pal:"lemon", name:"ファネル", desc:"上から順に幅の違う帯が積まれ、歩留まりを可視化。", loop:4600,
  css:`.g12 .fb{height:11cqw;border-radius:2cqw;display:flex;align-items:center;justify-content:space-between;padding:0 4cqw;margin:0 auto}`,
  props:{ title:"集客ファネル", steps:[["表示","10,000"],["プロフィール","2,400"],["サイト訪問","600"],["問い合わせ","48"]] },
  html:p=>`<div class="center g12 fc" style="gap:2cqw;width:100%"><div class="h2 a fu" style="margin-bottom:3cqw">${p.title}</div>${p.steps.slice(0,4).map(([a,b],i)=>[a,b,[90,72,54,36][i]]).map(([a,b,w],i)=>`<div class="fb ${i==3?'bxa':'bxs'} a fx" style="width:${w}cqw;${D(.3,i,.25)}"><span class="sm">${a}</span><span class="en sm">${b}</span></div>`).join("")}</div>` },
{ id:29, pal:"tanzania", name:"散布図", desc:"点が次々と打たれ、最後に傾向線が引かれる。", loop:4600,
  css:`.g13 svg{width:80cqw;overflow:visible}`,
  props:{ title:"投稿数 × 保存数", note:"投稿を増やすほど保存も伸びる" },
  html:p=>`<div class="center g13 fc" style="gap:5cqw"><div class="h2 a fu">${p.title}</div><svg viewBox="0 0 100 80"><path d="M2 0V78H100" fill="none" stroke="var(--ink)" stroke-width=".8"/>
  ${[[10,68],[18,60],[22,64],[30,52],[36,56],[42,44],[50,40],[55,46],[62,32],[70,30],[76,22],[84,18],[92,10],[26,50],[66,38]].map(([x,y],i)=>`<circle class="a pp" style="${D(.3,i,.07)}" cx="${x}" cy="${y}" r="2.4" fill="${i%4?'var(--sub)':'var(--acc)'}"/>`).join("")}
  <line x1="6" y1="70" x2="96" y2="10" stroke="var(--acc)" stroke-width="1.4" stroke-dasharray="100" pathLength="100" class="dw" style="--d:1.5s"/></svg><div class="sm sb a fu" style="--d:2s">${p.note}</div></div>` },
{ id:30, pal:"maldives", name:"年号カウント", desc:"年号が刻々と進み、横のタイムラインが伸びる。沿革・歩みの紹介に。", loop:4400,
  css:`.g14 .tl{width:80cqw;height:.8cqw;background:var(--surf);position:relative}.g14 .tf{position:absolute;inset:0;background:var(--acc);transform-origin:left;animation:growX 1.8s linear .3s both}`,
  props:{ label:"FUN WEB DESIGN の歩み", from:2021, to:2026, fromLabel:"独立", toLabel:"AI制作へ" },
  html:p=>`<div class="center g14 fc" style="gap:5cqw"><div class="sm sb a fu">${p.label}</div><div class="en" style="font-size:26cqw;line-height:1" data-n>${p.from}</div><div class="tl"><div class="tf"></div></div><div class="fr sm" style="justify-content:space-between;width:80cqw"><span>${p.from} ${p.fromLabel}</span><span class="ac a fu" style="--d:2s">${p.to} ${p.toLabel}</span></div></div>`,
  init(el,p){ const a=num(p.from); countUp(el.querySelector("[data-n]"),num(p.to)-a,1800,300,v=>a+v); } },
]);
