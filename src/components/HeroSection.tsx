"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Terminal, Sparkles, FileText, Eye } from "lucide-react";
import { MagneticButton, FloatingSparkles } from "./Effects";
import ResumeModal from "./ResumeModal";

const ROLES = [
  "B.Sc AI & ML Student",
  "Predictive Modeling Engineer",
  "Generative AI & RAG Developer",
  "React & Spring Boot Architect",
  "AWS Cloud Specialist",
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [startTextAnim, setStartTextAnim] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const roleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Trigger hero text slide-up animation
    const timer = setTimeout(() => setStartTextAnim(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Typewriter loop logic
    let currentText = "";
    let isDeleting = false;
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const targetRole = ROLES[roleIndex];

    const type = () => {
      if (!roleRef.current) return;

      if (!isDeleting && charIndex <= targetRole.length) {
        currentText = targetRole.substring(0, charIndex);
        charIndex++;
        roleRef.current.textContent = currentText;
        timeoutId = setTimeout(type, 80);
      } else if (isDeleting && charIndex >= 0) {
        currentText = targetRole.substring(0, charIndex);
        charIndex--;
        roleRef.current.textContent = currentText;
        timeoutId = setTimeout(type, 40);
      } else if (!isDeleting && charIndex > targetRole.length) {
        timeoutId = setTimeout(() => {
          isDeleting = true;
          type();
        }, 1800);
      } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    };

    type();

    return () => clearTimeout(timeoutId);
  }, [roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden grain"
    >
      {/* Sparkles background effect */}
      <FloatingSparkles />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Radial Flame Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f84525]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 w-full">
        
        {/* Top Status Badge */}
        <div
          className={`inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 transition-all duration-700 ${
            startTextAnim ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#f84525] animate-ping" />
          <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-semibold">
            AVAILABLE FOR AI/ML &amp; FULL STACK ROLES
          </span>
        </div>

        {/* Kinetic Line Mask Headline */}
        <h1 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.94] tracking-tight mb-8 uppercase text-white">
          {/* Line 1 */}
          <div className="overflow-hidden">
            <span
              className={`block transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                startTextAnim ? "translate-y-0" : "translate-y-[115%]"
              }`}
            >
              BUILDING <span className="text-[#f84525]">INTELLIGENT</span>
            </span>
          </div>

          {/* Line 2 */}
          <div className="overflow-hidden">
            <span
              className={`block transition-transform duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                startTextAnim ? "translate-y-0" : "translate-y-[115%]"
              }`}
            >
              AI MODELS &amp; SCALING
            </span>
          </div>

          {/* Line 3 */}
          <div className="overflow-hidden">
            <span
              className={`block transition-transform duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] text-gradient-flame ${
                startTextAnim ? "translate-y-0" : "translate-y-[115%]"
              }`}
            >
              FUTURE SYSTEMS.
            </span>
          </div>
        </h1>

        {/* Typewriter role bar */}
        <div
          className={`font-mono text-sm sm:text-base text-zinc-400 mb-8 h-8 flex items-center gap-3 border-l-2 border-[#f84525] pl-4 transition-all duration-700 delay-500 ${
            startTextAnim ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-[#f84525] font-bold">&gt;</span>
          <span ref={roleRef} className="cursor text-white font-semibold tracking-wider"></span>
        </div>

        {/* Story Intro */}
        <p
          className={`text-base sm:text-lg text-zinc-400 max-w-[54ch] leading-[1.85] mb-12 transition-all duration-700 delay-600 ${
            startTextAnim ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Hi, I'm <strong className="text-white font-semibold">Raghav S</strong> (<a href="https://github.com/RaghavSdev" target="_blank" rel="noopener noreferrer" className="text-[#f84525] hover:underline">@RaghavSdev</a>). An AI &amp; ML Engineer specializing in predictive modeling, generative AI, React, Spring Boot, and AWS — architecting intelligent models and deploying them at scale.
        </p>

        {/* Action CTAs */}
        <div
          className={`flex flex-wrap items-center gap-6 transition-all duration-700 delay-700 ${
            startTextAnim ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <MagneticButton href="#about">
            <div className="group inline-flex items-center gap-3 px-8 py-4 bg-[#f84525] text-white font-mono text-xs tracking-widest uppercase font-bold hover:bg-[#ff5738] transition-all duration-300 shadow-[0_10px_30px_rgba(248,69,37,0.35)] hover:shadow-[0_15px_45px_rgba(248,69,37,0.6)]">
              <span>READ MY STORY</span>
              <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </div>
          </MagneticButton>

          <MagneticButton href="#projects">
            <div className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white font-mono text-xs tracking-widest uppercase font-semibold hover:border-[#f84525] hover:text-[#f84525] hover:bg-[#f84525]/5 transition-all duration-300">
              EXPLORE CREATIONS
            </div>
          </MagneticButton>

          <button
            onClick={() => setIsResumeModalOpen(true)}
            className="group inline-flex items-center gap-2.5 px-7 py-4 border border-[#f84525]/60 text-[#f84525] font-mono text-xs tracking-widest uppercase font-bold hover:bg-[#f84525] hover:text-white transition-all duration-300 shadow-[0_5px_20px_rgba(248,69,37,0.2)] cursor-pointer"
          >
            <Eye size={16} />
            <span>VIEW RESUME</span>
          </button>
        </div>

      </div>

      {/* Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </section>
  );
}
