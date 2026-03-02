import { Navigate, Route, Routes } from "react-router-dom";
import CandidateDetail from "./pages/CandidateDetail.jsx";
import Page0 from "./pages/Page0.jsx";
import Page1 from "./pages/Page1.jsx";
import Page2 from "./pages/Page2.jsx";
import Page3 from "./pages/Page3.jsx";
import Page4 from "./pages/Page4.jsx";
import Page5 from "./pages/Page5.jsx";
import Page6 from "./pages/Page6.jsx";
import { useExperiment } from "./context/ExperimentContext.jsx";

function ExperimentalOnly({ children }) {
  const {
    state: { group },
  } = useExperiment();

  if (!group) return <Navigate to="/page0" replace />;
  if (group === "control") return <Navigate to="/page6" replace />;
  return children;
}

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_circle_at_10%_-10%,#dbeafe,transparent_55%),radial-gradient(900px_circle_at_90%_10%,#e2e8f0,transparent_55%),linear-gradient(#f8fafc,#f8fafc)]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8">
        <header className="mb-6 flex flex-col gap-3">
          <div>
            {/* <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Behavioral Decision Lab
            </p> */}
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              心理学实验
            </h1>
          </div>
        </header>

        <main className="section-card flex-1 p-6 sm:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/page0" replace />} />
            <Route path="/page0" element={<Page0 />} />
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page2/candidate/:id" element={<CandidateDetail />} />
            <Route
              path="/page3"
              element={
                <ExperimentalOnly>
                  <Page3 />
                </ExperimentalOnly>
              }
            />
            <Route
              path="/page4"
              element={
                <ExperimentalOnly>
                  <Page4 />
                </ExperimentalOnly>
              }
            />
            <Route
              path="/page5"
              element={
                <ExperimentalOnly>
                  <Page5 />
                </ExperimentalOnly>
              }
            />
            <Route path="/page6" element={<Page6 />} />
            <Route path="*" element={<Navigate to="/page0" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
