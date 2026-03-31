const takeaways = [
  {
    emoji: "🖥️",
    title: "Code is the universal interface",
    description:
      "A coding agent is a general-purpose agent, not just a developer tool. Code connects to APIs, file systems, data analysis, and document generation.",
  },
  {
    emoji: "🧩",
    title: "Skills > Agents",
    description:
      "Instead of building a new agent per domain, equip one general agent with domain-specific skills.",
  },
  {
    emoji: "📁",
    title: "Skills are just folders",
    description:
      "Markdown files + scripts + assets, deliberately simple and portable. Version in Git, share via zip.",
  },
  {
    emoji: "🎯",
    title: "Progressive disclosure protects context",
    description:
      "Only skill metadata is loaded upfront; full content is pulled in on demand when the agent needs it.",
  },
  {
    emoji: "⚙️",
    title: "Scripts inside skills serve as tools",
    description:
      "More self-documenting and modifiable than traditional tool definitions. Agents can even modify them.",
  },
  {
    emoji: "🔗",
    title: "Skills complement MCP",
    description:
      "MCP provides external connectivity, skills provide the expertise to use it effectively.",
  },
  {
    emoji: "👥",
    title: "Non-technical users are building skills",
    description:
      "People in finance, legal, and recruiting are extending agents for their own workflows without coding.",
  },
  {
    emoji: "🏗️",
    title: "The emerging agent architecture",
    description:
      "Agent loop + runtime environment + MCP servers + skill library. A converging standard for general agents.",
  },
  {
    emoji: "🧠",
    title: "Skills enable continuous learning",
    description:
      'Claude can create, evolve, and retire skills over time, making "day 30 Claude" much better than "day 1 Claude".',
  },
  {
    emoji: "💻",
    title: "Analogy to computing",
    description:
      "Models = processors, Agent runtimes = operating systems, Skills = applications — the real value comes from the app layer.",
  },
];

export function KeyTakeaways() {
  return (
    <section className="mt-20">
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
