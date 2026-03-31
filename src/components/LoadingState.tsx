export function LoadingState() {
  const steps = [
    "Extracting video transcript...",
    "Analyzing content with AI...",
    "Generating summary & takeaways...",
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 animate-spin" />
          <div className="absolute inset-3 rounded-full border-2 border-transparent border-t-purple-300 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
        </div>

        <div className="space-y-3 text-center">
          {steps.map((step, i) => (
            <p
              key={i}
              className="text-sm text-zinc-400 animate-fade-in"
              style={{ animationDelay: `${i * 0.3}s`, opacity: 0 }}
            >
              {step}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
