// Telangana Government DA Difference Data & Calculation Engine
// Focus: 2 DAs Sanctioned (1st DA @ 37.31% w.e.f Jan 2024 & 2nd DA @ 40.04% w.e.f Jul 2024) — RPS 2020
// Baseline Drawn DA: 33.67% (July 2023 — G.O.Ms.02)
// Prepared by Nancharla Prudhvi, Senior Accountant, District Treasury, Khammam

// Official Telangana State Cumulative DA Rates Table (RPS 2020)
const TS_CUMULATIVE_DA_TABLE = [
  { period: 'Jul-18', incr: 0.00, cumulative: 0.00, remarks: 'Merged in RPS 2020' },
  { period: 'Jan-19', incr: 2.73, cumulative: 2.73, remarks: 'G.O.Ms.52' },
  { period: 'Jul-19', incr: 4.55, cumulative: 7.28, remarks: 'G.O.Ms.52' },
  { period: 'Jan-20', incr: 3.64, cumulative: 10.92, remarks: 'G.O.Ms.03' },
  { period: 'Jul-20', incr: 2.73, cumulative: 13.65, remarks: 'G.O.Ms.03' },
  { period: 'Jan-21', incr: 3.64, cumulative: 17.29, remarks: 'G.O.Ms.03' },
  { period: 'Jul-21', incr: 2.73, cumulative: 20.02, remarks: 'G.O.Ms.09' },
  { period: 'Jan-22', incr: 2.73, cumulative: 22.75, remarks: 'G.O.Ms.50' },
  { period: 'Jul-22', incr: 3.64, cumulative: 26.39, remarks: 'G.O.Ms.120' },
  { period: 'Jan-23', incr: 3.64, cumulative: 30.03, remarks: 'G.O.Ms.78' },
  { period: 'Jul-23', incr: 3.64, cumulative: 33.67, remarks: 'G.O.Ms.02 (Baseline Drawn DA in RPS 2020)', isLastDrawn: true },
  { period: 'Jan-24', daCount: '1st DA', incr: 3.64, cumulative: 37.31, remarks: 'G.O.Ms.No.128, Dt: 06.10.2026 (+3.64% w.e.f Jan 2024)', isNew: true },
  { period: 'Jul-24', daCount: '2nd DA', incr: 2.73, cumulative: 40.04, remarks: 'G.O.Ms.No.130, Dt: 06.10.2026 (+2.73% w.e.f Jul 2024 | Total Diff: +6.37%)', isNew: true }
];

const DA_RATES = {
  DRAWN_DA_RATE: 0.3367,    // 33.67% (Jul 23 Baseline)
  DA_1_RATE: 0.3731,        // 37.31% (Jan 24 - 1st DA)
  DA_1_DIFF: 0.0364,        // +3.64% (1st DA Difference)
  DA_2_RATE: 0.4004,        // 40.04% (Jul 24 - 2nd DA)
  DA_2_DIFF: 0.0273,        // +2.73% (2nd DA Difference over 1st DA)
  TOTAL_DIFF_JUL24: 0.0637, // +6.37% (Total Difference from Jul-24 = 3.64% + 2.73%)
  NEW_DA_RATE: 0.4004,      // Latest 2nd DA Rate
  CPS_RATE: 0.10,           // 10% PRAN Deduction
  CPS_NET_RATE: 0.90,       // 90% Net Cash to Bank
  SL_RATE: 0.03144          // Surrender leave factor
};

// RPS 2020 Standard Basic Pay Stages (₹19,000 to ₹1,62,070)
const RPS_2020_STAGES = [
  19000, 19640, 20280, 20920, 21580, 22240, 22900, 23590, 24280, 24970,
  25690, 26410, 27130, 27880, 28630, 29380, 30210, 31040, 31870, 32810,
  33750, 34690, 35720, 36750, 37780, 38890, 40000, 41110, 42300, 43490,
  44680, 45960, 47240, 48520, 49920, 51320, 52720, 54220, 55720, 57220,
  58850, 60480, 62110, 63840, 65570, 67300, 69150, 71000, 72850, 74840,
  76830, 78820, 80960, 83100, 85120, 87510, 89780, 92050, 94470, 96890,
  99310, 101870, 104430, 106990, 109750, 112510, 115270, 118230, 121190, 124150,
  127310, 130470, 133630, 137050, 140470, 143890, 147310, 151000, 154690, 158380,
  162070
];

