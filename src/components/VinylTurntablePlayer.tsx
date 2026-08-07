"use client";
import { useState, useEffect, useRef } from "react";
import { Music2 } from "lucide-react";

export default function VinylTurntablePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Set 1.2x playback speed
    if (audioRef.current) {
      audioRef.current.playbackRate = 1.2;
    }

    const targetSection = document.getElementById("contact");
    if (!targetSection) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          if (!entry.isIntersecting && audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(targetSection);

    return () => {
      observer.disconnect();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!audioRef.current) return;

    audioRef.current.playbackRate = 1.2;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          if (audioRef.current) audioRef.current.playbackRate = 1.2;
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio playback error:", err);
          setIsPlaying(true);
        });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-10 z-50 select-none animate-in fade-in slide-in-from-bottom-5 duration-500">
      
      {/* Real Full 6.7MB MP3 Track (Tame Impala - Borderline) Played at 1.2x Speed */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/borderline.mp3?v=2" type="audio/mpeg" />
      </audio>

      {/* ONE SINGLE COMPACT VINYL CARD ONLY */}
      <div
        onClick={togglePlay}
        className="group bg-[#141413] border border-white/20 p-2.5 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl grain flex items-center gap-3 cursor-pointer hover:border-[#f84525]/70 hover:scale-[1.03] transition-all duration-300 active:scale-95"
        title="Click to play Borderline by Tame Impala at 1.2x speed"
      >
        
        {/* Compact Turntable Base */}
        <div className="relative w-12 h-12 bg-[#0a0a0a] border border-white/20 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
          
          {/* Spinning Vinyl Disc (1.2x Rotation Tempo) */}
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800 border border-zinc-700/80 shadow-inner flex items-center justify-center relative transition-transform duration-1000 ${
              isPlaying ? "animate-spin [animation-duration:2.1s]" : ""
            }`}
          >
            {/* Grooves */}
            <div className="absolute inset-0.5 rounded-full border border-white/10" />
            <div className="absolute inset-1.5 rounded-full border border-white/5" />

            {/* Red Center Label */}
            <div className="w-3.5 h-3.5 rounded-full bg-[#f84525] border border-white/50 flex items-center justify-center shadow-md">
              <div className="w-1 h-1 rounded-full bg-black" />
            </div>
          </div>

          {/* Interactive Tonearm Needle — Swings ONTO disc when playing */}
          <div
            className={`absolute top-0.5 right-0.5 w-4 h-7 pointer-events-none transition-transform duration-700 origin-top-right ${
              isPlaying ? "rotate-[-12deg]" : "rotate-[28deg]"
            }`}
          >
            {/* Silver Arm Bar */}
            <div className="w-0.5 h-6 bg-zinc-300 rounded-full shadow-md ml-auto mr-0.5 border border-zinc-500/50" />
            {/* Red Cartridge Needle Head */}
            <div className="w-2 h-2 bg-[#f84525] rounded-xs shadow-lg border border-white/60 -mt-1 ml-auto" />
          </div>
        </div>

        {/* Compact Track Info */}
        <div className="text-left pr-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-[#1DB954] animate-ping" : "bg-[#f84525]"}`} />
            <span className="font-mono text-[9px] font-bold text-[#f84525] uppercase tracking-widest flex items-center gap-1">
              <Music2 size={10} /> BORDERLINE [1.2x]
            </span>
          </div>
          <p className="font-mono text-[11px] font-bold text-white uppercase tracking-tight leading-none">
            TAME IMPALA
          </p>
          <div className="mt-1">
            <span className="font-mono text-[9px] text-[#1DB954] uppercase tracking-wider font-bold">
              {isPlaying ? "[PLAYING 1.2x • CLICK PAUSE]" : "[CLICK TO PLAY 1.2x]"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
