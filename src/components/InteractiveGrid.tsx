"use client";
import { useState } from "react";

interface GridSquare {
  id: number;
}

export default function InteractiveGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Generate 48 interactive grid tiles (6 rows x 8 cols)
  const squares = Array.from({ length: 48 }, (_, i) => ({ id: i }));

  return (
    <div className="w-full bg-[#181716] border border-white/10 p-6 relative overflow-hidden grain">
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono text-xs text-[#f84525] uppercase tracking-widest font-bold flex items-center gap-2">
          <span className="w-2 h-2 bg-[#f84525] rounded-full animate-ping" />
          <span>INTERACTIVE NEON MATRIX</span>
        </div>
        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
          HOVER TILES TO LIGHT UP
        </span>
      </div>

      <div className="grid grid-cols-6 sm:grid-cols-8 gap-2.5">
        {squares.map((sq) => (
          <div
            key={sq.id}
            onMouseEnter={() => setHoveredId(sq.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`aspect-square border transition-all duration-500 rounded-sm cursor-pointer relative overflow-hidden ${
              hoveredId === sq.id
                ? "bg-[#f84525] border-[#ff6a4d] shadow-[0_0_25px_rgba(248,69,37,0.9)] scale-110 z-10 duration-75"
                : "bg-white/5 border-white/10 hover:border-white/30"
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br from-white/20 to-transparent transition-opacity duration-300 ${
                hoveredId === sq.id ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
