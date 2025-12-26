import { useState, useEffect } from 'react';
import React from 'react';
import Sidebar from './Sidebar';
const PayrollEmploye = () => {
  // State Management
  const [currentTab, setCurrentTab] = useState('employee-mapping');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState(new Set());
  const [toasts, setToasts] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedStatementsEmployee, setSelectedStatementsEmployee] = useState('');
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [loanFormData, setLoanFormData] = useState({
    employee: '',
    type: '',
    principal: '',
    rate: '0',
    tenure: '',
    installment: '',
    startCycle: '2025-10-01',
    recoveryDay: 'on-cycle',
    capPercentage: '50',
    skipNegativeNet: false,
    reason: '',
    notes: '',
    tenureMode: 'months',
    amountMode: 'fixed'
  });

  // Initial Data
  const payGroups = [
    { id: 'monthly-ae', name: 'Monthly AE', frequency: 'Monthly', currency: 'AED' },
    { id: 'weekly-ae', name: 'Weekly AE', frequency: 'Weekly', currency: 'AED' },
    { id: 'monthly-usd', name: 'Monthly USD', frequency: 'Monthly', currency: 'USD' }
  ];

  const salaryStructures = [
    { id: 'standard-ae', name: 'Standard AE', version: '1.0' },
    { id: 'executive-ae', name: 'Executive AE', version: '1.0' }
  ];

  const [employees] = useState([
    { id: 'EMP001', name: 'Ahmed Hassan', department: 'Engineering', location: 'Dubai', payGroup: 'monthly-ae', structure: 'standard-ae', currency: 'AED', wpsReady: true, status: 'Active', baseSalary: 12000, allowances: 4000, deductions: 800 },
    { id: 'EMP002', name: 'Maria Rodriguez', department: 'Marketing', location: 'Dubai', payGroup: 'monthly-ae', structure: 'standard-ae', currency: 'AED', wpsReady: false, status: 'Active', baseSalary: 8000, allowances: 3000, deductions: 500 },
    { id: 'EMP003', name: 'John Smith', department: 'Sales', location: 'Abu Dhabi', payGroup: 'monthly-ae', structure: 'standard-ae', currency: 'AED', wpsReady: true, status: 'Active', baseSalary: 10000, allowances: 3500, deductions: 600 },
    { id: 'EMP004', name: 'Fatima Al Zahra', department: 'HR', location: 'Dubai', payGroup: 'monthly-ae', structure: 'executive-ae', currency: 'AED', wpsReady: true, status: 'Active', baseSalary: 15000, allowances: 5000, deductions: 1000 },
    { id: 'EMP005', name: 'David Chen', department: 'Engineering', location: 'Dubai', payGroup: 'monthly-ae', structure: 'standard-ae', currency: 'AED', wpsReady: true, status: 'On Leave', baseSalary: 11000, allowances: 3800, deductions: 700 },
    { id: 'EMP006', name: 'Sarah Johnson', department: 'Marketing', location: 'Sharjah', payGroup: 'monthly-ae', structure: 'standard-ae', currency: 'AED', wpsReady: true, status: 'Active', baseSalary: 9500, allowances: 3200, deductions: 550 },
    { id: 'EMP007', name: 'Mohammed Ali', department: 'Sales', location: 'Dubai', payGroup: 'weekly-ae', structure: 'standard-ae', currency: 'AED', wpsReady: false, status: 'Active', baseSalary: 2200, allowances: 800, deductions: 150 },
    { id: 'EMP008', name: 'Lisa Wang', department: 'Engineering', location: 'Abu Dhabi', payGroup: 'monthly-usd', structure: 'executive-ae', currency: 'USD', wpsReady: true, status: 'Active', baseSalary: 5000, allowances: 1500, deductions: 300 },
    { id: 'EMP009', name: 'Omar Khalil', department: 'HR', location: 'Dubai', payGroup: '', structure: '', currency: 'AED', wpsReady: false, status: 'Active', baseSalary: 0, allowances: 0, deductions: 0 },
    { id: 'EMP010', name: 'Emma Thompson', department: 'Marketing', location: 'Dubai', payGroup: 'monthly-ae', structure: 'standard-ae', currency: 'AED', wpsReady: true, status: 'Exit', baseSalary: 7500, allowances: 2800, deductions: 450 }
  ]);

  const [recurringComponents] = useState([
    { id: 'RC001', employeeId: 'EMP001', employeeName: 'Ahmed Hassan', head: 'Mobile Allowance', type: 'Earning', amount: 300, formula: '', startDate: '2025-01-01', endDate: '', status: 'Active', showOnPayslip: true },
    { id: 'RC002', employeeId: 'EMP002', employeeName: 'Maria Rodriguez', head: 'Health Insurance', type: 'Deduction', amount: 200, formula: '', startDate: '2025-01-01', endDate: '', status: 'Active', showOnPayslip: true },
    { id: 'RC003', employeeId: 'EMP003', employeeName: 'John Smith', head: 'Performance Bonus', type: 'Earning', amount: 0, formula: 'Base * 0.1', startDate: '2025-03-01', endDate: '2025-12-31', status: 'Active', showOnPayslip: true },
    { id: 'RC004', employeeId: 'EMP004', employeeName: 'Fatima Al Zahra', head: 'Car Allowance', type: 'Earning', amount: 1200, formula: '', startDate: '2025-01-01', endDate: '', status: 'Active', showOnPayslip: true },
    { id: 'RC005', employeeId: 'EMP005', employeeName: 'David Chen', head: 'Loan Deduction', type: 'Deduction', amount: 500, formula: '', startDate: '2025-02-01', endDate: '2026-01-31', status: 'Suspended', showOnPayslip: true },
    { id: 'RC006', employeeId: 'EMP006', employeeName: 'Sarah Johnson', head: 'Overtime Pay', type: 'Earning', amount: 0, formula: 'Hours * 25', startDate: '2025-01-01', endDate: '', status: 'Active', showOnPayslip: true },
    { id: 'RC007', employeeId: 'EMP007', employeeName: 'Mohammed Ali', head: 'Transportation', type: 'Earning', amount: 400, formula: '', startDate: '2025-01-01', endDate: '', status: 'Active', showOnPayslip: false },
    { id: 'RC008', employeeId: 'EMP008', employeeName: 'Lisa Wang', head: 'Housing Allowance', type: 'Earning', amount: 2000, formula: '', startDate: '2025-01-01', endDate: '', status: 'Active', showOnPayslip: true }
  ]);

  const [loans] = useState([
    { id: 'LOAN001', employeeId: 'EMP001', employeeName: 'Ahmed Hassan', type: 'Advance', principal: 15000, rate: 0, term: 12, startCycle: '2025-02-01', installment: 1250, balance: 11250, status: 'Active' },
    { id: 'LOAN002', employeeId: 'EMP003', employeeName: 'John Smith', type: 'Loan', principal: 25000, rate: 5, term: 24, startCycle: '2025-01-01', installment: 1100, balance: 23200, status: 'Active' },
    { id: 'LOAN003', employeeId: 'EMP004', employeeName: 'Fatima Al Zahra', type: 'Travel', principal: 8000, rate: 0, term: 8, startCycle: '2025-01-01', installment: 1000, balance: 0, status: 'Paid' },
    { id: 'LOAN004', employeeId: 'EMP005', employeeName: 'David Chen', type: 'Other', principal: 20000, rate: 3, term: 18, startCycle: '2024-12-01', installment: 1150, balance: 17250, status: 'Delinquent' },
    { id: 'LOAN005', employeeId: 'EMP008', employeeName: 'Lisa Wang', type: 'Advance', principal: 12000, rate: 0, term: 10, startCycle: '2025-03-01', installment: 1200, balance: 12000, status: 'Hold' }
  ]);

  const [auditEntries] = useState([
    { timestamp: '2025-09-22 14:30:00', actor: 'Sarah Johnson', change: 'Loan Created', before: '', after: 'LOAN005 - Lisa Wang - AED 12,000', reason: 'Employee request for advance', source: 'UI' },
    { timestamp: '2025-09-22 10:15:00', actor: 'System', change: 'Loan Status Update', before: 'Active', after: 'Delinquent', reason: 'Two consecutive skipped payments', source: 'API' },
    { timestamp: '2025-09-21 16:45:00', actor: 'Sarah Johnson', change: 'Salary Assignment', before: 'AED 10,000', after: 'AED 12,000', reason: 'Annual increment', source: 'UI' },
    { timestamp: '2025-09-21 09:20:00', actor: 'Ahmed Hassan', change: 'Recurring Component Added', before: '', after: 'Mobile Allowance - AED 300', reason: 'Policy update', source: 'UI' },
    { timestamp: '2025-09-20 13:10:00', actor: 'System', change: 'Employee Mapping', before: 'Unmapped', after: 'Monthly AE - Standard AE', reason: 'Bulk mapping process', source: 'API' }
  ]);

  // Toast System
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Open Loan Drawer
  const openLoanDrawer = () => {
    setLoanFormData({
      employee: '',
      type: '',
      principal: '',
      rate: '0',
      tenure: '',
      installment: '',
      startCycle: '2025-10-01',
      recoveryDay: 'on-cycle',
      capPercentage: '50',
      skipNegativeNet: false,
      reason: '',
      notes: '',
      tenureMode: 'months',
      amountMode: 'fixed'
    });
    setDrawerContent(<LoanDrawerContent />);
    setIsDrawerOpen(true);
  };

  // Update loan calculation
  const updateLoanCalculation = () => {
    const principal = parseFloat(loanFormData.principal || 0);
    const rate = parseFloat(loanFormData.rate || 0);
    const tenure = parseFloat(loanFormData.tenure || 0);

    if (principal > 0 && tenure > 0 && loanFormData.tenureMode === 'months') {
      const monthlyRate = rate / 100 / 12;
      let installment;
      
      if (rate > 0) {
        installment = principal * (monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
      } else {
        installment = principal / tenure;
      }
      
      const totalInterest = (installment * tenure) - principal;
      return { installment: Math.round(installment), totalInterest: Math.round(totalInterest) };
    }
    return { installment: 0, totalInterest: 0 };
  };

  // Save new loan
  const saveNewLoan = () => {
    if (!loanFormData.employee || !loanFormData.type || !loanFormData.principal || !loanFormData.tenure || !loanFormData.reason) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const employee = employees.find(emp => emp.id === loanFormData.employee);
    if (!employee) {
      showToast('Invalid employee selected', 'error');
      return;
    }

    const { installment } = updateLoanCalculation();
    
    const newLoan = {
      id: `LOAN${String(loans.length + 1).padStart(3, '0')}`,
      employeeId: loanFormData.employee,
      employeeName: employee.name,
      type: loanFormData.type,
      principal: parseFloat(loanFormData.principal),
      rate: parseFloat(loanFormData.rate),
      term: parseInt(loanFormData.tenure),
      startCycle: loanFormData.startCycle,
      installment: installment,
      balance: parseFloat(loanFormData.principal),
      status: 'Active'
    };

    // Add to loans array (in real app, this would be an API call)
    loans.push(newLoan);

    setIsDrawerOpen(false);
    showToast('Loan created successfully', 'success');
  };

  // Open Recurring Component Drawer
  const openRecurringComponentDrawer = () => {
    setDrawerContent(<RecurringComponentDrawerContent />);
    setIsDrawerOpen(true);
  };

  // Recurring Component Drawer Content
  const RecurringComponentDrawerContent = () => {
    const [componentData, setComponentData] = useState({
      employee: '',
      head: '',
      amountMode: 'fixed',
      amount: '',
      formula: '',
      startDate: '2025-10-01',
      endDate: '',
      reason: '',
      showOnPayslip: true
    });

    const saveRecurringComponent = () => {
      if (!componentData.employee || !componentData.head || !componentData.startDate || !componentData.reason) {
        showToast('Please fill in all required fields', 'error');
        return;
      }

      if (componentData.amountMode === 'fixed' && !componentData.amount) {
        showToast('Please enter an amount', 'error');
        return;
      }

      if (componentData.amountMode === 'formula' && !componentData.formula) {
        showToast('Please enter a formula', 'error');
        return;
      }

      const employee = employees.find(emp => emp.id === componentData.employee);
      if (!employee) {
        showToast('Invalid employee selected', 'error');
        return;
      }

      const deductionHeads = ['Health Insurance', 'Loan Deduction', 'Uniform Deduction', 'Other Deduction'];
      const type = deductionHeads.includes(componentData.head) ? 'Deduction' : 'Earning';

      const newComponent = {
        id: `RC${String(recurringComponents.length + 1).padStart(3, '0')}`,
        employeeId: componentData.employee,
        employeeName: employee.name,
        head: componentData.head,
        type: type,
        amount: parseFloat(componentData.amount || 0),
        formula: componentData.formula,
        startDate: componentData.startDate,
        endDate: componentData.endDate,
        status: 'Active',
        showOnPayslip: componentData.showOnPayslip
      };

      recurringComponents.push(newComponent);
      setIsDrawerOpen(false);
      showToast('Recurring component added successfully', 'success');
    };

    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#1C3D5A]">Add Recurring Component</h2>
          <button onClick={() => setIsDrawerOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-[#1DA2A9]">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Employee Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee <span className="text-red-500">*</span></label>
              <select 
                value={componentData.employee} 
                onChange={(e) => setComponentData({...componentData, employee: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                required
              >
                <option value="">Select Employee</option>
                {employees.filter(emp => emp.status === 'Active').map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>
                ))}
              </select>
            </div>

            {/* Head Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Head <span className="text-red-500">*</span></label>
              <select 
                value={componentData.head} 
                onChange={(e) => setComponentData({...componentData, head: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                required
              >
                <option value="">Select Head</option>
                <optgroup label="Earnings">
                  <option value="Mobile Allowance">Mobile Allowance</option>
                  <option value="Performance Bonus">Performance Bonus</option>
                  <option value="Car Allowance">Car Allowance</option>
                  <option value="Overtime Pay">Overtime Pay</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Special Allowance">Special Allowance</option>
                </optgroup>
                <optgroup label="Deductions">
                  <option value="Health Insurance">Health Insurance</option>
                  <option value="Loan Deduction">Loan Deduction</option>
                  <option value="Uniform Deduction">Uniform Deduction</option>
                  <option value="Other Deduction">Other Deduction</option>
                </optgroup>
              </select>
            </div>

            {/* Amount Mode */}
            <div>
              <div className="flex items-center space-x-4 mb-3">
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="amount-mode" 
                    value="fixed" 
                    checked={componentData.amountMode === 'fixed'}
                    onChange={(e) => setComponentData({...componentData, amountMode: e.target.value})}
                    className="text-[#1DA2A9] focus:ring-[#1DA2A9]"
                  />
                  <span className="ml-2 text-sm text-gray-700">Fixed Amount</span>
                </label>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="amount-mode" 
                    value="formula" 
                    checked={componentData.amountMode === 'formula'}
                    onChange={(e) => setComponentData({...componentData, amountMode: e.target.value})}
                    className="text-[#1DA2A9] focus:ring-[#1DA2A9]"
                  />
                  <span className="ml-2 text-sm text-gray-700">Formula</span>
                </label>
              </div>

              {componentData.amountMode === 'fixed' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">AED</span>
                    <input 
                      type="number" 
                      value={componentData.amount}
                      onChange={(e) => setComponentData({...componentData, amount: e.target.value})}
                      className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                      required 
                      min="0" 
                      step="10"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Formula <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={componentData.formula}
                    onChange={(e) => setComponentData({...componentData, formula: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                    placeholder="e.g., Base * 0.1, Hours * 25"
                  />
                  <p className="mt-1 text-xs text-gray-500">Use Base for base salary, Hours for variable hours</p>
                </div>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date <span className="text-red-500">*</span></label>
                <input 
                  type="date" 
                  value={componentData.startDate}
                  onChange={(e) => setComponentData({...componentData, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input 
                  type="date" 
                  value={componentData.endDate}
                  onChange={(e) => setComponentData({...componentData, endDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">Leave empty for ongoing</p>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason <span className="text-red-500">*</span></label>
              <select 
                value={componentData.reason}
                onChange={(e) => setComponentData({...componentData, reason: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                required
              >
                <option value="">Select Reason</option>
                <option value="Policy">Policy</option>
                <option value="Correction">Correction</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Show on Payslip */}
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="show-on-payslip"
                checked={componentData.showOnPayslip}
                onChange={(e) => setComponentData({...componentData, showOnPayslip: e.target.checked})}
                className="rounded border-gray-300 text-[#1DA2A9] focus:ring-[#1DA2A9]"
              />
              <label htmlFor="show-on-payslip" className="ml-2 text-sm text-gray-700">Show on Payslip</label>
            </div>

            {/* Net Impact Warning */}
            {['Health Insurance', 'Loan Deduction', 'Uniform Deduction', 'Other Deduction'].includes(componentData.head) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Net Impact Warning</p>
                    <p className="text-sm text-yellow-700">This deduction may result in negative net salary</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex space-x-3">
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-[#1DA2A9]"
            >
              Cancel
            </button>
            <button 
              onClick={saveRecurringComponent}
              className="flex-1 px-4 py-2 bg-[#FF6B35] text-white rounded-lg font-medium hover:bg-orange-600 transition-colors focus:ring-2 focus:ring-[#1DA2A9]"
            >
              Add Component
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Loan Drawer Content Component
  const LoanDrawerContent = () => {
    const { installment, totalInterest } = updateLoanCalculation();
    
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#1C3D5A]">Add New Loan/Advance</h2>
          <button onClick={() => setIsDrawerOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-[#1DA2A9]">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Employee Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee <span className="text-red-500">*</span></label>
              <select 
                value={loanFormData.employee} 
                onChange={(e) => setLoanFormData({...loanFormData, employee: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                required
              >
                <option value="">Select Employee</option>
                {employees.filter(emp => emp.status === 'Active').map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>
                ))}
              </select>
            </div>

            {/* Type and Currency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type <span className="text-red-500">*</span></label>
                <select 
                  value={loanFormData.type} 
                  onChange={(e) => setLoanFormData({...loanFormData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Advance">Advance</option>
                  <option value="Loan">Loan</option>
                  <option value="Travel">Travel</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" disabled>
                  <option value="AED">AED</option>
                </select>
              </div>
            </div>

            {/* Principal Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Principal Amount <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">AED</span>
                <input 
                  type="number" 
                  value={loanFormData.principal}
                  onChange={(e) => setLoanFormData({...loanFormData, principal: e.target.value})}
                  className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                  required 
                  min="1" 
                  step="100"
                />
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (%)
                <span className="text-xs text-gray-500 ml-1" title="0% allowed for advances">(?)</span>
              </label>
              <input 
                type="number" 
                value={loanFormData.rate}
                onChange={(e) => setLoanFormData({...loanFormData, rate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                min="0" 
                max="25" 
                step="0.1"
              />
            </div>

            {/* Tenure Mode Selection */}
            <div>
              <div className="flex items-center space-x-4 mb-3">
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="tenure-mode" 
                    value="months" 
                    checked={loanFormData.tenureMode === 'months'}
                    onChange={(e) => setLoanFormData({...loanFormData, tenureMode: e.target.value})}
                    className="text-[#1DA2A9] focus:ring-[#1DA2A9]"
                  />
                  <span className="ml-2 text-sm text-gray-700">By Tenure</span>
                </label>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="tenure-mode" 
                    value="installment" 
                    checked={loanFormData.tenureMode === 'installment'}
                    onChange={(e) => setLoanFormData({...loanFormData, tenureMode: e.target.value})}
                    className="text-[#1DA2A9] focus:ring-[#1DA2A9]"
                  />
                  <span className="ml-2 text-sm text-gray-700">By Installment</span>
                </label>
              </div>

              {loanFormData.tenureMode === 'months' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tenure (Months) <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    value={loanFormData.tenure}
                    onChange={(e) => setLoanFormData({...loanFormData, tenure: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                    required 
                    min="1" 
                    max="60"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Installment <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">AED</span>
                    <input 
                      type="number" 
                      value={loanFormData.installment}
                      onChange={(e) => setLoanFormData({...loanFormData, installment: e.target.value})}
                      className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                      min="1" 
                      step="10"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Start Cycle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Cycle <span className="text-red-500">*</span></label>
              <input 
                type="date" 
                value={loanFormData.startCycle}
                onChange={(e) => setLoanFormData({...loanFormData, startCycle: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                required
              />
            </div>

            {/* Recovery Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recovery Day</label>
              <select 
                value={loanFormData.recoveryDay}
                onChange={(e) => setLoanFormData({...loanFormData, recoveryDay: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
              >
                <option value="on-cycle">On Cycle</option>
                <option value="mid-cycle">Mid Cycle</option>
              </select>
            </div>

            {/* Cap Rule */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cap Rule
                <span className="text-xs text-gray-500 ml-1" title="Maximum deduction as % of Gross">(?)</span>
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Max</span>
                <input 
                  type="number" 
                  value={loanFormData.capPercentage}
                  onChange={(e) => setLoanFormData({...loanFormData, capPercentage: e.target.value})}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent text-center"
                  min="1" 
                  max="100"
                />
                <span className="text-sm text-gray-500">% of Gross</span>
              </div>
            </div>

            {/* Skip Negative Net */}
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="skip-negative-net"
                checked={loanFormData.skipNegativeNet}
                onChange={(e) => setLoanFormData({...loanFormData, skipNegativeNet: e.target.checked})}
                className="rounded border-gray-300 text-[#1DA2A9] focus:ring-[#1DA2A9]"
              />
              <label htmlFor="skip-negative-net" className="ml-2 text-sm text-gray-700">Skip cycle if Net &lt; 0</label>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason <span className="text-red-500">*</span></label>
              <textarea 
                value={loanFormData.reason}
                onChange={(e) => setLoanFormData({...loanFormData, reason: e.target.value})}
                rows="3" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                placeholder="Reason for loan/advance request" 
                required
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
              <textarea 
                value={loanFormData.notes}
                onChange={(e) => setLoanFormData({...loanFormData, notes: e.target.value})}
                rows="2" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                placeholder="Optional notes"
              />
            </div>

            {/* Calculation Preview */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Loan Preview</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Monthly Installment:</p>
                  <p className="font-semibold text-gray-900">AED {installment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Interest:</p>
                  <p className="font-semibold text-gray-900">AED {totalInterest.toLocaleString()}</p>
                </div>
              </div>
              {installment > 5000 && (
                <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded text-xs text-red-700">
                  Installment exceeds cap rule
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex space-x-3">
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-[#1DA2A9]"
            >
              Cancel
            </button>
            <button 
              onClick={() => showToast('Loan schedule generated successfully', 'success')}
              className="px-4 py-2 bg-[#1DA2A9] text-white rounded-lg font-medium hover:bg-[#167d83] transition-colors focus:ring-2 focus:ring-[#1DA2A9]"
            >
              Generate Schedule
            </button>
            <button 
              onClick={saveNewLoan}
              className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg font-medium hover:bg-orange-600 transition-colors focus:ring-2 focus:ring-[#1DA2A9]"
            >
              Create Loan
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Tab Switching
  const switchTab = (tabId) => {
    setCurrentTab(tabId);
  };

  // Employee Mapping Tab Component
  const EmployeeMappingTab = () => (
    <div className="p-6">
      <div className="overflow-x-auto">
        {/* Desktop Table */}
        <table className="hidden md:table w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Employee</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Department</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Location</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Pay Group</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Structure</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Currency</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">WPS Ready</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#ccfbfe] rounded-full flex items-center justify-center mr-3">
                      <span className="text-[#167d83] font-medium text-xs">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                      <div className="text-xs text-gray-500">{emp.id}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm">{emp.department}</td>
                <td className="py-3 px-4 text-sm">{emp.location}</td>
                <td className="py-3 px-4 text-sm">
                  {emp.payGroup ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {payGroups.find(pg => pg.id === emp.payGroup)?.name}
                    </span>
                  ) : (
                    <span className="text-gray-400">Not Mapped</span>
                  )}
                </td>
                <td className="py-3 px-4 text-sm">
                  {emp.structure ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {salaryStructures.find(st => st.id === emp.structure)?.name}
                    </span>
                  ) : (
                    <span className="text-gray-400">Not Assigned</span>
                  )}
                </td>
                <td className="py-3 px-4 text-sm font-medium">{emp.currency}</td>
                <td className="py-3 px-4 text-sm">
                  {emp.wpsReady ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      Ready
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                      Issues
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    emp.status === 'Active' ? 'bg-green-100 text-green-800' :
                    emp.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>{emp.status}</span>
                </td>
                <td className="py-3 px-4 text-sm">
                  <button onClick={() => showToast(`Mapping ${emp.name}`, 'info')} className="text-[#1DA2A9] hover:text-[#167d83] font-medium mr-2">
                    Map/Change
                  </button>
                  <button onClick={() => showToast(`Viewing ${emp.name}`, 'info')} className="text-gray-500 hover:text-gray-700 font-medium">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {employees.map(emp => (
            <div key={emp.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#ccfbfe] rounded-full flex items-center justify-center mr-3">
                    <span className="text-[#167d83] font-medium text-sm">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                    <div className="text-xs text-gray-500">{emp.id}</div>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  emp.status === 'Active' ? 'bg-green-100 text-green-800' :
                  emp.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>{emp.status}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Department:</span>
                  <span className="font-medium">{emp.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-medium">{emp.location}</span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button onClick={() => showToast(`Mapping ${emp.name}`, 'info')} className="flex-1 px-3 py-2 bg-[#1DA2A9] text-white rounded-lg text-sm font-medium hover:bg-[#167d83]">
                  Map/Change
                </button>
                <button onClick={() => showToast(`Viewing ${emp.name}`, 'info')} className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">{employees.length}</span> results
        </p>
        <div className="flex items-center space-x-1">
          <button className="px-3 py-2 text-sm font-medium text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50" disabled>Previous</button>
          <button className="px-3 py-2 text-sm font-medium bg-[#1DA2A9] text-white border border-[#1DA2A9] rounded-lg">1</button>
          <button className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
          <button className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );

  // Salary Assignment Tab
  const SalaryAssignmentTab = () => (
    <div className="p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Employee</label>
        <select 
          value={selectedEmployee} 
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
        >
          <option value="">Choose an employee...</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>
          ))}
        </select>
      </div>

      {selectedEmployee ? (
        <div>
          {/* Current Assignment */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#1C3D5A] mb-4">Current Assignment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Base Salary</p>
                <p className="text-xl font-semibold text-gray-900">AED {employees.find(e => e.id === selectedEmployee)?.baseSalary.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Allowances</p>
                <p className="text-xl font-semibold text-gray-900">AED {employees.find(e => e.id === selectedEmployee)?.allowances.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Deductions</p>
                <p className="text-xl font-semibold text-gray-900">AED {employees.find(e => e.id === selectedEmployee)?.deductions.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Pay Cycle</p>
                <p className="text-xl font-semibold text-gray-900">Monthly</p>
              </div>
            </div>
          </div>

          <button onClick={() => showToast('Create new assignment', 'info')} className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg font-medium hover:bg-orange-600">
            Create New Assignment
          </button>
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No employee selected</h3>
          <p className="mt-1 text-sm text-gray-500">Select an employee to view and manage their salary assignment.</p>
        </div>
      )}
    </div>
  );

  // Recurring Components Tab
  const RecurringComponentsTab = () => (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
                <input type="checkbox" className="rounded border-gray-300 text-[#1DA2A9] focus:ring-[#1DA2A9]" />
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Employee</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Head</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Type</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Amount/Formula</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Start Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recurringComponents.map(comp => (
              <tr key={comp.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <input type="checkbox" className="rounded border-gray-300 text-[#1DA2A9] focus:ring-[#1DA2A9]" />
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm font-medium text-gray-900">{comp.employeeName}</div>
                  <div className="text-xs text-gray-500">{comp.employeeId}</div>
                </td>
                <td className="py-3 px-4 text-sm font-medium">{comp.head}</td>
                <td className="py-3 px-4 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    comp.type === 'Earning' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>{comp.type}</span>
                </td>
                <td className="py-3 px-4 text-sm font-medium">
                  {comp.amount > 0 ? `AED ${comp.amount.toLocaleString()}` : comp.formula}
                </td>
                <td className="py-3 px-4 text-sm">{comp.startDate}</td>
                <td className="py-3 px-4 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    comp.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>{comp.status}</span>
                </td>
                <td className="py-3 px-4 text-sm">
                  <button onClick={() => showToast(`Editing ${comp.head}`, 'info')} className="text-[#1DA2A9] hover:text-[#167d83] font-medium mr-2">Edit</button>
                  <button onClick={() => showToast(`Stopping ${comp.head}`, 'warning')} className="text-red-600 hover:text-red-700 font-medium">Stop</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Loans & Advances Tab
  const LoansTab = () => (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Employee</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Loan Type</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Principal</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Rate %</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Installment</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Balance</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(loan => (
              <tr key={loan.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="text-sm font-medium text-gray-900">{loan.employeeName}</div>
                  <div className="text-xs text-gray-500">{loan.employeeId}</div>
                </td>
                <td className="py-3 px-4 text-sm font-medium">{loan.type}</td>
                <td className="py-3 px-4 text-sm font-medium">AED {loan.principal.toLocaleString()}</td>
                <td className="py-3 px-4 text-sm">{loan.rate}%</td>
                <td className="py-3 px-4 text-sm font-medium">AED {loan.installment.toLocaleString()}</td>
                <td className="py-3 px-4 text-sm font-medium">AED {loan.balance.toLocaleString()}</td>
                <td className="py-3 px-4 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    loan.status === 'Active' ? 'bg-green-100 text-green-800' :
                    loan.status === 'Paid' ? 'bg-blue-100 text-blue-800' :
                    loan.status === 'Delinquent' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>{loan.status}</span>
                </td>
                <td className="py-3 px-4 text-sm">
                  <button onClick={() => showToast(`Viewing loan ${loan.id}`, 'info')} className="text-[#1DA2A9] hover:text-[#167d83] font-medium">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Statements & Pay History Tab
  const StatementsTab = () => (
    <div className="p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Employee</label>
        <select 
          value={selectedStatementsEmployee} 
          onChange={(e) => setSelectedStatementsEmployee(e.target.value)}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
        >
          <option value="">Choose an employee...</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>
          ))}
        </select>
      </div>

      {selectedStatementsEmployee ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Period</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Gross</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Net</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Payslip</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3, 4, 5].map(i => {
                const emp = employees.find(e => e.id === selectedStatementsEmployee);
                const gross = emp ? emp.baseSalary + emp.allowances : 0;
                const net = emp ? gross - emp.deductions : 0;
                const date = new Date();
                date.setMonth(date.getMonth() - i);
                return (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{date.toISOString().slice(0, 7)}</td>
                    <td className="py-3 px-4 text-sm font-medium">AED {gross.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm font-medium">AED {net.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm">
                      <button className="text-[#1DA2A9] hover:text-[#167d83] font-medium">Preview</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No employee selected</h3>
          <p className="mt-1 text-sm text-gray-500">Select an employee to view their pay statements and history.</p>
        </div>
      )}
    </div>
  );

  // Approvals & Audit Tab
  const ApprovalsAuditTab = () => (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-[#1C3D5A] mb-4">Pending Approvals</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              <div>
                <p className="text-sm font-medium text-yellow-800">High-value loan approval required</p>
                <p className="text-sm text-yellow-700">Ahmed Hassan - AED 50,000 loan request</p>
              </div>
            </div>
            <div className="space-x-2">
              <button onClick={() => showToast('Approved', 'success')} className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">Approve</button>
              <button onClick={() => showToast('Rejected', 'error')} className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">Reject</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#1C3D5A] mb-4">Audit Trail</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Timestamp</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Actor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Change</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Source</th>
              </tr>
            </thead>
            <tbody>
              {auditEntries.map((entry, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{entry.timestamp}</td>
                  <td className="py-3 px-4 text-sm font-medium">{entry.actor}</td>
                  <td className="py-3 px-4 text-sm">{entry.change}</td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      entry.source === 'UI' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>{entry.source}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
    <Sidebar />

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-[64px]' : 'lg:ml-[230px]'}`}>
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              

             

              <div>
                <h1 className="text-xl lg:text-2xl font-semibold text-[#1C3D5A]">Employee Payroll Master</h1>
                <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                  <span>Home</span>
                  <span>/</span>
                  <span>Payroll</span>
                  <span>/</span>
                  <span className="text-gray-900 font-medium">Employee Payroll Master</span>
                </nav>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-gray-900">Sarah Johnson</div>
                <div className="text-xs text-gray-500">HR Manager</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">SJ</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {/* Action Bar */}
          <div className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  95% Mapped
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                  2 Out-of-band
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#ccfbfe] text-[#167d83]">
                  5 Active Loans
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  1 Delinquent
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button onClick={() => showToast('Map to Pay Group', 'info')} className="px-4 py-2 bg-[#1DA2A9] text-white rounded-lg font-medium hover:bg-[#167d83] text-sm">
                  Map to Pay Group
                </button>
                <button onClick={() => showToast('Assign Structure', 'info')} className="px-4 py-2 bg-[#1DA2A9] text-white rounded-lg font-medium hover:bg-[#167d83] text-sm">
                  Assign Structure
                </button>
                <button onClick={() => openRecurringComponentDrawer()} className="px-4 py-2 bg-[#1DA2A9] text-white rounded-lg font-medium hover:bg-[#167d83] text-sm">
                  Add Recurring Component
                </button>
                <button onClick={() => openLoanDrawer()} className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg font-medium hover:bg-orange-600 text-sm">
                  Add Loan/Advance
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setShowExportDropdown(!showExportDropdown)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 text-sm"
                  >
                    Export
                    <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  {showExportDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        <button onClick={() => {showToast('Exporting as CSV', 'success'); setShowExportDropdown(false);}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Export as CSV</button>
                        <button onClick={() => {showToast('Exporting as PDF', 'success'); setShowExportDropdown(false);}} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Export as PDF</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent text-sm">
                  <option value="">All Departments</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="hr">HR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent text-sm">
                  <option value="">All Locations</option>
                  <option value="dubai">Dubai</option>
                  <option value="abu-dhabi">Abu Dhabi</option>
                  <option value="sharjah">Sharjah</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pay Group</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent text-sm">
                  <option value="">All Pay Groups</option>
                  <option value="monthly-ae">Monthly AE</option>
                  <option value="weekly-ae">Weekly AE</option>
                  <option value="monthly-usd">Monthly USD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Structure</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent text-sm">
                  <option value="">All Structures</option>
                  <option value="standard-ae">Standard AE</option>
                  <option value="executive-ae">Executive AE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent text-sm">
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="exit">Exit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input type="text" placeholder="Employee name or ID" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent text-sm" />
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => showToast('Filters applied', 'success')} className="px-4 py-2 bg-[#1DA2A9] text-white rounded-lg font-medium hover:bg-[#167d83] text-sm">
                Apply Filters
              </button>
              <button onClick={() => showToast('Filters reset', 'info')} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 text-sm">
                Reset
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200 bg-white rounded-t-2xl">
              <nav className="flex space-x-0 overflow-x-auto">
                {[
                  { id: 'employee-mapping', label: 'Employee Mapping' },
                  { id: 'salary-assignment', label: 'Salary Assignment' },
                  { id: 'recurring-components', label: 'Recurring Components' },
                  { id: 'loans-advances', label: 'Loans & Advances' },
                  { id: 'statements-history', label: 'Statements & Pay History' },
                  { id: 'approvals-audit', label: 'Approvals & Audit' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => switchTab(tab.id)}
                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                      currentTab === tab.id
                        ? 'border-[#1DA2A9] text-[#1DA2A9]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-b-2xl rounded-t-none shadow-sm border border-gray-100">
            {currentTab === 'employee-mapping' && <EmployeeMappingTab />}
            {currentTab === 'salary-assignment' && <SalaryAssignmentTab />}
            {currentTab === 'recurring-components' && <RecurringComponentsTab />}
            {currentTab === 'loans-advances' && <LoansTab />}
            {currentTab === 'statements-history' && <StatementsTab />}
            {currentTab === 'approvals-audit' && <ApprovalsAuditTab />}
          </div>
        </div>
      </main>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-35 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Right Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 overflow-y-auto transition-transform duration-300 ${
        isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {drawerContent}
      </div>

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => {
          const bgColor = {
            'success': 'bg-green-100 border-green-200 text-green-800',
            'error': 'bg-red-100 border-red-200 text-red-800',
            'warning': 'bg-yellow-100 border-yellow-200 text-yellow-800',
            'info': 'bg-blue-100 border-blue-200 text-blue-800'
          }[toast.type];

          const icon = {
            'success': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>,
            'error': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>,
            'warning': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>,
            'info': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          }[toast.type];

          return (
            <div
              key={toast.id}
              className={`flex items-center p-4 rounded-lg border shadow-sm ${bgColor} animate-in slide-in-from-right`}
            >
              <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {icon}
              </svg>
              <span className="text-sm font-medium">{toast.message}</span>
              <button 
                onClick={() => removeToast(toast.id)}
                className="ml-4 hover:opacity-70"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PayrollEmploye;