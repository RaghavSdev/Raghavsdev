"use client";
import { useEffect, useState } from "react";

export default function PagePreloader({ onComplete }: { onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const [isHiding, setIsHiding] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 14) + 6;
      if (current >= 100) {
        current = 100;
        setCount(100);
        clearInterval(interval);

        setTimeout(() => {
          setIsHiding(true);
          if (onComplete) onComplete();
          setTimeout(() => setIsRemoved(true), 900);
        }, 300);
      } else {
        setCount(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#111111] flex flex-col justify-between p-8 sm:p-12 transition-transform duration-900 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isHiding ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Preloader Header */}
      <div className="flex items-center justify-between font-mono text-xs text-zinc-500 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#f84525] rounded-full animate-ping" />
          <span className="text-white font-bold">RAGHAV S // @RaghavSdev</span>
        </div>
        <div>AI &amp; ML ENGINEER // PORTFOLIO</div>
      </div>

      {/* Center Counter */}
      <div className="my-auto text-center">
        <div className="font-mono text-[clamp(4.5rem,16vw,13rem)] font-black text-white leading-none tracking-tighter">
          {count.toString().padStart(3, "0")}
          <span className="text-[#f84525] text-[0.4em]">%</span>
        </div>
        <p className="font-mono text-xs sm:text-sm text-zinc-500 uppercase tracking-[0.3em] mt-4">
          PREDICTIVE MODELING &amp; FULL STACK DEVELOPMENT
        </p>
      </div>

      {/* Bottom Progress Line */}
      <div className="w-full">
        <div className="h-1 w-full bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-[#f84525] transition-all duration-150 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-3 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
          <span>CUSTOM DESIGN ENGINE</span>
          <span>SYSTEM READY</span>
        </div>
      </div>
    </div>
  );
}
