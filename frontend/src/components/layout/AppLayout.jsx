import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/**
 * AppLayout
 * Shell layout for all protected pages.
 *
 * Structure:
 *   ┌────────────────────────────────────────┐
 *   │  Sidebar (280px fixed)  │  Topbar      │
 *   │                         │──────────────│
 *   │                         │  <Outlet />  │
 *   │                         │  (page)      │
 *   └─────────────────────────┴──────────────┘
 *
 * - Sidebar is fixed on desktop (lg+), slide-in drawer on mobile.
 * - Main content area is offset by 280px on desktop.
 * - Uses Stitch background: surface (#faf8ff).
 */
const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Fixed Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main content — offset 280px on lg+ */}
      <div className="lg:ml-[280px] flex flex-col min-h-screen">
        {/* Sticky Topbar */}
        <Topbar onMobileMenuOpen={() => setMobileOpen(true)} />

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
