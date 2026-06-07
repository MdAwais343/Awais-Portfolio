import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import api from "../api/client";
import { DEFAULT_EXPERIENCE } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";

const TimelineItem = ({ exp, index }) => {
  const isLeft = index % 2 === 0;
  return (
    <div className="relative md:grid md:grid-cols-2 md:gap-8">
      {/* Node on the line */}
      <span className="absolute left-4 top-6 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center md:left-1/2">
        <span className="absolute h-4 w-4 animate-pulse-glow rounded-full bg-accent/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-glow" />
      </span>

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`ml-12 md:ml-0 ${
          isLeft ? "md:col-start-1 md:pr-4 md:text-right" : "md:col-start-2 md:pl-4"
        }`}
      >
        <div className="group rounded-2xl glass p-6 transition-colors duration-300 hover:border-accent/40">
          <div
            className={`flex items-center gap-3 ${
              isLeft ? "md:flex-row-reverse md:text-right" : ""
            }`}
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/25 to-accent-secondary/25 text-accent-highlight ring-1 ring-inset ring-white/10">
              <Briefcase className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-white">{exp.position}</h3>
              <p className="text-sm font-medium text-accent">{exp.company}</p>
            </div>
          </div>

          <div
            className={`mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted ${
              isLeft ? "md:ml-auto" : ""
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            {exp.duration}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">{exp.description}</p>

          <div className={`mt-5 flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : ""}`}>
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const [experience, setExperience] = useState(DEFAULT_EXPERIENCE);

  useEffect(() => {
    let active = true;
    api
      .get("/api/experience")
      .then((res) => {
        if (active && Array.isArray(res.data) && res.data.length) {
          setExperience(res.data);
        }
      })
      .catch(() => {
        /* keep default data if API fails */
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="experience" className="section-pad">
      <div className="shell">
        <SectionHeading
          eyebrow="Experience"
          title="My professional journey"
          subtitle="A timeline of the roles where I've grown as an engineer and shipped real products."
        />

        <div className="relative mx-auto max-w-4xl">
          {/* vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-accent/60 via-accent-secondary/40 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="flex flex-col gap-10">
            {experience.map((exp, index) => (
              <TimelineItem key={exp.id ?? index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
