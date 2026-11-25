export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="mb-10 max-w-3xl">
    <p className="mb-3 text-xs font-bold uppercase tracking-[.12em] text-indigo-600">{eyebrow}</p>
    <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
    {description && <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{description}</p>}
  </div>;
}
