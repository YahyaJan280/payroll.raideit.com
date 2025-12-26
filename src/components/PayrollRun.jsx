import React, { useEffect } from "react";
import Sidebar from "./Sidebar";

export default function PayrollRunWPS() {
  useEffect(() => {
    // Attach init logic once component mounts (mirrors DOMContentLoaded)
    init();

    // Cleanup if needed on unmount
    return () => {
      // (No special cleanup implemented for this conversion)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // NOTE: Keep the helper functions and logic identical to the original JS file,
  // but defined here in module scope so they can run in the browser environment
  // when this component is mounted.

  // ---- Begin original script functions adapted to module scope ----

  // Global state (kept simple; original code used `state` object)
  // Using a module-scoped object to match original behavior. For a full React refactor,
  // migrate this to useState/useReducer and update the markup to use controlled values.
  window.__rt_state = window.__rt_state || {
    currentTab: "sif-builder",
    runData: {
      employees: 18,
      totalGross: 485000,
      totalDeductions: 58000,
      totalNet: 427000,
      computed: true,
      sifGenerated: false,
      sentToBank: false,
      reconciled: false,
      payslipsGenerated: false,
      payslipsDistributed: false,
      runClosed: false,
    },
    employees: [],
    auditLog: [],
    paymentBatches: [],
  };

  const state = window.__rt_state;

  function initializeSampleData() {
    state.employees = [
      {
        id: "EMP001",
        name: "Ahmed Al Rashid",
        personId: "784-1985-1234567-1",
        iban: "AE07 0331 234567890123456",
        net: 25000,
        onHold: false,
        bank: "Emirates NBD",
        status: "paid",
        department: "Engineering",
      },
      {
        id: "EMP002",
        name: "Sarah Johnson",
        personId: "784-1990-2345678-2",
        iban: "AE14 0331 345678901234567",
        net: 20000,
        onHold: false,
        bank: "Emirates NBD",
        status: "paid",
        department: "Marketing",
      },
      {
        id: "EMP003",
        name: "Mohammed Hassan",
        personId: "784-1988-3456789-3",
        iban: "AE21 0331 456789012345678",
        net: 18000,
        onHold: false,
        bank: "ADCB",
        status: "paid",
        department: "Sales",
      },
      {
        id: "EMP004",
        name: "Lisa Wang",
        personId: "784-1992-4567890-4",
        iban: "AE38 0331 567890123456789",
        net: 35000,
        onHold: false,
        bank: "Emirates NBD",
        status: "paid",
        department: "Finance",
      },
      {
        id: "EMP005",
        name: "David Rahman",
        personId: "784-1985-5678901-5",
        iban: "AE45 0331 678901234567890",
        net: 45000,
        onHold: false,
        bank: "Mashreq",
        status: "paid",
        department: "Management",
      },
      {
        id: "EMP006",
        name: "Fatima Al Zahra",
        personId: "784-1993-6789012-6",
        iban: "AE52 0331 789012345678901",
        net: 22000,
        onHold: false,
        bank: "RAKBank",
        status: "paid",
        department: "HR",
      },
      {
        id: "EMP007",
        name: "John Smith",
        personId: "784-1987-7890123-7",
        iban: "AE69 0331 890123456789012",
        net: 28000,
        onHold: false,
        bank: "Emirates NBD",
        status: "paid",
        department: "Engineering",
      },
      {
        id: "EMP008",
        name: "Aisha Abdullah",
        personId: "784-1991-8901234-8",
        iban: "AE76 0331 901234567890123",
        net: 16000,
        onHold: false,
        bank: "ADCB",
        status: "paid",
        department: "Marketing",
      },
      {
        id: "EMP009",
        name: "Michael Chen",
        personId: "784-1989-9012345-9",
        iban: "AE83 0331 012345678901234",
        net: 32000,
        onHold: false,
        bank: "Emirates NBD",
        status: "paid",
        department: "HR",
      },
      {
        id: "EMP010",
        name: "Nadia Salem",
        personId: "784-1986-0123456-0",
        iban: "AE90 0331 123456789012345",
        net: 19000,
        onHold: false,
        bank: "Mashreq",
        status: "paid",
        department: "Sales",
      },
      {
        id: "EMP011",
        name: "Robert Taylor",
        personId: "784-1994-1234567-1",
        iban: "AE07 0331 234567890123457",
        net: 24000,
        onHold: false,
        bank: "RAKBank",
        status: "paid",
        department: "Engineering",
      },
      {
        id: "EMP012",
        name: "Layla Ahmed",
        personId: "784-1990-2345678-2",
        iban: "AE14 0331 345678901234568",
        net: 21000,
        onHold: false,
        bank: "ADCB",
        status: "paid",
        department: "Marketing",
      },
      {
        id: "EMP013",
        name: "James Wilson",
        personId: "",
        iban: "AE21 0331 456789012345679",
        net: 27000,
        onHold: false,
        bank: "Emirates NBD",
        status: "paid",
        department: "Engineering",
        notes: "Missing Person ID",
      },
      {
        id: "EMP014",
        name: "Mariam Al Mansoori",
        personId: "784-1988-4567890-4",
        iban: "AE38 0331 567890123456780",
        net: 15000,
        onHold: false,
        bank: "Mashreq",
        status: "paid",
        department: "HR",
      },
      {
        id: "EMP015",
        name: "Kevin Brown",
        personId: "784-1992-5678901-5",
        iban: "AE45 0331 678901234567891",
        net: 26000,
        onHold: false,
        bank: "RAKBank",
        status: "paid",
        department: "Sales",
      },
      {
        id: "EMP016",
        name: "Amina Hassan",
        personId: "784-1987-6789012-6",
        iban: "AE52 0331 789012345678902",
        net: 17000,
        onHold: false,
        bank: "ADCB",
        status: "paid",
        department: "Marketing",
      },
      {
        id: "EMP017",
        name: "Daniel Lee",
        personId: "784-1991-7890123-7",
        iban: "AE69 0331 890123456789013",
        net: 23000,
        onHold: false,
        bank: "Emirates NBD",
        status: "failed",
        department: "Engineering",
        failureReason: "Invalid IBAN",
      },
      {
        id: "EMP018",
        name: "Yasmin Al Rashid",
        personId: "784-1989-8901234-8",
        iban: "AE76 0331 901234567890124",
        net: 4500,
        onHold: true,
        bank: "Mashreq",
        status: "hold",
        department: "Operations",
        notes: "On disciplinary hold",
      },
    ];

    state.auditLog = [
      {
        timestamp: "2026-01-29 09:00:00",
        actor: "System",
        event: "compute",
        description: "Payroll computation initiated for Jan 2026",
        level: "info",
      },
      {
        timestamp: "2026-01-29 09:15:00",
        actor: "System",
        event: "compute",
        description: "Salary calculations completed - 18 employees processed",
        level: "success",
      },
      {
        timestamp: "2026-01-29 10:30:00",
        actor: "System",
        event: "validation",
        description: "Pre-payroll validation completed - 1 warning found",
        level: "warning",
      },
      {
        timestamp: "2026-01-30 14:30:00",
        actor: "Sarah Johnson",
        event: "approval",
        description: "Payroll Owner approval granted",
        level: "success",
      },
      {
        timestamp: "2026-01-30 15:45:00",
        actor: "Michael Chen",
        event: "approval",
        description: "HR Manager approval granted",
        level: "success",
      },
    ];
  }

  function formatCurrency(amount) {
    try {
      return new Intl.NumberFormat("en-AE", {
        style: "currency",
        currency: "AED",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch (e) {
      return `AED ${amount}`;
    }
  }

  function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const toast = document.createElement("div");

    const bgColor =
      type === "success"
        ? "bg-green-50 border-green-200 text-green-800"
        : type === "error"
        ? "bg-red-50 border-red-200 text-red-800"
        : type === "warning"
        ? "bg-yellow-50 border-yellow-200 text-yellow-800"
        : "bg-blue-50 border-blue-200 text-blue-800";

    toast.className = `${bgColor} border rounded-lg p-4 shadow-lg transform transition-all duration-300 translate-x-full opacity-0`;
    toast.innerHTML = `
      <div class="flex items-center space-x-2">
        <span class="flex-1">${message}</span>
        <button class="text-current opacity-50 hover:opacity-75" aria-label="Close toast">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    `;

    // clicking the button removes toast
    toast
      .querySelector("button")
      ?.addEventListener("click", () => toast.remove());

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.remove("translate-x-full", "opacity-0");
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add("translate-x-full", "opacity-0");
        setTimeout(() => toast.remove(), 300);
      }
    }, 5000);
  }

  function showLoading() {
    const overlay = document.getElementById("loading-overlay");
    if (!overlay) return;
    overlay.classList.remove("hidden");
    overlay.classList.add("flex");
  }

  function hideLoading() {
    const overlay = document.getElementById("loading-overlay");
    if (!overlay) return;
    overlay.classList.add("hidden");
    overlay.classList.remove("flex");
  }

  function addAuditLog(actor, event, description, level = "info") {
    const timestamp = new Date().toISOString().replace("T", " ").substr(0, 19);
    state.auditLog.unshift({ timestamp, actor, event, description, level });
    if (state.currentTab === "audit-logs") {
      renderAuditLog();
    }
  }

  // Sidebar, Tabs, and behavior functions: replicate original logic but using DOM selectors
  function initializeSidebar() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const sidebarCloseBtn = document.getElementById("sidebar-close");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("mobile-overlay");
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const mainContent = document.getElementById("main-content");

    let isSidebarCollapsed = false;
    let isMobileMenuOpen = false;

    function openMobileMenu() {
      isMobileMenuOpen = true;
      sidebar?.classList.add("mobile-open");
      overlay?.classList.remove("opacity-0", "pointer-events-none");
      overlay?.classList.add("opacity-100");
      document.body.style.overflow = "hidden";
    }

    function closeMobileMenu() {
      isMobileMenuOpen = false;
      sidebar?.classList.remove("mobile-open");
      overlay?.classList.remove("opacity-100");
      overlay?.classList.add("opacity-0", "pointer-events-none");
      document.body.style.overflow = "";
    }

    function toggleSidebar() {
      isSidebarCollapsed = !isSidebarCollapsed;

      if (isSidebarCollapsed) {
        sidebar?.classList.add("collapsed");
        mainContent?.classList.add("sidebar-collapsed");
      } else {
        sidebar?.classList.remove("collapsed");
        mainContent?.classList.remove("sidebar-collapsed");
      }
    }

    mobileMenuBtn?.addEventListener("click", openMobileMenu);
    sidebarCloseBtn?.addEventListener("click", closeMobileMenu);
    overlay?.addEventListener("click", closeMobileMenu);
    sidebarToggle?.addEventListener("click", toggleSidebar);

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu();
      }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        closeMobileMenu();
      }
    });
  }

  function initializeTabs() {
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    tabLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const tabId = link.getAttribute("data-tab");

        // Update tab links
        tabLinks.forEach((l) => {
          l.classList.remove("border-primary", "text-primary");
          l.classList.add("border-transparent", "text-gray-500");
          l.setAttribute("aria-selected", "false");
        });

        link.classList.remove("border-transparent", "text-gray-500");
        link.classList.add("border-primary", "text-primary");
        link.setAttribute("aria-selected", "true");

        // Update tab contents
        tabContents.forEach((content) => {
          content.classList.remove("active");
        });

        const tabEl = document.getElementById(tabId);
        tabEl?.classList.add("active");
        state.currentTab = tabId;

        // Render tab-specific content
        renderTabContent(tabId);
      });
    });
  }

  function renderTabContent(tabId) {
    switch (tabId) {
      case "sif-builder":
        renderSIFTable();
        break;
      case "bank-disbursement":
        renderPaymentBatches();
        break;
      case "reconciliation":
        renderReconciliationTable();
        break;
      case "payslips":
        renderPayslipsTable();
        break;
      case "audit-logs":
        renderAuditLog();
        break;
      default:
        break;
    }
  }

  // SIF Builder functions
  function renderSIFTable() {
    const tableBody = document.getElementById("sif-table-body");
    const mobileCards = document.querySelector("#sif-builder .mobile-cards");

    if (!tableBody) return;

    const includeHold = document.getElementById("include-hold")?.checked;
    const activeEmployees = state.employees.filter(
      (emp) => !emp.onHold || includeHold
    );

    tableBody.innerHTML = "";
    if (mobileCards) mobileCards.innerHTML = "";

    activeEmployees.forEach((employee) => {
      const row = document.createElement("tr");
      row.className = "hover:bg-gray-50";

      const hasIssues = !employee.personId || employee.net < 0;
      const statusClass = hasIssues ? "text-red-600" : "text-green-600";
      const statusIcon = hasIssues
        ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>'
        : '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>';

      row.innerHTML = `
          <td class="px-4 py-3">
              <div class="font-medium text-gray-900">${employee.name}</div>
              <div class="text-sm text-gray-500">${employee.id}</div>
          </td>
          <td class="px-4 py-3">
              <span class="flex items-center ${statusClass}">
                  ${statusIcon}
                  <span class="ml-1 text-sm">${
                    employee.personId || "Missing"
                  }</span>
              </span>
          </td>
          <td class="px-4 py-3">
              <div class="text-sm font-medium text-gray-900">${
                employee.bank
              }</div>
              <div class="text-xs text-gray-500 font-mono">${
                employee.iban
              }</div>
          </td>
          <td class="px-4 py-3 font-medium">${formatCurrency(employee.net)}</td>
          <td class="px-4 py-3">
              ${
                employee.onHold
                  ? '<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Hold</span>'
                  : '<span class="text-green-600 text-sm">✓</span>'
              }
          </td>
          <td class="px-4 py-3">
              <div class="flex space-x-2">
                  ${
                    hasIssues
                      ? `<button data-emp="${employee.id}" class="rt-fix-btn text-primary hover:text-primary-600 text-sm font-medium focus-ring rounded px-2 py-1">Fix</button>`
                      : ""
                  }
                  <button data-emp-view="${
                    employee.id
                  }" class="rt-view-btn text-gray-500 hover:text-gray-700 text-sm font-medium focus-ring rounded px-2 py-1">View Calc</button>
              </div>
          </td>
      `;
      tableBody.appendChild(row);

      if (mobileCards) {
        const card = document.createElement("div");
        card.className = "bg-white border border-gray-200 rounded-lg p-4";
        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h4 class="font-medium text-gray-900">${employee.name}</h4>
                    <p class="text-sm text-gray-500">${employee.id}</p>
                </div>
                <span class="text-lg font-bold">${formatCurrency(
                  employee.net
                )}</span>
            </div>
            <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                    <span class="text-gray-500">Person ID:</span>
                    <span class="flex items-center ${statusClass}">
                        ${statusIcon}
                        <span class="ml-1">${
                          employee.personId || "Missing"
                        }</span>
                    </span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-500">Bank:</span>
                    <span>${employee.bank}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-500">Status:</span>
                    ${
                      employee.onHold
                        ? '<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Hold</span>'
                        : '<span class="text-green-600">Active</span>'
                    }
                </div>
            </div>
            <div class="mt-3 pt-3 border-t border-gray-200 flex space-x-2">
                ${
                  hasIssues
                    ? `<button data-emp="${employee.id}" class="rt-fix-btn flex-1 bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium">Fix</button>`
                    : ""
                }
                <button data-emp-view="${
                  employee.id
                }" class="rt-view-btn flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium">View Calc</button>
            </div>
        `;
        mobileCards.appendChild(card);
      }
    });

    updateSIFSummary(activeEmployees);

    // Attach delegated listeners for Fix/View Calc buttons created dynamically
    document.querySelectorAll(".rt-fix-btn").forEach((btn) => {
      btn.removeEventListener("click", rtFixBtnHandler);
      btn.addEventListener("click", rtFixBtnHandler);
    });
    document.querySelectorAll(".rt-view-btn").forEach((btn) => {
      btn.removeEventListener("click", rtViewBtnHandler);
      btn.addEventListener("click", rtViewBtnHandler);
    });
  }

  function rtFixBtnHandler(e) {
    const empId = e.currentTarget.getAttribute("data-emp");
    if (empId) openFixDrawer(empId);
  }
  function rtViewBtnHandler(e) {
    const empId = e.currentTarget.getAttribute("data-emp-view");
    if (empId) viewPayslipCalc(empId);
  }

  function updateSIFSummary(employees) {
    if (!employees || employees.length === 0) {
      document.getElementById("sif-employee-count").textContent = "0";
      document.getElementById("sif-total-net").textContent = formatCurrency(0);
      document.getElementById("sif-min-net").textContent = formatCurrency(0);
      document.getElementById("sif-max-net").textContent = formatCurrency(0);
      return;
    }
    const totalNet = employees.reduce((sum, emp) => sum + emp.net, 0);
    const netAmounts = employees.map((emp) => emp.net);
    const minNet = Math.min(...netAmounts);
    const maxNet = Math.max(...netAmounts);

    document.getElementById("sif-employee-count").textContent =
      employees.length;
    document.getElementById("sif-total-net").textContent =
      formatCurrency(totalNet);
    document.getElementById("sif-min-net").textContent = formatCurrency(minNet);
    document.getElementById("sif-max-net").textContent = formatCurrency(maxNet);
  }

  function runChecks() {
    showLoading();

    setTimeout(() => {
      hideLoading();

      const issues = state.employees.filter(
        (emp) => !emp.personId || emp.net < 0
      );

      if (issues.length === 0) {
        showToast(
          "All validation checks passed! SIF generation is ready.",
          "success"
        );
        const btn1 = document.getElementById("btn-generate-sif-tab");
        const btn2 = document.getElementById("btn-generate-sif");
        if (btn1) btn1.disabled = false;
        if (btn2) btn2.disabled = false;
      } else {
        showToast(
          `${issues.length} validation issues found. Please fix before generating SIF.`,
          "warning"
        );
      }

      addAuditLog(
        "System",
        "validation",
        `SIF validation completed - ${issues.length} issues found`
      );
    }, 1500);
  }

  function generateSIF() {
    const salaryDateEl = document.getElementById("salary-date");
    const bankAgentEl = document.getElementById("bank-agent");
    if (!salaryDateEl?.value || !bankAgentEl?.value) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    showLoading();

    setTimeout(() => {
      hideLoading();

      const timestamp = new Date()
        .toISOString()
        .replace(/[:-]/g, "")
        .substr(0, 15);
      const fileName = `SIF_WPS123456789_${timestamp}_BATCH1.txt`;
      const fileSize = "15.2 KB";
      const checksum = "MD5: a1b2c3d4e5f6789...";

      document.getElementById("file-name").textContent = fileName;
      document.getElementById("file-size").textContent = fileSize;
      document.getElementById("file-checksum").textContent = checksum;

      document.getElementById("btn-send-to-bank").disabled = false;
      document.getElementById("btn-send-bank").disabled = false;

      addPaymentBatch(
        "JAN2026_BATCH1",
        state.employees.filter((e) => !e.onHold).length,
        state.employees
          .filter((e) => !e.onHold)
          .reduce((sum, e) => sum + e.net, 0)
      );

      state.runData.sifGenerated = true;
      showToast("SIF file generated successfully!", "success");
      addAuditLog("Sarah Johnson", "sif", `SIF file generated: ${fileName}`);

      const link = document.createElement("a");
      link.href = "#";
      link.download = fileName;
      link.textContent = "Download SIF";
      link.className =
        "text-primary hover:text-primary-600 font-medium text-sm ml-4";
      link.onclick = (e) => {
        e.preventDefault();
        showToast("SIF file download started", "success");
      };

      const fileNameElement = document.getElementById("file-name");
      if (fileNameElement && !fileNameElement.nextElementSibling) {
        fileNameElement.parentElement.appendChild(link);
      }
    }, 2000);
  }

  // Bank disbursement functions
  function addPaymentBatch(batchName, employeesCount, amount) {
    const batch = {
      id: Date.now(),
      name: batchName,
      employees: employeesCount,
      amount: amount,
      sentAt: null,
      status: "Queued",
      reference: null,
    };

    state.paymentBatches = state.paymentBatches || [];
    state.paymentBatches.push(batch);

    if (state.currentTab === "bank-disbursement") {
      renderPaymentBatches();
    }
  }

  function renderPaymentBatches() {
    const tableBody = document.getElementById("payment-batches-body");
    if (!tableBody) return;

    if (!state.paymentBatches || state.paymentBatches.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="px-4 py-8 text-center text-gray-500">
            No payment batches yet. Generate SIF first.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = "";

    state.paymentBatches.forEach((batch) => {
      const row = document.createElement("tr");
      row.className = "hover:bg-gray-50";

      const statusClass =
        {
          Queued: "bg-gray-100 text-gray-800",
          Sent: "bg-blue-100 text-blue-800",
          Processing: "bg-yellow-100 text-yellow-800",
          Completed: "bg-green-100 text-green-800",
          Failed: "bg-red-100 text-red-800",
          Partial: "bg-orange-100 text-orange-800",
        }[batch.status] || "bg-gray-100 text-gray-800";

      row.innerHTML = `
          <td class="px-4 py-3 font-medium">${batch.name}</td>
          <td class="px-4 py-3">${batch.employees}</td>
          <td class="px-4 py-3 font-medium">${formatCurrency(batch.amount)}</td>
          <td class="px-4 py-3">${batch.sentAt || "-"}</td>
          <td class="px-4 py-3">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusClass}">
                  ${batch.status}
              </span>
          </td>
          <td class="px-4 py-3">
              <div class="flex space-x-2">
                  <button data-batch-view="${
                    batch.id
                  }" class="text-primary hover:text-primary-600 text-sm font-medium focus-ring rounded px-2 py-1">View</button>
                  ${
                    batch.status === "Failed"
                      ? `<button data-batch-resend="${batch.id}" class="text-secondary hover:text-orange-600 text-sm font-medium focus-ring rounded px-2 py-1">Resend</button>`
                      : ""
                  }
                  ${
                    batch.status === "Queued"
                      ? `<button data-batch-cancel="${batch.id}" class="text-red-600 hover:text-red-700 text-sm font-medium focus-ring rounded px-2 py-1">Cancel</button>`
                      : ""
                  }
              </div>
          </td>
      `;
      tableBody.appendChild(row);
    });
  }

  function sendToBank() {
    if (!state.runData.sifGenerated) {
      showToast("Please generate SIF file first", "error");
      return;
    }

    showLoading();

    setTimeout(() => {
      hideLoading();

      const now = new Date().toLocaleString();
      const reference = "TXN" + Date.now();

      const sentEl = document.getElementById("transmission-sent");
      const refEl = document.getElementById("transmission-ref");
      const statusElement = document.getElementById("transmission-status");

      if (sentEl) sentEl.textContent = now;
      if (refEl) refEl.textContent = reference;
      if (statusElement) {
        statusElement.textContent = "Sent";
        statusElement.className =
          "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800";
      }

      if (state.paymentBatches && state.paymentBatches.length > 0) {
        state.paymentBatches[0].status = "Sent";
        state.paymentBatches[0].sentAt = now;
        state.paymentBatches[0].reference = reference;
        renderPaymentBatches();
      }

      state.runData.sentToBank = true;
      const reconcileBtn = document.getElementById("btn-reconcile");
      if (reconcileBtn) reconcileBtn.disabled = false;

      showToast("Payment batch sent to bank successfully!", "success");
      addAuditLog(
        "Sarah Johnson",
        "bank",
        `Payment batch sent to bank - Reference: ${reference}`
      );

      // Simulate processing change
      setTimeout(() => {
        if (state.paymentBatches && state.paymentBatches.length > 0) {
          state.paymentBatches[0].status = "Processing";
          if (state.currentTab === "bank-disbursement") {
            renderPaymentBatches();
          }
        }

        const statusElement2 = document.getElementById("transmission-status");
        if (statusElement2) {
          statusElement2.textContent = "Processing";
          statusElement2.className =
            "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800";
        }
      }, 3000);
    }, 2000);
  }

  // Reconciliation functions
  function renderReconciliationTable() {
    const tableBody = document.getElementById("reconciliation-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    state.employees.forEach((employee) => {
      const row = document.createElement("tr");
      row.className = "hover:bg-gray-50";

      const statusClass =
        {
          paid: "bg-green-100 text-green-800",
          pending: "bg-yellow-100 text-yellow-800",
          failed: "bg-red-100 text-red-800",
          hold: "bg-gray-100 text-gray-800",
        }[employee.status] || "bg-gray-100 text-gray-800";

      const isFailedOrHold =
        employee.status === "failed" || employee.status === "hold";

      row.innerHTML = `
          <td class="px-4 py-3">
              <input type="checkbox" class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded reconciliation-checkbox" 
                     data-employee-id="${employee.id}" ${
        isFailedOrHold ? "" : "disabled"
      }>
          </td>
          <td class="px-4 py-3">
              <div class="font-medium text-gray-900">${employee.name}</div>
              <div class="text-sm text-gray-500">${employee.id}</div>
          </td>
          <td class="px-4 py-3 font-medium">${formatCurrency(employee.net)}</td>
          <td class="px-4 py-3">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusClass}">
                  ${
                    employee.status.charAt(0).toUpperCase() +
                    employee.status.slice(1)
                  }
              </span>
          </td>
          <td class="px-4 py-3 font-mono text-sm">${
            employee.bankRef || "-"
          }</td>
          <td class="px-4 py-3 text-sm">${employee.failureReason || "-"}</td>
          <td class="px-4 py-3">
              <div class="flex space-x-2">
                  ${
                    isFailedOrHold
                      ? `
                      <button data-retry="${employee.id}" class="text-primary hover:text-primary-600 text-sm font-medium focus-ring rounded px-2 py-1">Retry</button>
                      <button data-markpaid="${employee.id}" class="text-secondary hover:text-orange-600 text-sm font-medium focus-ring rounded px-2 py-1">Mark Paid</button>
                  `
                      : ""
                  }
              </div>
          </td>
      `;
      tableBody.appendChild(row);
    });

    updateMakeUpButton();
    updateReconciliationMetrics();

    // attach handlers
    document.querySelectorAll("[data-retry]").forEach((btn) => {
      btn.removeEventListener("click", retryHandler);
      btn.addEventListener("click", retryHandler);
    });
    document.querySelectorAll("[data-markpaid]").forEach((btn) => {
      btn.removeEventListener("click", markPaidHandler);
      btn.addEventListener("click", markPaidHandler);
    });
    // checkboxes
    document.querySelectorAll(".reconciliation-checkbox").forEach((cb) => {
      cb.removeEventListener("change", reconcileCheckboxHandler);
      cb.addEventListener("change", reconcileCheckboxHandler);
    });
  }

  function reconcileCheckboxHandler() {
    updateMakeUpButton();
  }

  function retryHandler(e) {
    const empId = e.currentTarget.getAttribute("data-retry");
    retryPayment(empId);
  }

  function markPaidHandler(e) {
    const empId = e.currentTarget.getAttribute("data-markpaid");
    markPaidManually(empId);
  }

  function updateMakeUpButton() {
    const checkboxes = document.querySelectorAll(
      ".reconciliation-checkbox:checked"
    );
    const button = document.getElementById("btn-create-makeup");
    if (button) {
      button.disabled = checkboxes.length === 0;
    }
  }

  function updateReconciliationMetrics() {
    const paidCount = state.employees.filter(
      (emp) => emp.status === "paid"
    ).length;
    const totalCount = state.employees.length || 1;
    const failedCount = state.employees.filter(
      (emp) => emp.status === "failed"
    ).length;

    const paidPercentage = Math.round((paidCount / totalCount) * 100);
    const paidEl = document.getElementById("paid-percentage");
    const failedEl = document.getElementById("failed-count");
    if (paidEl) paidEl.textContent = `${paidPercentage}%`;
    if (failedEl) failedEl.textContent = failedCount;
  }

  function fetchStatus() {
    showLoading();

    setTimeout(() => {
      hideLoading();

      const failedEmployee = state.employees.find((emp) => emp.id === "EMP017");
      if (failedEmployee) {
        failedEmployee.status = "failed";
        failedEmployee.failureReason = "Invalid IBAN format";
        failedEmployee.bankRef = "ERR_001234";
      }

      state.employees.forEach((emp) => {
        if (emp.id !== "EMP017" && emp.id !== "EMP018") {
          emp.status = "paid";
          emp.bankRef = "TXN" + Math.random().toString().substr(2, 8);
        }
      });

      renderReconciliationTable();
      showToast("Bank status fetched successfully", "success");
      addAuditLog("System", "reconciliation", "Bank payment status updated");
    }, 1500);
  }

  function createMakeUpRun() {
    const checkedBoxes = document.querySelectorAll(
      ".reconciliation-checkbox:checked"
    );
    const selectedEmployees = Array.from(checkedBoxes).map((cb) =>
      cb.getAttribute("data-employee-id")
    );

    if (selectedEmployees.length === 0) {
      showToast("Please select employees for make-up run", "error");
      return;
    }

    showLoading();

    setTimeout(() => {
      hideLoading();

      const makeUpBatchName = `JAN2026_MAKEUP_${Date.now()}`;
      const selectedEmps = state.employees.filter((emp) =>
        selectedEmployees.includes(emp.id)
      );
      const totalAmount = selectedEmps.reduce((sum, emp) => sum + emp.net, 0);

      addPaymentBatch(makeUpBatchName, selectedEmps.length, totalAmount);

      selectedEmps.forEach((emp) => {
        emp.status = "pending";
        emp.failureReason = null;
      });

      renderReconciliationTable();
      showToast(
        `Make-up run created for ${selectedEmps.length} employees`,
        "success"
      );
      addAuditLog(
        "Sarah Johnson",
        "reconciliation",
        `Make-up run created: ${makeUpBatchName} for ${selectedEmps.length} employees`
      );
    }, 1000);
  }

  // Payslip functions
  function renderPayslipsTable() {
    const tableBody = document.getElementById("payslips-table-body");
    if (!tableBody) return;

    if (!state.runData.payslipsGenerated) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="px-4 py-8 text-center text-gray-500">
            No payslips generated yet.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = "";

    state.employees.forEach((employee) => {
      const row = document.createElement("tr");
      row.className = "hover:bg-gray-50";

      const payslipStatus = employee.payslipStatus || "generated";
      const deliveryMethod = employee.deliveryMethod || "Portal";
      const opened = employee.payslipOpened || false;

      const statusClass =
        {
          generated: "bg-blue-100 text-blue-800",
          distributed: "bg-green-100 text-green-800",
          bounced: "bg-red-100 text-red-800",
        }[payslipStatus] || "bg-blue-100 text-blue-800";

      row.innerHTML = `
          <td class="px-4 py-3">
              <input type="checkbox" class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded payslip-checkbox" 
                     data-employee-id="${employee.id}">
          </td>
          <td class="px-4 py-3">
              <div class="font-medium text-gray-900">${employee.name}</div>
              <div class="text-sm text-gray-500">${employee.id}</div>
          </td>
          <td class="px-4 py-3 font-medium">${formatCurrency(employee.net)}</td>
          <td class="px-4 py-3">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusClass}">
                  ${
                    payslipStatus.charAt(0).toUpperCase() +
                    payslipStatus.slice(1)
                  }
              </span>
          </td>
          <td class="px-4 py-3">${deliveryMethod}</td>
          <td class="px-4 py-3">
              <button data-toggle-opened="${employee.id}" class="text-sm ${
        opened ? "text-green-600" : "text-gray-400"
      }">
                  ${opened ? "✓ Yes" : "✗ No"}
              </button>
          </td>
          <td class="px-4 py-3">
              <div class="flex space-x-2">
                  <button data-preview="${
                    employee.id
                  }" class="text-primary hover:text-primary-600 text-sm font-medium focus-ring rounded px-2 py-1">Preview</button>
                  <button data-download="${
                    employee.id
                  }" class="text-gray-500 hover:text-gray-700 text-sm font-medium focus-ring rounded px-2 py-1">Download</button>
                  <button data-resend="${
                    employee.id
                  }" class="text-secondary hover:text-orange-600 text-sm font-medium focus-ring rounded px-2 py-1">Resend</button>
              </div>
          </td>
      `;
      tableBody.appendChild(row);
    });

    // Attach handlers for new controls
    document.querySelectorAll("[data-preview]").forEach((btn) => {
      btn.removeEventListener("click", previewHandler);
      btn.addEventListener("click", previewHandler);
    });
    document.querySelectorAll("[data-download]").forEach((btn) => {
      btn.removeEventListener("click", downloadHandler);
      btn.addEventListener("click", downloadHandler);
    });
    document.querySelectorAll("[data-resend]").forEach((btn) => {
      btn.removeEventListener("click", resendHandler);
      btn.addEventListener("click", resendHandler);
    });
    document.querySelectorAll("[data-toggle-opened]").forEach((btn) => {
      btn.removeEventListener("click", toggleOpenedHandler);
      btn.addEventListener("click", toggleOpenedHandler);
    });
    document.querySelectorAll(".payslip-checkbox").forEach((cb) => {
      cb.removeEventListener("change", payslipCheckboxHandler);
      cb.addEventListener("change", payslipCheckboxHandler);
    });

    updatePayslipBulkButtons();
  }

  function previewHandler(e) {
    const id = e.currentTarget.getAttribute("data-preview");
    if (id) previewPayslip(id);
  }
  function downloadHandler(e) {
    const id = e.currentTarget.getAttribute("data-download");
    if (id) downloadPayslip(id);
  }
  function resendHandler(e) {
    const id = e.currentTarget.getAttribute("data-resend");
    if (id) resendPayslip(id);
  }
  function toggleOpenedHandler(e) {
    const id = e.currentTarget.getAttribute("data-toggle-opened");
    if (id) togglePayslipOpened(id);
  }
  function payslipCheckboxHandler() {
    updatePayslipBulkButtons();
  }

  function generatePayslips() {
    showLoading();

    setTimeout(() => {
      hideLoading();

      state.employees.forEach((emp) => {
        emp.payslipStatus = "generated";
        emp.deliveryMethod = "Portal";
        emp.payslipOpened = false;
      });

      state.runData.payslipsGenerated = true;
      const distBtn = document.getElementById("btn-distribute");
      if (distBtn) distBtn.disabled = false;

      renderPayslipsTable();
      showToast("Payslips generated for all employees", "success");
      addAuditLog(
        "Sarah Johnson",
        "payslip",
        `Payslips generated for ${state.employees.length} employees`
      );
    }, 2000);
  }

  function previewPayslip(employeeId) {
    const employee = state.employees.find((emp) => emp.id === employeeId);
    if (!employee) return;

    const previewNameEl = document.getElementById("preview-employee-name");
    const previewIdEl = document.getElementById("preview-employee-id");
    const previewDeptEl = document.getElementById("preview-department");

    if (previewNameEl) previewNameEl.textContent = employee.name;
    if (previewIdEl) previewIdEl.textContent = employee.id;
    if (previewDeptEl) previewDeptEl.textContent = employee.department;

    const basic = Math.round(employee.net * 0.7);
    const housing = Math.round(employee.net * 0.23);
    const transport = Math.round(employee.net * 0.07);
    const gross = basic + housing + transport;
    const social = Math.round(gross * 0.05);
    const insurance = Math.round(gross * 0.02);
    const deductions = social + insurance;

    const setIf = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setIf("preview-basic", formatCurrency(basic));
    setIf("preview-housing", formatCurrency(housing));
    setIf("preview-transport", formatCurrency(transport));
    setIf("preview-gross", formatCurrency(gross));
    setIf("preview-social", formatCurrency(social));
    setIf("preview-insurance", formatCurrency(insurance));
    setIf("preview-deductions", formatCurrency(deductions));
    setIf("preview-net", formatCurrency(employee.net));

    document.getElementById("payslip-preview")?.classList.remove("hidden");
    employee.payslipOpened = true;

    if (state.currentTab === "payslips") {
      renderPayslipsTable();
    }
  }

  function updatePayslipBulkButtons() {
    const checkboxes = document.querySelectorAll(".payslip-checkbox:checked");
    const distributeBtn = document.getElementById("btn-bulk-distribute");
    const emailBtn = document.getElementById("btn-bulk-email");

    if (distributeBtn) distributeBtn.disabled = checkboxes.length === 0;
    if (emailBtn) emailBtn.disabled = checkboxes.length === 0;
  }

  function renderAuditLog() {
    const container = document.getElementById("audit-log-container");
    if (!container) return;

    container.innerHTML = "";

    state.auditLog.forEach((log) => {
      const logItem = document.createElement("div");
      logItem.className = "bg-white border border-gray-200 rounded-lg p-4";

      const levelClass =
        {
          success: "text-green-600",
          warning: "text-yellow-600",
          error: "text-red-600",
          info: "text-blue-600",
        }[log.level] || "text-gray-600";

      const levelIcon =
        {
          success:
            '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>',
          warning:
            '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>',
          error:
            '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>',
          info: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        }[log.level] || "";

      logItem.innerHTML = `
        <div class="flex items-start space-x-3">
          <div class="shrink-0 ${levelClass}">
            ${levelIcon}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">${log.description}</p>
              <span class="text-xs text-gray-500 font-mono">${log.timestamp}</span>
            </div>
            <div class="mt-1 flex items-center space-x-4 text-xs text-gray-500">
              <span>Actor: ${log.actor}</span>
              <span>Event: ${log.event}</span>
            </div>
          </div>
        </div>
      `;
      container.appendChild(logItem);
    });
  }

  // Fix drawer
  function openFixDrawer(employeeId) {
    const employee = state.employees.find((emp) => emp.id === employeeId);
    if (!employee) return;

    const ibanEl = document.getElementById("fix-iban");
    const pidEl = document.getElementById("fix-person-id");
    const nameEl = document.getElementById("fix-name-format");

    if (ibanEl) ibanEl.value = employee.iban || "";
    if (pidEl) pidEl.value = employee.personId || "";
    if (nameEl) nameEl.value = employee.name || "";

    const drawer = document.getElementById("fix-drawer");
    if (drawer) drawer.dataset.employeeId = employeeId;
    drawer?.classList.add("open");
  }

  function closeFixDrawer() {
    const drawer = document.getElementById("fix-drawer");
    drawer?.classList.remove("open");
  }

  function saveFixChanges() {
    const drawer = document.getElementById("fix-drawer");
    const employeeId = drawer?.dataset.employeeId;
    const employee = state.employees.find((emp) => emp.id === employeeId);
    if (!employee) return;

    const ibanEl = document.getElementById("fix-iban");
    const pidEl = document.getElementById("fix-person-id");
    const nameEl = document.getElementById("fix-name-format");

    employee.iban = ibanEl?.value || employee.iban;
    employee.personId = pidEl?.value || employee.personId;
    employee.name = nameEl?.value || employee.name;

    closeFixDrawer();
    renderSIFTable();
    showToast(
      `Employee ${employee.name} details updated successfully`,
      "success"
    );
    addAuditLog(
      "Sarah Johnson",
      "employee",
      `Fixed employee details for ${employee.name} (${employee.id})`
    );
  }

  // Helper functions used by buttons
  function switchToTab(tabId) {
    const tabLink = document.querySelector(`[data-tab="${tabId}"]`);
    if (tabLink) tabLink.click();
  }

  function viewPayslipCalc(employeeId) {
    const employee = state.employees.find((emp) => emp.id === employeeId);
    if (!employee) return;
    const basic = Math.round(employee.net * 0.7);
    const housing = Math.round(employee.net * 0.23);
    const transport = Math.round(employee.net * 0.07);
    showToast(
      `${employee.name}: Basic ${formatCurrency(
        basic
      )}, Housing ${formatCurrency(housing)}, Transport ${formatCurrency(
        transport
      )}`,
      "info"
    );
  }

  function togglePayslipOpened(employeeId) {
    const employee = state.employees.find((emp) => emp.id === employeeId);
    if (employee) {
      employee.payslipOpened = !employee.payslipOpened;
      renderPayslipsTable();
    }
  }

  function downloadPayslip(employeeId) {
    showToast("Payslip download started", "success");
  }
  function resendPayslip(employeeId) {
    showToast("Payslip resent successfully", "success");
  }

  // Reconciliation actions for retry/mark paid
  function retryPayment(employeeId) {
    const employee = state.employees.find((emp) => emp.id === employeeId);
    if (!employee) return;
    showLoading();
    setTimeout(() => {
      hideLoading();
      employee.status = "paid";
      employee.bankRef = "TXN" + Math.random().toString().substr(2, 8);
      employee.failureReason = null;
      renderReconciliationTable();
      showToast(`Retry succeeded for ${employee.name}`, "success");
      addAuditLog(
        "System",
        "reconciliation",
        `Retry payment for ${employee.name}`
      );
    }, 1200);
  }

  function markPaidManually(employeeId) {
    const employee = state.employees.find((emp) => emp.id === employeeId);
    if (!employee) return;
    employee.status = "paid";
    employee.bankRef = "MANUAL_" + Date.now();
    employee.failureReason = null;
    renderReconciliationTable();
    showToast(`${employee.name} marked as paid`, "success");
    addAuditLog(
      "Sarah Johnson",
      "reconciliation",
      `Marked paid manually: ${employee.name}`
    );
  }

  // Event handler helpers
  function previewPayslipHandler(e) {
    const id = e.currentTarget.getAttribute("data-preview");
    if (id) previewPayslip(id);
  }

  // Initialization of event listeners and initial render
  function initializeEventListeners() {
    document.getElementById("btn-compute")?.addEventListener("click", () => {
      showToast("Payroll already computed for this run", "info");
    });

    document
      .getElementById("btn-generate-sif")
      ?.addEventListener("click", generateSIF);
    document
      .getElementById("btn-generate-sif-tab")
      ?.addEventListener("click", generateSIF);
    document
      .getElementById("btn-send-bank")
      ?.addEventListener("click", sendToBank);
    document
      .getElementById("btn-send-to-bank")
      ?.addEventListener("click", sendToBank);

    document.getElementById("btn-reconcile")?.addEventListener("click", () => {
      switchToTab("reconciliation");
    });

    document
      .getElementById("btn-generate-payslips")
      ?.addEventListener("click", () => {
        switchToTab("payslips");
      });

    document
      .getElementById("btn-generate-payslips-main")
      ?.addEventListener("click", generatePayslips);

    document.getElementById("btn-distribute")?.addEventListener("click", () => {
      showToast("Payslips distributed to employee portal", "success");
      state.runData.payslipsDistributed = true;
    });

    document.getElementById("btn-close-run")?.addEventListener("click", () => {
      showToast("Payroll run closed successfully", "success");
      state.runData.runClosed = true;
      addAuditLog("Sarah Johnson", "close", "Payroll run for Jan 2026 closed");
    });

    document
      .getElementById("btn-run-checks")
      ?.addEventListener("click", runChecks);
    document
      .getElementById("include-hold")
      ?.addEventListener("change", renderSIFTable);

    document
      .getElementById("btn-fetch-status")
      ?.addEventListener("click", fetchStatus);
    document
      .getElementById("btn-create-makeup")
      ?.addEventListener("click", createMakeUpRun);

    document
      .getElementById("select-all-reconciliation")
      ?.addEventListener("change", (e) => {
        const checkboxes = document.querySelectorAll(
          ".reconciliation-checkbox:not(:disabled)"
        );
        checkboxes.forEach((cb) => (cb.checked = e.target.checked));
        updateMakeUpButton();
      });

    document
      .getElementById("select-all-payslips")
      ?.addEventListener("change", (e) => {
        const checkboxes = document.querySelectorAll(".payslip-checkbox");
        checkboxes.forEach((cb) => (cb.checked = e.target.checked));
        updatePayslipBulkButtons();
      });

    document
      .getElementById("close-fix-drawer")
      ?.addEventListener("click", closeFixDrawer);
    document
      .getElementById("cancel-fix")
      ?.addEventListener("click", closeFixDrawer);
    document
      .getElementById("save-fix")
      ?.addEventListener("click", saveFixChanges);

    document.querySelectorAll(".fix-tab-link").forEach((link) => {
      link.addEventListener("click", () => {
        const tabId = link.getAttribute("data-tab");

        document.querySelectorAll(".fix-tab-link").forEach((l) => {
          l.classList.remove("border-primary", "text-primary");
          l.classList.add("border-transparent", "text-gray-500");
        });

        link.classList.remove("border-transparent", "text-gray-500");
        link.classList.add("border-primary", "text-primary");

        document.querySelectorAll(".fix-tab-content").forEach((content) => {
          content.classList.add("hidden");
        });

        document.getElementById(`fix-${tabId}`)?.classList.remove("hidden");
      });
    });

    document
      .getElementById("btn-close-preview")
      ?.addEventListener("click", () => {
        document.getElementById("payslip-preview")?.classList.add("hidden");
      });

    document.getElementById("btn-export")?.addEventListener("click", () => {
      const menu = document.getElementById("export-menu");
      menu?.classList.toggle("hidden");
    });

    // Delegated dynamic listeners
    document.addEventListener("change", (e) => {
      if (e.target.classList.contains("reconciliation-checkbox")) {
        updateMakeUpButton();
      }
      if (e.target.classList.contains("payslip-checkbox")) {
        updatePayslipBulkButtons();
      }
    });
  }

  // Entry init function that mirrors original DOMContentLoaded behaviour
  function init() {
    initializeSampleData();
    initializeSidebar();
    initializeTabs();
    initializeEventListeners();

    // initial renders
    renderSIFTable();
    renderAuditLog();

    // Set initial state based on run progress
    const g1 = document.getElementById("btn-generate-sif");
    const g2 = document.getElementById("btn-generate-sif-tab");
    if (g1) g1.disabled = false;
    if (g2) g2.disabled = false;
  }

  return (
    <>
      <div
        id="mobile-overlay"
        className="fixed inset-0  bg-black bg-opacity-60 z-40 lg:hidden opacity-0 pointer-events-none transition-opacity duration-300"
      />
      <Sidebar />

      <main id="main-content" className="main-content min-h-scree">
        <header className="bg-white border-b border-gray-200 -ml-12  px-4 lg:px-6  py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl lg:text-2xl font-heading font-semibold text-[#1C3D5A]">
                  Payroll Run & WPS
                </h1>
                <nav
                  className="flex items-center space-x-2 text-sm text-gray-500 mt-1"
                  aria-label="Breadcrumb"
                >
                  <a
                    href="#"
                    className="hover:text-primary focus-ring rounded px-1"
                  >
                    Home
                  </a>
                  <span>/</span>
                  <a
                    href="#"
                    className="hover:text-primary focus-ring rounded px-1"
                  >
                    Payroll
                  </a>
                  <span>/</span>
                  <span className="text-gray-900 font-medium">Run & WPS</span>
                </nav>
              </div>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              <select
                id="run-selector"
                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring min-w-[120px]"
              >
                <option value="jan2026">Jan 2026</option>
                <option value="dec2025">Dec 2025</option>
                <option value="nov2025">Nov 2025</option>
              </select>

              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">
                    Sarah Johnson
                  </div>
                  <div className="text-xs text-gray-500">Payroll Manager</div>
                </div>
                <div className="w-10 h-10 bg-[#FF6B35] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">SJ</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6 max-w-7xl lg:-ml-12 bg-gray-50 mx-auto">
          {/* Action Bar */}
          <div className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-wrap gap-3">
              <button
                id="btn-compute"
                className="bg-[#1DA2A9] text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors focus-ring"
              >
                Compute
              </button>
              <button
                id="btn-generate-sif"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors focus-ring"
                disabled
              >
                Generate SIF
              </button>
              <button
                id="btn-send-bank"
                className="bg-[#1C3D5A] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-900 transition-colors focus-ring"
                disabled
              >
                Send to Bank
              </button>
              <button
                id="btn-reconcile"
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors focus-ring"
                disabled
              >
                Reconcile
              </button>
              <button
                id="btn-generate-payslips"
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors focus-ring"
                disabled
              >
                Generate Payslips
              </button>
              <button
                id="btn-distribute"
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors focus-ring"
                disabled
              >
                Distribute Payslips
              </button>
              <button
                id="btn-close-run"
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors focus-ring"
                disabled
              >
                Close Run
              </button>
              <div className="flex-1" />
              <button
                id="btn-rollback"
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors focus-ring"
                disabled
              >
                Rollback
              </button>
              <div className="relative">
                <button
                  id="btn-export"
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors focus-ring"
                >
                  Export
                </button>
                <div
                  id="export-menu"
                  className="hidden absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]"
                >
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    CSV
                  </button>
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
              Run Timeline
            </h3>
            <div className="flex flex-wrap items-center gap-4 lg:gap-8">
              <div className="timeline-step completed flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#1DA2A9] rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Cut-off
                </span>
              </div>
              <div className="timeline-step completed flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#1DA2A9]  rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Import/Compute
                </span>
              </div>
              <div className="timeline-step completed flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#1DA2A9]  rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Validate
                </span>
              </div>
              <div className="timeline-step current flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <span className="text-sm font-medium text-[#FF6B35]">Lock</span>
              </div>
              <div className="timeline-step flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm font-bold">5</span>
                </div>
                <span className="text-sm font-medium text-gray-500">SIF</span>
              </div>
              <div className="timeline-step flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm font-bold">6</span>
                </div>
                <span className="text-sm font-medium text-gray-500">Bank</span>
              </div>
              <div className="timeline-step flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm font-bold">7</span>
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Reconcile
                </span>
              </div>
              <div className="timeline-step flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm font-bold">8</span>
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Payslips
                </span>
              </div>
              <div className="timeline-step flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm font-bold">9</span>
                </div>
                <span className="text-sm font-medium text-gray-500">Close</span>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 mb-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h4 className="text-xs font-medium text-gray-600 mb-1">
                Employees
              </h4>
              <p
                className="text-xl font-heading font-bold text-[#1C3D5A]"
                id="kpi-employees"
              >
                18
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h4 className="text-xs font-medium mb-1 text-[#1C3D5A]">
                Total Gross
              </h4>
              <p
                className="text-xl font-heading font-bold text-[#1C3D5A]"
                id="kpi-gross"
              >
                AED 485K
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h4 className="text-xs font-medium text-[#1C3D5A] mb-1">
                Deductions
              </h4>
              <p
                className="text-xl font-heading font-bold text-[#1C3D5A]"
                id="kpi-deductions"
              >
                AED 58K
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h4 className="text-xs font-medium text-[#1C3D5A] mb-1">
                Total Net
              </h4>
              <p
                className="text-xl font-heading font-bold text-[#1C3D5A]"
                id="kpi-net"
              >
                AED 427K
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h4 className="text-xs font-medium text-gray-600 mb-1">
                Variance
              </h4>
              <p
                className="text-xl font-heading font-bold text-green-600"
                id="kpi-variance"
              >
                +2.1%
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h4 className="text-xs font-medium text-gray-600 mb-1">
                WPS Ready
              </h4>
              <p
                className="text-xl font-heading font-bold text-[#1DA2A9]"
                id="kpi-wps-ready"
              >
                94%
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h4 className="text-xs font-medium text-gray-600 mb-1">
                On Hold
              </h4>
              <p
                className="text-xl font-heading font-bold text-yellow-600"
                id="kpi-hold"
              >
                1
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h4 className="text-xs font-medium text-gray-600 mb-1">
                Failures
              </h4>
              <p
                className="text-xl font-heading font-bold text-red-600"
                id="kpi-failures"
              >
                0
              </p>
            </div>
          </div>

          {/* Tabs (SIF Builder content shown by default via "active" class) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" role="tablist">
                <button
                  className="tab-link py-4 px-1 border-b-2 border-primary text-primary font-medium text-sm focus-ring whitespace-nowrap"
                  data-tab="sif-builder"
                  role="tab"
                  aria-selected="true"
                >
                  SIF Builder
                </button>
                <button
                  className="tab-link py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm focus-ring whitespace-nowrap"
                  data-tab="bank-disbursement"
                  role="tab"
                >
                  Bank Disbursement
                </button>
                <button
                  className="tab-link py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm focus-ring whitespace-nowrap"
                  data-tab="reconciliation"
                  role="tab"
                >
                  Reconciliation
                </button>
                <button
                  className="tab-link py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm focus-ring whitespace-nowrap"
                  data-tab="payslips"
                  role="tab"
                >
                  Payslips
                </button>
                <button
                  className="tab-link py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm focus-ring whitespace-nowrap"
                  data-tab="approvals"
                  role="tab"
                >
                  Approvals
                </button>
                <button
                  className="tab-link py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm focus-ring whitespace-nowrap"
                  data-tab="audit-logs"
                  role="tab"
                >
                  Audit & Logs
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* SIF Builder tab content */}
              <div
                id="sif-builder"
                className="tab-content active"
                role="tabpanel"
              >
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-accent mb-4">
                      SIF Configuration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label
                          htmlFor="salary-date"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Salary Date *
                        </label>
                        <input
                          id="salary-date"
                          type="date"
                          defaultValue="2026-01-31"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="bank-agent"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Bank/Agent *
                        </label>
                        <select
                          id="bank-agent"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                          defaultValue=""
                        >
                          <option value="">Select Bank/Agent</option>
                          <option value="emirates-nbd">Emirates NBD</option>
                          <option value="adcb">ADCB</option>
                          <option value="rakbank">RAKBank</option>
                          <option value="mashreq">Mashreq Bank</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="company-wps-id"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Company WPS ID *
                        </label>
                        <input
                          id="company-wps-id"
                          type="text"
                          defaultValue="WPS123456789"
                          readOnly
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 focus-ring"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="batch-name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Batch Name/No.
                        </label>
                        <input
                          id="batch-name"
                          type="text"
                          defaultValue="JAN2026_BATCH1"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="file-version"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          File Version
                        </label>
                        <input
                          id="file-version"
                          type="text"
                          defaultValue="v1"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="currency"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Currency
                        </label>
                        <select
                          id="currency"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                          defaultValue="AED"
                        >
                          <option value="AED">AED</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <input
                        id="include-hold"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label
                        htmlFor="include-hold"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Include On-Hold employees
                      </label>
                    </div>
                  </div>

                  {/* Mapping Checks */}
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-accent mb-4">
                      Mapping Checks
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Employee Name Format OK
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        IBAN Present
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                        Person ID Present (1 Missing)
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Net ≥ 0
                      </span>
                    </div>
                  </div>

                  {/* SIF Summary */}
                  <div className="bg-cyan-50 rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-accent mb-4">
                      SIF Summary
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Employees</p>
                        <p
                          className="text-xl font-bold text-[#1C3D5A]"
                          id="sif-employee-count"
                        >
                          17
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Net</p>
                        <p
                          className="text-xl font-bold text-[#1C3D5A]"
                          id="sif-total-net"
                        >
                          AED 427,850
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Min Net</p>
                        <p
                          className="text-xl font-bold text-[#1C3D5A]"
                          id="sif-min-net"
                        >
                          AED 4,500
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Max Net</p>
                        <p
                          className="text-xl font-bold text-[#1C3D5A]"
                          id="sif-max-net"
                        >
                          AED 45,000
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-yellow-600">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                        <span className="text-sm font-medium">
                          1 employee with missing Person ID
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      id="btn-run-checks"
                      className="bg-[#1DA2A9] text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors focus-ring"
                    >
                      Run Checks
                    </button>
                    <button
                      id="btn-generate-sif-tab"
                      className="bg-[#FF6B35] text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors focus-ring"
                      disabled
                    >
                      Generate SIF
                    </button>
                  </div>

                  {/* SIF Table */}
                  <div className="overflow-x-auto">
                    <table className="mobile-card-table w-full">
                      <caption className="sr-only">
                        SIF Employee Preview
                      </caption>
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Employee
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Person ID
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Bank/IBAN
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Net
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Hold?
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        id="sif-table-body"
                        className="bg-white divide-y divide-gray-200"
                      />
                    </table>
                    <div className="mobile-cards space-y-4" />
                  </div>
                </div>
              </div>

              {/* Bank Disbursement */}
              <div
                id="bank-disbursement"
                className="tab-content"
                role="tabpanel"
              >
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
                      Transmission
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Method</p>
                        <p className="font-medium">Portal Upload</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Sent At</p>
                        <p className="font-medium" id="transmission-sent">
                          -
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Reference</p>
                        <p className="font-medium" id="transmission-ref">
                          -
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span
                          id="transmission-status"
                          className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                        >
                          Not Sent
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        id="btn-send-to-bank"
                        className="bg-[#FF6B35] text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors focus-ring"
                        disabled
                      >
                        Send to Bank
                      </button>
                    </div>
                  </div>

                  <div className="bg-cyan-50 rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
                      File Set
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">File Name</p>
                        <p
                          className="font-medium font-mono text-sm"
                          id="file-name"
                        >
                          -
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Size</p>
                        <p className="font-medium" id="file-size">
                          -
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Checksum</p>
                        <p
                          className="font-medium font-mono text-sm"
                          id="file-checksum"
                        >
                          -
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
                      Payment Batches
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="mobile-card-table w-full">
                        <caption className="sr-only">Payment Batches</caption>
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Batch
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Employees
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Amount
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Sent At
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          id="payment-batches-body"
                          className="bg-white divide-y divide-gray-200"
                        >
                          <tr>
                            <td
                              colSpan="6"
                              className="px-4 py-8 text-center text-gray-500"
                            >
                              No payment batches yet. Generate SIF first.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reconciliation */}
              <div id="reconciliation" className="tab-content" role="tabpanel">
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
                      Bank Return Processing
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1 min-w-[200px]">
                        <label
                          htmlFor="return-file"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Upload Return File
                        </label>
                        <input
                          id="return-file"
                          type="file"
                          accept=".txt,.csv,.xml"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          id="btn-fetch-status"
                          className="bg-[#1DA2A9] text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors focus-ring"
                        >
                          Fetch Status
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-primary-800">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Auto-match rate:{" "}
                        <span id="auto-match-rate" className="ml-1">
                          94%
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                      <h4 className="text-xs font-medium text-gray-600 mb-1">
                        Paid %
                      </h4>
                      <p
                        className="text-xl font-heading font-bold text-green-600"
                        id="paid-percentage"
                      >
                        94%
                      </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                      <h4 className="text-xs font-medium text-gray-600 mb-1">
                        Failed Count
                      </h4>
                      <p
                        className="text-xl font-heading font-bold text-red-600"
                        id="failed-count"
                      >
                        1
                      </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                      <h4 className="text-xs font-medium text-gray-600 mb-1">
                        Avg Settlement
                      </h4>
                      <p
                        className="text-xl font-heading font-bold text-accent"
                        id="avg-settlement"
                      >
                        2.5 hrs
                      </p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                      <h4 className="text-xs font-medium text-gray-600 mb-1">
                        Oldest Pending
                      </h4>
                      <p
                        className="text-xl font-heading font-bold text-yellow-600"
                        id="oldest-pending"
                      >
                        3 hrs
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-heading font-semibold text-[#1C3D5A]">
                        Payment Status
                      </h3>
                      <button
                        id="btn-create-makeup"
                        className="bg-[#FF6B35] text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors focus-ring"
                        disabled
                      >
                        Create Make-Up Run
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="mobile-card-table w-full">
                        <caption className="sr-only">Payment Status</caption>
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-3">
                              <input
                                id="select-all-reconciliation"
                                type="checkbox"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                              />
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Employee
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Net
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Bank Ref
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Failure Reason
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          id="reconciliation-table-body"
                          className="bg-white divide-y divide-gray-200"
                        />
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payslips */}
              <div id="payslips" className="tab-content" role="tabpanel">
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-accent mb-4">
                      Generation Options
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label
                          htmlFor="payslip-language"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Language
                        </label>
                        <select
                          id="payslip-language"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                          defaultValue="en"
                        >
                          <option value="en">English</option>
                          <option value="ar">Arabic</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="show-breakdown"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label
                          htmlFor="show-breakdown"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Show Breakdown
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="mask-bank"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label
                          htmlFor="mask-bank"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Mask Bank Details
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="include-ytd"
                          type="checkbox"
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label
                          htmlFor="include-ytd"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Include YTD
                        </label>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        id="btn-generate-payslips-main"
                        className="bg-[#FF6B35] text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors focus-ring"
                        disabled
                      >
                        Generate Payslips
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-heading font-semibold text-accent">
                        Payslips
                      </h3>
                      <div className="flex gap-2">
                        <button
                          id="btn-bulk-distribute"
                          className="bg-[#1DA2A9] text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors focus-ring text-sm"
                          disabled
                        >
                          Distribute Selected
                        </button>
                        <button
                          id="btn-bulk-email"
                          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors focus-ring text-sm"
                          disabled
                        >
                          Email Selected
                        </button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="mobile-card-table w-full">
                        <caption className="sr-only">Payslips</caption>
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-3">
                              <input
                                id="select-all-payslips"
                                type="checkbox"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                              />
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Employee
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Net
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Delivery
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Opened?
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          id="payslips-table-body"
                          className="bg-white divide-y divide-gray-200"
                        >
                          <tr>
                            <td
                              colSpan="7"
                              className="px-4 py-8 text-center text-gray-500"
                            >
                              No payslips generated yet.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div
                    id="payslip-preview"
                    className="hidden bg-white rounded-xl border border-gray-200 p-6"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-heading font-semibold text-accent">
                        Payslip Preview
                      </h3>
                      <div className="flex gap-2">
                        <button className="text-primary hover:text-primary-600 font-medium text-sm focus-ring rounded px-2 py-1">
                          Download
                        </button>
                        <button
                          id="btn-close-preview"
                          className="text-gray-500 hover:text-gray-700 focus-ring rounded px-2 py-1"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm">
                      <div className="text-center mb-6">
                        <h4 className="text-lg font-bold">raideTalent HRMS</h4>
                        <p className="text-gray-600">
                          Salary Certificate - January 2026
                        </p>
                        <p className="text-red-500 text-xs mt-2">
                          CONFIDENTIAL
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <p>
                            <strong>Employee:</strong>{" "}
                            <span id="preview-employee-name">John Smith</span>
                          </p>
                          <p>
                            <strong>ID:</strong>{" "}
                            <span id="preview-employee-id">EMP001</span>
                          </p>
                          <p>
                            <strong>Department:</strong>{" "}
                            <span id="preview-department">Engineering</span>
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Pay Period:</strong> Jan 01 - Jan 31, 2026
                          </p>
                          <p>
                            <strong>Pay Date:</strong> Jan 31, 2026
                          </p>
                          <p>
                            <strong>Bank:</strong> Emirates NBD (**** 1234)
                          </p>
                        </div>
                      </div>
                      <div className="border-t border-gray-300 pt-4">
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <h5 className="font-bold mb-2">Earnings</h5>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span>Basic Salary:</span>
                                <span id="preview-basic">AED 15,000.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Housing Allowance:</span>
                                <span id="preview-housing">AED 5,000.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Transport Allowance:</span>
                                <span id="preview-transport">AED 1,500.00</span>
                              </div>
                              <div className="flex justify-between font-bold border-t pt-1">
                                <span>Gross:</span>
                                <span id="preview-gross">AED 21,500.00</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-bold mb-2">Deductions</h5>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span>Tax:</span>
                                <span id="preview-tax">AED 0.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Social Security:</span>
                                <span id="preview-social">AED 1,075.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Insurance:</span>
                                <span id="preview-insurance">AED 425.00</span>
                              </div>
                              <div className="flex justify-between font-bold border-t pt-1">
                                <span>Total Deductions:</span>
                                <span id="preview-deductions">
                                  AED 1,500.00
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-gray-400 mt-4 pt-4">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Net Pay:</span>
                            <span id="preview-net" className="text-primary">
                              AED 20,000.00
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Approvals */}
              <div id="approvals" className="tab-content" role="tabpanel">
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-accent mb-6">
                      Approval Workflow
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-[#1DA2A9] rounded-full flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Payroll Owner</h4>
                            <p className="text-sm text-gray-600">
                              Sarah Johnson
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Approved
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            Jan 30, 2026 14:30
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-[#1DA2A9] rounded-full flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">HR Manager</h4>
                            <p className="text-sm text-gray-600">
                              Michael Chen
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Approved
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            Jan 30, 2026 15:45
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-secondary">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-[#FF6B35] rounded-full flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Finance Manager</h4>
                            <p className="text-sm text-gray-600">Lisa Wang</p>
                            <p className="text-xs text-secondary">
                              Required for bank disbursement
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                          <div className="mt-1 space-x-2">
                            <button className="text-xs text-primary hover:text-primary-600 focus-ring rounded px-1">
                              Remind
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Director</h4>
                            <p className="text-sm text-gray-600">
                              David Rahman
                            </p>
                            <p className="text-xs text-gray-500">
                              Optional for final approval
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            Waiting
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-50 rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
                      Approval Rules
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          Generate SIF requires Payroll Owner + HR Manager
                          approval
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-yellow-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          Send to Bank requires Finance Manager approval
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          Close Run requires all required approvals + 0 Critical
                          exceptions
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      id="btn-request-approval"
                      className="bg-[#1DA2A9] text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors focus-ring"
                    >
                      Request Finance Approval
                    </button>
                    <button
                      id="btn-simulate-approve"
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors focus-ring"
                    >
                      Simulate Approval
                    </button>
                  </div>
                </div>
              </div>

              {/* Audit & Logs */}
              <div id="audit-logs" className="tab-content" role="tabpanel">
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
                      Filters
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label
                          htmlFor="log-actor"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Actor
                        </label>
                        <select
                          id="log-actor"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                        >
                          <option value="">All Users</option>
                          <option value="sarah">Sarah Johnson</option>
                          <option value="michael">Michael Chen</option>
                          <option value="lisa">Lisa Wang</option>
                          <option value="system">System</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="log-event"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Event Type
                        </label>
                        <select
                          id="log-event"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                        >
                          <option value="">All Events</option>
                          <option value="compute">Compute</option>
                          <option value="sif">SIF Generation</option>
                          <option value="bank">Bank Operations</option>
                          <option value="approval">Approvals</option>
                          <option value="payslip">Payslip Operations</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="log-date-from"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Date From
                        </label>
                        <input
                          id="log-date-from"
                          type="date"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="log-date-to"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Date To
                        </label>
                        <input
                          id="log-date-to"
                          type="date"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button className="bg-[#1DA2A9] text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors focus-ring">
                        Apply Filters
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors focus-ring">
                        Export Logs
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-heading font-semibold text-accent mb-4">
                      Audit Trail
                    </h3>
                    <div id="audit-log-container" className="space-y-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fix Employee Drawer */}
      <div
        id="fix-drawer"
        className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 drawer"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-heading font-semibold text-accent">
              Fix Employee Details
            </h3>
            <button
              id="close-fix-drawer"
              className="text-gray-500 hover:text-gray-700 focus-ring rounded p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8" role="tablist">
                  <button
                    className="fix-tab-link py-2 border-b-2 border-primary text-primary font-medium text-sm focus-ring"
                    data-tab="banking"
                  >
                    Banking
                  </button>
                  <button
                    className="fix-tab-link py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm focus-ring"
                    data-tab="identity"
                  >
                    Identity
                  </button>
                  <button
                    className="fix-tab-link py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm focus-ring"
                    data-tab="notes"
                  >
                    Notes
                  </button>
                </nav>
              </div>
              <div className="mt-6">
                <div id="fix-banking" className="fix-tab-content">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="fix-iban"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        IBAN
                      </label>
                      <input
                        id="fix-iban"
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        UAE IBAN format: AE07 0331 234567890123456
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="fix-bank-name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Bank Name
                      </label>
                      <select
                        id="fix-bank-name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                      >
                        <option value="">Select Bank</option>
                        <option value="emirates-nbd">Emirates NBD</option>
                        <option value="adcb">ADCB</option>
                        <option value="rakbank">RAKBank</option>
                        <option value="mashreq">Mashreq Bank</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div id="fix-identity" className="fix-tab-content hidden">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="fix-person-id"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Person ID (Emirates ID)
                      </label>
                      <input
                        id="fix-person-id"
                        type="text"
                        maxLength="15"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Format: 784-YYYY-NNNNNNN-N
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="fix-name-format"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Name Format
                      </label>
                      <input
                        id="fix-name-format"
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        As per Emirates ID
                      </p>
                    </div>
                  </div>
                </div>

                <div id="fix-notes" className="fix-tab-content hidden">
                  <div>
                    <label
                      htmlFor="fix-notes-text"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Notes
                    </label>
                    <textarea
                      id="fix-notes-text"
                      rows="4"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                      placeholder="Add notes about fixes..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
            <button
              id="cancel-fix"
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors focus-ring"
            >
              Cancel
            </button>
            <button
              id="save-fix"
              className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors focus-ring"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Toast & Loading overlays */}
      <div
        id="toast-container"
        className="fixed top-4 right-4 z-50 space-y-2"
      />
      <div
        id="loading-overlay"
        className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center"
      >
        <div className="bg-white rounded-xl p-6 text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-700 font-medium">Processing...</p>
        </div>
      </div>
    </>
  );
}
