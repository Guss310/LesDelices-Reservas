'use client';

import { useState, useEffect } from 'react';

export default function MenuClientNav({ categories }) {
  const [active, setActive] = useState(categories[0]?.id || '');

  useEffect(() => {
    const observers = categories.map((cat) => {
      const el = document.getElementById(cat.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(cat.id);
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [categories]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActive(id);
  };

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              className={`shrink-0 px-4 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                active === cat.id
                  ? 'bg-[#326c2d] text-white'
                  : 'text-gray-500 hover:text-[#326c2d] hover:bg-[#326c2d]/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
