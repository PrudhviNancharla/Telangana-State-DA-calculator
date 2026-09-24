// Telangana Government DA Difference Data & Calculation Engine
// Focus: 2 DAs Sanctioned (1st DA @ 37.31% w.e.f Jan 2024 & 2nd DA @ 40.04% w.e.f Jul 2024) • RPS 2020
// Baseline Drawn DA: 33.67% (July 2023 • G.O.Ms.02)
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
  { period: 'Jul-23', incr: 3.64, cumulative: 33.67, remarks: 'G.O.Ms.02 (Last Drawn DA in RPS 2020)', isLastDrawn: true },
  { period: 'Jan-24', daCount: '1st DA', incr: 3.64, cumulative: 37.31, remarks: '1st DA Sanctioned (+3.64% w.e.f Jan 2024)', isNew: true },
  { period: 'Jul-24', daCount: '2nd DA', incr: 2.73, cumulative: 40.04, remarks: '2nd DA Sanctioned (+2.73% w.e.f Jul 2024 | Total Diff: +6.37%)', isNew: true }
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
  CPS_NET_RATE: 0.90        // 90% Net Cash to Bank
};

// RPS 2020 Standard Basic Pay Stages (₹19,000 to ₹1,58,380)
const RPS_2020_STAGES = [
  19000, 19640, 20280, 20920, 21580, 22240, 22900, 23590, 24280, 24970,
  25690, 26410, 27130, 27880, 28630, 29380, 30210, 31040, 31870, 32810,
  33750, 34690, 35720, 36750, 37780, 38890, 40000, 41110, 42300, 43490,
  44680, 45960, 47240, 48520, 49920, 51320, 52720, 54220, 55720, 57220,
  58850, 60480, 62110, 63840, 65570, 67300, 69150, 71000, 72850, 74840,
  76830, 78820, 80960, 83100, 85120, 87510, 89780, 92050, 94470, 96890,
  99310, 101870, 104430, 106990, 109750, 112510, 115270, 118230, 121190, 124150,
  127310, 130470, 133630, 137050, 140470, 143890, 147310, 151000, 154690, 158380
];

// Generate exact 2 DAs Records for all RPS 2020 stages
const DA_RECORDS = RPS_2020_STAGES.map((basic, idx) => {
  const drawnDA = Math.round(basic * DA_RATES.DRAWN_DA_RATE);
  const da1 = Math.round(basic * DA_RATES.DA_1_RATE);
  const diff1 = da1 - drawnDA;
  const da2 = Math.round(basic * DA_RATES.DA_2_RATE);
  const diff2 = da2 - da1;
  const diffTotal = da2 - drawnDA; // 6.37% total diff
  const cps10 = Math.round(diffTotal * DA_RATES.CPS_RATE);
  const netCash = diffTotal - cps10;
  const agi = idx < RPS_2020_STAGES.length - 1 ? (RPS_2020_STAGES[idx + 1] - basic) : null;

  return {
    basic,
    drawnDA,
    da1,
    diff1,
    da2,
    diff2,
    diffTotal,
    cps10,
    netCash,
    agi,
    // Backward compatibility aliases
    newDA: da1,
    diff: diff1
  };
});

// Quick index lookup map
const DA_LOOKUP = new Map();
DA_RECORDS.forEach(r => DA_LOOKUP.set(r.basic, r));

/**
 * Calculates DA details for any basic pay with 2 DAs support.
 * @param {number} basicPay
 * @param {string} employeeType 'CPS' or 'GPF'
 * @param {number} months Total arrears duration in months
 * @param {string} daMode 'BOTH' (default), 'DA1_ONLY', 'DA2_ONLY'
 * @param {number|null} customDa1 Custom 1st DA rate (%)
 * @param {number|null} customDa2 Custom 2nd DA rate (%)
 * @param {number|null} customDrawn Custom Drawn DA rate (%)
 */
