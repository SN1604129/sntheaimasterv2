import { useState } from "react";

export default function ComicPreview({ comicData, formData, onPay, onReset }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [imgLoaded, setImgLoaded] = useState({});
  const totalPages = comicData?.page_count || 8;
  const backend = comicData?.backend || "http://localhost:8000";
  const comicId = comicData?.comic_id;

  const pageUrl = `${backend}/preview-page/${comicId}/${currentPage}`;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-[#7c3aed]/15 border border-[#7c3aed]/30 rounded-full px-4 py-1.5 mb-3">
          <div className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse" />
          <span className="text-[#a78bfa] text-xs font-semibold uppercase tracking-widest">Preview Mode</span>
        </div>
        <h2 className="text-2xl font-bold text-white">{formData.hero_name}'s Comic</h2>
        <p className="text-white/40 text-sm mt-1">8 pages • 24 panels • Classic Marvel Style</p>
      </div>

      {/* Comic Page Viewer */}
      <div className="relative bg-black rounded-2xl overflow-hidden border border-white/10 mb-4">
        {/* Watermark overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          <div className="rotate-[-35deg] text-white/8 text-4xl font-black whitespace-nowrap select-none">
            PREVIEW • MyTaleGenie • PREVIEW • MyTaleGenie
          </div>
        </div>

        {/* Page image */}
        <div className="relative aspect-[210/297] w-full bg-[#0a0a15] flex items-center justify-center">
          {!imgLoaded[currentPage] && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-white/30 text-xs">Loading page {currentPage}...</p>
              </div>
            </div>
          )}
          <img
            key={currentPage}
            src={pageUrl}
            alt={`Page ${currentPage}`}
            className="w-full h-full object-contain"
            onLoad={() => setImgLoaded(p => ({ ...p, [currentPage]: true }))}
            style={{ opacity: imgLoaded[currentPage] ? 1 : 0, transition: "opacity 0.3s" }}
          />
        </div>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
          className="px-4 py-2 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all disabled:opacity-20 text-sm">
          ← Prev
        </button>

        <div className="flex gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setCurrentPage(p)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                p === currentPage ? "bg-[#7c3aed] text-white" : "bg-white/5 text-white/30 hover:bg-white/10"
              }`}>{p}</button>
          ))}
        </div>

        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all disabled:opacity-20 text-sm">
          Next →
        </button>
      </div>

      {/* Unlock CTA */}
      <div className="bg-gradient-to-r from-[#7c3aed]/15 to-[#06b6d4]/15 border border-[#7c3aed]/30 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-2">🔒</div>
        <h3 className="text-white font-bold text-lg mb-1">Unlock Your Full Comic</h3>
        <p className="text-white/50 text-sm mb-4">Get the clean, watermark-free PDF in full resolution. Print it, share it, frame it.</p>
        <div className="flex items-center justify-center gap-4 mb-4">
          {["No watermark", "Full resolution", "8 pages PDF", "Print ready"].map(f => (
            <div key={f} className="flex items-center gap-1.5">
              <span className="text-green-400 text-xs">✓</span>
              <span className="text-white/50 text-xs">{f}</span>
            </div>
          ))}
        </div>
        <button onClick={onPay}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#7c3aed]/20">
          Unlock for $4.99 AUD →
        </button>
        <button onClick={onReset} className="mt-3 text-white/20 text-xs hover:text-white/40 transition-colors">
          Start over
        </button>
      </div>
    </div>
  );
}
