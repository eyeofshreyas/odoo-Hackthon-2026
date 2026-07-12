/**
 * AppRoutes.jsx
 * Central React Router v6 route configuration for TransitOps.
 *
 * Navigation structure (from Stitch design):
 *   Public:
 *     /login       → LoginPage
 *     /signup      → SignupPage
 *
 *   Protected (requires auth):
 *     /            → redirect → /dashboard
 *     /dashboard   → DashboardPage
 *
 *     /vehicles    → VehiclesPage
 *     /drivers     → DriversPage
 *     /trips       → TripsPage
 *     /maintenance → MaintenancePage
 *     /expenses    → FuelExpensePage
 *     /reports     → ReportsPage
 *     /routes      → RoutesPage        (additional feature)
 *     /shipments   → ShipmentsPage     (additional feature)
 *
 * RBAC enforcement is handled by <RoleGuard> per route.
 * TODO: Implement in Phase 3
 */

// placeholder
const AppRoutes = () => null;

export default AppRoutes;
