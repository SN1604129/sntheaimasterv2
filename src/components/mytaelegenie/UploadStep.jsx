import { useState, useRef } from "react";

export default function UploadStep({ onPhotoSelect }) {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const validateAndAdd = (files) => {
    setError(null);
    const valid = [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) { setError("Only image files please"); continue; }
      if (file.size > 10 * 1024 * 1024) { setError("Each image must be under 10MB"); continue; }
      valid.push({ file, preview: URL.createObjectURL(file) });
    }
    const updated = [...photos, ...valid].slice(0, 5);
    setPhotos(updated);
  };

  const removePhoto = (idx) => setPhotos(p => p.filter((_, i) => i !== idx));

  const handleDrop = (e) => {
    e.preventDefault();
    validateAndAdd(Array.from(e.dataTransfer.files));
  };

  const handleContinue = () => {
    if (photos.length < 1) { setError("Upload at least 1 photo"); return; }
    onPhotoSelect(
      photos.map(p => p.file),
      photos[0].preview,
      photos.map(p => p.preview)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full py-6">
      <div className="text-center mb-6">
        <div className="text-5xl mb-3">🦸</div>
        <h2 className="text-2xl font-bold text-white mb-1">Upload Your Photos</h2>
        <p className="text-white/50 text-sm max-w-md">
          Upload <span className="text-[#06b6d4] font-semibold">3-5 photos</span> for best face consistency.
          Different angles and lighting = better results.
        </p>
      </div>

      {/* Tips */}
      <div className="grid grid-cols-3 gap-3 max-w-sm mb-6 w-full">
        {[
          { icon: "💡", tip: "Good lighting" },
          { icon: "📐", tip: "Different angles" },
          { icon: "😐", tip: "Clear expressions" },
        ].map(t => (
          <div key={t.tip} className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-xl mb-1">{t.icon}</div>
            <p className="text-white/40 text-xs">{t.tip}</p>
          </div>
        ))}
      </div>

      {/* Drop zone */}
      <div
        className="w-full max-w-md border-2 border-dashed border-white/20 rounded-2xl p-8 text-center cursor-pointer hover:border-[#7c3aed]/60 hover:bg-white/5 transition-all mb-4"
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={e => validateAndAdd(Array.from(e.target.files))}
        />
        <div className="text-3xl mb-2">📸</div>
        <p className="text-white/60 font-medium text-sm">Drop photos here or click to browse</p>
        <p className="text-white/25 text-xs mt-1">JPG, PNG, WEBP — max 10MB each — up to 5 photos</p>
      </div>

      {/* Photo previews */}
      {photos.length > 0 && (
        <div className="w-full max-w-md mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/50 text-xs">{photos.length}/5 photos selected</p>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(n => (
                <div key={n} className={`w-2 h-2 rounded-full ${n <= photos.length ? "bg-[#06b6d4]" : "bg-white/10"}`} />
              ))}
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {photos.map((p, i) => (
              <div key={i} className="relative group">
                <img src={p.preview} alt="" className="w-16 h-16 rounded-xl object-cover border-2 border-[#7c3aed]/50" />
                <button
                  onClick={() => removePhoto(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >×</button>
                {i === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 rounded-b-xl text-center">
                    <span className="text-white/70 text-[9px]">Main</span>
                  </div>
                )}
              </div>
            ))}
            {photos.length < 5 && (
              <button
                onClick={() => inputRef.current?.click()}
                className="w-16 h-16 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center text-white/30 hover:border-[#7c3aed]/50 hover:text-white/50 transition-all text-xl"
              >+</button>
            )}
          </div>
        </div>
      )}

      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

      {photos.length > 0 && (
        <button
          onClick={handleContinue}
          className="w-full max-w-md py-3.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Continue with {photos.length} photo{photos.length > 1 ? "s" : ""} →
        </button>
      )}

      {photos.length === 0 && (
        <p className="text-white/25 text-xs mt-2">Minimum 1 photo required • 3-5 recommended</p>
      )}
    </div>
  );
}
