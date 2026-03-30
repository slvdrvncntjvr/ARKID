"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Calendar, Users, ExternalLink } from "lucide-react";

type Project = {
  title: string;
  type: string;
  description: string;
  image?: string;
  imageAlt?: string;
  tags: string[];
  date: string;
  participants: string;
  links: { label: string; url: string }[];
};

const projects: Project[] = [
  {
    title: "Technology Workshop Series",
    type: "Workshop",
    description:
      "Ongoing series of hands-on workshops covering cutting-edge technologies and development practices.",
    tags: ["Workshop", "Education"],
    date: "February 18, 2026 →",
    participants: "Ongoing",
    links: [],
  },
  {
    title: "AWS Partnership",
    type: "Partnership",
    description:
      "Strategic partnership with Amazon Web Services empowering ARK with cloud infrastructure and resources.",
    tags: ["Partnership", "AWS"],
    date: "2025",
    participants: "Guild",
    links: [
      {
        label: "Announcement",
        url: "https://facebook.com/share/p/18Jni3jVmk/",
      },
    ],
  },
  {
    title: "CCIS Week Booth",
    type: "Booth",
    description:
      "Interactive booth showcasing ARK's projects, games, and recruitment during CCIS Week.",
    tags: ["Exhibition", "CCIS Week"],
    date: "December 12, 2025",
    participants: "15+",
    links: [
      {
        label: "Booth Photos",
        url: "https://facebook.com/share/p/17ybfTT1iV/",
      },
    ],
  },
  {
    title: '"Take One, Leave the Rest" Game Jam',
    type: "Game Jam",
    description:
      "ARK-hosted game jam during CCIS Week challenging students to rapid-prototype creative game concepts.",
    image: "/projects/take-one-1.jpg",
    imageAlt: "ARK members gathered during the Take One, Leave the Rest game jam.",
    tags: ["Game Jam", "CCIS Week"],
    date: "December 11, 2025",
    participants: "40+",
    links: [
      {
        label: "Event Details",
        url: "https://web.facebook.com/share/p/1TL7fzL1zo/",
      },
      { label: "Winners", url: "https://facebook.com/share/p/1DX3YrG7jj/" },
      { label: "Event Photo 2", url: "/projects/take-one-2.jpg" },
    ],
  },
  {
    title: "DEVCON Game Jam Finals",
    type: "Finals",
    description:
      "Team Bangungot advanced to the national finals, representing ARK among the Philippines' best.",
    tags: ["Competition", "Finals"],
    date: "2025",
    participants: "4",
    links: [],
  },
  {
    title: "ARK Onboarding",
    type: "Workshop",
    description:
      "New members welcomed into the guild through intensive orientation and team-building activities.",
    tags: ["Community", "Training"],
    date: "November 15, 2025",
    participants: "30+",
    links: [
      { label: "Photos", url: "https://web.facebook.com/share/p/1AmtYckJ3c/" },
      { label: "Video", url: "https://web.facebook.com/share/v/171qEFvP3X/" },
    ],
  },
  {
    title: "YGG Play Summit 2025",
    type: "Conference",
    description:
      "ARK represented at Southeast Asia's premier gaming summit, connecting with industry pioneers.",
    tags: ["Gaming", "Summit"],
    date: "November 2025",
    participants: "10",
    links: [
      {
        label: "Event Post",
        url: "https://web.facebook.com/share/p/14TpbwR7xcV/",
      },
      {
        label: "Highlights",
        url: "https://web.facebook.com/share/v/14VAZ1FqqLe/",
      },
    ],
  },
  {
    title: "DOST NCR: POWERUP",
    type: "Workshop",
    description:
      "Intensive tech skills workshop powered by DOST NCR, elevating our guild's technical capabilities.",
    tags: ["Workshop", "Partnership"],
    date: "Sept. 13-14, 2025",
    participants: "20+",
    links: [
      {
        label: "Event Recap",
        url: "https://web.facebook.com/share/p/15d1z5kprSr/",
      },
    ],
  },
  {
    title: "DEVCON: BANGUNGOT",
    type: "Game Jam",
    description:
      "A haunting Filipino folklore-inspired game showcasing cultural storytelling through interactive media.",
    tags: ["Game Jam", "DEVCON"],
    date: "August 2025",
    participants: "4",
    links: [
      { label: "Trailer", url: "https://web.facebook.com/share/v/1DNbnCA2me/" },
      { label: "Play Game", url: "https://leeprince.itch.io/bangungot" },
    ],
  },
  {
    title: "DEVCON: CHECKMATE",
    type: "Game Jam",
    description:
      "Team Checkmate's strategic masterpiece created during Game On! Game Jam Manila 2025.",
    tags: ["Game Jam", "DEVCON"],
    date: "August 2025",
    participants: "5",
    links: [
      { label: "Trailer", url: "https://web.facebook.com/share/v/1CCxJD7oZq/" },
      { label: "Play Game", url: "https://jokumaaa.itch.io/checkmate" },
    ],
  },
  {
    title: "Interest Check: The Gates Open",
    type: "Recruitment",
    description:
      "The ARK opened its gates seeking students ready to explore, learn, and build beyond the screen.",
    tags: ["Recruitment", "Community"],
    date: "July 25, 2025",
    participants: "50+",
    links: [
      {
        label: "Announcement",
        url: "https://web.facebook.com/share/p/1FbViQv7Jc/",
      },
    ],
  },
  {
    title: "Philippine Tech Career Fest",
    type: "Conference",
    description:
      "Guild members explored career opportunities and networked with tech industry leaders across the Philippines.",
    tags: ["Career", "Networking"],
    date: "March 29, 2025",
    participants: "10",
    links: [
      {
        label: "Event Post",
        url: "https://web.facebook.com/share/p/1AtfZorwAE/",
      },
    ],
  },
  {
    title: "Global Hackathon",
    type: "Hackathon",
    description:
      "ARK's inaugural international hackathon participation, showcasing our guild's talent on a global stage.",
    tags: ["International", "Competition"],
    date: "August 2024",
    participants: "4",
    links: [],
  },
];