// 33 Months in scope (Jan 2024 to Sep 2026)
const MONTHS_33 = [
  { id: 1, name: 'Jan 2024', short: 'Jan-24', year: 2024, month: 1, days: 31, ym: '2024-01', hasDa2: false },
  { id: 2, name: 'Feb 2024', short: 'Feb-24', year: 2024, month: 2, days: 29, ym: '2024-02', hasDa2: false },
  { id: 3, name: 'Mar 2024', short: 'Mar-24', year: 2024, month: 3, days: 31, ym: '2024-03', hasDa2: false },
  { id: 4, name: 'Apr 2024', short: 'Apr-24', year: 2024, month: 4, days: 30, ym: '2024-04', hasDa2: false },
  { id: 5, name: 'May 2024', short: 'May-24', year: 2024, month: 5, days: 31, ym: '2024-05', hasDa2: false },
  { id: 6, name: 'Jun 2024', short: 'Jun-24', year: 2024, month: 6, days: 30, ym: '2024-06', hasDa2: false },
  { id: 7, name: 'Jul 2024', short: 'Jul-24', year: 2024, month: 7, days: 31, ym: '2024-07', hasDa2: true },
  { id: 8, name: 'Aug 2024', short: 'Aug-24', year: 2024, month: 8, days: 31, ym: '2024-08', hasDa2: true },
  { id: 9, name: 'Sep 2024', short: 'Sep-24', year: 2024, month: 9, days: 30, ym: '2024-09', hasDa2: true },
  { id: 10, name: 'Oct 2024', short: 'Oct-24', year: 2024, month: 10, days: 31, ym: '2024-10', hasDa2: true },
  { id: 11, name: 'Nov 2024', short: 'Nov-24', year: 2024, month: 11, days: 30, ym: '2024-11', hasDa2: true },
  { id: 12, name: 'Dec 2024', short: 'Dec-24', year: 2024, month: 12, days: 31, ym: '2024-12', hasDa2: true },
  { id: 13, name: 'Jan 2025', short: 'Jan-25', year: 2025, month: 1, days: 31, ym: '2025-01', hasDa2: true },
  { id: 14, name: 'Feb 2025', short: 'Feb-25', year: 2025, month: 2, days: 28, ym: '2025-02', hasDa2: true },
  { id: 15, name: 'Mar 2025', short: 'Mar-25', year: 2025, month: 3, days: 31, ym: '2025-03', hasDa2: true },
  { id: 16, name: 'Apr 2025', short: 'Apr-25', year: 2025, month: 4, days: 30, ym: '2025-04', hasDa2: true },
  { id: 17, name: 'May 2025', short: 'May-25', year: 2025, month: 5, days: 31, ym: '2025-05', hasDa2: true },
  { id: 18, name: 'Jun 2025', short: 'Jun-25', year: 2025, month: 6, days: 30, ym: '2025-06', hasDa2: true },
  { id: 19, name: 'Jul 2025', short: 'Jul-25', year: 2025, month: 7, days: 31, ym: '2025-07', hasDa2: true },
  { id: 20, name: 'Aug 2025', short: 'Aug-25', year: 2025, month: 8, days: 31, ym: '2025-08', hasDa2: true },
  { id: 21, name: 'Sep 2025', short: 'Sep-25', year: 2025, month: 9, days: 30, ym: '2025-09', hasDa2: true },
  { id: 22, name: 'Oct 2025', short: 'Oct-25', year: 2025, month: 10, days: 31, ym: '2025-10', hasDa2: true },
  { id: 23, name: 'Nov 2025', short: 'Nov-25', year: 2025, month: 11, days: 30, ym: '2025-11', hasDa2: true },
  { id: 24, name: 'Dec 2025', short: 'Dec-25', year: 2025, month: 12, days: 31, ym: '2025-12', hasDa2: true },
  { id: 25, name: 'Jan 2026', short: 'Jan-26', year: 2026, month: 1, days: 31, ym: '2026-01', hasDa2: true },
  { id: 26, name: 'Feb 2026', short: 'Feb-26', year: 2026, month: 2, days: 28, ym: '2026-02', hasDa2: true },
  { id: 27, name: 'Mar 2026', short: 'Mar-26', year: 2026, month: 3, days: 31, ym: '2026-03', hasDa2: true },
  { id: 28, name: 'Apr 2026', short: 'Apr-26', year: 2026, month: 4, days: 30, ym: '2026-04', hasDa2: true },
  { id: 29, name: 'May 2026', short: 'May-26', year: 2026, month: 5, days: 31, ym: '2026-05', hasDa2: true },
  { id: 30, name: 'Jun 2026', short: 'Jun-26', year: 2026, month: 6, days: 30, ym: '2026-06', hasDa2: true },
  { id: 31, name: 'Jul 2026', short: 'Jul-26', year: 2026, month: 7, days: 31, ym: '2026-07', hasDa2: true },
  { id: 32, name: 'Aug 2026', short: 'Aug-26', year: 2026, month: 8, days: 31, ym: '2026-08', hasDa2: true },
  { id: 33, name: 'Sep 2026', short: 'Sep-26', year: 2026, month: 9, days: 30, ym: '2026-09', hasDa2: true }
];

// Helper: Get previous pay stage in RPS 2020
function getPreviousPayStage(basic) {
  basic = Number(basic);
  const idx = RPS_2020_STAGES.indexOf(basic);
  if (idx > 0) return RPS_2020_STAGES[idx - 1];
  if (idx === 0) return RPS_2020_STAGES[0];
  // Custom pay: find nearest lower stage
  for (let i = RPS_2020_STAGES.length - 1; i >= 0; i--) {
    if (RPS_2020_STAGES[i] < basic) return RPS_2020_STAGES[i];
  }
  return Math.max(1000, basic - 640);
}

// Helper: Get next pay stage in RPS 2020
function getNextPayStage(basic) {
  basic = Number(basic);
  const idx = RPS_2020_STAGES.indexOf(basic);
  if (idx >= 0 && idx < RPS_2020_STAGES.length - 1) return RPS_2020_STAGES[idx + 1];
  if (idx === RPS_2020_STAGES.length - 1) return RPS_2020_STAGES[idx];
  // Custom pay: find nearest higher stage
  for (let i = 0; i < RPS_2020_STAGES.length; i++) {
    if (RPS_2020_STAGES[i] > basic) return RPS_2020_STAGES[i];
  }
  return basic + 3690;
}

// Format numbers in Indian numbering system
function formatINR(val) {
  if (val === null || val === undefined || isNaN(val)) return '0';
  return Number(val).toLocaleString('en-IN');
}
