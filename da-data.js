// Telangana Government DA Difference Data & Calculation Engine
// Based on DA Difference Table (Jan 24, July 24 & Jan 25 - 03 DAs)
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
  { period: 'Jan-24', daCount: '1 DA', incr: 3.64, cumulative: 37.31, remarks: '1 DA (Yet to be sanctioned)', isNew: true },
  { period: 'Jul-24', daCount: '2 DAs', incr: 2.73, cumulative: 40.04, remarks: '2 DAs (Yet to be sanctioned)', isNew: true },
  { period: 'Jan-25', daCount: '3 DAs', incr: 1.82, cumulative: 41.86, remarks: '3 DAs (Yet to be sanctioned)', isNew: true },
  { period: 'Jul-25', daCount: '4 DAs', incr: 2.73, cumulative: 44.59, remarks: '4 DAs (Yet to be sanctioned)' },
  { period: 'Jan-26', daCount: '5 DAs', incr: 1.82, cumulative: 46.41, remarks: '5 DAs (Yet to be sanctioned)' },
  { period: 'Jul-26', daCount: '6 DAs', incr: 2.73, cumulative: 49.14, remarks: '6 DAs (Yet to be sanctioned)' }
];

const DA_RATES = {
  NEW_DA_RATE: 0.4186,     // 41.86% (Jan 25)
  DRAWN_DA_RATE: 0.3367,   // 33.67% (Jul 23)
  DA_DIFF_RATE: 0.0819,    // 8.19%
  CPS_RATE: 0.10,          // 10%
  CPS_NET_RATE: 0.90       // 90%
};

