/**
 * mockData.js — Shared sample data for all pages (no backend needed)
 */

/* ── VEHICLES ── */
export const VEHICLES = [
  { id: 'V001', plate: 'MH-12-AB-1234', type: 'Heavy Truck', make: 'Tata Prima', year: 2021, driver: 'Arjun Mehta',    status: 'active',      fuel: 78,  km: 142300 },
  { id: 'V002', plate: 'DL-01-CD-5678', type: 'Medium Truck', make: 'Ashok Leyland', year: 2020, driver: 'Priya Sharma',   status: 'maintenance', fuel: 45,  km: 98700  },
  { id: 'V003', plate: 'KA-03-EF-9012', type: 'Light Van',    make: 'Mahindra Bolero', year: 2022, driver: 'Rahul Verma',    status: 'active',      fuel: 92,  km: 54200  },
  { id: 'V004', plate: 'TN-07-GH-3456', type: 'Heavy Truck', make: 'BharatBenz',   year: 2019, driver: 'Sneha Patil',    status: 'idle',        fuel: 60,  km: 201500 },
  { id: 'V005', plate: 'GJ-15-IJ-7890', type: 'Container',   make: 'Volvo FH',     year: 2023, driver: 'Vikram Singh',   status: 'active',      fuel: 55,  km: 32100  },
  { id: 'V006', plate: 'RJ-14-KL-2345', type: 'Tanker',      make: 'ISUZU NQR',    year: 2020, driver: 'Deepak Kumar',   status: 'active',      fuel: 83,  km: 176400 },
  { id: 'V007', plate: 'UP-32-MN-6789', type: 'Mini Truck',  make: 'Tata Ace',     year: 2022, driver: 'Meena Joshi',    status: 'idle',        fuel: 71,  km: 43900  },
  { id: 'V008', plate: 'WB-06-OP-0123', type: 'Heavy Truck', make: 'Eicher Pro',   year: 2018, driver: 'Suresh Nair',    status: 'maintenance', fuel: 30,  km: 287600 },
];

/* ── DRIVERS ── */
export const DRIVERS = [
  { id: 'D001', name: 'Arjun Mehta',    phone: '+91 98765 43210', license: 'DL-MH-20180001', experience: 8,  status: 'active',      vehicle: 'V001', trips: 312, rating: 4.8 },
  { id: 'D002', name: 'Priya Sharma',   phone: '+91 98765 43211', license: 'DL-DL-20190012', experience: 5,  status: 'on-leave',    vehicle: 'V002', trips: 198, rating: 4.6 },
  { id: 'D003', name: 'Rahul Verma',    phone: '+91 98765 43212', license: 'DL-KA-20200023', experience: 3,  status: 'active',      vehicle: 'V003', trips: 145, rating: 4.7 },
  { id: 'D004', name: 'Sneha Patil',    phone: '+91 98765 43213', license: 'DL-TN-20170034', experience: 9,  status: 'active',      vehicle: 'V004', trips: 421, rating: 4.9 },
  { id: 'D005', name: 'Vikram Singh',   phone: '+91 98765 43214', license: 'DL-GJ-20220045', experience: 2,  status: 'active',      vehicle: 'V005', trips: 87,  rating: 4.5 },
  { id: 'D006', name: 'Deepak Kumar',   phone: '+91 98765 43215', license: 'DL-RJ-20160056', experience: 12, status: 'active',      vehicle: 'V006', trips: 538, rating: 4.9 },
  { id: 'D007', name: 'Meena Joshi',    phone: '+91 98765 43216', license: 'DL-UP-20210067', experience: 4,  status: 'inactive',    vehicle: 'V007', trips: 203, rating: 4.4 },
  { id: 'D008', name: 'Suresh Nair',    phone: '+91 98765 43217', license: 'DL-WB-20150078', experience: 15, status: 'on-leave',    vehicle: 'V008', trips: 672, rating: 4.7 },
];

