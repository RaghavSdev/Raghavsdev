import Image from "next/image";
import { GraduationCap, Award, Mail, Phone, MapPin } from "lucide-react";

const skills = [
  "Predictive Modeling", "Generative AI", "RAG Systems", "FAISS Vector Search",
  "Python", "PyTorch / TensorFlow", "React.js", "Spring Boot", "AWS Cloud",
  "Docker & Containers", "REST & SSE Streaming", "Java", "TypeScript",
  "Tailwind CSS", "Data Structures", "DBMS", "OOP", "Git & GitHub"
];

export default function AboutSection() {
  return (
    <section id="about" className="py-28 bg-[#111111] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">

        {/* Section Index Header */}
        <div className="reveal mb-12 flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest uppercase text-[#f84525] font-bold">
            02 // STORY
          </span>
          <span className="h-px w-16 bg-[#f84525]/30" />
          <span className="font-mono text-xs tracking-wider text-zinc-500 uppercase">PHILOSOPHY &amp; BACKGROUND</span>
        </div>

        {/* Headline */}
        <h2 className="reveal text-[clamp(2.5rem,5.5vw,4.5rem)] font-black leading-[0.98] tracking-tight uppercase text-white mb-12">
          ENGINEERING INTELLIGENCE.<br />
          <span className="text-gradient-flame">DEPLOYING AT SCALE.</span>
        </h2>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Story text & Avatar */}
          <div className="lg:col-span-7 space-y-6 text-zinc-400 text-base sm:text-lg leading-[1.85]">
            
            {/* Avatar & Badge */}
            <div className="reveal flex items-center gap-6 mb-8 p-5 premium-card border border-white/10 max-w-lg">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#f84525]/60 flex-shrink-0">
                <Image
                  src="https://avatars.githubusercontent.com/u/169747419?v=4"
                  alt="Raghav S Profile Avatar"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-mono text-lg font-bold text-white uppercase">Raghav S</h3>
                <p className="font-mono text-xs text-[#f84525] tracking-wider uppercase font-semibold">
                  B.Sc AI &amp; ML Student · AI/ML Engineer
                </p>
                <div className="flex flex-col sm:flex-row gap-x-4 gap-y-1 font-mono text-[11px] text-zinc-400 pt-1">
                  <a href="tel:+918807178840" className="hover:text-[#f84525] transition-colors flex items-center gap-1">
                    <Phone size={12} className="text-[#f84525]" /> +91 8807178840
                  </a>
                  <a href="mailto:cdj90000@gmail.com" className="hover:text-[#f84525] transition-colors flex items-center gap-1">
                    <Mail size={12} className="text-[#f84525]" /> cdj90000@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <p className="reveal">
              B.Sc. Artificial Intelligence &amp; Machine Learning student at <strong className="text-white font-semibold">Sri Krishna Arts and Science College</strong> with hands-on experience building predictive ML models and scalable software architectures. Proficient in Python, Java, React, Spring Boot, and AWS cloud deployment.
            </p>
            <p className="reveal reveal-d1">
              Whether architecting FAISS vector-search pipelines, streaming real-time AI responses via SSE, or engineering enterprise Java Spring Boot backend services and React interfaces, I emphasize clean system architecture and production efficiency.
            </p>

            {/* Stats Cards */}
            <div className="reveal reveal-d2 grid grid-cols-3 gap-4 pt-4">
              {[
                { n: "B.Sc AI & ML", label: "Sri Krishna College" },
                { n: "86% Oracle", label: "Gen AI Certified" },
                { n: "+91 8807178840", label: "Direct Phone" },
              ].map(({ n, label }) => (
                <div key={label} className="premium-card p-4 border-l-2 border-l-[#f84525]">
                  <div className="font-mono text-sm sm:text-base font-black text-white mb-0.5 truncate">{n}</div>
                  <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Tech Stack & Education */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Education & Certifications Card */}
            <div className="reveal p-6 premium-card border border-white/10 space-y-4">
              <h3 className="font-mono text-xs font-bold tracking-widest uppercase text-[#f84525] flex items-center gap-2">
                <GraduationCap size={16} />
                <span>EDUCATION &amp; CERTIFICATIONS</span>
              </h3>

              {/* Education Entry */}
              <div className="border-b border-white/10 pb-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-mono text-sm font-bold text-white uppercase">Sri Krishna Arts &amp; Science College</h4>
                  <span className="font-mono text-[10px] text-zinc-500">2024 – 2027</span>
                </div>
                <p className="font-mono text-xs text-[#f84525] font-semibold">B.Sc. Artificial Intelligence &amp; Machine Learning</p>
              </div>

              {/* Certifications List */}
              <div className="space-y-2.5 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-200 font-mono flex items-center gap-1.5">
                    <Award size={13} className="text-[#f84525]" /> Oracle Generative AI Certified (86%)
                  </span>
                  <span className="text-zinc-500 font-mono text-[10px]">Oracle</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-200 font-mono flex items-center gap-1.5">
                    <Award size={13} className="text-[#f84525]" /> Artificial Intelligence (6-Month)
                  </span>
                  <span className="text-zinc-500 font-mono text-[10px]">Indra Inst.</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-200 font-mono flex items-center gap-1.5">
                    <Award size={13} className="text-[#f84525]" /> Soft Skills Certification
                  </span>
                  <span className="text-zinc-500 font-mono text-[10px]">NPTEL</span>
                </div>
              </div>
            </div>

            {/* Tech Stack Card */}
            <div className="reveal p-6 premium-card border border-white/10">
              <h3 className="font-mono text-xs font-bold tracking-widest uppercase text-[#f84525] mb-4 flex items-center gap-2">
                <span>SKILLS &amp; TECHNOLOGIES</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs tracking-wider px-3 py-1.5 bg-white/5 border border-white/10 text-zinc-300 hover:border-[#f84525] hover:text-[#f84525] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
