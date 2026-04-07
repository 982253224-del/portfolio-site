import React, { useRef } from "react";
import { useVisualEdit } from "../context/VisualEditContext";

type EditableImageProps = {
  storageKey: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
};

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

export default function EditableImage({ storageKey, fallbackSrc, alt, className }: EditableImageProps) {
  const { editMode, getImage, setImage } = useVisualEdit();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const src = getImage(storageKey, fallbackSrc);

  const onPick = async (file: File | null) => {
    if (!file) return;
    const dataUrl = await readFileAsDataUrl(file);
    setImage(storageKey, dataUrl);
  };

  if (!editMode) return <img src={src} alt={alt} className={className} />;

  return (
    <div className="relative">
      <img src={src} alt={alt} className={className} />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="absolute inset-0 flex items-center justify-center rounded-[inherit] bg-black/35 text-white text-sm font-semibold opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity"
      >
        点击上传替换
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => void onPick(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

