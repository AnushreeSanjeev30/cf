export function PageHeader({ title, intro, eyebrow = "Canara Flex" }: { title: string; intro?: string; eyebrow?: string }) {
  return (
    <div className="mb-14 border-b border-steel-dark bg-mist sm:mb-16">
      <div className="container-page py-14 sm:py-20">
        <p className="eyebrow text-signal">{eyebrow}</p>
        <h1 className="h-display mt-4 max-w-[24ch]">{title}</h1>
        {intro && <p className="lede mt-6">{intro}</p>}
      </div>
    </div>
  );
}
