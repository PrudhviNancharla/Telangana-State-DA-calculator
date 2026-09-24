// Telangana Government 2 DAs Difference & Arrears Calculator Application Script
// RPS 2020 • 1st DA (Jan 2024: 37.31% | Diff: +3.64%) & 2nd DA (Jul 2024: 40.04% | Diff: +2.73% | Total Diff: +6.37%)
// Baseline Drawn DA: 33.67% (July 2023 • G.O.Ms.02)
// Arrears Period: Jan-2024 to Sep-2026 (33 Months)
// Formulated by Nancharla Prudhvi, Senior Accountant, District Treasury, Khammam

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Basic Pay
  const basicSelect = document.getElementById('basicSelect');
  const searchInput = document.getElementById('searchInput');
  const customPayCheck = document.getElementById('customPayCheck');
  const customPayWrapper = document.getElementById('customPayWrapper');
  const customPayInput = document.getElementById('customPayInput');

  // DOM Elements - Backward Pay Stages (Sep-2026, 2025, 2024)
  const dispPay2024 = document.getElementById('dispPay2024');
  const dispPay2025 = document.getElementById('dispPay2025');
  const dispPay2026 = document.getElementById('dispPay2026');
  const dispDecr2024 = document.getElementById('dispDecr2024');
  const dispDecr2025 = document.getElementById('dispDecr2025');

  // DOM Elements - DA Mode & Rates
  const daModeRadios = document.querySelectorAll('input[name="daMode"]');
  const labelModeBoth = document.getElementById('labelModeBoth');
  const labelModeDa1 = document.getElementById('labelModeDa1');
  const labelModeDa2 = document.getElementById('labelModeDa2');

  const dispDa1Rate = document.getElementById('dispDa1Rate');
  const dispDa1Diff = document.getElementById('dispDa1Diff');
  const dispDa2Rate = document.getElementById('dispDa2Rate');
  const dispDaTotalDiff = document.getElementById('dispDaTotalDiff');

  const customDaCheck = document.getElementById('customDaCheck');
  const customDaInputsWrapper = document.getElementById('customDaInputsWrapper');
  const customDrawnRate = document.getElementById('customDrawnRate');
  const customDa1Rate = document.getElementById('customDa1Rate');
  const customDa2Rate = document.getElementById('customDa2Rate');

  const calculatedDiffBadge = document.getElementById('calculatedDiffBadge');
  const diffFormulaText = document.getElementById('diffFormulaText');

  // TS Cumulative Reference Table
  const tsTableToggle = document.getElementById('tsTableToggle');
  const tsTableContent = document.getElementById('tsTableContent');
  const tsTableArrow = document.getElementById('tsTableArrow');
  const tsCumulativeTableBody = document.getElementById('tsCumulativeTableBody');

  // Header Displays
  const headerDrawnDaDisplay = document.getElementById('headerDrawnDaDisplay');
  const headerDa1Display = document.getElementById('headerDa1Display');
  const headerDa2Display = document.getElementById('headerDa2Display');
  const headerDiffDisplay = document.getElementById('headerDiffDisplay');

  // Increment Elements
  const incrChips = document.getElementById('incrChips');
  const incrDropdownWrapper = document.getElementById('incrDropdownWrapper');
  const incrMonthSelect = document.getElementById('incrMonthSelect');
  const agiAutoRecurCheck = document.getElementById('agiAutoRecurCheck');
  const incrInfoCard = document.getElementById('incrInfoCard');
  const infoIncrMonthBadge = document.getElementById('infoIncrMonthBadge');
  const infoPreBasic = document.getElementById('infoPreBasic');
  const infoAGI = document.getElementById('infoAGI');
  const infoPostBasic = document.getElementById('infoPostBasic');
  const infoIncrSplit = document.getElementById('infoIncrSplit');
  const activeIncrBadge = document.getElementById('activeIncrBadge');
  const infoAgiMilestonesContainer = document.getElementById('infoAgiMilestonesContainer');

  // Automatic Advance Scheme (AAS) Elements
  const aasChips = document.getElementById('aasChips');
  const aasDropdownWrapper = document.getElementById('aasDropdownWrapper');
  const aasMonthSelect = document.getElementById('aasMonthSelect');
  const aasDateSection = document.getElementById('aasDateSection');
  const aasDateTitle = document.getElementById('aasDateTitle');
  const activeAasDateBadge = document.getElementById('activeAasDateBadge');
  const aasDateChips = document.getElementById('aasDateChips');
  const aasDateSelect = document.getElementById('aasDateSelect');
  const aasDatePrev = document.querySelector('.aas-date-prev');
  const aasDateNext = document.querySelector('.aas-date-next');
  const aasInfoCard = document.getElementById('aasInfoCard');
  const infoAasMonthBadge = document.getElementById('infoAasMonthBadge');
  const infoPreAasBasic = document.getElementById('infoPreAasBasic');
  const infoAasIncrAmount = document.getElementById('infoAasIncrAmount');
  const infoPostAasBasic = document.getElementById('infoPostAasBasic');
  const infoAasDateRow = document.getElementById('infoAasDateRow');
  const infoAasDate = document.getElementById('infoAasDate');
  const infoAasProrataRow = document.getElementById('infoAasProrataRow');
  const infoAasProrataBasic = document.getElementById('infoAasProrataBasic');
  const infoAasSplit = document.getElementById('infoAasSplit');
  const activeAasBadge = document.getElementById('activeAasBadge');

  // Employee Category Radios
  const employeeTypeRadios = document.querySelectorAll('input[name="employeeType"]');
  const labelCps = document.getElementById('labelCps');
  const labelGpf = document.getElementById('labelGpf');

  // Duration & Months Elements
  const monthsInput = document.getElementById('monthsInput');
  const durationChips = document.getElementById('durationChips');
  const totalMonthsBadge = document.getElementById('totalMonthsBadge');
  const periodDatesBadge = document.getElementById('periodDatesBadge');

  // Surrender Leave Elements (Multi-year: 2024, 2025, 2026)
  const surrenderAmountDisplay = document.getElementById('surrenderAmountDisplay');
  const activeSurrenderBadge = document.getElementById('activeSurrenderBadge');
  const badgeSurr2024 = document.getElementById('badgeSurr2024');
  const badgeSurr2025 = document.getElementById('badgeSurr2025');
  const badgeSurr2026 = document.getElementById('badgeSurr2026');
  const subtextSurr2024 = document.getElementById('subtextSurr2024');
  const subtextSurr2025 = document.getElementById('subtextSurr2025');
  const subtextSurr2026 = document.getElementById('subtextSurr2026');

  // Hero Banner Displays
  const heroGrossLabel = document.getElementById('heroGrossLabel');
  const heroMonthlyDiff = document.getElementById('heroMonthlyDiff');
  const heroNetCash = document.getElementById('heroNetCash');
  const heroBasicDisplay = document.getElementById('heroBasicDisplay');
  const heroDurationBadge = document.getElementById('heroDurationBadge');
  const heroNetLabel = document.getElementById('heroNetLabel');

  // Metric Boxes
  const metricBasic = document.getElementById('metricBasic');
  const metricDrawnDA = document.getElementById('metricDrawnDA');
  const metricDa1 = document.getElementById('metricDa1');
  const metricDa2 = document.getElementById('metricDa2');
  const metricDiff = document.getElementById('metricDiff');
  const metricSurrender = document.getElementById('metricSurrender');
  const metricSurrenderFootnote = document.getElementById('metricSurrenderFootnote');
  const metricNet = document.getElementById('metricNet');

  // Arrears Summary Box Rows
  const arrearsBadge = document.getElementById('arrearsBadge');
  const arrDa1DiffRow = document.getElementById('arrDa1DiffRow');
  const arrDa1MonthlyDiff = document.getElementById('arrDa1MonthlyDiff');
  const arrDa2DiffRow = document.getElementById('arrDa2DiffRow');
  const arrDa2MonthlyDiff = document.getElementById('arrDa2MonthlyDiff');
  const arrDurationText = document.getElementById('arrDurationText');
  const arrDa1Total = document.getElementById('arrDa1Total');
  const arrDa2Total = document.getElementById('arrDa2Total');
  const arrPreIncrRow = document.getElementById('arrPreIncrRow');
  const arrPreIncrLabel = document.getElementById('arrPreIncrLabel');
  const arrPreIncrVal = document.getElementById('arrPreIncrVal');
  const arrPostIncrRow = document.getElementById('arrPostIncrRow');
  const arrPostIncrLabel = document.getElementById('arrPostIncrLabel');
  const arrPostIncrVal = document.getElementById('arrPostIncrVal');
  const arrSurrenderRow = document.getElementById('arrSurrenderRow');
  const arrSurrenderLabel = document.getElementById('arrSurrenderLabel');
  const arrSurrenderVal = document.getElementById('arrSurrenderVal');
  const arrTotalGross = document.getElementById('arrTotalGross');
  const arrCpsRow = document.getElementById('arrCpsRow');
  const arrTotalCPS = document.getElementById('arrTotalCPS');
  const arrNetTitle = document.getElementById('arrNetTitle');
  const arrTotalNet = document.getElementById('arrTotalNet');

  // Month-Wise Table Elements
  const monthWiseTableBody = document.getElementById('monthWiseTableBody');
  const monthWiseTableFoot = document.getElementById('monthWiseTableFoot');
  const tablePeriodBadge = document.getElementById('tablePeriodBadge');
  const thCpsCol = document.getElementById('thCpsCol');
  const thNetCol = document.getElementById('thNetCol');
  const btnTablePrint = document.getElementById('btnTablePrint');

  // Action Buttons
  const btnPrint = document.getElementById('btnPrint');
  const btnCopy = document.getElementById('btnCopy');
  const btnReset = document.getElementById('btnReset');
  const toast = document.getElementById('toast');

  // Application State
  let currentMonths = 33; // Default: Jan-2024 to Sep-2026
  let currentDaMode = 'BOTH'; // 'BOTH', 'DA1_ONLY', 'DA2_ONLY'
  let selectedIncrIdx = '0'; // Default: Jan-24 (0)
  let agiAutoRecur = true;
  let selectedAasIdx = 'none'; // 'none' or 0-32
  let selectedAasDate = 1;

  // Year-wise Surrender Leave state for 2024, 2025, and 2026
  const surrenderYears = {
    2024: { days: 0, monthIdx: null },
    2025: { days: 0, monthIdx: null },
    2026: { days: 0, monthIdx: null }
  };

  // 33-Month labels from Jan-2024 to Sep-2026
  const month32Names = [
    'Jan-2024', 'Feb-2024', 'Mar-2024', 'Apr-2024', 'May-2024', 'Jun-2024',
    'Jul-2024', 'Aug-2024', 'Sep-2024', 'Oct-2024', 'Nov-2024', 'Dec-2024',
    'Jan-2025', 'Feb-2025', 'Mar-2025', 'Apr-2025', 'May-2025', 'Jun-2025',
    'Jul-2025', 'Aug-2025', 'Sep-2025', 'Oct-2025', 'Nov-2025', 'Dec-2025',
    'Jan-2026', 'Feb-2026', 'Mar-2026', 'Apr-2026', 'May-2026', 'Jun-2026',
    'Jul-2026', 'Aug-2026', 'Sep-2026'
  ];

  // Number of days in each of the 33 months (2024 is a leap year: Feb has 29)
  function getDaysInMonth(monthIdx) {
    const days = [
      31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, // 2024
      31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, // 2025
      31, 28, 31, 30, 31, 30, 31, 31, 30               // 2026 (Jan to Sep)
    ];
    return days[monthIdx] || 30;
  }

  // Ordinal suffix helper: 1st, 2nd, 3rd, 4th...
  function getOrdinalSuffix(n) {
    const j = n % 10, k = n % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
  }

  // Update AAS date badge display
  function updateAasDateBadge(monthName, totalDays) {
    if (!activeAasDateBadge) return;
    if (selectedAasDate === 1) {
      activeAasDateBadge.textContent = `1st ${monthName} (Full Month Effect)`;
    } else {
      const postDays = totalDays - selectedAasDate + 1;
      activeAasDateBadge.textContent = `${selectedAasDate}${getOrdinalSuffix(selectedAasDate)} ${monthName} (${postDays}d Post)`;
    }
  }

  // Render AAS Date Chips (1 to 28/29/30/31) dynamically when month is selected
  function renderAasDateChips(monthIdx) {
    if (!aasDateChips || monthIdx === 'none') {
      if (aasDateSection) aasDateSection.style.display = 'none';
      return;
    }
    const mIdx = parseInt(monthIdx);
    if (isNaN(mIdx) || mIdx < 0 || mIdx > 32) {
      if (aasDateSection) aasDateSection.style.display = 'none';
      return;
    }

    const totalDays = getDaysInMonth(mIdx);
    const monthName = month32Names[mIdx] || '';

    if (aasDateSection) aasDateSection.style.display = 'block';
    if (aasDateTitle) aasDateTitle.textContent = `📅 Select AAS Sanction Date in ${monthName}:`;

    if (selectedAasDate > totalDays) selectedAasDate = totalDays;
    if (selectedAasDate < 1) selectedAasDate = 1;

    // Populate chips
    aasDateChips.innerHTML = '';
    for (let d = 1; d <= totalDays; d++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `aas-date-btn ${d === selectedAasDate ? 'active' : ''}`;
      btn.dataset.date = String(d);
      btn.textContent = String(d);
      btn.title = `${d}${getOrdinalSuffix(d)} ${monthName}`;
      aasDateChips.appendChild(btn);
    }

    // Populate dropdown
    if (aasDateSelect) {
      aasDateSelect.innerHTML = '';
      for (let d = 1; d <= totalDays; d++) {
        const opt = document.createElement('option');
        opt.value = String(d);
        const postDays = totalDays - d + 1;
        const preDays = d - 1;
        if (d === 1) {
          opt.textContent = `1st of ${monthName} (Full Month Post)`;
        } else {
          opt.textContent = `${d}${getOrdinalSuffix(d)} of ${monthName} (${preDays}d Pre + ${postDays}d Post)`;
        }
        if (d === selectedAasDate) opt.selected = true;
        aasDateSelect.appendChild(opt);
      }
    }

    updateAasDateBadge(monthName, totalDays);

    // Scroll active date chip into view
    const activeChip = aasDateChips.querySelector(`.aas-date-btn[data-date="${selectedAasDate}"]`);
    if (activeChip) {
      activeChip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  // Populate Basic Pay Select Dropdown (September 2026 Pay Basis)
  function populateBasicSelect(records = DA_RECORDS) {
    const selectedVal = basicSelect.value || '20280';
    basicSelect.innerHTML = '';

    records.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.basic;
      const bStages = getBackwardPayStages(r.basic);
      if (bStages.pay2026 !== bStages.pay2025) {
        opt.textContent = `₹${r.basic.toLocaleString('en-IN')} (2025: ₹${bStages.pay2025.toLocaleString('en-IN')} | 2024: ₹${bStages.pay2024.toLocaleString('en-IN')})`;
      } else {
        opt.textContent = `₹${r.basic.toLocaleString('en-IN')} (At Min Scale)`;
      }
      basicSelect.appendChild(opt);
    });

    if (records.some(r => String(r.basic) === String(selectedVal))) {
      basicSelect.value = selectedVal;
    } else if (records.some(r => String(r.basic) === '20280')) {
      basicSelect.value = '20280';
    } else if (records.length > 0) {
      basicSelect.value = records[0].basic;
    }
  }

  populateBasicSelect();

  // Search Filter for Basic Pay
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      populateBasicSelect();
      return;
    }
    const filtered = DA_RECORDS.filter(r => String(r.basic).includes(query));
    populateBasicSelect(filtered);
    if (filtered.length > 0) {
      basicSelect.value = filtered[0].basic;
      updateCalculations();
    }
  });

  basicSelect.addEventListener('change', () => {
    updateCalculations();
  });

  // Custom Basic Pay Checkbox
  customPayCheck.addEventListener('change', () => {
    if (customPayCheck.checked) {
      customPayWrapper.style.display = 'block';
      basicSelect.disabled = true;
      searchInput.disabled = true;
      if (!customPayInput.value) {
        customPayInput.value = basicSelect.value;
      }
    } else {
      customPayWrapper.style.display = 'none';
      basicSelect.disabled = false;
      searchInput.disabled = false;
    }
    updateCalculations();
  });

  customPayInput.addEventListener('input', () => {
    updateCalculations();
  });

  // Populate TS Cumulative DA Table
  function populateTsCumulativeDA() {
    if (!tsCumulativeTableBody) return;
    tsCumulativeTableBody.innerHTML = '';

    TS_CUMULATIVE_DA_TABLE.forEach(row => {
      const tr = document.createElement('tr');
      if (row.period === 'Jan-24' || row.period === 'Jul-24') {
        tr.style.background = row.period === 'Jan-24' ? '#ecfdf5' : '#eff6ff';
        tr.style.fontWeight = 'bold';
      }
      tr.innerHTML = `
        <td style="padding: 5px 6px; border-bottom: 1px solid #e2e8f0;">${row.period}${row.daCount ? ` (<strong>${row.daCount}</strong>)` : ''}</td>
        <td style="padding: 5px 6px; border-bottom: 1px solid #e2e8f0; text-align: right;">${row.incr > 0 ? `+${row.incr}%` : '-'}</td>
        <td style="padding: 5px 6px; border-bottom: 1px solid #e2e8f0; text-align: right; color: ${row.period === 'Jul-24' ? '#1d4ed8' : '#047857'}; font-weight: 700;">${row.cumulative}%</td>
        <td style="padding: 5px 6px; border-bottom: 1px solid #e2e8f0; font-size: 0.72rem; color: #475569;">${row.remarks}</td>
      `;
      tsCumulativeTableBody.appendChild(tr);
    });
  }

  populateTsCumulativeDA();

  // Reference Table Accordion
  if (tsTableToggle && tsTableContent) {
    tsTableToggle.addEventListener('click', () => {
      const isHidden = tsTableContent.style.display === 'none' || !tsTableContent.style.display;
      tsTableContent.style.display = isHidden ? 'block' : 'none';
      tsTableArrow.textContent = isHidden ? '▲' : '▼';
    });
  }

  // DA Mode Selection Handling
  daModeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      currentDaMode = radio.value;
      [labelModeBoth, labelModeDa1, labelModeDa2].forEach(l => {
        if (l) l.classList.remove('active');
      });
      if (radio.closest('.radio-card')) {
        radio.closest('.radio-card').classList.add('active');
      }
      updateCalculations();
    });
  });

  // Custom DA Checkbox Toggle
  if (customDaCheck && customDaInputsWrapper) {
    customDaCheck.addEventListener('change', () => {
      customDaInputsWrapper.style.display = customDaCheck.checked ? 'block' : 'none';
    });
  }

  // Custom DA inputs listeners
  [customDrawnRate, customDa1Rate, customDa2Rate].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => {
        updateCalculations();
      });
    }
  });

  // Employee Category Radio Change
  employeeTypeRadios.forEach(r => {
    r.addEventListener('change', () => {
      employeeTypeRadios.forEach(rb => {
        const card = rb.closest('.radio-card');
        if (card) card.classList.remove('active');
      });
      const activeCard = r.closest('.radio-card');
      if (activeCard) activeCard.classList.add('active');
      updateCalculations();
    });
  });

  // Duration Presets & Input
  durationChips.addEventListener('click', (e) => {
    const btn = e.target.closest('.month-btn');
    if (!btn) return;
    durationChips.querySelectorAll('.month-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMonths = parseInt(btn.dataset.months) || 33;
    monthsInput.value = currentMonths;
    updateCalculations();
  });

  monthsInput.addEventListener('input', () => {
    let val = parseInt(monthsInput.value) || 1;
    if (val < 1) val = 1;
    if (val > 120) val = 120;
    currentMonths = val;

    durationChips.querySelectorAll('.month-btn').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.months) === val);
    });
    updateCalculations();
  });

  // Increment Month Selection (Chips)
  if (incrChips) {
    incrChips.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip-btn');
      if (!btn) return;
      incrChips.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedIncrIdx = btn.dataset.incr;
      if (incrMonthSelect) incrMonthSelect.value = selectedIncrIdx;
      updateCalculations();
    });
  }

  // Increment Dropdown
  if (incrMonthSelect) {
    incrMonthSelect.addEventListener('change', () => {
      selectedIncrIdx = incrMonthSelect.value;
      if (incrChips) {
        incrChips.querySelectorAll('.chip-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.incr === selectedIncrIdx);
        });
        const activeBtn = incrChips.querySelector(`.chip-btn[data-incr="${selectedIncrIdx}"]`);
        if (activeBtn) {
          activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
      updateCalculations();
    });
  }

  // Auto-recur checkbox
  if (agiAutoRecurCheck) {
    agiAutoRecurCheck.addEventListener('change', () => {
      agiAutoRecur = agiAutoRecurCheck.checked;
      updateCalculations();
    });
  }

  // AAS Month Chips
  if (aasChips) {
    aasChips.addEventListener('click', (e) => {
      const btn = e.target.closest('.aas-btn');
      if (!btn) return;
      aasChips.querySelectorAll('.aas-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedAasIdx = btn.dataset.aas;
      if (aasMonthSelect) aasMonthSelect.value = selectedAasIdx;
      renderAasDateChips(selectedAasIdx);
      updateCalculations();
    });
  }

  // AAS Dropdown
  if (aasMonthSelect) {
    aasMonthSelect.addEventListener('change', () => {
      selectedAasIdx = aasMonthSelect.value;
      if (aasChips) {
        aasChips.querySelectorAll('.aas-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.aas === selectedAasIdx);
        });
        const activeBtn = aasChips.querySelector(`.aas-btn[data-aas="${selectedAasIdx}"]`);
        if (activeBtn) {
          activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
      renderAasDateChips(selectedAasIdx);
      updateCalculations();
    });
  }

  // AAS Date Chips
  if (aasDateChips) {
    aasDateChips.addEventListener('click', (e) => {
      const btn = e.target.closest('.aas-date-btn');
      if (!btn) return;
      aasDateChips.querySelectorAll('.aas-date-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedAasDate = parseInt(btn.dataset.date) || 1;
      if (aasDateSelect) aasDateSelect.value = String(selectedAasDate);

      const mIdx = parseInt(selectedAasIdx);
      if (!isNaN(mIdx) && mIdx >= 0 && mIdx < 32) {
        updateAasDateBadge(month32Names[mIdx], getDaysInMonth(mIdx));
      }
      updateCalculations();
    });
  }

  // AAS Date Dropdown
  if (aasDateSelect) {
    aasDateSelect.addEventListener('change', () => {
      selectedAasDate = parseInt(aasDateSelect.value) || 1;
      if (aasDateChips) {
        aasDateChips.querySelectorAll('.aas-date-btn').forEach(b => {
          b.classList.toggle('active', parseInt(b.dataset.date) === selectedAasDate);
        });
        const activeBtn = aasDateChips.querySelector(`.aas-date-btn[data-date="${selectedAasDate}"]`);
        if (activeBtn) {
          activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
      const mIdx = parseInt(selectedAasIdx);
      if (!isNaN(mIdx) && mIdx >= 0 && mIdx < 33) {
        updateAasDateBadge(month32Names[mIdx], getDaysInMonth(mIdx));
      }
      updateCalculations();
    });
  }

  // Generic setup for horizontal scrolling with arrow buttons and wheel
  function setupScrollStrip(container, prevBtn, nextBtn) {
    if (!container) return;
    const SCROLL_AMOUNT = 180;

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        container.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        container.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
      });
    }

    container.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }

  setupScrollStrip(incrChips, document.querySelector('.incr-scroll-prev'), document.querySelector('.incr-scroll-next'));
  setupScrollStrip(aasChips, document.querySelector('.aas-scroll-prev'), document.querySelector('.aas-scroll-next'));
  setupScrollStrip(aasDateChips, aasDatePrev, aasDateNext);

  // Multi-Year Surrender Leave Setup (2024, 2025, 2026)
  function setupSurrenderYear(year, defaultMonthIdx) {
    const daysGroup = document.getElementById(`surrDays${year}`);
    const chipsStrip = document.getElementById(`surrChips${year}`);
    const prevBtn = document.querySelector(`.surr-prev-${year}`);
    const nextBtn = document.querySelector(`.surr-next-${year}`);

    setupScrollStrip(chipsStrip, prevBtn, nextBtn);

    if (daysGroup) {
      daysGroup.addEventListener('click', (e) => {
        const btn = e.target.closest('.surr-day-btn');
        if (!btn) return;

        daysGroup.querySelectorAll('.surr-day-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const days = parseInt(btn.dataset.days) || 0;
        surrenderYears[year].days = days;

        if (days === 0) {
          surrenderYears[year].monthIdx = null;
          if (chipsStrip) {
            chipsStrip.querySelectorAll('.surrender-month-btn').forEach(b => {
              b.classList.toggle('active', b.dataset.smonth === 'none');
            });
          }
        } else {
          if (surrenderYears[year].monthIdx === null) {
            surrenderYears[year].monthIdx = defaultMonthIdx;
          }
          if (chipsStrip) {
            chipsStrip.querySelectorAll('.surrender-month-btn').forEach(b => {
              b.classList.toggle('active', parseInt(b.dataset.smonth) === surrenderYears[year].monthIdx);
            });
            const activeBtn = chipsStrip.querySelector(`.surrender-month-btn[data-smonth="${surrenderYears[year].monthIdx}"]`);
            if (activeBtn) {
              activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
          }
        }
        updateCalculations();
      });
    }

    if (chipsStrip) {
      chipsStrip.addEventListener('click', (e) => {
        const btn = e.target.closest('.surrender-month-btn');
        if (!btn) return;

        const rawMonth = btn.dataset.smonth;
        if (rawMonth === 'none') {
          surrenderYears[year].days = 0;
          surrenderYears[year].monthIdx = null;
          if (daysGroup) {
            daysGroup.querySelectorAll('.surr-day-btn').forEach(b => {
              b.classList.toggle('active', b.dataset.days === '0');
            });
          }
          chipsStrip.querySelectorAll('.surrender-month-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.smonth === 'none');
          });
        } else {
          const mIdx = parseInt(rawMonth);
          surrenderYears[year].monthIdx = mIdx;
          if (surrenderYears[year].days === 0) {
            surrenderYears[year].days = 15;
          }
          if (daysGroup) {
            daysGroup.querySelectorAll('.surr-day-btn').forEach(b => {
              b.classList.toggle('active', parseInt(b.dataset.days) === surrenderYears[year].days);
            });
          }
          chipsStrip.querySelectorAll('.surrender-month-btn').forEach(b => {
            b.classList.toggle('active', parseInt(b.dataset.smonth) === mIdx);
          });
          btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
        updateCalculations();
      });
    }
  }

  setupSurrenderYear(2024, 0);   // Jan-24 default
  setupSurrenderYear(2025, 12);  // Jan-25 default
  setupSurrenderYear(2026, 24);  // Jan-26 default

  // MAIN CALCULATION ENGINE WITH 2 DAs SUPPORT
  function updateCalculations() {
    let sep26Pay = 20280;
    if (customPayCheck && customPayCheck.checked) {
      sep26Pay = Number(customPayInput.value) || 20280;
    } else if (basicSelect) {
      sep26Pay = Number(basicSelect.value) || 20280;
    }

    // Backward stages
    const backwardStages = getBackwardPayStages(sep26Pay);
    const pay2026 = backwardStages.pay2026;
    const pay2025 = backwardStages.pay2025;
    const pay2024 = backwardStages.pay2024;
    const prePay2024 = getPrevPayStage(pay2024).prevBasic;

    // Backward pay cards in UI
    if (dispPay2026) dispPay2026.textContent = formatINR(pay2026);
    if (dispPay2025) dispPay2025.textContent = formatINR(pay2025);
    if (dispPay2024) dispPay2024.textContent = formatINR(pay2024);
    if (dispDecr2025) dispDecr2025.textContent = backwardStages.decr2025 > 0 ? `-₹${backwardStages.decr2025.toLocaleString('en-IN')} (1 ఇంక్రిమెంట్ వెనక్కి)` : 'కనీస స్కేల్ వద్ద ఉంది';
    if (dispDecr2024) dispDecr2024.textContent = backwardStages.decr2024 > 0 ? `-₹${backwardStages.decr2024.toLocaleString('en-IN')} (2 ఇంక్రిమెంట్లు వెనక్కి)` : 'కనీస స్కేల్ వద్ద ఉంది';

    // Active Rates
    const drawnRateVal = parseFloat(customDrawnRate ? customDrawnRate.value : '33.67') || 33.67;
    const da1RateVal = parseFloat(customDa1Rate ? customDa1Rate.value : '37.31') || 37.31;
    const da2RateVal = parseFloat(customDa2Rate ? customDa2Rate.value : '40.04') || 40.04;

    const diff1Rate = +( (da1RateVal - drawnRateVal).toFixed(2) );       // +3.64%
    const diff2Rate = +( (da2RateVal - da1RateVal).toFixed(2) );         // +2.73%
    const totalDiffRate = +( (da2RateVal - drawnRateVal).toFixed(2) );   // +6.37%

    // Update Header and Cards
    if (headerDrawnDaDisplay) headerDrawnDaDisplay.textContent = `${drawnRateVal}%`;
    if (headerDa1Display) headerDa1Display.textContent = `${da1RateVal}% (+${diff1Rate}%)`;
    if (headerDa2Display) headerDa2Display.textContent = `${da2RateVal}% (+${diff2Rate}%)`;

    if (dispDa1Rate) dispDa1Rate.textContent = `${da1RateVal}%`;
    if (dispDa1Diff) dispDa1Diff.textContent = `+${diff1Rate}%`;
    if (dispDa2Rate) dispDa2Rate.textContent = `${da2RateVal}%`;
    if (dispDaTotalDiff) dispDaTotalDiff.textContent = `+${totalDiffRate}%`;

    // Dynamic difference formula text depending on mode
    if (currentDaMode === 'DA1_ONLY') {
      if (headerDiffDisplay) headerDiffDisplay.textContent = `+${diff1Rate}%`;
      if (calculatedDiffBadge) calculatedDiffBadge.textContent = `+${diff1Rate}% (1st DA Only)`;
      if (diffFormulaText) diffFormulaText.textContent = `(${da1RateVal}% - ${drawnRateVal}% = +${diff1Rate}%)`;
    } else if (currentDaMode === 'DA2_ONLY') {
      if (headerDiffDisplay) headerDiffDisplay.textContent = `+${diff2Rate}%`;
      if (calculatedDiffBadge) calculatedDiffBadge.textContent = `+${diff2Rate}% (2nd DA w.e.f Jul-24)`;
      if (diffFormulaText) diffFormulaText.textContent = `(${da2RateVal}% - ${da1RateVal}% = +${diff2Rate}% over 1st DA)`;
    } else { // BOTH
      if (headerDiffDisplay) headerDiffDisplay.textContent = `+${totalDiffRate}%`;
      if (calculatedDiffBadge) calculatedDiffBadge.textContent = `Jan-Jun 24: +${diff1Rate}% | Jul 24 onwards: +${totalDiffRate}%`;
      if (diffFormulaText) diffFormulaText.textContent = `(Jan-Jun 24: ${da1RateVal}% - ${drawnRateVal}% = +${diff1Rate}% | Jul 24+: ${da2RateVal}% - ${drawnRateVal}% = +${totalDiffRate}%)`;
    }

    const employeeType = document.querySelector('input[name="employeeType"]:checked').value;
    const isCPS = employeeType === 'CPS';

    const hasAgi = selectedIncrIdx !== 'none';
    const incrStartIdx = hasAgi ? parseInt(selectedIncrIdx) : 0;
    const incrMonthOfYear = hasAgi ? (incrStartIdx % 12) : 0;
    const hasAas = selectedAasIdx !== 'none';
    const aasIdx = hasAas ? parseInt(selectedAasIdx) : -1;

    // Active Surrender Leaves
    const activeSurrenders = [];
    [2024, 2025, 2026].forEach(yr => {
      const cfg = surrenderYears[yr];
      if (cfg && cfg.days > 0 && cfg.monthIdx !== null && cfg.monthIdx >= 0 && cfg.monthIdx < 33) {
        activeSurrenders.push({
          year: yr,
          days: cfg.days,
          monthIdx: cfg.monthIdx,
          monthName: month32Names[cfg.monthIdx]
        });
      }
    });

    // Helper to determine base pay for month index i before AAS
    function getMonthBasePay(i) {
      const year = 2024 + Math.floor(i / 12);
      const m = i % 12;

      if (!hasAgi) {
        if (year === 2024) return pay2024;
        if (year === 2025) return pay2025;
        return pay2026;
      }

      if (agiAutoRecur) {
        if (year === 2024) {
          return m >= incrMonthOfYear ? pay2024 : prePay2024;
        } else if (year === 2025) {
          return m >= incrMonthOfYear ? pay2025 : pay2024;
        } else {
          return m >= incrMonthOfYear ? pay2026 : pay2025;
        }
      } else {
        return i < incrStartIdx ? pay2024 : pay2025;
      }
    }

    // Monthly breakdown calculation
    const monthlyBreakdown = [];
    let grandDa1DiffTotal = 0;
    let grandDa2DiffTotal = 0;
    let grandGrossTotal = 0;

    for (let i = 0; i < currentMonths; i++) {
      const basePay = getMonthBasePay(i);
      let monthBasic = basePay;
      let rowDrawnDA = 0;
      let rowDa1 = 0;
      let rowDa2 = 0;
      let diff1 = 0;
      let diff2 = 0;
      let rowGrossDiff = 0;
      let activeDaRate = da1RateVal;
      const remarks = [];

      const year = 2024 + Math.floor(i / 12);
      const m = i % 12;

      // Increment remarks
      if (hasAgi && agiAutoRecur) {
        if (m === incrMonthOfYear) {
          if (year === 2024) remarks.push('🎉 2024 Increment');
          else if (year === 2025) remarks.push('🎉 2025 Increment (+1 Stage)');
          else if (year === 2026) remarks.push('🎉 2026 Increment (Sep-26 Stage)');
        }
      } else if (hasAgi && !agiAutoRecur && i === incrStartIdx) {
        remarks.push('🎉 Annual Grade Increment');
      }

      // Check AAS with pro-rata sanction date effect
      if (hasAas && i >= aasIdx) {
        const postAasBasic = getNextPayStage(basePay).nextBasic;

        if (i === aasIdx && selectedAasDate > 1) {
          const daysInMonth = getDaysInMonth(i);
          const preDays = Math.max(0, selectedAasDate - 1);
          const postDays = Math.max(0, daysInMonth - preDays);

          const preDrawn = Math.round(basePay * (drawnRateVal / 100));
          const postDrawn = Math.round(postAasBasic * (drawnRateVal / 100));
          const preDa1 = Math.round(basePay * (da1RateVal / 100));
          const postDa1 = Math.round(postAasBasic * (da1RateVal / 100));
          const preDa2 = Math.round(basePay * (da2RateVal / 100));
          const postDa2 = Math.round(postAasBasic * (da2RateVal / 100));

          rowDrawnDA = Math.round((preDrawn * preDays + postDrawn * postDays) / daysInMonth);
          rowDa1 = Math.round((preDa1 * preDays + postDa1 * postDays) / daysInMonth);
          rowDa2 = Math.round((preDa2 * preDays + postDa2 * postDays) / daysInMonth);
          monthBasic = Math.round((basePay * preDays + postAasBasic * postDays) / daysInMonth);

          remarks.push(`🎖️ AAS from ${selectedAasDate}-${month32Names[i].slice(0, 3)} (${preDays}d Pre + ${postDays}d Post)`);
        } else {
          monthBasic = postAasBasic;
          rowDrawnDA = Math.round(monthBasic * (drawnRateVal / 100));
          rowDa1 = Math.round(monthBasic * (da1RateVal / 100));
          rowDa2 = Math.round(monthBasic * (da2RateVal / 100));
          if (i === aasIdx) {
            remarks.push('🎖️ AAS Scheme (+1 Incr)');
          }
        }
      } else {
        rowDrawnDA = Math.round(monthBasic * (drawnRateVal / 100));
        rowDa1 = Math.round(monthBasic * (da1RateVal / 100));
        rowDa2 = Math.round(monthBasic * (da2RateVal / 100));
      }

      diff1 = rowDa1 - rowDrawnDA;
      diff2 = rowDa2 - rowDa1;

      // 2 DAs Logic by period and mode
      if (currentDaMode === 'DA1_ONLY') {
        activeDaRate = da1RateVal;
        rowGrossDiff = diff1;
        grandDa1DiffTotal += diff1;
        grandGrossTotal += diff1;
        remarks.push('1st DA (+3.64%)');
      } else if (currentDaMode === 'DA2_ONLY') {
        if (i < 6) {
          activeDaRate = drawnRateVal;
          rowGrossDiff = 0;
          diff1 = 0;
          diff2 = 0;
          remarks.push('Prior to 2nd DA (w.e.f Jul-24)');
        } else {
          activeDaRate = da2RateVal;
          rowGrossDiff = diff2;
          grandDa2DiffTotal += diff2;
          grandGrossTotal += diff2;
          if (i === 6) remarks.push('🚀 2nd DA Effective (+2.73%)');
          else remarks.push('2nd DA (+2.73%)');
        }
      } else { // BOTH
        if (i < 6) {
          activeDaRate = da1RateVal;
          rowGrossDiff = diff1;
          grandDa1DiffTotal += diff1;
          grandGrossTotal += diff1;
          remarks.push('1st DA (+3.64%)');
        } else {
          activeDaRate = da2RateVal;
          rowGrossDiff = rowDa2 - rowDrawnDA; // exactly diff1 + diff2
          grandDa1DiffTotal += diff1;
          grandDa2DiffTotal += diff2;
          grandGrossTotal += rowGrossDiff;
          if (i === 6) remarks.push('🎯 2nd DA Effective (+6.37% Total = 3.64% + 2.73%)');
          else remarks.push('2 DAs (+6.37%)');
        }
      }

      // Check surrender leave in this month
      activeSurrenders.forEach(s => {
        if (s.monthIdx === i) {
          remarks.push(`🏖️ Surrender ${s.year} (+${s.days}d)`);
        }
      });

      const rowCPS = isCPS ? Math.round(rowGrossDiff * 0.10) : 0;
      const rowNet = rowGrossDiff - rowCPS;

      monthlyBreakdown.push({
        monthIdx: i,
        monthName: month32Names[i] || `Month-${i + 1}`,
        basicPay: monthBasic,
        drawnDA: rowDrawnDA,
        sanctionedDA: (activeDaRate === da1RateVal ? rowDa1 : (activeDaRate === da2RateVal ? rowDa2 : rowDrawnDA)),
        sanctionedRate: activeDaRate,
        diff1: (currentDaMode === 'DA2_ONLY' ? 0 : diff1),
        diff2: (i < 6 || currentDaMode === 'DA1_ONLY' ? 0 : diff2),
        grossDiff: rowGrossDiff,
        cps: rowCPS,
        net: rowNet,
        remark: remarks.join(' | ')
      });
    }

    // Multi-Year Surrender Leave Calculations
    let totalSurrenderExtra = 0;
    let totalSurrenderDa1Part = 0;
    let totalSurrenderDa2Part = 0;
    const computedSurrenders = [];

    [2024, 2025, 2026].forEach(yr => {
      const cfg = surrenderYears[yr];
      const badgeEl = document.getElementById(`badgeSurr${yr}`);
      const subtextEl = document.getElementById(`subtextSurr${yr}`);

      if (cfg && cfg.days > 0 && cfg.monthIdx !== null && cfg.monthIdx >= 0 && cfg.monthIdx < 32) {
        const mIdx = cfg.monthIdx;
        const mName = month32Names[mIdx];
        const surrBase = getMonthBasePay(mIdx);
        const surrBasic = (hasAas && mIdx >= aasIdx) ? getNextPayStage(surrBase).nextBasic : surrBase;

        const surrDrawn = Math.round(surrBasic * (drawnRateVal / 100));
        const surrDa1 = Math.round(surrBasic * (da1RateVal / 100));
        const surrDa2 = Math.round(surrBasic * (da2RateVal / 100));

        const sDiff1 = surrDa1 - surrDrawn;
        const sDiff2 = surrDa2 - surrDa1;
        const mult = cfg.days === 15 ? 0.5 : 1.0;

        let sExtra = 0;
        let sPart1 = 0;
        let sPart2 = 0;

        if (currentDaMode === 'DA1_ONLY') {
          sExtra = Math.round(sDiff1 * mult);
          sPart1 = sExtra;
        } else if (currentDaMode === 'DA2_ONLY') {
          if (mIdx >= 6) {
            sExtra = Math.round(sDiff2 * mult);
            sPart2 = sExtra;
          }
        } else { // BOTH
          if (mIdx < 6) {
            sExtra = Math.round(sDiff1 * mult);
            sPart1 = sExtra;
          } else {
            sPart1 = Math.round(sDiff1 * mult);
            sPart2 = Math.round(sDiff2 * mult);
            sExtra = Math.round((surrDa2 - surrDrawn) * mult);
          }
        }

        totalSurrenderExtra += sExtra;
        totalSurrenderDa1Part += sPart1;
        totalSurrenderDa2Part += sPart2;

        computedSurrenders.push({
          year: yr,
          days: cfg.days,
          monthIdx: mIdx,
          monthName: mName,
          basic: surrBasic,
          drawnDA: surrDrawn,
          da1: surrDa1,
          da2: surrDa2,
          diff1: sPart1,
          diff2: sPart2,
          extra: sExtra
        });

        if (badgeEl) {
          badgeEl.textContent = `${cfg.days} Days (${mName} • +${formatINR(sExtra)})`;
          badgeEl.style.background = '#fef3c7';
          badgeEl.style.color = '#78350f';
        }
        if (subtextEl) {
          const rateNotice = mIdx < 6 ? `1st DA (+${diff1Rate}%)` : `2 DAs (+${totalDiffRate}%)`;
          subtextEl.textContent = `Encashed in ${mName} (${rateNotice}): +${formatINR(sExtra)} Arrears`;
        }
      } else {
        if (badgeEl) {
          badgeEl.textContent = `No Leave in ${yr}`;
          badgeEl.style.background = '#fef3c7';
          badgeEl.style.color = '#78350f';
        }
        if (subtextEl) {
          subtextEl.textContent = '';
        }
      }
    });

    const hasAnySurrender = computedSurrenders.length > 0;
    if (surrenderAmountDisplay) {
      if (hasAnySurrender) {
        const parts = computedSurrenders.map(s => `${s.year}: +${formatINR(s.extra)} (${s.days}d in ${s.monthName})`).join(' + ');
        surrenderAmountDisplay.textContent = `+${formatINR(totalSurrenderExtra)} (${parts})`;
      } else {
        surrenderAmountDisplay.textContent = '+₹0';
      }
    }
    if (activeSurrenderBadge) {
      if (hasAnySurrender) {
        activeSurrenderBadge.textContent = `${computedSurrenders.length} Year(s) (+${formatINR(totalSurrenderExtra)})`;
      } else {
        activeSurrenderBadge.textContent = 'No Surrender Leave';
      }
    }

    if (metricSurrender) metricSurrender.textContent = hasAnySurrender ? `+${formatINR(totalSurrenderExtra)}` : '₹0';
    if (metricSurrenderFootnote) metricSurrenderFootnote.textContent = hasAnySurrender ? `${computedSurrenders.length} Year(s) Encashed` : 'No surrender';

    // Total Gross, CPS, Net
    const totalGrossArrears = grandGrossTotal + totalSurrenderExtra;
    const finalDa1Total = grandDa1DiffTotal + totalSurrenderDa1Part;
    const finalDa2Total = grandDa2DiffTotal + totalSurrenderDa2Part;

    const totalCpsArrears = isCPS ? Math.round(totalGrossArrears * 0.10) : 0;
    const totalNetArrears = totalGrossArrears - totalCpsArrears;

    // Period Suffix
    const surrSuffix = hasAnySurrender
      ? ` + Surrender (${computedSurrenders.map(s => `${s.year}: ${s.days}d`).join(', ')})`
      : '';
    if (currentMonths === 33) {
      if (totalMonthsBadge) totalMonthsBadge.textContent = `Jan 2024 to Sep 2026 (33 Months)${surrSuffix}`;
      if (periodDatesBadge) periodDatesBadge.textContent = 'Jan-2024 to Sep-2026';
    } else {
      if (totalMonthsBadge) totalMonthsBadge.textContent = `${currentMonths} Months${surrSuffix}`;
      if (periodDatesBadge) periodDatesBadge.textContent = `${currentMonths} Months`;
    }

    // Hero Banner Updates
    if (heroGrossLabel) {
      heroGrossLabel.textContent = currentMonths > 1 ? `Total 2 DAs Arrears Difference (${currentMonths} Mo):` : 'Monthly 2 DAs Difference:';
    }
    if (heroMonthlyDiff) heroMonthlyDiff.textContent = formatINR(totalGrossArrears);
    if (heroNetLabel) heroNetLabel.textContent = isCPS ? 'Total Net Cash Payable (90%):' : 'Total GPF / Net Cash (100%):';
    if (heroNetCash) heroNetCash.textContent = formatINR(totalNetArrears);

    let payProgression = `2024: ${formatINR(pay2024)} ➔ 2025: ${formatINR(pay2025)} ➔ 2026: ${formatINR(pay2026)}`;
    if (hasAas) {
      const aasDateLabel = (selectedAasDate > 1) ? `${selectedAasDate}-${month32Names[aasIdx].slice(0, 3)}` : month32Names[aasIdx];
      payProgression += ` | AAS: ${aasDateLabel}`;
    }
    if (heroBasicDisplay) {
      heroBasicDisplay.textContent = `${payProgression} | 1st DA (${da1RateVal}%) & 2nd DA (${da2RateVal}%)`;
    }
    if (heroDurationBadge) heroDurationBadge.textContent = `${currentMonths} Months Arrears${surrSuffix}`;

    // Metrics Grid Updates
    const firstMonthData = monthlyBreakdown.length > 0 ? monthlyBreakdown[0] : null;
    const jul24MonthData = monthlyBreakdown.length > 6 ? monthlyBreakdown[6] : firstMonthData;

    if (metricBasic) metricBasic.textContent = formatINR(pay2026);
    if (metricDrawnDA) metricDrawnDA.textContent = formatINR(firstMonthData ? firstMonthData.drawnDA : Math.round(pay2024 * (drawnRateVal / 100)));
    if (metricDa1) metricDa1.textContent = formatINR(Math.round(pay2026 * (da1RateVal / 100)));
    if (metricDa2) metricDa2.textContent = formatINR(Math.round(pay2026 * (da2RateVal / 100)));
    if (metricDiff) {
      const activeMonthlyDiff = jul24MonthData ? jul24MonthData.grossDiff : 0;
      metricDiff.textContent = formatINR(activeMonthlyDiff);
    }
    if (metricNet) metricNet.textContent = formatINR(totalNetArrears);

    // Arrears Summary Box Updates
    if (arrearsBadge) arrearsBadge.textContent = `${currentMonths} Months${surrSuffix}`;
    if (arrDa1MonthlyDiff) arrDa1MonthlyDiff.textContent = `${formatINR(firstMonthData ? firstMonthData.diff1 : 0)} / mo`;
    if (arrDa2MonthlyDiff) arrDa2MonthlyDiff.textContent = `${formatINR(jul24MonthData ? jul24MonthData.grossDiff : 0)} / mo`;
    if (arrDurationText) arrDurationText.textContent = currentMonths === 33 ? '33 Months (Jan-2024 to Sep-2026)' : `${currentMonths} Months`;

    if (arrDa1Total) arrDa1Total.textContent = formatINR(finalDa1Total);
    if (arrDa2Total) arrDa2Total.textContent = formatINR(finalDa2Total);

    if (hasAnySurrender) {
      if (arrSurrenderRow) arrSurrenderRow.style.display = 'flex';
      const labelText = computedSurrenders.map(s => `${s.year} (${s.days}d in ${s.monthName})`).join(', ');
      if (arrSurrenderLabel) arrSurrenderLabel.textContent = `🏖️ Surrender (${labelText}):`;
      if (arrSurrenderVal) arrSurrenderVal.textContent = `+${formatINR(totalSurrenderExtra)}`;
    } else {
      if (arrSurrenderRow) arrSurrenderRow.style.display = 'none';
    }

    if (arrTotalGross) arrTotalGross.textContent = formatINR(totalGrossArrears);

    if (isCPS) {
      if (arrCpsRow) arrCpsRow.style.display = 'flex';
      if (arrTotalCPS) arrTotalCPS.textContent = formatINR(totalCpsArrears);
      if (arrNetTitle) arrNetTitle.textContent = 'Total Net Cash to Bank (90%):';
    } else {
      if (arrCpsRow) arrCpsRow.style.display = 'none';
      if (arrNetTitle) arrNetTitle.textContent = 'Total GPF / Net Cash (100%):';
    }
    if (arrTotalNet) arrTotalNet.textContent = formatINR(totalNetArrears);

    // AGI Info Card Update
    if (hasAgi) {
      const incrMonthName = month32Names[incrMonthOfYear];
      if (activeIncrBadge) {
        activeIncrBadge.textContent = agiAutoRecur
          ? `${incrMonthName} (Recurring 2024-2026)`
          : `${month32Names[incrStartIdx]} Increment`;
      }
      if (infoIncrMonthBadge) {
        infoIncrMonthBadge.textContent = agiAutoRecur
          ? `${incrMonthName} Recurring (${incrMonthName}-24, ${incrMonthName}-25, ${incrMonthName}-26)`
          : `${month32Names[incrStartIdx]} Increment`;
      }
      if (infoPreBasic) infoPreBasic.textContent = formatINR(pay2024);
      if (infoAGI) infoAGI.textContent = `+${formatINR(backwardStages.decr2024 || backwardStages.decr2025)}`;
      if (infoPostBasic) infoPostBasic.textContent = formatINR(pay2026);
      if (infoIncrSplit) {
        infoIncrSplit.textContent = agiAutoRecur
          ? `2024: ${formatINR(pay2024)} ➔ 2025: ${formatINR(pay2025)} ➔ 2026: ${formatINR(pay2026)}`
          : `From ${month32Names[incrStartIdx]}: ${formatINR(pay2025)}`;
      }

      if (infoAgiMilestonesContainer) {
        infoAgiMilestonesContainer.innerHTML = `
          <div class="incr-info-row" style="margin-top: 4px;">
            <span>🏁 2024 Base Pay:</span>
            <strong style="color: #0f172a;">${formatINR(pay2024)}</strong>
          </div>
          <div class="incr-info-row" style="margin-top: 4px;">
            <span>🎉 2025 Increment (${month32Names[12 + incrMonthOfYear]}):</span>
            <strong style="color: #0284c7;">${formatINR(pay2025)} <span style="font-size: 0.74rem; color: #0284c7; font-weight: normal;">(+${formatINR(backwardStages.decr2024)})</span></strong>
          </div>
          <div class="incr-info-row" style="margin-top: 4px;">
            <span>🎯 2026 Increment (${month32Names[24 + incrMonthOfYear]} - Sep 2026 Pay):</span>
            <strong style="color: #047857;">${formatINR(pay2026)} <span style="font-size: 0.74rem; color: #059669; font-weight: normal;">(+${formatINR(backwardStages.decr2025)})</span></strong>
          </div>
        `;
      }
      if (incrInfoCard) incrInfoCard.style.display = 'block';
    } else {
      if (activeIncrBadge) activeIncrBadge.textContent = 'No Increment';
      if (incrInfoCard) incrInfoCard.style.display = 'none';
      if (infoAgiMilestonesContainer) infoAgiMilestonesContainer.innerHTML = '';
    }

    // AAS Info Card Update
    if (hasAas) {
      const preAasBase = getMonthBasePay(aasIdx);
      const postAasBase = getNextPayStage(preAasBase).nextBasic;
      const aasIncrDiff = postAasBase - preAasBase;
      const aasMonthName = month32Names[aasIdx] || 'AAS';
      const daysInAasMonth = getDaysInMonth(aasIdx);
      const preDays = Math.max(0, selectedAasDate - 1);
      const postDays = Math.max(0, daysInAasMonth - preDays);

      if (selectedAasDate === 1) {
        if (activeAasBadge) activeAasBadge.textContent = `${aasMonthName} AAS`;
        if (infoAasMonthBadge) infoAasMonthBadge.textContent = `${aasMonthName} AAS (+1 Incr)`;
        if (infoAasDateRow) infoAasDateRow.style.display = 'none';
        if (infoAasProrataRow) infoAasProrataRow.style.display = 'none';
        if (infoAasSplit) {
          const aasActiveMonths = Math.max(0, currentMonths - aasIdx);
          infoAasSplit.textContent = `${aasActiveMonths} Months (${aasMonthName} to Sep-2026)`;
        }
      } else {
        const prorataBasic = Math.round((preAasBase * preDays + postAasBase * postDays) / daysInAasMonth);
        if (activeAasBadge) activeAasBadge.textContent = `${selectedAasDate}-${aasMonthName.slice(0, 3)} AAS`;
        if (infoAasMonthBadge) infoAasMonthBadge.textContent = `${selectedAasDate}-${aasMonthName} AAS`;
        if (infoAasDateRow) {
          infoAasDateRow.style.display = 'flex';
          if (infoAasDate) infoAasDate.textContent = `${selectedAasDate}${getOrdinalSuffix(selectedAasDate)} ${aasMonthName}`;
        }
        if (infoAasProrataRow) {
          infoAasProrataRow.style.display = 'flex';
          if (infoAasProrataBasic) infoAasProrataBasic.textContent = `${formatINR(prorataBasic)} (${preDays}d Pre + ${postDays}d Post)`;
        }
        if (infoAasSplit) {
          const subsequentMonths = Math.max(0, currentMonths - aasIdx - 1);
          infoAasSplit.textContent = `${preDays}d Pre + ${postDays}d Post in ${aasMonthName} (${subsequentMonths} Mo Full Post)`;
        }
      }

      if (infoPreAasBasic) infoPreAasBasic.textContent = formatINR(preAasBase);
      if (infoAasIncrAmount) infoAasIncrAmount.textContent = `+${formatINR(aasIncrDiff)} (1 Increment)`;
      if (infoPostAasBasic) infoPostAasBasic.textContent = formatINR(postAasBase);
      if (aasInfoCard) aasInfoCard.style.display = 'block';
    } else {
      if (activeAasBadge) activeAasBadge.textContent = 'No AAS';
      if (aasInfoCard) aasInfoCard.style.display = 'none';
      if (infoAasDateRow) infoAasDateRow.style.display = 'none';
      if (infoAasProrataRow) infoAasProrataRow.style.display = 'none';
    }

    // Render Month-Wise Schedule Table
    renderMonthWiseTable({
      monthlyBreakdown,
      currentMonths,
      currentDaMode,
      isCPS,
      computedSurrenders,
      totalSurrenderExtra,
      surrSuffix,
      finalDa1Total,
      finalDa2Total,
      totalGrossArrears,
      totalCpsArrears,
      totalNetArrears
    });

    return {
      sep26Pay,
      pay2026,
      pay2025,
      pay2024,
      backwardStages,
      hasAgi,
      incrMonthOfYear,
      hasAas,
      aasMonthName: hasAas ? month32Names[aasIdx] : 'None',
      selectedAasDate: hasAas ? selectedAasDate : 1,
      employeeType,
      isCPS,
      currentMonths,
      currentDaMode,
      drawnRateVal,
      da1RateVal,
      da2RateVal,
      diff1Rate,
      diff2Rate,
      totalDiffRate,
      computedSurrenders,
      totalSurrenderExtra,
      finalDa1Total,
      finalDa2Total,
      totalGrossArrears,
      totalCpsArrears,
      totalNetArrears
    };
  }

  // Render Month-Wise Arrears Breakdown Table
  function renderMonthWiseTable(data) {
    if (!monthWiseTableBody || !monthWiseTableFoot) return;

    if (thCpsCol && thNetCol) {
      if (data.isCPS) {
        thCpsCol.innerHTML = 'CPS (10%)<br><span style="font-weight: normal; font-size: 0.68rem; opacity: 0.9;">PRAN</span>';
        thNetCol.innerHTML = 'Net Cash<br><span style="font-weight: normal; font-size: 0.68rem; opacity: 0.9;">(90% Bank)</span>';
      } else {
        thCpsCol.innerHTML = 'CPS (0%)<br><span style="font-weight: normal; font-size: 0.68rem; opacity: 0.9;">GPF (0%)</span>';
        thNetCol.innerHTML = 'Total Cash<br><span style="font-weight: normal; font-size: 0.68rem; opacity: 0.9;">(100% GPF)</span>';
      }
    }

    const surrSuffix = data.surrSuffix || '';
    if (tablePeriodBadge) {
      tablePeriodBadge.textContent = data.currentMonths === 33
        ? `Jan-2024 to Sep-2026 (33 Months)${surrSuffix}`
        : `${data.currentMonths} Months${surrSuffix}`;
    }

    monthWiseTableBody.innerHTML = '';

    data.monthlyBreakdown.forEach((m, idx) => {
      const tr = document.createElement('tr');
      const isAlt = idx % 2 === 1;
      tr.style.background = isAlt ? '#f8fafc' : '#ffffff';

      const diff1Cell = m.diff1 > 0 ? formatINR(m.diff1) : '-';
      const diff2Cell = m.diff2 > 0 ? formatINR(m.diff2) : '-';

      tr.innerHTML = `
        <td style="padding: 7px 6px; text-align: center; font-weight: 600; color: #64748b;">${idx + 1}</td>
        <td style="padding: 7px 8px; text-align: left; font-weight: 700; color: #0f172a;">${m.monthName}</td>
        <td style="padding: 7px 8px;">${formatINR(m.basicPay)}</td>
        <td style="padding: 7px 8px; color: #475569;">${formatINR(m.drawnDA)}</td>
        <td style="padding: 7px 8px; color: ${m.sanctionedRate > 37.31 ? '#1d4ed8' : '#047857'}; font-weight: 600;">${formatINR(m.sanctionedDA)} <span style="font-size: 0.70rem; color: #64748b;">(${m.sanctionedRate}%)</span></td>
        <td style="padding: 7px 8px; font-weight: 700; color: #065f46; background: #f0fdf4;">${diff1Cell}</td>
        <td style="padding: 7px 8px; font-weight: 700; color: #0369a1; background: #f0f9ff;">${diff2Cell}</td>
        <td style="padding: 7px 8px; font-weight: 800; color: #064e3b; background: #ecfdf5;">${formatINR(m.grossDiff)}</td>
        <td style="padding: 7px 8px; color: #0369a1;">${formatINR(m.cps)}</td>
        <td style="padding: 7px 8px; font-weight: 800; color: #15803d; background: #dcfce7;">${formatINR(m.net)}</td>
        <td style="padding: 7px 8px; text-align: left; font-size: 0.74rem;">${m.remark}</td>
      `;
      monthWiseTableBody.appendChild(tr);
    });

    // Surrender Leave Rows for each active year
    if (data.computedSurrenders && data.computedSurrenders.length > 0) {
      data.computedSurrenders.forEach(s => {
        const trSurr = document.createElement('tr');
        trSurr.className = 'row-surrender';
        const surrCPS = data.isCPS ? Math.round(s.extra * 0.10) : 0;
        const surrNet = s.extra - surrCPS;
        const surrText = s.days === 15 ? '0.5 Mo DA Diff' : '1.0 Mo DA Diff';

        const sDiff1Cell = s.diff1 > 0 ? `+${formatINR(s.diff1)}` : '-';
        const sDiff2Cell = s.diff2 > 0 ? `+${formatINR(s.diff2)}` : '-';

        trSurr.innerHTML = `
          <td style="padding: 8px 6px; text-align: center;">🏖️</td>
          <td style="padding: 8px 8px; text-align: left; font-weight: 800; color: #92400e;">
            Surrender Leave ${s.year} (${s.days} Days)
            <div style="font-size: 0.70rem; color: #b45309; font-weight: 600;">Encashed in ${s.monthName}</div>
          </td>
          <td style="padding: 8px 8px; font-weight: 700;">${formatINR(s.basic)}</td>
          <td style="padding: 8px 8px; color: #92400e;">${formatINR(s.drawnDA)}</td>
          <td style="padding: 8px 8px; color: #92400e;">${s.monthIdx < 6 ? formatINR(s.da1) : formatINR(s.da2)}</td>
          <td style="padding: 8px 8px; font-weight: 700; color: #065f46; background: #fef3c7;">${sDiff1Cell}</td>
          <td style="padding: 8px 8px; font-weight: 700; color: #0369a1; background: #fef3c7;">${sDiff2Cell}</td>
          <td style="padding: 8px 8px; font-weight: 800; color: #b45309; background: #fde68a;">+${formatINR(s.extra)}</td>
          <td style="padding: 8px 8px; font-weight: 700; color: #0369a1;">${formatINR(surrCPS)}</td>
          <td style="padding: 8px 8px; font-weight: 800; color: #15803d; background: #fef9c3;">${formatINR(surrNet)}</td>
          <td style="padding: 8px 8px; text-align: left; font-weight: 700; color: #92400e;">${surrText} (${s.monthName})</td>
        `;
        monthWiseTableBody.appendChild(trSurr);
      });
    }

    // Grand Total Footer
    monthWiseTableFoot.innerHTML = `
      <tr style="border-top: 2px solid #047857; background: #f8fafc;">
        <td colspan="2" style="padding: 10px 8px; text-align: left; font-size: 0.86rem; color: #0f172a; font-weight: 800;">
          Total (${data.currentMonths} Mo${surrSuffix}):
        </td>
        <td style="padding: 10px 8px;">-</td>
        <td style="padding: 10px 8px;">-</td>
        <td style="padding: 10px 8px;">-</td>
        <td style="padding: 10px 8px; font-size: 0.88rem; font-weight: 800; color: #065f46; background: #dcfce7;">${formatINR(data.finalDa1Total)}</td>
        <td style="padding: 10px 8px; font-size: 0.88rem; font-weight: 800; color: #0369a1; background: #e0f2fe;">${formatINR(data.finalDa2Total)}</td>
        <td style="padding: 10px 8px; font-size: 0.98rem; font-weight: 800; color: #064e3b; background: #bbf7d0;">${formatINR(data.totalGrossArrears)}</td>
        <td style="padding: 10px 8px; font-size: 0.92rem; font-weight: 800; color: #0369a1; background: #e0f2fe;">${formatINR(data.totalCpsArrears)}</td>
        <td style="padding: 10px 8px; font-size: 1.05rem; font-weight: 800; color: #15803d; background: #86efac;">${formatINR(data.totalNetArrears)}</td>
        <td style="padding: 10px 8px; text-align: left; font-size: 0.76rem; font-weight: 700; color: #047857;">Net Arrears Payable</td>
      </tr>
    `;
  }

  // Table Print button
  if (btnTablePrint) {
    btnTablePrint.addEventListener('click', () => {
      window.print();
    });
  }

  // Initial Calculation Run
  updateCalculations();

  // Print Statement / Save PDF
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // Copy Statement to Clipboard
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const s = updateCalculations();

      const agiLines = s.hasAgi
        ? `• Annual Grade Increments: 2024 (${formatINR(s.pay2024)}) ➔ 2025 (${formatINR(s.pay2025)}) ➔ 2026 (${formatINR(s.pay2026)}) [Month: ${month32Names[s.incrMonthOfYear]}]`
        : `• Pay Progression: 2024 (${formatINR(s.pay2024)}) ➔ 2025 (${formatINR(s.pay2025)}) ➔ 2026 (${formatINR(s.pay2026)})`;

      const surrLines = (s.computedSurrenders && s.computedSurrenders.length > 0)
        ? s.computedSurrenders.map(surr => `• Surrender Leave ${surr.year} (${surr.days} Days in ${surr.monthName} on Basic ${formatINR(surr.basic)}): +${formatINR(surr.extra)}`)
        : null;

      const modeTitle = s.currentDaMode === 'BOTH'
        ? 'Both 2 DAs Sanctioned (1st DA @37.31% & 2nd DA @40.04%)'
        : (s.currentDaMode === 'DA1_ONLY' ? '1st DA Only (@37.31%)' : '2nd DA Only (@40.04%)');

      const textLines = [
        `🏛️ TELANGANA STATE EMPLOYEES 2 DAs ARREARS STATEMENT:`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `• Calculation Mode: ${modeTitle}`,
        `• September 2026 Basic Pay: ${formatINR(s.pay2026)}`,
        `• 2025 Basic Pay (1 Incr backward): ${formatINR(s.pay2025)}`,
        `• 2024 Basic Pay (2 Incrs backward): ${formatINR(s.pay2024)}`,
        agiLines,
        s.hasAas ? `• Automatic Advancement Scheme (AAS): +1 Increment from ${s.selectedAasDate > 1 ? `${s.selectedAasDate}-${s.aasMonthName} (Pro-rated)` : s.aasMonthName}` : null,
        `• Drawn DA (Jul 2023 Baseline): ${s.drawnRateVal}%`,
        `• 1st DA (w.e.f Jan 2024): ${s.da1RateVal}% (Diff: +${s.diff1Rate}%)`,
        `• 2nd DA (w.e.f Jul 2024): ${s.da2RateVal}% (Diff: +${s.diff2Rate}% | Total: +${s.totalDiffRate}%)`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `• Arrears Period: ${s.currentMonths === 33 ? 'Jan-2024 to Sep-2026 (33 Months)' : `${s.currentMonths} Months`}`,
        `• 1st DA Component Arrears (+${s.diff1Rate}%): ${formatINR(s.finalDa1Total)}`,
        `• 2nd DA Component Arrears (+${s.diff2Rate}%): ${formatINR(s.finalDa2Total)}`,
        ...(surrLines || []),
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `• Total Gross 2 DAs Arrears: ${formatINR(s.totalGrossArrears)}`,
        s.isCPS ? `• 10% Deduction to CPS PRAN: ${formatINR(s.totalCpsArrears)}` : null,
        `• ${s.isCPS ? '90% Net Cash Payable to Bank' : '100% Total GPF / Cash'}: ${formatINR(s.totalNetArrears)}`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `• Formulated by: Nancharla Prudhvi, Senior Accountant, District Treasury, Khammam`,
        `Reference: Telangana Govt. 2 DAs (1st DA 37.31% & 2nd DA 40.04% • RPS-2020)`
      ].filter(Boolean).join('\n');

      navigator.clipboard.writeText(textLines).then(() => {
        showToast('✅ 2 DAs Arrears Statement copied!');
      }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = textLines;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('✅ Statement copied to clipboard!');
      });
    });
  }

  // Reset Button
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (basicSelect) basicSelect.value = '20280';
      if (customPayCheck) customPayCheck.checked = false;
      if (customPayWrapper) customPayWrapper.style.display = 'none';
      if (customPayInput) customPayInput.value = '';
      if (basicSelect) basicSelect.disabled = false;
      if (searchInput) {
        searchInput.disabled = false;
        searchInput.value = '';
      }

      currentDaMode = 'BOTH';
      const radioBoth = document.querySelector('input[name="daMode"][value="BOTH"]');
      if (radioBoth) radioBoth.checked = true;
      [labelModeBoth, labelModeDa1, labelModeDa2].forEach(l => {
        if (l) l.classList.remove('active');
      });
      if (labelModeBoth) labelModeBoth.classList.add('active');

      if (customDaCheck) customDaCheck.checked = false;
      if (customDaInputsWrapper) customDaInputsWrapper.style.display = 'none';
      if (customDrawnRate) customDrawnRate.value = '33.67';
      if (customDa1Rate) customDa1Rate.value = '37.31';
      if (customDa2Rate) customDa2Rate.value = '40.04';

      selectedIncrIdx = '0';
      agiAutoRecur = true;
      if (agiAutoRecurCheck) agiAutoRecurCheck.checked = true;
      if (incrMonthSelect) incrMonthSelect.value = '0';
      if (activeIncrBadge) activeIncrBadge.textContent = 'Jan-24 (Recurring 2024-2026)';
      if (incrChips) {
        incrChips.querySelectorAll('.chip-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.incr === '0');
        });
      }

      selectedAasIdx = 'none';
      selectedAasDate = 1;
      if (aasMonthSelect) aasMonthSelect.value = 'none';
      if (activeAasBadge) activeAasBadge.textContent = 'No AAS';
      if (aasDateSection) aasDateSection.style.display = 'none';
      if (activeAasDateBadge) activeAasDateBadge.textContent = '1st of Month (Full Month)';
      if (aasChips) {
        aasChips.querySelectorAll('.aas-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.aas === 'none');
        });
      }

      [2024, 2025, 2026].forEach(yr => {
        surrenderYears[yr].days = 0;
        surrenderYears[yr].monthIdx = null;

        const daysGroup = document.getElementById(`surrDays${yr}`);
        if (daysGroup) {
          daysGroup.querySelectorAll('.surr-day-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.days === '0');
          });
        }

        const chipsStrip = document.getElementById(`surrChips${yr}`);
        if (chipsStrip) {
          chipsStrip.querySelectorAll('.surrender-month-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.smonth === 'none');
          });
        }

        const badgeEl = document.getElementById(`badgeSurr${yr}`);
        if (badgeEl) {
          badgeEl.textContent = `No Leave in ${yr}`;
          badgeEl.style.background = '#fef3c7';
          badgeEl.style.color = '#78350f';
        }
        const subtextEl = document.getElementById(`subtextSurr${yr}`);
        if (subtextEl) subtextEl.textContent = '';
      });

      populateBasicSelect();
      updateCalculations();
      showToast('🔄 Reset to default values!');
    });
  }

  // Toast Notification
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
});
