import React, { useEffect, lazy, Suspense } from 'react';
import Home from './pages/Home';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { AuthProvider } from './context/AuthContext';
import { useRouter, scrollToSection, getRouteTitle } from './utils/router';

// Lazy-load non-home pages for initial bundle performance and fast TTI
const AIClubPage = lazy(() => import('./pages/AIClubPage'));
const ProgrammingClubPage = lazy(() => import('./pages/ProgrammingClubPage'));
const CybersecurityClubPage = lazy(() => import('./pages/CybersecurityClubPage'));
const IoTClubPage = lazy(() => import('./pages/IoTClubPage'));

// Student Portal (Lazy Loaded)
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const DashboardLayout = lazy(() => import('./components/dashboard/DashboardLayout'));
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'));
const Profile = lazy(() => import('./pages/dashboard/Profile'));
const ApplicationPage = lazy(() => import('./pages/dashboard/ApplicationPage'));
const MyClubPage = lazy(() => import('./pages/dashboard/MyClubPage'));
const ResourcesPage = lazy(() => import('./pages/dashboard/ResourcesPage'));
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage'));

// Admin Portal (Lazy Loaded)
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const Registrations = lazy(() => import('./pages/admin/Registrations'));
const Students = lazy(() => import('./pages/admin/Students'));
const Clubs = lazy(() => import('./pages/admin/Clubs'));
const AdminResources = lazy(() => import('./pages/admin/AdminResources'));
const Notifications = lazy(() => import('./pages/admin/Notifications'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

function RouteLoadingFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#222222',
        color: '#FFFFFF',
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
        <img
          src="/nexora-icon.png"
          alt="NEXORA"
          style={{ width: '38px', height: '38px', opacity: 0.85 }}
        />
        <span style={{ fontSize: '12px', letterSpacing: '0.12em', opacity: 0.65 }}>
          LOADING NEXORA...
        </span>
      </div>
    </div>
  );
}

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
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <AdminLogin />
      </Suspense>
    );
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
      case 'resources':
        adminComponent = <AdminResources />;
        title = 'Resources';
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
      <Suspense fallback={<RouteLoadingFallback />}>
        <AdminLayout title={title} activeRoute={adminSubroute}>
          {adminComponent}
        </AdminLayout>
      </Suspense>
    );
  }

  // Student Portal & Public Pages wrapped in AuthProvider
  return (
    <AuthProvider>
      <Suspense fallback={<RouteLoadingFallback />}>
        <StudentAndPublicContent router={router} />
      </Suspense>
    </AuthProvider>
  );
}

function StudentAndPublicContent({ router }) {
  const {
    isAiClub,
    isProgrammingClub,
    isCybersecurityClub,
    isIotClub,
    isLogin,
    isForgotPassword,
    isResetPassword,
    isDashboard,
    dashboardSubroute
  } = router;

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
      case 'resources':
        activeComponent = <ResourcesPage />;
        title = 'Learning Resources';
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

  // Main Public Landing Page (Synchronously loaded for instant initial render)
  return <Home />;
}

export default function App() {
  return (
    <AdminAuthProvider>
      <AppContent />
    </AdminAuthProvider>
  );
}
