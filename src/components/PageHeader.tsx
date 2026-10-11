export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="container-page pb-10 pt-12 sm:pb-14 sm:pt-16">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-signal">Canara Flex</p>
      <h1 className="h-display max-w-[24ch]">{title}</h1>
      {intro && <p className="lede mt-6">{intro}</p>}
    </div>
  );
}
