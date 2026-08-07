"use client";
import { useState } from "react";
import { Link2, GitFork, ArrowUpRight, ShieldCheck, Scale, Phone, Mail, Eye } from "lucide-react";
import LegalModal from "./LegalModal";
import InteractiveBackgroundGrid from "./InteractiveBackgroundGrid";
import VinylTurntablePlayer from "./VinylTurntablePlayer";
import ResumeModal from "./ResumeModal";

const socials = [
  { id: "social-phone",    Icon: Phone,     href: "tel:+918807178840",                      label: "PHONE (+91 8807178840)" },
  { id: "social-email",    Icon: Mail,      href: "mailto:cdj90000@gmail.com",               label: "EMAIL (cdj90000@gmail.com)" },
  { id: "social-linkedin", Icon: Link2,     href: "https://www.linkedin.com/in/raghav-s-dev", label: "LINKEDIN (in/raghav-s-dev)" },
  { id: "social-github",   Icon: GitFork,   href: "https://github.com/RaghavSdev",          label: "GITHUB (@RaghavSdev)" },
];

export default function ContactSection() {
  const [legalModalType, setLegalModalType] = useState<"privacy" | "terms" | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <section id="contact" className="pt-28 pb-0 bg-[#111111] relative border-t border-white/10 overflow-hidden">
      
      {/* Full-Background Interactive Light-Up Matrix Grid */}
      <InteractiveBackgroundGrid />

      {/* Background Flame Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#f84525]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="max-w-4xl mx-auto text-center pb-20">

          {/* Section Index Header */}
          <div className="reveal mb-8 flex items-center justify-center gap-4">
            <span className="font-mono text-xs tracking-widest uppercase text-[#f84525] font-bold">
              05 // CONNECT
            </span>
            <span className="h-px w-12 bg-[#f84525]/40" />
            <span className="font-mono text-xs tracking-wider text-zinc-500 uppercase">GET IN TOUCH</span>
          </div>

          {/* Impact Statement */}
          <div className="reveal reveal-d1">
            <h2 className="text-[clamp(2.8rem,7.5vw,5.8rem)] font-black leading-[0.94] tracking-tight uppercase text-white mb-6">
              LET'S TALK AI &amp;<br />
              <span className="text-gradient-flame">BUILD TOGETHER.</span>
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-[48ch] mx-auto mb-10">
              Always excited to connect with engineers, researchers, and tech leaders. Feel free to reach out for AI/ML projects, collaborations, or technical discussions!
            </p>
          </div>

          {/* Action CTAs: GitHub Connect & View Resume */}
          <div className="reveal reveal-d2 flex flex-wrap items-center justify-center gap-5 mb-12">
            <a
              href="https://github.com/RaghavSdev"
              target="_blank"
              rel="noopener noreferrer"
              id="contact-github-link"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#f84525] text-white font-mono text-xs tracking-widest uppercase font-bold hover:bg-[#ff5738] transition-all duration-300 shadow-[0_15px_40px_rgba(248,69,37,0.35)] hover:shadow-[0_20px_60px_rgba(248,69,37,0.55)]"
            >
              <GitFork size={18} />
              <span>CONNECT ON GITHUB</span>
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <button
              onClick={() => setIsResumeModalOpen(true)}
              id="contact-resume-link"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-mono text-xs tracking-widest uppercase font-bold hover:border-[#f84525] hover:text-[#f84525] hover:bg-[#f84525]/5 transition-all duration-300 cursor-pointer"
            >
              <Eye size={18} className="text-[#f84525]" />
              <span>VIEW RESUME DIRECTLY</span>
            </button>
          </div>

          {/* Divider */}
          <div className="reveal reveal-d2 flex items-center gap-4 max-w-xs mx-auto mb-10">
            <div className="flex-1 h-px bg-white/10" />
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">DIRECT CONTACT &amp; PROFILES</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social & Contact Links */}
          <nav className="reveal reveal-d3 flex items-center justify-center gap-x-8 gap-y-4 flex-wrap mb-10" aria-label="Contact links">
            {socials.map(({ id, Icon, href, label }) => (
              <a
                key={id}
                id={id}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="link-swipe font-mono text-xs tracking-widest text-zinc-300 hover:text-[#f84525] flex items-center gap-2 py-1.5"
              >
                <Icon size={16} className="text-[#f84525]" />
                <span>{label}</span>
              </a>
            ))}
          </nav>

        </div>
      </div>

      {/* Mini Vinyl Turntable Player (Docked at side) */}
      <VinylTurntablePlayer />

      {/* Legal & Footer Notice */}
      <footer className="border-t border-white/10 py-8 bg-[#171615] relative z-10" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          
          {/* Copyright */}
          <p className="font-mono text-xs text-zinc-500 tracking-wider">
            © {new Date().getFullYear()} <span className="text-white font-bold">RAGHAV S (@RaghavSdev)</span>. ALL RIGHTS RESERVED.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-6 font-mono text-xs text-zinc-400">
            <button
              onClick={() => setLegalModalType("privacy")}
              className="hover:text-[#f84525] transition-colors flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <ShieldCheck size={14} className="text-[#f84525]" />
              <span>PRIVACY POLICY</span>
            </button>
            <span className="text-zinc-600">•</span>
            <button
              onClick={() => setLegalModalType("terms")}
              className="hover:text-[#f84525] transition-colors flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <Scale size={14} className="text-[#f84525]" />
              <span>TERMS OF SERVICE</span>
            </button>
          </div>

          <p className="font-mono text-xs text-zinc-500 tracking-wider uppercase">
            NEXT.JS 16 // TAILWIND V4 // CUSTOM DESIGN ENGINE
          </p>

        </div>
      </footer>

      {/* Legal Modal Component */}
      <LegalModal
        isOpen={!!legalModalType}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </section>
  );
}
