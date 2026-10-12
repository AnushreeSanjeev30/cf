// A print control strip: one patch per gravure station.
// On the home page it stands for the RG 3000's eight colour stations.

const PATCHES = ["#00A0E3", "#E5007E", "#FFE000", "#1E1E1E", "#ED2028", "#009B55", "#F39200", "#FFFFFF"];

export function ColourStrip({ count = 8, className = "", size = "md" }: { count?: number; className?: string; size?: "sm" | "md" }) {
  const patches = PATCHES.slice(0, Math.min(count, PATCHES.length));
  const dim = size === "sm" ? "h-3 w-3" : "h-5 w-5";
  return (
    <span className={`inline-flex ${className}`} role="img" aria-label={`${count} colour stations`}>
      {patches.map((c, i) => (
        <span key={i} className={`${dim} border border-graphite/25 -ml-px first:ml-0`} style={{ background: c }} />
      ))}
    </span>
  );
}
