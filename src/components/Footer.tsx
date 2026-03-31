export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8 mt-auto">
      <div className="mx-auto max-w-5xl px-6 flex flex-col items-center gap-2 text-sm text-zinc-500">
        <p>
          <span className="text-zinc-300 font-medium">YouTube AI Summarizer</span>{" "}
          — powered by Claude
        </p>
        <p className="text-xs text-zinc-600">
          Paste any YouTube URL to get an AI-generated summary with key takeaways
        </p>
      </div>
    </footer>
  );
}
