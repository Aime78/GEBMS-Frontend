import { HeaderMapExpenditure } from "../types/expenditure";
import { HeaderMapExpenditureRequest } from "../types/expenditureRequests";

export const headerMap: HeaderMapExpenditure = {
    year: "Year",
    department: "Department",
    subcategory: "Subcategory",
    expenditureCategory: "Expenditure Category",
    amountSpent: "Amount Spent (RWF)",
    projectName: "Project Name",
  };

  export const headerMapSummary: HeaderMapExpenditureRequest = {
    requestedBy: "Requested By",
    requestedAmount: "Amount (RWF)",
  };

  export const headerMapExpenditureReq: HeaderMapExpenditureRequest = {
    requestedDate: "Date",
    department: "Department",
    requestedBy: "Requested By",
    expenditureCategory: "Category",
    subcategory: "Subcategory",
    status: "Status",
    purpose: "Purpose",
    requestedAmount: "Amount (RWF)",
    projectName: "Project Name",
  };
  