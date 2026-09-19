import React, { useEffect } from 'react';
import Home from './pages/Home';
import AIClubPage from './pages/AIClubPage';
import ProgrammingClubPage from './pages/ProgrammingClubPage';
import CybersecurityClubPage from './pages/CybersecurityClubPage';
import IoTClubPage from './pages/IoTClubPage';

// Student Portal
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import Profile from './pages/dashboard/Profile';
import ApplicationPage from './pages/dashboard/ApplicationPage';
import MyClubPage from './pages/dashboard/MyClubPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import { AuthProvider } from './context/AuthContext';

// Admin Portal
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import Registrations from './pages/admin/Registrations';
import Students from './pages/admin/Students';
import Clubs from './pages/admin/Clubs';
import Notifications from './pages/admin/Notifications';
import AdminSettings from './pages/admin/AdminSettings';
import { AdminAuthProvider } from './context/AdminAuthContext';

import { useRouter, scrollToSection, getRouteTitle } from './utils/router';

function AppContent() {
  const router = useRouter();
  const {
    pathname,
    search,
    hash,
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
  } = router;

  // Centralized Document Title Handling
  useEffect(() => {
    const nextTitle = getRouteTitle(router);
    if (typeof document !== 'undefined' && document.title !== nextTitle) {
      document.title = nextTitle;
    }
  }, [
    pathname,
    search,
    hash,
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
  ]);

  // Scroll to anchor on route change or hash change
  useEffect(() => {
    if (
      isAiClub ||
      isProgrammingClub ||
      isCybersecurityClub ||
      isIotClub ||
      isLogin ||
      isForgotPassword ||
      isResetPassword ||
      isDashboard ||
      isAdminLogin ||
      isAdminDashboard
    ) {
      return;
    }

    if (pathname === '/register' || hash === '#register' || search.includes('register')) {
      scrollToSection('register');
    } else if (
      hash &&
      hash !== '#/ai' &&
      hash !== '#ai' &&
      hash !== '#/programming' &&
      hash !== '#programming' &&
      hash !== '#/cybersecurity' &&
      hash !== '#cybersecurity' &&
      hash !== '#/iot' &&
      hash !== '#iot' &&
      hash !== '#/login' &&
      hash !== '#login' &&
      hash !== '#/forgot-password' &&
      hash !== '#forgot-password' &&
      !hash.startsWith('#/reset-password') &&
      !hash.startsWith('#reset-password') &&
      !hash.startsWith('#/dashboard') &&
      !hash.startsWith('#dashboard') &&
      !hash.startsWith('#/admin') &&
      !hash.startsWith('#admin')
    ) {
      const targetId = hash.replace(/^#\/?/, '');
      scrollToSection(targetId);
    }
  }, [
    pathname,
    search,
    hash,
    isAiClub,
    isProgrammingClub,
    isCybersecurityClub,
    isIotClub,
    isLogin,
    isForgotPassword,
    isResetPassword,
    isDashboard,
    isAdminLogin,
    isAdminDashboard
  ]);

  // Admin Portal - Login
  if (isAdminLogin) {
    return <AdminLogin />;
  }

  // Admin Portal - Dashboard & Subpages
  if (isAdminDashboard) {
    let adminComponent = <AdminDashboard />;
    let title = 'Admin Dashboard';

    switch (adminSubroute) {
      case 'registrations':
        adminComponent = <Registrations />;
        title = 'Registration Requests';
        break;
      case 'students':
        adminComponent = <Students />;
        title = 'Enrolled Students';
        break;
      case 'clubs':
        adminComponent = <Clubs />;
        title = 'Technical Clubs';
        break;
      case 'notifications':
        adminComponent = <Notifications />;
        title = 'Admin Notifications';
        break;
      case 'settings':
        adminComponent = <AdminSettings />;
        title = 'Admin Settings';
        break;
      default:
        adminComponent = <AdminDashboard />;
        title = 'Admin Dashboard';
        break;
    }

    return (
      <AdminLayout title={title} activeRoute={adminSubroute}>
        {adminComponent}
      </AdminLayout>
    );
  }

  // Student Portal - Forgot & Reset Password
  if (isForgotPassword) {
    return <ForgotPassword />;
  }

  if (isResetPassword) {
    return <ResetPassword />;
  }

  // Student Portal - Login
  if (isLogin) {
    return <Login />;
  }

  // Student Portal - Dashboard & Subpages
  if (isDashboard) {
    let activeComponent = <DashboardHome />;
    let title = 'Dashboard';

    switch (dashboardSubroute) {
      case 'profile':
        activeComponent = <Profile />;
        title = 'My Profile';
        break;
      case 'application':
        activeComponent = <ApplicationPage />;
        title = 'Application';
        break;
      case 'club':
        activeComponent = <MyClubPage />;
        title = 'My Club';
        break;
      case 'settings':
        activeComponent = <SettingsPage />;
        title = 'Settings';
        break;
      default:
        activeComponent = <DashboardHome />;
        title = 'Dashboard';
        break;
    }

    return (
      <DashboardLayout title={title} activeRoute={dashboardSubroute}>
        {activeComponent}
      </DashboardLayout>
    );
  }

  // Dedicated Public Club Pages
  if (isAiClub) {
    return <AIClubPage />;
  }

  if (isProgrammingClub) {
    return <ProgrammingClubPage />;
  }

  if (isCybersecurityClub) {
    return <CybersecurityClubPage />;
  }

  if (isIotClub) {
    return <IoTClubPage />;
  }

  // Main Public Landing Page
  return <Home />;
}

export default function App() {
  return (
    <AdminAuthProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </AdminAuthProvider>
  );
}
