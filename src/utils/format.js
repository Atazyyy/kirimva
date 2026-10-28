export const num = (n) => n.toLocaleString("id-ID");

export const fmtDate = (ts) =>
  new Date(ts).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const fmtTime = (ts) =>
  new Date(ts).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const fmtDateTime = (ts) => `${fmtDate(ts)}, ${fmtTime(ts)}`;

export const fullDate = () =>
  new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const isSameDay = (a, b) => {
  const d1 = new Date(a);
  const d2 = new Date(b);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

// Lama kirim dalam jam → label ramah
export const durLabel = (hours) => {
  if (hours < 24) return `${Math.round(hours)} jam`;
  const days = hours / 24;
  return `${days.toFixed(1).replace(".", ",")} hari`;
};
