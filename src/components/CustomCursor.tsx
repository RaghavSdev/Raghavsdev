"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on non-touch screens
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let isMouseDown = false;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Instant dot placement for zero lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(${isMouseDown ? 0.6 : isHovered ? 0.4 : 1})`;
      }
    };

    const onMouseDown = () => {
      isMouseDown = true;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(0.6)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(0.7)`;
      }
      // Create click shockwave ripple
      createRipple(mouseX, mouseY);
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = !!target.closest('a, button, input, textarea, [role="button"], .interactive-hover, .premium-card');
      isHovered = interactive;
    };

    const createRipple = (x: number, y: number) => {
      const ripple = document.createElement("div");
      ripple.className = "cursor-ripple";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    // Smooth 60fps loop for follower ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.22; // Buttery smooth lerp
      ringY += (mouseY - ringY) * 0.22;

      if (ringRef.current) {
        const scale = isMouseDown ? 0.8 : isHovered ? 1.8 : 1;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
        ringRef.current.style.borderColor = isHovered ? "rgba(248, 69, 37, 0.9)" : "rgba(248, 69, 37, 0.35)";
        ringRef.current.style.backgroundColor = isHovered ? "rgba(248, 69, 37, 0.12)" : "transparent";
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {/* Instant inner dot - Zero latency */}
        <div
          ref={dotRef}
          className="fixed top-0 left-0 w-3 h-3 bg-[#f84525] rounded-full -mt-1.5 -ml-1.5 shadow-[0_0_12px_#f84525] transition-transform duration-75 ease-out"
          style={{ willChange: "transform" }}
        />

        {/* Smooth lerp outer ring */}
        <div
          ref={ringRef}
          className="fixed top-0 left-0 w-9 h-9 border-2 border-[#f84525]/40 rounded-full -mt-4.5 -ml-4.5 transition-colors duration-200 ease-out"
          style={{ willChange: "transform" }}
        />
      </div>
    </>
  );
}
