import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import logoImg from '../assets/Newlogowhite.png';
import logoIcon from '../assets/logoiconWhite.png';
import { navigate, scrollToSection } from '../utils/router';
import { AnimatedTopDock } from '../shaders/animated-top-dock/AnimatedTopDock';

export default function IoTNavbar({ onOpenSearch }) {
  const [activeSection, setActiveSection] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const iotDockItems = [
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
      id: 'register',
      label: 'JOIN US',
      href: '/register?club=IoT',
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
          setIsScrolled(window.scrollY > 20);

          const sections = ['about', 'how-it-works', 'learning-path', 'hardware-lab', 'systems', 'toolkit', 'capstone'];
          const scrollPosition = window.scrollY + 200;

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
    return () => window.removeEventListener('scroll', handleScroll);
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
    <header className={`iot-navbar-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="iot-navbar-container">
        {/* Left: Official NEXORA Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNav('/');
          }}
          className="iot-navbar-brand"
          aria-label="NEXORA Tech Clubs Home"
        >
          <img
            src={logoImg}
            alt="NEXORA Tech Clubs Logo"
            className="iot-navbar-logo-img"
          />
        </a>

        {/* Center: ThreeUI AnimatedTopDock Sable Capsule */}
        <nav className="iot-navbar-desktop-nav" aria-label="IoT Club Navigation">
          <AnimatedTopDock
            variant="sable"
            proximity={140}
            spring={0.08}
            damping={0.84}
            widthGrowth={14}
            heightGrowth={10}
            drop={2.5}
            activeId={activeSection}
            items={iotDockItems}
            onItemSelect={(id, href) => handleNav(href || `#${id}`, id)}
            onLogoClick={() => handleNav('/')}
            logo={<img src={logoIcon} alt="NEXORA" className="dock-logo-icon" />}
            className="iot-navbar-threeui-dock"
          />
        </nav>

        {/* Right: Search & Orange Join IoT Club Button */}
        <div className="iot-navbar-right">
          <button
            type="button"
            className="iot-navbar-search-btn"
            onClick={onOpenSearch}
            aria-label="Search IoT Club topics"
          >
            <Search size={17} strokeWidth={2} />
          </button>

          <button
            type="button"
            className="iot-navbar-join-btn"
            onClick={() => handleNav('/register?club=IoT')}
            aria-label="Join IoT Club"
          >
            <span>JOIN US</span>
            <ArrowRight size={15} />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="iot-navbar-mobile-toggle"
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
        <div className="iot-navbar-mobile-menu">
          <ul className="iot-mobile-nav-list">
            {iotDockItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`iot-mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNav(item.href, item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="iot-mobile-cta-item">
              <button
                type="button"
                className="iot-navbar-join-btn iot-mobile-join-btn"
                onClick={() => handleNav('/register?club=IoT')}
              >
                <span>JOIN US</span>
                <ArrowRight size={15} />
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
