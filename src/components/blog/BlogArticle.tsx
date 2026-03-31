"use client";

import { useState } from "react";

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
}

const tagColors = [
  "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  "bg-blue-500/15 text-blue-300 border-blue-500/20",
  "bg-purple-500/15 text-purple-300 border-purple-500/20",
  "bg-amber-500/15 text-amber-300 border-amber-500/20",
  "bg-rose-500/15 text-rose-300 border-rose-500/20",
  "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
  "bg-orange-500/15 text-orange-300 border-orange-500/20",
  "bg-violet-500/15 text-violet-300 border-violet-500/20",
];

function renderMarkdown(text: string) {
  // Simple markdown: **bold**, *italic*, `code`, \n to <br>
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong class='text-white'>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code class='bg-white/10 px-1.5 py-0.5 rounded text-emerald-300 text-sm'>$1</code>")
    .replace(/\n/g, "<br />");
}

export function BlogArticle({ article }: { article: Article }) {
  const [copied, setCopied] = useState(false);

  function copyAsMarkdown() {
    const md = [
      `# ${article.title}`,
      "",
      `*${article.subtitle}*`,
      "",
      ...article.sections.map((s) =>
        s.heading ? `## ${s.heading}\n\n${s.content}` : s.content
      ),
      "",
      "## Conclusion",
      "",
      article.conclusion,
    ].join("\n\n");

    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <article className="mt-12">
      {/* SEO Meta preview */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 mb-8">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          SEO Preview
        </div>
        <div className="text-blue-400 text-sm font-medium">{article.title}</div>
        <div className="text-xs text-zinc-500 mt-1">{article.metaDescription}</div>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
        {article.title}
      </h1>
      <p className="mt-2 text-lg text-zinc-400 italic">{article.subtitle}</p>

      {/* Meta row */}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <span className="flex items-center gap-1.5 text-sm text-zinc-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {article.readTime}
        </span>
        <div className="flex flex-wrap gap-2">
          {article.tags?.map((tag, i) => (
            <span
              key={i}
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${tagColors[i % tagColors.length]}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Copy button */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={copyAsMarkdown}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition-all hover:bg-white/10"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copied ? "Copied!" : "Copy as Markdown"}
        </button>
      </div>

      {/* Divider */}
      <hr className="my-8 border-white/[0.06]" />

      {/* Sections */}
      <div className="space-y-8">
        {article.sections?.map((section, i) => (
          <section key={i}>
            {section.heading && (
              <h2 className="text-xl font-semibold text-white mb-3">{section.heading}</h2>
            )}
            <div
              className="text-zinc-300 leading-relaxed text-[15px]"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(section.content) }}
            />
          </section>
        ))}

        {/* Conclusion */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Conclusion</h2>
          <div
            className="text-zinc-300 leading-relaxed text-[15px]"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(article.conclusion) }}
          />
        </section>
      </div>
    </article>
  );
}
