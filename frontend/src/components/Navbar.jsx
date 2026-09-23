import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/nexora-logo.png';
import { navigate, scrollToSection } from '../utils/router';
import '../styles/Navbar.css';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'clubs', label: 'Clubs', href: '#clubs' },
    { id: 'register', label: 'Join Us', href: '#register' }
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setIsScrolled(currentY > 20);

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
    const cleanId = (href || `#${id}`).replace(/^#\/?/, '');
    scrollToSection(cleanId);
  };

  return (
    <header className={`nexora-navbar-header ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nexora-navbar-inner">
        {/* Brand Logo: Top Left */}
        <a
          href="#home"
          className="nexora-navbar-brand"
          aria-label="NEXORA Tech Clubs Home"
          onClick={(e) => handleNavClick(e, '#home', 'home')}
        >
          <img
            src={logoImg}
            alt="NEXORA TECH CLUBS - LEARN. BUILD. LEAD."
            className="nexora-logo-img"
          />
        </a>

        {/* Center Liquid Glass Pill Navigation */}
        <nav className="nexora-nav-pill-container" aria-label="Main Navigation">
          <div className="nexora-nav-pill">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`nexora-nav-item ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="nexora-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown with Liquid Glass */}
      {mobileMenuOpen && (
        <div className="nexora-mobile-menu">
          <ul className="nexora-mobile-nav-list">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="nexora-mobile-nav-item">
                  <button
                    type="button"
                    className={`nexora-mobile-nav-link ${isActive ? 'active' : ''}`}
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
