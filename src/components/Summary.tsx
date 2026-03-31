export function Summary() {
  return (
    <section className="mt-16">
      <SectionHeader icon="summary" title="Summary" />

      <div className="mt-6 space-y-5 text-zinc-300 leading-relaxed text-[15px]">
        <p>
          This is a talk by <strong className="text-white">Barry and Mahesh from Anthropic</strong> about{" "}
          <strong className="text-white">Agent Skills</strong> — a new paradigm they created for extending AI
          agents like Claude Code. Their core thesis:{" "}
          <em className="text-purple-300">
            stop building separate agents for every domain and start building skills instead.
          </em>
        </p>

        <p>
          They explain that after building Claude Code, they realized a coding agent is actually a{" "}
          <strong className="text-white">general-purpose agent</strong> — code is the universal interface to the
          digital world (APIs, file systems, data analysis, document generation). The core scaffolding can be as
          thin as bash + file system. But the real gap isn&apos;t intelligence — it&apos;s{" "}
          <strong className="text-white">domain expertise</strong>. Agents are brilliant but lack the procedural
          knowledge that professionals have.
        </p>

        <p>
          <strong className="text-white">Skills are organized folders</strong> containing markdown instructions,
          scripts, and assets that package composable procedural knowledge. They&apos;re deliberately simple —
          versionable in Git, shareable via zip/Google Drive. Skills are{" "}
          <strong className="text-white">progressively disclosed</strong>: only metadata is loaded into context
          initially; the full skill is read only when needed, allowing agents to have hundreds or thousands of
          skills available without blowing up the context window.
        </p>

        <p>
          Since launching 5 weeks prior to this talk, thousands of skills have been created across three
          categories: foundational skills (new general capabilities like document creation), third-party/partner
          skills (Browserbase, Notion), and enterprise/team skills (org-specific best practices). They&apos;ve
          already used this to launch Claude offerings in{" "}
          <strong className="text-white">financial services</strong> and{" "}
          <strong className="text-white">life sciences</strong>.
        </p>
      </div>
    </section>
  );
}

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  const icons: Record<string, React.ReactNode> = {
    summary: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
        {icons[icon]}
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
    </div>
  );
}
