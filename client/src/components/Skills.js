import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import "./Skills.css";

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [skills, setSkills] = useState({
    frontend: [
      { name: "React", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "HTML/CSS", level: 95 },
      { name: "Vue.js", level: 80 },
    ],
    backend: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "Python", level: 70 },
    ],
    tools: [
      { name: "Git", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("/api/skills");
        if (response.data && response.data.frontend) {
          setSkills(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skills:", error);
        // Keep default data if API fails
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const SkillBar = ({ skill, index }) => (
    <motion.div
      className="skill-item"
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-level">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-progress"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
        />
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <section className="skills section" id="skills">
        <div className="container">
          <div className="section-title">
            <h2>Skills & Technologies</h2>
            <p>My technical expertise and proficiency levels</p>
          </div>
          <div className="loading">Loading skills...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="skills section" id="skills">
      <div className="container">
        <motion.div
          className="section-title"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Skills & Technologies</h2>
          <p>My technical expertise and proficiency levels</p>
        </motion.div>

        <div className="skills-content">
          <motion.div
            className="skills-category"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Frontend Development</h3>
            <div className="skills-list">
              {skills.frontend.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="skills-category"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3>Backend Development</h3>
            <div className="skills-list">
              {skills.backend.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="skills-category"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3>Tools & Technologies</h3>
            <div className="skills-list">
              {skills.tools.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="skills-summary"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="summary-card">
            <h4>Continuous Learning</h4>
            <p>
              I'm constantly expanding my skill set and staying updated with the
              latest technologies. My passion for learning drives me to explore
              new frameworks, tools, and methodologies to deliver the best
              possible solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
