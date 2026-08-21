import { useState } from "react";

export default function PaymentStep({ comicData, formData, onSuccess, onReset, backend }) {
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const url = `${backend}/download/${comicData.comic_id}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${formData.hero_name.replace(/\s+/g, "_")}_comic.pdf`;
      link.click();
      setDownloaded(true);
    } catch (e) {
      alert("Download failed: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center">
      {!downloaded ? (
        <>
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
          <p className="text-white/50 text-sm mb-8">Your clean, watermark-free comic is ready.</p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/20 flex items-center justify-center text-lg">📖</div>
              <div>
                <p className="text-white font-bold">{formData.hero_name} — The Comic</p>
                <p className="text-white/40 text-xs">8 pages • 24 panels • Classic Marvel Style</p>
              </div>
            </div>
            {["Watermark removed", "Full resolution PDF", "Print ready quality", "Yours forever"].map(f => (
              <div key={f} className="flex items-center gap-2 py-1">
                <span className="text-green-400">✓</span>
                <span className="text-white/60 text-sm">{f}</span>
              </div>
            ))}
          </div>

          <button onClick={handleDownload} disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 mb-3">
            {loading ? "Preparing download..." : "⬇️ Download Comic PDF"}
          </button>
        </>
      ) : (
        <>
          <div className="text-6xl mb-4">🦸</div>
          <h2 className="text-2xl font-bold text-white mb-2">Your comic is downloaded!</h2>
          <p className="text-white/50 text-sm mb-6">
            Share it, print it, frame it. Tag us when you do — we'd love to see {formData.hero_name} in action.
          </p>
          <div className="bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-xl p-4 mb-6">
            <p className="text-[#a78bfa] text-sm font-medium">🚀 Know someone who'd love this?</p>
            <p className="text-white/30 text-xs mt-1">Share MyTaleGenie and help them become the hero of their own story.</p>
          </div>
          <button onClick={onReset}
            className="w-full py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all text-sm">
            🔄 Create Another Comic
          </button>
        </>
      )}
    </div>
  );
}