const DA_RECORDS = [
  { basic: 19000, newDA: 7953, drawnDA: 6397, diff: 1556, cps10: 156, netCash: 1400, agi: null },
  { basic: 19640, newDA: 8221, drawnDA: 6613, diff: 1608, cps10: 161, netCash: 1447, agi: 640 },
  { basic: 20280, newDA: 8489, drawnDA: 6828, diff: 1661, cps10: 166, netCash: 1495, agi: 640 },
  { basic: 20920, newDA: 8757, drawnDA: 7044, diff: 1713, cps10: 171, netCash: 1542, agi: 640 },
  { basic: 21580, newDA: 9033, drawnDA: 7266, diff: 1767, cps10: 177, netCash: 1590, agi: 660 },
  { basic: 22240, newDA: 9310, drawnDA: 7488, diff: 1822, cps10: 182, netCash: 1640, agi: 660 },
  { basic: 22900, newDA: 9586, drawnDA: 7710, diff: 1876, cps10: 188, netCash: 1688, agi: 660 },
  { basic: 23590, newDA: 9875, drawnDA: 7943, diff: 1932, cps10: 193, netCash: 1739, agi: 690 },
  { basic: 24280, newDA: 10164, drawnDA: 8175, diff: 1989, cps10: 199, netCash: 1790, agi: 690 },
  { basic: 24970, newDA: 10452, drawnDA: 8407, diff: 2045, cps10: 204, netCash: 1841, agi: 690 },
  { basic: 25690, newDA: 10754, drawnDA: 8650, diff: 2104, cps10: 210, netCash: 1894, agi: 720 },
  { basic: 26410, newDA: 11055, drawnDA: 8892, diff: 2163, cps10: 216, netCash: 1947, agi: 720 },
  { basic: 27130, newDA: 11357, drawnDA: 9135, diff: 2222, cps10: 222, netCash: 2000, agi: 720 },
  { basic: 27880, newDA: 11671, drawnDA: 9387, diff: 2284, cps10: 228, netCash: 2056, agi: 750 },
  { basic: 28630, newDA: 11985, drawnDA: 9640, diff: 2345, cps10: 235, netCash: 2110, agi: 750 },
  { basic: 29380, newDA: 12298, drawnDA: 9892, diff: 2406, cps10: 241, netCash: 2165, agi: 750 },
  { basic: 30210, newDA: 12646, drawnDA: 10172, diff: 2474, cps10: 247, netCash: 2227, agi: 830 },
  { basic: 31040, newDA: 12993, drawnDA: 10451, diff: 2542, cps10: 254, netCash: 2288, agi: 830 },
  { basic: 31870, newDA: 13341, drawnDA: 10731, diff: 2610, cps10: 261, netCash: 2349, agi: 830 },
  { basic: 32810, newDA: 13734, drawnDA: 11047, diff: 2687, cps10: 269, netCash: 2418, agi: 940 },
  { basic: 33750, newDA: 14128, drawnDA: 11364, diff: 2764, cps10: 276, netCash: 2488, agi: 940 },
  { basic: 34690, newDA: 14521, drawnDA: 11680, diff: 2841, cps10: 284, netCash: 2557, agi: 940 },
  { basic: 35720, newDA: 14952, drawnDA: 12027, diff: 2925, cps10: 293, netCash: 2632, agi: 1030 },
  { basic: 36750, newDA: 15384, drawnDA: 12374, diff: 3010, cps10: 301, netCash: 2709, agi: 1030 },
  { basic: 37780, newDA: 15815, drawnDA: 12721, diff: 3094, cps10: 309, netCash: 2785, agi: 1030 },
  { basic: 38890, newDA: 16279, drawnDA: 13094, diff: 3185, cps10: 318, netCash: 2867, agi: 1110 },
  { basic: 40000, newDA: 16744, drawnDA: 13468, diff: 3276, cps10: 328, netCash: 2948, agi: 1110 },
  { basic: 41110, newDA: 17209, drawnDA: 13842, diff: 3367, cps10: 337, netCash: 3030, agi: 1110 },
  { basic: 42300, newDA: 17707, drawnDA: 14242, diff: 3465, cps10: 346, netCash: 3119, agi: 1190 },
  { basic: 43490, newDA: 18205, drawnDA: 14643, diff: 3562, cps10: 356, netCash: 3206, agi: 1190 },
  { basic: 44680, newDA: 18703, drawnDA: 15044, diff: 3659, cps10: 366, netCash: 3293, agi: 1190 },
  { basic: 45960, newDA: 19239, drawnDA: 15475, diff: 3764, cps10: 376, netCash: 3388, agi: 1280 },
  { basic: 47240, newDA: 19775, drawnDA: 15906, diff: 3869, cps10: 387, netCash: 3482, agi: 1280 },
  { basic: 48520, newDA: 20310, drawnDA: 16337, diff: 3973, cps10: 397, netCash: 3576, agi: 1280 },
  { basic: 49920, newDA: 20897, drawnDA: 16808, diff: 4089, cps10: 409, netCash: 3680, agi: 1400 },
  { basic: 51320, newDA: 21483, drawnDA: 17279, diff: 4204, cps10: 420, netCash: 3784, agi: 1400 },
  { basic: 52720, newDA: 22069, drawnDA: 17751, diff: 4318, cps10: 432, netCash: 3886, agi: 1400 },
  { basic: 54220, newDA: 22696, drawnDA: 18256, diff: 4440, cps10: 444, netCash: 3996, agi: 1500 },
  { basic: 55720, newDA: 23324, drawnDA: 18761, diff: 4563, cps10: 456, netCash: 4107, agi: 1500 },
  { basic: 57220, newDA: 23952, drawnDA: 19266, diff: 4686, cps10: 469, netCash: 4217, agi: 1500 },
  { basic: 58850, newDA: 24635, drawnDA: 19815, diff: 4820, cps10: 482, netCash: 4338, agi: 1630 },
  { basic: 60480, newDA: 25317, drawnDA: 20364, diff: 4953, cps10: 495, netCash: 4458, agi: 1630 },
  { basic: 62110, newDA: 25999, drawnDA: 20912, diff: 5087, cps10: 509, netCash: 4578, agi: 1630 },
  { basic: 63840, newDA: 26723, drawnDA: 21495, diff: 5228, cps10: 523, netCash: 4705, agi: 1730 },
  { basic: 65570, newDA: 27448, drawnDA: 22077, diff: 5371, cps10: 537, netCash: 4834, agi: 1730 },
  { basic: 67300, newDA: 28172, drawnDA: 22660, diff: 5512, cps10: 551, netCash: 4961, agi: 1730 },
  { basic: 69150, newDA: 28946, drawnDA: 23283, diff: 5663, cps10: 566, netCash: 5097, agi: 1850 },
  { basic: 71000, newDA: 29721, drawnDA: 23906, diff: 5815, cps10: 582, netCash: 5233, agi: 1850 },
  { basic: 72850, newDA: 30495, drawnDA: 24529, diff: 5966, cps10: 597, netCash: 5369, agi: 1850 },
  { basic: 74840, newDA: 31328, drawnDA: 25199, diff: 6129, cps10: 613, netCash: 5516, agi: 1990 },
  { basic: 76830, newDA: 32161, drawnDA: 25869, diff: 6292, cps10: 629, netCash: 5663, agi: 1990 },
  { basic: 78820, newDA: 32994, drawnDA: 26539, diff: 6455, cps10: 646, netCash: 5809, agi: 1990 },
  { basic: 80960, newDA: 33890, drawnDA: 27259, diff: 6631, cps10: 663, netCash: 5968, agi: 2140 },
  { basic: 83100, newDA: 34786, drawnDA: 27980, diff: 6806, cps10: 681, netCash: 6125, agi: 2140 },
  { basic: 85120, newDA: 35631, drawnDA: 28660, diff: 6971, cps10: 697, netCash: 6274, agi: 2020 },
  { basic: 87510, newDA: 36632, drawnDA: 29465, diff: 7167, cps10: 717, netCash: 6450, agi: 2270 },
  { basic: 89780, newDA: 37582, drawnDA: 30229, diff: 7353, cps10: 735, netCash: 6618, agi: 2270 },
  { basic: 92050, newDA: 38532, drawnDA: 30993, diff: 7539, cps10: 754, netCash: 6785, agi: 2270 },
  { basic: 94470, newDA: 39545, drawnDA: 31808, diff: 7737, cps10: 774, netCash: 6963, agi: 2420 },
  { basic: 96890, newDA: 40558, drawnDA: 32623, diff: 7935, cps10: 794, netCash: 7141, agi: 2420 },
  { basic: 99310, newDA: 41571, drawnDA: 33438, diff: 8133, cps10: 813, netCash: 7320, agi: 2420 },
  { basic: 101870, newDA: 42643, drawnDA: 34300, diff: 8343, cps10: 834, netCash: 7509, agi: 2560 },
  { basic: 104430, newDA: 43714, drawnDA: 35162, diff: 8552, cps10: 855, netCash: 7697, agi: 2560 },
  { basic: 106990, newDA: 44786, drawnDA: 36024, diff: 8762, cps10: 876, netCash: 7886, agi: 2560 },
  { basic: 109750, newDA: 45941, drawnDA: 36953, diff: 8988, cps10: 899, netCash: 8089, agi: 2760 },
  { basic: 112510, newDA: 47097, drawnDA: 37882, diff: 9215, cps10: 922, netCash: 8293, agi: 2760 },
  { basic: 115270, newDA: 48252, drawnDA: 38811, diff: 9441, cps10: 944, netCash: 8497, agi: 2760 },
  { basic: 118230, newDA: 49491, drawnDA: 39808, diff: 9683, cps10: 968, netCash: 8715, agi: 2960 },
  { basic: 121190, newDA: 50730, drawnDA: 40805, diff: 9925, cps10: 993, netCash: 8932, agi: 2960 },
  { basic: 124150, newDA: 51969, drawnDA: 41801, diff: 10168, cps10: 1017, netCash: 9151, agi: 2960 },
  { basic: 127310, newDA: 53292, drawnDA: 42865, diff: 10427, cps10: 1043, netCash: 9384, agi: 3160 },
  { basic: 130470, newDA: 54615, drawnDA: 43929, diff: 10686, cps10: 1069, netCash: 9617, agi: 3160 },
  { basic: 133630, newDA: 55938, drawnDA: 44993, diff: 10945, cps10: 1095, netCash: 9850, agi: 3160 },
  { basic: 137050, newDA: 57369, drawnDA: 46145, diff: 11224, cps10: 1122, netCash: 10102, agi: 3420 },
  { basic: 140470, newDA: 58801, drawnDA: 47296, diff: 11505, cps10: 1151, netCash: 10354, agi: 3420 },
  { basic: 143890, newDA: 60232, drawnDA: 48448, diff: 11784, cps10: 1178, netCash: 10606, agi: 3420 },
  { basic: 147310, newDA: 61664, drawnDA: 49599, diff: 12065, cps10: 1207, netCash: 10858, agi: 3690 },
  { basic: 151000, newDA: 63209, drawnDA: 50842, diff: 12367, cps10: 1237, netCash: 11130, agi: 3690 },
  { basic: 154690, newDA: 64753, drawnDA: 52084, diff: 12669, cps10: 1267, netCash: 11402, agi: 3690 },
  { basic: 158380, newDA: 66298, drawnDA: 53327, diff: 12971, cps10: 1297, netCash: 11674, agi: null }
];

