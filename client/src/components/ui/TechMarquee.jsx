import React from "react";
import { MARQUEE_TECH } from "../../data/portfolio";

const Item = ({ tech }) => {
  const Icon = tech.icon;
  return (
    <div className="group/item mx-3 flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur transition-colors duration-300 hover:border-white/25">
      <Icon
        className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover/item:scale-110"
        style={{ color: tech.color }}
      />
      <span className="whitespace-nowrap text-sm font-medium text-white/80">{tech.name}</span>
    </div>
  );
};

const TechMarquee = () => {
  return (
    <section aria-label="Technologies" className="relative overflow-hidden py-6">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent sm:w-40" />

      <div className="group flex w-max">
        <div className="flex animate-marquee items-center group-hover:[animation-play-state:paused]">
          {MARQUEE_TECH.map((tech, i) => (
            <Item key={`a-${i}`} tech={tech} />
          ))}
        </div>
        <div
          aria-hidden
          className="flex animate-marquee items-center group-hover:[animation-play-state:paused]"
        >
          {MARQUEE_TECH.map((tech, i) => (
            <Item key={`b-${i}`} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
