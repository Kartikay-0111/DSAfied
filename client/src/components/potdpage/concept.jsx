import React, { useState, useEffect } from 'react';
import { Hash, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
const CodeBlock = ({ content }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-lg bg-gray-900 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <span className="text-sm text-gray-400">Python</span>
        <button
          onClick={copyCode}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-gray-300 text-sm md:text-base">{content}</code>
      </pre>
    </div>
  );
};

const TutorialComponent = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [day, setDay] = useState(new Date().getDay());
  const [tutorialData, setTutorialData] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  // Update day at midnight
  useEffect(() => {
    const interval = setInterval(() => {
      setDay(new Date().getDay());
    }, 1000 * 60 * 60 * 24);

    return () => clearInterval(interval);
  }, []);

  // Fetch tutorial data
  useEffect(() => {
    const fetchArticle = async () => {
      const token = await getAccessTokenSilently();
      try {
        const response = await fetch(`/api/article/${day}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Article not found');
        }
        const data = await response.json();
        setTutorialData(data);
        setActiveSection(data.sections[0].id); // Set default active section
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticle();
  }, [day]);

  // Handle sidebar for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (isMobileView) {
      setIsSidebarOpen(false);
    }
  };

  const renderContent = (content) => {
    const parts = content.split('```');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        const [lang, ...code] = part.split('\n');
        return <CodeBlock key={index} content={code.join('\n')} />;
      }
      return part.split('\n\n').map((paragraph, idx) => (
        <p key={`${index}-${idx}`} className="mb-4 leading-relaxed text-gray-300">
          {paragraph}
        </p>
      ));
    });
  };

  // Display a loading state if tutorialData is null
  if (!tutorialData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading tutorial...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-20 right-4 z-50 p-2 bg-gray-800 rounded-full text-blue-400"
      >
        {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileView && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } fixed lg:sticky top-14 left-0 h-screen bg-gray-800 border-r border-gray-700 
        shadow-lg transition-all duration-300 z-40 ${isSidebarOpen ? 'w-64' : 'lg:w-16'}`}
      >
        <div className="p-4">
          {isSidebarOpen && <h2 className="text-lg font-bold mb-4 text-white">Contents</h2>}
          <nav>
            {tutorialData.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left mb-2 p-2 rounded-md transition-colors duration-200 ${
                  activeSection === section.id
                    ? 'bg-blue-900 text-blue-400'
                    : 'text-gray-400 hover:bg-gray-700'
                } ${!isSidebarOpen ? 'px-2' : 'px-4'}`}
              >
                {isSidebarOpen ? section.title : <Hash size={20} />}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 transition-all duration-300 w-full">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-12">
          <h1 className="text-2xl md:text-4xl font-bold mb-8 text-white pr-12 lg:pr-0">
            {tutorialData.title}
          </h1>

          {tutorialData.sections.map((section) => (
            <section key={section.id} id={section.id} className="mb-12 scroll-mt-16">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-blue-400">
                {section.title}
              </h2>
              <div className="prose prose-invert max-w-none">
                {renderContent(section.content)}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TutorialComponent;