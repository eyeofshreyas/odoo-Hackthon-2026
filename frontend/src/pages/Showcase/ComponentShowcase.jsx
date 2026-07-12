import { useState } from 'react';
import {
  Button, Input, Select, TextArea, Card, KPICard, StatusBadge,
  Table, Modal, ConfirmDialog, SearchBar, FilterDropdown,
  Pagination, EmptyState, LoadingSpinner, ToastContainer, Tabs, Tooltip,
} from '../../components/ui';
import useToast from '../../hooks/useToast';

/* ─── Sample data ─── */
const TABLE_COLS = [
  { key: 'id',     label: '#',      width: '60px' },
  { key: 'name',   label: 'Driver', sortable: true },
  { key: 'route',  label: 'Route' },
  { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v === 'Active' ? 'success' : v === 'Delayed' ? 'warning' : 'danger'} label={v} /> },
  { key: 'km',     label: 'KM',     align: 'right' },
];
const TABLE_DATA = [
  { id: 1, name: 'Arjun Mehta',   route: 'MUM → DEL', status: 'Active',  km: '1 420' },
  { id: 2, name: 'Priya Sharma',  route: 'BLR → HYD', status: 'Delayed', km: '575'   },
  { id: 3, name: 'Rahul Verma',   route: 'DEL → CHE', status: 'Active',  km: '2 183' },
  { id: 4, name: 'Sneha Patil',   route: 'PUN → MUM', status: 'Stopped', km: '148'   },
  { id: 5, name: 'Vikram Singh',  route: 'HYD → BLR', status: 'Active',  km: '570'   },
];

const FILTER_OPTS = [
  { value: 'active',  label: 'Active'  },
  { value: 'delayed', label: 'Delayed' },
  { value: 'stopped', label: 'Stopped' },
];

const TABS = [
  { key: 'buttons',  label: 'Buttons & Inputs' },
  { key: 'cards',    label: 'Cards & KPIs'     },
  { key: 'table',    label: 'Table'             },
  { key: 'overlays', label: 'Modals & Toasts'  },
  { key: 'misc',     label: 'Misc'              },
];

/* ─── Section wrapper ─── */
const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xs font-semibold text-[#737686] uppercase tracking-widest mb-4 pb-2 border-b border-[#f1f5f9]">
      {title}
    </h2>
    <div className="flex flex-wrap gap-4 items-start">{children}</div>
  </div>
);

