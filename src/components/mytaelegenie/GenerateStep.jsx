export default function GenerateStep({
  formData,
  photoPreview,
  isGenerating,
  progress,
  progressLabel,
  error,
  onGenerate,
  onBack,
}) {
  return (
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-white mb-2">Ready to Create</h2>
      <p className="text-white/50 text-sm mb-8">Review your hero before we generate your 12-panel comic</p>

      {/* Summary Card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
        <div className="flex items-center gap-4 mb-5">
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Hero"
              className="w-16 h-16 rounded-full object-cover border-2 border-[#7c3aed]"
            />
          )}
          <div>
            <p className="text-white font-bold text-xl">{formData.hero_name}</p>
            <p className="text-[#06b6d4] text-sm">{formData.genre} Hero</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Superpower", value: formData.superpower, color: "text-[#06b6d4]" },
            { label: "Villain", value: formData.villain, color: "text-red-400" },
            { label: "Setting", value: formData.setting, color: "text-[#a78bfa]" },
            { label: "Art Style", value: "Marvel / DC", color: "text-yellow-400" },
          ].map((item) => (
            <div key={item.label} className="bg-white/5 rounded-xl p-3">
              <p className="text-white/30 text-xs mb-1">{item.label}</p>
              <p className={`font-medium text-sm ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 bg-white/5 rounded-xl p-3">
          <p className="text-white/30 text-xs mb-1">Your Comic</p>
          <p className="text-white/70 text-sm">12 panels • 4 pages • PDF download</p>
        </div>
      </div>

      {/* Progress Bar */}
      {isGenerating && (
        <div className="mb-8">
          <div className="flex justify-between text-xs text-white/40 mb-2">
            <span>{progressLabel}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] transition-all duration-700 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/30 text-xs mt-3">
            This takes 2–3 minutes — we're generating 12 unique panels with your face 🎨
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400 text-sm">⚠️ {error}</p>
          <p className="text-white/30 text-xs mt-1">Check that your backend is running and API keys are set.</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        {!isGenerating && (
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all"
          >
            ← Edit
          </button>
        )}
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${
            isGenerating
              ? "bg-white/10 text-white/30 cursor-not-allowed"
              : "bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white hover:opacity-90 shadow-lg shadow-[#7c3aed]/20"
          }`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⚙️</span> Generating your comic...
            </span>
          ) : (
            "✨ Generate My Comic"
          )}
        </button>
      </div>
    </div>
  );
}