/* ── TRIPS ── */
export const TRIPS = [
  { id: 'T001', from: 'Mumbai',    to: 'Delhi',     driver: 'Arjun Mehta',  vehicle: 'V001', distance: 1420, status: 'in-transit', started: '2026-07-12 06:00', eta: '2026-07-13 14:00', cargo: 'Electronics' },
  { id: 'T002', from: 'Bangalore', to: 'Hyderabad', driver: 'Priya Sharma', vehicle: 'V002', distance: 575,  status: 'delayed',    started: '2026-07-12 08:30', eta: '2026-07-12 20:30', cargo: 'Pharma'      },
  { id: 'T003', from: 'Delhi',     to: 'Chennai',   driver: 'Rahul Verma',  vehicle: 'V003', distance: 2183, status: 'in-transit', started: '2026-07-11 22:00', eta: '2026-07-13 18:00', cargo: 'FMCG'        },
  { id: 'T004', from: 'Pune',      to: 'Mumbai',    driver: 'Sneha Patil',  vehicle: 'V004', distance: 148,  status: 'completed',  started: '2026-07-12 07:00', eta: '2026-07-12 11:00', cargo: 'Auto Parts'  },
  { id: 'T005', from: 'Hyderabad', to: 'Bangalore', driver: 'Vikram Singh', vehicle: 'V005', distance: 570,  status: 'in-transit', started: '2026-07-12 05:00', eta: '2026-07-12 16:00', cargo: 'Textiles'    },
  { id: 'T006', from: 'Ahmedabad', to: 'Surat',     driver: 'Deepak Kumar', vehicle: 'V006', distance: 265,  status: 'completed',  started: '2026-07-11 14:00', eta: '2026-07-11 19:00', cargo: 'Chemicals'   },
  { id: 'T007', from: 'Jaipur',    to: 'Delhi',     driver: 'Meena Joshi',  vehicle: 'V007', distance: 278,  status: 'scheduled',  started: '2026-07-13 08:00', eta: '2026-07-13 14:00', cargo: 'Food Grains' },
  { id: 'T008', from: 'Kolkata',   to: 'Patna',     driver: 'Suresh Nair',  vehicle: 'V008', distance: 572,  status: 'cancelled',  started: '—',                 eta: '—',                 cargo: 'Steel'       },
];

/* ── MAINTENANCE ── */
export const MAINTENANCE = [
  { id: 'M001', vehicle: 'V002', plate: 'DL-01-CD-5678', type: 'Engine Overhaul',    status: 'in-progress', priority: 'high',   scheduled: '2026-07-10', cost: 45000, mechanic: 'Ram Singh',   notes: 'Major engine wear detected' },
  { id: 'M002', vehicle: 'V008', plate: 'WB-06-OP-0123', type: 'Brake Replacement',  status: 'pending',     priority: 'high',   scheduled: '2026-07-14', cost: 12000, mechanic: 'Raj Kumar',   notes: 'Brake pads worn beyond limit' },
  { id: 'M003', vehicle: 'V001', plate: 'MH-12-AB-1234', type: 'Oil Change',          status: 'completed',   priority: 'low',    scheduled: '2026-07-08', cost: 2500,  mechanic: 'Arif Khan',   notes: 'Routine 10k km service' },
  { id: 'M004', vehicle: 'V005', plate: 'GJ-15-IJ-7890', type: 'Tyre Rotation',      status: 'scheduled',   priority: 'medium', scheduled: '2026-07-15', cost: 3500,  mechanic: 'Ram Singh',   notes: 'Preventive maintenance' },
  { id: 'M005', vehicle: 'V004', plate: 'TN-07-GH-3456', type: 'AC Repair',           status: 'completed',   priority: 'medium', scheduled: '2026-07-06', cost: 8000,  mechanic: 'Raj Kumar',   notes: 'Compressor replaced' },
  { id: 'M006', vehicle: 'V007', plate: 'UP-32-MN-6789', type: 'Battery Replacement', status: 'pending',     priority: 'medium', scheduled: '2026-07-16', cost: 6000,  mechanic: 'Arif Khan',   notes: 'Battery at 30% health' },
];

/* ── FUEL & EXPENSES ── */
export const FUEL_LOGS = [
  { id: 'F001', vehicle: 'V001', date: '2026-07-12', liters: 85,  ratePerL: 94.5, amount: 8032.5, odometer: 142300, type: 'diesel', station: 'HP Fuel Station, Mumbai'    },
  { id: 'F002', vehicle: 'V003', date: '2026-07-12', liters: 45,  ratePerL: 94.5, amount: 4252.5, odometer: 54200,  type: 'diesel', station: 'BPCL Outlet, Bangalore'      },
  { id: 'F003', vehicle: 'V006', date: '2026-07-11', liters: 120, ratePerL: 95.0, amount: 11400,  odometer: 176400, type: 'diesel', station: 'Indian Oil, Ahmedabad'       },
  { id: 'F004', vehicle: 'V005', date: '2026-07-11', liters: 60,  ratePerL: 94.5, amount: 5670,   odometer: 32100,  type: 'diesel', station: 'Reliance Fuel, Gujarat'      },
  { id: 'F005', vehicle: 'V004', date: '2026-07-10', liters: 95,  ratePerL: 94.0, amount: 8930,   odometer: 201500, type: 'diesel', station: 'BPCL, Chennai'               },
  { id: 'F006', vehicle: 'V007', date: '2026-07-10', liters: 35,  ratePerL: 94.5, amount: 3307.5, odometer: 43900,  type: 'diesel', station: 'HP Station, Lucknow'         },
];

