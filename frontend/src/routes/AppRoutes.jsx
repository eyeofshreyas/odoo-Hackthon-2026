import { Routes, Route, Navigate } from 'react-router-dom';

import { PATHS } from './paths';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import AppLayout from '../components/layout/AppLayout';

// Auth Pages
import LoginPage from '../pages/Auth/Login';
import SignupPage from '../pages/Auth/Signup';

// App Pages
import DashboardPage from '../pages/Dashboard/Dashboard';
import VehiclesPage from '../pages/Vehicles/Vehicles';
import DriversPage from '../pages/Drivers/Drivers';
import TripsPage from '../pages/Trips/Trips';
import MaintenancePage from '../pages/Maintenance/Maintenance';
import FuelExpensePage from '../pages/FuelExpense/FuelExpense';
import ReportsPage from '../pages/Reports/Reports';
import RoutesPage from '../pages/Routes/Routes';
import ShipmentsPage from '../pages/Shipments/Shipments';
import ComponentShowcase from '../pages/Showcase/ComponentShowcase';

/**
 * AppRoutes — Central React Router v6 configuration.
 *
 * Structure:
 *   /                       → redirect → /dashboard
 *   /login                  → LoginPage    (public only)
 *   /signup                 → SignupPage   (public only)
 *   /dashboard              → DashboardPage   ─╮
 *   /vehicles               → VehiclesPage     │
 *   /drivers                → DriversPage      │  Protected
 *   /trips                  → TripsPage        │  (require auth)
 *   /maintenance            → MaintenancePage  │
 *   /fuel-expense           → FuelExpensePage  │
 *   /reports                → ReportsPage      │
 *   /routes                 → RoutesPage      ─┤
 *   /shipments              → ShipmentsPage   ─╯
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to={PATHS.DASHBOARD} replace />} />

      {/* ── Public Routes (login / signup) ── */}
      <Route element={<PublicRoute />}>
        <Route path={PATHS.LOGIN}  element={<LoginPage />} />
        <Route path={PATHS.SIGNUP} element={<SignupPage />} />
      </Route>

      {/* ── Protected Routes (inside AppLayout) ── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path={PATHS.DASHBOARD}    element={<DashboardPage />} />
          <Route path={PATHS.VEHICLES}     element={<VehiclesPage />} />
          <Route path={PATHS.DRIVERS}      element={<DriversPage />} />
          <Route path={PATHS.TRIPS}        element={<TripsPage />} />
          <Route path={PATHS.MAINTENANCE}  element={<MaintenancePage />} />
          <Route path={PATHS.FUEL_EXPENSE} element={<FuelExpensePage />} />
          <Route path={PATHS.REPORTS}      element={<ReportsPage />} />
          <Route path={PATHS.ROUTES}       element={<RoutesPage />} />
          <Route path={PATHS.SHIPMENTS}    element={<ShipmentsPage />} />
          <Route path={PATHS.SHOWCASE}     element={<ComponentShowcase />} />
        </Route>
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to={PATHS.DASHBOARD} replace />} />
    </Routes>
  );
};

export default AppRoutes;
