"use client";

import { Mail, MessageSquare, MapPin } from "lucide-react";
import { Twitter, Github, Youtube } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="relative px-6 py-32">
      {/* Subtle divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.2), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Get in Touch
        </p>

        <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          <span className="text-balance">
            Reached the core! Drop us a message and let's create something
            legendary
          </span>
        </h2>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-xl border border-border/60 bg-card p-8">
            <h3 className="mb-6 font-display text-xl font-bold text-foreground">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-border/60 bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-border/60 bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full rounded-lg border border-border/60 bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell us about your idea..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:shadow-primary/20"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="rounded-xl border border-border/60 bg-card p-8">
              <h3 className="mb-6 font-display text-xl font-bold text-foreground">
                Quick Contact
              </h3>

              <div className="space-y-4">
                <a
                  href="mailto:hello@ark.gg"
                  className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 transition-colors group-hover:border-primary/40 group-hover:bg-primary/10">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span>hello@ark.gg</span>
                </a>

                <a
                  href="#"
                  className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 transition-colors group-hover:border-primary/40 group-hover:bg-primary/10">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <span>Join our Discord</span>
                </a>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-secondary/40">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span>Worldwide (Remote)</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-xl border border-border/60 bg-card p-8">
              <h3 className="mb-6 font-display text-xl font-bold text-foreground">
                Follow the Dig
              </h3>

              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-lg border border-border/60 bg-secondary/40 text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-xl border border-border/60 bg-card p-8">
              <h3 className="mb-2 font-display text-xl font-bold text-foreground">
                Mine Updates
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Get notified about new games, events, and exclusive content.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 rounded-lg border border-border/60 bg-secondary/40 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
