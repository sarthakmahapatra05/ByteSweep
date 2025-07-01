import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  GraduationCap, 
  Code, 
  Award,
  User,
  Briefcase,
  ArrowRight,
  ExternalLink,
  ShoppingCart,
  HardDrive,
  Folder,
  Trash2
} from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'projects', 'skills', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skills = [
    { name: 'Python', level: 90, category: 'Programming' },
    { name: 'C Programming', level: 85, category: 'Programming' },
    { name: 'React.js', level: 88, category: 'Frontend' },
    { name: 'JavaScript', level: 85, category: 'Frontend' },
    { name: 'HTML/CSS', level: 90, category: 'Frontend' },
    { name: 'DSA in Python', level: 80, category: 'Algorithms' },
    { name: 'MERN Stack', level: 85, category: 'Full Stack' }
  ];

  const projects = [
    {
      title: 'E-Commerce Website',
      description: 'A full-featured e-commerce platform built with the MERN stack, featuring user authentication, product catalog, shopping cart, and secure payment processing.',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript'],
      icon: <ShoppingCart className="w-8 h-8" />,
      features: [
        'User Authentication & Authorization',
        'Product Catalog with Search & Filters',
        'Shopping Cart & Checkout System',
        'Order Management',
        'Responsive Design'
      ],
      color: 'from-green-400 to-emerald-600'
    },
    {
      title: 'System File Management Tool',
      description: 'An intelligent system utility that detects and manages temporary files, large files, and provides comprehensive file system analysis with cleanup features.',
      technologies: ['Python', 'File System APIs', 'GUI Framework'],
      icon: <HardDrive className="w-8 h-8" />,
      features: [
        'Temporary File Detection & Cleanup',
        'Large File Identification',
        'Disk Space Analysis',
        'Automated File Organization',
        'System Performance Optimization'
      ],
      color: 'from-purple-400 to-indigo-600'
    }
  ];

  const certifications = [
    {
      title: 'Leadership Challenge Participation',
      issuer: 'Silicon University',
      description: 'Sabdatatava Leadership Program',
      icon: <Award className="w-6 h-6" />
    },
    {
      title: 'Python Programming (Beginner)',
      issuer: 'HackerRank',
      description: 'Certified Python Developer',
      icon: <Code className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Sarthak Mahapatra
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Education', 'Training/Internships', 'Projects', 'Skills', 'Languages', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(/\//g, '-'))}
                  className={`text-sm font-medium transition-all duration-300 hover:text-blue-400 ${
                    activeSection === item.toLowerCase().replace(/\//g, '-')
                      ? 'text-blue-400 border-b-2 border-blue-400 pb-1'
                      : 'text-slate-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-cyan-900/20"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Sarthak Mahapatra
              </span>
            </h1>
            <div className="flex items-center justify-center mb-6 text-slate-300">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">Bhubaneswar, Odisha, India</span>
            </div>
            <p className="text-xl sm:text-2xl text-slate-300 mb-2 leading-relaxed">
              Electronics & Communication Engineering Student
            </p>
            <p className="text-lg text-slate-400 mb-2">CGPA: 8.55</p>
            <p className="text-lg text-slate-400 mb-2">Email: sarthakmahapatra303@gmail.com</p>
            <p className="text-lg text-slate-400 mb-8">LinkedIn: <a href="https://www.linkedin.com/in/Sarthakmahapatra" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Sarthakmahapatra</a></p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('about')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Learn More About Me <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-blue-400 hover:bg-blue-400 hover:text-slate-900 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <User className="w-12 h-12 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  I'm a passionate Electronics & Communication Engineering student at Silicon University, 
                  Bhubaneswar, with a CGPA of 8.55. I have a strong foundation in programming and web development, specializing in the MERN stack. I am adaptable, a quick learner, and have excellent communication and leadership skills. I enjoy building user-centric applications and collaborating in teams.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-400/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <Briefcase className="w-8 h-8 text-cyan-400 mr-3" />
                  <h4 className="text-xl font-semibold">Current Focus</h4>
                </div>
                <p className="text-slate-300">
                  Developing full-stack web applications using the MERN stack and strengthening my foundation in electronics and communication engineering.
                </p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-400/50 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <MapPin className="w-8 h-8 text-green-400 mr-3" />
                  <h4 className="text-xl font-semibold">Languages</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">English</span>
                  <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">Hindi</span>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">Odia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            {/* Current Education */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <GraduationCap className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      B.Tech in Electronics and Communication Engineering
                    </h3>
                    <p className="text-xl text-blue-400 mb-2">Silicon University, Bhubaneswar</p>
                    <p className="text-lg text-slate-300 mb-1">2024 - 2028</p>
                    <p className="text-slate-400">CGPA: 8.55</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Previous Education */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-cyan-500/20 p-3 rounded-full">
                    <GraduationCap className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      CBSE (Class XII)
                    </h3>
                    <p className="text-xl text-cyan-400 mb-2">Kendriya Vidyalaya No.1, BBSR, Odisha</p>
                    <p className="text-lg text-slate-300 mb-1">2023</p>
                    <p className="text-slate-400">Score: 72%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <GraduationCap className="w-8 h-8 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      CBSE (Class X)
                    </h3>
                    <p className="text-xl text-green-400 mb-2">Kendriya Vidyalaya No.1, BBSR, Odisha</p>
                    <p className="text-lg text-slate-300 mb-1">2021</p>
                    <p className="text-slate-400">Score: 93%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training/Internships Section */}
      <section id="training-internships" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Training & Internships
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Briefcase className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      CODEBEAT Internship
                    </h3>
                    <p className="text-xl text-blue-400 mb-2">06/06/25 - 30/06/25</p>
                    <p className="text-lg text-slate-300 mb-1">Developed full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Gained practical experience in building responsive, user-centric interfaces and APIs. Strengthened skills in modern development workflows, debugging, and team collaboration.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
            <p className="text-slate-300 mt-6 max-w-2xl mx-auto">
              Here are some of the projects I've built that showcase my technical skills and problem-solving abilities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: 'ByteSweep',
                description: 'Developed an online system handling website using the MERN stack.',
                technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
                icon: <HardDrive className="w-8 h-8" />,
                features: [
                  'Full-stack MERN application',
                  'Efficient file and data management',
                  'User authentication and authorization',
                  'Responsive and user-friendly interface'
                ],
                color: 'from-green-400 to-emerald-600'
              },
              {
                title: 'To-Do Task App',
                description: 'Created a responsive web app for managing daily tasks.',
                technologies: ['React.js', 'JavaScript', 'HTML', 'CSS'],
                icon: <Folder className="w-8 h-8" />,
                features: [
                  'Task creation, editing, and deletion',
                  'Responsive design for all devices',
                  'User-friendly interface',
                  'Persistent storage of tasks'
                ],
                color: 'from-purple-400 to-indigo-600'
              }
            ].map((project, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center mb-6">
                  <div className={`bg-gradient-to-r ${project.color} p-3 rounded-full mr-4`}>
                    {project.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                </div>
                
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-slate-300">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <Folder className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">More Projects Coming Soon</h3>
              <p className="text-slate-300 max-w-2xl mx-auto">
                I'm constantly working on new projects and exploring different technologies. 
                Stay tuned for more exciting developments!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'C', level: 85, category: 'Programming' },
              { name: 'Python', level: 90, category: 'Programming' },
              { name: 'HTML', level: 90, category: 'Frontend' },
              { name: 'CSS', level: 88, category: 'Frontend' },
              { name: 'JavaScript', level: 85, category: 'Frontend' },
              { name: 'Node.js', level: 85, category: 'Backend' },
              { name: 'React.js', level: 88, category: 'Frontend' },
              { name: 'Express.js', level: 80, category: 'Backend' },
              { name: 'MongoDB', level: 80, category: 'Database' },
              { name: 'Project Management', level: 80, category: 'Soft Skill' },
              { name: 'Leadership', level: 85, category: 'Soft Skill' },
              { name: 'Communication', level: 90, category: 'Soft Skill' },
              { name: 'Adaptability', level: 85, category: 'Soft Skill' }
            ].map((skill, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                  <span className="text-sm text-slate-400">{skill.level}%</span>
                </div>
                <div className="mb-3">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-slate-400">{skill.category}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">MERN Stack Developer</h3>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Proficient in building full-stack web applications using MongoDB, Express.js, React.js, 
                and Node.js. Experienced in creating responsive, dynamic, and user-friendly applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Certifications & Achievements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    {cert.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                    <p className="text-blue-400 mb-2">{cert.issuer}</p>
                    <p className="text-slate-300">{cert.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section id="languages" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Languages
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <GraduationCap className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      English
                    </h3>
                    <p className="text-xl text-blue-400 mb-2">Fluent</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-cyan-500/20 p-3 rounded-full">
                    <GraduationCap className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Hindi
                    </h3>
                    <p className="text-xl text-cyan-400 mb-2">Fluent</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <GraduationCap className="w-8 h-8 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Odia
                    </h3>
                    <p className="text-xl text-green-400 mb-2">Native</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"></div>
            <p className="text-slate-300 mt-6 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="mailto:sarthakmahapatra303@gmail.com"
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-red-400/50 transition-all duration-300 hover:transform hover:scale-105 text-center group"
            >
              <Mail className="w-8 h-8 text-red-400 mx-auto mb-4 group-hover:animate-bounce" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-slate-300 text-sm break-all">sarthakmahapatra303@gmail.com</p>
            </a>

            <a
              href="tel:+919438826474"
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105 text-center group"
            >
              <Phone className="w-8 h-8 text-green-400 mx-auto mb-4 group-hover:animate-bounce" />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-slate-300 text-sm">+91 9438826474</p>
            </a>

            <a
              href="https://www.linkedin.com/in/Sarthakmahapatra"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105 text-center group"
            >
              <Linkedin className="w-8 h-8 text-blue-400 mx-auto mb-4 group-hover:animate-bounce" />
              <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
              <div className="flex items-center justify-center text-slate-300 text-sm">
                <span>Connect with me</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </div>
            </a>

            <a
              href="https://github.com/sarthakmahapatra05"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 text-center group"
            >
              <Github className="w-8 h-8 text-purple-400 mx-auto mb-4 group-hover:animate-bounce" />
              <h3 className="text-lg font-semibold mb-2">GitHub</h3>
              <div className="flex items-center justify-center text-slate-300 text-sm">
                <span>View my code</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            © 2024 Sarthak Mahapatra. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;