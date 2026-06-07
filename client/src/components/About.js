import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { STATS, ABOUT_FEATURES } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import AnimatedCounter from "./ui/AnimatedCounter";
import Reveal from "./ui/Reveal";

const About = () => {
  return (
    <section id="about" className="section-pad">
      <div className="shell">
        <SectionHeading
          eyebrow="About Me"
          title="Crafting digital products end to end"
          subtitle="Get to know me better and understand what drives my passion for building software."
        />

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Intro */}
          <Reveal direction="right">
            <div className="relative h-full rounded-3xl glass p-8 md:p-10">
              <Quote className="h-10 w-10 text-accent/40" />
              <h3 className="mt-4 font-display text-2xl font-semibold text-white">Who I am</h3>
              <p className="mt-4 text-muted">
                I'm Muhammad Awais, a Full Stack Developer with 1+ years of professional experience
                designing and shipping scalable web and mobile applications. I work comfortably
                across the stack — from polished React & React Native interfaces to robust
                Node.js, Express, and Django backends.
              </p>
              <p className="mt-4 text-muted">
                I care deeply about clean architecture, performance, and the small details that
                make products feel premium. Beyond writing features, I handle deployment and
                DevOps — wiring up CI/CD pipelines with GitHub Actions and Docker, and shipping to
                AWS, Vercel, Cloudflare, and DigitalOcean.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center"
                  >
                    <div className="gradient-text font-display text-3xl font-bold">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="mt-1 text-xs text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Feature cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {ABOUT_FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <SpotlightCard className="h-full p-6">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 text-accent-highlight ring-1 ring-inset ring-white/10">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="mt-5 font-display text-lg font-semibold text-white">
                      {feature.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
