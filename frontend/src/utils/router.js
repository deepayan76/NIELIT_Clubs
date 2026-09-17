import { useState, useEffect } from 'react';

/**
 * Universal client router for NIELIT Tech Clubs.
 * Seamlessly manages pathnames (/ai, /login, /dashboard/*, /admin/*), hash routes (#/ai, #/dashboard, #/admin), query parameters (?club=ai),
 * and dynamic scroll positioning with intelligent retry logic.
 */

export function scrollToSection(targetId) {
  if (typeof window === 'undefined' || !targetId) return;

  const cleanId = targetId.replace(/^#\/?/, '').replace(/^\//, '');
  if (!cleanId || cleanId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  let attempts = 0;
  const maxAttempts = 15;

  const tryScroll = () => {
    const el = document.getElementById(cleanId);
    if (el) {
      const headerOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    } else if (attempts < maxAttempts) {
      attempts++;
      setTimeout(tryScroll, 100);
    }
  };

  tryScroll();
}

export function navigate(url, options = {}) {
  if (typeof window === 'undefined' || !url) return;

  const currentPath = (window.location.pathname || '/').toLowerCase();
  const currentHash = (window.location.hash || '').toLowerCase();

  const isCurrentlyAi =
    currentPath === '/ai' ||
    currentPath === '/ai/' ||
    currentPath === '/ai-club' ||
    currentHash === '#/ai' ||
    currentHash === '#ai';

  const isCurrentlyProg =
    currentPath === '/programming' ||
    currentPath === '/programming/' ||
    currentPath === '/programming-club' ||
    currentHash === '#/programming' ||
    currentHash === '#programming';

  const isCurrentlyCyber =
    currentPath === '/cybersecurity' ||
    currentPath === '/cybersecurity/' ||
    currentPath === '/cybersecurity-club' ||
    currentHash === '#/cybersecurity' ||
    currentHash === '#cybersecurity';

  const isCurrentlyIot =
    currentPath === '/iot' ||
    currentPath === '/iot/' ||
    currentPath === '/iot-club' ||
    currentHash === '#/iot' ||
    currentHash === '#iot';

  const isCurrentlyDashboard =
    currentPath.startsWith('/dashboard') ||
    currentHash.startsWith('#/dashboard') ||
    currentHash.startsWith('#dashboard');

  const isCurrentlyLogin =
    currentPath === '/login' ||
    currentPath === '/login/' ||
    currentHash === '#/login' ||
    currentHash === '#login';

  const isCurrentlyForgotPassword =
    currentPath === '/forgot-password' ||
    currentPath === '/forgot-password/' ||
    currentHash === '#/forgot-password' ||
    currentHash === '#forgot-password';

  const isCurrentlyResetPassword =
    currentPath.startsWith('/reset-password') ||
    currentHash.startsWith('#/reset-password') ||
    currentHash.startsWith('#reset-password');

  const isCurrentlyAdmin =
    currentPath.startsWith('/admin') ||
    currentHash.startsWith('#/admin') ||
    currentHash.startsWith('#admin');

  const targetLower = url.toLowerCase();

  const isTargetAi =
    targetLower === '/ai' ||
    targetLower === '/ai/' ||
    targetLower === '/ai-club' ||
    targetLower === '#/ai' ||
    targetLower === '#ai';

  const isTargetProg =
    targetLower === '/programming' ||
    targetLower === '/programming/' ||
    targetLower === '/programming-club' ||
    targetLower === '#/programming' ||
    targetLower === '#programming';

  const isTargetCyber =
    targetLower === '/cybersecurity' ||
    targetLower === '/cybersecurity/' ||
    targetLower === '/cybersecurity-club' ||
    targetLower === '#/cybersecurity' ||
    targetLower === '#cybersecurity';

  const isTargetIot =
    targetLower === '/iot' ||
    targetLower === '/iot/' ||
    targetLower === '/iot-club' ||
    targetLower === '#/iot' ||
    targetLower === '#iot';

  const isTargetDashboard =
    targetLower.startsWith('/dashboard') ||
    targetLower.startsWith('#/dashboard') ||
    targetLower.startsWith('#dashboard');

  const isTargetLogin =
    targetLower === '/login' ||
    targetLower === '/login/' ||
    targetLower === '#/login' ||
    targetLower === '#login';

  const isTargetForgotPassword =
    targetLower === '/forgot-password' ||
    targetLower === '/forgot-password/' ||
    targetLower === '#/forgot-password' ||
    targetLower === '#forgot-password';

  const isTargetResetPassword =
    targetLower.startsWith('/reset-password') ||
    targetLower.startsWith('#/reset-password') ||
    targetLower.startsWith('#reset-password');

  const isTargetAdmin =
    targetLower.startsWith('/admin') ||
    targetLower.startsWith('#/admin') ||
    targetLower.startsWith('#admin');

  // 1. Local anchor within the same page (e.g. #about on current page)
  if (
    url.startsWith('#') &&
    !url.startsWith('#/') &&
    !isCurrentlyDashboard &&
    !isCurrentlyLogin &&
    !isCurrentlyForgotPassword &&
    !isCurrentlyResetPassword &&
    !isCurrentlyAdmin
  ) {
    const targetId = url.substring(1);
    scrollToSection(targetId);
    return;
  }

  // 2. Transition between Dedicated Club pages, Login, Dashboard, Admin, and Parent Landing page
  if (
    isCurrentlyAi ||
    isCurrentlyProg ||
    isCurrentlyCyber ||
    isCurrentlyIot ||
    isCurrentlyDashboard ||
    isCurrentlyLogin ||
    isCurrentlyForgotPassword ||
    isCurrentlyResetPassword ||
    isCurrentlyAdmin
  ) {
    if (
      (isCurrentlyAi && isTargetAi) ||
      (isCurrentlyProg && isTargetProg) ||
      (isCurrentlyCyber && isTargetCyber) ||
      (isCurrentlyIot && isTargetIot)
    ) {
      const hashIndex = url.indexOf('#');
      if (hashIndex !== -1) {
        scrollToSection(url.substring(hashIndex + 1));
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    window.history.pushState({}, '', url);
    window.dispatchEvent(new Event('popstate'));

    const hashIndex = url.indexOf('#');
    if (
      hashIndex !== -1 &&
      !isTargetDashboard &&
      !isTargetLogin &&
      !isTargetForgotPassword &&
      !isTargetResetPassword &&
      !isTargetAdmin
    ) {
      const targetId = url.substring(hashIndex + 1);
      setTimeout(() => scrollToSection(targetId), 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }

  // 3. Transition from Parent Landing page to Club pages, Login, Dashboard, or Admin
  if (
    isTargetAi ||
    isTargetProg ||
    isTargetCyber ||
    isTargetIot ||
    isTargetDashboard ||
    isTargetLogin ||
    isTargetForgotPassword ||
    isTargetResetPassword ||
    isTargetAdmin
  ) {
    window.history.pushState({}, '', url);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // 4. In-page navigation on parent landing page (e.g. /#clubs, /?club=ai#register)
  if (url.includes('?') || url.startsWith('/#') || url.startsWith('/')) {
    window.history.pushState({}, '', url);
    window.dispatchEvent(new Event('popstate'));
  }
  const hashIndex = url.indexOf('#');
  if (hashIndex !== -1) {
    const targetId = url.substring(hashIndex + 1);
    scrollToSection(targetId);
  } else if (url === '/' || url === '#home' || url === '/#home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export function useRouter() {
  const [currentLocation, setCurrentLocation] = useState(() => {
    if (typeof window !== 'undefined') {
      return {
        pathname: window.location.pathname || '/',
        search: window.location.search || '',
        hash: window.location.hash || ''
      };
    }
    return { pathname: '/', search: '', hash: '' };
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentLocation({
        pathname: window.location.pathname || '/',
        search: window.location.search || '',
        hash: window.location.hash || ''
      });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Global click listener for SPA navigation on internal links
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore external links, mailto, tel, target="_blank", or download links
      if (
        anchor.target === '_blank' ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        anchor.hasAttribute('download')
      ) {
        return;
      }

      e.preventDefault();
      navigate(href);
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const path = (currentLocation.pathname || '').toLowerCase();
  const hash = (currentLocation.hash || '').toLowerCase();

  // Determine if current route is AI Club
  const isAiClub =
    path === '/ai' ||
    path === '/ai/' ||
    path === '/ai-club' ||
    hash === '#/ai' ||
    hash === '#ai';

  // Determine if current route is Programming Club
  const isProgrammingClub =
    path === '/programming' ||
    path === '/programming/' ||
    path === '/programming-club' ||
    hash === '#/programming' ||
    hash === '#programming';

  // Determine if current route is Cybersecurity Club
  const isCybersecurityClub =
    path === '/cybersecurity' ||
    path === '/cybersecurity/' ||
    path === '/cybersecurity-club' ||
    hash === '#/cybersecurity' ||
    hash === '#cybersecurity';

  // Determine if current route is IoT Club
  const isIotClub =
    path === '/iot' ||
    path === '/iot/' ||
    path === '/iot-club' ||
    hash === '#/iot' ||
    hash === '#iot';

  // Determine if current route is Login (Student)
  const isLogin =
    path === '/login' ||
    path === '/login/' ||
    hash === '#/login' ||
    hash === '#login';

  // Determine if current route is Forgot Password
  const isForgotPassword =
    path === '/forgot-password' ||
    path === '/forgot-password/' ||
    hash === '#/forgot-password' ||
    hash === '#forgot-password';

  // Determine if current route is Reset Password
  const isResetPassword =
    path.startsWith('/reset-password') ||
    hash.startsWith('#/reset-password') ||
    hash.startsWith('#reset-password');

  // Determine if current route is Dashboard (Student)
  const isDashboard =
    path.startsWith('/dashboard') ||
    hash.startsWith('#/dashboard') ||
    hash.startsWith('#dashboard');

  // Determine specific student dashboard subroute
  let dashboardSubroute = 'home';
  if (isDashboard) {
    let clean = path.replace(/^\/dashboard\/?/, '');
    if (!clean && hash) {
      clean = hash.replace(/^#\/?dashboard\/?/, '');
    }
    clean = clean.split('/')[0].split('?')[0];

    if (clean === 'profile') dashboardSubroute = 'profile';
    else if (clean === 'application') dashboardSubroute = 'application';
    else if (clean === 'club') dashboardSubroute = 'club';
    else if (clean === 'settings') dashboardSubroute = 'settings';
    else dashboardSubroute = 'home';
  }

  // Determine Admin Routes
  const isAdminLogin =
    path === '/admin/login' ||
    path === '/admin/login/' ||
    path === '/admin' ||
    path === '/admin/' ||
    hash === '#/admin/login' ||
    hash === '#admin/login' ||
    hash === '#/admin' ||
    hash === '#admin';

  const isAdminDashboard =
    (path.startsWith('/admin') || hash.startsWith('#/admin') || hash.startsWith('#admin')) &&
    !isAdminLogin;

  // Determine specific admin subroute
  let adminSubroute = 'dashboard';
  if (isAdminDashboard) {
    let clean = path.replace(/^\/admin\/?/, '');
    if (!clean && hash) {
      clean = hash.replace(/^#\/?admin\/?/, '');
    }
    clean = clean.split('/')[0].split('?')[0];

    if (clean === 'registrations') adminSubroute = 'registrations';
    else if (clean === 'students') adminSubroute = 'students';
    else if (clean === 'clubs') adminSubroute = 'clubs';
    else if (clean === 'notifications') adminSubroute = 'notifications';
    else if (clean === 'settings') adminSubroute = 'settings';
    else adminSubroute = 'dashboard';
  }

  return {
    pathname: currentLocation.pathname,
    search: currentLocation.search,
    hash: currentLocation.hash,
    isAiClub,
    isProgrammingClub,
    isCybersecurityClub,
    isIotClub,
    isLogin,
    isForgotPassword,
    isResetPassword,
    isDashboard,
    dashboardSubroute,
    isAdminLogin,
    isAdminDashboard,
    adminSubroute,
    navigate
  };
}
