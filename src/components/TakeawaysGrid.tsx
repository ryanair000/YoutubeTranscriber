interface Takeaway {
  emoji: string;
  title: string;
  description: string;
}

export function TakeawaysGrid({ takeaways }: { takeaways: Takeaway[] }) {
  return (
    <section className="mt-16">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Key Takeaways</h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {takeaways.map((item, i) => (
          <div
            key={i}
            className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all hover:border-white/10 hover:bg-white/[0.04]"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">{item.emoji}</span>
              <div>
                <h3 className="font-medium text-white">{item.title}</h3>
                <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
