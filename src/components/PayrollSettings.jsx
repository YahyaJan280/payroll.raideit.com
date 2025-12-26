import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from "./Sidebar"
const PayrollSettings = () => {
  // State management
  const [activeTab, setActiveTab] = useState('pay-calendar');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [drawerState, setDrawerState] = useState({ isOpen: false, type: null, data: null });

  // Sample data
  const [sampleData] = useState({
    payPeriods: [
      { period: 'March 2025', cutoff: '2025-03-25', approvals: '2025-03-28', disburse: '2025-03-31', status: 'Active' },
      { period: 'April 2025', cutoff: '2025-04-25', approvals: '2025-04-28', disburse: '2025-04-30', status: 'Planned' },
      { period: 'May 2025', cutoff: '2025-05-25', approvals: '2025-05-28', disburse: '2025-05-31', status: 'Planned' }
    ],
    salaryHeads: [
      { name: 'Basic Salary', code: 'BASIC', type: 'Earning', calc: 'Fixed', glCode: '5100', payslip: true, status: 'Active' },
      { name: 'Housing Allowance', code: 'HOUSE', type: 'Earning', calc: '30% of Basic', glCode: '5110', payslip: true, status: 'Active' },
      { name: 'Transport Allowance', code: 'TRANS', type: 'Earning', calc: 'Fixed', glCode: '5120', payslip: true, status: 'Active' },
      { name: 'Medical Insurance', code: 'MED', type: 'Deduction', calc: 'Fixed', glCode: '2200', payslip: true, status: 'Active' },
      { name: 'Other Allowance', code: 'OTHER', type: 'Earning', calc: 'Fixed', glCode: '5130', payslip: false, status: 'Draft' }
    ],
    payGroups: [
      { name: 'Engineering Team', structure: 'Senior Engineer', calendar: 'Monthly', eligibility: 'Engineering Dept', employees: 24, status: 'Active' },
      { name: 'Marketing Team', structure: 'Marketing Specialist', calendar: 'Monthly', eligibility: 'Marketing Dept', employees: 12, status: 'Active' }
    ],
    gradeRanges: [
      { grade: 'L1 - Junior', min: 8000, mid: 10000, max: 12000, currency: 'AED', updated: '2025-01-15' },
      { grade: 'L2 - Mid-level', min: 12000, mid: 15000, max: 18000, currency: 'AED', updated: '2025-01-15' },
      { grade: 'L3 - Senior', min: 18000, mid: 22000, max: 26000, currency: 'AED', updated: '2025-01-15' }
    ],
    structureVersions: [
      { version: 'v1.2', effective: '2025-03-01', author: 'Sarah Johnson', changes: 'Added medical allowance', status: 'Current' },
      { version: 'v1.1', effective: '2025-01-01', author: 'John Smith', changes: 'Updated transport allowance', status: 'Previous' }
    ]
  });

  const [structureComponents, setStructureComponents] = useState([
    { head: 'Basic Salary', amount: 15000, type: 'fixed' },
    { head: 'Housing Allowance', amount: 30, type: 'percent' },
    { head: 'Transport Allowance', amount: 800, type: 'fixed' }
  ]);

  const [structureCurrency, setStructureCurrency] = useState('AED');
  const [totals, setTotals] = useState({ gross: 0, deductions: 0, net: 0, annual: 0 });

  // Utility functions
  const formatCurrency = (amount, currency = 'AED') => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('AED', 'AED');
  };

  const showToast = (message, type = 'success') => {
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  // Sidebar functions
  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Drawer functions
  const openDrawer = (type, data = null) => {
    setDrawerState({ isOpen: true, type, data });
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    setDrawerState({ isOpen: false, type: null, data: null });
    document.body.style.overflow = '';
  };

  // Structure component functions
  const updateComponent = (index, field, value) => {
    const newComponents = [...structureComponents];
    if (newComponents[index]) {
      newComponents[index][field] = field === 'amount' ? parseFloat(value) || 0 : value;
      setStructureComponents(newComponents);
    }
  };

  const removeComponent = (index) => {
    const newComponents = structureComponents.filter((_, i) => i !== index);
    setStructureComponents(newComponents);
  };

  const addComponent = () => {
    setStructureComponents([...structureComponents, {
      head: sampleData.salaryHeads[0].name,
      amount: 0,
      type: 'fixed'
    }]);
  };

  // Calculate structure totals
  useEffect(() => {
    let gross = 0;
    let deductions = 0;

    structureComponents.forEach(component => {
      const amount = parseFloat(component.amount) || 0;
      
      if (component.type === 'percent') {
        const baseComponent = structureComponents.find(c => c.head === 'Basic Salary');
        const baseAmount = baseComponent ? parseFloat(baseComponent.amount) || 0 : 0;
        const calculatedAmount = (baseAmount * amount) / 100;
        
        if (sampleData.salaryHeads.find(h => h.name === component.head)?.type === 'Deduction') {
          deductions += calculatedAmount;
        } else {
          gross += calculatedAmount;
        }
      } else {
        if (sampleData.salaryHeads.find(h => h.name === component.head)?.type === 'Deduction') {
          deductions += amount;
        } else {
          gross += amount;
        }
      }
    });

    const net = gross - deductions;
    const annual = net * 12;

    setTotals({ gross, deductions, net, annual });
  }, [structureComponents, sampleData.salaryHeads]);

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (drawerState.isOpen) {
          closeDrawer();
        } else if (isMobileMenuOpen) {
          closeMobileMenu();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [drawerState.isOpen, isMobileMenuOpen]);

  // Window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile Overlay */}
     <Sidebar />
     

      {/* Right Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          drawerState.isOpen ? 'opacity-60' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
      />

      {/* Right Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl z-50 overflow-y-auto transition-transform duration-300 ${
        drawerState.isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <DrawerContent 
          drawerState={drawerState} 
          closeDrawer={closeDrawer} 
          sampleData={sampleData}
          showToast={showToast}
        />
      </div>

      {/* Main Content */}
      <main className={`min-h-screen bg-gray-50 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-18' : 'lg:ml-58'
      }`}>
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
             

              <div>
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Settings & Salary Structures</h1>
                <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                  <a href="#" className="hover:text-teal-600">Home</a>
                  <span>/</span>
                  <a href="#" className="hover:text-teal-600">Payroll</a>
                  <span>/</span>
                  <span className="text-gray-900 font-medium">Settings & Salary Structures</span>
                </nav>
              </div>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">Sarah Johnson</div>
                  <div className="text-xs text-gray-500">HR Manager</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">SJ</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Action Bar */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-[73px] z-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => openDrawer('salary-head')}
                className="bg-teal-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-teal-700 transition-colors text-sm flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span>Add Salary Head</span>
              </button>
              <button 
                onClick={() => showToast('Structure creation initiated')}
                className="bg-orange-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-orange-600 transition-colors text-sm flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
                <span>Create Structure</span>
              </button>
              <button 
                onClick={() => openDrawer('pay-group')}
                className="bg-blue-900 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-950 transition-colors text-sm flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <span>New Pay Group</span>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => showToast('Settings saved successfully')}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                Save
              </button>
              <button 
                onClick={() => showToast('Export initiated')}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6">
          <nav className="flex space-x-8 overflow-x-auto">
            {['pay-calendar', 'salary-heads', 'salary-structures', 'pay-groups', 'grade-ranges', 'policies', 'compliance'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace('Pay', 'Pay ').replace('Salary', 'Salary ').replace('Grade', 'Grade/Band ')}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Contents */}
        <div className="p-4 lg:p-6">
          {activeTab === 'pay-calendar' && (
            <PayCalendarTab sampleData={sampleData} openDrawer={openDrawer} />
          )}
          {activeTab === 'salary-heads' && (
            <SalaryHeadsTab sampleData={sampleData} openDrawer={openDrawer} formatCurrency={formatCurrency} />
          )}
          {activeTab === 'salary-structures' && (
            <SalaryStructuresTab 
              sampleData={sampleData}
              structureComponents={structureComponents}
              updateComponent={updateComponent}
              removeComponent={removeComponent}
              addComponent={addComponent}
              structureCurrency={structureCurrency}
              setStructureCurrency={setStructureCurrency}
              totals={totals}
              formatCurrency={formatCurrency}
              showToast={showToast}
            />
          )}
          {activeTab === 'pay-groups' && (
            <PayGroupsTab sampleData={sampleData} openDrawer={openDrawer} />
          )}
          {activeTab === 'grade-ranges' && (
            <GradeRangesTab sampleData={sampleData} openDrawer={openDrawer} formatCurrency={formatCurrency} />
          )}
          {activeTab === 'policies' && (
            <PoliciesTab formatCurrency={formatCurrency} />
          )}
          {activeTab === 'compliance' && (
            <ComplianceTab />
          )}
        </div>
      </main>
    </div>
  );
};

