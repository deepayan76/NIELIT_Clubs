import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import logoImg from '../assets/Newlogowhite.png';
import logoIcon from '../assets/logoiconWhite.png';
import { navigate, scrollToSection } from '../utils/router';
import { AnimatedTopDock } from '../shaders/animated-top-dock/AnimatedTopDock';

export default function ProgNavbar({ onOpenSearch }) {
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const progDockItems = [
    {
      id: 'home',
      label: 'HOME',
      href: '/',
      icon: (
        <>
          <path d="M2.5 7.5L8 2.5l5.5 5v6a1 1 0 0 1-1 1h-3.5v-4h-2v4H3.5a1 1 0 0 1-1-1z" />
        </>
      )
    },
    {
      id: 'about',
      label: 'ABOUT',
      href: '#about',
      icon: (
        <>
          <circle cx="8" cy="8" r="6" />
          <path d="M8 7v4M8 5h.01" />
        </>
      )
    },
    {
      id: 'clubs',
      label: 'CLUBS',
      href: '/#clubs',
      icon: (
        <>
          <rect x="2.5" y="2.5" width="4.5" height="4.5" rx=".8" />
          <rect x="9" y="2.5" width="4.5" height="4.5" rx=".8" />
          <rect x="2.5" y="9" width="4.5" height="4.5" rx=".8" />
          <rect x="9" y="9" width="4.5" height="4.5" rx=".8" />
        </>
      )
    },
    {
      id: 'how-it-works',
      label: 'HOW IT WORKS',
      href: '#how-it-works',
      icon: (
        <>
          <path d="M2 4h12M2 8h8M2 12h10" />
        </>
      )
    },
    {
      id: 'practice',
      label: 'PRACTICE',
      href: '#practice',
      icon: (
        <>
          <path d="M4 3h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
          <path d="M6 7l2 2-2 2" />
        </>
      )
    },
    {
      id: 'capstone',
      label: 'CAPSTONE',
      href: '#capstone',
      icon: (
        <>
          <path d="M8 2l6 4-6 4-6-4z" />
          <path d="M2 10l6 4 6-4M2 13l6 4 6-4" />
        </>
      )
    },
    {
      id: 'contact',
      label: 'CONTACT',
      href: '#contact',
      icon: (
        <>
          <circle cx="8" cy="8" r="3" />
          <path d="M3 13c0-2.5 2.5-4 5-4s5 1.5 5 4" />
        </>
      )
    }
  ];

  useEffect(() => {
    let ticking = false;
    let cachedSections = [];

    const updateSectionCache = () => {
      const sectionIds = ['about', 'how-it-works', 'practice', 'capstone', 'contact'];
      cachedSections = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop } : null;
        })
        .filter(Boolean);
    };

    updateSectionCache();
    window.addEventListener('resize', updateSectionCache, { passive: true });

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const shouldBeScrolled = currentY > 20;
          setIsScrolled((prev) => (prev !== shouldBeScrolled ? shouldBeScrolled : prev));

          const scrollPosition = currentY + 200;
          for (let i = cachedSections.length - 1; i >= 0; i--) {
            if (scrollPosition >= cachedSections[i].top) {
              const nextId = cachedSections[i].id;
              setActiveSection((prev) => (prev !== nextId ? nextId : prev));
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateSectionCache);
    };
  }, []);

  const handleNav = (url, id) => {
    setIsMobileMenuOpen(false);
    if (id) setActiveSection(id);

    if (url.startsWith('#')) {
      scrollToSection(url.substring(1));
    } else {
      navigate(url);
    }
  };

  return (
    <header className={`prog-navbar-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="prog-navbar-container">
        {/* Left: Official NEXORA Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNav('/');
          }}
          className="prog-navbar-brand"
          aria-label="NEXORA Tech Clubs Home"
        >
          <img
            src={logoImg}
            alt="NEXORA Tech Clubs Logo"
            className="prog-navbar-logo-img"
          />
        </a>

        {/* Center: ThreeUI AnimatedTopDock Sable Capsule */}
        <nav className="prog-navbar-desktop-nav" aria-label="Programming Club Navigation">
          <AnimatedTopDock
            variant="sable"
            proximity={140}
            spring={0.08}
            damping={0.84}
            widthGrowth={14}
            heightGrowth={10}
            drop={2.5}
            activeId={activeSection}
            items={progDockItems}
            onItemSelect={(id, href) => handleNav(href || `#${id}`, id)}
            onLogoClick={() => handleNav('/')}
            logo={<img src={logoIcon} alt="NEXORA" className="dock-logo-icon" />}
            className="prog-navbar-threeui-dock"
          />
        </nav>

        {/* Right: Search & Solid Blue Join Button */}
        <div className="prog-navbar-right">
          <button
            type="button"
            className="prog-navbar-search-btn"
            onClick={onOpenSearch}
            aria-label="Search Programming Club topics"
          >
            <Search size={17} strokeWidth={2} />
          </button>

          <button
            type="button"
            className="prog-navbar-join-btn"
            onClick={() => handleNav('/register?club=Programming')}
          >
            <span>Join Programming Club</span>
            <ArrowRight size={15} />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="prog-navbar-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="prog-navbar-mobile-menu">
          <ul className="prog-mobile-nav-list">
            {progDockItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`prog-mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNav(item.href, item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="prog-mobile-cta-item">
              <button
                type="button"
                className="prog-navbar-join-btn prog-mobile-join-btn"
                onClick={() => handleNav('/register?club=Programming')}
              >
                <span>Join Programming Club</span>
                <ArrowRight size={15} />
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
