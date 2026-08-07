"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "STORY", num: "01" },
  { href: "#projects", label: "CREATIONS", num: "02" },
  { href: "#experience", label: "MILESTONES", num: "03" },
  { href: "#contact", label: "CONNECT", num: "04" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-40 transition-all duration-500",
      scrolled ? "bg-[#111111]/90 backdrop-blur-md border-b border-white/10" : ""
    )}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <nav className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <a href="#hero" className="group flex items-center gap-3 font-mono text-sm tracking-widest uppercase text-white font-bold">
            <span className="w-2.5 h-2.5 bg-[#f84525] rounded-full group-hover:scale-125 transition-transform" />
            <span>RAGHAV S</span>
            <span className="text-zinc-500 text-[11px] font-normal hidden sm:inline-block">// AI &amp; ML ENGINEER</span>
          </a>

          {/* Nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-swipe font-mono text-xs tracking-widest text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <span className="text-[#f84525] font-semibold">{l.num} //</span>
                  <span>{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button id="menu-toggle" onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white hover:text-[#f84525] transition-colors" aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden flex flex-col gap-3 px-8 pb-8 pt-4 bg-[#111111]/98 border-b border-white/10">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="py-3 font-mono text-sm tracking-widest text-zinc-300 hover:text-[#f84525] transition-colors flex items-center gap-3 border-b border-white/5">
              <span className="text-[#f84525] text-xs">{l.num} //</span>
              <span>{l.label}</span>
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
