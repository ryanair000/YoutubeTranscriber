"use client";

import { useState } from "react";
import { BlogForm } from "@/components/blog/BlogForm";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { BlogLoading } from "@/components/blog/BlogLoading";
import { TweetThread } from "@/components/blog/TweetThread";
import { Footer } from "@/components/Footer";
import Link from "next/link";

interface Section {
  heading: string;
  content: string;
}

interface Article {
  title: string;
  subtitle: string;
  metaDescription: string;
  readTime: string;
  tags: string[];
  sections: Section[];
  conclusion: string;
  tweetThread: string[];
}

export default function BlogPage() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate(idea: string, tone: string, length: string) {
    setLoading(true);
    setError(null);
    setArticle(null);

    try {
      const res = await fetch("/api/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, tone, length }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setArticle(data.article);
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
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/10 rounded-full blur-3xl animate-pulse-glow" />

        <div className="relative mx-auto max-w-5xl px-6 pt-12 pb-12">
          {/* Nav */}
          <nav className="mb-8 flex items-center gap-4 text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-300 transition-colors">
              YouTube Summarizer
            </Link>
            <span>/</span>
            <span className="text-zinc-300">Blog Generator</span>
          </nav>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-300 mb-6">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              AI Blog Generator
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-white via-white to-emerald-200 bg-clip-text text-transparent leading-tight">
              Turn Any Idea Into<br />a Blog Article
            </h1>

            <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
              Enter an idea, pick a tone and length, and get a publish-ready article with SEO metadata and a tweet thread in seconds.
            </p>

            <div className="mt-8">
              <BlogForm onSubmit={handleGenerate} loading={loading} />
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
      {loading && <BlogLoading />}

      {/* Result */}
      {article && (
        <main className="mx-auto max-w-4xl px-6 pb-24">
          <BlogArticle article={article} />
          {article.tweetThread?.length > 0 && (
            <TweetThread tweets={article.tweetThread} />
          )}
        </main>
      )}

      <Footer />
    </div>
  );
}
