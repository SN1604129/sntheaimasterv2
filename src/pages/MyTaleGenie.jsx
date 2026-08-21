import { useState } from "react";
import UploadStep from "../components/mytaelegenie/UploadStep";
import CustomizeStep from "../components/mytaelegenie/CustomizeStep";
import GenerateStep from "../components/mytaelegenie/GenerateStep";
import ComicPreview from "../components/mytaelegenie/ComicPreview";
import PaymentStep from "../components/mytaelegenie/PaymentStep";

const STEPS = ["Upload", "Customize", "Generate", "Preview", "Download"];

export default function MyTaleGenie() {
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [formData, setFormData] = useState({
    hero_name: "", gender: "Male", genre: "Superhero",
    superpower: "", villain: "", setting: "", art_style: "marvel",
  });
  const [comicData, setComicData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");

  const BACKEND = import.meta.env.VITE_MYTAELEGENIE_BACKEND_URL || "http://localhost:8000";

  const handlePhotoSelect = (files, preview, previews) => {
    setPhotos(files);
    setPhoto(files[0]);
    setPhotoPreview(preview);
    setPhotoPreviews(previews);
    setStep(1);
  };

  const handleCustomizeSubmit = (data) => {
    setFormData(p => ({ ...p, ...data })); setStep(2);
  };

  const handleGenerate = async () => {
    setIsGenerating(true); setError(null); setProgress(0);

    const steps = [
      { pct: 5,  label: `Building ${formData.hero_name}'s character bible...` },
      { pct: 12, label: "Crafting the emotional story arc..." },
      { pct: 20, label: "Writing your origin story..." },
      { pct: 28, label: "Planning cinematic shot list..." },
      { pct: 36, label: "Writing page by page panels..." },
      { pct: 44, label: "Generating your hero character..." },
      { pct: 52, label: "Painting environments..." },
      { pct: 60, label: "Generating panels 1-6..." },
      { pct: 68, label: "Generating panels 7-12..." },
      { pct: 74, label: "Generating panels 13-18..." },
      { pct: 80, label: "Generating panels 19-24..." },
      { pct: 86, label: "Generating final panels..." },
      { pct: 91, label: "Assembling your comic pages..." },
      { pct: 95, label: "Adding speech bubbles and captions..." },
      { pct: 98, label: "Finalising your masterpiece..." },
    ];

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < steps.length) {
        setProgress(steps[idx].pct);
        setProgressLabel(steps[idx].label);
        idx++;
      }
    }, 4000);

    try {
      const fd = new FormData();
      // Append all photos
      photos.forEach(p => fd.append("photos", p));
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));

      const res = await fetch(`${BACKEND}/generate-comic`, { method: "POST", body: fd });
      if (!res.ok) {
        const e = await res.json();
        throw new Error(e.detail || "Generation failed");
      }

      const data = await res.json();
      setComicData({ ...data, backend: BACKEND });
      setProgress(100);
      setProgressLabel("Your comic is ready!");
      setStep(3);
    } catch (e) {
      setError(e.message);
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setStep(0); setPhoto(null); setPhotoPreview(null);
    setComicData(null); setError(null); setProgress(0);
    setPhotos([]); setPhotoPreviews([]);
    setFormData({ hero_name: "", gender: "Male", genre: "Superhero", superpower: "", villain: "", setting: "", art_style: "marvel" });
  };

  return (
    <div className="min-h-screen bg-[#080810] text-white" style={{ paddingTop: "80px" }}>
      {/* Header */}
      <div className="border-b border-white/8 bg-[#0a0a18]">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#06b6d4] bg-clip-text text-transparent">
              MyTaleGenie
            </h1>
            <p className="text-white/35 text-xs mt-0.5 tracking-widest uppercase">
              Your face. Your story. Your comic.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/25 text-xs">AI Online</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-10 max-w-2xl mx-auto">
          {STEPS.map((label, idx) => (
            <div key={idx} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  idx < step ? "bg-[#06b6d4] text-black" :
                  idx === step ? "bg-[#7c3aed] text-white ring-2 ring-[#7c3aed]/40 ring-offset-2 ring-offset-[#080810]" :
                  "bg-white/5 text-white/20"
                }`}>
                  {idx < step ? "✓" : idx + 1}
                </div>
                <span className={`text-xs mt-1.5 hidden sm:block ${idx === step ? "text-white" : "text-white/20"}`}>
                  {label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-2 transition-all duration-500 ${idx < step ? "bg-[#06b6d4]" : "bg-white/8"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="bg-[#0d0d1a] border border-white/8 rounded-2xl p-8 min-h-[520px]">
          {step === 0 && <UploadStep onPhotoSelect={handlePhotoSelect} />}
          {step === 1 && (
            <CustomizeStep
              formData={formData}
              photoPreview={photoPreview}
              onSubmit={handleCustomizeSubmit}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <GenerateStep
              formData={formData}
              photoPreview={photoPreview}
              isGenerating={isGenerating}
              progress={progress}
              progressLabel={progressLabel}
              error={error}
              onGenerate={handleGenerate}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <ComicPreview
              comicData={comicData}
              formData={formData}
              onPay={() => setStep(4)}
              onReset={handleReset}
            />
          )}
          {step === 4 && (
            <PaymentStep
              comicData={comicData}
              formData={formData}
              onSuccess={() => {}}
              onReset={handleReset}
              backend={BACKEND}
            />
          )}
        </div>
      </div>
    </div>
  );
}
