import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EditableText from "../components/EditableText";
import { useVisualEdit } from "../context/VisualEditContext";

const TYPE_MAP: Record<string, { title: string; key: string }> = {
  media: { title: "主流媒体深度稿件", key: "media" },
  keynote: { title: "高管 Keynote 讲话稿", key: "keynote" },
  interview: { title: "对谈发言", key: "interview" },
  video: { title: "品牌与技术 TVC", key: "video" },
};

export default function ResourceLinks() {
  const { search } = useLocation();
  const { editMode, getText } = useVisualEdit();
  const type = new URLSearchParams(search).get("type") ?? "media";
  const target = TYPE_MAP[type] ?? TYPE_MAP.media;
  const base = `competencies.content.slice.${target.key}.links`;

  const options = [
    { labelKey: `${base}.1.label`, urlKey: `${base}.1.url`, fallbackLabel: "链接选项 1", fallbackUrl: getText(`competencies.content.slice.${target.key}.link`, "https://example.com") },
    { labelKey: `${base}.2.label`, urlKey: `${base}.2.url`, fallbackLabel: "链接选项 2", fallbackUrl: "https://example.com/option-2" },
    { labelKey: `${base}.3.label`, urlKey: `${base}.3.url`, fallbackLabel: "链接选项 3", fallbackUrl: "https://example.com/option-3" },
    ...(target.key === "video"
      ? [
          { labelKey: `${base}.4.label`, urlKey: `${base}.4.url`, fallbackLabel: "链接选项 4", fallbackUrl: "https://example.com/option-4" },
          { labelKey: `${base}.5.label`, urlKey: `${base}.5.url`, fallbackLabel: "链接选项 5", fallbackUrl: "https://example.com/option-5" },
          { labelKey: `${base}.6.label`, urlKey: `${base}.6.url`, fallbackLabel: "链接选项 6", fallbackUrl: "https://example.com/option-6" },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-background to-slate-100/60 font-sans text-foreground">
      <Header />
      <main className="max-w-[900px] mx-auto px-6 py-16">
        <Link to="/competencies?section=content" className="inline-flex items-center text-sm text-slate-500 hover:text-violet-700 mb-8 transition-colors">
          返回能力详情
        </Link>
        <div className="rounded-3xl border border-slate-200/80 bg-white shadow-custom overflow-hidden">
          <div className="px-7 py-6 border-b border-slate-200/80 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
            <p className="text-xs tracking-widest text-white/70 mb-2">链接选择页</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">{target.title}</h1>
          </div>
          <div className="p-7 space-y-4 bg-gradient-to-b from-slate-50/70 to-white">
            {options.map((item, idx) => {
              const href = getText(item.urlKey, item.fallbackUrl);
              return (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-violet-300/60 transition-all">
                  {editMode ? (
                    <div className="space-y-2">
                      <EditableText storageKey={item.labelKey} fallback={item.fallbackLabel} className="bg-transparent font-semibold text-slate-800" />
                      <EditableText storageKey={item.urlKey} fallback={item.fallbackUrl} className="bg-transparent text-sm text-violet-700 break-all" />
                    </div>
                  ) : (
                    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center font-semibold text-slate-800 hover:text-violet-700 transition-colors">
                      {getText(item.labelKey, item.fallbackLabel)}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

