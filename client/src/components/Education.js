import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Building2, Award } from "lucide-react";
import api from "../api/client";
import { DEFAULT_EDUCATION } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";

const Education = () => {
  const [education, setEducation] = useState(DEFAULT_EDUCATION);

  useEffect(() => {
    let active = true;
    api
      .get("/api/education")
      .then((res) => {
        if (active && Array.isArray(res.data) && res.data.length) {
          setEducation(res.data);
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
    <section id="education" className="section-pad">
      <div className="shell">
        <SectionHeading
          eyebrow="Education"
          title="Academic background"
          subtitle="The foundation of my technical expertise and commitment to lifelong learning."
        />

        <div className="items-center justify-center flex">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id ?? index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
            >
              <SpotlightCard className="h-full p-7 flex items-center justify-center">
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/25 to-accent-secondary/25 text-accent-highlight ring-1 ring-inset ring-white/10">
                    <GraduationCap className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold text-white">{edu.degree}</h3>
                    <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-accent">
                      <Building2 className="h-4 w-4" />
                      {edu.institution}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">
                    <Calendar className="h-3.5 w-3.5" />
                    {edu.duration}
                  </span>
                  {edu.gpa && edu.gpa !== "N/A" && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-highlight">
                      <Award className="h-3.5 w-3.5" />
                      GPA: {edu.gpa}
                    </span>
                  )}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted">{edu.description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
