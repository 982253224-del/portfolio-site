/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  /** 每次 CI 构建变更，用于使访客端丢弃旧 localStorage 并拉取最新 JSON */
  readonly VITE_BUILD_ID?: string;
}
