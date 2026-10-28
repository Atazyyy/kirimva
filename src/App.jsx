import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Lacak from "./components/Lacak";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [view, setView] = useState("lacak");
  const [query, setQuery] = useState("");

  const navigate = (v) => {
    setView(v);
    window.scrollTo({ top: 0 });
  };

  // Dari tabel kiriman → buka detail perjalanan di halaman Lacak
  const onTrack = (resi) => {
    setQuery(resi);
    navigate("lacak");
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas font-sans text-ink antialiased">
      <Navbar view={view} onNavigate={navigate} />
      <main className="flex-1 pb-16 sm:pb-0">
        <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
          {view === "lacak" && <Lacak initialQuery={query} />}
          {view === "dashboard" && <Dashboard onTrack={onTrack} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
