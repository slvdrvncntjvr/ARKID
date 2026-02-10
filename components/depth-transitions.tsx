"use client";

import { useEffect, useState } from "react";
import { depthMarkers } from "@/lib/site-config";

export function DepthTransitions() {
  const [scrollY, setScrollY] = useState(0);
  const [activeDepth, setActiveDepth] = useState(100);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const scrollPercentage =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      // Calculate current depth (100M to 600M)
      const currentDepth = Math.round(100 + (scrollPercentage / 100) * 500);
      setActiveDepth(currentDepth);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't render on server to avoid hydration issues
  if (!isMounted) return null;

  return (
    <>
      {/* Depth Markers */}
      {depthMarkers.map((marker, index) => {
        const markerPosition = (marker.depth - 100) / 500; // 0 to 1
        const scrollHeight = typeof document !== "undefined" 
          ? document.documentElement.scrollHeight 
          : 0;
        const windowHeight = typeof window !== "undefined" 
          ? window.innerHeight 
          : 0;
        const markerScrollPosition = markerPosition * (scrollHeight - windowHeight);
        
        const isNear = Math.abs(scrollY - markerScrollPosition) < 300;
        const isPassed = scrollY > markerScrollPosition;

        if (!isNear && !isPassed) return null;

        return (
          <div
            key={marker.depth}
            className="pointer-events-none fixed left-0 right-0 flex items-center justify-center transition-opacity duration-1000"
            style={{
              top: "50%",
              opacity: isNear && !isPassed ? 0.6 : 0,
              transform: "translateY(-50%)",
            }}
          >
            <div className="flex items-center gap-4 rounded-full border border-primary/40 bg-card/90 px-6 py-3 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <span className="font-mono text-sm font-bold text-primary">
                  DEPTH: -{marker.depth}M
                </span>
              </div>
              <div className="h-4 w-px bg-border/60" />
              <span className="text-sm text-muted-foreground">
                {marker.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* Welcome to the Depths - Shows at the beginning */}
      <div
        className="pointer-events-none fixed left-0 right-0 flex items-center justify-center transition-opacity duration-1000"
        style={{
          top: "50%",
          opacity: scrollY < 200 ? 1 : 0,
          transform: "translateY(-50%)",
        }}
      >
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold text-foreground/80 md:text-5xl">
            WELCOME TO THE DEPTHS
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Scroll to descend deeper
          </p>
        </div>
      </div>

      {/* Parallax Rock Layers */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {[0.1, 0.2, 0.3, 0.4, 0.5].map((speed, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              transform: `translateY(${scrollY * speed}px)`,
              opacity: 0.03 + i * 0.01,
            }}
          >
            {/* Subtle rock texture patterns */}
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `radial-gradient(circle at ${20 + i * 15}% ${30 + i * 10}%, hsl(180 10% 20% / 0.3), transparent 40%)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/20"
            style={{
              top: `${(i * 5) % 100}%`,
              left: `${(i * 7) % 100}%`,
              transform: `translateY(${scrollY * (0.05 + (i % 3) * 0.02)}px)`,
              animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
