"""motion-catalog.md と src/scenes の食い違いを調べる（シーンを足したあとに実行）。

使い方: .venv/bin/python motion-library/tools/check_catalog.py
  ・辞典にあるのに一覧に無い番号　・一覧の名前／カテゴリ／props／尺が辞典と違う行　を出す
"""
import re
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

LIB = Path(__file__).resolve().parent.parent


def scenes():
    with sync_playwright() as pw:
        br = pw.chromium.launch(channel="chrome", headless=True)
        pg = br.new_page()
        pg.goto((LIB / "render.html").as_uri() + "?id=1")
        r = pg.evaluate("SCENES.map(s=>({id:s.id,cat:s.cat,name:s.name,loop:s.loop,props:s.props?Object.keys(s.props):[]}))")
        br.close()
    return r


def main():
    rows = {}
    for ln in (LIB / "motion-catalog.md").read_text().splitlines():
        m = re.match(r"^\| (\d{3}) \| ([^|]+) \| ([^|]+) \| [^|]+ \| ([^|]+) \| ([\d.]+)秒 \|", ln)
        if m:
            rows[int(m.group(1))] = [x.strip() for x in m.groups()[1:]]
    bad = 0
    for s in scenes():
        r = rows.get(s["id"])
        if not r:
            print(f"#{s['id']:03} {s['name']}: 一覧にありません"); bad += 1; continue
        props = "、".join(f"`{p}`" for p in s["props"]) or "未対応"
        want = [s["cat"], s["name"], props, f"{s['loop'] / 1000:g}"]
        for label, a, b in zip(["カテゴリ", "シーン名", "差し替え", "尺"], r, want):
            if a != b:
                print(f"#{s['id']:03} {label}: 一覧「{a}」／辞典「{b}」"); bad += 1
    print("食い違いなし" if not bad else f"{bad} 件の食い違い")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
