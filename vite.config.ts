import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import AutoImport from "unplugin-auto-import/vite";
import checker from "vite-plugin-checker";
import * as lucideIcons from "lucide-react";

// 获取所有 lucide-react 导出的符号名
const allLucideExports = Object.keys(lucideIcons).filter(
  (key) => key !== "default"
);

// 扫描 src 目录，找出实际使用的 lucide 图标
function getUsedLucideIcons() {
  const usedIcons = new Set<string>();
  const srcPath = path.resolve(__dirname, "./src");

  function scanDirectory(dir: string) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (/\.(tsx?|jsx?)$/.test(file)) {
        const content = fs.readFileSync(filePath, "utf-8");

        // 匹配 JSX 标签和标识符使用
        for (const icon of allLucideExports) {
          // 匹配: <IconName、{IconName、= IconName、: IconName 等
          const patterns = [
            new RegExp(`<${icon}[\\s/>]`, "g"),
            new RegExp(`[{\\s,=:]${icon}[\\s,})]`, "g"),
          ];

          if (patterns.some((pattern) => pattern.test(content))) {
            usedIcons.add(icon);
          }
        }
      }
    }
  }

  scanDirectory(srcPath);
  return Array.from(usedIcons);
}

const usedLucideIcons = getUsedLucideIcons();

/** 构建时注入对外绝对地址（GitHub Actions 传 VITE_SITE_URL），便于 og / 分享链接 */
function injectPublicSiteMeta(): import("vite").Plugin {
  return {
    name: "inject-public-site-meta",
    transformIndexHtml(html) {
      const publicSite = process.env.VITE_SITE_URL?.trim();
      if (!publicSite) return html;
      const origin = publicSite.endsWith("/") ? publicSite : `${publicSite}/`;
      const ogImage = new URL("og-image.png", origin).href;
      const canonical = origin.replace(/\/+$/, "/");
      let out = html.replace(
        /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
        `<meta property="og:image" content="${ogImage}" />`
      );
      if (!out.includes('property="og:url"')) {
        out = out.replace(
          "</head>",
          `  <meta property="og:url" content="${canonical}" />\n  <link rel="canonical" href="${canonical}" />\n</head>`
        );
      }
      return out;
    },
  };
}

// https://vite.dev/config/
// 部署到子路径（如 GitHub Pages `https://user.github.io/repo/`）时设置环境变量：VITE_BASE=/repo/
// 对外分享绝对地址：VITE_SITE_URL=https://user.github.io/repo/（CI 已自动传入）
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [
    injectPublicSiteMeta(),
    react(),
    tailwindcss(),
    AutoImport({
      dts: "auto-imports.d.ts",
      include: [/\.[tj]sx?$/],
      imports: [
        "react",
        {
          "lucide-react": usedLucideIcons,
        },
      ],
      eslintrc: {
        enabled: false,
      },
    }),
    checker({
      typescript: {
        tsconfigPath: "tsconfig.app.json",
      },
      enableBuild: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
