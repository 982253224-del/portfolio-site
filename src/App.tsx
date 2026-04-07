import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Competencies from "./pages/Competencies";
import ResourceLinks from "./pages/ResourceLinks";
import { VisualEditProvider, useVisualEdit } from "./context/VisualEditContext";
import VisualEditToolbar from "./components/VisualEditToolbar";

const queryClient = new QueryClient();

function AppRoutes() {
  const { contentReady } = useVisualEdit();

  if (!contentReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-background text-foreground">
        <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" aria-hidden />
        <p className="text-sm text-muted-foreground">正在加载作品集内容…</p>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/competencies" element={<Competencies />} />
        <Route path="/resource-links" element={<ResourceLinks />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <VisualEditToolbar />
    </>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <VisualEditProvider>
        {/* HashRouter 不要传 basename：basename 作用在 # 后的路径上，与 Vite 的 publicPath 混用易导致「无匹配路由」白屏。子目录部署用 Vite base 即可，路由仍为 #/… */}
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </VisualEditProvider>
    </QueryClientProvider>
  );
};

export default App;
