"use client";
import { useEffect, useRef, useCallback } from "react";

interface BackgroundStar {
  x: number; y: number;
  size: number; baseOpacity: number;
  twinkleSpeed: number; twinkleOffset: number;
}

interface ConstellationDef {
  sectionId: string;
  label: string;
  color: string;
  stars: { x: number; y: number }[];
  lines: [number, number][];
}

// Constellations mapped to sections with flame palette
const CONSTELLATIONS: ConstellationDef[] = [
  {
    sectionId: "hero",
    label: "01 / ORIGIN",
    color: "#f84525",
    stars: [
      { x: 0.82, y: 0.12 },
      { x: 0.88, y: 0.06 },
      { x: 0.94, y: 0.15 },
      { x: 0.90, y: 0.25 },
      { x: 0.78, y: 0.22 },
      { x: 0.85, y: 0.32 },
    ],
    lines: [[0,1],[1,2],[2,3],[3,5],[5,4],[4,0],[0,3]],
  },
  {
    sectionId: "about",
    label: "02 / STORY",
    color: "#ff7a59",
    stars: [
      { x: 0.06, y: 0.36 },
      { x: 0.14, y: 0.28 },
      { x: 0.22, y: 0.34 },
      { x: 0.11, y: 0.48 },
      { x: 0.20, y: 0.44 },
      { x: 0.28, y: 0.27 },
    ],
    lines: [[0,1],[1,2],[2,5],[5,2],[1,3],[3,4],[4,2]],
  },
  {
    sectionId: "projects",
    label: "03 / CREATIONS",
    color: "#f84525",
    stars: [
      { x: 0.84, y: 0.50 },
      { x: 0.91, y: 0.43 },
      { x: 0.89, y: 0.57 },
      { x: 0.78, y: 0.62 },
      { x: 0.76, y: 0.52 },
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,0],[0,2]],
  },
  {
    sectionId: "experience",
    label: "04 / MILESTONES",
    color: "#ffaa00",
    stars: [
      { x: 0.09, y: 0.68 },
      { x: 0.17, y: 0.61 },
      { x: 0.26, y: 0.69 },
      { x: 0.13, y: 0.78 },
      { x: 0.22, y: 0.74 },
      { x: 0.30, y: 0.63 },
    ],
    lines: [[0,1],[1,2],[2,5],[1,3],[3,4],[4,2]],
  },
  {
    sectionId: "contact",
    label: "05 / CONNECT",
    color: "#f84525",
    stars: [
      { x: 0.79, y: 0.82 },
      { x: 0.87, y: 0.77 },
      { x: 0.93, y: 0.85 },
      { x: 0.86, y: 0.93 },
      { x: 0.78, y: 0.90 },
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,0],[1,3]],
  },
];

export default function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgStarsRef = useRef<BackgroundStar[]>([]);
  const activeRef = useRef<Set<string>>(new Set());
  const progressRef = useRef<Record<string, number>>({});
  const rafRef = useRef<number>(0);

  const initBgStars = useCallback((w: number, h: number) => {
    const stars: BackgroundStar[] = [];
    const count = Math.floor((w * h) / 9000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.2 + 0.2,
        baseOpacity: Math.random() * 0.35 + 0.05,
        twinkleSpeed: Math.random() * 0.8 + 0.3,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
    bgStarsRef.current = stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBgStars(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const observers: IntersectionObserver[] = [];
    CONSTELLATIONS.forEach((c) => {
      const el = document.getElementById(c.sectionId);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            activeRef.current.add(c.sectionId);
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    const draw = (time: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Background stars
      bgStarsRef.current.forEach((s) => {
        const twinkle = Math.sin(time * 0.001 * s.twinkleSpeed + s.twinkleOffset) * 0.25;
        const opacity = Math.max(0, s.baseOpacity + twinkle);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      // Constellation lines + nodes
      CONSTELLATIONS.forEach((c) => {
        const active = activeRef.current.has(c.sectionId);
        const target = active ? 1 : 0;
        const prev = progressRef.current[c.sectionId] ?? 0;
        const progress = prev + (target - prev) * 0.025;
        progressRef.current[c.sectionId] = progress;

        if (progress < 0.01) return;

        const resolvedStars = c.stars.map((s) => ({
          px: s.x * w,
          py: s.y * h,
        }));

        const totalLines = c.lines.length;
        const linesDrawn = progress * totalLines;

        c.lines.forEach(([from, to], idx) => {
          const lineProgress = Math.max(0, Math.min(1, linesDrawn - idx));
          if (lineProgress <= 0) return;

          const p1 = resolvedStars[from];
          const p2 = resolvedStars[to];
          const endX = p1.px + (p2.px - p1.px) * lineProgress;
          const endY = p1.py + (p2.py - p1.py) * lineProgress;

          ctx.save();
          ctx.shadowBlur = 8;
          ctx.shadowColor = c.color;
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = `${c.color}${Math.round(progress * 60).toString(16).padStart(2, "0")}`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.restore();
        });

        resolvedStars.forEach((s, i) => {
          const starProgress = Math.min(1, Math.max(0, (progress * resolvedStars.length - i) * 2));
          if (starProgress <= 0) return;

          const pulse = Math.sin(time * 0.002 + i * 1.2) * 0.3 + 0.7;
          const radius = (1.5 + starProgress * 2) * pulse;

          const grd = ctx.createRadialGradient(s.px, s.py, 0, s.px, s.py, radius * 4);
          grd.addColorStop(0, `${c.color}${Math.round(starProgress * 80).toString(16).padStart(2, "0")}`);
          grd.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(s.px, s.py, radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(s.px, s.py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${starProgress * pulse})`;
          ctx.fill();
        });

        if (progress > 0.85) {
          const labelStar = resolvedStars[0];
          ctx.font = `600 10px "JetBrains Mono", monospace`;
          ctx.fillStyle = `${c.color}${Math.round((progress - 0.85) * 6.6 * 90).toString(16).padStart(2, "0")}`;
          ctx.fillText(c.label, labelStar.px + 10, labelStar.py - 8);
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      observers.forEach((o) => o.disconnect());
    };
  }, [initBgStars]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.65 }}
    />
  );
}
