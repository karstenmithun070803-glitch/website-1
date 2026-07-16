import { gsap } from "@/lib/gsap";

function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = { angle: number; radius: number; speed: number };
type Layer = { points: Pt[]; color: string; delay: number };

function makeLayers(seed: number, maxR: number): Layer[] {
  const rng = mulberry32(seed);
  const colors = [
    "rgba(170, 122, 78, 0.88)",
    "rgba(196, 149, 106, 0.94)",
    "rgba(212, 165, 116, 0.82)",
  ];

  return colors.map((color, li) => {
    const n = 26 + Math.floor(rng() * 10);
    const points: Pt[] = [];

    for (let i = 0; i < n; i++) {
      points.push({
        angle: (i / n) * Math.PI * 2 + (rng() - 0.5) * 0.14,
        radius: maxR * (0.85 + rng() * 0.3),
        speed: 0.78 + rng() * 0.44,
      });
    }

    const tc = 3 + Math.floor(rng() * 3);
    for (let t = 0; t < tc; t++) {
      const idx = Math.floor(rng() * n);
      points[idx].radius *= 1.25 + rng() * 0.35;
      points[idx].speed *= 1.15 + rng() * 0.25;
      const prev = (idx - 1 + n) % n;
      const next = (idx + 1) % n;
      points[prev].radius *= 1.1 + rng() * 0.1;
      points[next].radius *= 1.1 + rng() * 0.1;
    }

    return { points, color, delay: li * 0.06 };
  });
}

function drawBlob(
  ctx: CanvasRenderingContext2D,
  layer: Layer,
  p: number,
  cx: number,
  cy: number,
) {
  if (p <= 0) return;
  const { points, color } = layer;
  const n = points.length;

  const coords = points.map((pt) => {
    const t = Math.min(1, p * pt.speed);
    const e = 1 - (1 - t) ** 2.8;
    const r = pt.radius * e;
    return { x: cx + Math.cos(pt.angle) * r, y: cy + Math.sin(pt.angle) * r };
  });

  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const c0 = coords[(i - 1 + n) % n];
    const c1 = coords[i];
    const c2 = coords[(i + 1) % n];
    const c3 = coords[(i + 2) % n];
    if (i === 0) ctx.moveTo(c1.x, c1.y);
    const k = 0.38;
    ctx.bezierCurveTo(
      c1.x + ((c2.x - c0.x) * k) / 3,
      c1.y + ((c2.y - c0.y) * k) / 3,
      c2.x - ((c3.x - c1.x) * k) / 3,
      c2.y - ((c3.y - c1.y) * k) / 3,
      c2.x,
      c2.y,
    );
  }
  ctx.closePath();
  ctx.shadowColor = color;
  ctx.shadowBlur = 14;
  ctx.fillStyle = color;
  ctx.fill();
  ctx.shadowBlur = 0;
}

function drawDroplets(
  ctx: CanvasRenderingContext2D,
  seed: number,
  p: number,
  cx: number,
  cy: number,
  maxR: number,
) {
  if (p < 0.1) return;
  const rng = mulberry32(seed);
  for (let i = 0; i < 16; i++) {
    const angle = rng() * Math.PI * 2;
    const appear = 0.08 + rng() * 0.28;
    const distFactor = 0.5 + rng() * 0.6;
    const sizeFactor = 0.005 + rng() * 0.02;
    const rxStretch = 0.65 + rng() * 0.7;
    const ryStretch = 0.65 + rng() * 0.7;
    const rot = rng() * Math.PI;
    if (p < appear) continue;
    const lp = Math.min(1, (p - appear) / (1 - appear));
    const dist = maxR * distFactor * (1 - (1 - lp) ** 2);
    const size = maxR * sizeFactor * Math.min(1, lp * 3);
    const a =
      Math.min(0.7, lp * 2.5) * Math.max(0, 1 - Math.max(0, lp - 0.55) / 0.45);
    if (a < 0.02) continue;
    ctx.beginPath();
    ctx.ellipse(
      cx + Math.cos(angle) * dist,
      cy + Math.sin(angle) * dist,
      size * rxStretch,
      size * ryStretch,
      rot,
      0,
      Math.PI * 2,
    );
    ctx.fillStyle = `rgba(196, 149, 106, ${a})`;
    ctx.fill();
  }
}

export function playPaintSplash(
  canvas: HTMLCanvasElement,
  onBgHide: () => void,
  onDone: () => void,
): gsap.core.Timeline {
  const ctx = canvas.getContext("2d")!;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const w = canvas.clientWidth || innerWidth;
  const h = canvas.clientHeight || innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.hypot(cx, cy) * 1.3;
  const seed = ((Date.now() * 7 + 13) | 0) % 100000;
  const layers = makeLayers(seed, maxR);
  const dSeed = seed + 4000;

  const s = { expand: 0, dissolve: 0 };

  function render() {
    ctx.clearRect(0, 0, w, h);
    drawDroplets(ctx, dSeed, s.expand, cx, cy, maxR);
    for (const l of layers) {
      const raw = Math.max(0, s.expand - l.delay) / (1 - l.delay);
      drawBlob(ctx, l, Math.min(1, raw), cx, cy);
    }
    if (s.dissolve > 0) {
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      const dr = maxR * 1.35 * s.dissolve;
      const g = ctx.createRadialGradient(
        cx,
        cy,
        dr * 0.2 * s.dissolve,
        cx,
        cy,
        dr,
      );
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(0.5, `rgba(0,0,0,${0.6 * s.dissolve})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }
  }

  const tl = gsap.timeline({ onComplete: onDone });
  tl.to(s, {
    expand: 1,
    duration: 0.78,
    ease: "power2.out",
    onUpdate: render,
  });
  tl.call(onBgHide, [], 0.5);
  tl.to(
    s,
    {
      dissolve: 1,
      duration: 0.55,
      ease: "power2.inOut",
      onUpdate: render,
    },
    "-=0.12",
  );
  return tl;
}
