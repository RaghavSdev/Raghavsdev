"use client";
import { useState, useRef } from "react";
import { Music, Volume2, VolumeX, ExternalLink, Play, Pause } from "lucide-react";

export default function SpotifyAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Audio play blocked:", err));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#161514]/90 border border-white/15 p-6 relative overflow-hidden grain shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#1DB954]/15 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 font-mono text-xs text-[#1DB954] font-bold uppercase tracking-widest">
          <Music size={14} className={isPlaying ? "animate-bounce" : ""} />
          <span>SPOTIFY MUSIC PLAYER</span>
        </div>
        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
          DRACULA // IMPALA
        </span>
      </div>

      {/* Spotify Embed Widget */}
      <div className="rounded-lg overflow-hidden border border-white/10 mb-4 bg-black">
        <iframe
          src="https://open.spotify.com/embed/track/6rqhFgbbK8N1Rz0WnW6XoB?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-lg"
          title="Spotify Dracula Track"
        />
      </div>

      {/* Backup Direct Sound Stream */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=cyberpunk-2099-10701.mp3"
        loop
        preload="auto"
      />

      {/* Controls Bar */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={toggleAudio}
          className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-black font-mono text-xs font-bold uppercase tracking-widest transition-all rounded-full"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-black" />}
          <span>{isPlaying ? "PAUSE AUDIO" : "PLAY SOUND STREAM"}</span>
        </button>

        <button
          onClick={toggleMute}
          className="p-2 text-zinc-400 hover:text-white transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-[#1DB954]" />}
        </button>

        <a
          href="https://open.spotify.com/search/Dracula%20Impala"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-zinc-400 hover:text-[#1DB954] flex items-center gap-1 uppercase tracking-wider"
        >
          <span>SPOTIFY APP</span>
          <ExternalLink size={12} />
        </a>
      </div>

    </div>
  );
}
