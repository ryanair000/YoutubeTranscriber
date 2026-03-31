"use client";

import { useState } from "react";

interface BlogFormProps {
  onSubmit: (idea: string, tone: string, length: string) => void;
  loading: boolean;
}

export function BlogForm({ onSubmit, loading }: BlogFormProps) {
  const [idea, setIdea] = useState("");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (idea.trim()) onSubmit(idea.trim(), tone, length);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl text-left">
      {/* Idea input */}
      <div className="relative">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your blog idea... e.g. 'How AI is changing the way startups build products in 2026'"
          rows={3}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 px-4 text-white placeholder-zinc-500 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-emerald-500/30 resize-none"
          disabled={loading}
        />
      </div>

      {/* Options row */}
      <div className="mt-3 flex flex-wrap gap-3">
        {/* Tone */}
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs text-zinc-500 mb-1.5 ml-1">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3 text-sm text-white outline-none focus:border-emerald-500/50"
            disabled={loading}
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual & Friendly</option>
            <option value="technical">Technical & Detailed</option>
            <option value="storytelling">Storytelling</option>
            <option value="persuasive">Persuasive & Bold</option>
            <option value="humorous">Humorous & Witty</option>
          </select>
        </div>

        {/* Length */}
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs text-zinc-500 mb-1.5 ml-1">Length</label>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 px-3 text-sm text-white outline-none focus:border-emerald-500/50"
            disabled={loading}
          >
            <option value="short">Short (~700 words)</option>
            <option value="medium">Medium (~1200 words)</option>
            <option value="long">Long (~2000 words)</option>
          </select>
        </div>

        {/* Submit */}
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading || !idea.trim()}
            className="rounded-xl bg-emerald-600 px-6 py-2.5 font-medium text-white transition-all hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Writing...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
