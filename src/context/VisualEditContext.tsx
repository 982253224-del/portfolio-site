import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { publicUrl } from "@/lib/publicUrl";

type VisualEditState = {
  editMode: boolean;
  enterEditMode: () => void;
  exitEditMode: () => void;
  save: () => void;
  exportJson: () => void;
  syncToFile: () => Promise<boolean>;
  importJson: (payload: unknown) => boolean;
  getText: (key: string, fallback: string) => string;
  setText: (key: string, value: string) => void;
  getImage: (key: string, fallback: string) => string;
  setImage: (key: string, value: string) => void;
};

type StoredContent = {
  version: 1;
  texts: Record<string, string>;
  images: Record<string, string>;
};

const STORAGE_KEY = "portfolio-visual-edit-content-v2";

const VisualEditContext = createContext<VisualEditState | null>(null);

type SaveFilePickerWindow = Window & {
  showSaveFilePicker?: (options?: {
    suggestedName?: string;
    types?: Array<{ description?: string; accept: Record<string, string[]> }>;
  }) => Promise<{
    createWritable: () => Promise<{ write: (data: string) => Promise<void>; close: () => Promise<void> }>;
  }>;
};

function readEditParam(): boolean {
  if (typeof window === "undefined") return false;
  const fromSearch = new URLSearchParams(window.location.search);
  if (fromSearch.get("edit") === "1" || fromSearch.get("mode") === "edit") return true;
  // HashRouter：查询可能在 hash 内，如 #/competencies?edit=1
  const hash = window.location.hash;
  const qi = hash.indexOf("?");
  if (qi >= 0) {
    const inHash = new URLSearchParams(hash.slice(qi + 1));
    if (inHash.get("edit") === "1" || inHash.get("mode") === "edit") return true;
  }
  return false;
}

function updateUrl(paramsPatch: Record<string, string | null>) {
  const url = new URL(window.location.href);
  for (const [k, v] of Object.entries(paramsPatch)) {
    if (v === null) url.searchParams.delete(k);
    else url.searchParams.set(k, v);
  }
  window.history.replaceState({}, "", url.toString());
}

function safeParseStored(raw: string | null): StoredContent | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredContent>;
    if (parsed && parsed.version === 1 && typeof parsed.texts === "object" && typeof parsed.images === "object") {
      return {
        version: 1,
        texts: (parsed.texts as Record<string, string>) ?? {},
        images: (parsed.images as Record<string, string>) ?? {},
      };
    }
    return null;
  } catch {
    return null;
  }
}

function validatePayload(payload: unknown): StoredContent | null {
  if (!payload || typeof payload !== "object") return null;
  const p = payload as Partial<StoredContent>;
  if (p.version !== 1) return null;
  if (typeof p.texts !== "object" || typeof p.images !== "object") return null;
  return {
    version: 1,
    texts: (p.texts as Record<string, string>) ?? {},
    images: (p.images as Record<string, string>) ?? {},
  };
}

export function VisualEditProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [images, setImages] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      const buildId = import.meta.env.VITE_BUILD_ID ?? "dev";
      const wantsEdit = readEditParam();

      async function loadFromRemote(): Promise<boolean> {
        try {
          const rawBase = import.meta.env.BASE_URL ?? "/";
          const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
          const bust = `${buildId}-${Date.now()}`;
          const jsonPath = `${base}portfolio-content.json?v=${encodeURIComponent(bust)}`;
          const response = await fetch(jsonPath, { cache: "no-store" });
          if (!response.ok) return false;
          const payload = validatePayload(await response.json());
          if (!payload) return false;
          setTexts(payload.texts);
          setImages(payload.images);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
          return true;
        } catch {
          return false;
        }
      }

      // 访客：始终先拉服务器 JSON，避免旧 localStorage 盖住线上已部署内容。
      // ?edit=1：优先用本地草稿，无草稿再拉服务器。
      if (wantsEdit) {
        const stored = safeParseStored(localStorage.getItem(STORAGE_KEY));
        if (stored) {
          setTexts(stored.texts);
          setImages(stored.images);
        } else {
          await loadFromRemote();
        }
      } else {
        const ok = await loadFromRemote();
        if (!ok) {
          const stored = safeParseStored(localStorage.getItem(STORAGE_KEY));
          if (stored) {
            setTexts(stored.texts);
            setImages(stored.images);
          }
        }
      }

      setEditMode(wantsEdit);
      setLoaded(true);
    };

    void hydrate();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const onPopState = () => setEditMode(readEditParam());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    const payload: StoredContent = { version: 1, texts, images };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [loaded, texts, images]);

  const save = () => {
    const payload: StoredContent = { version: 1, texts, images };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  const exportJson = () => {
    const payload: StoredContent = { version: 1, texts, images };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "portfolio-content.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  };

  const syncToFile = async () => {
    const payload: StoredContent = { version: 1, texts, images };
    const content = JSON.stringify(payload, null, 2);
    const w = window as SaveFilePickerWindow;

    if (w.showSaveFilePicker) {
      try {
        const handle = await w.showSaveFilePicker({
          suggestedName: "portfolio-content.json",
          types: [{ description: "JSON 文件", accept: { "application/json": [".json"] } }],
        });
        const writable = await handle.createWritable();
        await writable.write(content);
        await writable.close();
        return true;
      } catch {
        return false;
      }
    }

    exportJson();
    return true;
  };

  const importJson = (payload: unknown) => {
    const validated = validatePayload(payload);
    if (!validated) return false;

    setTexts(validated.texts);
    setImages(validated.images);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));

    // Import 后退出编辑，避免用户看到“正在编辑但内容已被重置”的错觉。
    setEditMode(false);
    updateUrl({ edit: null, mode: null });
    return true;
  };

  const value: VisualEditState = useMemo(
    () => ({
      editMode,
      enterEditMode: () => {
        setEditMode(true);
        updateUrl({ edit: "1", mode: null });
      },
      exitEditMode: () => {
        setEditMode(false);
        updateUrl({ edit: null, mode: null });
      },
      save,
      exportJson,
      syncToFile,
      importJson,
      getText: (key, fallback) => {
        const v = texts[key];
        if (v === undefined || v === null) return fallback;
        if (typeof v === "string" && v.length === 0) return fallback;
        return v;
      },
      setText: (key, v) => setTexts((prev) => ({ ...prev, [key]: v })),
      getImage: (key, fallback) => {
        const v = images[key];
        const raw = v === undefined || v === null || (typeof v === "string" && v.length === 0) ? fallback : v;
        if (typeof raw !== "string") return raw;
        if (/^(https?:|data:|\/\/)/i.test(raw)) return raw;
        if (raw.startsWith("/")) return publicUrl(raw);
        return raw;
      },
      setImage: (key, v) => setImages((prev) => ({ ...prev, [key]: v })),
    }),
    [editMode, texts, images]
  );

  return <VisualEditContext.Provider value={value}>{children}</VisualEditContext.Provider>;
}

export function useVisualEdit() {
  const ctx = useContext(VisualEditContext);
  if (!ctx) throw new Error("useVisualEdit must be used within <VisualEditProvider />");
  return ctx;
}

