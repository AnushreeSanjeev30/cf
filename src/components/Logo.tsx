// Canara Flex mark: the red CF roundel inside a gear, with the wordmark and tagline.
// Redrawn from the old site's logo. TODO: swap for the client's original artwork if they supply it.

function gearPath(teeth: number, outer: number, inner: number, cx = 50, cy = 50) {
  const step = (Math.PI * 2) / teeth;
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    // Each tooth: rise, flat top, fall, flat root.
    [
      [inner, a],
      [outer, a + step * 0.12],
      [outer, a + step * 0.42],
      [inner, a + step * 0.54],
    ].forEach(([r, t]) => pts.push(`${(cx + r * Math.cos(t)).toFixed(2)},${(cy + r * Math.sin(t)).toFixed(2)}`));
  }
  return `M${pts.join("L")}Z`;
}

const GEAR = gearPath(22, 49, 43.5);

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d={GEAR} fill="currentColor" />
      <circle cx="50" cy="50" r="40" fill="#FFFFFF" />
      <circle cx="50" cy="50" r="36.5" fill="#ED2028" />
      <circle cx="50" cy="50" r="27" fill="#FFFFFF" />
      <text
        x="50"
        y="61"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="31"
        letterSpacing="-1"
        fill="#FFFFFF"
        stroke="#ED2028"
        strokeWidth="2.4"
        paintOrder="normal"
      >
        CF
      </text>
    </svg>
  );
}

export function Logo({ tagline = true, inverted = false }: { tagline?: boolean; inverted?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className={`h-11 w-11 shrink-0 sm:h-12 sm:w-12 ${inverted ? "text-steel" : "text-[#1E1E1E]"}`} />
      <span className="flex flex-col leading-none">
        <span className={`type-wide text-[1.35rem] font-extrabold tracking-tight sm:text-[1.55rem] ${inverted ? "text-white" : "text-[#111]"}`}>
          Canara Flex
        </span>
        {tagline && (
          <span className={`mt-1 text-[0.72rem] italic tracking-wide sm:text-[0.78rem] ${inverted ? "text-steel/70" : "text-slate/80"}`}>
            Mfg. of Flexible Packaging Machineries
          </span>
        )}
      </span>
    </span>
  );
}
