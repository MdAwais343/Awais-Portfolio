import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaCalendarAlt, FaUniversity } from 'react-icons/fa';
import axios from 'axios';
import './Education.css';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await axios.get('/api/education');
        setEducation(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching education:', error);
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  if (loading) {
    return (
      <section className="education section" id="education">
        <div className="container">
          <div className="section-title">
            <h2>Education</h2>
            <p>My academic background and qualifications</p>
          </div>
          <div className="loading">Loading education...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="education section" id="education">
      <div className="container">
        <motion.div 
          className="section-title"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Education</h2>
          <p>My academic background and qualifications</p>
        </motion.div>

        <div className="education-grid">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="education-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="education-header">
                <div className="education-icon">
                  <FaGraduationCap />
                </div>
                <div className="education-info">
                  <h3>{edu.degree}</h3>
                  <h4>
                    <FaUniversity />
                    {edu.institution}
                  </h4>
                  <div className="education-meta">
                    <span className="education-duration">
                      <FaCalendarAlt />
                      {edu.duration}
                    </span>
                    {edu.gpa && (
                      <span className="education-gpa">
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="education-description">
                <p>{edu.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="education-summary"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="summary-content">
            <h3>Continuous Learning</h3>
            <p>
              My educational journey has been the foundation of my technical expertise. 
              I believe in lifelong learning and continuously seek opportunities to expand 
              my knowledge through courses, certifications, and hands-on projects.
            </p>
            <div className="learning-highlights">
              <div className="highlight-item">
                <span className="highlight-icon">🎓</span>
                <span className="highlight-text">Formal Education</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">💻</span>
                <span className="highlight-text">Online Courses</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">📚</span>
                <span className="highlight-text">Self-Study</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🔧</span>
                <span className="highlight-text">Practical Projects</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