/* ════════════════════════════════════════
   SHOWCASE PAGE
════════════════════════════════════════ */
const ComponentShowcase = () => {
  const { toasts, toast, dismiss } = useToast();

  /* State */
  const [activeTab, setActiveTab]     = useState('buttons');
  const [modalOpen, setModalOpen]     = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [search, setSearch]           = useState('');
  const [filter, setFilter]           = useState([]);
  const [page, setPage]               = useState(3);
  const [sortKey, setSortKey]         = useState('name');
  const [sortDir, setSortDir]         = useState('asc');
  const [inputVal, setInputVal]       = useState('');
  const [selectVal, setSelectVal]     = useState('');
  const [textVal, setTextVal]         = useState('');
  const [tableLoading, setTableLoading] = useState(false);

  const handleSort = (key) => {
    if (key === sortKey) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const handleConfirm = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      setConfirmOpen(false);
      toast.success('Deleted!', 'The record has been removed.');
    }, 1800);
  };

  const triggerTableLoad = () => {
    setTableLoading(true);
    setTimeout(() => setTableLoading(false), 1500);
  };

  /* ── render ── */
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#131b2e]">UI Component Showcase</h1>
        <p className="text-sm text-[#737686] mt-1">
          Phase 4 — TransitOps design system · All 16 components verified
        </p>
      </div>

      {/* Tab nav */}
      <Tabs tabs={TABS} activeKey={activeTab} onChange={setActiveTab} className="mb-8" />

      {/* ══════════ BUTTONS & INPUTS ══════════ */}
      {activeTab === 'buttons' && (
        <>
          <Section title="Button — variants">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
          </Section>

          <Section title="Button — sizes">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Section>

          <Section title="Button — states">
            <Button loading>Loading…</Button>
            <Button disabled>Disabled</Button>
            <Button
              leftIcon={
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 2v12M2 8h12" strokeLinecap="round"/>
                </svg>
              }
            >
              With Icon
            </Button>
            <Button variant="primary" fullWidth className="max-w-xs">Full Width</Button>
          </Section>

          <Section title="Input">
            <div className="w-64">
              <Input
                label="Driver Name"
                placeholder="Enter name…"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                hint="First and last name"
              />
            </div>
            <div className="w-64">
              <Input label="Email" placeholder="email@domain.com" error="Invalid email address" />
            </div>
            <div className="w-64">
              <Input label="Search" placeholder="Search…" leftAddon={
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3" strokeLinecap="round"/>
                </svg>
              } />
            </div>
            <div className="w-64">
              <Input label="Disabled" placeholder="Can't edit this" disabled />
            </div>
          </Section>

          <Section title="Select">
            <div className="w-64">
              <Select
                label="Vehicle Type"
                value={selectVal}
                onChange={(e) => setSelectVal(e.target.value)}
                options={[
                  { value: 'truck', label: 'Truck' },
                  { value: 'van', label: 'Van' },
                  { value: 'bike', label: 'Bike' },
                ]}
                hint="Choose vehicle category"
              />
            </div>
            <div className="w-64">
              <Select label="Status" error="Please select a status" options={[]} />
            </div>
          </Section>

          <Section title="TextArea">
            <div className="w-64">
              <TextArea
                label="Notes"
                placeholder="Add notes here…"
                rows={3}
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
                hint="Max 500 characters"
              />
            </div>
            <div className="w-64">
              <TextArea label="Disabled" placeholder="Read only" disabled rows={3} />
            </div>
          </Section>
        </>
      )}

      {/* ══════════ CARDS & KPIs ══════════ */}
      {activeTab === 'cards' && (
        <>
          <Section title="KPI Cards">
            <KPICard
              title="Total Vehicles"
              value="128"
              trend="up"
              trendLabel="+8 this month"
              color="primary"
              icon={
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                  <path d="M3 4a1 1 0 00-1 1v8a1 1 0 001 1h.5a2.5 2.5 0 015 0h1a2.5 2.5 0 015 0H17a1 1 0 001-1V5a1 1 0 00-1-1H3z"/>
                </svg>
              }
            />
            <KPICard title="Active Trips" value="34" trend="down" trendLabel="-3 from yesterday" color="warning"
              icon={<svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5z" clipRule="evenodd"/></svg>}
            />
            <KPICard title="On-Time Rate" value="94" unit="%" trend="up" trendLabel="+2% vs last week" color="success"
              icon={<svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/></svg>}
            />
            <KPICard title="Fuel Alerts" value="7" trend="neutral" color="danger"
              icon={<svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>}
            />
            <KPICard title="Loading Skeleton" value="" loading />
          </Section>

          <Section title="Cards">
            <Card title="Simple Card" description="Card with header and body" className="w-72">
              <p className="text-sm text-[#737686]">This is the card body content area.</p>
            </Card>
            <Card
              title="Card with Action"
              headerAction={<Button size="sm" variant="ghost">Edit</Button>}
              footer={
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary">Cancel</Button>
                  <Button size="sm">Save</Button>
                </div>
              }
              className="w-72"
            >
              <p className="text-sm text-[#737686]">Card with header action and footer.</p>
            </Card>
            <Card title="Hoverable Card" hoverable className="w-72">
              <p className="text-sm text-[#737686]">Hover to see the shadow effect.</p>
            </Card>
          </Section>

          <Section title="Status Badges">
            <StatusBadge status="success" label="On Time" />
            <StatusBadge status="warning" label="Delayed" />
            <StatusBadge status="danger"  label="Critical" />
            <StatusBadge status="info"    label="In Transit" />
            <StatusBadge status="neutral" label="Inactive" />
            <StatusBadge status="success" label="No Dot" dot={false} />
            <StatusBadge status="warning" label="Small" size="sm" />
          </Section>
        </>
      )}

      {/* ══════════ TABLE ══════════ */}
      {activeTab === 'table' && (
        <>
          <Section title="Controls">
            <SearchBar value={search} onChange={setSearch} placeholder="Search drivers…" className="w-64" />
            <FilterDropdown
              label="Status"
              options={FILTER_OPTS}
              value={filter}
              onChange={setFilter}
              multi
            />
            <Button size="sm" variant="secondary" onClick={triggerTableLoad}>
              Simulate Load
            </Button>
          </Section>

          <div className="mb-6">
            <Table
              columns={TABLE_COLS}
              data={tableLoading ? [] : TABLE_DATA}
              rowKey="id"
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
              loading={tableLoading}
              empty={
                <EmptyState
                  title="No drivers found"
                  description="Try adjusting your search or filter."
                  size="sm"
                />
              }
            />
          </div>

          <Section title="Pagination">
            <Pagination page={page} totalPages={12} onPageChange={setPage} />
            <span className="text-sm text-[#737686] self-center">Current: page {page}</span>
          </Section>

          <Section title="Empty State variants">
            <div className="w-full rounded-lg border border-[#e2e8f0]">
              <EmptyState
                title="No shipments yet"
                description="Create your first shipment to get started."
                action={<Button size="sm">Add Shipment</Button>}
              />
            </div>
          </Section>
        </>
      )}

      {/* ══════════ OVERLAYS ══════════ */}
      {activeTab === 'overlays' && (
        <>
          <Section title="Modal">
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          </Section>

          <Section title="Confirm Dialog">
            <Button variant="danger" onClick={() => setConfirmOpen(true)}>Delete Record</Button>
          </Section>

          <Section title="Toast Notifications">
            <Button variant="success" size="sm" onClick={() => toast.success('Saved!', 'Your changes have been saved.')}>
              Success Toast
            </Button>
            <Button variant="danger" size="sm" onClick={() => toast.error('Error!', 'Something went wrong. Please retry.')}>
              Error Toast
            </Button>
            <Button variant="secondary" size="sm" onClick={() => toast.warning('Warning', 'This action may have side effects.')}>
              Warning Toast
            </Button>
            <Button variant="ghost" size="sm" onClick={() => toast.info('Info', 'New data is available. Refresh to see.')}>
              Info Toast
            </Button>
          </Section>

          {/* Modal */}
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Edit Driver Details"
            size="md"
            footer={
              <>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button onClick={() => { setModalOpen(false); toast.success('Saved!', 'Driver details updated.'); }}>
                  Save Changes
                </Button>
              </>
            }
          >
            <div className="flex flex-col gap-4">
              <Input label="Full Name" defaultValue="Arjun Mehta" />
              <Input label="License Number" defaultValue="DL-1420-2022" />
              <Select label="Status" defaultValue="active" options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]} />
              <TextArea label="Notes" placeholder="Additional notes…" rows={3} />
            </div>
          </Modal>

          {/* Confirm */}
          <ConfirmDialog
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={handleConfirm}
            title="Delete this record?"
            message="This will permanently remove the driver record. This action cannot be undone."
            intent="danger"
            confirmLabel="Yes, Delete"
            loading={confirmLoading}
          />
        </>
      )}

      {/* ══════════ MISC ══════════ */}
      {activeTab === 'misc' && (
        <>
          <Section title="Loading Spinner — sizes">
            <LoadingSpinner size="xs" />
            <LoadingSpinner size="sm" />
            <LoadingSpinner size="md" />
            <LoadingSpinner size="lg" />
            <LoadingSpinner size="xl" />
          </Section>

          <Section title="Loading Spinner — colors">
            <LoadingSpinner color="primary" />
            <LoadingSpinner color="gray" />
            <div className="bg-[#1e293b] p-3 rounded-lg">
              <LoadingSpinner color="white" />
            </div>
          </Section>

          <Section title="Tabs — pill variant">
            <Tabs
              tabs={[
                { key: 'all',    label: 'All'     },
                { key: 'active', label: 'Active'  },
                { key: 'done',   label: 'Done'    },
                { key: 'off',    label: 'Disabled', disabled: true },
              ]}
              variant="pill"
            />
          </Section>

          <Section title="Tooltip">
            <Tooltip content="Primary button action" placement="top">
              <Button size="sm">Hover me (top)</Button>
            </Tooltip>
            <Tooltip content="This is the bottom tooltip" placement="bottom">
              <Button size="sm" variant="secondary">Bottom</Button>
            </Tooltip>
            <Tooltip content="Left side tooltip" placement="left">
              <Button size="sm" variant="ghost">Left</Button>
            </Tooltip>
            <Tooltip content="Right side tooltip" placement="right">
              <Button size="sm" variant="ghost">Right</Button>
            </Tooltip>
          </Section>

          <Section title="SearchBar states">
            <SearchBar placeholder="Default search" className="w-64" />
            <SearchBar value="transit ops" onChange={() => {}} placeholder="With value" className="w-64" />
            <SearchBar loading placeholder="Loading…" className="w-64" />
          </Section>
        </>
      )}

      {/* Toast container */}
      <ToastContainer toasts={toasts} onClose={dismiss} position="top-right" />
    </div>
  );
};

export default ComponentShowcase;
