const timeline = [
  {
    date: "INTERNSHIP",
    role: "SOFTWARE DEVELOPMENT INTERN",
    company: "Development Team / Private Project",
    type: "1 Month Intern",
    detail: "Engineered a full-stack web application utilizing React, Spring Boot, and MySQL, optimizing system architecture for seamless data processing. Managed end-to-end cloud deployment on AWS and resolved critical bugs to ensure cross-platform stability.",
  },
  {
    date: "2024 — 2027",
    role: "B.SC ARTIFICIAL INTELLIGENCE & MACHINE LEARNING",
    company: "Sri Krishna Arts and Science College",
    type: "Education",
    detail: "Pursuing B.Sc AI & ML degree focusing on predictive modeling, RAG architectures, deep learning, and cloud infrastructure. Scored 86% in Oracle Generative AI Professional Certification.",
  },
  {
    date: "CERTIFICATIONS",
    role: "ORACLE GEN AI, INDRA INST & NPTEL CERTIFIED",
    company: "Oracle · Indra Institute · NPTEL",
    type: "Certifications",
    detail: "Oracle Generative AI Professional Certified (86% score), Artificial Intelligence 6-Month Diploma from Indra Institute of Education, and NPTEL Soft Skills Certification.",
  },
];

const metrics = [
  { value: "86% Scored", label: "Oracle Gen AI Certified" },
  { value: "98% Accuracy", label: "Plant ML Model" },
  { value: "AWS Cloud", label: "React + Spring Boot" },
  { value: "@RaghavSdev", label: "GitHub Identity" },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-28 bg-[#111111] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">

        {/* Section Index Header */}
        <div className="reveal mb-12 flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest uppercase text-[#f84525] font-bold">
            04 // MILESTONES
          </span>
          <span className="h-px w-16 bg-[#f84525]/30" />
          <span className="font-mono text-xs tracking-wider text-zinc-500 uppercase">TIMELINE &amp; HIGHLIGHTS</span>
        </div>

        {/* Headline */}
        <h2 className="reveal text-[clamp(2.5rem,5.5vw,4.5rem)] font-black leading-[0.98] tracking-tight uppercase text-white mb-16">
          ENGINEERING JOURNEY &amp;<br />
          <span className="text-gradient-flame">GROWTH MILESTONES.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Timeline List */}
          <div className="lg:col-span-7 space-y-8">
            {timeline.map((item, i) => (
              <div
                key={item.role}
                className={`reveal reveal-d${i + 1} premium-card p-6 border-l-2 border-l-[#f84525]`}
              >
                <div className="flex justify-between items-start gap-4 mb-2">
                  <span className="font-mono text-xs font-bold text-[#f84525] tracking-wider uppercase">
                    {item.date}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest px-2 py-0.5 border border-white/10">
                    {item.type}
                  </span>
                </div>

                <h3 className="text-lg font-bold uppercase text-white mb-1">
                  {item.role}
                </h3>
                <p className="font-mono text-xs text-zinc-400 mb-4">
                  {item.company}
                </p>

                <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Key Metrics Grid */}
          <div className="lg:col-span-5 space-y-6">
            <div className="reveal p-8 premium-card border border-white/10">
              <h3 className="font-mono text-xs font-bold tracking-widest uppercase text-[#f84525] mb-6">
                KEY STATS &amp; VERIFIED METRICS
              </h3>

              <div className="grid grid-cols-2 gap-6">
                {metrics.map((m) => (
                  <div key={m.label} className="border-b border-white/10 pb-4">
                    <div className="font-mono text-xl sm:text-2xl font-black text-white mb-1">
                      {m.value}
                    </div>
                    <div
                      className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider"
                      dangerouslySetInnerHTML={{ __html: m.label }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
