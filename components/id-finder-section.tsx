"use client";

import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";

interface MemberData {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  joined: string;
  source: string;
}

type SearchResult =
  | { found: true; data: MemberData[] }
  | { found: false; message?: string }
  | null;

export function IdFinderSection() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `/api/members?id=${encodeURIComponent(trimmed)}`,
      );
      const data = await response.json();

      if (response.ok && data.found) {
        setResult({ found: true, data: data.data });
      } else {
        setResult({
          found: false,
          message: data.message || "No member found with that search",
        });
      }
    } catch (error) {
      console.error("Error searching member:", error);
      setResult({
        found: false,
        message: "Error searching for member. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="id-finder" className="relative px-6 py-32">
      {/* Subtle divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(180 20% 25% / 0.4), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          ID Finder
        </p>

        <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          <span className="text-balance">Look up a member</span>
        </h2>

        <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Search by member ID, name, or email address.
        </p>

        {/* Search form */}
        <form onSubmit={handleSearch} className="mb-8 flex gap-3">
          <div className="relative max-w-sm flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setResult(null);
              }}
              placeholder="Enter ID, name, or email (e.g. ARK-001, Franz, or franz@email.com)"
              className="w-full rounded-lg border border-border/60 bg-card py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Member ID"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {result.found ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Found{" "}
                  <span className="font-semibold text-foreground">
                    {result.data.length}
                  </span>{" "}
                  {result.data.length === 1 ? "result" : "results"}
                </p>

                {result.data.map((member, index) => (
                  <div
                    key={`${member.source}-${member.id}-${index}`}
                    className="rounded-xl border border-border/60 bg-card p-6 transition-all"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <p className="text-xs font-medium uppercase tracking-wider text-primary/70">
                          {member.id}
                        </p>
                        <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {member.source}
                        </span>
                      </div>
                      <p className="font-display text-lg font-semibold text-foreground">
                        {member.name}
                      </p>
                      <p className="text-sm text-foreground/80">
                        {member.email}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-accent">
                          {member.role}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">
                          {member.department}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Joined: {member.joined}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <p className="text-sm text-muted-foreground">
                  {result.message ||
                    "No member found. Please check and try again."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
