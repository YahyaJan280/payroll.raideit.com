import React, { useState, useEffect, useRef } from "react";
import Sidebar from './Sidebar'
const ReimbursementsClaims = () => {
  // State Management
  const [currentTab, setCurrentTab] = useState("policies");
  const [policies, setPolicies] = useState([
    {
      id: "pol001",
      category: "Travel",
      caps: { perReceipt: 5000, daily: null, monthly: 15000 },
      currency: "AED",
      eligibility: ["All Employees"],
      approval: "Manager → Finance",
      route: "Payroll",
      status: "Active",
      requiredDocs: ["receipt", "itinerary"],
      payrollHead: "Travel Allowance",
    },
    {
      id: "pol002",
      category: "Meals",
      caps: { perReceipt: 200, daily: 400, monthly: null },
      currency: "AED",
      eligibility: ["All Employees"],
      approval: "Manager Only",
      route: "Payroll",
      status: "Active",
      requiredDocs: ["receipt"],
      payrollHead: "Meal Allowance",
    },
    {
      id: "pol003",
      category: "Internet",
      caps: { perReceipt: null, daily: null, monthly: 500 },
      currency: "AED",
      eligibility: ["All Employees"],
      approval: "Manager Only",
      route: "AP",
      status: "Active",
      requiredDocs: ["invoice"],
      payrollHead: null,
    },
    {
      id: "pol004",
      category: "Mileage",
      caps: { perKm: 0.5, monthly: 2000 },
      currency: "AED",
      eligibility: ["Sales", "Field Staff"],
      approval: "Manager Only",
      route: "Payroll",
      status: "Active",
      requiredDocs: [],
      payrollHead: "Mileage Allowance",
    },
  ]);
  const [claims, setClaims] = useState([
    {
      id: "CLM001",
      employee: "john.smith",
      employeeName: "John Smith",
      category: "travel",
      subcategory: "airfare",
      merchant: "Emirates Airlines",
      date: "2025-09-15",
      amount: 2500,
      originalAmount: 680,
      currency: "USD",
      aedAmount: 2500,
      location: "London, UK",
      purpose: "Client meeting in London office",
      project: "proj001",
      costCenter: "cc002",
      includeInPayroll: true,
      status: "pending",
      route: "Payroll",
      policyStatus: ["Exceeds daily cap"],
      approver: "sarah.johnson",
      submittedDate: "2025-09-16",
      receipt: true,
    },
    {
      id: "CLM002",
      employee: "mary.davis",
      employeeName: "Mary Davis",
      category: "meals",
      subcategory: "business-lunch",
      merchant: "The Gallery Restaurant",
      date: "2025-09-18",
      amount: 320,
      originalAmount: 320,
      currency: "AED",
      aedAmount: 320,
      location: "Dubai, UAE",
      purpose: "Business lunch with potential client",
      project: "proj002",
      costCenter: "cc003",
      includeInPayroll: true,
      status: "pending",
      route: "Payroll",
      policyStatus: ["Exceeds per-receipt cap"],
      approver: "sarah.johnson",
      submittedDate: "2025-09-19",
      receipt: true,
    },
    {
      id: "CLM003",
      employee: "ahmed.hassan",
      employeeName: "Ahmed Hassan",
      category: "internet",
      merchant: "Du Telecom",
      date: "2025-09-01",
      amount: 450,
      originalAmount: 450,
      currency: "AED",
      aedAmount: 450,
      location: "Dubai, UAE",
      purpose: "Monthly internet bill for WFH",
      project: "general",
      costCenter: "cc002",
      includeInPayroll: false,
      status: "pending",
      route: "AP",
      policyStatus: ["OK"],
      approver: "sarah.johnson",
      submittedDate: "2025-09-02",
      receipt: true,
    },
    {
      id: "CLM004",
      employee: "sarah.johnson",
      employeeName: "Sarah Johnson",
      category: "travel",
      subcategory: "hotel",
      merchant: "Marriott Hotel",
      date: "2025-08-25",
      amount: 1200,
      originalAmount: 1200,
      currency: "AED",
      aedAmount: 1200,
      location: "Abu Dhabi, UAE",
      purpose: "Conference attendance",
      project: "general",
      costCenter: "cc001",
      includeInPayroll: true,
      status: "approved",
      route: "Payroll",
      policyStatus: ["OK"],
      approver: "finance.dept",
      submittedDate: "2025-08-26",
      approvedDate: "2025-08-27",
      receipt: true,
    },
  ]);
  const [receipts, setReceipts] = useState([
    {
      id: "RCP001",
      filename: "emirates_receipt_001.jpg",
      uploadDate: "2025-09-20",
      ocrStatus: "processed",
      extractedData: {
        merchant: "Emirates Airlines",
        amount: 680,
        currency: "USD",
        date: "2025-09-15",
        confidence: 0.95,
      },
      matchedClaim: "CLM001",
      status: "matched",
      duplicateWarning: false,
    },
    {
      id: "RCP002",
      filename: "restaurant_receipt.pdf",
      uploadDate: "2025-09-20",
      ocrStatus: "processing",
      extractedData: null,
      matchedClaim: null,
      status: "processing",
      duplicateWarning: false,
    },
    {
      id: "RCP003",
      filename: "taxi_receipt_duplicate.jpg",
      uploadDate: "2025-09-21",
      ocrStatus: "processed",
      extractedData: {
        merchant: "Careem",
        amount: 85,
        currency: "AED",
        date: "2025-09-18",
        confidence: 0.88,
      },
      matchedClaim: null,
      status: "unmatched",
      duplicateWarning: true,
    },
  ]);
  const [glMappings, setGlMappings] = useState([
    {
      id: "MAP001",
      category: "Travel",
      subcategory: "All",
      glAccount: "6001-001",
      costCenter: "AUTO",
      taxCode: "VAT0",
      active: true,
    },
    {
      id: "MAP002",
      category: "Meals",
      subcategory: "All",
      glAccount: "6002-001",
      costCenter: "AUTO",
      taxCode: "VAT5",
      active: true,
    },
    {
      id: "MAP003",
      category: "Internet",
      subcategory: "All",
      glAccount: "6003-001",
      costCenter: "AUTO",
      taxCode: "VAT5",
      active: true,
    },
  ]);
  const [selectedClaims, setSelectedClaims] = useState(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [claimFormData, setClaimFormData] = useState({
    employee: "sarah.johnson",
    category: "",
    subcategory: "",
    merchant: "",
    date: "",
    amount: "",
    currency: "AED",
    location: "",
    distance: "",
    rate: "0.50",
    days: "",
    perDiemLocation: "",
    perDiemRate: "",
    purpose: "",
    project: "",
    costCenter: "",
    includeInPayroll: true,
  });
  const [showMileageFields, setShowMileageFields] = useState(false);
  const [showPerDiemFields, setShowPerDiemFields] = useState(false);
  const [showFXConversion, setShowFXConversion] = useState(false);
  const [showPolicyStatus, setShowPolicyStatus] = useState(false);
  const [policyStatusChips, setPolicyStatusChips] = useState([]);
  const [fxData, setFxData] = useState({
    original: "",
    rate: "",
    aed: "",
  });

  const fxRates = {
    USD: 3.67,
    EUR: 4.12,
    GBP: 4.85,
    SAR: 0.98,
  };

  // Refs
  const fileInputRef = useRef(null);
  const bulkReceiptUploadRef = useRef(null);

  // Utility Functions
  const formatCurrency = (amount, currency = "AED") => {
    return `${currency} ${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const generateId = (prefix) => {
    return `${prefix}${String(Math.floor(Math.random() * 1000)).padStart(
      3,
      "0"
    )}`;
  };

  const showToast = (message, type = "success") => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const openDrawer = (content) => {
    setDrawerContent(content);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setDrawerContent("");
  };

  const convertCurrency = (amount, fromCurrency, toCurrency = "AED") => {
    if (fromCurrency === toCurrency) return amount;
    if (fromCurrency === "AED") return amount / (fxRates[toCurrency] || 1);
    if (toCurrency === "AED") return amount * (fxRates[fromCurrency] || 1);
    const aedAmount = amount * (fxRates[fromCurrency] || 1);
    return aedAmount / (fxRates[toCurrency] || 1);
  };

  const checkPolicyCompliance = (claim, policyId) => {
    const policy = policies.find((p) => p.id === policyId);
    if (!policy) return ["Policy not found"];

    const issues = [];
    const aedAmount = convertCurrency(claim.amount, claim.currency, "AED");

    if (policy.caps.perReceipt && aedAmount > policy.caps.perReceipt) {
      issues.push("Exceeds per-receipt cap");
    }
    if (policy.caps.daily && aedAmount > policy.caps.daily) {
      issues.push("Exceeds daily cap");
    }
    if (policy.caps.monthly && aedAmount > policy.caps.monthly) {
      issues.push("Exceeds monthly cap");
    }

    if (policy.requiredDocs.includes("receipt") && !claim.receipt) {
      issues.push("Missing receipt");
    }
    if (policy.requiredDocs.includes("invoice") && !claim.invoice) {
      issues.push("Missing invoice");
    }
    if (policy.requiredDocs.includes("itinerary") && !claim.itinerary) {
      issues.push("Missing itinerary");
    }

    const expenseDate = new Date(claim.date);
    const today = new Date();
    const daysDiff = (today - expenseDate) / (1000 * 60 * 60 * 24);
    if (daysDiff > 30) {
      issues.push("Expense older than 30 days");
    }

    return issues.length > 0 ? issues : ["OK"];
  };

  // Tab Management
  const switchTab = (tabName) => {
    setCurrentTab(tabName);
  };

  // Toggle Claim Selection
  const toggleClaimSelection = (claimId) => {
    setSelectedClaims((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(claimId)) {
        newSet.delete(claimId);
      } else {
        newSet.add(claimId);
      }
      return newSet;
    });
  };

  // Claim Actions
  const approveClaim = (claimId) => {
    setClaims((prev) =>
      prev.map((claim) => {
        if (claim.id === claimId) {
          return {
            ...claim,
            status: "approved",
            approvedDate: new Date().toISOString().split("T")[0],
          };
        }
        return claim;
      })
    );
    showToast(`Claim ${claimId} approved`, "success");
    setSelectedClaims((prev) => {
      const newSet = new Set(prev);
      newSet.delete(claimId);
      return newSet;
    });
  };

  const rejectClaim = (claimId) => {
    const reason = prompt("Please provide a reason for rejection:");
    if (reason) {
      setClaims((prev) =>
        prev.map((claim) => {
          if (claim.id === claimId) {
            return {
              ...claim,
              status: "rejected",
              rejectionReason: reason,
              rejectedDate: new Date().toISOString().split("T")[0],
            };
          }
          return claim;
        })
      );
      showToast(`Claim ${claimId} rejected`, "success");
      setSelectedClaims((prev) => {
        const newSet = new Set(prev);
        newSet.delete(claimId);
        return newSet;
      });
    }
  };

  const returnClaim = (claimId) => {
    const reason = prompt("Please provide a reason for returning this claim:");
    if (reason) {
      setClaims((prev) =>
        prev.map((claim) => {
          if (claim.id === claimId) {
            return {
              ...claim,
              status: "returned",
              returnReason: reason,
              returnedDate: new Date().toISOString().split("T")[0],
            };
          }
          return claim;
        })
      );
      showToast(`Claim ${claimId} returned for more information`, "info");
      setSelectedClaims((prev) => {
        const newSet = new Set(prev);
        newSet.delete(claimId);
        return newSet;
      });
    }
  };

  const viewClaim = (claimId) => {
    const claim = claims.find((c) => c.id === claimId);
    if (!claim) return;

    const content = (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-heading font-semibold text-accent">
            Claim Details - {claim.id}
          </h2>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-lg hover:bg-gray-100 focus-ring"
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

        <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Employee
              </label>
              <p className="text-sm text-gray-900">{claim.employeeName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Status
              </label>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium status-${claim.status}`}
              >
                {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
              </span>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Category
              </label>
              <p className="text-sm text-gray-900 capitalize">
                {claim.category}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Merchant
              </label>
              <p className="text-sm text-gray-900">{claim.merchant}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Date</label>
              <p className="text-sm text-gray-900">{formatDate(claim.date)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Amount
              </label>
              <div className="text-sm text-gray-900">
                {claim.currency !== "AED" && (
                  <>
                    {formatCurrency(claim.originalAmount, claim.currency)}
                    <br />
                  </>
                )}
                <span className="font-medium">
                  {formatCurrency(claim.aedAmount, "AED")}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Purpose</label>
            <p className="text-sm text-gray-900">{claim.purpose}</p>
          </div>

          {(claim.project || claim.costCenter) && (
            <div className="grid grid-cols-2 gap-4">
              {claim.project && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Project
                  </label>
                  <p className="text-sm text-gray-900">{claim.project}</p>
                </div>
              )}
              {claim.costCenter && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Cost Center
                  </label>
                  <p className="text-sm text-gray-900">{claim.costCenter}</p>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-500">
              Policy Status
            </label>
            <div className="mt-1">
              {claim.policyStatus.map((status, idx) => {
                const policyStatusClass = status.includes("OK")
                  ? "policy-ok"
                  : status.includes("Missing")
                  ? "policy-error"
                  : "policy-warning";
                return (
                  <span
                    key={idx}
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${policyStatusClass} mr-1`}
                  >
                    {status}
                  </span>
                );
              })}
            </div>
          </div>

          {claim.rejectionReason && (
            <div>
              <label className="text-sm font-medium text-red-600">
                Rejection Reason
              </label>
              <p className="text-sm text-gray-900">{claim.rejectionReason}</p>
            </div>
          )}

          {claim.returnReason && (
            <div>
              <label className="text-sm font-medium text-orange-600">
                Return Reason
              </label>
              <p className="text-sm text-gray-900">{claim.returnReason}</p>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-500">
              Audit Trail
            </label>
            <div className="mt-2 space-y-2">
              <div className="text-sm">
                <span className="text-gray-500">
                  {formatDate(claim.submittedDate)}:
                </span>
                <span className="text-gray-900">
                  {" "}
                  Submitted by {claim.employeeName}
                </span>
              </div>
              {claim.approvedDate && (
                <div className="text-sm">
                  <span className="text-gray-500">
                    {formatDate(claim.approvedDate)}:
                  </span>
                  <span className="text-green-600"> Approved</span>
                </div>
              )}
              {claim.rejectedDate && (
                <div className="text-sm">
                  <span className="text-gray-500">
                    {formatDate(claim.rejectedDate)}:
                  </span>
                  <span className="text-red-600"> Rejected</span>
                </div>
              )}
              {claim.returnedDate && (
                <div className="text-sm">
                  <span className="text-gray-500">
                    {formatDate(claim.returnedDate)}:
                  </span>
                  <span className="text-orange-600">
                    {" "}
                    Returned for more info
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );

    openDrawer(content);
  };

  const copyClaim = (claimId) => {
    showToast("Claim copied for editing", "info");
    switchTab("submit");

    const claim = claims.find((c) => c.id === claimId);
    if (claim) {
      setTimeout(() => {
        setClaimFormData((prev) => ({
          ...prev,
          category: claim.category,
          merchant: claim.merchant,
          amount: claim.originalAmount.toString(),
          currency: claim.currency,
          purpose: claim.purpose,
          project: claim.project || "",
          costCenter: claim.costCenter || "",
        }));
      }, 100);
    }
  };

  const cancelClaim = (claimId) => {
    if (window.confirm("Are you sure you want to cancel this claim?")) {
      setClaims((prev) => prev.filter((c) => c.id !== claimId));
      showToast("Claim cancelled", "info");
    }
  };

  // Policy Actions
  const editPolicy = (policyId) => {
    const policy = policies.find((p) => p.id === policyId);
    if (policy) {
      openDrawer(
        <PolicyForm
          policy={policy}
          onClose={closeDrawer}
          onSave={(updatedPolicy) => {
            setPolicies((prev) =>
              prev.map((p) => (p.id === updatedPolicy.id ? updatedPolicy : p))
            );
            showToast("Policy updated successfully", "success");
            closeDrawer();
          }}
        />
      );
    }
  };

  const togglePolicyStatus = (policyId) => {
    setPolicies((prev) =>
      prev.map((policy) => {
        if (policy.id === policyId) {
          const newStatus = policy.status === "Active" ? "Inactive" : "Active";
          showToast(`Policy ${newStatus.toLowerCase()}`, "success");
          return { ...policy, status: newStatus };
        }
        return policy;
      })
    );
  };

  // Receipt Actions
  const processReceipt = (receiptId) => {
    setReceipts((prev) =>
      prev.map((receipt) => {
        if (receipt.id === receiptId) {
          return { ...receipt, ocrStatus: "processing" };
        }
        return receipt;
      })
    );

    setTimeout(() => {
      setReceipts((prev) =>
        prev.map((receipt) => {
          if (receipt.id === receiptId) {
            return {
              ...receipt,
              ocrStatus: "processed",
              extractedData: {
                merchant: [
                  "Emirates Airlines",
                  "Marriott Hotel",
                  "The Gallery Restaurant",
                  "Du Telecom",
                ][Math.floor(Math.random() * 4)],
                amount: Math.round((Math.random() * 500 + 50) * 100) / 100,
                currency: "AED",
                date: new Date().toISOString().split("T")[0],
                confidence: 0.7 + Math.random() * 0.3,
              },
              status: "unmatched",
            };
          }
          return receipt;
        })
      );
      showToast("Receipt processed successfully", "success");
    }, 2000);
  };

  const matchReceipt = (receiptId) => {
    const receipt = receipts.find((r) => r.id === receiptId);
    if (!receipt) return;

    const potentialMatches = claims.filter(
      (claim) =>
        Math.abs(
          claim.aedAmount -
            convertCurrency(
              receipt.extractedData.amount,
              receipt.extractedData.currency
            )
        ) < 10 &&
        Math.abs(new Date(claim.date) - new Date(receipt.extractedData.date)) <
          3 * 24 * 60 * 60 * 1000
    );

    if (potentialMatches.length === 0) {
      showToast("No matching claims found", "info");
      return;
    }

    const content = (
      <MatchReceiptForm
        receipt={receipt}
        potentialMatches={potentialMatches}
        onMatch={(claimId) => {
          setReceipts((prev) =>
            prev.map((r) => {
              if (r.id === receiptId) {
                return { ...r, matchedClaim: claimId, status: "matched" };
              }
              return r;
            })
          );
          showToast("Receipt matched successfully", "success");
          closeDrawer();
        }}
        onClose={closeDrawer}
      />
    );

    openDrawer(content);
  };

  const createClaimFromReceipt = (receiptId) => {
    const receipt = receipts.find((r) => r.id === receiptId);
    if (!receipt) return;

    showToast("Creating claim from receipt...", "info");
    switchTab("submit");

    setTimeout(() => {
      if (receipt.extractedData) {
        setClaimFormData((prev) => ({
          ...prev,
          merchant: receipt.extractedData.merchant,
          amount: receipt.extractedData.amount.toString(),
          currency: receipt.extractedData.currency,
          date: receipt.extractedData.date,
        }));

        const merchant = receipt.extractedData.merchant.toLowerCase();
        let category = "";
        if (merchant.includes("airline") || merchant.includes("emirates")) {
          category = "travel";
        } else if (
          merchant.includes("hotel") ||
          merchant.includes("marriott")
        ) {
          category = "travel";
        } else if (
          merchant.includes("restaurant") ||
          merchant.includes("cafe")
        ) {
          category = "meals";
        } else if (
          merchant.includes("telecom") ||
          merchant.includes("internet")
        ) {
          category = "internet";
        }

        if (category) {
          setClaimFormData((prev) => ({ ...prev, category }));
        }
      }
    }, 100);
  };

  const resolveDuplicate = (receiptId) => {
    setReceipts((prev) =>
      prev.map((receipt) => {
        if (receipt.id === receiptId) {
          return { ...receipt, duplicateWarning: false };
        }
        return receipt;
      })
    );
    showToast("Duplicate warning resolved", "success");
  };

  const removeReceipt = (receiptId) => {
    if (window.confirm("Are you sure you want to remove this receipt?")) {
      setReceipts((prev) => prev.filter((r) => r.id !== receiptId));
      showToast("Receipt removed", "info");
    }
  };

  // GL Mapping Actions
  const editMapping = (mappingId) => {
    const mapping = glMappings.find((m) => m.id === mappingId);
    if (!mapping) return;

    openDrawer(
      <MappingForm
        mapping={mapping}
        onClose={closeDrawer}
        onSave={(updatedMapping) => {
          setGlMappings((prev) =>
            prev.map((m) => (m.id === updatedMapping.id ? updatedMapping : m))
          );
          showToast("GL mapping updated successfully", "success");
          closeDrawer();
        }}
      />
    );
  };

  const toggleMappingStatus = (mappingId) => {
    setGlMappings((prev) =>
      prev.map((mapping) => {
        if (mapping.id === mappingId) {
          const newActive = !mapping.active;
          showToast(
            `Mapping ${newActive ? "activated" : "deactivated"}`,
            "success"
          );
          return { ...mapping, active: newActive };
        }
        return mapping;
      })
    );
  };

  // Claim Form Handlers
  const handleClaimFormChange = (field, value) => {
    setClaimFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "category") {
      setShowMileageFields(value === "mileage");
      setShowPerDiemFields(value === "per-diem");
      updatePolicyChecks();
    }

    if (field === "currency" || field === "amount") {
      updateFXConversion();
      updatePolicyChecks();
    }

    if (field === "distance" || field === "rate") {
      const distance =
        parseFloat(field === "distance" ? value : claimFormData.distance) || 0;
      const rate =
        parseFloat(field === "rate" ? value : claimFormData.rate) || 0;
      const amount = distance * rate;
      setClaimFormData((prev) => ({ ...prev, amount: amount.toFixed(2) }));
      updatePolicyChecks();
    }

    if (field === "days" || field === "perDiemRate") {
      const days = parseInt(field === "days" ? value : claimFormData.days) || 0;
      const perDiemRate =
        parseFloat(
          field === "perDiemRate" ? value : claimFormData.perDiemRate
        ) || 0;
      const amount = days * perDiemRate;
      setClaimFormData((prev) => ({ ...prev, amount: amount.toFixed(2) }));
      updatePolicyChecks();
    }
  };

  const updateFXConversion = () => {
    const currency = claimFormData.currency;
    const amount = parseFloat(claimFormData.amount) || 0;

    if (currency && currency !== "AED" && amount > 0) {
      const rate = fxRates[currency] || 1;
      const aedAmount = amount * rate;

      setShowFXConversion(true);
      setFxData({
        original: `${amount} ${currency}`,
        rate: rate.toFixed(4),
        aed: `${aedAmount.toFixed(2)} AED`,
      });
    } else {
      setShowFXConversion(false);
    }
  };

  const updatePolicyChecks = () => {
    const category = claimFormData.category;
    const amount = parseFloat(claimFormData.amount) || 0;
    const currency = claimFormData.currency || "AED";
    const date = claimFormData.date;

    if (!category || !amount) {
      setShowPolicyStatus(false);
      return;
    }

    const policy = policies.find(
      (p) =>
        p.category.toLowerCase() === category.toLowerCase() &&
        p.status === "Active"
    );

    if (!policy) {
      setShowPolicyStatus(false);
      return;
    }

    const claimData = {
      category,
      amount,
      currency,
      date,
      receipt: fileInputRef.current?.files?.length > 0,
    };

    const issues = checkPolicyCompliance(claimData, policy.id);
    setPolicyStatusChips(issues);
    setShowPolicyStatus(true);
  };

  const handleClaimSubmit = (e) => {
    e.preventDefault();

    const newClaim = {
      id: generateId("CLM"),
      employee: claimFormData.employee,
      employeeName:
        claimFormData.employee === "sarah.johnson"
          ? "Sarah Johnson"
          : claimFormData.employee === "john.smith"
          ? "John Smith"
          : "Mary Davis",
      category: claimFormData.category,
      subcategory: claimFormData.subcategory || null,
      merchant: claimFormData.merchant,
      date: claimFormData.date,
      amount: parseFloat(claimFormData.amount),
      originalAmount: parseFloat(claimFormData.amount),
      currency: claimFormData.currency,
      aedAmount: convertCurrency(
        parseFloat(claimFormData.amount),
        claimFormData.currency,
        "AED"
      ),
      location: claimFormData.location || null,
      purpose: claimFormData.purpose,
      project: claimFormData.project || null,
      costCenter: claimFormData.costCenter || null,
      includeInPayroll: claimFormData.includeInPayroll,
      status: "pending",
      route: "Payroll",
      policyStatus: ["OK"],
      approver: "sarah.johnson",
      submittedDate: new Date().toISOString().split("T")[0],
      receipt: fileInputRef.current?.files?.length > 0,
    };

    const policy = policies.find(
      (p) =>
        p.category.toLowerCase() === newClaim.category.toLowerCase() &&
        p.status === "Active"
    );

    if (policy) {
      newClaim.route = policy.route;
      newClaim.policyStatus = checkPolicyCompliance(newClaim, policy.id);
    }

    setClaims((prev) => [...prev, newClaim]);
    showToast("Claim submitted successfully", "success");

    setClaimFormData({
      employee: "sarah.johnson",
      category: "",
      subcategory: "",
      merchant: "",
      date: "",
      amount: "",
      currency: "AED",
      location: "",
      distance: "",
      rate: "0.50",
      days: "",
      perDiemLocation: "",
      perDiemRate: "",
      purpose: "",
      project: "",
      costCenter: "",
      includeInPayroll: true,
    });
    setShowPolicyStatus(false);
    setShowFXConversion(false);
    setShowMileageFields(false);
    setShowPerDiemFields(false);

    setTimeout(() => switchTab("employee"), 1000);
  };

  const saveDraft = () => {
    showToast("Claim saved as draft", "info");
  };

  // Bulk Actions
  const handleSelectAll = (e) => {
    const pendingClaims = claims.filter((claim) => claim.status === "pending");
    if (e.target.checked) {
      setSelectedClaims(new Set(pendingClaims.map((c) => c.id)));
    } else {
      setSelectedClaims(new Set());
    }
  };

  const bulkApprove = () => {
    const selectedIds = Array.from(selectedClaims);
    setClaims((prev) =>
      prev.map((claim) => {
        if (selectedIds.includes(claim.id)) {
          return {
            ...claim,
            status: "approved",
            approvedDate: new Date().toISOString().split("T")[0],
          };
        }
        return claim;
      })
    );
    setSelectedClaims(new Set());
    showToast(`${selectedIds.length} claims approved`, "success");
  };

  const bulkReject = () => {
    const reason = prompt("Please provide a reason for bulk rejection:");
    if (reason) {
      const selectedIds = Array.from(selectedClaims);
      setClaims((prev) =>
        prev.map((claim) => {
          if (selectedIds.includes(claim.id)) {
            return {
              ...claim,
              status: "rejected",
              rejectionReason: reason,
              rejectedDate: new Date().toISOString().split("T")[0],
            };
          }
          return claim;
        })
      );
      setSelectedClaims(new Set());
      showToast(`${selectedIds.length} claims rejected`, "success");
    }
  };

  const bulkReturn = () => {
    const reason = prompt(
      "Please provide a reason for returning these claims:"
    );
    if (reason) {
      const selectedIds = Array.from(selectedClaims);
      setClaims((prev) =>
        prev.map((claim) => {
          if (selectedIds.includes(claim.id)) {
            return {
              ...claim,
              status: "returned",
              returnReason: reason,
              returnedDate: new Date().toISOString().split("T")[0],
            };
          }
          return claim;
        })
      );
      setSelectedClaims(new Set());
      showToast(`${selectedIds.length} claims returned`, "info");
    }
  };

  // Export Functions
  const getPayrollHead = (category) => {
    const mapping = {
      travel: "Travel Allowance",
      meals: "Meal Allowance",
      mileage: "Mileage Allowance",
      internet: "Other Allowance",
    };
    return mapping[category.toLowerCase()] || "Other Allowance";
  };

  const getGLAccount = (category) => {
    const mapping = {
      travel: "6001-001",
      meals: "6002-001",
      internet: "6003-001",
      mileage: "6004-001",
    };
    return mapping[category.toLowerCase()] || "6999-001";
  };

  const getTaxCode = (category) => {
    const mapping = {
      travel: "VAT0",
      meals: "VAT5",
      internet: "VAT5",
    };
    return mapping[category.toLowerCase()] || "VAT0";
  };

  const generatePayrollCSV = (exportClaims) => {
    const headers = [
      "Employee ID",
      "Employee Name",
      "Payroll Head",
      "Amount AED",
      "Description",
      "Cost Center",
    ];
    const rows = exportClaims.map((claim) => [
      claim.employee,
      claim.employeeName,
      getPayrollHead(claim.category),
      claim.aedAmount.toFixed(2),
      `${claim.category} - ${claim.merchant}`,
      claim.costCenter || "CC001",
    ]);

    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  };

  const generateAPCSV = (exportClaims) => {
    const headers = [
      "Vendor",
      "Invoice Number",
      "Amount AED",
      "GL Account",
      "Cost Center",
      "Description",
      "Tax Code",
    ];
    const rows = exportClaims.map((claim) => [
      claim.merchant,
      claim.id,
      claim.aedAmount.toFixed(2),
      getGLAccount(claim.category),
      claim.costCenter || "AUTO",
      claim.purpose,
      getTaxCode(claim.category),
    ]);

    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  };

  const downloadCSV = (csvData, filename) => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const stageToPayroll = () => {
    const payrollClaims = claims.filter(
      (c) => c.status === "approved" && c.route === "Payroll"
    );
    showToast(`${payrollClaims.length} claims staged to payroll`, "success");
  };

  const exportPayroll = () => {
    const payrollClaims = claims.filter(
      (c) => c.status === "approved" && c.route === "Payroll"
    );
    const csvData = generatePayrollCSV(payrollClaims);
    downloadCSV(csvData, "payroll_export.csv");
    showToast("Payroll export file downloaded", "success");
  };

  const stageToAP = () => {
    const apClaims = claims.filter(
      (c) => c.status === "approved" && c.route === "AP"
    );
    showToast(`${apClaims.length} claims staged to AP`, "success");
  };

  const exportAP = () => {
    const apClaims = claims.filter(
      (c) => c.status === "approved" && c.route === "AP"
    );
    const csvData = generateAPCSV(apClaims);
    downloadCSV(csvData, "ap_export.csv");
    showToast("AP export file downloaded", "success");
  };

  // Receipt Upload
  const handleReceiptUpload = (e) => {
    const files = Array.from(e.target.files);
    handleFileUploads(files);
  };

  const handleFileUploads = (files) => {
    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        showToast(`File ${file.name} is too large (max 10MB)`, "error");
        return;
      }

      const receipt = {
        id: generateId("RCP"),
        filename: file.name,
        uploadDate: new Date().toISOString().split("T")[0],
        ocrStatus: "pending",
        extractedData: null,
        matchedClaim: null,
        status: "unmatched",
        duplicateWarning: Math.random() > 0.8,
      };

      setReceipts((prev) => [...prev, receipt]);
    });

    showToast(`${files.length} receipt(s) uploaded successfully`, "success");
  };

  const processAllReceipts = () => {
    const pendingReceipts = receipts.filter((r) => r.ocrStatus === "pending");
    if (pendingReceipts.length === 0) {
      showToast("No receipts to process", "info");
      return;
    }

    showToast(`Processing ${pendingReceipts.length} receipts...`, "info");

    pendingReceipts.forEach((receipt, index) => {
      setTimeout(() => {
        processReceipt(receipt.id);
      }, index * 1000);
    });
  };

  // Export Claims/Policies
  const exportClaims = (format) => {
    if (format === "csv") {
      const headers = [
        "Claim ID",
        "Employee",
        "Category",
        "Merchant",
        "Date",
        "Amount",
        "Status",
      ];
      const rows = claims.map((claim) => [
        claim.id,
        claim.employeeName,
        claim.category,
        claim.merchant,
        claim.date,
        claim.aedAmount,
        claim.status,
      ]);
      const csvData = [headers, ...rows].map((row) => row.join(",")).join("\n");
      downloadCSV(csvData, "claims_export.csv");
    } else {
      showToast(`${format.toUpperCase()} export completed`, "success");
    }
  };

  const exportPoliciesData = (format) => {
    const headers = ["Policy ID", "Category", "Caps", "Eligibility", "Status"];
    const rows = policies.map((policy) => [
      policy.id,
      policy.category,
      Object.entries(policy.caps)
        .map(([k, v]) => `${k}: ${v}`)
        .join("; "),
      policy.eligibility.join(", "),
      policy.status,
    ]);
    const csvData = [headers, ...rows].map((row) => row.join(",")).join("\n");
    downloadCSV(csvData, "policies_export.csv");
  };

  // Initialize on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setClaimFormData((prev) => ({ ...prev, date: today }));
  }, []);

  // Render Policies Table
  const renderPoliciesTable = () => {
    return policies.map((policy) => (
      <tr key={policy.id} data-policy-id={policy.id}>
        <td data-label="Category" className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm font-medium text-gray-900">
            {policy.category}
          </span>
        </td>
        <td data-label="Caps" className="px-6 py-4">
          <div className="text-sm text-gray-900">
            {policy.caps.perReceipt && (
              <>
                {`Per receipt: ${formatCurrency(
                  policy.caps.perReceipt,
                  policy.currency
                )}`}
                <br />
              </>
            )}
            {policy.caps.daily && (
              <>
                {`Daily: ${formatCurrency(policy.caps.daily, policy.currency)}`}
                <br />
              </>
            )}
            {policy.caps.monthly && (
              <>
                {`Monthly: ${formatCurrency(
                  policy.caps.monthly,
                  policy.currency
                )}`}
                <br />
              </>
            )}
            {policy.caps.perKm && (
              <>
                {`Per km: ${formatCurrency(
                  policy.caps.perKm,
                  policy.currency
                )}`}
                <br />
              </>
            )}
          </div>
        </td>
        <td data-label="Eligibility" className="px-6 py-4">
          <span className="text-sm text-gray-900">
            {policy.eligibility.join(", ")}
          </span>
        </td>
        <td data-label="Approval" className="px-6 py-4">
          <span className="text-sm text-gray-900">{policy.approval}</span>
        </td>
        <td data-label="Route" className="px-6 py-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              policy.route === "Payroll"
                ? "bg-blue-100 text-blue-800"
                : "bg-orange-100 text-orange-800"
            }`}
          >
            {policy.route}
          </span>
        </td>
        <td data-label="Status" className="px-6 py-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              policy.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {policy.status}
          </span>
        </td>
        <td
          data-label="Actions"
          className="px-6 py-4 text-right text-sm font-medium"
        >
          <button
            onClick={() => editPolicy(policy.id)}
            className="text-primary hover:text-primary-600 mr-3 focus-ring rounded px-2 py-1"
          >
            Edit
          </button>
          <button
            onClick={() => togglePolicyStatus(policy.id)}
            className="text-gray-600 hover:text-gray-800 focus-ring rounded px-2 py-1"
          >
            {policy.status === "Active" ? "Deactivate" : "Activate"}
          </button>
        </td>
      </tr>
    ));
  };

  // Render Inbox Table
  const renderInboxTable = () => {
    const pendingClaims = claims.filter((claim) => claim.status === "pending");

    return pendingClaims.map((claim) => {
      const policyStatusClass = claim.policyStatus.includes("OK")
        ? "policy-ok"
        : claim.policyStatus.some((s) => s.includes("Missing"))
        ? "policy-error"
        : "policy-warning";

      return (
        <tr
          key={claim.id}
          data-claim-id={claim.id}
          className={selectedClaims.has(claim.id) ? "bg-blue-50" : ""}
        >
          <td data-label="Select" className="px-6 py-4">
            <input
              type="checkbox"
              checked={selectedClaims.has(claim.id)}
              onChange={() => toggleClaimSelection(claim.id)}
              className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
          </td>
          <td data-label="Employee" className="px-6 py-4">
            <span className="text-sm font-medium text-gray-900">
              {claim.employeeName}
            </span>
          </td>
          <td data-label="Category" className="px-6 py-4">
            <span className="text-sm text-gray-900 capitalize">
              {claim.category}
            </span>
          </td>
          <td data-label="Merchant" className="px-6 py-4">
            <span className="text-sm text-gray-900">{claim.merchant}</span>
          </td>
          <td data-label="Date" className="px-6 py-4">
            <span className="text-sm text-gray-900">
              {formatDate(claim.date)}
            </span>
          </td>
          <td data-label="Amount" className="px-6 py-4">
            <div className="text-sm text-gray-900">
              {claim.currency !== "AED" && (
                <>
                  {formatCurrency(claim.originalAmount, claim.currency)}
                  <br />
                </>
              )}
              <span className="font-medium">
                {formatCurrency(claim.aedAmount, "AED")}
              </span>
            </div>
          </td>
          <td data-label="Policy Status" className="px-6 py-4">
            {claim.policyStatus.map((status, idx) => (
              <span
                key={idx}
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${policyStatusClass} mr-1 mb-1`}
              >
                {status}
              </span>
            ))}
          </td>
          <td data-label="Owner" className="px-6 py-4">
            <span className="text-sm text-gray-900">
              {claim.approver === "sarah.johnson" ? "You" : "Finance"}
            </span>
          </td>
          <td data-label="Actions" className="px-6 py-4 text-right">
            <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
              <button
                onClick={() => approveClaim(claim.id)}
                className="text-green-600 hover:text-green-800 text-sm font-medium focus-ring rounded px-2 py-1"
              >
                Approve
              </button>
              <button
                onClick={() => rejectClaim(claim.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium focus-ring rounded px-2 py-1"
              >
                Reject
              </button>
              <button
                onClick={() => returnClaim(claim.id)}
                className="text-orange-600 hover:text-orange-800 text-sm font-medium focus-ring rounded px-2 py-1"
              >
                Return
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  // Render Employee Claims Table
  const renderEmployeeClaimsTable = () => {
    return claims.map((claim) => (
      <tr key={claim.id} data-claim-id={claim.id}>
        <td data-label="Claim ID" className="px-6 py-4">
          <span className="text-sm font-medium text-primary">{claim.id}</span>
        </td>
        <td data-label="Employee" className="px-6 py-4">
          <span className="text-sm text-gray-900">{claim.employeeName}</span>
        </td>
        <td data-label="Category" className="px-6 py-4">
          <span className="text-sm text-gray-900 capitalize">
            {claim.category}
          </span>
        </td>
        <td data-label="Merchant" className="px-6 py-4">
          <span className="text-sm text-gray-900">{claim.merchant}</span>
        </td>
        <td data-label="Date" className="px-6 py-4">
          <span className="text-sm text-gray-900">
            {formatDate(claim.date)}
          </span>
        </td>
        <td data-label="Amount" className="px-6 py-4">
          <div className="text-sm text-gray-900">
            {claim.currency !== "AED" && (
              <>
                {formatCurrency(claim.originalAmount, claim.currency)}
                <br />
              </>
            )}
            <span className="font-medium">
              {formatCurrency(claim.aedAmount, "AED")}
            </span>
          </div>
        </td>
        <td data-label="Status" className="px-6 py-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium status-${claim.status}`}
          >
            {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
          </span>
        </td>
        <td data-label="Route" className="px-6 py-4">
          <span
            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
              claim.route === "Payroll"
                ? "bg-blue-100 text-blue-800"
                : "bg-orange-100 text-orange-800"
            }`}
          >
            {claim.route}
          </span>
        </td>
        <td data-label="Actions" className="px-6 py-4 text-right">
          <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
            <button
              onClick={() => viewClaim(claim.id)}
              className="text-primary hover:text-primary-600 text-sm font-medium focus-ring rounded px-2 py-1"
            >
              View
            </button>
            <button
              onClick={() => copyClaim(claim.id)}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium focus-ring rounded px-2 py-1"
            >
              Copy
            </button>
            {claim.status === "draft" && (
              <button
                onClick={() => cancelClaim(claim.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium focus-ring rounded px-2 py-1"
              >
                Cancel
              </button>
            )}
          </div>
        </td>
      </tr>
    ));
  };

  // Render Receipts Table
  const renderReceiptsTable = () => {
    return receipts.map((receipt) => (
      <tr key={receipt.id} data-receipt-id={receipt.id}>
        <td data-label="File" className="px-6 py-4">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-sm text-gray-900">{receipt.filename}</span>
          </div>
        </td>
        <td data-label="OCR Status" className="px-6 py-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              receipt.ocrStatus === "processed"
                ? "bg-green-100 text-green-800"
                : receipt.ocrStatus === "processing"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {receipt.ocrStatus === "processed"
              ? "Processed"
              : receipt.ocrStatus === "processing"
              ? "Processing..."
              : "Pending"}
          </span>
        </td>
        <td data-label="Extracted Data" className="px-6 py-4">
          {receipt.extractedData ? (
            <div className="text-sm space-y-1">
              <div>
                <span className="text-gray-500">Merchant:</span>{" "}
                {receipt.extractedData.merchant}
              </div>
              <div>
                <span className="text-gray-500">Amount:</span>{" "}
                {formatCurrency(
                  receipt.extractedData.amount,
                  receipt.extractedData.currency
                )}
              </div>
              <div>
                <span className="text-gray-500">Date:</span>{" "}
                {formatDate(receipt.extractedData.date)}
              </div>
            </div>
          ) : (
            <span className="text-gray-400 text-sm">Not processed</span>
          )}
        </td>
        <td data-label="Confidence" className="px-6 py-4">
          {receipt.extractedData ? (
            <span
              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                receipt.extractedData.confidence >= 0.9
                  ? "confidence-high"
                  : receipt.extractedData.confidence >= 0.7
                  ? "confidence-medium"
                  : "confidence-low"
              }`}
            >
              {Math.round(receipt.extractedData.confidence * 100)}%
            </span>
          ) : (
            "-"
          )}
        </td>
        <td data-label="Matched Claim" className="px-6 py-4">
          {receipt.matchedClaim ? (
            <span className="text-sm text-primary font-medium">
              {receipt.matchedClaim}
            </span>
          ) : (
            <span className="text-gray-400 text-sm">Unmatched</span>
          )}
        </td>
        <td data-label="Status" className="px-6 py-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              receipt.status === "matched"
                ? "bg-green-100 text-green-800"
                : receipt.status === "processing"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
          </span>
          {receipt.duplicateWarning && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 ml-1">
              Duplicate?
            </span>
          )}
        </td>
        <td data-label="Actions" className="px-6 py-4 text-right">
          <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
            {receipt.ocrStatus === "pending" ? (
              <button
                onClick={() => processReceipt(receipt.id)}
                className="text-primary hover:text-primary-600 text-sm font-medium focus-ring rounded px-2 py-1"
              >
                Process
              </button>
            ) : receipt.status === "unmatched" ? (
              <>
                <button
                  onClick={() => matchReceipt(receipt.id)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium focus-ring rounded px-2 py-1"
                >
                  Match
                </button>
                <button
                  onClick={() => createClaimFromReceipt(receipt.id)}
                  className="text-green-600 hover:text-green-800 text-sm font-medium focus-ring rounded px-2 py-1"
                >
                  Create Claim
                </button>
              </>
            ) : null}
            {receipt.duplicateWarning && (
              <button
                onClick={() => resolveDuplicate(receipt.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium focus-ring rounded px-2 py-1"
              >
                Resolve
              </button>
            )}
            <button
              onClick={() => removeReceipt(receipt.id)}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium focus-ring rounded px-2 py-1"
            >
              Remove
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  // Render Mapping Table
  const renderMappingTable = () => {
    return glMappings.map((mapping) => (
      <tr key={mapping.id} data-mapping-id={mapping.id}>
        <td data-label="Category" className="px-6 py-4">
          <span className="text-sm font-medium text-gray-900">
            {mapping.category}
          </span>
        </td>
        <td data-label="Subcategory" className="px-6 py-4">
          <span className="text-sm text-gray-900">{mapping.subcategory}</span>
        </td>
        <td data-label="GL Account" className="px-6 py-4">
          <span className="text-sm font-mono text-gray-900">
            {mapping.glAccount}
          </span>
        </td>
        <td data-label="Cost Center" className="px-6 py-4">
          <span className="text-sm text-gray-900">{mapping.costCenter}</span>
        </td>
        <td data-label="Tax Code" className="px-6 py-4">
          <span className="text-sm text-gray-900">
            {mapping.taxCode || "-"}
          </span>
        </td>
        <td data-label="Active" className="px-6 py-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              mapping.active
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {mapping.active ? "Active" : "Inactive"}
          </span>
        </td>
        <td
          data-label="Actions"
          className="px-6 py-4 text-right text-sm font-medium"
        >
          <button
            onClick={() => editMapping(mapping.id)}
            className="text-primary hover:text-primary-600 mr-3 focus-ring rounded px-2 py-1"
          >
            Edit
          </button>
          <button
            onClick={() => toggleMappingStatus(mapping.id)}
            className="text-gray-600 hover:text-gray-800 focus-ring rounded px-2 py-1"
          >
            {mapping.active ? "Deactivate" : "Activate"}
          </button>
        </td>
      </tr>
    ));
  };

  // Component: Policy Form
  const PolicyForm = ({ policy, onClose, onSave }) => {
    const [formData, setFormData] = useState(
      policy || {
        category: "",
        eligibility: ["All Employees"],
        caps: { perReceipt: "", daily: "", monthly: "", perKm: "" },
        currency: "AED",
        requiredDocs: [],
        approval: "Manager Only",
        route: "Payroll",
        payrollHead: "",
        status: "Active",
      }
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedPolicy = policy
        ? { ...policy, ...formData }
        : { ...formData, id: generateId("POL") };
      onSave(updatedPolicy);
    };

    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-heading font-semibold text-accent">
            {policy ? "Edit" : "New"} Policy
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 focus-ring"
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

        <form
          onSubmit={handleSubmit}
          className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar"
        >
          <div>
            <label
              htmlFor="policy-category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category *
            </label>
            <select
              id="policy-category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
            >
              <option value="">Select category</option>
              <option value="Travel">Travel</option>
              <option value="Meals">Meals & Entertainment</option>
              <option value="Internet">Internet & Utilities</option>
              <option value="Mileage">Mileage</option>
              <option value="Per Diem">Per Diem</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caps & Limits
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="cap-per-receipt"
                  className="block text-xs text-gray-500 mb-1"
                >
                  Per Receipt Cap
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="cap-per-receipt"
                  value={formData.caps.perReceipt}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      caps: { ...formData.caps, perReceipt: e.target.value },
                    })
                  }
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="cap-daily"
                  className="block text-xs text-gray-500 mb-1"
                >
                  Daily Cap
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="cap-daily"
                  value={formData.caps.daily}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      caps: { ...formData.caps, daily: e.target.value },
                    })
                  }
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="cap-monthly"
                  className="block text-xs text-gray-500 mb-1"
                >
                  Monthly Cap
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="cap-monthly"
                  value={formData.caps.monthly}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      caps: { ...formData.caps, monthly: e.target.value },
                    })
                  }
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="cap-per-km"
                  className="block text-xs text-gray-500 mb-1"
                >
                  Per Km Rate
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="cap-per-km"
                  value={formData.caps.perKm}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      caps: { ...formData.caps, perKm: e.target.value },
                    })
                  }
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="policy-route"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Payout Route
            </label>
            <select
              id="policy-route"
              value={formData.route}
              onChange={(e) =>
                setFormData({ ...formData, route: e.target.value })
              }
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
            >
              <option value="Payroll">Payroll</option>
              <option value="AP">Accounts Payable</option>
            </select>
          </div>
        </form>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors focus-ring"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#1DA2A9]  text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-600 transition-colors focus-ring"
          >
            {policy ? "Update" : "Create"} Policy
          </button>
        </div>
      </div>
    );
  };

  // Component: Match Receipt Form
  const MatchReceiptForm = ({
    receipt,
    potentialMatches,
    onMatch,
    onClose,
  }) => {
    const [selectedClaim, setSelectedClaim] = useState("");

    const handleMatch = () => {
      if (!selectedClaim) {
        showToast("Please select a claim to match", "error");
        return;
      }
      onMatch(selectedClaim);
    };

    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-heading font-semibold text-accent">
            Match Receipt to Claim
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 focus-ring"
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

        <div className="flex-1 p-6 space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Receipt Details</h3>
            <div className="text-sm space-y-1">
              <div>
                <span className="text-gray-500">File:</span> {receipt.filename}
              </div>
              <div>
                <span className="text-gray-500">Merchant:</span>{" "}
                {receipt.extractedData.merchant}
              </div>
              <div>
                <span className="text-gray-500">Amount:</span>{" "}
                {formatCurrency(
                  receipt.extractedData.amount,
                  receipt.extractedData.currency
                )}
              </div>
              <div>
                <span className="text-gray-500">Date:</span>{" "}
                {formatDate(receipt.extractedData.date)}
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="match-claim-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select matching claim:
            </label>
            <select
              id="match-claim-select"
              value={selectedClaim}
              onChange={(e) => setSelectedClaim(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
            >
              <option value="">Select a claim...</option>
              {potentialMatches.map((claim) => (
                <option key={claim.id} value={claim.id}>
                  {claim.id} - {claim.merchant} -{" "}
                  {formatCurrency(claim.aedAmount)} - {formatDate(claim.date)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors focus-ring"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleMatch}
            className="bg-primary text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-600 transition-colors focus-ring"
          >
            Match Receipt
          </button>
        </div>
      </div>
    );
  };

  // Component: Mapping Form
  const MappingForm = ({ mapping, onClose, onSave }) => {
    const [formData, setFormData] = useState(
      mapping || {
        category: "",
        subcategory: "All",
        glAccount: "",
        costCenter: "AUTO",
        taxCode: "",
        active: true,
      }
    );

    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedMapping = mapping
        ? { ...mapping, ...formData }
        : { ...formData, id: generateId("MAP") };
      onSave(updatedMapping);
    };

    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-heading font-semibold text-accent">
            {mapping ? "Edit" : "New"} GL Mapping
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 focus-ring"
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

        <form
          onSubmit={handleSubmit}
          className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar"
        >
          <div>
            <label
              htmlFor="mapping-category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category *
            </label>
            <select
              id="mapping-category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
            >
              <option value="">Select category</option>
              <option value="Travel">Travel</option>
              <option value="Meals">Meals</option>
              <option value="Internet">Internet</option>
              <option value="Mileage">Mileage</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="mapping-subcategory"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Subcategory
            </label>
            <input
              type="text"
              id="mapping-subcategory"
              value={formData.subcategory}
              onChange={(e) =>
                setFormData({ ...formData, subcategory: e.target.value })
              }
              placeholder="All"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
            />
          </div>

          <div>
            <label
              htmlFor="mapping-gl-account"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              GL Account *
            </label>
            <input
              type="text"
              id="mapping-gl-account"
              value={formData.glAccount}
              onChange={(e) =>
                setFormData({ ...formData, glAccount: e.target.value })
              }
              required
              placeholder="e.g., 6001-001"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
            />
          </div>

          <div>
            <label
              htmlFor="mapping-cost-center"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Cost Center
            </label>
            <select
              id="mapping-cost-center"
              value={formData.costCenter}
              onChange={(e) =>
                setFormData({ ...formData, costCenter: e.target.value })
              }
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
            >
              <option value="AUTO">Auto-assign from claim</option>
              <option value="CC001">HR Department</option>
              <option value="CC002">Engineering</option>
              <option value="CC003">Marketing</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="mapping-tax-code"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tax Code
            </label>
            <select
              id="mapping-tax-code"
              value={formData.taxCode}
              onChange={(e) =>
                setFormData({ ...formData, taxCode: e.target.value })
              }
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
            >
              <option value="">No tax</option>
              <option value="VAT0">VAT 0%</option>
              <option value="VAT5">VAT 5%</option>
            </select>
          </div>
        </form>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors focus-ring"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#1DA2A9]  text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-600 transition-colors focus-ring"
          >
            {mapping ? "Update" : "Create"} Mapping
          </button>
        </div>
      </div>
    );
  };

  const pendingClaims = claims.filter((claim) => claim.status === "pending");
  const payrollClaims = claims.filter(
    (c) => c.status === "approved" && c.route === "Payroll"
  );
  const apClaims = claims.filter(
    (c) => c.status === "approved" && c.route === "AP"
  );

  return (
    <div className="bg-gray-50 font-sans">
      <style>{`
                .sidebar {
                    width: 280px;
                    transition: transform 0.3s ease-in-out;
                }
                
                .sidebar.collapsed {
                    width: 72px;
                }
                
                @media (max-width: 1023px) {
                    .sidebar {
                        transform: translateX(-100%);
                    }
                    .sidebar.mobile-open {
                        transform: translateX(0);
                    }
                }
                
                @media (min-width: 1024px) {
                    .sidebar {
                        transform: translateX(0);
                    }
                }
                
                [dir="rtl"] .sidebar {
                    left: auto;
                    right: 0;
                }
                
                @media (max-width: 1023px) {
                    [dir="rtl"] .sidebar {
                        transform: translateX(100%);
                    }
                    [dir="rtl"] .sidebar.mobile-open {
                        transform: translateX(0);
                    }
                }
                
                .main-content {
                    margin-left: 280px;
                    transition: margin-left 0.3s ease-in-out;
                }
                
                .main-content.sidebar-collapsed {
                    margin-left: 72px;
                }
                
                @media (max-width: 1023px) {
                    .main-content {
                        margin-left: 0;
                    }
                }
                
                [dir="rtl"] .main-content {
                    margin-left: 0;
                    margin-right: 280px;
                }
                
                [dir="rtl"] .main-content.sidebar-collapsed {
                    margin-right: 72px;
                }
                
                @media (max-width: 1023px) {
                    [dir="rtl"] .main-content {
                        margin-right: 0;
                    }
                }
                
                .focus-ring:focus {
                    outline: 2px solid #1DA2A9;
                    outline-offset: 2px;
                }
                
                .nav-link {
                    color: #6b7280;
                }
                .nav-link:hover {
                    background-color: #f3f4f6;
                    color: #1f2937;
                }
                .nav-link-active {
                    background-color: #e0f7fa;
                    color: #1DA2A9;
                }
                .nav-link-active svg {
                    color: #1DA2A9;
                }
                
                .sidebar.collapsed .sidebar-text,
                .sidebar.collapsed .section-title {
                    display: none;
                }
                
                .sidebar.collapsed .nav-link {
                    justify-content: center;
                    padding-left: 1rem;
                    padding-right: 1rem;
                }
                
                .sidebar.collapsed .nav-link svg {
                    margin-right: 0;
                }

                .right-drawer {
                    transform: translateX(100%);
                    transition: transform 0.3s ease-in-out;
                }
                .right-drawer.open {
                    transform: translateX(0);
                }

                .tab-button {
                    transition: all 0.2s ease;
                    border-bottom: 2px solid transparent;
                }
                .tab-button.active {
                    color: #1DA2A9;
                    border-bottom-color: #1DA2A9;
                }

                .loading-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                .chart-placeholder {
                    background: linear-gradient(135deg, rgba(29, 162, 169, 0.1) 0%, rgba(29, 162, 169, 0.05) 100%);
                    position: relative;
                }
                .chart-placeholder::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 20px;
                    right: 20px;
                    height: 2px;
                    background: linear-gradient(90deg, #1DA2A9 0%, #FF6B35 50%, #1C3D5A 100%);
                    opacity: 0.6;
                }

                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #cbd5e0 #f7fafc;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f7fafc;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e0;
                    border-radius: 3px;
                }

                @media (max-width: 768px) {
                    .mobile-table-card {
                        display: block;
                    }
                    .mobile-table-card thead,
                    .mobile-table-card tbody,
                    .mobile-table-card th,
                    .mobile-table-card td,
                    .mobile-table-card tr {
                        display: block;
                    }
                    .mobile-table-card thead tr {
                        position: absolute;
                        top: -9999px;
                        left: -9999px;
                    }
                    .mobile-table-card tr {
                        background: white;
                        border: 1px solid #e5e7eb;
                        border-radius: 12px;
                        margin-bottom: 12px;
                        padding: 16px;
                    }
                    .mobile-table-card td {
                        border: none;
                        padding: 8px 0;
                        position: relative;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .mobile-table-card td:before {
                        content: attr(data-label);
                        font-weight: 600;
                        color: #374151;
                    }
                }

                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .slide-in {
                    animation: slideIn 0.3s ease-out;
                }

                .fade-in {
                    animation: fadeIn 0.3s ease-out;
                }

                .status-pending { background-color: #fef3c7; color: #92400e; }
                .status-approved { background-color: #d1fae5; color: #065f46; }
                .status-rejected { background-color: #fee2e2; color: #991b1b; }
                .status-draft { background-color: #f3f4f6; color: #1f2937; }
                .status-paid { background-color: #dbeafe; color: #1e40af; }
                .status-returned { background-color: #fed7aa; color: #9a3412; }

                .policy-ok { background-color: #d1fae5; color: #065f46; }
                .policy-warning { background-color: #fef3c7; color: #92400e; }
                .policy-error { background-color: #fee2e2; color: #991b1b; }

                .confidence-high { color: #059669; background-color: #d1fae5; }
                .confidence-medium { color: #d97706; background-color: #fef3c7; }
                .confidence-low { color: #dc2626; background-color: #fee2e2; }
            `}</style>

      {/* Mobile Overlay */}
      <div
        id="mobile-overlay"
        className={`fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Toast Container */}
      <div
        id="toast-container"
        className="fixed top-4 right-4 z-50 space-y-2"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${
              toast.type === "success"
                ? "bg-green-500"
                : toast.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            } text-white px-4 py-3 rounded-xl shadow-lg transform transition-all duration-300 slide-in`}
          >
            <div className="flex items-center justify-between">
              <span>{toast.message}</span>
              <button
                onClick={() =>
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                }
                className="ml-4 text-white hover:text-gray-200 focus:outline-none"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        id="main-content"
        className={`main-content min-h-screen  bg-gray-50 ${
          sidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        {/* Top Header */}
        <header className="bg-white -ml-12 border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
             

              {/* Desktop sidebar toggle */}
             

              <div>
                <h1 className="text-xl lg:text-2xl font-heading font-semibold text-accent">
                  Reimbursements & Claims
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
                  <span className="text-gray-900 font-medium">
                    Reimbursements & Claims
                  </span>
                </nav>
              </div>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Action buttons */}
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={() => switchTab("submit")}
                  className="bg-[#FF6B35] text-white px-4 py-2 rounded-xl font-medium hover:bg-orange-600 transition-colors focus-ring text-sm"
                >
                  New Claim
                </button>
                <button
                  onClick={() => {
                    openDrawer(
                      <PolicyForm
                        onClose={closeDrawer}
                        onSave={(newPolicy) => {
                          setPolicies((prev) => [...prev, newPolicy]);
                          showToast("Policy created successfully", "success");
                          closeDrawer();
                        }}
                      />
                    );
                  }}
                  className="bg-[#1DA2A9]  text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-600 transition-colors focus-ring text-sm"
                >
                  New Policy
                </button>
                <button
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = ".csv,.xlsx";
                    input.onchange = (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        showToast(`Importing ${file.name}...`, "info");
                        setTimeout(() => {
                          showToast("Import completed successfully", "success");
                        }, 2000);
                      }
                    };
                    input.click();
                  }}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors focus-ring text-sm"
                >
                  Import
                </button>
                <button
                  onClick={() => {
                    const choice = prompt(
                      "Export options:\n1. Claims (CSV)\n2. Claims (PDF)\n3. Policies (CSV)\n\nEnter choice (1-3):"
                    );
                    if (choice === "1") exportClaims("csv");
                    else if (choice === "2") exportClaims("pdf");
                    else if (choice === "3") exportPoliciesData("csv");
                  }}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors focus-ring text-sm"
                >
                  Export
                </button>
              </div>

              {/* Mobile actions menu */}
              <button
                className="sm:hidden p-2 rounded-lg hover:bg-gray-100 focus-ring"
                aria-label="Actions menu"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-2  lg:space-x-3">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">
                    Sarah Johnson
                  </div>
                  <div className="text-xs text-gray-500">HR Manager</div>
                </div>
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">SJ</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6  lg:-ml-12">
          {/* Tabs Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
                <button
                  onClick={() => switchTab("policies")}
                  className={`tab-button whitespace-nowrap py-2 px-1 font-medium text-sm focus-ring ${
                    currentTab === "policies"
                      ? "active"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Policies & Categories
                </button>
                <button
                  onClick={() => switchTab("submit")}
                  className={`tab-button whitespace-nowrap py-2 px-1 font-medium text-sm focus-ring ${
                    currentTab === "submit"
                      ? "active"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Submit Claim
                </button>
                <button
                  onClick={() => switchTab("inbox")}
                  className={`tab-button whitespace-nowrap py-2 px-1 font-medium text-sm focus-ring ${
                    currentTab === "inbox"
                      ? "active"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Claims Inbox{" "}
                  <span className="ml-1 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
                    {pendingClaims.length}
                  </span>
                </button>
                <button
                  onClick={() => switchTab("employee")}
                  className={`tab-button whitespace-nowrap py-2 px-1 font-medium text-sm focus-ring ${
                    currentTab === "employee"
                      ? "active"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Employee Claims
                </button>
                <button
                  onClick={() => switchTab("receipts")}
                  className={`tab-button whitespace-nowrap py-2 px-1 font-medium text-sm focus-ring ${
                    currentTab === "receipts"
                      ? "active"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Receipts & OCR
                </button>
                <button
                  onClick={() => switchTab("mapping")}
                  className={`tab-button whitespace-nowrap py-2 px-1 font-medium text-sm focus-ring ${
                    currentTab === "mapping"
                      ? "active"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  GL Mapping
                </button>
                <button
                  onClick={() => switchTab("reports")}
                  className={`tab-button whitespace-nowrap py-2 px-1 font-medium text-sm focus-ring ${
                    currentTab === "reports"
                      ? "active"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Reports
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {/* Policies & Categories Tab */}
          {currentTab === "policies" && (
            <div className="tab-content active">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                  <h2 className="text-lg font-heading font-semibold text-accent">
                    Expense Policies
                  </h2>
                  <button
                    onClick={() => {
                      openDrawer(
                        <PolicyForm
                          onClose={closeDrawer}
                          onSave={(newPolicy) => {
                            setPolicies((prev) => [...prev, newPolicy]);
                            showToast("Policy created successfully", "success");
                            closeDrawer();
                          }}
                        />
                      );
                    }}
                    className="bg-[#1DA2A9] text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-600 transition-colors focus-ring text-sm"
                  >
                    Add Policy
                  </button>
                </div>

                {/* Policies Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full mobile-table-card">
                    <caption className="sr-only">Expense policies list</caption>
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Caps
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Eligibility
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Approval
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Route
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {renderPoliciesTable()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Submit Claim Tab */}
          {currentTab === "submit" && (
            <div className="tab-content active">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-heading font-semibold text-accent mb-6">
                  Submit New Claim
                </h2>

                <form onSubmit={handleClaimSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Employee */}
                    <div>
                      <label
                        htmlFor="claim-employee"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Employee *
                      </label>
                      <select
                        id="claim-employee"
                        value={claimFormData.employee}
                        onChange={(e) =>
                          handleClaimFormChange("employee", e.target.value)
                        }
                        required
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                      >
                        <option value="">Select employee</option>
                        <option value="sarah.johnson">
                          Sarah Johnson (Me)
                        </option>
                        <option value="john.smith">John Smith</option>
                        <option value="mary.davis">Mary Davis</option>
                      </select>
                    </div>

                    {/* Category */}
                    <div>
                      <label
                        htmlFor="claim-category"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Category *
                      </label>
                      <select
                        id="claim-category"
                        value={claimFormData.category}
                        onChange={(e) =>
                          handleClaimFormChange("category", e.target.value)
                        }
                        required
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                      >
                        <option value="">Select category</option>
                        <option value="travel">Travel</option>
                        <option value="meals">Meals & Entertainment</option>
                        <option value="internet">Internet & Utilities</option>
                        <option value="mileage">Mileage</option>
                        <option value="per-diem">Per Diem</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Subcategory */}
                    <div>
                      <label
                        htmlFor="claim-subcategory"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Subcategory
                      </label>
                      <select
                        id="claim-subcategory"
                        value={claimFormData.subcategory}
                        onChange={(e) =>
                          handleClaimFormChange("subcategory", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                      >
                        <option value="">Select subcategory</option>
                      </select>
                    </div>

                    {/* Merchant */}
                    <div>
                      <label
                        htmlFor="claim-merchant"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Merchant *
                      </label>
                      <input
                        type="text"
                        id="claim-merchant"
                        value={claimFormData.merchant}
                        onChange={(e) =>
                          handleClaimFormChange("merchant", e.target.value)
                        }
                        required
                        placeholder="e.g., Emirates Airlines"
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                      />
                    </div>

                    {/* Expense Date */}
                    <div>
                      <label
                        htmlFor="claim-date"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Expense Date *
                      </label>
                      <input
                        type="date"
                        id="claim-date"
                        value={claimFormData.date}
                        onChange={(e) =>
                          handleClaimFormChange("date", e.target.value)
                        }
                        required
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                      />
                    </div>

                    {/* Amount & Currency */}
                    <div className="flex space-x-3">
                      <div className="flex-1">
                        <label
                          htmlFor="claim-amount"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Amount *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          id="claim-amount"
                          value={claimFormData.amount}
                          onChange={(e) =>
                            handleClaimFormChange("amount", e.target.value)
                          }
                          required
                          placeholder="0.00"
                          className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                        />
                      </div>
                      <div className="w-24">
                        <label
                          htmlFor="claim-currency"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Currency
                        </label>
                        <select
                          id="claim-currency"
                          value={claimFormData.currency}
                          onChange={(e) =>
                            handleClaimFormChange("currency", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                        >
                          <option value="AED">AED</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                          <option value="SAR">SAR</option>
                        </select>
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label
                        htmlFor="claim-location"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        id="claim-location"
                        value={claimFormData.location}
                        onChange={(e) =>
                          handleClaimFormChange("location", e.target.value)
                        }
                        placeholder="e.g., Dubai, UAE"
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                      />
                    </div>

                    {/* Mileage Fields */}
                    {showMileageFields && (
                      <>
                        <div>
                          <label
                            htmlFor="claim-distance"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Distance (km) *
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            id="claim-distance"
                            value={claimFormData.distance}
                            onChange={(e) =>
                              handleClaimFormChange("distance", e.target.value)
                            }
                            required
                            placeholder="0.0"
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="claim-rate"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Rate per km
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            id="claim-rate"
                            value={claimFormData.rate}
                            onChange={(e) =>
                              handleClaimFormChange("rate", e.target.value)
                            }
                            placeholder="0.50"
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                          />
                        </div>
                      </>
                    )}

                    {/* Per Diem Fields */}
                    {showPerDiemFields && (
                      <>
                        <div>
                          <label
                            htmlFor="claim-days"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Number of Days *
                          </label>
                          <input
                            type="number"
                            min="1"
                            id="claim-days"
                            value={claimFormData.days}
                            onChange={(e) =>
                              handleClaimFormChange("days", e.target.value)
                            }
                            required
                            placeholder="1"
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="claim-per-diem-location"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Per Diem Location
                          </label>
                          <input
                            type="text"
                            id="claim-per-diem-location"
                            value={claimFormData.perDiemLocation}
                            onChange={(e) =>
                              handleClaimFormChange(
                                "perDiemLocation",
                                e.target.value
                              )
                            }
                            placeholder="e.g., London, UK"
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="claim-per-diem-rate"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Per Diem Rate
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            id="claim-per-diem-rate"
                            value={claimFormData.perDiemRate}
                            onChange={(e) =>
                              handleClaimFormChange(
                                "perDiemRate",
                                e.target.value
                              )
                            }
                            placeholder="150.00"
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* FX Conversion Display */}
                  {showFXConversion && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">
                        Currency Conversion
                      </h4>
                      <div className="text-sm text-blue-800 space-y-1">
                        <div>Original: {fxData.original}</div>
                        <div>Exchange Rate: {fxData.rate}</div>
                        <div className="font-medium">
                          AED Amount: {fxData.aed}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Policy Status Display */}
                  {showPolicyStatus && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Policy Compliance
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {policyStatusChips.map((status, idx) => {
                          const policyStatusClass = status.includes("OK")
                            ? "policy-ok"
                            : status.includes("Missing")
                            ? "policy-error"
                            : "policy-warning";
                          return (
                            <span
                              key={idx}
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${policyStatusClass}`}
                            >
                              {status}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Purpose */}
                  <div>
                    <label
                      htmlFor="claim-purpose"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Business Purpose *
                    </label>
                    <textarea
                      id="claim-purpose"
                      rows="3"
                      value={claimFormData.purpose}
                      onChange={(e) =>
                        handleClaimFormChange("purpose", e.target.value)
                      }
                      required
                      placeholder="Describe the business purpose of this expense..."
                      className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring resize-none"
                    ></textarea>
                  </div>

                  {/* Project & Cost Center */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="claim-project"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Project
                      </label>
                      <select
                        id="claim-project"
                        value={claimFormData.project}
                        onChange={(e) =>
                          handleClaimFormChange("project", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                      >
                        <option value="">Select project</option>
                        <option value="proj001">Project Alpha</option>
                        <option value="proj002">Project Beta</option>
                        <option value="general">General</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="claim-cost-center"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Cost Center
                      </label>
                      <select
                        id="claim-cost-center"
                        value={claimFormData.costCenter}
                        onChange={(e) =>
                          handleClaimFormChange("costCenter", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent focus-ring"
                      >
                        <option value="">Select cost center</option>
                        <option value="cc001">HR Department</option>
                        <option value="cc002">Engineering</option>
                        <option value="cc003">Marketing</option>
                      </select>
                    </div>
                  </div>

                  {/* Receipt Upload */}
                  <div>
                    <label
                      htmlFor="claim-receipt"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Receipt/Invoice
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors">
                      <input
                        type="file"
                        id="claim-receipt"
                        ref={fileInputRef}
                        accept=".jpg,.jpeg,.png,.pdf"
                        multiple
                        className="hidden"
                        onChange={handleReceiptUpload}
                      />
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400 mb-4"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="text-sm text-gray-600">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="font-medium text-[#1DA2A9] hover:text-primary-600 focus-ring rounded"
                        >
                          Upload files
                        </button>
                        <span> or drag and drop</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, PDF up to 10MB each
                      </p>
                    </div>
                  </div>

                  {/* Include in Payroll */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="claim-include-payroll"
                      checked={claimFormData.includeInPayroll}
                      onChange={(e) =>
                        handleClaimFormChange(
                          "includeInPayroll",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label
                      htmlFor="claim-include-payroll"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Include in next payroll (if approved)
                    </label>
                  </div>

                  {/* Form Actions */}
                  <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      id="save-draft-btn"
                      onClick={saveDraft}
                      className="order-2 sm:order-1 border border-gray-300 text-gray-700 px-6 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors focus-ring"
                    >
                      Save Draft
                    </button>
                    <button
                      type="submit"
                      id="submit-claim-btn"
                      className="order-1 sm:order-2 bg-[#FF6B35] text-white px-6 py-2 rounded-xl font-medium hover:bg-orange-600 transition-colors focus-ring"
                    >
                      Submit for Approval
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Claims Inbox Tab */}
          {currentTab === "inbox" && (
            <div className="tab-content active">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                  <h2 className="text-lg font-heading font-semibold text-accent">
                    Claims Inbox
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{pendingClaims.length} pending approvals</span>
                  </div>
                </div>

                {/* Filters */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <select id="inbox-status-filter" className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent focus-ring">
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="returned">Returned</option>
                  </select>
                  <select id="inbox-category-filter" className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent focus-ring">
                    <option value="">All Categories</option>
                    <option value="travel">Travel</option>
                    <option value="meals">Meals</option>
                    <option value="internet">Internet</option>
                    <option value="mileage">Mileage</option>
                  </select>
                  <input type="text" id="inbox-employee-filter" placeholder="Employee name..." className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent focus-ring" />
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="out-of-policy-only" className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded" />
                    <label htmlFor="out-of-policy-only" className="text-sm text-gray-700">Out-of-policy only</label>
                  </div>
                </div>

                {/* Bulk Actions */}
                <div id="bulk-actions" className={`${selectedClaims.size > 0 ? '' : 'hidden'} mb-4 flex flex-wrap items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-xl`}>
                  <span className="text-sm font-medium text-blue-800">
                    <span id="selected-count">{selectedClaims.size}</span> claims selected
                  </span>
                  <button id="bulk-approve-btn" onClick={bulkApprove} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors focus-ring">Approve Selected</button>
                  <button id="bulk-reject-btn" onClick={bulkReject} className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors focus-ring">Reject Selected</button>
                  <button id="bulk-return-btn" onClick={bulkReturn} className="bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors focus-ring">Return for Info</button>
                </div>

                {/* Claims Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full mobile-table-card">
                    <caption className="sr-only">
                      Pending claims for approval
                    </caption>
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            onChange={handleSelectAll}
                            className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Employee
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Merchant
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Policy Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Owner
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {renderInboxTable()}
                    </tbody>
                  </table>
                </div>

                {pendingClaims.length === 0 && (
                  <div className="text-center py-12">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      No pending claims
                    </h3>
                    <p className="text-sm text-gray-500">
                      All claims have been processed.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Employee Claims Tab */}
          {currentTab === "employee" && (
            <div className="tab-content active">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                  <h2 className="text-lg font-heading font-semibold text-accent">
                    All Employee Claims
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{claims.length} total claims</span>
                  </div>
                </div>

                {/* Claims Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full mobile-table-card">
                    <caption className="sr-only">All employee claims</caption>
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Claim ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Employee
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Merchant
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Route
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {renderEmployeeClaimsTable()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Receipts & OCR Tab */}
          {currentTab === "receipts" && (
            <div className="tab-content active">
              <div className="space-y-6">
                {/* Upload Area */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-heading font-semibold text-accent mb-6">Receipt Upload & OCR</h2>
                  <div id="receipt-upload-area" className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Drop receipts here or click to upload</h3>
                    <p className="text-sm text-gray-500">Support for JPG, PNG, PDF files up to 10MB each</p>
                    <input type="file" id="bulk-receipt-upload" ref={bulkReceiptUploadRef} multiple accept="image/*,.pdf" className="sr-only" onChange={handleReceiptUpload} />
                    <button type="button" onClick={() => bulkReceiptUploadRef.current?.click()} className="mt-4 bg-[#1DA2A9] text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-600 transition-colors focus-ring">Select Files</button>
                  </div>
                </div>

                {/* Receipts Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                    <h2 className="text-lg font-heading font-semibold text-accent">Receipt Processing</h2>
                    <button id="process-all-receipts" onClick={processAllReceipts} className="bg-[#FF6B35] text-white px-4 py-2 rounded-xl font-medium hover:bg-orange-600 transition-colors focus-ring">Process All Unmatched</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table id="receipts-table" className="min-w-full mobile-table-card">
                      <caption className="sr-only">Receipt processing list</caption>
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OCR Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Extracted Data</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matched Claim</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody id="receipts-tbody" className="bg-white divide-y divide-gray-200">
                        {renderReceiptsTable()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GL Mapping Tab */}
          {currentTab === "mapping" && (
            <div className="tab-content active">
              <div className="space-y-6">
                {/* GL Mapping Form */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                    <h2 className="text-lg font-heading font-semibold text-accent">GL Account Mapping</h2>
                    <button id="add-mapping-btn" onClick={() => { openDrawer(<MappingForm onClose={closeDrawer} onSave={(newMapping) => { setGlMappings(prev => [...prev, newMapping]); showToast('GL mapping created successfully', 'success'); closeDrawer(); }} />); }} className="bg-[#1DA2A9] text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-600 transition-colors focus-ring">Add Mapping</button>
                  </div>

                  {/* Mapping Table */}
                  <div className="overflow-x-auto">
                    <table id="mapping-table" className="min-w-full mobile-table-card">
                      <caption className="sr-only">GL account mappings</caption>
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategory</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GL Account</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Center</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Code</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody id="mapping-tbody" className="bg-white divide-y divide-gray-200">
                        {renderMappingTable()}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Export Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-heading font-semibold text-accent mb-6">Export to Systems</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Payroll Export */}
                    <div className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">Payroll Staging</h3>
                        <span id="payroll-count" className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{payrollClaims.length} claims</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">Export approved claims with route = Payroll</p>
                      <div className="space-y-2">
                        <button id="stage-to-payroll" onClick={stageToPayroll} className="w-full bg-[#1DA2A9]  text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-600 transition-colors focus-ring">Stage to Payroll</button>
                        <button id="export-payroll" onClick={exportPayroll} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors focus-ring">Export Payroll File</button>
                      </div>
                    </div>

                    {/* AP Export */}
                    <div className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">Accounts Payable</h3>
                        <span id="ap-count" className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">{apClaims.length} claims</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">Export approved claims with route = AP</p>
                      <div className="space-y-2">
                        <button id="stage-to-ap" onClick={stageToAP} className="w-full bg-[#FF6B35] text-white px-4 py-2 rounded-xl font-medium hover:bg-orange-600 transition-colors focus-ring">Stage to AP</button>
                        <button id="export-ap" onClick={exportAP} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors focus-ring">Export AP File</button>
                      </div>
                    </div>
                  </div>

                  {/* Export Preview */}
                  <div id="export-preview" className="mt-6 hidden">
                    <h4 className="font-medium text-gray-900 mb-3">Export Preview</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Total Amount:</span>
                          <span className="block font-medium" id="export-total">AED 0.00</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Claims Count:</span>
                          <span className="block font-medium" id="export-count">0</span>
                        </div>
                        <div>
                          <span className="text-gray-500">GL Accounts:</span>
                          <span className="block font-medium" id="export-gl-count">0</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Cost Centers:</span>
                          <span className="block font-medium" id="export-cc-count">0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {currentTab === "reports" && (
            <div className="tab-content active">
              <div className="space-y-6">
                {/* KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-600">Approved This Month</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">+15%</span>
                    </div>
                    <div className="flex items-baseline">
                      <p className="text-2xl lg:text-3xl font-heading font-bold text-accent">AED 24,750</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">18 claims processed</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-600">Avg Approval Time</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">-8%</span>
                    </div>
                    <div className="flex items-baseline">
                      <p className="text-2xl lg:text-3xl font-heading font-bold text-accent">2.3</p>
                      <p className="ml-2 text-sm text-gray-500">days</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Down from 2.5 days</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-600">Out-of-Policy %</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">12%</span>
                    </div>
                    <div className="flex items-baseline">
                      <p className="text-2xl lg:text-3xl font-heading font-bold text-accent">12%</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">3 of 25 claims</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-600">Payroll vs AP Split</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Payroll</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#1DA2A9] h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">AP</span>
                        <span className="font-medium">25%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Spend by Category */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-heading font-semibold text-accent mb-6">Spend by Category</h3>
                    <div className="chart-placeholder h-64 rounded-xl mb-4 flex items-center justify-center text-gray-500 text-sm">
                      Pie chart visualization would appear here
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-gray-600">Travel: AED 12,450</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-secondary rounded-full"></div>
                        <span className="text-gray-600">Meals: AED 8,200</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-accent rounded-full"></div>
                        <span className="text-gray-600">Internet: AED 3,100</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-gray-600">Other: AED 1,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Spend by Location */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-heading font-semibold text-accent mb-6">Spend by Location</h3>
                    <div className="chart-placeholder h-64 rounded-xl mb-4 flex items-center justify-center text-gray-500 text-sm">
                      Bar chart visualization would appear here
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dubai, UAE</span>
                        <span className="font-medium">AED 15,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Riyadh, SAR</span>
                        <span className="font-medium">AED 6,800</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">London, UK</span>
                        <span className="font-medium">AED 2,750</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Merchants/Projects */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-heading font-semibold text-accent mb-6">Top Merchants & Projects</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Top Merchants */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Top Merchants</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">Emirates Airlines</span>
                          <div className="text-right">
                            <div className="text-sm font-medium">AED 8,450</div>
                            <div className="text-xs text-gray-500">12 transactions</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">Marriott Hotels</span>
                          <div className="text-right">
                            <div className="text-sm font-medium">AED 5,200</div>
                            <div className="text-xs text-gray-500">8 transactions</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">Uber/Careem</span>
                          <div className="text-right">
                            <div className="text-sm font-medium">AED 3,150</div>
                            <div className="text-xs text-gray-500">24 transactions</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Top Projects */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Top Projects</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">Project Alpha</span>
                          <div className="text-right">
                            <div className="text-sm font-medium">AED 12,800</div>
                            <div className="text-xs text-gray-500">18 claims</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">Project Beta</span>
                          <div className="text-right">
                            <div className="text-sm font-medium">AED 7,450</div>
                            <div className="text-xs text-gray-500">11 claims</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">General</span>
                          <div className="text-right">
                            <div className="text-sm font-medium">AED 4,500</div>
                            <div className="text-xs text-gray-500">15 claims</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Right Drawer */}
      <div
        className={`right-drawer fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 ${
          drawerOpen ? "open" : ""
        }`}
      >
        {drawerContent}
      </div>
    </div>
  );
};

export default ReimbursementsClaims;