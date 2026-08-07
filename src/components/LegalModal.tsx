"use client";
import { X, ShieldCheck, Scale, Lock } from "lucide-react";

interface LegalModalProps {
  isOpen: boolean;
  type: "privacy" | "terms" | null;
  onClose: () => void;
}

export default function LegalModal({ isOpen, type, onClose }: LegalModalProps) {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#171615] border border-white/15 p-6 sm:p-10 overflow-y-auto grain shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-[#f84525] hover:bg-white/5 transition-all rounded-full"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#f84525]/10 border border-[#f84525]/30 text-[#f84525]">
            {type === "privacy" ? <ShieldCheck size={24} /> : <Scale size={24} />}
          </div>
          <div>
            <h2 className="font-mono text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              {type === "privacy" ? "PRIVACY POLICY" : "TERMS OF SERVICE"}
            </h2>
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-0.5">
              RAGHAV S // @RaghavSdev — LEGAL SPECIFICATION
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-white/10 mb-6" />

        {/* Content Body */}
        {type === "privacy" ? (
          <div className="space-y-6 text-zinc-300 text-sm leading-relaxed font-sans">
            <section>
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-2 text-[#f84525]">
                1. OVERVIEW &amp; COMMITMENT
              </h3>
              <p>
                This Privacy Policy outlines how personal information and usage data are handled on the official portfolio site of <strong>Raghav S (@RaghavSdev)</strong>. I prioritize transparency, security, and digital privacy.
              </p>
            </section>

            <section>
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-2 text-[#f84525]">
                2. DATA COLLECTION &amp; ANALYTICS
              </h3>
              <p>
                This portfolio website is hosted for demonstration and personal representation purposes. No personal data, tracking cookies, or biometric data are silently collected or sold to third parties. Any communication initiated via email or external social links is handled strictly for professional contact.
              </p>
            </section>

            <section>
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-2 text-[#f84525]">
                3. EXTERNAL LINKS &amp; THIRD-PARTY REPOSITORIES
              </h3>
              <p>
                This website contains links to external platforms including GitHub, LinkedIn, and live project deployments (e.g. Vercel, GitHub Pages). When visiting external websites, their respective privacy policies and terms apply.
              </p>
            </section>

            <section>
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-2 text-[#f84525]">
                4. INQUIRIES &amp; RIGHTS
              </h3>
              <p>
                If you have questions regarding data privacy or wish to request data removal regarding direct correspondence, please reach out via GitHub or direct email.
              </p>
            </section>
          </div>
        ) : (
          <div className="space-y-6 text-zinc-300 text-sm leading-relaxed font-sans">
            <section>
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-2 text-[#f84525]">
                1. ACCEPTANCE OF TERMS
              </h3>
              <p>
                By accessing or viewing this developer portfolio website of <strong>Raghav S (@RaghavSdev)</strong>, you agree to comply with and be bound by these Terms of Service.
              </p>
            </section>

            <section>
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-2 text-[#f84525]">
                2. INTELLECTUAL PROPERTY &amp; OPEN SOURCE
              </h3>
              <p>
                All original design elements, branding assets, custom interactive canvas implementations, and code snippets contained on this site are owned by Raghav S. Open-source project repositories linked herein are subject to their respective open-source license agreements (e.g. MIT, Apache 2.0).
              </p>
            </section>

            <section>
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-2 text-[#f84525]">
                3. DISCLAIMER OF WARRANTY &amp; LIABILITY
              </h3>
              <p>
                The materials and project demonstrations presented on this site are provided "as is" without warranty of any kind, express or implied. Raghav S shall not be liable for any damages arising out of the use or inability to use the site or linked code repositories.
              </p>
            </section>

            <section>
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider mb-2 text-[#f84525]">
                4. GOVERNING REVISION
              </h3>
              <p>
                These terms may be updated periodically. Continued access to the portfolio after modifications constitutes acceptance of revised terms.
              </p>
            </section>
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>LAST UPDATED: {new Date().getFullYear()}</span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#f84525] text-white font-bold uppercase tracking-widest hover:bg-[#ff5738] transition-colors"
          >
            I UNDERSTAND
          </button>
        </div>

      </div>
    </div>
  );
}
