import React from 'react';
import { Award, BookOpen, Cpu } from 'lucide-react';

export default function About() {
  const technologies = [
    'HTML', 'CSS', 'JavaScript', 'Java', 'Spring Boot', 
    'SQL', 'Python', 'Retrieval-Augmented Generation (RAG)', 
    'LangChain', 'LangGraph'
  ];

  const tools = ['Git', 'GitHub', 'Figma', 'VS Code', 'Antigravity'];

  return (
    <section id="about" className="py-20 bg-bg-light dark:bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand dark:text-cyan-400">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 leading-tight">
            A DEVELOPER WHO BUILDS WITH PURPOSE.
          </h2>
          <div className="w-16 h-1 bg-brand mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Bio Info */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              I'm Deepak, a B.Tech Artificial Intelligence & Data Science student and freelance web developer. I enjoy turning complex ideas and real-world requirements into clean, useful and modern digital experiences.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              My approach focuses on creating robust front-ends paired with secure back-ends. Combining B.Tech concepts in AI with active development, I build websites that don't just look stunning—they load fast, rank on search engines, and convert visitors into clients.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-brand/10 dark:bg-cyan-950/40 rounded-lg text-brand dark:text-cyan-400 mt-1">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">B.Tech Student</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Artificial Intelligence & Data Science
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-brand/10 dark:bg-cyan-950/40 rounded-lg text-brand dark:text-cyan-400 mt-1">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">AI Enthusiast</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Spring Boot, LangChain, & RAG agent setup
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technologies & Tools */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm text-left">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-brand dark:text-cyan-400" />
              Core Capabilities
            </h3>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              I utilize a modern toolkit to design, build, and deploy reliable digital products.
            </p>

            <div className="space-y-6">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
                  Languages & Frameworks
                </span>
                <div className="flex flex-wrap gap-2">
                  {technologies.map(tech => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 bg-gray-50 dark:bg-slate-850 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-lg border border-gray-100 dark:border-slate-850 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
                  Tools & Environments
                </span>
                <div className="flex flex-wrap gap-2">
                  {tools.map(tool => (
                    <span 
                      key={tool} 
                      className="px-3 py-1 bg-gray-50 dark:bg-slate-850 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-lg border border-gray-100 dark:border-slate-850 transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
