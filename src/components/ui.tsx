"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const COUNT = 60;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 212, ${p.opacity})`;
        ctx.fill();
      });

      // draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 245, 212, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full", className)}
    />
  );
}

export function GlowOrb({
  className,
  color = "cyan",
}: {
  className?: string;
  color?: "cyan" | "violet";
}) {
  return (
    <div
      className={cn(
        "absolute rounded-full blur-[100px] pointer-events-none",
        color === "cyan"
          ? "bg-[rgba(0,245,212,0.18)]"
          : "bg-[rgba(124,58,237,0.22)]",
        className
      )}
    />
  );
}

export function StatusBadge({
  children,
  pulse = true,
  color = "green",
}: {
  children: React.ReactNode;
  pulse?: boolean;
  color?: "green" | "cyan";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border",
        color === "green"
          ? "bg-green-500/10 border-green-500/20 text-green-400"
          : "bg-cyan-400/10 border-cyan-400/25 text-cyan-400"
      )}
    >
      {pulse && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            color === "green"
              ? "bg-green-400 animate-pulse"
              : "bg-cyan-400 animate-pulse"
          )}
        />
      )}
      {children}
    </span>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-8 h-[2px] bg-cyan-400 rounded-full" />
      <span className="font-mono text-xs font-bold tracking-[0.18em] uppercase text-cyan-400">
        {children}
      </span>
    </div>
  );
}

export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm",
        hover &&
          "transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400/40 hover:shadow-[0_20px_60px_rgba(0,245,212,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold font-mono bg-violet-500/15 text-violet-300 border border-violet-500/25">
      {children}
    </span>
  );
}

export function IconButton({
  href,
  children,
  variant = "default",
  id,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "github";
  id?: string;
}) {
  return (
    <a
      href={href}
      id={id}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150",
        variant === "default"
          ? "bg-white/4 border-white/8 text-slate-400 hover:bg-cyan-400/12 hover:border-cyan-400 hover:text-cyan-400"
          : "bg-white/4 border-white/8 text-slate-400 hover:bg-violet-500/15 hover:border-violet-500/50 hover:text-violet-300"
      )}
    >
      {children}
    </a>
  );
}

export function SkillTag({
  children,
  category,
}: {
  children: React.ReactNode;
  category?: "frontend" | "backend" | "devops" | "learning";
}) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/4 border border-white/8 text-sm font-medium text-slate-300 cursor-default transition-all duration-150 hover:bg-cyan-400/12 hover:border-cyan-400 hover:text-cyan-400 hover:-translate-y-0.5">
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
      {children}
    </span>
  );
}

export function TimelineDot() {
  return (
    <div className="flex flex-col items-center flex-shrink-0 w-10">
      <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 border-[3px] border-[#0a1628] shadow-[0_0_0_2px_#00f5d4] mt-1 flex-shrink-0" />
      <div className="w-0.5 bg-white/8 flex-1 mt-1" />
    </div>
  );
}

export function MetricCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <Card className="p-6">
      <div className="font-mono text-3xl font-black text-cyan-400 leading-none mb-1.5">
        {value}
      </div>
      <div className="text-sm text-slate-400 leading-snug">{label}</div>
    </Card>
  );
}

export function NavLink({
  href,
  children,
  id,
}: {
  href: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <a
      href={href}
      id={id}
      className="px-3.5 py-1.5 rounded-full text-sm font-medium text-slate-400 transition-all duration-150 hover:text-slate-100 hover:bg-white/6"
    >
      {children}
    </a>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  id,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  id?: string;
}) {
  return (
    <a
      href={href}
      id={id}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 hover:-translate-y-0.5",
        variant === "primary"
          ? "bg-cyan-400 text-[#050b18] hover:shadow-[0_8px_30px_rgba(0,245,212,0.35)]"
          : "bg-transparent border border-white/15 text-slate-100 hover:border-cyan-400 hover:text-cyan-400"
      )}
    >
      {children}
    </a>
  );
}
