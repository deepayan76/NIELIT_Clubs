import { useState, useEffect } from 'react';

/**
 * Universal client router for NEXORA Tech Clubs.
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

export function getRouteTitle(routerState) {
  if (!routerState) return 'NEXORA Tech Clubs';

  const {
    pathname = '/',
    search = '',
    hash = '',
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
    adminSubroute
  } = routerState;

  // 1. Dynamic / Dedicated Public Club Pages
  if (isAiClub) return 'NEXORA AI Club';
  if (isProgrammingClub) return 'NEXORA Programming Club';
  if (isCybersecurityClub) return 'NEXORA Cybersecurity Club';
  if (isIotClub) return 'NEXORA IoT Club';

  // 2. Student Portal
  if (isLogin) return 'Student Login | NEXORA Tech Clubs';
  if (isForgotPassword) return 'Forgot Password | NEXORA Tech Clubs';
  if (isResetPassword) return 'Reset Password | NEXORA Tech Clubs';
  if (isDashboard) {
    if (dashboardSubroute === 'resources') {
      return 'Resources | NEXORA Tech Clubs';
    }
    return 'Dashboard | NEXORA Tech Clubs';
  }

  // 3. Admin Portal
  if (isAdminLogin) return 'Admin Login | NEXORA Tech Clubs';
  if (isAdminDashboard) {
    if (adminSubroute === 'resources') {
      return 'Admin Resources | NEXORA Tech Clubs';
    }
    if (adminSubroute === 'registrations') {
      return 'Registrations | NEXORA Tech Clubs';
    }
    return 'Admin Dashboard | NEXORA Tech Clubs';
  }

  // 4. Public Landing Page Major Routes & Anchor Sections
  const cleanPath = (pathname || '/').toLowerCase().replace(/\/+$/, '') || '/';
  const cleanHash = (hash || '').toLowerCase().replace(/\/+$/, '');

  if (
    cleanPath === '/about' ||
    cleanHash === '#about' ||
    cleanHash === '#/about'
  ) {
    return 'About | NEXORA Tech Clubs';
  }

  if (
    cleanPath === '/clubs' ||
    cleanHash === '#clubs' ||
    cleanHash === '#/clubs'
  ) {
    return 'Clubs | NEXORA Tech Clubs';
  }

  if (
    cleanPath === '/register' ||
    cleanPath === '/join' ||
    cleanPath === '/join-us' ||
    cleanHash === '#register' ||
    cleanHash === '#/register' ||
    cleanHash === '#join' ||
    cleanHash === '#join-us' ||
    (search && search.includes('register'))
  ) {
    return 'Join Us | NEXORA Tech Clubs';
  }

  if (
    cleanPath === '/' ||
    cleanPath === '/home' ||
    cleanHash === '#home' ||
    cleanHash === '#/home' ||
    cleanHash === '#' ||
    cleanHash === ''
  ) {
    return 'NEXORA Tech Clubs';
  }

  // 5. Fallback / Unknown Route
  return 'NEXORA Tech Clubs';
}

export function navigate(url, options = {}) {
  if (typeof window === 'undefined' || !url) return;

  const currentPath = (window.location.pathname || '/').toLowerCase();
  const currentHash = (window.location.hash || '').toLowerCase();

  const isCurrentlyAi =
    currentPath === '/ai' ||
    currentPath === '/ai/' ||
    currentPath === '/ai-club' ||
    currentPath === '/ai-club/' ||
    currentPath === '/clubs/ai' ||
    currentPath === '/clubs/ai/' ||
    currentPath === '/club/ai' ||
    currentPath === '/club/ai/' ||
    currentHash === '#/ai' ||
    currentHash === '#ai' ||
    currentHash === '#/clubs/ai' ||
    currentHash === '#clubs/ai' ||
    currentHash === '#/club/ai' ||
    currentHash === '#club/ai';

  const isCurrentlyProg =
    currentPath === '/programming' ||
    currentPath === '/programming/' ||
    currentPath === '/programming-club' ||
    currentPath === '/programming-club/' ||
    currentPath === '/clubs/programming' ||
    currentPath === '/clubs/programming/' ||
    currentPath === '/club/programming' ||
    currentPath === '/club/programming/' ||
    currentHash === '#/programming' ||
    currentHash === '#programming' ||
    currentHash === '#/clubs/programming' ||
    currentHash === '#clubs/programming' ||
    currentHash === '#/club/programming' ||
    currentHash === '#club/programming';

  const isCurrentlyCyber =
    currentPath === '/cybersecurity' ||
    currentPath === '/cybersecurity/' ||
    currentPath === '/cybersecurity-club' ||
    currentPath === '/cybersecurity-club/' ||
    currentPath === '/clubs/cybersecurity' ||
    currentPath === '/clubs/cybersecurity/' ||
    currentPath === '/club/cybersecurity' ||
    currentPath === '/club/cybersecurity/' ||
    currentHash === '#/cybersecurity' ||
    currentHash === '#cybersecurity' ||
    currentHash === '#/clubs/cybersecurity' ||
    currentHash === '#clubs/cybersecurity' ||
    currentHash === '#/club/cybersecurity' ||
    currentHash === '#club/cybersecurity';

  const isCurrentlyIot =
    currentPath === '/iot' ||
    currentPath === '/iot/' ||
    currentPath === '/iot-club' ||
    currentPath === '/iot-club/' ||
    currentPath === '/clubs/iot' ||
    currentPath === '/clubs/iot/' ||
    currentPath === '/club/iot' ||
    currentPath === '/club/iot/' ||
    currentHash === '#/iot' ||
    currentHash === '#iot' ||
    currentHash === '#/clubs/iot' ||
    currentHash === '#clubs/iot' ||
    currentHash === '#/club/iot' ||
    currentHash === '#club/iot';

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
    targetLower === '/ai-club/' ||
    targetLower === '/clubs/ai' ||
    targetLower === '/clubs/ai/' ||
    targetLower === '/club/ai' ||
    targetLower === '/club/ai/' ||
    targetLower === '#/ai' ||
    targetLower === '#ai' ||
    targetLower === '#/clubs/ai' ||
    targetLower === '#clubs/ai' ||
    targetLower === '#/club/ai' ||
    targetLower === '#club/ai' ||
    targetLower === '#club-ai' ||
    targetLower === '/#club-ai';

  const isTargetProg =
    targetLower === '/programming' ||
    targetLower === '/programming/' ||
    targetLower === '/programming-club' ||
    targetLower === '/programming-club/' ||
    targetLower === '/clubs/programming' ||
    targetLower === '/clubs/programming/' ||
    targetLower === '/club/programming' ||
    targetLower === '/club/programming/' ||
    targetLower === '#/programming' ||
    targetLower === '#programming' ||
    targetLower === '#/clubs/programming' ||
    targetLower === '#clubs/programming' ||
    targetLower === '#/club/programming' ||
    targetLower === '#club/programming' ||
    targetLower === '#club-programming' ||
    targetLower === '/#club-programming';

  const isTargetCyber =
    targetLower === '/cybersecurity' ||
    targetLower === '/cybersecurity/' ||
    targetLower === '/cybersecurity-club' ||
    targetLower === '/cybersecurity-club/' ||
    targetLower === '/clubs/cybersecurity' ||
    targetLower === '/clubs/cybersecurity/' ||
    targetLower === '/club/cybersecurity' ||
    targetLower === '/club/cybersecurity/' ||
    targetLower === '#/cybersecurity' ||
    targetLower === '#cybersecurity' ||
    targetLower === '#/clubs/cybersecurity' ||
    targetLower === '#clubs/cybersecurity' ||
    targetLower === '#/club/cybersecurity' ||
    targetLower === '#club/cybersecurity' ||
    targetLower === '#club-cybersecurity' ||
    targetLower === '/#club-cybersecurity';

  const isTargetIot =
    targetLower === '/iot' ||
    targetLower === '/iot/' ||
    targetLower === '/iot-club' ||
    targetLower === '/iot-club/' ||
    targetLower === '/clubs/iot' ||
    targetLower === '/clubs/iot/' ||
    targetLower === '/club/iot' ||
    targetLower === '/club/iot/' ||
    targetLower === '#/iot' ||
    targetLower === '#iot' ||
    targetLower === '#/clubs/iot' ||
    targetLower === '#clubs/iot' ||
    targetLower === '#/club/iot' ||
    targetLower === '#club/iot' ||
    targetLower === '#club-iot' ||
    targetLower === '/#club-iot';

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
    window.history.pushState({}, '', url);
    window.dispatchEvent(new Event('popstate'));
    window.dispatchEvent(new Event('hashchange'));
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
    window.dispatchEvent(new Event('hashchange'));

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
    window.dispatchEvent(new Event('hashchange'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // 4. In-page navigation on parent landing page (e.g. /#clubs, /?club=ai#register)
  if (url.includes('?') || url.startsWith('/#') || url.startsWith('/')) {
    window.history.pushState({}, '', url);
    window.dispatchEvent(new Event('popstate'));
    window.dispatchEvent(new Event('hashchange'));
  }
  const hashIndex = url.indexOf('#');
  if (hashIndex !== -1) {
    const targetId = url.substring(hashIndex + 1);
    scrollToSection(targetId);
  } else if (url === '/' || url === '#home' || url === '/#home' || url === '/home') {
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
    path === '/ai-club/' ||
    path === '/clubs/ai' ||
    path === '/clubs/ai/' ||
    path === '/club/ai' ||
    path === '/club/ai/' ||
    hash === '#/ai' ||
    hash === '#ai' ||
    hash === '#/clubs/ai' ||
    hash === '#clubs/ai' ||
    hash === '#/club/ai' ||
    hash === '#club/ai' ||
    hash === '#club-ai' ||
    hash === '#/club-ai';

  // Determine if current route is Programming Club
  const isProgrammingClub =
    path === '/programming' ||
    path === '/programming/' ||
    path === '/programming-club' ||
    path === '/programming-club/' ||
    path === '/clubs/programming' ||
    path === '/clubs/programming/' ||
    path === '/club/programming' ||
    path === '/club/programming/' ||
    hash === '#/programming' ||
    hash === '#programming' ||
    hash === '#/clubs/programming' ||
    hash === '#clubs/programming' ||
    hash === '#/club/programming' ||
    hash === '#club/programming' ||
    hash === '#club-programming' ||
    hash === '#/club-programming';

  // Determine if current route is Cybersecurity Club
  const isCybersecurityClub =
    path === '/cybersecurity' ||
    path === '/cybersecurity/' ||
    path === '/cybersecurity-club' ||
    path === '/cybersecurity-club/' ||
    path === '/clubs/cybersecurity' ||
    path === '/clubs/cybersecurity/' ||
    path === '/club/cybersecurity' ||
    path === '/club/cybersecurity/' ||
    hash === '#/cybersecurity' ||
    hash === '#cybersecurity' ||
    hash === '#/clubs/cybersecurity' ||
    hash === '#clubs/cybersecurity' ||
    hash === '#/club/cybersecurity' ||
    hash === '#club/cybersecurity' ||
    hash === '#club-cybersecurity' ||
    hash === '#/club-cybersecurity';

  // Determine if current route is IoT Club
  const isIotClub =
    path === '/iot' ||
    path === '/iot/' ||
    path === '/iot-club' ||
    path === '/iot-club/' ||
    path === '/clubs/iot' ||
    path === '/clubs/iot/' ||
    path === '/club/iot' ||
    path === '/club/iot/' ||
    hash === '#/iot' ||
    hash === '#iot' ||
    hash === '#/clubs/iot' ||
    hash === '#clubs/iot' ||
    hash === '#/club/iot' ||
    hash === '#club/iot' ||
    hash === '#club-iot' ||
    hash === '#/club-iot';

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
    else if (clean === 'resources') dashboardSubroute = 'resources';
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
    else if (clean === 'resources') adminSubroute = 'resources';
    else if (clean === 'notifications') adminSubroute = 'notifications';
    else if (clean === 'settings') adminSubroute = 'settings';
    else adminSubroute = 'dashboard';
  }

  const routerState = {
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

  return routerState;
}
