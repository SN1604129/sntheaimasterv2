export default function ComicViewer({ pdfUrl, heroName, onReset }) {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `${heroName.replace(/\s+/g, "_")}_comic.pdf`;
    a.click();
  };

  return (
    <div className="max-w-xl mx-auto text-center">
      {/* Success */}
      <div className="mb-8">
        <div className="text-6xl mb-4 animate-bounce">🎉</div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Your Comic is Ready!
        </h2>
        <p className="text-white/50">
          <span className="text-[#06b6d4] font-semibold">{heroName}</span>'s 12-panel, 4-page comic has been created.
        </p>
      </div>

      {/* Comic Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: "📖", label: "Pages", value: "4" },
          { icon: "🎨", label: "Panels", value: "12" },
          { icon: "⚡", label: "Art Style", value: "Marvel" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-white font-bold">{stat.value}</div>
            <div className="text-white/30 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={handleDownload}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#7c3aed]/20"
        >
          ⬇️ Download Comic PDF
        </button>

        <button
          onClick={onReset}
          className="w-full py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all text-sm"
        >
          🔄 Create Another Comic
        </button>
      </div>

      {/* Share nudge */}
      <div className="mt-8 bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-xl p-4">
        <p className="text-[#a78bfa] text-sm font-medium">🚀 Share your comic!</p>
        <p className="text-white/30 text-xs mt-1">
          Tag <span className="text-white/50">@sntheaimaster</span> when you share it — we'd love to see your hero.
        </p>
      </div>
    </div>
  );
}
