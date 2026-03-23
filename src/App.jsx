import { useEffect, useState } from "react";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ProjectsListPage from "./pages/ProjectsListPage";
import { getSlugFromPath } from "./routing";

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname);
  const activeSlug = getSlugFromPath(pathname);

  useEffect(() => {
    function handlePopState() {
      setPathname(window.location.pathname);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(path) {
    window.history.pushState({}, "", path);
    setPathname(path);
  }

  return (
    <main className="app">
      <h1>Projecten</h1>
      {activeSlug ? (
        <ProjectDetailPage slug={activeSlug} onBack={() => navigate("/")} />
      ) : (
        <ProjectsListPage onOpenProject={(slug) => navigate(`/projects/${slug}`)} />
      )}
    </main>
  );
}
