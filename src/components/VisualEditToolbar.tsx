import React from "react";
import { useVisualEdit } from "../context/VisualEditContext";

async function copyShareUrl() {
  const full = window.location.href;
  try {
    await navigator.clipboard.writeText(full);
    window.alert("已复制当前页完整链接（含路由），可直接粘贴到微信、邮件或浏览器打开。");
  } catch {
    window.prompt("复制以下链接：", full);
  }
}

export default function VisualEditToolbar() {
  const { editMode, enterEditMode, exitEditMode, save, exportJson, syncToFile, importJson, resetLocalContent } =
    useVisualEdit();

  const onPickFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const raw = String(reader.result ?? "");
        const parsed = JSON.parse(raw);
        const ok = importJson(parsed);
        if (!ok) {
          window.alert("导入失败：JSON 格式不正确（需要 portfolio-content.json）。");
        }
      } catch {
        window.alert("导入失败：文件解析为 JSON 出错。");
      }
    };
    reader.onerror = () => window.alert("导入失败：读取文件失败。");
    reader.readAsText(file);
  };

  return (
    <>
      {editMode && (
        <div className="fixed top-0 inset-x-0 z-[60] bg-primary text-primary-foreground">
          <div className="max-w-[1440px] mx-auto px-4 py-2 text-sm font-semibold">
            当前为编辑模式：点击文字可修改，点击图片可上传替换；完成后请点底部“保存并退出编辑”。
          </div>
        </div>
      )}

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60]">
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-background/90 backdrop-blur-xl shadow-xl px-3 py-2">
          <input
            id="visual-edit-import-json"
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
          />
          <button
            type="button"
            onClick={() => void copyShareUrl()}
            className="h-10 px-4 rounded-xl border border-border bg-background font-semibold hover:bg-muted transition-colors"
            title="复制当前完整 URL（部署到公网后亦可分享）"
          >
            复制分享链接
          </button>
          {!editMode ? (
            <button
              type="button"
              onClick={enterEditMode}
              className="h-10 px-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              进入可视化编辑
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  save();
                  exitEditMode();
                }}
                className="h-10 px-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                保存并退出编辑
              </button>
              <button
                type="button"
                onClick={save}
                className="h-10 px-4 rounded-xl border border-border bg-background font-semibold hover:bg-muted transition-colors"
              >
                仅保存
              </button>
              <button
                type="button"
                onClick={exportJson}
                className="h-10 px-4 rounded-xl border border-border bg-background font-semibold hover:bg-muted transition-colors"
              >
                导出内容
              </button>
              <button
                type="button"
                onClick={async () => {
                  const ok = await syncToFile();
                  if (!ok) window.alert("一键同步已取消或失败，请重试。");
                }}
                className="h-10 px-4 rounded-xl border border-border bg-background font-semibold hover:bg-muted transition-colors"
              >
                一键同步文件
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => document.getElementById("visual-edit-import-json")?.click()}
            className="h-10 px-4 rounded-xl border border-border bg-background font-semibold hover:bg-muted transition-colors"
          >
            导入内容
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("将清除本机缓存的作品集内容并重新加载（与线上 JSON 对齐）。未导出的编辑会丢失，是否继续？")) {
                resetLocalContent();
              }
            }}
            className="h-10 px-3 rounded-xl border border-border bg-background text-sm font-semibold hover:bg-muted transition-colors"
            title="也可在地址栏追加 ?clearContent=1 或 #/?clearContent=1"
          >
            对齐线上
          </button>
        </div>
      </div>
    </>
  );
}

