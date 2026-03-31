import Image from "next/image";
import { Mail, MapPin, Facebook, Users, Heart } from "lucide-react";

const builders = [
  {
    name: "Salvador Vincent R. Javier",
    role: "Product & Frontend",
  },
  {
    name: "Juan Miguel Nacubuan",
    role: "Backend & Integrations",
  },
  {
    name: "Christian Joseph M. Delos Santos",
    role: "UI Systems & QA",
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-gradient-to-b from-background to-background/50 px-6 py-16">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.3), transparent)",
          boxShadow: "0 0 20px hsl(42 70% 55% / 0.15)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/ark-logo.png"
                alt="ARK Logo"
                width={40}
                height={40}
                className="rounded-lg object-contain"
              />

              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  ARK
                </h3>
                <p className="text-xs text-muted-foreground">
                  AcademiTech Research and Knowledge
                </p>
              </div>
            </div>

            <p className="mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              A student-led guild proving that game development is more than
              just a hobby—it&apos;s a path to{" "}
              <span className="font-semibold text-foreground">real skills</span>
              ,{" "}
              <span className="font-semibold text-foreground">
                creative impact
              </span>
              , and{" "}
              <span className="font-semibold text-foreground">
                future opportunities
              </span>
              .
            </p>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Heart size={14} className="text-accent" />
                <span className="font-medium text-foreground">460</span>
                <span className="text-muted-foreground">likes</span>
              </div>

              <div className="h-4 w-px bg-border/60" />

              <div className="flex items-center gap-1.5">
                <Users size={14} className="text-primary" />
                <span className="font-medium text-foreground">511</span>
                <span className="text-muted-foreground">followers</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Quick Links
            </h4>

            <ul className="space-y-2.5">
              <li>
                <a href="#about" className="text-sm text-muted-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-sm text-muted-foreground">
                  Projects
                </a>
              </li>
              <li>
                <a href="#id-finder" className="text-sm text-muted-foreground">
                  ID Finder
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Contact
            </h4>

            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:academitech.researchknowledge@gmail.com"
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <Mail size={16} className="mt-0.5 shrink-0" />
                  academitech.researchknowledge@gmail.com
                </a>
              </li>

              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                1016 Anonas, Sta. Mesa, Manila, Philippines, 1016
              </li>

              <li>
                <a
                  href="https://www.facebook.com/ark.academitech2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <Facebook size={16} className="mt-0.5 shrink-0" />
                  facebook.com/ark.academitech2025
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-10 rounded-2xl border border-border/50 bg-card/40 px-5 py-5 backdrop-blur-sm sm:px-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Built by
            </h4>
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
              Core Website Team
            </span>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {builders.map((builder) => (
              <div
                key={builder.name}
                className="rounded-xl border border-border/60 bg-background/40 px-3 py-2.5"
              >
                <p className="text-sm font-semibold text-foreground">{builder.name}</p>
                <p className="text-xs text-muted-foreground">{builder.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Centered copyright */}
        <div className="border-t border-border/40 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ARK
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-[10px] font-mono text-muted-foreground/40">
            [ Level up your game dev journey ]
          </p>
        </div>
      </div>
    </footer>
  );
}
