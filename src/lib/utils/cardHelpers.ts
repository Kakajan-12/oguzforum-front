// Shared helpers for event/project cards (Events & Projects homepage sections).

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  nbsp: " ",
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  ldquo: "“",
  rdquo: "”",
  lsquo: "‘",
  rsquo: "’",
  laquo: "«",
  raquo: "»",
  copy: "©",
  reg: "®",
  deg: "°",
  middot: "·",
};

export const stripHtml = (s?: string) =>
  s
    ? s
        .replace(/<[^>]*>/g, " ")
        .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
        .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
          String.fromCodePoint(parseInt(n, 16)),
        )
        .replace(/&([a-z]+);/gi, (m, name) => NAMED_ENTITIES[name.toLowerCase()] ?? m)
        .replace(/\s+/g, " ")
        .trim()
    : "";

// Month names, indexed 0-11.
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const pad = (n: number) => String(n).padStart(2, "0");

// Rough reading time from rich-text body: ~200 words per minute, min 1.
export function readingTime(html?: string) {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function formatDateRange(start?: string, end?: string) {
  if (!start) return "";
  const s = new Date(start);
  const e = end ? new Date(end) : s;
  if (isNaN(s.getTime())) return "";
  const months = MONTHS;
  const sameMonth =
    s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  if (sameMonth) {
    const day =
      s.getDate() === e.getDate()
        ? `${pad(s.getDate())}`
        : `${pad(s.getDate())}-${pad(e.getDate())}`;
    return `${day} ${months[s.getMonth()]}, ${s.getFullYear()}`;
  }
  return `${pad(s.getDate())} ${months[s.getMonth()].slice(0, 3)} - ${pad(
    e.getDate(),
  )} ${months[e.getMonth()].slice(0, 3)}, ${e.getFullYear()}`;
}
