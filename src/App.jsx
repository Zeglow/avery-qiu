import React, { useState, useRef, useEffect } from 'react';
import { Github, Linkedin, Mail, Cat, BookOpen, Briefcase, Code, ChevronDown } from 'lucide-react';

const CountUp = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  
  React.useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  
  return <span>{count}{suffix}</span>;
};

const Portfolio = () => {
  const [catMessage, setCatMessage] = useState('');
  const [isAboutInView, setIsAboutInView] = useState(true);
  const [expandedExperience, setExpandedExperience] = useState({});
  const [expandedProjects, setExpandedProjects] = useState({});
  const aboutSectionRef = useRef(null);
  const educationSectionRef = useRef(null);
  
  const catMessages = [
    'Purr... debugging...'
  ];

  const showCatMessage = () => {
    const randomMessage = catMessages[Math.floor(Math.random() * catMessages.length)];
    setCatMessage(randomMessage);
    setTimeout(() => setCatMessage(''), 2000);
  };

  const toggleExperience = (idx) => {
    setExpandedExperience(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleProject = (idx) => {
    setExpandedProjects(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  useEffect(() => {
    const target = aboutSectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsAboutInView(entry.isIntersecting && entry.intersectionRatio > 0.5);
      },
      { threshold: [0, 0.5, 1] }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const albums = [
    { 
      name: 'Ziggy Stardust',
      artist: 'David Bowie',
      image: '/ziggy.jpg',
      rotation: 'rotate-12',
      delay: '0s'
    }
  ];

  const albumPositions = [
    { left: '10%', top: '15%' },
    { left: '30%', top: '30%' },
    { left: '50%', top: '45%' },
    { left: '70%', top: '60%' },
    { left: '85%', top: '25%' },
    { left: '20%', top: '80%' },
  ];

  const education = [
    {
      school: 'Northeastern University',
      location: 'Oakland, CA',
      period: 'Sep 2024 – Dec 2026',
      degree: 'MS in Computer Science',
      gpa: '3.9/4.0'
    },
    {
      school: 'Soochow University',
      location: 'Suzhou, China',
      period: 'Sep 2020 – Jun 2024',
      degree: 'BS in Computer Science and Technology'
    }
  ];

  const experience = [
    {
      role: 'AI Engineer Intern',
      company: 'Stealth AI Startup',
      location: 'San Francisco, CA',
      period: 'May 2025 – Aug 2025',
      highlights: [
        'Built baseline RAG pipeline using Llama 3.1-8B for music Q&A system (50K documents from Wikipedia/MusicBrainz); implemented hybrid retrieval combining vector search (ChromaDB), BM25 keyword matching, and Neo4j graph traversal for album similarity, improving recall@10 from 54% to 83% on 500-query benchmark',
        'Fine-tuned Llama 3.1-8B using PyTorch with LoRA on 3K music-domain examples, reduced hallucination rate by 15% vs. base model on domain-specific evaluation set',
        'Migrated inference from HuggingFace Transformers to vLLM for CUDA-accelerated serving, reducing p95 latency from 1.8s to <750ms; containerized and deployed on AWS EC2 with Docker Compose, serving 200+ beta users with zero-downtime'
      ],
      tech: ['Python', 'PyTorch', 'LoRA', 'Llama 3.1', 'vLLM', 'HuggingFace Transformers', 'ChromaDB', 'Neo4j', 'BM25', 'RAG', 'AWS EC2', 'Docker', 'Docker Compose', 'CUDA']
    },
    {
      role: 'Software Engineer Intern',
      company: 'Caliper',
      location: 'Oakland, CA',
      period: 'Jan 2025 – Apr 2025',
      highlights: [
        'Developed feature engineering pipeline with Pandas and scikit-learn for medical claims data preprocessing, implementing missing value imputation, categorical encoding, feature scaling, and data validation, reducing model MAPE from 18% to 6%',
        'Built medical claims prediction API with Python FastAPI and Pydantic validation, implementing async I/O with Redis connection pooling for caching optimization; achieved 95% cache hit rate and sub-200ms P95 latency measured via Postman performance testing and Redis monitoring dashboards',
        'Implemented pytest unit testing with 95% code coverage using parameterized tests and fixtures to validate API endpoints and caching logic, with automated execution in CI pipeline'
      ],
      tech: ['Python', 'FastAPI', 'Pydantic', 'Redis', 'Pandas', 'scikit-learn', 'pytest', 'Postman', 'CI/CD', 'Async I/O', 'Feature Engineering', 'Machine Learning']
    },
    {
      role: 'Backend Software Engineer Intern',
      company: 'InternUp',
      location: 'Oakland, CA',
      period: 'Aug 2024 – Dec 2024',
      highlights: [
        'Built scalable backend services for mentorship marketplace using Java with Dagger dependency injection, implementing RESTful APIs for user matching, session management, and payment workflows, maintaining 99.99% uptime',
        'Implemented event-driven serverless pipeline using AWS Lambda, S3, and SQS for asynchronous resume processing, decoupling file upload from processing through message queue, reducing average processing time by 80%',
        'Optimized DynamoDB query performance by adding Global Secondary Index for reverse lookups and refactoring full table scans to targeted queries, reducing average latency by 75% for user-mentor relationship queries'
      ],
      tech: ['Java', 'Dagger', 'RESTful APIs', 'AWS Lambda', 'AWS S3', 'AWS SQS', 'DynamoDB', 'Event-Driven Architecture', 'Serverless', 'Microservices', 'Message Queue']
    },
    {
      role: 'Software Engineer Intern - Video Center',
      company: 'China United Network Communications Co., Ltd.',
      location: 'Tianjin, CN',
      period: 'Jan 2023 – Mar 2023',
      highlights: [
        'Built responsive video playlist management system with React and Redux Toolkit (async thunks for API state management and memoized selectors to minimize re-renders), featuring React DnD for drag-and-drop reordering, enabling content moderators to batch-organize 200+ videos per session and reducing video categorization time by 47%',
        'Developed reusable React components with prop composition pattern for video cards and playlists, and implemented lazy loading for video thumbnails to optimize initial page load performance',
        'Optimized backend performance for RESTful APIs by implementing Redis sorted sets with Spring Boot RedisTemplate (selected over Memcached for ordered data structure support and atomic operations), achieving 60% query latency reduction and supporting 5K+ concurrent requests',
        'Implemented JUnit test suite with parameterized tests for playlist operations and Docker-based integration testing for Redis/MySQL dependencies, achieving 92% code coverage'
      ],
      tech: ['React', 'Redux Toolkit', 'React DnD', 'JavaScript', 'Spring Boot', 'Redis', 'RedisTemplate', 'MySQL', 'RESTful APIs', 'JUnit', 'Docker', 'Integration Testing']
    }
  ];

  const projects = [
    {
      name: 'Fine-tuned LLM Character Chat Platform',
      highlights: [
        'Built an end-to-end personalized AI character system using PyTorch and Hugging Face Transformers, applying LoRA fine-tuning on LLaMA3.1-8B with automated Pandas/NumPy/RegEx data cleaning pipeline, achieving 90%+ character style consistency',
        'Deployed LoRA model with FastAPI backend, WebSocket streaming response and React/TypeScript frontend, enabling real-time chat with 70% lower perceived latency and seamless character dialogue user experience'
      ],
      tech: ['PyTorch', 'LoRA', 'HuggingFace', 'Python', 'FastAPI', 'React', 'TypeScript', 'WebSocket'],
      github: 'https://github.com/Zeglow'
    },
    {
      name: 'ConnectPro Social Platform',
      highlights: [
        'Built full-stack social media application using MERN stack (MongoDB, Express.js, React, Node.js) with JWT authentication, supporting user profiles, post creation with image uploads, and real-time friend management system',
        'Implemented Redux Toolkit with RTK Query for state management and Material-UI components for responsive design, featuring dark/light mode toggle and drag-and-drop image upload functionality',
        'Developed RESTful APIs with Express.js and Multer for file uploads, using bcrypt for password hashing and MongoDB with Mongoose ODM for data persistence'
      ],
      tech: ['React', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Material-UI', 'Multer', 'bcrypt'],
      github: 'https://github.com/Zeglow/connectpro-social'
    }
  ];

  const openSource = [
    {
      name: 'Apache Airflow',
      logo: '/Apache Airflow.svg',
      url: 'https://github.com/apache/airflow'
    },
    {
      name: 'JabRef',
      logo: '/jabref.svg',
      url: 'https://github.com/JabRef/jabref'
    }
  ];

  const skills = [
    {
      category: 'Languages',
      items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C/C++', 'SQL']
    },
    {
      category: 'Framework & Libraries',
      items: ['Spring Boot', 'FastAPI', 'Node.js', 'Django', 'Dagger', 'React']
    },
    {
      category: 'Databases',
      items: ['MongoDB', 'DynamoDB', 'PostgreSQL', 'MySQL', 'Redis']
    },
    {
      category: 'Cloud & DevOps',
      items: ['AWS (Lambda, S3, SQS, EC2, DynamoDB)', 'Docker', 'Kubernetes', 'Git', 'pytest', 'JUnit', 'Postman']
    },
    {
      category: 'AI/ML',
      items: ['PyTorch', 'scikit-learn', 'Pandas', 'NumPy', 'LLMs (GPT, LLaMA)', 'RAG', 'Fine-tuning', 'LoRA']
    }
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {isAboutInView && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {albums.map((album, idx) => (
            <div
              key={idx}
              className="absolute opacity-30 hover:opacity-50 transition-opacity duration-1000"
              style={{
                ...(albumPositions[idx] || { left: `${10 + (idx * 20)}%`, top: `${15 + (idx * 15)}%` }),
                animation: `float ${10 + idx * 2}s ease-in-out infinite`,
                animationDelay: album.delay,
              }}
            >
              <img
                src={album.image}
                alt={`${album.name} - ${album.artist}`}
                className={`w-64 h-64 object-cover rounded-lg shadow-2xl ${album.rotation}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-30px) translateX(20px) rotate(5deg);
          }
          50% {
            transform: translateY(-60px) translateX(-10px) rotate(-5deg);
          }
          75% {
            transform: translateY(-30px) translateX(-20px) rotate(3deg);
          }
        }
      `}</style>
      
      <div 
        className="fixed bottom-8 right-8 z-40 cursor-pointer hover:scale-110 transition-transform"
        onClick={showCatMessage}
      >
        <div className="relative">
          <div className="bg-zinc-900 border-2 border-emerald-400 rounded-full p-4 hover:bg-zinc-800 transition shadow-lg shadow-emerald-400/20">
            <Cat size={32} className="text-emerald-400" />
          </div>
          {catMessage && (
            <div className="absolute bottom-20 right-0 bg-zinc-800 border border-emerald-400 px-4 py-2 rounded-lg text-sm whitespace-nowrap animate-bounce shadow-lg">
              {catMessage}
            </div>
          )}
        </div>
      </div>

      <div className="fixed top-20 right-10 opacity-10 pointer-events-none">
        <div className="text-6xl">🐾</div>
      </div>
      <div className="fixed bottom-40 left-20 opacity-10 pointer-events-none rotate-45">
        <div className="text-5xl">🐾</div>
      </div>
      <div className="fixed top-1/2 right-40 opacity-10 pointer-events-none -rotate-12">
        <div className="text-4xl">🐾</div>
      </div>

      <nav className="fixed top-0 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold flex items-center gap-2">
            <Cat size={24} className="text-emerald-400" />
            <span>Avery Qiu</span>
          </div>
          <div className="flex gap-6 items-center">
            <a href="#about" className="hover:text-emerald-400 transition text-sm">About</a>
            <a href="#experience" className="hover:text-emerald-400 transition text-sm">Experience</a>
            <a href="#opensource" className="hover:text-emerald-400 transition text-sm">Open Source</a>
            <a href="#projects" className="hover:text-emerald-400 transition text-sm">Projects</a>
            <a href="#skills" className="hover:text-emerald-400 transition text-sm">Skills</a>
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-zinc-950 px-4 py-2 rounded text-sm font-medium transition"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>

      <section id="about" ref={aboutSectionRef} className="min-h-screen flex items-center justify-center px-6 pt-20 relative z-10">
        <div className="max-w-6xl w-full text-center">
          <div className="mb-6 text-emerald-400 font-mono text-sm">MS Computer Science @ Northeastern · GPA 3.9/4.0</div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Avery Qiu
          </h1>
          <p className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed font-mono" style={{
            background: 'linear-gradient(to right, #E40303 0%, #FF8C00 20%, #FFED00 40%, #008026 60%, #24408E 80%, #732982 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Building scalable systems and full-stack AI applications. Experienced in microservices, event-driven architectures, and LLM integration — exploring agentic AI.
          </p>

          <div className="flex gap-4 justify-center">
            <a href="https://linkedin.com/in/weiyu-qiu" target="_blank" rel="noopener noreferrer" className="p-3 border border-zinc-800 rounded-lg hover:border-emerald-400 hover:text-emerald-400 transition">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/Zeglow" target="_blank" rel="noopener noreferrer" className="p-3 border border-zinc-800 rounded-lg hover:border-emerald-400 hover:text-emerald-400 transition">
              <Github size={20} />
            </a>
            <a href="mailto:averyqiu.wy@gmail.com" className="p-3 border border-zinc-800 rounded-lg hover:border-emerald-400 hover:text-emerald-400 transition">
              <Mail size={20} />
            </a>
          </div>

          <div
            className="mt-16 animate-bounce cursor-pointer"
            onClick={() => {
              const target = educationSectionRef.current || document.getElementById('education');
              if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            <ChevronDown className="mx-auto text-zinc-600" size={32} />
          </div>
        </div>
      </section>

      <section id="education" ref={educationSectionRef} className="py-12 px-6 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="text-emerald-400" size={22} />
            <h2 className="text-2xl font-bold">Education</h2>
          </div>
          
          <div className="relative">
            <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-zinc-800"></div>
            
            <div className="space-y-8">
              {education.map((edu, idx) => (
                <div key={idx} className="relative pl-12">
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-emerald-400 border-4 border-zinc-950"></div>
                  
                  <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-950/50 hover:border-zinc-700 transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-base font-semibold text-emerald-400">
                          {edu.school}
                        </h3>
                        <div className="text-zinc-300 font-medium">
                          {edu.degree}
                        </div>
                        {edu.gpa && (
                          <div className="text-zinc-500 text-sm">
                            GPA: {edu.gpa}
                          </div>
                        )}
                        <div className="text-zinc-500 text-sm">
                          {edu.location}
                        </div>
                      </div>
                      <div className="text-emerald-400 text-sm font-mono whitespace-nowrap">
                        {edu.period}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="text-emerald-400" size={22} />
            <h2 className="text-2xl font-bold">Professional Experience</h2>
          </div>
          
          <div className="relative">
            <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-zinc-800"></div>
            
            <div className="space-y-12">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative pl-12">
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-emerald-400 border-4 border-zinc-950"></div>
                  
                  <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950/50 hover:border-zinc-700 transition">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-emerald-400 mb-1">
                          {exp.role}
                        </h3>
                        <div className="text-zinc-300 font-medium">
                          {exp.company}
                        </div>
                        <div className="text-zinc-500 text-sm">
                          {exp.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-emerald-400 text-sm font-mono whitespace-nowrap">
                          {exp.period}
                        </div>
                        <button
                          onClick={() => toggleExperience(idx)}
                          className="text-emerald-400 hover:text-emerald-300 transition-transform duration-200"
                          style={{ transform: expandedExperience[idx] ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        >
                          <ChevronDown size={20} />
                        </button>
                      </div>
                    </div>

                    {expandedExperience[idx] && (
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="text-zinc-400 text-sm flex items-start">
                            <span className="text-emerald-400 mr-2 flex-shrink-0">•</span>
                            <span className="flex-1">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-zinc-800/50 text-zinc-400 rounded text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="opensource" className="py-12 px-6 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Github className="text-emerald-400" size={22} />
            <h2 className="text-2xl font-bold">Open Source Contributions</h2>
          </div>
          
          <div className="flex gap-12 items-center">
            {openSource.map((os, idx) => (
              <a 
                key={idx} 
                href={os.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 group cursor-pointer"
              >
                <div className="w-20 h-20 flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 rounded-xl group-hover:border-emerald-400 transition-all duration-300 group-hover:scale-110">
                  <img src={os.logo} alt={`${os.name} logo`} className="w-16 h-16 object-contain" />
                </div>
                <span className="text-zinc-300 text-base font-medium group-hover:text-emerald-400 transition">
                  {os.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Code className="text-emerald-400" size={22} />
            <h2 className="text-2xl font-bold">Research Experience</h2>
          </div>
          
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950/50 hover:border-zinc-700 transition">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-1">
                  Soochow University NLP Lab
                </h3>
                <div className="text-zinc-300 font-medium">
                  Undergraduate Thesis Research
                </div>
                <div className="text-zinc-500 text-sm">
                  Advisor: Prof. Junhui Li
                </div>
              </div>
              <div className="text-emerald-400 text-sm font-mono whitespace-nowrap">
                Feb 2024 – Jun 2024
              </div>
            </div>

            <ul className="space-y-2 mb-4">
              <li className="text-zinc-400 text-sm flex items-start">
                <span className="text-emerald-400 mr-2 flex-shrink-0">•</span>
                <span className="flex-1">Developed prompt engineering framework integrating zero-shot/few-shot learning and Chain-of-Thought reasoning for GPT-3.5-turbo-based machine translation error classification (8 categories)</span>
              </li>
              <li className="text-zinc-400 text-sm flex items-start">
                <span className="text-emerald-400 mr-2 flex-shrink-0">•</span>
                <span className="flex-1">Built structured prompt templates combining instruction, proxy, and demonstration patterns to improve classification accuracy</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-2">
              {['GPT-3.5', 'Prompt Engineering', 'Chain-of-Thought', 'Zero-shot Learning', 'Few-shot Learning', 'NLP'].map((tech, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 bg-zinc-800/50 text-zinc-400 rounded text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-12 px-6 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Code className="text-emerald-400" size={22} />
            <h2 className="text-2xl font-bold">Personal Projects</h2>
          </div>
          
          <div className="space-y-6">
            {projects.map((project, idx) => (
              <div key={idx} className="border border-zinc-800 rounded-lg p-6 bg-zinc-950/50 hover:border-zinc-700 transition">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-emerald-400 mb-1">
                      {project.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleProject(idx)}
                    className="text-emerald-400 hover:text-emerald-300 transition-transform duration-200"
                    style={{ transform: expandedProjects[idx] ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <ChevronDown size={20} />
                  </button>
                </div>

                {expandedProjects[idx] && (
                  <ul className="space-y-2 mb-4">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-zinc-400 text-sm flex items-start">
                        <span className="text-emerald-400 mr-2 flex-shrink-0">•</span>
                        <span className="flex-1">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-zinc-800/50 text-zinc-400 rounded text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <BookOpen className="text-emerald-400" size={22} />
            <h2 className="text-2xl font-bold">Technical Skills</h2>
          </div>
          
          <div className="space-y-3">
            {skills.map((skillGroup, idx) => (
              <div key={idx}>
                <p className="text-base md:text-lg">
                  <span className="text-emerald-400 font-semibold mr-2">
                    {skillGroup.category}:
                  </span>
                  <span className="text-zinc-300">
                    {skillGroup.items.join(', ')}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Cat size={20} className="text-emerald-400" />
            <p className="text-zinc-500">Open to AI/ML Engineer and Software Engineer Intern & NG opportunities</p>
            <Cat size={20} className="text-emerald-400" />
          </div>
          <p className="text-zinc-600 text-sm">© 2025 Avery Qiu · Built with React</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;