#!/usr/bin/env python3
"""Gera slides PNG 1080x1350 para carrosseis do @cadeira_vip.

Uso: python3 make_carousel.py spec.json OUT_DIR
spec.json: {"slides":[{"kind":"cover|tip|cta","kicker":"","title":"","body":""}, ...]}
"""
import json, sys, os
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1350
BG, FG, GOLD, MUTED = (11, 11, 12), (245, 241, 232), (201, 162, 75), (150, 146, 138)
F = "/usr/share/fonts/opentype/inter/Inter-%s.otf"
def font(w, s): return ImageFont.truetype(F % w, s)

def wrap(d, text, fnt, maxw):
    lines, cur = [], ""
    for word in text.split():
        t = (cur + " " + word).strip()
        if d.textlength(t, font=fnt) <= maxw: cur = t
        else: lines.append(cur); cur = word
    if cur: lines.append(cur)
    return lines

def block(d, text, fnt, x, y, maxw, fill, gap=1.22):
    for ln in wrap(d, text, fnt, maxw):
        d.text((x, y), ln, font=fnt, fill=fill)
        y += int(fnt.size * gap)
    return y

def frame(i, n):
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    d.rectangle([60, 60, W - 60, H - 60], outline=(38, 36, 32), width=2)
    d.text((100, 100), "CADEIRAVIP", font=font("Bold", 28), fill=GOLD)
    d.text((W - 100, 100), f"{i}/{n}", font=font("Medium", 28), fill=MUTED, anchor="ra")
    d.text((100, H - 130), "@cadeira_vip", font=font("Medium", 28), fill=MUTED)
    if i < n:
        d.text((W - 100, H - 130), "arrasta  →", font=font("Medium", 28), fill=GOLD, anchor="ra")
    return im, d

def main(spec_path, out):
    slides = json.load(open(spec_path, encoding="utf-8"))["slides"]
    os.makedirs(out, exist_ok=True)
    n = len(slides)
    for i, s in enumerate(slides, 1):
        im, d = frame(i, n)
        x, maxw = 100, W - 200
        if s["kind"] == "cover":
            d.rectangle([100, 420, 220, 428], fill=GOLD)
            y = block(d, s["title"], font("ExtraBold", 92), x, 470, maxw, FG, 1.12)
            block(d, s.get("body", ""), font("Regular", 42), x, y + 50, maxw, MUTED)
        elif s["kind"] == "tip":
            d.text((x, 330), s.get("kicker", ""), font=font("ExtraBold", 190), fill=GOLD)
            y = block(d, s["title"], font("ExtraBold", 78), x, 600, maxw, FG, 1.12)
            block(d, s["body"], font("Regular", 44), x, y + 40, maxw, MUTED, 1.35)
        else:  # cta
            d.rectangle([100, 420, 220, 428], fill=GOLD)
            y = block(d, s["title"], font("ExtraBold", 84), x, 470, maxw, FG, 1.12)
            y = block(d, s.get("body", ""), font("Regular", 42), x, y + 40, maxw, MUTED, 1.35)
            d.rounded_rectangle([100, y + 60, 100 + 640, y + 160], radius=50, fill=GOLD)
            d.text((100 + 320, y + 110), s.get("button", "cadeiravip.com.br"),
                   font=font("Bold", 40), fill=BG, anchor="mm")
        im.save(os.path.join(out, f"slide-{i}.png"), optimize=True)
    print(f"{n} slides em {out}")

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
