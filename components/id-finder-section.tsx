"use client";

import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";

export function IdFinderSection() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<
    | {
        found: true;
        data: {
          id: string;
          name: string;
          email: string;
          department: string;
          role: string;
          joined: string;
        };
      }
    | { found: false; message?: string }
    | null
  >(null);

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
          message: data.message || "No member found with that ID",
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
          <div className="relative flex-1 max-w-sm">
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
              placeholder="Enter ID, name, or email (e.g. ARK001, Franz, or franz@email.com)"
              className="w-full rounded-lg border border-border/60 bg-card pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
              aria-label="Member ID"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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

        {/* Result */}
        {result && (
          <div className="rounded-xl border border-border/60 bg-card p-6 transition-all animate-in fade-in slide-in-from-bottom-4 duration-300">
            {result.found ? (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium uppercase tracking-wider text-primary/70">
                  {result.data.id}
                </p>
                <p className="font-display text-lg font-semibold text-foreground">
                  {result.data.name}
                </p>
                <p className="text-sm text-foreground/80">
                  {result.data.email}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-accent font-medium">
                    {result.data.role}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {result.data.department}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Joined: {result.data.joined}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {result.message ||
                  "No member found with that ID. Please check and try again."}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
