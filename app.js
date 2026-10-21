// Telangana Government 2 DAs Difference & Arrears Calculator Application Script
// RPS 2020 — 1st DA (Jan 2024: 37.31%) & 2nd DA (Jul 2024: 40.04% | Total Diff: +6.37%)
// Baseline Drawn DA: 33.67% (July 2023 — G.O.Ms.02)
// Arrears Period: Jan-2024 to Sep-2026 (33 Months)
// Formulated by Nancharla Prudhvi, Senior Accountant, District Treasury, Khammam

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Input Form
  const basicpay = document.getElementById('basicpay');
  const basicSearch = document.getElementById('basicSearch');
  const activeBasicDisplay = document.getElementById('activeBasicDisplay');

  const incmonth = document.getElementById('incmonth');
  const surrenderContainer = document.getElementById('surrender-leave-container');
  const aasSectionContainer = document.getElementById('aas-section-container');
  const aas = document.getElementById('aas');
  const aasYearDiv = document.getElementById('aas-year-div');
  const aasyear = document.getElementById('aasyear');
  const aasMonthDiv = document.getElementById('aas-month-div');
  const aasmonth = document.getElementById('aasmonth');
  const aasDayDiv = document.getElementById('aas-day-div');
  const aasday = document.getElementById('aasday');
  const cpsorgpf = document.getElementById('cpsorgpf');

  const btnCalculate = document.getElementById('btnCalculate');
  const btnPrint = document.getElementById('btnPrint');
  const btnShare = document.getElementById('btnShare');
  const btnReset = document.getElementById('btnReset');

  // Summary Card DOM Elements
  const cardTotalArrears = document.getElementById('cardTotalArrears');
  const cardCpsWrapper = document.getElementById('cardCpsWrapper');
  const cardCpsLabel = document.getElementById('cardCpsLabel');
  const cardCpsVal = document.getElementById('cardCpsVal');
  const cardCashLabel = document.getElementById('cardCashLabel');
  const cardCashVal = document.getElementById('cardCashVal');
  const cardInstallWrapper = document.getElementById('cardInstallWrapper');
  const cardInstallSplit = document.getElementById('cardInstallSplit');
  const cardInstallIcon = document.getElementById('cardInstallIcon');
  const cardInstallTitle = document.getElementById('cardInstallTitle');
  const cardInstallBadge = document.getElementById('cardInstallBadge');
  const cardSlWrapper = document.getElementById('cardSlWrapper');
  const cardSlTotal = document.getElementById('cardSlTotal');
  const cardSlChips = document.getElementById('cardSlChips');

  // Top October 2026 Highlight Card next to Author Photo
  const topOctTotal = document.getElementById('topOctTotal');
  const topOctCash = document.getElementById('topOctCash');
  const topOctCps = document.getElementById('topOctCps');
  const topOctCpsChip = document.getElementById('topOctCpsChip');

  // October Month Card
  const octBadgeCash = document.getElementById('octBadgeCash');
  const octBigCash = document.getElementById('octBigCash');
  const octCpsPill = document.getElementById('octCpsPill');
  const octCpsVal = document.getElementById('octCpsVal');
  const octDa1Cash = document.getElementById('octDa1Cash');
  const octDa1Cps = document.getElementById('octDa1Cps');
  const octDa2Cash = document.getElementById('octDa2Cash');
  const octDa2Cps = document.getElementById('octDa2Cps');

  // Tables
  const da1TableBody = document.getElementById('da1TableBody');
  const da2TableBody = document.getElementById('da2TableBody');
  const aasProRataSection = document.getElementById('aasProRataSection');
  const aasProRataTableBody = document.getElementById('aasProRataTableBody');
  const gtBasic = document.getElementById('gtBasic');
  const gtEligible = document.getElementById('gtEligible');
  const gtDrawn = document.getElementById('gtDrawn');
  const gtDiff = document.getElementById('gtDiff');
  const gtCps = document.getElementById('gtCps');
  const gtCash = document.getElementById('gtCash');
  const thGtCredit = document.getElementById('thGtCredit');
  const gtCreditVal = document.getElementById('gtCreditVal');
  const gtCreditSub = document.getElementById('gtCreditSub');
  const gtSurrenderRow = document.getElementById('gtSurrenderRow');

  const installmentTableBody = document.getElementById('installmentTableBody');
  const installmentMobileContainer = document.getElementById('installmentMobileContainer');

  // Accordion
  const tsTableToggle = document.getElementById('tsTableToggle');
  const tsTableContent = document.getElementById('tsTableContent');
  const tsTableArrow = document.getElementById('tsTableArrow');
  const tsCumulativeTableBody = document.getElementById('tsCumulativeTableBody');

  // Year-by-Year Surrender Leave Elements Map (2024, 2025, 2026)
  const surrenderYears = [
    {
      year: 2024,
      item: document.getElementById('sl-item-2024'),
      slSelect: document.getElementById('sl2024'),
      monthDiv: document.getElementById('sldiv2024'),
      monthSelect: document.getElementById('slmonth2024'),
      chip: document.getElementById('chip2024')
    },
    {
      year: 2025,
      item: document.getElementById('sl-item-2025'),
      slSelect: document.getElementById('sl2025'),
      monthDiv: document.getElementById('sldiv2025'),
      monthSelect: document.getElementById('slmonth2025'),
      chip: document.getElementById('chip2025')
    },
    {
      year: 2026,
      item: document.getElementById('sl-item-2026'),
      slSelect: document.getElementById('sl2026'),
      monthDiv: document.getElementById('sldiv2026'),
      monthSelect: document.getElementById('slmonth2026'),
      chip: document.getElementById('chip2026')
    }
  ];

  // --- 1. Populate Dropdowns ---
  function populateDropdowns() {
    // Populate Basic Pay Select with RPS-2020 stages (No default pre-selected)
    basicpay.innerHTML = '<option value="" selected>-- మీ Basic Pay సెలెక్ట్ చేసుకోండి (Select Your Basic Pay) --</option>';
    RPS_2020_STAGES.forEach(st => {
      const opt = document.createElement('option');
      opt.value = st;
      opt.textContent = `₹${formatINR(st)}`;
      basicpay.appendChild(opt);
    });

    // Populate AAS Month Select (Jan 2024 to Sep 2026)
    aasmonth.innerHTML = '<option value="0">--SELECT AAS MONTH--</option>';
    MONTHS_33.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.dataset.month = m.ym;
      opt.textContent = `${m.name}`;
      aasmonth.appendChild(opt);
    });

    // Populate Surrender Leave Month Selects by Year
    surrenderYears.forEach(sy => {
      if (sy.monthSelect) {
        sy.monthSelect.innerHTML = `<option value="0">--${sy.year} సరెండర్ నెల ఎంచుకోండి--</option>`;
        const yearMonths = MONTHS_33.filter(m => m.year === sy.year);
        yearMonths.forEach(m => {
          const opt = document.createElement('option');
          opt.value = m.id;
          opt.textContent = `${m.name}`;
          sy.monthSelect.appendChild(opt);
        });
      }
    });

    // Populate Cumulative DA Table
    if (tsCumulativeTableBody && typeof TS_CUMULATIVE_DA_TABLE !== 'undefined') {
      tsCumulativeTableBody.innerHTML = '';
      TS_CUMULATIVE_DA_TABLE.forEach(row => {
        const tr = document.createElement('tr');
        if (row.isNew) {
          tr.style.background = '#ecfdf5';
          tr.style.fontWeight = 'bold';
        } else if (row.isLastDrawn) {
          tr.style.background = '#fef3c7';
          tr.style.fontWeight = 'bold';
        }
        tr.innerHTML = `
          <td style="padding: 7px 10px; border-bottom: 1px solid #e2e8f0; font-weight: 700;">${row.period} ${row.daCount ? `<span style="font-size:0.7rem; background:#059669; color:#fff; padding:2px 6px; border-radius:4px; margin-left:4px;">${row.daCount}</span>` : ''}</td>
          <td style="padding: 7px 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">+${row.incr.toFixed(2)}%</td>
          <td style="padding: 7px 10px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #047857; font-weight: 800;">${row.cumulative.toFixed(2)}%</td>
          <td style="padding: 7px 10px; border-bottom: 1px solid #e2e8f0; font-size: 0.76rem; color: #475569;">${row.remarks}</td>
        `;
        tsCumulativeTableBody.appendChild(tr);
      });
    }
  }

  // --- 2. AAS Dynamic Month & Days Generation ---
  function updateAasMonths() {
    const selectedYear = parseInt(aasyear.value, 10);
    if (selectedYear && (selectedYear === 2024 || selectedYear === 2025 || selectedYear === 2026)) {
      aasmonth.innerHTML = `<option value="0">--SELECT AAS ${selectedYear} MONTH--</option>`;
      const yearMonths = MONTHS_33.filter(m => m.year === selectedYear);
      yearMonths.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.dataset.month = m.ym;
        opt.textContent = `${m.name}`;
        aasmonth.appendChild(opt);
      });
      aasMonthDiv.style.display = 'block';
      setTimeout(() => {
        aasMonthDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        aasmonth.focus({ preventScroll: true });
      }, 100);
    } else {
      aasmonth.innerHTML = '<option value="0">--SELECT AAS MONTH--</option>';
      aasMonthDiv.style.display = 'none';
      aasDayDiv.style.display = 'none';
      aasmonth.value = '0';
      aasday.value = '1';
    }
  }

  function updateAasDays() {
    const selectedMonthId = parseInt(aasmonth.value, 10);
    if (selectedMonthId >= 1 && selectedMonthId <= 33) {
      const monthObj = MONTHS_33[selectedMonthId - 1];
      const daysCount = monthObj.days;
      aasday.innerHTML = '<option value="1">1st of Month (Full Month - మొత్తం నెల)</option>';
      for (let d = 2; d <= daysCount; d++) {
        const opt = document.createElement('option');
        opt.value = d;
        opt.textContent = `${d}th of ${monthObj.name} (Pro-rata దామాషా)`;
        aasday.appendChild(opt);
      }
      aasDayDiv.style.display = 'block';
      setTimeout(() => {
        aasDayDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        aasday.focus({ preventScroll: true });
      }, 100);
    } else {
      aasday.innerHTML = '<option value="1">1st of Month</option>';
      aasDayDiv.style.display = 'none';
    }
  }

  // --- 3. Year-by-Year Surrender Leave Dynamic Handlers ---
  function initSurrenderLeaveHandlers() {
    function updateProgressiveYears() {
      const sy2024 = surrenderYears[0];
      const sy2025 = surrenderYears[1];
      const sy2026 = surrenderYears[2];

      const val2024 = sy2024.slSelect.value;
      const m2024 = sy2024.monthSelect.value;
      const is2024Answered = (val2024 === '1') || ((val2024 === '2' || val2024 === '3') && m2024 !== '0');

      if (is2024Answered) {
        sy2025.item.style.display = 'block';
        sy2025.chip.classList.add('year-chip--active');
        sy2024.chip.classList.add('year-chip--completed');
        // Smoothly reveal & scroll to 2025
        setTimeout(() => {
          sy2025.item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          if (sy2025.slSelect) sy2025.slSelect.focus({ preventScroll: true });
        }, 120);
      } else {
        if (val2024 !== '1' && m2024 === '0' && sy2025.slSelect.value === '1' && sy2026.slSelect.value === '1') {
          sy2025.item.style.display = 'none';
          sy2025.chip.classList.remove('year-chip--active', 'year-chip--completed');
          sy2026.item.style.display = 'none';
          sy2026.chip.classList.remove('year-chip--active', 'year-chip--completed');
        }
      }

      const val2025 = sy2025.slSelect.value;
      const m2025 = sy2025.monthSelect.value;
      const is2025Answered = (val2025 === '1') || ((val2025 === '2' || val2025 === '3') && m2025 !== '0');

      if (is2024Answered && is2025Answered) {
        sy2026.item.style.display = 'block';
        sy2026.chip.classList.add('year-chip--active');
        sy2025.chip.classList.add('year-chip--completed');
        // Smoothly reveal & scroll to 2026
        setTimeout(() => {
          sy2026.item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          if (sy2026.slSelect) sy2026.slSelect.focus({ preventScroll: true });
        }, 120);
      } else {
        if (val2025 !== '1' && m2025 === '0' && sy2026.slSelect.value === '1') {
          sy2026.item.style.display = 'none';
          sy2026.chip.classList.remove('year-chip--active', 'year-chip--completed');
        }
      }

      const val2026 = sy2026.slSelect.value;
      const m2026 = sy2026.monthSelect.value;
      const is2026Answered = (val2026 === '1') || ((val2026 === '2' || val2026 === '3') && m2026 !== '0');
      if (is2026Answered) {
        sy2026.chip.classList.add('year-chip--completed');
        // When Surrender Leave 2026 is answered, REVEAL AAS section!
        if (aasSectionContainer) {
          aasSectionContainer.style.display = 'block';
          setTimeout(() => {
            aasSectionContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            if (aas) aas.focus({ preventScroll: true });
          }, 150);
        }
      }
    }

    surrenderYears.forEach(sy => {
      if (!sy.slSelect) return;

      sy.slSelect.addEventListener('change', () => {
        const val = sy.slSelect.value;
        if (val === '2' || val === '3') {
          sy.monthDiv.style.display = 'block';
          setTimeout(() => {
            sy.monthDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            if (sy.monthSelect) sy.monthSelect.focus({ preventScroll: true });
          }, 80);
        } else {
          sy.monthDiv.style.display = 'none';
          sy.monthSelect.value = '0';
          updateProgressiveYears();
        }
        calculateAndRender();
      });

      if (sy.monthSelect) {
        sy.monthSelect.addEventListener('change', () => {
          updateProgressiveYears();
          calculateAndRender();
        });
      }
    });
  }

  // --- 4. Search Filter for Basic Pay Select ---
  function initSearchFilter() {
    basicSearch.addEventListener('input', () => {
      const q = basicSearch.value.trim().toLowerCase();
      let firstMatch = null;
      Array.from(basicpay.options).forEach(opt => {
        const match = opt.textContent.toLowerCase().includes(q) || opt.value.includes(q);
        opt.style.display = match ? '' : 'none';
        if (match && !firstMatch) firstMatch = opt;
      });
      if (firstMatch && q.length >= 2 && firstMatch.value !== '') {
        basicpay.value = firstMatch.value;
        calculateAndRender();
      }
    });
  }

  // --- 5. Main Calculation Engine ---
  function calculateAndRender() {
    const resultsContainer = document.getElementById('results');

    // 5.1 Determine Active Basic Pay as on 30 Sep 2026 (Dropdown only)
    let activeBasic = 0;
    if (basicpay && basicpay.value) {
      activeBasic = parseInt(basicpay.value, 10) || 0;
    }

    if (!activeBasic || activeBasic <= 0) {
      if (activeBasicDisplay) activeBasicDisplay.textContent = '—';
      if (resultsContainer) resultsContainer.style.display = 'none';
      if (topOctTotal) topOctTotal.textContent = '—';
      if (topOctCash) topOctCash.textContent = '—';
      if (topOctCps) topOctCps.textContent = '—';
      return;
    }

    if (activeBasicDisplay) {
      activeBasicDisplay.textContent = `₹${formatINR(activeBasic)}`;
    }
    if (resultsContainer) {
      resultsContainer.style.display = 'block';
    }

    // 5.2 Pension Type: CPS (1) or GPF (2)
    const isCPS = (cpsorgpf.value === '1');

    // 5.3 Annual Increment progression (Jan 2024 to Sep 2026 = 33 Months)
    // activeBasic is as on 30-Sep-2026.
    // If increment month is chosen (1 to 12 for Jan to Dec):
    // - In 2026: if month >= incM, basic is activeBasic. If month < incM, basic is (activeBasic - 1 stage).
    //   Exception: Oct/Nov/Dec (10, 11, 12) hasn't arrived by Sep 2026, so Sep 2026 hasn't gotten 2026 increment yet!
    // - Every prior increment month (in 2025 and 2024) steps back 1 stage!
    const incM = parseInt(incmonth.value, 10); // 0 (None) or 1..12 (Jan..Dec)
    const monthBasics = new Array(34).fill(activeBasic); // 1-indexed (1 to 33)

    if (incM >= 1 && incM <= 12) {
      // Helper stages
      const stage2026 = activeBasic;
      const stage2025 = getPreviousPayStage(stage2026);
      const stage2024 = getPreviousPayStage(stage2025);
      const stagePrior2024 = getPreviousPayStage(stage2024);

      for (let m = 1; m <= 33; m++) {
        const mObj = MONTHS_33[m - 1]; // year (2024, 2025, 2026), month (1 to 12)
        const yr = mObj.year;
        const mo = mObj.month;

        if (yr === 2026) {
          // If employee increment is in Jan..Sep (<=9):
          // From incM onwards in 2026, they draw stage2026.
          // Prior to incM in 2026, they drew stage2025.
          // If employee increment is Oct..Dec (10..12):
          // In 2026 (Jan..Sep), they still draw stage2025 because Oct 2026 didn't occur yet!
          if (incM <= 9) {
            monthBasics[m] = (mo >= incM) ? stage2026 : stage2025;
          } else {
            monthBasics[m] = stage2025;
          }
        } else if (yr === 2025) {
          // In 2025:
          // From incM onwards, they draw stage2025.
          // Before incM, they drew stage2024.
          monthBasics[m] = (mo >= incM) ? stage2025 : stage2024;
        } else if (yr === 2024) {
          // In 2024:
          // From incM onwards, they draw stage2024.
          // Before incM, they drew stagePrior2024.
          monthBasics[m] = (mo >= incM) ? stage2024 : stagePrior2024;
        }
      }
    }

    // 5.4 AAS Effect (if taken)
    // Rule:
    // User selected "Select Basic Pay As On 30-Sep-2026" = activeBasic.
    // If AAS happened on or before Sep 2026, activeBasic ALREADY INCLUDES AAS!
    // Specifically:
    // If Annual Increment is in the SAME month as AAS (e.g. Sep 2026):
    // - Before Sep 2026: Employee was at previous stage (stage2025).
    // - On 1st Sep 2026: Employee gets Annual Grade Increment -> reaches stageWithoutAas = activeBasic - 1 stage (e.g. 37780 if activeBasic is 38890).
    // - On 11th Sep 2026: AAS is sanctioned -> Employee reaches activeBasic = 38890 (+1 extra increment for AAS).
    // - From 1st to 10th (10 days): Drawn & Eligible based on stageWithoutAas (Annual Increment stage).
    // - From 11th to 30th (20 days): Drawn on stageWithoutAas, Eligible on activeBasic (+2 increments stage).
    //   Diff = (activeBasic * effRate * 20/30) - (stageWithoutAas * drawnRate * 20/30) ... or pure DA difference!
    // Next month (Oct 2026 onwards): Full month with AAS (activeBasic).
    const hasAas = (aas.value === '2');
    const aasM = parseInt(aasmonth.value, 10) || 0;
    const aasD = parseInt(aasday.value, 10) || 1;

    let aasProRataRowsHtml = '';
    let showAasProRataTable = false;

    if (hasAas && aasM >= 1 && aasM <= 33) {
      const isSameMonthAsIncrement = (incM >= 1 && incM <= 12 && MONTHS_33[aasM - 1].month === incM);

      // Prior to aasM, employee did not have AAS:
      for (let m = 1; m < aasM; m++) {
        monthBasics[m] = getPreviousPayStage(monthBasics[m]);
      }

      if (isSameMonthAsIncrement) {
        // AAS and Annual Increment are in the EXACT SAME MONTH!
        const mObj = MONTHS_33[aasM - 1];
        const daysInM = mObj.days;

        // activeBasic at Sep 2026 is the final stage WITH both increments.
        // Stage with Annual Increment only (before AAS on 11th):
        const stageWithAnnualOnly = getPreviousPayStage(monthBasics[aasM]);
        // Final stage with both Annual + AAS:
        const stageWithBoth = monthBasics[aasM];

        if (aasD > 1) {
          showAasProRataTable = true;
          const oldDays = aasD - 1; // e.g. 1st to 10th = 10 days
          const newDays = daysInM - oldDays; // e.g. 11th to 30th = 20 days

          // Weighted basic pay for aasM
          monthBasics[aasM] = Math.round((stageWithAnnualOnly * oldDays + stageWithBoth * newDays) / daysInM);

          const rate1 = DA_RATES.DA_1_RATE;
          const drawnRate = DA_RATES.DRAWN_DA_RATE;
          const hasRate2 = mObj.hasDa2;
          const effRate = hasRate2 ? DA_RATES.DA_2_RATE : rate1;

          // In Treasury rules, the DA actually drawn by the employee before revision was based on their pre-increment/pre-AAS stage:
          const stageActuallyDrawn = (aasM > 1) ? monthBasics[aasM - 1] : getPreviousPayStage(stageWithAnnualOnly);

          // Part 1: Days 1 to (aasD-1) -> Has Annual Increment (+1 increment)
          const p1Eligible = Math.round((stageWithAnnualOnly * effRate * oldDays) / daysInM);
          const p1Drawn = Math.round((stageActuallyDrawn * drawnRate * oldDays) / daysInM);
          const p1Diff = p1Eligible - p1Drawn;

          // Part 2: Days aasD to Month End -> Has BOTH Annual + AAS Increments (+2 increments!)
          const p2Eligible = Math.round((stageWithBoth * effRate * newDays) / daysInM);
          const p2Drawn = Math.round((stageActuallyDrawn * drawnRate * newDays) / daysInM);
          const p2Diff = p2Eligible - p2Drawn;

          const totDiff = p1Diff + p2Diff;

          aasProRataRowsHtml = `
            <tr>
              <td><strong>${mObj.name} (1st to ${oldDays}th)</strong><br><span style="font-size:0.75rem; color:#2563eb; font-weight:700;">★ Annual Grade Increment (+1 Incr)</span></td>
              <td>₹${formatINR(stageWithAnnualOnly)}</td>
              <td>${oldDays} Days</td>
              <td>₹${formatINR(p1Drawn)}</td>
              <td>₹${formatINR(p1Eligible)}</td>
              <td style="color:#047857; font-weight:700;">₹${formatINR(p1Diff)}</td>
            </tr>
            <tr style="background:#f0fdf4;">
              <td><strong>${mObj.name} (${aasD}th to ${daysInM}th)</strong><br><span style="font-size:0.75rem; color:#059669; font-weight:800;">★★ AAS Sanctioned (+2 Increments)</span></td>
              <td>₹${formatINR(stageWithBoth)}</td>
              <td>${newDays} Days</td>
              <td>₹${formatINR(p2Drawn)}</td>
              <td>₹${formatINR(p2Eligible)}</td>
              <td style="color:#047857; font-weight:800; font-size:1.05rem;">₹${formatINR(p2Diff)}</td>
            </tr>
            <tr class="total-row" style="background:#eef2ff;">
              <th>${mObj.name} Net Pro-rata Total</th>
              <td>₹${formatINR(monthBasics[aasM])} (Weighted)</td>
              <td>${daysInM} Days</td>
              <td>₹${formatINR(p1Drawn + p2Drawn)}</td>
              <td>₹${formatINR(p1Eligible + p2Eligible)}</td>
              <th style="color:#1e3a8a;">₹${formatINR(totDiff)}</th>
            </tr>
          `;
        }
      } else {
        // AAS is in a DIFFERENT month than Annual Increment
        if (aasD > 1) {
          showAasProRataTable = true;
          const mObj = MONTHS_33[aasM - 1];
          const daysInM = mObj.days;
          const newStage = monthBasics[aasM]; // Stage with AAS
          const oldStage = getPreviousPayStage(newStage); // Stage before AAS

          const oldDays = aasD - 1;
          const newDays = daysInM - oldDays;

          monthBasics[aasM] = Math.round((oldStage * oldDays + newStage * newDays) / daysInM);

          const rate1 = DA_RATES.DA_1_RATE;
          const drawnRate = DA_RATES.DRAWN_DA_RATE;
          const hasRate2 = mObj.hasDa2;
          const effRate = hasRate2 ? DA_RATES.DA_2_RATE : rate1;

          const oldEligible = Math.round((oldStage * effRate * oldDays) / daysInM);
          const oldDrawn = Math.round((oldStage * drawnRate * oldDays) / daysInM);
          const oldDiff = oldEligible - oldDrawn;

          const newEligible = Math.round((newStage * effRate * newDays) / daysInM);
          const newDrawn = Math.round((oldStage * drawnRate * newDays) / daysInM);
          const newDiff = newEligible - newDrawn;

          const totProRataDiff = oldDiff + newDiff;

          aasProRataRowsHtml = `
            <tr>
              <td><strong>${mObj.name} (1st to ${oldDays}th)</strong><br><span style="font-size:0.75rem; color:#64748b;">Before AAS Sanction</span></td>
              <td>₹${formatINR(oldStage)}</td>
              <td>${oldDays} Days</td>
              <td>₹${formatINR(oldDrawn)}</td>
              <td>₹${formatINR(oldEligible)}</td>
              <td style="color:#047857; font-weight:700;">₹${formatINR(oldDiff)}</td>
            </tr>
            <tr style="background:#f0fdf4;">
              <td><strong>${mObj.name} (${aasD}th to ${daysInM}th)</strong><br><span style="font-size:0.75rem; color:#059669; font-weight:700;">★ AAS Eligible Period (+1 Incr)</span></td>
              <td>₹${formatINR(newStage)}</td>
              <td>${newDays} Days</td>
              <td>₹${formatINR(newDrawn)}</td>
              <td>₹${formatINR(newEligible)}</td>
              <td style="color:#047857; font-weight:800; font-size:1.05rem;">₹${formatINR(newDiff)}</td>
            </tr>
            <tr class="total-row" style="background:#eef2ff;">
              <th>${mObj.name} Net Pro-rata Total</th>
              <td>₹${formatINR(monthBasics[aasM])} (Weighted)</td>
              <td>${daysInM} Days</td>
              <td>₹${formatINR(oldDrawn + newDrawn)}</td>
              <td>₹${formatINR(oldEligible + newEligible)}</td>
              <th style="color:#1e3a8a;">₹${formatINR(totProRataDiff)}</th>
            </tr>
          `;
        }
      }
    }

    if (aasProRataSection && aasProRataTableBody) {
      if (showAasProRataTable) {
        aasProRataSection.style.display = 'block';
        aasProRataTableBody.innerHTML = aasProRataRowsHtml;
      } else {
        aasProRataSection.style.display = 'none';
        aasProRataTableBody.innerHTML = '';
      }
    }

    // 5.5 Map Surrender Leave Months
    const slMonthMap = {}; // monthId -> { days, amount }
    let totalSlAmount = 0;
    const slChipsData = [];

    surrenderYears.forEach(sl => {
      if (!sl.slSelect) return;
      const slType = sl.slSelect.value; // '1'=None, '2'=15d, '3'=30d
      const slM = parseInt(sl.monthSelect ? sl.monthSelect.value : '0', 10);

      if ((slType === '2' || slType === '3') && slM >= 1 && slM <= 33) {
        const mObj = MONTHS_33[slM - 1];
        const bp = monthBasics[slM];
        const isHalf = (slType === '2');
        const days = isHalf ? 15 : 30;
        const slBp = isHalf ? Math.round(bp / 2) : bp;
        const full30 = Math.round(bp * DA_RATES.SL_RATE);
        const amount = isHalf ? Math.round(full30 / 2) : full30;
        totalSlAmount += amount;
        slMonthMap[slM] = { days, amount, slBp, isHalf };
        slChipsData.push({
          monthName: mObj.name,
          days: days,
          amount: amount,
          slBp: slBp
        });
      }
    });

    // 5.6 Calculate DA Rate 1 Table (Jan-2024 to Sep-2026 = 33 Months)
    let da1TotBasic = 0;
    let da1TotEligible = 0;
    let da1TotDrawn = 0;
    let da1TotDiff = 0;
    let da1TotCps = 0;
    let da1TotCash = 0;

    let da1RowsHtml = '';

    for (let i = 0; i < 33; i++) {
      const mObj = MONTHS_33[i];
      const mIdx = i + 1;
      const bp = monthBasics[mIdx];
      const eligible = Math.round(bp * DA_RATES.DA_1_RATE);
      const drawn = Math.round(bp * DA_RATES.DRAWN_DA_RATE);
      const diff = eligible - drawn;
      const cps = isCPS ? Math.round(diff * DA_RATES.CPS_RATE) : 0;
      const cash = isCPS ? (diff - cps) : diff;

      // Surrender Leave for this month (if any)
      const slEntry = slMonthMap[mIdx];

      // Check if AGI or AAS occurred in this month
      const isAgiMonth = (incM >= 1 && incM <= 12 && mObj.month === incM);
      const isAasMonth = (hasAas && aasM === mIdx);

      let badgesHtml = '';
      if (isAgiMonth) {
        badgesHtml += `<span class="badge-agi">AGI</span>`;
      }
      if (isAasMonth) {
        badgesHtml += `<span class="badge-aas">AAS${aasD > 1 ? ` (${aasD}th)` : ''}</span>`;
      }

      const monthCellHtml = `
        <div class="month-cell">
          <span class="month-cell-title">${mObj.name}</span>
          ${badgesHtml ? `<div class="month-badges-wrap">${badgesHtml}</div>` : ''}
        </div>
      `;

      da1TotBasic += bp;
      da1TotEligible += eligible;
      da1TotDrawn += drawn;
      da1TotDiff += diff;
      da1TotCps += cps;
      da1TotCash += cash;

      da1RowsHtml += `
        <tr>
          <th>${monthCellHtml}</th>
          <td>${formatINR(bp)}</td>
          <td>${formatINR(eligible)}</td>
          <td>${formatINR(drawn)}</td>
          <td>${formatINR(diff)}</td>
          <td class="col-cps">${isCPS ? formatINR(cps) : '—'}</td>
          <td class="col-cash">${formatINR(cash)}</td>
        </tr>
      `;

      // If Surrender Leave taken in this month, display as a dedicated highlighted row
      if (slEntry) {
        const isHalf = slEntry.isHalf;
        const slBp = slEntry.slBp;
        const slEligible = isHalf ? Math.round(Math.round(bp * DA_RATES.DA_1_RATE) / 2) : Math.round(bp * DA_RATES.DA_1_RATE);
        const slDrawn = isHalf ? Math.round(Math.round(bp * DA_RATES.DRAWN_DA_RATE) / 2) : Math.round(bp * DA_RATES.DRAWN_DA_RATE);
        const slDiff = slEligible - slDrawn;
        const slCps = 0; // Surrender Leave has NO CPS 10% deduction - 100% Direct Net Cash
        const slCash = slDiff; // 100% Direct Net Cash

        da1TotBasic += slBp;
        da1TotEligible += slEligible;
        da1TotDrawn += slDrawn;
        da1TotDiff += slDiff;
        // No CPS deduction on Surrender Leave (da1TotCps does not add slCps)
        da1TotCash += slCash;

        da1RowsHtml += `
          <tr class="sl-table-row">
            <th>
              <div class="month-cell">
                <span class="month-cell-title" style="color:#b45309;">${mObj.name}</span>
                <span class="badge-sl">SL (${slEntry.days}d)</span>
              </div>
            </th>
            <td>${formatINR(slBp)}</td>
            <td>${formatINR(slEligible)}</td>
            <td>${formatINR(slDrawn)}</td>
            <td style="color:#b45309; font-weight:800;">₹${formatINR(slDiff)}</td>
            <td class="col-cps" style="color:#64748b; font-weight:normal;" title="సరెండర్ లీవ్ పై CPS 10% కటింగ్ ఉండదు (100% Direct Net Cash)">—</td>
            <td class="col-cash" style="font-weight:700;">${formatINR(slCash)}</td>
          </tr>
        `;
      }
    }

    da1RowsHtml += `
      <tr class="total-row">
        <th>TOTAL</th>
        <td>${formatINR(da1TotBasic)}</td>
        <td>${formatINR(da1TotEligible)}</td>
        <td>${formatINR(da1TotDrawn)}</td>
        <td style="font-weight:800; color:#1e3a8a;">₹${formatINR(da1TotDiff)}</td>
        <td class="col-cps">${isCPS ? formatINR(da1TotCps) : '—'}</td>
        <td class="col-cash">${formatINR(da1TotCash)}</td>
      </tr>
    `;
    da1TableBody.innerHTML = da1RowsHtml;

    // 5.7 Calculate DA Rate 2 Table (Jul-2024 to Sep-2026 = 27 Months)
    let da2TotBasic = 0;
    let da2TotEligible = 0;
    let da2TotDrawn = 0;
    let da2TotDiff = 0;
    let da2TotCps = 0;
    let da2TotCash = 0;

    let da2RowsHtml = '';

    for (let i = 6; i < 33; i++) {
      const mObj = MONTHS_33[i];
      const mIdx = i + 1;
      const bp = monthBasics[mIdx];
      const eligible = Math.round(bp * DA_RATES.DA_2_RATE);
      const drawn = Math.round(bp * DA_RATES.DA_1_RATE);
      const diff = eligible - drawn;
      const cps = isCPS ? Math.round(diff * DA_RATES.CPS_RATE) : 0;
      const cash = isCPS ? (diff - cps) : diff;

      // Surrender Leave for this month (if any)
      const slEntry = slMonthMap[mIdx];

      // Check if AGI or AAS occurred in this month
      const isAgiMonth = (incM >= 1 && incM <= 12 && mObj.month === incM);
      const isAasMonth = (hasAas && aasM === mIdx);

      let badgesHtml2 = '';
      if (isAgiMonth) {
        badgesHtml2 += `<span class="badge-agi">AGI</span>`;
      }
      if (isAasMonth) {
        badgesHtml2 += `<span class="badge-aas">AAS${aasD > 1 ? ` (${aasD}th)` : ''}</span>`;
      }

      const monthCellHtml2 = `
        <div class="month-cell">
          <span class="month-cell-title">${mObj.name}</span>
          ${badgesHtml2 ? `<div class="month-badges-wrap">${badgesHtml2}</div>` : ''}
        </div>
      `;

      da2TotBasic += bp;
      da2TotEligible += eligible;
      da2TotDrawn += drawn;
      da2TotDiff += diff;
      da2TotCps += cps;
      da2TotCash += cash;

      da2RowsHtml += `
        <tr>
          <th>${monthCellHtml2}</th>
          <td>${formatINR(bp)}</td>
          <td>${formatINR(eligible)}</td>
          <td>${formatINR(drawn)}</td>
          <td>${formatINR(diff)}</td>
          <td class="col-cps">${isCPS ? formatINR(cps) : '—'}</td>
          <td class="col-cash">${formatINR(cash)}</td>
        </tr>
      `;

      // If Surrender Leave taken in this month, display as a dedicated highlighted row
      if (slEntry) {
        const isHalf = slEntry.isHalf;
        const slBp = slEntry.slBp;
        const slEligible2 = isHalf ? Math.round(Math.round(bp * DA_RATES.DA_2_RATE) / 2) : Math.round(bp * DA_RATES.DA_2_RATE);
        const slDrawn2 = isHalf ? Math.round(Math.round(bp * DA_RATES.DA_1_RATE) / 2) : Math.round(bp * DA_RATES.DA_1_RATE);
        const slDiff2 = slEligible2 - slDrawn2;
        const slCps2 = 0; // Surrender Leave has NO CPS 10% deduction - 100% Direct Net Cash
        const slCash2 = slDiff2; // 100% Direct Net Cash

        da2TotBasic += slBp;
        da2TotEligible += slEligible2;
        da2TotDrawn += slDrawn2;
        da2TotDiff += slDiff2;
        // No CPS deduction on Surrender Leave (da2TotCps does not add slCps2)
        da2TotCash += slCash2;

        da2RowsHtml += `
          <tr class="sl-table-row">
            <th>
              <div class="month-cell">
                <span class="month-cell-title" style="color:#b45309;">${mObj.name}</span>
                <span class="badge-sl">SL (${slEntry.days}d)</span>
              </div>
            </th>
            <td>${formatINR(slBp)}</td>
            <td>${formatINR(slEligible2)}</td>
            <td>${formatINR(slDrawn2)}</td>
            <td style="color:#b45309; font-weight:800;">₹${formatINR(slDiff2)}</td>
            <td class="col-cps" style="color:#64748b; font-weight:normal;" title="సరెండర్ లీవ్ పై CPS 10% కటింగ్ ఉండదు (100% Direct Net Cash)">—</td>
            <td class="col-cash" style="font-weight:700;">${formatINR(slCash2)}</td>
          </tr>
        `;
      }
    }

    da2RowsHtml += `
      <tr class="total-row">
        <th>TOTAL</th>
        <td>${formatINR(da2TotBasic)}</td>
        <td>${formatINR(da2TotEligible)}</td>
        <td>${formatINR(da2TotDrawn)}</td>
        <td style="font-weight:800; color:#1e3a8a;">₹${formatINR(da2TotDiff)}</td>
        <td class="col-cps">${isCPS ? formatINR(da2TotCps) : '—'}</td>
        <td class="col-cash">${formatINR(da2TotCash)}</td>
      </tr>
    `;
    da2TableBody.innerHTML = da2RowsHtml;

    // 5.8 Grand Total (All DA Arrears + Surrender Leave included)
    const grandDiff = da1TotDiff + da2TotDiff;
    const grandCps = da1TotCps + da2TotCps;
    const grandCash = isCPS ? (grandDiff - grandCps) : grandDiff;

    if (gtDiff) gtDiff.textContent = `₹${formatINR(grandDiff)}`;
    if (gtCps) gtCps.textContent = isCPS ? `₹${formatINR(grandCps)}` : '—';
    if (gtCash) gtCash.textContent = `₹${formatINR(grandCash)}`;

    if (isCPS) {
      if (thGtCredit) {
        thGtCredit.innerHTML = 'Net Cash 90%<br><span style="font-size:0.72rem; font-weight:normal; opacity:0.85;">(చేతికి నగదు)</span>';
      }
      if (gtCreditVal) {
        gtCreditVal.textContent = `₹${formatINR(grandCash)}`;
        gtCreditVal.style.color = '#047857';
      }
      if (gtCreditSub) {
        gtCreditSub.innerHTML = `(CPS 10% PRAN: <strong>₹${formatINR(grandCps)}</strong>)`;
        gtCreditSub.style.color = '#64748b';
      }
    } else {
      if (thGtCredit) {
        thGtCredit.innerHTML = '100% GPF లో Adjustment<br><span style="font-size:0.72rem; font-weight:normal; opacity:0.85;">(GPF ఖాతాకు సర్దుబాటు)</span>';
      }
      if (gtCreditVal) {
        gtCreditVal.textContent = `₹${formatINR(grandDiff)}`;
        gtCreditVal.style.color = '#047857';
      }
      if (gtCreditSub) {
        gtCreditSub.innerHTML = `(పూర్తి 100% మొత్తం GPF ఖాతాకు సర్దుబాటు)`;
        gtCreditSub.style.color = '#047857';
      }
    }

    if (gtSurrenderRow) {
      gtSurrenderRow.style.display = 'none';
    }

    // 5.9 Update Summary Cards
    cardTotalArrears.textContent = `₹${formatINR(grandDiff)}`;
    if (isCPS) {
      cardCpsWrapper.style.display = 'flex';
      cardCpsLabel.textContent = 'CPS Account (10%)';
      cardCpsVal.textContent = `₹${formatINR(grandCps)}`;
      cardCashLabel.textContent = 'CPS Net Cash (90%)';
      cardCashVal.textContent = `₹${formatINR(grandCash)}`;
    } else {
      cardCpsWrapper.style.display = 'none';
      cardCashLabel.textContent = 'Total Credited to GPF (100% GPF ఖాతాకు సర్దుబాటు)';
      cardCashVal.textContent = `₹${formatINR(grandDiff)}`;
    }

    // Monthly Installments for CPS Employees ONLY (33 installments for DA 1, 27 installments for DA 2)
    // GPF Employees have NO installments; their 100% full DA arrears are directly credited / adjusted to GPF!
    if (isCPS) {
      if (cardInstallWrapper) cardInstallWrapper.style.display = 'flex';

      const da1InstDiff = Math.round(da1TotDiff / 33);
      const da1InstCps = Math.round(da1TotCps / 33);
      const da1InstCash = da1InstDiff - da1InstCps;

      const da2InstDiff = Math.round(da2TotDiff / 27);
      const da2InstCps = Math.round(da2TotCps / 27);
      const da2InstCash = da2InstDiff - da2InstCps;

      const combInstCash = da1InstCash + da2InstCash;
      const combInstCps = da1InstCps + da2InstCps;
      const combInstDiff = da1InstDiff + da2InstDiff;

      if (cardInstallIcon) cardInstallIcon.textContent = '';
      if (cardInstallTitle) cardInstallTitle.textContent = 'DA Wise Monthly Installments (నెలవారీ వాయిదాల వివరాలు)';
      if (cardInstallBadge) {
        cardInstallBadge.textContent = '1/33 & 1/27 వాయిదాలు (CPS 90% Net Cash)';
        cardInstallBadge.style.background = 'rgba(255, 255, 255, 0.22)';
      }

      cardInstallSplit.innerHTML = `
        <div class="inst-mobile-cards">
          <!-- Card 1: 1st DA (1/33 Installment) -->
          <div class="inst-mcard inst-mcard--da1">
            <div class="inst-mcard-top">
              <span class="inst-mcard-badge tag-da1">1st DA • 33 నెలలు</span>
              <span class="inst-mcard-go">G.O.Ms.No. 128 (37.31%)</span>
            </div>
            
            <div class="inst-mcard-main">
              <div class="inst-mcard-title">1/33 వాయిదా (చేతికి వచ్చే నగదు 90%):</div>
              <div class="inst-mcard-val-row">
                <span class="inst-mcard-bigval">₹${formatINR(da1InstCash)}</span>
                <span class="inst-mcard-permonth">/ ప్రతి నెలా (33 వాయిదాలు)</span>
              </div>
            </div>

            <div class="inst-mcard-footer">
              <div class="inst-mcard-foot-item">
                <span class="inst-foot-lbl">CPS 10% PRAN:</span>
                <strong class="inst-foot-val inst-cps-val">₹${formatINR(da1InstCps)}</strong>
              </div>
              <div class="inst-foot-divider"></div>
              <div class="inst-mcard-foot-item">
                <span class="inst-foot-lbl">నెలకు మొత్తం (100%):</span>
                <strong class="inst-foot-val inst-tot-val">₹${formatINR(da1InstDiff)}</strong>
              </div>
            </div>
          </div>

          <!-- Card 2: 2nd DA (1/27 Installment) -->
          <div class="inst-mcard inst-mcard--da2">
            <div class="inst-mcard-top">
              <span class="inst-mcard-badge tag-da2">2nd DA • 27 నెలలు</span>
              <span class="inst-mcard-go">G.O.Ms.No. 130 (40.04%)</span>
            </div>
            
            <div class="inst-mcard-main">
              <div class="inst-mcard-title">1/27 వాయిదా (చేతికి వచ్చే నగదు 90%):</div>
              <div class="inst-mcard-val-row">
                <span class="inst-mcard-bigval">₹${formatINR(da2InstCash)}</span>
                <span class="inst-mcard-permonth">/ ప్రతి నెలా (27 వాయిదాలు)</span>
              </div>
            </div>

            <div class="inst-mcard-footer">
              <div class="inst-mcard-foot-item">
                <span class="inst-foot-lbl">CPS 10% PRAN:</span>
                <strong class="inst-foot-val inst-cps-val">₹${formatINR(da2InstCps)}</strong>
              </div>
              <div class="inst-foot-divider"></div>
              <div class="inst-mcard-foot-item">
                <span class="inst-foot-lbl">నెలకు మొత్తం (100%):</span>
                <strong class="inst-foot-val inst-tot-val">₹${formatINR(da2InstDiff)}</strong>
              </div>
            </div>
          </div>

          <!-- Card 3: Combined Installments -->
          <div class="inst-mcard inst-mcard--comb">
            <div class="inst-mcard-top">
              <span class="inst-mcard-badge tag-comb">⚡ రెండు DA ల వాయిదాలు కలిపి</span>
              <span class="inst-mcard-go">Jul 2024 నుండి Sep 2026 వరకు (27 నెలలు)</span>
            </div>
            
            <div class="inst-mcard-main">
              <div class="inst-mcard-title">1/33 &amp; 1/27 కలిపి ప్రతి నెలా చేతికి వచ్చే మొత్తం నగదు:</div>
              <div class="inst-mcard-val-row">
                <span class="inst-mcard-bigval inst-mcard-bigval--comb">₹${formatINR(combInstCash)}</span>
                <span class="inst-mcard-permonth">/ ప్రతి నెలా (Net Cash 90%)</span>
              </div>
            </div>

            <div class="inst-mcard-footer">
              <div class="inst-mcard-foot-item">
                <span class="inst-foot-lbl">CPS 10% PRAN కలిపి:</span>
                <strong class="inst-foot-val inst-cps-val">₹${formatINR(combInstCps)}</strong>
              </div>
              <div class="inst-foot-divider"></div>
              <div class="inst-mcard-foot-item">
                <span class="inst-foot-lbl">నెలకు మొత్తం కలిపి (100%):</span>
                <strong class="inst-foot-val inst-tot-val">₹${formatINR(combInstDiff)}</strong>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      // GPF EMPLOYEES: Completely remove / hide DA Wise Installments!
      // GPF has NO installments; 100% full DA arrears is adjusted directly to GPF.
      if (cardInstallWrapper) {
        cardInstallWrapper.style.display = 'none';
      }
    }

    // Update table headers for CPS vs GPF
    document.querySelectorAll('th.col-cash').forEach(th => {
      th.innerHTML = isCPS ? 'CPS Net Cash<br>(90%)' : 'GPF Credit<br>(100% సర్దుబాటు)';
    });

    // Surrender Leave Card (Removed from results view)
    if (cardSlWrapper) {
      cardSlWrapper.style.display = 'none';
    }

    // 5.10 October 2026 Salary Banner / Card (Payable in Nov 2026)
    const bpOct = monthBasics[33]; // Sep 2026 basic pay applies for Oct 2026
    const octDiff1 = Math.round(bpOct * DA_RATES.DA_1_RATE) - Math.round(bpOct * DA_RATES.DRAWN_DA_RATE);
    const octDiff2 = Math.round(bpOct * DA_RATES.DA_2_RATE) - Math.round(bpOct * DA_RATES.DA_1_RATE);

    const octCps1 = isCPS ? Math.round(octDiff1 * DA_RATES.CPS_RATE) : 0;
    const octCash1 = isCPS ? (octDiff1 - octCps1) : octDiff1;

    const octCps2 = isCPS ? Math.round(octDiff2 * DA_RATES.CPS_RATE) : 0;
    const octCash2 = isCPS ? (octDiff2 - octCps2) : octDiff2;

    const octTotalCash = octCash1 + octCash2;
    const octTotalCps = octCps1 + octCps2;

    octBigCash.textContent = `₹${formatINR(octTotalCash)}`;
    octBadgeCash.textContent = isCPS ? 'CASH IN HAND (90%)' : 'CASH IN SALARY (100%)';

    if (isCPS) {
      octCpsPill.style.display = 'flex';
      octCpsVal.textContent = `₹${formatINR(octTotalCps)}`;
    } else {
      octCpsPill.style.display = 'none';
    }

    octDa1Cash.textContent = `Cash: ₹${formatINR(octCash1)}`;
    octDa1Cps.textContent = isCPS ? `CPS: ₹${formatINR(octCps1)}` : 'GPF 100%';

    octDa2Cash.textContent = `Cash: ₹${formatINR(octCash2)}`;
    octDa2Cps.textContent = isCPS ? `CPS: ₹${formatINR(octCps2)}` : 'GPF 100%';

    // Update Top October 2026 Highlight Card (beside Author Photo)
    if (topOctTotal) topOctTotal.textContent = `₹${formatINR(octDiff1 + octDiff2)}`;
    if (topOctCash) topOctCash.textContent = `₹${formatINR(octTotalCash)}`;
    if (topOctCps) topOctCps.textContent = `₹${formatINR(octTotalCps)}`;
    if (topOctCpsChip) {
      topOctCpsChip.style.display = isCPS ? 'inline-flex' : 'none';
    }

    // 5.11 Combined Installment Payment Table (if present in DOM)
    if (installmentTableBody && installmentMobileContainer) {
      const installMonths = [
        'Oct 2026', 'Nov 2026', 'Dec 2026',
        'Jan 2027', 'Feb 2027', 'Mar 2027', 'Apr 2027', 'May 2027', 'Jun 2027', 'Jul 2027', 'Aug 2027', 'Sep 2027', 'Oct 2027', 'Nov 2027', 'Dec 2027',
        'Jan 2028', 'Feb 2028', 'Mar 2028', 'Apr 2028', 'May 2028', 'Jun 2028', 'Jul 2028', 'Aug 2028', 'Sep 2028', 'Oct 2028', 'Nov 2028', 'Dec 2028',
        'Jan 2029', 'Feb 2029', 'Mar 2029', 'Apr 2029', 'May 2029', 'Jun 2029'
      ];

      let instRowsHtml = `
        <tr class="row-installment-total">
          <th colspan="2">Total</th>
          <td>₹${formatINR(da1TotCash)}</td>
          <td>${isCPS ? '₹' + formatINR(da1TotCps) : '—'}</td>
          <td>₹${formatINR(da2TotCash)}</td>
          <td>${isCPS ? '₹' + formatINR(da2TotCps) : '—'}</td>
          <td>₹${formatINR(da1TotCash + da2TotCash)}</td>
          <td>${isCPS ? '₹' + formatINR(da1TotCps + da2TotCps) : '—'}</td>
        </tr>
      `;

      let mobileCardsHtml = '';

      for (let idx = 0; idx < 33; idx++) {
        const slNo = idx + 1;
        const mName = installMonths[idx];
        const hasDa2 = (slNo <= 27);

        const d1Cash = da1InstCash;
        const d1Cps = isCPS ? da1InstCps : 0;

        const d2Cash = hasDa2 ? da2InstCash : 0;
        const d2Cps = (hasDa2 && isCPS) ? da2InstCps : 0;

        const totCash = d1Cash + d2Cash;
        const totCps = d1Cps + d2Cps;

        instRowsHtml += `
          <tr>
            <td><span class="inst-pill">#${slNo}</span></td>
            <td><strong>${mName}</strong></td>
            <td><span class="val-cash">₹${formatINR(d1Cash)}</span></td>
            <td><span class="val-cps">${isCPS ? '₹' + formatINR(d1Cps) : '—'}</span></td>
            <td><span class="val-cash">${hasDa2 ? '₹' + formatINR(d2Cash) : '—'}</span></td>
            <td><span class="val-cps">${(hasDa2 && isCPS) ? '₹' + formatINR(d2Cps) : '—'}</span></td>
            <td><span class="val-cash">₹${formatINR(totCash)}</span></td>
            <td><span class="val-cps">${isCPS ? '₹' + formatINR(totCps) : '—'}</span></td>
          </tr>
        `;

        mobileCardsHtml += `
          <article class="install-mobile-card">
            <header class="install-mobile-head">
              <span class="install-badge">#${slNo}</span>
              <span class="install-month-title">${mName}</span>
              <span style="font-size:0.72rem; color:#fde047; font-weight:800;">${hasDa2 ? 'DA 1 + DA 2' : 'DA 1 Only'}</span>
            </header>
            <div class="install-mobile-body">
              <div class="install-mobile-line">
                <span class="line-label">DA 1 (37.31%)</span>
                <div>
                  <span class="val-cash">Cash ₹${formatINR(d1Cash)}</span>
                  ${isCPS ? `<span class="val-cps" style="margin-left:6px;">CPS ₹${formatINR(d1Cps)}</span>` : ''}
                </div>
              </div>
              ${hasDa2 ? `
              <div class="install-mobile-line">
                <span class="line-label">DA 2 (40.04%)</span>
                <div>
                  <span class="val-cash">Cash ₹${formatINR(d2Cash)}</span>
                  ${isCPS ? `<span class="val-cps" style="margin-left:6px;">CPS ₹${formatINR(d2Cps)}</span>` : ''}
                </div>
              </div>` : ''}
              <div class="install-mobile-line install-mobile-line--sum">
                <span class="line-label">Month Total</span>
                <div>
                  <span class="val-cash" style="font-size:1rem;">Cash ₹${formatINR(totCash)}</span>
                  ${isCPS ? `<span class="val-cps" style="margin-left:6px;">CPS ₹${formatINR(totCps)}</span>` : ''}
                </div>
              </div>
            </div>
          </article>
        `;
      }

      installmentTableBody.innerHTML = instRowsHtml;
      installmentMobileContainer.innerHTML = mobileCardsHtml;
    }

    // Show/hide CPS columns if GPF
    document.querySelectorAll('.col-cps').forEach(el => {
      el.style.display = isCPS ? '' : 'none';
    });
  }

  // --- 6. Event Listeners ---
  // Form input changes trigger instant recalculation
  basicpay.addEventListener('change', () => {
    calculateAndRender();
    // When Basic Pay is selected, automatically scroll to Increment Month
    if (basicpay.value && basicpay.value !== '') {
      const incEl = document.getElementById('incMonthGroup') || document.getElementById('incmonth');
      if (incEl) {
        setTimeout(() => {
          incEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (incmonth) {
            incmonth.focus({ preventScroll: true });
          }
        }, 150);
      }
    }
  });
  incmonth.addEventListener('change', () => {
    calculateAndRender();
    // When Increment Month is selected, REVEAL & SCROLL TO SURRENDER LEAVE 2024!
    if (surrenderContainer) {
      surrenderContainer.style.display = 'block';
      setTimeout(() => {
        const item2024 = document.getElementById('sl-item-2024') || surrenderContainer;
        item2024.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        const sl2024 = document.getElementById('sl2024');
        if (sl2024) sl2024.focus({ preventScroll: true });
      }, 150);
    }
  });

  cpsorgpf.addEventListener('change', calculateAndRender);

  aas.addEventListener('change', () => {
    if (aas.value === '2') {
      aasYearDiv.style.display = 'block';
      setTimeout(() => {
        aasYearDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        aasyear.focus({ preventScroll: true });
      }, 100);
    } else {
      aasYearDiv.style.display = 'none';
      aasMonthDiv.style.display = 'none';
      aasDayDiv.style.display = 'none';
      aasyear.value = '0';
      aasmonth.value = '0';
      aasday.value = '1';
    }
    calculateAndRender();
  });

  aasyear.addEventListener('change', () => {
    updateAasMonths();
    calculateAndRender();
  });

  aasmonth.addEventListener('change', () => {
    updateAasDays();
    calculateAndRender();
  });

  aasday.addEventListener('change', calculateAndRender);

  // Calculate Button click scrolls to results
  btnCalculate.addEventListener('click', () => {
    const hasBasic = (basicpay && basicpay.value && basicpay.value !== '');
    if (!hasBasic) {
      alert('దయచేసి ముందుగా మీ Basic Pay (Select Basic Pay As On 30-Sep-2026) ఎంచుకోండి!');
      basicpay.focus();
      basicpay.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    calculateAndRender();
    const resEl = document.getElementById('results');
    if (resEl) {
      resEl.style.display = 'block';
      resEl.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const calcAuthorCompanion = document.getElementById('calcAuthorCompanion');
  if (calcAuthorCompanion) {
    calcAuthorCompanion.addEventListener('click', () => {
      btnCalculate.click();
    });
  }

  // Action: Print
  btnPrint.addEventListener('click', () => {
    window.print();
  });

  // Action: WhatsApp Share / Copy Summary
  btnShare.addEventListener('click', () => {
    const activeBp = basicpay.value;
    const isCPS = (cpsorgpf.value === '1');
    const totArr = cardTotalArrears.textContent;
    const cashVal = cardCashVal.textContent;
    const cpsVal = cardCpsVal.textContent;
    const octVal = octBigCash.textContent;

    const summaryText = [
      `📊 *Telangana Govt 2 DAs Difference & Arrears Statement*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🔹 Basic Pay (As On Sep-2026): ₹${formatINR(activeBp)}`,
      `🔹 Scheme: ${isCPS ? 'CPS (10% PRAN Deduction / 90% Net Cash)' : 'GPF (100% GPF Total Adjustment - No Installments)'}`,
      isCPS ? `💰 *Total DA Arrears:* ${totArr}` : `🏛️ *Grand Total GPF Adjustment:* ${totArr}`,
      isCPS ? `🏛️ *CPS Account (10%):* ${cpsVal}` : null,
      isCPS ? `💵 *CPS Net Cash (90%):* ${cashVal}` : `✅ *100% మొత్తం నేరుగా GPF ఖాతాకు సర్దుబాటు (వాయిదాలు ఉండవు)*`,
      `🎉 *Oct-2026 Monthly Cash Hike:* ${octVal} / month`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `✅ Sanctioned vide G.O.Ms.128 (37.31%) & G.O.Ms.130 (40.04%)`,
      `Prepared by: Nancharla Prudhvi, Senior Accountant, Khammam Treasury`
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(summaryText).then(() => {
      const origText = btnShare.innerHTML;
      btnShare.innerHTML = '<span>✅</span><span>Copied to Clipboard!</span>';
      setTimeout(() => { btnShare.innerHTML = origText; }, 2500);
    }).catch(() => {
      alert(summaryText);
    });
  });

  // Action: Reset
  btnReset.addEventListener('click', () => {
    basicpay.value = '';
    basicSearch.value = '';
    incmonth.value = '0';
    if (surrenderContainer) surrenderContainer.style.display = 'none';
    if (aasSectionContainer) aasSectionContainer.style.display = 'none';
    aas.value = '1';
    if (aasYearDiv) aasYearDiv.style.display = 'none';
    if (aasMonthDiv) aasMonthDiv.style.display = 'none';
    if (aasDayDiv) aasDayDiv.style.display = 'none';
    if (aasyear) aasyear.value = '0';
    aasmonth.value = '0';
    aasday.value = '1';
    cpsorgpf.value = '1';

    surrenderYears.forEach((sy, idx) => {
      if (sy.slSelect) sy.slSelect.value = '1';
      if (sy.monthDiv) sy.monthDiv.style.display = 'none';
      if (sy.monthSelect) sy.monthSelect.value = '0';
      if (sy.item) sy.item.style.display = (idx === 0) ? 'block' : 'none';
      if (sy.chip) {
        sy.chip.classList.toggle('year-chip--active', idx === 0);
        sy.chip.classList.remove('year-chip--completed');
      }
    });

    calculateAndRender();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Accordion Toggle
  tsTableToggle.addEventListener('click', () => {
    const isHidden = (tsTableContent.style.display === 'none');
    tsTableContent.style.display = isHidden ? 'block' : 'none';
    tsTableArrow.textContent = isHidden ? '▲' : '▼';
  });

  // --- Initial Launch ---
  populateDropdowns();
  initSurrenderLeaveHandlers();
  initSearchFilter();
  calculateAndRender();

  // Mobile Auto-Scroll & Open Basic Pay on load
  const isMobile = window.innerWidth <= 768;
  setTimeout(() => {
    if (isMobile && basicpay) {
      basicpay.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Trigger focus and touch dropdown if supported
      basicpay.focus({ preventScroll: true });
    }
  }, 350);
});
