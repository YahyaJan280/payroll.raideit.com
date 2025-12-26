import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Settings,
  Users,
  X,
  Menu,
  Minus,
  Box,
  User,
  Check,
  ChevronDown,
  ChevronRight
} from "lucide-react";

const Sidebar = ({ currentPage, onNavigate }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPayrollOpen, setIsPayrollOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState(currentPage);

  const payrollPages = [
    "payroll-settings",
    "payroll-run",
    "reimbursements",
    "payroll-employee-master",
    "pre-payroll-validation",
    "payroll-Earning"
  ];

  useEffect(() => {
    setActiveSubmenu(currentPage);
    if (payrollPages.includes(currentPage)) setIsPayrollOpen(true);
  }, [currentPage]);

  const handleNavigation = (page) => {
    onNavigate(page);
    setActiveSubmenu(page);
    if (payrollPages.includes(page)) setIsPayrollOpen(true);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  const isActive = (page) => activeSubmenu === page;

  const iconClass = "w-5 h-5 shrink-0";
  const subIconClass = "w-4 h-4 text-gray-500";

  const payrollSubmenuItems = [
    { name: "Payroll Settings", page: "payroll-settings", icon: Settings },
    { name: "Payroll Run", page: "payroll-run", icon: Minus },
    { name: "Reimbursements", page: "reimbursements", icon: Box },
    { name: "Employee Master", page: "payroll-employee-master", icon: User },
    { name: "Payroll Validation", page: "pre-payroll-validation", icon:Check },{ name: "Payroll Earning", page: "payroll-Earning", icon:Check },
  ];

  return (
    <>
      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white shadow-lg transition-all duration-300
          ${isSidebarCollapsed ? "w-18" : "w-[230px]"}
          ${isMobileMenuOpen ? "translate-x-0" : "max-lg:-translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b min-h-18">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-[#1DA2A9] to-[#167d83] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">rT</span>
            </div>
            {!isSidebarCollapsed && (
              <div>
                <h1 className="text-xl font-semibold text-[#1C3D5A]">raideTalent</h1>
                <p className="text-xs text-gray-500">HRMS</p>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              document.body.style.overflow = "";
            }}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* MENU */}
        <nav className="p-3 overflow-y-auto pb-20">
          {/* OVERVIEW */}
          {!isSidebarCollapsed && (
            <p className="text-xs text-gray-400 uppercase px-3 mb-2">Overview</p>
          )}
          <button
            onClick={() => handleNavigation("dashboard")}
            className={`w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition
              ${isActive("dashboard") ? "bg-[#1DA2A9] text-[#1DA2A9]" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <LayoutDashboard className={iconClass} />
            {!isSidebarCollapsed && <span className="ml-3">Dashboard</span>}
          </button>

          {/* PAYROLL */}
          {!isSidebarCollapsed && (
            <p className="text-xs text-gray-400 uppercase px-3 mt-6 mb-2">Payroll</p>
          )}

          {/* PAYROLL BUTTON */}
          <div
            className={`w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition
              ${payrollPages.includes(activeSubmenu) ? "bg-[#e0f7fa] text-[#1DA2A9]" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <Wallet className={iconClass} />
            {!isSidebarCollapsed && (
              <span
                className="ml-3 flex-1 cursor-pointer"
                onClick={() => setIsPayrollOpen(!isPayrollOpen)}
              >
                Payroll
              </span>
            )}
            <button
              onClick={() => setIsPayrollOpen(!isPayrollOpen)}
              className="p-1 rounded hover:bg-gray-100"
            >
              {isPayrollOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

          {/* PAYROLL SUBMENU */}
          {!isSidebarCollapsed && isPayrollOpen && (
            <ul className="ml-8 mt-2 space-y-2 text-sm">
              {payrollSubmenuItems.map((item) => (
                <li
                  key={item.page}
                  className={`flex items-center gap-2 pl-2 py-1 rounded-l-lg transition
                    ${isActive(item.page) 
                      ? "bg-[#1DA2A9] text-white border-l-4 border-[#0f7d86]" 
                      : "hover:bg-gray-100 hover:text-[#1DA2A9] text-gray-600"
                    }`}
                >
                  <item.icon className={subIconClass} />
                  <Link 
                    to={`/${item.page}`} 
                    className="flex-1"
                    onClick={() => handleNavigation(item.page)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* EMPLOYEES */}
          {!isSidebarCollapsed && (
            <p className="text-xs text-gray-400 uppercase px-3 mt-6 mb-2">Employees</p>
          )}
          <button
            onClick={() => handleNavigation("employees")}
            className={`w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition
              ${isActive("employees") ? "bg-[#e0f7fa] text-[#1DA2A9]" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <Users className={iconClass} />
            {!isSidebarCollapsed && <span className="ml-3">Directory</span>}
          </button>
        </nav>
      </aside>

      {/* MOBILE TOGGLE BUTTON */}
      {!isMobileMenuOpen && (
        <button
          onClick={() => {
            setIsMobileMenuOpen(true);
            document.body.style.overflow = "hidden";
          }}
          className="lg:hidden fixed right-16 top-6 z-40 p-2 bg-[#1DA2A9] text-white rounded-full shadow-lg"
        >
          <Menu className="w-4 h-4" />
        </button>
      )}
    </>
  );
};

export default Sidebar;