// Quick index lookup map
const DA_LOOKUP = new Map();
DA_RECORDS.forEach(r => DA_LOOKUP.set(r.basic, r));

/**
 * Calculates DA details for any basic pay.
 * Uses exact table values when basic pay matches a standard scale;
 * otherwise calculates using standard rounding rules.
 */
function calculateDA(basicPay, employeeType = 'CPS', months = 1, customNewRate = null, customDrawnRate = null) {
  basicPay = Number(basicPay) || 0;
  months = Math.max(1, parseInt(months) || 1);

  const isStandardRates = (customNewRate === null || customNewRate === 41.86) &&
                          (customDrawnRate === null || customDrawnRate === 33.67);

  let newDA, drawnDA, monthlyDiff, monthlyCps10, monthlyCpsNet;

  if (isStandardRates && DA_LOOKUP.has(basicPay)) {
    const rec = DA_LOOKUP.get(basicPay);
    newDA = rec.newDA;
    drawnDA = rec.drawnDA;
    monthlyDiff = rec.diff;
    monthlyCps10 = rec.cps10;
    monthlyCpsNet = rec.netCash;
  } else {
    const newRate = (customNewRate !== null ? customNewRate : 41.86) / 100;
    const drawnRate = (customDrawnRate !== null ? customDrawnRate : 33.67) / 100;

    newDA = Math.round(basicPay * newRate);
    drawnDA = Math.round(basicPay * drawnRate);
    monthlyDiff = newDA - drawnDA;
    monthlyCps10 = Math.round(monthlyDiff * 0.10);
    monthlyCpsNet = monthlyDiff - monthlyCps10;
  }

  const isCPS = employeeType === 'CPS';

  // Multi-month totals: strictly 10% of Total Gross Difference
  const totalDiff = monthlyDiff * months;
  const totalCpsAccount = isCPS ? Math.round(totalDiff * 0.10) : 0;
  const totalNetCash = isCPS ? (totalDiff - totalCpsAccount) : totalDiff;

  return {
    basicPay,
    months,
    employeeType,
    newDARate: customNewRate !== null ? customNewRate : 41.86,
    drawnDARate: customDrawnRate !== null ? customDrawnRate : 33.67,
    diffRate: +( ((customNewRate !== null ? customNewRate : 41.86) - (customDrawnRate !== null ? customDrawnRate : 33.67)).toFixed(2) ),
    monthly: {
      newDA,
      drawnDA,
      diff: monthlyDiff,
      cpsAccount: isCPS ? monthlyCps10 : 0,
      netCash: isCPS ? monthlyCpsNet : monthlyDiff
    },
    total: {
      diff: totalDiff,
      cpsAccount: totalCpsAccount,
      netCash: totalNetCash
    }
  };
}

