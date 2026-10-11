type Props = { id?: string; eyebrow?: string; title: string; intro?: string; className?: string };

export function SectionHeading({ id, eyebrow, title, intro, className = "" }: Props) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && <p className="eyebrow text-signal">{eyebrow}</p>}
      <h2 id={id} className={`h-section ${eyebrow ? "mt-3" : ""}`}>{title}</h2>
      {intro && <p className="lede mt-4">{intro}</p>}
    </div>
  );
}
