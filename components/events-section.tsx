import { Calendar, Trophy, Users2, Clock } from "lucide-react";

const events = [
  {
    status: "UPCOMING",
    type: "Tournament",
    title: "FORGE CUP 2026",
    description:
      "Our annual championship tournament featuring all our competitive titles.",
    date: "March 15-17, 2026",
    location: "Online",
    participants: "256 Teams",
    prize: "$10,000",
    icon: Trophy,
  },
  {
    status: "UPCOMING",
    type: "Game Jam",
    title: "PIXEL JAM",
    description:
      "48-hour game development marathon. Theme revealed at start!",
    date: "April 5-7, 2026",
    location: "Hybrid",
    participants: "Open Entry",
    prize: "Featured Release",
    icon: Calendar,
  },
  {
    status: "ONGOING",
    type: "Community",
    title: "MINING MEETUP",
    description:
      "Join our monthly community gatherings for casual play and discussions.",
    date: "Monthly",
    location: "Discord",
    participants: "500+ Active",
    prize: "Exclusive Rewards",
    icon: Users2,
  },
  {
    status: "COMPLETED",
    type: "Competition",
    title: "SPEEDRUN SUMMIT",
    description:
      "Watch the fastest players break records across our game library.",
    date: "Feb 20, 2026",
    location: "Online",
    participants: "64 Runners",
    prize: "$2,500",
    icon: Clock,
  },
];

const pastEvents = [
  { name: "Winter Forge 2025", participants: "1,200+" },
  { name: "Pixel Paradise LAN", participants: "300" },
  { name: "Indie Showcase 2025", participants: "2,000+" },
  { name: "Community Awards", participants: "5,000+" },
];

export function EventsSection() {
  return (
    <section id="events" className="relative px-6 py-32">
      {/* Subtle divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(180 20% 25% / 0.4), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Events
        </p>

        <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          <span className="text-balance">
            Tournaments, jams, and community gatherings
          </span>
        </h2>

        <p className="mb-16 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Discover the treasures we've mined from the depths of creativity
        </p>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event) => {
            const Icon = event.icon;
            return (
              <div
                key={event.title}
                className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Status Badge */}
                <div className="mb-4 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      event.status === "UPCOMING"
                        ? "bg-primary/20 text-primary"
                        : event.status === "ONGOING"
                          ? "bg-accent/20 text-accent"
                          : "bg-muted/40 text-muted-foreground"
                    }`}
                  >
                    {event.status}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {event.type}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-4">
                  <div className="inline-flex rounded-lg bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-2 font-display text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {event.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {event.description}
                </p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 border-t border-border/40 pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="text-sm font-medium text-foreground">
                      {event.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium text-foreground">
                      {event.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Participants
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {event.participants}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Prize</p>
                    <p className="text-sm font-medium text-primary">
                      {event.prize}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Past Excavations */}
        <div className="mt-12">
          <h3 className="mb-6 font-display text-2xl font-bold text-foreground">
            Past Excavations
          </h3>
          <div className="flex flex-wrap gap-4">
            {pastEvents.map((event) => (
              <div
                key={event.name}
                className="rounded-lg border border-border/40 bg-secondary/40 px-4 py-3"
              >
                <p className="text-sm font-semibold text-foreground">
                  {event.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {event.participants}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
