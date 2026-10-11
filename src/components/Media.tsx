import Image from "next/image";

type Props = {
  image?: { src: string; alt: string };
  /** Shown in the placeholder while the client's photo is pending. */
  label: string;
  ratio?: "4/3" | "16/10" | "1/1" | "3/2";
  priority?: boolean;
  sizes?: string;
  framed?: boolean;
  className?: string;
};

const ratios = { "4/3": "aspect-[4/3]", "16/10": "aspect-[16/10]", "1/1": "aspect-square", "3/2": "aspect-[3/2]" };

/**
 * Product photo with printer's crop marks at the corners.
 * Falls back to a labelled placeholder when no photo exists yet.
 */
export function Media({ image, label, ratio = "4/3", priority, sizes = "(min-width: 1024px) 50vw, 100vw", framed = true, className = "" }: Props) {
  return (
    <div className={`relative ${framed ? "p-3 sm:p-4" : ""} ${className}`}>
      {framed && <CropMarks />}
      <div className={`relative overflow-hidden bg-steel ${ratios[ratio]}`}>
        {image ? (
          <Image src={image.src} alt={image.alt} fill priority={priority} sizes={sizes} className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <RegistrationMark className="h-10 w-10 text-slate/60" />
            <p className="max-w-[24ch] text-sm text-slate">{label}</p>
            <p className="text-xs text-slate/80">Photo coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CropMarks() {
  const corner = "absolute h-3 w-3 border-graphite/50 sm:h-4 sm:w-4";
  return (
    <span aria-hidden>
      <span className={`${corner} left-0 top-0 border-l border-t`} />
      <span className={`${corner} right-0 top-0 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}

export function RegistrationMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="20" cy="20" r="11" />
      <circle cx="20" cy="20" r="5" />
      <path d="M20 2v36M2 20h36" />
    </svg>
  );
}
