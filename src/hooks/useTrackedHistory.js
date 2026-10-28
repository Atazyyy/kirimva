import { useEffect, useState } from "react";

const KEY = "kirimva-track-history-v1";
const MAX = 6;

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

// Riwayat resi yang pernah dilacak — tersimpan di localStorage.
export function useTrackedHistory() {
  const [history, setHistory] = useState(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(history));
  }, [history]);

  const add = (resi) => {
    if (!resi) return;
    setHistory((h) => [resi, ...h.filter((r) => r !== resi)].slice(0, MAX));
  };

  const clear = () => setHistory([]);

  return { history, add, clear };
}
