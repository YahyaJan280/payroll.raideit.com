import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

// Mock data
const mockEmployees = ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Emily Davis', 'Alex Brown'];
const mockPayGroups = ['All Groups', 'Management', 'Engineering', 'Sales', 'Support'];
const mockShifts = ['Regular', 'Night', 'Weekend'];
const mockSalaryHeads = ['Base Salary', 'Performance Bonus', 'Transport Allowance', 'Overtime Pay', 'Leave Encashment'];

const overtimePolicies = [
  {
    id: 1,
    payGroup: "All Groups",
    shift: "Regular",
    dayType: "Weekday",
    multiplier: "1.25x",
    minBlock: "30 mins",
    cap: "4 hrs/day",
    status: "Active",
  },
  {
    id: 2,
    payGroup: "All Groups",
    shift: "Regular",
    dayType: "Public Holiday",
    multiplier: "2.0x",
    minBlock: "15 mins",
    cap: "8 hrs/day",
    status: "Active",
  },
];

const lwpRules = {
  paidDaysMethod: "Actual working days in month",
  lwpDeduction: "Proportional from Base salary only",
  leaveMatrix: [
    {
      id: 1,
      type: "Annual Leave",
      paid: "Yes",
      deductionBasis: "N/A",
      encashable: "Yes",
      requiresApproval: "Yes",
      paidColor: "green",
      encashColor: "green",
      approvalColor: "green",
    },
    {
      id: 2,
      type: "Sick Leave",
      paid: "Yes",
      deductionBasis: "N/A",
      encashable: "No",
      requiresApproval: "Medical Cert",
      paidColor: "green",
      encashColor: "red",
      approvalColor: "yellow",
    },
    {
      id: 3,
      type: "Leave Without Pay",
      paid: "No",
      deductionBasis: "Base Salary",
      encashable: "No",
      requiresApproval: "Yes",
      paidColor: "red",
      encashColor: "red",
      approvalColor: "green",
    },
  ],
};
const encashmentPolicies = [
  {
    id: 1,
    groupGrade: "All Grades",
    leaveType: "Annual Leave",
    rateBasis: "Base/30",
    annualCap: "10 days",
    component: "Leave Encashment",
  },
];

const adjustmentsData = [
  {
    id: 1,
    employee: "John Smith",
    head: "Performance Bonus",
    type: "Earning",
    amount: "$5,000",
    applyIn: "This Cycle",
    status: "Pending",
  },
  {
    id: 2,
    employee: "Sarah Johnson",
    head: "Transport Allowance",
    type: "Earning",
    amount: "$200",
    applyIn: "Next Cycle",
    status: "Approved",
  },
  {
    id: 3,
    employee: "Mike Chen",
    head: "Laptop Deduction",
    type: "Deduction",
    amount: "$300",
    applyIn: "This Cycle",
    status: "Draft",
  },
];

const eligibilityRules = [
  {
    id: 1,
    scope: "Overtime (All Heads)",
    condition: "Grade = Manager",
    cap: "$2,000/month",
    effectiveDate: "Jan 1, 2025",
    status: "Active",
  },
];

// Status Badge Component
const StatusBadge = ({ status, color }) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  let colorClasses = "";
  switch (color) {
    case "green":
      colorClasses = "bg-green-100 text-green-800";
      break;
    case "red":
      colorClasses = "bg-red-100 text-red-800";
      break;
    case "yellow":
      colorClasses = "bg-yellow-100 text-yellow-800";
      break;
    case "gray":
      colorClasses = "bg-gray-100 text-gray-800";
      break;
    default:
      colorClasses = "bg-gray-100 text-gray-800";
  }
  return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
};
// Toast Component
const Toast = ({ message, type, onClose }) => {
  const iconSvgs = {
    success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    error: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z'
  };

  const typeClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  };

  return (
    <div className={`toast show flex items-center p-4 rounded-xl border ${typeClasses[type]} shadow-lg max-w-sm`}>
      <div className="shrink-0">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconSvgs[type]} />
        </svg>
      </div>
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button onClick={onClose} className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
};

