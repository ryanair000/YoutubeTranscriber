export function VideoHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto max-w-5xl px-6 pt-16 pb-12">
        {/* Badge */}
        <div className="animate-fade-in mb-8 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            AI-Generated Summary
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-white via-white to-purple-200 bg-clip-text text-transparent leading-tight">
          Stop Building Agents,<br />
          Start Building Skills
        </h1>

        <p className="animate-fade-in-up mt-4 text-lg text-zinc-400 max-w-2xl" style={{ animationDelay: "0.1s" }}>
          Barry &amp; Mahesh from Anthropic introduce <strong className="text-zinc-200">Agent Skills</strong> — a new paradigm for shipping and sharing capabilities with AI agents.
        </p>

        {/* Video embed */}
        <div className="animate-fade-in-up mt-10 aspect-video w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-purple-900/10" style={{ animationDelay: "0.2s" }}>
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/CEvIs9y1uog"
            title="Stop Building Agents, Start Building Skills"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Meta info */}
        <div className="animate-fade-in mt-6 flex flex-wrap gap-6 text-sm text-zinc-500" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Barry &amp; Mahesh, Anthropic
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ~15 min talk
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            AI Agents, Skills, MCP
          </div>
        </div>
      </div>
    </section>
  );
}