/**
 * Get next pay stage and AGI increment amount
 */
function getNextPayStage(basicPay) {
  basicPay = Number(basicPay) || 0;
  const idx = DA_RECORDS.findIndex(r => r.basic === basicPay);
  if (idx !== -1 && idx < DA_RECORDS.length - 1) {
    const nextRec = DA_RECORDS[idx + 1];
    return {
      nextBasic: nextRec.basic,
      agi: nextRec.basic - basicPay
    };
  }
  // For custom pay or top of scale
  if (idx === DA_RECORDS.length - 1) {
    return { nextBasic: basicPay, agi: 0 };
  }
  // Custom pay: find standard increment bracket
  let agi = 640;
  if (basicPay >= 147310) agi = 3690;
  else if (basicPay >= 137050) agi = 3420;
  else if (basicPay >= 127310) agi = 3160;
  else if (basicPay >= 118230) agi = 2960;
  else if (basicPay >= 109750) agi = 2760;
  else if (basicPay >= 101870) agi = 2560;
  else if (basicPay >= 94470) agi = 2420;
  else if (basicPay >= 87510) agi = 2270;
  else if (basicPay >= 80960) agi = 2140;
  else if (basicPay >= 74840) agi = 1990;
  else if (basicPay >= 69150) agi = 1850;
  else if (basicPay >= 63840) agi = 1730;
  else if (basicPay >= 58850) agi = 1630;
  else if (basicPay >= 54220) agi = 1500;
  else if (basicPay >= 49920) agi = 1400;
  else if (basicPay >= 45960) agi = 1280;
  else if (basicPay >= 42300) agi = 1190;
  else if (basicPay >= 38890) agi = 1110;
  else if (basicPay >= 35720) agi = 1030;
  else if (basicPay >= 32810) agi = 940;
  else if (basicPay >= 30210) agi = 830;
  else if (basicPay >= 27880) agi = 750;
  else if (basicPay >= 25690) agi = 720;
  else if (basicPay >= 23590) agi = 690;
  else if (basicPay >= 21580) agi = 660;

  return {
    nextBasic: basicPay + agi,
    agi: agi
  };
}

/**
 * Format currency in Indian Rupees format (₹ xx,xxx)
 */
function formatINR(val) {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  return '₹' + Number(val).toLocaleString('en-IN');
}
