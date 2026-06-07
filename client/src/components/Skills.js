import React from "react";
import { motion } from "framer-motion";
import { SKILL_CATEGORIES } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";

const SkillChip = ({ skill }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="group/skill relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-3"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/skill:opacity-100"
        style={{
          background: `radial-gradient(120px circle at 50% 0%, ${skill.color}22, transparent 70%)`,
        }}
      />
      <div className="relative flex items-center gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/5 transition-transform duration-300 group-hover/skill:scale-110"
          style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.06)` }}
        >
          <Icon className="h-5 w-5" style={{ color: skill.color }} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <span className="truncate text-sm font-medium text-white/90">{skill.name}</span>
            <span className="ml-2 text-[11px] text-muted">{skill.level}%</span>
          </div>
          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <motion.span
              className="block h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="section-pad">
      <div className="shell">
        <SectionHeading
          eyebrow="Skills"
          title="My technical toolkit"
          subtitle="Technologies and tools I use to design, build, deploy, and scale modern applications."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}
              >
                <SpotlightCard className="h-full p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 text-accent-highlight ring-1 ring-inset ring-white/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-1">
                    {category.skills.map((skill) => (
                      <SkillChip key={skill.name + category.id} skill={skill} />
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
