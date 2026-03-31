const layers = [
  {
    label: "Skill Library",
    sublabel: "Domain expertise, procedural knowledge",
    color: "border-purple-500/30 bg-purple-500/5",
    dot: "bg-purple-400",
  },
  {
    label: "MCP Servers",
    sublabel: "External tools, data, connectivity",
    color: "border-blue-500/30 bg-blue-500/5",
    dot: "bg-blue-400",
  },
  {
    label: "Agent Runtime",
    sublabel: "Context management, code execution, file system",
    color: "border-emerald-500/30 bg-emerald-500/5",
    dot: "bg-emerald-400",
  },
  {
    label: "Foundation Model",
    sublabel: "Intelligence, reasoning, generation",
    color: "border-amber-500/30 bg-amber-500/5",
    dot: "bg-amber-400",
  },
];

export function Architecture() {
  return (
    <section className="mt-20">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Emerging Agent Architecture</h2>
      </div>

      <p className="mt-4 text-sm text-zinc-400">
        The talk presents this converging architecture for general-purpose AI agents:
      </p>

      <div className="mt-6 space-y-3">
        {layers.map((layer, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 rounded-xl border p-4 transition-all hover:scale-[1.01] ${layer.color}`}
          >
            <div className={`h-3 w-3 rounded-full ${layer.dot} shrink-0`} />
            <div>
              <h3 className="font-medium text-white">{layer.label}</h3>
              <p className="text-sm text-zinc-400">{layer.sublabel}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Computing analogy */}
      <div className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Computing Analogy</h3>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl">🧠</div>
            <div className="mt-2 text-sm font-medium text-white">Models</div>
            <div className="text-xs text-zinc-500">= Processors</div>
          </div>
          <div>
            <div className="text-2xl">⚙️</div>
            <div className="mt-2 text-sm font-medium text-white">Agent Runtimes</div>
            <div className="text-xs text-zinc-500">= Operating Systems</div>
          </div>
          <div>
            <div className="text-2xl">📦</div>
            <div className="mt-2 text-sm font-medium text-white">Skills</div>
            <div className="text-xs text-zinc-500">= Applications</div>
          </div>
        </div>
      </div>
    </section>
  );
}