// Drawer Content Component
const DrawerContent = ({ drawerState, closeDrawer, sampleData, showToast }) => {
  if (!drawerState.isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(`${drawerState.type} saved successfully`);
    closeDrawer();
  };

  const { type, data } = drawerState;


  if (type === "salary-head") {
    const isEdit = data && data.name;
    return (
      <>
        <div className="flex items-center bg-white justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-heading font-semibold text-[#1C3D5A]">
            {isEdit ? "Edit" : "Add"} Salary Head
          </h3>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2"
            aria-label="Close"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="head-name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name *
              </label>
              <input
                type="text"
                id="head-name"
                defaultValue={data?.name || ""}
                placeholder="e.g. Overtime Allowance"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label
                htmlFor="head-code"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Code *
              </label>
              <input
                type="text"
                id="head-code"
                defaultValue={data?.code || ""}
                placeholder="e.g. OT"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label
                htmlFor="head-type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Type *
              </label>
              <select
                id="head-type"
                defaultValue={data?.type || ""}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                required
              >
                <option value="">Select Type</option>
                <option value="Earning">Earning</option>
                <option value="Deduction">Deduction</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="head-calc"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Default Calculation
              </label>
              <select
                id="head-calc"
                defaultValue={data?.calc || "Fixed"}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
              >
                <option value="Fixed">Fixed Amount</option>
                <option value="Percent">Percentage of Base</option>
                <option value="Formula">Custom Formula</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="head-gl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                GL Code
              </label>
              <input
                type="text"
                id="head-gl"
                defaultValue={data?.glCode || ""}
                placeholder="e.g. 5140"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="head-payslip"
                defaultChecked={data?.payslip}
                className="h-4 w-4 text-[#1DA2A9] focus:ring-[#1DA2A9] border-gray-300 rounded"
              />
              <label
                htmlFor="head-payslip"
                className="ml-2 text-sm text-gray-700"
              >
                Show on payslip
              </label>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#1DA2A9] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#167d83] transition-colors focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2"
                >
                  {isEdit ? "Update" : "Create"} Head
                </button>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }

  if (type === "pay-group") {
    const isEdit = data && data.name;
    return (
      <>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-heading font-semibold text-[#1C3D5A]">
            {isEdit ? "Edit" : "Create"} Pay Group
          </h3>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2"
            aria-label="Close"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="group-name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Group Name *
              </label>
              <input
                type="text"
                id="group-name"
                defaultValue={data?.name || ""}
                placeholder="e.g. Sales Team"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label
                htmlFor="group-calendar"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Pay Calendar *
              </label>
              <select
                id="group-calendar"
                defaultValue={data?.calendar || ""}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                required
              >
                <option value="">Select Calendar</option>
                <option value="Monthly">Monthly</option>
                <option value="4-Weekly">4-Weekly</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="group-structure"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Salary Structure *
              </label>
              <select
                id="group-structure"
                defaultValue={data?.structure || ""}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                required
              >
                <option value="">Select Structure</option>
                <option value="Senior Engineer">Senior Engineer</option>
                <option value="Marketing Specialist">
                  Marketing Specialist
                </option>
              </select>
            </div>
            <div>
              <label
                htmlFor="group-eligibility"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Eligibility Rules
              </label>
              <textarea
                id="group-eligibility"
                rows="3"
                defaultValue={data?.eligibility || ""}
                placeholder="e.g. Engineering Dept, Grade L2+"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
              ></textarea>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#1DA2A9] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#167d83] transition-colors focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2"
                >
                  {isEdit ? "Update" : "Create"} Group
                </button>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }

  if (type === "grade-range") {
    const isEdit = data && data.grade;
    return (
      <>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-heading font-semibold text-[#1C3D5A]">
            {isEdit ? "Edit" : "Add"} Grade Range
          </h3>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2"
            aria-label="Close"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="grade-name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Grade *
              </label>
              <input
                type="text"
                id="grade-name"
                defaultValue={data?.grade || ""}
                placeholder="e.g. L4 - Principal"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label
                htmlFor="grade-currency"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Currency
              </label>
              <select
                id="grade-currency"
                defaultValue={data?.currency || "AED"}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
              >
                <option value="AED">AED</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="grade-min"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Minimum *
                </label>
                <input
                  type="number"
                  id="grade-min"
                  defaultValue={data?.min || ""}
                  placeholder="20000"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="grade-mid"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Midpoint *
                </label>
                <input
                  type="number"
                  id="grade-mid"
                  defaultValue={data?.mid || ""}
                  placeholder="25000"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="grade-max"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Maximum *
                </label>
                <input
                  type="number"
                  id="grade-max"
                  defaultValue={data?.max || ""}
                  placeholder="30000"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="grade-threshold"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Out-of-band Threshold (%)
              </label>
              <input
                type="number"
                id="grade-threshold"
                defaultValue="10"
                min="0"
                max="50"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
              />
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#1DA2A9] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#167d83] transition-colors focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2"
                >
                  {isEdit ? "Update" : "Add"} Range
                </button>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }

  if (type === "pay-period") {
    return (
      <>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-heading font-semibold text-[#1C3D5A]">
            Add Pay Period
          </h3>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2"
            aria-label="Close"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="period-name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Period Name *
              </label>
              <input
                type="text"
                id="period-name"
                placeholder="e.g. June 2025"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label
                htmlFor="period-cutoff"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cut-off Date *
              </label>
              <input
                type="date"
                id="period-cutoff"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label
                htmlFor="period-approval"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Approval Deadline *
              </label>
              <input
                type="date"
                id="period-approval"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label
                htmlFor="period-disburse"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Disbursement Date *
              </label>
              <input
                type="date"
                id="period-disburse"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                required
              />
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#1DA2A9] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#167d83] transition-colors focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2"
                >
                  Add Period
                </button>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }

  if (type === "assign-employees") {
    return (
      <>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-heading font-semibold text-[#1C3D5A]">
            Assign Employees to {data.groupName}
          </h3>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2"
            aria-label="Close"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <input
              type="search"
              placeholder="Search employees..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
            />
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
            {[
              "Ahmed Al-Rashid - Software Engineer",
              "Sarah Johnson - Marketing Manager",
              "Mohammed Hassan - Product Designer",
              "Emily Chen - Data Analyst",
              "Omar Khalil - DevOps Engineer",
            ].map((emp, idx) => (
              <label
                key={idx}
                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#1DA2A9] focus:ring-[#1DA2A9] border-gray-300 rounded"
                />
                <span className="ml-3 text-sm text-gray-900">{emp}</span>
              </label>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-200 mt-6">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-[#1DA2A9] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#167d83] transition-colors focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2"
              >
                Assign Selected
              </button>
              <button
                type="button"
                onClick={closeDrawer}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

// Tab Components
const PayCalendarTab = ({ sampleData, openDrawer }) => (
  <div className="opacity-100 translate-y-0 transition-all duration-200">
    <div className="bg-white rounded-2xl  shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
        Pay Calendar Configuration
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <label
            htmlFor="company-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Company
          </label>
          <select
            id="company-select"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
          >
            <option value="main">raideTalent Technologies LLC</option>
            <option value="subsidiary">raideTalent Consulting FZ-LLC</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="pay-cycle-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Pay Cycle
          </label>
          <select
            id="pay-cycle-select"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
          >
            <option value="monthly">Monthly</option>
            <option value="4-weekly">4-Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="holiday-calendar"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Holiday Calendar
          </label>
          <select
            id="holiday-calendar"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
          >
            <option value="uae">UAE National Holidays</option>
            <option value="custom">Custom Calendar</option>
          </select>
        </div>
      </div>
      <button
        onClick={() => openDrawer("pay-period")}
        className="bg-[#1DA2A9] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#167d83] transition-colors focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2 text-sm"
      >
        Add Pay Period
      </button>
    </div>

    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h4 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
        Pay Periods
      </h4>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Period
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Cut-off
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Approvals Due
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Disburse By
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Status
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sampleData.payPeriods.map((period, idx) => (
              <tr key={idx}>
                <td className="py-3 px-4">{period.period}</td>
                <td className="py-3 px-4">{period.cutoff}</td>
                <td className="py-3 px-4">{period.approvals}</td>
                <td className="py-3 px-4">{period.disburse}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      period.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {period.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-[#1DA2A9] hover:text-[#167d83] text-sm font-medium focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2 rounded px-2 py-1">
                    {period.status === "Active" ? "Lock" : "Edit"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const SalaryHeadsTab = ({ sampleData, openDrawer, formatCurrency }) => (
  <div className="opacity-100 translate-y-0 transition-all duration-200">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h3 className="text-lg font-heading font-semibold text-[#1C3D5A]">
          Salary Heads
        </h3>
        <div className="flex items-center space-x-2">
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent">
            <option value="all">All Types</option>
            <option value="earning">Earnings</option>
            <option value="deduction">Deductions</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <caption className="sr-only">
            List of salary heads with their types, calculations, and status
          </caption>
          <thead>
            <tr className="border-b border-gray-200">
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Head
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Type
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Calculation
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                GL Code
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Payslip
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Status
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sampleData.salaryHeads.map((head, idx) => (
              <tr key={idx}>
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium text-gray-900">{head.name}</div>
                    <div className="text-sm text-gray-500">{head.code}</div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      head.type === "Earning"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {head.type}
                  </span>
                </td>
                <td className="py-3 px-4">{head.calc}</td>
                <td className="py-3 px-4">{head.glCode}</td>
                <td className="py-3 px-4">
                  {head.payslip ? (
                    <svg
                      className="w-4 h-4 text-green-600"
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
                  ) : (
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      head.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {head.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => openDrawer("salary-head", head)}
                    className="text-[#1DA2A9] hover:text-[#167d83] text-sm font-medium focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2 rounded px-2 py-1 mr-2"
                  >
                    Edit
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 text-sm font-medium focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2 rounded px-2 py-1">
                    {head.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const SalaryStructuresTab = ({
  sampleData,
  structureComponents,
  updateComponent,
  removeComponent,
  addComponent,
  structureCurrency,
  setStructureCurrency,
  totals,
  formatCurrency,
  showToast,
}) => (
  <div className="opacity-100 translate-y-0 transition-all duration-200">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
            Structure Builder
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="structure-name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Structure Name *
              </label>
              <input
                type="text"
                id="structure-name"
                placeholder="e.g. Senior Software Engineer"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="structure-currency"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Currency
              </label>
              <select
                id="structure-currency"
                value={structureCurrency}
                onChange={(e) => setStructureCurrency(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
              >
                <option value="AED">AED</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          <div className="space-y-3">
            {structureComponents.map((component, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
              >
                <select
                  value={component.head}
                  onChange={(e) =>
                    updateComponent(index, "head", e.target.value)
                  }
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent text-sm"
                >
                  {sampleData.salaryHeads.map((head) => (
                    <option key={head.name} value={head.name}>
                      {head.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={component.amount}
                  onChange={(e) =>
                    updateComponent(index, "amount", e.target.value)
                  }
                  placeholder="Amount"
                  className="w-24 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent text-sm"
                />
                <select
                  value={component.type}
                  onChange={(e) =>
                    updateComponent(index, "type", e.target.value)
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent text-sm"
                >
                  <option value="fixed">Fixed</option>
                  <option value="percent">%</option>
                </select>
                <button
                  onClick={() => removeComponent(index)}
                  className="text-red-600 hover:text-red-800 focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2 rounded p-1"
                  aria-label="Remove component"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addComponent}
            className="mt-4 text-[#1DA2A9] hover:text-[#167d83] font-medium text-sm focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2 rounded px-3 py-2 flex items-center space-x-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Add Component</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h4 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
            Structure Versions
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th
                    scope="col"
                    className="text-left py-3 px-4 font-medium text-gray-700"
                  >
                    Version
                  </th>
                  <th
                    scope="col"
                    className="text-left py-3 px-4 font-medium text-gray-700"
                  >
                    Effective
                  </th>
                  <th
                    scope="col"
                    className="text-left py-3 px-4 font-medium text-gray-700"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    className="text-left py-3 px-4 font-medium text-gray-700"
                  >
                    Changes
                  </th>
                  <th
                    scope="col"
                    className="text-left py-3 px-4 font-medium text-gray-700"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sampleData.structureVersions.map((version, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">
                        {version.version}
                      </div>
                    </td>
                    <td className="py-3 px-4">{version.effective}</td>
                    <td className="py-3 px-4">{version.author}</td>
                    <td className="py-3 px-4">{version.changes}</td>
                    <td className="py-3 px-4">
                      {version.status === "Current" ? (
                        <span className="text-green-600 text-sm font-medium">
                          Current
                        </span>
                      ) : (
                        <button className="text-[#1DA2A9] hover:text-[#167d83] text-sm font-medium focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2 rounded px-2 py-1">
                          Restore
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-32">
          <h4 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
            Live Preview
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Gross Salary</span>
              <span className="font-semibold text-[#1C3D5A]">
                {formatCurrency(totals.gross, structureCurrency)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Deductions</span>
              <span className="font-semibold text-red-600">
                {formatCurrency(totals.deductions, structureCurrency)}
              </span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">
                Net Salary
              </span>
              <span className="font-bold text-lg text-[#1DA2A9]">
                {formatCurrency(totals.net, structureCurrency)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Annual</span>
              <span className="text-gray-600">
                {formatCurrency(totals.annual, structureCurrency)}
              </span>
            </div>
            <div className="mt-6 space-y-2">
              <button
                onClick={() => showToast("Structure saved as draft")}
                className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2 text-sm"
              >
                Save Draft
              </button>
              <button
                onClick={() => showToast("Structure published successfully")}
                className="w-full bg-[#1DA2A9] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#167d83] transition-colors focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2 text-sm"
              >
                Publish Structure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PayGroupsTab = ({ sampleData, openDrawer }) => (
  <div className="opacity-100 translate-y-0 transition-all duration-200">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h3 className="text-lg font-heading font-semibold text-[#1C3D5A]">
          Pay Groups
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <caption className="sr-only">
            List of pay groups with their assigned structures and employees
          </caption>
          <thead>
            <tr className="border-b border-gray-200">
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Group
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Structure
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Calendar
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Eligibility
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Employees
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Status
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sampleData.payGroups.map((group, idx) => (
              <tr key={idx}>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">{group.name}</div>
                </td>
                <td className="py-3 px-4">{group.structure}</td>
                <td className="py-3 px-4">{group.calendar}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                    {group.eligibility}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">
                      {group.employees}
                    </span>
                    <button
                      onClick={() =>
                        openDrawer("assign-employees", {
                          groupName: group.name,
                        })
                      }
                      className="ml-2 text-[#1DA2A9] hover:text-[#167d83] text-xs focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2 rounded px-1"
                    >
                      Assign
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {group.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => openDrawer("pay-group", group)}
                    className="text-[#1DA2A9] hover:text-[#167d83] text-sm font-medium focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2 rounded px-2 py-1 mr-2"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const GradeRangesTab = ({ sampleData, openDrawer, formatCurrency }) => (
  <div className="opacity-100 translate-y-0 transition-all duration-200">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h3 className="text-lg font-heading font-semibold text-[#1C3D5A]">
          Grade/Band Ranges
        </h3>
        <button
          onClick={() => openDrawer("grade-range")}
          className="bg-[#1DA2A9] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#167d83] transition-colors focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2 text-sm"
        >
          Add Grade Range
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <caption className="sr-only">
            List of salary grade ranges with minimum, midpoint, and maximum
            values
          </caption>
          <thead>
            <tr className="border-b border-gray-200">
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Grade
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Minimum
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Midpoint
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Maximum
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Currency
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Last Updated
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 font-medium text-gray-700"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sampleData.gradeRanges.map((grade, idx) => (
              <tr key={idx}>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">{grade.grade}</div>
                </td>
                <td className="py-3 px-4">
                  {formatCurrency(grade.min, grade.currency)}
                </td>
                <td className="py-3 px-4">
                  {formatCurrency(grade.mid, grade.currency)}
                </td>
                <td className="py-3 px-4">
                  {formatCurrency(grade.max, grade.currency)}
                </td>
                <td className="py-3 px-4">{grade.currency}</td>
                <td className="py-3 px-4">{grade.updated}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => openDrawer("grade-range", grade)}
                    className="text-[#1DA2A9] hover:text-[#167d83] text-sm font-medium focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2 rounded px-2 py-1 mr-2"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const PoliciesTab = ({ formatCurrency }) => {
  const [dojMethod, setDojMethod] = useState("actual");
  const [componentRounding, setComponentRounding] = useState("none");
  const [previewValues, setPreviewValues] = useState({
    basic: 8387,
    housing: 2516,
    transport: 800,
  });

  useEffect(() => {
    let basic = 15000;
    let housing = 4500;
    let transport = 800;

    if (dojMethod === "actual") {
      basic = Math.round((basic * 16) / 31);
      housing = Math.round((housing * 16) / 31);
    } else {
      basic = Math.round((basic * 16) / 30);
      housing = Math.round((housing * 16) / 30);
    }

    if (componentRounding === "whole") {
      basic = Math.round(basic);
      housing = Math.round(housing);
      transport = Math.round(transport);
    } else if (componentRounding === "half") {
      basic = Math.round(basic * 2) / 2;
      housing = Math.round(housing * 2) / 2;
      transport = Math.round(transport * 2) / 2;
    }

    setPreviewValues({ basic, housing, transport });
  }, [dojMethod, componentRounding]);

  const total =
    previewValues.basic + previewValues.housing + previewValues.transport;

  return (
    <div className="opacity-100 translate-y-0 transition-all duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
              Proration Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="doj-method"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  DOJ/DOE Method
                </label>
                <select
                  id="doj-method"
                  value={dojMethod}
                  onChange={(e) => setDojMethod(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                >
                  <option value="actual">Actual Days</option>
                  <option value="fixed">Fixed 30 Days</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="lop-handling"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  LOP Handling
                </label>
                <select
                  id="lop-handling"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                >
                  <option value="prorate">Prorate All Components</option>
                  <option value="basic-only">Basic Salary Only</option>
                  <option value="exclude-fixed">
                    Exclude Fixed Allowances
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
              Rounding Rules
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="component-rounding"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Component Rounding
                </label>
                <select
                  id="component-rounding"
                  value={componentRounding}
                  onChange={(e) => setComponentRounding(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                >
                  <option value="none">No Rounding</option>
                  <option value="half">Nearest 0.5</option>
                  <option value="whole">Nearest Whole</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="net-rounding"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Net Salary Rounding
                </label>
                <select
                  id="net-rounding"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
                >
                  <option value="none">No Rounding</option>
                  <option value="half">Nearest 0.5</option>
                  <option value="whole">Nearest Whole</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-32">
            <h4 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
              Preview Calculation
            </h4>
            <div className="space-y-4">
              <div className="text-sm">
                <p className="text-gray-600 mb-2">Sample Employee:</p>
                <p className="font-medium">John Smith - Senior Developer</p>
                <p className="text-gray-500">Joined: March 15, 2025</p>
              </div>
              <hr className="border-gray-200" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Basic Salary (pro-rated)</span>
                  <span>{formatCurrency(previewValues.basic)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Housing Allowance</span>
                  <span>{formatCurrency(previewValues.housing)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transport Allowance</span>
                  <span>{formatCurrency(previewValues.transport)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between font-medium">
                  <span>Net Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComplianceTab = () => (
  <div className="opacity-100 translate-y-0 transition-all duration-200">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
        UAE WPS Configuration
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label
            htmlFor="wps-bank"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Bank/Agent
          </label>
          <select
            id="wps-bank"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
          >
            <option value="adcb">Abu Dhabi Commercial Bank</option>
            <option value="enbd">Emirates NBD</option>
            <option value="fab">First Abu Dhabi Bank</option>
            <option value="cbd">Commercial Bank of Dubai</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="company-wps-id"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Company WPS ID
          </label>
          <input
            type="text"
            id="company-wps-id"
            placeholder="e.g. 1234567890"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1DA2A9] focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="require-iban"
            className="h-4 w-4 text-[#1DA2A9] focus:ring-[#1DA2A9] border-gray-300 rounded"
          />
          <label htmlFor="require-iban" className="ml-2 text-sm text-gray-700">
            Require IBAN & Person ID at payroll run
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="block-cycle"
            className="h-4 w-4 text-[#1DA2A9] focus:ring-[#1DA2A9] border-gray-300 rounded"
          />
          <label htmlFor="block-cycle" className="ml-2 text-sm text-gray-700">
            Block payroll cycle when WPS not ready
          </label>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h4 className="text-lg font-heading font-semibold text-[#1C3D5A] mb-4">
        WPS Pre-checks
      </h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-green-600"
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
              <p className="text-sm font-medium text-gray-900">
                Company WPS Registration
              </p>
              <p className="text-xs text-gray-500">Valid and active</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Employee Banking Details
              </p>
              <p className="text-xs text-gray-500">3 employees missing IBAN</p>
            </div>
          </div>
          <button className="text-[#1DA2A9] hover:text-[#167d83] text-sm font-medium focus:outline-2 focus:outline-[#1DA2A9] focus:outline-offset-2 rounded px-2 py-1">
            Review
          </button>
        </div>

        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-green-600"
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
              <p className="text-sm font-medium text-gray-900">
                Salary Certificate Format
              </p>
              <p className="text-xs text-gray-500">
                Compliant with MOL requirements
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PayrollSettings;
