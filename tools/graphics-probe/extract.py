"""Wegwerf-Spike: Foto -> Einzelfiguren (Tusche-Maske als PNG). Boxen in Anzeige-Koordinaten (2000x1500), Faktor 2.016 aufs Original."""
import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter

SRC = "art/vorlagen/FirstDraftSomeSketchesSTRIKE.jpeg"
OUT = "art/probe/"
F = 4032 / 2000
BOXES = {  # name: (x0, y0, x1, y1) im 2000px-Anzeigebild
    "crawler1": (170, 245, 300, 490), "crawler2": (430, 280, 600, 520),
    "crawler3": (705, 320, 860, 520), "crawler4": (915, 335, 1030, 455),
    "geist": (225, 910, 440, 1085), "kopfpanzer": (520, 915, 710, 1095),
    "check": (845, 905, 1095, 1115), "krieger": (1225, 915, 1350, 1075),
    "baum": (1445, 875, 1530, 1015), "pferd": (1035, 1140, 1250, 1330),
    "datacontainer": (1590, 1090, 1990, 1370),
}

def ink_mask(img):
    g = np.asarray(img.convert("L"), dtype=np.float32)
    bg = gaussian_filter(g, 40)            # Papier/Schatten schätzen
    d = np.clip(bg - g, 0, None) / np.maximum(bg, 1)
    return d > 0.35                        # ponytail: fester Schwellwert (Foto ist bimodal), adaptiv wenn Scans schlechter werden

if __name__ == "__main__":
    im = Image.open(SRC)
    for n, b in BOXES.items():
        c = im.crop(tuple(int(v * F) for v in b))
        m = ink_mask(c)
        Image.fromarray(np.where(m, 0, 255).astype(np.uint8)).save(f"{OUT}{n}_ink.png")
        print(n, c.size, f"{m.mean():.3f}")
