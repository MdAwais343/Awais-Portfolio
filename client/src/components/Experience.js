import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import "./Experience.css";

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [experience, setExperience] = useState([
    {
      id: 1,
      position: "Software Engineer",
      company: "Tech Solutions Inc.",
      duration: "2023 - Present",
      description:
        "Developing and maintaining web applications using modern technologies. Leading a team of 3 developers and implementing best practices for code quality and performance.",
      technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
    },
    {
      id: 2,
      position: "Frontend Developer",
      company: "Digital Agency",
      duration: "2022 - 2023",
      description:
        "Created responsive and interactive user interfaces for various clients. Collaborated with design teams to implement pixel-perfect designs and optimize user experience.",
      technologies: ["React", "JavaScript", "CSS3", "HTML5", "Figma"],
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get("/api/experience");
        if (response.data && Array.isArray(response.data)) {
          setExperience(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching experience:", error);
        // Keep default data if API fails
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  if (loading) {
    return (
      <section className="experience section" id="experience">
        <div className="container">
          <div className="section-title">
            <h2>Work Experience</h2>
            <p>My professional journey and career highlights</p>
          </div>
          <div className="loading">Loading experience...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="experience section" id="experience">
      <div className="container">
        <motion.div
          className="section-title"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Work Experience</h2>
          <p>My professional journey and career highlights</p>
        </motion.div>

        <div className="experience-timeline">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="timeline-content">
                <div className="timeline-header">
                  <div className="timeline-icon">
                    <FaBriefcase />
                  </div>
                  <div className="timeline-info">
                    <h3>{exp.position}</h3>
                    <h4>{exp.company}</h4>
                    <div className="timeline-meta">
                      <span className="timeline-duration">
                        <FaCalendarAlt />
                        {exp.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="timeline-description">
                  <p>{exp.description}</p>
                </div>

                <div className="timeline-technologies">
                  {exp.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="experience-summary"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="summary-content">
            <h3>Career Growth</h3>
            <p>
              Throughout my career, I've consistently taken on new challenges
              and responsibilities, growing from a Frontend Developer to a
              Senior Software Engineer. Each role has taught me valuable lessons
              about teamwork, problem-solving, and delivering high-quality
              software.
            </p>
            <div className="career-highlights">
              <div className="highlight-item">
                <span className="highlight-number">1+</span>
                <span className="highlight-label">Years Experience</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">2</span>
                <span className="highlight-label">Companies</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">4+</span>
                <span className="highlight-label">Projects Led</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
