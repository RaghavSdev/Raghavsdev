"use client";
import { useState } from "react";
import { Play, Pause, Music2, ExternalLink, Disc } from "lucide-react";

export default function SpotifyPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full bg-[#141414] border border-white/10 p-5 relative overflow-hidden grain shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
      
      {/* Background Subtle Equalizer Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#1DB954]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 font-mono text-[11px] text-[#1DB954] uppercase tracking-widest font-bold">
          <Music2 size={14} className="animate-pulse" />
          <span>CURRENTLY PLAYING // FAVORITE TRACK</span>
        </div>
        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
          SPOTIFY PLAYER
        </span>
      </div>

      {/* Main Track Card Layout */}
      <div className="flex items-center gap-4">
        
        {/* Album Artwork with Spinning Disc Effect */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-zinc-900 border border-white/15 flex-shrink-0 flex items-center justify-center overflow-hidden group">
          {/* Simulated Artwork Cover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#111111] via-[#2a0e08] to-[#f84525]/40 flex flex-col justify-end p-2">
            <span className="font-mono text-[9px] font-bold text-white uppercase tracking-tighter leading-none">
              DRACULA
            </span>
            <span className="font-mono text-[8px] text-[#f84525] uppercase tracking-widest">
              IMPALLA
            </span>
          </div>

          {/* Disc Overlay */}
          <Disc
            size={36}
            className={`text-white/30 absolute transition-transform duration-1000 ${
              isPlaying ? "animate-spin" : ""
            }`}
          />

          {/* Play Overlay Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
            aria-label="Toggle Play"
          >
            {isPlaying ? <Pause size={22} className="text-[#1DB954]" /> : <Play size={22} className="text-[#1DB954] fill-[#1DB954]" />}
          </button>
        </div>

        {/* Track Metadata & Equalizer */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-mono text-base font-bold text-white truncate uppercase tracking-tight">
              DRACULA
            </h4>
            <a
              href="https://open.spotify.com/search/Dracula%20Impala"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-[#1DB954] transition-colors p-1"
              title="Open on Spotify"
            >
              <ExternalLink size={14} />
            </a>
          </div>
          <p className="font-mono text-xs text-[#f84525] uppercase tracking-wider mb-2">
            IMPALLA // TAME IMPALA REMIX
          </p>

          {/* Animated Equalizer Waveform */}
          <div className="flex items-end gap-1 h-4 pt-1">
            {[40, 75, 30, 90, 50, 100, 60, 35, 80, 45, 65, 30].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-[#1DB954] transition-all duration-300 rounded-t-sm"
                style={{
                  height: isPlaying ? `${Math.max(15, (h * Math.random()).toFixed(0))}%` : "30%",
                  opacity: isPlaying ? 1 : 0.4,
                }}
              />
            ))}
          </div>
        </div>

        {/* Play/Pause Control Circle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-11 h-11 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center font-bold shadow-[0_5px_15px_rgba(29,185,84,0.4)] hover:scale-105 transition-all flex-shrink-0"
          aria-label={isPlaying ? "Pause track" : "Play track"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-black translate-x-0.5" />}
        </button>

      </div>

      {/* Spotify Embed Iframe (Hidden / Audio Player Target) */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-zinc-500">
        <span>STATUS: {isPlaying ? "PLAYING AUDIO WAVE" : "PAUSED // READY"}</span>
        <a
          href="https://open.spotify.com/search/Dracula%20Impala"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1DB954] hover:underline flex items-center gap-1"
        >
          <span>LISTEN ON SPOTIFY</span>
          <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}
