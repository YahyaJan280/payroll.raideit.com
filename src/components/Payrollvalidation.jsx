import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const PayrollValidation = () => {
  // State management
  const [exceptionsData, setExceptionsData] = useState([]);
  const [payGridData, setPayGridData] = useState([]);
  const [currentEmployeeData, setCurrentEmployeeData] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState('allowances');
  const [toasts, setToasts] = useState([]);
  const [isMobileActionsOpen, setIsMobileActionsOpen] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    initializeData();
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
        setIsMobileMenuOpen(false);
        setIsMobileActionsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const initializeData = () => {
    // Sample exceptions data
    setExceptionsData([
      {
        id: 1,
        employee: 'Ahmed Al-Rashid',
        department: 'Engineering',
        issueType: 'Missing IBAN',
        detail: 'IBAN not provided for WPS compliance',
        severity: 'Critical',
        owner: 'HR',
        status: 'Open'
      },
      {
        id: 2,
        employee: 'Sarah Johnson',
        department: 'Marketing',
        issueType: 'Negative Net Pay',
        detail: 'Deductions exceed gross salary by AED 500',
        severity: 'Critical',
        owner: 'Payroll',
        status: 'Open'
      },
      {
        id: 3,
        employee: 'Mohamed Hassan',
        department: 'Sales',
        issueType: 'Unapproved Leave',
        detail: '3 days leave not approved by manager',
        severity: 'Major',
        owner: 'Manager',
        status: 'Open'
      },
      {
        id: 4,
        employee: 'Lisa Chen',
        department: 'Finance',
        issueType: 'OT > Policy',
        detail: '45 hours OT exceeds monthly limit of 40',
        severity: 'Major',
        owner: 'Manager',
        status: 'Open'
      },
      {
        id: 5,
        employee: 'James Wilson',
        department: 'HR',
        issueType: 'Grade Mismatch',
        detail: 'Current salary below grade minimum',
        severity: 'Minor',
        owner: 'HR',
        status: 'Open'
      }
    ]);

    // Sample pay grid data
    setPayGridData([
      {
        id: 1,
        employee: 'Ahmed Al-Rashid',
        department: 'Engineering',
        daysWorked: 22,
        paidDays: 22,
        otHours: 8,
        leave: 0,
        base: 15000,
        allowances: 7500,
        deductions: 1500,
        gross: 22500,
        net: 21000,
        variance: 2.3,
        wpsReady: false,
        status: 'Needs Review'
      },
      {
        id: 2,
        employee: 'Sarah Johnson',
        department: 'Marketing',
        daysWorked: 20,
        paidDays: 20,
        otHours: 5,
        leave: 2,
        base: 12000,
        allowances: 6000,
        deductions: 18500,
        gross: 18000,
        net: -500,
        variance: -15.2,
        wpsReady: true,
        status: 'Blocked'
      },
      {
        id: 3,
        employee: 'Mohamed Hassan',
        department: 'Sales',
        daysWorked: 19,
        paidDays: 22,
        otHours: 12,
        leave: 3,
        base: 10000,
        allowances: 5000,
        deductions: 800,
        gross: 15000,
        net: 14200,
        variance: 8.1,
        wpsReady: true,
        status: 'Needs Review'
      },
      {
        id: 4,
        employee: 'Lisa Chen',
        department: 'Finance',
        daysWorked: 22,
        paidDays: 22,
        otHours: 45,
        leave: 0,
        base: 18000,
        allowances: 9000,
        deductions: 2000,
        gross: 27000,
        net: 25000,
        variance: 12.5,
        wpsReady: true,
        status: 'Needs Review'
      },
      {
        id: 5,
        employee: 'James Wilson',
        department: 'HR',
        daysWorked: 22,
        paidDays: 22,
        otHours: 3,
        leave: 0,
        base: 8000,
        allowances: 4000,
        deductions: 600,
        gross: 12000,
        net: 11400,
        variance: -2.1,
        wpsReady: true,
        status: 'Clean'
      }
    ]);
  };

  // Handler functions
  const handleImportAttendance = () => {
    showLoadingToast('Importing attendance data...');
    setTimeout(() => {
      showSuccessToast('Attendance data imported successfully for 142 employees');
      setPayGridData(prev => prev.map(emp => ({
        ...emp,
        otHours: emp.otHours + Math.floor(Math.random() * 5)
      })));
    }, 2000);
  };

  const handleRecomputePay = () => {
    showLoadingToast('Recomputing pay for all employees...');
    setTimeout(() => {
      showSuccessToast('Pay computation completed successfully');
      setPayGridData(prev => prev.map(emp => ({
        ...emp,
        gross: emp.base + emp.allowances + (emp.otHours * 50),
        net: emp.base + emp.allowances + (emp.otHours * 50) - emp.deductions
      })));
    }, 3000);
  };

  const handleValidateAll = () => {
    showLoadingToast('Running validation checks...');
    setTimeout(() => {
      showSuccessToast('Validation completed. 16 exceptions found.');
    }, 2000);
  };

  const handleLockCycle = () => {
    const criticalExceptions = exceptionsData.filter(e => e.severity === 'Critical');
    if (criticalExceptions.length > 0) {
      showErrorToast('Cannot lock cycle: Critical exceptions must be resolved first');
      return;
    }
    showLoadingToast('Locking payroll cycle...');
    setTimeout(() => {
      showSuccessToast('Payroll cycle locked successfully');
    }, 2000);
  };

  const handleApplyFilters = () => {
    showInfoToast('Filters applied');
  };

  const handleResetFilters = () => {
    showInfoToast('Filters reset');
  };

  const handleFixException = (id) => {
    const exception = exceptionsData.find(e => e.id === id);
    if (exception) {
      if (exception.issueType === 'Missing IBAN' || exception.issueType === 'Negative Net Pay') {
        const employee = payGridData.find(emp => emp.employee === exception.employee);
        if (employee) {
          openAdjustmentDrawer(employee.id);
        }
      } else {
        showSuccessToast(`Opened fix workflow for ${exception.issueType}`);
      }
    }
  };

  const handleMarkReviewed = (id) => {
    const reason = prompt('Please provide a reason for marking this as reviewed:');
    if (reason) {
      setExceptionsData(prev => prev.filter(e => e.id !== id));
      showSuccessToast('Exception marked as reviewed');
    }
  };

  const handleDismissException = (id) => {
    if (window.confirm('Are you sure you want to dismiss this minor exception?')) {
      setExceptionsData(prev => prev.filter(e => e.id !== id));
      showSuccessToast('Exception dismissed');
    }
  };

  const handleViewAudit = (id) => {
    const employee = payGridData.find(emp => emp.id === id);
    showInfoToast(`Opened audit trail for ${employee.employee}`);
  };

  const handleRowSelection = () => {
    const checkboxes = document.querySelectorAll('.row-checkbox:checked');
    const bulkBtn = document.getElementById('bulk-actions-btn');
    if (bulkBtn) {
      if (checkboxes.length > 0) {
        bulkBtn.disabled = false;
        bulkBtn.textContent = `Bulk Actions (${checkboxes.length})`;
      } else {
        bulkBtn.disabled = true;
        bulkBtn.textContent = 'Bulk Actions';
      }
    }
  };

  const handleSelectAll = () => {
    const selectAll = document.getElementById('select-all');
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.checked = selectAll.checked;
    });
    handleRowSelection();
  };

  const openAdjustmentDrawer = (employeeId) => {
    const employee = payGridData.find(emp => emp.id === employeeId);
    if (!employee) return;
    setCurrentEmployeeData(employee);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setCurrentEmployeeData(null);
  };

  const switchDrawerTab = (tabName) => {
    setActiveDrawerTab(tabName);
  };

  const handleSaveAdjustment = () => {
    if (!currentEmployeeData) return;
    showLoadingToast('Saving adjustments...');
    setTimeout(() => {
      showSuccessToast(`Adjustments saved for ${currentEmployeeData.employee}`);
      setPayGridData(prev => prev.map(emp => 
        emp.id === currentEmployeeData.id 
          ? { ...emp, status: 'Clean', net: emp.gross - emp.deductions }
          : emp
      ));
      closeDrawer();
    }, 1500);
  };

  // Toast functions
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    const toast = { id, message, type };
    setToasts(prev => [...prev, toast]);
    
    if (type !== 'loading') {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 4000);
    }
    
    return toast;
  };

  const showSuccessToast = (message) => showToast(message, 'success');
  const showErrorToast = (message) => showToast(message, 'error');
  const showWarningToast = (message) => showToast(message, 'warning');
  const showInfoToast = (message) => showToast(message, 'info');
  const showLoadingToast = (message) => showToast(message, 'loading');

  return (
    <div className="bg-gray-50 font-sans">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Toast Container */}
      <div id="toast-container" className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => {
          const bgColor = {
            'success': 'bg-green-500',
            'error': 'bg-red-500',
            'warning': 'bg-yellow-500',
            'info': 'bg-blue-500',
            'loading': 'bg-gray-500'
          }[toast.type];

          return (
            <div
              key={toast.id}
              className={`toast ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-y-0 opacity-100`}
              aria-live="polite"
            >
              <div className="flex items-center space-x-2">
                {toast.type === 'loading' && (
                  <div className="loading-spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                <span className="text-sm font-medium">{toast.message}</span>
              </div>
            </div>
          );
        })}
      </div>

      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <main id="main-content" className={`main-content min-h-screen bg-gray-50 transition-all duration-300 ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Header */}
        <header className="bg-white lg:-ml-12 border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
             

              {/* Desktop sidebar toggle */}
             

              <div>
                <h1 className="text-xl lg:text-2xl font-heading font-semibold text-accent">Pre-Payroll Validation</h1>
                <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-1" aria-label="Breadcrumb">
                  <a href="#" className="hover:text-primary focus-ring rounded px-1">Home</a>
                  <span>/</span>
                  <a href="#" className="hover:text-primary focus-ring rounded px-1">Payroll</a>
                  <span>/</span>
                  <span className="text-gray-900 font-medium">Pre-Payroll Validation</span>
                </nav>
              </div>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-3">
              {/* Action Buttons */}
              <button 
                id="import-attendance-btn"
                onClick={handleImportAttendance}
                className="hidden sm:inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus-ring"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                </svg>
                Import Attendance
              </button>

              <button 
                id="recompute-btn"
                onClick={handleRecomputePay}
                className="hidden sm:inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus-ring"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Recompute Pay
              </button>

              <button 
                id="validate-all-btn"
                onClick={handleValidateAll}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-[#1DA2A9] border border-primary rounded-lg hover:bg-primary-600 focus-ring"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Validate All
              </button>

              <button 
                id="lock-cycle-btn"
                onClick={handleLockCycle}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-orange-600 border border-secondary rounded-lg hover:bg-orange-600 focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                Lock Cycle
              </button>

              {/* Mobile Actions Menu */}
              <div className="sm:hidden relative">
                <button 
                  id="mobile-actions-btn"
                  onClick={() => setIsMobileActionsOpen(!isMobileActionsOpen)}
                  className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg focus-ring"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                  </svg>
                </button>
                {isMobileActionsOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-40">
                    <button 
                      onClick={handleImportAttendance}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Import Attendance
                    </button>
                    <button 
                      onClick={handleRecomputePay}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Recompute Pay
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Export Report
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6  lg:-ml-12 space-y-6">
          {/* Cycle Timeline */}
          <div className="bg-white  rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-heading font-semibold text-accent mb-4">Payroll Cycle Timeline</h2>
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
              <div className="absolute top-4 left-0 h-0.5 bg-[#1DA2A9]" style={{width: '50%'}}></div>
              
              {/* Steps */}
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full step-completed flex items-center justify-center text-xs font-medium">1</div>
                  <span className="text-xs text-gray-600 mt-2 text-center">Cut-off</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full step-completed flex items-center justify-center text-xs font-medium">2</div>
                  <span className="text-xs text-gray-600 mt-2 text-center">Import</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full step-completed flex items-center justify-center text-xs font-medium">3</div>
                  <span className="text-xs text-gray-600 mt-2 text-center">Compute</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full step-active flex items-center justify-center text-xs font-medium">4</div>
                  <span className="text-xs text-gray-900 font-medium mt-2 text-center">Validate</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full step-pending flex items-center justify-center text-xs font-medium">5</div>
                  <span className="text-xs text-gray-600 mt-2 text-center">Approve</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full step-pending flex items-center justify-center text-xs font-medium">6</div>
                  <span className="text-xs text-gray-600 mt-2 text-center">WPS</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full step-pending flex items-center justify-center text-xs font-medium">7</div>
                  <span className="text-xs text-gray-600 mt-2 text-center">Disburse</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Toolbar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
              <h2 className="text-lg font-heading font-semibold text-accent mb-2 lg:mb-0">Filters</h2>
              <div className="flex space-x-2">
                <button 
                  id="apply-filters-btn"
                  onClick={handleApplyFilters}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1DA2A9] rounded-lg hover:bg-primary-600 focus-ring"
                >
                  Apply
                </button>
                <button 
                  id="reset-filters-btn"
                  onClick={handleResetFilters}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus-ring"
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              <div>
                <label htmlFor="pay-cycle" className="block text-sm font-medium text-gray-700 mb-1">Pay Cycle</label>
                <select id="pay-cycle" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
                  <option>Jan 2026</option>
                  <option>Dec 2025</option>
                  <option>Nov 2025</option>
                </select>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select id="location" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
                  <option>All Locations</option>
                  <option>Dubai</option>
                  <option>Abu Dhabi</option>
                  <option>Sharjah</option>
                </select>
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select id="department" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
                  <option>All Departments</option>
                  <option>Engineering</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>HR</option>
                </select>
              </div>
              <div>
                <label htmlFor="emp-type" className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                <select id="emp-type" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
                  <option>All Types</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>
              <div>
                <label htmlFor="variance" className="block text-sm font-medium text-gray-700 mb-1">Variance</label>
                <select id="variance" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
                  <option>All</option>
                  <option>≥10%</option>
                  <option>≥20%</option>
                  <option>≥30%</option>
                </select>
              </div>
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input 
                  type="text" 
                  id="search" 
                  placeholder="Employee name..." 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>

          {/* Summary KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Employees</h3>
              <p className="text-2xl font-heading font-bold text-accent">142</p>
              <p className="text-xs text-gray-500">in scope</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Gross</h3>
              <p className="text-2xl font-heading font-bold text-accent">3.2M</p>
              <p className="text-xs text-gray-500">AED</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Deductions</h3>
              <p className="text-2xl font-heading font-bold text-accent">485K</p>
              <p className="text-xs text-gray-500">AED</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Total Net</h3>
              <p className="text-2xl font-heading font-bold text-accent">2.7M</p>
              <p className="text-xs text-gray-500">AED</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Variance</h3>
              <p className="text-2xl font-heading font-bold text-green-600">+2.3%</p>
              <p className="text-xs text-gray-500">vs last cycle</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-1">WPS Ready</h3>
              <p className="text-2xl font-heading font-bold text-yellow-600">87%</p>
              <p className="text-xs text-gray-500">18 pending</p>
            </div>
          </div>
          {/* Exceptions Center */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h2 className="text-lg font-heading font-semibold text-accent">Exceptions Center</h2>
                  <p className="text-sm text-gray-600 mt-1">Critical issues requiring attention before payroll lock</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    {exceptionsData.filter(e => e.severity === 'Critical').length} Critical
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    {exceptionsData.filter(e => e.severity === 'Major').length} Major
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {exceptionsData.filter(e => e.severity === 'Minor').length} Minor
                  </span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full" id="exceptions-table">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200" id="exceptions-tbody">
                  {exceptionsData.map((exception) => {
                    const severityClass = {
                      'Critical': 'bg-red-100 text-red-800',
                      'Major': 'bg-yellow-100 text-yellow-800',
                      'Minor': 'bg-blue-100 text-blue-800'
                    }[exception.severity];

                    return (
                      <tr key={exception.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{exception.employee}</div>
                          <div className="text-sm text-gray-500">{exception.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{exception.issueType}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">{exception.detail}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityClass}`}>
                            {exception.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exception.owner}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button 
                            onClick={() => handleFixException(exception.id)}
                            className="text-primary hover:text-primary-600"
                          >
                            Fix
                          </button>
                          <button 
                            onClick={() => handleMarkReviewed(exception.id)}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Mark Reviewed
                          </button>
                          {exception.severity === 'Minor' && (
                            <button 
                              onClick={() => handleDismissException(exception.id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              Dismiss
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Employee Pay Grid */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h2 className="text-lg font-heading font-semibold text-accent">Employee Pay Grid</h2>
                  <p className="text-sm text-gray-600 mt-1">Detailed payroll breakdown with adjustment capabilities</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <button 
                    id="bulk-actions-btn"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus-ring disabled:opacity-50" 
                    disabled
                  >
                    Bulk Actions
                  </button>
                  <select id="page-size" className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>10 per page</option>
                    <option>25 per page</option>
                    <option>50 per page</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full" id="pay-grid-table">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input 
                        type="checkbox" 
                        id="select-all" 
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                      Employee 
                      <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                      </svg>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OT Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allowances</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WPS</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200" id="pay-grid-tbody">
                  {payGridData.map((employee) => {
                    const statusClass = {
                      'Clean': 'bg-green-100 text-green-800',
                      'Needs Review': 'bg-yellow-100 text-yellow-800',
                      'Blocked': 'bg-red-100 text-red-800'
                    }[employee.status];

                    const varianceClass = employee.variance >= 0 ? 'text-green-600' : 'text-red-600';
                    const netClass = employee.net < 0 ? 'text-red-600 font-medium' : 'text-gray-900';

                    return (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <input 
                            type="checkbox" 
                            className="row-checkbox rounded border-gray-300 text-primary focus:ring-primary" 
                            data-id={employee.id}
                            onChange={handleRowSelection}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{employee.employee}</div>
                          <div className="text-sm text-gray-500">{employee.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.paidDays}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.otHours}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.leave}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">AED {employee.base.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            AED {employee.allowances.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            AED {employee.deductions.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AED {employee.gross.toLocaleString()}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${netClass}`}>AED {employee.net.toLocaleString()}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${varianceClass}`}>{employee.variance > 0 ? '+' : ''}{employee.variance}%</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${employee.wpsReady ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {employee.wpsReady ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
                            {employee.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button 
                            onClick={() => openAdjustmentDrawer(employee.id)}
                            className="text-primary hover:text-primary-600"
                          >
                            Adjust
                          </button>
                          <button 
                            onClick={() => handleViewAudit(employee.id)}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Audit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">142</span> results
                </p>
                <div className="flex items-center space-x-1">
                  <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 focus-ring" disabled>
                    Previous
                  </button>
                  <button className="px-3 py-2 text-sm font-medium bg-primary text-white border border-primary rounded-lg focus-ring">
                    1
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 focus-ring">
                    2
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 focus-ring">
                    3
                  </button>
                  <span className="px-2 text-sm text-gray-500">...</span>
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 focus-ring">
                    15
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 focus-ring">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* WPS Readiness & Approvals Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* WPS Readiness */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-heading font-semibold text-accent mb-4">WPS Readiness</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">IBAN Completeness</span>
                  <span className="text-sm font-medium text-gray-900">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '87%'}}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Bank/Agent Set</span>
                  <span className="text-sm font-medium text-green-600">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '95%'}}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Name Format Compliance</span>
                  <span className="text-sm font-medium text-green-600">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '98%'}}></div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Employees Not Ready (18)</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Ahmed Al-Rashid</span>
                    <button className="text-primary hover:text-primary-600 font-medium">Fix IBAN</button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sarah Johnson</span>
                    <button className="text-primary hover:text-primary-600 font-medium">Fix Bank</button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Mohamed Hassan</span>
                    <button className="text-primary hover:text-primary-600 font-medium">Fix Name</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Approvals & Lock */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-heading font-semibold text-accent mb-4">Approvals & Lock</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Payroll Owner</p>
                      <p className="text-xs text-gray-500">Sarah Mitchell</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Approved
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">HR Manager</p>
                      <p className="text-xs text-gray-500">James Wilson</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Finance</p>
                      <p className="text-xs text-gray-500">Lisa Chen</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Waiting
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium text-red-800">Cannot Lock Cycle</h4>
                      <ul className="text-xs text-red-600 mt-1 space-y-1">
                        <li>• 5 Critical exceptions pending</li>
                        <li>• HR approval required</li>
                        <li>• WPS readiness below 95%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Audit & Logs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-accent">Audit & Activity Log</h3>
              <button className="text-sm text-primary hover:text-primary-600 font-medium">Export Log</button>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">Attendance imported for 142 employees</p>
                  <p className="text-xs text-gray-500">Sarah Mitchell • 2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">Pay computation completed for all employees</p>
                  <p className="text-xs text-gray-500">System • 1 hour ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">16 validation exceptions detected</p>
                  <p className="text-xs text-gray-500">System • 45 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">Fixed IBAN for Ahmed Al-Rashid</p>
                  <p className="text-xs text-gray-500">James Wilson • 30 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Adjustments Drawer */}
      {isDrawerOpen && (
        <>
          <div 
            id="drawer-overlay" 
            className="fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300"
            onClick={closeDrawer}
          />
          <div id="adjustments-drawer" className="drawer fixed inset-y-0 right-0 w-full max-w-lg bg-white shadow-xl z-50 border-l border-gray-200 transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="h-full flex flex-col">
              {/* Drawer Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-accent">Adjust Pay</h3>
                    <p className="text-sm text-gray-600" id="drawer-employee-name">
                      {currentEmployeeData?.employee || 'Employee'}
                    </p>
                  </div>
                  <button 
                    id="close-drawer" 
                    onClick={closeDrawer}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg focus-ring"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 mt-4">
                  <button 
                    className={`drawer-tab px-3 py-2 text-sm font-medium rounded-lg ${
                      activeDrawerTab === 'allowances' 
                        ? 'active bg-primary text-white' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                    onClick={() => switchDrawerTab('allowances')}
                  >
                    Allowances
                  </button>
                  <button 
                    className={`drawer-tab px-3 py-2 text-sm font-medium rounded-lg ${
                      activeDrawerTab === 'deductions' 
                        ? 'active bg-primary text-white' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                    onClick={() => switchDrawerTab('deductions')}
                  >
                    Deductions
                  </button>
                  <button 
                    className={`drawer-tab px-3 py-2 text-sm font-medium rounded-lg ${
                      activeDrawerTab === 'notes' 
                        ? 'active bg-primary text-white' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                    onClick={() => switchDrawerTab('notes')}
                  >
                    Notes
                  </button>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Allowances Tab */}
                {activeDrawerTab === 'allowances' && (
                  <div id="allowances-tab" className="drawer-content">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Housing Allowance</label>
                        <input 
                          type="number" 
                          defaultValue="5000" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Transport Allowance</label>
                        <input 
                          type="number" 
                          defaultValue="2000" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Other Allowance</label>
                        <input 
                          type="number" 
                          defaultValue="500" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                          <option>Manager Request</option>
                          <option>Policy Change</option>
                          <option>Correction</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea 
                          rows="3" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                          placeholder="Additional notes..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Deductions Tab */}
                {activeDrawerTab === 'deductions' && (
                  <div id="deductions-tab" className="drawer-content">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Absence Deduction</label>
                        <input 
                          type="number" 
                          defaultValue="0" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Loan Installment</label>
                        <input 
                          type="number" 
                          defaultValue="1500" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Other Deduction</label>
                        <input 
                          type="number" 
                          defaultValue="0" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes Tab */}
                {activeDrawerTab === 'notes' && (
                  <div id="notes-tab" className="drawer-content">
                    <textarea 
                      rows="6" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                      placeholder="Add notes about this adjustment..."
                    />
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Current Gross:</span>
                    <span className="font-medium">AED {currentEmployeeData?.gross?.toLocaleString() || '18,500'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Current Net:</span>
                    <span className="font-medium">AED {currentEmployeeData?.net?.toLocaleString() || '17,000'}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-primary pt-2 border-t border-gray-200 mt-2">
                    <span>New Net:</span>
                    <span>AED {currentEmployeeData?.net?.toLocaleString() || '17,000'}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button 
                    id="cancel-adjustment" 
                    onClick={closeDrawer}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus-ring"
                  >
                    Cancel
                  </button>
                  <button 
                    id="save-adjustment" 
                    onClick={handleSaveAdjustment}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-600 focus-ring"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PayrollValidation;