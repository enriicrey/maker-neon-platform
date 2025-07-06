
import { useState, useEffect } from 'react';

const TableOfContents = () => {
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // Extract headings from the document
    const headingElements = document.querySelectorAll('h2, h3');
    const headingData = Array.from(headingElements).map((heading, index) => {
      const id = heading.id || `heading-${index}`;
      if (!heading.id) {
        heading.id = id;
      }
      return {
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.substring(1))
      };
    });
    
    setHeadings(headingData);

    // Set up intersection observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Contenidos</h3>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollToSection(heading.id)}
            className={`block w-full text-left text-sm transition-colors ${
              heading.level === 3 ? 'pl-4' : ''
            } ${
              activeId === heading.id
                ? 'text-primary font-medium'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {heading.text}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;
