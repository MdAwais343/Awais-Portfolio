import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import axios from 'axios';
import './Projects.css';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
        setFilteredProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'featured', label: 'Featured' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'fullstack', label: 'Full Stack' }
  ];

  const handleFilter = (filterId) => {
    setActiveFilter(filterId);
    
    if (filterId === 'all') {
      setFilteredProjects(projects);
    } else if (filterId === 'featured') {
      setFilteredProjects(projects.filter(project => project.featured));
    } else if (filterId === 'frontend') {
      setFilteredProjects(projects.filter(project => 
        project.technologies.some(tech => 
          ['React', 'Vue', 'Angular', 'HTML', 'CSS', 'JavaScript'].includes(tech)
        )
      ));
    } else if (filterId === 'fullstack') {
      setFilteredProjects(projects.filter(project => 
        project.technologies.some(tech => 
          ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Python', 'Django'].includes(tech)
        )
      ));
    }
  };

  if (loading) {
    return (
      <section className="projects section" id="projects">
        <div className="container">
          <div className="section-title">
            <h2>My Projects</h2>
            <p>Showcasing my latest work and achievements</p>
          </div>
          <div className="loading">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <motion.div 
          className="section-title"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>My Projects</h2>
          <p>Showcasing my latest work and achievements</p>
        </motion.div>

        <motion.div 
          className="project-filters"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => handleFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          className="projects-grid"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="project-image">
                <div className="project-placeholder">
                  <span>{project.title.charAt(0)}</span>
                </div>
                {project.featured && (
                  <div className="featured-badge">
                    <FaStar />
                    Featured
                  </div>
                )}
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="tech-tag more">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
                
                <div className="project-links">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link github"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGithub />
                    Code
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link live"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            className="no-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p>No projects found for the selected filter.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