/* ── ROUTES ── */
export const ROUTES = [
  { id: 'R001', name: 'Golden Quadrilateral North',  from: 'Mumbai',    to: 'Delhi',     distance: 1420, duration: '22h 30m', waypoints: ['Nashik', 'Jaipur'],       status: 'active',   trips: 45 },
  { id: 'R002', name: 'South Corridor Express',       from: 'Bangalore', to: 'Chennai',   distance: 350,  duration: '5h 45m',  waypoints: ['Vellore'],                status: 'active',   trips: 82 },
  { id: 'R003', name: 'West Coast Highway',           from: 'Mumbai',    to: 'Ahmedabad', distance: 525,  duration: '8h 15m',  waypoints: ['Surat'],                  status: 'active',   trips: 61 },
  { id: 'R004', name: 'Eastern Express',              from: 'Kolkata',   to: 'Patna',     distance: 572,  duration: '9h 00m',  waypoints: ['Dhanbad', 'Bokaro'],      status: 'inactive', trips: 12 },
  { id: 'R005', name: 'Deccan Plateau Route',         from: 'Hyderabad', to: 'Pune',      distance: 560,  duration: '9h 30m',  waypoints: ['Solapur'],                status: 'active',   trips: 37 },
  { id: 'R006', name: 'North-East Corridor',          from: 'Delhi',     to: 'Chandigarh',distance: 250,  duration: '4h 00m',  waypoints: [],                         status: 'active',   trips: 94 },
];

/* ── SHIPMENTS ── */
export const SHIPMENTS = [
  { id: 'SH001', customer: 'Reliance Industries',   origin: 'Mumbai',    dest: 'Delhi',     weight: 12500, vehicle: 'V001', driver: 'Arjun Mehta',  status: 'in-transit', value: 285000, created: '2026-07-11' },
  { id: 'SH002', customer: 'Tata Chemicals',        origin: 'Pune',      dest: 'Kolkata',   weight: 8200,  vehicle: 'V003', driver: 'Rahul Verma',  status: 'pending',    value: 142000, created: '2026-07-12' },
  { id: 'SH003', customer: 'Marico Ltd',            origin: 'Bangalore', dest: 'Hyderabad', weight: 3400,  vehicle: 'V005', driver: 'Vikram Singh', status: 'in-transit', value: 68000,  created: '2026-07-11' },
  { id: 'SH004', customer: 'Infosys Technologies',  origin: 'Pune',      dest: 'Mumbai',    weight: 950,   vehicle: 'V004', driver: 'Sneha Patil',  status: 'delivered',  value: 28000,  created: '2026-07-10' },
  { id: 'SH005', customer: 'ONGC Ltd',              origin: 'Ahmedabad', dest: 'Surat',     weight: 18000, vehicle: 'V006', driver: 'Deepak Kumar', status: 'delivered',  value: 520000, created: '2026-07-10' },
  { id: 'SH006', customer: 'Godrej Consumer',       origin: 'Jaipur',    dest: 'Delhi',     weight: 5600,  vehicle: 'V007', driver: 'Meena Joshi',  status: 'scheduled',  value: 95000,  created: '2026-07-12' },
];

/* ── DASHBOARD KPIs ── */
export const DASHBOARD_KPIS = {
  activeVehicles: { value: 124, change: '+4%', trend: 'up' },
  available:      { value: 18,  change: '',     trend: 'neutral' },
  inService:      { value: 6,   change: '',     trend: 'neutral', alert: true },
  activeTrips:    { value: 82,  change: '+12%', trend: 'up' },
  onTimeRate:     { value: '94%', change: '+2%', trend: 'up' },
  revenue:        { value: '₹14.2L', change: '+8%', trend: 'up' },
  fuelCost:       { value: '₹2.8L', change: '-3%', trend: 'down' },
};