function calculateDA(basicPay, employeeType = 'CPS', months = 33, daMode = 'BOTH', customDa1 = null, customDa2 = null, customDrawn = null) {
  basicPay = Number(basicPay) || 0;
  months = Math.max(1, parseInt(months) || 1);

  const defaultDa1 = 37.31;
  const defaultDa2 = 40.04;
  const defaultDrawn = 33.67;

  const da1Rate = customDa1 !== null ? customDa1 : defaultDa1;
  const da2Rate = customDa2 !== null ? customDa2 : defaultDa2;
  const drawnRate = customDrawn !== null ? customDrawn : defaultDrawn;

  const drawnDA = Math.round(basicPay * (drawnRate / 100));
  const da1 = Math.round(basicPay * (da1Rate / 100));
  const da2 = Math.round(basicPay * (da2Rate / 100));

  const diff1 = da1 - drawnDA;         // 1st DA diff (+3.64%)
  const diff2 = da2 - da1;             // 2nd DA diff over 1st DA (+2.73%)
  const totalDiffJul24 = da2 - drawnDA;// Total diff from Jul-24 (+6.37%)

  const isCPS = employeeType === 'CPS';

  let totalDiff = 0;
  let totalDa1Part = 0;
  let totalDa2Part = 0;

  for (let m = 0; m < months; m++) {
    if (daMode === 'DA1_ONLY') {
      totalDiff += diff1;
      totalDa1Part += diff1;
    } else if (daMode === 'DA2_ONLY') {
      if (m >= 6) { // Jul 2024 is Month 6
        totalDiff += diff2;
        totalDa2Part += diff2;
      }
    } else { // BOTH
      if (m < 6) { // Jan-24 to Jun-24 (1st DA only)
        totalDiff += diff1;
        totalDa1Part += diff1;
      } else { // Jul-24 onwards (Both DAs: +6.37% = diff1 + diff2)
        totalDiff += totalDiffJul24;
        totalDa1Part += diff1;
        totalDa2Part += diff2;
      }
    }
  }

  const totalCpsAccount = isCPS ? Math.round(totalDiff * 0.10) : 0;
  const totalNetCash = isCPS ? (totalDiff - totalCpsAccount) : totalDiff;

  return {
    basicPay,
    months,
    employeeType,
    daMode,
    drawnRate,
    da1Rate,
    da2Rate,
    diff1Rate: +( (da1Rate - drawnRate).toFixed(2) ),
    diff2Rate: +( (da2Rate - da1Rate).toFixed(2) ),
    totalDiffRate: +( (da2Rate - drawnRate).toFixed(2) ),
    monthly: {
      drawnDA,
      da1,
      diff1,
      da2,
      diff2,
      totalDiffJul24,
      cpsAccount: isCPS ? Math.round(totalDiffJul24 * 0.10) : 0,
      netCash: isCPS ? (totalDiffJul24 - Math.round(totalDiffJul24 * 0.10)) : totalDiffJul24
    },
    total: {
      diff: totalDiff,
      da1Part: totalDa1Part,
      da2Part: totalDa2Part,
      cpsAccount: totalCpsAccount,
      netCash: totalNetCash
    }
  };
}

/**
 * Get next pay stage and AGI increment amount
 */
function getNextPayStage(basicPay) {
  basicPay = Number(basicPay) || 19000;

  const exactRecord = DA_LOOKUP.get(basicPay);
  if (exactRecord && exactRecord.agi !== null) {
    return {
      nextBasic: basicPay + exactRecord.agi,
      agi: exactRecord.agi,
      isMaxStage: false
    };
  }

  if (exactRecord && exactRecord.agi === null) {
    return {
      nextBasic: basicPay,
      agi: 0,
      isMaxStage: true
    };
  }

  // For custom pay, find closest bracket
  const idx = RPS_2020_STAGES.findIndex(s => s >= basicPay);
  if (idx !== -1 && idx < RPS_2020_STAGES.length - 1) {
    const agi = RPS_2020_STAGES[idx + 1] - RPS_2020_STAGES[idx];
    return {
      nextBasic: basicPay + agi,
      agi: agi,
      isMaxStage: false
    };
  }

  return {
    nextBasic: basicPay,
    agi: 0,
    isMaxStage: true
  };
}

/**
 * Get previous pay stage and decrement amount (stepping backward in RPS-2020)
 */
function getPrevPayStage(basicPay) {
  basicPay = Number(basicPay) || 19000;

  const idx = RPS_2020_STAGES.indexOf(basicPay);
  if (idx > 0) {
    const prev = RPS_2020_STAGES[idx - 1];
    return {
      prevBasic: prev,
      decrement: basicPay - prev,
      isMinStage: idx - 1 === 0
    };
  }
  if (idx === 0) {
    return {
      prevBasic: RPS_2020_STAGES[0],
      decrement: 0,
      isMinStage: true
    };
  }

  // For custom pay, find highest stage less than basicPay
  for (let i = RPS_2020_STAGES.length - 1; i >= 0; i--) {
    if (RPS_2020_STAGES[i] < basicPay) {
      return {
        prevBasic: RPS_2020_STAGES[i],
        decrement: basicPay - RPS_2020_STAGES[i],
        isMinStage: i === 0
      };
    }
  }

  return {
    prevBasic: RPS_2020_STAGES[0],
    decrement: 0,
    isMinStage: true
  };
}

/**
 * Get 3-year backward pay stages (2026, 2025, 2024) from September 2026 basic pay
 */
function getBackwardPayStages(sep26Pay) {
  const p2026 = Number(sep26Pay) || 20280;
  const s2025 = getPrevPayStage(p2026);
  const p2025 = s2025.prevBasic;
  const s2024 = getPrevPayStage(p2025);
  const p2024 = s2024.prevBasic;

  return {
    pay2026: p2026,
    pay2025: p2025,
    pay2024: p2024,
    decr2025: s2025.decrement,
    decr2024: s2024.decrement
  };
}

/**
 * Format number into Indian currency format
 */
function formatINR(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}
