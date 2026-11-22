"""Recorta pessoa + cão (remove o fundo) e salva PNG com alpha.

uso: python -I cutout.py <entrada.jpg> <saida.png> [modelo]
"""
import sys
from rembg import new_session, remove
from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
model = sys.argv[3] if len(sys.argv) > 3 else "birefnet-general-lite"

session = new_session(model)
img = Image.open(src).convert("RGB")
out = remove(
    img,
    session=session,
    alpha_matting=True,
    alpha_matting_foreground_threshold=240,
    alpha_matting_background_threshold=12,
    alpha_matting_erode_size=8,
)
out.save(dst)
print("ok", out.size, model)
