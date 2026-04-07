/** 对外访问根地址（GitHub Pages 构建时由 VITE_SITE_URL 注入）；本地开发回退为当前 origin + base */
export function getPublicSiteRoot(): string {
  const configured = import.meta.env.VITE_SITE_URL?.trim();
  if (configured && /^https?:\/\//i.test(configured)) {
    return configured.endsWith("/") ? configured : `${configured}/`;
  }
  if (typeof window === "undefined") return "/";
  const base = import.meta.env.BASE_URL || "/";
  return `${window.location.origin}${base.endsWith("/") ? base : `${base}/`}`;
}
