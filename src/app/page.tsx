"use client";

import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { VideoEmbed } from "@/components/VideoEmbed";
import { SummarySection } from "@/components/SummarySection";
import { TakeawaysGrid } from "@/components/TakeawaysGrid";
import { TopicTags } from "@/components/TopicTags";
import { LoadingState } from "@/components/LoadingState";
import { Footer } from "@/components/Footer";

interface Takeaway {
  emoji: string;
  title: string;
  description: string;
}

interface Topic {
  label: string;
  colorClass: string;
}

interface Analysis {
  title: string;
  speakers: string;
  duration: string;
  summary: string[];
  takeaways: Takeaway[];
  topics: Topic[];
}

interface Result {
  videoId: string;
  analysis: Analysis;
}

export default function Home() {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(url: string) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResult(data);
    } catch {
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-3xl animate-pulse-glow" />

        <div className="relative mx-auto max-w-5xl px-6 pt-16 pb-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 text-sm font-medium text-purple-300 mb-6">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
              </svg>
              YouTube AI Summarizer
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-white via-white to-purple-200 bg-clip-text text-transparent leading-tight">
              Summarize Any<br />YouTube Video
            </h1>

            <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
              Paste a YouTube URL and get an AI-powered summary with key takeaways, topics, and insights in seconds.
            </p>

            <div className="mt-8">
              <SearchBar onSubmit={handleSubmit} loading={loading} />
            </div>

            {error && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm text-red-300">
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                {error}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Loading */}
      {loading && <LoadingState />}

      {/* Results */}
      {result && (
        <main className="mx-auto max-w-5xl px-6 pb-24">
          {/* Video + Meta */}
          <section className="mt-12">
            <h2 className="text-3xl font-bold text-white">{result.analysis.title}</h2>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-500">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {result.analysis.speakers}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {result.analysis.duration}
              </span>
            </div>

            <div className="mt-6">
              <VideoEmbed videoId={result.videoId} />
            </div>
          </section>

          {/* Summary */}
          <SummarySection paragraphs={result.analysis.summary} />

          {/* Takeaways */}
          <TakeawaysGrid takeaways={result.analysis.takeaways} />

          {/* Topics */}
          <TopicTags topics={result.analysis.topics} />
        </main>
      )}

      <Footer />
    </div>
  );
}
