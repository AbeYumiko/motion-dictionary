"""元の1ファイル版と dictionary.html を、同じ仮想時刻で撮って見比べる。

使い方: .venv/bin/python motion-library/tools/verify.py <元のHTML> [--ids 1-150] [--width 360]
"""
import argparse
import io
import sys
from pathlib import Path

from PIL import Image, ImageChops
from playwright.sync_api import sync_playwright

LIB = Path(__file__).resolve().parent.parent
CLOCK = (LIB / "src/clock.js").read_text()

SETUP = """(w)=>{ const g=document.getElementById('grid'); if(g){ g.style.display='none'; g.innerHTML=''; }
  let st=document.getElementById('__t'); if(!st){ st=document.createElement('div'); st.id='__t'; st.className='stage';
  st.style.cssText='position:fixed;left:0;top:0;z-index:9999;width:'+w+'px'; document.body.appendChild(st);} }"""
MOUNT = """([id, legacy])=>{ const s=SCENES.find(x=>x.id===id), st=document.getElementById('__t');
  window.__reset(); applyPal(st, PALETTES[s.pal]);
  if(legacy){ st.innerHTML=s.html; s.init&&s.init(st); } else mount(st, s);
  window.__clockStart(); return s.loop; }"""


def shots(page, sid, legacy, times):
    loop = page.evaluate(MOUNT, [sid, legacy])
    page.evaluate(f"window.__seek({loop})")           # 1回通して、使う字形のフォントを読み込ませる
    page.evaluate("document.fonts.ready")
    loop = page.evaluate(MOUNT, [sid, legacy])
    out, base = [], page.evaluate("performance.now()")
    for t in times(loop):
        page.evaluate(f"window.__seek({base + t})")
        out.append(Image.open(io.BytesIO(page.locator("#__t").screenshot())).convert("RGB"))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("source", type=Path)
    ap.add_argument("--ids", default="1-150")
    ap.add_argument("--width", type=int, default=360)
    a = ap.parse_args()
    lo, hi = map(int, a.ids.split("-")) if "-" in a.ids else (int(a.ids), int(a.ids))
    times = lambda loop: [150, 500, 1000, 1800, 2800, loop - 100]
    bad = []
    with sync_playwright() as pw:
        br = pw.chromium.launch(channel="chrome", headless=True)
        pages = []
        for url in (a.source.resolve().as_uri(), (LIB / "dictionary.html").as_uri()):
            pg = br.new_page(viewport={"width": 1200, "height": 900})
            pg.add_init_script(CLOCK)
            pg.goto(url + "?capture=1")
            pg.wait_for_load_state("networkidle")
            pg.evaluate(SETUP, a.width)
            pages.append(pg)
        n_old = pages[0].evaluate("SCENES.length"); n_new = pages[1].evaluate("SCENES.length")
        meta_old = pages[0].evaluate("SCENES.map(s=>[s.id,s.cat,s.name,s.pal,s.loop])")
        meta_new = pages[1].evaluate("SCENES.map(s=>[s.id,s.cat,s.name,s.pal,s.loop])")
        print(f"シーン数 元={n_old} 新={n_new}  番号・名前・カテゴリ・色・尺 一致={meta_old == meta_new}")
        h_old = pages[0].evaluate("SCENES.map(s=>s.html)")
        h_new = pages[1].evaluate("SCENES.map(s=>typeof s.html==='function'?s.html(sceneProps(s)):s.html)")
        diff_html = [i + 1 for i, (x, y) in enumerate(zip(h_old, h_new)) if x != y]
        n_props = pages[1].evaluate("SCENES.filter(s=>s.props).length")
        print(f"props あり {n_props} シーン／初期値で組んだHTMLが元と違うシーン: {diff_html or 'なし'}")
        if diff_html:
            bad.extend(diff_html)
        for sid in range(lo, hi + 1):
            A = shots(pages[0], sid, True, times)
            B = shots(pages[1], sid, False, times)
            diffs = []
            for x, y in zip(A, B):
                d = ImageChops.difference(x, y).convert("L").point(lambda v: 255 if v > 24 else 0)
                diffs.append(sum(d.histogram()[255:]))
            if max(diffs) > 0:
                bad.append(sid)
                Image.fromarray  # noqa
                strip = Image.new("RGB", (A[0].width * len(A), A[0].height * 2))
                for i, (x, y) in enumerate(zip(A, B)):
                    strip.paste(x, (i * x.width, 0)); strip.paste(y, (i * x.width, x.height))
                strip.save(LIB / f"tools/diff_{sid:03}.png")
            print(f"#{sid:03} 差のあるピクセル {diffs}", flush=True) if max(diffs) else None
        br.close()
    print("違いのあったシーン:", bad or "なし")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
