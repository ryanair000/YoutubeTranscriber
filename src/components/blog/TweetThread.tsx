"use client";

import { useState } from "react";

export function TweetThread({ tweets }: { tweets: string[] }) {
  const [copied, setCopied] = useState(false);

  function copyThread() {
    const text = tweets.map((t, i) => `${i + 1}/ ${t}`).join("\n\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">Tweet Thread</h2>
        </div>
        <button
          onClick={copyThread}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 transition-all hover:bg-white/10"
        >
          {copied ? "Copied!" : "Copy thread"}
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {tweets.map((tweet, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:border-white/10"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-xs font-bold text-sky-300">
                {i + 1}
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed">{tweet}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
