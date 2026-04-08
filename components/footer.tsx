import Image from "next/image";
import { Mail, MapPin, Facebook, Users, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-gradient-to-b from-background to-background/50 px-6 py-10">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(42 70% 55% / 0.3), transparent)",
          boxShadow: "0 0 20px hsl(42 70% 55% / 0.15)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left: ARK Brand */}
          <div>
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
          </div>

          {/* Right: Contact */}
          <div className="flex flex-col items-end">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Contact
            </h4>

            <ul className="space-y-3 text-right">
              <li>
                <a
                  href="mailto:academitech.researchknowledge@gmail.com"
                  className="flex items-start justify-end gap-2.5 text-sm text-muted-foreground"
                >
                  academitech.researchknowledge@gmail.com
                  <Mail size={16} className="mt-0.5 shrink-0" />
                </a>
              </li>

              <li className="flex items-start justify-end gap-2.5 text-sm text-muted-foreground">
                1016 Anonas, Sta. Mesa, Manila, Philippines, 1016
                <MapPin size={16} className="mt-0.5 shrink-0" />
              </li>

              <li>
                <a
                  href="https://www.facebook.com/ark.academitech2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-end gap-2.5 text-sm text-muted-foreground"
                >
                  facebook.com/ark.academitech2025
                  <Facebook size={16} className="mt-0.5 shrink-0" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
