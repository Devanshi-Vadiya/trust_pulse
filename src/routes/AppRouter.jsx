import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import AuthLayout from '../components/layout/AuthLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

// Lazy loading pages
const SplashPage = lazy(() => import('../features/auth/SplashPage'));
const LoginPage = lazy(() => import('../features/auth/LoginPage'));
const SignupPage = lazy(() => import('../features/auth/SignupPage'));
const DashboardPage = lazy(() => import('../features/dashboard/DashboardPage'));
// const SugarTrackerPage = lazy(() => import('../features/sugar/SugarTrackerPage'));
// const AlcoholVerificationPage = lazy(() => import('../features/alcohol/AlcoholVerificationPage'));
// const WaterVerificationPage = lazy(() => import('../features/water/WaterVerificationPage'));
// const ScanProductPage = lazy(() => import('../features/scan/ScanProductPage'));
// const ProductResultPage = lazy(() => import('../features/product/ProductResultPage'));
// const ReportFormPage = lazy(() => import('../features/reports/ReportFormPage'));
// const SettingsPage = lazy(() => import('../features/settings/SettingsPage'));

// A simple loading fallback for suspense
const Loader = () => (
  <div className="flex h-screen w-full items-center justify-center p-4">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<SplashPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* <Route path="/sugar-tracker" element={<SugarTrackerPage />} /> */}
            {/* <Route path="/alcohol-verification" element={<AlcoholVerificationPage />} /> */}
            {/* <Route path="/water-verification" element={<WaterVerificationPage />} /> */}
            {/* <Route path="/scan" element={<ScanProductPage />} /> */}
            {/* <Route path="/product/:id" element={<ProductResultPage />} /> */}
            {/* <Route path="/report" element={<ReportFormPage />} /> */}
            {/* <Route path="/settings" element={<SettingsPage />} /> */}
          </Route>
        </Route>

        {/* Catch All - 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