// Drawer Component
const Drawer = ({ isOpen, title, content, onClose, onSave }) => {
  return (
    <div className={`fixed top-0 right-0 z-50 h-screen w-full max-w-md bg-white shadow-xl border-l border-gray-200 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-heading font-semibold text-accent">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 focus-ring" aria-label="Close drawer">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div>{content}</div>
        </div>
        <div className="p-4 border-t border-gray-200 bg-gray-50 md:bg-white">
          <div className="flex space-x-3">
            <button onClick={onClose} className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors focus-ring">
              Cancel
            </button>
            <button onClick={onSave} className="flex-1 bg-[#1DA2A9] text-white px-4 py-2 rounded-xl font-medium hover:bg--600 transition-colors focus-ring">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// Main Component
const PayrollEarning = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overtime");
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [drawerContent, setDrawerContent] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Calculator state
  const [otWeekday, setOtWeekday] = useState('');
  const [otWeekend, setOtWeekend] = useState('');
  const [otHoliday, setOtHoliday] = useState('');
  const [otResult, setOtResult] = useState(null);

  const [lwpBase, setLwpBase] = useState('');
  const [lwpDays, setLwpDays] = useState('');
  const [lwpWorkingDays, setLwpWorkingDays] = useState('');
  const [lwpResult, setLwpResult] = useState(null);

  const [encashBase, setEncashBase] = useState('');
  const [encashDays, setEncashDays] = useState('');
  const [encashBasis, setEncashBasis] = useState('base/30');
  const [encashResult, setEncashResult] = useState(null);

  const [adjustGross, setAdjustGross] = useState('');
  const [adjustType, setAdjustType] = useState('earning');
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustResult, setAdjustResult] = useState(null);

  // Toast functions
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

  // Drawer functions
  const openDrawer = (title, content) => {
    setDrawerTitle(title);
    setDrawerContent(content);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const saveDrawer = () => {
    showToast('Policy saved successfully', 'success');
    closeDrawer();
  };
  // Form generators
  const getOvertimeForm = () => (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pay Groups</label>
        <select multiple className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent h-20" name="payGroups" required>
          {mockPayGroups.map(group => <option key={group} value={group}>{group}</option>)}
        </select>
        <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Shifts</label>
        <select multiple className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent h-16" name="shifts" required>
          {mockShifts.map(shift => <option key={shift} value={shift}>{shift}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Day Type</label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="dayType" required>
          <option value="">Select day type</option>
          <option value="weekday">Weekday</option>
          <option value="weekend">Weekend/Rest Day</option>
          <option value="holiday">Public Holiday</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Multiplier</label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="multiplier" required>
          <option value="">Select multiplier</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2.0">2.0x</option>
          <option value="2.5">2.5x</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum OT Block (minutes)</label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="minBlock" required>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">60 minutes</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Daily Cap (hours)</label>
        <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="dailyCap" placeholder="4" min="0" step="0.5" />
      </div>
      <div className="flex items-center">
        <input type="checkbox" className="rounded border-gray-300 text- focus:ring-" name="approvalRequired" id="approvalRequired" />
        <label htmlFor="approvalRequired" className="ml-2 text-sm text-gray-700">Approval Required</label>
      </div>
    </form>
  );
  const getEncashmentForm = () => (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Eligible Pay Groups</label>
        <select multiple className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent h-20" name="payGroups" required>
          {mockPayGroups.map(group => <option key={group} value={group}>{group}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Encashable Leave Types</label>
        <select multiple className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent h-16" name="leaveTypes" required>
          <option value="annual">Annual Leave</option>
          <option value="earned">Earned Leave</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Encashment Rate</label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="rate" required>
          <option value="">Select rate basis</option>
          <option value="base/30">Base Salary / 30</option>
          <option value="gross/30">Gross Salary / 30</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Annual Cap (days)</label>
        <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="annualCap" placeholder="10" min="0" required />
      </div>
    </form>
  );

  const getAdjustmentForm = () => (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="employee" required>
          <option value="">Select employee</option>
          {mockEmployees.map(emp => <option key={emp} value={emp}>{emp}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="type" required>
          <option value="">Select type</option>
          <option value="earning">Earning</option>
          <option value="deduction">Deduction</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Salary Head</label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="head" required>
          <option value="">Select salary head</option>
          {mockSalaryHeads.map(head => <option key={head} value={head}>{head}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
        <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="amount" placeholder="500" min="0" step="0.01" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Apply In</label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="applyIn" required>
          <option value="current">This Cycle (April 2025)</option>
          <option value="next">Next Cycle (May 2025)</option>
        </select>
      </div>
    </form>
  );
  const getRuleForm = () => (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Scope</label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="scope" required>
          <option value="">Select scope</option>
          <option value="head">Salary Head</option>
          <option value="grade">Grade/Level</option>
          <option value="location">Location</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="condition" required>
          <option value="">Select condition</option>
          <option value="equals">Equals</option>
          <option value="in">In List</option>
          <option value="range">In Range</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
        <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="value" placeholder="Manager, Senior Manager" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cap Amount ($)</label>
        <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="cap" placeholder="2000" min="0" step="0.01" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
        <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="effectiveDate" required />
      </div>
    </form>
  );

  const getLWPForm = () => (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Paid Days Method</label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="paidDaysMethod" required>
          <option value="actual">Actual working days</option>
          <option value="fixed">Fixed 30 days</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">LWP Deduction From</label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent" name="lwpDeduction" required>
          <option value="base">Base salary only</option>
          <option value="gross">Gross salary</option>
        </select>
      </div>
      <div className="flex items-center">
        <input type="checkbox" className="rounded border-gray-300 text- focus:ring-" name="blockPayUnapproved" id="blockPayUnapproved" />
        <label htmlFor="blockPayUnapproved" className="ml-2 text-sm text-gray-700">Block pay if unapproved leave exists</label>
      </div>
    </form>
  );
  // Calculator functions
  const calculateOT = () => {
    const weekday = parseFloat(otWeekday) || 0;
    const weekend = parseFloat(otWeekend) || 0;
    const holiday = parseFloat(otHoliday) || 0;
    
    const basePay = 25;
    const weekdayOT = weekday > 8 ? (weekday - 8) * basePay * 1.25 : 0;
    const weekendOT = weekend * basePay * 1.5;
    const holidayOT = holiday * basePay * 2.0;
    const total = weekdayOT + weekendOT + holidayOT;
    
    setOtResult({ weekdayOT, weekendOT, holidayOT, total });
  };

  const calculateLWP = () => {
    const base = parseFloat(lwpBase) || 0;
    const days = parseFloat(lwpDays) || 0;
    const workingDays = parseFloat(lwpWorkingDays) || 22;
    
    const perDayRate = base / workingDays;
    const deduction = perDayRate * days;
    const paidDays = workingDays - days;
    
    setLwpResult({ perDayRate, deduction, paidDays, days });
  };

  const calculateEncashment = () => {
    const base = parseFloat(encashBase) || 0;
    const days = parseFloat(encashDays) || 0;
    
    const dailyRate = encashBasis === 'base/30' ? base / 30 : (base * 1.3) / 30;
    const payout = dailyRate * days;
    
    setEncashResult({ dailyRate, payout, days, basis: encashBasis });
  };

  const calculateAdjustment = () => {
    const gross = parseFloat(adjustGross) || 0;
    const amount = parseFloat(adjustAmount) || 0;
    
    const newGross = adjustType === 'earning' ? gross + amount : gross - amount;
    const variance = newGross - gross;
    const netEstimate = newGross * 0.85;
    
    setAdjustResult({ gross, newGross, variance, netEstimate, type: adjustType, amount });
  };

  // Action handlers
  const handleTableAction = (action, id, type) => {
    switch (action) {
      case 'edit':
        if (type === 'overtime') {
          openDrawer('Edit Overtime Policy', getOvertimeForm());
        } else if (type === 'encashment') {
          openDrawer('Edit Encashment Policy', getEncashmentForm());
        } else if (type === 'adjustment') {
          openDrawer('Edit Adjustment', getAdjustmentForm());
        } else if (type === 'rule') {
          openDrawer('Edit Eligibility Rule', getRuleForm());
        } else if (type === 'lwp') {
          openDrawer('Edit Leave Impact Rules', getLWPForm());
        }
        break;
      case 'deactivate':
        if (window.confirm('Are you sure you want to deactivate this policy?')) {
          showToast('Policy deactivated', 'success');
        }
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this item?')) {
          showToast(`${type} deleted successfully`, 'success');
        }
        break;
      case 'approve':
        showToast('Adjustment approved', 'success');
        break;
      case 'reject':
        const reason = window.prompt('Reason for rejection:');
        if (reason) {
          showToast('Adjustment rejected', 'info');
        }
        break;
      case 'remove':
        if (window.confirm('Remove this adjustment?')) {
          showToast('Adjustment removed', 'success');
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    showToast('Payroll Earnings & Policies module loaded successfully!', 'success');
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isExportMenuOpen && !event.target.closest('#export-btn') && !event.target.closest('#export-menu')) {
        setIsExportMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isExportMenuOpen]);

  const mainContentClass = `min-h-screen bg-gray-50 transition-all duration-300 ${
    isSidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-[280px]'
  }`;

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
        ))}
      </div>

      {/* Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        title={drawerTitle}
        content={drawerContent}
        onClose={closeDrawer}
        onSave={saveDrawer}
      />
<Sidebar />
      {/* Main Content */}
      <main className={mainContentClass}>
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 lg:-ml-12 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 ">
              {/* Mobile menu button */}
             

              {/* Desktop sidebar toggle */}
             
              <div>
                <h1 className="text-xl lg:text-2xl font-heading font-semibold text-accent">Earnings & Policies</h1>
                <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-1" aria-label="Breadcrumb">
                  <a href="#" className="hover:text- focus-ring rounded px-1">Home</a>
                  <span>/</span>
                  <a href="#" className="hover:text- focus-ring rounded px-1">Payroll</a>
                  <span>/</span>
                  <span className="text-gray-900 font-medium">Earnings & Policies</span>
                </nav>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center  space-x-2 lg:space-x-3 ">
              <button 
                onClick={() => {
                  if (activeTab === 'overtime') openDrawer('Add Overtime Policy', getOvertimeForm());
                  else if (activeTab === 'encashment') openDrawer('Add Encashment Policy', getEncashmentForm());
                  else if (activeTab === 'adjustments') openDrawer('Add One-time Adjustment', getAdjustmentForm());
                  else if (activeTab === 'eligibility') openDrawer('Add Eligibility Rule', getRuleForm());
                  else showToast('No policies can be created for this tab', 'info');
                }}
                className="bg-[#1DA2A9] text-white px-3 lg:px-4 py-2 rounded-xl font-medium hover:bg--600 transition-colors focus-ring text-sm"
              >
                <span className="hidden sm:inline">New Policy</span>
                <span className="sm:hidden">New</span>
              </button>
              <button 
                onClick={() => showToast('Import functionality will be implemented', 'info')}
                className="border border-gray-300 text-gray-700 px-3 lg:px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors focus-ring text-sm"
              >
                <span className="hidden sm:inline">Import</span>
                <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                </svg>
              </button>
              <button 
                onClick={() => showToast('All changes saved', 'success')}
                className="bg-[#FF6B35] text-white px-3 lg:px-4 py-2 rounded-xl font-medium hover:bg-orange-600 transition-colors focus-ring text-sm"
              >
                <span className="hidden sm:inline">Save</span>
                <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                </svg>
              </button>
              <div className="relative">
                <button 
                  id="export-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExportMenuOpen(!isExportMenuOpen);
                  }}
                  className="border border-gray-300 text-gray-700 px-3 lg:px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors focus-ring text-sm"
                >
                  <span className="hidden sm:inline">Export</span>
                  <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </button>
                <div id="export-menu" className={`${isExportMenuOpen ? '' : 'hidden'} absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50`}>
                  <div className="py-1">
                    <button 
                      onClick={() => {
                        showToast('Exporting as CSV...', 'info');
                        setIsExportMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus-ring"
                    >
                      Export as CSV
                    </button>
                    <button 
                      onClick={() => {
                        showToast('Exporting as PDF...', 'info');
                        setIsExportMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus-ring"
                    >
                      Export as PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Page Content */}
        <div className="p-4 lg:p-6  lg:-ml-12">
          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                {[
                  { id: 'overtime', label: 'Overtime' },
                  { id: 'lwp', label: 'LWP & Leave Impact' },
                  { id: 'encashment', label: 'Encashment' },
                  { id: 'adjustments', label: 'One-time Adjustments' },
                  { id: 'eligibility', label: 'Eligibility & Caps' },
                  { id: 'preview', label: 'Preview & Test' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm focus-ring ${
                      activeTab === tab.id
                        ? 'border- text-'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Contents */}
          {/* Overtime Tab */}
          {activeTab === 'overtime' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-heading font-semibold text-accent">Overtime Policies</h2>
                <button 
                  onClick={() => openDrawer('Add Overtime Policy', getOvertimeForm())}
                  className="bg-[#1DA2A9] text-white px-4 py-2 rounded-xl font-medium hover:bg--600 transition-colors focus-ring text-sm"
                >
                  Add Policy
                </button>
              </div>
              <div className="table-wrapper overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Group</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Multiplier</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Block</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cap</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {overtimePolicies.map(policy => (
                      <tr key={policy.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{policy.payGroup}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{policy.shift}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{policy.dayType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{policy.multiplier}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{policy.minBlock}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{policy.cap}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={policy.status} color="green" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleTableAction('edit', policy.id, 'overtime')}
                            className="text- hover:text--600 mr-3"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleTableAction('deactivate', policy.id, 'overtime')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Deactivate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* LWP Tab */}
          {activeTab === 'lwp' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-heading font-semibold text-accent">Leave Impact Rules</h2>
                <button 
                  onClick={() => openDrawer('Edit Leave Impact Rules', getLWPForm())}
                  className="bg-[#1DA2A9] text-white px-4 py-2 rounded-xl font-medium hover:bg--600 transition-colors focus-ring text-sm"
                >
                  Edit Rules
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">Paid Days Method</h3>
                  <p className="text-sm text-gray-600">{lwpRules.paidDaysMethod}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">LWP Deduction</h3>
                  <p className="text-sm text-gray-600">{lwpRules.lwpDeduction}</p>
                </div>
              </div>
              <div className="table-wrapper overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid?</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deduction Basis</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Encashable?</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requires Approval</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {lwpRules.leaveMatrix.map(rule => (
                      <tr key={rule.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rule.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={rule.paid} color={rule.paidColor} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rule.deductionBasis}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={rule.encashable} color={rule.encashColor} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={rule.requiresApproval} color={rule.approvalColor} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleTableAction('edit', rule.id, 'lwp')}
                            className="text- hover:text--600"
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
          )}
          {/* Encashment Tab */}
          {activeTab === 'encashment' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-heading font-semibold text-accent">Leave Encashment Policies</h2>
                <button 
                  onClick={() => openDrawer('Add Encashment Policy', getEncashmentForm())}
                  className="bg-[#1DA2A9] text-white px-4 py-2 rounded-xl font-medium hover:bg--600 transition-colors focus-ring text-sm"
                >
                  Add Policy
                </button>
              </div>
              <div className="table-wrapper overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group/Grade</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate Basis</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Cap</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {encashmentPolicies.map(policy => (
                      <tr key={policy.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{policy.groupGrade}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{policy.leaveType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{policy.rateBasis}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{policy.annualCap}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{policy.component}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleTableAction('edit', policy.id, 'encashment')}
                            className="text- hover:text--600 mr-3"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleTableAction('delete', policy.id, 'encashment')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* Adjustments Tab */}
          {activeTab === 'adjustments' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-heading font-semibold text-accent">Staged Adjustments</h2>
                <button 
                  onClick={() => openDrawer('Add One-time Adjustment', getAdjustmentForm())}
                  className="bg-[#1DA2A9] text-white px-4 py-2 rounded-xl font-medium hover:bg--600 transition-colors focus-ring text-sm"
                >
                  Add Adjustment
                </button>
              </div>
              <div className="table-wrapper overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Head</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apply In</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {adjustmentsData.map(adjustment => (
                      <tr key={adjustment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{adjustment.employee}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{adjustment.head}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge 
                            status={adjustment.type} 
                            color={adjustment.type === 'Earning' ? 'green' : 'red'} 
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{adjustment.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{adjustment.applyIn}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge 
                            status={adjustment.status} 
                            color={
                              adjustment.status === 'Approved' ? 'green' : 
                              adjustment.status === 'Pending' ? 'yellow' : 'gray'
                            } 
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {adjustment.status === 'Pending' && (
                            <button 
                              onClick={() => handleTableAction('approve', adjustment.id, 'adjustment')}
                              className="text-green-600 hover:text-green-900 mr-3"
                            >
                              Approve
                            </button>
                          )}
                          <button 
                            onClick={() => handleTableAction('edit', adjustment.id, 'adjustment')}
                            className="text- hover:text--600 mr-3"
                          >
                            Edit
                          </button>
                          {adjustment.status === 'Pending' ? (
                            <button 
                              onClick={() => handleTableAction('reject', adjustment.id, 'adjustment')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleTableAction('remove', adjustment.id, 'adjustment')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* Eligibility Tab */}
          {activeTab === 'eligibility' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-heading font-semibold text-accent">Caps & Eligibility Rules</h2>
                <button 
                  onClick={() => openDrawer('Add Eligibility Rule', getRuleForm())}
                  className="bg-[#1DA2A9] text-white px-4 py-2 rounded-xl font-medium hover:bg--600 transition-colors focus-ring text-sm"
                >
                  Add Rule
                </button>
              </div>
              <div className="table-wrapper overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scope</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cap</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {eligibilityRules.map(rule => (
                      <tr key={rule.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rule.scope}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rule.condition}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rule.cap}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rule.effectiveDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={rule.status} color="green" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleTableAction('edit', rule.id, 'rule')}
                            className="text- hover:text--600 mr-3"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleTableAction('delete', rule.id, 'rule')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* Preview & Test Tab */}
          {activeTab === 'preview' && (
            <div className="space-y-6">
              {/* Mini Calculators */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* OT Calculator */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-heading font-semibold text-accent mb-4">OT Calculator</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Weekday Hours</label>
                      <input 
                        type="number" 
                        value={otWeekday}
                        onChange={(e) => setOtWeekday(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent focus-ring" 
                        placeholder="8" 
                        min="0" 
                        step="0.5" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Weekend Hours</label>
                      <input 
                        type="number" 
                        value={otWeekend}
                        onChange={(e) => setOtWeekend(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent focus-ring" 
                        placeholder="0" 
                        min="0" 
                        step="0.5" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Holiday Hours</label>
                      <input 
                        type="number" 
                        value={otHoliday}
                        onChange={(e) => setOtHoliday(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent focus-ring" 
                        placeholder="0" 
                        min="0" 
                        step="0.5" 
                      />
                    </div>
                    <button 
                      onClick={calculateOT}
                      className="w-full bg-[#1DA2A9] text-white py-2 rounded-lg font-medium hover:bg-[#167d83] transition-colors focus-ring"
                    >
                      Calculate OT Payout
                    </button>
                    {otResult && (
                      <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>Weekday OT:</span>
                            <span>${otResult.weekdayOT.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Weekend OT:</span>
                            <span>${otResult.weekendOT.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Holiday OT:</span>
                            <span>${otResult.holidayOT.toFixed(2)}</span>
                          </div>
                          <div className="border-t pt-1 font-medium flex justify-between">
                            <span>Total OT Pay:</span>
                            <span>${otResult.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* LWP Calculator */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-heading font-semibold text-accent mb-4">LWP Calculator</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Base Salary</label>
                      <input 
                        type="number" 
                        value={lwpBase}
                        onChange={(e) => setLwpBase(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent focus-ring" 
                        placeholder="5000" 
                        min="0" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LWP Days</label>
                      <input 
                        type="number" 
                        value={lwpDays}
                        onChange={(e) => setLwpDays(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent focus-ring" 
                        placeholder="2" 
                        min="0" 
                        step="0.5" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Working Days in Month</label>
                      <input 
                        type="number" 
                        value={lwpWorkingDays}
                        onChange={(e) => setLwpWorkingDays(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent focus-ring" 
                        placeholder="22" 
                        min="1" 
                      />
                    </div>
                    <button 
                      onClick={calculateLWP}
                      className="w-full bg-[#1DA2A9] text-white py-2 rounded-lg font-medium hover:bg-[#167d83] transition-colors focus-ring"
                    >
                      Calculate Deduction
                    </button>
                    {lwpResult && (
                      <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>Per day rate:</span>
                            <span>${lwpResult.perDayRate.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Paid days:</span>
                            <span>{lwpResult.paidDays}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>LWP days:</span>
                            <span>{lwpResult.days}</span>
                          </div>
                          <div className="border-t pt-1 font-medium flex justify-between text-red-600">
                            <span>Deduction:</span>
                            <span>${lwpResult.deduction.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Encashment Calculator */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-heading font-semibold text-accent mb-4">Encashment Calculator</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Base Salary</label>
                      <input 
                        type="number" 
                        value={encashBase}
                        onChange={(e) => setEncashBase(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent focus-ring" 
                        placeholder="5000" 
                        min="0" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Leave Days to Encash</label>
                      <input 
                        type="number" 
                        value={encashDays}
                        onChange={(e) => setEncashDays(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent focus-ring" 
                        placeholder="5" 
                        min="0" 
                        step="0.5" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rate Basis</label>
                      <select 
                        value={encashBasis}
                        onChange={(e) => setEncashBasis(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent focus-ring"
                      >
                        <option value="base/30">Base/30</option>
                        <option value="gross/30">Gross/30</option>
                      </select>
                    </div>
                    <button 
                      onClick={calculateEncashment}
                      className="w-full bg-[#1DA2A9] text-white py-2 rounded-lg font-medium hover:bg-[#167d83] transition-colors focus-ring"
                    >
                      Calculate Payout
                    </button>
                    {encashResult && (
                      <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>Rate basis:</span>
                            <span>{encashResult.basis}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Daily rate:</span>
                            <span>${encashResult.dailyRate.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Days to encash:</span>
                            <span>{encashResult.days}</span>
                          </div>
                          <div className="border-t pt-1 font-medium flex justify-between text-green-600">
                            <span>Payout:</span>
                            <span>${encashResult.payout.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Adjustment Impact */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-heading font-semibold text-accent mb-4">Adjustment Impact</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Gross</label>
                      <input 
                        type="number" 
                        value={adjustGross}
                        onChange={(e) => setAdjustGross(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent focus-ring" 
                        placeholder="8000" 
                        min="0" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adjustment Type</label>
                      <select 
                        value={adjustType}
                        onChange={(e) => setAdjustType(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent focus-ring"
                      >
                        <option value="earning">Earning</option>
                        <option value="deduction">Deduction</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adjustment Amount</label>
                      <input 
                        type="number" 
                        value={adjustAmount}
                        onChange={(e) => setAdjustAmount(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring- focus:border-transparent focus-ring" 
                        placeholder="500" 
                        min="0" 
                      />
                    </div>
                    <button 
                      onClick={calculateAdjustment}
                      className="w-full bg-[#1DA2A9] text-white py-2 rounded-lg font-medium hover:bg-[#167d83] transition-colors focus-ring"
                    >
                      Calculate Impact
                    </button>
                    {adjustResult && (
                      <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>Current Gross:</span>
                            <span>${adjustResult.gross.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Adjustment:</span>
                            <span className={adjustResult.type === 'earning' ? 'text-green-600' : 'text-red-600'}>
                              {adjustResult.type === 'earning' ? '+' : '-'}${adjustResult.amount.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>New Gross:</span>
                            <span>${adjustResult.newGross.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Variance:</span>
                            <span className={adjustResult.variance >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {adjustResult.variance >= 0 ? '+' : ''}${adjustResult.variance.toFixed(2)}
                            </span>
                          </div>
                          <div className="border-t pt-1 font-medium flex justify-between">
                            <span>Est. Net:</span>
                            <span>${adjustResult.netEstimate.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Sample Employee Preview */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-heading font-semibold text-accent mb-4">Sample Employee Preview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-2">Gross Salary</h4>
                    <p className="text-2xl font-bold text-">$8,500</p>
                    <p className="text-sm text-gray-500">+$500 from last cycle</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-2">Total Deductions</h4>
                    <p className="text-2xl font-bold text-red-600">$1,200</p>
                    <p className="text-sm text-gray-500">+$50 from last cycle</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-gray-900 mb-2">Net Salary</h4>
                    <p className="text-2xl font-bold text-accent">$7,300</p>
                    <p className="text-sm text-gray-500">+$450 from last cycle</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PayrollEarning;