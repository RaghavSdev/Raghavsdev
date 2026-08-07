"use client";
import { X, ExternalLink, Download, FileText } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div className="bg-[#141413] border border-white/20 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#171615]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#f84525]/10 border border-[#f84525]/30 flex items-center justify-center text-[#f84525]">
              <FileText size={18} />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white uppercase tracking-tight">
                RAGHAV S // RESUME VIEW
              </h3>
              <p className="font-mono text-[11px] text-zinc-400">
                B.Sc AI &amp; ML · AI/ML Engineer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/raghav_s_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[#f84525] hover:underline flex items-center gap-1.5 px-3 py-1.5 bg-[#f84525]/10 border border-[#f84525]/30 rounded-md"
            >
              <span>FULL SCREEN</span>
              <ExternalLink size={13} />
            </a>

            <a
              href="/raghav_s_resume.pdf"
              download="raghav_s_resume.pdf"
              className="font-mono text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 border border-white/10 rounded-md hover:bg-white/5"
            >
              <Download size={13} />
              <span className="hidden sm:inline">DOWNLOAD</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close Resume Modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PDF Viewer Iframe Container */}
        <div className="flex-1 w-full bg-[#1c1b1a] overflow-hidden min-h-[60vh]">
          <iframe
            src="/raghav_s_resume.pdf#toolbar=0"
            className="w-full h-full min-h-[65vh] border-0"
            title="Raghav S Resume PDF Viewer"
          />
        </div>

      </div>
    </div>
  );
}
