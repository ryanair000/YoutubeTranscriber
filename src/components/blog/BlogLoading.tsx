export function BlogLoading() {
  const steps = [
    "Brainstorming structure...",
    "Writing sections...",
    "Crafting SEO metadata...",
    "Generating tweet thread...",
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-500 animate-spin" />
          <div className="absolute inset-3 rounded-full border-2 border-transparent border-t-emerald-300 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
        </div>

        <div className="space-y-3 text-center">
          {steps.map((step, i) => (
            <p
              key={i}
              className="text-sm text-zinc-400 animate-fade-in"
              style={{ animationDelay: `${i * 0.4}s`, opacity: 0 }}
            >
              {step}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
