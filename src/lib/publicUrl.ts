/** 为 public 目录下的根路径资源加上 Vite `base`（GitHub Pages 项目站为 `/仓库名/`）。 */
export function publicUrl(path: string): string {
  if (!path) return path;
  if (/^(https?:|data:|\/\/)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL || "/";
  const p = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${p}`.replace(/\/{2,}/g, "/");
}
