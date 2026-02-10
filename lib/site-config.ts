/**
 * ARK Website Configuration
 * ========================
 * Central configuration file for all website content.
 * Edit this file to update site content without touching component files.
 */

import { 
  Code2, 
  Palette, 
  Gamepad2, 
  Music,
  Calendar, 
  Trophy, 
  Users2, 
  Clock,
  Layers, 
  TrendingUp, 
  Zap,
  Star,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ==================== HERO SECTION ====================
export const heroConfig = {
  title: {
    main: "Welcome to",
    highlight: "ARK",
  },
  subtitle: "ACADEMITECH RESEARCH & KNOWLEDGE",
  description: "A gaming organization crafting unforgettable experiences. Dig deeper. Play harder. Build legends.",
  stats: [
    { icon: Users, label: "Members", value: "67" },
    { icon: Gamepad2, label: "Projects", value: "12+" },
    { icon: Star, label: "Events", value: "50+" },
  ],
  buttons: [
    { text: "Start Mining", href: "#about", primary: true },
    { text: "Explore Games", href: "#projects", primary: false },
  ],
};

// ==================== ABOUT SECTION ====================
export const aboutConfig = {
  title: "Founded by legends in the making",
  description: "ARK is a student-led guild proving that game development is more than just a hobby—it's a path to real skills, creative impact, and future opportunities.",
  disciplines: [
    {
      title: "Programming",
      description: "From game logic to shaders, we write the code that brings worlds to life.",
      icon: Code2,
    },
    {
      title: "Art & Design",
      description: "2D sprites, 3D models, UI/UX. Every pixel tells a story.",
      icon: Palette,
    },
    {
      title: "Game Design",
      description: "Crafting mechanics, levels, and systems that keep players coming back.",
      icon: Gamepad2,
    },
    {
      title: "Audio",
      description: "Sound effects, music, and atmosphere that make games feel real.",
      icon: Music,
    },
  ],
};

// ==================== GAMES/PROJECTS SECTION ====================
export const gamesConfig = {
  title: "Discover the treasures we've mined from the depths of creativity",
  description: "From dungeon crawlers to racing games, experience our diverse game library",
  games: [
    {
      title: "SHADOW REALM",
      type: "Action RPG",
      description: "Descend into darkness and battle ancient creatures in this cooperative dungeon crawler.",
      players: "1-4 Players",
      year: "2025",
      tags: ["Featured", "Multiplayer"],
      featured: true,
    },
    {
      title: "NEON DRIFT",
      type: "Racing",
      description: "High-speed cyberpunk racing through procedurally generated tracks.",
      players: "1-8 Players",
      year: "2024",
      tags: ["Racing", "Multiplayer"],
      featured: false,
    },
    {
      title: "TERRA TACTICS",
      type: "Strategy",
      description: "Turn-based tactical warfare with pixel-art armies and destructible terrain.",
      players: "2 Players",
      year: "2024",
      tags: ["Strategy", "PvP"],
      featured: false,
    },
    {
      title: "VOID WALKER",
      type: "Metroidvania",
      description: "Explore an interconnected world, gain abilities, and uncover cosmic secrets.",
      players: "1 Player",
      year: "2023",
      tags: ["Singleplayer", "Adventure"],
      featured: false,
    },
    {
      title: "FORGE MASTERS",
      type: "Crafting Sim",
      description: "Mine resources, forge legendary weapons, and become the ultimate blacksmith.",
      players: "1-2 Players",
      year: "2023",
      tags: ["Crafting", "Simulation"],
      featured: false,
    },
    {
      title: "PIXEL ARENA",
      type: "Fighting",
      description: "Fast-paced fighting game with unique characters and combo systems.",
      players: "1-4 Players",
      year: "2022",
      tags: ["Fighting", "Multiplayer"],
      featured: false,
    },
  ],
};

// ==================== EVENTS SECTION ====================
export const eventsConfig = {
  title: "Tournaments, jams, and community gatherings",
  description: "Join us in the caverns for epic gaming events and competitions",
  events: [
    {
      status: "UPCOMING" as const,
      type: "Tournament",
      title: "FORGE CUP 2026",
      description: "Our annual championship tournament featuring all our competitive titles.",
      date: "March 15-17, 2026",
      location: "Online",
      participants: "256 Teams",
      prize: "$10,000",
      icon: Trophy,
    },
    {
      status: "UPCOMING" as const,
      type: "Game Jam",
      title: "PIXEL JAM",
      description: "48-hour game development marathon. Theme revealed at start!",
      date: "April 5-7, 2026",
      location: "Hybrid",
      participants: "Open Entry",
      prize: "Featured Release",
      icon: Calendar,
    },
    {
      status: "ONGOING" as const,
      type: "Community",
      title: "MINING MEETUP",
      description: "Join our monthly community gatherings for casual play and discussions.",
      date: "Monthly",
      location: "Discord",
      participants: "500+ Active",
      prize: "Exclusive Rewards",
      icon: Users2,
    },
    {
      status: "COMPLETED" as const,
      type: "Competition",
      title: "SPEEDRUN SUMMIT",
      description: "Watch the fastest players break records across our game library.",
      date: "Feb 20, 2026",
      location: "Online",
      participants: "64 Runners",
      prize: "$2,500",
      icon: Clock,
    },
  ],
  pastEvents: [
    { name: "Winter Forge 2025", participants: "1,200+" },
    { name: "Pixel Paradise LAN", participants: "300" },
    { name: "Indie Showcase 2025", participants: "2,000+" },
    { name: "Community Awards", participants: "5,000+" },
  ],
};

// ==================== WORKSHOPS SECTION ====================
export const workshopsConfig = {
  title: "Forge your skills in our deep-dive learning experiences",
  description: "From pixel art to game publishing, master the craft with hands-on workshops",
  workshops: [
    {
      title: "PIXEL ART FUNDAMENTALS",
      description: "Master the art of pixel creation from basic shapes to complex characters and animations.",
      level: "Beginner" as const,
      duration: "4 weeks",
      topics: "120+",
      icon: Palette,
      skills: ["Color Theory", "Dithering", "Animation Basics", "Character Design"],
    },
    {
      title: "GAME DEV WITH GODOT",
      description: "Build your first complete game using the Godot engine with hands-on projects.",
      level: "Intermediate" as const,
      duration: "8 weeks",
      topics: "85+",
      icon: Code2,
      skills: ["GDScript", "2D Physics", "UI Systems", "Export & Publish"],
    },
    {
      title: "CHIPTUNE COMPOSITION",
      description: "Create retro-style music and sound effects for your games using modern tools.",
      level: "Beginner" as const,
      duration: "3 weeks",
      topics: "60+",
      icon: Music,
      skills: ["8-bit Sounds", "Melody Writing", "FamiTracker", "Integration"],
    },
    {
      title: "LEVEL DESIGN MASTERY",
      description: "Learn professional techniques for creating engaging and memorable game levels.",
      level: "Advanced" as const,
      duration: "6 weeks",
      topics: "45+",
      icon: Layers,
      skills: ["Flow Theory", "Pacing", "Environmental Storytelling", "Playtesting"],
    },
    {
      title: "INDIE PUBLISHING 101",
      description: "Navigate the indie game market from Steam to itch.io with marketing strategies.",
      level: "All Levels" as const,
      duration: "2 weeks",
      topics: "200+",
      icon: TrendingUp,
      skills: ["Store Setup", "Marketing", "Community Building", "Launch Strategy"],
    },
    {
      title: "SHADER MAGIC",
      description: "Create stunning visual effects with custom shaders for 2D and 3D games.",
      level: "Advanced" as const,
      duration: "5 weeks",
      topics: "30+",
      icon: Zap,
      skills: ["GLSL Basics", "Post-Processing", "Particles", "Optimization"],
    },
  ],
};

// ==================== TEAM SECTION ====================
export const teamConfig = {
  title: "Meet the crew digging deep to bring you the best gaming experiences",
  description: "Our leadership team combines passion, expertise, and vision to forge the future",
  members: [
    {
      name: "Mel Carl Chacon",
      role: "Founder & CEO",
      description: "Visionary leader driving ARK's mission forward. Building the future of gaming.",
      expertise: "Leadership & Strategy",
      socials: {
        twitter: "https://twitter.com/melcarlchacon",
        website: "https://melcarlchacon.com",
      },
    },
    {
      name: "Joshua Kurt Manzano",
      role: "Chief Internal Officer",
      description: "Keeping the engine running smooth. Internal operations mastermind.",
      expertise: "Internal Operations",
      socials: {
        twitter: "https://twitter.com/jkmanzano",
      },
    },
    {
      name: "Salvador Vincent Javier",
      role: "Chief External Officer",
      description: "Building bridges and expanding horizons. Partnerships & outreach.",
      expertise: "External Relations",
      socials: {
        twitter: "https://twitter.com/svjavier",
        website: "https://vincentjavier.com",
      },
    },
    {
      name: "Dean Benedict Gomez",
      role: "Chief Finance Officer",
      description: "Crunching numbers and managing resources. Financial strategist.",
      expertise: "Finance & Resources",
      socials: {
        website: "https://deangomez.com",
      },
    },
    {
      name: "Christian Joseph Delos Santos",
      role: "Chief Operations Officer",
      description: "Orchestrating events and day-to-day excellence. Operations guru.",
      expertise: "Operations & Events",
      socials: {
        twitter: "https://twitter.com/cjdelossantos",
      },
    },
    {
      name: "Miguel Nacubuan",
      role: "Chief Technology Officer",
      description: "Tech wizard and innovation driver. Making the impossible possible.",
      expertise: "Technology & Dev",
      socials: {
        github: "https://github.com/miguelnacubuan",
        website: "https://miguelnacubuan.com",
      },
    },
  ],
};

// ==================== CONTACT SECTION ====================
export const contactConfig = {
  title: "Reached the core! Drop us a message and let's create something legendary",
  description: "Get in touch with the ARK team",
  email: "academitech.researchknowledge@gmail.com ",
  discord: "https://discord.gg/ark",
  location: "Worldwide (Remote)",
  socials: {
    twitter: "https://twitter.com/arkgaming",
    github: "https://github.com/arkgaming",
    youtube: "https://youtube.com/@arkgaming",
    twitch: "https://twitch.tv/arkgaming",
  },
};

// ==================== DEVELOPERS SECTION ====================
export const developersConfig = {
  title: "Crafted in the depths by",
  description: "The talented developers who brought this website to life",
  developers: [
    {
      name: "Salvador Vincent Javier",
      role: "Lead Developer",
      description: "Full-stack wizard who architected and built this digital experience.",
      expertise: "Next.js, React, TypeScript",
      socials: {
        github: "https://github.com/yourusername",
        website: "https://yourwebsite.com",
        twitter: "https://twitter.com/yourusername",
      },
    },
    {
      name: "Franz Emmanuel Baes",
      role: "Lead Developer",
      description: "Full-stack wizard who architected and built this digital experience.",
      expertise: "Next.js, React, TypeScript",
      socials: {
        github: "https://github.com/yourusername",
        website: "https://yourwebsite.com",
        twitter: "https://twitter.com/yourusername",
      },
    },
  ],
};

// ==================== FOOTER CONFIG ====================
export const footerConfig = {
  copyright: "ARK Gaming. All rights reserved. Keep mining.",
  links: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

// ==================== DEPTH MARKERS ====================
export const depthMarkers = [
  { depth: 100, section: "hero", label: "Surface Level" },
  { depth: 200, section: "games", label: "The Treasure Trove" },
  { depth: 300, section: "events", label: "The Gathering Hall" },
  { depth: 400, section: "workshops", label: "The Forge" },
  { depth: 500, section: "team", label: "The Core" },
  { depth: 600, section: "contact", label: "The Abyss" },
];
