const topics = [
  { label: "Evolution of AI Agents", color: "bg-purple-500/15 text-purple-300 border-purple-500/20" },
  { label: "Domain Expertise Gap", color: "bg-rose-500/15 text-rose-300 border-rose-500/20" },
  { label: "Skills Design Philosophy", color: "bg-blue-500/15 text-blue-300 border-blue-500/20" },
  { label: "Progressive Disclosure", color: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20" },
  { label: "Growing Ecosystem", color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20" },
  { label: "Skills + MCP", color: "bg-amber-500/15 text-amber-300 border-amber-500/20" },
  { label: "Enterprise Adoption", color: "bg-orange-500/15 text-orange-300 border-orange-500/20" },
  { label: "Continuous Learning", color: "bg-violet-500/15 text-violet-300 border-violet-500/20" },
];

export function TopicsCovered() {
  return (
    <section className="mt-20">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Topics Covered</h2>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {topics.map((topic, i) => (
          <span
            key={i}
            className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-transform hover:scale-105 ${topic.color}`}
          >
            {topic.label}
          </span>
        ))}
      </div>
    </section>
  );
}
