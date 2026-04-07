import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Competencies from "./pages/Competencies";
import ResourceLinks from "./pages/ResourceLinks";
import { VisualEditProvider } from "./context/VisualEditContext";
import VisualEditToolbar from "./components/VisualEditToolbar";

const queryClient = new QueryClient();

const App = () => {
  console.log("App initialized with Portfolio routes");
  
  return (
    <QueryClientProvider client={queryClient}>
      <VisualEditProvider>
        {/* HashRouter 不要传 basename：basename 作用在 # 后的路径上，与 Vite 的 publicPath 混用易导致「无匹配路由」白屏。子目录部署用 Vite base 即可，路由仍为 #/… */}
        <HashRouter>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/competencies" element={<Competencies />} />
            <Route path="/resource-links" element={<ResourceLinks />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <VisualEditToolbar />
        </HashRouter>
      </VisualEditProvider>
    </QueryClientProvider>
  );
};

export default App;