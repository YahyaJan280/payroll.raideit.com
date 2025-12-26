import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import PayrollSettings from "./components/PayrollSettings";
import PayrollRun from "./components/PayrollRun";
import ReimbursementsClaims from "./components/Reimbursment";
import PayrollEmployeeMaster from "./components/PayrollEmploye";
import PrePayrollValidation from "./components/Payrollvalidation";
import PayrollEarning from "./components/PayrollEarning";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Simple Navigation for Testing */}
        <nav className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex space-x-4">
            <Link to="/payroll-settings" className="text-primary hover:text-primary-600 font-medium">Payroll Settings</Link>
            <Link to="/payroll-Earning" className="text-primary hover:text-primary-600 font-medium">Payroll Earnings</Link>
            <Link to="/payroll-run" className="text-primary hover:text-primary-600 font-medium">Payroll Run</Link>
            <Link to="/reimbursements" className="text-primary hover:text-primary-600 font-medium">Reimbursements</Link>
            <Link to="/payroll-employee-master" className="text-primary hover:text-primary-600 font-medium">Employee Master</Link>
            <Link to="/pre-payroll-validation" className="text-primary hover:text-primary-600 font-medium">Pre-Payroll Validation</Link>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<PayrollEarning />} />
          <Route path="/payroll-settings" element={<PayrollSettings />} />
          <Route path="/payroll-run" element={<PayrollRun />} />
          <Route path="/reimbursements" element={<ReimbursementsClaims />} />
          <Route path="/payroll-Earning" element={<PayrollEarning />} />
          <Route path="/payroll-employee-master" element={<PayrollEmployeeMaster />}/>
          <Route path="/pre-payroll-validation" element={<PrePayrollValidation />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
