"use client";

import React, { useState } from "react";
import { Search, Loader2, User, Mail, Briefcase, Calendar, Shield, Sparkles } from "lucide-react";

type MemberResult = 
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
  | null;

export function IdFinderSection() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MemberResult>(null);

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
    <section id="id-finder" className="relative px-6 py-32 pb-40 overflow-hidden">
      {/* Animated background grid */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border) / 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border) / 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Glowing orbs */}
      <div className="pointer-events-none absolute top-1/3 -left-64 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-1/3 -right-64 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />

      {/* Divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.3), transparent)",
          boxShadow: "0 0 20px hsl(42 70% 55% / 0.15)"
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1">
            <Shield size={12} className="text-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Member Database
            </span>
          </div>

          <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            <span className="text-balance">
              Look Up A{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  Guild Member
                </span>
                <span className="absolute inset-0 bg-yellow-400/20 blur-xl" aria-hidden="true" />
              </span>
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
            Search our guild roster by member ID, name, or email address to find fellow developers.
          </p>
        </div>

        {/* Search Card */}
        <div className="group relative mx-auto max-w-3xl">
          {/* Card glow effect */}
          <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 opacity-0 blur transition-all duration-500 group-hover:opacity-100" aria-hidden="true" />
          
          <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-8 shadow-xl">
            {/* Decorative corner accents */}
            <div className="pointer-events-none absolute top-0 left-0 h-20 w-20">
              <div className="absolute top-0 left-0 h-full w-full border-l-2 border-t-2 border-accent/30 rounded-tl-2xl" />
            </div>
            <div className="pointer-events-none absolute bottom-0 right-0 h-20 w-20">
              <div className="absolute bottom-0 right-0 h-full w-full border-r-2 border-b-2 border-accent/30 rounded-br-2xl" />
            </div>

            {/* Search form */}
            <form onSubmit={handleSearch} className="relative">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  {/* Search icon with animation */}
                  <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                    <Search
                      size={20}
                      className={`text-muted-foreground transition-all duration-300 ${
                        query ? "text-accent scale-110" : ""
                      }`}
                    />
                  </div>
                  
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setResult(null);
                    }}
                    placeholder="Enter ID, name, or email (e.g. ARK001, Franz, or franz@email.com)"
                    className="w-full rounded-xl border border-border/60 bg-background/50 pl-12 pr-4 py-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-all duration-300 hover:border-border"
                    aria-label="Member ID"
                    disabled={loading}
                  />

                  {/* Input underline effect */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-300 group-hover:w-full" />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-accent via-primary to-accent bg-size-200 bg-pos-0 px-8 py-4 text-sm font-bold uppercase tracking-wider text-background transition-all duration-500 hover:bg-pos-100 hover:shadow-lg hover:shadow-accent/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-pos-0 flex items-center justify-center gap-2 min-w-[140px]"
                >
                  {/* Button shimmer effect */}
                  <div className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-[100%]" aria-hidden="true" />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Search
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Result Card */}
        {result && (
          <div 
            className="mx-auto mt-8 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-500"
            style={{ animationFillMode: 'both' }}
          >
            {result.found ? (
              <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm shadow-xl">
                {/* Success glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" aria-hidden="true" />
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/40 via-primary/40 to-accent/40 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />

                <div className="relative p-8">
                  {/* Header with badge */}
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-accent">
                          {result.data.id}
                        </span>
                      </div>
                    </div>
                    
                    {/* Member avatar placeholder */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent/30 bg-accent/10 backdrop-blur-sm">
                      <User size={28} className="text-accent" />
                    </div>
                  </div>

                  {/* Member name */}
                  <h3 className="mb-2 font-display text-3xl font-bold text-foreground">
                    {result.data.name}
                  </h3>

                  {/* Member details grid */}
                  <div className="grid gap-4 mt-6 sm:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-background/30 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                        <Mail size={18} className="text-accent" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                          Email
                        </p>
                        <p className="truncate text-sm font-medium text-foreground">
                          {result.data.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-background/30 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Briefcase size={18} className="text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                          Department
                        </p>
                        <p className="truncate text-sm font-medium text-foreground">
                          {result.data.department}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-background/30 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                        <Shield size={18} className="text-accent" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                          Role
                        </p>
                        <p className="truncate text-sm font-medium text-foreground">
                          {result.data.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-background/30 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Calendar size={18} className="text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                          Joined
                        </p>
                        <p className="truncate text-sm font-medium text-foreground">
                          {result.data.joined}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent to-transparent" />
              </div>
            ) : (
              <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-muted-foreground/20 bg-muted-foreground/5">
                  <Search size={28} className="text-muted-foreground/40" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {result.message || "No guild member found with that search. Please check and try again."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .bg-size-200 {
          background-size: 200% 100%;
        }
        .bg-pos-0 {
          background-position: 0% 0%;
        }
        .bg-pos-100 {
          background-position: 100% 0%;
        }
      `}</style>
    </section>
  );
}