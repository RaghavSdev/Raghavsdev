"use client";
import { useEffect, useRef } from "react";

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  id?: string;
}) {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    btn.style.transition = "none";
    btn.style.transform = `translate3d(${(x * 0.3).toFixed(2)}px, ${(y * 0.3).toFixed(2)}px, 0)`;
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
    btn.style.transform = "translate3d(0, 0, 0)";
  };

  const Component = href ? "a" : "button";

  return (
    <Component
      ref={btnRef as any}
      href={href}
      onClick={onClick}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </Component>
  );
}

export function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    // Instant synchronous 120fps tracking with zero delay while mouse moves
    card.style.transition = "none";
    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    // Smooth spring back when mouse leaves card
    card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card will-change-transform [transform-style:preserve-3d] [backface-visibility:hidden] ${className}`}
    >
      {children}
    </div>
  );
}

export function FloatingSparkles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="sparkle sparkle-1" />
      <div className="sparkle sparkle-2" />
      <div className="sparkle sparkle-3" />
      <div className="sparkle sparkle-4" />
    </div>
  );
}
