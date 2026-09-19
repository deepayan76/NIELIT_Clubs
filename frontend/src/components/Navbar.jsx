import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { navigate, scrollToSection } from '../utils/router';
import { AnimatedTopDock } from '../shaders/animated-top-dock/AnimatedTopDock';
import '../styles/Navbar.css';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dockNavItems = [
    {
      id: 'home',
      label: 'HOME',
      href: '#home',
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
      href: '#clubs',
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
      id: 'register',
      label: 'JOIN US',
      href: '#register',
      icon: (
        <>
          <circle cx="6" cy="8" r="3.5" />
          <path d="M12 5v6M9 8h6" />
        </>
      )
    }
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;

          // Hysteresis threshold to prevent vibration/jitter loop
          setIsScrolled((prev) => {
            if (currentY > 45) return true;
            if (currentY < 15) return false;
            return prev;
          });

          // Track active section for nav highlighting
          const sections = ['home', 'about', 'clubs', 'register'];
          const scrollPosition = currentY + 180;

          for (let i = sections.length - 1; i >= 0; i--) {
            const sectionEl = document.getElementById(sections[i]);
            if (sectionEl) {
              const top = sectionEl.offsetTop;
              if (scrollPosition >= top) {
                setActiveSection(sections[i]);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href, id) => {
    if (e && e.preventDefault) e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(id);
    navigate(href || `#${id}`);
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'is-scrolled' : ''}`} id="navbar">
      <div className="container navbar-container">
        {/* Brand / Logo */}
        <a
          href="#home"
          className="navbar-brand"
          aria-label="NIELIT Tech Clubs Home"
          onClick={(e) => handleNavClick(e, '#home', 'home')}
        >
          <img src={logoImg} alt="NIELIT Logo" className="navbar-logo-img" />
        </a>

        {/* Desktop Animated Top Dock Capsule from ThreeUI */}
        <nav className="navbar-desktop-nav" aria-label="Main Navigation">
          <AnimatedTopDock
            variant="sable"
            proximity={140}
            spring={0.08}
            damping={0.84}
            widthGrowth={14}
            heightGrowth={10}
            drop={2.5}
            activeId={activeSection}
            items={dockNavItems}
            onItemSelect={(id, href) => handleNavClick(null, href || `#${id}`, id)}
            onLogoClick={() => handleNavClick(null, '#home', 'home')}
            logo={<img src={logoImg} alt="NIELIT" className="dock-logo-icon" />}
            className="navbar-threeui-dock"
          />
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown with Glass Effect */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <ul className="mobile-nav-list">
            {dockNavItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="mobile-nav-item">
                  <button
                    type="button"
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, item.href, item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
