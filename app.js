// Telangana Government DA Difference & Arrears Calculator Application Script (English)

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const basicSelect = document.getElementById('basicSelect');
  const searchInput = document.getElementById('searchInput');
  const customPayCheck = document.getElementById('customPayCheck');
  const customPayWrapper = document.getElementById('customPayWrapper');
  const customPayInput = document.getElementById('customPayInput');

  // DA Rate Selectors
  const daPresetButtons = document.querySelectorAll('.da-preset-btn');
  const customNewRate = document.getElementById('customNewRate');
  const customDrawnRate = document.getElementById('customDrawnRate');
  const calculatedDiffBadge = document.getElementById('calculatedDiffBadge');
  const diffFormulaText = document.getElementById('diffFormulaText');
  const newDaSelect = document.getElementById('newDaSelect');

  // TS Cumulative DA Reference Table
  const tsTableToggle = document.getElementById('tsTableToggle');
  const tsTableContent = document.getElementById('tsTableContent');
  const tsTableArrow = document.getElementById('tsTableArrow');
  const tsCumulativeTableBody = document.getElementById('tsCumulativeTableBody');

  // Header Displays
  const headerNewDaDisplay = document.getElementById('headerNewDaDisplay');
  const headerDrawnDaDisplay = document.getElementById('headerDrawnDaDisplay');
  const headerDiffDisplay = document.getElementById('headerDiffDisplay');

  // Increment Month Elements
  const incrChips = document.getElementById('incrChips');
  const incrDropdownWrapper = document.getElementById('incrDropdownWrapper');
  const incrMonthSelect = document.getElementById('incrMonthSelect');
  const incrInfoCard = document.getElementById('incrInfoCard');
  const infoIncrMonthBadge = document.getElementById('infoIncrMonthBadge');
  const infoPreBasic = document.getElementById('infoPreBasic');
  const infoAGI = document.getElementById('infoAGI');
  const infoPostBasic = document.getElementById('infoPostBasic');
  const incrMonthsSplitWrapper = document.getElementById('incrMonthsSplitWrapper');
  const incrSplitBadge = document.getElementById('incrSplitBadge');
  const preIncrMonthsInput = document.getElementById('preIncrMonthsInput');
  const postIncrMonthsInput = document.getElementById('postIncrMonthsInput');

  // Employee Category
  const employeeTypeRadios = document.querySelectorAll('input[name="employeeType"]');
  const labelCps = document.getElementById('labelCps');
  const labelGpf = document.getElementById('labelGpf');

  // Months
  const monthButtons = document.querySelectorAll('.month-btn');
  const customMonthsWrapper = document.getElementById('customMonthsWrapper');
  const customMonthsInput = document.getElementById('customMonthsInput');

  // Display Elements
  const heroMonthlyDiff = document.getElementById('heroMonthlyDiff');
  const heroNetCash = document.getElementById('heroNetCash');
  const heroBasicDisplay = document.getElementById('heroBasicDisplay');
  const heroDurationBadge = document.getElementById('heroDurationBadge');
  const heroNetLabel = document.getElementById('heroNetLabel');

  const metricBasic = document.getElementById('metricBasic');
  const metricDrawnDA = document.getElementById('metricDrawnDA');
  const metricNewDA = document.getElementById('metricNewDA');
  const metricDiff = document.getElementById('metricDiff');
  const metricCPS = document.getElementById('metricCPS');
  const metricNet = document.getElementById('metricNet');

  const lblMetricDrawn = document.getElementById('lblMetricDrawn');
  const lblMetricNew = document.getElementById('lblMetricNew');
  const lblMetricDiff = document.getElementById('lblMetricDiff');
  const lblMetricCPS = document.getElementById('lblMetricCPS');
  const fnMetricCPS = document.getElementById('fnMetricCPS');
  const lblMetricNet = document.getElementById('lblMetricNet');
  const fnMetricNet = document.getElementById('fnMetricNet');

  const arrearsSummaryBox = document.getElementById('arrearsSummaryBox');
  const arrearsBadge = document.getElementById('arrearsBadge');
  const arrPreIncrRow = document.getElementById('arrPreIncrRow');
  const arrPreIncrLabel = document.getElementById('arrPreIncrLabel');
  const arrPreIncrVal = document.getElementById('arrPreIncrVal');
  const arrPostIncrRow = document.getElementById('arrPostIncrRow');
  const arrPostIncrLabel = document.getElementById('arrPostIncrLabel');
  const arrPostIncrVal = document.getElementById('arrPostIncrVal');

  const arrTotalGross = document.getElementById('arrTotalGross');
  const arrCpsRow = document.getElementById('arrCpsRow');
  const arrTotalCPS = document.getElementById('arrTotalCPS');
  const arrNetTitle = document.getElementById('arrNetTitle');
  const arrTotalNet = document.getElementById('arrTotalNet');

  const slipStage = document.getElementById('slipStage');
  const slipBasic = document.getElementById('slipBasic');
  const slipRowIncr = document.getElementById('slipRowIncr');
  const slipIncrMonthText = document.getElementById('slipIncrMonthText');
  const slipIncrDetailsText = document.getElementById('slipIncrDetailsText');
  const slipNewRate = document.getElementById('slipNewRate');
  const slipNewDA = document.getElementById('slipNewDA');
  const slipDrawnRate = document.getElementById('slipDrawnRate');
  const slipDrawnDA = document.getElementById('slipDrawnDA');
  const slipDiffRate = document.getElementById('slipDiffRate');
  const slipMonthlyDiff = document.getElementById('slipMonthlyDiff');
  const slipRowCPS = document.getElementById('slipRowCPS');
  const slipCPS = document.getElementById('slipCPS');
  const slipRowNetTitle = document.getElementById('slipRowNetTitle');
  const slipDuration = document.getElementById('slipDuration');
  const slipNet = document.getElementById('slipNet');
  const slipRowArrTotal = document.getElementById('slipRowArrTotal');
  const slipArrDurationLabel = document.getElementById('slipArrDurationLabel');
  const slipArrTotalNet = document.getElementById('slipArrTotalNet');

  const btnPrint = document.getElementById('btnPrint');
  const btnCopy = document.getElementById('btnCopy');
  const btnReset = document.getElementById('btnReset');
  const toast = document.getElementById('toast');

  // Application State
  let currentMonths = 1;
  let isCustomMonths = false;
  let selectedIncrMonth = 'none'; // 'none', or 1-12
  const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // 1. Populate Basic Pay Select Dropdown
  function populateBasicSelect(records = DA_RECORDS) {
    const selectedVal = basicSelect.value || '19000';
    basicSelect.innerHTML = '';

    records.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.basic;
      opt.textContent = `₹${r.basic.toLocaleString('en-IN')}`;
      basicSelect.appendChild(opt);
    });

    if (records.some(r => String(r.basic) === String(selectedVal))) {
      basicSelect.value = selectedVal;
    } else if (records.length > 0) {
      basicSelect.value = records[0].basic;
    }
  }

  populateBasicSelect();

  // 2. Search filter for Basic Pay
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      populateBasicSelect(DA_RECORDS);
    } else {
      const filtered = DA_RECORDS.filter(r =>
        String(r.basic).includes(query) ||
        String(r.diff).includes(query)
      );
      populateBasicSelect(filtered);
    }
    updateCalculations();
  });

  // 3. Custom Pay Checkbox
  customPayCheck.addEventListener('change', () => {
    if (customPayCheck.checked) {
      customPayWrapper.style.display = 'block';
      basicSelect.disabled = true;
      if (!customPayInput.value) {
        customPayInput.value = basicSelect.value;
      }
      customPayInput.focus();
    } else {
      customPayWrapper.style.display = 'none';
      basicSelect.disabled = false;
    }
    updateCalculations();
  });

  customPayInput.addEventListener('input', () => {
    updateCalculations();
  });

  // 4. Basic Select Change
  basicSelect.addEventListener('change', () => {
    updateCalculations();
  });

  // 5. Populate Telangana State Cumulative DA Selectors & Reference Table
  function populateTsCumulativeDA() {
    newDaSelect.innerHTML = '';

    // Populate dropdown with all Cumulative DAs from the image
    TS_CUMULATIVE_DA_TABLE.slice().reverse().forEach(row => {
      const optNew = document.createElement('option');
      optNew.value = row.cumulative;
      const daPrefix = row.daCount ? `${row.daCount} - ` : '';
      const tagNew = row.isNew ? ' (New Installment)' : (row.isLastDrawn ? ' (Last Drawn DA)' : '');
      optNew.textContent = `${daPrefix}${row.period}: ${row.cumulative}%${tagNew}`;
      newDaSelect.appendChild(optNew);
    });

    newDaSelect.value = '41.86';
    customDrawnRate.value = '33.67'; // Permanently fixed to July 2023

    // Populate Reference Table
    tsCumulativeTableBody.innerHTML = '';
    TS_CUMULATIVE_DA_TABLE.forEach(row => {
      const tr = document.createElement('tr');
      if (row.isNew) {
        tr.style.background = '#f0fdf4';
        tr.style.fontWeight = 'bold';
      } else if (row.isLastDrawn) {
        tr.style.background = '#fef3c7';
        tr.style.fontWeight = 'bold';
      }
      const periodLabel = row.daCount ? `<strong>${row.daCount}</strong> (${row.period})` : row.period;
      tr.innerHTML = `
        <td style="padding: 5px 6px; border-bottom: 1px solid #e2e8f0;">${periodLabel}</td>
        <td style="padding: 5px 6px; border-bottom: 1px solid #e2e8f0; text-align: right;">${row.incr}%</td>
        <td style="padding: 5px 6px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #047857;">${row.cumulative}%</td>
        <td style="padding: 5px 6px; border-bottom: 1px solid #e2e8f0; font-size: 0.72rem; color: #64748b;">${row.remarks}</td>
      `;
      tsCumulativeTableBody.appendChild(tr);
    });
  }

  populateTsCumulativeDA();

  // Accordion toggle for reference table
  if (tsTableToggle && tsTableContent) {
    tsTableToggle.addEventListener('click', () => {
      tsTableContent.classList.toggle('open');
      tsTableArrow.textContent = tsTableContent.classList.contains('open') ? '▲' : '▼';
    });
  }

  // Handle New Cumulative DA change
  newDaSelect.addEventListener('change', () => {
    customNewRate.value = newDaSelect.value;
    syncDaPresetActive();
    updateCalculations();
  });

  // DA Preset Buttons (3 DAs: 41.86%, Jan 24: 37.31%, Jul 24: 40.04%, Jul 25: 44.59%)
  daPresetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      daPresetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (btn.dataset.new) {
        customNewRate.value = btn.dataset.new;
        newDaSelect.value = btn.dataset.new;
      }
      updateCalculations();
    });
  });

  customNewRate.addEventListener('input', () => {
    newDaSelect.value = customNewRate.value;
    syncDaPresetActive();
    updateCalculations();
  });

  function syncDaPresetActive() {
    const n = parseFloat(customNewRate.value);

    daPresetButtons.forEach(b => {
      if (b.dataset.new) {
        if (parseFloat(b.dataset.new) === n) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      }
    });
  }

  // 7. Increment Month Controls (Selectable & Changeable)
  incrChips.addEventListener('click', (e) => {
    const btn = e.target.closest('.incr-btn');
    if (!btn) return;

    incrChips.querySelectorAll('.incr-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const m = btn.dataset.month;
    if (m === 'more') {
      incrDropdownWrapper.style.display = 'block';
      if (incrMonthSelect.value !== 'none') {
        selectedIncrMonth = parseInt(incrMonthSelect.value);
      }
    } else {
      incrDropdownWrapper.style.display = 'none';
      selectedIncrMonth = m === 'none' ? 'none' : parseInt(m);
      incrMonthSelect.value = m;
    }
    recalculateIncrementSplit();
    updateCalculations();
  });

  incrMonthSelect.addEventListener('change', () => {
    const val = incrMonthSelect.value;
    selectedIncrMonth = val === 'none' ? 'none' : parseInt(val);

    // Sync button state if it's 1, 4, 7, 10 or none
    incrChips.querySelectorAll('.incr-btn').forEach(b => {
      if (b.dataset.month === val) {
        b.classList.add('active');
      } else if (b.dataset.month === 'more' && ['2','3','5','6','8','9','11','12'].includes(val)) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    recalculateIncrementSplit();
    updateCalculations();
  });

  function recalculateIncrementSplit() {
    if (selectedIncrMonth === 'none' || currentMonths <= 1) {
      return;
    }
    const m = parseInt(selectedIncrMonth);
    let pre = 0;
    if (currentMonths >= 12) {
      pre = Math.max(0, Math.min(currentMonths, m - 1));
    } else {
      pre = Math.floor(currentMonths / 2);
    }
    const post = Math.max(0, currentMonths - pre);
    preIncrMonthsInput.value = pre;
    postIncrMonthsInput.value = post;
  }

  preIncrMonthsInput.addEventListener('input', () => {
    updateCalculations();
  });

  postIncrMonthsInput.addEventListener('input', () => {
    updateCalculations();
  });

  // 8. Employee Type Radios
  employeeTypeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const isCps = radio.value === 'CPS';
      labelCps.classList.toggle('active', isCps);
      labelGpf.classList.toggle('active', !isCps);
      updateCalculations();
    });
  });

  // 9. Months Selector
  monthButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      monthButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const val = btn.dataset.months;
      if (val === 'custom') {
        isCustomMonths = true;
        customMonthsWrapper.style.display = 'block';
        currentMonths = Math.max(1, parseInt(customMonthsInput.value) || 1);
        customMonthsInput.focus();
      } else {
        isCustomMonths = false;
        customMonthsWrapper.style.display = 'none';
        currentMonths = parseInt(val);
      }
      recalculateIncrementSplit();
      updateCalculations();
    });
  });

  customMonthsInput.addEventListener('input', () => {
    currentMonths = Math.max(1, parseInt(customMonthsInput.value) || 1);
    recalculateIncrementSplit();
    updateCalculations();
  });

  // 10. Main Calculation Updater
  function updateCalculations() {
    let basicPay = 19000;
    if (customPayCheck.checked) {
      basicPay = Number(customPayInput.value) || 0;
    } else {
      basicPay = Number(basicSelect.value) || 19000;
    }

    const employeeType = document.querySelector('input[name="employeeType"]:checked').value;
    const isCPS = employeeType === 'CPS';

    const newRateVal = parseFloat(customNewRate.value) || 41.86;
    const drawnRateVal = parseFloat(customDrawnRate.value) || 33.67;
    const diffRateVal = +( (newRateVal - drawnRateVal).toFixed(2) );

    // Update Header Displays
    headerNewDaDisplay.textContent = `${newRateVal}%`;
    headerDrawnDaDisplay.textContent = `${drawnRateVal}%`;
    headerDiffDisplay.textContent = `${diffRateVal >= 0 ? '+' : ''}${diffRateVal}%`;
    calculatedDiffBadge.textContent = `${diffRateVal >= 0 ? '+' : ''}${diffRateVal}%`;
    if (diffFormulaText) {
      diffFormulaText.textContent = `(${newRateVal}% - ${drawnRateVal}% = ${diffRateVal >= 0 ? '+' : ''}${diffRateVal}%)`;
    }

    // Increment Information
    const hasIncr = selectedIncrMonth !== 'none';
    const nextStage = getNextPayStage(basicPay);

    if (hasIncr) {
      incrInfoCard.style.display = 'block';
      const mName = monthNames[parseInt(selectedIncrMonth)] || '';
      infoIncrMonthBadge.textContent = `${mName} Increment`;
      infoPreBasic.textContent = formatINR(basicPay);
      infoAGI.textContent = `+${formatINR(nextStage.agi)}`;
      infoPostBasic.textContent = formatINR(nextStage.nextBasic);

      // In multi-month mode, show the split input
      if (currentMonths > 1) {
        incrMonthsSplitWrapper.style.display = 'block';
        incrSplitBadge.textContent = `${mName} Incr across ${currentMonths} Months`;
      } else {
        incrMonthsSplitWrapper.style.display = 'none';
      }
    } else {
      incrInfoCard.style.display = 'none';
      incrMonthsSplitWrapper.style.display = 'none';
    }

    // Calculation for Pre-Increment stage
    const preDA = calculateDA(basicPay, employeeType, 1, newRateVal, drawnRateVal);
    // Calculation for Post-Increment stage
    const postDA = calculateDA(nextStage.nextBasic, employeeType, 1, newRateVal, drawnRateVal);

    // Multi-month Arrears Computation
    let totalGrossArrears = 0;
    let totalCpsArrears = 0;
    let totalNetArrears = 0;

    let preMonths = currentMonths;
    let postMonths = 0;

    if (hasIncr && currentMonths > 1) {
      preMonths = parseInt(preIncrMonthsInput.value);
      if (isNaN(preMonths) || preMonths < 0) preMonths = 0;
      postMonths = parseInt(postIncrMonthsInput.value);
      if (isNaN(postMonths) || postMonths < 0) postMonths = 0;

      const preGross = preDA.monthly.diff * preMonths;
      const postGross = postDA.monthly.diff * postMonths;
      totalGrossArrears = preGross + postGross;

      // Strictly 10% of Total Gross DA Arrears Difference
      totalCpsArrears = isCPS ? Math.round(totalGrossArrears * 0.10) : 0;
      totalNetArrears = isCPS ? (totalGrossArrears - totalCpsArrears) : totalGrossArrears;

      // Update sub-breakdown rows
      arrPreIncrRow.style.display = 'flex';
      arrPreIncrLabel.textContent = `Pre-Incr (${preMonths} mo @ ${formatINR(basicPay)}):`;
      arrPreIncrVal.textContent = formatINR(preGross);

      arrPostIncrRow.style.display = 'flex';
      arrPostIncrLabel.textContent = `Post-Incr (${postMonths} mo @ ${formatINR(nextStage.nextBasic)}):`;
      arrPostIncrVal.textContent = formatINR(postGross);
    } else {
      totalGrossArrears = preDA.monthly.diff * currentMonths;
      // Strictly 10% of Total Gross DA Arrears Difference
      totalCpsArrears = isCPS ? Math.round(totalGrossArrears * 0.10) : 0;
      totalNetArrears = isCPS ? (totalGrossArrears - totalCpsArrears) : totalGrossArrears;

      arrPreIncrRow.style.display = 'none';
      arrPostIncrRow.style.display = 'none';
    }

    // Update Hero Banner
    heroMonthlyDiff.textContent = formatINR(preDA.monthly.diff);
    heroBasicDisplay.textContent = `Basic Pay: ${formatINR(basicPay)} ${hasIncr ? `➔ ${formatINR(nextStage.nextBasic)}` : ''} | DA Increase: ${diffRateVal}%`;

    if (currentMonths > 1) {
      heroNetLabel.textContent = isCPS ? `Total Net Cash (${currentMonths} Months):` : `Total GPF / Cash (${currentMonths} Months):`;
      heroNetCash.textContent = formatINR(totalNetArrears);
      heroDurationBadge.textContent = hasIncr ? `${currentMonths} Mo (with ${monthNames[selectedIncrMonth]} Incr)` : `${currentMonths} Months Arrears`;
    } else {
      heroNetLabel.textContent = isCPS ? 'Net Cash to Bank (90%):' : 'GPF / Cash Total (100%):';
      heroNetCash.textContent = formatINR(preDA.monthly.netCash);
      heroDurationBadge.textContent = 'Per Month Amount';
    }

    // Update 6 Metric Boxes
    metricBasic.textContent = formatINR(basicPay);
    lblMetricDrawn.textContent = `Drawn DA (${drawnRateVal}%)`;
    metricDrawnDA.textContent = formatINR(preDA.monthly.drawnDA);

    lblMetricNew.textContent = `New DA (${newRateVal}%)`;
    metricNewDA.textContent = formatINR(preDA.monthly.newDA);

    lblMetricDiff.textContent = `Monthly Diff (${diffRateVal}%)`;
    metricDiff.textContent = formatINR(preDA.monthly.diff);

    if (isCPS) {
      lblMetricCPS.textContent = 'To CPS Account (10%)';
      fnMetricCPS.textContent = 'Credit to PRAN Account';
      metricCPS.textContent = formatINR(preDA.monthly.cpsAccount);
      lblMetricNet.textContent = 'Net Cash (90%)';
      fnMetricNet.textContent = 'Credit to Bank Account';
      metricNet.textContent = formatINR(preDA.monthly.netCash);
    } else {
      lblMetricCPS.textContent = 'CPS Deduction';
      fnMetricCPS.textContent = 'Not Applicable (GPF)';
      metricCPS.textContent = '₹0';
      lblMetricNet.textContent = 'Total Amount (100%)';
      fnMetricNet.textContent = 'Full GPF / Cash credit';
      metricNet.textContent = formatINR(preDA.monthly.netCash);
    }

    // Update Multi-Month Arrears Box
    if (currentMonths > 1) {
      arrearsSummaryBox.style.display = 'block';
      arrearsBadge.textContent = hasIncr ? `${currentMonths} Months (${preMonths}m + ${postMonths}m)` : `${currentMonths} Months`;
      arrTotalGross.textContent = formatINR(totalGrossArrears);

      if (isCPS) {
        arrCpsRow.style.display = 'flex';
        arrTotalCPS.textContent = formatINR(totalCpsArrears);
        arrNetTitle.textContent = 'Total Net Cash to Bank (90%):';
      } else {
        arrCpsRow.style.display = 'none';
        arrNetTitle.textContent = 'Total GPF / Cash Amount (100%):';
      }
      arrTotalNet.textContent = formatINR(totalNetArrears);
    } else {
      arrearsSummaryBox.style.display = 'none';
    }

    // Update Statement Slip Table (if present in DOM)
    if (slipBasic) {
      slipBasic.textContent = formatINR(basicPay);
      if (hasIncr) {
        if (slipRowIncr) slipRowIncr.style.display = '';
        if (slipIncrMonthText) slipIncrMonthText.textContent = `${monthNames[selectedIncrMonth]} Increment`;
        if (slipIncrDetailsText) slipIncrDetailsText.textContent = `+${formatINR(nextStage.agi)} (to ${formatINR(nextStage.nextBasic)})`;
      } else {
        if (slipRowIncr) slipRowIncr.style.display = 'none';
      }

      if (slipNewRate) slipNewRate.textContent = `${newRateVal}%`;
      if (slipNewDA) slipNewDA.textContent = formatINR(preDA.monthly.newDA);
      if (slipDrawnRate) slipDrawnRate.textContent = `${drawnRateVal}%`;
      if (slipDrawnDA) slipDrawnDA.textContent = formatINR(preDA.monthly.drawnDA);
      if (slipDiffRate) slipDiffRate.textContent = `${diffRateVal}%`;
      if (slipMonthlyDiff) slipMonthlyDiff.textContent = formatINR(preDA.monthly.diff);

      if (isCPS) {
        if (slipRowCPS) slipRowCPS.style.display = '';
        // Deduction to CPS PRAN Account is strictly 10% of Monthly DA Difference (Gross)
        const monthlyCPS10 = Math.round(preDA.monthly.diff * 0.10);
        if (slipCPS) slipCPS.textContent = formatINR(monthlyCPS10);

        if (slipRowNetTitle) slipRowNetTitle.textContent = 'Monthly Net Cash to Bank (90%)';
        if (slipNet) slipNet.textContent = formatINR(preDA.monthly.diff - monthlyCPS10);
      } else {
        if (slipRowCPS) slipRowCPS.style.display = 'none';
        if (slipRowNetTitle) slipRowNetTitle.textContent = 'Monthly GPF / Cash Amount (100%)';
        if (slipNet) slipNet.textContent = formatINR(preDA.monthly.diff);
      }

      if (currentMonths > 1) {
        if (slipRowArrTotal) {
          slipRowArrTotal.style.display = '';
          const incrSuffix = hasIncr ? ` with ${monthNames[selectedIncrMonth]} Incr` : '';
          slipArrDurationLabel.textContent = `Total Arrears Net Payable (${currentMonths} Months${incrSuffix}):`;
          slipArrPeriodText.textContent = `${currentMonths} Mo Cumulative`;
          slipArrTotalNet.textContent = formatINR(totalNetArrears);
        }
      } else {
        if (slipRowArrTotal) {
          slipRowArrTotal.style.display = 'none';
        }
      }
    }

    return {
      basicPay,
      nextBasic: nextStage.nextBasic,
      agi: nextStage.agi,
      hasIncr,
      incrMonthName: monthNames[selectedIncrMonth] || 'None',
      newRateVal,
      drawnRateVal,
      diffRateVal,
      employeeType,
      isCPS,
      currentMonths,
      preMonths,
      postMonths,
      monthlyDiff: preDA.monthly.diff,
      monthlyCps: preDA.monthly.cpsAccount,
      monthlyNet: preDA.monthly.netCash,
      totalGrossArrears,
      totalCpsArrears,
      totalNetArrears
    };
  }

  // 11. Print Slip
  btnPrint.addEventListener('click', () => {
    window.print();
  });

  // 12. Copy Summary Text (English)
  btnCopy.addEventListener('click', () => {
    const s = updateCalculations();

    const text = [
      `🏛️ TELANGANA GOVT EMPLOYEES DA DIFFERENCE STATEMENT:`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `• Basic Pay: ${formatINR(s.basicPay)}`,
      s.hasIncr ? `• Annual Increment: ${s.incrMonthName} (+${formatINR(s.agi)} ➔ Next Basic: ${formatINR(s.nextBasic)})` : null,
      `• Revised New DA (${s.newRateVal}%): ${formatINR(Math.round(s.basicPay * s.newRateVal / 100))}`,
      `• Existing Drawn DA (${s.drawnRateVal}%): ${formatINR(Math.round(s.basicPay * s.drawnRateVal / 100))}`,
      `• Monthly DA Increase (${s.diffRateVal}%): ${formatINR(s.monthlyDiff)}`,
      `• Employee Category: ${s.isCPS ? 'CPS Employee' : 'GPF Employee'}`,
      s.isCPS ? `• Monthly 10% to CPS PRAN: ${formatINR(s.monthlyCps)}` : null,
      s.isCPS ? `• Monthly 90% Net Cash to Bank: ${formatINR(s.monthlyNet)}` : `• Monthly Total Cash/GPF: ${formatINR(s.monthlyNet)}`,
      s.currentMonths > 1 ? `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━` : null,
      s.currentMonths > 1 ? `• Arrears Duration: ${s.currentMonths} Months ${s.hasIncr ? `(${s.preMonths}m @ ${formatINR(s.basicPay)} + ${s.postMonths}m @ ${formatINR(s.nextBasic)})` : ''}` : null,
      s.currentMonths > 1 ? `• Total Gross DA Arrears: ${formatINR(s.totalGrossArrears)}` : null,
      s.currentMonths > 1 && s.isCPS ? `• Total to CPS PRAN Account: ${formatINR(s.totalCpsArrears)}` : null,
      s.currentMonths > 1 ? `• Total Net Cash Payable: ${formatINR(s.totalNetArrears)}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `• Prepared by: Nancharla Prudhvi, Senior Accountant, District Treasury, Khammam`,
      `Reference: Telangana Govt DA Difference Table (District Treasury, Khammam)`
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(text).then(() => {
      showToast('✅ Statement copied to clipboard!');
    }).catch(() => {
      showToast('Please select and copy manually.');
    });
  });

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  // 13. Reset Button
  btnReset.addEventListener('click', () => {
    searchInput.value = '';
    populateBasicSelect(DA_RECORDS);
    basicSelect.value = '19000';
    customPayCheck.checked = false;
    customPayWrapper.style.display = 'none';
    basicSelect.disabled = false;
    customPayInput.value = '';

    // Reset DA Rates
    customNewRate.value = '41.86';
    customDrawnRate.value = '33.67';
    syncDaPresetActive();

    // Reset Increment Month
    selectedIncrMonth = 'none';
    incrChips.querySelectorAll('.incr-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.month === 'none');
    });
    incrMonthSelect.value = 'none';
    incrDropdownWrapper.style.display = 'none';
    incrInfoCard.style.display = 'none';
    incrMonthsSplitWrapper.style.display = 'none';

    // Reset employee type
    document.querySelector('input[name="employeeType"][value="CPS"]').checked = true;
    labelCps.classList.add('active');
    labelGpf.classList.remove('active');

    // Reset months
    monthButtons.forEach(b => b.classList.remove('active'));
    document.querySelector('.month-btn[data-months="1"]').classList.add('active');
    customMonthsWrapper.style.display = 'none';
    customMonthsInput.value = '1';
    currentMonths = 1;
    isCustomMonths = false;

    updateCalculations();
    showToast('Values reset to default.');
  });

  // Initial calculation trigger
  updateCalculations();
});