const INITIAL_COUNT = 4;

/* ─── Card ─── */
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/70 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-[5px] hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
      {project.image && (
        <div className="mb-5 overflow-hidden rounded-xl border border-border/50 bg-black/20">
          <Image
            src={project.image}
            alt={project.imageAlt || `${project.title} photo`}
            width={1200}
            height={675}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}

      {/* top-edge highlight */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-[60%] -translate-x-1/2 opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to right, transparent, hsl(var(--accent)), transparent)",
        }}
      />

      {/* corner brackets */}
      {[
        "top-[6px] left-[6px] border-t-2 border-l-2",
        "top-[6px] right-[6px] border-t-2 border-r-2",
        "bottom-[6px] left-[6px] border-b-2 border-l-2",
        "bottom-[6px] right-[6px] border-b-2 border-r-2",
      ].map((pos, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute h-4 w-4 border-accent/30 transition-opacity duration-300 group-hover:border-accent/80 ${pos}`}
        />
      ))}

      {/* title */}
      <h3 className="mb-2 font-display text-xl font-bold leading-tight text-foreground">
        {project.title}
      </h3>

      {/* description */}
      <p className="mb-5 text-sm leading-relaxed text-muted-foreground/80">
        {project.description}
      </p>

      {/* metadata */}
      <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar size={13} className="text-accent" />
          <span>{project.date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users size={13} className="text-accent" />
          <span>{project.participants}</span>
        </div>
      </div>

      {/* tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-accent/20 bg-accent/5 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* spacer */}
      <div className="flex-1" />

      {/* divider + action links */}
      {project.links.length > 0 && (
        <>
          {/* divider matching heroes style */}
          <div className="mb-4 flex w-full items-center gap-1.5">
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(to right, transparent, hsl(var(--border)))",
              }}
            />
            <div className="h-1 w-1 rounded-full bg-accent/60" />
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(to left, transparent, hsl(var(--border)))",
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs font-medium text-accent transition-colors duration-200 hover:border-accent/40 hover:bg-accent/10"
              >
                <ExternalLink size={12} />
                {link.label}
              </a>
            ))}
          </div>
        </>
      )}

      {/* bottom edge accent */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 rounded-b-2xl bg-gradient-to-r from-accent/0 via-accent to-accent/0 transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

/* ─── Section ─── */
export function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-28">
      {/* top separator — gold glow line */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.4), transparent)",
          boxShadow: "0 0 24px hsl(42 70% 55% / 0.2)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-8 bg-accent/60" />
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Our Work
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
        </div>

        <h2 className="mb-3 font-display text-4xl font-black tracking-tight text-foreground md:text-6xl">
          The Tower We Raise
        </h2>

        <p className="mb-16 max-w-2xl text-sm leading-relaxed text-muted-foreground/60">
          We don&apos;t settle for &lsquo;done.&rsquo; We aim for
          &lsquo;unforgettable.&rsquo; Journey through the collection of work
          that shifted our world&apos;s axis.
        </p>

        {/* grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {visible.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* view more */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-sm text-muted-foreground/50">
            Want to see more or collaborate with us?
          </p>
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="group inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-6 py-3 font-medium text-accent transition-all duration-300 hover:border-accent/50 hover:bg-accent/10"
          >
            <span>{showAll ? "Show Less" : "View All Projects"}</span>
            <ArrowUpRight
              size={16}
              className={`transition-transform duration-300 ${showAll ? "rotate-180" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
